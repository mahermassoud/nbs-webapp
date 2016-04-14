# ndex-cravat-webapp

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)

version 0.15.1.

## Cloning Project

To clone project run 

`git clone https://github.com/ndexbio/ndex-cravat-webapp.git`

this will clone rpository into newly created directory  `ndex-cravat-webapp`

## Getting Specific Release 

After cloning, you can get a specific release (releases have tags). To do so, get a list of tags, and checkout a release with a specific tag:

`cd ndex-cravat-web-app` <br />
`git tag -l` -- get a list of tags <br />
`git checkout tags/demo_v01_041316` -- checkout a release tagged `demo_v01_041316` <br />

## Running Locally

### Installing Yeoman
NDEx Cravat WebApp is a Yeoman application, so make sure that you have `yo`, `grunt` and `bower` installed 
if you want to build and run this application locally.  To install these tools, issue

`npm install -g yo grunt-cli bower`

More information on installing Yeoman and using it for builidng applications is avaialble at the link below: https://www.safaribooksonline.com/blog/2013/07/02/web-applications-with-yeoman/

### Building 
After checking out the required branch and installing Yeoman tools, issue the following commande to install dependencies
and update them:
`npm install`
`bower update`

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.
