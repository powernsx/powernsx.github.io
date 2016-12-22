---
layout: page
permalink: /routing/
---

Here is a snippet of the introduction to routing with PowerNSX.

### Basic OSPF configuration on NSX Edge

Lets explore OSPF configuration. Dynamic routing along with static routing can be configured on the NSX Edge. The following example will achieve the following:

* Get the NSX Edge PowerNSX
* Get the routing configuration and set a new routing configuration
* OSPF will be enabled and a routerID defined
* Area 51 will be removed because it shouldn't be there
* A new OSPF area will be created (area 1)
* It will be assigned to the vNIC with the index of 1 (Internal previously created)

```
PowerCLI C:\>  Get-NsxEdge PowerNSX | Get-NsxEdgerouting | set-NsxEdgeRouting -EnableOspf -RouterId 192.168.100.251 -confirm:$false

version             : 2
enabled             : true
routingGlobalConfig : routingGlobalConfig
staticRouting       : staticRouting
ospf                : ospf
edgeId              : edge-21


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

Happy days! OSPF is configured. This will require a neighbor southbound like a DLR or another ESG running OSPF to peer with it.


## Need help?

For more examples please use `get-help` command preceding any PowerNSX function. Also use -detailed, -examples, or -full.