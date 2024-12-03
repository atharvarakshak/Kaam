import React, { useState } from 'react';
import axios from 'axios';

function Chatbot() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [isChatbotVisible, setChatbotVisible] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add the user's message to the chat
   
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: message },
    ]);

    // Clear the input field
    setMessage('');

    setLoading(true);

    try {
      // Prepare the history for the API call
      const history = messages.map((msg) => ({
        role: msg.sender === 'user' ? 'human' : 'bot',
        text: msg.text,
      }));

      // Add the new user message to the history
      history.push({
        role: 'human',
        text: message,
      });

      // Make the API call
      const response = await axios.post(
        "https://app.echelonify.com/bot/3a8d633f-66d1-4587-aad3-d9503183b28a/api",
        {
          message: message,
          history: history,
          stream: false,
        },
        {
          headers: {
            "content-type": "application/json",
            "x-api-key": "sk_db_UPka3gs3iQXtEg4peZiCwErkBxsb1dMF",
          },
        }
      );

      console.log(response.data.bot.text);

      // Assuming the response has the reply in response.data.reply
      const botReply = response.data.bot.text || "Sorry, I couldn't understand that.";

      // Add the bot's response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: botReply },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'Sorry, something went wrong. Please try again later.' },
      ]);
    } finally {
      setLoading(false);
    }
  };


  const toggleChatbot = () => {
    setChatbotVisible(!isChatbotVisible);
  };

  const closeChatbot = () => {
    setChatbotVisible(false);
    setMessages([]); // Clear all messages when closing the chatbot
  };
  

  return (
    <div>
      {/* Floating Button */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-10 right-10 p-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-lg"
      >
        Chat
      </button>

      {/* Chatbot */}
      {isChatbotVisible && (
        <div
          className="w-full max-w-md mx-auto mt-10 p-6 bg-slate-400 rounded-lg shadow-md fixed bottom-0 right-0 m-4"
          style={{ pointerEvents: 'auto' }} // Enable pointer events when visible
        >
          {/* Close Button */}
          <button
            onClick={closeChatbot}
            className="absolute top-2 right-2 text-xl text-gray-700 hover:text-gray-500"
          >
            &times;
          </button>

          <h1 className="text-2xl font-semibold text-center mb-6">Chatbot</h1>

          <div className="space-y-4 mb-4 max-h-96 overflow-y-auto p-4 border border-gray-300 rounded-lg">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-2 rounded-lg max-w-xs ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-black'
                      : 'bg-gray-200 text-black'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="p-2 rounded-lg max-w-xs bg-gray-200 text-black">
                  Typing...
                </div>
              </div>
            )}
          </div>

          <div className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Invisible Chatbot Overlay when hidden */}
      {!isChatbotVisible && (
        <div
          className="fixed top-0 left-0 w-full h-full z-10"
          style={{ pointerEvents: 'none' }}
        ></div>
      )}
    </div>
  );
}

export default Chatbot;
