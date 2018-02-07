import jQuery from 'jquery';
import template from './form.pug';
import alert from '../alert/alert';
import Assets from '../services/assets';

const assetUrl = 'http://fuego-app.herokuapp.com/api/assets';


function componentFunction() {

	let html = template();

	const component = jQuery(html);
	const modalCmp = component.find('.modal');

	component.find('.open-new-asset-modal').click(function() {
		console.log('!!!');
		modalCmp.modal('show');
		//jQuery('#add-new-asset-modal').modal('show');
		return false;
	});

	component.find('form').submit(function() {
		const values = getFormValues();
		//console.log(values);
		//return false;

		const promise = Assets.createOne(values);

		promise.then(createAssetSuccess);

		function createAssetSuccess() {
				alert('Asset saved');
				modalCmp.modal('hide');
				component.trigger('new-asset-created');
		}

		return false;
	});

	function getFormValues() {
		return {
			name: component.find('#asset-name').val(),
			quantity: parseInt(component.find('#asset-quantity').val())
		};
	}

	return component;

}

export default componentFunction;