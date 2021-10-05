# Project Title
OPERE PUBBLICHE OPEN

Monitoraggio Territoriale Interventi in Piemonte

## Notes
The following documentation, and all the documentation present in the project components adhere to the [RFC-2119](https://tools.ietf.org/html/rfc2119) regarding the requirement level key words.

# Project Description
This is a multi-module project handling the purchasing cycle for the Public Administration.

The modules are as follow:

backend services:
* [motibe](https://github.com/regione-piemonte/moti-motibe): REST service implementation
frontend services:
* [motife](https://github.com/regione-piemonte/moti-motife): Angular application
transversal:
* [motidb](https://github.com/regione-piemonte/moti-motidb): database implementation, with all the required scripts
* [motimanual](https://github.com/regione-piemonte/moti-motimanual): user manual
* motiscript: CLI scripts to be invoked by a scheduler (WIP)
# Configurations
For the configuration of each single module, please refer to the README.md file which is present in each module.

# Getting Started
Please refer to the Prerequisites section to gather the requested configuration prior to configure the project.

Please refer to the Installing section for specifications about the installation process.

# Prerequisites
The Java projects are written in UTF-8 and are compatible with Java 11.0.6
Apache Maven 3.6.3 for the building process (the corresponding Maven Wrapper scripts are present to enable the compilation even without the dependency)

All the libraries listed in the BOM.csv must be accessible to compile the project. The libraries are published at local repository which is set as the Maven repository in the pom.xml files. Set the correct repository addresses in the configuration files.

A "Java EE8 full profile"-compatible Application Server (tested on JBoss Wildfly 17.0.1)

The correct version for the DBMS (tested on PostgreSQL 9.6.10)

# Versioning
We partially use Semantic Versioning for versioning. (http://semver.org)

A major version increment in SemVer standard corresponds to a non-compatible upgrade of the project; yet a non-compatible upgrade to the project not necessarily corresponds to a major version increment.

# Authors
See the list of contributors who participated in this project in file [AUTHORS.txt](https://github.com/opere-pubbliche-open/moti/AUTHORS.txt).

# Copyrights
See the list of copyrighters in this project in file Copyrights.txt
"© Copyright CSI Piemonte – 2021".

# License
The source code is licensed under the European Union Public Licence 1.2 or later.
SPDX-License-Identifier: EUPL-1.2-or-later

See the "[EUPL v1_2 IT-LICENSE.txt](https://github.com/opere-pubbliche-open/moti/EUPL v1_2 IT-LICENSE.tx)" and "[EUPL v1_2 EN-LICENSE.txt](https://github.com/opere-pubbliche-open/moti/EUPL v1_2 EN-LICENSE.txt)" files for details.