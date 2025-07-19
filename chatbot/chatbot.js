// DynamicChatbot.js - A chatbot that responds to user input

class DynamicChatbot {
    constructor(options = {}) {
        this.botName = options.botName || 'ChatBot';
        this.greetingMessage = options.greeting || `Hello! I'm ${this.botName}. How can I help you today?`;
        this.conversation = [];
        this.processingDelay = options.processingDelay || 500;
        
        // Optional API endpoint for more advanced responses
        this.apiEndpoint = options.apiEndpoint || '';
        this.apiKey = options.apiKey || '';
        
        // Basic intent classification system
        this.intents = this.setupIntents();
    }
    
    setupIntents() {
        return {
            greeting: {
                patterns: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon'],
                responses: ['Hello! How can I help you today?', 'Hi there! What can I do for you?', 'Hey! How may I assist you?']
            },
            farewell: {
                patterns: ['bye', 'goodbye', 'see you', 'later', 'have a nice day'],
                responses: ['Goodbye! Have a great day!', 'See you later!', 'Take care!', 'Bye! Come back anytime.']
            },
            thanks: {
                patterns: ['thank', 'thanks', 'appreciate', 'grateful'],
                responses: ['You\'re welcome!', 'Happy to help!', 'Anytime!', 'My pleasure!']
            },
            about: {
                patterns: ['who are you', 'what are you', 'tell me about yourself', 'what can you do'],
                responses: [`I'm ${this.botName}, a chatbot designed to help answer questions and have conversations.`]
            },
            help: {
                patterns: ['help', 'assist', 'support', 'what can you do', 'features'],
                responses: ['I can help with a variety of topics. Just ask me a question or tell me what you need!']
            }
        };
    }
    
    // Process user message and generate a response
    async processMessage(message) {
        // Add to conversation history
        this.addToConversation('user', message);
        
        // Simulate thinking delay
        await this.delay(this.processingDelay);
        
        let response;
        
        // Try to use external API if configured
        if (this.apiEndpoint && this.apiKey) {
            try {
                response = await this.getApiResponse(message);
            } catch (error) {
                console.error('API error:', error);
                // Fall back to local processing if API fails
                response = this.generateLocalResponse(message);
            }
        } else {
            // Use local processing
            response = this.generateLocalResponse(message);
        }
        
        // Add bot response to conversation
        this.addToConversation('bot', response);
        
        return response;
    }
    
    // Generate response using local logic
    generateLocalResponse(message) {
        const input = message.toLowerCase().trim();
        
        // Check for matches in our intents
        for (const [intentName, intent] of Object.entries(this.intents)) {
            for (const pattern of intent.patterns) {
                if (input.includes(pattern)) {
                    return this.getRandomItem(intent.responses);
                }
            }
        }
        
        // Simple question answering
        if (input.includes('weather')) {
            return "I don't have access to real-time weather data, but I can help you find a weather service!";
        }
        
        if (input.includes('time')) {
            return `The current time is ${new Date().toLocaleTimeString()}.`;
        }
        
        if (input.includes('date')) {
            return `Today is ${new Date().toLocaleDateString()}.`;
        }
        
        if (input.includes('name')) {
            return `My name is ${this.botName}. What's yours?`;
        }
        
        if (input.includes('how are you')) {
            return "I'm doing well, thank you for asking! How are you?";
        }
        
        // Simple knowledge base
        if (input.includes('capital of france')) {
            return "The capital of France is Paris.";
        }
        
        if (input.includes('president') && input.includes('united states')) {
            return "The current president of the United States is Donald Trump (as of March 2025).";
        }
        
        // Echo questions back as responses
        if (input.includes('?')) {
            if (input.startsWith('what is') || input.startsWith('what\'s')) {
                const topic = input.replace(/what is|what's/, '').trim();
                return `${topic.charAt(0).toUpperCase() + topic.slice(1)} is an interesting topic. I'd like to learn more about that myself.`;
            }
            
            if (input.startsWith('how do')) {
                const topic = input.replace(/how do/, '').trim();
                return `That's a good question about how to${topic}. What have you tried so far?`;
            }
            
            if (input.startsWith('can you')) {
                const ability = input.replace(/can you/, '').trim().replace(/\?/, '');
                return `I'll try my best to${ability}. What specifically would you like to know?`;
            }
            
            return "That's an interesting question. Can you tell me more about what you're looking for?";
        }
        
        // For statements, acknowledge and ask follow-up
        if (input.length > 15) {
            const followUps = [
                "Tell me more about that.",
                "That's interesting. What else can you share?",
                "I'd like to learn more. Could you elaborate?",
                "Thanks for sharing. What are your thoughts on this?",
                "I see. And how do you feel about that?"
            ];
            return this.getRandomItem(followUps);
        }
        
        // Default responses for anything else
        const defaultResponses = [
            "I'm not sure I understand. Could you rephrase that?",
            "Tell me more about what you're looking for.",
            "Interesting. Can you elaborate on that?",
            "I'd like to help. Could you provide more details?",
            "Let's explore that topic further. What specifically interests you about it?"
        ];
        
        return this.getRandomItem(defaultResponses);
    }
    
    // Get response from external API (if configured)
    async getApiResponse(message) {
        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    message: message,
                    conversation: this.conversation
                })
            });
            
            if (!response.ok) {
                throw new Error(`API response error: ${response.status}`);
            }
            
            const data = await response.json();
            return data.response || "Sorry, I couldn't generate a response.";
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }
    
    // Add message to conversation history
    addToConversation(sender, message) {
        this.conversation.push({
            sender,
            message,
            timestamp: new Date()
        });
        
        // Limit conversation history to prevent memory issues
        if (this.conversation.length > 100) {
            this.conversation.shift();
        }
    }
    
    // Get conversation history
    getConversation() {
        return this.conversation;
    }
    
    // Helper for random selection
    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    // Helper for delays
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Initial greeting
    greet() {
        return this.greetingMessage;
    }
    
    // Add custom responses for specific inputs
    addCustomResponse(input, response) {
        const intentName = `custom_${Date.now()}`;
        this.intents[intentName] = {
            patterns: [input.toLowerCase()],
            responses: [response]
        };
    }
    
    // Train the chatbot with a new intent
    addIntent(intentName, patterns, responses) {
        this.intents[intentName] = {
            patterns: patterns.map(p => p.toLowerCase()),
            responses: responses
        };
    }
}

// UI Implementation
class ChatbotUI {
    constructor(chatbot, elementId) {
        this.chatbot = chatbot;
        this.container = document.getElementById(elementId);
        if (!this.container) {
            console.error(`Element with ID "${elementId}" not found`);
            return;
        }
        this.setupUI();
    }

    setupUI() {
        // Create chat container
        this.container.innerHTML = `
            <div class="chatbot-container">
                <div class="chatbot-header">
                    <h3>${this.chatbot.botName}</h3>
                </div>
                <div class="chatbot-messages" id="chatbot-messages"></div>
                <div class="chatbot-input">
                    <input type="text" id="chatbot-input-field" placeholder="Type your message...">
                    <button id="chatbot-send-btn">Send</button>
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .chatbot-container {
                width: 100%;
                max-width: 400px;
                border: 1px solid #ccc;
                border-radius: 12px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                height: 500px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                margin: 0 auto;
                background-color: #f5f5f5;
            }
            .chatbot-header {
                background-color: #4a90e2;
                color: white;
                padding: 12px;
                text-align: center;
                font-family: Arial, sans-serif;
            }
            .chatbot-header h3 {
                margin: 0;
                font-size: 18px;
            }
            .chatbot-messages {
                flex: 1;
                overflow-y: auto;
                padding: 16px;
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .message {
                padding: 10px 14px;
                border-radius: 18px;
                max-width: 75%;
                word-wrap: break-word;
                font-family: Arial, sans-serif;
                font-size: 14px;
                line-height: 1.4;
                position: relative;
                animation: fadeIn 0.3s ease-in;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(5px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .user-message {
                background-color: #e3effd;
                color: #333;
                border-bottom-right-radius: 4px;
                align-self: flex-end;
                border: 1px solid #d1e3fa;
            }
            .bot-message {
                background-color: white;
                color: #333;
                border-bottom-left-radius: 4px;
                align-self: flex-start;
                border: 1px solid #e0e0e0;
            }
            .chatbot-input {
                display: flex;
                padding: 12px;
                border-top: 1px solid #ddd;
                background-color: white;
            }
            .chatbot-input input {
                flex: 1;
                padding: 10px 14px;
                border: 1px solid #ccc;
                border-radius: 20px;
                font-size: 14px;
                outline: none;
                transition: border-color 0.2s;
            }
            .chatbot-input input:focus {
                border-color: #4a90e2;
            }
            .chatbot-input button {
                background-color: #4a90e2;
                color: white;
                border: none;
                border-radius: 20px;
                padding: 8px 16px;
                margin-left: 8px;
                cursor: pointer;
                font-size: 14px;
                transition: background-color 0.2s;
            }
            .chatbot-input button:hover {
                background-color: #3a7bc8;
            }
            .chatbot-input button:active {
                background-color: #2c6cb7;
            }
            .typing-indicator {
                display: flex;
                padding: 10px 14px;
                border-radius: 18px;
                max-width: 75%;
                align-self: flex-start;
                background-color: #f0f0f0;
                margin-bottom: 10px;
            }
            .typing-indicator span {
                height: 8px;
                width: 8px;
                border-radius: 50%;
                background-color: #888;
                display: inline-block;
                margin-right: 5px;
                animation: typing 1s infinite ease-in-out;
            }
            .typing-indicator span:nth-child(2) {
                animation-delay: 0.2s;
            }
            .typing-indicator span:nth-child(3) {
                animation-delay: 0.4s;
                margin-right: 0;
            }
            @keyframes typing {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-5px); }
                100% { transform: translateY(0px); }
            }
        `;
        document.head.appendChild(style);

        // Get references to elements
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.inputField = document.getElementById('chatbot-input-field');
        this.sendButton = document.getElementById('chatbot-send-btn');

        // Set up event listeners
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Display greeting message
        this.displayBotMessage(this.chatbot.greet());
    }

    async sendMessage() {
        const message = this.inputField.value.trim();
        if (message.length === 0) return;

        // Display user message
        this.displayUserMessage(message);
        this.inputField.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();

        // Process message and get response
        const response = await this.chatbot.processMessage(message);
        
        // Hide typing indicator and display bot response
        this.hideTypingIndicator();
        this.displayBotMessage(response);
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.id = 'typing-indicator';
        indicator.innerHTML = '<span></span><span></span><span></span>';
        this.messagesContainer.appendChild(indicator);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
}