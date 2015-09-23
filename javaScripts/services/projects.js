app.factory('projects', ['$http', function($http){
	function getData(callback){
		$http({
			method: 'GET',
			url: '../projects/projects.json',
			cache: true
		}).success(callback);
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