var _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e };
! function e(t, r, n) {
    function o(a, c) { if (!r[a]) { if (!t[a]) { var f = "function" == typeof require && require; if (!c && f) return f(a, !0); if (i) return i(a, !0); var l = new Error("Cannot find module '" + a + "'"); throw l.code = "MODULE_NOT_FOUND", l } var u = r[a] = { exports: {} };
            t[a][0].call(u.exports, function(e) { var r = t[a][1][e]; return o(r ? r : e) }, u, u.exports, e, t, r, n) } return r[a].exports } for (var i = "function" == typeof require && require, a = 0; a < n.length; a++) o(n[a]); return o }({ 1: [function(e, t, r) { var n = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function(e) { return "undefined" == typeof e ? "undefined" : _typeof2(e) } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : "undefined" == typeof e ? "undefined" : _typeof2(e) };! function(e, t) { var r = null,
                o = { init: function() { this.setCookie() }, getUrlParam: function() { var e = [],
                            t = location.search.replace(/^\?/, "") + location.hash.replace(/^\#/, "&"); if (t && (t = t.split("&"), t.length > 0))
                            for (var r = 0; r < t.length; r++) { var n = t[r].split("="); if (0 == n[0].indexOf("a_")) { var o = n[0].replace("a_", ""),
                                        i = n[1];
                                    e.push({ key: o, val: i }) } }
                        return e }, cookie: function(e, r, n) { if ("undefined" == typeof r) { var o = null; if (t.cookie && "" != t.cookie)
                                for (var i = t.cookie.split(";"), a = 0; a < i.length; a++) { var c = i[a].replace(/(^\s*)|(\s*$)/g, ""); if (c.substring(0, e.length + 1) == e + "=") { o = decodeURIComponent(c.substring(e.length + 1)); break } }
                            return o } n = n || {}, null === r && (r = "", n = $.extend({}, n), n.expires = -1); var f = ""; if (n.expires && ("number" == typeof n.expires || n.expires.toUTCString)) { var l; "number" == typeof n.expires ? (l = new Date, l.setTime(l.getTime() + 24 * n.expires * 60 * 60 * 1e3)) : l = n.expires, f = "; expires=" + l.toUTCString() } var u = n.path ? "; path=" + n.path : "",
                            s = n.domain ? "; domain=" + n.domain : "",
                            p = n.secure ? "; secure" : "";
                        t.cookie = [e, "=", encodeURIComponent(r), f, u, s, p].join("") }, gettuiaId: function() { var e = !1,
                            t = location.search; return (t.indexOf("a_oId") !== -1 || this.cookie("_coll_oId") || t.indexOf("a_tuiaId") !== -1 || this.cookie("_coll_tuiaId")) && (e = !0), e }, setCookie: function() { var e = this.getUrlParam(); if (r = { referrer: t.referrer, url: location.href }, e.length > 0)
                            for (var n = 0; n < e.length; n++) r[e[n].key] = e[n].val, this.cookie("_coll_" + e[n].key, e[n].val, { path: "/", expires: 1 }); if (location.search.indexOf("a_oId") == -1 || location.search.indexOf("a_tuiaId") == -1)
                            for (var o = t.cookie.split(";"), n = 0; n < o.length; n++)
                                if (o[n].indexOf("_coll_") !== -1) { var i = o[n].split("=")[0];
                                    r[i.substr(i.indexOf("_coll_") + 6)] = o[n].split("=")[1] }
                        var a = { type: 7, json: JSON.stringify(r) };
                        this.sendLog(a) }, formatParams: function(e) { var t = []; for (var r in e) t.push(encodeURIComponent(r) + "=" + encodeURIComponent(e[r])); return t.join("&") }, ajax: function(r) { if (r = r || {}, !r.url || !r.callback) throw new Error("参数不合法"); var n = ("jsonp_" + Math.random()).replace(".", ""),
                            o = t.getElementsByTagName("head")[0];
                        r.data[r.callback] = n; var i = this.formatParams(r.data),
                            a = t.createElement("script");
                        o.appendChild(a), e[n] = function(t) { o.removeChild(a), clearTimeout(a.timer), e[n] = null, r.success && r.success(t) }, a.src = r.url + "?" + i, r.time && (a.timer = setTimeout(function() { e[n] = null, o.removeChild(a), r.error && r.error({ message: "超时" }) }, r.time)) }, sendLog: function(e, t) { try { this.gettuiaId() ? this.ajax({ url: "//activity.tuia.cn/log/inner", callback: "callback", data: e, time: 3e3, success: function(e) { t && t(e) }, error: function(e) { t && t(e) } }) : t && t() } catch (r) { t && t() } }, cloneObj: function(e) { var t = this; if ("object" != ("undefined" == typeof e ? "undefined" : n(e))) return e; if (null == e) return e; var r = new Object; for (var o in e) r[o] = t.cloneObj(e[o]); return r }, extendObj: function() { var e = arguments; if (!(e.length < 2)) { for (var t = this.cloneObj(e[0]), r = 1; r < e.length; r++)
                                for (var n in e[r]) t[n] = e[r][n]; return t } } };
            o.init(); var i = { init: function(e, t) { var n = o.extendObj(r, t),
                        i = { type: 8, json: JSON.stringify(n) };
                    o.sendLog(i, e) } };
            e.TuiaAdverter = i }(window, document) }, {}] }, {}, [1]);