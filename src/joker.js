import { writable, get } from 'svelte/store';

export const jokerUsed = writable(false);
export const jokerMessage = writable("");
export const secondJokerUsed = writable(false);

export function useJoker(correctAnswer, userAnswer, gameOver) {
    if (!get(jokerUsed) && !userAnswer && !gameOver) {
        jokerUsed.set(true);
        jokerMessage.set(`Die richtige Antwort ist: ${correctAnswer}`);
        console.log("Joker used:", get(jokerUsed)); // Debug log
    } else {
        console.log("Joker not used:", {
            jokerUsed: get(jokerUsed),
            userAnswer,
            gameOver
        }); // Debug log
    }
}

export function useSecondJoker(answers, correctAnswer, userAnswer, gameOver) {
    if (!get(secondJokerUsed) && !userAnswer && !gameOver) {
        secondJokerUsed.set(true);
        const incorrectAnswers = answers.filter(answer => answer !== correctAnswer);
        const answersToRemove = incorrectAnswers.slice(0, 2);
        return answers.filter(answer => !answersToRemove.includes(answer));
    } else {
        console.log("Second joker not used:", {
            secondJokerUsed: get(secondJokerUsed),
            userAnswer,
            gameOver
        }); // Debug log
    }
}

export function resetJokers() {
    jokerMessage.set("");
    jokerUsed.set(false);
    secondJokerUsed.set(false);
    console.log("Jokers reset:", get(jokerUsed), get(secondJokerUsed)); // Debug log
}
