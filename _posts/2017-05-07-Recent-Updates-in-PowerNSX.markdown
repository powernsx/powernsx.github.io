---
title:  "Recent updates in PowerNSX"
date:   2017-05-07
---

Hello fellow users of PowerNSX. It's Anthony from the PowerNSX team and here are some of the recent updates in PowerNSX.

The list below does not nclude all of the changes. Some of the bigger ones are called out below.

* SSO User Accounts [#175](https://github.com/vmware/powernsx/pull/175)
    * Leverage SSO user accounts with PowerNSX
    * No longer require 'admin' access to NSX
    * Changes in Connect-NsxServer cmdlet


* Universal Logical Routers [#218](https://github.com/vmware/powernsx/commit/509c1566310b2bddf756cd076ebdda6773823a7f)
    * Create Universal Logical Routers as part of a xVC deployment
    * Configure local egress on deployment


* Universal Logical Switch 
    * Create Universal Logical Switches with the -Universal switch
    * Uses existing command


* Universal Service Group & Inheritance [#219](https://github.com/vmware/powernsx/commit/6d9868067e358e86537fa32cfc097752accccefd)
    * Create Service Groups that can be universal
    * Create Service Groups that can be inherited
    * Uses existing command


* Universal Segment Range [#222](https://github.com/vmware/powernsx/pull/222)
    * Define a Universal Segement range for Universal Logical Switches
    * Uses existing command

One from our community was from Sjors Robroek.

* Universal Objects [#214](https://github.com/vmware/powernsx/pull/214/files)
    * Now it is possible to create Universal Security Tags for use with xVC NSX
    * Create / Attach / Remove / Delete operations
    * Uses existing command

Check out the master branch where all the goodies are currently hiding. Do note that the Master branch is considered developmental.

Expect v2.1 to be out soon!