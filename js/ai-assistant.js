/**
 * AI Assistant for portfolio
 */

// Simple responses for the AI assistant
const responses = {
  'default': 'I\'m here to help you explore this portfolio. You can ask about projects, skills, or how to navigate the site.',
  'project': 'There are several projects showcased here. Would you like to know about the Conversational AI Agent, Computer Vision Solution, or Smart Recommendation System?',
  'contact': 'You can use the contact form at the bottom of the page to send a message. Alternatively, check out the social media links.',
  'skills': 'The portfolio owner has skills in Python, JavaScript, React, Machine Learning, AI Development, and Node.js.',
  'hello': 'Hello! How can I help you explore this portfolio today?',
  'hi': 'Hi there! I\'m the portfolio assistant. What would you like to know?',
  'about': 'This portfolio belongs to a technology professional specializing in AI development and modern web applications.',
  'experience': 'The portfolio owner has experience in AI development, web development, and building intelligent solutions.',
  'education': 'You can find education details in the About section of this portfolio.',
  'navigate': 'You can use the navigation menu at the top to visit different sections: Home, About, Projects, and Contact.',
  'download': 'You can download the resume from the About section of the portfolio.',
  'resume': 'The resume is available for download in the About section.',
  'thanks': 'You\'re welcome! Is there anything else you\'d like to know about this portfolio?',
  'thank you': 'You\'re welcome! Is there anything else you\'d like to know about this portfolio?',
  'bye': 'Goodbye! Feel free to explore the portfolio and come back if you have more questions.',
  'goodbye': 'Goodbye! Feel free to explore the portfolio and come back if you have more questions.'
};

// Project-specific responses
const projectResponses = {
  'conversational ai': 'The Conversational AI Agent uses natural language processing to understand and respond to user queries effectively. It was built with Python, TensorFlow, and NLP techniques.',
  'computer vision': 'The Computer Vision Solution detects and classifies objects in real-time with high accuracy. It was developed using Python, OpenCV, PyTorch, and React.',
  'recommendation': 'The Smart Recommendation System analyzes user preferences and provides personalized suggestions. It was built using Python, Scikit-learn, Node.js, and MongoDB.',
};

// Chat window elements
let chatWindow;
let chatMessages;
let chatInput;
let chatSend;
let aiIcon;
let closeBtn;
let isOpen = false;

/**
 * Initialize the AI assistant
 */
export const initAIAssistant = () => {
  // Get DOM elements
  chatWindow = document.getElementById('ai-chat-window');
  chatMessages = document.getElementById('ai-chat-messages');
  chatInput = document.getElementById('ai-input');
  chatSend = document.getElementById('ai-send');
  aiIcon = document.querySelector('.ai-icon');
  closeBtn = document.getElementById('close-ai');
  
  // Set initial state
  chatWindow.style.display = 'none';
  
  // Add event listeners
  aiIcon.addEventListener('click', toggleChatWindow);
  closeBtn.addEventListener('click', toggleChatWindow);
  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  // Simulate a delayed appearance of the AI assistant
  setTimeout(() => {
    aiIcon.classList.add('active');
  }, 3000);
};

/**
 * Toggle the chat window
 */
function toggleChatWindow() {
  isOpen = !isOpen;
  chatWindow.style.display = isOpen ? 'block' : 'none';
  if (isOpen) {
    chatInput.focus();
  }
}

/**
 * Send a message to the AI assistant
 */
function sendMessage() {
  const message = chatInput.value.trim();
  if (message === '') return;
  
  // Add user message to chat
  addMessage(message, 'user');
  chatInput.value = '';
  
  // Process user message and get response
  setTimeout(() => {
    const response = getAIResponse(message);
    addMessage(response, 'ai');
  }, 500);
}

/**
 * Add a message to the chat window
 * @param {string} text - Message text
 * @param {string} sender - 'user' or 'ai'
 */
function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
  
  const messageP = document.createElement('p');
  messageP.textContent = text;
  
  messageDiv.appendChild(messageP);
  chatMessages.appendChild(messageDiv);
  
  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Get a response from the AI assistant
 * @param {string} message - User message
 * @returns {string} - AI response
 */
function getAIResponse(message) {
  const lowercaseMessage = message.toLowerCase();
  
  // Check for project-specific responses
  for (const [key, value] of Object.entries(projectResponses)) {
    if (lowercaseMessage.includes(key)) {
      return value;
    }
  }
  
  // Check for general responses
  for (const [key, value] of Object.entries(responses)) {
    if (lowercaseMessage.includes(key)) {
      return value;
    }
  }
  
  // If no match, return default response
  return responses.default;
} 