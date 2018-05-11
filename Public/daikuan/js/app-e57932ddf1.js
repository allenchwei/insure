var configApi = { apiUrl: "http://zs.pg956.cn/", xbbApiUrl: "http://xbbstagingapi.data88.cn/" };

function xbbInit(e) { actService().getFetch(init.page_ad_code).then(function(t) { _newtank("ENTER", t.activityConfigInfos[0].pageInfos[0].pageName), init.object_config = t, e.xbbConfig = t, initLogic(e) }) }

function openNumber() {
    var e = getUserKey(),
        t = referrerUrl(),
        a = { userKey: e, activityId: init.activityId, eventType: "view", channelId: init.channelId, referer: t };
    actService().recordOpenNumber(a)
}

function initLogic(e) { var t = window.location.href; return init.submit_switch && "OFFLINE" === e.xbbConfig.status ? void popup.msg("该活动及渠道已下线，或者不存在!", { time: 5e3 }) : 0 !== e.newtankConfig.status ? void popup.msg("该活动及渠道已下线，或者不存在!", { time: 5e3 }) : t.indexOf("rep") !== -1 || e.newtankConfig.channelId || t.indexOf("duiba0807") !== -1 ? (init.activityId = e.newtankConfig.activityId, e.newtankConfig.channelId && (init.channelId = e.newtankConfig.channelId), e.newtankConfig.questionnaire && newtankParameter.question && newtankParameter.question(e.newtankConfig.questionnaire), void openNumber()) : void popup.msg("该活动及渠道已下线，或者不存在!", { time: 5e3 }) }

function actInit(e, t) {
    var a = popup.loding();
    addBaiduStatistics(), init.requestParams = getRequestParams();
    var n = adCodeMaps[e] || {};
    "string" != typeof n && (n = n[init.requestParams.channel]);
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
    if (actService().getSwitchAndFetch(init.page_ad_code).then(function(a) { return _newtank("ENTER", a.activityConfigInfos[0].pageInfos[0].pageName), init.object_config = a, init.submit_switch ? (createQestion(a.activityConfigInfos[0].pageInfos[0].questionnaireId), openNumber(), e.callBack && e.callBack(), void popup.close(t)) : void popup.msg("该活动及渠道已下线，或者不存在!", { time: 5e3 }) }), e.sdk) switch (e.sdk) {
        case "duiba":
            addDuibaSDK();
            break;
        case "bxm":
            console.log("bxm")
    }
}

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
    adCodeMaps = { btlh0913: "1c60a217", bxm0725: "f5100a0e", bxm0731: "c6fdb48e", bxm0828: "29d72fd5", bxm0906: "e2460664", bxm0915: "8fb7ce6b", bxm1011: "29bd1c99", bxm1026: "fc8a6cbd", daidaifu0913: "aa80c6a1", duiba0808: "e16d5993", duiba0825: "4b30d202", duiba0913: "27b14a70", duiba0915: "35c1de3a", duiba1010: "241ccace", duiba1009: { duiba_EDM: "3fc46dde", out_zkjc: "54f7cacd" }, duiba1030: "24766bba", duiba1031: "80ee8226", dlb0807: { dlb: "6e5cbb74", whsb: "2dd6c5c8", whsb2: "a27b9212", cp: "451f70df", lcsb: "df4aec73", xlsj: "2b035b2a", fb2: "f0772f36" }, dlb1012: "2490adfb", gmzx0918: "93a6648e", hlj0905: "3223454e", hlj0824: "8a5fe275", jkx0809: "39075282", ky0831: { xcly: "ef211c15", kuaiyan: "6a68a90c" }, lkyx0802: "4adbeebd", loan0620: "7fe4041d", loan0801: { "jrttds-1": "b09beec5", "jrttds-2": "551824df", "jrttds-3": "26d6d458", "jrttds-10": "ca740e3c", "jrttds-11": "0ae0dbfa", "jrttds-12": "7b956a56", "jrttds-13": "ed217924", "jrttds-14": "e8291de0" }, loan0802: { jrtt: "aaf8aedb", jrttds: "aaf8aedb", "jrttds-4": "bdc410ef", "jrttds-5": "38b73c99", "jrttds-6": "bc507300", "jrttds-9": "6189d112", "jrttds-15": "141de1d2", "jrttds-18": "a9cb4daf", "jrttds-19": "83187bc0" }, loan0817: "f5d17056", loan0825_1: "587839d5", loan0929: { "WJW-6": "76b19156" }, loan1030: "0ab0ff3c", lxys0925_zy: { "db-xxl": "f2398593" }, shaoer0912: "67bc4a37", shouqianba0809: "cb375d8d", tc0925: "a5cc52ea", tkjf0920: { tkjf: "297228f9", "tkjf-test": "b3e91cd6" }, tkjf1011: "8ce7e378", weiche0811: "5639790d", weifu0904: "e9cf1d50", ymt0829: "abe946a5", ymt0830: "f913ae25", yyzf0811: "de915a5d", zhiren0829: "6957dd65", zhiren0830: "2075c1ee", zhiren0831: "de2056f7", zhiren0901: { zhiren: "346740a2", "ymt-sx": "abe946a5" }, zhiren0918: "a6e9b61e", zhiren0919: "d23121ef", zql0920: "583df1da", zsxn1016: "1205897a", ymt1016: "abe946a5", ssmc1017: "816134e6", loan1017: "54a0111c", loan1020: "95483fe3", loan1023: "877e39da", loan1024: "e59aa9f8", loan1031: "77dde818", loan1103: "cda09577", loan1104: "ec756a8c", loan1105: "487d86b6", loan1108: "6bc39feb", loan1109_dlb: "ded3595c", loan1113_wy: "6577973f", loan1114_zhiren: "678cad40", loan1115: "64d204ae", loan1121: "8b63b6c4", loan1127: "7b5737ce", loan1128: "89b8b579", swPay1023: "e61e09b6", hz1025: "3226931e", hz1103: "7a505034", zhongyi1027: "bf3e7687", bjtt1030: "9f168279", changlan1103: "1dc8c968", hdt1113: "13731b78", tc1109_tk: "ad1f85d0", tc1109_tp: "62621ab6", tc1109_zy: "e90360ca", tc1109_ddh: "c4abb757", noteMarketing: "f89e1531" };

function actService() {
    var t = function(t) { var i = null; return i = init.submit_switch ? n(t) : $.post(configApi.apiUrl + "act/subdata.do", t) },
        n = function(t) { return $.ajax({ type: "post", url: configApi.xbbApiUrl + "insurance/doInsure", contentType: "application/json;charset=utf-8", data: JSON.stringify(t) }) },
        i = function(t, n) { return $.post(configApi.apiUrl + "act/checkAct.do", { activityCode: t, channelCode: n }) },
        e = function(t) { return $.get(configApi.apiUrl + "act/changeKnowMore", t) },
        a = function(t) { return $.post(configApi.apiUrl + "act/eventTrack", t) },
        r = function(t, n) { return $.get(configApi.apiUrl + "shouqianba/new/order/" + t + "/policyId/" + n) },
        c = function(t) { return $.get(configApi.apiUrl + "Home/index/success1?userCode=" + t) },
        o = function() { return $.get(configApi.apiUrl + "thp/hds/activatecode") },
        p = function(t) { return $.get(configApi.apiUrl + "thp/hds/activate", t) },
        u = function(t) { return $.get(configApi.apiUrl + "act/getAwardList.do", t) },
        g = function(t) {
            if (!init.submit_switch || newtankParameter.activityCode && newtankParameter.activityCode.match("loan")) {
                var n = configApi.apiUrl + "act/sendCaptcha.do",
                    i = { activityId: init.activityId, channelId: init.channelId, mobile: t, _d: (new Date).getTime() };
                return $.get(n, i)
            }
            var n = configApi.xbbApiUrl + "shortMessage/captcha/send",
                i = { mobile: t, adCode: init.page_ad_code };
            return $.ajax({ type: "post", url: n, contentType: "application/json; charset=utf-8", data: JSON.stringify(i) })
        },
        f = function(t) { return $.post(configApi.apiUrl + "act/loan/save", t) },
        s = function(t, n, i) { return $.get(configApi.apiUrl + "act/getad/checkAct", { activityCode: t, hierarchy: n, channelCode: i }) },
        l = function(t) { return $.post(configApi.apiUrl + "thp/loan/nlj", t) },
        h = function(t) { return $.post(configApi.apiUrl + "thp/loan/bxym", t) },
        d = function(t) { return $.get("https://buy.bianxianmao.com/shop/countInfo", t) },
        A = function(t) { return $.get(configApi.apiUrl + "act/drawTimes", { flag: t }) },
        b = function(t) { return $.ajax({ type: "POST", url: configApi.apiUrl + "thp/extrainfo", contentType: "application/json; charset=utf-8", data: JSON.stringify(t), dataType: "json" }) },
        U = function(t) { return $.get(configApi.xbbApiUrl + "config/fetch/code/" + t) },
        y = function(t) { return $.get(configApi.xbbApiUrl + "trigger/coreRefactor/get") },
        w = function(t) { return $.post(configApi.apiUrl + "act/checkCaptcha", t) },
        v = function(t) { return $.ajax({ type: "POST", url: configApi.xbbApiUrl + "shortMessage/captcha/verify", contentType: "application/json; charset=utf-8", data: JSON.stringify(t) }) },
        m = function(t) { return $.get(configApi.apiUrl + "thp/loan/bxml/" + t) },
        x = function(t) { return $.get(configApi.apiUrl + "thp/loan/bxwm/" + t) },
        C = function(t) {
            return $.when(y(), U(t)).then(function(t, n) {
                var i = t[0];
                i && i.trigger && "ON" === i.trigger.toUpperCase() ? init.submit_switch = !0 : init.submit_switch = !1;
                var e = n[0];
                return e
            })
        },
        S = function(t) { return $.get(configApi.xbbApiUrl + "questionnaire/get/" + t) },
        O = function(t) { return $.get(configApi.apiUrl + "thp/loan/atOnce/" + t) },
        T = function(t) { return $.get(configApi.apiUrl + "thp/loan/bxwm/" + t) },
        j = function(t) { return $.get(configApi.apiUrl + "thp/loan/getbxyfUrl/" + t) },
        k = function(t) { return $.post(configApi.apiUrl + "act/keyword", t) };
    return { actSave: t, actCheckAct: i, actKnowMore: e, recordOpenNumber: a, shouqianbaOrder: r, getUserInfo: c, getActivatecode: o, actHdsActivate: p, getAwardList: u, sendCaptcha: g, largeLoanSave: f, getAd: s, getNLJ: l, getBXYM: h, bxmAD_SDK: d, getDrawNumber: A, updateUserTag: b, getFetch: U, getSwitch: y, checkCaptcha: w, checkCaptchaXbb: v, postBaixing: m, baixingNoPwdLogin: x, actSaveNew: n, getSwitchAndFetch: C, getQuestionnaireDetailById: S, postAtOnce: O, getBxwm: T, getYfBxwm: j, getKeyword: k }
}

function adminService() {
    var t = function(t, n) { return $.ajax({ type: "POST", url: configApi.apiUrl + "thp/mlb/switch/key/" + t + "/flag/" + n, contentType: "application/json; charset=utf-8", dataType: "json" }) },
        n = function() { return $.get(configApi.apiUrl + "thp/mlb/listChannel") },
        e = function(t, n) { return $.get(configApi.apiUrl + "thp/mlb/getData/startAt/" + t + "/endAt/" + n) };
    return { changeStatus: t, getDetail: n, getNumber: e }
}

function otherService() {
    var t = function(t) { return $.post(configApi.apiUrl + "thp/hitalk/save", t) },
        e = function(t) { return $.ajax({ type: "POST", url: configApi.apiUrl + "thp/education/save", contentType: "application/json; charset=utf-8", data: JSON.stringify(t), dataType: "json" }) },
        a = function(t) { return $.ajax({ type: "POST", url: configApi.apiUrl + "act/chelun/redeemCode/" + t + "/batch/4", contentType: "application/json; charset=utf-8", dataType: "json" }) },
        n = function(t) { return $.ajax({ type: "POST", url: configApi.apiUrl + "act/chelun/redeemCodeUpdate/" + t + "/batch/4", contentType: "application/json; charset=utf-8", dataType: "json" }) },
        i = function(t) { return $.ajax({ type: "POST", url: configApi.apiUrl + "thp/bxgh/save", contentType: "application/json; charset=utf-8", data: JSON.stringify(t), dataType: "json" }) };
    return { saveHiTalk: t, saveEducation: e, redeemCode: a, redeemCodeUpdate: n, bxghSave: i }
}

function xbbService() {
    var t = function(t) { return $.ajax({ type: "POST", url: configApi.xbbApiUrl + "activity/premiumCalculate", contentType: "application/json; charset=utf-8", data: JSON.stringify(t), dataType: "json" }) },
        n = function(t) { var n = null; return console.log(init.submit_switch), n = init.submit_switch ? actService().actSaveNew(t) : $.ajax({ type: "POST", url: configApi.xbbApiUrl + "activity/takePartIn", contentType: "application/json; charset=utf-8", data: JSON.stringify(t), dataType: "json" }) },
        e = function(t) { return $.ajax({ type: "GET", url: configApi.xbbApiUrl + "questionnaire/get/" + t, contentType: "application/json; charset=utf-8", dataType: "json" }) },
        i = function(t) { return $.get(configApi.apiUrl + "interface/userInfo?userCode=" + t + "&type=2") },
        a = function(t) { return t.adCode = init.page_ad_code, $.ajax({ type: "POST", url: configApi.xbbApiUrl + "shortMessage/captcha/send", contentType: "application/json; charset=utf-8", dataType: "json", data: JSON.stringify(t) }) },
        c = function(t) { return $.ajax({ type: "GET", url: configApi.xbbApiUrl + "activity/conf/check/" + t, contentType: "application/json; charset=utf-8", dataType: "json" }) };
    return { testPremium: t, actSave: n, getQuestionnaire: e, getUserInfo: i, sendCaptcha: a, getActivityInfo: c }
}

function adUrl() { return { ad_rong360: { name: "融360", url: "http://m.rong360.com/express?from=sem21&utm_source=yuanshan&utm_medium=cpc5&utm_campaign=1" } } }

function goADUrl(e) {
    var n = getUserKey(),
        r = { userKey: n, activityId: init.activityId, eventType: "ad_click", adCode: e, channelId: init.channelId };
    actService().recordOpenNumber(r).then(function() { window.location.href = adUrl()[e].url })
}

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
    if (e < 25 || e > 50) throw new Error("您的年龄不在25-50周岁受保范围内")
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
    if (r < n || r > e) throw new Error("出生日期不能小于" + n + "岁大于" + e + "周岁")
}

function v_birth_0_17() {
    var n = $("input[name='birth']").val(),
        e = (new Date).getFullYear() - n.split("-")[0];
    if (e < 0 || e > 17) throw new Error("出生日期不能大于17周岁")
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
    n.type = "text/javascript", n.innerHTML = 'var _hmt = _hmt || []; (function() { var hm = document.createElement("script"); hm.src = "../../../hm.baidu.com/hm.js-80b5d4d37e762744324258458e2ee0d9"/*tpa=http://hm.baidu.com/hm.js?80b5d4d37e762744324258458e2ee0d9*/; hm.src = "../../../hm.baidu.com/hm.js-80b5d4d37e762744324258458e2ee0d9"/*tpa=http://hm.baidu.com/hm.js?80b5d4d37e762744324258458e2ee0d9*/; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s); })(); ';
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

function loanUrl() { return { loan_klqian: { name: "快来钱", url: "http://www.klqian.com/pabx/view/078f9fbb61d44041982516855f0f6c76.shtml" }, loan_lanlingdai: { name: "蓝领贷", url: "http://www.lanlingdai.net/lld/page/reg_txxy.html?regSource=xdyx" }, loan_ppdai: { name: "曹操贷", url: "https://m.ppdai.com/act/cpa/?source=kuailaiqian&url=https://lnk0.com/QNNF5s" }, loan_spdbccc: { name: "青春贷", url: "https://ecentre.spdbccc.com.cn/creditcard/netLoanYoung.htm?channel=BRWH" }, loan_xianhuahua: { name: "先花一个亿", url: "http://weixin.xianhuahua.com/dev/coupon/couponappsix?from=1110" }, loan_yangqianguan: { name: "现金借贷", url: "https://www.yangqianguan.com/flexible/index?act=OwbPtJ" }, loan_xhqb: { name: "小花钱包", url: " https://www.xhqb.com/m/ffpp.html?appChannel=kuailq01" }, loan_xiaoying: { name: "小赢卡贷", url: "https://cardloan.xiaoying.com/kadai/index?source=10000934" }, loan_2345: { name: "2345贷款王", url: "https://mdaikuan.2345.com/register3?channel=hj-kuailaiqian_cpk_wlei " }, loan_omsys: { name: "i贷", url: "https://www.omsys.com.cn/Pinganwl/index.php?aid=UGluZ2Fud2xfNTE5Nl84MV95ZXM=" }, loan_invest_ppdai: { name: "拍拍贷", url: "https://m.invest.ppdai.com/landinginfonew.html?regsourceid=hongyuejiekuanx02&role=1" }, loan_rongzi: { name: "东方融资网", url: "https://m.rongzi.com/lp/daikuan1/?hmsr=xindan&utm_source=62&utm_medium=cpc&utm_term=%E4%B8%9C%E6%96%B9%E8%9E%8D%E8%B5%84%E7%BD%91&utm_content=%E8%B4%B7%E6%AC%BE&utm_campaign=BD-%E6%96%B0%E6%97%A6" }, loan_91qianmi: { name: "钱米", url: "http://91qianmi.com/bmember/imgregister.xhtm?inviteCode=A694358" }, loan_doraemoney: { name: "玖富叮", url: "https://cube.doraemoney.com/newCube/index.html?proId=8e74b8e0647343218c77bd365e924532" }, loan_taoqian123: { name: "淘钱宝", url: "https://m.taoqian123.com/?channel_id=163" }, loan_youqian: { name: "马上有钱联盟", url: "https://youqian.msxf.com/exp/80009071-2-1" }, loan_yirendai: { name: "宜人贷", url: "https://bang.yirendai.com/signup.html?referrer=shxdyxgl" }, loan_yixin: { name: "宜信普惠", url: "http://x.yixin.com/tongyong7?utm_source=Xindanyingxiao&utm_medium=xd-cps&utm_term=&utm_content=&utm_campaign=%E6%96%B0%E6%97%A6%E8%90%A5%E9%94%801" }, loan_student: { name: "名校贷", url: "https://m.nonobank.com/mxdsite/landing/?isSchool=true&userStatus=student&am-id=2753" }, loan_whiteCollar: { name: "名校贷_白领版", url: "https://m.nonobank.com/mxdsite/landing/?isSchool=true&userStatus=whiteCollar&am_id=2753" }, loan_largeLoan: { name: "极速大额贷款", url: "http://stagingwap.newtank.cn/newtank/js/largeLoan.html" } } }

function goLoadUrl(n, e) {
    var t = getUserKey(),
        r = { userKey: t, activityId: init.activityId, eventType: "ad_click", adCode: e, channelId: init.channelId };
    actService().recordOpenNumber(r).then(function() { window.location.href = n })
}

function loanHtml(n) { for (var e = "", t = 0; t < n.length; t++) { e += "<li onclick=goLoadUrl('" + n[t].url + "','" + n[t].code + "')>", e += "<img src=" + n[t].iconUrl + ">", e += "<p>", e += "<span>" + n[t].name + "</span>", e += n[t].description, e += "<br/><i>" + n[t].number + "</i> 人已申请", e += "</p>", e += '<a href="javascript:void(0)"></a>', e += "</li>" } return e }

function didi() { window.location.href = "https://static.dorado.xiaojukeji.com/vue/dist/coupon.html?schannel=didi&a=&b=20000&c=20000&d=0&s=9127060246242807087&cId=416&v=1.0&t=weixin_appmsg&openid=oDe7ajiyJt-ml_YZlsEPhPhI3kV4&acctoken=7783278e1cbc42534e14fc231fb0e3c4&needuserinfo=0" }

function loanProfile() {
    var n = "",
        e = new Object;
    return e = getRequestChina(), n += "pl=" + e.pl, n += "&un=" + e.un, n += "&kw=" + e.kw, n += "&so=" + e.so, n += "&me=" + e.me, n += "&au=" + e.au
}

function getRequestChina() {
    var n = window.location.search,
        e = new Object;
    if (n.indexOf("?") != -1) {
        var t = n.substr(1);
        strs = t.split("&");
        for (var r = 0; r < strs.length; r++) e[strs[r].split("=")[0]] = decodeURI(strs[r].split("=")[1])
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
    n.type = "text/javascript", n.src = "../../../yun.duiba.com.cn/h5-tuia/adverter.js" /*tpa=http://yun.duiba.com.cn/h5-tuia/adverter.js*/ ;
    var e = document.getElementsByTagName("script")[0];
    e.parentNode.insertBefore(n, e)
}

function goSDK(n, e) { "f0fa48fd" === init.adCode || "1a7f1ac5" === init.adCode ? TuiaAdverter.init(function() { e() }, n) : e() }
var RegexConstants = { REGEX_MOBILE: /^1[3|4|5|7|8][0-9]\d{8}$/, REGEX_ID_CARD: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/, REGEX_CHINESE: /^([\u4E00-\uFA29])*$/, REGEX_CHINESE_2_4: /^([\u4E00-\uFA29]){2,4}$/, REGEX_YYYY_MM_DD: /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/, REGEX_EMAIL: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, REGEX_NUM_INT_6: /^\d{6}$/ };

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
        pingan_cxtx: { code: "pingan", company: "中国平安", insuranceName: "中国平安畅行天下升级版", age: "25-50周岁", validTime: "180天", generalize: "飞机/轨道交通/商业运营汽车", highestMoney: "100万元", phone: "95511", detail: [{ duty: "飞机意外伤害身故/残疾", money: "100万元" }, { duty: "火车、地铁、轻轨意外伤害身故/伤残", money: "50万元" }, { duty: "轮船意外伤害身故/残疾", money: "50万元" }, { duty: "商业运营汽车意外伤害身故/残疾", money: "10万元" }, { duty: "商业交通工具意外伤害医疗", money: "20万元" }, { duty: "行李物品和旅行社证件损失", money: "500元" }] },
        taikang_tdb: { code: "taikang", company: "泰康人寿", insuranceName: "铁定保", age: "25-50周岁", validTime: "1年", generalize: "火车", highestMoney: "50万元", phone: "95522" },
        huaxia_ggjt: { code: "huaxia", company: "华夏保险", insuranceName: "华夏自由行公共交通意外伤害保险", age: "25-50周岁", validTime: "90天", generalize: "飞机/公共汽车/出租车意外/地铁/火车/轻轨/轮船", highestMoney: "20万元", phone: "95300", detail: [{ duty: "飞机意外", money: "20万" }, { duty: "公共汽车/出租车意外", money: "3万" }, { duty: "地铁/火车/轻轨/轮船", money: "5万" }] },
        zhongying_daikuan: { code: "zhongying", company: "中英人寿", insuranceName: "交通意外伤害保险C款", age: "25-48周岁", validTime: "90天", generalize: "飞机/轨道交通/汽车/非营运汽车", highestMoney: "20万元", phone: "95545" },
        zhongying_changgui: { code: "zhongying", company: "中英人寿", insuranceName: "交通意外伤害保险", age: "25-48周岁", validTime: "90天", generalize: "飞机/轨道交通/汽车/非营运汽车", highestMoney: "10万元", phone: "95545" },
        taiping_tpwy: { code: "taiping", company: "太平人寿", insuranceName: "太平无忧意外伤害保险", age: "22-48周岁", validTime: "90天", generalize: "客运机动车/客运列车或客运轮船/飞机", highestMoney: "8万元", phone: "95589", detail: [{ duty: "客运机动车", money: "1万元" }, { duty: "客运列车或客运轮船", money: "1万元" }, { duty: "飞机", money: "8万元" }] },
        zhongyi_leanbao: { code: "zhongyi", company: "中意人寿", insuranceName: "乐安保意外伤害险", age: "22-48周岁", validTime: "90天", generalize: "驾驶或乘坐一般道路交通工具", highestMoney: "10万元", phone: "400-888-9888", detail: [{ duty: "驾驶或乘坐一般道路交通工具意外身故保障", money: "10万元" }, { duty: "驾驶或乘坐一般道路交通工具意外伤残保障", money: "5000元" }] },
        beidafangzheng_lxat: { code: "beidafangzheng", company: "北大方正人寿", insuranceName: "乐享安途交通意外伤害保险", age: "25-50周岁", validTime: "60天", generalize: "飞机/火车/地铁/轻轨/轮船/公共交通", highestMoney: "10万元", phone: "400-820-5882" },
        daduhui_jtzh: { code: "daduhui", company: "大都会保险", insuranceName: "交通综合意外保险产品计划", age: "25-50周岁", validTime: "30天", generalize: "水陆公共交通意外身故/航空意外身故/自驾（驾驶+乘坐）", highestMoney: "100万元", phone: "400-818-8168", detail: [{ duty: "水陆公共交通意外身故+意外伤残", money: "10万元+1万元" }, { duty: "航空意外身故+意外伤残", money: "100万元+10万元" }, { duty: "自驾（驾驶+乘坐）意外身故+意外伤残", money: "10万元+1万元" }] },
        matchingInsurance: function(e) { var n = ""; return "yanshi_pingan_hy_wycx" !== e && "yanshi_pingan_hy_wycx" !== e && "yanshi_pingan_anchor_wycx" !== e && "yanshi_pingan_hy_wycx1" !== e || (n = this.pingan_cxtx), "zhongying_yiwai_c" === e && (n = this.zhongying_changgui), "virtual_zyloan" !== e && "virtual_zyedm" !== e && "v_zy_lxys" !== e || (n = this.zhongying_daikuan), "taikang_tdb" !== e && "tk_lxwy" !== e || (n = this.taikang_tdb), "huaxia_yiwai" === e && (n = this.huaxia_ggjt), "zhongyi_lab" === e && (n = this.zhongyi_leanbao), "bdfz_lxat" === e && (n = this.beidafangzheng_lxat), "ddh_jtzhyw_a" !== e && "cbddh_cb" !== e || (n = this.daduhui_jtzh), "taiping_caixun" !== e && "taiping_yiwai2" !== e && "taiping_yiwai" !== e || (n = this.taiping_tpwy), n },
        initInsurance: function(e) {
            var n = "",
                i = "",
                a = "",
                t = this;
            $.each(e, function(h, o) {
                var d = o.insurance.interfaceCode,
                    c = t.matchingInsurance(d);
                0 === h ? (n += '<p alt="' + d + '" id="tab_true">' + c.company + "</p>", i = t.getInsuranceHtml(c)) : n += '<p alt="' + d + '">' + c.company + "</p>", e.length - 1 === h ? a += c.company : (a += c.company, a += "、")
            }), $(".tab_li").html(n), $(".insranceDetail .detail").html(i), $(".insuranceListName").html(a), t.initInsuranceFun()
        },
        initInsuranceFun: function() {
            var e = this;
            $(".tab_li p").click(function() {
                $(".tab_li p").removeAttr("id"), $(this).attr("id", "tab_true");
                var n = $(this).attr("alt"),
                    i = e.matchingInsurance(n),
                    a = e.getInsuranceHtml(i);
                $(".insranceDetail .detail").html(a)
            })
        },
        getInsuranceHtml: function(e) { var n = ""; return n += "<table>", n += '<tr><td colspan="3"><p>适用年龄: ' + e.age + "<span>保险期限: " + e.validTime + "</span></p></td></tr>", n += "<tr><th>保障名称</th><th>保险责任</th><th>最高保额</th></tr>", e.detail ? (n += '<tr><td rowspan="' + (e.detail.length + 1) + '">' + e.insuranceName + "</td><td>" + e.detail[0].duty + "</td><td>" + e.detail[0].money + "</td></tr>", $.each(e.detail, function(e, i) { n += "<tr><td>" + i.duty + "</td><td>" + i.money + "</td></tr>" })) : n += "<tr><td>" + e.insuranceName + "</td><td>" + e.generalize + "</td><td>" + e.highestMoney + "</td></tr>", n += "</table>" }
    },
    calculateInsuranceDetail = { taiping: { productName: "百万行无忧", needSex: !0, testPremiumCode: init.testPremiumCode.taiping, selectMoney: [{ v: "10", h: "10万" }, { v: "20", h: "20万" }, { v: "30", h: "30万" }, { v: "50", h: "50万" }, { v: "100", h: "100万" }], selectType: [{ v: "MONTHLY", h: "月交" }, { v: "ANNUAL", h: "年交" }], detail: [{ project: "公共交通工具意外身故", explain: "公共交通工具意外身故,最高赔付100万元" }, { project: "私家车驾乘意外身故", explain: "驾驶私家车意外身故,最高赔付100万元" }, { project: "自然灾害意外身故", explain: "因8种自然灾害意外身故最高赔付100万元" }, { project: "一般意外身故", explain: "一般意外身故最高赔付10万元" }, { project: "法定节假日意外身故", explain: "额外赔付基本保额10万元" }, { project: "意外伤残", explain: "因意外导致的伤残按照伤残等级赔付,最高赔付10万元" }, { project: "其他身故", explain: "因意外之外原因身故赔付110%所交保费" }, { project: "满期保险金", explain: "合同期满,给付110%所交保费" }] }, daduhui: { productName: "都来保", needSex: !1, testPremiumCode: init.testPremiumCode.ddh, selectMoney: [{ v: "10", h: "10万" }, { v: "20", h: "20万" }, { v: "30", h: "30万" }, { v: "50", h: "50万" }, { v: "100", h: "100万" }], selectType: [{ v: "MONTHLY", h: "月交" }, { v: "ANNUAL", h: "年交" }], detail: [{ project: "意外身故", explain: "1倍保额" }, { project: "意外残疾", explain: "保额×残疾比例+100%已交保费与现金价值中较大者" }, { project: "公交/自驾意外", explain: "2倍保额" }, { project: "航空意外", explain: "5倍保额" }, { project: "意外住院医疗", explain: "每次2%保额，可给付3次" }, { project: "意外关爱金", explain: "若因意外遭遇不测，每月2%保额，连续给付36个月" }, { project: "满期金", explain: "110%已交保费" }, { project: "身故金", explain: "18岁前：已交保费与现金价值较大者； 18岁及后：140%已交保费" }] }, zhongying: { productName: "乐享一生", needSex: !0, testPremiumCode: init.testPremiumCode.zy_lxys, selectMoney: [{ v: "10", h: "10万" }, { v: "20", h: "20万" }, { v: "30", h: "30万" }, { v: "50", h: "50万" }], selectType: [{ v: "1", h: "一次性交清" }, { v: "5", h: "5年" }, { v: "10", h: "10年" }, { v: "15", h: "15年" }, { v: "20", h: "20年" }], detail: [{ project: "重大疾病（81种）保险金", explain: "200万元（<i>100%</i>基本保险金额）" }, { project: "轻症疾病（29种）保险金", explain: "4万元（<i>20%</i>基本保险金额）" }, { project: "恶性肿瘤关爱保险金", explain: "10万元（<i>50%</i>基本保险金额）" }, { project: "身故/全残保险金", explain: "＜18周岁：给付已缴保险费 <br/>≧18周岁：20万元（<i>100%</i>基本保险金额）" }] }, pingan: { productName: "鸿运随行超值意外保障计划 ", needSex: !1, testPremiumCode: init.testPremiumCode.pingan, selectMoney: [{ v: "10", h: "10万" }, { v: "20", h: "20万" }, { v: "30", h: "30万" }, { v: "50", h: "50万" }, { v: "100", h: "100万" }], selectType: [{ v: "MONTHLY", h: "月交" }, { v: "ANNUAL", h: "年交" }], detail: [{ project: "保障期限", explain: "20年" }, { project: "期满生存金", explain: "118%返还所交保费" }, { project: "身故金", explain: "118%／150%返还所交保费" }, { project: "一般意外伤残或身故", explain: "30万元" }, { project: "自驾车意外伤残或身故", explain: "60万元" }, { project: "公共交通意外伤残或身故", explain: "60万元" }, { project: "意外伤害住院", explain: "<i class='premium_hospital_day'>200</i>元／天+意外医疗保额1.5万元(每年)" }] }, matchingCalculate: function(e) { var n = ""; return e.indexOf("中英") !== -1 && (n = this.zhongying), e.indexOf("平安") !== -1 && (n = this.pingan), e.indexOf("大都会") !== -1 && (n = this.daduhui), e.indexOf("太平") !== -1 && (n = this.taiping), n } };

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
        for (var s = "", l = 0; l < e.questions.length; l++) {
            s = s + "<li class='ques_tit'>" + (l + 1) + "、" + e.questions[l].questionContent + "</li> <li class='ques_select'>";
            for (var n = 0; n < e.questions[l].answers.length; n++) s = s + "<span><label><input type='radio' name='answerIds[" + l + "]' value='" + e.questions[l].answers[n].id + "'> " + e.questions[l].answers[n].answerContent + "</label></span>";
            s += "</li>"
        }
        $("#question_ul").html(s)
    }
}

function paseQuestionnaireTwo(e) {
    if (!(null === e || e.questions.length < 2)) {
        for (var s = "", l = 0; l < e.questions.length; l++) {
            s = s + "<li class='ques_tit'>" + (l + 1) + "、" + e.questions[l].questionContent + "</li> <li class='ques_select ques_type_one'>";
            for (var n = 0; n < e.questions[l].answers.length; n++) s = s + "<label class='ques_select_label'><input type='radio' name='answerIds[" + l + "]' value='" + e.questions[l].answers[n].id + "' alt='" + e.questions[l].answers[n].answerContent + "'> " + e.questions[l].answers[n].answerContent + "</label>";
            s += "</li>"
        }
        $("#question_ul").html(s), $(".ques_type_one label").on("click", function() { $(this).closest("li").find("label").removeClass("select_label"), $(this).addClass("select_label") })
    }
}

function paseQuestionnaireThree(e) {
    if (!(null === e || e.questions.length < 2)) {
        for (var s = "", l = 0; l < e.questions.length; l++) {
            s = s + "<li class='ques_tit'>" + (l + 1) + "、" + e.questions[l].questionContent + "</li> <li class='ques_select'>";
            for (var n = 0; n < e.questions[l].answers.length; n++) s = s + "<span><label class='ques_select_label' onclick='test(this)'><i></i><input type='radio' name='answerIds[" + l + "]' value='" + e.questions[l].answers[n].id + "'> " + e.questions[l].answers[n].answerContent + "</label></span>";
            s += "</li>"
        }
        $("#question_ul").html(s)
    }
}

function paseQuestionnaireXBB(e) {
    if (null !== e) {
        for (var s = "", l = 0; l < e.length; l++) {
            s = s + "<li class='ques_tit'>" + (l + 1) + "、" + e[l].question + "</li> <li class='ques_select ques_type_one'>";
            for (var n = 0; n < e[l].answerInfoList.length; n++) s = s + "<label class='ques_select_label'><input type='radio' name='answerIds[" + l + "]' value='" + e[l].answerInfoList[n].id + "'> " + e[l].answerInfoList[n].answer + "</label>";
            s += "</li>"
        }
        $("#question_ul").html(s), $(".ques_type_one label").on("click", function() { $(this).closest("li").find("label").removeClass("select_label"), $(this).addClass("select_label") })
    }
}

function paseQuestionnaire300(e) {
    console.log(e);
    var e = e.questions;
    if (null !== e) {
        for (var s = "", l = 0; l < e.length; l++) {
            s += "<li class='question_tit'>" + (l + 1) + "、" + e[l].questionContent + "</li> <li class='question_select'>", console.log(e[l].answers);
            for (var n = 0; n < e[l].answers.length; n++) s += "<label><input type='radio' name='answerIds[" + l + "]' value='" + e[l].answers[n].answerContent + "'> " + e[l].answers[n].answerContent + "</label>";
            s += "</li>"
        }
        console.log(s), $("#question_ul").html(s), $(".question_select label").on("click", function() { $(this).closest("li").find("label").removeClass("label_true"), $(this).addClass("label_true") })
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