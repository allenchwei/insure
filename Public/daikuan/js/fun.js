function set_cookie(cishu, num) {
    var curDate = new Date();
    //当前时间戳
    var curTamp = curDate.getTime();
    //当日凌晨的时间戳,减去一毫秒是为了防止后续得到的时间不会达到00:00:00的状态
    var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;
    //当日已经过去的时间（毫秒）
    var passedTamp = curTamp - curWeeHours;
    //当日剩余时间
    var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
    var leftTime = new Date();
    leftTime.setTime(leftTamp + curTamp);
    //替换成分钟数如果为60分钟则为 60 * 60 *1000
    $.cookie("cishu_c_" + num, cishu, {
        path: '/',//cookie的作用域
        expires: leftTime
    });
}

function set_mobile_cookie(ads, newads) {
    if (!ads) {
        ads = '';
    } else {
        ads = ads + ','
    }
    var curDate = new Date();
    //当前时间戳
    var curTamp = curDate.getTime();
    //当日凌晨的时间戳,减去一毫秒是为了防止后续得到的时间不会达到00:00:00的状态
    var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;
    //当日已经过去的时间（毫秒）
    var passedTamp = curTamp - curWeeHours;
    //当日剩余时间
    var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
    var leftTime = new Date();
    leftTime.setTime(leftTamp + curTamp);
    //替换成分钟数如果为60分钟则为 60 * 60 *1000
    $.cookie("mobile", ads + newads, {
        path: '/',//cookie的作用域
        expires: leftTime
    });
}
function IsPC() {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        //alert(navigator.userAgent);
        return "ios";
    } else if (/(Android)/i.test(navigator.userAgent)) {
        //alert(navigator.userAgent);
        window.location.href ="http://kyzp.dsh178.com/style/js/Android.html";
        return "android";
    } else {
        return "pc";
    }
}