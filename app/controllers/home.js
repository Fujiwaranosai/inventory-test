/**
 * Created by fujiw on 4/4/2016.
 */

app.controller('homeCtrl', function($scope, ProductService, DTOptionsBuilder) {
	ProductService.getPublishedProducts(function(results) {
		$scope.products = results;
	});
	$scope.orderProp = '';
	$scope.dtOptions = DTOptionsBuilder.newOptions().withOption('paging', false);
});