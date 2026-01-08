const form = document.querySelector('#item-form');
const formInput = document.querySelector('#item-input');
const list = document.querySelector('#item-list');
const BtnClearAll = document.querySelector('#clear');
const filter = document.querySelector('#filter');
const submitButton = form.querySelector('.btn');
let isEditMode = false;

function checkIfItemsExists(item) {
	const itemsFromStorage = getItemFromStorage();
	return itemsFromStorage.includes(item);
}

function onAddItemSubmit(e) {
	e.preventDefault();
	const newItem = formInput.value.toLowerCase().trim();
	if (newItem === '') {
		alert('kindly enter a value');
		return;
	}

	if (isEditMode) {
		const itemToEdit = list.querySelector('.edit-mode');
		const oldItemText = itemToEdit.firstChild.textContent.trim();

		itemToEdit.firstChild.textContent = newItem;
		let itemsFromStorage = getItemFromStorage();
		itemsFromStorage = itemsFromStorage.map((item) =>
			item === oldItemText ? newItem : item
		);

		localStorage.setItem('items', JSON.stringify(itemsFromStorage));
		exitEditMode();
	} else {
		if (checkIfItemsExists(newItem)) {
			alert('duplicate kindly enter a new value');
			formInput.value = '';
			return;
		}
		addItemToDom(newItem);
		addItemToStorage(newItem);
	}

	checkUi();
}
function exitEditMode() {
	isEditMode = false;
	list.querySelectorAll('li').forEach((li) =>
		li.classList.remove('edit-mode')
	);
	submitButton.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
	submitButton.style.backgroundColor = '';
	formInput.value = '';
}

function addItemToStorage(item) {
	const itemFromStorage = getItemFromStorage();
	itemFromStorage.push(item);
	localStorage.setItem('items', JSON.stringify(itemFromStorage));
}

function addItemToDom(newItem) {
	const li = createListItem(newItem);
	const button = createButton();
	li.appendChild(button);
	list.appendChild(li);
	formInput.value = '';
	checkUi();
}

function getItemFromStorage() {
	let itemFromStorage;
	if (localStorage.getItem('items') === null) {
		itemFromStorage = [];
	} else {
		itemFromStorage = JSON.parse(localStorage.getItem('items'));
	}
	return itemFromStorage;
}
function onClickRemove(e) {
	if (e.target.parentElement.classList.contains('remove-item')) {
		removeItem(e.target.parentElement.parentElement);
	} else {
		if (e.target.tagName === 'LI') {
			setItemToEditMode(e.target);
		}
	}
}

function setItemToEditMode(item) {
	isEditMode = true;

	list.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));

	item.classList.add('edit-mode');
	submitButton.innerHTML = `<i class="fa-solid fa-edit"></i> Update Item`;
	submitButton.style.backgroundColor = '#228822';
	formInput.value = item.firstChild.textContent.trim();
}

function removeItem(item) {
	if (confirm('Are you sure ?')) {
		item.remove();
		removeItemFromStorage(item.firstChild.textContent.trim());
		checkUi();
	}
}

function removeItemFromStorage(item) {
	let itemFromStorage = getItemFromStorage();

	itemFromStorage = itemFromStorage.filter((i) => i !== item);
	console.log(itemFromStorage);
	localStorage.setItem('items', JSON.stringify(itemFromStorage));
}
function removeAllItem() {
	while (list.firstChild) {
		list.firstChild.remove();
	}
	localStorage.removeItem('items');
	checkUi();
}
function updateDisplay() {
	let itemFromStorage = getItemFromStorage();
	itemFromStorage.forEach((item) => addItemToDom(item));
	checkUi();
}

function filterForItems(e) {
	const listItem = list.querySelectorAll('li');
	const filteredItem = e.target.value.toLowerCase();

	listItem.forEach((item) => {
		const text = item.textContent.toLocaleLowerCase();

		if (text.includes(filteredItem)) {
			item.style.display = 'flex';
		} else {
			item.style.display = 'none';
		}
	});
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

function checkUi() {
	const list = document.querySelector('#item-list');
	// if(list.includes())
	if (list.children.length <= 0) {
		filter.style.display = 'none';
		BtnClearAll.style.display = 'none';
	} else {
		filter.style.display = 'block';
		BtnClearAll.style.display = 'block';
	}
}

checkUi();

filter.addEventListener('input', filterForItems);
BtnClearAll.addEventListener('click', removeAllItem);
list.addEventListener('click', onClickRemove);
form.addEventListener('submit', onAddItemSubmit);

document.addEventListener('DOMContentLoaded', updateDisplay);
