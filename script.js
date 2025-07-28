let link = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2025.7.25/v1/currencies/";

const select = document.querySelectorAll("select");
const from = document.querySelector("#from");
const to = document.querySelector("#to");

const amount = document.querySelector("#amount");
const converted_amount = document.querySelector("#converted_amount");

let country_name = {};

// populating the options
async function option_addition(){
    country_name = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2025.7.25/v1/currencies.json");
    country_name = await country_name.json();

    for (const key in country_name) {
        if (Object.prototype.hasOwnProperty.call(country_name, key)) {
            const element = country_name[key];
            if(element != "" && key.length<4){
                let optionfrom = document.createElement("option");
                let optionto = document.createElement("option");
                optionfrom.textContent = key.toUpperCase();
                if(optionfrom.textContent == "USD"){// to make usd as default
                    optionfrom.selected = "selected";
                }
                optionto.textContent = key.toUpperCase();
                if(optionto.textContent == "INR"){// to make inr as default
                    optionto.selected = "selected";
                }
                from.appendChild(optionfrom);
                to.appendChild(optionto);
            }
        }
    }

    select.forEach(element => {
        element.addEventListener("change" , (event) => {
            changeflag(event.target);
        })
    });
}
option_addition();

//setting corresponding flag for each option
function changeflag(element){
    let img_code = countryList[element.value];
    element.previousElementSibling.src = `https://flagsapi.com/${img_code}/flat/64.png`
}

//dynamic amount conversion
async function dynamic_conversion(event){
    const value = amount.value;
    const from_country = from.value.toLowerCase();
    const to_country = to.value.toLowerCase();
    let exchange_rate = await fetch(`${link}${from_country}.json`);
    exchange_rate = await exchange_rate.json();
    exchange_rate = exchange_rate[from_country][to_country];
    converted_amount.value = (value * exchange_rate).toFixed(2);
}
amount.addEventListener("input" , (event) => {
    dynamic_conversion(event);
})
from.addEventListener("change" ,(event)=>{
    dynamic_conversion(event);
})
to.addEventListener("change" ,(event)=>{
    dynamic_conversion(event);
})
