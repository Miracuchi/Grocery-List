const saisie = document.querySelector('#saisie');
const add = document.querySelector('#add');
const liste = document.querySelector('#liste');
const categorie = document.querySelector('#categorie');
const upButton = document.querySelector('#up');
saisie.focus();
saisie.required = true;

const rayon = ['⏬', '🥛', '🥩', '🧊', '🍃', '😽', '🍾', '🥖', '🍝', '🧀', '🧽', '👶', '💄', '🩹', '📱'];

// ON ITERE CHAQUE ITEM DE LA LIST POUR CREER UN ELEMENT HTML A CHAQUE FOIS

function upside() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}

upButton.addEventListener('click', upside);
// CODE QUI CREE LES OPTIONS DANS LE TOUT PREMIER INPUT PRES DE LA BARRE DE SAISIE GRACE A L'ARRAY CI-DESSUS
function addRayon(cible) {
  rayon.forEach((item) => {
    const option = document.createElement('option');
    option.text = item;
    option.value = item;
    cible.appendChild(option);
  });
}

// Ajout des options au select #category de la main navbar
addRayon(categorie);

let groceryList = [];
const LIST_KEY = 'grocery_list';
if (localStorage.getItem(LIST_KEY) !== null) {
  // LA LISTE EXISTE
  groceryList = JSON.parse(localStorage.getItem(LIST_KEY));
}

// AJOUT D'ITEM
const saveItem = (item) => {
  groceryList.push(item);
  localStorage.setItem(LIST_KEY, JSON.stringify(groceryList));
};

// SUPPRESSION D'UN ITEM
const deleteItem = (item) => {
  const index = groceryList.findIndex((itemToDelete) => itemToDelete.title === item.title);
  groceryList.splice(index, 1);
  localStorage.setItem(LIST_KEY, JSON.stringify(groceryList));
};

function edition(e, editArea, editButton, selectArea) {
  e.preventDefault();

  // Passage en mode édition
  if (editArea.disabled === true) {
    editArea.disabled = false;
    editArea.focus();
    editButton.className = 'save';
    editButton.innerHTML = '<i class="fa-solid fa-check-double"></i>';
    selectArea.disabled = false;
  } else {
    // repassage en mode readonly
    editButton.className = 'change';
    editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editArea.disabled = true;
    selectArea.disabled = true;
  }
}

// AFFICHAGE DES ITEMS SUR LA PAGE
const renderAnItem = (itemRetrieve) => {
  const storage = document.createElement('div');
  storage.className = 'animate';

  const rayonSelect = document.createElement('select');
  addRayon(rayonSelect);
  rayonSelect.disabled = true;
  rayonSelect.className = 'choose';
  rayonSelect.value = itemRetrieve.rayon;

  const editArea2 = document.createElement('input');
  editArea2.value = itemRetrieve.title;
  editArea2.className = 'edit';
  editArea2.disabled = true;

  const editButton2 = document.createElement('button');
  editButton2.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  editButton2.className = 'change';
  editButton2.addEventListener('click', (e) => {
    edition(e, editArea2, editButton2, rayonSelect);
  });

  const deleteButton2 = document.createElement('button');
  deleteButton2.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton2.className = 'delete';
  deleteButton2.addEventListener('click', (e) => {
    e.preventDefault();
    deleteButton2.parentElement.remove();
    deleteItem(itemRetrieve);
  });

  storage.appendChild(rayonSelect);
  storage.appendChild(editArea2);
  storage.appendChild(editButton2);
  storage.appendChild(deleteButton2);

  liste.appendChild(storage);
};

function createGroceryItem() {
  const txt = saisie.value;
  if (txt === '') {
    alert('Veuillez rentrer un article !');
  } else {
    const title = saisie.value;
    const rayons = categorie.value;
    const newItem = {
      title,
      rayon: rayons,
    };
    saveItem(newItem);
    renderAnItem(newItem);
    saisie.focus();
    saisie.value = '';
  }
}

groceryList.forEach((itemRetrieve) => {
  renderAnItem(itemRetrieve);
});

add.addEventListener('click', createGroceryItem);
saisie.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    createGroceryItem();
    event.preventDefault();
  }
});
