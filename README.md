ICON v2 Front-End
=================

This README describes how to build the ICON v2 front-end application for development, testing, and deployment purposes.

Introduction
-------------
The Immunize Connect Ontario (ICON) application allows Ontario residents to securely retrieve a copy of their (or their dependents’) personal immunization history from the provincial database, Panorama, and to report newly administered immunizations to their local Public Health Unit for review. 

ICON is a web-based application which is made available over the public Internet. The application is designed so that a single central instance of the application is deployed, but is capable of rendering custom text, logos, and headers as appropriate for each of Ontario’s 36 Public Health Units. 

The ICON application allows members of the public to report immunization histories for themselves and their dependents. These self-reported immunization histories can be retrieved from and submitted to the Digital Health Immunization Repository (DHIR) services component of the Digital Health Delivery Platform (DHDP).

The purpos of this document is to describe a way to migrate on primise ICON applcation to AWS cloud platform from build and depoyment 
perspective. 

See the demo of ICON on AWS
---------------------
in you host file add line as below :
xxsupportphu1.icon.ehealthontario.ca       3.91.32.32  # ipv4 provisioned by AWS 

open URL http://xxsupportphu1.icon.ehealthontario.ca:8088 with any broswer


Bundling the App for Production
-------------------------------

**Prerequisites:**
- NodeJS version 6.9.2 or higher [NodeJS download](https://nodejs.org)

AWS:
- AWS use IaSS provided by EC2 



Bundling the App for Production
-------------------------------

Webpack is used to bundle an optimized version of the front-end application into the ./dist directory.

1. Run ```npm install -E```
2. Run the ```npm start``` command
3. Observe that the ```./dist``` directory has been created
4. Confirm that the ```./dist``` directory is populated with an ```app.bundle.js```, ```index.html```, and a variety of other resource files such as templates etc.
5. Confirm the last modified date of the ```app.bundle.js``` matches the time of build (if needed for troubleshooting)



Running the App during Development
----------------------------------

1. Run ```npm install -E```
2. Run ```npm run dev-serve```
3. Open a browser to ```http://localhost:3001```


**NOTE:** *the base URL in ```app.js``` may be modified to connect to ICON v2 back-end endpoints and services, as needed in your local development environment.*


Running the Test suite
----------------------

Steps for running the test suite can be found in [./test/README.md](./test/README.md)


Project Directory Structure
---------------------------

All source code is located in ```./src/```.

When the project is build for deployment, a new directory named ```./dist``` will be created to contain the deployable front-end application resource bundle.

Source files are contained in directories named after the type of code they contain:
```
/src
|-- /components
|-- /css
|-- /directives
|-- /filters
|-- /fonts
|-- /img
|-- /lib
|-- /models
|-- /multitenancy
|-- /phu
|-- /services
    |-- /localization
|-- /views
```

You will find a ```README.md``` to accompany any source code that requires configuration, or some kind of extra care and attention outside of normal best-practices for and AngularJS application.
- PHU multitenancy configuration [./src/multitenancy/README.md](./src/multitenancy/README.md)
- localization (French / English translations) [./src/services/localization/README.md](./src/services/localization/README.md)
- views (screens) [./src/views/README.md](./src/views/README.md)

*Last Updated: 2017-05-15 (v2.32.3)*
