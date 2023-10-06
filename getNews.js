const API_URL = "https://api.docsbot.ai/teams/xwIbVScaj0QaHNNbXE88/bots/arjUh1HU4y4Qeq4J4nFn/chat";

function sendQuestion() {
    const questionInput = document.getElementById('question');
    const responseList = document.getElementById('responseList');

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
        // Clear existing items
        responseList.innerHTML = "";

        // Split the response by numbers (assuming the articles always start with numbers)
        const articles = data.answer.split(/\d\./).slice(1);
        console.log(articles);  // Check the split articles

        articles.forEach(article => {
            // Extracting title, link, and date
            const titleMatch = article.match(/(.*?) - \[Link\]/);
            const linkMatch = article.match(/\[Link\]\((.*?)\)/);
            const dateMatch = article.match(/Date: (.*?)$/);

            if (titleMatch && linkMatch) {
                const title = titleMatch[1].trim();
                const link = linkMatch[1];
                const date = dateMatch ? dateMatch[1].trim() : null;

                // Create the list item
                const listItem = document.createElement('li');

                const linkElement = document.createElement('a');
                linkElement.href = link;
                linkElement.textContent = title;

                listItem.appendChild(linkElement);

                if (date && date !== "Not available") {
                    const dateSpan = document.createElement('span');
                    dateSpan.textContent = ` - Date: ${date}`;
                    listItem.appendChild(dateSpan);
                }

                responseList.appendChild(listItem);
                console.log(listItem);  // Check each created list item
            }
        });
    })
    .catch(error => {
        console.error('Error:', error);
        const errorItem = document.createElement('li');
        errorItem.textContent = "There was an error processing your request.";
        responseList.appendChild(errorItem);
    });
}
