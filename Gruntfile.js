module.exports = function (grunt) {
  // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require('load-grunt-tasks')(grunt)

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    eslint: {
      options: {
        configFile: '.eslintrc'
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
      },
      'git-pre-commit': {
        src: ['Gruntfile.js', 'highcharts-legend-yaxis.js'],
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
        compress: true
      },
      highcharts: {
        src: 'highcharts-legend-yaxis.js',
        dest: 'highcharts-legend-yaxis.min.js'
      }
    }
  })

  // Tasks
  grunt.registerTask('default', [
    'jsbeautifier:highcharts',
    'eslint:highcharts'
  ])
  grunt.registerTask('gruntfile', [
    'jsbeautifier:gruntfile',
    'eslint:gruntfile'
  ])
  grunt.registerTask('dist', [
    'jsbeautifier:highcharts',
    'eslint:highcharts',
    'uglify:highcharts'
  ])
}
