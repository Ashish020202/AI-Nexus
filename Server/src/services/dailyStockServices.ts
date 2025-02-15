import axios from "axios"

const Base_url = "https://www.alphavantage.co/query";

interface stock {
  symbol: string;
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export const getstockService = async (symbol:string):Promise<stock|null> => {
    try {

        const response = await axios.get(Base_url,{

            params:{
                function: "TIME_SERIES_DAILY",
                symbol,
                apikey:"2MAGXLF0DV7IXSZE"
            }

        })

        const data = response.data;
        console.log("data",data);
        
        if (data["Time Series (Daily)"]) {
            const latestDate = Object.keys(data["Time Series (Daily)"])[0];
            const latestData = data["Time Series (Daily)"][latestDate];
      
            return {
              symbol,
              date: latestDate,
              open: latestData["1. open"],
              high: latestData["2. high"],
              low: latestData["3. low"],
              close: latestData["4. close"],
              volume: latestData["5. volume"],
            };
          }
      
          return null;

    } catch (error) {

        console.error("Error fetching stock data:", error);
        return null;
        
    }
}