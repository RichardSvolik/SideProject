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

- github actions - move everything to one file
- implement build https://github.com/sitek94/vite-deploy-demo
- https://firebase.google.com/
- https://supabase.com/pricing

**others:**

- localStorage in separate file
- addItem / assign modal - use enter to confirm, esc to cancel
- edit item - all value checks
- ColorTheme
- switch localStorage to database
- update unit tests
- release to public domain
- automatic deploy in pipeline
- implement minimum code coverage
- move unit tests to same folder like prod code
- bundle analyzer - too much space

**done:**

- implement jest tests
- add lint test
- ~~disable merging when unit tests are failing~~ - not possible for free github account
