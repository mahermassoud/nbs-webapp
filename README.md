# ndex-cravat-webapp

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)

version 0.15.1.

## Cloning Project

To clone project run 

`git clone https://github.com/ndexbio/ndex-cravat-webapp.git`

this will clone repository into newly created directory  `ndex-cravat-webapp`

## Getting Specific Release 

After cloning, you can get a specific release (releases have tags). To do so, get a list of tags, and checkout a release with a specific tag.  For example, to get a release tagged `demo_v01_041316`:

`cd ndex-cravat-web-app` <br />
`git tag -l` <br />
`git checkout tags/demo_v01_041316`  <br />

## Running Locally

### Installing Yeoman
NDEx Cravat WebApp is a Yeoman application, so make sure that you have `yo`, `grunt` and `bower` installed 
if you want to build and run this application locally.  To install these tools, issue

`npm install -g yo grunt-cli bower`

More information on installing Yeoman and using it for builidng applications is avaialble at the link below: https://www.safaribooksonline.com/blog/2013/07/02/web-applications-with-yeoman/

### Building 
After checking out the required branch and installing Yeoman tools, issue the following command to install dependencies
and update them:

`npm install` <br />
`bower update` <br />

### Running

`grunt serve`

## Building for Deploying
Please follow steps on cloning, installing and building the project described above. To build version for deploying, issue

`grunt build` <br />

from the project's root directory.  This command creates `dist` directory.  Copy the contents of this directory to your web server. You can compress it for your convenience, for example 

`cd dist` <br />
`tar -zcvf ndex-cravar-webapp.tar.gz *`


The actual javascripts are in `dist/scripts` directory.  They have been `uglified` by the `grunt build` command, i.e., all project's javascript files have been combined together, and have new lines removed to make the resulting scripts more compact.

In case you want your deployment scripts to be readable, please modify your Gruntfile.js to disable your `uglify` task by 

1) removing `uglifyjs` from `useminPrepare` :

    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },
    
2) and removing `uglify` from
  
    grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'postcss',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin']);

After removing `uglifyjs` and `uglify`, rebuild your project with `grunt build`, and re-deploy it.


## Testing

Running `grunt test` will run the unit tests with karma.
