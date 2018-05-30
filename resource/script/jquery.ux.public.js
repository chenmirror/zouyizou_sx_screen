/*******************************************************************
 ***** base utils **************************************************
 *******************************************************************/
/**
 * funciton.bind(obj)
 * @returns {Function}
 */
Function.prototype.bind = function() {
    var that = this,
        args = Array.prototype.slice.call(arguments),
        obj = args.shift();
    return function() {
        return that.apply(obj, args.concat(Array.prototype.slice.call(arguments)));
    };
};

/**
 * 数组分页
 * @param no 第几页
 * @param size 每页记录
 * @returns {Array.<T>}
 */
Array.prototype.paging = function (no, size) {
    var total = this.length,
        start = (no - 1) * size,
        end = no * size >= total ? total : no * size;
    return this.slice(start, end);
};

/**
 * 数组中对象元素的属性集合
 * @param attr 对象元素属性名
 * @returns {Array.<T>}
 */
Array.prototype.elemAttr = function (attr) {
    var attrs = [];
    for (var i = 0, l = this.length; i < l; i += 1) {
    	attrs.push(this[i][attr]);
    }
    return attrs;
};

/**
 * 获取数组中对象元素属性值匹配的对象
 * @param attr 对象元素属性名
 * @param value 对象元素属性值
 * @returns {}
 */
Array.prototype.item = function (attr, value) {
	if (attr && value) {
		for (var i = 0, l = this.length; i < l; i += 1) {
	    	if (attr in this[i] && value == this[i][attr]) {
	    		return this[i];
	    	}
	    }
	}
    return null;
};

/**
 * 截取字串并添加后缀
 */
String.prototype.substrwithsuffix = function (len, suffix) {
	if (this) {
		if (this.length > len) {
			return this.substring(0, len) + suffix;
		}
		return this;
	}
	return '';
}

/**
 * 判断是否是一个数组
 * @param value
 * @returns
 */
var isArray = function (value) {
    return Object.prototype.toString.apply(value) === '[object Array]';
};

/**
 * 键盘事件
 * @param event
 * @returns {Object|Number}
 */
function getKeyCode(event) {
    return event.which || event.keyCode; // event.keyCode 用于 IE8 及更早版本
}

/*******************************************************************
 ***** platform constans & utils ***********************************
 *******************************************************************/
var PLATFORM_CONSTANS = window.PLATFORM_CONSTANS || {};
var PLATFORM_UTILS = window.PLATFORM_UTILS || {};

/**
 * 区域
 * @type {{getZones, getDefualut}}
 */
PLATFORM_CONSTANS.AREA = (function () {
	var _zones = [
	    {id: '3201', cn: '南京'},
			{id: '320115', cn: '秦江宁区', lnglat: [118.839685,31.953702], 'poster': 'video-placeholder-qihuai'}
		
	];
	var _spots = [
	    {id: 'IS20161102175822003000', cn: '大成殿', lnglat:[118.7883450000, 32.0212290000], 'poster': 'video-placeholder-dachengdian'},
	    {id: 'IS20161102175642002800', cn: '秦淮画舫', lnglat:[118.7892920000, 32.0196660000], 'poster': 'video-placeholder-huafang'},
	    {id: 'IS20161102150733001100', cn: '大报恩寺', lnglat:[118.7838710000, 32.0088420000], 'poster': 'video-placeholder-baoensi'},
	    {id: 'IS20161102174649001800', cn: '朝天宫', lnglat:[118.7752710000, 32.0343390000], 'poster': 'video-placeholder-chaotiangong'},
	    {id: 'IS20161102174947002100', cn: '瞻园', lnglat:[118.7851970000, 32.0209490000], 'poster': 'video-placeholder-zhanyuan'},
	    {id: 'IS20161102174851002000', cn: '中华门瓮城', lnglat:[118.7809940000, 32.0122090000], 'poster': 'video-placeholder-wengcheng'},
	    {id: 'IS20161102104452000200', cn: '科举博物馆', lnglat:[118.7904300000, 32.0213470000], 'poster': 'video-placeholder-keju'},
	    {id: 'IS20161102174556001700', cn: '甘家大院', lnglat:[118.7821960000, 32.0259320000], 'poster': 'video-placeholder-ganxi'}
	];
	
    return {
		getArea: function () {
    		return _zones[1];
    	},
    	getZones: function () {
    		return _zones;
    	},
    	getSpots: function () {
    		return _spots;
    	},
    	getFirstSpot: function () {
    		return _spots[0];
    	},
    	getFuzimiaoAreaId: function () {
    		return _zones[2]['id'];
    	},
    	getAllArea: function () {
    		return _zones[0];
    	},
    }
})();

/**
 * 日期
 * @type {{getYears, getCurrentYear, getMonths, getCurrentMonth, getDay, getDays, getCurrentDay, getTodayChar, getTodayStr, formatFields}}
 */
PLATFORM_CONSTANS.DATE = (function () {
    var _initialYear = 2015,
        _yearsNum = 5,
        _now = new Date(),
        _days = ['日', '一', '二', '三', '四', '五', '六'],
        _years = [];
    
    var descSort = function (a, b) {
        return b - a;
    };

    (function () {
        var y = _now.getFullYear();
        if (y - _initialYear + 1 > _yearsNum) {
            for (var i = _yearsNum; i--; ) {
                _years.push(y - i);
            }
        } else {
            for (var j = y - _initialYear + 1; j--; ) {
                _years.push(y - j);
            }
        }
        //_years.sort(descSort);
    })();

    return {
    	// 年
        getYears: function () {
            return _years;
        },
        getCurrentYear: function () {
        	return _now.getFullYear();
        },
        // 月 不传参数获取默认月集合
        getMonths: function (year) {
        	var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], l = 12;
            if (year == _now.getFullYear()) { // 今年
                l = _now.getMonth() + 1;
            }
            months.length = l;
            //return months.sort(descSort);
            return months;
        },
        getCurrentMonth: function () {
        	return _now.getMonth() + 1;
        },
        // 日
        getCurrentDate: function () {
        	return _now.getDate();
        },
        // 每月 - 天
        getMonthlyDays: function (year, month) {
        	var days = [], daysNum;
        	switch (month) {
				case 4:
				case 6:
				case 9:
				case 11:
					daysNum = 30;
					break;
				case 2:
					daysNum = ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) ? 29 : 28;
					break;
				default:
					daysNum = 31;
					break;
			}
        	for (var i = 1; i <= daysNum; i += 1) {
        		days.push(i);
        	}
        	return days;
        },
        getCurrentMonthlyDays: function () {
        	return this.getMonthlyDays(this.getCurrentYear(), this.getCurrentMonth());
        },
        // 星期
        getDays: function (date, inc) {
            var days = [];
            for (var i = 0; i < inc; i += 1) {
            	days.push('星期' + this.getDay(date));
                date.setDate(date.getDate() + 1);
            }
            return days;
        },
        getDay: function (date) {
            return _days[date.getDay()];
        },
        getCurrentDay: function () {
            return this.getDay(_now);
        },
        getCurrentDays: function () {
        	// 使用 new Date() 避免对 私有变量的修改
            return this.getDays(new Date(), 3);
        },
        getHours: function () {
        	return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 20, 21, 22, 23, 24];
        },
        getTodayChar: function () {
        	var y = this.formatFields(_now.getFullYear()),
				m = this.formatFields(_now.getMonth() + 1), //获取当前月份的日期
				d = this.formatFields(_now.getDate());
        	return '' + y + m + d;
        },
        getTodayStr: function (format) {
        	format = format || 'FORMAT_NORMAL8'; // 默认FORMAT_NORMAL8
			return formatDateStr(this.getTodayChar(), format);
        },
        formatFields: function (val) {
        	if (val < 10) {
				return '0' + val;
			}
        	return val;
        },
    }
})();

/**
 * 工具
 */
PLATFORM_UTILS = {
	/**
	 * <table>元素分页填充
	 * @param size 每页记录数
	 * @param row 每页获取的记录数
	 * @param col 每条记录数所展示的<td>数
	 * @returns {String}
	 */
	tablePadding: function (size, row, col) {
	    var dis = size - row;
	    if (dis > 0) {
	        var str = '';
	        if (dis == size) {
	        	str += this.tableJoin(col, '-');
	        	dis = dis - 1;
	        }
	        for (; dis > 0; dis -= 1) {
	        	str += this.tableJoin(col, '&nbsp;');
	        }
	        return str;
	    }
	    return '';
	},
	tableJoin: function (col, join) {
		var str = '<tr>';
    	for (var i = 0; i < col; i += 1) {
        	str += '<td>' + join + '</td>';
        }
    	str += '</tr>';
		return str;
	},
	/**
	 * <ul/ol> 列表填充
	 */
	listPadding: function (size, row) {
		var dis = size - row;
	    if (dis > 0) {
	        var str = '';
	        for (; dis > 0; dis -= 1) {
	        	str += '<li></li>'
	        }
	        return str;
	    }
	    return '';
	},
	/**
	 * <ul>日期填充
	 */
	datePadding: function () {
        return [
            this.yearPadding(),
            this.monthPadding(PLATFORM_CONSTANS.DATE.getYears()[0])
        ];
    },
	yearPadding: function () {
		return this.dateJoin(PLATFORM_CONSTANS.DATE.getYears(), '年');
	},
	monthPadding: function (year) {
		return this.dateJoin(PLATFORM_CONSTANS.DATE.getMonths(year), '月');
	},
	dateJoin: function (dates, unit) {
		var html = '';
		for (var i = 0, l = dates.length; i < l; i += 1) {
			html += '<li data-value="' + dates[i] + '">' + dates[i] + unit + '</li>'
		}
		return html;
	}
};

/**
 * 字符串格式化日期字符串
 * @param str 需要格式化的字符串
 * @param  format 格式：'FORMAT_CHINA8'、'FORMAT_CHINA14'、'FORMAT_NORMAL8'、'FORMAT_NORMAL12'、'FORMAT_NORMAL14'、'FORMAT_DATA8'、'FORMAT_DATA14'
 * @returns {String}
 */
var formatDateStr = (function () {
    var FORMAT_CHINA8 = ["年","月","日"];
    var FORMAT_CHINA14 = ["年","月","日","时","分","秒"];
    var FORMAT_NORMAL8 = ["-","-",""];
    var FORMAT_NORMAL12 = ["-","-"," ",":"];
    var FORMAT_NORMAL14 = ["-","-"," ",":",":",""];
    var FORMAT_DATA8 = ["/","/",""];
    var FORMAT_DATA14 = ["/","/"," ",":",":",""];

    var handle1 = function (s, f) {
        var FC = null;
        switch (f) {
            case 'FORMAT_CHINA8':
                FC = FORMAT_CHINA8;
                s = s + "00000000";
                s = s.substr(0, 8);
                break;
            case 'FORMAT_CHINA14':
                FC = FORMAT_CHINA14;
                s = s + "00000000000000";
                s = s.substr(0, 14);
                break;
            case 'FORMAT_NORMAL8':
                FC = FORMAT_NORMAL8;
                s = s + "00000000";
                s = s.substr(0, 8);
                break;
            case 'FORMAT_NORMAL12':
                FC = FORMAT_NORMAL12;
                s = s + "000000000000";
                s = s.substr(0, 12);
                break;
            case 'FORMAT_NORMAL14':
                FC = FORMAT_NORMAL14;
                s = s + "00000000000000";
                s = s.substr(0, 14);
                break;
            case 'FORMAT_DATA8':
                FC = FORMAT_DATA8;
                s = s + "00000000";
                s = s.substr(0, 8);
                break;
            case 'FORMAT_DATA14':
                FC = FORMAT_DATA14;
                s = s + "00000000000000";
                s = s.substr(0, 14);
                break;
            default :
                FC = FORMAT_NORMAL8;
                s = s + "00000000";
                s = s.substr(0, 8);
                break;
        }
       return [s, FC]
    };

    var handle2 = function (s, FC) {
        var l = s.length;
        switch (l) {
            case 8:
                s = s.substr(0,4) + FC[0] + s.substr(4,2) + FC[1] + s.substr(6,2) + FC[2];
                break;
            case 12:
                s = s.substr(0,4) + FC[0] + s.substr(4,2) + FC[1] + s.substr(6,2) + FC[2] + s.substr(8,2) + FC[3] + s.substr(10,2);
                break;
            case 14:
                s = s.substr(0,4) + FC[0] + s.substr(4,2) + FC[1] + s.substr(6,2) + FC[2] + s.substr(8,2) + FC[3] + s.substr(10,2) + FC[4] + s.substr(12,2) + FC[5];
                break;
        }
        return s;
    };

    return function (str, format) {
    	format = format || 'FORMAT_NORMAL8'; // 默认
        if (str && str.length > 0) {
            var r = handle1(str, format);
            return handle2(r[0], r[1]);
        }
        return '';
    }
})();

/*******************************************************************
 ***** bootstrap pagination util ***********************************
 *******************************************************************/
/**
 * bootstrap-paginator.js 分页
 * @param elem HTML分页元素jQuery选择器
 * @param total 总记录数
 * @param pageSize 每页记录数
 * @param obj 回调函数绑定的对象
 * @param callBackFn 点击分页的回调函数
 * @param args 回调函数，需要传入的额外参数
 */
function pagination(elem, total, pageSize, obj, callBackFn, args) {
    var $pagination = $(elem);
    
    if($pagination && $.trim($pagination.html()) === '') {
        // var pages = (total % pageSize == 0) ? (total / pageSize) : (parseInt(total / pageSize) + 1);
        var pages = Math.ceil(total / pageSize);

        // 配置选项
        var options = {
            bootstrapMajorVersion: 3,
            alignment: 'center',
            currentPage: 1,
            totalPages: pages,
            onPageClicked: function (event, originalEvent, type, page) {
                originalEvent.preventDefault();
                originalEvent.stopPropagation();

                callBackFn.apply(obj, [page, args]);
            }
        };

        $pagination.bootstrapPaginator(options);
    }
}
/**
 * 分页重置
 * @param elem HTML分页元素jQuery选择器
 */
pagination.clear = function (elem) {
    var $pagination = $(elem);
    $pagination && $pagination.empty();
};

/*******************************************************************
 ***** skycons util ***********************************
 *******************************************************************/
/**
 * 天气ICON
 * @param elem 绘制天气canvas元素ID属性
 * @param weather 天气，例如 '晴'、'云'、'阴'、'风'、'尘'、'雨'、'雪'、'雹'、'雾'、'霾'
 * @returns {Skycons}
 */
var skyconsFactory = (function () {
    var options = {
        color: '#fff',
        "resizeClear": true
    };

    var getSkyconsType = function (w) {
        // CLEAR_DAY 晴
        // CLEAR_NIGHT
        // PARTLY_CLOUDY_DAY
        // PARTLY_CLOUDY_NIGHT
        // CLOUDY 云、阴
        // WIND 风、尘
        // RAIN 雨
        // SNOW 雪
        // FOG 雾、霾
        // SLEET 雹
        var type = Skycons.PARTLY_CLOUDY_DAY;
        switch(w) {
            case '晴' :
                type = Skycons.CLEAR_DAY;
                break;
            case '阴' :
                type = Skycons.CLOUDY;
                break;
            case '云' :
                type = Skycons.CLOUDY;
                break;
            case '风' :
                type = Skycons.WIND;
                break;
            case '尘' :
                type = Skycons.WIND;
                break;
            case '雨' :
                type = Skycons.RAIN;
                break;
            case '雪' :
                type = Skycons.SNOW;
                break;
            case '雹' :
                type = Skycons.SLEET;
                break;
            case '雾' :
                type = Skycons.FOG;
                break;
            case '霾' :
                type = Skycons.FOG;
                break;
            default :
                type = Skycons.PARTLY_CLOUDY_DAY;
                break;
        }
        return type;
    };

    return function (elem, weather) {
        var s = new Skycons(options);
        s.set(elem, getSkyconsType(weather));
        s.play();
        return s;
    }
})();

/*******************************************************************
 ***** comfort util ************************************************
 *******************************************************************/
/**
 * 舒适度工具
 * @type {{getColor, getText, getLevel}}
 */
var comfortUtil = (function () {
    var constants = {
        5: ['舒适', '#23B14D'],
        4: ['较舒适', '#01A2EA'],
        3: ['一般', '#FEF200'],
        2: ['较拥挤', '#EE1B24'],
        1: ['拥挤', '#880018']
    };

    return {
        getColor: function (lev) {
            return constants[lev][1];
        },
        getText: function (lev) {
            return constants[lev][0];
        },
        getLevel: function (value, maxValue) {
            var result = 0;
            var ratio = (value / maxValue).toFixed(4);
            if(ratio <= 0.2) {
                result = 5;
            } else if(ratio <= 0.4) {
                result = 4;
            } else if(ratio <= 0.6) {
                result = 3;
            } else if(ratio <= 0.8) {
                result = 2;
            } else {
                result = 1;
            }
            return [result, ratio * 100];
        }
    }
})();

/*******************************************************************
 ***** echarts util ************************************************
 *******************************************************************/
/**
 * Echarts初始化
 * @param fn 需要用到Echart业务的统一入口方法
 * @param option {theme: 主题, types: 加载图表模块列表，可选值：['bar', 'line', 'pie', 'map', 'gauge']；默认值：['bar', 'line', 'pie']}
 */
var initEcharts = function (fn, option) {
    var that = this,
        theme = (option && option.theme) || 'technology',
        types = (option && option.types) || ['bar', 'line', 'pie'];

    for (var i = 0, l = types.length; i < l; i += 1) {
        types[i] = 'echarts/chart/' + types[i];
    }
    require.config({
       paths: {
            echarts: '../../resource/script/lib/echarts-2.2.7'
        }
    });
    require(
        [
            'echarts',
            'echarts/theme/' + theme
        ].concat(types),
        function(_echart, _theme) {
        	
            // 1.初始化 echartsUtil，绑定到window对象上
            window.echartsUtil = window.echartsUtil || echartsUtilFactory(_echart, _theme);
            // 2.调用统一具体业务
				
            that[fn] && that[fn]();
        }
    );
		
};

/**
 * Echarts工具工厂，返回Echart工具。在Echart初始化时内部调用，并且绑定到window对象上
 * @param _echart
 * @param _theme
 * @returns {{newInstance: Function, showLoading: Function, hideLoading: Function, restore: Function, clear: Function, setOption: Function, getGeoCoord: Function}}
 */
var echartsUtilFactory = function (_echart , _theme) {

    return {
        /**
         * 获取Echart实例
         * @param elem
         * @returns {Echart实例}
         */
        newInstance: function (elem) {
            var chart = _echart.init(document.getElementById(elem), _theme);
            return chart;
        },
        /**
         * Echart实例 - 过渡控制，显示loading
         * @param chart
         * @returns {echartsUtils}
         */
        showLoading: function (chart) {
            chart && chart.showLoading && chart.showLoading();
            return this;
        },
        /**
         * Echart实例 - 过渡控制，隐藏loading
         * @param chart
         * @returns {echartsUtils}
         */
        hideLoading: function (chart) {
            chart && chart.hideLoading && chart.hideLoading();
            return this;
        },
        /**
         * Echart实例 - 还原图表，各种状态均被清除，还原为最初展现时的状态
         * @param chart
         * @returns {echartsUtils}
         */
        restore: function (chart) {
            chart && chart.restore && chart.restore();
            return this;
        },
        /**
         * Echart实例 - 清空绘画内容，清空后实例可用
         * @param chart
         * @returns {echartsUtils}
         */
        clear: function (chart) {
            chart && chart.clear && chart.clear();
            return this;
        },
        /**
         * Echart实例 - 配置图表实例任何可配置选项
         * @param chart
         * @param option
         * @returns {echartsUtils}
         */
        setOption: function (chart, option) {
        	this.hideLoading(chart); // 先hideLoading
            chart && chart.setOption && chart.setOption(option);
            return this;
        },
        /**
         * 获取 GeoCoord
         * @returns {}
         */
        getGeoCoord: function () {
        	return {
        		
        		// 省/直辖市 - 取省会城市
    	        '北京': [116.4551,40.2539],     // 北京市
    	        '天津': [117.4219,39.4189],     // 天津市
    	        '河北': [114.4995, 38.1006],    // 石家庄市
    	        '山西': [112.3352, 37.9413],    // 太原市
    	        '内蒙古': [111.4124, 40.4901],  // 呼和浩特市
    	        '辽宁': [123.1238, 42.1216],    // 沈阳市
    	        '吉林': [125.8154, 44.2584],    // 长春市
    	        '黑龙江': [127.9688, 45.368],   // 哈尔滨市
    	        '上海': [121.4648,31.2891],     // 上海市
    	        '江苏': [118.8062, 31.9208],    // 南京市
    	        '浙江': [119.5313, 29.8773],    // 杭州市
    	        '安徽': [117.29, 32.0581],      // 合肥市
    	        '福建': [119.4543, 25.9222],    // 福州市
    	        '江西': [116.0046, 28.6633],    // 福州市
    	        '山东': [117.1582, 36.8701],    // 济南市
    	        '河南': [113.4668, 34.6234],    // 郑州市
    	        '湖北': [114.3896, 30.6628],    // 武汉市
    	        '湖南': [113.0823, 28.2568],    // 长沙市
    	        '广东': [113.5107, 23.2196],    // 广州市
    	        '广西': [108.479, 23.1152],     // 南宁市
    	        '海南': [110.3893, 19.8516],    // 海口市
    	        '重庆': [107.7539,30.1904],     // 重庆市
    	        '四川': [103.9526, 30.7617],    // 成都市
    	        '贵州': [106.6992, 26.7682],    // 贵阳市
    	        '云南': [102.9199, 25.4663],    // 昆明市
    	        '西藏': [91.1865, 30.1465],     // 拉萨市
    	        '陕西': [109.1162, 34.2004],    //	 西安市
    	        '甘肃': [103.5901, 36.3043],    // 兰州市
    	        '青海': [101.4038, 36.8207],    // 西宁市
    	        '宁夏': [106.3586, 38.1775],    // 银川市
    	        '新疆': [87.9236, 43.5883],      // 乌鲁木齐市
        		// 部分市
        		'上海': [121.4648,31.2891],
                '东莞': [113.8953,22.901],
                '东营': [118.7073,37.5513],
                '中山': [113.4229,22.478],
                '临汾': [111.4783,36.1615],
                '临沂': [118.3118,35.2936],
                '丹东': [124.541,40.4242],
                '丽水': [119.5642,28.1854],
                '乌鲁木齐': [87.9236,43.5883],
                '佛山': [112.8955,23.1097],
                '保定': [115.0488,39.0948],
                '兰州': [103.5901,36.3043],
                '包头': [110.3467,41.4899],
                '北京': [116.4551,40.2539],
                '北海': [109.314,21.6211],
                '南京': [118.8062,31.9208],
                '南宁': [108.479,23.1152],
                '南昌': [116.0046,28.6633],
                '南通': [121.1023,32.1625],
                '厦门': [118.1689,24.6478],
                '台州': [121.1353,28.6688],
                '合肥': [117.29,32.0581],
                '呼和浩特': [111.4124,40.4901],
                '咸阳': [108.4131,34.8706],
                '哈尔滨': [127.9688,45.368],
                '唐山': [118.4766,39.6826],
                '嘉兴': [120.9155,30.6354],
                '大同': [113.7854,39.8035],
                '大连': [122.2229,39.4409],
                '天津': [117.4219,39.4189],
                '太原': [112.3352,37.9413],
                '威海': [121.9482,37.1393],
                '宁波': [121.5967,29.6466],
                '宝鸡': [107.1826,34.3433],
                '宿迁': [118.5535,33.7775],
                '常州': [119.4543,31.5582],
                '广州': [113.5107,23.2196],
                '廊坊': [116.521,39.0509],
                '延安': [109.1052,36.4252],
                '张家口': [115.1477,40.8527],
                '徐州': [117.5208,34.3268],
                '德州': [116.6858,37.2107],
                '惠州': [114.6204,23.1647],
                '成都': [103.9526,30.7617],
                '扬州': [119.4653,32.8162],
                '承德': [117.5757,41.4075],
                '拉萨': [91.1865,30.1465],
                '无锡': [120.3442,31.5527],
                '日照': [119.2786,35.5023],
                '昆明': [102.9199,25.4663],
                '杭州': [119.5313,29.8773],
                '枣庄': [117.323,34.8926],
                '柳州': [109.3799,24.9774],
                '株洲': [113.5327,27.0319],
                '武汉': [114.3896,30.6628],
                '汕头': [117.1692,23.3405],
                '江门': [112.6318,22.1484],
                '沈阳': [123.1238,42.1216],
                '沧州': [116.8286,38.2104],
                '河源': [114.917,23.9722],
                '泉州': [118.3228,25.1147],
                '泰安': [117.0264,36.0516],
                '泰州': [120.0586,32.5525],
                '济南': [117.1582,36.8701],
                '济宁': [116.8286,35.3375],
                '海口': [110.3893,19.8516],
                '淄博': [118.0371,36.6064],
                '淮安': [118.927,33.4039],
                '深圳': [114.5435,22.5439],
                '清远': [112.9175,24.3292],
                '温州': [120.498,27.8119],
                '渭南': [109.7864,35.0299],
                '湖州': [119.8608,30.7782],
                '湘潭': [112.5439,27.7075],
                '滨州': [117.8174,37.4963],
                '潍坊': [119.0918,36.524],
                '烟台': [120.7397,37.5128],
                '玉溪': [101.9312,23.8898],
                '珠海': [113.7305,22.1155],
                '盐城': [120.2234,33.5577],
                '盘锦': [121.9482,41.0449],
                '石家庄': [114.4995,38.1006],
                '福州': [119.4543,25.9222],
                '秦皇岛': [119.2126,40.0232],
                '绍兴': [120.564,29.7565],
                '聊城': [115.9167,36.4032],
                '肇庆': [112.1265,23.5822],
                '舟山': [122.2559,30.2234],
                '苏州': [120.6519,31.3989],
                '莱芜': [117.6526,36.2714],
                '菏泽': [115.6201,35.2057],
                '营口': [122.4316,40.4297],
                '葫芦岛': [120.1575,40.578],
                '衡水': [115.8838,37.7161],
                '衢州': [118.6853,28.8666],
                '西宁': [101.4038,36.8207],
                '西安': [109.1162,34.2004],
                '贵阳': [106.6992,26.7682],
                '连云港': [119.1248,34.552],
                '邢台': [114.8071,37.2821],
                '邯郸': [114.4775,36.535],
                '郑州': [113.4668,34.6234],
                '鄂尔多斯': [108.9734,39.2487],
                '重庆': [107.7539,30.1904],
                '金华': [120.0037,29.1028],
                '铜川': [109.0393,35.1947],
                '银川': [106.3586,38.1775],
                '镇江': [119.4763,31.9702],
                '长春': [125.8154,44.2584],
                '长沙': [113.0823,28.2568],
                '长治': [112.8625,36.4746],
                '阳泉': [113.4778,38.0951],
                '青岛': [120.4651,36.3373],
                '韶关': [113.7964,24.7028],
                '欧洲': [22.033659,51.161626],
                '新/马/泰':  [101.647961,17.665546],
                '韩国': [127.845712,35.42798],
                '台湾': [121.075507,23.687555],
                '中国台湾': [121.075507,23.687555],
                '香港': [113.900561,22.359287],
                '中国香港': [113.900561,22.359287],
                '亚洲其他': [97.674145,56.697144],
                '澳大利亚/新西兰' : [135.351809,-23.910603],
                '港澳': [113.900561,22.359287],
                '美洲': [-103.739461,43.965057],
                '欧洲': [20.773444,50.938758],
                '其他国家': [97.674145,56.697144],
                '日本': [136.750004,35.458092],
                '咸宁': [114.328392,29.846371],
                '吉首': [109.702258,28.266849],
                '凤凰': [109.604738,27.954075],
                '黄石': [115.041984,30.205086],
                '嘉鱼': [113.94474,29.975973],
                '张家界' : [110.483775,29.122225],
                '钟祥': [112.596942,31.174738],
                '罗田': [115.403099,30.788546],
                '安陆' : [113.693988,31.260019],
                '通山': [114.489728,29.612966],
                '宜昌': [111.294696,30.69785],
                '滁州': [118.3382,32.261034],
        	};
        },
        /**
         * 获取 虚拟目的地
         * @returns {}
         */
        getmarkLineDate: function () {
        	return[
				[{name:'包头'},{name:'南京'}],
				[{name:'北海'},{name:'南京'}],
				[{name:'广州'},{name:'南京'}],
				[{name:'郑州'},{name:'南京'}],
				[{name:'长春'},{name:'南京'}],
				[{name:'长治'},{name:'南京'}],
				[{name:'重庆'},{name:'南京'}],
				[{name:'长沙'},{name:'南京'}],
				[{name:'成都'},{name:'南京'}],
				[{name:'常州'},{name:'南京'}],
				[{name:'丹东'},{name:'南京'}],
				[{name:'大连'},{name:'南京'}],
				[{name:'东营'},{name:'南京'}],
				[{name:'延安'},{name:'南京'}],
				[{name:'福州'},{name:'南京'}],
				[{name:'海口'},{name:'南京'}],
				[{name:'呼和浩特'},{name:'南京'}],
				[{name:'合肥'},{name:'南京'}],
				[{name:'杭州'},{name:'南京'}],
				[{name:'哈尔滨'},{name:'南京'}],
				[{name:'舟山'},{name:'南京'}],
				[{name:'银川'},{name:'南京'}],
				[{name:'衢州'},{name:'南京'}],
				[{name:'南昌'},{name:'南京'}],
				[{name:'昆明'},{name:'南京'}],
				[{name:'贵阳'},{name:'南京'}],
				[{name:'兰州'},{name:'南京'}],
				[{name:'拉萨'},{name:'南京'}],
				[{name:'连云港'},{name:'南京'}],
				[{name:'临沂'},{name:'南京'}],
				[{name:'柳州'},{name:'南京'}],
				[{name:'宁波'},{name:'南京'}],
				[{name:'南京'},{name:'南京'}],
				[{name:'南宁'},{name:'南京'}],
				[{name:'南通'},{name:'南京'}],
				[{name:'上海'},{name:'南京'}],
				[{name:'沈阳'},{name:'南京'}],
				[{name:'西安'},{name:'南京'}],
				[{name:'汕头'},{name:'南京'}],
				[{name:'深圳'},{name:'南京'}],
				[{name:'青岛'},{name:'南京'}],
				[{name:'济南'},{name:'南京'}],
				[{name:'太原'},{name:'南京'}],
				[{name:'乌鲁木齐'},{name:'南京'}],
				[{name:'潍坊'},{name:'南京'}],
				[{name:'威海'},{name:'南京'}],
				[{name:'温州'},{name:'南京'}],
				[{name:'武汉'},{name:'南京'}],
				[{name:'无锡'},{name:'南京'}],
				[{name:'厦门'},{name:'南京'}],
				[{name:'西宁'},{name:'南京'}],
				[{name:'徐州'},{name:'南京'}],
				[{name:'烟台'},{name:'南京'}],
				[{name:'盐城'},{name:'南京'}],
				[{name:'珠海'},{name:'南京'}]
			];
        }
    };
};

/**
 * Echarts Lable 格式化
 * @type {{verticalFormat: Function, normalFormat: Function}}
 */
var echartsLabelFormat = {
    verticalFormat: function (value) {
        return this.normalFormat(value, '\n')
    },
    normalFormat: function (value, separate) {
        if (typeof value === 'string') {
            var a = value.split('');
            return a.join(separate);
        }
        return '';
    }
};

/**
 * 页面获取Echart实例（中间层）
 * @param elem
 * @returns
 */
function getChartInstance (elem) {
	this.echarts = this.echarts || {};
	var chart = this.echarts[elem];
	if (chart) {
		echartsUtil.clear(this.echarts[elem]);
	} else {
		chart = echartsUtil.newInstance(elem);
		this.echarts[elem] = chart;
	}
	echartsUtil.showLoading(chart);
    return chart;
}

/*******************************************************************
 ***** gaode util **************************************************
 *******************************************************************/
var myinitMap=function(elem, center, theme){

 theme = theme || 'blue_night';
	var district,_mapObj = new AMap.Map(elem, {
		resizeEnable: true,
		zoom:10,
		center: center //地图中心点
    });
	_mapObj.setMapStyle(theme);
	var districtPolygons = [];

	return {
		/**
		 * 设置主题
		 * @param theme 
		 * normal blue_night light fresh dark
		 */
		setMapStyle: function (theme) {
			_mapObj.setMapStyle(theme);
			return this;
		},
		/**
		 * 添加点标记
		 * @param param {lnglat: [], content: String}
		 */ 
		addMarker: function (param) {
			if (param && param['lnglat']) {
				
				param['icon'] = param['icon'] || '';
				param['offset'] = param['offset'] || [-10, -34];
				
				// 点标记
				var marker = new AMap.Marker({
		            icon: param['icon'],
		            offset: new AMap.Pixel(param['offset'][0], param['offset'][1]),
		            position: param['lnglat']
		        });
			    marker.setMap(_mapObj);
			    
			    // 信息窗体
			    if (param['content']) {
			    	var infoOffset = param['infoOffset'] || [0, -40];
			    	var infoWin = new AMap.InfoWindow({
			    		isCustom: true,
			    		offset: new AMap.Pixel(infoOffset[0], infoOffset[1]),
			    		closeWhenClickMap: true,
			    		autoMove:true
			    	});
				    infoWin.setContent(param['content']);
			        AMap.event.addListener(marker, 'click', function() {
			        	infoWin.open(_mapObj, param['lnglat']);
			        	if(param['isSetCenter']=='0'){
			        	}else{
			        		_mapObj.setCenter(param['lnglat']);
			        	}
			        });
			        if (param['infoOpen']) {
			        	infoWin.open(_mapObj, param['lnglat']);
			        }
			    }
			}
			return this;
		},
		/**
		 * 添加线
		 * @param param []
		 */
		addLine: function (param) {
			if (param && isArray(param)) {
				var polyline = new AMap.Polyline({
			        path: param,          //设置线覆盖物路径
			        strokeColor: "#3366FF", //线颜色
			        strokeOpacity: 1,       //线透明度
			        strokeWeight: 5,        //线宽
			        strokeStyle: "solid",   //线样式
			        strokeDasharray: [10, 5] //补充线样式
			    });
			    polyline.setMap(_mapObj);
			}
		    return this;
		},
		// 实时路况图层
		loadTrafficLayer: function () {
		    var trafficLayer = new AMap.TileLayer.Traffic({
		        zIndex: 10
		    });
		    trafficLayer.setMap(_mapObj);
		    return this;
		},
		// 设置适应
		setFitView: function () {
			_mapObj.setFitView();
			return this;
		},
		setZoom: function (zoom) {
			_mapObj.setZoom(zoom);
			return this;
		},
		setCenter: function (lnglat) {
			_mapObj.setCenter(lnglat);
			return this;
		},
		setZoomAndCenter : function (zoom,lnglat) {
			_mapObj.setZoomAndCenter(zoom,lnglat);
			return this;
		},
		// 清除地图
		clearMap: function () {
			_mapObj.clearMap();
			return this;
		},
		getMap: function () {
			return _mapObj;
		},
		// 行政区
		setDistrict: function () {
			for (var i = 0, l = districtPolygons.length; i < l; i += 1) {
				districtPolygons[i].setMap(_mapObj);
			}
			return this;
		}
	}
};

var initMap = function (elem, center, theme) {
	theme = theme || 'blue_night';
	var district,_mapObj = new AMap.Map(elem, {
		resizeEnable: true,
		zoom:10,
		center: center //地图中心点
    });
	_mapObj.setMapStyle(theme);
	var districtPolygons = [];
	
	//加载行政区划插件
  AMap.service('AMap.DistrictSearch', function() {
  	var opts = {
    	subdistrict: 1,   //返回下一级行政区
      extensions: 'all',  //返回行政区边界坐标组等具体信息
      level: 'city'  //查询行政级别为 市
    };
        //实例化DistrictSearch
        district = new AMap.DistrictSearch(opts);
        district.setLevel('district');
        //行政区查询
        district.search('山西省', function(status, result) {
            var bounds = result.districtList[0].boundaries;
            if (bounds) {
                for (var i = 0, l = bounds.length; i < l; i++) {
                    //生成行政区划polygon
                    var polygon = new AMap.Polygon({
                        map: _mapObj,
                        strokeWeight: 4,
                        path: bounds[i],
                        fillOpacity: 0,
                        fillColor: '#CCF3FF',
                        strokeColor: '#CC66CC'
                    });
                    districtPolygons.push(polygon);
                }
                _mapObj.setFitView();//地图自适应
            }
        });
    });

	
	
	return {
		/**
		 * 设置主题
		 * @param theme 
		 * normal blue_night light fresh dark
		 */
		setMapStyle: function (theme) {
			_mapObj.setMapStyle(theme);
			return this;
		},
		/**
		 * 添加点标记
		 * @param param {lnglat: [], content: String}
		 */ 
		addMarker: function (param) {
			if (param && param['lnglat']) {
				
				param['icon'] = param['icon'] || '';
				param['offset'] = param['offset'] || [-10, -34];
				
				// 点标记
				var marker = new AMap.Marker({
		            icon: param['icon'],
		            offset: new AMap.Pixel(param['offset'][0], param['offset'][1]),
		            position: param['lnglat']
		        });
			    marker.setMap(_mapObj);
			    
			    // 信息窗体
			    if (param['content']) {
			    	var infoOffset = param['infoOffset'] || [0, -40];
			    	var infoWin = new AMap.InfoWindow({
			    		isCustom: true,
			    		offset: new AMap.Pixel(infoOffset[0], infoOffset[1]),
			    		closeWhenClickMap: true,
			    		autoMove:true
			    	});
				    infoWin.setContent(param['content']);
			        AMap.event.addListener(marker, 'click', function() {
			        	infoWin.open(_mapObj, param['lnglat']);
			        	if(param['isSetCenter']=='0'){
			        	}else{
			        		_mapObj.setCenter(param['lnglat']);
			        	}
			        });
			        if (param['infoOpen']) {
			        	infoWin.open(_mapObj, param['lnglat']);
			        }
			    }
			}
			return this;
		},
		/**
		 * 添加线
		 * @param param []
		 */
		addLine: function (param) {
			if (param && isArray(param)) {
				var polyline = new AMap.Polyline({
			        path: param,          //设置线覆盖物路径
			        strokeColor: "#3366FF", //线颜色
			        strokeOpacity: 1,       //线透明度
			        strokeWeight: 5,        //线宽
			        strokeStyle: "solid",   //线样式
			        strokeDasharray: [10, 5] //补充线样式
			    });
			    polyline.setMap(_mapObj);
			}
		    return this;
		},
		// 实时路况图层
		loadTrafficLayer: function () {
		    var trafficLayer = new AMap.TileLayer.Traffic({
		        zIndex: 10
		    });
		    trafficLayer.setMap(_mapObj);
		    return this;
		},
		// 设置适应
		setFitView: function () {
			_mapObj.setFitView();
			return this;
		},
		setZoom: function (zoom) {
			_mapObj.setZoom(zoom);
			return this;
		},
		setCenter: function (lnglat) {
			_mapObj.setCenter(lnglat);
			return this;
		},
		setZoomAndCenter : function (zoom,lnglat) {
			_mapObj.setZoomAndCenter(zoom,lnglat);
			return this;
		},
		// 清除地图
		clearMap: function () {
			_mapObj.clearMap();
			return this;
		},
		getMap: function () {
			return _mapObj;
		},
		// 行政区
		setDistrict: function () {
			for (var i = 0, l = districtPolygons.length; i < l; i += 1) {
				districtPolygons[i].setMap(_mapObj);
			}
			return this;
		}
	}
};

/**
 * 地图信息窗体
 * @param val
 * @returns
 */
var getInfoWindownContent = function (val) {
	
	if (val) {
		var content = '';
		
		if ('logo' in val) {
			content +=	'<div class="dialog-blue2">' +
							'<div class="main">' +
								'<div class="img">' +
									'<img src="' + val.logo + '">' +
								'</div>' +
								'<div class="list">';
			
			if ('name' in val) {
				content += '<p>名称：' + val.name + '</p>';
			}
			if ('level' in val) {
				content += '<p>等级：' + val.level + '</p>';
			}
			if ('type' in val) {
				content += '<p>类型：' + val.type + '</p>';
			}
			if ('businessHours' in val) {
				content += '<p>营业时间：' + val.businessHours + '</p>';
			}
			if ('openingTime' in val) {
				content += '<p>营业时间：' + val.openingTime + '</p>';
			}
			if ('address' in val) {
				content += '<p>地址：' + val.address + '</p>';
			}
			if ('principalName' in val) {
				content += '<p>负责人：' + val.principalName + '</p>';
			}
			if ('principalPhone' in val) {
				content += '<p>电话：' + val.principalPhone + '</p>';
			}
			
			content	+=				'</div>' +
							'</div>' +
						'</div>';
		} else {
			
			if('rtspUrlPc' in val){
			
				content += '<div class="dialog-blue3">' +
							'<div class="main">' +
								'<iframe scrolling="no" src="'+val.rtspUrlPc+'" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" frameborder="0" ></iframe>'+
								
							'</div>'				+
							'<div class="list">';
			}
			if ('name' in val) {
				content += '<p>名称：' + val.name + '</p>';
			}
			if ('businessHours' in val) {
				content += '<p>营业时间：' + val.businessHours + '</p>';
			}
			if ('scenicLevel' in val) {
				content += '<p>星级：' + val.scenicLevel + '</p>';
			}
			if ('billingMethod' in val) {
				content += '<p>收费方式：' + val.billingMethod;
			}
			if ('seats' in val) {
				content += '厕位：' + '男 ' + val.manSeats + 
									'/女 ' + val.womanSeats + 
									'/第三方 ' + val.thirdSeats;
			}
			
			if ('pilesNumber' in val) {
				content += '<p>桩数：' + val.pilesNumber + '</p>';
			}
			if ('principalName' in val) {
				content += '<p>负责人：' + val.principalName + '</p>';
			}
			if ('principalPhone' in val) {
				content += '<p>电话：' + val.principalPhone + '</p>';
			}						
			if ('address' in val) {
				content += '<p>地址：' + val.address + '</p>';
			}	
			content+='<p><a href="trafficMonitor_vlc.html">更多视频</a></p>';
			content +=			'</div>' + 
							'</div>' ;
		}
		return content;
	}
	return '';
};
/**
 * 片区详情
 * @param val
 * @returns
 */
var areaContent = function (areaId) {
	var content="";
	switch(areaId){
	case '320104' ://秦淮全域
		var img=GLOBAL_INFO.REX+"/resource/images/area-qinhuai.png";
		content+="<div class=\"col-zsr-4 row-1\">"+
						"<img src=\""+img+"\" class=\"man\">"+
					"</div>"+
					"<div class=\"col-zsr-8 row-1 viewdetail\" style=\"overflow: hidden;\">"+
						"<ul class=\"list-unstyled viewInfo\" id=\"info\" style=\"margin-top: 0\">"+
							"<li class=\"col-zsr-6\"><span class=\"title\">中文名称：</span>秦淮区</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">外文名称：</span>Qinhuai District</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">下辖地区：</span>12个街道办事处</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">人        口：</span>户籍71.62万，常住103万(2011年)</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">气候条件：</span>亚热带季风季候</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">著名景点：</span>夫子庙、秦淮河、中华门、朝天宫、瞻园、甘熙故居等</li>"+
							"<li style=\"clear: both;\">秦淮区简介：</li>"+
							"<li>"+
								"<p>秦淮区是南京市的中心城区，国家东部地区重要的金融商务中心，华东地区的商贸、信息、文化、旅游中心，南京现代化国际性人文绿都核心区之一。</p>"+
								"<p class=\"rowTwo\">秦淮区因秦淮河贯穿全境而得名，源于民国时期的第三区（门东区）和第四区（门西区）。秦淮区是古都金陵的起源，秦淮文化是金陵文化的精华，有“江南锦绣之邦，金陵风雅之薮”的美称，秦淮民俗民间文化是古老秦淮文化的重要组成部分，是“中国民间文化艺术之乡”。</p>"+
							"</li>"+
						"</ul>"+
					"</div>";
		break;
	case '32010401' ://夫子庙片区
		var img=GLOBAL_INFO.REX+"/resource/images/area-fuzimiao.png";
		content+="<div class=\"col-zsr-4 row-1\">"+
						"<img src=\""+img+"\" class=\"man\">"+
					"</div>"+
					"<div class=\"col-zsr-8 row-1 viewdetail\" style=\"overflow: hidden;\">"+
						"<ul class=\"list-unstyled viewInfo\" id=\"info\" style=\"margin-top: 0\">"+
							"<li class=\"col-zsr-6\"><span class=\"title\">中文名称：</span>南京夫子庙</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">外文名称：</span>Confucius Temple</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">开放时间：</span>全天</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">景点级别：</span>国家5A级旅游景区</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">门票价格：</span> 部分收费</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">著名景点：</span>大成殿、江南贡院、科举博物馆、李香君故居、王导谢安纪念馆、瞻园等</li>"+
							"<li style=\"clear: both;\">秦淮区简介：</li>"+
							"<li>"+
								"<p>南京夫子庙，即南京孔庙，位于南京市秦淮区秦淮河北岸贡院街，为中国古代文化枢纽之地、金陵历史人文荟萃之地，不仅是明清时期南京的文教中心，同时也是居东南各省之冠的文教建筑群，现为夫子庙秦淮风光带重要组成部分。夫子庙由文教中心演变而成的繁华闹市，是中国最大的传统古街市，与上海城隍庙、苏州玄妙观和北京天桥为中国四大闹市。</p>"+
								"<p class=\"rowTwo\">如今人们口中的夫子庙，实际包括夫子庙、学宫和贡院主大建筑群，甚至进一步包括周边瞻园、白鹭洲公园、桃叶渡、东水关遗址公园等景点。</p>"+
							"</li>"+
						"</ul>"+
					"</div>";
		break;
	case '32010402' ://老门东片区
		var img=GLOBAL_INFO.REX+"/resource/images/area-laomengdong.png";
		content+="<div class=\"col-zsr-4 row-1\">"+
						"<img src=\""+img+"\" class=\"man\">"+
					"</div>"+
					"<div class=\"col-zsr-8 row-1 viewdetail\" style=\"overflow: hidden;\">"+
						"<ul class=\"list-unstyled viewInfo\" id=\"info\" style=\"margin-top: 0\">"+
							"<li class=\"col-zsr-6\"><span class=\"title\">中文名称：</span>南京老门东历史文化街区</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">占地面积：</span> 70万平方米</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">开放时间：</span>全天</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">景点级别：</span>国家5A级旅游景区</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">门票价格：</span>免费</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">著名景点：</span>中华门城堡、明城墙、金陵戏坊、上江考棚等</li>"+
							"<li style=\"clear: both;\">秦淮区简介：</li>"+
							"<li>"+
								"<p>老门东，位于南京市秦淮区中华门（古称聚宝门）以东。门东是南京传统民居聚集地，自古就是江南商贾云集、人文荟萃、世家大族居住之地。</p>"+
								"<p class=\"rowTwo\">老门东历史文化街区北起长乐路、南抵明城墙、东至江宁路，总占地面积约70万平方米，开设金陵刻经、南京白局，以及德云社、手制风筝、布画、竹刻、剪纸、提线木偶一类民俗工艺，推出多种南京地区传统美食小吃。</p>"+
							"</li>"+
						"</ul>"+
					"</div>";
		break;
	case '32010403' ://朝天宫片区
		var img=GLOBAL_INFO.REX+"/resource/images/area-chaotiangong.png";
		content+="<div class=\"col-zsr-4 row-1\">"+
						"<img src=\""+img+"\" class=\"man\">"+
					"</div>"+
					"<div class=\"col-zsr-8 row-1 viewdetail\" style=\"overflow: hidden;\">"+
						"<ul class=\"list-unstyled viewInfo\" id=\"info\" style=\"margin-top: 0\">"+
							"<li class=\"col-zsr-6\"><span class=\"title\">中文名称：</span>朝天宫</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">外文名称：</span>Chaotian Palace</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">开放时间：</span>9:00-18:00</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">景点级别：</span>国家AAAA级旅游景区</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">门票价格：</span>25元/人</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">著名景点：</span>“万仞宫墙”照壁、大成殿、奉敕重建朝天宫碑等</li>"+
							"<li style=\"clear: both;\">秦淮区简介：</li>"+
							"<li>"+
								"<p>朝天宫，是江南地区现存建筑等级最高、面积最大、保存最完整的古建筑群。朝天宫之名，系明太祖朱元璋下诏御赐，取“朝拜上天”、“朝见天子”之意。</p>"+
								"<p class=\"rowTwo\">朝天宫所在的冶山是春秋时期吴王夫差修筑的冶城所在地，是南京主城的发源地之一，之后历经沧桑，或为寺院、或为道观、或为学宫。明朝时期，朝天宫是朝廷举行盛典前练习礼仪的场所，以及官僚子弟袭封前学习朝见天子礼仪的地方。1978年辟为南京市博物馆，现已列为全国重点文物保护单位、国家AAAA级旅游景区。</p>"+
							"</li>"+
						"</ul>"+
					"</div>";
		break;
	case '32010404' ://甘熙故居片区
		var img=GLOBAL_INFO.REX+"/resource/images/area-ganxi.png";
		content+="<div class=\"col-zsr-4 row-1\">"+
						"<img src=\""+img+"\" class=\"man\">"+
					"</div>"+
					"<div class=\"col-zsr-8 row-1 viewdetail\" style=\"overflow: hidden;\">"+
						"<ul class=\"list-unstyled viewInfo\" id=\"info\" style=\"margin-top: 0\">"+
							"<li class=\"col-zsr-6\"><span class=\"title\">中文名称：</span>甘熙宅第</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">外文名称：</span>GanXi mansion</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">开放时间：</span>9:00-18:00</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">景点级别：</span>全国重点文物保护单位</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">门票价格：</span>20元/人</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">著名景点：</span>梨园雅韵等</li>"+
							"<li style=\"clear: both;\">秦淮区简介：</li>"+
							"<li>"+
								"<p>甘熙宅第又称甘熙故居或甘家大院，始建于清嘉庆年间，俗称“九十九间半”，是中国最大的私人民宅，与明孝陵、明城墙并称为南京明清三大景观，具有极高的历史、科学和旅游价值，是南京现有面积最大，保存最完整的私人民宅。</p>"+
								"<p class=\"rowTwo\">建筑的布局严格按照封建社会的宗法观念及家族制度而布置，讲究子孙满堂、数代同堂，致使宅第的规模庞大、等级森严，各类用房的位置、装修、面积、造型都具有统一的等级规定。甘熙宅第现已开辟为南京民俗博物馆，2006年列为全国重点文物保护单位。</p>"+
							"</li>"+
						"</ul>"+
					"</div>";
		break;
	default : //默认秦淮全域
		var img=GLOBAL_INFO.REX+"/resource/images/area-qinhuai.png";
		content+="<div class=\"col-zsr-4 row-1\">"+
						"<img src=\""+img+"\" class=\"man\">"+
					"</div>"+
					"<div class=\"col-zsr-8 row-1 viewdetail\" style=\"overflow: hidden;\">"+
						"<ul class=\"list-unstyled viewInfo\" id=\"info\" style=\"margin-top: 0\">"+
							"<li class=\"col-zsr-6\"><span class=\"title\">中文名称：</span>秦淮区</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">外文名称：</span>Qinhuai District</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">下辖地区：</span>12个街道办事处</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">人        口：</span>户籍71.62万，常住103万(2011年)</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">气候条件：</span>亚热带季风季候</li>"+
							"<li class=\"col-zsr-6\"><span class=\"title\">著名景点：</span>夫子庙、秦淮河、中华门、朝天宫、瞻园、甘熙故居等</li>"+
							"<li style=\"clear: both;\">秦淮区简介：</li>"+
							"<li>"+
								"<p>秦淮区是南京市的中心城区，国家东部地区重要的金融商务中心，华东地区的商贸、信息、文化、旅游中心，南京现代化国际性人文绿都核心区之一。</p>"+
								"<p class=\"rowTwo\">秦淮区因秦淮河贯穿全境而得名，源于民国时期的第三区（门东区）和第四区（门西区）。秦淮区是古都金陵的起源，秦淮文化是金陵文化的精华，有“江南锦绣之邦，金陵风雅之薮”的美称，秦淮民俗民间文化是古老秦淮文化的重要组成部分，是“中国民间文化艺术之乡”。</p>"+
							"</li>"+
						"</ul>"+
					"</div>";
		break;
	}
	return content;
};