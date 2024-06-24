import Quiz from './Quiz.svelte';
import Fragen from './Fragen.svelte';
import { history } from './stores.js'; // Import the history store
import wrap from 'svelte-spa-router/wrap';

const routes = {
    '/': wrap({
        component: Quiz,
        props: { history }
    }),
    '/fragen': wrap({
        component: Fragen,
        props: { history }
    }),
};

export default routes;
