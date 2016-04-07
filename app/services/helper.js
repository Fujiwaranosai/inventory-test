/**
 * Created by fujiw on 4/6/2016.
 */

app.service('Helper', function () {
	this.findById = function(id, array) {
		return array.find(function(item) {
			return item.id == id;
		});
	};
});