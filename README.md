## **Demo app for letting people know what one need for Christmas so they do not buy useless bull\*hit**

### **Run app:**

`npm i`  
`npm run dev`  
`open https://localhost:5173/`

### **run tests**

`npx playwright test tests/playwright`
`npm run test-jest`

### **todo**

**Pipeline**
**others:**

- localStorage in separate file
- firebase limit max na 10kc
- ddos ochrana?
- testing domain check
- firebase / firestore - local storage / emulator
- RXdb https://github.com/pubkey/rxdb
- addItem / assign modal - use enter to confirm, esc to cancel
- edit item - all value checks
- ColorTheme
- switch localStorage to database
- update unit tests
- release to public domain
- automatic deploy in pipeline
- implement minimum code coverage
- move unit tests to same folder like prod code
- bundle analyzer - app takes too much space

**done:**

- implement jest tests
- add lint test
- ~~disable merging when unit tests are failing~~ - not possible for free github account
- github actions - move everything to one file
- implement build https://firebase.google.com/
