## **Demo app for letting people know what one need for Christmas so they do not buy useless bull\*hit**

### **Run app:**

`npm i`  
`npm run dev`  
`open https://localhost:5173/`

### **run tests**

`npx playwright test tests/playwright`
`npm run test-jest`

### **todo**

**others:**

- delete all - prompt
- folders
- text input - same component + checks
- confirm by enter
- creation date
- open auth services / firebase auth
- dashboard - # of items in each category, price

- send message to AI (free) and get answer

const axios = require('axios');

const apikey = 'YOUR_GEMINI_API_KEY'; // Replace with your actual key
const endpoint = 'https://generativeai.googleapis.com/v1beta/models/gemini:generateText';

async function generateText(prompt) {
try {
const response = await axios.post(endpoint, {
prompt: prompt,
model: 'gemini',
temperature: 0.7, // Adjust as needed
maxTokens: 100, // Adjust as needed
}, {
headers: {
'Authorization': `Bearer ${apikey}`,
'Content-Type': 'application/json'
}
});

    console.log(response.data.generatedText);

} catch (error) {
console.error('Error:', error);
}
}

generateText('Write a short poem about the ocean.');

-
-
-
-
-
- build prompt with my data
- firebase limit max na 10kc
- ddos ochrana?
- testing domain check
- addItem / assign modal - use enter to confirm, esc to cancel
- edit item - all value checks
- ColorTheme
- update unit tests
- implement minimum code coverage
- move unit tests to same folder like prod code
- bundle analyzer - app takes too much space

**done:**

- firebase / firestore - local storage / emulator
- automatic deploy in pipeline
- release to public domain
- switch localStorage to database
- implement jest tests
- add lint test
- ~~disable merging when unit tests are failing~~ - not possible for free github account
- github actions - move everything to one file
- implement build https://firebase.google.com/
