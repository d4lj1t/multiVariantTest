module.exports = function(grunt) {

    function sendToBuild(src, dest) {
        console.log("Src 1: " + src);
        console.log("Dest 1: " + dest);

        dest = dest.split('/');


        var finalLocation = dest[0] + '/' + 'build/';

        if (src == "styles.css" || src == "scripts.js") {
            dest = dest.splice(2, dest.length);
            dest[dest.length - 1] = src;

            console.log("Dest now: ");
            console.log(dest);

        } else {
            dest = dest.splice(2, dest.length);
        }

        finalLocation += dest.join('/');

        console.log(finalLocation);

        console.log('------------');
        console.log('')

        return finalLocation;
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            js: {
                files: ['src/assets/scripts/**/*.js'],
                tasks: ['default']
            },
            less: {
                files: ['src/assets/styles/**/*.less'],
                tasks: ['default']
            },
            css: {
                files: ['src/assets/styles/**/*.css'],
                tasks: ['default']
            }
        },
        less: {
            target: {
                files: [{
                    expand: true,
                    cwd: '.',
                    src: ['**/assets/styles/*.less', '!**/node_modules/'],
                    dest: '.',
                    ext: '.css'
                }]
            }
        },
        concat: {
            css: {
                files: [{
                    expand: true,
                    cwd: '.',
                    src: [
                        '**/src/assets/styles/*.css',
                        '!**/node_modules/'
                    ],
                    dest: 'styles.css',
                    rename: sendToBuild
                }]
            },

            js: {
                files: [{
                    expand: true,
                    cwd: '.',
                    src: [
                        '**/src/assets/scripts/*.js',
                        '!**/node_modules/'
                    ],
                    dest: 'scripts.js',
                    rename: sendToBuild
                }]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '.',
                    src: [
                        '**/build/assets/styles/*.css',
                        '!**/node_modules/', '!**/*.min.css'
                    ],
                    dest: '.',
                    ext: '.min.css',
                }]
            }
        },
        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: '.',
                    src: [
                        '**/src/assets/scripts/*.js',
                        '!**/node_modules/',
                        '!**/*.min.js'
                    ],
                    dest: '.',
                    ext: '.min.js'
                }]
            }
        },
        copy: {
            main: {
                src: 'src/assets/images/*',
                dest: 'build/assets/images/',
                flatten: true,
                expand: true,
                rename: sendToBuild
            }
        },
        jshint: {
            options: {
                force: true
            },
            files: {
                src: ['**/src/assets/scripts/**/*.js', '!**/node_modules/']
            }
        },
        inline: {
            dist: {
                files: [{
                    expand: true,
                    src: '**/src/index.html',
                    dest: 'build/index.html',
                    rename: sendToBuild
                }]
            },
            prod: {
                options: {
                    uglify: true,
                    cssmin: true
                },
                files: [{
                    expand: true,
                    src: '**/src/index.html',
                    dest: 'build/index.html',
                    rename: sendToBuild
                }]
            }
        }
    });

    grunt.registerTask('default', ['less', 'concat', 'copy:main', 'inline:dist']);
    grunt.registerTask('prod', ['less', 'cssmin', 'uglify', 'concat', 'copy:main', 'inline:prod']);

    grunt.registerTask('derp', ['inline:prod']);

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-inline');
};
