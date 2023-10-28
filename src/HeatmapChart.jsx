import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsHeatmap from 'highcharts/modules/heatmap'
import { useGlobalContext } from "./context"





HighchartsHeatmap(Highcharts);

const HeatmapChart = () => {
    const { customTooltipFormatter, maxDailySale,salesData,avgTotSales} = useGlobalContext();

    const series1 = {
        name: 'Sales per employee',
        borderWidth: 1,
        data: salesData,
        dataLabels: {
            enabled: true,
            color: '#000000'
        }
    }
    const series2 = {
        name: 'Total and average sales',
        borderWidth: 1,
        data: avgTotSales,
        dataLabels: {
            enabled: true,
            color: '#000000'
            
        },

        colorAxis: null,
        marker: {
            enabled: false,
        },




    };



    const options = {

        plotOptions: {
            series: {
                cursor: 'pointer',
                animation:false
            },

        },
        chart: {
            type: 'heatmap',
            plotBorderWidth: 1,
            height: 35 + '%'
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
            categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', '<b>Total</b>', '<b>Average</b>'],
            title: null,
            reversed: true,
            

        }, {
            categories: ['Total', 'Average'],
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
            margin: 0,
            verticalAlign: 'top',
            y: 25,
            symbolHeight: 300
        },

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
                        height: 550,

                    },
                    yAxis:{
                        labels:{
                            format:`{substr value 0 1}`,
                            formatter:function () {
                                Highcharts.Templating.helpers.substr = (s, from, length) => s.substr(from, length);
                            }
                        }
                    }

                }
            }]
        }


    }




   

    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    )

}

export default HeatmapChart