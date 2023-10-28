//Highcharts ve kullanacağım diğer modülleri içe aktarıyorum
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsHeatmap from 'highcharts/modules/heatmap'

//oluşturduğum contexti içe aktarıyorum
import { useGlobalContext } from "./context"


HighchartsHeatmap(Highcharts);

const HeatmapChart = () => {

    // contextten highchart ayarlarında ihtiyacım olacak hesaplamaları ve verileri çekiyorum.
    const {maxDailySale,salesData,avgTotSales} = useGlobalContext();
    
    
    //burada günlük, toplam veya ortalama satış verilere göre tooltipi özelleştiriyorum.
    const customTooltipFormatter = function () {

        let { point, series } = this;
        let tooltipText = "";
        
        if (point.y === 5) {
            tooltipText = `<b>Total sale</b> for <b>${series.xAxis.categories[point.x]}</b> was <br><b>${point.value}</b> this week`;
        } else if (point.y === 6) {
            tooltipText = `<b>Average sale</b> for <b>${series.xAxis.categories[point.x]}</b> was <br><b>${point.value}</b> this week`;
        } else {
            tooltipText = `<b>${series.xAxis.categories[point.x]}</b> sold<br><b>${point.value}</b> items on <br><b>${series.yAxis.categories[point.y]}</b>`;
        }
        
        return tooltipText;
        
    }



  //Dizileri kodun okunabilirliği ve bağımsız bir şekilde yönetilmesini sağlamak istediğim için,  

//Çalışanların günlük satış sayılarının günlere göre heatmape yerleştirilmesini sağlayan dizi. 
    const series1 = {
        name: 'Sales per employee',
        borderWidth: 1,
        data: salesData,
        dataLabels: {
            enabled: true,
            color: '#000000'
        }
    }
    //Çalışanların o hafta yaptıkları satışın toplamını ve ortalamasını ayrı bir dizi şeklinde heatmape almayı düşündüm, sonrasında çok daha optimize ve işimi kolaylaştıracak bir yol bulabilirim.
    const series2 = {
        name: 'Total and average sales',
        borderWidth: 1,
        data: avgTotSales,
        dataLabels: {
            enabled: true,
            color: '#000000',
            
         },

        colorAxis: null,
        marker: {
            enabled: false,
        },
        
    };


//Chart ayarları,başta buradaki bilgileri demodan ve resmi dökümandan faydalanarak oluşturdum sonradan işlemlerimi ve değişikliklerimi template üzerinden yaptım
    const options = {

        plotOptions: {
            series: {
                cursor: 'pointer'
            },

        },
        chart: {
            type: 'heatmap',
            plotBorderWidth: 1,
            height: '35%'
        },
        title: {
            text: 'Sales per employee per weekday',
            style: {
                fontSize: '1.2em'
            }
        },
        xAxis: {
            categories: ['Alexander', 'Marie', 'Maximillian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura']
        },
        yAxis: [{
            //Total ve averag'ı ayrı bir dizi olarak eklemeye çalıştım fakat istediğim şeyi tam olarak yapamadım, bütün kodun yapısını değiştirmem gerekti çalıştıramayınca bu çözümden devam ettim
            categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Total', 'Average'],
            title: null,
            reversed: true,
            

        }],


        colorAxis: {
            min: 0,
            max: maxDailySale,
            minColor: '#FFFFFF',
            maxColor: Highcharts.getOptions().colors[7]
        },
        legend: {
            align: 'right',
            layout: 'vertical',
            verticalAlign: 'top',
            y:35,
            symbolHeight: 300,
            
            
        },

//tooltipin series2de çok yavaş çalıştığının farkındayım, algortimadan mı kaynaklı ikinci serinin heatmap özelliklerinin manipüle edilmiş olmasından mı araştırıyorum fakat henüz çözemedim
        tooltip: {
            formatter: customTooltipFormatter
        },

        series: [series1, series2],

        options: {
            exporting: false,
            credits: false
        },

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 1000
                },
                chartOptions: {
                    chart: {
                        height: '65%',

                    },
                    yAxis:{
                        labels:{
                           //ekran 1000pxden küçükken günlerin,toplam ve average isimlerinin sadece ilk harfinin görünmesini sağlamak istedim
                            formatter: function () {
                                
                                return this.value.substring(0, 1);
                            
                            }
                        }
                    }

                }
            }]
        }


    }

    return (
        <div>
            {/* sayfa ilk açıldığında avgTotSales verisini beklerken UIda hata oluşuyor bunu engellemek için avgTotSales verisi oluşturulduğunda tabloyu yüklemesi iççin conditional rendering yaptım*/}
            {avgTotSales[1] && <HighchartsReact highcharts={Highcharts} options={options} />}
        </div>
       
    
        )

}

export default HeatmapChart