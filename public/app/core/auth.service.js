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
        $window.localStorage.removeItem('currentUser');
      }

      var setCurrentUser = function(user) {
        $window.localStorage.currentUser = user;
      }

      var getCurrentUser = function(){
        if ($window.localStorage.currentUser){
          return $window.localStorage.currentUser
        } else {
          return null;
        }
      }



      return {
        login: login,
        register: register,
        setToken: setToken,
        getToken: getToken,
        deleteToken: deleteToken,
        update: update,
        setCurrentUser: setCurrentUser,
        getCurrentUser: getCurrentUser
      };


    };








})();
