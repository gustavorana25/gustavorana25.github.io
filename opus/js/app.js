var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {       
	$routeProvider.
    when('/', {
		templateUrl: 'views/page-home.html',
		controller: 'main',		
    }).
    otherwise({
    	redirectTo: '/'
    });	       
}]);


app.controller('main', ['$scope', '$interval', '$window', function($scope, $interval, $window){
	
	// instagram apenas para Desktop
	if($window.innerWidth > 600){
		//plugin instafeed.js chamando fotos
		var userFeed = new Instafeed({
        get: 'user',
        userId: '1358789068',
        accessToken: '1358789068.4b21631.d5d0647378eb46b5b0960f4225f185be',
        template: '<a class="instagramPhoto" target="_blank" href="{{link}}" style="background-image: url({{image}})"></a>',
        sortBy: 'random',
        resolution : 'low_resolution',
        success : function(res){
        	//pega quantidade de fotos e calcula a largura da div
        	$scope.instaWidth = Math.ceil(res.data.length/2)*200;
        	$scope.$apply();
        }
	    });
	    userFeed.run();

	  	// carroussel instagram
	  	$scope.leftInsta = 0; //left inicial
	  	var val = -200; //movimento inicial
	    $interval(function() {
	    	$scope.leftInsta+=val;
	    	
	    	// verifica se o carroussel chegou ao final e muda direção
	    	if(($scope.instaWidth + $scope.leftInsta) < $window.innerWidth){
	    		val = 200;
	    		$scope.leftInsta = $window.innerWidth - $scope.instaWidth;
	    	}
	    	// verifica se o carroussel chegou ao inicio e muda direção
	    	if($scope.leftInsta >=0){
				val = -200;
				$scope.leftInsta = 0;
			}
	    }, 5000);

	}
	   
}]);

app.controller('headerCtrl', ['$scope', '$document', '$window', function($scope, $document, $window){
	
	//variavel que mostra ou nao o menu e a função que seta essa variavel na view
	$scope.showMenu = false;
	$scope.set_showMenu = function(val){
		$scope.showMenu = val;
	}


	// $scope.menuScroll = false;
	// if($window.innerWidth > 600){
	// 	//muda estilo do menu no scroll
	// 	$document.on('scroll', function() {
	//     	$scope.$apply(function() {
	//     		$scope.windowScrollY= $window.scrollY;
	// 			if($window.scrollY > $window.innerHeight-80){
	// 				$scope.menuScroll = true;
	// 			}else{
	// 				$scope.menuScroll = false;
	// 			}
	// 		});	
	// 	});	
	// }
}]);