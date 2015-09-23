app.factory('projects', ['$http', function($http){
	var cachedData;
	
	function getData(callback){
		if(cachedData){
			callback(cachedData);
		} else{
			$http.get('../projects/projects.json').success(function(data){
				cachedData = data;
				callback(data);
			});
		}
	}
	return {
		list: getData,
		find: function(name, callback){
			getData(function(data){
				var project = data.filter(function(entry){
					return entry.name === name;
				})[0];
				callback(project);
			});
		}
	};
}]);
