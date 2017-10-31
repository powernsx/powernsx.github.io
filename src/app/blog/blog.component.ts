
import {Component} from "@angular/core";

const BLOG_021216_WEBRESPONSE = `
PS C:\Users\Nick> Get-NsxTransportZone | New-NsxLogicalSwitch "LS1"
 invoke-nsxwebrequest : Invoke-NsxWebRequest : The NSX API response received indicates a failure. 400 : Bad Request : Response Body: <?xml version="1.0" encoding="UTF-8"?>
 <error><details>A controller is not available for this operation.</details><errorCode>836</errorCode><moduleName>core-services</moduleName></error>
 At C:\Program Files\Common Files\Modules\PowerNSX\PowerNSX.psm1:7191 char:21
 + ... $response = invoke-nsxwebrequest -method "post" -uri $URI -body $body ...
 +                 ~
     + CategoryInfo          : InvalidResult: (Invoke-NsxWebRequest:String) [Invoke-NsxWebRequest], InternalNsxApiException
     + FullyQualifiedErrorId : NsxAPIFailureResult,Invoke-NsxWebRequest
`;

const BLOG_021216_INVOKE = `
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
`;


const BLOG_031116_COPY = `
PS /> Get-NsxEdge ecmp-edge1 | Copy-NsxEdge

cmdlet Copy-NsxEdge at command pipeline position 2
Supply values for the following parameters:
Name: ecmp-edge7-copy
Password: VMware1!VMware1!
WARNING: IPSec PSK for site global set to BZ1A0icr.  Please update manually as required.
Enter new primary address for source edge addressgroup with existing IP 172.16.10.11 on vnic 0: 172.16.10.17
Enter new primary address for source edge addressgroup with existing IP 172.16.20.11 on vnic 1: 172.16.20.17
WARNING: Updating Router ID.  Previous ID : 172.16.10.11, Updated ID : 172.16.10.17
WARNING: Performing firewall fixups for any user based rules that contained local object references on edge-40.


id                : edge-40
version           : 2
status            : deployed
tenant            : default
name              : ecmp-edge7-copy
fqdn              : ecmp-edge7-copy
enableAesni       : true
enableFips        : false
vseLogLevel       : info
vnics             : vnics
appliances        : appliances
cliSettings       : cliSettings
features          : features
autoConfiguration : autoConfiguration
type              : gatewayServices
isUniversal       : false
hypervisorAssist  : false
queryDaemon       : queryDaemon
edgeSummary       : edgeSummary
`;

const BLOG_080916_RULES = `
PS /> Get-NsxFirewallSection | Get-NsxFirewallRule | Where-object { $_.logged -ne 'true' }

id            : 1148
disabled      : false
logged        : false
name          : DNS Consumer to Provider
action        : allow
appliedToList : appliedToList
sectionId     : 1115
sources       : sources
destinations  : destinations
services      : services
direction     : inout
packetType    : any
tag           : DnsCtP

id            : 1147
disabled      : false
logged        : false
name          : DNS Provider to Consumer
action        : allow
appliedToList : appliedToList
sectionId     : 1115
sources       : sources
destinations  : destinations
services      : services
direction     : inout
packetType    : any
tag           : DnsPtC
`;

const BLOG_080916_RULES_DISABLED = `
PS /> Get-NsxFirewallSection | Get-NsxFirewallRule | Where-object { $_.logged -ne 'true' } | Select id, name

id   name
--   ----
1148 DNS Consumer to Provider
1147 DNS Provider to Consumer
`;

const BLOG_080916_RULES_EXPORT = `
PS C:\> Get-NsxFirewallSection | Get-NsxFirewallRule | Where-object { $_.logged -ne 'true' } | Select id, name | export-csv c:\temp\nonloggedrules.csv
`;

@Component({
    selector: "blog",
    templateUrl: "./blog.component.html",
    host: {
        "id": "main-container",
        "[class.content-container]": "true"
    }
})
export class BlogComponent {

    constructor() {
    }

    public Blog021216WebReponse = BLOG_021216_WEBRESPONSE;
    public Blog021216Invoke = BLOG_021216_INVOKE;
    
    public Blog031116Copy = BLOG_031116_COPY;

    public Blog080916RulesExport = BLOG_080916_RULES_EXPORT;
    public Blog080916Rules= BLOG_080916_RULES;
    public Blog080916RulesDisabled = BLOG_080916_RULES_DISABLED;

}
