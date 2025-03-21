// document.getElementById("user-input").addEventListener("keypress", function(event) {
//     if (event.key === "Enter") {
//         event.preventDefault();
//         sendMessage(event);
//     }
// });

// function sendMessage(event) {
//     event.preventDefault(); // Prevents page reload on form submit

//     let inputBox = document.getElementById("user-input");
//     let message = inputBox.value.trim();
//     if (message === "") return;

//     let chatBox = document.getElementById("chat-box");

//     // Display user message
//     let userMessage = document.createElement("div");
//     userMessage.classList.add("chat-message", "user-message");
//     userMessage.style.background = "#d4edda";
//     userMessage.style.padding = "10px";
//     userMessage.style.borderRadius = "5px";
//     userMessage.style.alignSelf = "flex-end";
//     userMessage.textContent = message;
//     chatBox.appendChild(userMessage);
//     chatBox.scrollTop = chatBox.scrollHeight;
//     inputBox.value = "";

//     // Send message to backend
//     fetch("http://localhost:5000/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: message })
//     })
//     .then(response => response.json())
//     .then(data => {
//         let botMessage = document.createElement("div");
//         botMessage.classList.add("bot-message");
//         botMessage.textContent = data.reply;
//         chatBox.appendChild(botMessage);
//         chatBox.scrollTop = chatBox.scrollHeight;
//     })
//     .catch(error => {
//         console.error("Error:", error);
//         let errorMessage = document.createElement("div");
//         errorMessage.classList.add("bot-message");
//         errorMessage.style.color = "red";
//         errorMessage.textContent = "Error: Unable to connect to server.";
//         chatBox.appendChild(errorMessage);
//         chatBox.scrollTop = chatBox.scrollHeight;
//     });
// }

document.querySelector(".chat-input").addEventListener("submit", async function (event) {
    event.preventDefault();

    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    if (!userInput.value.trim()) return; // Ignore empty messages

    // Append user message
    const userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.textContent = userInput.value;
    chatBox.appendChild(userMessage);

    try {
        const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput.value }),
        });

        const data = await response.json();
        const botMessage = document.createElement("div");
        botMessage.className = "bot-message";
        botMessage.textContent = data.reply || "I couldn't process that. Please try again.";
        chatBox.appendChild(botMessage);
    } catch (error) {
        console.error("Error:", error);
    }

    userInput.value = ""; // Clear input field
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
});
