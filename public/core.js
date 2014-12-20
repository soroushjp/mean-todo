var meanTodo = angular.module('meanTodo', []);

meanTodo.controller('MainController', ['$scope', '$http', function($scope, $http) {
	$scope.formData = {};

	$http.get('/api/todos')
		.success(function(data) {
			
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	$scope.createTodo = function() {
		$http.post('/api/todos', $scope.formData)
		.success(function(data) {
			$scope.formData = {}; //Clear form for user after submit
			$scope.todos = data;
			$scope.$apply();
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
		.success(function(data) {
			$scope.todos = data;
			$scope.$apply();
			console.log(data);
		})
		.error(function(data) {
			console.log("Error: " + data);
		});
	};

}]);