import {Component} from "@angular/core";

const NSX_AUTO_INSTALL_WINDOWS_V3 = `
'$Branch="v3";$url="https://raw.githubusercontent.com/vmware/powernsx/$Branch/PowerNSXInstaller.ps1"; try { $wc = new-object Net.WebClient;$scr = try { $wc.DownloadString($url)} catch { if ( $_.exception.innerexception -match "(407)") { $wc.proxy.credentials = Get-Credential -Message "Proxy Authentication Required"; $wc.DownloadString($url) } else { throw $_ }}; $scr | iex } catch { throw $_ }'
`;

const NSX_AUTO_INSTALL_WINDOWS_MASTER = `
'$Branch="v3";$url="https://raw.githubusercontent.com/vmware/powernsx/$Branch/PowerNSXInstaller.ps1"; try { $wc = new-object Net.WebClient;$scr = try { $wc.DownloadString($url)} catch { if ( $_.exception.innerexception -match "(407)") { $wc.proxy.credentials = Get-Credential -Message "Proxy Authentication Required"; $wc.DownloadString($url) } else { throw $_ }}; $scr | iex } catch { throw $_ }'
`;

const NSX_AUTO_INSTALL_MACLIN_V3 = `
$Branch="v3";$url="https://raw.githubusercontent.com/vmware/powernsx/$Branch/PowerNSXInstaller.ps1"; try { try { $response = Invoke-WebRequest -uri $url; $scr = $response.content } catch { if ( $_.exception.innerexception -match "(407)") { $credentials = Get-Credential -Message "Proxy Authentication Required"; $response = Invoke-WebRequest -uri $url -proxyCredential $credentials; $scr = $response.content } else { throw $_ }}; $scr | iex } catch { throw $_ }
`;

const NSX_AUTO_INSTALL_MACLIN_MASTER = `
$Branch="master";$url="https://raw.githubusercontent.com/vmware/powernsx/$Branch/PowerNSXInstaller.ps1"; try { try { $response = Invoke-WebRequest -uri $url; $scr = $response.content } catch { if ( $_.exception.innerexception -match "(407)") { $credentials = Get-Credential -Message "Proxy Authentication Required"; $response = Invoke-WebRequest -uri $url -proxyCredential $credentials; $scr = $response.content } else { throw $_ }}; $scr | iex } catch { throw $_ }
`;

const NSX_HELP_IPSET = `
PS /> Get-Help New-NsxIpSet

NAME
    New-NsxIpSet

SYNOPSIS
    Creates a new NSX IPSet.


SYNTAX
    New-NsxIpSet [-Name] <String> [[-Description] <String>] [[-IPAddress] <String[]>] [[-scopeId] <String>] [-Universal]
    [-EnableInheritance] [-ReturnObjectIdOnly] [[-Connection] <PSObject>] [<CommonParameters>]


DESCRIPTION
    An NSX IPSet is a grouping construct that allows for grouping of
    IP adresses, ranges and/or subnets in a sigle container that can
    be used either in DFW Firewall Rules or as members of a security
    group.

    This cmdlet creates a new IP Set with the specified parameters.

    IPAddress is a string that can contain 1 or more of the following
    separated by commas
    IP address: (eg, 1.2.3.4)
    IP Range: (eg, 1.2.3.4-1.2.3.10)
    IP Subnet: (eg, 1.2.3.0/24)


RELATED LINKS

REMARKS
    To see the examples, type: "get-help New-NsxIpSet -examples".
    For more information, type: "get-help New-NsxIpSet -detailed".
    For technical information, type: "get-help New-NsxIpSet -full".

`;

const NSX_HELP_IPSET_EXAMPLES = `
PS /> Get-Help New-NsxIpSet -Examples

NAME
    New-NsxIpSet

SYNOPSIS
    Creates a new NSX IPSet.

    -------------------------- EXAMPLE 1 --------------------------

    PS C:\>New-NsxIPSet -Name TestIPSet -Description "Testing IP Set Creation"

    -IPAddress "1.2.3.4,1.2.3.0/24"

    Creates a new IP Set in the scope globalroot-0.

    -------------------------- EXAMPLE 2 --------------------------

    PS C:\>New-NsxIPSet -Name UniversalIPSet -Description "Testing Universal"

    -IPAddress "1.2.3.4,1.2.3.0/24" -Universal

    Creates a new Universal IP Set.

    -------------------------- EXAMPLE 3 --------------------------

    PS C:\>New-NsxIPSet -Name EdgeIPSet -Description "Testing Edge IP Sets"

    -IPAddress "1.2.3.4,1.2.3.0/24" -scopeId edge-1

    Creates a new IP Set on the specified edge..

`;

const NSX_CONNECT_SSO = `
PS /> Connect-NsxServer -vCenterServer vc-01a.corp.local 
PowerShell credential request
vCenter Server SSO Credentials
User: administrator@vsphere.local
Password for user administrator@vsphere.local: ********

Version             : 6.3.1
BuildNumber         : 5124716
Credential          : System.Management.Automation.PSCredential
Server              : nsx-01a.corp.local
Port                : 443
Protocol            : https
ValidateCertificate : False
VIConnection        : vc-01a.corp.local
DebugLogging        : False
DebugLogfile        : \PowerNSXLog-administrator@vsphere.local@-2017_07_05_16_26_19.log
`;

const NSX_CONNECT_LOCAL = `
PS/> Connect-NsxServer -NsxServer 192.168.103.44 -Username admin -Password VMware1!

PowerNSX requires a PowerCLI connection to the vCenter server NSX is registered against for proper operation.
Automatically create PowerCLI connection to vc-01a.corp.local?
[Y] Yes  [N] No  [?] Help (default is "Y"): N

WARNING: Some PowerNSX cmdlets will not be fully functional without a valid PowerCLI connection to vCenter server vc-01a.corp.local

Version             : 6.3.1
BuildNumber         : 5124716
Credential          : System.Management.Automation.PSCredential
Server              : 192.168.103.44
Port                : 443
Protocol            : https
ValidateCertificate : False
VIConnection        :
DebugLogging        : False
DebugLogfile        : \PowerNSXLog-admin@10.35.255.155-2017_07_05_16_11_51.log

`;

const NSX_LS_GET = `
PS > Get-NsxTransportZone TZ1 | Get-NsxLogicalSwitch TSTransit


objectId              : virtualwire-222
objectTypeName        : VirtualWire
vsmUuid               : 4201BAC9-7509-46FD-7813-35D817ADB861
nodeId                : d704f7a1-e9c2-4c7c-bb5e-7116145905bf
revision              : 2
type                  : type
name                  : TSTransit
description           :
clientHandle          :
extendedAttributes    :
isUniversal           : false
universalRevision     : 0
tenantId              :
vdnScopeId            : vdnscope-1
vdsContextWithBacking : vdsContextWithBacking
vdnId                 : 5000
guestVlanAllowed      : false
controlPlaneMode      : UNICAST_MODE
ctrlLsUuid            : fef6c2f3-613e-4531-bd0b-5a74f27dfe43
macLearningEnabled    : false
`;

const NSX_LS_GET_SELECT = `
PS > Get-NsxTransportZone TZ1 | Get-NsxLogicalSwitch TSTransit | Select-Object Name, vdnscope,vdnid

name                                               vdnScopeId                                        vdnId
----                                               --------                                          -----
TSTransit                                          vdnscope-1                                        5000
`;

const NSX_LS_NEW = `
PS > Get-NsxTransportZone TZ1 | New-NsxLogicalSwitch -name PowerNSX


objectId              : virtualwire-227
objectTypeName        : VirtualWire
vsmUuid               : 4201BAC9-7509-46FD-7813-35D817ADB861
nodeId                : d704f7a1-e9c2-4c7c-bb5e-7116145905bf
revision              : 2
type                  : type
name                  : PowerNSX
description           :
clientHandle          :
extendedAttributes    :
isUniversal           : false
universalRevision     : 0
tenantId              :
vdnScopeId            : vdnscope-1
vdsContextWithBacking : vdsContextWithBacking
vdnId                 : 5005
guestVlanAllowed      : false
controlPlaneMode      : UNICAST_MODE
ctrlLsUuid            : e3c5d18c-7354-4068-8c93-32dda84b7cbb
macLearningEnabled    : false
`;

const NSX_LS_PG = `
PS > Get-NsxTransportZone TZ1 | get-nsxlogicalswitch PowerNSX | Get-NsxBackingPortGroup

Name                           NumPorts PortBinding
----                           -------- -----------
vxw-dvs-64-virtualwire-227-... 0        Static
`;

const NSX_LS_VM_ATTACH = `
PS > Get-Vm web-01 | Connect-NsxLogicalSwitch $ls1

PS > Get-Vm Web-01 | Get-NetworkAdapter | select NetworkName

NetworkName
-----------
vxw-dvs-48-virtualwire-1-sid-5000-Web`;
const NSX_LS_VM_DETACH = `
PS > Get-Vm Web-01 | Disconnect-NsxLogicalSwitch

Disconnecting web-01's network adapter from a logical switch will cause network
 connectivity loss.
Proceed with disconnection?
[Y] Yes  [N] No  [?] Help (default is "N"): Y
PS >
`;
const NSX_LS_REMOVE = `
PS > Get-NsxLogicalSwitch -name Uplink | Remove-NsxLogicalSwitch

Logical Switch removal is permanent.
Proceed with removal of Logical Switch Uplink?
[Y] Yes  [N] No  [?] Help (default is "N"): Y
`;



const NSX_DLR_LIF = `
$dlruplink = New-NsxLogicalRouterInterfaceSpec -type Uplink -Name Uplink -ConnectedTo $TransitLs -PrimaryAddress 172.16.1.6 -SubnetPrefixLength 24

name          : Uplink
type          : Uplink
mtu           : 1500
isConnected   : True
connectedToId : virtualwire-56
addressGroups : addressGroups
`;

const NSX_DLR_DEPLOY = `
New-NsxLogicalRouter -Name DLR -ManagementPortGroup $ls5 -Cluster $cl -Datastore $ds -Tenant "PEPSI" -Interface $weblif,$applif,$dblif

id                : edge-1
version           : 2
status            : deployed
tenant            : PEPSI
name              : DLR
fqdn              : NSX-edge-1
enableAesni       : true
enableFips        : false
vseLogLevel       : info
appliances        : appliances
cliSettings       : cliSettings
features          : features
autoConfiguration : autoConfiguration
type              : distributedRouter
isUniversal       : false
mgmtInterface     : mgmtInterface
interfaces        : interfaces
edgeAssistId      : 5000
lrouterUuid       : 65e4d92e-2109-4b9f-a11e-720235765d7c
queryDaemon       : queryDaemon
edgeSummary       : edgeSummary
`;

const NSX_DLR_APPEND_LIF = `
PS > Get-NsxLogicalRouter DLR | New-NsxLogicalRouterInterface -Name DMZ
-Type internal -ConnectedTo $LSDMZ -PrimaryAddress 10.3.3.1 -SubnetPrefixLength 24
`;

const NSX_DLR_REMOVE_LIF = `
PS > Get-NsxLogicalRouter DLR | Get-NsxLogicalRouterInterface -Name DMZ
| Remove-NsxLogicalRouterInterface

Interface interface 13 will be deleted.
Proceed with deletion of interface 13?
[Y] Yes  [N] No  [?] Help (default is "N"): y
`;

const NSX_DLR_REMOVE = `
PS > Get-NsxLogicalRouter DLR | Remove-NsxLogicalRouter

Logical Router removal is permanent.
Proceed with removal of Logical Router DLR?
[Y] Yes  [N] No  [?] Help (default is "N"): y
`;

const NSX_DLR_OSPF = `
PS /> Get-NsxLogicalRouter DLR | Get-NsxLogicalRouterRouting | Set-NsxLogicalRouterRouting -EnableOspf -EnableOspfRouteRedistribution -RouterId $DlrUplinkPrimaryAddress -ProtocolAddress $DlrUplinkProtocolAddress -ForwardingAddress $LdrUplinkPrimaryAddress -confirm:$false

version             : 2                                                                                          
enabled             : true
routingGlobalConfig : routingGlobalConfig
staticRouting       : staticRouting
ospf                : ospf
logicalrouterId     : edge-6
`;

const NSX_DLR_OSPF_AREA = `
PS />   Get-NsxLogicalRouter DLR | Get-NsxLogicalRouterRouting | New-NsxLogicalRouterOspfArea -AreaId $TransitOspfAreaId -Type normal -confirm:$false 

areaId type   authentication logicalrouterId
------ ----   -------------- --------------- 
 0      normal authentication edge-6
`;

const NSX_DLR_OSPF_INTERFACE = `
PS /> Get-NsxLogicalRouter DLR | Get-NsxLogicalRouterRouting | New-NsxLogicalRouterOspfInterface -AreaId 0 -vNic $DlrUplink.index -confirm:$false

vnic            : 2                                                                                              
areaId          : 0
helloInterval   : 10
deadInterval    : 40
priority        : 128
mtuIgnore       : false
logicalrouterId : edge-6
`;

const NSX_DLR_BGP = `
PS /> Get-NsxLogicalRouter DLR | Get-NsxLogicalRouterRouting | Set-NsxLogicalRouterRouting -EnableBgp -ProtocolAddress 172.16.1.3  -ForwardingAddress 172.16.1.2 -LocalAS 100 -RouterId 172.16.1.3 -confirm:$false
                                                                                                                                     
version             : 2                                                                               
enabled             : true
routingGlobalConfig : routingGlobalConfig
staticRouting       : staticRouting
ospf                : ospf
bgp                 : bgp
logicalrouterId     : edge-9
`;

const NSX_DLR_BGP_NEIGHBOR = `
PS /> Get-NsxLogicalRouter DLR | Get-NsxLogicalRouterRouting | New-NsxLogicalRouterBgpNeighbour -IpAddress 172.16.1.1 -RemoteAS 200 -ForwardingAddress 172.16.1.2 -confirm:$false -ProtocolAddress 172.16.1.3

ipAddress         : 172.16.1.1
protocolAddress   : 172.16.1.3
forwardingAddress : 172.16.1.2
remoteAS          : 200
remoteASNumber    : 200
weight            : 60
holdDownTimer     : 180
keepAliveTimer    : 60
bgpFilters        :
logicalrouterId   : edge-9
`;

const NSX_DLR_BGP_REDIST = `
PS /> Get-NsxLogicalRouter DLR | Get-NsxLogicalRouterRouting | Set-NsxLogicalRouterRouting -EnableBgpRouteRedistribution -confirm:$false

version             : 3
enabled             : true
routingGlobalConfig : routingGlobalConfig
staticRouting       : staticRouting
ospf                : ospf
bgp                 : bgp
logicalrouterId     : edge-9
`;

const  NSX_DLR_BGP_REDIST_CONN = `
PS /> Get-NsxLogicalRouter DLR | Get-NsxLogicalRouterRouting | New-NsxLogicalRouterRedistributionRule -FromConnected -Learner bgp -confirm:$false
`;

const NSX_XVC_PROMOTE_MANAGER = `
PS /> Set-NsxManagerRole -Role Primary

role
----
PRIMARY
`;

const NSX_XVC_IPSET_BOTH = `
PS /> Get-NsxSecurityGroup -name Test | select name, objectid, isUniversal

name objectId                                           isUniversal
---- --------                                           -----------
TEST securitygroup-10                                   false
TEST securitygroup-58b55a56-e0ee-42f6-8ee8-437902429047 true
`;

const NSX_SEC_GROUP_CREATE = `
PS /> $Tag = Get-NsxSecurityTag PowerNSX-Tag

PS /> New-NsxSecurityGroup PowerNSX-SG -Description 'SG for PowerNSX-Tag VMs' -IncludeMember $tag


objectId           : securitygroup-505
objectTypeName     : SecurityGroup
vsmUuid            : 42011E64-766E-616B-0401-5C68CF27B466
nodeId             : 0509160a-0cfb-4cc2-811a-3193e8b45b95
revision           : 2
type               : type
name               : PowerNSX-SG
description        : SG for PowerNSX-Tag VMs
scope              : scope
clientHandle       :
extendedAttributes :
isUniversal        : false
universalRevision  : 0
inheritanceAllowed : false
member             : member
`;

const NSX_SEC_GROUP_GET = `
PS /> Get-NsxSecurityGroup | select name, objectid | ft -auto

name                        objectId
----                        --------
SG-Provider-NTP             securitygroup-493
SG-Consumer-Internal-SSH    securitygroup-503
SG-Consumer-DNS             securitygroup-498
SG-Provider-Internal-RDP    securitygroup-494
SG-NSX-Components           securitygroup-480
SG-Consumer-Internal-RDP    securitygroup-502
SG-SDDC-Management-Internal securitygroup-486
SG-Provider-SMTP            securitygroup-491
SG-SMTP-Servers             securitygroup-484
SG-LogInsight-Cluster       securitygroup-477
PowerNSX-SG                 securitygroup-505
SG-Provider-Internal-Web    securitygroup-496
SG-Provider-Syslog          securitygroup-492
SG-vSphere-Hosts            securitygroup-479
SG-Consumer-Internal-Web    securitygroup-504
SG-DNS-Servers              securitygroup-481
SG-NTP-Servers              securitygroup-483
SG-AD-Servers               securitygroup-482
SG-vCenter-Appliances       securitygroup-478
SG-Consumer-Syslog          securitygroup-500
SG-DHCP-Servers             securitygroup-485
SG-Provider-DNS             securitygroup-490
SG-Consumer-SMTP            securitygroup-499
SG-Provider-Internal-SSH    securitygroup-495
SG-Provider-ActiveDirectory securitygroup-489
SG-Consumer-NTP             securitygroup-501
SG-Linux-Corporate          securitygroup-488
SG-Windows-Corporate        securitygroup-487
SG-Consumer-ActiveDirectory securitygroup-497
`;

const NSX_SEC_TAG_APPLY_VM = `
PS /> Get-VM -name web-01 | New-NsxSecurityTagAssignment -ApplyTag $tag

PS /> Get-VM -name web-01 | Get-NsxSecurityTagAssignment

SecurityTag                                                    VirtualMachine
-----------                                                    --------------
securityTag                                                          web-01
`;

const NSX_SEC_TAG_CREATE = `
PS /> New-NsxSecurityTag PowerNSX-Tag


objectId           : securitytag-329
objectTypeName     : SecurityTag
vsmUuid            : 42011E64-766E-616B-0401-5C68CF27B466
nodeId             : 0509160a-0cfb-4cc2-811a-3193e8b45b95
revision           : 0
type               : type
name               : PowerNSX-Tag
clientHandle       :
extendedAttributes :
isUniversal        : false
universalRevision  : 0
systemResource     : false
vmCount            : 0
`;

const NSX_SEC_TAG_GET = `
PS /> Get-NsxSecurityTag

objectId           : securitytag-12
objectTypeName     : SecurityTag
vsmUuid            : 4201AC5A-6520-7054-AC84-355C8F41B87D
nodeId             : 5dfd8b86-9dbe-4bae-93e7-f6f73105f403
revision           : 0
type               : type
name               : ST-PowerNSX
clientHandle       :
extendedAttributes :
isUniversal        : false
universalRevision  : 0
systemResource     : false
vmCount            : 0
`;

const NSX_SEC_SERVICE_CREATE = `
PS /> New-NsxService -name 'tcp-666' -protocol tcp -port 666


objectId           : application-1404
objectTypeName     : Application
vsmUuid            : 42011E64-766E-616B-0401-5C68CF27B466
nodeId             : 0509160a-0cfb-4cc2-811a-3193e8b45b95
revision           : 1
type               : type
name               : tcp-666
description        :
scope              : scope
clientHandle       :
extendedAttributes :
isUniversal        : false
universalRevision  : 0
inheritanceAllowed : false
element            : element
`;

const NSX_SEC_SERVICEGROUP_CREATE = `
PS />  New-NsxServiceGroup SVG-PowerNSX


objectId           : applicationgroup-311
objectTypeName     : ApplicationGroup
vsmUuid            : 42011E64-766E-616B-0401-5C68CF27B
nodeId             : 0509160a-0cfb-4cc2-811a-3193e8b45
revision           : 1
type               : type
name               : SVG-PowerNSX
description        :
scope              : scope
clientHandle       :
extendedAttributes :
isUniversal        : false
universalRevision  : 0
inheritanceAllowed : false
`;

const NSX_SEC_SERVICEGROUP_ADDMEMBER = `
PS /> $Service1 = Get-NsxService tcp-80
PS /> $Service2 = Get-NsxService tcp-443

PS /> Get-NsxServiceGroup SVG-PowerNSX | Add-NsxServiceGroupMember $Service1, $Service2

`;

const NSX_SEC_SERVICEGROUP_GETMEMBER = `
PS /> Get-NsxServiceGroup SVG-PowerNSX | Get-NsxServiceGroupMember


  objectId           : application-413
  objectTypeName     : Application
  vsmUuid            : 42019B98-63EC-995F-6CBB-FF738D027F92
  nodeId             : 0dd7c0dd-a194-4df1-a14b-56a1617c2f0f
  revision           : 2
  type               : type
  name               : tcp-80
  scope              : scope
  clientHandle       :
  extendedAttributes :
  isUniversal        : false
  universalRevision  : 0

  objectId           : application-290
  objectTypeName     : Application
  vsmUuid            : 42019B98-63EC-995F-6CBB-FF738D027F92
  nodeId             : 0dd7c0dd-a194-4df1-a14b-56a1617c2f0f
  revision           : 2
  type               : type
  name               : tcp-443
  scope              : scope
  clientHandle       :
  extendedAttributes :
  isUniversal        : false
  universalRevision  : 0
`;

const NSX_DFW_SECTION_GET = `
PS /> Get-NsxFirewallSection 'Management - Web Services'


id               : 1092
name             : Management - Web Services
generationNumber : 1471504507962
timestamp        : 1471504507962
type             : LAYER3
rule             : {Management WEB Consumer to Provider, Management WEB Provider to Consumer}
`;

const NSX_DFW_RULE_GET = `
PS /> Get-NsxFirewallSection 'Management - Web Services' | Get-NsxFirewallRule


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
`;

const NSX_DFW_SECTION_CREATE = `
PS /> New-NsxFirewallSection PowerNSX


id               : 1093
name             : PowerNSX
generationNumber : 1471567128948
timestamp        : 1471567128948
type             : LAYER3
`;

const NSX_DFW_RULE_CREATE = `
PS /> $SGsource = Get-NsxSecurityGroup SG-SMTP-Servers
PS /> $SGdestination = Get-NsxSecurityGroup SG-NTP-Servers


PS /> Get-NsxFirewallSection PowerNSX | New-NsxFirewalLRule -name PowerNSX-Test-Rule -source $SGSource -destination $SGdestination -service $tcp123 -action "allow" -EnableLogging -Tag SMTP-Server-DFWTag


id            : 1027
disabled      : false
logged        : false
name          : PowerNSX
action        : allow
appliedToList : appliedToList
sectionId     : 1008
direction     : inout
packetType    : any
`;

const NSX_DFW_EXCLUSION = `
PS /> Get-VM Web-02 | Add-NsxFirewallExclusionListMember

PS /> Get-NsxFirewallExclusionListMember

Name                 PowerState Num CPUs MemoryGB
----                 ---------- -------- --------
web-02               PoweredOff 1        4.000
`;

const NSX_LB_MONITOR = `
PS /> $ManMon = Get-NsxEdge PowerNSX | Get-NsxLoadBalancer | New-NsxLoadBalancerMonitor -Name MN-vRA-Manager -TypeHttps -interval 10 -timeout 10 -MaxRetries 3 -Method "GET"  -Url '/VMPSProvision' -receive 'ProvisionService'


monitorId  : monitor-4
type       : https
interval   : 10
timeout    : 10
maxRetries : 3
method     : GET
url        : /VMPSprovision
name       : MN-vRA-Manager
receive    : ProvisionService
edgeId     : edge-21
`;

const NSX_LB_VIRTUAL = `
PS /> Get-NsxEdge PowerNSX | Get-NsxLoadBalancer | Add-NsxLoadBalancerVip -name Web-VIP -Description Web-VIP -ipaddress 192.168.100.140 -Protocol TCP -Port 80 -ApplicationProfile $AP -DefaultPool $WebPool -AccelerationEnabled


version                : 11
enabled                : true
enableServiceInsertion : false
accelerationEnabled    : false
virtualServer          : virtualServer
pool                   : pool
applicationProfile     : applicationProfile
monitor                : {default_tcp_monitor, default_http_monitor, default_https_monitor}
logging                : logging
edgeId                 : edge-21
`;

const NSX_LB_APP = `
PS /> Get-NsxEdge PowerNSX | Get-NsxLoadBalancer | New-NsxLoadBalancerApplicationProfile -Name AP-Web  -Type HTTP


applicationProfileId : applicationProfile-1
name                 : AP-Web
insertXForwardedFor  : false
sslPassthrough       : false
template             : HTTP
serverSslEnabled     : false
edgeId               : edge-21
`;

const NSX_LB_ENABLE = `
PS /> Get-NsxEdge PowerNSX | Get-NsxLoadBalancer | Set-NsxLoadBalancer -Enabled -EnableLogging


version                : 3
enabled                : true
enableServiceInsertion : false
accelerationEnabled    : false
monitor                : {default_tcp_monitor, default_http_monitor, default_https_monitor}
logging                : logging
edgeId                 : edge-21
`;

const NSX_LB_POOL = `
PS /> $wpm1 = New-NsxLoadBalancerMemberSpec -name Web01 -IpAddress 10.0.1.11 -Port 80
PS /> $wpm2 = New-NsxLoadBalancerMemberSpec -name Web02 -IpAddress 10.0.1.12 -Port 80
PS /> $wpm3 = New-NsxLoadBalancerMemberSpec -name Web03 -IpAddress 10.0.1.13 -Port 80

PS /> Get-NsxEdge PowerNSX | Get-NsxLoadBalancer | New-NsxLoadBalancerPool -Name WebPool -Description "Pool for Web Servers" -Monitor $Monitor -Algorithm round-robin -MemberSpec $wpm1,$wpm2,$wpm3

poolId      : pool-1
name        : WebPool
description : Pool for Web Servers
algorithm   : round-robin
transparent : false
monitorId   : monitor-2
member      : {Web01, Web02, Web03}
edgeId      : edge-21
`;

const NSX_DLR_STATIC = `
PS /> Get-NsxLogicalRouter LogicalRouter01 | Get-NsxLogicalRouterRouting | New-NsxLogicalRouterStaticRoute -Network 1.1.1.0/24 -NextHop 10.0.0.200
`;

const NSX_ESG_STATIC = `
PS /> Get-NsxEdge Edge01 | Get-NsxEdgeRouting | New-NsxEdgeStaticRoute -Network 1.1.1.0/24 -NextHop 10.0.0.200
`;

const NSX_ESG_INTERFACE = `
PowerCLI C:\> $uplink = New-NsxEdgeInterfaceSpec -Name Uplink -Type Uplink -ConnectedTo $pg -PrimaryAddress 192.168.100.140 -SubnetPrefixLength 24 -Index 0

PowerCLI C:\> $uplink

name                : Uplink
index               : 0
type                : Uplink
mtu                 : 1500
enableProxyArp      : False
enableSendRedirects : True
isConnected         : True
portgroupId         : dvportgroup-36
addressGroups       : addressGroups

PowerCLI C:\> $internal1 = New-NsxEdgeInterfaceSpec -Name Internal -Type Internal -ConnectedTo $pg2 -PrimaryAddress 172.16.1.1 -SubnetPrefixLength 24 -Index 0

PowerCLI C:\> $internal1

name                : Internal
index               : 0
type                : Internal
mtu                 : 1500
enableProxyArp      : False
enableSendRedirects : True
isConnected         : True
portgroupId         : dvportgroup-23
addressGroups       : addressGroups
`;

const NSX_ESG_DEPLOY = `
PS /> New-NsxEdge -Name PowerNSX -Datastore $ds -cluster $cluster -Username admin -Password VMware1!VMware1! -FormFactor compact -AutoGenerateRules -FwEnabled -Interface $uplink,$internal1

id                : edge-21
version           : 1
status            : deployed
tenant            : default
name              : PowerNSX
fqdn              : PowerNSX
enableAesni       : true
enableFips        : false
vseLogLevel       : info
vnics             : vnics
appliances        : appliances
cliSettings       : cliSettings
features          : features
autoConfiguration : autoConfigurat
type              : gatewayService
isUniversal       : false
hypervisorAssist  : false
queryDaemon       : queryDaemon
edgeSummary       : edgeSummary
`;

const NSX_ESG_INTERFACE_VALIDATE = `
PowerCLI C:\> Get-NsxEdge powernsx | Get-NsxEdgeInterface | ? {$_.isConnected -eq ("true")}


label               : vNic_0
name                : Uplink
addressGroups       : addressGroups
mtu                 : 1500
type                : internal
isConnected         : true
index               : 0
portgroupId         : dvportgroup-36
portgroupName       : Internal
enableProxyArp      : false
enableSendRedirects : true
edgeId              : edge-21

label               : vNic_1
name                : Internal
addressGroups       : addressGroups
mtu                 : 1500
type                : internal
isConnected         : true
index               : 1
portgroupId         : dvportgroup-232
portgroupName       : Test
enableProxyArp      : false
enableSendRedirects : true
edgeId              : edge-21
`;

const NSX_ESG_BGP = `
PS /> Get-NsxEdge Edge01 | Get-NsxEdgeRouting | Get-NsxEdgeBgp | Set-NsxEdgeBgp -enabled -localAs 100 -routerId 192.168.103.110 -GracefulRestart
`;

const NSX_ESG_BGP_NEIGHBOR = `
PS /> Get-NsxEdge | Get-NsxEdgeRouting | New-NsxEdgeBgpNeighbour -IpAddress 1.2.3.4 -RemoteAS 22235 -Confirm:$false
-Weight 90 -HoldDownTimer 240 -KeepAliveTimer 90 -confirm:$false
`;

const NSX_ESG_OSPF = `
Get-NsxEdge Edge01 | Get-NsxEdgeRouting | Get-NsxEdgeOspf | Set-NsxEdgeOspf -enableOspf -RouterId 192.168.103.110
`;

const NSX_ESG_OSPF_AREA = `
PS /> Get-NsxEdge Edge01 | Get-NsxEdgeRouting | New-NsxEdgeOspfArea -AreaId 50
`;

const NSX_ESG_OSPF_INTERFACE = `
PS /> Get-NsxEdge Edge01 | Get-NsxEdgeRouting | New-NsxEdgeOspfInterface -AreaId 50 -Vnic 0
`;

const NSX_CONTRIBUTE_TEST = `
Import-Module tests/Test.Psd1
Start-Test
`;

const NSX_CONTRIBUTE_TEST_CORE = `
Import-Module tests/TestCore.Psd1
Start-Test
`;

const NSX_XVC_TZ_CREATE = `
PS /> New-NsxTransportZone -Name UTZ -Universal -Cluster $cl -ControlPlaneMode UNICAST_MODE


objectId           : universalvdnscope
objectTypeName     : VdnScope
vsmUuid            : 4201AC5A-6520-7054-AC84-355C8F41B87D
nodeId             : 5dfd8b86-9dbe-4bae-93e7-f6f73105f403
revision           : 0
type               : type
name               : UTZ
clientHandle       :
extendedAttributes :
isUniversal        : true
universalRevision  : 0
id                 : universalvdnscope
clusters           : clusters
virtualWireCount   : 0
controlPlaneMode   : UNICAST_MODE
cdoModeEnabled     : false
`;


const NG_MODULE_EXAMPLE = `
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ClarityModule } from "clarity-angular";
import { AppComponent } from "./app.component";

@NgModule({
    imports: [
        BrowserModule,
        ClarityModule.forRoot(),
        ...
     ],
     declarations: [ AppComponent ],
     bootstrap: [ AppComponent ]
})
export class AppModule {    }
`;

const ICONS_IMPORTS = `
<link rel="stylesheet" href="path/to/node_modules/clarity-icons/clarity-icons.min.css">
<script src="path/to/node_modules/@webcomponents/custom-elements/custom-elements.min.js"></script>
<script src="path/to/node_modules/clarity-icons/clarity-icons.min.js"></script>
`;

const ICONS_NODE_IMPORTS = `
"styles": [
      ...
      "../node_modules/clarity-icons/clarity-icons.min.css",
      ...
],
"scripts": [
  ...
  "../node_modules/mutationobserver-shim/dist/mutationobserver.min.js",
  "../node_modules/@webcomponents/custom-elements/custom-elements.min.js",
  "../node_modules/clarity-icons/clarity-icons.min.js"
  ...
]
`;

const ICONS_TS_IMPORTS = `
import 'clarity-icons';
import 'clarity-icons/shapes/essential-shapes';
`;

const UI_HTML_IMPORT = `
<link rel="stylesheet" href="path/to/node_modules/clarity-ui/clarity-ui.min.css">
`;

const UI_NODE_IMPORTS = `
"styles": [
      ...
      "../node_modules/clarity-ui/clarity-ui.min.css",
      ...
  ]
`;

@Component({
    selector: "get-started",
    templateUrl: "./get-started.component.html",
    host: {
        "id": "main-container",
        "[class.content-container]": "true"
    }
})
export class GetStartedComponent {

    constructor() {
    }

    public ngModuleExample = NG_MODULE_EXAMPLE;
    public iconsImportsExample = ICONS_IMPORTS;
    public iconsNodeImports = ICONS_NODE_IMPORTS;
    public iconsTSImports = ICONS_TS_IMPORTS;
    public uiHTMLImport = UI_HTML_IMPORT;
    public uiNodeImports = UI_NODE_IMPORTS;
    public nsxAutoInstallWindowsMaster = NSX_AUTO_INSTALL_WINDOWS_MASTER;
    public nsxAutoInstallWindowsV3 = NSX_AUTO_INSTALL_WINDOWS_V3;
    public nsxAutoInstallMaclinMaster = NSX_AUTO_INSTALL_MACLIN_MASTER;
    public nsxAutoInstallMaclinV3 = NSX_AUTO_INSTALL_MACLIN_V3;
    public nsxHelpIpset = NSX_HELP_IPSET;
    public nsxHelpIpsetExamples = NSX_HELP_IPSET_EXAMPLES;
    public nsxConnectSso = NSX_CONNECT_SSO;
    public nsxConnectLocal = NSX_CONNECT_LOCAL;
    public nsxLsGet = NSX_LS_GET;
    public nsxLsGetSelect = NSX_LS_GET_SELECT;
    public nsxLsNew = NSX_LS_NEW;
    public nsxLsPg = NSX_LS_PG;
    public nsxLsVmAttach = NSX_LS_VM_ATTACH;
    public nsxLsVmDetach = NSX_LS_VM_DETACH;
    public nsxLsRemove = NSX_LS_REMOVE;
    public nsxDlrLif = NSX_DLR_LIF;
    public nsxDlrDeploy = NSX_DLR_DEPLOY;
    public nsxDlrAppendLif = NSX_DLR_APPEND_LIF;
    public nsxDlrRemoveLif = NSX_DLR_REMOVE_LIF;
    public nsxDlrRemove =  NSX_DLR_REMOVE;
    public nsxDlrBgp = NSX_DLR_BGP;
    public nsxDlrBgpNeighbor = NSX_DLR_BGP_NEIGHBOR;
    public nsxDlrBgpRedist = NSX_DLR_BGP_REDIST;
    public nsxDlrBgpRedistConn = NSX_DLR_BGP_REDIST_CONN;
    public nsxDlrOspf = NSX_DLR_OSPF;
    public nsxDlrOspfInterface = NSX_DLR_OSPF_INTERFACE;
    public nsxDlrOspfArea = NSX_DLR_OSPF_AREA;
    public nsxXvcPromMan = NSX_XVC_PROMOTE_MANAGER;
    public nsxXvcIpsetBoth = NSX_XVC_IPSET_BOTH;
    public nsxSecTagCreate = NSX_SEC_TAG_CREATE;
    public nsxSecTagGet = NSX_SEC_TAG_GET;
    public nsxSecGroupGet = NSX_SEC_GROUP_GET;
    public nsxSecTagApplyVM = NSX_SEC_TAG_APPLY_VM;
    public nsxSecGroupCreate = NSX_SEC_GROUP_CREATE;
    public nsxSecServiceCreate = NSX_SEC_SERVICE_CREATE;
    public nsxSecServiceGroupCreate = NSX_SEC_SERVICEGROUP_CREATE;
    public nsxSecServiceGroupMember = NSX_SEC_SERVICEGROUP_GETMEMBER;
    public nsxSecServiceGroupAddMember = NSX_SEC_SERVICEGROUP_ADDMEMBER;
    public nsxDfwSectionGet = NSX_DFW_SECTION_GET;
    public nsxDfwRuleGet = NSX_DFW_RULE_GET;
    public nsxDfwRuleCreate = NSX_DFW_RULE_CREATE;
    public nsxDfwSectionCreate = NSX_DFW_SECTION_CREATE;
    public nsxDfwExclusion = NSX_DFW_EXCLUSION;
    public nsxLbApp = NSX_LB_APP;
    public nsxLbEnable = NSX_LB_ENABLE;
    public nsxLbMon = NSX_LB_MONITOR;
    public nsxLbPool = NSX_LB_POOL;
    public nsxLbVip = NSX_LB_VIRTUAL;
    public nsxDlrStatic = NSX_DLR_STATIC;
    public nsxEsgStatic = NSX_ESG_STATIC;
    public nsxEsgInterface = NSX_ESG_INTERFACE;
    public nsxEsgInterfaceValidate = NSX_ESG_INTERFACE_VALIDATE;
    public nsxEsgDeploy = NSX_ESG_DEPLOY;
    public nsxEsgBgp =  NSX_ESG_BGP;
    public nsxEsgBgpNeighbor = NSX_ESG_BGP_NEIGHBOR;
    public nsxEsgOspf = NSX_ESG_OSPF;
    public nsxEsgOspfArea = NSX_ESG_OSPF_AREA;
    public nsxEsgOspfInterface = NSX_ESG_OSPF_INTERFACE;
    public nsxContributeTest = NSX_CONTRIBUTE_TEST;
    public nsxContributeTestCore = NSX_CONTRIBUTE_TEST_CORE;
    public nsxXvcTzCreate = NSX_XVC_TZ_CREATE;
}
