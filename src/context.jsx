
import React, { useContext, useEffect, useState } from "react"

//Sonradan datayı daha kolay değiştirmemi/değiştirilmesini sağlaması için satış verilerini ayrı bir dosyada oluşturdum.
import salesData from './salesData.json'

//contexti oluşturuyorum
const SalesContext = React.createContext();


const SalesProvider = ({ children }) => {

    //useState kullanarak sonrasında her çalışanın toplam ve ortalama satış değerlerinin ekleyeceğim avgTotSales adınfa boş bir dizi oluşturuyorum.
    // Sonrasında avgTotalSales dizisini heatmapte ayrı bir serinin datası olarak HeatmapChart componentindeki highchart ayarlarına ekleyeceğim.
    const [avgTotSales, setAvgTotSales] = useState([]);




  //Burada useEffect hookunu kulanarak, toplam ve ortalama satışların hesaplanmasını ve ilk renderda hesaplanmasını sağlıyorum 
    useEffect(() => {
        // Burada her çalışanın her gün yaptığı toplam ve ortalama satışları hesaplayıp, bu bilgileri bir geçici bir diziye aktarıyorum, sonrasında bu diziyi useState hookunu kullanarak avgTotalSales verisine atıyorum.iyi bir algoritma olduğunu düşünmüyorum daha iyi yazılabilirdi
  
        let temporaryArray = [];

        let sumOfSales = 0;
        for (let dailyData of salesData) {
    
            const row_data = dailyData[0];
            const column_data = dailyData[1];
            const sales = dailyData[2];
    
            sumOfSales += sales;
            if (column_data === 4) {
                temporaryArray.push([row_data, column_data + 1, sumOfSales], [row_data, column_data + 2, sumOfSales / 5]);
                sumOfSales = 0;
            }
    
        }
        setAvgTotSales(temporaryArray)

    }, [])







    return (
       
        <SalesContext.Provider value={{ salesData, avgTotSales }}>
            {children}
        </SalesContext.Provider>
    )

}


//Contextteki verilere kolay erişilebilmesi için global context fonksiyonu yazıyorum ve dışa aktarıyorum
export const useGlobalContext = () => {
    return useContext(SalesContext)
}

export { SalesContext, SalesProvider }
