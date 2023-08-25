export function addTask(element) {
  let listStockage = [1, 2, 3, "a"];
  for (let i = 0; i < listStockage.length; i++) {
    document.querySelector("#taskList").innerText = `
    <div>
    <p>${listStockage}</p>
    </div>
    `;
  }
}
