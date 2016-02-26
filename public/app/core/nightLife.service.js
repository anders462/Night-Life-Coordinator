(function(){
"use strict"

//Factory for all /api/bars api calls part of sub module "core"
angular
   .module('nightApp.core')
   .factory('nightLifeFactory', nightLifeFactory);

   nightLifeFactory.$inject = ['BASE_URL', '$http', '$window'];

   function nightLifeFactory(BASE_URL, $http, $window){

//>>>>> RESTfull API Routes<<<<<<<//

//get all bars in data base
     var getBars = function() {
       return $http.get(BASE_URL + 'bars');
     }

//add bar to data base, need to have valid JWT token
     var addBar = function(newBar) {
       return $http.post(BASE_URL + 'bars', newBar, {headers: {"x-access-token": $window.localStorage.token}});
     }

//update bar going status in database, need to have valid JWT tokenVerify
    var updateBar = function(bar) {
      return $http.put(BASE_URL + 'bars/' + bar.id, bar, {headers: {"x-access-token": $window.localStorage.token}});
    }


//>>>>>>>>>END RESTfull API Routes<<<<<<<//


     var searchYelp = function(location) {
       console.log('test');
       return $http.get(BASE_URL + 'search' + '?location=' + location);
     }




     // return available functions for use in controllers
     return {
       getBars: getBars,
       searchYelp: searchYelp,
       addBar: addBar,
       updateBar: updateBar
     };

   }


})();

/*
this.addPoll = function(newPoll) {
  return $http.post(baseUrl, newPoll);
};

this.getPolls = function (id){
  return $http.get(baseUrl + '/' + id);
}

this.addCount = function (id,option) {
  console.log(option);
  return $http.put(baseUrl + '/' + id, option)
}

this.addPollOption = function (id,option) {
  console.log(option);
  return $http.put(baseUrl + '/add/' + id, option)
}
*/
