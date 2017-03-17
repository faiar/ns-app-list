//Coordinador de todos los componentes,para unir a todos.
import './styles/style.scss';
import $ from 'jquery';
import 'bootstrap';
import assetsList from './assets-list/assets-list';
import createAssetFormCmp from './create-asset-form/form';


assetsList.appendTo('#assets-app');

createAssetFormCmp().appendTo('#assets-app');