layui.use(['jquery', 'layer', 'slider', 'form', 'element'], function () {
    var $ = layui.jquery
        , form = layui.form
        , element = layui.element
        , slider = layui.slider;

    var guildLevel = $("input[name='guildLevel']:checked").val(); // 公会等级
    var guildPersonBuffArr = [0, 5, 2]; // 各个人增益数值
    var guildPersonSPBuffArr = [0, 3, 2]; // 各个人特殊增益数值
    var guildCommonBuffArr = []; // 各公共增益数值
    var maxPersonLevel = 7; // 个人增益最高等级
    var maxPersonSPLevel = 4; // 个人增益最高等级
    var maxCommonLevel = 1; // 公共增益最高等级
    var personSliderTheme = '#1E9FFF'; // 个人增益滑块颜色
    var commonSliderTheme = '#FF5722'; // 公共增益滑块颜色

    initGuild();

    form.on("radio(levelChange)", function () {
        guildLevel = $(this).val();
        // console.log(guildLevel);
        if (guildLevel === "2") {
            maxPersonLevel = 16;
            maxPersonSPLevel = 7;
            maxCommonLevel = 2;
        } else if (guildLevel === "3") {
            maxPersonLevel = 26;
            maxPersonSPLevel = 10;
            maxCommonLevel = 3;
        } else {
            maxPersonLevel = 7;
            maxPersonSPLevel = 4;
            maxCommonLevel = 1;
        }
        initGuild();
    });

    function initGuild() {
        $('.guildSilderTip').html('0');
        var guildPersonSilders = $('.guildPersonSilder');
        initGuildSilders(guildPersonSilders, 1, personSliderTheme, maxPersonLevel);
        var guildPersonSPSilders = $('.guildPersonSPSilder');
        initGuildSilders(guildPersonSPSilders, 2, personSliderTheme, maxPersonSPLevel);

        var guildCommonSilders = $('.guildCommonSilder');
        initGuildSilders(guildCommonSilders, 3, commonSliderTheme, maxCommonLevel);
    }

    // 初始化滑块
    function initGuildSilders(guildSilders, datafalg, themeColor, maxNum) {
        $.each(guildSilders, function (index, obj) {
            var id = $(this).attr('id');
            let s = slider.render({
                elem: obj
                , tips: true
                , step: 1 //步长
                , showstep: true //开启间隔点
                , change: function (value) {
                    $('#' + id + '_tip').html(value);
                    if (datafalg === 1) {
                        guildPersonBuffArr[index] = value;
                    } else if (datafalg === 2) {
                        guildPersonSPBuffArr[index] = value;
                    } else if (datafalg === 3) {
                        guildCommonBuffArr[index] = value;
                    }
                }
                , theme: themeColor // 主题颜色
                , max: maxNum // 最大值
            });
            var value = 0;
            if (datafalg === 1) {
                if (!isNaN(guildPersonBuffArr[index])) {
                    value = guildPersonBuffArr[index];
                } else {
                    value = 0;
                }
            } else if (datafalg === 2) {
                if (!isNaN(guildPersonSPBuffArr[index])) {
                    value = guildPersonSPBuffArr[index];
                } else {
                    value = 0;
                }
            } else if (datafalg === 3) {
                if (!isNaN(guildCommonBuffArr[index])) {
                    value = guildCommonBuffArr[index];
                } else {
                    value = 0;
                }
            }
            s.setValue(value);
        })
    }
});

