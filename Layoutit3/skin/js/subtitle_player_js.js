var total_lang_array = new Array("en", "cn");
var disp_lang_array = new Array("en", "cn");
var during_break = false;
var during_playing = false;
var stop_player = true;
var disp_lang_indi = 3;
var elapse_from_start = 0;
var flashplayer_curtime = 0;
var subtitle_index = 0;
var during_break = false;
var during_playing = false;
var elapse_incre_fun;
var in_loop = false;
var wait_for_sync_flag = false;

function playVideo() {
    player.playVideo();
}
function pauseVideo() {
    player.pauseVideo();
}
function seekTo(s) {
    player.seekTo(s);
}
function currentTime() {
    return player.currentTime();
}

function subtitle_getjson(jsonfile, lang) {
    var json_result;
    return json_result = $.getJSON(jsonfile, function (data) {
        $.each(data, function (i, item) {
            eval("sub_start_" + lang + ".push(item.start)");
            eval("sub_text_" + lang + ".push(item.text)");
            eval("sub_end_" + lang + ".push(item.end)");
            return eval("sub_index_" + lang + ".push(Math.floor(item.start / 1000))");
        });
        return eval("sub_json_" + lang + "=this.json_result");
    });
}

function remove_disp_lang_inArray(e) {
    var t, _ref;
    if ((t = disp_lang_array.indexOf(e)) > -1) {
        return ([].splice.apply(disp_lang_array, [t, t - t + 1].concat(_ref = [])), _ref);
    }
}


$(document).ready(function () {
    $('.btn-en').on('click', function () {
        if ($(this).hasClass('btn-success')) {
            disp_lang_indi = ~(~disp_lang_indi | 1);
            $('.srt-textarea').find('.srt-en').remove();
            remove_disp_lang_inArray("en");
        }
        else {
            disp_lang_indi |= 1;
            $('.srt-textarea').prepend('<div class="srt-en"></div>');
            disp_lang_array.push("en");
        }

        $(this).toggleClass('btn-success');
    });


    $('.btn-cn').on('click', function () {
        if ($(this).hasClass('btn-success')) {
            disp_lang_indi = ~(~disp_lang_indi | 2);
            $('.srt-textarea').find('.srt-cn').remove();
            remove_disp_lang_inArray("cn");
        }
        else {
            disp_lang_indi |= 2;
            $('.srt-textarea').append('<div class="srt-cn"></div>');
            disp_lang_array.push("cn");
        }

        $(this).toggleClass('btn-success');

    });
});


function wait_for_flashtime_sync() {

    wait_for_sync_flag = true;
    if (elapse_from_start - flashplayer_curtime != 0) {
        flashplayer_curtime = Number(currentTime()) * 1000;
    }
    else
    {
        elapse_from_start += 8;
        elapse_incre_fun = setInterval(function () { elapse_from_start += 10; }, 10);
        wait_for_sync_flag = false;
    }
}

function position_sub_index() {
    // item 79
    var i = sub_index_en.length - 1;
    if (elapse_from_start > sub_start_en[i]) {
        subtitle_index = i;
        return;
    }
    while (sub_start_en[i] > elapse_from_start) {
        if (--i < 0) {
            i++;
            break;
        }
    }
    subtitle_index = i;
    // item 81
}


function disp_sub_by_lang(disp_lang_array) {
    // item 870001
    var _ind87 = 0;
    var _col87 = disp_lang_array;
    var _keys87 = Object.keys(_col87);
    var _len87 = _keys87.length;
    while (true) {
        // item 870002
        if (_ind87 < _len87) {

        } else {
            break;
        }
        // item 870004
        var item = _col87[_keys87[_ind87]];
        // item 89
        eval("$('.srt-" + item + "').html(sub_text_" + item + "[" + subtitle_index + "])");
        // item 870003
        _ind87++;
    }
}


function subtitle_player() {
    // item 71
    if (in_loop == false) {
        flashplayer_curtime = 0;
        subtitle_index = 0;
        during_break = false;
        during_playing = false;
        elapse_from_start = 0;
        // item 17
        //"var everycall = setInterval(function(){....youfunc,10);"
        //"10 mill every call"
        in_loop = true;
    }
    else {

    }

    while (true) {
        // item 7
        if (stop_player == true) {
            in_loop = false;
            break;
        } else {

        }
        // item 27
        if (disp_lang_indi == 0) {

        } else {
//item 38
            if (wait_for_sync_flag == true)
            {
                wait_for_flashtime_sync();
            }
            //item 39

            elapse_incre_fun = setTimeout(function () {
                elapse_from_start += 10;
            }, 10);

            // item 37
            flashplayer_curtime = Number(currentTime()) * 1000;
            // item 19
            if (Math.abs(flashplayer_curtime - elapse_from_start) > 1100) {

                // item 22
                //"elapse_from_start = flashplayer_curtime"
                elapse_from_start = flashplayer_curtime + 1000;
                //item 36
                wait_for_flashtime_sync();

                // item 25
                //position sub index
                position_sub_index();
                // item 80
                during_break = false;
                during_playing = false;

            }
            else {

            }
            //sub
            // item 390001
            if (elapse_from_start < sub_start_en[subtitle_index]) {
                during_break = true;
                during_playing = false;
            } else {
                // item 390002
                if ((elapse_from_start >= sub_start_en[subtitle_index]) && (elapse_from_start <= sub_end_en[subtitle_index])) {
                    // item 56

                    if (during_playing == true) {

                    } else {
                        // item 58
                        //print sub_by_lang
                        disp_sub_by_lang(disp_lang_array);
                        during_playing = true
                        during_break = false;
                    }
                }
                else {
                    // item 390003
                    if (elapse_from_start > sub_end_en[subtitle_index]) {

                    }
                    else {
                        // item 390004
//                        throw "Unexpected switch value: " + elapse_from_start;
                    }
                    // item 47
                    if (elapse_from_start >= sub_start_en[subtitle_index + 1]) {
                        // item 68
                        subtitle_index += 1;
                        // item 58
                        disp_sub_by_lang(disp_lang_array);
                        during_playing = true;
                        during_break = false;
                    }
                    else {
                        // item 53
                        if (during_break == true) {

                        } else {
                            // item 51
                            //Clear sub text
                            during_break = true;
                        }
                    }
                }
            }
        }
        // item 72
        // pause 8 mill
        break;
    }
// item 18

// item 34
//Clear sub text
    if (in_loop == false) {
        $('.srt-textarea').children().text("");
// item 4
//"clearInterval(everycall);"
    }
    else {
        _.delay(subtitle_player, 8);
    }

}


/*
 //@ sourceMappingURL=subtitle_player_js.map
 */
/*
 //@ sourceMappingURL=subtitle_player_js.map
 */
