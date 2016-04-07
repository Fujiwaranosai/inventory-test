/**
 * Created by fujiw on 4/7/2016.
 */

app.filter('unix', function() {
	var func = function(data) {
		var d = moment.unix(data);
		return d.format('YYYY-MM-DD');
	};
	return func;
});