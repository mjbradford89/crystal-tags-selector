'use strict';

var metal = require('gulp-metal');

metal.registerTasks({
	bundleCssFileName: 'tagsSelector.css',
	bundleFileName: 'tagsSelector.js',
	globalName: 'crystal',
	mainBuildJsTasks: ['build:globals'],
	moduleName: 'crystal-tagsSelector'
});
