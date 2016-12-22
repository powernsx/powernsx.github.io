---
permalink: /dlr/
---

## Distributed Logical Router

The NSX DLR allows for Layer 3 forwarding decisions to occur within the hypervisor. This provides East west routing as well as north bound routing with an NSX Edge Gateway.

### Defining LIFs Specs

Defining LIFs on a DLR individually is the same design decision like the NSX Edge. The individual interfaces can be defined individually through `New-NsxLogicalRouterInterfaceSpec`. This allows Logical Interfaces or LIFs to be created as required. By default a LIF is required on initial deployment of DLR control VM. The below example defines an uplink LIF and then deploys the DLR control VM to the defined Cluster.

```
$ldruplink = New-NsxLogicalRouterInterfaceSpec -type Uplink -Name Uplink -ConnectedTo $TransitLs -PrimaryAddress 172.16.1.6 -SubnetPrefixLength 24

name          : Uplink
type          : Uplink
mtu           : 1500
isConnected   : True
connectedToId : virtualwire-56
addressGroups : addressGroups
```

The Spec has created the details for the LIF.

### Instantiating a new DLR

For all defined LIFs created with `New-NsxLogicalRouterInterfaceSpec` stored into variables can be used when creating a new DLR.

New-NsxLogicalRouter -name DLR-PowerNSX -ManagementPortGroup $mgmtls -interface $ldruplink -cluster $cluster -datastore $ds

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

With the DLR deploy an administrator can use `Get-NsxLogicalRouter PowerNSX` to retrieve the edge. Storing it in a variable will allow traversal of the XML object.

```
$dlr = Get-NsxLogicalRouter PowerNSX
PowerCLI C:\> $Dlr.interfaces.interface


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

With the ability to confirm interfaces by the above method or using `Get-LogicalRouterInterfaces` lets append a few more interfaces. First step will be to create networks, append them to a new interface, on the recently created DLR.

Now that the interfaces have been created and attached to the DLR, it is possible to validate them with `Get-NsxLogicalRouterInterface` command.

```
PowerCLI C:\> $dlr | Get-NsxLogicalRouterInterface

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
name            : Web
addressGroups   : addressGroups
mtu             : 1500
type            : internal
isConnected     : true
isSharedNetwork : false
index           : 10
connectedToId   : virtualwire-57
connectedToName : PowerNSX-Web
logicalRouterId : edge-22

label           : 13890000000b
name            : App
addressGroups   : addressGroups
mtu             : 1500
type            : internal
isConnected     : true
isSharedNetwork : false
index           : 11
connectedToId   : virtualwire-58
connectedToName : PowerNSX-App
logicalRouterId : edge-22

label           : 13890000000c
name            : Db
addressGroups   : addressGroups
mtu             : 1500
type            : internal
isConnected     : true
isSharedNetwork : false
index           : 12
connectedToId   : virtualwire-59
connectedToName : PowerNSX-Db
logicalRouterId : edge-22
```

Given that each LIF must be added individually at as a seperate operation an administrator should create all desired LIFs upon DLR creation and then append any new ones at a later time.

## Routing with DLR

Routing can be performed on the DLR. It is similar to the NSX Edge Services Gateway. More details coming soon.
