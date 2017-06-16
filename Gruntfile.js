module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            chrome: 'chrome/build/*'
        },
        copy: {
            chrome: {
                files: [{
                    expand: true,
                    src: 'build/**',
                    dest: 'chrome/'
                }, {
                    expand: true,
                    src: 'img/*',
                    dest: 'chrome/build/'
                }, {
                    src: 'chrome/manifest.json',
                    dest: 'chrome/build/manifest.json'
                }, {
                    expand: true,
                    flatten: true,
                    src: 'chrome/background/*',
                    dest: 'chrome/build/'
                }]
            }
        },
        shell: {
            chrome: {
                command: 'npm run build'
            }
        },
        watch: {
            options: {
                interrupt: true,
            },
            files: [
                'src/**',
                'public/**',
                'img/**',
                'chrome/background/**',
                'chrome/manifest.json',
            ],
            tasks: ['chrome-light']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('chrome', ['clean:chrome', 'shell:chrome', 'copy:chrome']);
    grunt.registerTask('chrome-light', ['clean:chrome', 'copy:chrome']);
}
