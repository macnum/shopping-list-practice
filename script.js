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
	checkUi();
}
function clearAllListItem(e) {
	while (list.firstChild) {
		list.firstChild.remove();
		checkUi();
	}
}

function filterForItems(e) {
	// console.log(filter.value);
	const listItem = list.querySelectorAll('li');
	const filteredItem = e.target.value.toLowerCase();
	console.log(filteredItem);
	listItem.forEach((item) => {
		const text = item.textContent.toLocaleLowerCase();

		if (text.includes(filteredItem)) {
			item.style.display = 'flex';
		} else {
			item.style.display = 'none';
		}
	});
}

function onAddItem(newItem) {
	const item = createListItem(newItem);
	const button = createButton();
	item.appendChild(button);
	list.appendChild(item);
	formInput.value = '';
	checkUi();
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

function getItemFromStorage() {
	let itemFromStorage;
	itemFromStorage = JSON.parse(localStorage.getItem('items'));
	setItemToStorage(e);
}

function setItemToStorage(e) {}
function removeItemFromStorage() {}

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
console.log(list);
console.log(list.children.length);
filter.addEventListener('input', filterForItems);
BtnClearAll.addEventListener('click', clearAllListItem);
list.addEventListener('click', removeItem);
form.addEventListener('submit', onClickItem);
