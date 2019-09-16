const log = console.log.bind(console)
let element = document.querySelector('#main')
let myChart = echarts.init(element)

const ajax = function(request) {
    let r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType !== undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = () => {
        if (r.readyState === 4) {
            request.callback(r.response)
        }
    }
    if (request.method === 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }
}

const place = (array) => {

    let haidian = []
    let chaoyang = []
    let dongcheng = []
    let xicheng = []
    let fengtai = []
    let shijingshan = []
    let b = {
        haidian : haidian,
        chaoyang : chaoyang,
        dongcheng : dongcheng,
        xicheng : xicheng,
        fengtai : fengtai,
        shijingshan : shijingshan,

    }


    for (let i = 0; i < array.length; i++) {
        let a = array[i]
        if (a.place === '海淀') {
            let an = []
            let an1 = Number(a.unitPrice.slice(0, -4))
            let an2 = Number(a.area.slice(0, -2))
            an.push(an2, an1)
            haidian.push(an)
            // log(i)
        }
        if (a.place === '朝阳') {
            let an = []
            let an1 = Number(a.unitPrice.slice(0, -4))
            let an2 = Number(a.area.slice(0, -2))
            an.push(an2, an1)
            chaoyang.push(an)
            // log(i)
        }
        if (a.place === '东城') {
            let an = []
            let an1 = Number(a.unitPrice.slice(0, -4))
            let an2 = Number(a.area.slice(0, -2))
            an.push(an2, an1)
            dongcheng.push(an)
            // log(i)
        }
        if (a.place === '西城') {
            let an = []
            let an1 = Number(a.unitPrice.slice(0, -4))
            let an2 = Number(a.area.slice(0, -2))
            an.push(an2, an1)
            xicheng.push(an)
            // log(i)
        }
        if (a.place === '丰台') {
            let an = []
            let an1 = Number(a.unitPrice.slice(0, -4))
            let an2 = Number(a.area.slice(0, -2))
            an.push(an2, an1)
            fengtai.push(an)
            // log(i)
        }
        if (a.place === '石景山') {
            let an = []
            let an1 = Number(a.unitPrice.slice(0, -4))
            let an2 = Number(a.area.slice(0, -2))
            an.push(an2, an1)
            shijingshan.push(an)
            // log(i)
        }


    }
    // log("朝阳", chaoyang)
    // log("海淀", haidian)
    // log("西城", xicheng)
    // log("东城", dongcheng)
    // log("石景山", shijingshan)
    log("完成数据处理", b)
    return b
}

const echart = (obj)=> {
    let haidian = obj.haidian
    let chaoyang = obj.chaoyang
    let xicheng = obj.xicheng
    let dongcheng =  obj.dongcheng
    let shijingshan =obj.shijingshan
    let fengtai = obj.fengtai

    let option = {
        title : {
            text: '北京城区房价对比',
            subtext: '抽样调查来自: 安居客'
        },
        grid: {
            left: '3%',
            right: '7%',
            bottom: '3%',
            containLabel: true
        },
        tooltip : {
            // trigger: 'axis',
            showDelay : 0,
            formatter : function (params) {
                if (params.value.length > 1) {
                    return params.seriesName + ' :<br/>'
                        + params.value[0] + '平米 '
                        + params.value[1] + '元/平方 ';
                }
                else {
                    return params.seriesName + ' :<br/>'
                        + params.name + ' : '
                        + params.value + '元/平方 ';
                }
            },
            axisPointer:{
                show: true,
                type : 'cross',
                lineStyle: {
                    type : 'dashed',
                    width : 1
                }
            }
        },
        toolbox: {
            feature: {
                dataZoom: {},
                brush: {
                    type: ['rect', 'polygon', 'clear']
                }
            }
        },
        brush: {
        },
        legend: {
            data: ['海淀', '朝阳', '西城', '东城', '丰台', '石景山'],
            left: 'center'
        },
        xAxis : [
            {
                type : 'value',
                scale:true,
                axisLabel : {
                    formatter: '{value} 平米'
                },
                splitLine: {
                    show: false
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                scale:true,
                axisLabel : {
                    formatter: '{value} 元/平方'
                },
                splitLine: {
                    show: false
                }
            }
        ],
        series : [
            {
                name:'海淀',
                type:'scatter',
                data: haidian,
                markArea: {
                    silent: true,
                    itemStyle: {
                        normal: {
                            color: 'transparent',
                            borderWidth: 1,
                            borderType: 'dashed'
                        }
                    },
                    data: [[{
                        name: '海淀分布区间',
                        xAxis: 'min',
                        yAxis: 'min'
                    }, {
                        xAxis: 'max',
                        yAxis: 'max'
                    }]]
                },
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    lineStyle: {
                        normal: {
                            type: 'solid'
                        }
                    },
                    data : [
                        {type : 'average', name: '平均值'},

                    ]
                }
            },
            {
                name:'朝阳',
                type:'scatter',
                data: chaoyang,
                markArea: {
                    silent: true,
                    itemStyle: {
                        normal: {
                            color: 'transparent',
                            borderWidth: 1,
                            borderType: 'dashed'
                        }
                    },
                    data: [[{
                        name: '朝阳分布区间',
                        xAxis: 'min',
                        yAxis: 'min'
                    }, {
                        xAxis: 'max',
                        yAxis: 'max'
                    }]]
                },
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    lineStyle: {
                        normal: {
                            type: 'solid'
                        }
                    },
                    data : [
                        {type : 'average', name: '平均值'},

                    ]
                }
            },
            {
                name:'西城',
                type:'scatter',
                data: xicheng,
                markArea: {
                    silent: true,
                    itemStyle: {
                        normal: {
                            color: 'transparent',
                            borderWidth: 1,
                            borderType: 'dashed'
                        }
                    },
                    data: [[{
                        name: '西城分布区间',
                        xAxis: 'min',
                        yAxis: 'min'
                    }, {
                        xAxis: 'max',
                        yAxis: 'max'
                    }]]
                },
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    lineStyle: {
                        normal: {
                            type: 'solid'
                        }
                    },
                    data : [
                        {type : 'average', name: '平均值'},

                    ]
                }
            },
            {
                name:'东城',
                type:'scatter',
                data: dongcheng,
                markArea: {
                    silent: true,
                    itemStyle: {
                        normal: {
                            color: 'transparent',
                            borderWidth: 1,
                            borderType: 'dashed'
                        }
                    },
                    data: [[{
                        name: '东城分布区间',
                        xAxis: 'min',
                        yAxis: 'min'
                    }, {
                        xAxis: 'max',
                        yAxis: 'max'
                    }]]
                },
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    lineStyle: {
                        normal: {
                            type: 'solid'
                        }
                    },
                    data : [
                        {type : 'average', name: '平均值'},

                    ]
                }
            },
            {
                name:'丰台',
                type:'scatter',
                data: fengtai,
                markArea: {
                    silent: true,
                    itemStyle: {
                        normal: {
                            color: 'transparent',
                            borderWidth: 1,
                            borderType: 'dashed'
                        }
                    },
                    data: [[{
                        name: '丰台分布区间',
                        xAxis: 'min',
                        yAxis: 'min'
                    }, {
                        xAxis: 'max',
                        yAxis: 'max'
                    }]]
                },
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    lineStyle: {
                        normal: {
                            type: 'solid'
                        }
                    },
                    data : [
                        {type : 'average', name: '平均值'},

                    ]
                }
            },
            {
                name:'石景山',
                type:'scatter',
                data: shijingshan,
                markArea: {
                    silent: true,
                    itemStyle: {
                        normal: {
                            color: 'transparent',
                            borderWidth: 1,
                            borderType: 'dashed'
                        }
                    },
                    data: [[{
                        name: '石景山分布区间',
                        xAxis: 'min',
                        yAxis: 'min'
                    }, {
                        xAxis: 'max',
                        yAxis: 'max'
                    }]]
                },
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    lineStyle: {
                        normal: {
                            type: 'solid'
                        }
                    },
                    data : [
                        {type : 'average', name: '平均值'},

                    ]
                }
            }

        ]
    };

    myChart.setOption(option)
}

const blogAll = function() {
    let request = {
        method: 'GET',
        url: '/api/house/all',
        contentType: 'application/json',
        callback: function(response) {
            let blogs = JSON.parse(response)
            log('blog',typeof blogs)
            let o = place(blogs)
            log('blog',typeof o,o)
            echart(o)
        }
    }
    ajax(request)
}



const mian = ()=> {
    blogAll()
}
mian()
