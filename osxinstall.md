---
permalink: /osxinstall/
---

# OSX Installation

The PowerNSX team recommend PowerShell core 6.0.0-alpha18 for use with PowerNSX on macOS and Linux. There is a Powershell bug in 6.0.0-beta1 that breaks functionality for macOS and Linux. It can be downloaded [here](https://github.com/PowerShell/PowerShell/releases/tag/v6.0.0-alpha.18)

| Component | Minimum Version | Recommended Version |
|-----------|-----------------|---------------------|
| PowerShell| PowerShell 6.0 alpha 18    | [PowerShell 6.0 alpha 18 (latest)](https://github.com/PowerShell/PowerShell/releases/tag/v6.0.0-alpha.18) |
| PowerCLI Core |  [1.0](https://labs.vmware.com/flings/powercli-core)           | [1.0](https://labs.vmware.com/flings/powercli-core) |
| PowerNSX  | [master](https://github.com/vmware/powernsx/archive/master.zip) | [master](https://github.com/vmware/powernsx/archive/master.zip) |


Installation of PowerNSX on OSX is basically the same as for Linux, except for the additional requirement of openssl support in curl that PowerShell and PowerCLI require.

It is a common source of failure to overlook this, so ensure you take note of this when installing PowerShell as per the OSX instructions for doing so [here](https://github.com/PowerShell/PowerShell/blob/master/docs/installation/linux.md#macos-1011)

Failure to address this will cause failures in both PowerCLI and PowerNSX.

Then follow the PowerNSX Linux installation instructions at [Linux](/linuxinstall/)