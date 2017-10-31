---
title:  "An early Christmas present"
date:   2016-12-22
---

I'm breaking a long standing tradition of not blogging, because for once I feel like I truly have something interesting to talk about! :)

Earlier in the year my friend and fellow minion, Anthony Burke, pulled me into a meeting with Alan Renouf and William Lam to discuss what was at the time a hush hush project by Microsoft, to bring PowerShell to *nix systems, and (as if that wasn't enough!), that the PowerCLI team were busy making hay and were planning to bring PowerCLI support out in conjunction with the PowerShell Core release - just in time for US VMworld 2016.

Freakin'! Awesome!

At the time, I was flat out trying to get everything together for the 2.0 release of PowerNSX - one that nearly doubled the size of PowerNSX, all with a development team of 1 (gratefully received contributions from minions and a supportive community aside!).

I did take a quick look at PoSH Core at the time, and liked what I saw, but the lack of support for dealing easily with unsigned certificates brought me unstuck very early on in attempts to get PowerNSX going on Core and I waited patiently (more than some ;) ) for things to improve a little and for enough free time to present itself to work on porting PowerNSX.

So VMworld happened, with Anthony and myself presenting a very successful session on PowerNSX and PyNSXv at Vegas, and then a month's leave, Barcelona, vForum, another trip to HQ... but finally, I found a few weeks of reasonably consecutive time in December to get down to brass tacks...

# PowerNSX support for PowerShell Core

Yes - if you haven't figured it out yet - we have *experimental* support for PowerShell Core in PowerNSX as of now.

## TLDR

[PowerNSX Core](https://powernsx.github.io/powernsxcore/)

## The Journey

For those that are interested in the innards of PowerNSX and what was involved in porting PowerNSX to PowerShell Core, I'll share some ramblings.  I wont judge if you stop reading here.

In the process I learned a lot about PowerShell, dotNet Core, git, some (most!) of which is inane, can be found elsewhere on the web, or is just plain uninteresting.  I will try to restrict myself to just the useful bits that hopefully help some other weary googler on their way...

## One Module to Rule Them All

When I first started testing PowerNSX on PowerShell Core, I had no idea how easy or hard the process of porting it would be. Simple test - does the module load?  No?  Why?  Fix?  Move On.  Can I connect to NSX server?  No?  Why?  Fix?  Move on... you get the idea.

After a few days of work though it became apparent that not only would it be possible to port it, but, it should be possible (and definitely desirable) for the one module to load on either platform.  Sure, there were areas where I had to detect what platform the module was running on in order to deal with some specifics, but these were for the most part limited to two key areas - both of which I've been able to refactor to allow the cmdlets to remain mostly untouched.  XML XPath handling, and use of Invoke-WebRequest.  I'll cover both of them separately below.

So - the initial release, has just that.  One module that will load on PowerShell Full on Windows, or PowerShell Core (alpha-14 and above).

## PowerShell Full -match PowerShell Core

I have been really impressed so far at just how well PowerShell Core behaves compared to its mature cousin on Windows, but there are some rough edges, and for PowerNSX - a module that relies not only on PowerShell, but also dotNet directly - the rough edges took some getting over.

Firstly, there are some UI issues that I'm sure will be resolved relatively soon.  Things like progress dialogs overwriting output (PowerNSX uses progress dialogs for most long running tasks), and like the console feeling sluggish (it appears to redraw every key press, which makes pasting large amounts of text to a PoSH Core session painful and/or scary).

In PowerNSX, I chose to disable progress dialogs when the module loads on Core to deal with one of these problems.  I introduced $PowerNSXConfiguration.ProgressReporting = $false to deal with this.  You can toggle this if you want them back, though you will probably turn it off again pretty quickly (at least with the way that alpha-14 behaves).  Note that $PowerNSXConfiguration is not persistent (yet - though I plan to make it so and expand on it in future commits).

## Invoke-RestMethod and Invoke-WebRequest Round One

Initially, I didn't start work on the port until Invoke-RestMethod and Invoke-WebRequest (aka irm and iwr) supported the -SkipCertificateCheck flag.  The reason for this was the normal method of avoiding certificate validation on PowerShell Full (something that PowerNSX relies on, as virtually no-one actually has a valid certificate on their NSX Manager) was to create an in-memory class derived from ICertificatePolicy that overrides the CheckValidationResult method, and then assign an instance of this class to [System.Net.ServicePointManager]::CertificatePolicy, and this method was not applicable to PowerShell Core, as the underlying dotNet classes used to back irm and iwr were completely different (HTTPClient) to that on Full (WebRequest) and hence used different mechanisms for certificate validation.

So - along came a much smarter person than me, and https://github.com/PowerShell/PowerShell/issues/1945 was raised, and resolved in alpha-13 with -skipcertificatechecks, and I thought I was [home and hosed](http://www.slang-dictionary.org/australian-slang/Home_and_hosed)...Fool!

Oh - and if you do care about certificate validation - you can use the -ValidateCertificate switch on Connect-NsxServer to enable it.

## dotNet Core -ne dotNet full

Unlike Powershell, dotNet Core is a very different beast to its Windows relative - dotNet full; so much so that it is an absolute credit to the PowerShell team and PowerShell's architecture in general that the experience on Core is so familiar and for the most part, that the purely PowerShell parts of a 20K line module of PowerShell hackery (PowerNSX) will run unmodified on it.

Unfortunately, PowerNSX relies heavily on several dotNet classes directly - most significantly, the native dotNet classes for XML handling.  Because the NSX API is XML based, PowerNSX does a lot of internal operations directly on the XML using a query language called XPath.  The problem is, although XPath exists on dotNet Core, it is supported by a different dotNet namespace, and there are over 400 individual uses of XPath in PowerNSX.

So this one - dotNet problem number one - was relatively easy to solve.  Thankfully, although the class that provides XPath support on Core is different, the two methods I used over and again - SelectNodes() and SelectSingleNode() - had similar interfaces and returned types that behaved similarly enough on both platforms.  So - Invoke-XpathQuery was born.

Now, instead of calling $xml.SelectSingleNode("child:mychild"), PowerNSX cmdlets would have to call Invoke-XpathQuery("SelectSingleNode", $xml, $queryString).  Now, with 438 uses of XPath, I wasn't about to change all these by hand.  Suffice to say, I spent a lot of time on that regex ;), but the refactoring was relatively straightforward and things appear to work consistently on both platforms.  Note though, that this change touched a lot of PowerNSX, and affects its use on Windows, as well as Core, so I really was nervous about releasing it.  So much so that I've sat on it for several months now before merging to the PowerNSX github repo.

## Invoke-RestMethod and Invoke-WebRequest Round Two

Freshly armed with working certificate validation avoidance mechanisms and refactored XPath queries, I marched forward into the breach once again.  Vast swathes of cmdlets fell to my tests.  For the most part these two things resolved the majority of issues with the port in one fell swoop.  But... the light at the end of the tunnel actually turned out to be a train heading straight for me...

### The Case of the Missing WebResponse

On PowerNSX full, when I do this:

```
PS C:\Users\Nick> Get-NsxTransportZone | New-NsxLogicalSwitch "LS1"
invoke-nsxwebrequest : Invoke-NsxWebRequest : The NSX API response received indicates a failure. 400 : Bad Request : Response Body: <?xml version="1.0" encoding="UTF-8"?>
<error><details>A controller is not available for this operation.</details><errorCode>836</errorCode><moduleName>core-services</moduleName></error>
At C:\Program Files\Common Files\Modules\PowerNSX\PowerNSX.psm1:7191 char:21
+ ... $response = invoke-nsxwebrequest -method "post" -uri $URI -body $body ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidResult: (Invoke-NsxWebRequest:String) [Invoke-NsxWebRequest], InternalNsxApiException
    + FullyQualifiedErrorId : NsxAPIFailureResult,Invoke-NsxWebRequest
```

The exception that I get back includes the server response which has useful information that I then rethrow to the user, like:  I need a controller running in order to create a logical switch.

On Core however, using iwr, if the server response is non 2xx, like it is in this case, the exception that is thrown *does not contain the response*.  This means that the best I can send back to the user is basically 'Sorry.  That didnt work.'.  Yuk :(

After some investigation, it was clear that it's just a limitation of the PowerShell port, and not some intrinsic limitation of dotNet Core.  (As a side note, it's awesome that PowerShell Core is *opensource* as I can actually check to see where limitations like this lie.  That was about to take me down another rabbit hole.)

So, this is annoying, but I was for the most part prepared to accept it and move on in the hope that it would be resolved in time. (And it probably will.).  But hold that thought...

### My Two Characters of Greatness

The other new issue that I'd now hit, was that at times, I would get nullref exceptions from iwr and irm when the API returned no content.  What transpired was a spirit journey of sorts, a very simple change to PowerShell to resolve this issue resulted in me (a dotNet hack) being schooled by the friendly PowerShell guys into reducing my fix down to two characters.  And they were both the same character. :).  [Messing With Things I Dont Understand](https://github.com/PowerShell/PowerShell/pull/2666).  Regardless, I learnt a lot about how to build, contribute to and test PowerShell Core.

## Testing

While we are on the topic of testing: As I progressed with the porting effort and fixed the main classes of problems that I hit, I quickly came to the realisation that without actual tests to perform on the module, it was impossible to know if the changes I was making were breaking anything.  One of my users had also shared a lot of useful insight (thanks @devblackops !) to how he felt tests should be improved in PowerNSX, and based on his recommendations and some more late nights, the PowerNSX Test framework was born. (Check out /tests/ in the current master branch, and [Contributing](https://powernsx.github.io/contrib/) for more information).

So, after a week or so's work on converting the very dodgy test scripts I had previously, to Pester tests - while incomplete - I now had an easily executed, easy to expand upon, test framework that I could use to be increasingly confident that I hadn't broken too much (or rather, to identify what I had broken and what needed to be fixed! :) ).

## Naughty Header Handling

So it *should* have been plain sailing from here.  Except for one group of tests.  DFW.  None of the cmdlets dealing with DFW rule creation were working, and there's something special in them in the NSX API, they use a common approach among REST APIs of leveraging the 'If-Match' header to ensure that any POST that the API receives is using the latest version of the object by requiring the caller to specify the object 'E-Tag' (Entity Tag) as the If-Match value.  Think of it as version control.  Problem was, Invoke-WebRequest was rejecting the addition of the If-Match Header PowerNSX was building as not compliant.

A short amount of research later and I realised that, actually, the NSX API is being a little 'naughty' here, and that the value of an If-Match header should actually be enclosed in quotes to comply with the relevant standards.  PowerNSX use on PowerShell Full generates a header with no quotes which Invoke-WebRequest happily accepts, but when I tried quoting it on PowerShell Core, although the header was now accepted by Invoke-WebRequest as valid, it was rejected by the NSX API. :(  See [My Lonely Issue](https://github.com/PowerShell/PowerShell/issues/2895) for details.

## Invoke-RestMethod and Invoke-WebRequest Round Three.  And Certificates.  Again.

Figuring I was so close, and wanting to merge the goodness I'd been sitting on for months now, I started to look for alternatives.

With what I'd learned from this journey, I was slowly coming to the realisation that I could probably solve all of the 'lack of response data in exceptions', 'if-match header handling' 'content-type header missing exceptions' and even the dang 'skip certificate validation' problems just by writing my own simplified version of 'Invoke-WebRequest', leveraging the dotNet Core System.Net.Http.HttpClient class directly (the same class that Invoke-WebRequest uses under the hood).

What was born of this process was Invoke-InternalWebRequest, an internal-only function that implements a similar interface to Invoke-WebRequest and is only leveraged when run on PowerShell Core.  It allowed me to address all of the above issues as well as improve the exception handling on both PowerShell Full and Core, and lay the groundwork for even more improvements in this space in the future.  So.  Full error responses from the NSX API when a non 2xx response is received, 'Improper' header handling via the Header.TryAddWithoutValidation() method that resolved the DFW test failures, no content-type nullref exceptions when zero content responses are received, and to cap it all off, ability to selectively disable certificate validation.

Given that someone may one day look for how to disable certificate validation in PowerShell when using the HTTPClient classes on PowerShell Core, the following may be useful.  This took me a late night to nut out, as it requires the definition of a custom 'type' based on a C# Class that derives from the HTTPClient class, as specifying a callback function for a dotNet class in PowerShell seems nigh on impossible to this mere mortal.

```
$InternalHttpClientHandler = @"
        using System.Net.Http;
        public class InternalHttpClientHandler : HttpClientHandler {
            public InternalHttpClientHandler(bool SkipCertificateCheck) {
                if (SkipCertificateCheck) {
                    ServerCertificateCustomValidationCallback = delegate { return true; };
                }
            }
        }
"@
add-type $InternalHttpClientHandler -ReferencedAssemblies System.Net.Http, System.Security.Cryptography.X509Certificates, System.Net.Primitives -WarningAction "SilentlyContinue"
$httpClientHandler = New-Object InternalHttpClientHandler($SkipCertificateCheck)
$httpClient = New-Object System.Net.Http.Httpclient $httpClientHandler
```
It's somewhat ironic that the final hurdle I overcame would actually have resolved the issue that prevented me from really beginning the port for several months in the first place... Aint hindsight wonderful?

## What Now?  Call to Arms.

So, as of now, the changes to support Core, including potentially breaking changes to the Full version of PowerNSX have been merged to master.  *master is the PowerNSX development branch.* While I try to avoid breaking things here, it's not guaranteed, and you may encounter issues on both platforms. (I almost guarantee there are PowerNSX Core issues waiting to be found, but it's possible I've killed something on normal PowerNSX too.)

If you are a PowerNSX user, I encourage you to get the latest from master and test it.  Use it.  Use it on Core.  Report issues on the github site.  But.  Please don't expect it to be bug free and tread with caution if you are using this on production/critical NSX environments.

With the introduction of a test framework, I'm also very interested in getting people to contribute tests!  It's well documented, with a template test that you can duplicate to start a new 'Area of tests', or alternatively, you can add tests to existing areas.  Tests are based on pester, a tool with lots of readily googleable information available out there.  If you want to contribute here and hit issues, please reach out on the issues page.

So, with that, Merry Christmas NSX'ers.  Hopefully PowerNSX is of use to you, and that Core support will help lay the groundwork for encouraging a whole new class of users to be able to leverage the awesome CLI and automation framework that is PowerShell on their Macbooks and Linux workstations.  In the coming months, I hope to leverage this work to release an appliance format of PowerNSX, and get PowerNSX included in the PowerCLI docker image.  Watch this space...

Nick
