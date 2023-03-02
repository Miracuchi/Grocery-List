const saisie = document.querySelector("#saisie");
const add = document.querySelector("#add");
const liste = document.querySelector("#liste");
const categorie = document.querySelector("#categorie")
const upButton = document.querySelector("#up")
saisie.focus();




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

    
    


    let txt = saisie.value
        if(txt === ""){
            alert("Veuillez rentrer un article !")
        } else { 
            
           
            
            const editArea = document.createElement("input");
                editArea.id = "edit";
                editArea.type = "text"
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
                const name = editArea.value;
                const category = selectArea.value;
                const editing = editButton;
                const deleting = deleteButton;
                const itemList = {
                    name,
                    category,
                    editing,
                    deleting
                };
                
                //const listo = liste.innerHTML;
                
                //const itemList = {listo}

                const list = []
                list.push(itemList)
                localStorage.setItem("list", JSON.stringify(list))
                // CAS OU LA LISTE CONTIENT DEJA UN ITEM
                const currentList = localStorage.getItem("list")
                newItem.push(currentList)
                
            balise.appendChild(deleteButton);}

           

}





function edition(e, editArea, editButton, selectArea){
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
add.addEventListener("click", addTodo)
    
 //partie edit

//add.addEventListener("click", function storage(e){
    
    //e.preventDefault();
    //e.stopPropagation();
//})
