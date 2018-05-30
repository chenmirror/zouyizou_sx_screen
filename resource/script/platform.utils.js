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
		{id: '320104', cn: '秦淮全域', lnglat: [118.788763,32.020734], 'poster': 'video-placeholder-qihuai'},
		{id: '32010401', cn: '夫子庙景区', lnglat: [118.788815, 32.020729], 'poster': 'video-placeholder-fuzimiao'},
		{id: '32010402', cn: '老门东街区', lnglat: [118.78761, 32.011701], 'poster': 'video-placeholder-mendong'},
		{id: '32010403', cn: '朝天宫景区', lnglat: [118.775271, 32.034339], 'poster': 'video-placeholder-chaotiangong'},
		{id: '32010404', cn: '甘熙故居景区', lnglat: [118.7817, 32.026343], 'poster': 'video-placeholder-ganxi'},
		{id: '32010405', cn: '大报恩寺景区', lnglat: [118.783871, 32.008842], 'poster': 'video-placeholder-dabaoensi'}
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
            case '多云' :
                type = Skycons.CLOUDY;
                break;
            case '阴' :
                type = Skycons.CLOUDY;
                break;
            case '阵雨' :
                type = Skycons.RAIN;
                break;
            case '雷阵雨' :
                type = Skycons.RAIN;
                break;
            case '雨夹雪' :
                type = Skycons.RAIN;
                break;
            case '小雨' :
                type = Skycons.RAIN;
                break;
            case '中雨' :
                type = Skycons.RAIN;
                break;
            case '大雨' :
                type = Skycons.RAIN;
                break;
            case '暴雨' :
                type = Skycons.RAIN;
                break;
            case '大暴雨' :
                type = Skycons.RAIN;
                break;
            case '特大暴雨' :
                type = Skycons.RAIN;
                break;
            case '阵雪' :
                type = Skycons.SNOW;
                break;
            case '小雪' :
                type = Skycons.SNOW;
                break;
            case '中雪' :
                type = Skycons.SNOW;
                break;
            case '大雪' :
                type = Skycons.SNOW;
                break;
            case '暴雪' :
                type = Skycons.SNOW;
                break;
            case '雾' :
                type = Skycons.FOG;
                break;
            case '冻雨' :
                type = Skycons.RAIN;
                break;
            case '沙尘' :
                type = Skycons.WIND;
                break;
            case '小到中雨' :
                type = Skycons.RAIN;
                break;
            case '中到大雨' :
                type = Skycons.RAIN;
                break;
            case '大到暴雨' :
                type = Skycons.RAIN;
            case '暴雨到大暴雨' :
                type = Skycons.RAIN;
                break;
            case '大暴雨到特大暴雨' :
                type = Skycons.RAIN;
                break;
            case '小到中雪' :
                type = Skycons.SNOW;
                break;
            case '中到大雪' :
                type = Skycons.SNOW;
                break;
            case '大到暴雪' :
                type = Skycons.SNOW;
                break;
            case '浮尘' :
                type = Skycons.WIND;
                break;
            case '扬尘' :
                type = Skycons.WIND;
                break;
            case '强沙尘' :
                type = Skycons.WIND;
                break;
            case '雷阵雨伴有冰雹' :
                type = Skycons.SLEET;
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

