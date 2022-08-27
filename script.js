//getting DOM elements

const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

//fetch exchange rates and update te dom

function Calculate() {
    // fetch('items.json')
    //     .then(res => res.json())
    //     .then(data => document.body.innerText = data[0].text)


    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    // console.log(currency_one, currency_two);

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            const rate = data.rates[currency_two];
            console.log(rate);

            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
        })
}

// event listener

currencyEl_one.addEventListener('change', Calculate);
amountEl_one.addEventListener('input', Calculate);
currencyEl_two.addEventListener('change', Calculate);
amountEl_two.addEventListener('input', Calculate);
swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    Calculate();
})
Calculate();