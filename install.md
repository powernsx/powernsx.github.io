---
permalink: /install/
---

# Installing PowerNSX

Installing PowerNSX is as simple as running a oneliner in a PowerShell Window.  This will execute the PowerNSX installation script which will guide you through the installation of the latest stable release of PowerNSX.

PowerNSX is supported on multiple PowerShell platforms, select your the appropriate link from the table below for instructions.

| Platform          | Minimum PowerShell Version                    | Operating Systems                             |
|-------------------|-----------------------------------------------|:---------------------------------------------:|
| PowerShell Full   | PowerShell 3                                  | [Windows](/windowsinstall/)                      |
| PowerShell Core   | PowerShell 6.0 alpha 18                       | [Linux](/linuxinstall/), [OSX](/osxinstall/), [Docker](/docker/) |

MacOS/Linux users: The PowerNSX team recommend PowerShell core 6.0.0-alpha18 for use with PowerNSX on macOS and Linux. There is a Powershell bug in 6.0.0-beta1 that breaks functionality for macOS and Linux.          |

# Updating PowerNSX

If PowerNSX is already installed, it can be updated to the master branch using the Update-PowerNSX cmdlet on either PowerShell Full, or PowerShell Core.

```
Update-PowerNSX -branch master
```
_Note:  The master branch is the active development branch of PowerNSX and is not guaranteed to be stable.  You have been warned.

Powershell Gallery based installations of PowerNSX cannot be updated using Update-PowerNSX.  Use the following instead:

```
Update-Module PowerNSX
```

See the [Usage](/usage/) page for further usage instructions.
