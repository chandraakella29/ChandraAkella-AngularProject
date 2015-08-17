BlogModule.controller("BlogController",
    function BlogController($scope, $sce, $http) {
        $scope.FirstName = "Chandra"
        $scope.LastName = "Akella"
        $scope.filterKey = "-LikeCount"
		$scope.ImagesArray = "imagesResponse"
		
        $scope.model = {
            Name: "Get Images from any Location",
            CreatedBy: "Chandra Akella",
            CreatedOn: "08/13/2015 12.00PM",
			
        }
		$scope.getImages = function (){
			var location = document.getElementById('location').value;
			if(location!="")
			{
				var maps_url = 'https://maps.googleapis.com/maps/api/geocode/json?address=?location';
				var lat,lng;
				$http.get(maps_url).success(function(locationResponse){
					lat = locationResponse['results'][0]['geometry']['location']['lat'];
					lng = locationResponse['results'][0]['geometry']['location']['lng'];
					/*Note: Please replace CLIENT_ID below with your own CLIENT_ID which you can generate at https://instagram.com/developer/clients/manage/.*/
					var instagram_url = 'https://api.instagram.com/v1/media/search?lat=lat&lng=lng&client_id=CLIENT_ID';
					$http.get(instagram_url).success(function(imagesResponse){
						angular.element(document.getElementById('ImagesDiv'))
						.append("<div ng-repeat=\"image in ImagesArray\"><div class=\"jumbotron post-warper text-justify col-md-11\"><div><img src=\"image['images']['low_resolution']['url']\" alt=\"image\"/> </div></div></div>");
					});
				});
			}
		}
    });