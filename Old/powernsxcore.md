---
permalink: /powernsxcore/
---

# PowerNSX Core

PowerShell Core is supported from version 3.0 of PowerNSX.

## Installing PowerNSX on PowerShell Core

The PowerNSX installation script supports all PowerShell Core platforms.  See [Install](/install/) for detailed instructions for your platform.

PowerShell Gallery _should not_ be used to install PowerNSX on PowerShell Core systems as incorrect dependancies are retrieved.
## Usage

Usage mirrors that of PowerNSX on Windows.  Any differences or errors should be reported via the project issues page at [Issues](https://github.com/vmware/powernsx/issues).

Start powershell, and the module will be automatically loaded when any PowerNSX command is invoked.  In addition, it will also automatically load the PowerCLI.ViCore and PowerCLI.Vds modules.

*If either the PowerCLI.ViCore or PowerCLI.Vds modules do not load, the PowerNSX module will fail to load also.*

## Troubleshooting

If you need to troubleshoot module load issues, try manually loading PowerCLI.ViCore and PowerCLI.Vds first and resolve any issues here before attempting to load PowerNSX.

