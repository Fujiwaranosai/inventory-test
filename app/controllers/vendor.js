/**
 * Created by fujiw on 4/6/2016.
 */

app.controller('vendorCtrl', function($scope, VendorService, DTOptionsBuilder) {
	VendorService.getAll(function(results) {
		$scope.vendors = results;
	});

	$scope.orderProp = '';
	$scope.dtOptions = DTOptionsBuilder.newOptions().withOption('paging', false);

	$scope.addVendor = function() {
		var name = $scope.new_name;
		var logo = $scope.new_url;
		if (name === undefined || name.length == 0) {
			$scope.showAlert('warning', 'Name should not be empty');
			return;
		}
		if (logo === undefined || logo.length == 0) {
			$scope.showAlert('warning', 'Logo url should not be empty');
			return;
		}
		VendorService.add({ name: name, logo: logo }, function(e) {
			if (e === undefined || e.length == 0) {
				return;
			}
			$scope.vendors.push({
				id: e[0],
				name: name,
				logo: logo
			});
			$scope.new_name = '';
			$scope.new_url = '';
		});
	};

	$scope.deleteVendor = function(id, $index) {
		VendorService.delete(id, function(e) {
			$scope.vendors.splice($index, 1);
		});
	};

	$scope.editVendor = function($index) {
		var vendor = $scope.vendors[$index];
		VendorService.edit(vendor, function(e) { });
	};
});