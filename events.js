const axios = require("axios");

async function getEvent(type = "") {
	return new Promise(async (resolve, reject) => {
		if (type == "JPO") {
      url =
        "https://www.myefrei.fr/api/public/wp/queries/events?eventType=Portes%20ouvertes&sort=ASC&limit=3";
    } else if (type == "prepa bac") {
      url =
        "https://www.myefrei.fr/api/public/wp/queries/events?eventType=Préparation%20Bac&sort=ASC&limit=3";
    } else if (type == "Projette toi") {
      url =
        "https://www.myefrei.fr/api/public/wp/queries/events?eventType=Journ%C3%A9e%20d%C3%A9couverte%20Projette-toi%20@%20Efrei%20Paris&sort=ASC&limit=3";
    } else {
      url =
        "https://www.myefrei.fr/api/public/wp/queries/events?sort=ASC&limit=3";
		}
		
		try {
			let response = await axios.get(url);

			let repTab = [];
      cardInfo = {
        title: "",
        date: "",
        beginTime: "",
        endTime: ""
      };
      response.data.rows.forEach((elem, i) => {
        repTab[i] = cardInfo;
        repTab[i].title = elem.eventName;
        repTab[i].date = elem.eventbeginDate;
        repTab[i].beginTime = elem.eventBeginTime;
        repTab[i].endTime = elem.eventEndTime;
      });

			resolve(repTab);
		} catch (error) {
			reject(error);
		}
	});
}

(async function() {
	console.log("Requesting data");
	let data = await getEvent();
	console.log(data);
}());

getEvent().then(data => {
	console.log("Received data:", data);
}).catch(console.error);

// let data;
// getEvent().then((mydata) => data = mydata);
// console.log(data);