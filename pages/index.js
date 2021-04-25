import Head from 'next/head'
import { useEffect, useState } from 'react';

export default function Home() {
  const [coins, setCoins] = useState([]);

  const uri = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false`;
  useEffect(() => fetch(uri).then(res => res.json()).then(coins => setCoins(coins)));

  return (
    <div>
      <Head>
        <title>Crypto Currency Prices</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="panel">
        <h1>
          <img src="/bitcoin2.gif"></img>
          <img src="/bitcoin2.gif"></img>
          <img src="/bitcoin2.gif"></img>
          <br className="no-desktop" />
          TOP CRYPTO CURRENCIES
          <br className="no-desktop" />
          <img src="/bitcoin2.gif"></img>
          <img src="/bitcoin2.gif"></img>
          <img src="/bitcoin2.gif"></img>
        </h1>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Symbol</th>
              <th>Name</th>
              <th>Price</th>
              <th className="no-mobile">Change</th>
              <th>Change %</th>
              <th className="no-mobile">Market cap</th>
              <th className="no-mobile">All time high</th>
            </tr>
          </thead>
          <tbody>
          {
              coins.map(coin => {
                return <tr key={coin.id} className={coin.price_change_24h > 0 ? 'positive' : 'negative'}>
                  <td>{coin.market_cap_rank}</td>
                  <td><a href={`https://www.coingecko.com/coins/${coin.id}`} target="blank">{coin.symbol.toUpperCase()}</a></td>
                  <td>{coin.name}</td>
                  <td>{coin.current_price}</td>
                  <td className="change no-mobile">{coin.price_change_24h.toFixed(3)}</td>
                  <td className="change">{coin.price_change_percentage_24h.toFixed(3)}%</td>
                  <td className="no-mobile">{coin.market_cap}</td>
                  <td className="no-mobile">{coin.ath}</td>
                </tr>
              })
          }
          </tbody>
        </table>
      </div>
      Powered by <a href="http://coingecko.com/" target="_blank" className="coingecko">CoinGecko</a>
    </div>
  )
}
