import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  
  const [coins, setCoins] = useState(null);

  useEffect(() => 
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=${router.query.page}&sparkline=false`)
      .then(res => res.json())
      .then(coins => setCoins(coins)),
  [router.query]);

  const tableContent = coins 
    ? coins.map(coin => (
        <tr key={coin.id} className={coin.price_change_24h > 0 ? 'positive' : 'negative'}>
          <td>{coin.market_cap_rank}</td>
          <td className="left"><a href={`https://www.coingecko.com/coins/${coin.id}`} target="blank">{coin.symbol.toUpperCase()}</a></td>
          <td className="left">{coin.name}</td>
          <td className="right">{coin.current_price.toFixed(2)}</td>
          <td className="right change no-mobile">{coin.price_change_24h.toFixed(2)}</td>
          <td className="right change">{coin.price_change_percentage_24h.toFixed(2)}%</td>
          <td className="right no-mobile">{abbr(coin.market_cap, 2)}</td>
          <td className="right no-mobile">{coin.ath.toFixed(2)}</td>
        </tr>
      ))
    : <tr><td colSpan="8">Loading...</td></tr>;

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
              <th className="left">Symbol</th>
              <th className="left">Name</th>
              <th className="right">Price</th>
              <th className="right no-mobile">Change</th>
              <th className="right">Change %</th>
              <th className="right no-mobile">Market cap</th>
              <th className="right no-mobile">All time high</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
        <div className="pagination">
          <Link href={`/?page=${Math.max(parseInt(router.query.page)-1, 1)}`}>&lt;</Link>
          <span>{router.query.page}</span>
          <Link href={`/?page=${Math.max(parseInt(router.query.page)+1, 1)}`}>&gt;</Link>
        </div>
      </div>
      Powered by <a href="http://coingecko.com/" target="_blank" className="coingecko">CoinGecko</a>
    </div>
  )
}

// from https://stackoverflow.com/questions/2685911/is-there-a-way-to-round-numbers-into-a-reader-friendly-format-e-g-1-1k
export function abbr(number, decPlaces) {
  var isNegative = number < 0;
  number = Math.abs(number);

  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = Math.pow(10,decPlaces);

  // Enumerate number abbreviations
  var abbrev = [ "K", "M", "B", "T" ];

  // Go through the array backwards, so we do the largest first
  for (var i=abbrev.length-1; i>=0; i--) {

      // Convert array index to "1000", "1000000", etc
      var size = Math.pow(10,(i+1)*3);

      // If the number is bigger or equal do the abbreviation
      if(size <= number) {
           // Here, we multiply by decPlaces, round, and then divide by decPlaces.
           // This gives us nice rounding to a particular decimal place.
           number = Math.round(number*decPlaces/size)/decPlaces;

           // Handle special case where we round up to the next abbreviation
           if((number === 1000) && (i < abbrev.length - 1)) {
               number = 1;
               i++;
           }

           // Add the letter for the abbreviation
           number = number.toFixed(2) + abbrev[i];

           // We are done... stop
           break;
      }
  }

  if (isNegative) {
      return '-' + number;
  }

  return number;
}
