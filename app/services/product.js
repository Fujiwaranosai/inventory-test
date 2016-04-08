/**
 * Created by fujiw on 4/6/2016.
 */

app.service('ProductService', function ($indexedDB) {
	var storeName = 'product';

	var extractProduct = function(product) {
		return {
			item_name: product.item_name,
			vendor: product.vendor,
			type: product.type,
			serial_number: product.serial_number,
			price: product.price,
			weight: product.weight,
			color: product.color,
			release_date: product.release_date,
			create_date: product.create_date,
			published: product.published,
			photo: product.photo
		};
	};
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

	this.add = function(product, callback) {
		var _product = extractProduct(product);
		$indexedDB.openStore(storeName, function(store) {
			store.insert(_product).then(callback);
		});
	};

	this.delete = function(id, callback) {
		$indexedDB.openStore(storeName, function(store) {
			store.delete(id).then(callback);
		});
	};

	this.edit = function(product, callback) {
		var _product = extractProduct(product);
		_product.id = product.id;
		$indexedDB.openStore(storeName, function(store) {
			store.upsert(_product).then(callback);
		});
	};

	this.count = function(callback) {
		$indexedDB.openStore(storeName, function(store) {
			store.count().then(callback);
		});
	};

	this.copyProduct = function(from, to) {
		to = to || {};
		to.id = from.id;
		to.item_name = from.item_name;
		to.vendor = from.vendor;
		to.vendor_name = from.vendor_name;
		to.type = from.type;
		to.type_name = from.type_name;
		to.serial_number = from.serial_number;
		to.price = from.price;
		to.weight = from.weight;
		to.color = from.color;
		to.release_date = from.release_date;
		to.create_date = from.create_date;
		to.published = from.published;
		to.photo = from.photo;
	};
});