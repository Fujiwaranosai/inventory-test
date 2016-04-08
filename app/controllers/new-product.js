/**
 * Created by fujiw on 4/6/2016.
 */

app.controller('newProductCtrl', function($scope, Helper, ProductService, $uibModalInstance, item) {
	$scope.format = 'yyyy-MM-dd';
	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};

	$scope.item = item;
	$scope.vendors = item.vendors;
	$scope.types = item.types;
	var today = moment().unix() * 1000;

	var vendor = Helper.findById(1, $scope.vendors);
	var type = Helper.findById(1, $scope.types);

	if (item.product) {
		$scope.product = {};
		ProductService.copyProduct(item.product, $scope.product);
		vendor = Helper.findById($scope.product.vendor, $scope.vendors);
		type = Helper.findById($scope.product.type, $scope.types);
		$scope.product.selectedVendor = vendor;
		$scope.product.selectedType = type;
		$scope.title = 'Edit product';
	} else {
		$scope.product = {
			item_name: '',
			vendor: 1,
			selectedVendor: vendor,
			vendor_name: vendor.name,
			type: 1,
			selectedType: type,
			type_name: type.name,
			serial_number: '',
			price: '',
			weight: '',
			color: '',
			release_date: today,
			create_date: today,
			published: 1,
			photo: '',
			releaseDPOpened: false,
			createDPOpened: false
		};
		$scope.title = 'Add new product';
	}

	$scope.ok = function() {
		var product = $scope.product;
		if (!product.item_name) {
			$scope.showAlert('warning', 'Product name is required');
			return;
		}
		if (!product.serial_number) {
			$scope.showAlert('warning', 'Product serial number is required');
			return;
		}
		if (!product.price) {
			$scope.showAlert('warning', 'Product price is required');
			return;
		}
		if (!product.weight) {
			$scope.showAlert('warning', 'Product weight is required');
			return;
		}
		if (!product.photo) {
			$scope.showAlert('warning', 'Product photo is required');
			return;
		}
		$uibModalInstance.close($scope.product);
	};
	$scope.cancel = function() {
		$uibModalInstance.dismiss();
	};
	$scope.vendorSelected = function($item) {
		$scope.product.vendor = $item.id;
		var vendor = Helper.findById($item.id, $scope.vendors);
		$scope.product.vendor_name = vendor.name;
	};
	$scope.typeSelected = function($item) {
		$scope.product.type = $item.id;
		var type = Helper.findById($item.id, $scope.types);
		$scope.product.type_name = type.name;
	};

	$scope.openReleaseDP = function(product) {
		product.releaseDPOpened = true;
	};
	$scope.openCreateDP = function(product) {
		product.createDPOpened = true;
	};
});