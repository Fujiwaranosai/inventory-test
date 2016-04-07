/**
 * Created by fujiw on 4/6/2016.
 */

app.directive('showFocus', function($timeout) {
	return function(scope, element, attrs) {
		scope.$watch(attrs.showFocus, function(newValue) {
			$timeout(function() {
				if (newValue) {
					element.focus();
					if (element[0].value) {
						element[0].setSelectionRange(0, element[0].value.length);
					}
				}
			});
		}, true);
	};
});