// 定义链接
var https = "https://collect.topeffects.cn/";
// var https = "";


//返回本机信息 1为终端类型 2为终端平台

function agent() {
    var arr = []
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }

    //获取终端平台
    var start = userAgentInfo.indexOf('(')
    var end = userAgentInfo.indexOf(')')
    var str = userAgentInfo.slice(start +1,end)
    
    arr[0] = flag
    arr[1] = str
    return arr;
}

function is_ios(){
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isiOS
}

//生成范围内的随机数
function random_num(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.floor(Rand * Range); //舍去
    return num;
}

// js日期格式化
String.prototype.replaceAll = function(s1,s2){
    return this.replace(new RegExp(s1,"gm"),s2);
}

function get_local_time(nS) {
    times = new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    return times.replaceAll('/', '-').split(' ')[0]
}

// 验证手机号码是否正确
function check_submit_mobil(check_submit_mobil, el) {
    if (check_submit_mobil == "") {
        alert("手机号码不能为空！");
        el.focus();
        return false;
    }

    if (check_submit_mobil.length != 11) {
        alert("手机号码长度必须为11");
        el.focus();
        return false;
    }

    if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(check_submit_mobil))) {
        alert("手机号码格式不正确！");
        el.focus();
        return false;
    }
    return true;
}

// 验证邮箱
function check_submit_email() {
    if ($("#email").val() == "") {
        alert("邮箱不能为空!")
        $("#email").focus();
        return false;
    }
    if (!$("#email").val().match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
        alert("邮箱格式不正确");
        $("#email").focus();
        return false;
    }
    return true;
}

// 判断用户名字
function check_name( name ) {

    //判断姓名1不能为空
    function ltn( name ) {
        var ltn = name
        if(ltn == ""){
            alert("真实姓不能为空");
            return false;
        } else {
            return validate(ltn);
        }
    }

    // 判断是不是测试名字
    function test( name ){
        if( name == '测试' || name == '天创' ){
            return true;
        } else {
            return ltn( name )
        }
    }

    //验证名字是否百家姓
    function validate(ltn){
        var reg = /^([u4E00-u9FA5])*$/;
        if(ltn.length==1 || reg.test(ltn)==true){
            alert(" 请填写正确的名称");
            return false;
        } else {
            if(!check_surname(ltn))
            {
                alert("请填写正确的名称");
                return false;
            } else{

                if( black_list(ltn) ){
                    return true;
                } else {
                    alert("请填写正确的名称")
                }

            }
        }
    }

    //验证名字后面不可以有某个文字
    function black_list(name){
        var reg = /(?!.*先生.*|.*小姐.*|.*生.*|.*男士.*|.*女士.*|.*太太.*)^[\u4e00-\u9fff]{0,}$/g;
        return reg.test(name)
    }

    //验证百家姓3
    function check_surname(str){
        var str=str.substr(0,1); //截取用户提交的用户名的前两字节，也就是姓。
        var surname=" 赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤 滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵堪汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董粱杜阮蓝闵席季麻强贾路娄危江童颜郭 梅盛林刁钟徐邱骆高夏蔡田樊胡凌霍虞万支柯咎管卢莫经房裘缪干解应宗宣丁贲邓郁单杭洪包诸左石崔吉钮龚程嵇邢滑裴陆荣翁荀羊於惠甄魏加封芮羿储靳汲邴糜松 井段富巫乌焦巴弓牧隗山谷车侯宓蓬全郗班仰秋仲伊宫宁仇栾暴甘钭厉戎祖武符刘姜詹束龙叶幸司韶郜黎蓟薄印宿白怀蒲台从鄂索咸籍赖卓蔺屠蒙池乔阴郁胥能苍双 闻莘党翟谭贡劳逄姬申扶堵冉宰郦雍郤璩桑桂濮牛寿通边扈燕冀郏浦尚农温别庄晏柴瞿阎充慕连茹习宦艾鱼容向古易慎戈廖庚终暨居衡步都耿满弘匡国文寇广禄阙东 殴殳沃利蔚越夔隆师巩厍聂晁勾敖融冷訾辛阚那简饶空曾毋沙乜养鞠须丰巢关蒯相查后江红游竺权逯盖益桓公万俟司马上官欧阳夏侯诸葛闻人东方赫连皇甫尉迟公羊 澹台公冶宗政濮阳淳于仲孙太叔申屠公孙乐正轩辕令狐钟离闾丘长孙慕容鲜于宇文司徒司空亓官司寇仉督子车颛孙端木巫马公西漆雕乐正壤驷公良拓拔夹谷宰父谷粱 晋楚闫法汝鄢涂钦段干百里东郭南门呼延妫海羊舌微生岳帅缑亢况後有琴梁丘左丘东门西门商牟佘佴伯赏南宫墨哈谯笪年爱阳佟第五言福";
        r = surname.search(str);             // 查找字符串。
        if(r==-1){
            return false
        } else {
            return true
        }
    }

    return test(name)
}

//验证身份证
function identity_code_valid(code) {
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    var tip = "";
    var pass= true;

    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
        tip = "身份证号格式错误";
        pass = false;
    }

    else if(!city[code.substr(0,2)]){
        tip = "地址编码错误";
        pass = false;
    }
    else{
        //18位身份证需要验证最后一位校验位
        if(code.length == 18){
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != code[17]){
                tip = "校验位错误";
                pass = false;
            }
        }
    }
    if(!pass) alert(tip);
    return pass;
}

// 页面访问时长
function visit_timing(recordid){
    var start;
    var end;
    var duration = 0;
    start = new Date();
    $(window).on('beforeunload', function(e) {
        end = new Date(); // 用户退出时间
        duration = end.getTime() - start.getTime();
        duration = duration/1000; // 取的是秒
        var url = 'api_visitor_duration';
        $.ajax({
            type: 'POST',
            async: false, // false为同步请求
            url: url,
            dataType:'json',
            data: {'_token':'{{csrf_token()}}', duration : duration , recordid : recordid },
            success:function (e){
                console.log(e)
            }
        });
    });
}

