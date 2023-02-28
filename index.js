const saisie = document.querySelector("#saisie");
const add = document.querySelector("#add");
const liste = document.querySelector("#liste");
const categorie = document.querySelector("#categorie")
const upButton = document.querySelector("#up")
saisie.focus()
add.addEventListener("click", addTodo)
saisie.required = true;

const rayon = ["⏬", "🥛", "🥩", "🧊", "🍃", "😽", "🍾", "🥖", "🍝", "🧀", "🧽", "👶", "💄", "🩹", "📱"]

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

function createGroceryItem(balise) {
    const editArea = document.createElement("input");
        editArea.id = "edit"
        editArea.value = saisie.value;
        editArea.disabled = true;
        balise.appendChild(editArea);
    const selectArea = document.createElement("select")
        addRayon(selectArea)
               selectArea.disabled = true;
               selectArea.id = "choose";
               selectArea.value = categorie.value;
               
        balise.appendChild(selectArea)

        const editButton = document.createElement("button");
        editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        editButton.id = "change";
        editButton.addEventListener("click", function(e){
            edition(e, editArea, editButton, selectArea)
        })

        
                
    balise.appendChild(editButton);
    
    // Partie delete
    const deleteButton = document.createElement("button")
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.id = "delete";
        deleteButton.addEventListener("click", function(e){
            e.preventDefault();
            deleteButton.parentElement.remove();
        })
    
       
        
    balise.appendChild(deleteButton);

}


function edition(e, editArea, editButton, selectArea, deleteButton){
    e.preventDefault();
   
    
    // Passage en mode édition
    if(editArea.disabled === true){
        editArea.disabled = false;
        
        editArea.focus();
        editButton.id = "save";
        editButton.innerHTML = '<i class="fa-solid fa-check-double"></i>';
        selectArea.disabled = false;
        
    } else {
            // passage en mode readonly
        editButton.id = "change";
        editArea.value = editArea.value;
        editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        editArea.disabled = true;
        selectArea.disabled = true;
    }};


function addTodo(event){
    saisie.required = true;
   

    event.preventDefault();
    event.stopPropagation();
    console.log("Hello")
    const todoDiv = document.createElement("div");
    todoDiv.id = "animate";
    
    
    createGroceryItem(todoDiv);
    saisie.focus()
   
    liste.appendChild(todoDiv);
    saisie.value = "";

    // CODE QUI CREE LES INPUT DANS LA LISTE GRACE AU PREMIER ARRAY
            

    

   

}
    
 //partie edit

 

 

            

        
    



    
