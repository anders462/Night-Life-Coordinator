(function(){

//  authenticatation controller
angular
  .module('nightApp.auth')
    .controller('AuthController', AuthController)

    AuthController.$inject = ['authFactory','$window','$location'];

   function AuthController (authFactory,$window,$location){

     var vm = this; //set vm (view model) to reference main objec

     vm.login = function () {

         // initial values
         vm.error = false;
         console.log(vm.loginForm.username, vm.loginForm.password);

         // call login from service
         authFactory.login({username: vm.loginForm.username,password: vm.loginForm.password})
           // handle success
           .then(function (response) {
            console.log(response.data);
            $window.localStorage.token = response.data.token;
            vm.loginForm = {};
            vm.error = false;
            $location.path('/');
           })
           // handle error
           .catch(function (response) {
             vm.loginForm = {};
             vm.error = true;
             if (response.data){
               vm.errorMessage = response.data.message;
             } else {
               vm.errorMessage = "Oops something went wrong";
             }

       });
     };

     vm.register = function () {
       console.log('evoked');

       // initial values
       vm.error = false;
       console.log(vm.registerForm.username +" " + vm.registerForm.password);
       // call register from service
       authFactory.register({username: vm.registerForm.username, password: vm.registerForm.password})
         // handle success
         .then(function (response) {
           vm.registerForm = {};
           if (!response.data.success) {
             vm.error = true;
             vm.errorMessage = response.data.message;
           } else {
             console.log("login");
             $location.path('/login');
           }
         })
         // handle error
         .catch(function (response) {
           vm.registerForm = {};
           vm.error = true;
           if (response.data){
             vm.errorMessage = response.data.message;
           } else {
             vm.errorMessage = "Oops something went wrong";
           }
         });

     };




    };





})();
