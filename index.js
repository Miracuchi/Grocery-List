const saisie = document.querySelector("#saisie");
const add = document.querySelector("#add");
const liste = document.querySelector("#liste");
const categorie = document.querySelector("#categorie")
saisie.focus()
add.addEventListener("click", addTodo)
saisie.required = true;

let rayon = ["Choisir un rayon", "Crémerie", "Boucherie", "Poissonerie", "Desserts", "Fruits", "Légumes", "Surgelés", "Boissons", "Boulangerie", "Epicerie salée", "Rayon frais"]

 //CODE QUI CREE LES OPTIONS DANS LE TOUT PREMIER INPUT PRES DE LA BARRE DE SAISIE GRACE A L'ARRAY CI-DESSUS
//rayon.forEach(function addRayon (item) {
  //  let option = document.createElement("option")
  //  option.text = item;
  //  option.value = item;
  //  categorie.appendChild(option)
//});

function addTodo(event){
    saisie.required = true;
   

    event.preventDefault();
    event.stopPropagation();
    console.log("Hello")
    const todoDiv = document.createElement("div");
  

    saisie.focus()
   
    const editArea = document.createElement("input");
        editArea.id = "edit"
        editArea.value = saisie.value;
        editArea.disabled = true;
        todoDiv.appendChild(editArea);

    // CODE QUI CREE LES INPUT DANS LA LISTE GRACE AU PREMIER ARRAY
            const selectArea = document.createElement("select")
                rayon.forEach(function addRayon (item) {
                       let option = document.createElement("option")
                    option.text = item;
                    option.value = item;
                    selectArea.appendChild(option)
                       selectArea.disabled = false;
                       selectArea.id = "choose"
                });
                todoDiv.appendChild(selectArea)


        
                
        
            
                 
            
        
                

    const editButton = document.createElement("button");
        editButton.innerHTML = "Modifier";
        editButton.id = "change";

        todoDiv.appendChild(editButton);
    // Partie delete
    const deleteButton = document.createElement("button")
        deleteButton.innerHTML = "Supprimer";
        deleteButton.id = "delete";
        deleteButton.addEventListener("click", function(e){
            e.preventDefault();
            deleteButton.parentElement.remove();
        })
        
        todoDiv.appendChild(deleteButton);

    liste.appendChild(todoDiv);
    saisie.value = "";

    //partie edit

    editButton.addEventListener("click", function(e){
        e.preventDefault();

        // Passage en mode édition
        
        if(editArea.disabled === true){
        editArea.disabled = false;
        //category.disabled = false
        ;
        
        editArea.focus();
        editButton.id = "save";
        
        editButton.innerText = "Sauvegarder"
            
    } else{
                // passage en mode readonly
                
                editButton.id = "change";
                editArea.value = editArea.value;
                editButton.innerText = "Modifier"
                editArea.disabled = true
                //category.disabled = true
                
                }

            });
            


}
    


             

            

        
    



    
