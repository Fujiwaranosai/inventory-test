/**
 * Created by fujiw on 4/6/2016.
 */

app.directive('selectOnBlur', function() {
	return {
		require: 'uiSelect',
		link: function(scope, elem, attrs, ctrl) {
			elem.focusout(function(e) {
				if (!ctrl.open && (ctrl.tagging.isActivated || ctrl.activeIndex >= 0) && !ctrl.isHovering) {
					ctrl.select(ctrl.items[ctrl.activeIndex]);
				}
			});
			elem.on('mouseover', 'span.ui-select-toggle', function(e) {
				ctrl.isHovering = true;
			});
			elem.on('mouseout', 'span.ui-select-toggle', function(e) {
				ctrl.isHovering = false;
			});
		}
	};
});