/**
 * Created by fujiw on 4/6/2016.
 */

app.service('TypeService', function ($indexedDB) {
	var storeName = 'type';

	this.getAll = function(callback) {
		$indexedDB.openStore(storeName, function(store) {
			store.getAll().then(callback);
		});
	};

	this.add = function(type) {
		$indexedDB.openStore(storeName, function(store) {
			store.insert(type).then(function(e) {
				return e;
			});
		});
	};

	this.delete = function(id) {
		$indexedDB.openStore(storeName, function(store) {
			store.delete(id).then(function(e) {
				return e;
			});
		});
	};
});