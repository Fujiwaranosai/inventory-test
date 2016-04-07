/**
 * Created by fujiw on 4/4/2016.
 */

app.controller('homeCtrl', function($scope, ProductService, DTOptionsBuilder, DTColumnDefBuilder) {
	ProductService.getPublishedProducts(function(results) {
		$scope.products = results;
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
		DTColumnDefBuilder.newColumnDef(7).withOption('width', '100px'),
		DTColumnDefBuilder.newColumnDef(8).withOption('width', '185px'),
		DTColumnDefBuilder.newColumnDef(9).withOption('width', '185px')
	];
});