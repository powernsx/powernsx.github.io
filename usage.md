---
permalink: /usage/
---

# Using PowerNSX

PowerNSX is designed to integrate with and behave like PowerCLI as much as possible.  As such, you may feel more comfortable using PowerNSX in a PowerCLI 'window', however this is not required and you are free to load the PowerNSX module in any PowerShell host, _providing_ PowerCLI is installed in the normal way.

If PowerCLI is not installed, the PowerNSX module will not load.

## Detailed usage

The free PowerNSX book by VMware Press here provides in detail examples beyond those listed below. The book will serve as an additional reference in conjunction with the [help](/help/) provided by `Get-Help` within PowerNSX.

For usage details of common functional areas, refer to the following pages.  For TLDR, see below.

* [Installing PowerNSX](/install/)
* [Connecting to NSX and vCenter](/connect/)
* [Logical Switching](/ls/)
* [Logical Routing](/dlr/)
* [Distributed Firewall](/dfw/)
* [Security Groups, Tags, and Services](/secops/)
* [NSX Edge](/esg/)
* [NSX LB](/lb/)
* [NSX Manager and Controller operations](/manager/)
* [Routing - Static and Dynamic](/routing/)
* [Getting help](/help/)
* [Tools made with PowerNSX](/tools/)
* [Contributing to PowerNSX](/contrib/)
* [PowerNSX on PowerShell Core](/powernsxcore/)

See [Example - 3 Tier Application](/example/) for a full stack deployment

## TLDR

Getting started with PowerNSX is pretty simple for seasoned PowerCLI and PowerShell users.  The following tips will hopefully speed you on your way.

### Installing PowerNSX

For detailed installation instructions see the [Install](/install) page

### Exploring PowerNSX

To explore PowerNSX commands, start with the following which lists all functions exposed by PowerNSX.  These behave for the most part like native cmdlets and are pipeline aware:

```
Get-Command -Module PowerNSX
```
**Note**: if you manually downloaded the module and did not place it in a path included in $env:PSModulePath, you will need to manually import the module as follows:


```
Import-Module </Path/To/PowerNSX.psd1>
```

### Connecting to NSX Manager and vCenter

To connect to NSX Manager in order to execute PowerNSX commands do the following:

```
Connect-NsxServer <nsx manager hostname or ip>
```
**Note**:  Connect-NsxServer will prompt you to automatically connect to the registered vCenter or will use an existing PowerCLI connection to the registered vCenter if it exists.  PowerNSX requires a PowerCLI connection to vCenter to be fully functional.

### Getting Help

All PowerNSX functions have basic documentation explaining the function and use and most have usage examples.

```
Get-Help <PowerNSX function>
```

To include examples in the output, use -examples, or -detailed switches when calling Get-Help.

### Retrieving Logical Switches.

Logical Switches are bound to a Transport Zone. The following command runs the Get-NsxTransportZone for transport zone TZ1 and passes the Transport Zone object to Get-NsxLogicalSwitch which will return the logical switch named TSTransit in TZ1

```
PowerCLI C:\> Get-NsxTransportZone TZ1 | Get-NsxLogicalSwitch TSTransit


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


```

The output details a lot of information about the individual logical switch.

To filter the properties of a Logical Switch output to a subset and view it in a table, we can use Select-Object cmdlet.

```
PowerCLI C:\> Get-NsxTransportZone TZ1 | Get-NsxLogicalSwitch TSTransit | Select-Object Name, vdnscope,vdnid

name                                               vdnScopeId                                        vdnId
----                                               --------                                          -----
TSTransit                                          vdnscope-1                                        5000
```

### Creating a Logical Switch

Using the above method it is quite easy to create a Logical Switch in the transport zone TZ1 using the New-NsxLogicalSwitch command. It only requires the Transport Zone passed on the pipeline, and the Logical Switch name as an input.


```
PowerCLI C:\> Get-NsxTransportZone TZ1 | New-NsxLogicalSwitch -name PowerNSX


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


```

### Discovering the Backing PortGroup of a given Logical Switch

Each Logical Switch is backed by a port-group on one or more Distributed Switches, and the port group is the entity that a VM is actually attached to.  To retrieve the port group(s) backing a Logical Switch, you can use the Get-NsxBackingPortGroup cmdlet.

```
PowerCLI C:\> Get-NsxTransportZone TZ1 | get-nsxlogicalswitch PowerNSX | Get-NsxBackingPortGroup

Name                           NumPorts PortBinding
----                           -------- -----------
vxw-dvs-64-virtualwire-227-... 0        Static

```

The output is a PowerCLI VdPortGroup object.

```
PowerCLI C:\> Get-NsxTransportZone TZ1 | Get-NsxLogicalSwitch PowerNSX | Get-NsxBackingPortGroup | Format-Table -AutoSize

Name                                          NumPorts PortBinding
----                                          -------- -----------
vxw-dvs-44-virtualwire-516-sid-5000-PowerNSX 8        Static

```

Here we can see the port-group name vxw-dvs-44-virtualwire-516-sid-5000-PowerNSX which is the Logical Switch we created earlier.

For more information, see the detailed usage section above.