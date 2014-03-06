module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      highcharts: 'highcharts-legend-yaxis.js',
      gruntfile: 'Gruntfile.js'
    },
    jsbeautifier: {
      highcharts: {
        src: 'highcharts-legend-yaxis.js',
        options: {
          config: '.jsbeautifyrc',
          mode: 'VERIFY_ONLY'
        }
      },
      gruntfile: {
        src: 'Gruntfile.js',
        options: {
          config: '.jsbeautifyrc',
          mode: 'VERIFY_ONLY'
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '/* <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        separator: ',',
        compress: true,
      },
      highcharts: {
        src: 'highcharts-legend-yaxis.js',
        dest: 'highcharts-legend-yaxis.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jsbeautifier');

  // Tasks
  grunt.registerTask('default', [
    'jsbeautifier:highcharts',
    'jshint:highcharts'
  ]);
  grunt.registerTask('gruntfile', [
    'jsbeautifier:gruntfile',
    'jshint:gruntfile'
  ]);
  grunt.registerTask('dist', [
    'jsbeautifier:highcharts',
    'jshint:highcharts',
    'uglify:highcharts'
  ]);
};
