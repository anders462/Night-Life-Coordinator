(function(){

  'use strict'


//config for authentication module
angular
  .module('nightApp.auth')
    .config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    function configFunction($stateProvider){

      $stateProvider
      .state('app.login', {
            url: 'login',
            views: {
              'content@': {
                 templateUrl: 'app/auth/login.html',
                 controller:  'AuthController',
                 controllerAs: 'vm'
              }
            },
            data : {
              authenticate: false
            }

          })
          .state('app.register', {
                url: 'register',
                views: {
                  'content@': {
                     templateUrl: 'app/auth/register.html',
                     controller:  'AuthController',
                     controllerAs: 'vm'
                  }
                },
                data : {
                  authenticate: false
                }

              })
              .state('app.settings', {
                    url: 'settings',
                    views: {
                      'content@': {
                         templateUrl: 'app/auth/settings.html',
                         controller:  'AuthController',
                         controllerAs: 'vm'
                      }
                    },
                    data : {
                      authenticate: true
                    }

                  })
    };




})();
