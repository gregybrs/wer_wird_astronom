<script>
    export let history = [];
</script>

<h2>Fragen</h2>
<ul>
    {#each history as item, index}
        <li>
            <p><strong>Frage {index + 1}:</strong> {item.question}</p>
            <ul>
                {#each item.answers as answer}
                    <li>{answer}</li>
                {/each}
            </ul>
            <p><strong>Richtige Antwort:</strong> {item.correctAnswer}</p>
        </li>
    {/each}
</ul>
