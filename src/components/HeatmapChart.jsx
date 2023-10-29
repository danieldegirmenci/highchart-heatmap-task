//Highcharts ve kullanacağım diğer modülleri içe aktarıyorum
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsHeatmap from 'highcharts/modules/heatmap'

//oluşturduğum contexti içe aktarıyorum
import { useContext } from "react"
import { SalesContext } from '../context/context';


HighchartsHeatmap(Highcharts);

const HeatmapChart = () => {

    // contextten highchart ayarlarında ihtiyacım olacak verileri çekiyorum
    const { salesData, avgTotSales } = useContext(SalesContext);


   // burada günlük, toplam veya ortalama satış verilere göre tooltipi özelleştiriyorum.serilerin içinde oluşturmayı denedim fakat olmadı bu yüzden sebebini anlayıp yeni bir çözüm üretinceye kadar bu fonksiyon faydalı.
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





    //dailySalesData ve totalAverageData kodun okunabilirliği ve bağımsız bir şekilde yönetilmesini sağlamak istediğim için ayrı değişkenlere atıyorum. 


    //Çalışanların günlük satış sayılarının günlere göre heatmape yerleştirilmesini sağlayan dizi. 
    const dailySalesData = {
        name: 'Sales per employee',
        borderWidth: 1,
        data: salesData,
       
}
    // toplam ve ortalama satış sayılarının verisini tabloya ayrı bir seri olarak ekliyorum, colorAxis ve showInLegend özelliklerini kullanarak bu verileri heatmapin renk ve legend özelliklerini bu seri üzerinde geçersiz kılıyorum.(çok ağır cümleler)
    const totalAverageData = {
        name: 'Total and average sales',
        type: 'heatmap',
        borderWidth: 1,
        data: avgTotSales,
        color: '#FFFFFF',
        colorAxis: {},
        showInLegend: false,
        
    };


    //Chart ayarları
    const options = {

        plotOptions: {
            series: {
                cursor: 'pointer',
                marker: {
                    lineWidth: 2,
                    lineColor: '#488282',
                },
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    style: {
                        fontSize: '1rem',
                        textOutline: 'none'
                      },
                      
                },
              

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
            //Total ve average'ı ayrı bir dizi olarak eklemeye çalıştım fakat istediğim şeyi tam olarak yapamadım, bütün kodun yapısını değiştirmem gerekti çalıştıramayınca bu çözümden devam ettim.
            categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Total', 'Average'],
            title: null,
            reversed: true,


        }],


        colorAxis: {
            min: 0,
            minColor: '#FFFFFF',
             maxColor:'#488282'

        },
        legend: {
            align: 'right',
            layout: 'vertical',
            verticalAlign: 'top',
            y: 35,
            symbolHeight: 300,
            symbolWidth:20,




        },
        tooltip:{
            //özelleştirilmiş tooltipi burada belirliyorum
formatter:customTooltipFormatter,
        },


        
       //kodun işlevi basit olsa da çok kritik
        series: [dailySalesData, totalAverageData],


        responsive: {
            //ekran 900pxden küçükken günlerin,toplam ve average isimlerinin sadece ilk harfinin görünmesini ve yüksekliğin artmasını sağlıyorum
            rules: [{
                condition: {
                    maxWidth: 900
                },
                chartOptions: {
                    chart: {
                        height: '65%',

                    },
                    yAxis: {
                        labels: {
                            
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
            {/* sayfa ilk açıldığında avgTotSales verisini beklerken UIda hata oluşuyor, bunu engellemek için avgTotSales verisi boş olmadığında  tablonun yüklemesi için conditional rendering yaptım*/}

            {avgTotSales[0] &&
            <HighchartsReact highcharts={Highcharts} options={options} />
            }
        </div>


    )

}

export default HeatmapChart