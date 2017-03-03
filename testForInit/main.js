'use strict';

var links = ['Table1.json', 'Table2.json']


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
		$scope.data = response.data.tenders;
	}, function errorCallback(response) {
		console.log(response);
	});

	var table = []
	
	links.forEach(function(item, i, arr) {
		$http({
		method: 'GET',
		url: 'item'
		}).then(function successCallback(response) {
			for (var data in response.data) {
				var obj = {
					name: data,
					data: response.data[data]
				}
				table.push(obj);
			}
			
		}, function errorCallback(response) {
			console.log(response);
		});
	});

	console.log(table);
}]);