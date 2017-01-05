---
permalink: /routing/
---

# Edge Routing

Here is a basic introduction to routing with PowerNSX.  Both Edge and DLR routing is very similar and so just Edge routing config is covered here.  You will find that the associated cmdlets for Edge and DLR work almost identically, although some differences do occur; in particular the DLR Forwarding vs Protocol address must be defined in dynamic routing configuration and the DLR has some limitations in supporting mulitple protocols at the same time.

## Basic OSPF Configuration

Lets explore OSPF configuration:

### Enabling OSPF
```
PowerCLI C:\>  Get-NsxEdge PowerNSX | Get-NsxEdgerouting | set-NsxEdgeRouting -EnableOspf -RouterId 192.168.100.251 -confirm:$false

version             : 2
enabled             : true
routingGlobalConfig : routingGlobalConfig
staticRouting       : staticRouting
ospf                : ospf
edgeId              : edge-21
```
So, what did we do there?

1. Get the NSX Edge 'PowerNSX'
2. Get its routing configuration
3. Set a new routing configuration enabling OSPFand defining a routerID

_Note: If you were using Set-NsxLogicalRouterRouting to configure a DLR instead, the -ForwardingAddress and -ProtocolAddress parameters must also be configured._

### Configuring OSPF Areas

Lets remove the dopey Area 51 and create Area 1 and bind it to vNic 1.

```
PowerCLI C:\> Get-NsxEdge PowerNSX | Get-NsxEdgerouting | Get-NsxEdgeOspfArea -AreaId 51 | Remove-NsxEdgeOspfArea -confirm:$false

PowerCLI C:\>     Get-NsxEdge PowerNSX | Get-NsxEdgerouting | New-NsxEdgeOspfArea -AreaId 1 -Type normal -confirm:$false

areaId                             type                               authentication                     edgeId
------                             ----                               --------------                     ------
1                                  normal                             authentication                     edge-21

PowerCLI C:\>   Get-NsxEdge PowerNSX | Get-NsxEdgerouting | New-NsxEdgeOspfInterface -AreaId 1 -vNic 1 -confirm:$false

vnic          : 1
areaId        : 1
helloInterval : 10
deadInterval  : 40
priority      : 128
mtuIgnore     : false
edgeId        : edge-21
```

Happy days! OSPF is configured. This will require a neighbor like a physical L3 switch / router,  DLR, or another ESG running OSPF to peer with.

## Basic BGP Configuration

ToDo

## Route Redistribution

ToDo

## Prefix Definition

ToDo

## Static Routing

ToDo

## Need help?

For more examples please use `get-help` command preceding any PowerNSX function. Also use -detailed, -examples, or -full.