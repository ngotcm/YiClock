<yi-clock id="YiClock">
  <div id="theDate">
    <a href="//ngotcm.org/">
      <div id="logo">典鍾網頁版
        <div>ngotcm.org</div>
      </div>
    </a>

    <div id="btYearLess" class="button" onclick={decrase}>&lt;&lt;&lt;</div>
    <div><span id="theYear">{yiClockData.tmpYear}</span>年</div>
    <div id="btYearIncrease" class="button" onclick={incrase}>&gt;&gt;&gt;</div>
    <div id="btLinkNeijing" class="button">內經說解</div>
  </div>

  <div id="theYunQi">
    <div id="wuYun">{yiClockData.wuyun}</div>
    <div id="theTime">{yiClockData.this_day} {yiClockData.this_time}</div>
    <div id="siTian" class="siqi">{yiClockData.show_sitian}</div>
    <div id="zhuQi" class="siqi">{yiClockData.zhuqi}</div>
    <div id="zaiQuan" class="siqi">{yiClockData.show_zaiquan}</div>
    <div id="keQi" class="siqi">{yiClockData.keqi}</div>
    <div id="siqiShow">
      <div id="sitianRotation" class="siqiRotation" style="transform:rotate({rotation('sitian')}deg)"></div>
      <div id="zaiquanRotation" class="siqiRotation" style="transform:rotate({rotation('zaiquan')}deg)"></div>
      <div id="zhuqiRotation" class="siqiRotation" style="transform:rotate({rotation('zhuqi')}deg)"></div>
      <div id="keqiRotation" class="siqiRotation" style="transform:rotate({rotation('keqi')}deg)"></div>
    </div>
  </div>
  <div id="theClock">
    <div class="center"></div>
    <div id="yin-yang"></div>
    <div id="shichenRotation" style="transform:rotate({rotation('shichen')}deg)"></div>
    <div class="maskLayer"></div>
    <div each={yiClockData.clock} id="time{id}" class="time24" style="transform:rotate({rotateV}deg)">
      <div class="timeNum">{id}</div>
      <div if={dizhi} class="dizhi">{dizhi}</div>
      <div if={zangfu} class="zangfu">{zangfu}</div>
      <div if={jingluo} class="jingluo">{jingluo}</div>
      <div if={baguaX} class="bagua"><span class="x">{baguaX}</span><span
          class="h">{baguaH}</span></div>
    </div>
    <div id="miaoRotation" style="transform:rotate({rotation('miao')}deg)"></div>
    <div id="hourRotation" style="transform:rotate({rotation('zhen')}deg)"></div>
  </div>
  <script>
    console.log('this?', this);
    console.log('yi-clock', this.opts);

    this.yiClockData = opts.yiClockData

    rotation(e){
      //console.log('rotation this?',this)
      return this.yiClockData[e + '_rotation']
    }

    var theApp = this

    this.on('mount',function(){
      console.log('yi-clock app mounted.',this);
      $y.start(function (time) {
        //console.log('callback time:',time);
        theApp.yiClockData = time;
        theApp.update()
        /*Object.keys(time).forEach(function (key) {
          if (theApp.yiClockData[key] != time[key])
            theApp.yiClockData[key] = time[key]
          //theApp.update()
        });*/
      });
    })

    incrase (e) {
      $y.changeYear(1,function(time){
        theApp.yiClockData = time;
      })
    }

    decrase(e){
      $y.changeYear(-1,function(time){
        theApp.yiClockData = time;
      })
    }
  </script>
</yi-clock>
