import "./style.css";

import { addTask } from "./addTask.js";
import { weatherAPI } from "./weatherAPI.js";
import { timer } from "./timer.js";

addTask(document.querySelector("#taskList"));
weatherAPI(document.querySelector("#weather"));
timer(document.querySelector("#timer"));
