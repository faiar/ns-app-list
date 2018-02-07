import jQuery from 'jquery';
import template from './assets-list.pug';
const assetUrl= 'http://fuego-app.herokuapp.com/api/assets';
import Assets from '../services/assets';

const component = jQuery('<div class="assets-list-component component"></div>');
//console.log(component);

// jQuery.getJSON(assetsURL).then(function(response) {
// 	//console.log(response.count);
// 	//const parameters = ;

// 		const html = template({
// 			title: 'Hola Mundo',
// 			assets: response.result
// 		});

// 		console.log(html);

// 		jQuery('#assets-app').html(html);
// });


jQuery.getJSON(assetUrl).then(renderAssetsHtml);

function loadAssets() {
	//Ahora en services
	//jQuery.getJSON(assetUrl).then(renderAssetsHtml);
	let promesa = Assets.getAll();

	promesa.then(function(response) {
		renderAssetsHtml(response);
	});

}

function renderAssetsHtml(response) {
		// assetsArray = sortArray(assetsArray);
		const html = template({
			title: 'Hola Mundo',
			assets: response.result,
			sort: sortArray
		});

		console.log(html);

		//jQuery('#assets-app').html(html);	
		component.html(html);	
}

function sortArray(array) {
	return array.sort(function(a, b) {
		const nameA = a.name.toLowerCase();
		const nameB = b.name.toLowerCase();

		if (nameA > nameB) {
			return 1; 
		} else if (nameA < nameB) {
			return -1;
		} else {
			return 0;
		}
	});
}

function addActions() {
	component.find('.edit-action').on('click', function() {
		//alert(123);
		let tr = jQuery(this).parents('tr');
		//console.log(tr.attr('id'));
		let id = tr.attr('id').replace('asset-id', '');
		id = parteInt(id);

		let asset = assetsArray.filter(function(asset) {
			return asset.id == id;
		});

		console.log(asset);
	});
}


$('#create-new-asset-component').on('new-asset-created', function () {
	loadAssets();
	//alert(123);
});


loadAssets();

export default component;