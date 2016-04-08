/**
 * Created by fujiw on 4/8/2016.
 */

app.directive('usd', function($filter) {
	var ret = {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, elem, attr, ctrl) {
			elem.val($filter('usd')(elem.val()));
			elem.bind('blur', function() {
				var text = elem.val().replace(/\$/g, '');
				elem.val($filter('usd')(text));
			});
			elem.focus(function (event) {
				var text = elem.val().replace(/\$/g, '');
				elem.val(text);
			});

			var fromUser = function(text) {
				return text.replace(/\$/g, '');
			};

			ctrl.$parsers.push(fromUser);
		}
	};
	return ret;
});