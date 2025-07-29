let link = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2025.7.25/v1/currencies/";

const select = document.querySelectorAll("select");
const from = document.querySelector("#from");
const to = document.querySelector("#to");

const amount = document.querySelector("#amount");
const converted_amount = document.querySelector("#converted_amount");

const rate = document.querySelector("#rate");
const exchange = document.querySelector("#exchange");

const from_img = document.querySelector("#from_img");
const to_img = document.querySelector("#to_img");

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
async function dynamic_conversion(){
    if(amount.value == ""){
        amount.value = 1;
    }
    const value = amount.value;
    const from_country = from.value.toLowerCase();
    const to_country = to.value.toLowerCase();
    let exchange_rate = await fetch(`${link}${from_country}.json`);
    exchange_rate = await exchange_rate.json();
    exchange_rate = exchange_rate[from_country][to_country];
    converted_amount.value = (value * exchange_rate).toFixed(4);

    rate.textContent = `1 ${from.value} = ${exchange_rate.toFixed(4)} ${to.value}`
}
amount.addEventListener("input" , () => {
    dynamic_conversion();
})
from.addEventListener("change" ,()=>{
    dynamic_conversion();
})
to.addEventListener("change" ,()=>{
    dynamic_conversion();
})

//switch functionality
exchange.addEventListener("click",(event) => {
    //changing option value
    let temp = to.value;
    to.value = from.value;
    from.value = temp;

    //changing flag
    let img_code = countryList[from.value];
    from_img.src = `https://flagsapi.com/${img_code}/flat/64.png`
    img_code = countryList[to.value];
    to_img.src = `https://flagsapi.com/${img_code}/flat/64.png`
    
    //changing rate value
    dynamic_conversion();
})