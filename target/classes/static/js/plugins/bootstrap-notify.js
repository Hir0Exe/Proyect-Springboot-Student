/*
     Creative Tim Modifications
     Lines: 236 was changed from top: 5px to top: 50% and we added margin-top: -9px. In this way the close button will be aligned vertically
     Line:219 - modified when the icon is set, we add the class "alert-with-icon", so there will be enough space for the icon.
	 Lines: 179/222 - class() was changed to html() so we can add the Material Design Icons
*/
/*
 * Project: Bootstrap Notify = v3.1.5
 * Description: Turns standard Bootstrap alerts into "Growl-like" notifications.
 * Author: Mouse0270 aka Robert McIntosh
 * License: MIT License
 * Website: https://github.com/mouse0270/bootstrap-growl
 */
/* global define:false, require: false, jQuery:false */
!function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? t(require("jquery")) : t(jQuery)
}(function (h) {
    var n = {
        element: "body",
        position: null,
        type: "info",
        allow_dismiss: !0,
        allow_duplicates: !0,
        newest_on_top: !1,
        showProgressbar: !1,
        placement: {from: "top", align: "right"},
        offset: 20,
        spacing: 10,
        z_index: 2000,
        delay: 5e3,
        timer: 1e3,
        url_target: "_blank",
        mouse_over: null,
        animate: {enter: "animated fadeInDown", exit: "animated fadeOutUp"},
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: "class",
        template: '<div data-notify="container" class="col-11 col-md-3 alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss"><i class="material-icons">close</i></button><i data-notify="icon" class="material-icons"></i><span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
    };

    function e(t, s, e) {
        var r, d, i = {
            content: {
                message: "object" == typeof s ? s.message : s,
                title: s.title ? s.title : "",
                icon: s.icon ? s.icon : "",
                url: s.url ? s.url : "#",
                target: s.target ? s.target : "-"
            }
        };
        e = h.extend(!0, {}, i, e), this.settings = h.extend(!0, {}, n, e), this._defaults = n, "-" === this.settings.content.target && (this.settings.content.target = this.settings.url_target), this.animations = {
            start: "webkitAnimationStart oanimationstart MSAnimationStart animationstart",
            end: "webkitAnimationEnd oanimationend MSAnimationEnd animationend"
        }, "number" == typeof this.settings.offset && (this.settings.offset = {
            x: this.settings.offset,
            y: this.settings.offset
        }), !this.settings.allow_duplicates && (this.settings.allow_duplicates || (r = this, d = !1, h('[data-notify="container"]').each(function (t, s) {
            var e = h(s), i = e.find('[data-notify="title"]').text().trim(),
                n = e.find('[data-notify="message"]').html().trim(),
                a = i === h("<div>" + r.settings.content.title + "</div>").html().trim(),
                o = n === h("<div>" + r.settings.content.message + "</div>").html().trim(),
                l = e.hasClass("alert-" + r.settings.type);
            return a && o && l && (d = !0), !d
        }), d)) || this.init()
    }

    String.format = function () {
        for (var t = arguments[0], s = 1; s < arguments.length; s++) t = t.replace(RegExp("\\{" + (s - 1) + "\\}", "gm"), arguments[s]);
        return t
    }, h.extend(e.prototype, {
        init: function () {
            var l = this;
            this.buildNotify(), this.settings.content.icon && this.setIcon(), "#" != this.settings.content.url && this.styleURL(), this.styleDismiss(), this.placement(), this.bind(), this.notify = {
                $ele: this.$ele, update: function (t, s) {
                    var e = {};
                    for (var i in "string" == typeof t ? e[t] = s : e = t, e) switch (i) {
                        case"type":
                            this.$ele.removeClass("alert-" + l.settings.type), this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass("progress-bar-" + l.settings.type), l.settings.type = e[i], this.$ele.addClass("alert-" + e[i]).find('[data-notify="progressbar"] > .progress-bar').addClass("progress-bar-" + e[i]);
                            break;
                        case"icon":
                            var n = this.$ele.find('[data-notify="icon"]');
                            "class" === l.settings.icon_type.toLowerCase() ? n.html(e[i]) : (n.is("img") || n.find("img"), n.attr("src", e[i]));
                            break;
                        case"progress":
                            var a = l.settings.delay - l.settings.delay * (e[i] / 100);
                            this.$ele.data("notify-delay", a), this.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow", e[i]).css("width", e[i] + "%");
                            break;
                        case"url":
                            this.$ele.find('[data-notify="url"]').attr("href", e[i]);
                            break;
                        case"target":
                            this.$ele.find('[data-notify="url"]').attr("target", e[i]);
                            break;
                        default:
                            this.$ele.find('[data-notify="' + i + '"]').html(e[i])
                    }
                    var o = this.$ele.outerHeight() + parseInt(l.settings.spacing) + parseInt(l.settings.offset.y);
                    l.reposition(o)
                }, close: function () {
                    l.close()
                }
            }
        }, buildNotify: function () {
            var t = this.settings.content;
            this.$ele = h(String.format(this.settings.template, this.settings.type, t.title, t.message, t.url, t.target)), this.$ele.attr("data-notify-position", this.settings.placement.from + "-" + this.settings.placement.align), this.settings.allow_dismiss || this.$ele.find('[data-notify="dismiss"]').css("display", "none"), (this.settings.delay <= 0 && !this.settings.showProgressbar || !this.settings.showProgressbar) && this.$ele.find('[data-notify="progressbar"]').remove()
        }, setIcon: function () {
            this.$ele.addClass("alert-with-icon"), "class" === this.settings.icon_type.toLowerCase() ? this.$ele.find('[data-notify="icon"]').html(this.settings.content.icon) : this.$ele.find('[data-notify="icon"]').is("img") ? this.$ele.find('[data-notify="icon"]').attr("src", this.settings.content.icon) : this.$ele.find('[data-notify="icon"]').append('<img src="' + this.settings.content.icon + '" alt="Notify Icon" />')
        }, styleDismiss: function () {
            this.$ele.find('[data-notify="dismiss"]').css({
                position: "absolute",
                right: "10px",
                top: "50%",
                marginTop: "-9px",
                zIndex: this.settings.z_index + 2
            })
        }, styleURL: function () {
            this.$ele.find('[data-notify="url"]').css({
                backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)",
                height: "100%",
                left: 0,
                position: "absolute",
                top: 0,
                width: "100%",
                zIndex: this.settings.z_index + 1
            })
        }, placement: function () {
            var e = this, t = this.settings.offset.y, s = {
                display: "inline-block",
                margin: "15px auto",
                position: this.settings.position ? this.settings.position : "body" === this.settings.element ? "fixed" : "absolute",
                transition: "all .5s ease-in-out",
                zIndex: this.settings.z_index
            }, i = !1, n = this.settings;
            switch (h('[data-notify-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])').each(function () {
                t = Math.max(t, parseInt(h(this).css(n.placement.from)) + parseInt(h(this).outerHeight()) + parseInt(n.spacing))
            }), !0 === this.settings.newest_on_top && (t = this.settings.offset.y), s[this.settings.placement.from] = t + "px", this.settings.placement.align) {
                case"left":
                case"right":
                    s[this.settings.placement.align] = this.settings.offset.x + "px";
                    break;
                case"center":
                    s.left = 0, s.right = 0
            }
            this.$ele.css(s).addClass(this.settings.animate.enter), h.each(Array("webkit-", "moz-", "o-", "ms-", ""), function (t, s) {
                e.$ele[0].style[s + "AnimationIterationCount"] = 1
            }), h(this.settings.element).append(this.$ele), !0 === this.settings.newest_on_top && (t = parseInt(t) + parseInt(this.settings.spacing) + this.$ele.outerHeight(), this.reposition(t)), h.isFunction(e.settings.onShow) && e.settings.onShow.call(this.$ele), this.$ele.one(this.animations.start, function () {
                i = !0
            }).one(this.animations.end, function () {
                h.isFunction(e.settings.onShown) && e.settings.onShown.call(this)
            }), setTimeout(function () {
                i || h.isFunction(e.settings.onShown) && e.settings.onShown.call(this)
            }, 600)
        }, bind: function () {
            var e = this;
            if (this.$ele.find('[data-notify="dismiss"]').on("click", function () {
                e.close()
            }), this.$ele.mouseover(function () {
                h(this).data("data-hover", "true")
            }).mouseout(function () {
                h(this).data("data-hover", "false")
            }), this.$ele.data("data-hover", "false"), 0 < this.settings.delay) {
                e.$ele.data("notify-delay", e.settings.delay);
                var i = setInterval(function () {
                    var t = parseInt(e.$ele.data("notify-delay")) - e.settings.timer;
                    if ("false" === e.$ele.data("data-hover") && "pause" === e.settings.mouse_over || "pause" != e.settings.mouse_over) {
                        var s = (e.settings.delay - t) / e.settings.delay * 100;
                        e.$ele.data("notify-delay", t), e.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow", s).css("width", s + "%")
                    }
                    t <= -e.settings.timer && (clearInterval(i), e.close())
                }, e.settings.timer)
            }
        }, close: function () {
            var t = this, s = parseInt(this.$ele.css(this.settings.placement.from)), e = !1;
            this.$ele.data("closing", "true").addClass(this.settings.animate.exit), t.reposition(s), h.isFunction(t.settings.onClose) && t.settings.onClose.call(this.$ele), this.$ele.one(this.animations.start, function () {
                e = !0
            }).one(this.animations.end, function () {
                h(this).remove(), h.isFunction(t.settings.onClosed) && t.settings.onClosed.call(this)
            }), setTimeout(function () {
                e || (t.$ele.remove(), t.settings.onClosed && t.settings.onClosed(t.$ele))
            }, 600)
        }, reposition: function (t) {
            var s = this,
                e = '[data-notify-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])',
                i = this.$ele.nextAll(e);
            !0 === this.settings.newest_on_top && (i = this.$ele.prevAll(e)), i.each(function () {
                h(this).css(s.settings.placement.from, t), t = parseInt(t) + parseInt(s.settings.spacing) + h(this).outerHeight()
            })
        }
    }), h.notify = function (t, s) {
        return new e(this, t, s).notify
    }, h.notifyDefaults = function (t) {
        return n = h.extend(!0, {}, n, t)
    }, h.notifyClose = function (t) {
        void 0 === t || "all" === t ? h("[data-notify]").find('[data-notify="dismiss"]').trigger("click") : h('[data-notify-position="' + t + '"]').find('[data-notify="dismiss"]').trigger("click")
    }
});