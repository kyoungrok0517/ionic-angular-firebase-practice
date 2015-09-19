'use strict';

angular.module('myApp.register', ['ngRoute', 'firebase'])

// Declare route
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/register', {
			templateUrl: 'register/register.html',
			controller: 'RegisterCtrl'
		});
	}])

// Register controller
	.controller('RegisterCtrl', ["$scope", "$firebaseAuth", "$location", function ($scope, $firebaseAuth, $location) {
		var firebaseObj = new Firebase("https://rok-angular-tuts.firebaseio.com");
		var loginObj = $firebaseAuth(firebaseObj);

		$scope.signUp = function () {
			if (!$scope.regForm.$invalid) {
				var email = $scope.user.email;
				var password = $scope.user.password;
				if (email && password) {
					loginObj.$createUser(email, password)
						.then(function () {
							// do things if success
							console.log('User creation success');
							$location.path('/home');
						}, function (error) {
							// do things if failure
							console.log(error);
							$scope.regError = true;
							$scope.regErrorMessage = error.message;
						});
				}
			}
		};
	}])