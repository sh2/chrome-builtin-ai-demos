const chatMessages = document.getElementById("chat-messages");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const newChatButton = document.getElementById("new-chat");
const errorToast = document.getElementById("error-toast");

let session = null;
let isGenerating = false;

// Show error toast
const showError = (message) => {
  errorToast.textContent = message;
  errorToast.style.display = "block";
  setTimeout(() => {
    errorToast.style.display = "none";
  }, 5000);
};

// Check if the Prompt API is supported
const isPromptApiSupported = () => {
  return "LanguageModel" in self;
};

// Create a new session
const createSession = async () => {
  if (!isPromptApiSupported()) {
    showError("The Prompt API is not supported in this browser. Please use Chrome with Built-in AI enabled.");
    return null;
  }

  const availability = await LanguageModel.availability();

  if (availability === "unavailable") {
    showError("Gemini Nano model is not available. Please check chrome://flags for Built-in AI settings.");
    return null;
  }

  const supportedLanguages = ["en", "es", "ja"];
  const browserLang = navigator.language?.split("-")[0] || "en";
  const outputLanguage = supportedLanguages.includes(browserLang) ? browserLang : "en";

  const newSession = await LanguageModel.create({
    expectedOutputs: [{ type: "text", languages: [outputLanguage] }],
    monitor(m) {
      m.addEventListener("downloadprogress", (e) => {
        console.log(`Model download: ${Math.floor(e.loaded * 100)}%`);
      });
    },
  });

  return newSession;
};

// Clear welcome message
const clearWelcome = () => {
  const welcome = chatMessages.querySelector(".welcome-message");
  if (welcome) {
    welcome.remove();
  }
};

// Add a message to the chat
const addMessage = (role, content) => {
  clearWelcome();

  const messageEl = document.createElement("div");
  messageEl.classList.add("message", role);

  const avatarEl = document.createElement("div");
  avatarEl.classList.add("message-avatar");
  avatarEl.textContent = role === "user" ? "👤" : "✨";

  const contentEl = document.createElement("div");
  contentEl.classList.add("message-content");
  contentEl.textContent = content;

  messageEl.appendChild(avatarEl);
  messageEl.appendChild(contentEl);
  chatMessages.appendChild(messageEl);

  scrollToBottom();
  return contentEl;
};

// Add typing indicator
const addTypingIndicator = () => {
  clearWelcome();

  const messageEl = document.createElement("div");
  messageEl.classList.add("message", "ai");
  messageEl.id = "typing-indicator";

  const avatarEl = document.createElement("div");
  avatarEl.classList.add("message-avatar");
  avatarEl.textContent = "✨";

  const contentEl = document.createElement("div");
  contentEl.classList.add("message-content");

  const indicator = document.createElement("div");
  indicator.classList.add("typing-indicator");
  indicator.innerHTML = "<span></span><span></span><span></span>";

  contentEl.appendChild(indicator);
  messageEl.appendChild(avatarEl);
  messageEl.appendChild(contentEl);
  chatMessages.appendChild(messageEl);

  scrollToBottom();
};

// Remove typing indicator
const removeTypingIndicator = () => {
  const indicator = document.getElementById("typing-indicator");
  if (indicator) {
    indicator.remove();
  }
};

// Scroll to bottom of chat
const scrollToBottom = () => {
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

// Send message
const sendMessage = async () => {
  const text = messageInput.value.trim();
  if (!text || isGenerating) return;

  // Add user message
  addMessage("user", text);
  messageInput.value = "";
  messageInput.style.height = "auto";
  updateSendButton();

  isGenerating = true;
  sendButton.disabled = true;

  // Show typing indicator
  addTypingIndicator();

  try {
    // Create session if needed
    if (!session) {
      session = await createSession();
      if (!session) {
        removeTypingIndicator();
        addMessage("ai", "Failed to initialize the AI model. Please check that Built-in AI is enabled in your browser.");
        isGenerating = false;
        updateSendButton();
        return;
      }
    }

    // Stream the response
    const stream = session.promptStreaming(text);
    removeTypingIndicator();

    const contentEl = addMessage("ai", "");
    let result = "";

    for await (const chunk of stream) {
      result += chunk;
      contentEl.textContent = result;
      scrollToBottom();
    }
  } catch (error) {
    console.error("Error generating response:", error);
    removeTypingIndicator();
    addMessage("ai", "An error occurred while generating the response. Please try again.");
  } finally {
    isGenerating = false;
    updateSendButton();
  }
};

// Update send button state
const updateSendButton = () => {
  sendButton.disabled = !messageInput.value.trim() || isGenerating;
};

// Auto-resize textarea
const autoResize = () => {
  messageInput.style.height = "auto";
  messageInput.style.height = Math.min(messageInput.scrollHeight, 150) + "px";
};

// Start a new chat
const startNewChat = () => {
  if (session) {
    session.destroy();
    session = null;
  }
  isGenerating = false;

  chatMessages.innerHTML = `
    <div class="welcome-message">
      <div class="welcome-icon">💬</div>
      <h2>Welcome to Built-in AI Chat</h2>
      <p>Powered by Chrome's built-in Gemini Nano model.<br>Your conversations stay on your device.</p>
    </div>
  `;

  messageInput.value = "";
  messageInput.style.height = "auto";
  updateSendButton();
  messageInput.focus();
};

// Event listeners
messageInput.addEventListener("input", () => {
  updateSendButton();
  autoResize();
});

messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

sendButton.addEventListener("click", sendMessage);
newChatButton.addEventListener("click", startNewChat);

// Focus input on load
messageInput.focus();
