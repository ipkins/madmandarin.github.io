'use strict';
var testFrontEnd = angular.module('testFrontEnd', ['ngResource']);


/* Factory */
testFrontEnd.factory('Data', ['$resource', function($resource){
	return $resource('https://madmandarin.github.io/testForInit/:table.:format', {
		table: 'Table1',
		format: 'json'
	});
}])



/* Controllers */
testFrontEnd.controller('tableCtrl', ['$scope', '$http', 'Data', function($scope, $http, Data){
	$scope.sortField = undefined;
	$scope.reverse = false;

	$scope.sort = function(fieldName) {
		if ($scope.sortField == fieldName) {
			$scope.reverse = $scope.reverse ? false:true;
		} else {
			$scope.sortField = fieldName;
			$scope.reverse = false;
		}
	}

	$scope.isSort = function(fieldName) {
		return $scope.sortField != fieldName;
	}

	$scope.isSortUp = function(fieldName) {
		return $scope.sortField === fieldName && !$scope.reverse;
	}

	$scope.isSortDown = function(fieldName) {
		return $scope.sortField === fieldName && $scope.reverse;
	}

	$scope.data = Data.get({
		table: 'Table2',
		format: 'json'
	}, function() {
		alert('yep');
	}, function(error) {
		console.log(error);
	});
}]);