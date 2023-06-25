import { useState, useEffect } from "react";




export default function Card ({coin, coinOwned}) {
    const [coinInfo, setCoinInfo] = useState()

    
    useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${coin}`)
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
            setCoinInfo({
                name: data.name,
                image: data.image.small,
                price: data.market_data.current_price.gbp,
                dayHigh: data.market_data.high_24h.gbp,
                dayLow: data.market_data.low_24h.gbp
            })


    })

    // })
    .catch(err => console.error(err))

}, [])


return (
    <>
    {coinInfo && (
      <div className="flex flex-col p-6 m-2 border-blue-600 border-2 rounded-xl">
        <div className="flex gap-6 mb-4 items-center justify-center">
        <img className="h-8 w-8" src={coinInfo.image} alt="Coin" />
        <h2>{coinInfo.name}</h2>
        </div>
        <p className="mt-2">🎯 Current Price: £{coinInfo.price}</p>
        <p>👆 24hr High: £{coinInfo.dayHigh}</p>
        <p>👇 24hr Low: £{coinInfo.dayLow}</p>
        <p>💰 Portfolio Value: <span className="font-bold">£{Math.floor(coinInfo.price * coinOwned)}</span></p>
      </div>
    )}
  </>
);
}
