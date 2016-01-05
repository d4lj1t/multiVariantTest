"use strict"

module.exports = function (grunt) {

    grunt.initConfig({

        copy: {
            src: {
                files: [
                    {expand: true, cwd: "src/css", src: ["styles.css"], dest: "tmp/css"},
                    {expand: true, cwd: "src/images", src: ["**"], dest: "tmp/images"},
                    {expand: true, cwd: "src/include", src: ["**"], dest: "tmp/include"},
                    {expand: true, cwd: "src", src: ["*.html"], dest: "tmp"}

                ]
            },
            tmp: {
                files: [
                    {expand: true, cwd: "tmp", src: ["*.html"], dest: "dist"}
                ]
            }
        },

        concat: {
            css: {
                src: [
                    'src/css/**/*.css', '!src/css/styles.css'
                ],
                dest: 'src/css/styles.css'
            }
        },
        processhtml: {
            dist: {
                files: {
                    'tmp/index.html': ['tmp/index.html']
                }
            }
        },
        uncss: {
            dist: {
                files: {
                    "tmp/css/tidy.css": ["tmp/index.html"]
                }
            }
        },
        connect: {
            options: {
                port: "8080",
                useAvailablePort: true,
                livereload: true,
                open: true
            },
            dev: {
                options: {
                    base: "tmp/"
                }
            }
        },

        watch: {
            src: {
                files: ["src/css/**/*.css", "src/css/**/*.less", "src/images/**/*.{gif,png,jpg,jpeg}", "src/**/*.html"],
                tasks: ["build:development"],
                options: {
                    livereload: true
                }
            }
        },

        includereplace: {
            emailsIncludes: {
                files: [
                    {src: '*.html', 'dest': 'tmp', expand: true, cwd: 'src'}
                ],
                options: {
                    includesDir: 'src/include'
                }
            }
        },


        imagemin: {
            dist: {
                files: [
                    {expand: true, cwd: "tmp/images", src: ["**/*.{png,jpg,jpeg}"], dest: "dist/images"}
                ]
            }
        },



        htmlmin: {
            dist: {
                options: {
                    removeComments: true
                },
                files: {
                    "tmp/index.html": "tmp/index.html"
                }
            }
        },

        premailer: {
            options: {
                removeClasses: true
            },
            dist: {
                files: {
                    "tmp/index.html": "tmp/index.html"
                }
            }
        },
        litmus: {
            dist: {
                src: ['dist/*.html'],
                options: {
                    username: 'hofuxd@gmail.com',
                    password: 'House123!',
                    url: 'https://hof69b6.litmus.com',
                    clients: ['appmail6', 'notes6', 'notes7', 'notes8', 'notes85', 'ol2000', 'ol2002', 'ol2003', 'ol2007', 'ol2010', 'ol2011', 'ol2013', 'thunderbirdlatest', 'android22', 'android4', 'androidgmailapp', 'blackberry8900', 'blackberryhtml', 'iphone5s', 'ipad', 'ipadmini', 'iphone4', 'iphone5', 'iphone6', 'iphone6plus', 'aolonline', 'ffaolonline', 'chromeaolonline', 'gmailnew', 'ffgmailnew', 'chromegmailnew', 'outlookcom', 'ffoutlookcom', 'chromeoutlookcom', 'yahoo', 'ffyahoo', 'chromeyahoo', 'windowsphone8']
                }
            }
        }
    });

    grunt.registerTask("default", "Compiles the development environment", [
        "build:development",
        "connect:dev",
        "watch:src"
    ]);

    grunt.registerTask("build:development", "Compiles the development build", [
        "concat",
        "copy:src",
        /*"copy:tmp",*/
        'includereplace:emailsIncludes',
        "uncss:dist",
        "processhtml"

    ]);

    grunt.registerTask("build:distribution", "Compiles the distribution build", [
        "concat",
        "copy:src",
        'includereplace:emailsIncludes',
        "uncss:dist",
        "processhtml",
        "htmlmin:dist",
        "premailer:dist",
        "copy:tmp",
        "litmus:dist",
        "imagemin:dist"


    ])
    ;

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-imagemin");
    grunt.loadNpmTasks("grunt-uncss");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-premailer");
    grunt.loadNpmTasks('grunt-litmus');
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-processhtml');


};
