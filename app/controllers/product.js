/**
 * Created by fujiw on 4/6/2016.
 */

app.controller('productCtrl', function($scope, ProductService, VendorService,
									   TypeService, Helper, DTOptionsBuilder,
									   DTColumnDefBuilder, $uibModal) {
	$scope.format = 'yyyy-MM-dd';
	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};

	ProductService.getAll(function(results) {
		var products = results;
		VendorService.getAll(function(results) {
			products.map(function(product) {
				var vendor = Helper.findById(product.vendor, results);
				if (vendor !== undefined) {
					product.vendor_name = vendor.name;
				} else {
					product.vendor_name = 'N/A';
				}
				product.release_date = new Date(product.release_date * 1000);
				product.create_date = new Date(product.create_date * 1000);
			});
			$scope.vendors = results;
			TypeService.getAll(function(results) {
				products.map(function(product) {
					var type = Helper.findById(product.type, results);
					if (type !== undefined) {
						product.type_name = type.name;
					} else {
						product.type_name = 'N/A';
					}
				});
				$scope.types = results;
			});
			$scope.products = products;
		});
	});
	$scope.orderProp = '';

	$scope.dtOptions = DTOptionsBuilder.newOptions()
		.withOption('paging', false);
	$scope.dtColumns = [
		DTColumnDefBuilder.newColumnDef(0).withOption('width', '10px'),
		DTColumnDefBuilder.newColumnDef(1).withOption('width', '180px'),
		DTColumnDefBuilder.newColumnDef(2).withOption('width', '125px'),
		DTColumnDefBuilder.newColumnDef(3).withOption('width', '125px'),
		DTColumnDefBuilder.newColumnDef(4).withOption('width', '130px'),
		DTColumnDefBuilder.newColumnDef(5).withOption('width', '95px'),
		DTColumnDefBuilder.newColumnDef(6).withOption('width', '95px'),
		DTColumnDefBuilder.newColumnDef(7).withOption('width', '100px'),
		DTColumnDefBuilder.newColumnDef(8).withOption('width', '185px'),
		DTColumnDefBuilder.newColumnDef(9).withOption('width', '185px'),
		DTColumnDefBuilder.newColumnDef(10).withOption('width', '75px'),
		DTColumnDefBuilder.newColumnDef(12).withOption('width', '75px'),
	];

	$scope.addProduct = function() {
		var modal = $uibModal.open({
			animation: true,
			templateUrl: 'modals/new-product.html',
			controller: 'newProductCtrl',
			resolve: {
				item: function() {
					return {
						name: 'test'
					};
				}
			}
		});
		modal.result.then(function(item) {
			console.log(item);
		}, function() {
		});
	};

	$scope.editVendor = function($index) {
		var product = $scope.products[$index];
		product.selectedVendor = Helper.findById(product.vendor, $scope.vendors);
		product.vendor_editing = true;
		product.vendorUiSelect.open = true;
	};

	$scope.vendorSelected = function($item, $index) {
		var product = $scope.products[$index];
		product.vendor_name = $item.name;
		product.vendor = $item.id;
		product.vendor_editing = false;
	};

	$scope.editType = function($index) {
		var product = $scope.products[$index];
		product.selectedType = Helper.findById(product.type, $scope.types);
		product.type_editing = true;
		product.typeUiSelect.open = true;
	};

	$scope.typeSelected = function($item, $index) {
		var product = $scope.products[$index];
		product.type_name = $item.name;
		product.type = $item.id;
		product.type_editing = false;
	};

	$scope.openReleaseDP = function(product) {
		product.releaseDPOpened = true;
	};
	$scope.openCreateDP = function(product) {
		product.createDPOpened = true;
	};
});