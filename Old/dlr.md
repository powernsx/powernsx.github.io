---
permalink: /dlr/
---

# Distributed Logical Router

The NSX DLR allows for Layer 3 forwarding decisions to occur within the hypervisor. This provides East west routing as well as north bound routing with an NSX Edge Gateway.

## Defining LIF Specs

Defining Logical Interfaces (LIFs) on a DLR individually is basically the same process as it is for the NSX Edge.  Each individual interface can be pre-configured using the `New-NsxLogicalRouterInterfaceSpec` cmdlet. This allows Logical Interfaces or LIFs to be defined ahead of creation of the DLS.  At least one LIF is required on initial deployment of DLR control VM. The below example defines an uplink LIF and then deploys the DLR control VM to the defined Cluster.

```
$ldruplink = New-NsxLogicalRouterInterfaceSpec -type Uplink -Name Uplink -ConnectedTo $TransitLs -PrimaryAddress 172.16.1.6 -SubnetPrefixLength 24

name          : Uplink
type          : Uplink
mtu           : 1500
isConnected   : True
connectedToId : virtualwire-56
addressGroups : addressGroups
```

Note:  All this cmdlet is doing is defining the correct XML for the subsequent `New-NsxLogicalRouter` cmdlet.  The NSX API is _not_ contacted when using the `New-NsxLogicalRouterInterfaceSpec` cmdlet. has created the details for the LIF.

## Instantiating a new DLR

An arbitrary number of pre-configured LIFs created with `New-NsxLogicalRouterInterfaceSpec` and stored as variables can then be used when creating a new DLR.  If you have more than one interface to specify, do so as a comma separated list argument to the -Interface parameter of the `New-NsxLogicalRouter` cmdlet.

New-NsxLogicalRouter -name dlr -PowerNSX -ManagementPortGroup $mgmtls -interface $ldruplink -cluster $cluster -datastore $ds

id                : edge-22
version           : 2
status            : deployed
tenant            : default
name              : DLR-PowerNSX
fqdn              : NSX-edge-22
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
edgeAssistId      : 5001
lrouterUuid       : fd0d65f1-73a0-4ad7-a969-1d263f8132d1
queryDaemon       : queryDaemon
edgeSummary       : edgeSummary
```

With the DLR deployed an administrator can use `Get-NsxLogicalRouter PowerNSX` to retrieve the LogicalRouter object. Storing it in a variable will allow inspection of the resulting object.

```
PowerCLI C:\> $dlr = Get-NsxLogicalRouter PowerNSX
PowerCLI C:\> $dlr.interfaces.interface


label           : 138900000002/vNic_2
name            : Uplink
addressGroups   : addressGroups
mtu             : 1500
type            : uplink
isConnected     : true
isSharedNetwork : false
index           : 2
connectedToId   : virtualwire-56
connectedToName : transitls
```

With the ability to confirm existing interfaces by the above method (or by using the shorthand `$dlr | Get-LogicalRouterInterfaces`) lets append a few more interfaces.

## Adding additional interfaces to an existing Logical Router

Here we are going to add two new interfaces to our DLR on newly created Logical Switches (Because networks are free in NSX! :))

Our first step will be to create new Logical Switches, and then use the `New-NsxLogicalRouterInterface` cmdlet to add them to the recently created DLR.

```
$Ls1 = Get-NsxTransportZone TZ1 | New-NsxLogicalSwitch -Name Ls1
$Ls2 = Get-NsxTransportZone TZ1 | New-NsxLogicalSwitch -Name Ls2
Get-NsxLogicalRouter dlr | New-NsxLogicalRouterInterface -Type Internal -name "Lif1"  -ConnectedTo $LS1 -PrimaryAddress "1.1.1.1" -SubnetPrefixLength 24
Get-NsxLogicalRouter dlr | New-NsxLogicalRouterInterface -Type Internal -name "Lif2"  -ConnectedTo $LS2 -PrimaryAddress "2.2.2.1" -SubnetPrefixLength 24
```

Lets validate the newly created interfaces with the `Get-NsxLogicalRouterInterface` cmdlet.

_Note: Remember to 're-get' the DLR so the updated definition is retreived from the API._

```
PowerCLI C:\> Get-NsxLogicalRouter dlr | Get-NsxLogicalRouterInterface

label           : 138900000002/vNic_2
name            : Uplink
addressGroups   : addressGroups
mtu             : 1500
type            : uplink
isConnected     : true
isSharedNetwork : false
index           : 2
connectedToId   : virtualwire-56
connectedToName : transitls
logicalRouterId : edge-22

label           : 13890000000a
name            : Lif1
addressGroups   : addressGroups
mtu             : 1500
type            : internal
isConnected     : true
isSharedNetwork : false
index           : 10
connectedToId   : virtualwire-57
connectedToName : LS1
logicalRouterId : edge-22

label           : 13890000000a
name            : Lif2
addressGroups   : addressGroups
mtu             : 1500
type            : internal
isConnected     : true
isSharedNetwork : false
index           : 10
connectedToId   : virtualwire-57
connectedToName : LS1
logicalRouterId : edge-22

```

Simple huh!?

## Routing with DLR

For routing configuration of the Logical Router, see the [Routing](/routing/) section.