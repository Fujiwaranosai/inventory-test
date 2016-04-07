/**
 * Created by fujiw on 4/6/2016.
 */

app.controller('newProductCtrl', function($scope, $uibModalInstance, item) {
	$scope.item = item;
	$scope.ok = function() {
		$uibModalInstance.close($scope.item);
	};
	$scope.cancel = function() {
		$uibModalInstance.dismiss();
	};
});