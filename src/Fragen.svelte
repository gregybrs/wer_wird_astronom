<script>
    import { history } from "./stores.js";
    import "./fragen.css";
</script>

<h2>Fragen</h2>
<div>
    {#each $history as item, index}
        <div class="question-box">
            <p class="question">
                <strong>Frage {index + 1}:</strong>
                {item.question}
            </p>
            <ul class="answers">
                {#each item.answers as answer}
                    <li
                        class="answer {answer === item.correctAnswer
                            ? 'correct-answer'
                            : ''}"
                    >
                        {answer}
                    </li>
                {/each}
            </ul>
        </div>
    {/each}
</div>
