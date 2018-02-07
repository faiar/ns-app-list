	import jQuery from 'jquery';

	const apiUrl = 'http://fuego-app.herokuapp.com/api/assets';

	const AssetsService = {
		getAll: function() {
			return jQuery.get(apiUrl);
		},

		createOne: function(assetData){
			return jQuery.post(apiUrl, assetData);
		}
	};


	export default AssetsService;