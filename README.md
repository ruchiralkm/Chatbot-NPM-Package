
# React Custom Chatbot

A fully customizable, lightweight and interactive chatbot UI component for React applications. Easily integrate a chatbot into your website with dynamic responses, custom styling and mobile responsiveness.


## Installation and Usage

1.Installing

```bash
npm i @ruchiralk/chat-bot-com

```

2.Import library in your React project (📂src/App.jsx)

```bash
import React from 'react';
import Chatbot from '@ruchiralk/chat-bot-com';
import customResponses from './responses';

function App() {
  return (
    <div className="App">
      <Chatbot customResponses={customResponses} />
    </div>
  );
}

export default App;

```

3.Customize your own chatbot responses,
Create a responses.js file in your project (📂src/responses.js)

```bash
const customResponses = {
  greeting: "How can I help you today!",
  responses: {
    "products": "We offer electronics and cloths.",

    "sale": "Check our homepage for current sales!",

    "price": (input) => {
      if (input.includes("expensive")) {
        return "We offer competitive pricing!";
      }
      return "Prices vary by product.";
    }
  },
  defaultResponse: "I can't respond that."
};

export default customResponses;

```

### ⚙️Customize CSS styles
The chatbot comes with default CSS, but you can override styles

```bash
/* In your global CSS file */

/*  Bot bubbles */
.botText span {
  background: #4CAF50 !important; 
}


/*  User bubbles */
.userText span {
  background: #2196F3 !important; 
}


/*  Chatbot header */
.collapsible {
  background: #FF5722 !important; 
}

```

### Happy coding...!
## Demo

https://chatbot-demo-live.vercel.app/


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://www.ruchiralk.me/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ruchira-kaluarachchi/)


