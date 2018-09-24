var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {       
	$routeProvider.
    when('/', {
		templateUrl: 'views/page-home.html',
		controller: 'main',		
    }).
     when('/servico/isolamento-termico', {
		templateUrl: 'views/page-isolamento.html',
		controller: 'others',		
    })
    .when('/servico/acesso-andaimes', {
		templateUrl: 'views/page-acesso-andaimes.html',
		controller: 'others',		
    })
    .when('/servico/refratarios', {
		templateUrl: 'views/page-refratarios.html',
		controller: 'others',		
    })
    .when('/servico/pintura-industrial', {
		templateUrl: 'views/page-pintura-industrial.html',
		controller: 'others',		
    })
    .when('/sobre/monsertec', {
		templateUrl: 'views/page-sobre-monsertec.html',
		controller: 'others',		
    }) 
    .when('/sobre/grupo-monsertec', {
		templateUrl: 'views/page-sobre-grupo-monsertec.html',
		controller: 'group',		
    }) 
    .when('/trabalhe-conosco', {
		templateUrl: 'views/page-trabalhe-conosco.html',
		controller: 'others',		
    })
    .when('/fale-conosco', {
		templateUrl: 'views/page-fale-conosco.html',
		controller: 'others',		
    })   
    .when('/linha-etica', {
		templateUrl: 'views/page-linha-etica.html',
		controller: 'others',		
    })
    .otherwise({
    	redirectTo: '/'
    });	       
}]);


app.controller('main', ['$scope','$document','$window', '$interval', function($scope, $document, $window, $interval){
	
	// Slide de banners
	$scope.slideSelected = 0;
	$scope.slides = [
	{
		img : 'slide01',
		title : 'Monsertec Engenharia',
		content : 'Fazendo a diferença nas soluções voltadas para o acesso, isolamento térmico, pintura industrial, civil e refratários.',
		link : '#'

	},
	{
		img : 'slide02',
		title : 'Monsertec Engenharia',
		content : 'Fazendo a diferença nas soluções voltadas para o acesso, isolamento térmico, pintura industrial, civil e refratários.',
		link : '#'

	},
	{
		img : 'slide03',
		title : 'Monsertec Engenharia',
		content : 'Fazendo a diferença nas soluções voltadas para o acesso, isolamento térmico, pintura industrial, civil e refratários.',
		link : '#'

	}];


	//passando slide automaticaticamente
	var bannerInterval = $interval(function() {
		$scope.slideSelected = ($scope.slideSelected+1)%$scope.slides.length;
	}, 6000);

	// função que seta qual banner vai aparecer
	$scope.set_slideSelected = function(val){
		$scope.slideSelected = val%$scope.slides.length;
		if($scope.slideSelected < 0)
			$scope.slideSelected = $scope.slides.length - 1;

		//resetando slide automatico
		$interval.cancel(bannerInterval);
		bannerInterval = $interval(function() {
	       $scope.slideSelected = ($scope.slideSelected+1)%$scope.slides.length;
	      }, 6000);
	}

	// mudando banner ao pressionar as teclas para direita e esquerda
	if($window.innerWidth > 600){
		$document.bind("keydown", function(event) {
	        if(event.code == "ArrowRight"){
	        	$scope.$apply(function(){
	        		$scope.slideSelected = ($scope.slideSelected+1)%$scope.slides.length;
	        	});
	        }
	        if(event.code == "ArrowLeft")
	        	$scope.$apply(function(){
	        		$scope.slideSelected = $scope.slideSelected-1;
	        		if($scope.slideSelected < 0)
					$scope.slideSelected = $scope.slides.length - 1;
	        	});
	        	
		 });
	}
	
	// rolar top
	if(document.body.scrollTop > 0){
		var scrollPostition = document.body.scrollTop;
		var time = 0;
		for(i = scrollPostition; i > 0; i-=5){
			setTimeout("window.scrollTo(0, "+i+")", time);
			time++;
		}
	}

	$scope.pixelsScrolled = 0;
	$document.on('scroll', function() {
		// console.log($window.scrollY);
	    $scope.$apply(function() {
	        $scope.pixelsScrolled = $window.scrollY;
	    })
	});

}]);

app.controller('others', ['$scope', '$timeout', function($scope, $timeout){
	
	// rolar top
	if(document.body.scrollTop > 0){
		var scrollPostition = document.body.scrollTop;
		var time = 0;
		for(i = scrollPostition; i > 0; i-=5){
			setTimeout("window.scrollTo(0, "+i+")", time);
			time++;
		}
	}

	$scope.fileName = 'Anexe um arquivo .doc ou .pdf';
	$scope.fileNameChanged = function (ele) {
		$scope.$apply(function(){
			$scope.fileName = ele.files[0].name;
		});

	}


	$scope.submitStep = 0;
	$scope.trySubmit = function(){
		if($scope.submitStep == 0){
			$scope.submitStep = 1;

			$timeout(function(){
				$scope.submitStep = 2;
			}, 8000);
		}
	}
	
}]);

app.controller('group', ['$scope', '$window', '$document', function($scope, $window, $document){
	
	// transição da linha do tempo
	$scope.hst = 0;
	$scope.set_hst = function(val){
		if(val < 5)
			$scope.hst = val;
		if(val < 0)
			$scope.hst = 0;
	}

	if($window.innerWidth > 600){
		$document.bind("keydown", function(event) {
	        if(event.code == "ArrowRight"){
	        	$scope.$apply(function(){
	        		if($scope.hst < 4)
	        			$scope.hst = $scope.hst+1;
	        	});
	        }
	        if(event.code == "ArrowLeft")
	        	$scope.$apply(function(){
	        		$scope.hst = $scope.hst-1;
	        		if($scope.hst < 0)
						$scope.hst = 0;
	        	});
	        	
		 });
	}
}]);

app.directive('scrollBanner', function ($window) {
	return {
		restrict: 'AC',
		link: function (scope, element, attrs) {          
            	
           angular.element($window).bind("scroll", function(e) {

	            element.css({'transition' : 'all cubic-bezier(0, 0, 0.42, 0.93) 0.5s'});
	            element.css({'transform' : 'translateY('+$window.scrollY/2+'px)'});

	            var opacity = 1 - $window.scrollY/300;
	            if(opacity > 0){
	            	element.css({'opacity' : opacity});
	            }else{
	            	element.css({'opacity' : 0});
	            }
	            e.preventDefault();

	        });  
  		}
   	}
});
