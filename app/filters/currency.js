/**
 * Created by fujiw on 4/7/2016.
 */

app.filter('usd', function() {
	var func = function(data) {
		if(data.indexOf('$') == data.length - 1) {
			return data;
		}
		return data + '$';
	};
	return func;
});