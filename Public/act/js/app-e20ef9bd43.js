var configApi = {
    // apiUrl: "http://www.newtank.cn/newtank/",
    apiUrl: "http://m.turntable8.com/Act/",
    xbbApiUrl: "http://m.turntable8.com/Act/",
    // xbbApiUrl: "http://xbbapi.data88.cn/",
    ljbApi: "http://api.lj.newtank.cn"
};

function xbbInit(e) {
    var e = getUserKey()
    actService().getFetch(init.page_ad_code).then(function(t) { _newtank("ENTER", t.activityConfigInfos), init.object_config = t, e.xbbConfig = t, openNumber() })
}

function openNumber() {
    var e = getUserKey(),
        t = referrerUrl(),
        a = { userKey: e, activityId: init.activityId, eventType: "view", channelId: init.channelId, referer: t };
    actService().recordOpenNumber(a)
}

function initLogic(e) { var t = window.location.href; 
    setCookie("newtank_key", "1").initInsurance("1")
}

function actInit(e, t) {
    var a = popup.loding();
    addBaiduStatistics(), init.requestParams = getRequestParams();
    var n = adCodeMaps[e] || {};
    "string" != typeof n && (n = n[init.requestParams.channel]), init.requestParams.adCode && (n = init.requestParams.adCode);
    var i = { newtankConfig: "", xbbConfig: "" };
    init.page_ad_code = n, newtankParameter.activityCode = e, newtankParameter.question = t, n && actService().getSwitch().then(function(e) { e && e.trigger && "ON" === e.trigger.toUpperCase() && (init.submit_switch = !0) }), actService().actCheckAct(e, init.requestParams.channel).then(function(e) {
        if (i.newtankConfig = e, e.questionnaire && e.questionnaire.questions && e.questionnaire.questions.length > 0) {
            var t = [];
            $.each(e.questionnaire.questions, function(e, a) { t.push({ question: a.questionContent, answers: [] }) }), init.questions = t
        }
        n ? xbbInit(i) : initLogic(i), popup.close(a)
    })
}

function newActInit(e) {
    var t = popup.loding();
    addBaiduStatistics(), init.requestParams = getRequestParams(), newtankParameter.question = e.question;
    var a = adCodeMaps[e.activityCode] || {};
    if (init.page_ad_code = a, e.commonPage && (init.page_ad_code = init.requestParams.adCode), "string" != typeof init.page_ad_code || !init.page_ad_code) return void popup.msg("该活动及渠道已下线，或者不存在!", { time: 5e3 });
    if (companyDetail.getInfo(), e.activityText && companyDetail.getRule(e.activityText), actService().getSwitchAndFetch(init.page_ad_code).then(function(a) { return _newtank("ENTER", a.activityConfigInfos[0].pageInfos[0].pageName), init.object_config = a, init.submit_switch ? (createQestion(a.activityConfigInfos[0].pageInfos[0].questionnaireId), openNumber(), e.callBack && e.callBack(), void popup.close(t)) : void popup.msg("该活动及渠道已下线，或者不存在!", { time: 5e3 }) }, function(e) { popup.msg(e.responseJSON.message, { time: 5e3 }) }), e.sdk) switch (e.sdk) {
        case "duiba":
            addDuibaSDK();
            break;
        case "bxm":
            console.log("bxm")
    }
    e.changeCompany && companyDetail.initCompany(), e.cutInput && (init.cutInput = e.cutInput)
}

function initSuccessPage(e) { addBaiduStatistics(), e.changeCompany && companyDetail.initCompany() }

function createQestion(e) {
    e && actService().getQuestionnaireDetailById(e).then(function(e) {
        if (e && e.questionInfoList && e.questionInfoList.length > 0) {
            var t = e.questionInfoList.map(function(e, t) { return { questionContent: e.question, answers: e.answerInfoList.map(function(e, t) { return { answerContent: e.answer } }) } });
            init.questions = e.questionInfoList, newtankParameter.question && newtankParameter.question({ questions: t })
        }
    })
}

function educationInit(e) {
    var t = popup.loding();
    addBaiduStatistics(), init.requestParams = getRequestParams(), actService().actCheckAct(e.activityCode, init.requestParams.channel).then(function(e) {
        if (init.activityId = e.activityId, e.channelId) init.channelId = e.channelId;
        else {
            popup.loding();
            popup.msg("该活动及渠道已下线，或者不存在!", { time: 5e3 })
        }
        popup.close(t)
    })
}

function loanInit() {
    var e = popup.loding();
    addBaiduStatistics(), init.requestParams = getRequestParams();
    var t = init.requestParams.code,
        a = init.requestParams.activityCode;
    if (!t || !a) return void popup.msg("该活动及渠道已下线，或者不存在!", { time: 5e3 });
    var n = { newtankConfig: "", xbbConfig: "" };
    init.page_ad_code = t, newtankParameter.activityCode = a, actService().getSwitch().then(function(e) { e && e.trigger && "ON" === e.trigger.toUpperCase() && (init.submit_switch = !0) }), actService().actCheckAct(a, init.requestParams.channel).then(function(t) { n.newtankConfig = t, xbbInit(n), popup.close(e) })
}
$(document).ajaxError(function(e, t, a, n) {
    if ("undefined" != t.status) switch (t.status) {
        case 401:
            console.log(401);
            break;
        case 404:
            console.log(404)
    }
}).ajaxSuccess(function(e) {});
var init = { testPremiumCode: { pingan: "a6debc5z0p", taiping: "kjhdkj123cnks", ddh: "g5cfkd4o1m", ddh_shaoer: "daduhui_shaoer", zy_lxys: "zy_lxys", tk_lak: "leAnKang_premium" }, page_ad_code: "", submit_switch: !1, object_config: {} },
    postPopup = "",
    newtankParameter = {},
    adCodeMaps = { btlh0913: "1c60a217", bxm0725: "f5100a0e", bxm0731: "c6fdb48e", bxm0828: "29d72fd5", bxm0906: "e2460664", bxm0915: "8fb7ce6b", bxm1011: "29bd1c99", bxm1026: "fc8a6cbd", daidaifu0913: "aa80c6a1", duiba0808: "e16d5993", duiba0825: "4b30d202", duiba0913: "27b14a70", duiba0915: "35c1de3a", duiba1010: "241ccace", duiba1009: { duiba_EDM: "3fc46dde", out_zkjc: "54f7cacd" }, duiba1030: "24766bba", duiba1031: "80ee8226", dlb0807: { dlb: "6e5cbb74", whsb: "2dd6c5c8", whsb2: "a27b9212", cp: "451f70df", lcsb: "df4aec73", xlsj: "2b035b2a", fb2: "f0772f36" }, dlb1012: "2490adfb", gmzx0918: "93a6648e", hlj0905: "3223454e", hlj0824: "8a5fe275", jkx0809: "39075282", ky0831: { xcly: "ef211c15", kuaiyan: "6a68a90c" }, lkyx0802: "4adbeebd", loan0620: "7fe4041d", loan0801: { "jrttds-1": "b09beec5", "jrttds-2": "551824df", "jrttds-3": "26d6d458", "jrttds-10": "ca740e3c", "jrttds-11": "0ae0dbfa", "jrttds-12": "7b956a56", "jrttds-13": "ed217924", "jrttds-14": "e8291de0" }, loan0802: { jrtt: "aaf8aedb", jrttds: "aaf8aedb", "jrttds-4": "bdc410ef", "jrttds-5": "38b73c99", "jrttds-6": "bc507300", "jrttds-9": "6189d112", "jrttds-15": "141de1d2", "jrttds-18": "a9cb4daf", "jrttds-19": "83187bc0" }, loan0817: "f5d17056", loan0825_1: "587839d5", loan0929: { "WJW-6": "76b19156" }, loan1030: "0ab0ff3c", lxys0925_zy: { "db-xxl": "f2398593" }, shaoer0912: "67bc4a37", shouqianba0809: "cb375d8d", tc0925: "a5cc52ea", tkjf0920: { tkjf: "297228f9", "tkjf-test": "b3e91cd6" }, tkjf1011: "8ce7e378", weiche0811: "5639790d", weifu0904: "e9cf1d50", ymt0829: "abe946a5", ymt0830: "f913ae25", yyzf0811: "de915a5d", zhiren0829: "6957dd65", zhiren0830: "2075c1ee", zhiren0831: "de2056f7", zhiren0901: { zhiren: "346740a2", "ymt-sx": "abe946a5" }, zhiren0918: "a6e9b61e", zhiren0919: "d23121ef", zql0920: "583df1da", zsxn1016: "1205897a", ymt1016: "abe946a5", ssmc1017: "816134e6", loan1017: "54a0111c", loan1020: "95483fe3", loan1023: "877e39da", loan1024: "e59aa9f8", loan1031: "77dde818", loan1103: "cda09577", loan1104: "ec756a8c", loan1105: "487d86b6", loan1108: "6bc39feb", loan1109_dlb: "ded3595c", loan1113_wy: "6577973f", loan1114_zhiren: "678cad40", loan1115: "64d204ae", loan1121: "8b63b6c4", loan1127: "7b5737ce", loan1128: "89b8b579", swPay1023: "e61e09b6", hz1025: "3226931e", hz1103: "7a505034", zhongyi1027: "bf3e7687", bjtt1030: "9f168279", changlan1103: "1dc8c968", hdt1113: "13731b78", tc1109_tk: "ad1f85d0", tc1109_tp: "62621ab6", tc1109_zy: "e90360ca", tc1109_ddh: "c4abb757", noteMarketing: "f89e1531", hd1228: "632dcdff", loan0103: "1db1f23a", loan0109: "80ed2820", loan0116: "f063973f", loan0117: "80ed2820", loan0119: "7622e97f", loan0129: "9aa1c20d", loan0131: "852de989", loan0605: "7622e97f" };

function actService() {
    var t = function(t) { var i = null; return i = init.submit_switch ? n(t) : $.post(configApi.apiUrl + "index/act?type=334453", t) },
        n = function(t) { return $.ajax({ type: "post", url: configApi.xbbApiUrl + "index/act?type=3123", contentType: "application/json;charset=utf-8", data: JSON.stringify(t) }) },
        i = function(t, n) { return $.post(configApi.apiUrl + "index/act?type=35763", { activityCode: t, channelCode: n }) },
        e = function(t) { return $.get(configApi.apiUrl + "index/act?type=39", t) },
        a = function(t) { return $.post(configApi.apiUrl + "index/act?type=38", t) },
        r = function(t, n) { return $.get(configApi.apiUrl + "index/act?type=37" + t + "/policyId/" + n) },
        c = function(t) { return $.get(configApi.apiUrl + "index/act?type=36" + t) },
        o = function() { return $.get(configApi.apiUrl + "index/act?type=35") },
        p = function(t) { return $.get(configApi.apiUrl + "index/act?type=34", t) },
        u = function(t) { return $.get(configApi.apiUrl + "index/act?type=33", t) },
        g = function(t) {
            if (!init.submit_switch || newtankParameter.activityCode && newtankParameter.activityCode.match("loan") || newtankParameter.activityCode && newtankParameter.activityCode.match("hd")) {
                var n = configApi.apiUrl + "index/act?type=150627197511145533",
                    i = { activityId: init.activityId, channelId: init.channelId, mobile: t, _d: (new Date).getTime() };
                return $.get(n, i)
            }
            var n = configApi.xbbApiUrl + "index/act?type=1506",
                i = { mobile: t, adCode: init.page_ad_code };
            return $.ajax({ type: "post", url: n, contentType: "application/json; charset=utf-8", data: JSON.stringify(i) })
        },
        f = function(t) { return $.post(configApi.apiUrl + "index/act?type=1125", t) },
        l = function(t, n, i) { return $.get(configApi.apiUrl + "act/getad/checkAct", { activityCode: t, hierarchy: n, channelCode: i }) },
        s = function(t) { return $.post(configApi.apiUrl + "index/act?type=1123", t) },
        h = function(t) { return $.post(configApi.apiUrl + "index/act?type=1122", t) },
        d = function(t) { return $.get("https://buy.bianxianmao.com/shop/countInfo", t) },
        A = function(t) { return $.get(configApi.apiUrl + "index/act?type=1121", { flag: t }) },
        b = function(t) { return $.ajax({ type: "POST", url: configApi.apiUrl + "thp/extrainfo", contentType: "application/json; charset=utf-8", data: JSON.stringify(t), dataType: "json" }) },
        y = function(t) { return $.get(configApi.xbbApiUrl + "index/act?type=112" + t) },
        U = function(t) { return $.get(configApi.xbbApiUrl + "index/act?type=1") },
        w = function(t) { return $.post(configApi.apiUrl + "index/act?type=11", t) },
        m = function(t) { return $.ajax({ type: "POST", url: configApi.xbbApiUrl + "index/act?type=2", contentType: "application/json; charset=utf-8", data: JSON.stringify(t) }) },
        v = function(t) { return $.get(configApi.apiUrl + "index/act?type=17" + t) },
        x = function(t) { return $.get(configApi.apiUrl + "index/act?type=16" + t) },
        C = function(t) {
            return $.when(U(), y(t)).then(function(t, n) {
                var i = t[0];
                i && i.trigger && "ON" === i.trigger.toUpperCase() ? init.submit_switch = !0 : init.submit_switch = !1;
                var e = n[0];
                return e
            })
        },
        j = function(t) { return $.get(configApi.xbbApiUrl + "index/act?type=15" + t) },
        S = function(t) { return $.get(configApi.apiUrl + "index/act?type=14" + t) },
        k = function(t) { return $.get(configApi.apiUrl + "index/act?type=13" + t) },
        O = function(t) { return $.get(configApi.apiUrl + "index/act?type=12" + t) },
        T = function(t) { return $.post(configApi.apiUrl + "index/act?type=10", t) },
        N = function(t) { return $.ajax({ type: "put", url: configApi.ljbApi + "/uc/user/info", contentType: "application/json;charset=utf-8", data: JSON.stringify(t) }) };
    return { actSave: t, actCheckAct: i, actKnowMore: e, recordOpenNumber: a, shouqianbaOrder: r, getUserInfo: c, getActivatecode: o, actHdsActivate: p, getAwardList: u, sendCaptcha: g, largeLoanSave: f, getAd: l, getNLJ: s, getBXYM: h, bxmAD_SDK: d, getDrawNumber: A, updateUserTag: b, getFetch: y, getSwitch: U, checkCaptcha: w, checkCaptchaXbb: m, postBaixing: v, baixingNoPwdLogin: x, actSaveNew: n, getSwitchAndFetch: C, getQuestionnaireDetailById: j, postAtOnce: S, getBxwm: k, getYfBxwm: O, getKeyword: T, ljbCallback: N }
}

function adminService() {
    var t = function(t, n) { return $.ajax({ type: "POST", url: configApi.apiUrl + "index/act?type=191" + t + "/flag/" + n, contentType: "application/json; charset=utf-8", dataType: "json" }) },
        n = function() { return $.get(configApi.apiUrl + "index/act?type=9") },
        e = function(t, n) { return $.get(configApi.apiUrl + "index/act?type=20" + t + "/endAt/" + n) };
    return { changeStatus: t, getDetail: n, getNumber: e }
}

function otherService() {
    var t = function(t) { return $.post(configApi.apiUrl + "thp/hitalk/save", t) },
        a = function(t) { return $.ajax({ type: "POST", url: configApi.apiUrl + "thp/education/save", contentType: "application/json; charset=utf-8", data: JSON.stringify(t), dataType: "json" }) },
        e = function(t) { return $.ajax({ type: "POST", url: configApi.apiUrl + "act/chelun/redeemCode/" + t + "/batch/4", contentType: "application/json; charset=utf-8", dataType: "json" }) },
        n = function(t) { return $.ajax({ type: "POST", url: configApi.apiUrl + "act/chelun/redeemCodeUpdate/" + t + "/batch/4", contentType: "application/json; charset=utf-8", dataType: "json" }) },
        i = function(t) { return $.ajax({ type: "POST", url: configApi.apiUrl + "thp/bxgh/save", contentType: "application/json; charset=utf-8", data: JSON.stringify(t), dataType: "json" }) },
        p = function(t) { return $.ajax({ type: "POST", url: "https://o.qfpay.com/adv/data", data: t, dataType: "JSON" }) };
    return { saveHiTalk: t, saveEducation: a, redeemCode: e, redeemCodeUpdate: n, bxghSave: i, haojinSDK: p }
}

var name = $("input[name='name']").val(); //姓名
var idCard = $("input[name='idCard']").val(); //身份证
var mobile = $("input[name='mobile']").val(); //手机号码

function xbbService() {
    var t = function(t) { return $.ajax({ type: "POST", url: configApi.xbbApiUrl + "index/act?type=4", contentType: "application/json; charset=utf-8", data: JSON.stringify(t), dataType: "json" }) },
        n = function(t) { var n = null; return n = init.submit_switch ? actService().actSaveNew(t) : $.ajax({ type: "POST", url: configApi.xbbApiUrl + "index/act?type=8", contentType: "application/json; charset=utf-8", data: JSON.stringify(t), dataType: "json" }) },
        a = function(t) { return $.ajax({ type: "GET", url: configApi.xbbApiUrl + "index/act?type=21" + t, contentType: "application/json; charset=utf-8", dataType: "json" }) },
        e = function(t) { return $.get(configApi.apiUrl + "index/act?userCode=123" + t + "&type=2") },
        i = function(t) {
            return t.adCode = init.page_ad_code,
                $.ajax({
                    type: "POST",
                    url: configApi.xbbApiUrl + "index/index_submit?mobile=" + $("input[name='mobile']").val() + "&name=" + $("input[name='name']").val() + "&idCard=" + $("input[name='idCard']").val() + "&channel_map_id=" + $("input[name='channel']").val(),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    // data: {'mobile':$("input[name='mobile']").val(),'name':$("input[name='name']").val(),'idCard':$("input[name='idCard']").val()},
                    success: function(data) {
                        var js = JSON.stringify(data);
                        var arr = jQuery.parseJSON(js);
                        // console.log(arr.status);
                        // if (arr.status !== 200) {void popup.msg(arr.message)};
                        // function(data) { popup.msg(arr.message, { time: 5e3 }) };
                        // if (arr.status !== 200) {popup.msg(arr.message, { time: 5e3 }) };
                    },
                    error: function() {
                        alert("提交失败！");
                    }
                })
        },
        c = function(t) { return $.ajax({ type: "GET", url: configApi.xbbApiUrl + "index/act?type=23" + t, contentType: "application/json; charset=utf-8", dataType: "json" }) },
        r = function(t) { return $.ajax({ url: "http://api.lj.newtank.cn/uc/user/info", type: "PUT", contentType: "application/json; charset=utf-8", dataType: "json", data: JSON.stringify(t) }) };
    return { testPremium: t, actSave: n, getQuestionnaire: a, getUserInfo: e, sendCaptcha: i, getActivityInfo: c, putUcUserInfo: r }
}

function adUrl() { return { ad_rong360: { name: "融360", url: "http://m.rong360.com/express?from=sem21&utm_source=yuanshan&utm_medium=cpc5&utm_campaign=1" }, vipKid01: { name: "vipkid教育", url: "https://vipkid-bd.mikecrm.com/GOzwEYF" }, zhongxinCard: { name: "中信信用卡", url: "https://creditcard.ecitic.com/m/tjbk/card_list.html?uid=TJ44488060&sid=SJDKTJBK" }, jingzhengu: { name: "精真估", url: "http://qd.jingzhengu.com/xiansuo/sellcarquick-xindan.html" } } }

function goADUrl(t, e) {
    var n = getUserKey(),
        i = { userKey: n, activityId: init && init.activityId || getQueryString("activityId"), eventType: "ad_click", adCode: t, channelId: init && init.channelId || getQueryString("channelId") };
    actService().recordOpenNumber(i).then(function() { window.location.href = e ? e : adUrl()[t].url })
}

function getQueryString(t) {
    var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)", "i"),
        n = window.location.search.substr(1).match(e);
    return null != n ? unescape(n[2]) : null
}

function sortBy(t) { return function(e, n) { var i, r; if ("object" == typeof e && "object" == typeof n && e && n) return i = e[t], r = n[t], i === r ? 0 : typeof i == typeof r ? i < r ? -1 : 1 : typeof i < typeof r ? -1 : 1; throw "error" } }

function renderADList(t) {
    $.get(configApi.apiUrl + "act/getad/checkAct?channelCode=" + (t || getQueryString("channel"))).then(function(t) {
        var e = t.adList,
            n = $("<ul></ul>");
        e && e.length ? e.sort(sortBy("adOrder")) : e = [];
        for (var i = 0; i < e.length; i++) {
            var r = e[i].urls,
                c = r && r[0];
            if (r && r.length > 1) {
                var a = Math.floor(Math.random() * r.length);
                c = r[a]
            }
            n.append('<li><a href="javascript:;" onClick="goADUrl(\'' + e[i].code + "','" + c + '\')"><img src="' + e[i].iconUrl + '"><p>' + e[i].name + "</p></li>")
        }
        $("#adList").append(n)
    })
}

function goADBaidu(t) { bd_event(t.key, "click", t.text), setTimeout(function() { window.location.href = adUrl()[t.type].url }, 200) }

function bd_event(t, n, e, _) { _hmt.push(["_trackEvent", t, n, e, _]) }

function nextCaptcha(n) {
    $("#captcha").show(), $("#captcha .sendCode").click(), $("input[name='captcha']").unbind("input propertychange");
    var a = $("input[name = 'mobile']").val(),
        e = $("input[name='captcha']");
    e.val(""), e.focus(), $("._span span:first-child").addClass("writeOn"), $("#cellphoneNumber").html(a), e.bind("input propertychange", function() { var a = e.val(); if ($("._span span").removeClass("writeOn"), $("._span").find("span:eq(" + a.length + ")").addClass("writeOn"), a && a.length >= 6) { e.blur(); try { if (null === a || void 0 === a || "" === a) throw new Error("验证码不能为空"); if (!/^\d{6}$/.test(a)) throw new Error("验证码为6位数字") } catch (t) { return popup.msg(t.message, { time: 1e3 }), !1 } n(a) } }), e.focus(function() {
        var n = e.val();
        $("._span span").removeClass("writeOn"), $("._span").find("span:eq(" + n.length + ")").addClass("writeOn")
    })
}

function v_name() { var n = $("input[name = 'name']").val(); if (null === n || void 0 === n || "" === n) throw new Error("姓名不能为空"); if (!RegexConstants.REGEX_CHINESE_2_4.test(n)) throw new Error("姓名应为2-4位中文") }

function v_id_card() { var n = $("input[name = 'idCard']").val(); if (null === n || void 0 === n || "" === n) throw new Error("身份证号不能为空"); if (!RegexConstants.REGEX_ID_CARD.test(n)) throw new Error("身份证号格式不正确"); if (!checkIdCard(n)) throw new Error("身份证校验不正确") }

function v_mobile() { var n = $("input[name = 'mobile']").val(); if (null === n || void 0 === n || "" === n) throw new Error("手机号不能为空"); if (!RegexConstants.REGEX_MOBILE.test(n)) throw new Error("手机号格式不正确") }

function v_question() {
    var n = $("input[name='answerIds[0]']:checked").val(),
        e = $("input[name='answerIds[1]']:checked").val();
    if (!n || !e) throw new Error("请先完成问卷调查")
}

function v_question_three() {
    var n = $("input[name='answerIds[0]']:checked").val(),
        e = $("input[name='answerIds[1]']:checked").val(),
        t = $("input[name='answerIds[2]']:checked").val();
    if (!n || !e || !t) throw new Error("请先完成问卷调查")
}

function v_captcha() { var n = $("input[name='captcha']").val(); if (null === n || void 0 === n || "" === n) throw new Error("验证码不能为空"); if (!RegexConstants.REGEX_NUM_INT_6.test(n)) throw new Error("验证码为6位数字") }

function v_safe_instruct() { var n = $("input[name='safeInstruct']")[0].checked; if (!n) throw new Error("请确认了解相关安全说明") }

function v_activity_rule() { var n = $("input[name='safeInstruct']")[0].checked; if (!n) throw new Error("请确认了解相关活动规则") }

function v_birth() { var n = $("input[name='birth']").val(); if (!n) throw new Error("请选择出生日期"); if (!RegexConstants.REGEX_YYYY_MM_DD.test(n)) throw new Error("出身日期格式不正确"); return !0 }

function v_sex() { var n = $("input[name='sex']:checked").val(); if (!n) throw new Error("请选择性别"); return !0 }

function v_child_name() { var n = $("input[name = 'childName']").val(); if (null === n || void 0 === n || "" === n) throw new Error("儿童姓名不能为空"); if (!RegexConstants.REGEX_CHINESE_2_4.test(n)) throw new Error("儿童姓名应为2-4位中文") }

function v_child_birth() { var n = $("input[name='childBirth']").val(); if (!n) throw new Error("请选择儿童出生日期"); if (!RegexConstants.REGEX_YYYY_MM_DD.test(n)) throw new Error("儿童出身日期格式不正确"); return !0 }

function v_child_sex() { var n = $("input[name='childSex']:checked").val(); if (!n) throw new Error("请选择儿童性别"); return !0 }

function v_insurance() { var n = $("input[name='insuranceLevel']:checked").val(); if (!n) throw new Error("请选择保险"); return !0 }

function v_insurance_mobile() { var n = $("#insuranceLevel option:selected").val(); if (n < 0) throw new Error("请选择保险"); return !0 }

function checkAge_25_50() {
    var n = $("input[name='idCard']").val(),
        e = getBirth(n);
    // if (e < 25 || e > 50) throw new Error("您的年龄不在25-50周岁受保范围内") 
}

function v_email(n) { if (null === n || void 0 === n || "" === n) throw new Error("电子邮箱不能为空"); if (!RegexConstants.REGEX_EMAIL.test(n)) throw new Error("邮箱格式不正确"); return !0 }

function v_birth_25_50() {
    var n = $("input[name='birth']").val(),
        e = (new Date).getFullYear() - n.split("-")[0];
    if (e < 25 || e > 50) throw new Error("出生日期不能小于25岁大于50周岁")
}

function v_birth_parameter(n, e) {
    var t = $("input[name='birth']").val(),
        r = (new Date).getFullYear() - t.split("-")[0];
    if (r < n || r > e) throw new Error("出生日期不能小于" + n + "岁或大于" + e + "周岁")
}

function v_birth_0_17() {
    var n = $("input[name='birth']").val(),
        e = (new Date).getFullYear() - n.split("-")[0];
    if (e < 0 || e > 17) throw new Error("出生日期不能大于17周岁")
}

function contrastTime() {
    var n = $("input[name='birth']").val(),
        e = new Date(n.replace(/-/g, "/")),
        t = new Date,
        r = t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
    return Date.parse(r) > Date.parse(e)
}

function getBirth(n) {
    var e = new Date,
        t = e.getMonth() + 1,
        r = e.getDate(),
        a = e.getFullYear() - n.substring(6, 10) - 1;
    return (n.substring(10, 12) < t || n.substring(10, 12) == t && n.substring(12, 14) <= r) && a++, a
}

function checkIdCard(n) {
    var e = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    if (!e[n.substr(0, 2)]) return !1;
    if (18 == n.length) {
        n = n.split("");
        for (var t = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], r = [1, 0, "x", 9, 8, 7, 6, 5, 4, 3, 2], a = 0, i = 0, o = 0, c = 0; c < 17; c++) i = n[c], o = t[c], a += i * o;
        r[a % 11];
        if (r[a % 11] != n[17]) return "x" == n[17] || "X" == n[17]
    }
    return !0
}

function getAllParameters() { var n = { name: $("input[name = 'name']").val(), mobile: $("input[name = 'mobile']").val(), sex: $("input[name='sex']:checked").val(), birth: $("input[name='birth']").val(), captcha: $("input[name='captcha']").val(), idCard: $("input[name = 'idCard']").val(), safeInstruct: $("input[name='safeInstruct']")[0].checked, "answerIds[0]": $("input[name='answerIds[0]']:checked").val(), "answerIds[1]": $("input[name='answerIds[1]']:checked").val(), "answerIds[2]": $("input[name='answerIds[2]']:checked").val(), _d: (new Date).getTime(), activityId: init.activityId, channelId: init.channelId }; return init.page_ad_code && init.submit_switch && (n = getAllParametersNew(init.page_ad_code)), n }

function getAllParametersNew(n) {
    var e = init.object_config.sign,
        t = $("input[name = 'mobile']").val(),
        r = { adCode: n, sign: md5(n + e + t), activityConfigNum: 0, mobile: t, sex: $("input[name='sex']:checked").val(), policyHolderName: $("input[name = 'name']").val(), policyHolderSex: ["FEMALE", "MALE"][$("input[name='sex']:checked").val()], policyHolderBirth: $("input[name='birth']").val(), policyHolderIdCard: $("input[name = 'idCard']").val(), captcha: $("input[name='captcha']").val() };
    return init.questions && (r.questionnaire = $.map(init.questions, function(n, e) { return n.answers = [$("input[name='answerIds[" + e + "]']:checked").parent().text().trim()], n })), r
}

function addBaiduStatistics() {
    var n = document.createElement("script");
    n.type = "text/javascript", n.innerHTML = 'var _hmt = _hmt || []; (function() { var hm = document.createElement("script"); hm.src = "//hm.baidu.com/hm.js?80b5d4d37e762744324258458e2ee0d9"; hm.src = "//hm.baidu.com/hm.js?80b5d4d37e762744324258458e2ee0d9"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s); })(); ';
    var e = document.getElementsByTagName("script")[0];
    e.parentNode.insertBefore(n, e)
}

function getRequestParams() {
    var n = location.search,
        e = new Object({});
    if (n.indexOf("?") != -1) {
        var t = n.substr(1);
        strs = t.split("&");
        for (var r = 0; r < strs.length; r++) e[strs[r].split("=")[0]] = unescape(strs[r].split("=")[1])
    }
    return e
}

function analyzeIdCard() {
    var n = function(n) { return 18 == n.length ? n.substring(6, 10) + "-" + n.substring(10, 12) + "-" + n.substring(12, 14) : 15 == n.length ? "19" + n.substring(6, 8) + "-" + n.substring(8, 10) + "-" + n.substring(10, 12) : void 0 },
        e = function(n) { var e = ""; return 18 == n.length && (e = parseInt(n.substr(16, 1)) % 2 == 1), 15 == n.length && (e = parseInt(n.substr(14, 1)) % 2 == 1), e ? "1" : "0" };
    return { birth: n, sex: e }
}

function goCommonSucess(n) { window.location.href = window.location.origin + "/newtank/act/common/index.html?userCode=" + n.userCode }

function goCommonError() { window.location.href = window.location.origin + "/newtank/act/common/failed.html" }

function goReservation(n) {
    if (n) {
        var e = "http://newtank.cn/newtank/act/reservation/wap/index.html?userCode=" + init.userCode,
            t = "http://newtank.cn/newtank/act/reservation/index.html?userCode=" + init.userCode;
        window.location.href = "wap" === n ? e : t
    } else layer.msg("参数不正确!", { time: 1e3 })
}

function layerShow(n) { popup.open({ type: 1, content: n.content, style: "width:500px;background-color:#fff;padding-bottom:30px;" }) }

function closeAll() { popup.closeAll() }

function changeKnowMore(n) { actService().actKnowMore(n) }

function IsPC() {
    for (var n = navigator.userAgent, e = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"], t = !0, r = 0; r < e.length; r++)
        if (n.indexOf(e[r]) > 0) { t = !1; break }
    return t
}

function check_more(n) {
    var e = $(n).children("input").prop("checked"),
        t = $(n).children("span"),
        r = { userCode: init.userCode };
    e ? (t.css("background-position", "right"), r.flag = !0, actService().actKnowMore(r)) : (t.css("background-position", "left"), r.flag = !1, actService().actKnowMore(r))
}

function getAwardList() {
    var n = { d: (new Date).getTime() };
    actService().getAwardList(n).then(function(n) {
        if (200 == n.statusCode) {
            var e = n.data;
            if (e && e.length > 0) {
                for (var t = "", r = 0; r < e.length; r++) t += "<li>", t += e[r].mobile, t += "<span>", t += e[r].award, t += "</span></li>";
                $("#list_ul").html(t)
            }
        } else popup.msg("获取中奖名单错误,稍后在试!", { time: 1e3 })
    })
}

function referrerUrl() {
    var n = "";
    document.referrer.length > 0 && (n = document.referrer);
    try { 0 === n.length && opener.location.href.length > 0 && (n = opener.location.href) } catch (e) {}
    return n
}

function goWeChat() {
    var n = getRequestParams().userCode;
    n ? window.location.href = "http://act.newtank.cn/h5/activity/guide/weixin?userCode=" + n : window.location.href = "http://act.newtank.cn/h5/activity/guide/weixin"
}

function loanUrl() { return { loan_klqian: { name: "快来钱", url: "http://www.klqian.com/pabx/view/078f9fbb61d44041982516855f0f6c76.shtml" }, loan_lanlingdai: { name: "蓝领贷", url: "http://www.lanlingdai.net/lld/page/reg_txxy.html?regSource=xdyx" }, loan_ppdai: { name: "曹操贷", url: "https://m.ppdai.com/act/cpa/?source=kuailaiqian&url=https://lnk0.com/QNNF5s" }, loan_spdbccc: { name: "青春贷", url: "https://ecentre.spdbccc.com.cn/creditcard/netLoanYoung.htm?channel=BRWH" }, loan_xianhuahua: { name: "先花一个亿", url: "http://weixin.xianhuahua.com/dev/coupon/couponappsix?from=1110" }, loan_yangqianguan: { name: "现金借贷", url: "https://www.yangqianguan.com/flexible/index?act=OwbPtJ" }, loan_xhqb: { name: "小花钱包", url: " https://www.xhqb.com/m/ffpp.html?appChannel=kuailq01" }, loan_xiaoying: { name: "小赢卡贷", url: "https://cardloan.xiaoying.com/kadai/index?source=10000934" }, loan_2345: { name: "2345贷款王", url: "https://mdaikuan.2345.com/register3?channel=hj-kuailaiqian_cpk_wlei " }, loan_omsys: { name: "i贷", url: "https://www.omsys.com.cn/Pinganwl/index.php?aid=UGluZ2Fud2xfNTE5Nl84MV95ZXM=" }, loan_invest_ppdai: { name: "拍拍贷", url: "https://m.invest.ppdai.com/landinginfonew.html?regsourceid=hongyuejiekuanx02&role=1" }, loan_rongzi: { name: "东方融资网", url: "https://m.rongzi.com/lp/daikuan1/?hmsr=xindan&utm_source=62&utm_medium=cpc&utm_term=%E4%B8%9C%E6%96%B9%E8%9E%8D%E8%B5%84%E7%BD%91&utm_content=%E8%B4%B7%E6%AC%BE&utm_campaign=BD-%E6%96%B0%E6%97%A6" }, loan_91qianmi: { name: "钱米", url: "http://91qianmi.com/bmember/imgregister.xhtm?inviteCode=A694358" }, loan_doraemoney: { name: "玖富叮", url: "https://cube.doraemoney.com/newCube/index.html?proId=8e74b8e0647343218c77bd365e924532" }, loan_taoqian123: { name: "淘钱宝", url: "https://m.taoqian123.com/?channel_id=163" }, loan_youqian: { name: "马上有钱联盟", url: "https://youqian.msxf.com/exp/80009071-2-1" }, loan_yirendai: { name: "宜人贷", url: "https://bang.yirendai.com/signup.html?referrer=shxdyxgl" }, loan_yixin: { name: "宜信普惠", url: "http://x.yixin.com/tongyong7?utm_source=Xindanyingxiao&utm_medium=xd-cps&utm_term=&utm_content=&utm_campaign=%E6%96%B0%E6%97%A6%E8%90%A5%E9%94%801" }, loan_student: { name: "名校贷", url: "https://m.nonobank.com/mxdsite/landing/?isSchool=true&userStatus=student&am-id=2753" }, loan_whiteCollar: { name: "名校贷_白领版", url: "https://m.nonobank.com/mxdsite/landing/?isSchool=true&userStatus=whiteCollar&am_id=2753" }, loan_largeLoan: { name: "极速大额贷款", url: "largeLoan.html" } } }

function goLoadUrl(n, e) {
    var t = getUserKey(),
        r = { userKey: t, activityId: init && init.activityId || getQueryString("activityId"), eventType: "ad_click", adCode: e, channelId: init && init.channelId || getQueryString("channelId") };
    actService().recordOpenNumber(r).then(function() { window.location.href = n })
}

function loanHtml(n) {
    for (var e = "", t = 0; t < n.length; t++) {
        var r = n[t].urls,
            a = r && r[0];
        if (r && r.length > 1) {
            var i = Math.floor(Math.random() * r.length);
            a = r[i]
        }
        e += "<li onclick=goLoadUrl('" + a + "','" + n[t].code + "')>", e += "<img src=" + n[t].iconUrl + ">", e += "<p>", e += "<span>" + n[t].name + "</span>", e += n[t].description, e += "<br/><i>" + n[t].number + "</i> 人已申请", e += "</p>", e += '<a href="javascript:void(0)"></a>', e += "</li>"
    }
    return e
}

function didi() { window.location.href = "https://static.dorado.xiaojukeji.com/vue/dist/coupon.html?schannel=didi&a=&b=20106&c=20100&d=1&s=1164892165594368690&cId=346&v=1.0&t=weixin_appmsg&from=singlemessage&isappinstalled=0" }

function loanProfile() {
    var n = "",
        e = new Object;
    return e = getRequestChina(), e.kw ? (n += "pl=" + e.pl, n += "&un=" + e.un, n += "&kw=" + e.kw, n += "&so=" + e.so, n += "&me=" + e.me, n += "&au=" + e.au, e = getReferrerChina(), n += "&search=" + e.word) : n
}

function getRequestChina() {
    var n = window.location.search,
        e = new Object;
    if (n.indexOf("?") != -1) {
        var t = n.substr(1);
        strs = t.split("&");
        for (var r = 0; r < strs.length; r++) {
            var a = strs[r].split("=")[0],
                i = decodeURIComponent(strs[r].split("=")[1]);
            e[a] = i
        }
    }
    return e
}

function getReferrerChina() {
    var n = document.referrer,
        e = new Object;
    if (n.indexOf("?") != -1) {
        var t = n.substr(n.indexOf("?") + 1);
        strs = t.split("&");
        for (var r = 0; r < strs.length; r++) {
            var a = strs[r].split("=")[0],
                i = decodeURIComponent(strs[r].split("=")[1]);
            e[a] = i;
            var o = ["q", "p", "k", "w", "kw", "wd", "query", "search", "keyword"];
            o.forEach(function(n) { a === n && (e.word = i) })
        }
    }
    return e
}

function loanMoney() {
    var n = Date.parse(new Date);
    n /= 10;
    var e = toThousands(n.toString().substring(3));
    $(".loanMoney").html(e)
}

function toThousands(n) {
    var e = [],
        t = 0;
    n = (n || 0).toString().split("");
    for (var r = n.length - 1; r >= 0; r--) t++, e.unshift(n[r]), t % 3 || 0 == r || e.unshift(",");
    return e.join("")
}

function addDuibaSDK() {
    var n = document.createElement("script");
    n.type = "text/javascript", n.src = "//yun.duiba.com.cn/h5-tuia/adverter.js";
    var e = document.getElementsByTagName("script")[0];
    e.parentNode.insertBefore(n, e)
}

function goSDK(n, e) { "f0fa48fd" === init.adCode || "1a7f1ac5" === init.adCode ? TuiaAdverter.init(function() { e() }, n) : e() }

function putCallBack(n) { if ("2a4a584d" !== init.page_ad_code && "267b5cc8" !== init.page_ad_code) return n(), !1; var e = { openId: init.requestParams.oid, userInsuredStatus: {} }; "2a4a584d" === init.page_ad_code && (e.userInsuredStatus.travelInsureStatus = !0), "267b5cc8" === init.page_ad_code && (e.userInsuredStatus.accountSafetyInsureStatus = !0), xbbService().putUcUserInfo(e).then(function(e) { n() }) }

function goCreditCard(n) { if ("zhongxin" === n) return window.location.href = "https://creditcard.ecitic.com/m/tjbk/card_list.html?uid=TJ44488060&sid=SJDKTJBK", !1 }
var RegexConstants = { REGEX_MOBILE: /^1[3|4|5|7|8][0-9]\d{8}$/, REGEX_ID_CARD: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/, REGEX_CHINESE: /^([\u4E00-\uFA29])*$/, REGEX_CHINESE_2_4: /^([\u4E00-\uFA29]){2,4}$/, REGEX_YYYY_MM_DD: /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/, REGEX_EMAIL: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, REGEX_NUM_INT_6: /^\d{6}$/ };
var companyDetail = {
    ihoyo: { company: "上海虹跃互联网科技有限公司", title: "虹跃互联网", mobile: "021-58921833", workTime: "工作日9:30至17:30", copyright: "客服热线：021-58921833 工作时间：工作日9:30至17:30" },
    newtank: { company: "上海新旦营销管理股份有限公司", title: "新旦营销", mobile: "400-960-9190", workTime: "工作日9:30至17:30", copyright: "客服热线：400-960-9190 工作时间：工作日9:30至17:30" },
    getInfo: function() {
        var t = "<p>本人授权保险公司，除法律另有规定之外，将本人提供给保险公司的信息、享受保险公司服务产生的信息（包括本〔单证〕签署之前提供和产生的信息）以及保险公司根据本条约定查询、收集的信息，用于保险公司及其因服务必要委托的合作伙伴为本人提供服务、推荐产品、开展市场调查与信息数据分析。</p><p>本人授权保险公司，除法律另有规定之外，基于为本人提供更优质服务和产品的目的，向保险公司因服务必要开展合作的伙伴提供、查询、收集本人的信息。为确保本人信息的安全，保险公司及其合作伙伴对上述信息负有保密义务，并采取各种措施保证信息安全。</p><p>本条款自本〔单证〕签署时生效，具有独立法律效力 , 不受合同成立与否及效力状态变化的影响。</p>";
        $(".initInfo").html(t)
    },
    getRule: function(t) {
        var n = "<tr><td style='width:15px;'>1.</td><td>投保对象：本保险身故受益人为法定受益人。本保险的保险对象要求身体健康、能正常工作或正常生活的自然人</td> </tr><tr><td>2.</td><td>保险期限：以被保险人收到短信通知上的保险起止日期为准。对保险日期之外所发生的保障事故保险公司不负责给付保险责任 </td></tr><tr><td>3.</td><td>使用条款：详情内容请登录保险公司官网网站查询</td></tr><tr><td>4.</td><td>告知义务：依我国《保险法》的规定，投保人、被保险人应如实告知，否则保险人有权依法解除保险合同，并对于保险合同解除前发生的保险事故不负任何责任。<br/>投保人、被保险人在投保时，应对投保书内各项内容如实详细的说明或填写清楚。否则，保险人有权依法解除保险合同。 </td></tr><tr><td>5.</td><td>保险判定流程：根据用户所填写的资料后台自动匹配最适合用户的保险为期进行投保 </td> </tr><tr><td>6. </td><td>保险提供商：相关保险由<i class='insuranceListName'></i>提供，之后会有可能收到保险代理人回访电话。</td> </tr><tr><td>7. </td><td>保险凭证：险公司对保险仅提供电子保单；赠送保险每人只能投保一份，重复或投保多分无效。</td> </tr><tr><td>8. </td><td>如对本活动有疑问及建议请拨打【<i class='companyMobile'></i>】进行咨询（咨询时间:<i class='workTime'></i>）； <br/>如对赠险内容及理赔有疑问请拨打相关保险公司客服电话进行咨询 </td> </tr><tr><td>9.</td><td>成功领取赠险的用户可参与" + t + ";</td></tr>";
        $(".initRule").html(n)
    },
    initCompany: function() {
        var t = this.getCompany();
        $(".companyMobile").html(t.mobile), $(".companyCopyright").html(t.copyright), $(".workTime").html(t.workTime), $(".companyTitle").html(t.title)
    },
    getCompany: function() { var t = window.location.href; return t.indexOf("act.ihoyo.cn") !== -1 ? this.ihoyo : t.indexOf("wap.newtank.cn") !== -1 ? this.newtank : this.newtank },
    pageInsuranceLogo: function(t) {
        var n = { tp: "taiping.png", tk: "taikang.png", zy: "zhongying.png", pa: "pingan.png", hx: "huaxia.png", yg: "yangguang.png" },
            i = n[t];
        $(".pageInsuranceLogo").attr("src", "../../images/logo/" + i)
    }
};

function getUserKey() { var e; return "" !== getCookie("newtank_key") ? getCookie("newtank_key") : (e = uuid(), setCookie("newtank_key", e), e) }

function getCookie(e) { for (var t = document.cookie, o = t.split("; "), n = 0; n < o.length; n++) { var r = o[n].split("="); if (r[0] == e) return r[1] } return "" }

function uuid() {
    for (var e = [], t = "0123456789abcdef", o = 0; o < 36; o++) e[o] = t.substr(Math.floor(16 * Math.random()), 1);
    e[14] = "4", e[19] = t.substr(3 & e[19] | 8, 1), e[8] = e[13] = e[18] = e[23] = "-";
    var n = e.join("");
    return n
}

function setCookie(e, t) {
    var o = 30,
        n = new Date;
    n.setTime(n.getTime() + 24 * o * 60 * 60 * 1e3), document.cookie = e + "=" + escape(t) + " ;expires=" + n.toGMTString() + " ;path=/"
}
var insuranceDetail = {
        pingan_cxtx: { code: "pingan", company: "中国平安", insuranceName: "中国平安畅行天下升级版", age: "25-50周岁", validTime: "180天", generalize: "飞机/轨道交通/商业运营汽车", highestMoney: "100万元", phone: "95511", detail: [{ duty: "航空(飞机)意外伤害身故、残疾保障", money: "100万元" }, { duty: "火车、地铁、轻轨意外伤害身故、残疾保障", money: "50万元" }, { duty: "轮船意外伤害身故、残疾保障", money: "50万元" }, { duty: "商业运营汽车意外和出租车意外伤害身故、残疾保障", money: "10万元" }, { duty: "飞机、火车、地铁、轻轨、轮船、商业运营汽车、出租车意外伤害医疗保障", money: "2万元" }, { duty: "行李物品和旅行证件损失保障", money: "500元" }] },
        pingan_wyeh: { code: "pingan", company: "中国平安", insuranceName: "网银E护", age: "25-50周岁", validTime: "30天", generalize: "个人银行卡/网络帐户资金损失保障（不含第三方支付帐户）飞机意外伤害身故和残疾", highestMoney: "1万元", phone: "95511" },
        taikang_tdb: { code: "taikang", company: "泰康人寿", insuranceName: "铁定保", age: "25-50周岁", validTime: "1年", generalize: "高铁（只包含G/C/D车次）意外保障", highestMoney: "50万元", phone: "95522" },
        taikang_lxwy: { code: "taikang", company: "泰康人寿", insuranceName: "乐行无忧", age: "25-50周岁", validTime: "90天", generalize: "飞机/火车、地铁、轻轨、轮船/商业运营汽车", highestMoney: "20万元", phone: "95522", detail: [{ duty: "飞机意外保障", money: "20万" }, { duty: "火车、地铁、轻轨、轮船意外保障", money: "10万" }, { duty: "市内公共汽/电车、长途公共汽车、旅行社客车、机场公共汽车及出租车意外保障", money: "5万元" }] },
        taikang_fcb: { code: "taikang", company: "泰康人寿", insuranceName: "飞常保", age: "25-50周岁", validTime: "1年", generalize: "国内及国际航班意外保障", highestMoney: "100万", phone: "95522" },
        huaxia_ggjt: { code: "huaxia", company: "华夏保险", insuranceName: "华夏自由行公共交通意外伤害保险", age: "25-50周岁", validTime: "3个月", generalize: "飞机/公共汽车/出租车意外/地铁/火车/轻轨/轮船", highestMoney: "20万元", phone: "95300", detail: [{ duty: "飞机意外保障", money: "20万" }, { duty: "公共汽车、出租车意外保障", money: "3万" }, { duty: "地铁、火车、轻轨、轮船意外保障", money: "5万" }] },
        zhongying_daikuan: { code: "zhongying", company: "中英人寿", insuranceName: "交通意外伤害保险", age: "25-50周岁", validTime: "90天", generalize: "飞机/轨道交通/汽车/非营运汽车", highestMoney: "20万元", phone: "95545", detail: [{ duty: "乘飞机意外保障", money: "20万" }, { duty: "乘轨道交通意外保障", money: "20万" }, { duty: "乘坐商业运营汽车意外保障", money: "20万" }, { duty: "乘坐非营运汽车意外保障", money: "20万" }] },
        zhongying_changgui: { code: "zhongying", company: "中英人寿", insuranceName: "交通意外伤害保险C款", age: "25-50周岁", validTime: "90天", generalize: "飞机/轨道交通/汽车/非营运汽车", highestMoney: "10万元", phone: "95545", detail: [{ duty: "乘飞机意外保障", money: "10万" }, { duty: "乘轨道交通意外保障", money: "10万" }, { duty: "乘坐商业运营汽车意外保障", money: "10万" }, { duty: "乘坐非营运汽车意外保障", money: "10万" }] },
        taiping_tpwy: { code: "taiping", company: "太平人寿", insuranceName: "太平无忧意外伤害保险", age: "22-48周岁", validTime: "90天", generalize: "客运机动车/客运列车或客运轮船/飞机", highestMoney: "8万元", phone: "95589", detail: [{ duty: "客运机动车意外保障", money: "1万元" }, { duty: "客运列车或客运轮船意外保障", money: "1万元" }, { duty: "飞机意外保障", money: "8万元" }] },
        zhongyi_leanbao: { code: "zhongyi", company: "中意人寿", insuranceName: "乐安保意外伤害险", age: "25-50周岁", validTime: "90天", generalize: "驾驶或乘坐一般道路交通工具", highestMoney: "10万元", phone: "400-888-9888", detail: [{ duty: "驾驶或乘坐一般道路交通工具意外身故保障", money: "10万元" }, { duty: "驾驶或乘坐一般道路交通工具意外伤残保障", money: "5000元" }] },
        beidafangzheng_lxat: { code: "beidafangzheng", company: "北大方正人寿", insuranceName: "乐享安途交通意外伤害保险", age: "25-50周岁", validTime: "60天", generalize: "飞机/火车/地铁/轻轨/轮船/公共汽车、电车、旅行社客车、机场公共汽车、出租车", highestMoney: "10万元", phone: "400-820-5882" },
        daduhui_jtzh: { code: "daduhui", company: "大都会保险", insuranceName: "交通综合意外保险产品计划", age: "25-50周岁", validTime: "30天", generalize: "水陆公共交通意外身故/航空意外身故/自驾（驾驶+乘坐）", highestMoney: "100万元", phone: "400-818-8168", detail: [{ duty: "水陆公共交通意外身故+意外伤残", money: "10万元+1万元" }, { duty: "航空意外身故+意外伤残", money: "100万元+10万元" }, { duty: "自驾（驾驶+乘坐）意外身故+意外伤残", money: "10万元+1万元" }] },
        zsxn_xlb: { code: "zsxn", company: "招商信诺", insuranceName: "行路宝公共交通意外伤害保险", age: "25-50周岁", validTime: "90天", generalize: "陆路公共交通/水路公共交通/民用航空", highestMoney: "20万元", phone: "400-820-5882", detail: [{ duty: "陆路公共交通意外身故或全残保障", money: "5万元" }, { duty: "水路公共交通意外身故或全残保障", money: "5万元" }, { duty: "民用航空意外身故或全残保障", money: "20万元" }] },
        yangguang_cxwy: { code: "yangguang", company: "阳光人寿", insuranceName: "出行无忧意外伤害保险2013款", age: "20-55周岁", validTime: "1个月", generalize: "飞机意外/轮船意外/轨道意外/汽车意外", highestMoney: "10万元", phone: "95510", detail: [{ duty: "飞机意外", money: "10万元" }, { duty: "轮船意外", money: "2万元" }, { duty: "轨道意外", money: "2万元" }, { duty: "汽车意外", money: "2万元" }] },
        matchingInsurance: function(e) { var n = ""; return "yanshi_pingan_hy_wycx" !== e && "yanshi_pingan_hy_wycx" !== e && "yanshi_pingan_anchor_wycx" !== e && "yanshi_pingan_hy_wycx1" !== e && "yanshi_pingan_xd_wycx" !== e && "caixun_payw" !== e || (n = this.pingan_cxtx), "zhongying_yiwai_c" === e && (n = this.zhongying_changgui), "virtual_zyloan" !== e && "virtual_zyedm" !== e && "v_zy_lxys" !== e || (n = this.zhongying_daikuan), "taikang_tdb" === e && (n = this.taikang_tdb), "tk_lxwy" === e && (n = this.taikang_lxwy), "huaxia_yiwai" === e && (n = this.huaxia_ggjt), "zhongyi_lab" === e && (n = this.zhongyi_leanbao), "bdfz_lxat" === e && (n = this.beidafangzheng_lxat), "ddh_jtzhyw_a" !== e && "cbddh_cb" !== e && "caixun_jtzhyw" !== e || (n = this.daduhui_jtzh), "taiping_caixun" !== e && "taiping_yiwai2" !== e && "taiping_yiwai" !== e && "taiping_bwxwy" !== e && "ceshibaoxian-taiping" !== e || (n = this.taiping_tpwy), "yanshi_pingan_hy_wyeh" === e && (n = this.pingan_wyeh), "bangling_yangguang" !== e && "yangguang_wycx" !== e || (n = this.yangguang_cxwy), n },
        initInsurance: function(e) {
            var n = "",
                a = "",
                i = "",
                t = "",
                o = this;
            $.each(e, function(l, c) {
                var y = c.insurance.interfaceCode,
                    h = o.matchingInsurance(y);
                0 === l ? (n += '<p alt="' + y + '" id="tab_true">' + h.company + "</p>", a = o.getInsuranceHtml(h)) : n += '<p alt="' + y + '">' + h.company + "</p>", e.length - 1 === l ? i += h.company : (i += h.company, i += "、"), t += '<li><img src="../../images/logo/' + h.code + '.png"></li>', init.cutInput && "泰康人寿" === h.company && o.cutInputHTML()
            }), $(".tab_li").html(n), $(".insranceDetail .detail").html(a), $(".insuranceListName").html(i), $(".companyImg").html(t), o.initInsuranceFun(), o.initSexFun()
        },
        initInsuranceFun: function() {
            var e = this;
            $(".tab_li p").click(function() {
                $(".tab_li p").removeAttr("id"), $(this).attr("id", "tab_true");
                var n = $(this).attr("alt"),
                    a = e.matchingInsurance(n),
                    i = e.getInsuranceHtml(a);
                $(".insranceDetail .detail").html(i)
            })
        },
        initSexFun: function() { $(".sex label").click(function() { $(".sex label").removeClass("label_true"), $(this).addClass("label_true") }) },
        getInsuranceHtml: function(e) { var n = ""; return n += "<table>", n += '<tr><td colspan="3"><p>适用年龄: ' + e.age + "<span>保障期限: " + e.validTime + "</span></p></td></tr>", n += "<tr><th>保障名称</th><th>保障责任</th><th>最高保额</th></tr>", e.detail ? $.each(e.detail, function(a, i) { n += "<tr>", 0 === a && (n += '<td rowspan="' + (e.detail.length + 1) + '">' + e.insuranceName + "</td>"), n += "<td>" + i.duty + "</td><td>" + i.money + "</td>", n += "</tr>" }) : n += "<tr><td>" + e.insuranceName + "</td><td>" + e.generalize + "</td><td>" + e.highestMoney + "</td></tr>", n += "</table>" },
        cutInputHTML: function() { init.isCutStatus = !0, $(".isSexBirth").hide(), $(".isIdCard").show() },
        calculateQuestionHTML: function(e) {
            var n = [{ tit: "4、您期望的保障金额是？", select: [{ value: "10", text: "10万" }, { value: "20", text: "20万" }, { value: "30", text: "30万" }, { value: "50", text: "50万" }] }, { tit: "5、您更倾向的缴费方式为？", select: [{ value: "ANNUAL", text: "年交" }] }],
                a = "",
                i = !1;
            $.each(e, function(e, n) { if (null !== n.premiumInsurance) return i = !0, init.isCalculateProduct = !0, !1 }), i && ($.each(n, function(e, n) { a += '<li class="ques_tit">' + n.tit + "</li>", a += '<li class="ques_select ques_type_one">', $.each(n.select, function(n, i) { a += e + 4 === 5 ? '<span><label class="ques_select_label select_label">' : '<span><label class="ques_select_label">', a += '<input type="radio" name="answerIds[' + (e + 4) + ']" value="' + i.value + '">' + i.text, a += "</label></span>" }), a += "</li>" }), $("#calculateQuestion").html(a))
        }
    },
    calculateInsuranceDetail = { taiping: { productName: "百万行无忧", needSex: !0, testPremiumCode: init.testPremiumCode.taiping, selectMoney: [{ v: "10", h: "10万" }, { v: "20", h: "20万" }, { v: "30", h: "30万" }, { v: "50", h: "50万" }, { v: "100", h: "100万" }], selectType: [{ v: "MONTHLY", h: "月交" }, { v: "ANNUAL", h: "年交" }], detail: [{ project: "公共交通工具意外身故", explain: "公共交通工具意外身故,最高赔付100万元" }, { project: "私家车驾乘意外身故", explain: "驾驶私家车意外身故,最高赔付100万元" }, { project: "自然灾害意外身故", explain: "因8种自然灾害意外身故最高赔付100万元" }, { project: "一般意外身故", explain: "一般意外身故最高赔付10万元" }, { project: "法定节假日意外身故", explain: "额外赔付基本保额10万元" }, { project: "意外伤残", explain: "因意外导致的伤残按照伤残等级赔付,最高赔付10万元" }, { project: "其他身故", explain: "因意外之外原因身故赔付110%所交保费" }, { project: "满期保险金", explain: "合同期满,给付110%所交保费" }] }, daduhui: { productName: "都来保", needSex: !1, testPremiumCode: init.testPremiumCode.ddh, selectMoney: [{ v: "10", h: "10万" }, { v: "20", h: "20万" }, { v: "30", h: "30万" }, { v: "50", h: "50万" }, { v: "100", h: "100万" }], selectType: [{ v: "MONTHLY", h: "月交" }, { v: "ANNUAL", h: "年交" }], detail: [{ project: "意外身故", explain: "1倍保额" }, { project: "意外残疾", explain: "保额×残疾比例+100%已交保费与现金价值中较大者" }, { project: "公交/自驾意外", explain: "2倍保额" }, { project: "航空意外", explain: "5倍保额" }, { project: "意外住院医疗", explain: "每次2%保额，可给付3次" }, { project: "意外关爱金", explain: "若因意外遭遇不测，每月2%保额，连续给付36个月" }, { project: "满期金", explain: "110%已交保费" }, { project: "身故金", explain: "18岁前：已交保费与现金价值较大者； 18岁及后：140%已交保费" }] }, zhongying: { productName: "乐享一生", needSex: !0, testPremiumCode: init.testPremiumCode.zy_lxys, selectMoney: [{ v: "10", h: "10万" }, { v: "20", h: "20万" }, { v: "30", h: "30万" }, { v: "50", h: "50万" }], selectType: [{ v: "1", h: "一次性交清" }, { v: "5", h: "5年" }, { v: "10", h: "10年" }, { v: "15", h: "15年" }, { v: "20", h: "20年" }], detail: [{ project: "重大疾病（81种）保险金", explain: "200万元（<i>100%</i>基本保险金额）" }, { project: "轻症疾病（29种）保险金", explain: "4万元（<i>20%</i>基本保险金额）" }, { project: "恶性肿瘤关爱保险金", explain: "10万元（<i>50%</i>基本保险金额）" }, { project: "身故/全残保险金", explain: "＜18周岁：给付已缴保险费 <br/>≧18周岁：20万元（<i>100%</i>基本保险金额）" }] }, pingan: { productName: "鸿运随行超值意外保障计划 ", needSex: !1, testPremiumCode: init.testPremiumCode.pingan, selectMoney: [{ v: "10", h: "10万" }, { v: "20", h: "20万" }, { v: "30", h: "30万" }, { v: "50", h: "50万" }, { v: "100", h: "100万" }], selectType: [{ v: "MONTHLY", h: "月交" }, { v: "ANNUAL", h: "年交" }], detail: [{ project: "保障期限", explain: "20年" }, { project: "期满生存金", explain: "118%返还所交保费" }, { project: "身故金", explain: "118%／150%返还所交保费" }, { project: "一般意外伤残或身故", explain: "30万元" }, { project: "自驾车意外伤残或身故", explain: "60万元" }, { project: "公共交通意外伤残或身故", explain: "60万元" }, { project: "意外伤害住院", explain: "<i class='premium_hospital_day'>200</i>元／天+意外医疗保额1.5万元(每年)" }] }, matchingCalculate: function(e) { var n = ""; return e.indexOf("中英") !== -1 && (n = this.zhongying), e.indexOf("平安") !== -1 && (n = this.pingan), e.indexOf("都来保") === -1 && e.indexOf("大都会") === -1 || (n = this.daduhui), e.indexOf("太平") !== -1 && (n = this.taiping), n } };

function jrtt_sdk_init(t) {
    init.sdkId = t,
        function(n) {
            n._tt_config = !0;
            var o = document.createElement("script");
            o.type = "text/javascript", o.async = !0, o.src = document.location.protocol + "//s3.pstatp.com/bytecom/resource/track_log/src/toutiao-track-log.js", o.onerror = function() {
                var n = new XMLHttpRequest,
                    e = window.encodeURIComponent(window.location.href),
                    r = o.src,
                    c = "//ad.toutiao.com/link_monitor/cdn_failed?web_url=" + e + "&js_url=" + r + "&convert_id=" + t;
                n.open("GET", c, !0), n.send(null)
            };
            var e = document.getElementsByTagName("script")[0];
            e.parentNode.insertBefore(o, e)
        }(window)
}

function jrtt_sdk_event() { return { form: function() { _taq.push({ convert_id: init.sdkId, event_type: "form" }) }, button: function() { _taq.push({ convert_id: init.sdkId, event_type: "button" }) } } }

function jw_load_js(t) {
    var p = ["http://m.vpadn.com/dsp/vpadn-segment.js?id=45_3505&t=2", "http://c-dsp.vpadn.com/conversion/45_33/?t=s", "http://m.vpadn.com/dsp/vpadn-segment.js?id=45_3506&t=2", "http://c-dsp.vpadn.com/conversion/45_34/?t=s", "http://m.vpadn.com/dsp/vpadn-segment.js?id=45_3507&t=2", "http://c-dsp.vpadn.com/conversion/45_37/?t=s", "http://m.vpadn.com/dsp/vpadn-segment.js?id=45_3569&t=2", "http://c-dsp.vpadn.com/conversion/45_38/?t=s", "http://m.vpadn.com/dsp/vpadn-segment.js?id=45_3570&t=2", "http://c-dsp.vpadn.com/conversion/45_39/?t=s"],
        n = document.getElementsByTagName("body")[0],
        d = document.createElement("script");
    d.type = "text/javascript", d.src = p[t], n.appendChild(d)
}

function paseQuestionnaire(e) {
    if (!(null === e || e.questions.length < 2)) {
        for (var s = "", n = 0; n < e.questions.length; n++) {
            s = s + "<li class='ques_tit'>" + (n + 1) + "、" + e.questions[n].questionContent + "</li> <li class='ques_select'>";
            for (var l = 0; l < e.questions[n].answers.length; l++) s = s + "<span><label><input type='radio' name='answerIds[" + n + "]' value='" + e.questions[n].answers[l].id + "'> " + e.questions[n].answers[l].answerContent + "</label></span>";
            s += "</li>"
        }
        $("#question_ul").html(s)
    }
}

function paseQuestionnaireTwo(e) {
    if (!(null === e || e.questions.length < 2)) {
        for (var s = "", n = 0; n < e.questions.length; n++) {
            s = s + "<li class='ques_tit'>" + (n + 1) + "、" + e.questions[n].questionContent + "</li> <li class='ques_select ques_type_one'>";
            for (var l = 0; l < e.questions[n].answers.length; l++) s = s + "<label class='ques_select_label'><input type='radio' name='answerIds[" + n + "]' value='" + e.questions[n].answers[l].id + "' alt='" + e.questions[n].answers[l].answerContent + "'> " + e.questions[n].answers[l].answerContent + "</label>";
            s += "</li>"
        }
        $("#question_ul").html(s), $(".ques_type_one label").on("click", function() { $(this).closest("li").find("label").removeClass("select_label"), $(this).addClass("select_label") })
    }
}

function paseQuestionnaireThree(e) {
    if (!(null === e || e.questions.length < 2)) {
        for (var s = "", n = 0; n < e.questions.length; n++) {
            s = s + "<li class='ques_tit'>" + (n + 1) + "、" + e.questions[n].questionContent + "</li> <li class='ques_select'>";
            for (var l = 0; l < e.questions[n].answers.length; l++) s = s + "<span><label class='ques_select_label' onclick='test(this)'><i></i><input type='radio' name='answerIds[" + n + "]' value='" + e.questions[n].answers[l].id + "'> " + e.questions[n].answers[l].answerContent + "</label></span>";
            s += "</li>"
        }
        $("#question_ul").html(s)
    }
}

function paseQuestionnaireXBB(e) {
    if (null !== e) {
        for (var s = "", n = 0; n < e.length; n++) {
            s = s + "<li class='ques_tit'>" + (n + 1) + "、" + e[n].question + "</li> <li class='ques_select ques_type_one'>";
            for (var l = 0; l < e[n].answerInfoList.length; l++) s = s + "<label class='ques_select_label'><input type='radio' name='answerIds[" + n + "]' value='" + e[n].answerInfoList[l].id + "'> " + e[n].answerInfoList[l].answer + "</label>";
            s += "</li>"
        }
        $("#question_ul").html(s), $(".ques_type_one label").on("click", function() { $(this).closest("li").find("label").removeClass("select_label"), $(this).addClass("select_label") })
    }
}

function paseQuestionnaire300(e) {
    console.log(e);
    var e = e.questions;
    if (null !== e) {
        for (var s = "", n = 0; n < e.length; n++) {
            s += "<li class='question_tit'>" + (n + 1) + "、" + e[n].questionContent + "</li> <li class='question_select'>", console.log(e[n].answers);
            for (var l = 0; l < e[n].answers.length; l++) s += "<label><input type='radio' name='answerIds[" + n + "]' value='" + e[n].answers[l].answerContent + "'> " + e[n].answers[l].answerContent + "</label>";
            s += "</li>"
        }
        $("#question_ul").html(s), $(".question_select label").on("click", function() { $(this).closest("li").find("label").removeClass("label_true"), $(this).addClass("label_true") })
    }
}

function getCaptcha(c, t) { _t = $(c), _customCss = t, _css_color = _t.css("color"), _css_backgroundColor = _t.css("background-color"), _onclick = _t.attr("onclick"), mobile = $("input[name='mobile']").val(), _t.removeAttr("onclick"), times = 60; try { v_mobile() } catch (o) { return popup.msg(o.message), void _t.attr("onclick", _onclick) } actService().sendCaptcha(mobile).then(function(c) { init.submit_switch ? (console.log("send"), popup.msg("验证码已发送"), change_btn_captcha_text_timer = setInterval(function() { change_btn_captcha_text() }, 1e3)) : 200 === c.statusCode ? (popup.msg("验证码已发送"), change_btn_captcha_text_timer = setInterval(function() { change_btn_captcha_text() }, 1e3)) : (_t.text("获取验证码").attr("onclick", _onclick).css({ color: _css_color, "background-color": _css_backgroundColor }), popup.msg(c.message)) }).fail(function(c) { _t.text("获取验证码").attr("onclick", _onclick).css({ color: _css_color, "background-color": _css_backgroundColor }), popup.msg(c.message) }) }

function sendXBBCaptcha(c, t) {
    _t = $(c), _customCss = t, _css_color = _t.css("color"), _css_backgroundColor = _t.css("background-color"), _onclick = _t.attr("onclick"), mobile = $("input[name='mobile']").val(), _t.removeAttr("onclick"), times = 60;
    try { v_mobile() } catch (o) { return popup.msg(o.message), void _t.attr("onclick", _onclick) }
    var _ = { mobile: mobile };
    xbbService().sendCaptcha(_), popup.msg("验证码已发送"), change_btn_captcha_text_timer = setInterval(function() { change_btn_captcha_text() }, 1e3)
}

function change_btn_captcha_text() { times--, times > 0 ? _t.text(times + "秒再获取").removeAttr("onclick").css(_customCss) : (clearInterval(change_btn_captcha_text_timer), _t.text("获取验证码").attr("onclick", _onclick).css({ color: _css_color, "background-color": _css_backgroundColor })) }
var change_btn_captcha_text_timer = null,
    times = 60,
    _t, _onclick, _css_color, _css_backgroundColor, _customCss;