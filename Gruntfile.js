module.exports = function(grunt){
	grunt.initConfig({
		//builds svg libraries
		svgstore: {
			default: {
				files:{
					'src/components/icons/defs/svg-defs.svg':['src/components/icons/*.svg'],
				}	
			},
		},
	  // define source files and their destinations
		watch: {
		    js:  { files: 'src/components/icons/*', tasks: [ 'svgstore' ] },
		}
	});
	//grunt.loadNpmTasks('grunt-svgstore');

	// load plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-svgstore');
	
	// register at least this one task
	grunt.registerTask('default', [ 'svgstore','watch' ]);
}