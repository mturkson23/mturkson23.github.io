'use strict';

angular.module('core', [
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'mm.foundation',
  'home.ctrl',
  'projects.ctrl',
  'contact.ctrl'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/projects', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact_us.html',
        controller: 'ContactCtrl'
      })
      .otherwise({
        redirectTo: '/' 
      });
  })
.run(function($rootScope, $location, $anchorScroll, $routeParams) {
  //when the route is changed scroll to the proper element.
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    $location.hash($routeParams.scrollTo);
    $anchorScroll();  
  });
})
;