/**
 * Created by fujiw on 4/8/2016.
 */

app.directive('errSrc', function() {
	return {
		link: function(scope, elem, attrs) {
			elem.bind('error', function() {
				if (attrs.src != attrs.errSrc) {
					attrs.$set('src', attrs.errSrc);
				}
			});
		}
	};
});