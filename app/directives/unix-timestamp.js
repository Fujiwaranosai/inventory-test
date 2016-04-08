/**
 * Created by fujiw on 4/7/2016.
 */

app.directive('unix', function() {
	var ret = {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, elem, attr, ctrl) {
			var fromUser = function(text) {
				var d = Date.parse(text);
				return d;
			};
			var toUser = function(time) {
				console.log(time);
				return new Date();
			};

			ctrl.$parsers.push(fromUser);
			//ctrl.$formatters.unshift(toUser);
		}
	};
	return ret;
});