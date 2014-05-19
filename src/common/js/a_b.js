define(function(require, exports, module){
	console.log(require.resolve('./b'));
	
	var a = require('./a');
	var b = require('./b');
	module.exports = {
		a : a,
		b : b
	}
});