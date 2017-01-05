---
permalink: /osxinstall/
---

# OSX Installation

Installation of PowerNSX on OSX is basically the same as for Linux, except for the additional requirement of openssl support in curl that PowerShell and PowerCLI require.

It is a common source of failure to overlook this, so ensure you take note of this when installing PowerShell as per the OSX instructions for doing so [here](https://github.com/PowerShell/PowerShell/blob/master/docs/installation/linux.md#macos-1011)

Failure to address this will cause failures in both PowerCLI and PowerNSX.

Then follow the PowerNSX Linux installation instructions at [Linux](/linuxinstall/)