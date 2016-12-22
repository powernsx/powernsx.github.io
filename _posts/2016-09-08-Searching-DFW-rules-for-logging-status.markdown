---
layout: post
title:  "Searching DFW rules for logging status"
date:   2016-09-08
categories: nsx powernsx syslog operations
---
A colleague reached out to the PowerNSX team recently. The request was on behalf of a customer who had inconsistent logging status for their DFW rules. This can be done with PowerNSX.

The first example will retrieve all sections, retrieve all DFW rules within the sections and search the property logged. If it is not equal to true it will return the matches.

```
Get-NsxFirewallSection | Get-NsxFirewallRule | Where-object { $_.logged -ne 'true' }

id            : 1148
disabled      : false
logged        : false
name          : DNS Consumer to Provider
action        : allow
appliedToList : appliedToList
sectionId     : 1115
sources       : sources
destinations  : destinations
services      : services
direction     : inout
packetType    : any
tag           : DnsCtP

id            : 1147
disabled      : false
logged        : false
name          : DNS Provider to Consumer
action        : allow
appliedToList : appliedToList
sectionId     : 1115
sources       : sources
destinations  : destinations
services      : services
direction     : inout
packetType    : any
tag           : DnsPtC
```

The second example will output the rules that do not have syslog enabled. The properties in the output are defined by those after select. The output will be id and name.
 
```
Get-NsxFirewallSection | Get-NsxFirewallRule | Where-object { $_.logged -ne 'true' } | Select id, name
 
id   name
--   ----
1148 DNS Consumer to Provider
1147 DNS Provider to Consumer
```

The third example will take these values and export it to a csv file for use in Excel or another application.

```
Get-NsxFirewallSection | Get-NsxFirewallRule | Where-object { $_.logged -ne 'true' } | Select id, name | export-csv c:\temp\nonloggedrules.csv
```

Happy days! Operations made easy with PowerNSX.