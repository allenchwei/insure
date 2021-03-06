! function(e, t) {
	function i() {
		var t = n.getBoundingClientRect().width;
		t / s > 540 && (t = 540 * s);
		var i = t / 10;
		n.style.fontSize = i + "px", d.rem = e.rem = i
	}
	var a, r = e.document,
		n = r.documentElement,
		o = r.querySelector('meta[name="viewport"]'),
		l = r.querySelector('meta[name="flexible"]'),
		s = 0,
		m = 0,
		d = t.flexible || (t.flexible = {});
	if(o) {
		console.warn("将根据已有的meta标签来设置缩放比例");
		var c = o.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
		c && (m = parseFloat(c[1]), s = parseInt(1 / m))
	} else if(l) {
		var p = l.getAttribute("content");
		if(p) {
			var u = p.match(/initial\-dpr=([\d\.]+)/),
				f = p.match(/maximum\-dpr=([\d\.]+)/);
			u && (s = parseFloat(u[1]), m = parseFloat((1 / s).toFixed(2))), f && (s = parseFloat(f[1]), m = parseFloat((1 / s).toFixed(2)))
		}
	}
	if(!s && !m) {
		var v = (e.navigator.appVersion.match(/android/gi), e.navigator.appVersion.match(/iphone/gi)),
			b = e.devicePixelRatio;
		s = v ? b >= 3 && (!s || s >= 3) ? 3 : b >= 2 && (!s || s >= 2) ? 2 : 1 : 1, m = 1 / s
	}
	if(n.setAttribute("data-dpr", s), !o)
		if(o = r.createElement("meta"), o.setAttribute("name", "viewport"), e.webPageScalable ? o.setAttribute("content", "initial-scale=" + m + ", user-scalable=yes") : o.setAttribute("content", "initial-scale=" + m + ", maximum-scale=" + m + ", minimum-scale=" + m + ", user-scalable=no"), n.firstElementChild) n.firstElementChild.appendChild(o);
		else {
			var h = r.createElement("div");
			h.appendChild(o), r.write(h.innerHTML)
		}
	e.addEventListener("resize", function() {
		clearTimeout(a), a = setTimeout(i, 300)
	}, !1), e.addEventListener("pageshow", function(e) {
		e.persisted && (clearTimeout(a), a = setTimeout(i, 300))
	}, !1), "complete" === r.readyState ? r.body.style.fontSize = 12 * s + "px" : r.addEventListener("DOMContentLoaded", function(e) {
		r.body.style.fontSize = 12 * s + "px"
	}, !1), i(), d.dpr = e.dpr = s, d.refreshRem = i, d.rem2px = function(e) {
		var t = parseFloat(e) * this.rem;
		return "string" == typeof e && e.match(/rem$/) && (t += "px"), t
	}, d.px2rem = function(e) {
		var t = parseFloat(e) / this.rem;
		return "string" == typeof e && e.match(/px$/) && (t += "rem"), t
	}
}(window, window.lib || (window.lib = {}));