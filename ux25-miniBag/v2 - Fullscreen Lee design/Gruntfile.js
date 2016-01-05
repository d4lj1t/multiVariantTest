module.exports = function(grunt) {
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
                    cwd: 'src/assets/styles/less/',
                    src: ['*.less'],
                    dest: 'src/assets/styles/css/',
                    ext: '.css'
                }]
            }
        },
        concat: {
            css: {
                src: [
                    'src/assets/styles/css/*.css'
                ],
                dest: 'build/assets/styles/styles.css'
            },

            js: {
                src: [
                    'src/assets/scripts/**/*.js'
                ],
                dest: 'build/assets/scripts/scripts.js'
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'build/assets/styles/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/assets/styles',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'build/assets/scripts/',
                    src: ['**/*.js', '!*.min.js'],
                    dest: 'build/assets/scripts',
                    ext: '.min.js'
                }]
            }
        },
        copy: {
            main: {
                src: 'src/assets/images/*',
                dest: 'build/assets/images/',
                flatten: true,
                expand: true
            }
        },
        jshint: {
            options: {
                force: true
            },
            files: {
                src: ['src/assets/scripts/**/*.js']
            }
        },
        inline: {
            dist: {
                src: 'src/index.html',
                dest: 'build/index.html'
            },
            prod: {
                options: {
                    uglify: true,
                    cssmin: true
                },
                src: 'src/index.html',
                dest: 'build/index.html'
            }
        }
    });

    grunt.registerTask('default', ['less', 'concat', 'copy:main','inline:dist']);
    grunt.registerTask('prod', ['less', 'cssmin', 'uglify', 'concat', 'copy:main', 'inline:prod']);

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-inline');
};
