---
layout: post
title:  "NSX Visio Diagramming Tool"
date:   2016-10-20
categories: nsx powernsx visio operations
---
At VMworld US and Europe this year, Nick Bradford and I presented on PowerNSX. PowerNSX provides a PowerShell module featuring a substantial number of cmdlets that cover the NSX API. Working in concert with PowerCLI it becomes possible to interact via a command line or programmatically with the NSX for vSphere API.

One section Nick provided a bit of an ad-lib to the session with regards to PowerNSX. He showed off the Visio Diagramming tool. When asked if this was something “needed” - all hands were up and people were out of their seats. Claps and Cheers went up! Well - now here it is - ready for anyone to use.

The [NSX Visio Diagramming tool](https://github.com/vmware/powernsx/tree/master/tools/DiagramNSX) provides everyone the chance to diagram their network programmatically. This removes the human time and error elements from documentation. Run the tool and within a minute (if not seconds) you have the data you need to visualise your environments current state.

### The Tool

The tool is broken into two parts - a bundle capture script and a digram script.

The Bundle script allows thePowerNSX diagramming tool will automatically go off and gather the logical topology and components from NSX and vCenter to determine what a logical topology looks like. This includes but is not limited to NSX Edges, Attached Logical Switches, Distributed Logical Routers, Distributed Port Groups, Virtual Switches and the Virtual Machines that are attached to these networks. It also supports the documentation of multi-vNIC Virtual Machines. It will collect all these, store the contents in respect

The Diagram script will take a defined bundle and the data contained with the aforementioned bundle and build the topology. By using PowerShell to read and interpret the bundle it will use Visio’s API’s via PowerShell to build out the topology. Using “pretty and shiny” icons the tool will place down the respective devices and topology captured in the bundle. It will then make auto-distance objects to ensure it is readable.

The reason the capture and diagram functions were split out was usability. It allows capture to take place on a machine ‘in production’ through a scheduled task or administrator running it. These machines may or may not have Vision installed. This could be due to the box not having a Visio license or the device (such as an admin desktop) does not have access to production. The bundles can be accessed via a share or central repo and the diagram tool can be run from the administrators laptop.

By time stamping the .ZIP bundle this allows for a point in time capture of the environment. Performed weekly, daily, or hourly, this provides a repository of “as is” topology maps that can be used for diagrams, troubleshooting, charts, or aiding GSS when ticket issues arise.

### Using the Tool

First step is to run the NsxObjectCapture.ps1 script. This script requires an existing connection to NSX Manager and vCenter. (Connect-NsxServer and Connect-ViServer)

![Capturebindle](http://networkinferno.net/wp-content/uploads/2016/10/Screenshot-2016-10-20-13.03.32.png)

This will go off and collection all NSX Objects related to the logical topology and store it in a bundle.

![DiagramImport](http://networkinferno.net/wp-content/uploads/2016/10/Screenshot-2016-10-20-16.07.09.png)

Running the NsxObjectDiagram.ps1 script with the defined -CaptureBundle it will Launch Visio and turn the content of the bundle into a logical diagram. It will step through each component and stack it on the canvas. Based on the data inside the bundle it will process what an object is, select the right icon, and apply its connected members to it.

And below is the result of a basic 3 Tier application being drawn by the tool. It will auto-format the layout as the last step it does.

![Visio](http://networkinferno.net/wp-content/uploads/2016/10/Screenshot-2016-10-20-16.07.47.png)

### Bonus

* Within the shape data itself there the XML that represents the object. For example if you select an NSX Edge it has the relevant XML for the given edge. A Logical Switch includes the API output of that is the Edge
* Multi-vNIC VM’s are supported
* Use your own icons by modifying the contents of nsxdiagram.vssx

From one switch to hundreds. A logical router to dozens of edges. Ten VMs to ten thousand. This tool can handle this! Diagram with ease thanks to NSX Visio Diagramming tool! Get it today and as always, open an Issue if you want to see a feature added.

Another creation from the Wizard that is Nick Bradford!