# ndex-cravat-webapp

# Overview

This web application enables a user to perform an enrichment search in pre-configured sets of networks stored in NDEx, starting with either a CRAVAT gene report output file or with a simple gene list.

The networks found by the search are displayed to the user in ranked order. When the user selects a network, the network is displayed with any nodes matching the input genes highlighted.

If a CRAVAT output file is used as the input, the CRAVAT annotations are also mapped to the network. In this intial release, the node color is set based on the value of the annotation 'VEST pathogenicity score (non-silent).

# Using the App with CRAVAT output files

- Click the "Load Cravat TSV file" button.
- Select a CRAVAT gene report output file (a TSV format file) from you local file system
- The selected file will be loaded and parsed, extracting a list of query genes and associated annotations.
- The list of genes are added to the gene list panel in the top left of the page and the enrichment query is automatically performed.
- The search results are displayed on the right panel. (The uploaded file contents and the datastructure linking genes to attributes are also displayed below the search results)
- Click on "View Network" for any search result to display the network in a new browser tab.
- The application marks the nodes that contain VEST pathogenicity score (non-silent) with red.  The intensity of red depends on the value of VEST pathogenicity score (non-silent).

- Click Unload Cravat Data button in the bottom left panel, and re-run the enrichment by selecting the Submit button in the top left panel. 
- Note that for this query, when networks are visualized, no node in any network is red. The CRAVAT attributes were cleared and the query used only the gene symbols, so the nodes could not be colored by VEST scores.

# Building and Managing the Application

The source code for this project was scaffolded using the Yeoman Angular.js generator:  [yo angular generator](https://github.com/yeoman/generator-angular) (version 0.15.1.)

It uses the Bower system to manage external javascript libraries.

It is built using the Grunt framework.

## Cloning the Project

To clone this project run:

`git clone https://github.com/ndexbio/ndex-cravat-webapp.git`

this will clone the repository into a newly created directory  `ndex-cravat-webapp`

## Getting a Specific Release 

After cloning, you can get a specific release based on a tag.  Each tag corresponds to a released version, while other commits to the repository may only correspond to an intermediate code update. To select and use a specific release, get the list of tags and checkout the release with a specific tag.  For example, to get a release tagged `demo_v01_041316`:

`cd ndex-cravat-web-app` <br />
`git tag -l` <br />
`git checkout tags/demo_v01_041316`  <br />

## Installing Yeoman, Bower, and Grunt

This application is scaffolded with Yeoman, built with Grunt, and manages its javascript libraries with Bower.

To install these tools, issue

`npm install -g yo grunt-cli bower`

More information on installing Yeoman and using it for builidng applications is avaialble at the link below: https://www.safaribooksonline.com/blog/2013/07/02/web-applications-with-yeoman/

### Building 

After checking out the required branch and installing the tools, issue the following command to install dependencies
and update them:

`npm install` <br />
`bower update` <br />

### Running
`grunt serve`

## Testing
### Running Locally

Issue the following command to build the code and to launch a local Node.js web server running the site. A window in your default browser will automatically open.  Any changes (well, almost any) to the code will be 'noticed' by Grunt and the site will be automatically refreshed.

`grunt serve`

### Building for Deployment

Please follow steps on cloning, installing and building the project described above. To build version for deploying, issue

`grunt build` <br />

from the project's root directory.  This command creates or updates a `dist` directory.  Copy the contents of the `dist` directory to your web server. You can compress it for your convenience, for example 

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

### Testing
Running `grunt test` will run the unit tests with karma.
