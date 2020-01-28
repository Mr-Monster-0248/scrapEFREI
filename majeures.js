const request = require('request');
const cheerio = require('cheerio');


async function getMajeures(){
	return new Promise( (resolve, reject) => {
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

          tab[i].title = $(elem).find("h3").text().replace("Ggrids", "Grids");
          tab[i].descript = $(elem).find("p").text();
          text = $(elem).find(".imgbg").attr("style");
          tab[i].img = text.substring(16, text.length - 3);
          tab[i].link = $(elem).find("a").attr("href");
        });
			} else {
				reject("Could not resolve url");
			}

      resolve(tab);
		});
	})
}


(async function() {
	try { 
		let data = await getMajeures();
  	console.log("Success:", data);
	} catch (error) {
		console.log("Error:", error);
	}  
})();