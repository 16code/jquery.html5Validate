'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
    // Task configuration.
    clean: {
      all:{
      	  src: ['dist', '.build']
      },
      build:{
      	  src: ['.build']
      }
    },
  	transport:{
  		options: {
			idleading: 'dist/',
			debug : false,
			alias: {
				'jquery': 'jquery'
			}
		},
  	src:{
			files:[{
  				expand: true,
  				cwd: 'src/',
  				src:'**/*.js',
				  dest: '.build/'
  			}]
  		}
  	},
    concat: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
      	  files:[
      	  	  {dest: 'sea-modules/dist/common/js/a_b.js', src : ['.build/common/js/a.js','.build/common/js/b.js','.build/common/js/a_b.js' ]},
      	      {dest: 'sea-modules/dist/common/ui/dialog/dialog.js', src: '.build/common/ui/dialog/dialog.js'},
      		  {dest: 'sea-modules/dist/jquery.html5Validate.js' , src: '.build/jquery.html5Validate.js'}
      	  ]
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/jquery.<%= pkg.name %>.min.js'
      },
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('default', ['clean:all', 'transport', 'concat', 'clean:build']);
  grunt.registerTask('cmd', ['transport', 'concat']);
};