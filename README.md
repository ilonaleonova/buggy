# What is the test approach?

Read it here: https://github.com/ilonaleonova/buggy/wiki/Testing-Approach
  
# Where are discovered bugs?

https://github.com/ilonaleonova/buggy/issues?q=is%3Aissue+label%3Abug

# How to run automated tests?

**TL;DR** go to https://github.com/ilonaleonova/buggy/actions and view the last executed workflow; alternatively:

- Make sure you have Node.JS https://nodejs.org/en/download/
- Navigate to the repository in your favourite shell, e.g. `cd ~/src/buggy`
- Run `npm install`
- Run `./node_modules/cypress/bin/cypress open`
- Click on the `top5.spec.js` to execute the tests
- Expect 3 passing and 2 failed tests
