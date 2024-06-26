<script>
  import Router from "svelte-spa-router";
  import { link } from "svelte-spa-router";
  import routes from "./routes.js";
  import { history } from "./stores.js";
</script>

<main>
  <header>
    <h1>Wer wird Astronaut?</h1>
  </header>
  <nav>
    <a href="/" use:link>Quiz</a>
    <a href="/fragen" use:link>Fragen</a>
  </nav>
  <Router {routes} />
  <footer>
    <p>&copy; 2024 Astronomy Quiz. All rights reserved.</p>
  </footer>
</main>

<style>
  nav a {
    padding: 10px;
    text-decoration: none;
    color: #fff;
  }
  nav a:hover {
    background-color: #555;
  }
</style>
