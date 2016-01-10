module.exports = function(grunt) {

  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),
      connect: {
        server: {
          options: {
            base: './'
          }
        }
      },

      less: {
        development: {
          options: {
            paths: ["./styles/"]
          },
          files: {
            "./styles/css/main.css": "./styles/less/main.less",
            "./styles/css/tablet.css": "./styles/less/tablet.less",
            "./styles/css/mobile.css": "./styles/less/mobile.less",
          }
        }
      },
   
      cssmin: {
        options: {
          shorthandCompacting: false,
          roundingPrecision: -1
        },
        app: {
          files: {
            './dist/app.min.css': [
              './styles/css/main.css',
              './styles/css/tablet.css',
              './styles/css/mobile.css'
            ]
          }
        },
        libs: {
          files: {
            './dist/libs.min.css': [
              './bower_components/html5-boilerplate/css/normalize.css',
              './bower_components/html5-boilerplate/css/main.css',
              './bower_components/animate.css/animate.css',
              './bower_components/bootstrap/dist/css/bootstrap.css',
              './bower_components/bootstrap/dist/css/bootstrap-theme.css'
            ]
          }
        }
      },

      uglify: {
        options: {
          beautify: true,
          compress: true,
          sourceMap: true
        },
        app: {
          files: {
            './dist/app.min.js': [
              './scripts/app.js'
            ]
          }
        },
        libs: {
          files: {
            './dist/libs.min.js': [
              './bower_components/jquery/dist/jquery.min.js', 
              './bower_components/bootstrap/dist/js/bootstrap.min.js'
            ]
          }
        }
      },

      // Append a timestamp to JS and CSS files which are located in 'index.html'
      cachebreaker: {
        dev: {
          options: {
            match: [
              // CSS
              'bower_components/font-awesome/css/font-awesome.min.css',
              'dist/libs.min.css',
              'dist/app.min.css',

              // JS
              'dist/libs.min.js',
              'dist/app.min.js'
            ],
          },
          files: {
            src: ['./index.html']
          }
        }
      },

      watch: {
        options: {
          livereload: true,
        },
        js: {
          files: ['./*/*.js'],
          tasks: ['uglify:app']
        },
        less: {
          options: {
            livereload: false
          },
          files: ['./styles/less/*.less'],
          tasks: ['less', 'cssmin:app']
        }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  
  grunt.loadNpmTasks('grunt-cache-breaker');

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-cache-breaker');
  grunt.loadNpmTasks('grunt-notify');

  grunt.task.run('notify_hooks');
  
  grunt.registerTask('default', ['less', 'cssmin:app', 'uglify:app', 'cachebreaker', 'connect', 'watch']);
  grunt.registerTask('build', ['less', 'cssmin:libs', 'cssmin:app', 'uglify:libs', 'uglify:app', 'cachebreaker', 'connect', 'watch']);

};