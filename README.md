# fleetrace

This is an Angular/Typescript workspace. I will start with uploading the code behind library and add components and applications later.

(I will add code step by step.)

## library Scoring

This is the 'javascore' compatible scoring code. It implements the Racing Rules Of Sailing, Appendix A - Scoring.

## library fleetrace

This is the main portion of the code behind for the FR applications.

## library fr-home

This library project contains local Angular components, which do not make any ajax calls and work when testing on the local machine.

## library fr-remote

This library project contains Angular components which will depend on the availability of a server, e.g. the node server the Angular will be served from.

## Build

(Later, when I have uploaded the code.)

First run `ng build scoring` to build the scoring library.
Next run `ng build fleetrace` to build the fleetrace library.
Then run `ng build fr-local` to build the library of local components.
Then run `ng build fr-remote` to build the library of remote components.
Then run `ng build fr01` to build the default application.
Then run `ng build frxx` to build one of the other applications (xx).

