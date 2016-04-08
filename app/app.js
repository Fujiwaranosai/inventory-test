'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('inventoryApp', [
		'ngRoute', 'datatables', 'indexedDB', 'ui.bootstrap', 'ui.select'
	])
	.config(function ($routeProvider, $indexedDBProvider) {

		$routeProvider
			.when('/home', {
				templateUrl: 'partials/home.html',
				controller: 'homeCtrl'
			})
			.when('/dashboard', {
				templateUrl: 'partials/dashboard.html',
				controller: 'dashboardCtrl'
			})
			.when('/products', {
				templateUrl: 'partials/products.html',
				controller: 'productCtrl'
			})
			.when('/vendors', {
				templateUrl: 'partials/vendors.html',
				controller: 'vendorCtrl'
			})
			.otherwise({redirectTo: '/home'});

		$indexedDBProvider.connection('inventoryDB')
			.upgradeDatabase(1, function(event, db, tx) {
				var product = db.createObjectStore('product', { keyPath: 'id', autoIncrement: true });
				product.createIndex('published_idx', 'published', { unique: false });
				var today = moment().unix() * 1000;
				product.add({
					item_name: 'Iphone 6S',
					vendor: 1,
					type: 1,
					serial_number: '0123456789',
					price: '600',
					weight: '500g',
					color: 'white',
					release_date: today,
					published: 1,
					photo: 'http://cdn2.gsmarena.com/vv/bigpic/apple-iphone-6s1.jpg',
					create_date: today
				});
				product.add({
					item_name: 'IPad Air',
					vendor: 1,
					type: 2,
					serial_number: '0123456789',
					price: '600',
					weight: '500g',
					color: 'white',
					release_date: today,
					published: 1,
					photo: 'http://b-i.forbesimg.com/patrickmoorhead/files/2013/11/iPad-Air.jpg',
					create_date: today
				});

				var vendor = db.createObjectStore('vendor', { keyPath: 'id', autoIncrement: true });
				vendor.add({ name: 'Apple', logo: 'http://cdn.osxdaily.com/wp-content/uploads/2010/10/giant-apple-logo-bw.png' });
				vendor.add({ name: 'HTC', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Htc_new_logo.svg/2000px-Htc_new_logo.svg.png' });

				var type = db.createObjectStore('type', { keyPath: 'id', autoIncrement: true });
				type.add({ name: 'Phone' });
				type.add({ name: 'Tablet' });
				type.add({ name: 'Laptop' });
			});
	})
	.run(function($rootScope, $uibModal) {
		var alertCtrl = function($scope, $uibModalInstance, data) {
			$scope.data = data;
			$scope.close = function() {
				$uibModalInstance.close($scope.data);
			};
		};
		$rootScope.showAlert = function(mode, message) {
			var data = {
				mode: mode,
				message: message
			};
			var modal = $uibModal.open({
				animation: true,
				templateUrl: 'modals/alert.html',
				backdrop: true,
				keyboard: true,
				backdropClick: true,
				controller: alertCtrl,
				resolve: {
					data: function() {
						return data;
					}
				}
			});
		};
	});
