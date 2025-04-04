import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./styles.css";
import { FaRegComments } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
import { IoSend } from "react-icons/io5";

const defaultResponses = {
  greeting: "Hello! How can I assist you today?",
  responses: {
    hello: "Hello there!",
    hi: "Hi! How can I help?",
    "👍": "👍",
    goodbye: "Goodbye! Have a great day!",
    "thank you": "You're welcome!",
  },
  defaultResponse:
    "I'm not sure how to answer that. Can you ask something else?",
};

const Chatbot = ({ customResponses = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const chatboxRef = useRef(null);

  // Merge default with custom responses
  const responses = {
    greeting: customResponses.greeting || defaultResponses.greeting,
    responses: {
      ...defaultResponses.responses,
      ...(customResponses.responses || {}),
    },
    defaultResponse:
      customResponses.defaultResponse || defaultResponses.defaultResponse,
  };

  // Initialize with first bot message
  useEffect(() => {
    firstBotMessage();
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const getTime = () => {
    const today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;

    return hours + ":" + minutes;
  };

  const firstBotMessage = () => {
    const time = getTime();
    setMessages([
      { text: time, isBot: false, isTimestamp: true },
      { text: responses.greeting, isBot: true },
    ]);
  };

  const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase();

    // Check for matching keywords
    for (const [keyword, response] of Object.entries(responses.responses)) {
      if (lowerInput.includes(keyword.toLowerCase())) {
        return typeof response === "function" ? response(input) : response;
      }
    }

    return responses.defaultResponse;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { text: inputValue, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response after delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      setMessages((prev) => [...prev, { text: botResponse, isBot: true }]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-bar-collapsible">
      <button
        id="chat-button"
        className={`collapsible ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        Chat with us!
        <FaRegComments style={{ fontSize: "24px" }} />
      </button>

      {isOpen && (
        <div className="content" style={{ maxHeight: "500px" }}>
          <div className="full-chat-block">
            <div className="outer-container">
              <div className="chat-container" ref={chatboxRef}>
                <div id="chatbox">
                  {messages.map((msg, index) => (
                    <React.Fragment key={index}>
                      {msg.isTimestamp ? (
                        <h5 id="chat-timestamp">{msg.text}</h5>
                      ) : msg.isBot ? (
                        <p className="botText">
                          <span>{msg.text}</span>
                        </p>
                      ) : (
                        <p className="userText">
                          <span>{msg.text}</span>
                        </p>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div className="chat-bar-input-block">
                  <div id="userInput">
                    <input
                      id="textInput"
                      className="input-box"
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Tap 'Enter' to send a message"
                    />
                  </div>

                  <div className="chat-bar-icons">
                    <i
                      id="chat-icon"
                      className="fa fa-fw fa-heart"
                      onClick={() => {
                        const heartMessage = {
                          text: "👍",
                          isBot: false,
                        };
                        setMessages((prev) => [...prev, heartMessage]);
                      }}
                    >
                      <AiOutlineLike style={{ cursor: "pointer" }} />
                    </i>
                    <i
                      id="chat-icon"
                      className="fa fa-fw fa-send"
                      onClick={handleSendMessage}
                    >
                      <IoSend style={{ color: "black", cursor: "pointer" }} />
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Chatbot.propTypes = {
  customResponses: PropTypes.shape({
    greeting: PropTypes.string,
    responses: PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    ),
    defaultResponse: PropTypes.string,
  }),
};

export default Chatbot;
