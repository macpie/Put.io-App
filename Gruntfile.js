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
                }]
            }
        },
        shell: {
            chrome: {
                command: 'npm run build'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('chrome', ['clean:chrome', 'shell:chrome', 'copy:chrome',]);
}
