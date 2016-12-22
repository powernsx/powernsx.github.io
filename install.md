---
layout: page
permalink: /install/
---

## Installing PowerNSX

### Requirements

PowerNSX requires PowerShell v3 or above, and PowerCLI (Recommend v6 and above).

There are two approaches to installing PowerNSX. The first and preferred is the automated install. The other is the manual install.

### Automated Install

Installing PowerNSX is as simple as running the below onliner in a PowerCLI Window. This will execute the PowerNSX installation script which will guide you through the installation of the latest stable release of PowerNSX.

```
$Branch="v2";$url="https://raw.githubusercontent.com/vmware/powernsx/$Branch/PowerNSXInstaller.ps1"; try { $wc = new-object Net.WebClient;$scr = try { $wc.DownloadString($url)} catch { if ( $_.exception.innerexception -match "(407)") { $wc.proxy.credentials = Get-Credential -Message "Proxy Authentication Required"; $wc.DownloadString($url) } else { throw $_ }}; $scr | iex } catch { throw $_ }
```

The development version of PowerNSX can be installed using the `Update-PowerNsx` cmdlet of v2 or via the following oneliner. NOTE: Live development occurs against this branch and should not be relied upon to be fully functional at all times. You have been warned!

```
Update-PowerNsx master
```

or

```
$Branch="master";$url="https://raw.githubusercontent.com/vmware/powernsx/$Branch/PowerNSXInstaller.ps1"; try { $wc = new-object Net.WebClient;$scr = try { $wc.DownloadString($url)} catch { if ( $_.exception.innerexception -match "(407)") { $wc.proxy.credentials = Get-Credential -Message "Proxy Authentication Required"; $wc.DownloadString($url) } else { throw $_ }}; $scr | iex } catch { throw $_ }
```
Alternatively it is possible for a use the `Update-PowerNsx` command to select a branch to update to.

```
Update-PowerNSX -branch v2
```

You now have PowerNSX installed and ready to use. Validate the module being installed with `Get-Command -module PowerNSX`.


