let total = 0

// document.cookie = "name=value; expires=date; path=path; domain=domain; SameSite=None; Secure";

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {

        dogePrice = Math.floor(data.market_data.current_price.gbp*748.5)
        document.getElementById("doge-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
            <span>£${dogePrice}</span>

        `
        document.getElementById("doge").innerHTML += `
        <p>🎯Current Price: £${data.market_data.current_price.gbp}</p>
        <p>👆24hr High : £${data.market_data.high_24h.gbp}</p>
        <p>👇24hr Low: £${data.market_data.low_24h.gbp}</p>
        `
        total += dogePrice 
        renderTotal()

    })
    .catch(err => console.error(err))

    fetch("https://api.coingecko.com/api/v3/coins/ripple")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        xrpPrice = Math.floor(data.market_data.current_price.gbp*368.3)
        document.getElementById("xrp-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
            <span>£${xrpPrice}</span>
        `
        document.getElementById("xrp").innerHTML += `
            <p>🎯Current Price: £${data.market_data.current_price.gbp}</p>
            <p>👆24hr High : £${data.market_data.high_24h.gbp}</p>
            <p>👇24hr Low: £${data.market_data.low_24h.gbp}</p>
        `
        total += xrpPrice
        renderTotal()

    })
    .catch(err => console.error(err))

    fetch("https://api.coingecko.com/api/v3/coins/vechain")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        
        vetPrice = Math.floor(data.market_data.current_price.gbp*3307.5)
        document.getElementById("vet-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
            <span>£${vetPrice}</span>
        `
        document.getElementById("vet").innerHTML += `
            <p>🎯Current Price: £${data.market_data.current_price.gbp}</p>
            <p>👆24hr High : £${data.market_data.high_24h.gbp}</p>
            <p>👇24hr Low: £${data.market_data.low_24h.gbp}</p>
        `
        total += vetPrice
        renderTotal()

    })
    .catch(err => console.error(err))
    

    function renderTotal() {
    document.getElementById("total").innerHTML = `£${total}`
    }


    document.getElementById("doge-top").addEventListener("click", () => {
        document.getElementById("doge").style.display = "block"}) 


        document.getElementById("xrp-top").addEventListener("click", () => {
            document.getElementById("xrp").style.display = "block"}) 

            document.getElementById("vet-top").addEventListener("click", () => {
                document.getElementById("vet").style.display = "block"}) 

                document.getElementById("refresh").addEventListener("click", () => {
                    location.reload();
                })

                  