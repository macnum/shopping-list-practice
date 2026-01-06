const { Children } = require("react");

const form = document.querySelector('#item-form');
const formInput = document.querySelector('#item-input');
const list = document.querySelector('#item-list');
const BtnClearAll = document.querySelector('#clear');
const filter = document.querySelector('#filter');

function onClickItem(e) {
	e.preventDefault();
	const newItem = formInput.value.trim();
	if (newItem === null || newItem === '') {
		alert('kindly enter a value');
		return;
	}
	onAddItem(newItem);
}

function removeItem(e) {
	if (e.target.parentElement.classList.contains('remove-item')) {
		e.target.parentElement.parentElement.remove();
	}
}
function clearAllListItem(e) {
	while (list.firstChild) {
		list.firstChild.remove();
	}
}

function filterForItems() {
	console.log(filter.value);
	const filteredItem = filter.value.toLowerCase();
    console.log(list.Children)

}

function onAddItem(newItem) {
	const item = createListItem(newItem);
	const button = createButton();
	item.appendChild(button);
	list.appendChild(item);
	formInput.value = '';
}
function createListItem(text) {
	const li = document.createElement('li');
	const textItem = document.createTextNode(text);
	li.appendChild(textItem);
	return li;
}
function createButton() {
	const button = document.createElement('button');
	button.className = 'remove-item btn-link text-red';
	const icon = document.createElement('i');
	icon.className = 'fa-solid fa-xmark';
	button.appendChild(icon);
	return button;
}

filter.addEventListener('input', filterForItems);
BtnClearAll.addEventListener('click', clearAllListItem);
list.addEventListener('click', removeItem);
form.addEventListener('submit', onClickItem);
