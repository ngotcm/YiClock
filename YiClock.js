﻿/**
 * YiClock is a HTML clock by HTML5 and CSS3 and JS.
 */


var yiClock = (function (window) {
  var tianganNames = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  var dizhiNames = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
  var nianyunNames = ["土太过", "金不及", "水太过", "木不及", "火太过", "土不及", "金太过", "水不及", "木太过", "火不及"];
  var zhuqiKeqiNames = ["少阴君火", "太阴湿土", "少阳相火", "阳明燥金", "太阳寒水", "厥阴风木", "少阴君火", "太阴湿土", "少阳相火", "阳明燥金", "太阳寒水", "厥阴风木"];
  var liluqiJiaodu = {"厥阴风木": 60, "少阴君火": 120, "少阳相火": 180, "太阴湿土": 240, "阳明燥金": 300, "太阳寒水": 0};

  var zhuQiArray = ["厥阴风木", "少阴君火", "少阳相火", "太阴湿土", "阳明燥金", "太阳寒水"];
  var zhuQiJiaoDu = [60, 120, 180, 240, 300, 0];

  var zhuqiOrder = {"厥阴风木": 1, "少阴君火": 2, "少阳相火": 3, "太阴湿土": 4, "阳明燥金": 5, "太阳寒水": 6};
  var keqiOrder = {"少阳相火": 0, "阳明燥金": 1, "太阳寒水": 2, "厥阴风木": 3, "少阴君火": 4, "太阴湿土": 5};

  var keQiArray = ["少阳相火", "阳明燥金", "太阳寒水", "厥阴风木", "少阴君火", "太阴湿土"];
  var keQiJiaoDu = [180, 300, 0, 60, 120, 240];

  var zangfuNames = ['胆', '肝', '肺', '大肠', '胃', '脾', '心', '小肠', '膀胱', '肾', '心包', '三焦'];
  var jingluoNames = ['足少阳', '足厥阴', '手太阴', '手阳明', '足阳明', '足太阴', '手少阴', '手太阳', '足太阳', '足少阴', '手厥阴', '手少阳'];
  var xiantianBaguaNames = ['乾', '巽', '坎', '艮', '坤', '震', '离', '兑'];
  var houtianBaguaNames = ['离', '坤', '兑', '乾', '坎', '艮', '震', '巽'];

  var yiClockTime = {};
  yiClockTime.zhen = {};
  yiClockTime.miao = {};

  var calculated = false;

  function getYunqi(year, month, day) {
    yiClockTime.tmpYear = year;
    var getArr = getZhuQi(year, month, day);
    var nowYear = getArr[0];
    var nowZhuQi = getArr[1];
    yiClockTime.zhuqi = "主气 " + nowZhuQi;
    var getyun = nianyun(nowYear);
    var nowsitian = getyun[1];
    var nowzaiquan = getyun[2];
    yiClockTime.wuyun = getyun[0];
    yiClockTime.show_sitian = nowsitian + " 司天";
    yiClockTime.show_zaiquan = nowzaiquan + " 在泉";
    var nowkeqi = getKeQi(nowZhuQi, nowsitian);
    yiClockTime.keqi = "客气 " + nowkeqi;
    calculated = true;
  }

  /**
   * YiClock generate
   */
  function YiClock() {
    var myDate = new Date();
    var year = yiClockTime.year = myDate.getFullYear();

    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    var hour = myDate.getHours();
    var minute = myDate.getMinutes();
    var second = myDate.getSeconds();
    var shiChen = 360 * (hour + (minute + second / 60) / 60) / 24;
    yiClockTime._rotation = 30 * parseInt((shiChen + 15) / 30, 10);
    yiClockTime.zhen._rotation = shiChen;
    yiClockTime.miao._rotation = second * 6;
    yiClockTime.miao_rotation = second * 6;
    yiClockTime.zhen_rotation = shiChen;
    yiClockTime.shichen_rotation = 30 * parseInt((shiChen + 15) / 30, 10) + 90;
    month = fTime(month);
    day = fTime(day);
    minute = fTime(minute);
    second = fTime(second);
    yiClockTime.this_day = month + "月" + day + "日";
    yiClockTime.this_time = hour + ":" + minute + ":" + second;
    if (!calculated) {
      getYunqi(year, month, day);
    }
  }

  /**
   * Get 年运 数据
   * @param nian
   * @returns {*[]}
   */
  function nianyun(nian) {
    nian = nian * 1;
    var yearGan = tianganNames[(nian + 9956) % 10];
    var yearYun = nianyunNames[(nian + 9956) % 10];
    var yearZhi = dizhiNames[(nian + 9956) % 12];
    var _zhuQi = zhuqiKeqiNames[(nian + 9956) % 12];
    var _KeQi = zhuqiKeqiNames[((nian + 9956) % 12 + 3) % 12];
    var _NianYun = yearGan + yearZhi + "之岁 岁" + yearYun;
    yiClockTime.sitian_rotation = liluqiJiaodu[_zhuQi];
    yiClockTime.zaiquan_rotation = liluqiJiaodu[_KeQi];
    //console.log("yiClock.sitian_rotation = ", yiClockTime.sitian_rotation);//司天针的指向
    //console.log("yiClock.zaiquan_rotation = ", yiClockTime.zaiquan_rotation);//在泉针的指向
    return [_NianYun, _zhuQi, _KeQi];
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
    yiClockTime.zhuqi_rotation = zhuQiJiaoDu[jiaoDuIndex];
    //console.log("yiClock.zhuqi_rotation =", yiClockTime.zhuqi_rotation);
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
    yiClockTime.keqi_rotation = keQiJiaoDu[jiaoDuIndex];
    //console.log("yiClock.keqi_rotation = ", yiClockTime.keqi_rotation);
    return keQiArray[jiaoDuIndex];
  }


  var yiClock = {};
  //var count = 0;

  yiClock.start = function (cb) {
    console.log("Clock started.");
    YiClock();
    cb && cb(yiClockTime);
    var interval = window.setInterval(function () {
      YiClock();
      //count += 1;
      //if (count > 5) clearInterval(interval);
      //console.log('yiClockTime:', yiClockTime);
      cb && cb(yiClockTime);
    }, 1000)
  };


  //format time to,like "02"
  var fTime = function (intTime) {
    return intTime > 9 ? "" + intTime : "0" + intTime;
  };

  yiClock.initClockModule = function () {
    YiClock();
    var clock = [];
    for (var i = 0; i < 24; i++) {
      var shichen = {id: i , rotateV: 360 / 24 * i};
      if (i % 2 === 0) {
        shichen.dizhi = dizhiNames[i / 2];
        shichen.zangfu = zangfuNames[i / 2];
        shichen.jingluo = jingluoNames[i / 2];
      }

      if (i % 3 === 0) {
        shichen.baguaX = xiantianBaguaNames[(i / 3 + 4) % 8]
        shichen.baguaH = houtianBaguaNames[(i / 3 + 4) % 8]
      }

      clock.push(shichen);
    }

    yiClockTime.clock = clock;

    //console.log('shichen ', clock);
    return yiClockTime;
  };

  yiClock.initClock = function (cb) {
    var aTime = $('#time0', '#theClock');
    var theClock = $('#theClock');
    for (var i = 1; i < 24; i++) {
      var rotation = 'rotate(' + 360 / 24 * i + 'deg)';
      var nextTime = aTime.clone().attr('id', 'time' + i).css({'-webkit-transform': rotation, 'transform': rotation});
      nextTime.children('div.timeNum').html(i + 0);
      if (i % 2) {
        $('.dizhi', nextTime).remove();
        $('.zangfu', nextTime).remove();
        $('.jingluo', nextTime).remove();
      } else {
        var number = (i / 2);
        $('.dizhi', nextTime).text(dizhiNames[number]);
        $('.zangfu', nextTime).text(zangfuNames[number]);
        $('.jingluo', nextTime).text(jingluoNames[number]);
      }
      if (i % 3) {
        $('.bagua', nextTime).remove();
      } else {
        var bgIndex = ((i / 3 + 4) % 8);
        $('.bagua .x', nextTime).text(xiantianBaguaNames[bgIndex]);
        $('.bagua .h', nextTime).text(houtianBaguaNames[bgIndex]);
      }
      theClock.append(nextTime);
    }

    YiClock();
    cb(yiClockTime);
  };

  yiClock.changeYear = function (num, cb) {
    var tmpDate = new Date;
    getYunqi(yiClockTime.tmpYear + num, fTime(tmpDate.getMonth() + 1), fTime(tmpDate.getDate()));
    cb(yiClockTime);
  };

  window.yiClock = window.$y = yiClock;

  return yiClock;
})(window);
