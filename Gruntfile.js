'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 2023,
                    base: './',
                    hostname:'*',
                }
            }
        },
        watch: {
            options: {
                /*livereload: true*/
                livereload: {
                    host: '0.0.0.0',
                    port: 35729,
                    // you can pass in any other options you'd like to the https server, as listed here: http://nodejs.org/api/tls.html#tls_tls_createserver_options_secureconnectionlistener
                }
            },
            files: [   // Files to livereload on
                "src/js/**/*.js",
                "src/css/**/*.css",
                "src/index.html",
                "!src/js/classes/config.js"
            ],
            //tasks: ['setBuildNumber'],
        },
    });

    // Load the plugin that provides the "connect" task.
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Load the plugin that provides the "watch" task.
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['serve']);

    grunt.registerTask('serve', ['connect', 'watch',]);

};
