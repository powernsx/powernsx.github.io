
PowerNSX requires PowerShell v3 or above, and PowerCLI (Recommend v6 and above).

To install PowerNSX, either use the automated installation script, or the manual steps below:

1) Automated Installation:
To download and install all prerequisites and PowerNSX in one easy go, run the following in a PowerShell window.

```
try { $wc = new-object Net.WebClient; $url="https://bitbucket.org/nbradford/powernsx/raw/v1/PowerNSXInstaller.ps1";$scr = try { $wc.DownloadString($url)} catch { if ( $_.exception.innerexception -match "(407)") { $wc.proxy.credentials = Get-Credential -Message "Proxy Authentication Required"; $wc.DownloadString($url) } else { throw $_ }}; $scr | iex } catch { throw $_ }
```

* Note: If you choose not to use the one-line method above, and instead download this script and run it from the filesystem, an execution policy allowing unsigned scripts to run will be required.  This is also required for PowerCLI to function.  This is **not** required if you simply copy/paste the above line into a PowerShell window ( the installation will configure the appropriate ExecutionPolicy automatically).  To configure the correct ExecutionPolicy, run the following in a PowerShell window: 

```
set-executionpolicy remotesigned.
```



2) Manual installation:

* An execution policy allowing unsigned modules to be loaded is required (Required for PowerCLI as well).  To configure this, run the following in a PowerShell window:

```
set-executionpolicy remotesigned.
```

* If you downloaded the module (as opposed to copy text and paste to a new file), you first have to 'unblock' it.  Locate the file, get properties and click 'Unblock'.  
* Start PowerCLI
* If you haven't already, set at least a RemoteSigned execution policy - Set-ExecutionPolicy RemoteSigned.  This only needs to be done once and you probably already did it for PowerCLI to work.
* import-module <path to PowerNSX.psm1>

To explore PowerNSX usage, see [[Usage]]