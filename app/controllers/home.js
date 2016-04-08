/**
 * Created by fujiw on 4/4/2016.
 */

app.controller('homeCtrl', function($scope, ProductService, VendorService, TypeService,
									Helper, DTOptionsBuilder, $uibModal, DTColumnDefBuilder) {
	ProductService.getPublishedProducts(function(results) {
		var products = results;
		VendorService.getAll(function(results) {
			products.map(function(product) {
				var vendor = Helper.findById(product.vendor, results);
				if (vendor !== undefined) {
					product.vendor_name = vendor.name;
					product.vendor_logo = vendor.logo;
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
			$scope.latestProducts = products.slice(-5);
		});
	});
	$scope.orderProp = '';
	$scope.dtOptions = DTOptionsBuilder.newOptions().withOption('paging', false);
	$scope.dtColumns = [
		DTColumnDefBuilder.newColumnDef(0).withOption('width', '10px'),
		DTColumnDefBuilder.newColumnDef(1).withOption('width', '180px'),
		DTColumnDefBuilder.newColumnDef(2).withOption('width', '125px'),
		DTColumnDefBuilder.newColumnDef(3).withOption('width', '125px'),
		DTColumnDefBuilder.newColumnDef(4).withOption('width', '130px'),
		DTColumnDefBuilder.newColumnDef(5).withOption('width', '95px'),
		DTColumnDefBuilder.newColumnDef(6).withOption('width', '95px'),
		DTColumnDefBuilder.newColumnDef(7).withOption('width', '95px'),
		DTColumnDefBuilder.newColumnDef(8).withOption('width', '120px'),
		DTColumnDefBuilder.newColumnDef(9).withOption('width', '120px')
	];

	$scope.openEditProduct = function($index) {
		var product = $scope.products[$index];
		var modal = $uibModal.open({
			animation: true,
			templateUrl: 'modals/new-product.html',
			controller: 'newProductCtrl',
			resolve: {
				item: function() {
					return {
						name: 'test',
						vendors: $scope.vendors,
						types: $scope.types,
						product: product
					};
				}
			}
		});
		modal.result.then(function(item) {
			ProductService.copyProduct(item, product);
			var vendor = Helper.findById(product.vendor, $scope.vendors);
			product.vendor_logo = vendor.logo;
			ProductService.edit(item, function(e) {
				if (product.published == 0) {
					$scope.products.splice($index, 1);
				}
			});
		}, function() {
		});
	};
});