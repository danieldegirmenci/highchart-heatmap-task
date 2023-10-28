
import React, { useContext, useEffect, useState } from "react"

//Sonradan datayı daha kolay değiştirmemi/değiştirilmesini sağlaması için satış verilerini ayrı bir dosyada oluşturdum.
import salesData from './salesData.json'

//contexti oluşturuyorum
const SalesContext = React.createContext();


const SalesProvider = ({ children }) => {



    //useState hookunu kullanarak herhangi bir çalışanın yaptığı günlük maksimum satışı,
// HeatmapChartta legendin alabileceği maksiumum değerin, bu değere göre belirlenmesini istiyorum.bunun sebebi toplam ve ortalama satış değerlerinin heatmapin özelliklerini etkilemesini engellemek 
    const [maxDailySale, setMaxDailySale] = useState(Math.max(...salesData.map(item => item[2])));


    //useState kullanarak sonrasında her çalışanın toplam ve ortalama satış değerlerinin ekleyeceğim avgTotSales adınfa boş bir dizi oluşturuyorum.
    // Sonrasında avgTotalSales dizisini heatmapte ayrı bir serinin datası olarak HeatmapChart componentindeki highchart ayarlarına ekleyeceğim.
    const [avgTotSales, setAvgTotSales] = useState([]);



// Burada her çalışanın her gün yaptığı toplam ve ortalama satışları hesaplayıp, bu bilgileri bir geçici bir diziye aktarıyorum, sonrasında bu diziyi useState hookunu kullanarak avgTotalSales verisine atıyorum.
  

const getSumAndAvg=()=>{
    let temporaryArray = [];

    let sumOfSales = 0;
    for (let dailyData of salesData) {

        const employeeId = dailyData[0];
        const column_data = dailyData[1];
        const sales = dailyData[2];

        sumOfSales += sales;
        if (column_data === 4) {
            temporaryArray.push([employeeId, column_data + 1, sumOfSales], [employeeId, column_data + 2, sumOfSales / 5]);
            sumOfSales = 0;
        }

    }
    setAvgTotSales(temporaryArray)
  }
 

  //Burada useEffect hookunu kulanarak, günlük maksimum değerin atanması ve toplam ve ortalama satışların hesaplanmasını ilk renderda hesaplanmasını sağlıyorum 
    useEffect(() => {

        setMaxDailySale(Math.max(...salesData.map(item => item[2])));

        getSumAndAvg();
    }, [])







    return (
       
        <SalesContext.Provider value={{ salesData, avgTotSales, maxDailySale }}>
            {children}
        </SalesContext.Provider>
    )

}


//Contextteki değerlere kolay erişilebilmesi için global context fonksiyonu yazıyorum ve dışa aktarıyorum
export const useGlobalContext = () => {
    return useContext(SalesContext)
}

export { SalesContext, SalesProvider }
