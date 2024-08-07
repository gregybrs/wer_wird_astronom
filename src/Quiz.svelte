<script>
    import { fetchChatGPTResponse } from "./api";
    import { onMount } from "svelte";
    import { history } from "./stores.js";
    import { get } from "svelte/store";
    import Rocket from "./assets/Rocket.png";
    import QuestionSVG from "./assets/question.svg";
    import {
        useJoker,
        resetJokers,
        jokerUsed,
        jokerMessage,
        useSecondJoker,
        secondJokerUsed,
    } from "./joker.js";
    import Modal from "./Modal.svelte";

    let currentQuestionIndex = 0;
    let maxQuestions = 15;
    let question = "Frage lädt...";
    let answers = [];
    let correctAnswer = "";
    let userAnswer = "";
    let error = "";
    let gameOver = false;
    let restartMessage = "";
    let animateRocket = false;
    let rocketPosition = 0;
    let showModal = false;

    const stages = [
        "Anfänger",
        "Neuling",
        "Lernender",
        "Entdecker",
        "Kenner",
        "Enthusiast",
        "Forscher",
        "Analytiker",
        "Spezialist",
        "Experte",
        "Meister",
        "Gelehrter",
        "Pionier",
        "Veteran",
        "Astronaut",
    ];

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
        const prompt = `Gib mir eine Multiple-Choice-Frage über Astronomie mit Schwierigkeitsgrad ${difficulty}, die jedes Mal variiert, auf Deutsch.`;
        try {
            const data = await fetchChatGPTResponse(prompt);
            console.log("Received data:", data);

            if (
                !data ||
                !data.choices ||
                !data.choices[0] ||
                !data.choices[0].text
            ) {
                throw new Error("Unerwartetes API-Antwortformat");
            }

            const responseText = data.choices[0].text;
            const lines = responseText
                .split("\n")
                .filter((line) => line.trim() !== "");

            if (lines.length < 6) {
                throw new Error("Unvollständige API-Antwort");
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
                    "Die richtige Antwort wurde nicht in den angegebenen Antworten gefunden",
                );
            }

            $history.push({
                question: question,
                answers: answers,
                correctAnswer: correctAnswer,
            });
            console.log("history:");
            console.log($history);
        } catch (err) {
            error =
                "Fehler beim Laden der Frage: " +
                (err.response ? err.response.data.error.message : err.message);
            console.error("Fehler:", err);
        }
    }

    function checkAnswer(answer) {
        userAnswer = answer;
        if (answer === correctAnswer) {
            setTimeout(() => {
                currentQuestionIndex++;
                userAnswer = "";
                rocketPosition =
                    (currentQuestionIndex / (maxQuestions - 1)) * 95;
                loadQuestion(currentQuestionIndex);
            }, 2000);
        } else {
            animateRocket = true;
            document.documentElement.style.setProperty(
                "--rocket-start",
                `${rocketPosition}%`,
            );
            setTimeout(() => {
                restartMessage =
                    "Falsche Antwort! Die Rakete muss neu gestartet werden.";
                gameOver = true;
                setTimeout(() => {
                    restartGame();
                }, 2000); // Verzögerung, bevor das Spiel neu gestartet wird
            }, 2000); // Verzögerung, bevor die Neustartmeldung angezeigt wird
        }
    }

    function isCorrect(answer) {
        return userAnswer && answer === correctAnswer;
    }

    function isIncorrect(answer) {
        return userAnswer && answer !== correctAnswer && userAnswer === answer;
    }

    function restartGame() {
        currentQuestionIndex = 0;
        userAnswer = "";
        question = "Frage lädt...";
        answers = [];
        correctAnswer = "";
        error = "";
        gameOver = false;
        restartMessage = "";
        animateRocket = false;
        rocketPosition = 0;
        resetJokers();
        loadQuestion(currentQuestionIndex);
    }

    function closeModal() {
        jokerMessage.set("");
        showModal = false;
        console.log("Modal closed, joker not reset"); // Debug log
        resetJokers();
    }

    function openModal() {
        showModal = true;
    }

    function useSecondJokerHandler() {
        answers = useSecondJoker(answers, correctAnswer, userAnswer, gameOver);
        console.log("Second joker used"); // Debug log
    }
</script>

<div class="container">
    <div class="progress-container">
        <div class="stages">
            {#each stages as stage, index}
                <div
                    class="stage {index === currentQuestionIndex
                        ? 'current-stage'
                        : ''}"
                >
                    {stage}
                </div>
            {/each}
        </div>
        <div class="progress-bar">
            <img
                src={Rocket}
                alt="Rocket"
                class="rocket {animateRocket ? 'animate' : ''}"
                style="bottom: {rocketPosition}%"
            />
        </div>
    </div>

    <div class="quiz-content">
        {#if error}
            <p class="error">{error}</p>
        {:else if gameOver}
            <p class="error">{restartMessage}</p>
        {:else if question !== "Frage lädt..."}
            <div class="question-container">
                <div class="question-background"></div>
                <div class="question-content">
                    <p>{question}</p>
                </div>
                <ul class="answers">
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
        {:else}
            <p>Frage lädt...</p>
        {/if}
    </div>
    <div class="joker-container">
        <button
            type="button"
            class="joker-button"
            on:click={() => {
                useJoker(correctAnswer, userAnswer, gameOver);
                openModal(); // Open the modal
                console.log("Joker button clicked"); // Debug log
            }}
            disabled={$jokerUsed || userAnswer !== ""}
        >
        </button>
        <button
            type="button"
            class="fifty-joker-button"
            on:click={() => {
                useSecondJokerHandler();
                console.log("Second joker button clicked"); // Debug log
            }}
            disabled={$secondJokerUsed || userAnswer !== ""}
        >
        </button>
    </div>
    <Modal show={$jokerUsed} message={$jokerMessage} onClose={closeModal} />
</div>
