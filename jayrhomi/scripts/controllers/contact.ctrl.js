'use strict';

angular.module('contact.ctrl', [])

.controller('ContactCtrl', function($scope, $modal, $log) {

  $scope.nav_model = 'Contact Us';
  
  $scope.open = function () {
    
    var modalInstance = $modal.open({
      templateUrl: '../views/map_modal.html',
      controller: ModalInstanceCtrl,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  
// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope, $modalInstance) {

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};
})
;
