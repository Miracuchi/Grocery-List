const saisie = document.querySelector("#saisie");
const add = document.querySelector("#add");
const liste = document.querySelector("#liste");
const categorie = document.querySelector("#categorie")
const upButton = document.querySelector("#up")
saisie.focus();
saisie.required = true;


const rayon = ["⏬", "🥛", "🥩", "🧊", "🍃", "😽", "🍾", "🥖", "🍝", "🧀", "🧽", "👶", "💄", "🩹", "📱"]


// ON ITERE CHAQUE ITEM DE LA LIST POUR CREER UN ELEMENT HTML A CHAQUE FOIS

function upside(upButton){
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
}

upButton.addEventListener("click", upside)
 //CODE QUI CREE LES OPTIONS DANS LE TOUT PREMIER INPUT PRES DE LA BARRE DE SAISIE GRACE A L'ARRAY CI-DESSUS
function addRayon (cible) {
    rayon.forEach(function(item){
        let option = document.createElement("option")
        option.text = item;
        option.value = item;
        cible.appendChild(option)
    })
};

// Ajout des options au select #category de la main navbar
addRayon(categorie)

// créer et ajoute des inputs à un element html donné
// créer et ajoute des buttons à un élement html donné



function createGroceryItem() {

    let txt = saisie.value
        if(txt === ""){
            alert("Veuillez rentrer un article !")
        } else {
            
            const title = saisie.value;
            const rayon = categorie.value;
            const newItem = {
                title,
                rayon
            };
            saveItem(newItem);
            renderAnItem(newItem);
            saisie.focus();
            saisie.value = "";
            
        }
}






function edition(e, editArea, editButton, selectArea){
    e.preventDefault();

    // Passage en mode édition
    if(editArea.disabled === true){
        editArea.disabled = false;
        
        editArea.focus();
        editButton.className = "save";
        editButton.innerHTML = '<i class="fa-solid fa-check-double"></i>';
        selectArea.disabled = false;
        
    } else {
            // passage en mode readonly
        editButton.className = "change";
        editArea.value = editArea.value;
        editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        editArea.disabled = true;
        selectArea.disabled = true;
    }};



let groceryList = []
const LIST_KEY = "grocery_list";
if (localStorage.getItem(LIST_KEY) !== null){
    // LA LISTE EXISTE
    groceryList = JSON.parse(localStorage.getItem(LIST_KEY));
}

// AJOUT D'ITEM
let saveItem = (item) => {
    groceryList.push(item)
    localStorage.setItem(LIST_KEY, JSON.stringify(groceryList));
}

// SUPPRESSION D'UN ITEM
const deleteItem = (item) =>{
    
    const index = groceryList.findIndex(function(itemToDelete){
        return itemToDelete.title === item.title;
    });
    groceryList.splice(index, 1);
    localStorage.setItem(LIST_KEY, JSON.stringify(groceryList))
}

const renderAnItem = (itemRetrieve) => {
    const storage = document.createElement("div")
    storage.className = "animate";

    const rayonSelect = document.createElement("select");
    addRayon(rayonSelect);
    rayonSelect.disabled = true;
    rayonSelect.className = "choose";
    rayonSelect.value = itemRetrieve.rayon;
    
    const editArea2 = document.createElement('input');
    editArea2.value = itemRetrieve.title;
    editArea2.className = "edit";
    editArea2.disabled = true;

    

    const editButton2 = document.createElement("button");
    editButton2.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editButton2.className = "change";
    editButton2.addEventListener("click", function(e){
        edition(e, editArea2, editButton2, rayonSelect)
    })
    

    const deleteButton2 = document.createElement("button")
    deleteButton2.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton2.className = "delete";
    deleteButton2.addEventListener("click", function(e){
        e.preventDefault();
        deleteButton2.parentElement.remove();
        deleteItem(itemRetrieve);
                    
                })
    
    storage.appendChild(rayonSelect);
    storage.appendChild(editArea2);
    storage.appendChild(editButton2);
    storage.appendChild(deleteButton2)
    
    liste.appendChild(storage);
}
groceryList.forEach((itemRetrieve) => {
    renderAnItem(itemRetrieve)
})






add.addEventListener("click", createGroceryItem);
saisie.addEventListener("keypress", function(event){
    if (event.key === "Enter"){
        createGroceryItem();
        event.preventDefault();
    }
})



