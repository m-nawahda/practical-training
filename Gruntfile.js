const { task } = require("grunt");

module.exports = function(grunt) {
     grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
               
            less: {
                   dist: {
                      files : {
                        'style/style.css':'style/main.less',
                      }
                   } 
            },
            watch: {
                css: {
                  files: '**/*.less',
                  tasks:["less"]
                }
            }
            
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default',["watch"])
  };