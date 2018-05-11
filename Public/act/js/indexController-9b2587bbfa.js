function planShow() { show({ content: $("#plan") }), insuranceDetail.initInsuranceFun() }

function v_base() { return !!v_all() && (TuiaAdverter.init(function() { nextCaptcha(function(e) { captchaCode = e, $("#captcha").hide(), setTimeout(function() { show({ content: $("#questionnaire") }), $(".ques_type_one label").on("click", function() { $(this).closest("li").find("label").removeClass("select_label"), $(this).addClass("select_label") }) }, 200) }) }, { duiba1030: "question" }), !1) }

function v_all() { try { v_name(), v_id_card(), checkAge_25_50(), v_mobile(), v_safe_instruct() } catch (e) { return popup.msg(e.message, { time: 1e3 }), !1 } return !0 }

function testPremium(e, t) { var n = { amount: e.amount, birthday: analyzeIdCard().birth(getAllParameters().idCard), channelCode: e.channelCode, insuranceCode: e.insuranceCode, mobile: $("input[name = 'mobile']").val(), newtankUserType: 2, paymentType: e.paymentType, realName: $("input[name = 'name']").val(), userId: e.userId };
    xbbService().testPremium(n).then(function(n) { var a = n,
            i = { age: a.age, insuranceName: a.insuranceName, paymentType: a.paymentType, amount: e.amount / 100 };
        a.annualPremium && (i.annualPremium = 0 === a.annualPremium ? 0 : a.annualPremium / 100), a.monthlyPremium && (i.monthlyPremium = 0 === a.monthlyPremium ? 0 : a.monthlyPremium / 100), t(i) }) }

function callPremiumData(e, t) { return { amount: 100 * e * 1e4, insuranceCode: init.testPremiumCode.ddh, paymentType: t, userId: "", channelCode: activityCode } }

function formSub() { var e = getAllParameters(),
        t = $("input[name='answerIds[3]']:checked").val();
    e.captcha = captchaCode; try { if (v_question_three(), !t) throw new Error("请先完成问卷调查") } catch (n) { return popup.msg(n.message, { time: 1e3 }), !1 } e.premiumInfo = { sumInsured: 100 * t * 1e4, paymentType: "ANNUAL" }, popup.closeAll(); var a = popup.loding();
    $.cookie(activityCode, JSON.stringify(e), { expires: 7 }), xbbService().actSave(e).then(function(e) { $.cookie(activityCode + "_success", JSON.stringify(e), { expires: 7 }); try { customSDK(function() { "SUCCEEDED" === e.status.toUpperCase() ? window.location.href = "http://wap.newtank.cn/newtank/js/controller/act/ddhb_1/success.html?status=success&adCode=" + init.requestParams.adCode : window.location.href = "http://wap.newtank.cn/newtank/js/controller/act/ddhb_1/success.html?status=error&adCode=" + init.requestParams.adCode }) } catch (t) { "SUCCEEDED" === e.status.toUpperCase() ? window.location.href = "http://wap.newtank.cn/newtank/js/controller/act/ddhb_1/success.html?status=success&adCode=" + init.requestParams.adCode : window.location.href = "http://wap.newtank.cn/newtank/js/controller/act/ddhb_1/success.html?status=error&adCode=" + init.requestParams.adCode } popup.close(a) }, function(e) { var t = JSON.parse(e.responseText);
        popup.msg(t.message, { time: 1e3 }), popup.close(a) }) }

function show(e) { popup.open({ type: 1, content: e.content, style: "width:90%;max-width:500px;min-width:300px;background-color:#fff;border-radius: 6px 6px 6px 6px;padding:0;" }) }

function check(e) { var t = $(e).children("input").prop("checked"),
        n = $(e).children("em");
    t ? n.css("background-position", "left") : position_right = n.css("background-position", "right") }

function customSDK(e) { if (init.requestParams.bxm_id) { var t = { bxm_id: init.requestParams.bxm_id, status: "1", modeltype: "7" };
        actService().bxmAD_SDK(t).then(function(t) { e && e() }).fail(function(t) { e && e() }) } else e && e() }
var activityCode = "ddhb_1",
    captchaCode, urlAdCode = getRequestParams().adCode;
$(function() { adCodeMaps[activityCode] = urlAdCode, 
    // newActInit({ activityCode: activityCode, question: paseQuestionnaireTwo, changeCompany: !0, callBack: function() { var e = init.object_config.activityConfigInfos[0].insuranceConfigs;
    //         insuranceDetail.initInsurance(e), insuranceDetail.calculateQuestionHTML(e) } }),
             $(".save_info_sex label").click(function() { $(".save_info_sex label").removeClass("label_true"), $(this).addClass("label_true") }) });