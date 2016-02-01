'use strict';
angular.module('confusionApp')

        .controller('MenuController',['$scope','menuFactory', function($scope,menufac) {
                        
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            
            $scope.dishes = menufac.getDishes();

             $scope.select = function(setTab) {
                $scope.tab = setTab;
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };
            
            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };

            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };

        }])
       

       .controller('ContactController', ['$scope', function($scope) {
            $scope.channelmsg = "Select a Channel";
            $scope.invalidChannelSelection = false;

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                        var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
                        $scope.channels = channels;

            }])
        

        .controller('FeedbackController', ['$scope', function($scope) {

            $scope.sendFeedback = function() {
                  console.log($scope.feedback);
                  console.log($scope.feedback.mychannel);
                  
                  if($scope.feedback.mychannel === "tel" && $scope.feedback.tel.number == ""){
                    $scope.invalidChannelSelection = true;
                    $scope.channelmsg = "enter tel no";
                  }else{
                  
                        if ($scope.feedback.agree && ($scope.feedback.mychannel == "")&& !$scope.feedback.mychannel) {
                                      $scope.invalidChannelSelection = true;
                          console.log('incorrect');
                        }
                        else {
                        
                          $scope.invalidChannelSelection = false;
                          $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                             agree:false, email:"" };
                          $scope.feedback.mychannel="";

                          $scope.feedbackForm.$setPristine();
                          console.log($scope.feedback);
                        }
                  }
            };
        }])

        .controller('DishDetailController',['$scope', '$routeParams','menuFactory', function($scope,$routeParams,menuFactory) {

            var dish = menuFactory.getDish(parseInt($routeParams.id,10));
            $scope.dish = dish;
            $scope.predicate = '';
          }])

        .controller('DishDetailCommentController', ['$scope','menuFactory', function($scope,menuFactory) {

            $scope.inputComment = { author:"", date:"", rating:5, comment:"" };

            $scope.submitComment = function(){

              $scope.inputComment.date = new Date();
              $scope.inputComment.rating = Number($scope.inputComment.rating);
              console.log($scope.inputComment);

              $scope.dish.comments.push($scope.inputComment);
              console.log($scope.dish);

              $scope.inputComment = { author:"", date:"", rating:5, comment:"" };
              $scope.commentsForm.$setPristine();

            };
                       
        }]) 

       ;

