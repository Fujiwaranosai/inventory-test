/**
 * Created by fujiw on 4/8/2016.
 */

app.controller('dashboardCtrl', function($scope, ProductService) {
	ProductService.count(function(e) {
		$scope.totalProduct = e;
	});
	ProductService.getAll(function(results) {
		var sum = 0;
		results.map(function(product) {
			sum += parseFloat(product.price);
		});
		$scope.averagePrice = sum / results.length;
	});
});