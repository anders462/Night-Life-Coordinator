(function(){
'use strict'

angular
  .module('nightApp.landing')
  .controller('LandingController', LandingController);

  LandingController.$inject = ['nightLifeFactory', '$window','$location'];

  function LandingController(nightLifeFactory, $window, $location){

  var vm = this; //set vm (view model) to reference main object


  var searchResult = [];
  if ($window.localStorage.hasOwnProperty("cache")) {
    vm.bars = JSON.parse($window.localStorage.cache);
  } else {
    vm.bars = [];
  }
  vm.notReady = true;
//Match bars in db with yelp search and add going to result
  var barMatch = function(allBarsInDb,searchResult){
    var bars =  searchResult.map(function(bar){
     for (var i = 0; i < allBarsInDb.length; i++){
       //check if record exist in DB and then add who's going
       if (allBarsInDb[i].name === bar.name){
           bar.going = allBarsInDb[i].going;
           bar.id = allBarsInDb[i].id;
         return bar;
       }
     }
      //no matchd
      return bar;
    });
    vm.notReady = true;
    console.log(vm.notReady);

    return bars;
  }

  //udate view with updated data from database
  var updateView = function(newData){
      for (var i = 0; i < vm.bars.length; i++){
        if (vm.bars[i].name === newData.name){
          vm.bars[i].going = newData.going
          vm.bars[i].id = newData.id;
        }
  }
  $window.localStorage["cache"] = JSON.stringify(vm.bars);

};


  vm.searchBars = function (){

      vm.notReady = false;
      console.log(vm.notReady);
        nightLifeFactory.searchYelp(vm.searchForm.location)
          .then(
            function(response){
              //result from search
              searchResult = response.data.message;
              console.log("search_res",searchResult);
              // get bars from data base
              nightLifeFactory.getBars()
                .then(
                  function(response){
                   vm.bars = barMatch(response.data,searchResult);
                   $window.localStorage["cache"] = JSON.stringify(vm.bars);


                  },
                  function(response){
                    vm.message = "Error: "+response.status + " " + response.statusText;
                    console.log("Error: "+response.status + " " + response.statusText);
                  }

                )
            },
            function(response){
              vm.notReady = true;
              vm.message = "Error: "+ response.status + " " + response.statusText;
              console.log("Error: "+ response.status + " " + response.statusText);
            }

          )
  };

vm.addGoing = function(bar){

        if (!$window.localStorage.token) {
            $location.path('/login');
          }

    if (!bar.id){
      //id doesn't exist as bar is not in db
      //create new record for bar
      //username is taken from JWT
      nightLifeFactory.addBar({name: bar.name,location: bar.location})
        .then(
          function(response){
              console.log(response.data.message);
              updateView(response.data.message);
          },
          function(response){
            console.log(response.data);
          }
        )
    }  else {
        // id exist, update going status bar with id for username
        //username is taken from JWT
        nightLifeFactory.updateBar({id:bar.id})
          .then(
            function(response){
              console.log(response.data);
              updateView(response.data.message);
            },
            function(response){
              console.log(response.data);
            }

          )
    }
};



};




})();
