function check(e) {
    var a = $(e).children("input").prop("checked"), t = $(e).children("span");
    a ? t.css("background-position", "left") : position_right = t.css("background-position", "right")
}
function show(e) {
    popup.open({type: 2, content: $("#" + e), height: 400})
}
function getData() {
    return {
        name: $("input[name = 'name']").val(),
        mobile: $("input[name = 'mobile']").val(),
        workCity: $("select[name='workCity'] option:selected").val(),
        idCard: $("input[name = 'idCard']").val(),
        isAgree: $("input[name='isAgree']")[0].checked,
        captcha: $("input[name='captcha']").val(),
        _d: (new Date).getTime(),
        activityId: init.activityId,
        channelId: init.channelId,
        uid: init.userCode,
        monthlySalary: $("input[name='monthlySalary']:checked").val(),
        payDayWay: $("input[name='payDayWay']:checked").val(),
        workIdentity: $("input[name='workIdentity']:checked").val(),
        property: $("input[name='property']:checked").val(),
        welfare: $("input[name='welfare']:checked").val(),
        isCreditCard: $("input[name='isCreditCard']:checked").val(),
        isCommercialInsurance: $("input[name='isCommercialInsurance']:checked").val(),
        loanAomunt: $("select[name='loanAomunt'] option:selected").val(),
        isInsurance: $("input[name='isInsurance']")[0].checked
    }
}
function v_birth_day() {
    var e = $("input[name='birth']").val(), a = (new Date).getFullYear() - e.split("-")[0];
    if (a < 15)throw new Error("骞撮緞涓嶈兘灏忎簬15宀�!")
}
function v_birth_day_idCard() {
    var e = $("input[name='idCard']").val();
    if (getBirth(e) < 25)throw showNew({content: $("#hint")})
}
function showNew(e) {
    popup.open({
        type: 1,
        content: e.content,
        style: "width:90%;max-width:500px;min-width:300px;background-color:#fff;border-radius: 6px 6px 6px 6px;padding:0;"
    })
}
function v_check(e) {
    var a = getData();
    switch (e) {
        case 1:
            if (v_name(), v_id_card(), v_birth_day_idCard(), !a.loanAomunt)throw new Error("璇烽€夋嫨璐锋閲戦!");
            if (v_mobile(), v_captcha(), !a.isAgree)throw new Error("璇风‘璁や簡瑙ｇ敤鎴峰崗璁�");
            break;
        case 2:
            if (!a.monthlySalary)throw new Error("璇烽€夋嫨鏈堟敹鍏�!");
            if (!a.payDayWay)throw new Error("璇烽€夋嫨鍙戣柂鏂瑰紡!");
            if (!a.workIdentity)throw new Error("璇烽€夋嫨鑱屼笟绫诲瀷!");
            if (!a.property)throw new Error("璇烽€夋嫨璧勪骇鎯呭喌");
            if (!a.isCreditCard)throw new Error("璇烽€夋嫨淇＄敤鎯呭喌!");
            if (!a.welfare)throw new Error("鍏Н閲戝強绀句繚缂寸撼鎯呭喌!");
            if (!a.isCommercialInsurance)throw new Error("璇烽€夋嫨瀵块櫓淇濆崟!")
    }
}
function getRequest() {
    var e = window.location.search, a = new Object;
    if (e.indexOf("?") != -1) {
        var t = e.substr(1);
        strs = t.split("&");
        for (var r = 0; r < strs.length; r++)a[strs[r].split("=")[0]] = decodeURI(strs[r].split("=")[1])
    }
    return a
}
function save_module(e) {
    var a = new Object;
    a = getRequest();
    var t = a.profile;
    try {
        v_check(e)
    } catch (r) {
        return popup.msg(r.message), !1
    }
    $(".save_module_1").attr("onclick", "");
    var i = popup.loding(), n = getData(), o = {};
    switch (e) {
        case 1:
            o.name = n.name, o.mobile = n.mobile, o.loanAomunt = n.loanAomunt, o.idCard = n.idCard, o.isAgree = n.isAgree, o.isInsurance = n.isInsurance, o.captcha = n.captcha, o._d = n._d, o.activityId = n.activityId, o.channelId = n.channelId, o.profile = t;
            break;
        case 2:
            switch (o.uid = n.uid, o.monthlySalary = n.monthlySalary, o.payDayWay = n.payDayWay, o.workIdentity = n.workIdentity, n.property) {
                case"HAVE_CAR":
                    o.car = "HAVE_CAR", o.propertyType = "NO_PROPERTY";
                    break;
                case"HAVE_PROPERTY":
                    o.car = "NO_CAR", o.propertyType = "HAVE_PROPERTY";
                    break;
                case"ALL_HAVE":
                    o.car = "HAVE_CAR", o.propertyType = "HAVE_PROPERTY";
                    break;
                case"ALL_NO":
                    o.car = "NO_CAR", o.propertyType = "NO_PROPERTY"
            }
            switch (o.isCreditCard = n.isCreditCard, o.isCommercialInsurance = n.isCommercialInsurance, n.welfare) {
                case"SHE_TRUE":
                    o.localProvidentFund = "FALSE", o.localSocialSecurity = "TRUE";
                    break;
                case"GONG_TRUE":
                    o.localProvidentFund = "TRUE", o.localSocialSecurity = "FALSE";
                    break;
                case"ALL_TRUE":
                    o.localProvidentFund = "TRUE", o.localSocialSecurity = "TRUE";
                    break;
                case"ALL_FALSE":
                    o.localProvidentFund = "FALSE", o.localSocialSecurity = "FALSE"
            }
            o._d = n._d, o.verify = n.verify
    }
    actService().largeLoanSave(o).then(function (a) {
        var t = a.data;
        if (200 === a.statusCode)switch (e) {
            case 1:
                init.userCode = t.loanUserCode;
                var r = init.page_ad_code, n = {
                    policyHolderName: getData().name,
                    mobile: getData().mobile,
                    policyHolderIdCard: getData().idCard,
                    uid: t.loanUserCode,
                    _d: getData()._d,
                    adCode: r,
                    sign: md5(r + init.object_config.sign + getData().mobile),
                    activityConfigNum: 0
                };
                actService().actSave(n).then(function (e) {
                }), $(".ct_1,.foot,.copyright").hide(), $(".bodyModel").css({background: "#fff"}), $(".ct_2").show();
                break;
            case 2:
                actService().postBaixing(init.userCode).then(function (e) {
                    var a = init.requestParams.channel;
                    a && a.indexOf("jrtt") !== -1 && jrtt_sdk_event().form(), popup.close(i), window.location.href = "success.html?loanUserCode=" + init.userCode
                })
        } else popup.msg(a.message), $(".save_module_1").attr("onclick", "save_module(1)");
        popup.close(i)
    })
}
$(function () {
    var e = "loan1113_wy";
    actInit(e);
    var a = init.requestParams.channel;
    a && a.indexOf("jrtt") !== -1 && jrtt_sdk_init("73862280162"), $("#sex label").click(function () {
        $("#sex label").removeClass("sex_true"), $(this).addClass("sex_true")
    }), $(".option label").on("click", function () {
        $(this).closest("li").find("label").removeClass("label_true"), $(this).addClass("label_true")
    })
});