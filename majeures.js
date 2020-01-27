const request = require('request');
const cheerio = require('cheerio');
const url = 'https://www.efrei.fr/programme-grande-ecole/le-cycle-ingenieur/majeures-specialisation/';
tab = []

request(url, (error, response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        test = $('.element-anime').each(function(i, elem) {
            tab[i] = {
                img: '',
                descript: '',
                title:'',
                link:''   
            };
            tab[i].title = $(this).find('h3').text();
            tab[i].descript = $(this).find('p').text();
            text = $(this).find('.imgbg').attr('style');
            tab[i].img = text.substring(16, text.length-3);
            tab[i].link = $(this).find('a').attr('href');
        })

        return tab;  
    }
});