/**
 * YiClock is a HTML clock by HTML5 and CSS3 and JS.
 */


var yiClock = (function(window) {
    var tianGan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
    var diZhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
    var nianYun = ["土太过", "金不及", "水太过", "木不及", "火太过", "土不及", "金太过", "水不及", "木太过", "火不及"];
    var _loc5 = ["少阴君火", "太阴湿土", "少阳相火", "阳明燥金", "太阳寒水", "厥阴风木", "少阴君火", "太阴湿土", "少阳相火", "阳明燥金", "太阳寒水", "厥阴风木"];
    var _loc13 = ["厥阴风木", "少阴君火", "少阳相火", "太阴湿土", "阳明燥金", "太阳寒水"];
    var liuQi = {"厥阴风木":60,"少阴君火":120,"少阳相火":180,"太阴湿土":240,"阳明燥金":300,"太阳寒水":0};

    var zhuQiArray = ["厥阴风木", "少阴君火", "少阳相火", "太阴湿土", "阳明燥金", "太阳寒水"];
    var zhuQiJiaoDu = [60, 120, 180, 240, 300, 0];

    var zhuqiOrder = {"厥阴风木":1,"少阴君火":2,"少阳相火":3,"太阴湿土":4,"阳明燥金":5,"太阳寒水":6};
    var keqiOrder = {"少阳相火":0,"阳明燥金":1,"太阳寒水":2,"厥阴风木":3,"少阴君火":4,"太阴湿土":5};

    var keQiArray = ["少阳相火", "阳明燥金", "太阳寒水", "厥阴风木", "少阴君火", "太阴湿土"];
    var keQiJiaoDu = [180, 300, 0, 60, 120, 240];

    var YiClockTime = {};
    YiClockTime.zhen = {};
    YiClockTime.miao = {};

    var calculated = false;

    /**
     * YiClock generate
     */
    function YiClock() {
        var myDate = new Date();
        var year = YiClockTime.year = myDate.getFullYear();

        var month = myDate.getMonth() + 1;
        var day = myDate.getDate();
        var hour = myDate.getHours();
        var minute = myDate.getMinutes();
        var second = myDate.getSeconds();
        var shiChen = 360 * (hour + (minute + second / 60) / 60) / 24;
        YiClockTime._rotation = 30 * parseInt((shiChen + 15) / 30, 10);
        YiClockTime.zhen._rotation = shiChen;
        YiClockTime.miao._rotation = second * 6;
        month = fTime(month);
        day = fTime(day);
        minute = fTime(minute);
        second = fTime(second);
        YiClockTime.this_day = month + "月" + day + "日";
        YiClockTime.this_time = hour + ":" + minute + ":" + second;
        if (!calculated) {
            var getArr = getZhuQi(year, month, day);
            var nowYear = getArr[0];
            var nowZhuQi = getArr[1];
            YiClockTime.zhuqi = "主气 " + nowZhuQi;
            var getyun = nianyun(nowYear);
            var nowsitian = getyun[1];
            var nowzaiquan = getyun[2];
            YiClockTime.wuyun = getyun[0];
            YiClockTime.show_sitian = nowsitian + " 司天";
            YiClockTime.show_zaiquan = nowzaiquan + " 在泉";
            var nowkeqi = getKeQi(nowZhuQi, nowsitian);
            YiClockTime.keqi = "客气 " + nowkeqi;
            calculated = true;
        }
    }

    function nianyun(nian) {
        var yearGan = tianGan[(nian + 9956) % 10];
        var yearYun = nianYun[(nian + 9956) % 10];
        var yearZhi = diZhi[(nian + 9956) % 12];
        var _zhuQi = _loc5[(nian + 9956) % 12];
        var _KeQi = _loc5[((nian + 9956) % 12 + 3) % 12];
        var _NianYun = yearGan + yearZhi + "之岁 岁" + yearYun;
        //zkshow.zhen_sitian._rotation = _loc1[_loc3];      //司天针的指向
        //zkshow.zhen_zaiquan._rotation = _loc1[_loc4];     //在泉针的指向
        console.log("zkshow.zhen_sitian._rotation = ", liuQi[_zhuQi]);
        console.log("zkshow.zhen_zaiquan._rotation = ", liuQi[_KeQi]);
        return ([_NianYun, _zhuQi, _KeQi]);
    }


    /**
     * get ZhuQi
     * @param year  year
     * @param yue   month
     * @param ri    day
     */
    function getZhuQi(year, yue, ri) {

        var jieQiTemp = new Date(year, 1, 21);
        var daHan = jieQiTemp.getTime();
        jieQiTemp = new Date(year, 3, 21);
        var chunFen = jieQiTemp.getTime();
        jieQiTemp = new Date(year, 5, 21);
        var xiaoMan = jieQiTemp.getTime();
        jieQiTemp = new Date(year, 7, 22);
        var xiaZhi = jieQiTemp.getTime();
        jieQiTemp = new Date(year, 9, 22);
        var qiuFen = jieQiTemp.getTime();
        jieQiTemp = new Date(year, 11, 22);
        var xiaoXue = jieQiTemp.getTime();
        var now = new Date(year, yue, ri);
        var jiaoDuIndex = 0;
        if (now < daHan) {
            year -= 1;
            jiaoDuIndex = 5;
        }
        else {
            if (now >= daHan && now < chunFen) {
                jiaoDuIndex = 0;
            }
            if (now >= chunFen && now < xiaoMan) {
                jiaoDuIndex = 1;
            }
            if (now >= xiaoMan && now < xiaZhi) {
                jiaoDuIndex = 2;
            }
            if (now >= xiaZhi && now < qiuFen) {
                jiaoDuIndex = 3;
            }
            if (now >= qiuFen && now < xiaoXue) {
                jiaoDuIndex = 4;
            }
            if (now >= xiaoXue) {
                jiaoDuIndex = 5;
            }
        }
        console.log("zkshow.zqzhen._rotation =", zhuQiJiaoDu[jiaoDuIndex]);
        return ([year, zhuQiArray[jiaoDuIndex]]);
    }


    /**
     * get 客气
     * @param zhuQi ZhuQi 主气
     * @param siTian SiTian 司天
     */
    function getKeQi(zhuQi, siTian) {
        var jiaoDuIndex = zhuqiOrder[zhuQi] - 3 + keqiOrder[siTian];
        if (jiaoDuIndex < 0) {
            jiaoDuIndex = 6 + jiaoDuIndex;
        }
        if (jiaoDuIndex > 5) {
            jiaoDuIndex = jiaoDuIndex - 6;
        }
        console.log("zkshow.kqzhen._rotation = ", keQiJiaoDu[jiaoDuIndex]);
        return (keQiArray[jiaoDuIndex]);
    }


    var yiClock = {};

    yiClock.start = function(cb) {
        console.log("Clock started.");
        YiClock();
        cb(YiClockTime);
        window.setInterval(function() {
            YiClock();
            cb(YiClockTime);
        }, 1000)
    };


    //format time to,like "02"
    var fTime = function (intTime) {
        return intTime > 9 ? "" + intTime : "0" + intTime;
    };

    window.yiClock = window.$y = yiClock;

    return yiClock;
})(window);









