(function(){
'use strict';

  //Factory for all authentication API calls part of sub module "core"
angular
  .module('nightApp.core')
    .factory('authFactory', authFactory);

    authFactory.$inject = ['BASE_URL', '$http'];

    function authFactory (BASE_URL, $http){

      // Returns Login resource
      var login = function(creds) {
        console.log(creds);
        return $http.post(BASE_URL +'login',creds);
      }

      // Returns register resource
      var register = function(creds) {
        console.log(creds);
        return $http.post(BASE_URL +'register',creds);
      }


      return {
        login: login,
        register: register
      };


    };








})();
