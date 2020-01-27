const request = require('request');
const cheerio = require('cheerio');


function getMajeures(){
    const url ="https://www.efrei.fr/programme-grande-ecole/le-cycle-ingenieur/majeures-specialisation/";
    tab = [];
    request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        
        test = $(".element-anime").each( (i, elem) => {
          tab[i] = {
            img: "",
            descript: "",
            title: "",
            link: ""
          };

          tab[i].title = $(elem).find("h3").text();
          tab[i].descript = $(elem).find("p").text();
          text = $(elem).find(".imgbg").attr("style");
          tab[i].img = text.substring(16, text.length - 3);
          tab[i].link = $(elem).find("a").attr("href");
        });
      }
    });
    return tab;
}

test = getMajeures();
console.log(test);