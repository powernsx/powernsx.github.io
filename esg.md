---
permalink: /esg/
---

# Edge Services Gateway

The NSX Edge is a Virtual Machine that provides Routing, Edge Firewalling, Load Balancing, SSL VPN, IPSEC VPN, Bridging, and DHCP functions.  The NSX Edge represents a huge part of the NSX API due to its swiss army knife capabilities.  Most of the common features are supported by PowerNSX.

## Interface specification

To deploy a new Edge, we first have to build the Edge interface specification.

Lets create an uplink interface and store it in the $uplink variable.

```
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
```

Lets create an internal interface too.

```
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
```

Now to create a new compact NSX edge.

```
New-NsxEdge -Name PowerNSX -Datastore $ds -cluster $cluster -Username admin -Password VMware1!VMware1! -FormFactor compact -AutoGenerateRules -FwEnabled -Interface $uplink,$internal1
```

This will take some time as the OVA is deployed from NSX Manager to the defined cluster, datastore, and the Edge is started and configured by NSX. This example has also enabled the Edge Firewall and turned on AutoGenerateRules. Upon successful completion the newly created edge object is returned.

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

## Quick FW status validation

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

## Connected Interface Check

By default the NSX edge has 10 interfaces. When not used they are idle. When issuing a Get-NsxEdgeInterface command it will return all connected and disconnected interfaces.

It is possible to pipe the results and use Where-Object (?) to filter the output. The property isConnected is key here. `? {$_.isConnected -eq ("true")}` performs filtering on the property isConnected. It will return all Edge interfaces with the value of true in the isConnected property.

Using Where-Object (?) is a core PowerShell function.

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

## Routing with Edge

For routing configuration of the Edge, see the [Routing](/routing/) section.

## Need help?

For more examples please use get-help command preceding any PowerNSX function. Also use -detailed, -examples, or -full.
