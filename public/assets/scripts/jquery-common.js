$.callJsonAction = function (param, url, authentication, successAction, failAction, errorAction) {
    $.ajax({
        type: "POST",
        dataType: "JSON",
        contentType: "application/json, charset=utf-8",
        data: JSON.stringify(param),
        url: url,
        success: function (data) {
            if ($.isFunction(authentication))
                authentication.call(this, data);
            if (data.IsSuccess) {
                if ($.isFunction(successAction))
                    successAction.call(this, data);
            } else {
                if ($.isFunction(failAction))
                    failAction.call(this, data);
            }
        },
        error: function () {
            if ($.isFunction(errorAction))
                errorAction.call(this);
        }
    });
};

$.callHtmlAction = function (param, url, successAction, errorAction) {
    $.ajax({
        type: "POST",
        dataType: "HTML",
        contentType: "application/json, charset=utf-8",
        data: JSON.stringify(param),
        url: url,
        success: function (data) {
            successAction.call(this, data);
        },
        error: function () {
            if ($.isFunction(errorAction))
                errorAction.call(this);
        }
    });
};

$.closeDialog = function (dialogObj, opt, data, beforeClose, afterClose) {
    if (typeof opt == "object")
        dialogObj.dialog(opt);
    dialogObj.setValues(data);
    if ($.isFunction(beforeClose)) {
        beforeClose.call(dialogObj, function () {
            dialogObj.dialog("close");
            if ($.isFunction(afterClose))
                afterClose.call(dialogObj);
        });
    } else {
        dialogObj.dialog("close");
        if ($.isFunction(afterClose))
            afterClose.call(dialogObj);
    }
};

$.openDialog = function (dialogObj, opt, data, beforeOpen, afterOpen) {
    if (typeof opt == "object")
        dialogObj.dialog(opt);
    dialogObj.setValues(data);
    if ($.isFunction(beforeOpen)) {
        beforeOpen.call(dialogObj, function () {
            dialogObj.dialog("open");
            if ($.isFunction(afterOpen))
                afterOpen.call(dialogObj);
        });
    } else {
        dialogObj.dialog("open");
        if ($.isFunction(afterOpen))
            afterOpen.call(dialogObj);
    }
};

// parse to float
// if the value is not numeric, return 0.00
$.parseToFloat = function (value) {
    if ($.isNumeric(value)) {
        var str = $.replaceSign($.format(parseFloat(value), "N"), ",", "");
        var reg = new RegExp("\\.00", "gi");
        if(str.search(reg) >-1) {
            str = str.replace(reg, "");
            return parseInt(str);
        } else {
            return parseFloat(str);
        }
    }
    return 0;
};

// parse to integer
// if the value is not numeric, return 0
$.parseToInt = function (value) {
    if ($.isNumeric(value))
        return parseInt(value);
    return 0;
};

// parse to currency
$.parseToCurrency = function (value) {
    if ($.isNumeric(value)) {
        return $.replaceSign($.format(parseFloat(value), "N"), ".00", "");
    }
    return "0";
};

// exchange currency
$.exchangeCurrency = function (value, fromExRate, toExRate) {
    return $.parseToCurrency($.exchange(value, fromExRate, toExRate));
};

$.exchange = function (value, fromExRate, toExRate) {
    return (value * fromExRate) / toExRate;
};

// replace all sign by new sign
$.replaceSign = function (str, sign, newsign) {
    var reg = new RegExp("\\" + sign , "gi");
    if ($.isNumeric(str))
        return str.toString().replace(reg, newsign);
    else {
        return str.replace(reg, newsign);
    }
};

$.replaceAnySign = function (str, signArray, newsign) {
    if ($.isArray(signArray)) {
        var signs = "";
        for (var i = 0; i < signArray.length; i++) {
            signs += "\\" + signArray[i] + "|";
        }
        signs = signs.substr(0, signs.length - 1);
        var reg = new RegExp(signs, "gi");
        if ($.isNumeric(str))
            return str.toString().replace(reg, newsign);
        else {
            return str.replace(reg, newsign);
        }
    }
    return str;
};

// get parameter on url
$.getUrlParam = function (param) {
    var result = new RegExp('[\\?|\\&]' + param + '=' + '\\w(.+?)(&|$)', "i").exec(window.location.href);
    if (result == null ||result.length < 1) {
        return "";
    }
    return decodeURIComponent(result[0].split("=")[1]) || "";
};

// go to a url indicate
$.goTo = function (url, old) {
    if ($.trim(url).length == 0) {
        window.location.href = window.location.href;
    } else {
        var oldUrl = "";
        var sign = "";
        var reg = new RegExp("\\?old=|\\&old=", "gi");
        if ($.trim(old).length > 0 && !reg.test(url)) {
            sign = url.substr(url.length - 1, 1);
            if (sign == "?" || sign == "&") {
                oldUrl += "old=";
            } else if (url.indexOf("?").length > -1) {
                oldUrl += "&old=";
            } else {
                oldUrl += "?old=";
            }
            url += oldUrl + encodeURIComponent(old);
        } else {
            url += oldUrl;
        }
        window.location.href = url;
    }
};

$.goToWithUrlCurrent = function (url) {
    if ($.trim(url).length == 0) {
        window.location.href = window.location.href;
    } else {
        var oldUrl = "";
        var reg = new RegExp("\\?old=|\\&old=", "gi");
        if (!reg.test(url)) {
            var sign = url.substr(url.length - 1, 1);
            if (sign == "?" || sign == "&") {
                oldUrl += "old=";
            } else if (url.indexOf("?").length > -1) {
                oldUrl += "&old=";
            } else {
                oldUrl += "?old=";
            }
            url += oldUrl + encodeURIComponent(window.location.href);
        } else {
            url += oldUrl;
        }
        window.location.href = url;
    }
};

// check a string have contain only character that mean not contains whitespace
$.containsOnlyCharacter = function (str) {
    var patt = /\W/gi;
    var reg = new RegExp(patt);
    return !reg.test(str);
};

$.containsHarmfulCharacter = function (str) {
    var patt = /[^\w.@-]/gi;
    var reg = new RegExp(patt);
    return reg.test(str);
};

// check a string have contains whitespace
$.containsSpace = function (str) {
    if ($.trim(str).length == 0)
        return true;
    var patt = /\s/gi;
    var reg = new RegExp(patt);
    return reg.test(str);
};

$.containsSomeSign = function (str, arr) {
    if ($.isArray(arr)) {
        var signs = "[";
        for (var i = 0; i < arr.length; i++) {
            signs += "\\" + arr[i] + "|";
        }
        signs = signs.substr(0, signs.length - 1) + "]";
        var reg = new RegExp(signs, "gi");
        return reg.test(str);
    }
    return false;
};

$.validEmail = function(str) {
    var patt = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
    return patt.test(str);
};

$.formatJsonDate = function (jsondate) {
    return new Date(parseInt(jsondate.substr(6)));
};

$.formatDateTime = function (datetime, str) {
    var year = datetime.getFullYear().toString();
    var month = datetime.getMonth() + 1;
    month = month < 10 ? "0" + month.toString() : month.toString();
    var date = datetime.getDate();
    date = date < 10 ? "0" + date.toString() : date.toString();
    var hour = datetime.getHours();
    hour = hour < 10 ? "0" + hour.toString() : hour.toString();
    var minute = datetime.getHours();
    minute = minute < 10 ? "0" + minute.toString() : minute.toString();
    var second = datetime.getMinutes();
    second = second < 10 ? "0" + second.toString() : second.toString();
    var patTt = "AM";

    var pattYear = /yyyy/i;
    var pattMoth = /MM/i;
    var pattDate = /dd/i;
    var pattHour = /hh/i;
    var pattMinute = /mm/i;
    var pattSecond = /ss/i;
    var pattTt = /tt/i;

    var result = str.replace(pattYear, year);
    result = result.replace(pattMoth, month);
    result = result.replace(pattDate, date);
    result = result.replace(pattHour, hour);
    result = result.replace(pattMinute, minute);
    result = result.replace(pattSecond, second);
    result = result.replace(pattTt, patTt);
    return result;
};

// setup overlay for every call ajax
$.overlay = function () {
    $.ajaxSetup({ global: false, cache: false });
    $("body").append("<div id='ui-overlay' class='ui-overlay' style='display:none'></div>");
    $("body").append("<img id='ui-loader' class='ui-loader' style='display:none'/>");
    $(document).ajaxStart(function () {
        var doc = $(document);
        $("#ui-overlay").width(doc.width()).height(doc.height()).css("zIndex", 1002).show();
        $("#ui-loader").css("zIndex", 1003).show();
    }).ajaxComplete(function () {
        $("#ui-overlay").hide();
        $("#ui-loader").hide();
    });
};

(function ($) {
    
    $.fn.getVal = function () {
        return $.trim($(this).val());
    };

    $.fn.getText = function () {
        return $.trim($(this).text());
    };

    // get/set data-values on element
    $.fn.getValues = function (name) {
        var self = $(this);
        if (name == undefined)
            return self.data("values");
        else
            return self.data(name);
    };
    $.fn.setValues = function (name, obj) {
        var self = $(this);
        if ($.type(name) === "object") {
            return self.data("values", $.extend(self.data("values"), obj));
        }
        if (name == undefined || $.trim(name).length == 0) {
            return self.data("values" , $.extend(self.data("values") , obj));
        }
        return self.data(name, $.extend(self.data(name), obj));
    };

    // get/set data-resources on element
    $.fn.getResources = function () {
        var self = $(this);
        return self.getValues("resources");
    };
    $.fn.setResources = function (obj) {
        var self = $(this);
        return self.setValues($.extend(self.getValues("resources"), obj), "resources");
    };
})(jQuery);

// get marign, padding
(function ($) {
    $.fn.getBorderVertical = function () {
        var $this = $(this);
        return $this.outerHeight() - $this.innerHeight();
    };

    $.fn.getPaddingVertical = function () {
        var $this = $(this);
        return $this.innerHeight() - $this.height();
    };

    $.fn.getMarginVertical = function () {
        var $this = $(this);
        return $this.outerHeight(true) - $this.outerHeight();
    };

    $.fn.getBorderHorizontal = function () {
        var $this = $(this);
        return $this.outerWidtht() - $this.innerWidth();
    };

    $.fn.getPaddingHorizontal = function () {
        var $this = $(this);
        return $this.innerWidth() - $this.width();
    };

    $.fn.getMarginHorizontal = function () {
        var $this = $(this);
        return $this.outerWidth(true) - $this.outerWidth();
    };

    $.fn.getAroundVertical = function () {
        var $this = $(this);
        return $this.getBorderVertical() + $this.getPaddingVertical() + $this.getMarginVertical();
    };

    $.fn.getAroundHorizontal = function () {
        var $this = $(this);
        return $this.getBorderHorizontal() + $this.getPaddingHorizontal() + $this.getMarginHorizontal();
    };
});

// plugin for download 1 file
(function ($) {
    $.downloadfile = function (option) {
        var def = {
            FileUrl: "",
            completed: function () {
            }
        };
        var opt = $.extend(def, option);

        var isIos = false;                  //has full support of features in iOS 4.0+, uses a new window to accomplish this.
        var isAndroid = false;              //has full support of GET features in 4.0+ by using a new window. Non-GET is completely unsupported by the browser. See above for specifying a message.
        var isOtherMobileBrowser = false;//there is no way to reliably guess here so all other mobile devices will GET and POST to the current window.
        var iframe;
        var downloadWindow;
        dowloadFile();

        function dowloadFile() {
            checkBrowser();
            if (isIos || isAndroid) {
                downloadWindow = window.open(FileUrl);
                downloadWindow.document.title = settings.popupWindowTitle;
                window.focus();
            } else if (isOtherMobileBrowser) {
                window.location(FileUrl);
            } else {
                createIframe();
            }
        }


        function checkBrowser() {
            var userAgent = (navigator.userAgent || navigator.vendor || window.opera).toLowerCase();
            if (/ip(ad|hone|od)/.test(userAgent)) {

                isIos = true;

            } else if (userAgent.indexOf('android') != -1) {

                isAndroid = true;

            } else {

                isOtherMobileBrowser = /avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|playbook|silk|iemobile|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0, 4));
            }
        }
        function createIframe() {
            var ifr = document.getElementById("frameToDownload");
            if (ifr == null) {
                ifr = document.createElement("iframe");
                ifr.id = "frameToDownload";
                ifr.style.display = "none";
                document.body.appendChild(ifr);
            }
            ifr.src = opt.FileUrl;
            iframe = $(ifr);
        }


    };
})(jQuery);

// show/hide element with a effect, that is package all effect of jque
(function ($) {
    $.fn.getHeight = function () {
        var iHeight = 0;
        this.each(function () {
            var $this = $(this);
            $this.children().each(function () {
                iHeight += $(this).outerHeight(true);
            });
        });
        return iHeight;
    };

    $.fn.ishow = function (option) {
        var opt = $.extend(
            {
                effect: "blind" ,
                duration: 400 ,
                easing: "swing",
                animate: {
                    opacity:1 
                },
                complete: function() {
                }
            }, option);
        if (!$.isFunction(opt.complete)) {
            opt.complete = function() {
            };
        }
        return this.each(function() {
            var $this = $(this);
            var $parent = $this.parent();
            switch (opt.effect.toLowerCase()) {
                case "normal":
                    $this.show({ duration: opt.duration , easing: opt.easing });
                    if ($.isFunction(opt.complete))
                        opt.complete.apply(this);
                    break;
                case "fade":
                    $this.css({ opacity: 0});
                    $this.show("fast");
                    $this.animate({ opacity: 1 }, opt);
                    break;
                case "faderesize":
                    $parent.height($parent.height());//fix the height to not maximize when the element is shown
                    $this.css({ opacity: 0 });
                    $this.show({
                        duration:100,
                        complete: function () {
                            $parent.animate({
                                height: $parent.getHeight()
                            }, {
                                duration: opt.duration,
                                easing: opt.easing,
                                complete: function () {
                                    $this.animate({
                                        opacity: 1
                                    }, {
                                        duration: opt.duration,
                                        easing: opt.easing,
                                        complete: function () {
                                            $parent.height("auto");
                                            //$parent.height($parent.height());
                                            //$parent.css("float","");
                                            opt.complete();
                                        }
                                    });
                                }
                            });
                        }
                    });
                    break;
                default:
                    $this.show(opt.effect, { easing: opt.easing }, opt.duration, opt.complete);
                    break;
            }
        });
    };
    
    $.fn.ihide = function (option) {
        var opt = $.extend(
            {
                effect: "blind",
                duration: 400,
                easing: "swing",
                animate: {
                    opacity: 0
                },
                complete: function () {
                }
            }, option);
        if (!$.isFunction(opt.complete)) {
            opt.complete = function () {
            };
        }
        return this.each(function () {
            var $this = $(this);
            var $parent = $this.parent();
            switch (opt.effect.toLowerCase()) {
                case "normal":
                    $this.hide({ duration: opt.duration, easing: opt.easing });
                    if ($.isFunction(opt.complete))
                        opt.complete.apply(this);
                    break;
                case "fade":
                    $this.animate({
                            opacity: 0
                        } , {
                            duration: opt.duration ,
                            easing: opt.easing ,
                            complete: function () {
                                $this.css({ display: "none" });
                                opt.complete();
                            }
                        });
                    break;
                case "faderesize":
                    $parent.height($parent.height());// fix the height to not minimize when the element is hidden
                    //$parent.css("float" , "none");
                    $this.css({ opacity: 1 });
                    $this.animate({
                        opacity: 0
                    }, {
                        duration: opt.duration,
                        easing: opt.easing,
                        complete: function () {
                            $this.hide("fast");
                            opt.complete();
                        }
                    });
                    break;
                default:
                    $this.hide(opt.effect, { easing: opt.easing }, opt.duration, opt.complete);
                    break;
            }
        });
    };
})(jQuery);

// check all checkbox in grid
(function ($) {
    // widget for checkall in grid
    $.widget("ui.checkall", {
        options: {
            member: "ckMember"
        },
        _create: function () {
            this._bindLeaderClickEvent();
            this._bindMemberClickEvent();
        },
        _init: function () {
        },
        _setOption: function (key, value) {
            if (key == "member") {
                this._changeMemberObject(value);
            }
        },
        _bindLeaderClickEvent: function () {
            var self = this;
            this.element.bind("click", function () {
                if ($(this).prop("checked")) { 
                    // when check leader, then check all member
                    $(self.options.member).prop("checked", true);
                } else { // when un-check all
                    $(self.options.member).prop("checked", false);
                }
            });
        },
        _bindMemberClickEvent: function () {
            var self = this;
            $(this.options.member).bind("click", function () {
                if ($(self.options.member + ":checked").size() == $(self.options.member).size()) {
                    // when total member checked equal total member, then check leader
                    self.element.prop("checked", true);
                }
                if ($(self.options.member + ":checked").size() < $(self.options.member).size()) {
                    // when total member checked not equal total member, then un-check leader
                    self.element.prop("checked", false);
                }
            });
        },
        _changeMemberObject: function (newMember) {
            (this.options.member).unbind("click");
            this.options.member = newMember;
            this._bindMemberClickEvent();
        },
        destroy: function () {
        },
        disable: function () {
        },
        enable: function () {
        }
    });
})(jQuery);

// paging in grid, this is type 1
(function ($) {
    $.widget("ui.pagingsimple",{
        options: {
            style: "1",
            totalRows: 0,
            rowsPerPage: 0,
            pageNo : 1,
            pagingLocation : "",
            afterChangePage: null,
            totalPages: 1,
        },
        _create: function() {
            this.options.totalPages = Math.ceil(
                this.options.totalRows / this.options.rowsPerPage);
        },
        _init: function () {
            this.options.totalPages = Math.ceil(
                this.options.totalRows / this.options.rowsPerPage);
            this._generatePagingControl();
        },
        _setOption: function (key, value) {
            switch (key) {
                case "totalRows":
                    this.options.totalRows = value;
                    break;
                case "rowsPerPage":
                    this.options.rowsPerPage = value;
                    break;
                default:
                    break;
            }
        },
        reBuild: function (totalrows, rowsperpage) {
            this.options.pagingLocation.empty();
            this.options.totalRows = totalrows;
            this.options.rowsPerPage = rowsperpage;
            this.options.pageNo = 0;
            this.options.totalPages = Math.ceil(
                this.options.totalRows / this.options.rowsPerPage);
            this._generatePagingControl();
        } ,
        _generatePagingControl: function () {
            var control = "<table class='paging-control'>" +
                    "<tr><td>" +
                    "<a class='paging-first-button page-far-left' href='javascript:void(0)'" +
                    " id='btFirst'></a>" +
                    "<a class='paging-prev-button page-left' href='javascript:void(0)'></a>" +
                    "<div id='page-info' class='paging-info'></div>" +
                    "<a class='paging-next-button page-right' href='javascript:void(0)'></a>" +
                    "<a class='paging-last-button page-far-right' href='javascript:void(0)'" +
                    " id='btLast'></a>" +
                    "</td>" +
                    "</tr>" +
                    "</table>";
            this.options.pagingLocation.height(24).css("display", "block").append(control);
            this.options.pagingLocation.find("table.paging-control").height(24)
                .css("display", "block");
            var pageInfoButton = this.options.pagingLocation.find(
                ".paging-control .paging-info");
            if (this.options.totalRows == 0) {
                pageInfoButton.text("0/0").height(55);
            } else {
                pageInfoButton.text(this.options.pageNo + 1 + "/" + this.options.totalPages)
                    .height(55);
            }
            this._bindAllEventClick();
        },
        getPageNo: function () {
            return this.options.pageNo;
        },
        _changePage: function (toPage) {
            if (toPage < -1) {
                return;
            }
            if (toPage > this.options.totalPages -1) {
                return;
            }
            // upate page no
            this.options.pageNo = toPage;
            // update display page no
            var pageInfoButton = this.options.pagingLocation.find(
                ".paging-control .paging-info");
            pageInfoButton.text(this.options.pageNo + 1 + "/" + this.options.totalPages);
            // update click event of all buttons
            this._unbindAllEventClick();
            this._bindAllEventClick();
            
            // after change page, call back a function which passed by initilize
            if ($.isFunction(this.options.afterChangePage))
            {
                var params = {
                     totalRows : this.options.totalRows, 
                     rowsPerPage: this.options.rowsPerPage, 
                     pageNo : this.options.pageNo, 
                     totalPages : this.options.totalPages
                };
                this.options.afterChangePage.call(this, params);
            }
        },
        _bindAllEventClick: function () {
            var self = this;
            self._unbindAllEventClick();
            if (self.options.pageNo > 0) {
                self.options.pagingLocation.find(".paging-control .paging-first-button")
                    .click(function () {
                    self._changePage(0);
                });

                this.options.pagingLocation.find(".paging-control .paging-prev-button")
                    .click(function () {
                    self._changePage(self.options.pageNo - 1);
                });
            }

            if (self.options.pageNo < self.options.totalPages -1) {
                self.options.pagingLocation.find(".paging-control .paging-next-button")
                    .click(function () {
                    self._changePage(self.options.pageNo + 1);
                });

                self.options.pagingLocation.find(".paging-control .paging-last-button")
                    .click(function () {
                    self._changePage(self.options.totalPages - 1);
                });
            }
        },
        _unbindAllEventClick: function () {
            this.options.pagingLocation.find(".paging-control .paging-first-button")
                .unbind("click");
            this.options.pagingLocation.find(".paging-control .paging-prev-button")
                .unbind("click");
            this.options.pagingLocation.find(".paging-control .paging-next-button")
                .unbind("click");
            this.options.pagingLocation.find(".paging-control .paging-last-button")
                .unbind("click");
        },
        destroy: function() {
            this.options.pagingLocation.empty();
        },
        disable: function () {
            this._unbindAllEventClick();
        },
        enable: function () {
            this._bindAllEventClick();
        }
    });
})(jQuery);

// pagin in grid, this is type 2
(function ($) {
    $.widget("ui.pagingpart",{
        options: {
            style: "1",
            totalRows: 1,
            rowsPerPage: 1,
            pagesPerPart: 1,
            pageNo : 1,
            pagingLocation : "",
            afterChangePage: null,
            totalPages: 1,
            totalParts: 1
        },
        _create: function() {
            this.options.totalPages =
                Math.ceil(this.options.totalRows / this.options.rowsPerPage);
            this.options.totalParts =
                Math.ceil(this.options.totalPages / this.options.pagesPerPart);
        },
        _init: function () {
            this._generatePagingControl();
            this._bindAllEventClick();
        },
        _setOption: function (key, value) {
            switch (key) {
            case "totalRows":
                this.options.totalRows = value;
            default:
            }
        },
        _generatePagingControl : function () {
            var control = "<table class='paging-control'>" +
                "<tr><td>" +
                "<a class='paging-first-button' href='javascript:void(0)'>First</a>";
            control += "<span class='paging-body'>";
            control += this._generatePagingBody();
            control += "</span>";
            control+="<a class='paging-last-button' href='javascript:void(0)'>Last</a>" +
                    "</td>" +
                    "</tr>" +
                    "</table>";
            this.options.pagingLocation.append(control);
            this.options.pagingLocation.find("table.paging-control").height(24)
                .css("display", "block");
        },
        _generatePagingBody:function () {
            var pagingBody = "";
            var partNo = Math.ceil(this.options.pageNo / this.options.pagesPerPart);
            var partTop = (partNo * this.options.pagesPerPart) - (this.options.pagesPerPart - 1);
             var range;
             if (this.options.totalPages < partNo * this.options.pagesPerPart) {
                 // part is not perfect
                range = this.options.totalPages;
            } else { // part is perfect
                range = partTop + this.options.pagesPerPart - 1;
            }
            if(partNo >1) {// insert previous part button
                pagingBody += "<a class='paging-prev-button' href='javascript:void(0)'>Prev</a>";
            }
            for(var i=partTop; i <= range; i++) {// page buttons
                if(partNo ==i) {
                    pagingBody += "<a href='javascript:void(0)' class='paging-button paging-focus'>" + i + "</a>";
                } else {
                    pagingBody += "<a href='javascript:void(0)' class='paging-button'>" + i + "</a>";
                }
            }
            if(partNo < this.options.totalParts) {// insert next part button
                pagingBody += "<a class='paging-next-button' href='javascript:void(0)'>Next</a>";
            }
            return pagingBody;
        },
        _changePage: function (toPage) {
            if (toPage < 1) {
                return;
            }
            if (toPage > this.options.totalPages) {
                return;
            }
            this.options.pageNo = toPage;
            
            var pagingBody = this._generatePagingBody();
            this.options.pagingLocation.find(".paging-control .paging-body").empty().append(pagingBody);
            this._unbindAllEventClick();
            this._bindAllEventClick();
            if(this.options.afterChangePage !=null || this.options.afterChangePage != undefined) {
                var params = {
                     totalRows : this.options.totalRows, 
                     rowsPerPage: this.options.rowsPerPage, 
                     pageNo : this.options.pageNo, 
                     totalPages : this.options.totalPages,
                     pagesPerPart: this.options.pagesPerPart,
                     partNo : Math.ceil(this.options.pageNo/ this.options.pagesPerPart),
                     totalParts: this.options.totalParts
                };
                this.options.afterChangePage.call(this, params);
            }
        },
        _bindAllEventClick: function () {
            var self = this;
            self._unbindAllEventClick();
            if (self.options.pageNo > 1) {
                self.options.pagingLocation.find(".paging-control .paging-first-button").click(function () {
                    self._changePage(1);
                });

                this.options.pagingLocation.find(".paging-control .paging-prev-button").click(function () {
                    var toPage = (Math.ceil(self.options.pageNo / self.options.pagesPerPart) * self.options.pagesPerPart) - 3;
                    self._changePage(toPage);
                });
            }

            if (self.options.pageNo < self.options.totalPages) {
                self.options.pagingLocation.find(".paging-control .paging-next-button").click(function () {
                    var toPage = (Math.ceil(self.options.pageNo / self.options.pagesPerPart) * self.options.pagesPerPart) + 1;
                    self._changePage(toPage);
                });

                self.options.pagingLocation.find(".paging-control .paging-last-button").click(function () {
                    self._changePage(self.options.totalPages);
                });
            }

            self.options.pagingLocation.find(".paging-control .paging-button").click(function() {
                var number = $(this).text();
                if(!$.isNumeric(number)) {
                    return;
                }
                self._changePage(parseInt(number));
            });
        },
        _unbindAllEventClick: function () {
            this.options.pagingLocation.find(".paging-control .paging-first-button").unbind("click");
            this.options.pagingLocation.find(".paging-control paging-prev-button").unbind("click");
            this.options.pagingLocation.find(".paging-control paging-next-button").unbind("click");
            this.options.pagingLocatio.find(".paging-control .paging-last-button").unbind("click");
            this.options.pagingLocation.find(".paging-control .paging-button").unbind("click");
        },
        destroy: function() {
            this.options.pagingLocation.empty();
        },
        disable: function () {
            this._unbindAllEventClick();
        },
        enable: function () {
            this._bindAllEventClick();
        }
    });
})(jQuery);