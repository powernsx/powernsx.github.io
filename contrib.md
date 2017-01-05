---
permalink: /contrib/
---

# Contributing to PowerNSX

Contribution and feature requests are more than welcome, please use the following methods:

For bugs and issues, please use the issues register with details of the problem.
For Feature Requests, please use the issues register with details of what's required.
To contribute code, create a fork, make your changes in a feature branch and submit a pull request.

## Testing PowerNSX

As of now, PowerNSX has a (still incomplete) formal test suite.  In order to develop additional features, contribution of corresponding tests is requested.

Tests are organised under functional section in the tests/ directory.  Pester is the test framework used.  Any contribution of tests for existing functionality is greatly appreciated!

If you make modifications to PowerNSX, ensure the current test set completes successfully, as well as including tests for your new functionality or fixes before submitting a pull request.

In the near future, these tests will be the foundation of CI tests that are automatically executed before a PR can be merged.

## Executing the tests

### Pre-Requisites

All tests require a 'sacrifical' NSX environment.  Internally we use labs running nested vSphere/NSX environments, but any functional NSX environment will be suitable.

*Do not execute tests agains a production or important NSX environment.  Duh!*

Existing tests do not indescriminantly delete/modify existing configuration, but care should be taken, and isolated and disposable NSX environments are recommended for this purpose!

In order to execute tests, the NSX environment should be configured as follows:

* NSX Manager Deployed.
* A single Transport Zone consisting of at least one cluster of at least one ESXi host.
* A functional NSX control plane (at least one controller deployed and functional.)

### Execution

Assuming you have git cloned the powernsx repository, cd into the repository, launch powershell, import the test module and initiate the tests using the Start-Test function.  Running Start-Test without any arguments will execute most PowerNSX tests (in future some tests will be excluded from default runs for a variety of reasons).

Example (Desktop/Full version of PowerShell on Windows), Current working directory is the root folder of the powernsx repository :

```
Import-Module tests/Test.Psd1
Start-Test
```

Example (Core version of PowerShell on Linux / OSX), Current working directory is the root folder of the powernsx repository :

```
Import-Module tests/TestCore.Psd1
Start-Test
```

*The Test Module is the same for both Core and Full versions of PowerNSX, but the manifest is dfferent to deal with different module prerequisites.  The TestCore.Psd1 manifest references Test.Psm1 module.*

*You must import the Test manifest (psd1), not the module itself (psm1)*

### Executing Individual Tests

Tests are broken up according to functional area.  If you are working on NAT functionality for instance, its possible to just run NAT related tests.  The name of the functional area is defined within the 'Describing' block within the test file.  You can pass this string as the only argument to the Start-Test function to execute those tests in isolation.

Example:
```
Start-Test "Edge NAT"
```

The first time tests are executed, default connection details are prompted for and optionally saved to disk.  These can be overridden by deleting the Test.cxn file in the tests directory if it becomes necessary to reconfigure them.  Currently these credentials are stored in CLEAR TEXT.  See Known Issues for details.

### Known Issues

Due to module dependancy and module autoloading functionality in PowerShell, tests should be executed from a new PowerShell session, and preferably without existing PowerNSX or PowerCLI modules loaded for consistent results.  Tests will automatically load the PowerNSX module within the current repository for testing (not the module from the default Module path!) so easy testing of development changes to the module can be performed.

You must launch tests using the Start-Test function, and *must not* use Invoke-Pester or individual test execution to perform tests.  This action is blocked intentionally, again due to module loading prerequisites.

Due to a limitation in ConvertFrom-SecureString on PowerShell Core, credentials specified for testing will be persisted to disk in an insecure manner.  This will be resolved as soon as the underlying issue in ConvertFrom-SecureString is.


