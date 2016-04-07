/**
 * Created by fujiw on 4/6/2016.
 */

app.controller('productCtrl', function($scope, ProductService, VendorService,
									   TypeService, Helper, DTOptionsBuilder, $uibModal) {
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
	$scope.dtOptions = DTOptionsBuilder.newOptions().withOption('paging', false);

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
		$scope.vendor_editing = true;
		var product = $scope.products[$index];
		product.selectedVendor = Helper.findById(product.vendor, $scope.vendors);
		product.vendor_editing = true;
	};

	$scope.vendorSelected = function($item, $index) {
		var product = $scope.products[$index];
		product.vendor_name = $item.name;
		product.vendor = $item.id;
		product.vendor_editing = false;
	};
});