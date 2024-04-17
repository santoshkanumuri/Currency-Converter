let globalData;
async function fetcher() {
    try {
        const response = await fetch('https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_LfPuIX8y9TCwWJXRO4m136Tj8Jx3ixulsS78QBwZ');
        if (!response.ok) {
            throw new Error("Data Fetch Error");
        }
        const data = await response.json();
        console.log('Data received:', data);
        globalData=data;
        done=document.querySelector('.container');
        done.id="visible";
        const values = Object.values(data['data']);
        return values; // Return the values array
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return []; // Return an empty array in case of error
    }
}

async function fill() {
    const currencyFullForms = [
        'Australian Dollar (AUD)',
        'Bulgarian Lev (BGN)',
        'Brazilian Real (BRL)',
        'Canadian Dollar (CAD)',
        'Swiss Franc (CHF)',
        'Chinese Yuan (CNY)',
        'Czech Koruna (CZK)',
        'Danish Krone (DKK)',
        'Euro (EUR)',
        'British Pound Sterling (GBP)',
        'Hong Kong Dollar (HKD)',
        'Croatian Kuna (HRK)',
        'Hungarian Forint (HUF)',
        'Indonesian Rupiah (IDR)',
        'Israeli New Shekel (ILS)',
        'Indian Rupee (INR)',
        'Icelandic Króna (ISK)',
        'Japanese Yen (JPY)',
        'South Korean Won (KRW)',
        'Mexican Peso (MXN)',
        'Malaysian Ringgit (MYR)',
        'Norwegian Krone (NOK)',
        'New Zealand Dollar (NZD)',
        'Philippine Peso (PHP)',
        'Polish Złoty (PLN)',
        'Romanian Leu (RON)',
        'Russian Ruble (RUB)',
        'Swedish Krona (SEK)',
        'Singapore Dollar (SGD)',
        'Thai Baht (THB)',
        'Turkish Lira (TRY)',
        'United States Dollar (USD)',
        'South African Rand (ZAR)'
    ];
    const currencyShortForms = [
        'AUD',
        'BGN',
        'BRL',
        'CAD',
        'CHF',
        'CNY',
        'CZK',
        'DKK',
        'EUR',
        'GBP',
        'HKD',
        'HRK',
        'HUF',
        'IDR',
        'ILS',
        'INR',
        'ISK',
        'JPY',
        'KRW',
        'MXN',
        'MYR',
        'NOK',
        'NZD',
        'PHP',
        'PLN',
        'RON',
        'RUB',
        'SEK',
        'SGD',
        'THB',
        'TRY',
        'USD',
        'ZAR'
    ];

    try {
        const values = await fetcher();
        let fromselect = document.getElementById("fromCurrency");
        for (let i = 0; i < currencyFullForms.length; i++) {
            let option = document.createElement("option");
            option.text = currencyFullForms[i];
            option.value = currencyShortForms[i];
            if(option.value=='INR'){
                option.selected = true;
            }
            fromselect.appendChild(option);
        }
        
        let toselect = document.getElementById("toCurrency");
        for (let i = 0; i < currencyFullForms.length; i++) {
            let option = document.createElement("option");
            option.text = currencyFullForms[i];
            option.value = currencyShortForms[i];
            if(option.value=='USD'){
                option.selected = true;
            }
            toselect.appendChild(option);
        }
    } catch (error) {
        console.error('Error while filling:', error);
    }
}
fill();
async function calculate(){
    try{
        const data= await globalData;
        let fromCurr = document.getElementById("fromCurrency").value;
        let toCurr = document.getElementById("toCurrency").value;
        let fromAmount= document.getElementById("fromAmount").value;
        f= globalData['data'][fromCurr];
        conv=fromAmount/f;
        document.getElementById("toAmount").value=(conv*globalData['data'][toCurr]).toFixed(2);
        }
    catch{

    }
}
async function calculate1(){
    try{
        const data= await globalData;
        let fromCurr = document.getElementById("fromCurrency").value;
        let toCurr = document.getElementById("toCurrency").value;
        let toAmount= document.getElementById("toAmount").value;
        f= globalData['data'][toCurr];
        conv=toAmount/f;
        document.getElementById("fromAmount").value=(conv*globalData['data'][fromCurr]).toFixed(2);
        }
    catch{

    }
}
