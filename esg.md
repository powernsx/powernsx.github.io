---
layout: page
permalink: /esg/
---

## Edge Services Gateway

The NSX Edge is a Virtual Machine that provides Connectivity, Load Balancer, SSL VPN, IPSEC VPN, Bridging, DHCP, and routing functions.


The first step is to build the Edge interface specification.

First step will be to create an uplink interface and store it within the $uplink variable.

```
PowerCLI C:\> $uplink = New-NsxEdgeInterfaceSpec -Name Uplink -Type Uplink -ConnectedTo $pg -PrimaryAddress 192.1
68.100.140 -SubnetPrefixLength 24 -Index 0

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
```       

The variable uplink stores the newly created interface spec. Now to create a new compact NSX edge.

```
New-NsxEdge -Name PowerNSX -Datastore $ds -cluster $cluster -Username admin -Password VMware1!VMware1! -FormFactor compact -AutoGenerateRules -FwEnabled -Interface $uplink,$internal1
```

This will take some time as the OVA is deployed from NSX Manager to the defined cluster, datastore, and vNICs are created to the pre-created Specs. This example has also enabled the Edge Firewall and turned on AutoGenerateRules. Upon successful completion there is output of the newly created edge.

```
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
```

Here we can traverse the structure of the edge and find out more about it. Lets confirm the firewall is enabled like we specified.

### Quick FW status validation

```
$edge = Get-NsxEdge PowerNSX
$edge.features.firewall

version       : 1
enabled       : true
globalConfig  : globalConfig
defaultPolicy : defaultPolicy
firewallRules : firewallRules
```

Great! Firewall on the edge is enabled. 

### Connected Interface check

By default the NSX edge has 10 interfaces. When not used they are idle. When issuing a Get-NsxEdgeInterface command it will return all connected and disconnected interfaces. 

It is possible to pipe the results and use whereis (?) to filter the output. The property isConnected is key here. `? {$_.isConnected -eq ("true")}` performs filtering on the property isConnected. It will return all Edge interfaces with the value of true in the isConnected property.

Using Whereis (?) is a core PowerShell function.

```
PowerCLI C:\> get-nsxedge powernsx | Get-NsxEdgeInterface | ? {$_.isConnected -eq ("true")}


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
```


## Need help?

For more examples please use get-help command preceding any PowerNSX function. Also use -detailed, -examples, or -full.
