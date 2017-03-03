'use strict';
var testFrontEnd = angular.module('testFrontEnd', []);


/* Controllers */
testFrontEnd.controller('tableCtrl', ['$scope', '$http', function($scope, $http){
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

	$http({
		method: 'GET',
		url: 'Table1.json'
	}).then(function successCallback(response) {
		console.log(response);
	}, function errorCallback(response) {
		console.log(response);
	});

	
}]);