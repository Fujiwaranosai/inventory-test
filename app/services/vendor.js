/**
 * Created by fujiw on 4/6/2016.
 */

app.service('VendorService', function ($indexedDB) {
	var storeName = 'vendor';

	this.getAll = function(callback) {
		$indexedDB.openStore(storeName, function(store) {
			store.getAll().then(callback);
		});
	};

	this.add = function(vendor, callback) {
		$indexedDB.openStore(storeName, function(store) {
			store.insert(vendor).then(callback);
		});
	};

	this.delete = function(id, callback) {
		$indexedDB.openStore(storeName, function(store) {
			store.delete(id).then(callback);
		});
	};

	this.edit = function(vendor, callback) {
		var _vendor = {
			id: vendor.id,
			name: vendor.name,
			logo: vendor.logo
		};
		$indexedDB.openStore(storeName, function(store) {
			store.upsert(_vendor).then(callback);
		});
	};
});