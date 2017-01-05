---
permalink: /manager/
---

# NSX Manager and Controller operations

PowerNSX provides the ability to configure a newly deployed NSX Manager. It is also possible to use PowerCLI and `Get-OvfConfiguration` to even deploy the NSX Manager OVA prior to this step, though that is not covered here (hint, check the examples folder in this repository!).

## Connecting to NSX Manager

`Set-NsxManager` allows us to do the following:

* SSO configuration
* vCenter registration
* Syslog settings

It requires a connection to NSX Manager first. To connect just define the NSX manager and credentials you want to use.

```
PowerCLI C:\> connect-nsxserver nsx-m-01a.corp.local -Username admin -password VMware1!

Version             : 6.2.2
BuildNumber         : 3604087
Credential          : System.Management.Automation.PSCredential
Server              : nsx-m-01a.corp.local
Port                : 443
Protocol            : https
ValidateCertificate : False
VIConnection        : vc-01a.corp.local
DebugLogging        : False
DebugLogFile        : C:\Users\ADMINI~1\AppData\Local\Temp\2\PowerNSXLog-admin@nsx-m-01a.corp.local-2016_08_19_16_16_50.log
```

**Note:** If NSX Manager has a vCenter already registered to it, it will prompt the user to connect to vCenter.

## Modifying Manager

An example below is setting the NSX Manager Syslog service to point to a Syslog server

```
PowerCLI C:\> Set-NsxManager -SyslogServer 192.168.100.254 -SyslogPort 514 -SyslogProtocol TCP
```

Connecting NSX Manager to vCenter is pretty straight forward. A vCenter Username, password, and a defined vCenter server is all that is required.

```
PowerCLI C:\> Set-NsxManager -vCenterServer 'vc-01a.corp.local' -vCenterUserName 'administrator@vsphere.local' -vCenterPassword $password
```

## Deploying Controllers
This deployment of controllers will use an Ip Pool. An IP Pool can be quickly created with New-NsxIpPool.


```
New-NsxIPPool -name Controllers -gateway 192.168.100.1 -prefixlength 24 -StartAddress 192.168.100.201 -EndAddress 192.168.100.203 -DnsServer 192.168.100.10 -DnsSuffix 'corp.local'

objectId           : ipaddresspool-1
objectTypeName     : IpAddressPool
vsmUuid            : 42011E64-766E-616B-0401-5C68CF27B466
nodeId             : 0509160a-0cfb-4cc2-811a-3193e8b45b95
revision           : 1
type               : type
name               : Controller Pool
scope              : scope
clientHandle       :
extendedAttributes :
isUniversal        : false
universalRevision  : 0
totalAddressCount  : 3
usedAddressCount   : 3
usedPercentage     : 100
prefixLength       : 24
gateway            : 192.168.100.1
dnsSuffix          : corp.local
dnsServer1         : 192.168.100.10
dnsServer2         : 192.168.100.10
ipPoolType         : ipv4
ipRanges           : ipRanges
subnetId           : subnet-1
```

We will use this pool to provide IP addressing for the NSX Controllers in the next step.

```
$ippool = Get-NsxIpPool 'Controller Pool'

New-NsxController -Cluster $cluster -datastore $datastore -PortGroup $PortGroup -IpPool $IpPool -Password $password

revision                : 0
clientHandle            :
isUniversal             : false
universalRevision       : 0
id                      : controller-1
ipAddress               : 192.168.100.202
status                  : RUNNING
upgradeStatus           : NOT_STARTED
version                 : 6.2.46427
upgradeAvailable        : true
virtualMachineInfo      : virtualMachineInfo
hostInfo                : hostInfo
resourcePoolInfo        : resourcePoolInfo
clusterInfo             : clusterInfo
managedBy               : 42011E64-766E-616B-0401-5C68CF27B466
datastoreInfo           : datastoreInfo
controllerClusterStatus : controllerClusterStatus
```

Here we have created a single controller. We need three controllers.

In the famous scriptures of Python:
"Now did the Lord say, "First thou pullest the Holy Pin. Then thou must count to three. Three shall be the number of the counting and the number of the counting shall be three. Four shalt thou not count, neither shalt thou count two, excepting that thou then proceedeth to three. Five is right out. Once the number three, being the number of the counting, be reached and thou shall hath thy NSX Controller cluster""

Rinse and repeat two more times.

Here we can quickly ascertain the NSX Controller cluster status with `Get-NsxController`. The Controllers that have just been created are now running on the latest version.

```
PowerCLI C:\> Get-nsxcontroller


revision                : 0
clientHandle            :
isUniversal             : false
universalRevision       : 0
id                      : controller-1
ipAddress               : 192.168.100.202
status                  : RUNNING
upgradeStatus           : NOT_STARTED
version                 : 6.2.46427
upgradeAvailable        : true
virtualMachineInfo      : virtualMachineInfo
hostInfo                : hostInfo
resourcePoolInfo        : resourcePoolInfo
clusterInfo             : clusterInfo
managedBy               : 42011E64-766E-616B-0401-5C68CF27B466
datastoreInfo           : datastoreInfo
controllerClusterStatus : controllerClusterStatus

revision                : 0
clientHandle            :
isUniversal             : false
universalRevision       : 0
id                      : controller-2
ipAddress               : 192.168.100.203
status                  : RUNNING
upgradeStatus           : NOT_STARTED
version                 : 6.2.46427
upgradeAvailable        : true
virtualMachineInfo      : virtualMachineInfo
hostInfo                : hostInfo
resourcePoolInfo        : resourcePoolInfo
clusterInfo             : clusterInfo
managedBy               : 42011E64-766E-616B-0401-5C68CF27B466
datastoreInfo           : datastoreInfo
controllerClusterStatus : controllerClusterStatus

revision                : 0
clientHandle            :
isUniversal             : false
universalRevision       : 0
id                      : controller-3
ipAddress               : 192.168.100.204
status                  : RUNNING
upgradeStatus           : NOT_STARTED
version                 : 6.2.46427
upgradeAvailable        : true
virtualMachineInfo      : virtualMachineInfo
hostInfo                : hostInfo
resourcePoolInfo        : resourcePoolInfo
clusterInfo             : clusterInfo
managedBy               : 42011E64-766E-616B-0401-5C68CF27B466
datastoreInfo           : datastoreInfo
controllerClusterStatus : controllerClusterStatus
```


## Host preparation

To Do. Coming soon!

## VNI scope

To Do. Coming soon!

## Need help?

For more examples please use `get-help` command preceding any PowerNSX function. Also use -detailed, -examples, or -full.
