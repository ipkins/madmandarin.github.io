'use strict';

var links = ['Table1.json', 'Table2.json'];

var testFrontEnd = angular.module('testFrontEnd', []);


/* Controllers */
testFrontEnd.controller('tableCtrl', ['$scope', '$http', function($scope, $http){
	// По очерёдная загрузка json'в в память, правка структуры, и запись их в $scope.table
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


	// Функции отвечающие за сортировка таблицы
	$scope.sortField = undefined; // текущий отсортированный столбец
	$scope.reverse = false; // реверс сортировки

	$scope.sort = function(fieldName) {
		if ($scope.sortField == fieldName) {
			$scope.reverse = !$scope.reverse;
		} else {
			$scope.sortField = fieldName;
			$scope.reverse = false;
		}
	}


	// Три функции отвечающие за маркеры сортировки для столбцов
	$scope.isSort = function(fieldName) {
		return $scope.sortField === fieldName;
	}

	$scope.isSortUp = function(fieldName) {
		return $scope.sortField === fieldName && !$scope.reverse;
	}

	$scope.isSortDown = function(fieldName) {
		return $scope.sortField === fieldName && $scope.reverse;
	}


	// Функции отвечающие за переключение таблиц
	$scope.activeTable = undefined; // id текущей активной таблицы

	$scope.setTable = function(tableId) {
		$scope.data = $scope.table[tableId].data;
		$scope.activeTable = tableId;
	}

	// функция проверки активности таблицы
	$scope.isActiveTable = function(tableId) {
		return $scope.activeTable === tableId;
	}
}]);