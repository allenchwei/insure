function _bxmPlatformFn(e, t) { var n, o, i = ""; try { i = localStorage.getItem("listenId") } catch (e) { i = getCookie("listenId") } "function" == typeof e ? (n = getQueryString("bxm_id") || i, o = e) : (n = e || getQueryString("bxm_id") || i, o = t), bxmAjax(n, "7", o) }

function bxmAjax(e, t, n) { if (null != e) { var o = { phone: "", bxm_id: e.toString(), status: "1", modeltype: t };
        ajax({ url: "https://buy.bianxianmao.com/shop/countInfo", data: JSON.stringify(o), type: "post", success: function(e) { console.log(o), "function" == typeof n && n() }, error: function(e) { console.log(e), "function" == typeof n && n() } }) } }

function getQueryString(e) { var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"),
        n = window.location.search.substr(1).match(t); return null != n ? unescape(n[2]) : null }

function indexCount() { var e = ""; try { getQueryString("bxm_id") ? localStorage.setItem("listenId", getQueryString("bxm_id")) : e = localStorage.getItem("listenId") } catch (t) { getQueryString("bxm_id") ? setCookie("listenId", getQueryString("bxm_id")) : e = getCookie("listenId") } bxmAjax(getQueryString("bxm_id") || e, "3") }

function ajax(e) {
    (e = e || {}).type = (e.type || "GET").toUpperCase(), e.dataType = e.dataType || "json"; var t = e.data; if (window.XMLHttpRequest) var n = new XMLHttpRequest;
    else n = new ActiveXObject("Microsoft.XMLHTTP");
    n.onreadystatechange = function() { if (4 == n.readyState) { var t = n.status;
            t >= 200 && t < 300 ? e.success && e.success(n.responseText, n.responseXML) : e.fail && e.fail(t) } }, "GET" == e.type ? (n.open("GET", e.url + "?" + t, !0), n.send(null)) : "POST" == e.type && (n.open("POST", e.url, !0), n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), n.send(t)) }

function formatParams(e) { var t = []; for (var n in e) t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n])); return t.push(("v=" + Math.random()).replace(".", "")), t.join("&") }

function setCookie(e, t) { var n = new Date;
    n.setTime(n.getTime() + 2592e6), document.cookie = e + "=" + escape(t) + ";expires=" + n.toGMTString() }

function getCookie(e) { var t, n = new RegExp("(^| )" + e + "=([^;]*)(;|$)"); return (t = document.cookie.match(n)) ? unescape(t[2]) : null } indexCount();