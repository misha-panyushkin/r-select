var RSelect = require('r-select');

function App () {}

(function () {

	this.start = function () {
		React.render(
			<RSelect/>, 
			document.getElementById('react-stage')
		);
	};

}).call(App.prototype);

new App().start();