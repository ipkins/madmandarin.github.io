'use strict';

var links = ['Table1.json', 'Table2.json'];

var testFrontEnd = angular.module('testFrontEnd', []);


/* Controllers */
testFrontEnd.controller('tableCtrl', ['$scope', '$http', function($scope, $http){
	$scope.table = []
	links.forEach(function(item, i, arr) {
		$http({
		method: 'GET',
		url: item
		}).then(function successCallback(response) {
			for (var key in response.data) {
				var obj = {
					name: key,
					data: response.data[key]
				}
				$scope.table.push(obj);
			}
			$scope.setTable(0);			
		}, function errorCallback(response) {
			console.log(response);
		});
	});

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

	$scope.activeTable = undefined;

	$scope.setTable = function(tableId) {
		$scope.data = $scope.table[tableId].data;
		$scope.activeTable = tableId;
	}

	$scope.isActiveTable = function(tableId) {
		return $scope.activeTable === tableId;
	}
}]);