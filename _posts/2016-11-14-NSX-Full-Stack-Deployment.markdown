---
title:  "NSX Full Stack Deployment"
date:   2016-11-14
---

In our line of work we are often deploying NSX environments in the lab. One of our labs allows us to deploy a multi-cluster vSphere environment and configure it with storage, clusters, vCenter elements, and DVS with PowerCLI very quickly. This allows our team to quickly deploy a topology and validate a customer environment, squash a bug, or configure a new integration.

## Automate all the things

With all these new environments it is pretty painful and slow to deploy NSX again and again. So here is the script we use to deploy NSX from nothing and deploy it all the way through to a working 3 Tier App.

## Why now?

To be frank, we've been sitting on something like this since January and just assume it was useful to use. Time to dust it off and share with the wide world.

## Running the Script

There are a heap of parameters that you will need to adjust for your environment. Storage and Cluster names are the ones that are most likely to be different. IP addresses too. The idea of this script is that you can take the code you need and create something of your own.

By running `./NSXBuildFromScratch.ps1` the following will occur:

* Validate and collect Virtual Infrastructure
* Deploy NSX Manager
* Register NSX Manager
* Deploy NSX Controller
* Prepare vSphere clusters for DFW/VXLAN
* Configure VNI and Transport Zone

Whilst the infrastructure is deploying there are checks to ensure if timeouts occur they are handled. This pertains mostly to the Host preparation steps.

Once completed the 3 Tier Application is deployed.

* Logical Switches
* Logical Router
* Edge
* Edge and DLR routing
* Edge Load Balancer
* Distributed Firewall / Rules
* Deploy vApp

So what are you waiting for? Grab the script, download the 3 Tier App OVA and get your groove on!

Download the [Script](https://github.com/vmware/powernsx/blob/master/Examples/NSXBuildFromScratch.ps1)

Download the Bookstore [3 Tier App](http://goo.gl/oBAFgq) for yourself.


