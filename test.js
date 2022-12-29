const mediumToMarkdown = require('medium-to-markdown')

// Enter url here
mediumToMarkdown
  .convertFromUrl('https://medium.com/@nimit95/a-simple-http-https-proxy-in-node-js-4eb0444f38fc')
  .then(function (markdown) {
    console.log(markdown) //=> Markdown content of medium post
  })
