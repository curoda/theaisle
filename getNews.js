const API_URL = "https://api.docsbot.ai/teams/xwIbVScaj0QaHNNbXE88/bots/arjUh1HU4y4Qeq4J4nFn/chat";

function sendQuestion() {
    const questionInput = document.getElementById('question');
    const responseText = document.getElementById('responseText');
    
    const data = {
        question: questionInput.value,
        format: 'text'
        // Add any other desired parameters here
    };

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // If the API requires authentication, add headers here
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Update the display section with the returned data
        responseText.textContent = data.answer; // Assuming 'answer' is a key in the response. Adjust as needed.
    })
    .catch(error => {
        console.error('Error:', error);
        responseText.textContent = "There was an error processing your request.";
    });
}
