angular.module('App', ['ngRoute'])

.config(function($routeProvider){
	$routeProvider
	.when('/itens', {
		templateUrl: 'views/itens.html',
		controller: 'ItensCtrl',
		resolve: {
			Itens: function(Api){
				return Api.all();
			}
		}
	})

	.when('/item/:id', {
		templateUrl: 'views/item.html',
		controller: 'ItemCtrl',
		resolve: {
			Item: function($route, Api){
				return Api.get($route.current.params.id);	
			}
		}
	})

	.otherwise({redirectTo: '/itens'});
})

.controller('ItensCtrl', function(Itens, $scope, Api){
	$scope.itenscomresolve = Itens;
	Api.all().then(function(data){
		$scope.itens = data;
	})
})
.controller('ItemCtrl', function($scope, Item, Api, $routeParams){
	$scope.itemcomresolve = Item;
	Api.get($routeParams.id).then(function(data){
		$scope.itemsemresolve = data;
	})

})

.factory('Api', function($q){
	var itens = [{name: 'Produto A', qtd: 10}, {name: 'Produto B', qtd: 15}];
	return {
		all: function(){
			var deferred = $q.defer();
			setTimeout(function() {
				deferred.resolve(itens);
			}, 1000);
			return deferred.promise;
		},
		get: function(index){
			var deferred = $q.defer();
			setTimeout(function() {
				deferred.resolve(itens[index]);
			}, 1000);
			return deferred.promise;
		}
	}
})