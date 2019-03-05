# fleetrace

This is an Angular/Typescript workspace. (I am using Visual Studio Code on Windows 10 to work on the project.)

## How to build

#### Install the prerequisits

I guess on a fresh Windows machine you would want to install in this order:

* Chrome browser (optional but recommended for development)
* [Visual Studio Code](https://code.visualstudio.com/download)
* [git](https://git-scm.com/)
* [node/npm and angular-cli](https://angular.io/guide/quickstart)
* [yarn package manager](https://yarnpkg.com/lang/en/)

Install *Visual Studio Code* before you install *git* so **Code** can be selected as an editor for **git** commit messages, when the git-installer asks.

#### Get the code

* Clone the repository
* Run yarn from the console.

#### build the project libraries first

* First run `ng build scoring` to build the scoring library.
* Next run `ng build fleetrace` to build the fleetrace library.
* Then run `ng build fr-local` to build the library of local components.
* Then run `ng build fr-remote` to build the library of remote components.

Then the default application can be built with `ng build fr01`.

## How to start the application

Use `ng serve -o` to see the FR01 application coming up in the browser on the desktop.

It should look as in the [test deployment](https://federgraph.de/fr01) on my web-site.

## How to build for deployment

* update `base-href=/fr01/` in `package.json` to match your need
* then run `npm run build-fr` to build the default application
* create a directory on your web-site and copy the files from `dist\fr01`

A web-server which can serve static files is all you need for deployment of FR01.

## Library projects

I have put most of the code into library projects, because I intend to build several applications, FR01 ... FRXX, all of which will be reusing the code behind.

### scoring

This is the javascore compatible scoring code which implements Racing Rules Of Sailing, Appendix A.

The original JavaScore project came with an GPL license. I looked into javascore's scoring code and ported the logic to Delphi, C#, and now Angular.

You could replace the scoring code with your own, but I think you will not. You are more likely to adapt the UI with a variation that works better with you device; and/or add to the api, so that you can access the specific data on your server.

### fleetrace

This is the main portion of the code for the Angular FR applications. Most of the code was directly ported from Delphi and/or C#. I wrote the Delphi code (2004), the C# code (2006), and the typescript code (2018).

### fr-home

The fr-home library project contains local Angular components, which you can use when testing on the local machine.

### fr-remote

The fr-remote project contains Angular components which will depend on the availability of a server - the server the Angular app will be served from. That server can be a node/express application, a Delphi desktop program with Indy Http Server included, an asp.net core application, or anything that implements the api.

I am currently working on a new version of the api. Want to make changes so that it is compatible with conventions used in asp.net core web application.

Currently the api is good for connection with central Delphi app or a light weight node app. The node app can use web sockets. The Delphi app can more complete and easier to use at home.

## Application projects

FR01 is the default and innocent test application. You will need to create a similar application project and add stuff - authentication, communication, api calls, all the things you may need and which are specific to your use case.

FR is a family of applications. Names up to FR99 are already taken. FR100 and above is reserved for end user projects.

---
03.05.2019
