/**
 * Created by fujiw on 4/6/2016.
 */

app.service('ProductService', function ($indexedDB) {
	var storeName = 'product';

	this.getAll = function(callback) {
		$indexedDB.openStore(storeName, function(store) {
			store.getAll().then(callback);
		});
	};

	this.getPublishedProducts = function(callback) {
		$indexedDB.openStore(storeName, function(store) {
			var find = store.query();
			find = find.$eq(1);
			find = find.$index('published_idx');
			store.eachWhere(find).then(callback);
		});
	};

	this.add = function(product) {
		$indexedDB.openStore(storeName, function(store) {
			store.insert(product).then(function(e) {
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