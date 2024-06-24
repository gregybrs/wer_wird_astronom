import axios from 'axios';

export async function fetchChatGPTResponse(prompt) {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    console.log('API Key:', apiKey); // Debugging log

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'gpt-3.5-turbo-instruct',
            prompt: `${prompt}\n\nProvide exactly four answer choices (A, B, C, D) with one being the correct answer and the rest incorrect. Clearly indicate the correct answer at the end.`,
            max_tokens: 150,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        console.log('API Response:', response.data); // Debugging log
        return response.data;
    } catch (error) {
        console.error('Fetch Error:', error); // Debugging log
        throw error; // Rethrow the error for further handling
    }
}