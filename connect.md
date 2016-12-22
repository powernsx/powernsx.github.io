---
layout: page
permalink: /connect/
---
# Connecting to NSX Manager and vCenter

## Connect-NsxServer
Use the `Connect-NsxServer` cmdlet to connect to NSX manager.  It is not required to connect to vCenter manually.  PowerNSX will automatically prompt the user to connect to the vCenter server the NSX Manager is registered against.


```
PowerCLI C:\> Connect-NsxServer 192.168.100.201

cmdlet Connect-NsxServer at command pipeline position 1
Supply values for the following parameters:
Credential

PowerNSX requires a PowerCLI connection to the vCenter server NSX is registered against for proper operation.
Automatically create PowerCLI connection to vc-01a.corp.local?
[Y] Yes  [N] No  [?] Help (default is "Y"): y

WARNING: Enter credentials for vCenter vc-01a.corp.local

cmdlet Get-Credential at command pipeline position 1
Supply values for the following parameters:
Credential

Version             : 6.2.2
BuildNumber         : 3604087
Credential          : System.Management.Automation.PSCredential
Server              : 192.168.100.201
Port                : 443
Protocol            : https
ValidateCertificate : False
VIConnection        : vc-01a.corp.local
DebugLogging        : False
DebugLogFile        : C:\Users\ADMINI~1\AppData\Local\Temp\2\PowerNSXLog-admin@192.168.100.201-2016_08_19_16_20_11.log



PowerCLI C:\>

```

Note that credentials can be passed on the command line as either clear text, or as PSCredential objects.  If no credentials are specified, PowerNSX will prompt for them.

# Need help?

For more examples please use `get-help` command preceding any PowerNSX function. Also use -detailed, -examples, or -full.
