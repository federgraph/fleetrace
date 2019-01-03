# fleetrace

This is an Angular/Typescript workspace.

I am new to GitHub, new to developing Angular applications, and I will upload the initial code step by step.

Code is at version 0.0.1, considered Alpha.

## scoring lib

This is the 'javascore compatible' scoring code. It implements the Racing Rules Of Sailing, Appendix A - Scoring.

JavaScore always had an GPL license. I looked hard into the javascore project a long time ago, and ported some of the core scoring logic to Delphi and  C#.

I do not want to reinvent the wheel, and I appriciate the work that was done in the javascore project as the original source.

Actually, the typescript code in project scoring was ported from Delphi.

## fleetrace lib

This is the main portion of the code for the FR applications.

All code was ported to typescript from Delphi and/or C#.

(I wrote the code.)

## fr-home lib

This library project contains local Angular components, which do not make any ajax calls and work when testing on the local machine.

## fr-remote lib

This project contains Angular components which will depend on the availability of a server, e.g. the node server the Angular app will be served from.

## FR01 app

You can use ng serve fr01 to see this app in Chrome and debug with dev-tools.

This is where you start to explore the project.

## How to build

(Later, when I have uploaded the code.)

- First run `ng build scoring` to build the scoring library.
- Next run `ng build fleetrace` to build the fleetrace library.
- Then run `ng build fr-local` to build the library of local components.
- Then run `ng build fr-remote` to build the library of remote components.
- Then run `ng build fr01` to build the default application.

