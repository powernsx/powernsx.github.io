---
permalink: /lb/
---

# NSX Edge Load Balancer

Turning any NSX Edge into a Load Balancer is a straight forward process.

## Enabling Load Balancing

The following command will retrieve the NSX Edge named PowerNSX, Get and subsequently enable the load balancer. This will also turn on logging. Logging will use the existing NSX Edges defined Syslog settings.

```

PowerCLI C:\> Get-NsxEdge PowerNSX | Get-NsxLoadBalancer | Set-NsxLoadBalancer -Enabled -EnableLogging


version                : 3
enabled                : true
enableServiceInsertion : false
accelerationEnabled    : false
monitor                : {default_tcp_monitor, default_http_monitor, default_https_monitor}
logging                : logging
edgeId                 : edge-21
```

With the Load Balancer service now running on the Edge PowerNSX it is time now to create all the other desired elements such as Pools, Service Monitors, Application Profiles, and Virtual Servers.

## Creating Pools and appending Members

Defining Pool members is very much like NSX Edge interfaces. They are defined seperately and then referenced in pool creation. Below defines three members for a Web Pool then creates a round-robined Pool with a http monitor applied.

```

$wpm1 = New-NsxLoadBalancerMemberSpec -name Web01 -IpAddress 10.0.1.11 -Port 80
$wpm2 = New-NsxLoadBalancerMemberSpec -name Web02 -IpAddress 10.0.1.12 -Port 80
$wpm3 = New-NsxLoadBalancerMemberSpec -name Web03 -IpAddress 10.0.1.13 -Port 80

Get-NsxEdge PowerNSX | Get-NsxLoadBalancer | New-NsxLoadBalancerPool -Name WebPool -Description "Pool for Web Servers" -Algorithm round-robin -MemberSpec $wpm1,$wpm2,$wpm3

poolId      : pool-1
name        : WebPool
description : Pool for Web Servers
algorithm   : round-robin
transparent : false
member      : {Web01, Web02, Web03}
edgeId      : edge-21

```

The result is a Pool with 3 Members, a configured algorithm, and a monitor.

## Defining an Application Profile

Creating an Application Profile determines what traffic type is interesting for the Load Balancer to listen to on the Virtual Server.

```
Get-NsxEdge PowerNSX | Get-NsxLoadBalancer | New-NsxLoadBalancerApplicationProfile -Name AP-Web  -Type HTTP


applicationProfileId : applicationProfile-1
name                 : AP-Web
insertXForwardedFor  : false
sslPassthrough       : false
template             : HTTP
serverSslEnabled     : false
edgeId               : edge-21
```

If NAT is being used and the original IP is required in header then then `-insertXForwardedFor` can be used.

## Creating Virtual Servers

Creating a Virtual Server requires a pre-defined Application Profile and an optional Pool. It is recommended a pool be attached at creation.

```
PowerCLI C:\> Get-NsxEdge PowerNSX | Get-NsxLoadBalancer | Add-NsxLoadBalancerVip -name Web-VIP -Description Web-VIP -ipaddress 192.168.100.140 -Protocol TCP -Port 80 -ApplicationProfile $AP -DefaultPool $WebPool -AccelerationEnabled


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
```

The above code has created a Virtual Server listening on 192.168.100.40 (vNic_0 Uplink). The assigned Application profile enables listening on HTTP for traffic. The defined port is on the Virtual Server.

## Creating a custom Monitor for applications

Monitors can be created to support generic and specific application requirements. Here is a custom monitor created for vRealize Automation 7.1

```
$ManMon = Get-NsxEdge PowerNSX | Get-NsxLoadBalancer | New-NsxLoadBalancerMonitor -Name MN-vRA-Manager -TypeHttps -interval 10 -timeout 10 -MaxRetries 3 -Method "GET"  -Url '/VMPSProvision' -receive 'ProvisionService'


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
```
This monitor performs a specifc URL check against /VMPSProvision on the vRealize Automation Manager service.


## Need help?

For more examples please use get-help command preceding any PowerNSX function. Also use -detailed, -examples, or -full.


