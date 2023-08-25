import "./style.css";

import { addTask } from "./addTask.js";

document.querySelector("#app").innerHTML = `
  <div>
    
  </div>
`;

addTask(document.querySelector("#counter"));
