(function(){

'use strict';

//Sub module "auth" for authentication to main module "nightApp"
angular
  .module('nightApp.auth', [])
  .run(stateChangeDetect);

  stateChangeDetect.$inject = ['$rootScope','$state','authFactory'];

  function stateChangeDetect($rootScope,$state,authFactory){
//detect stateChangeStart
  $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams, options){
        console.log('stateChangeStart')
        //if new state need authenticate and no token route to login
        if (toState.data.authenticate && !authFactory.getToken()){
          $state.transitionTo("app.login");
            event.preventDefault();
        }


      })
  };



})();
