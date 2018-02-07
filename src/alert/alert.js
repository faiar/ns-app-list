import jQuery from 'jquery';
import template from './alert.pug';

export default function alert(message) {
	const html = template({message : message});
	const component = jQuery(html);

	component.appendTo('body');

	component.modal('show');

	component.find('button').click(function() {
		component.modal('hide');
		component.remove();

	});
}