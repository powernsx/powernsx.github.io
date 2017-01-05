---
permalink: /windowsinstall/
---

# Windows Installation

Windows installation can be performed using the PowerNSX installer script or performed manually.  Using the installer script is the recommended method as all PowerNSX pre-requisites are installed.

## Installer Script

The following PowerShell oneliners will download and execute the PowerNSX installer and install the appropriate version.  Allthough PowerShell 3 is required for PowerNSX, the installer script will run on PowerShell 2 and above, and will guide you through the process of installing all PowerNSX pre-requisites (including updating PowerShell.)

_Note: Internet access is required._

### v2 (latest stable version)

```
$Branch="v2";$url="https://raw.githubusercontent.com/vmware/powernsx/$Branch/PowerNSXInstaller.ps1"; try { $wc = new-object Net.WebClient;$scr = try { $wc.DownloadString($url)} catch { if ( $_.exception.innerexception -match "(407)") { $wc.proxy.credentials = Get-Credential -Message "Proxy Authentication Required"; $wc.DownloadString($url) } else { throw $_ }}; $scr | iex } catch { throw $_ }
```

### Master (Active development branch.  Possibly unstable, but most recent updates.)

```
$Branch="master";$url="https://raw.githubusercontent.com/vmware/powernsx/$Branch/PowerNSXInstaller.ps1"; try { $wc = new-object Net.WebClient;$scr = try { $wc.DownloadString($url)} catch { if ( $_.exception.innerexception -match "(407)") { $wc.proxy.credentials = Get-Credential -Message "Proxy Authentication Required"; $wc.DownloadString($url) } else { throw $_ }}; $scr | iex } catch { throw $_ }
```

_Note: The master branch is not guaranteed to be stable.  v2 is the current recommended stable release.  The master branch no longer supports PowerCLI 5.5_

## Manual Installation

It is possible to install PowerNSX manually.  The following pre-requisites must be met before the module will load successfully.

### v2 (latest stable version)

| Component | Minimum Version                                                  | Recommended Version                                                       |
|-----------|------------------------------------------------------------------|---------------------------------------------------------------------------|
| PowerShell| PowerShell 3                                                     | Powershell 4 (Win7-8.1, Server 2012/R2), PowerShell 5 (Win10, Server2016) |
| DotNet    | Dotnet 4.5                                                       | DotNet 4.5                                                                |
| PowerCLI  | 5.5                                                              | 6.5 <R1>                                                                  |
| PowerNSX  | [v2](https://github.com/vmware/powernsx/archive/v2.zip)          | [v2](https://github.com/vmware/powernsx/archive/v2.zip)                   |

### Master (Active development branch.  Possibly unstable, but most recent updates.)

| Component  | Minimum Version                                                 | Recommended Version                                                       |
|------------|-----------------------------------------------------------------|---------------------------------------------------------------------------|
| PowerShell | PowerShell 3                                                    | Powershell 4 (Win7-8.1, Server 2012/R2), PowerShell 5 (Win10, Server2016) |
| DotNet     | Dotnet 4.5                                                      | DotNet 4.5                                                                |
| PowerCLI   | 6.0R3                                                           | 6.5 R1                                                                    |
| PowerNSX   | [master](https://github.com/vmware/powernsx/archive/master.zip) | [master](https://github.com/vmware/powernsx/archive/master.zip)           |

Install the listed pre-requisites, then download the chosen PowerNSX zip file and extract PowerNSX.psm1 and PowerNSX.psd1 to your PowerShell Modules directory.  Recommended locations are:

| Purpose  | Path |
|----------|------|
| All Users| %ProgramFiles%\Common Files\Modules\PowerNSX |
| Current User | %UserProfile%\Documents\WindowsPowerShell\Modules |

If placed in a path included in $env:PSModulePath, then the module will automatically load, otherwise it will have to be manually imported using the Import-Module <path to PowerNSX.psd1> cmdlet.  If manually loading, ensure the manifest (psd1) file is referenced, not the psm1.