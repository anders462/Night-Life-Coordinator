(function(){
'use strict';

  //Factory for all authentication API calls part of sub module "core"
angular
  .module('nightApp.core')
    .factory('authFactory', authFactory);

    authFactory.$inject = ['BASE_URL', '$http', '$window'];

    function authFactory (BASE_URL, $http,$window){

      // Returns Login resource
      var login = function(creds) {
        return $http.post(BASE_URL +'login',creds);
      }

      // Returns register resource
      var register = function(creds) {
        return $http.post(BASE_URL +'register',creds);
      }

      var update = function(creds) {
        return $http.put(BASE_URL +'update',creds,{headers: {"x-access-token": $window.localStorage.token}});
      }

      //Sets the token in localStorage
      var setToken = function(token){
        $window.localStorage.token = token;
      }

      //Gets token from localStorage
      var getToken = function(){
        if ($window.localStorage.token){
          return $window.localStorage.token
        } else {
          return null;
        }
      }

      //delete token and remove cashe from localStorage at logout
      var deleteToken = function(){
        $window.localStorage.removeItem("token");
        $window.localStorage.removeItem("cache");
      }



      return {
        login: login,
        register: register,
        setToken: setToken,
        getToken: getToken,
        deleteToken: deleteToken,
        update: update
      };


    };








})();
