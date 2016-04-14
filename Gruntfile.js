module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
        },

        concat: {
            dist: {
                src: ['src/sol-data-option.js', 'src/sol-data-optiongroup.js', 'src/sol-core.js'],
                dest: 'build/sol-<%= pkg.version %>.js',
                options: {
                    banner: ";(function ($, window, document, undefined) {\n 'use strict';\n",
                    footer: "}(jQuery, window, document));"
                }
            }
        },

        qunit: {
            all: ['test/**/*.html'],
            options: {
                timeout: 10000
            }
        },

        copy: {
            dist: {
                files: [
                    {src: 'build/sol-<%= pkg.version %>.js', dest: 'dist/sol.js'}
                ],
            },
        },

        uglify: {
            options: {
                banner: '/* <%= pkg.name %> v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n' +
                '/* <%= pkg.homepage %>\n' +
                '/* Licensed under the <%= pkg.license %> license',
                sourceMap: true,
                sourceMapName: 'dist/sol.min.js.map'
            },
            build: {
                src: 'dist/sol.js',
                dest: 'dist/sol.min.js'
            }
        },

        sass: {
            dist: {
                files: {
                    'dist/sol.css': 'src/sol.src.scss'
                }
            }
        },

        cssmin: {
            dist: {
                src: 'dist/sol.css',
                dest: 'dist/sol.min.css',
                options: {
                    sourceMap: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'concat', 'qunit', 'copy', 'uglify', 'sass', 'cssmin']);

};
