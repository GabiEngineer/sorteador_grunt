module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: { //Configurando o LESS
      development: { //Config de desenvolvimento
        files: {
          'dev/styles/main.css': 'src/styles/main.less'
        }
      },
      production: { //Config final para o usuário
        options: {
          compress: true, // Comprimindo o arquivo final
        },
        files: {
          'dist/styles/main.min.css': 'src/styles/main.less'
        }
      }
    },
    watch: {
      less: {
        files: ['src/styles/**/*.less'],
        tasks: ['less:development']
      },
      html: {
        files: ['src/index.html'],
        tasks: ['replace:dev']
      }
    },
    replace: {
      dev: {
        options: {
          patterns: [
            {
              match: 'ENDERECO_DO_CSS',
              replacement: './styles/main.css'
            },
            {
              match: 'ENDERECO_DO_JS',
              replacement: '../src/scripts/main.js'
            }
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['src/index.html'],
            dest: 'dev/'
          }
        ]
      },
      dist: {
        options: {
          patterns: [
            {
              match: 'ENDERECO_DO_CSS',
              replacement: './styles/main.min.css'
            },
            {
              match: 'ENDERECO_DO_JS',
              replacement: './scripts/main.min.js'
            }
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['prebuild/index.html'],
            dest: 'dist/'
          }
        ]
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'prebuild/index.html': 'src/index.html'
        }
      }
    },
    clean: ['prebuild'],
    uglify: {
      target: {
        files: {
          'dist/scripts/main.min.js': 'src/scripts/main.js'
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-less'); // Carregando o plugin do LESS
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  grunt.registerTask('default', ['watch']); //Execultando os registros
  grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']);
}