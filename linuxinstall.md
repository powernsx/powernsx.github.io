---
permalink: /linuxinstall/
---

# Linux Installation

Linux installation can be performed using the PowerNSX installer script, but most pre-requisites must still be installed manually.  Using the installer script is the recommended method.

## Prerequisites

Install the following pre-requisites manually.

The PowerNSX team recommend PowerShell core 6.0.0-alpha18 for use with PowerNSX on macOS and Linux. There is a Powershell bug in 6.0.0-beta1 that breaks functionality for macOS and Linux. It can be downloaded [here](https://github.com/PowerShell/PowerShell/releases/tag/v6.0.0-alpha.18)

| Component | Minimum Version | Recommended Version |
|-----------|-----------------|---------------------|
| PowerShell| [PowerShell 6.0 alpha 18](https://github.com/PowerShell/PowerShell/releases/tag/v6.0.0-alpha.18)    | [PowerShell 6.0 alpha 18](https://github.com/PowerShell/PowerShell/releases/tag/v6.0.0-alpha.18) |
| PowerCLI Core |  [1.0](https://labs.vmware.com/flings/powercli-core)           | [1.0](https://labs.vmware.com/flings/powercli-core) |
| PowerNSX  | [master](https://github.com/vmware/powernsx/archive/master.zip) | [master](https://github.com/vmware/powernsx/archive/master.zip) |

### Version 3.0 (Latest Stable)

| Component | Minimum Version | Recommended Version |
|-----------|-----------------|---------------------|
| PowerShell| [PowerShell 6.0 alpha 18 ](https://github.com/PowerShell/PowerShell/releases/tag/v6.0.0-alpha.18)    | [PowerShell 6.0 alpha 18 ](https://github.com/PowerShell/PowerShell/releases/tag/v6.0.0-alpha.18) |
| PowerCLI Core |  [1.0](https://labs.vmware.com/flings/powercli-core)           | [1.0](https://labs.vmware.com/flings/powercli-core) |
| PowerNSX  | [v3](https://github.com/vmware/powernsx/archive/v3.zip) | [v3](https://github.com/vmware/powernsx/archive/v3.zip) |

## Running the Installer Script

The following PowerShell oneliner will download and execute the PowerNSX installer.  The installer will automatically download the latest version of PowerNSX and place it in the appropriate PowerShell module directory.

_Note: Internet access is required._

### Master Branch
```
$Branch="master";$url="https://raw.githubusercontent.com/vmware/powernsx/$Branch/PowerNSXInstaller.ps1"; try { try { $response = Invoke-WebRequest -uri $url; $scr = $response.content } catch { if ( $_.exception.innerexception -match "(407)") { $credentials = Get-Credential -Message "Proxy Authentication Required"; $response = Invoke-WebRequest -uri $url -proxyCredential $credentials; $scr = $response.content } else { throw $_ }}; $scr | iex } catch { throw $_ }
```

_Note: The master branch is not guaranteed to be stable and PowerNSX support for PowerShell Core is still experimental_

### Version 3.0 (Latest Stable)

```
$Branch="v3";$url="https://raw.githubusercontent.com/vmware/powernsx/$Branch/PowerNSXInstaller.ps1"; try { try { $response = Invoke-WebRequest -uri $url; $scr = $response.content } catch { if ( $_.exception.innerexception -match "(407)") { $credentials = Get-Credential -Message "Proxy Authentication Required"; $response = Invoke-WebRequest -uri $url -proxyCredential $credentials; $scr = $response.content } else { throw $_ }}; $scr | iex } catch { throw $_ }
```

## Manual Installation

It is possible to install PowerNSX manually.

Install the above pre-requisites, then download the master branch PowerNSX zip file and extract PowerNSX.psm1 and PowerNSX.psd1 to your PowerShell Modules directory within a directory named PowerNSX.  Recommended locations are:

| Purpose  | Path |
|----------|------|
| All Users| /usr/local/share/powershell/Modules |
| Current User | $($env:HOME)/.local/share/powershell/Modules |

If placed in a path included in $env:PSModulePath, then the module will automatically load, otherwise it will have to be manually imported using the Import-Module <path to PowerNSX.psd1> cmdlet.  If manually loading, ensure the manifest (psd1) file is referenced, not the psm1.

