---
title:  "Copy NSX Edge"
date:   2016-11-03
---

There are a lot of times where people have asked it would be great to have an ability to clone an edge. Take all the configuration and duplicate it easily. Well now you can. The Copy-NsxEdge function takes an already deployed Edge and allow it to be reproduced.  When thinking about the command on the surface it does seem quite simple. Take an edge, pass it along the pipeline, and copy it. In reality there is a lot to consider, especially when you want to avoid conflicts.

This large cmdlet checks in at over 1000 lines of code. Don't let that put you off though. The cmdlet can be easily used with get-nsxedge edge01 | copy-nsxedge. So what does it support out of the box? Let us have a look-see.

It accomodates the following edge features.

* Interface IPs
* Secondary Addresses
* Load Balancer VIPs
* Self Signed certificate regeneration
* SSL VPN configurations
* IPSEC configurations
* NAT and DFW elements
* Local objects

## An example?

The edge ecmp-edge1 is part of a 6 node ECMP cluster. There are some bandwidth considerations that have caused the team to quickly need to deploy an additional edge. Using ecmp-edge1 as the source the following command,  get-nsxedge edge-ecmp1 | copy-nsxedge

 
PowerCLI C:\> get-nsxedge ecmp-edge1 | copy-nsxedge

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



Note that the command will look at areas of configuration duplication and seek to modify them. By updating the IP address 172.16.10.11 and 172.16.20.11 to 172.16.10.17 and 172.16.20.17 both the interfaces are changed and the router-id used for BGP configuration is changed. Given that the north and south peers in this topology are the same this edge is ready to participate in BGP.

Some fields must be changed and that is mandatory. There are a list of other fields that can be modified too. This allows an edge to have a slightly different configuration than the source.

This cmdlet is in the master branch currently and not in v2. You will have to venture into the development train - beware, there be dragons!

Happy copying! Remember - if in doubt, use Get-Help!