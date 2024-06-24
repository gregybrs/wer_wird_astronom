<script>
    import { fetchChatGPTResponse } from "./api";
    import { onMount } from "svelte";
    export let history;

    let currentQuestionIndex = 0;
    let maxQuestions = 15;
    let question = "Frage lädt...";
    let answers = [];
    let correctAnswer = "";
    let userAnswer = "";
    let error = "";

    import Rocket from "./assets/Rocket.png";

    onMount(async () => {
        await loadQuestion(currentQuestionIndex);
    });

    async function loadQuestion(index) {
        if (index >= maxQuestions) {
            question = "Glückwunsch! Du bist ein Astronaut.";
            answers = [];
            return;
        }

        const difficulty = index + 1;
        const prompt = `Give me a multiple choice question about astronomy with difficulty level ${difficulty} varying each time in German.`;
        try {
            const data = await fetchChatGPTResponse(prompt);
            console.log("Received data:", data);

            if (
                !data ||
                !data.choices ||
                !data.choices[0] ||
                !data.choices[0].text
            ) {
                throw new Error("Unexpected API response format");
            }

            const responseText = data.choices[0].text;
            const lines = responseText
                .split("\n")
                .filter((line) => line.trim() !== "");

            console.log("Parsed lines:", lines);

            if (lines.length < 6) {
                throw new Error("Incomplete API response");
            }

            question = lines[0];
            answers = lines
                .slice(1, 5)
                .map((line) => line.replace(/^[A-D]\)\s*/, ""));

            const correctAnswerLine = lines[5];
            correctAnswer = answers.find((answer) =>
                correctAnswerLine.includes(answer),
            );

            if (!correctAnswer) {
                throw new Error(
                    "Correct answer not found in the provided answers",
                );
            }

            console.log("Correct answer:", correctAnswer);

            history.update((h) => [...h, { question, answers, correctAnswer }]);
        } catch (err) {
            error =
                "Error loading question: " +
                (err.response ? err.response.data.error.message : err.message);
            console.error("Error:", err);
        }
    }

    function checkAnswer(answer) {
        userAnswer = answer;
        setTimeout(() => {
            currentQuestionIndex++;
            userAnswer = "";
            loadQuestion(currentQuestionIndex);
        }, 2000);
    }

    function isCorrect(answer) {
        return userAnswer && answer === correctAnswer;
    }

    function isIncorrect(answer) {
        return userAnswer && answer !== correctAnswer && userAnswer === answer;
    }

    $: rocketPosition = (currentQuestionIndex / maxQuestions) * 100;
</script>

<div class="container">
    <div class="progress-bar">
        <img
            src={Rocket}
            alt="Rocket"
            class="rocket"
            style="bottom: {rocketPosition}%"
        />
    </div>
    <div class="quiz-content">
        {#if error}
            <p class="error">{error}</p>
        {:else}
            <div>
                <p>{question}</p>
                <ul>
                    {#each answers as answer}
                        <li>
                            <button
                                type="button"
                                class:is-correct={userAnswer &&
                                    answer === correctAnswer}
                                class:is-incorrect={userAnswer &&
                                    answer !== correctAnswer &&
                                    userAnswer === answer}
                                on:click={() => checkAnswer(answer)}
                                disabled={userAnswer !== ""}
                            >
                                {answer}
                            </button>
                        </li>
                    {/each}
                </ul>
            </div>
        {/if}
    </div>
</div>
