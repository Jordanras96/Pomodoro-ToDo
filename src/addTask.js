export function addTask() {
  let listStockage = getValue("listStockage") || []; // Récupérer la liste depuis le localStorage ou utiliser un tableau vide
  listElement();

  class SaveValue {
    constructor() {
      if (!localStorage) {
        throw new Error("Le navigateur ne prend pas en charge localStorage");
      }
    }
    storeValue(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
    getValue(key) {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    }
    removeValue(key) {
      localStorage.removeItem(key);
    }
  }
  // stockage des valeurs en local
  function storeValue(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // récupération des valeurs
  function getValue(key) {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  }

  // affichage de la liste
  function listElement() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // effacer le contenu précédent dans la liste pour éviter la duplication

    listStockage.forEach((element, index) => {
      // Utilisation de forEach pour obtenir l'élément et son index
      const diviPara = document.createElement("div");
      const newParagraph = document.createElement("p");
      const removeBtn = document.createElement("button");
      const checkBtn = document.createElement("input");
      checkBtn.type = "checkbox";
      checkBtn.className = "checked:bg-blue-500";
      newParagraph.textContent = element;
      newParagraph.id = "task";
      removeBtn.textContent = "-";
      removeBtn.className = "removeBtn";
      diviPara.className = "flex justify-between items-center flex-wrap";
      diviPara.append(checkBtn);
      diviPara.append(newParagraph);
      diviPara.append(removeBtn);
      taskList.append(diviPara);
      removeBtn.addEventListener("click", () => removeToList(index)); // Appel de removeToList avec l'index
    });
  }

  function removeToList(index) {
    listStockage.splice(index, 1);
    storeValue("listStockage", listStockage); // Mise à jour du localStorage après suppression
    listElement();
  }

  function addToList() {
    let inputElement = document.getElementById("boxAddTask");

    const inputValue = inputElement.value.trim();
    if (inputValue === "") {
      errorMsg(); // Appel à la fonction d'erreur
    } else {
      listStockage.push(inputValue);
      storeValue("listStockage", listStockage); // Mise à jour du localStorage après ajout
      listElement();
      finishedList();
      inputElement.value = "";
    }
  }
  // écouter click paragraghe
  function listenFinished() {}

  // ajout du style
  function finishedList() {
    let selectParagraph = document.getElementById("task");

    selectParagraph.className = "line-through";
    console.log(selectParagraph);
  }

  function errorMsg() {
    // Affichage de l'erreur
    const divError = document.createElement("div");
    const titreError = document.createElement("p");
    const textError = document.createElement("p");
    const error = document.getElementById("error");
    divError.className =
      "bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4";
    titreError.className = "font-bold";
    titreError.textContent = "Attention";
    textError.textContent = "Veuillez insérer une valeur";
    divError.append(titreError);
    divError.append(textError);
    error.innerHTML = ""; // Effacer les erreurs précédentes avant d'ajouter celle-ci
    error.append(divError);
  }

  //écouter btn +
  function listenAddBtn() {
    const addBtn = document.getElementById("addBtn");
    addBtn.addEventListener("click", addToList);
  }

  listenAddBtn();
}
