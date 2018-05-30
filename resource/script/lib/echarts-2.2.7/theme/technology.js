define(function () {
    var color = '#6E9CDA';

    var theme = {
        // 全图默认背景
        // backgroundColor: 'rgba(0,0,0,0)',

        // 默认色板
        color: [
            '#B4FD8E', '#57BAEE', '#2D69C1', '#91FE67', '#00FB98',
            '#26C0C0', '#C6E579', '#70A763', '#D9FBFD', '#30DDA8'
        ],
        
        // 图表标题
        title: {
            textStyle: {
                fontWeight: 'normal',
                color: color            // 主标题文字颜色
            },
            subtextStyle: {
                color: color            // 副标题文字颜色
            }
        },

        // 图例
        legend: {
            textStyle: {
                color: color            // 图例文字颜色
            }
        },
         
        // 值域
        dataRange: {
            itemWidth: 15,
            color: ['#FFF808', '#21BCF9'],
            textStyle: {
                color: '#fff'          // 值域文字颜色
            }
        },

        // 提示框
        tooltip: {
            backgroundColor: 'rgba(13,68,71,.7)',     // 提示背景颜色
            borderColor: '#26B48E',
            borderWidth: 1,
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'line',         // 默认为直线，可选为：'line' | 'shadow'
                lineStyle: {          // 直线指示器样式设置
                    color: '#23AC38'
                },
                crossStyle: {
                    color: '#23AC38'
                },
                shadowStyle: {                     // 阴影指示器样式设置
                    color: 'rgba(200,200,200,0.2)'
                }
            },
            textStyle: {
                color: '#fff'
            }
        },

        // 网格
        grid: {
            borderWidth: 0
        },

        // 类目轴
        categoryAxis: {
            axisLine: {            // 坐标轴线
                show: true
            },
            axisTick: {            // 坐标轴小标记
                show: false
            },
            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: color
                }
            },
            splitLine: {           // 分隔线
                show: false
            },
            splitArea: {           // 分隔区域
                show: false
            }
        },

        // 数值型坐标轴默认参数
        valueAxis: {
            axisLine: {            // 坐标轴线
                show: true
            },
            axisTick: {            // 坐标轴小标记
                show: false
            },
            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: color
                }
            },
            splitLine: {           // 分隔线
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: ['#113976'],
                    type: 'dashed'
                }
            },
            splitArea: {           // 分隔区域
                show: false
            }
        },

        timeline: {
            label: {
                textStyle: {
                    color: color
                }
            },
            lineStyle: {
                color: color
            },
            controlStyle: {
                normal: {color: color},
                emphasis: {color: '#B4FD8E'}
            },
            symbolSize: 3
        },

        // 折线图默认参数
        line: {
            smooth: true
        },

        pie: {
            itemStyle: {
                normal: {
                    borderWidth: 0,
                    borderColor: 'rgba(255, 255, 255, 0.5)'
                },
                emphasis: {
                    borderWidth: 0,
                    borderColor: 'rgba(255, 255, 255, 1)'
                }
            }
        },

        map: {
            itemStyle: {
                normal: {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    areaStyle: {
                        color: '#265492'
                    },
                    label: {
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                emphasis: {                 // 也是选中样式
                    areaStyle: {
                        color: '#B4FD8E'
                    },
                    label: {
                        textStyle: {
                            color: '#fff'
                        }
                    }
                }
            }
        },

        gauge: {
            axisLine: {            // 坐标轴线
                show: true,        // 默认显示，属性show控制显示与否
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[0.2, '#9BCA63'], [0.8, '#60C0DD'], [1, '#D7504B']],
                    width: 3,
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            axisTick: {            // 坐标轴小标记
                length: 10,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto',
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            axisLabel: {            // 坐标轴小标记
                textStyle: {       // 属性lineStyle控制线条样式
                    fontWeight: 'bolder',
                    color: '#fff',
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            splitLine: {           // 分隔线
                length: 15,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    width: 3,
                    color: '#fff',
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            pointer: {           // 分隔线
                shadowColor: '#fff', //默认透明
                shadowBlur: 5
            },
            title: {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 20,
                    fontStyle: 'italic',
                    color: '#fff',
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            detail: {
                shadowColor: '#fff', //默认透明
                shadowBlur: 5,
                offsetCenter: [0, '50%'],       // x, y，单位px
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    color: '#fff'
                }
            }
        },

        textStyle: {
            fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
        },
        
        //无数据默认加载效果
        noDataLoadingOption: {
			text: '暂无数据',
			textStyle: {
				color: 'white',
				fontSize: 10,
			},
			effect: 'bubble',
			effectOption: {
			  backgroundColor: '#19467d',//#3479d6 #19467d
			},
		}
        
    };

    return theme;
});