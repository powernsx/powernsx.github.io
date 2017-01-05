---
permalink: /docker/
---

# Docker Installation

Assuming a working docker installation, PowerNSX support can be found in the latest PowerCLI docker image.

```
docker pull vmware/powerclicore
```

```
docker run --rm -it vmware/powerclicore
```

_Note:  Due to some temporary issues with the PowerCLI Docker image based on Photon causing intermittent connection failures in PowerCLI and PowerNSX, the PowerCLI team have temporarily made PowerCLI Core (and PowerNSX) available on an Ubuntu based Docker Image.  This is expected to be rectified shortly, but in the meantime, use the following to get the ubuntu based image._

```
docker run --rn -it vmware/powerclicore:ubuntu14.04
```

There.  That was easy wasn't it! :)