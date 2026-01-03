const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const itemFilter = document.querySelector('#filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems() {
	const itemsFromStorage = getItemFromStorage();
	itemsFromStorage.forEach((item) => addItemToDom(item));
	checkUi();
}

function onAddItemSubmit(e) {
	e.preventDefault();
	const newItem = itemInput.value;
	if (newItem === '') {
		alert('Please add something');
		return;
	}
	addItemToDom(newItem);
	addItemToStorage(newItem);
	checkUi();
	itemInput.value = '';
}

function addItemToDom(item) {
	const li = document.createElement('li');
	li.appendChild(document.createTextNode(item));
	const button = createButton('remove-item btn-link text-red');
	li.appendChild(button);
	itemList.appendChild(li);
}

function addItemToStorage(item) {
	const itemsFromStorage = getItemFromStorage(item);

	itemsFromStorage.push(item);
	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}
function getItemFromStorage() {
	let itemsFromStorage;
	if (localStorage.getItem('items') === null) {
		itemsFromStorage = [];
	} else {
		itemsFromStorage = JSON.parse(localStorage.getItem('items'));
	}
	return itemsFromStorage;
}

function createButton(classes) {
	const button = document.createElement('button');
	button.className = classes;
	const icon = createIcon('fa-solid fa-xmark');
	button.appendChild(icon);
	return button;
}
function createIcon(classes) {
	const icon = document.createElement('i');
	icon.className = classes;
	item.classList.add('edit-mode');
	return icon;
}
function setItemToEdit(item) {
	isEditMode = true;
}

function onClickItem(e) {
	if (e.target.parentElement.classList.contains('remove-item')) {
		removeItem(e.target.parentElement.parentElement);
	} else {
		setItemToEdit(e.target);
	}
}
function removeItem(item) {
	if (confirm('Are you sure? ')) {
		item.remove();
		removeItemFromStorage(item.innerText);
		checkUi();
	}
}
function removeItemFromStorage(item) {
	let itemsFromStorage = getItemFromStorage();
	itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function removeAllItems() {
	while (itemList.firstChild) {
		itemList.removeChild(itemList.firstChild);
	}

	localStorage.removeItem('items');
	checkUi();
}

function filterItems(e) {
	const items = itemList.querySelectorAll('li');
	let filteredText = e.target.value.toLowerCase();

	items.forEach((item) => {
		const itemName = item.innerText.toLowerCase();

		if (!itemName.includes(filteredText)) {
			item.style.display = 'none';
		} else {
			item.style.display = 'flex';
		}
	});
}

function checkUi() {
	const items = itemList.querySelectorAll('li');
	if (items.length === 0) {
		itemFilter.style.display = 'none';
		clearBtn.style.display = 'none';
	} else {
		itemFilter.style.display = 'block';
		clearBtn.style.display = 'block';
	}
}

checkUi();

function init() {
	itemForm.addEventListener('submit', onAddItemSubmit);
	itemList.addEventListener('click', onClickItem);

	clearBtn.addEventListener('click', removeAllItems);
	itemFilter.addEventListener('input', filterItems);
	document.addEventListener('DOMContentLoaded', displayItems);
}

init();
