import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function Chatbot() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: 'user', text: 'Reply to any queries reguarding doping, referncing NADA and WADA website, do not reply to any queries that are not about doping! ' },
    { sender: 'bot', text: 'Hi! I am here to assist you. Ask me anything or say hello!' },
  ]);
  const [loading, setLoading] = useState(false);
  const [isChatbotVisible, setChatbotVisible] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: message },
    ]);

    setMessage('');
    setLoading(true);

    try {
      const history = messages.map((msg) => ({
        role: msg.sender === 'user' ? 'human' : 'bot',
        text: msg.text,
      }));

      history.push({
        role: 'human',
        text: message,
      });

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

      const botReply = response.data.bot.text || "Sorry, I couldn't understand that.";

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
    setMessages([
      { sender: 'bot', text: 'Hi! I am here to assist you. Ask me anything or say hello!' }
    ]);
  };

  return (
    <div>
      <button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 transition-colors duration-300 z-50 flex items-center justify-center space-x-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span>Chat</span>
      </button>

      {isChatbotVisible && (
        <>
        {/* <div className="fixed bottom-4 right-4 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden">
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Chatbot</h1>
            <button 
              onClick={closeChatbot} 
              className="text-white hover:bg-blue-700 rounded-full p-1 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-gray-50 max-h-[400px]">
            {messages.slice(1).map((msg, index) => (
              <div
                key={index}
                className={flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}}
              >
                <div
                  className={`p-3 rounded-xl max-w-[75%] ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="p-3 rounded-xl bg-gray-200 text-gray-800 animate-pulse">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-gray-200 flex items-center space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div> */}
        </>
      )}
    </div>
  );
}

export default Chatbot;