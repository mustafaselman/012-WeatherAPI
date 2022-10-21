const citynameinput = document.querySelector("#citynameinput");
const button = document.querySelector("#button");
const newCards = document.querySelector("#newcards");

eventListeners();
function eventListeners(e)
{
    button.addEventListener("click", () =>
    {
        getCities(citynameinput.value);
        citynameinput.value = "";
    });

    document.addEventListener('keydown', (event) =>
    {
        if (event.key == "Enter")
        {
            event.preventDefault();
            getCities(event.target.value);
            citynameinput.value = "";
        }
    });
}

class Request
{
    get(url)
    {
        return new Promise((resolve, reject) =>
        {
            fetch(url)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(err => reject(err))
        })
    }
}
const request = new Request();

function getCities(city)
{

    request.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1338cc0c50b65f2134cbc985e2448705`)
        .then((getcity) =>
        {
            let cityname = getcity.name;
            let result = getcity.name.substring(getcity.name.length - 9);
            console.log("result " + result)
            if (result == " Province")
            {
                cityname = getcity.name.substring(0, getcity.name.length - 9);
            }

            let citytemp = Math.round(getcity.main.temp - 273.15);
            let cityicon = `http://openweathermap.org/img/wn/${getcity.weather[ 0 ].icon}@2x.png`;
            addCard(cityname, citytemp, cityicon);
        });

}

function addCard(cityname, citytemp, cityicon)
{
    const newCard = document.createElement('div');
    newCard.className = 'card-body';
    const newCardTitle = document.createElement('h5');
    newCardTitle.className = 'card-title';
    newCardTitle.innerHTML = cityname;
    const newCardImage = document.createElement('img');
    newCardImage.src = cityicon;
    newCardImage.alt = cityname;
    const newCardPopulation = document.createElement('p');
    newCardPopulation.className = 'card-text';
    newCardPopulation.innerHTML = citytemp + "°C";

    newCard.appendChild(newCardTitle);
    newCard.appendChild(newCardImage);
    newCard.appendChild(newCardPopulation);
    nodeControl(newCard);
}
function nodeControl(newCard)
{
    if (!newCards.hasChildNodes())
    {
        newCards.appendChild(newCard);
    } else
    {
        let control = true;
        for (let child = 0; child < newCards.childNodes.length; child++)
        {
            let innertext = newCards.getElementsByTagName("h5")[ child ].innerText;

            if (newCard.getElementsByTagName("h5")[ 0 ].innerText == innertext)
            {
                control = false;
                alert("This city is already in the list of cities");
            }
        }
        if (control)
        {
            newCards.appendChild(newCard);
        }
    }
}