(function(){

'use strict'

angular
    .module('nightApp.landing')
      .config(configFunction);

      configFunction.$inject = ['$stateProvider'];

      function configFunction($stateProvider){


        //landing page state

    $stateProvider.state('app', {
          url: '/',
          views: {
            'header': {
                templateUrl: 'app/common/header.html',
                controller:  'AuthController',
                controllerAs: 'vm'    
            },
            'content': {
               templateUrl: 'app/landing/landing.html',
               controller:  'LandingController',
               controllerAs: 'vm'
            },
            'footer' : {
              templateUrl: 'app/common/footer.html'
            }
          },
          data : {
            authenticate: false
          }

        });



      }






})();
