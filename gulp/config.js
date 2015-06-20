var dest = './dist/';
var example = './example/';
var src = './src';

module.exports = {
	less: {
		env: 'production',
		src: src + '/colors/less/core/main.less',
		dest: dest
	},
	react: {
		env: 'production',
		src: src + '/dynamic/core/core.react.js',
		dest: dest
	},
	example: {
		less: {
			env: 'example',
			src: src + '/colors/less/example/example.less',
			dest: example
		},
		react: {
			env: 'example',
			src: src + '/dynamic/example/example.app.js',
			dest: example
		}
	}
};