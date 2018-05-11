<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en" style="font-size:10px;">

<head>
    <meta charset=UTF-8 "UTF-8">
    <meta name="viewport" id="viewport" content="width=750,user-scalable=no">
    <meta name="screen-orientation" content="portrait">
    <meta name="x5-orientation" content="portrait">
    <title>幸运抽奖</title>
    <!-- <script src="/Public/bigwheel/js/jquery.min.js" tppabs="/Public/bigwheel/js/jquery.min.js"></script> -->
    <script src="/Public/bigwheel/js/init.js"></script>
    <script src="/Public/bigwheel/js/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script src="/Public/bigwheel/js/jQueryRotate.2.2.js" type="text/javascript" charset="utf-8"></script>
    <!-- <script>
        //声明_czc对象:
        var _czc = _czc || [];
        //绑定siteid，请用您的siteid替换下方"数字"部分
                            _czc.push(["_setAccount", "1264042713"]);
            </script> -->
    <link rel="stylesheet" href="/Public/bigwheel/css/reset.css" tppabs="/Public/bigwheel/css/reset.css">
    <style>
    .container {
        width: 750px;
        margin: 0px auto;
        position: relative;
        overflow: hidden;
    }

    .reward_title {
        font-size: 2.6rem!important;
    }
    </style>
    <script>
    var t1 = new Date().getTime();
    </script>
</head>

<body>
    <style>
    * {
        font-family: 微软雅黑;
        letter-spacing: 2px;
    }

    .container {
        width: 750px;
        height: 1772px;
        /*background:url("images/dail/sqb_dail_bg.jpg?a=3") no-repeat center center;*/
        position: relative;
        overflow: hidden;
    }
    /*转盘*/

    .dail {
        position: relative;
        width: 630px;
        margin: 0px auto;
        margin-top: 20px;
    }

    .dail_content {
        position: absolute;
        top: 39px;
        left: 38px;
        /*transition: 0.45s;*/
        /*transition-timing-function: linear;*/
        /*transform: rotate(0deg);*/
    }

    .dail_button {
        position: absolute;
        top: 181px;
        left: 221px;
    }
    /*中奖弹出框*/

    .reward {
        width: 750px;
        height: 1692px;
        background: rgba(0, 0, 0, 0.8);
        position: absolute;
        top: 0px;
        z-index: 20;
        display: none;
    }

    .reward_img {
        display: block;
        position: absolute;
        left: 75px;
    }

    .reward_close {
        position: absolute;
        top: 111px;
        right: 70px;
        overflow: hidden;
    }

    .reward_box {
        position: relative;
    }

    .reward_title {
        width: 322px;
        height: 58px;
        position: absolute;
        left: 216px;
        top: 432px;
        font-size: 3.1rem;
        color: #fff;
        line-height: 58px;
        text-align: center;
    }

    .reward_info {
        width: 480px;
        height: 217px;
        position: absolute;
        top: 575px;
        left: 134px;
    }

    .reward_info img {
        float: left;
        width: 480px;
        height: 217px;
    }

    .rule {
        width: 750px;
        height: 1217px;
        background: rgba(0, 0, 0, 0.8);
        position: fixed;
        top: 0px;
        z-index: 20;
        letter-spacing: 2px;
        display: none;
    }

    .rule_content {
        width: 602px;
        padding: 22px;
        background: linear-gradient(#fd384e, #fe384f);
        margin: 0px auto;
        margin-top: 57px;
        border-radius: 12px;
        position: relative;
    }

    .rule h2 {
        font-size: 3.6rem;
        color: #fff;
        text-align: center;
    }

    .explain {
        color: #fff;
        font-size: 2.4rem;
        line-height: 3rem;
        margin-bottom: 20px;
    }

    .rule_award li {
        font-size: 2.4rem;
        color: #ffea00;
        height: 34px;
        line-height: 34px;
    }

    .rule_statement li {
        font-size: 1.8rem;
        color: #fff;
        line-height: 3rem;
    }

    .imaginary_line {
        border-bottom: 1px dashed #fff;
        width: 314px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .remove_explain {
        font-size: 1.8rem;
        color: #fff;
        line-height: 3rem;
    }

    .rule_colse {
        width: 35px;
        height: 35px;
        border-radius: 35px;
        background: #ad181f;
        position: absolute;
        top: 12px;
        right: 12px;
        font-size: 24px;
        text-indent: 10px;
        line-height: 30px;
        font-weight: bold;
    }

    .rule_colse img {
        float: left;
        width: 35px;
    }

    .my_reward {
        width: 750px;
        height: 1692px;
        background: #f0f0f0;
        position: absolute;
        top: 0px;
        z-index: 20;
        letter-spacing: 2px;
        display: none;
    }

    .my_reward .top {
        height: 60px;
        width: 657px;
        margin: 0px auto;
        background: #fb384e;
        border-radius: 30px;
        margin-top: 14px;
        margin-bottom: 14px;
        line-height: 60px;
        overflow: hidden;
    }

    .top div {
        float: left;
        font-size: 2.5rem;
        color: #fff;
        margin-left: 37px;
    }

    .top_service {
        margin-right: 20px;
    }

    .top img {
        position: relative;
        top: 10px;
    }

    .reward_coupon_img {
        width: 350px;
        height: 176px;
        float: left;
    }

    .reward_coupon_img img {
        display: block;
        float: left;
        margin: 24px;
        width: 288px;
        height: 130px;
    }

    .reward_content {
        width: 353px;
        height: 176px;
        float: left;
    }

    .reward_list {
        overflow: hidden;
    }

    .reward_content h3 {
        font-size: 3rem;
        color: #353535;
        margin-top: 56px;
    }

    .reward_content p {
        font-size: 1.8rem;
        color: #353535;
        margin-top: 20px;
    }

    .reward_list li {
        position: relative;
        overflow: hidden;
        margin-bottom: 3px;
        background: #fff;
    }

    .reward_list li .go {
        position: absolute;
        right: 34px;
        top: 78px;
    }

    .reward_button {
        width: 150px;
        height: 238px;
        position: absolute;
        right: -51px;
        top: -94px;
        transform: rotate(135deg);
    }

    .reward_use {
        width: 562px;
        height: 107px;
        position: absolute;
        top: 903px;
        left: 95px;
    }

    .reward_button {
        width: 150px;
        height: 238px;
        position: absolute;
        right: -51px;
        top: -94px;
        transform: rotate(135deg);
    }

    .reward_coupon_img {
        width: 350px;
        height: 176px;
        float: left;
    }

    .reward_coupon_img img {
        display: block;
        float: left;
        margin: 24px;
        width: 288px;
        height: 130px;
    }

    .reward_content {
        width: 353px;
        height: 176px;
        float: left;
    }

    .reward_list {
        overflow: hidden;
    }

    .reward_content h3 {
        font-size: 3rem;
        color: #353535;
        margin-top: 56px;
    }

    .reward_content p {
        font-size: 1.8rem;
        color: #353535;
        margin-top: 20px;
    }

    .reward_list li {
        position: relative;
        overflow: hidden;
        margin-bottom: 3px;
        background: #fff;
    }

    .reward_list li .go {
        position: absolute;
        right: 34px;
        top: 78px;
    }

    .reward_button {
        width: 150px;
        height: 238px;
        position: absolute;
        right: -51px;
        top: -94px;
        transform: rotate(135deg);
    }

    .reward_use {
        width: 562px;
        height: 107px;
        position: absolute;
        top: 903px;
        left: 95px;
    }

    .back {
        height: 70px;
        background: #fff;
        overflow: hidden;
    }

    .back>div {
        width: 70px;
        height: 70px;
        overflow: hidden;
    }

    .back>div>img {
        width: 30px;
        transform: rotate(180deg);
        display: block;
        margin-top: 10px;
        margin-left: 15px;
    }

    .dail_entity {
        width: 682px;
        height: 681px;
        position: relative;
    }

    .dail_specifc,
    .dail_annulus {
        position: absolute;
        transition: 0.45s;
        transition-timing-function: linear;
    }

    .state {
        margin-top: 20px;
    }

    .draw_list {
        margin-top: 20px;
    }

    .draw_list h3,
    .state h3 {
        font-size: 3rem;
        color: #fdeccd;
        text-align: center;
        margin-bottom: 22px;
    }

    .state p {
        font-size: 1.7rem;
        color: #fdeccd;
        line-height: 2.2rem;
        padding: 0px 63px;
        margin-bottom: 10px;
    }
    /*中奖名单*/

    .list {
        width: 495px;
        height: 191px;
        margin: 0px auto;
        border: 1px solid #798aeb;
        padding-top: 5px;
    }

    .list li {
        font-size: 2rem;
        color: #f8444c;
        text-align: center;
        line-height: 36px;
    }

    .surplus {
        width: 292px;
        height: 58px;
        margin: 10px auto;
        border-radius: 30px;
        font-size: 2.8rem;
        color: #fff2c7;
        text-align: center;
        line-height: 58px;
        margin-bottom: 20px;
        margin-top: 305px;
    }

    .code {
        width: 200px;
        height: 30px;
        position: absolute;
        top: 668px;
        left: 235px;
        font-size: 2.1rem;
        line-height: 30px;
        color: #f8e17c;
    }
    /*小财神*/

    .xcs_box {
        display: none;
    }

    @keyframes sash_button {
        from {
            transform: rotateY(0deg);
        }
        to {
            transform: rotateY(720deg);
        }
    }

    .sash_button {
        position: absolute;
        top: 872px;
        left: 291px;
        animation: sash_button 2s;
        animation-delay: 0.5s;
    }

    @keyframes xcs_right {
        from {
            left: 0px;
        }
        to {
            left: 1100px;
        }
    }

    .xcs_right {
        display: block;
        position: absolute;
        top: 300px;
        z-index: 10;
        left: -300px;
        animation: xcs_right 2s;
        animation-fill-mode: forwards;
        animation-delay: 2s;
        animation-timing-function: linear;
    }

    @keyframes xcs_left {
        from {
            left: 1100px;
        }
        to {
            left: -300px;
        }
    }

    .xcs_left {
        display: block;
        position: absolute;
        top: 800px;
        z-index: 20;
        animation: xcs_left 2s;
        animation-fill-mode: forwards;
        animation-timing-function: linear;
    }

    .xcs_left img,
    .xcs_right img,
    .xcs_ult img {
        width: 250px;
    }

    @keyframes xcs_ult {
        0% {
            left: 600px;
        }
        100% {
            left: 500px;
        }
    }

    .xcs_ult {
        display: block;
        position: absolute;
        top: 163px;
        left: 1100px;
        z-index: 20;
        animation: xcs_ult 2s;
        animation-fill-mode: forwards;
        animation-delay: 4.5s;
        animation-timing-function: linear;
    }

    @keyframes xcs_ult_img {
        0% {
            width: 250px;
            right: -250px;
            top: 0px;
        }
        100% {
            width: 150px;
            right: -244px;
            top: 172px;
        }
    }

    .xcs_ult img {
        width: 250px;
        right: -250px;
        top: 0px;
        animation: xcs_ult_img 2s;
        animation-fill-mode: forwards;
        animation-delay: 7s;
        animation-timing-function: linear;
        position: absolute;
    }

    .foot_statement {
        height: 40px;
        font-size: 2rem;
        line-height: 40px;
        color: #fff;
        margin-top: 20px;
        text-align: center;
    }
    </style>
    <link rel="stylesheet" href="/Public/bigwheel/css/liMarquee.css">
    <input type="hidden" name="CHANNEL_MAP_ID" value="<?php echo ($CHANNEL_MAP_ID); ?>">
    <div class="container" style="background:url('/Public/bigwheel/images/sqb_dail_bg3.jpg') no-repeat center center;">
        <div class="surplus">今日剩余 :&nbsp;<span>0</span>次</div>
        <section class="dail">
            <img class="annulus" src="/Public/bigwheel/images/sqb_annulus2.png">
            <img id="outer" class="dail_content" src="/Public/bigwheel/images/dail_content114.png">
            <img class="dail_button" id="inner" src="/Public/bigwheel/images/sqb_dail_button2.png">
        </section>
        <section class="draw_list" id="demo">
            <h3>中奖名单</h3>
            <ul class="list" id="demo1" style="border: 3px solid #f8cf9b;background: #fff2c7;">
                <li>恭喜137****6548获得88元微信红包</li>
                <li>恭喜158****7558获得100元话费充值卡</li>
                <li>恭喜137****2311获得面值200元京东卡</li>
                <li>恭喜152****6252获得40000元免息借款</li>
                <li>恭喜187****8544获得88元微信红包</li>
                <li>恭喜137****6548获得面值200元京东卡</li>
                <li>恭喜158****7558获得40000元免息借款</li>
                <li>恭喜137****2311获得面值200元京东卡</li>
                <li>恭喜152****6252获得40000元免息借款</li>
                <li>恭喜187****8544获得88元微信红包</li>
            </ul>
        </section>
        <section class="state">
            <h3>活动说明</h3>
            <p>1.实物类奖品请将在活动结束后5-10个工作日安排发货，请耐心等待</p>
            <p>2.优惠券类奖品的使用规则详见每个优惠券的介绍页</p>
            <p>3.请兑换后仔细阅读使用流程，如有疑问可直接联系客服专线： 020-85289927或客服QQ：2269854010（工作日10:00-18:00）
            </p>
            <p>4.通过非法途径获得奖品的，主办方有权不提供奖品，如有必要，将采 取法律途径维权。
            </p>
        </section>
        <div class="reward">
            <div class="reward_box">
                <img class="reward_img" src="/Public/bigwheel/images/reward.png">
                <img class="reward_close" src="/Public/bigwheel/images/close.png">
                <div class="reward_title"></div>
                <div class="reward_info reward_use_link">
                    <img src="" alt="">
                </div>
            </div>
            <div class="code"></div>
            <div class="reward_use reward_use_link"></div>
        </div>
        <div class="my_reward">
            <div class="back">
                <div>
                    <img src="/Public/bigwheel/images/go.png" tppabs="/Public/bigwheel/images/go.png" alt="">
                </div>
            </div>
            <div class="top">
                <div class="top_service">客服：<img src="/Public/bigwheel/images/qq.png" tppabs="/Public/bigwheel/images/qq.png" alt=""> 2269854010</div>
                <div class=""><img src="/Public/bigwheel/images/phone.png" tppabs="/Public/bigwheel/images/phone.png" alt=""> 020-85289927</div>
            </div>
            <ul class="reward_list">
            </ul>
        </div>
        <div class="reward_button"></div>
        <div class="xcs_box">
            <a class="xcs_left" href="">
            <img src="/Public/bigwheel/images/xcs_left.gif" tppabs="/Public/bigwheel/images/dail/s11/xcs_left.gif" alt="">
        </a>
            <a class="xcs_right" href="">
            <img src="/Public/bigwheel/images/xcs_right.gif" tppabs="/Public/bigwheel/images/dail/s11/xcs_right.gif" alt="">
        </a>
            <a class="xcs_ult" href="">
            <img src="/Public/bigwheel/images/xcs_left.gif" tppabs="/Public/bigwheel/images/dail/s11/xcs_left.gif" alt="">
        </a>
        </div>
    </div>
    <script src="/Public/bigwheel/js/jquery.liMarquee.js" tppabs="/Public/bigwheel/plugin/lmarquee/jquery.liMarquee.js"></script>

<!-- <script src="/Public/bigwheel/js/clipboard.min.js" tppabs="/Public/bigwheel/js/clipboard.min.js"></script> -->
</body>
<script type="text/javascript">
var dataObj = [0, 60, 120, 180, 240, 300];
$(function() {
	$(function(){
        $('.list').liMarquee({'direction':'up', 'scrollamount':'20', 'scrolldelay':'1000', 'hoverstop':false});
    });

	// 抽奖次数
    var draw_num = "3";
    // 默认旋转圈数
    var circle = 3;
    // 旋转的角度
    var deg = 120;
    // 抽奖开关
    var is_shade = true;
    // 初始转盘边框角度
    var deg_annulus = 0;
    // 中奖表id
    var prize_id;
    var data_num;
    //访问地址
    var http = 'bigfinance.yomibank.com';
    // 抽奖次数
    var myDate = new Date();
    var day = myDate.toLocaleDateString()
    var timestamp = Date.parse(new Date()) / 1000;

    if( localStorage.getItem('day114') != day ){

        // 更新缓存的天数
        localStorage.setItem('day114', day)

        // 抽奖次数
        localStorage.setItem('draw_num114', draw_num)

        // 今天已经抽中的奖券
        localStorage.setItem('coupon_idlist', '')

        // 今天是否已经登记，如果是，则为pv，如果没，则为uv
        localStorage.setItem('uv114', '1')

        // 登记uv登记时间
        localStorage.setItem('uv114_lasttime', timestamp)

    }

    if( timestamp - localStorage.getItem('uv114_lasttime') > 60 ){
        localStorage.setItem('uv114_lasttime', timestamp)
        localStorage.setItem('uv114', '1')
    }

    // 如果抽奖次数为0，则重置抽奖次数
    if( localStorage.getItem('draw_num114') == 0 ){
        localStorage.setItem('draw_num114', draw_num)
        localStorage.setItem('coupon_idlist', '')
        $('.surplus span').text(localStorage.getItem('draw_num114'));
    }

    // 判断是否符合第几次弹框的事件
    function sash(){
                                }
    sash()

    $('.surplus span').text(localStorage.getItem('draw_num114'));

    $('.dail_button').click(function (){

        function shade(e) {

            $('.dail_content').css('transition', '2s')

            var random = 0

            // 判断是否可以抽奖
            if (localStorage.getItem('draw_num114') <= 0) {
                is_shade = false
                alert('抽奖次数已经没了哦')
            }

            if (is_shade) {

                // 关闭转盘开关
                is_shade = false

                // 判断手机系统
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

                if( isAndroid ){
                    system = 3
                } else if( isiOS ) {
                    system = 2
                } else {
                    system = 2
                }

                var channel = $("input[name='CHANNEL_MAP_ID']").val()
                // 获取中奖奖券
                url = "act?a=" + Math.random();
                data = {draw_num : localStorage.getItem('draw_num114'), system : system, coupon_idlist: localStorage.getItem('coupon_idlist'),'CHANNEL_MAP_ID':channel}
                console.log(url)
                console.log(data)

                //减去抽奖次数
                draw_num = parseInt(localStorage.getItem('draw_num114'))
                draw_num -= 1
                localStorage.setItem('draw_num114', draw_num)
                $('.surplus span').text(draw_num);

                $.post(url, data, function (data){
                    console.log(data)
                    var e2 = $.parseJSON(data);

                    data_num = e2.position
                    couponid = e2.id
                    // 获取抽中的奖券id，存在session
                    if( localStorage.getItem('coupon_idlist') ){

                        // 存入本地
                        rew_list = localStorage.getItem('coupon_idlist') + ',' + e2.id
                        localStorage.setItem('coupon_idlist', rew_list)

                    } else {

                        localStorage.setItem('coupon_idlist', e2.id)

                    }

                    // 记录到服务器
                    // var url = https + "api_user_coupon_add"
                    // var data = {'_token' : 'E9gHdzYiGa8uStBmAfTqwi0V304W80curyeBhLWk', visitorid : localStorage.getItem('visitorid114'), activity_id : activity_id, couponid : e2.id}

                    // $.post(url, data, function (e){

                        // can_id = e.anco_id
                        // prize_id = e.aup_id

                        e = 1

                        // 获取抽奖券记录id，存在session
                        if( localStorage.getItem('reward_list') != null ){

                            // 存入本地
                            rew_list = localStorage.getItem('reward_list') + ',' + e
                            localStorage.setItem('reward_list', rew_list)

                        } else {

                            localStorage.setItem('reward_list', e)

                        }

                    // }, 'json')

                    // 转的圈数
                    deg =   360 * circle
                    circle += 3

                    //    28~-27为第一个 50元现金红包
                    //    -30~-86为第二个 iphone8
                    //    -90~-148为第三个 ipadpro
                    //    -151~-209为第四个 超级福利包
                    //    -214~270为第五个 100万意外险
                    //    -274~27为第6个 免费英语课程

                    // 判断中的哪个，然后对准度数
                    // console.log(parseInt(data_num)-1)
                    switch(parseInt(data_num)-1){
                        case 0:
                            random = random_num(26,-32)
                            random = -20
                            break;
                        case 1:
                            random = random_num(-34,-93)
                            random = -52
                            break;
                        case 2:
                            random = random_num(-95,-153)
                            random = -91
                            break;
                        case 3:
                            random = random_num(-155,-212)
                            random = -168
                            break;
                        case 4:
                            random = random_num(-214,272)
                            random = -221
                            break;
                        case 5:
                            random = random_num(-274,28)
                            random = -280
                            break;
                        case 6:
                            random = random_num(-242,100)
                            random = -280
                            break;
                    }

                    // 拼接角度
                    deg += random
                    deg_annulus = parseInt(deg_annulus) - 360
                    deg_str = 'rotate(' + deg + 'deg)'
                    deg_annulus_str = 'rotate(' + deg_annulus + 'deg)'

//                    $('.dail_specifc').css('transform', deg_str);
//                    $('.dail_annulus').css('transform', deg_annulus_str);

                    $('.dail_content').css('transform', deg_str);

                    // 修改弹出框信息
                    if(e2.link == '##'){
                        $('.reward_img').attr('src', 'https://static.cdn.topeffects.cn/images/reward2.png')
                    }else{
                        $('.reward_img').attr('src', 'https://static.cdn.topeffects.cn/images/reward.png')
                    }

                    $('.reward_info>img').attr('src', e2.imgurl)
                    $('.reward_title').text(e2.title)
                    $('.reward_use_link').attr('href', e2.link)
                    $('.reward_use_link').attr('prize_id', prize_id)

                    // 领奖触发事件
                    $('.reward_use_link').click(function (e){

                        // 避免重复点击
                        timestamp = Date.parse(new Date()) / 1000;
                        if( timestamp - localStorage.getItem('click_time') > 3 ){
                            localStorage.setItem('click_time', timestamp)
                        } else {
                            return false;
                        }

                        // 领奖后台记录
                        re_link = $(this).attr('href')
                        prize = prize_id
                        // url = https + "api_user_coupon_prize"
                        // data = {'_token' : 'E9gHdzYiGa8uStBmAfTqwi0V304W80curyeBhLWk', prize_id : prize, activity_id : activity_id, couponid : couponid }

                        // 领奖友盟统计
                        // _czc.push(["_trackEvent",'领奖按钮114',$('.reward_title').text()]);

                        // $.post(url, data, function (e){

                            // 否则跳到用户链接
                            location.href = re_link

                        }, 'json')

                    })

                    setTimeout(function (e){

                        //重置抽奖开关
                        is_shade = true

                        // 显示中奖弹出框
                        $('.reward').show()

                        
                    }, 2500)

                // }, 'json')

            }
        }
        shade()

    })
    //    关闭中奖提醒
    $('.reward_close').click(function (e) {

        $('.reward').hide()

        sash()
    })
    

    

    
});

function getRandom(min, max) {
    //x上限，y下限   
    var x = max;
    var y = min;
    if (x < y) {
        x = min;
        y = max;
    }
    var rand = parseInt(Math.random() * (x - y + 1) + y);
    return rand;
}
</script>

</html>