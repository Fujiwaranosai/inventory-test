/**
 * Created by fujiw on 4/8/2016.
 */

app.directive('usd', function() {
	var ret = {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, elem, attrs, ctrl) {
			var keyCode = [8, 9, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110, 190];
			elem.bind("keydown", function (event) {
				var text = elem.val();

				var prevent = function() {
					scope.$apply(function () {
						scope.$eval(attrs.onlyNum);
						event.preventDefault();
					});
					event.preventDefault();
				};
				if (event.shiftKey) {
					prevent();
				} else  if (event.which == 190 || event.which == 110 || event.which == 46) {
					if (text.indexOf('.') > 0 || text.length == 0) {
						prevent();
					}
				} else if ($.inArray(event.which, keyCode) == -1) {
					prevent();
				}
			});
		}
	};
	return ret;
});