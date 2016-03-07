(function(){

'use strict'

angular
  .module('nightApp', [
    //Angular Modules
    'ngResource',
    //Third party Modules
    'ui.router',
    //Custom Modules
    'nightApp.landing',
    'nightApp.core',
    'nightApp.auth'
  ])
  .config(configFunction);

   configFunction.$inject = ['$urlRouterProvider'];

   function configFunction($urlRouterProvider){

       $urlRouterProvider.otherwise('/');

   }






})();
