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

- implement jest tests
- implement minimum code coverage
- add lint test
- implement build https://github.com/sitek94/vite-deploy-demo
- ~~disable merging when unit tests are failing~~ - not possible for free github account

**others:**

- addItem / assign modal - use enter to confirm, esc to cancel
- edit item - all value checks
- ColorTheme
- localStorage in separate file
- switch localStorage to database
- update unit tests
- release to public domain
- automatic deploy in pipeline
- move unit tests to same folder like prod code
