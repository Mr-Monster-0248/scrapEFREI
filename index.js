const request = require('request');
const cheerio = require('cheerio');

request('http://whatthecommit.com/', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const text = $('#content p');
        console.log(text.text());
    }
});