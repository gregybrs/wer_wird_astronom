import { writable, get } from 'svelte/store';

export const jokerUsed = writable(false);
export const jokerMessage = writable("");

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

export function resetJoker() {
    jokerMessage.set("");
    jokerUsed.set(false);
    console.log("Joker reset:", get(jokerUsed)); // Debug log

}

