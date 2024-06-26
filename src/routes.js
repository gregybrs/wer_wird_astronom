import Quiz from "./Quiz.svelte";
import Fragen from "./Fragen.svelte";
import { history } from "./stores.js";

const routes = {
    "/": Quiz,
    "/fragen": Fragen,
};

export default routes;