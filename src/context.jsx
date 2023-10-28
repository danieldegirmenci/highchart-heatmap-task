import React, { useContext, useEffect, useState } from "react"
import salesData from './salesData.json'
const SalesContext = React.createContext();

const SalesProvider = ({ children }) => {
    const [maxDailySale, setMaxDailySale] = useState(0)
    const [avgTotSales, setAvgTotSales] = useState([]);


    const customTooltipFormatter = function () {

        let point = this.point;
        let series = this.series;
        if (point.y === 5) {
            return `<b>Total sale</b> for <b> ${series.xAxis.categories[point.x]} </b> was  <br> <b> ${point.value} </b> this week`
        }
        else if (point.y === 6) {
            return `<b>Average sale</b> for <b> ${series.xAxis.categories[point.x]} </b> was  <br> <b> ${point.value} </b> this week`
        }
        else {
            return `<b> ${series.xAxis.categories[point.x]} </b> sold<br>
            <b> ${point.value} </b> items on <br>
            <b> ${series.yAxis.categories[point.y]} </b>`;

        }
    }


  const getSumAndAvg=()=>{
    let temporaryArray = [];

    let sumOfSales = 0;
    for (let dailyData of salesData) {

        const employeeId = dailyData[0];
        const data_id = dailyData[1];
        const sales = dailyData[2];

        sumOfSales += sales;
        if (data_id === 4) {
            temporaryArray.push([employeeId, data_id + 1, sumOfSales], [employeeId, data_id + 2, sumOfSales / 5]);
            sumOfSales = 0;
        }

    }
    setAvgTotSales(temporaryArray)
  }

    useEffect(() => {

        setMaxDailySale(Math.max(...salesData.map(item => item[2])));

        getSumAndAvg();
    }, [])







    return (
        <SalesContext.Provider value={{ customTooltipFormatter, salesData, avgTotSales, maxDailySale }}>
            {children}
        </SalesContext.Provider>
    )

}


export const useGlobalContext = () => {
    return useContext(SalesContext)
}

export { SalesContext, SalesProvider }
