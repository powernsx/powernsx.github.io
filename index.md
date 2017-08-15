# [PowerNSX](https://github.com/vmware/powernsx)

*A Powershell module for NSX for vSphere*

**[Get the latest news from the team at the PowerNSX blog](https://powernsx.github.io/blog/)**

[PowerNSX](https://github.com/vmware/powernsx) is a PowerShell module that abstracts the VMware NSX API to a set of easily used PowerShell functions.

This module is not supported by VMware, and comes with no warranties express or implied. Please test and validate its functionality before using this product in a production environment.

It aims to focus on exposing New, Update, Remove and Get operations for all key NSX functions as well as adding additional functionality to extend the capabilities of NSX management beyond the native UI or API.

[PowerNSX](https://github.com/vmware/powernsx) works closely with VMware PowerCLI, and PowerCLI users will feel quickly at home using PowerNSX.  Together these tools provide a comprehensive command line environment for managing your VMware NSX for vSphere environments.

[PowerNSX](https://github.com/vmware/powernsx) is still a work in progress, and it is unlikely that it will ever expose 100% of the NSX API.  Feature requests are welcome via the [issues](https://github.com/vmware/powernsx/issues) tracker on the projects GitHub page.

[PowerNSX](https://github.com/vmware/powernsx) now supports PowerShell Core as of version 3.0.  Remember, PowerShell Core and PowerCLI Core are both pre-release products!.  See [PowerNSX Core](/powernsxcore/) for details.

## Installing PowerNSX

With the release of PowerNSX version 3, PowerNSX is now available via the PowerShell Gallery.  Installation is as simple as the following:

```
Find-Module PowerNSX | Install-Module -scope CurrentUser
```

Installation via PowerShell Gallery is only supported on Windows at this time.

PowerShell Gallery is natively available on PowerShell 5 and above, and can be installed easily on earlier versions.  See [https://www.powershellgallery.com/](https://www.powershellgallery.com/) for more details

Alternative methods for installation including installation on PowerShell Core (Linux, OSX) can be found under [Installing PowerNSX](/install/)

## Using PowerNSX

For TLDR, basic and detailed PowerNSX usage, see the [Usage](/usage/) page.

## Contribution guidelines #

Contribution and feature requests are more than welcome. Please use the following methods:

  * For bugs and [issues](https://github.com/vmware/powernsx/issues), please use the [issues](https://github.com/vmware/powernsx/issues) register with details of the problem.
  * For Feature Requests, please use the [issues](https://github.com/vmware/powernsx/issues) register with details of what's required.
  * For code contribution (bug fixes, or feature request), please request fork PowerNSX, create a feature branch, then submit a pull request.

For more details see [Contributing to PowerNSX](/contrib/)

## Who do I talk to?

PowerNSX is a community based project headed by some VMware staff. If you want to contribute please have a look at the [issues](https://github.com/vmware/powernsx/issues) page to see what is planned, requires triage, and to get started.

PowerNSX is an OpenSource project, and as such is not supported by VMware.  Please feel free reach out to the team via the [Issues](https://github.com/vmware/powernsx/issues) page.

Find out more information about the author and the team [here](/about/)

## Blog

Want to know what is new with PowerNSX? The team occasionally blogs [here](https://powernsx.github.io/blog/). Also, team member Anthony Burkes blog, where he posts a lot of useful usage information cant be found [here](http://networkinferno.net/tag/powernsx).

## Is PowerNSX supported?

This module is opensource, and as such is _not supported_ by VMware, and comes with no warranties express or implied. Please test and validate its functionality before using in a production environment.

Whist every endeavour is made to test functionality it is recommended that tools and scripts created with PowerNSX be validated and tested before using in production.

## License

PowerNSX is licensed under GPL v2

Copyright © 2015 VMware, Inc. All Rights Reserved.

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License version 2, as published by the Free Software Foundation.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTIBILITY or FITNESS
FOR A PARTICULAR PURPOSE. See the GNU General Public License version 2 for more details.

You should have received a copy of the General Public License version 2 along with this program.
If not, see https://www.gnu.org/licenses/gpl-2.0.html.

The full text of the General Public License 2.0 is provided in the COPYING file.
Some files may be comprised of various open source software components, each of which
has its own license that is located in the source code of the respective component.”
