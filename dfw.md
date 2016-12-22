---
layout: page
permalink: /dfw/
---

## Distributed Firewall operations

Here are some quick tips in managing the Distributed Firewall. 

### Managing the Distributed Firewall.

The Distributed Firewall is section based and the CRUD operations around Distributed Firewall hinge on operating with sections. First step is to retrieve a defined section.

```
PowerCLI C:\> Get-NsxFirewallSection 'Management - Web Services'


id               : 1092
name             : Management - Web Services
generationNumber : 1471504507962
timestamp        : 1471504507962
type             : LAYER3
rule             : {Management WEB Consumer to Provider, Management WEB Provider to Consumer}

```

The output of this command returns a firewall section named exactly 'Management - Web Services'. Based on the output you can see that it is a Layer 3 section and that it has some rules associated with it. To find out more about the rules associated to with it we can use the Get-NsxFirewallRule.


```
PowerCLI C:\> Get-NsxFirewallSection 'Management - Web Services' | Get-NsxFirewallRule


id            : 1107
disabled      : false
logged        : false
name          : Management WEB Consumer to Provider
action        : allow
appliedToList : appliedToList
sectionId     : 1092
sources       : sources
destinations  : destinations
services      : services
direction     : inout
packetType    : any

id            : 1106
disabled      : false
logged        : false
name          : Management WEB Provider to Consumer
action        : allow
appliedToList : appliedToList
sectionId     : 1092
sources       : sources
destinations  : destinations
services      : services
direction     : inout
packetType    : any

```

The Powershell pipeline takes the object passed to it from `Get-NsxFirewallSection`, in this case, 'Management - Web Services' and uses it in the `Get-NsxFirewallRule` command. There are two rules associated with this section - ruleId 1106 and 1107.



### Creating new sections and rules

Time to create some new rules. Lets create a new section to keep them in.

```
PowerCLI C:\> New-NsxFirewallSection PowerNSX


id               : 1093
name             : PowerNSX
generationNumber : 1471567128948
timestamp        : 1471567128948
type             : LAYER3
```

Now this section will be used and passed along the pipeline to the `New-NsxFirewallRule` command. This example will use two pre-created security groups and store them in two variables. These variables can be used in Distributed Firewall rules.

```
PowerCLI C:\> $SGsource = Get-NsxSecurityGroup SG-SMTP-Servers
PowerCLI C:\> $SGdestination = Get-NsxSecurityGroup SG-NTP-Servers


PowerCLI C:\> Get-NsxFirewallSection PowerNSX | New-NsxFirewalLRule -name PowerNSX-Test-Rule -source $SGSource -destination $SGdestination -service $tcp123 -action "allow" -EnableLogging -Tag SMTP-Server-DFWTag


id            : 1027
disabled      : false
logged        : false
name          : PowerNSX
action        : allow
appliedToList : appliedToList
sectionId     : 1008
direction     : inout
packetType    : any
```

Lets walk through the above example. Using the two stored variables for source and destination, `Get-NsxFirewallSection` first retrieves the defined firewall section. It then passes the section object along the pipeline to `New-NsxFirewallRule`. `New-NsxFirewallRule` receives the object from the pipeline, and proceeds to create a rule within it. As well as passing in variables defining Source and Destination, you can also see we are specifying the service, action, logging status, and DFW tag.

The new rule is returned.

## Other examples?

It is possible to remove the Distributed Firewall filter using an Exclusion list. This example below shows the exemption of the VM Web-02

```
PowerCLI C:\> Get-VM Web-02 | Add-NsxFirewallExclusionListMember
PowerCLI C:\> Get-NsxFirewallExclusionListMember

Name                 PowerState Num CPUs MemoryGB
----                 ---------- -------- --------
web-02               PoweredOff 1        4.000

```

This will add the defined Virtual Machine to the DFW exclusion list.

## Need help?

For more examples please use `get-help` command preceding any PowerNSX function. Also use -detailed, -examples, or -full.
