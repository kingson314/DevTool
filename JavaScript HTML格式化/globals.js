var AjaxLite = {
    Browser: {
        IE: !!(window.attachEvent && !window.opera),
        Opera: !!window.opera,
        WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
        Gecko: navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1
    },
    IE: __getIE(),
    mode: {
        Post: "Post",
        Get: "Get"
    },
    getRequest: function () {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest()
        } else {
            try {
                return new ActiveXObject("MSXML2.XMLHTTP")
            } catch (e) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) {
                    return false
                }
            }
        }
    }
};
function __getIE() {
    if (window.ActiveXObject) {
        var v = navigator.userAgent.match(/MSIE ([^;]+)/)[1];
        return parseFloat(v.substring(0, v.indexOf(".")))
    }
    return false
};
Array.prototype.foreach = function (func) {
    if (func && this.length > 0) {
        for (var i = 0; i < this.length; i++) {
            func(this[i])
        }
    }
};
String.format = function () {
    if (arguments.length == 0) return null;
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var regExp = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(regExp, arguments[i])
    }
    return str
};
String.prototype.startWith = function (s) {
    return this.indexOf(s) == 0
};
String.prototype.endWith = function (s) {
    var d = this.length - s.length;
    return (d >= 0 && this.lastIndexOf(s) == d)
};
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '')
};
function getid(id) {
    return (typeof id == 'string') ? document.getElementById(id) : id
};

document.getElementsByClassName = function (name) {
    var tags = document.getElementsByTagName('*') || document.all;
    var els = [];
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].className) {
            var cs = tags[i].className.split(' ');
            for (var j = 0; j < cs.length; j++) {
                if (name == cs[j]) {
                    els.push(tags[i]);
                    break
                }
            }
        }
    }
    return els
};
var getby = document.getElementsByClassName;
function Cookie() { }
Cookie.Save = function (n, v, mins, dn, path) {
    if (n) {
        if (!mins) mins = 365 * 24 * 60;
        if (!path) path = "/";
        var date = new Date();
        date.setTime(date.getTime() + (mins * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
        if (dn) dn = "domain=" + dn + "; ";
        document.cookie = name + "=" + value + expires + "; " + dn + "path=" + path
    }
};
Cookie.Del = function (n) {
    save(n, '', -1)
};
Cookie.Get = function (n) {
    var name = n + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
    }
    return ""
};

function getcookie(name) {
    var cookie_start = document.cookie.indexOf(name);
    var cookie_end = document.cookie.indexOf(";", cookie_start);
    return cookie_start == -1 ? '' : unescape(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
}
function setcookie(cookieName, cookieValue) {
    var expires = new Date();
    var now = parseInt(expires.getTime());
    var et = (86400 - expires.getHours() * 3600 - expires.getMinutes() * 60 - expires.getSeconds());
    expires.setTime(now + 1000000 * (et - expires.getTimezoneOffset() * 60));
    document.cookie = escape(cookieName) + "=" + escape(cookieValue) + ";expires=" + expires.toGMTString() + "; path=/";
}
function getOffsetTop(el, p) {
    var _t = el.offsetTop;
    while (el = el.offsetParent) {
        if (el == p) break;
        _t += el.offsetTop
    }
    return _t
};
function getOffsetLeft(el, p) {
    var _l = el.offsetLeft;
    while (el = el.offsetParent) {
        if (el == p) break;
        _l += el.offsetLeft
    }
    return _l
};
function attach(o, e, f) {
    if (document.attachEvent)
        o.attachEvent("on" + e, f);
    else if (document.addEventListener)
        o.addEventListener(e, f, false);
}

//--------- menu ------------
var tt;
var curMenu;
function mouseover(th, menu) {
    if (tt) clearTimeout(tt);
    displayMenu(false);
    menu = document.getElementById('menu' + menu);
    menu.style.left = getOffsetLeft(th) + 'px';
    menu.style.top = getOffsetTop(th) + th.offsetHeight + 'px';
    curMenu = menu;
    displayMenu(true)
}
function mouseout() {
    tt = setTimeout('displayMenu(false)', 200)
}
function _mouseover() {
    if (tt) clearTimeout(tt);
    displayMenu(true)
}
function _mouseout() {
    displayMenu(false)
}
function displayMenu(display) {
    if (curMenu) {
        curMenu.style.display = display ? 'block' : 'none'
    }
}
//---------- utils  ------------
function Getfocus() {
    document.getElementById('ctl00_Main_Address').focus();
    document.getElementById('ctl00_Main_Address').select()
}
function ajaxget(url, id) {
    var request = AjaxLite.getRequest();
    request.open("get", url, true);
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (document.getElementById(id)) {
                if (request.status == 200) {
                    document.getElementById(id).innerHTML = request.responseText;
                }
                else {
                    document.getElementById(id).innerHTML = "取消";
                }
            }
        }
    }
    request.setRequestHeader("If-Modified-Since", "0");
    request.send();
}
function gotourl(url, isopen) {
    if (isopen) {
        document.open(url);
    }
    else {
        document.location = url;
    }
}
function onget(newargid, argid, newargid2, argid2) {
    getid(newargid).value = getid(argid).value;
    if (newargid2) {
        getid(newargid2).value = getid(argid2).value;
    }
    var inputs = document.getElementsByTagName('input');
    SetDisabled(inputs);
    var textareas = document.getElementsByTagName('textarea');
    SetDisabled(textareas);
    var selects = document.getElementsByTagName('select');
    SetDisabled(selects);
    return true;
}
function SetDisabled(items) {
    for (var i = 0; i < items.length; i++) {
        if (items[i].getAttribute('isget') == 'false') {
            items[i].disabled = true;
        }
    }
}
//--------- ToolBox --------------
var currentInput = null;
var iswords = false;

function BoxShow(e) {
    var input = e;
    if (!input.id) {
        input = e.target ? e.target : e.srcElement;
    }
    currentInput = input;
    if (iswords) {
        FillUrls("toolbox_words");
    }
    else {
        FillUrls("toolbox_urls");
    }
    var box = getid("ToolBox");
    if (box.style.display == 'block' && currentInput.id == input.id) {
        return;
    }
    
    box.style.left = getOffsetLeft(input) + 'px';
    box.style.top = (getOffsetTop(input) + (input.offsetHeight - 1)) + 'px';
    box.style.width = (input.offsetWidth - 2) + 'px';
    box.style.display = 'block';
}
function BoxShowWords(e) {
    iswords = true;
    BoxShow(e);
}
function BoxShowUrls(e) {
    iswords = false;
    BoxShow(e);
}
function InputSetValue(val) {
    var obj = currentInput;
    obj.value = val;
    if (obj.getAttribute('url') == 'true') {
        var tags = document.getElementsByTagName('input');
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].getAttribute('url') == 'true' && tags[i] != obj) {
                tags[i].value = val;
            }
        }
    }
    BoxHide();
}
function BoxHide() {
    if (getid("ToolBox")) {
        getid("ToolBox").style.display = 'none';
    }
}
function InputMouseOverWords(e) {
    var input = e.target ? e.target : e.srcElement;
    if (input) {
        input.focus();
    }
}
function ToolBoxAdd() {
    BoxHide();
    var val = currentInput.value;
    if (val.trim() == '') {
        alert("不能添加空值。");
        return;
    }
    if (!iswords) {
        if (!IsURL(val)) {
            alert("输入网址不正确!")
            return;
        }
    }
    ajaxget('/ajaxsync.aspx?at=toolbox&iswords=' + iswords + '&addval=' + escape(val));
}
//最近查询添加网址
//function LastSearchAdd() {
//    var val = currentInput.value;
//    if (val.trim() == '') {
//        return;
//    }
//    if (!iswords) {
//        if (!IsURL(val)) {
//            return;
//        }
//    }
//    ajaxget('/ajaxsync.aspx?at=toolbox&last=1&iswords=' + iswords + '&addval=' + escape(val));
//}
function ToolBoxDeleteValue(val) {
    BoxHide();
    ajaxget('/ajaxsync.aspx?at=toolbox&iswords=' + iswords + '&delval=' + escape(val));
}

function FillUrls(cookieName) {
    var urls = getcookie(cookieName);
    var html = "<li><a href='javascript:;' onclick='ToolBoxAdd()'>＋保存输入框的网址</a></li>";
    if (iswords) {
        html = "<li><a href='javascript:;' onclick='ToolBoxAdd()'>＋保存输入框的关键字</a></li>";
    }
    if (urls != '' && urls != ';') {
        var urllist = urls.split('|');
        for (var i = 0; i < urllist.length; i++) {
            var textval = urllist[i];
            html += "<li><a href=\"javascript:InputSetValue('" + textval + "');\"><input type='button' value='删除' onclick=\"ToolBoxDeleteValue('" + textval + "');\" /> " + textval + "</a></li>";
        }
    }
    else {
        html += "<li>没有记录</li>"
    }
    getid("xlist").innerHTML = html;
}
//最近查询构造UL列表
//function FillUrlsForLastSearch(cookieName) {
//    var urls = getcookie(cookieName);
//    var html = "";
//   
//    if (urls != '' && urls != ';') {
//        var urllist = urls.split('|');
//        for (var i = 0; i < urllist.length; i++) {
//            var textval = urllist[i];
//            html += "<li><a href=\"javascript:InputSetValue('" + textval + "');\">" + textval + "</a></li>";
//        }
//    }
//    else {
//        html += "<li>没有记录</li>"
//    }
//    return html;
//}

function closeIME(e){
    var obj = e.target ? e.target : e.srcElement;
    obj.style.imeMode = 'disabled';
}

function OnPaste(e) {
    var obj = e.target ? e.target : e.srcElement;
    setTimeout("MoveHttp('" + obj.id + "')", 100);
}

function MoveHttp(id) {
    var val = getid(id).value;
    val = val.replace("http://", "");
    var temp = val.split('/');
    if (temp.length <= 2) {
        if (val[val.length - 1] == '/') {
            val = val.substring(0, val.length - 1);
        }
    }
    getid(id).value = val;
}

function OnKeyup(e) {
    var obj = e.target ? e.target : e.srcElement;
    setTimeout("addInput('" + obj.id + "')", 200);
}

function addInput(id) {
    var obj = getid(id);
    if (obj.value.indexOf('。') > 0) {
        obj.value = obj.value.replace('。', '.');
    }
    var tags = document.getElementsByTagName('input');
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].getAttribute('url') == 'true' && tags[i] != obj) {
            tags[i].value = obj.value;
        }
    }
}
//最近查询显示
//function lastSearchShow() {
//    getid('toollastsearch').onmouseover = DivShow;
//    getid('toollastsearch').onmouseout = DivHide;
//    getid('toollastsearch').style.left = getOffsetLeft(currentInput) + 'px';
//    getid('toollastsearch').style.top = (getOffsetTop(currentInput) + (currentInput.offsetHeight - 1)) + 'px';
//    getid('toollastsearch').style.width = (currentInput.offsetWidth - 2) + 'px';
//    if (document.getElementById("toollastsearch").style.display == 'block')
//        document.getElementById("toollastsearch").style.display = "none";
//        else
//            document.getElementById("toollastsearch").style.display = "block";

//    }
//-----------------最近查询创建节点开始----------------------
//function showshou(e,isword) {
//    var input = e;
//    if (!input.id) {
//        input = e.target ? e.target : e.srcElement;
//    }
//    currentInput = input;
//    //创建span节点 
//    var newNode = document.createElement("span"); //
//    newNode.innerHTML = "&nbsp;<img src='/template/default/images/shou.gif'/>&nbsp;最近查询";
//    newNode.className = "chaxun";
//    attach(newNode, "click", lastSearchShow);
//    insertAfter(newNode, e);
//    //创建toolbox节点
//    var newNodeDiv = document.createElement("div"); //
//    iswords = isword;
//    if (iswords) {
//        newNodeDiv.innerHTML = "<ul>" + FillUrlsForLastSearch('lastsearch_words') + "</ul>"; 
//    }
//    else {
//        newNodeDiv.innerHTML = "<ul>" + FillUrlsForLastSearch('lastsearch_urls') + "</ul>";
//    }
//    newNodeDiv.id = 'toollastsearch';
//    insertAfter(newNodeDiv, getid('ToolBox'));

//    //给button提交按钮添加onclick属性
//    attach(GetByClass('but', 'but2'), "mousedown", LastSearchAdd);

//}
//function insertAfter(newElement, targetElement) {
//    var parent = targetElement.parentNode;
//    if (parent.lastChild == targetElement) {
//        parent.insertBefore(newElement);
//    }
//    else {
//        parent.insertBefore(newElement, targetElement.nextSibling);
//    }
//}

//根据class获取元素（此方法获取第一个匹配的class）
//function GetByClass(classname, classname1) {
//    var odiv = document.getElementsByTagName("*");
//    var a;
//    for (var i = 0; i < odiv.length; i++) {
//        if (odiv[i].className == classname || odiv[i].className == classname1) {
//            a = odiv[i];
//            break;
//        }

//    }
//    return a;
//}
//function DivShow() {
//    getid('toollastsearch').style.display = 'block'
//}
//function DivHide() {
//    getid('toollastsearch').style.display = 'none'
//}

//-----------------最近查询创建节点结束----------------------
function Init() {
    getid("ToolBox").style.display = 'none';
    var tags = document.getElementsByTagName('input');
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].getAttribute('url') == 'true') {
            attach(tags[i], 'keyup', OnKeyup);
            attach(tags[i], 'mousedown', BoxShowUrls);
            attach(tags[i], 'mouseout', BoxHide);
            attach(tags[i], 'focus', closeIME);
            attach(tags[i], 'paste', OnPaste);
//            if (tags[i].getAttribute('last') != 'false')//过滤首页显示
//            showshou(tags[i],false);//显示最近查询图标
            tags[i].setAttribute('autocomplete', 'off');
        }
        else if (tags[i].getAttribute('words') == 'true') {
            attach(tags[i], 'click', BoxShowWords);
            attach(tags[i], 'mouseout', BoxHide);
//            if (tags[i].getAttribute('last') != 'false')//过滤首页显示
//                showshou(tags[i],true); //显示最近查询图标
            tags[i].setAttribute('autocomplete', 'off');
        }
    }
}


function IsURL(strUrl) {
    var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
    if (regular.test(strUrl)) {
        return true;
    }
    else {
        return false;
    }
}