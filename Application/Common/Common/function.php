<?php
header("Content-type: text/html; charset=utf-8");

//左侧补零函数
function setStrzero($str, $num, $var='0', $type='l') {
	$type = ($type == 'l') ? STR_PAD_LEFT : STR_PAD_RIGHT;
	return str_pad($str, $num, $var, $type);
}

//处理金额	setMoney('1.5', '6') = 1500000分【入库】		setMoney('1500000', '6', '2') = 1.5万【读取】
function setMoney($money, $length='2', $type='1') {
	if($money){
		$length = setStrzero('1', $length+1, '0', 'r');
		switch($type){
			case 1:	//乘
				$res = $money * $length;
				break;
			case 2:	//除
				$res = $money / $length;
				break;
		}
	}else{
		$res = '0';
	}	
	return sprintf("%.2f", $res);
}

//数组转对象
function arrayToObject($e){
    if( gettype($e)!='array' ) return;
    foreach($e as $k=>$v){
        if( gettype($v)=='array' || getType($v)=='object' )
            $e[$k]=(object)arrayToObject($v);
    }
    return (object)$e;
}
//对象转数组
function objectToArray($e){
    $e=(array)$e;
    foreach($e as $k=>$v){
        if( gettype($v)=='resource' ) return;
        if( gettype($v)=='object' || gettype($v)=='array' )
            $e[$k]=(array)objectToArray($v);
    }
    return $e;
}
//生成随机的6位数
function getrand_code($length = 6 ,$type = 1) {
    // 密码字符集，可任意添加你需要的字符
    switch ($type) {
    	case '1':
    		$chars = '1234567890';
    		break;
    	case '2':
    		$chars = 'abcdefghijklmnopqrstuvwxyz';
    		break;
    	case '3':
    		$chars = 'ABCDEFGHIJKLMNOPQRSTUVWXY';
    		break;
    	default:
    		 $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    		break;
    }
    $password = '';
    for ( $i = 0; $i < $length; $i++ ) 
    {
        // 这里提供两种字符获取方式
        // 第一种是使用 substr 截取$chars中的任意一位字符；
        // 第二种是取字符数组 $chars 的任意元素
        // $password .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
        $password .= $chars[ mt_rand(0, strlen($chars) - 1) ];
    }
    return $password;
}

//发送XML数据
function send_xml($xmldata,$url,$chartype='utf-8'){
	//首先检测是否支持curl
	if (!extension_loaded("curl")) {
		trigger_error("对不起，请开启curl功能模块！", E_USER_ERROR);
	}
	//组装请求头
	$header[]="Content-Type: text/xml; charset=".$chartype;
	$header[]="User-Agent: Apache/1.3.26 (Unix)";
	$header[]="Host: {$_SERVER['HTTP_HOST']}";
	$header[]="Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2";
	$header[]="Connection: keep-alive";
	$header[]="Content-Length: ".strlen($xmldata);
	//$url = "http://{$_SERVER['HTTP_HOST']}".dirname($_SERVER['PHP_SELF']).'/dealxml.php';
	//初始一个curl会话
	$ch = curl_init();
	//设置url
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
	//设置发送方式：post
	curl_setopt($ch, CURLOPT_POST, 1);
	//设置发送数据
	curl_setopt($ch, CURLOPT_POSTFIELDS, $xmldata);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	//抓取URL并把它传递给浏览器
	$res = curl_exec($ch);
	//关闭cURL资源，并且释放系统资源
	curl_close($ch);
	header('Content-Type:text/xml; charset='.$chartype);
	//是否转码
	//$res = str_replace("encoding='GBK'", "encoding='UTF-8'", $res);
	return $res;
}
function hex2asc ($str) 
{  
    $str = join('',explode('\x',$str));  
    $len = strlen($str);  
    for ($i=0;$i<$len;$i+=2) 
    $data.=chr(hexdec(substr($str,$i,2)));  
    return $data;  
}
//投保des加密
function encrypt($str, $key)      
{      
    $block = @mcrypt_get_block_size('des', 'ecb');      
    $pad = $block - (strlen($str) % $block);      
    $str .= str_repeat(chr($pad), $pad);      
      
    return @mcrypt_encrypt(MCRYPT_DES, $key, $str, MCRYPT_MODE_ECB);      
}      
//文件上传
function uploadfile(){
	$post = array(
		'userid'	=>	I('userid'),
		'keyword'	=>	I('keyword')
	);
	if(empty($post['userid']) || empty($post['keyword'])) {
		$this->ajaxResponse(1, '缺少上传秘钥');
	}
	$kwd = md5(md5( substr($post['userid'], -1, 1).'0000' ));
	if($kwd != $post['keyword']) {
		$this->ajaxResponse(1, '上传秘钥错误');
	}
	if(empty($_FILES)) {
        $this->ajaxResponse(1, '请上传文件');
    }
	$path = './Public/file/upload/'.$post['userid'].'/'.date('Ymd').'/';
	// 文件上传
	import("Org.Util.UploadFile");
    //导入上传类
    $upload = new \UploadFile();			// 实例化上传类
    $upload->maxSize   	=   3145728 ;		// 设置附件上传大小
    $upload->exts      	=   array('xls');	// 设置附件上传类型
   // $upload->rootPath =   $path; 			// 设置附件上传根目录
    $upload->savePath  	=   $path; 			// 设置附件上传（子）目录
    // 上传文件 
  	$info   =   $upload->upload();
    if(!$info) {
        return false;
    }else{
       	//取得成功上传的文件信息
        $uploadList = $upload->getUploadFileInfo();
		$file_url = substr( $uploadList[0]['savepath'].$uploadList[0]['savename'], 1);
		return $file_url;
    }
}



/*
 * 功能     获取post rawdata 数据方法
 * @author  罗森
 * @date    2016.11.04
 * @para    $key      string   要获取的字段名
 * @para    $default  string 如果值为空时给的默认取给的默认参数
 */
function getPara($key, $default = "")
{
    $data = json_decode(file_get_contents('php://input'), true);
    return ($data[$key] === "" || $data[$key] === null) ? $default : $data[$key];
}
/*
 * 功能     利用CURL 获取的接口信息
 * @desc    post方式 以参数拼接后的字符形式：utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=querystr 传递
 * @author  罗森
 * @date    2016.11.04
 * @para    $url   string 是要访问的接口地址
 * @para    $data  array  接口要求的参数数组
 */
function getCurlData($url, $data)
{
    $querystr = "";
    foreach ($data as $k => $v) {
        $querystr .= $k . "=" . $v . "&";
    }
    $querystr = trim($querystr, "&");
    // writeSql($url . $querystr);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url); //访问的接口地址
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); //不输出在页面上
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $querystr); //post参数值
    $contents = curl_exec($ch);
    curl_close($ch);
    return json_decode($contents);
}
function szFileSign($data, $secretKey)
{
    foreach ($data as $k => $v) {
        if (($v === "") || ($v === null) || $k === "sign") {
            unset($data[$k]);
        }
    }
    //dump($data);
    //参数按键值排序
    ksort($data);
    $str = "";
    //拼接uri  query字符串 ‘k1=v1&k2=v2&k3=v3’
    foreach ($data as $key => $val) {
        $str .= $key . "=" . $val . "&";
    }
    $str = trim($str, "&") . "&key=" . $secretKey;
    return md5($str);
}
/*  功能：四舍六入五成双
 *  规则：
 *  1. 被修约的数字小于5时，该数字舍去；
 *  2. 被修约的数字大于5时，则进位；
 *  3. 被修约的数字等于5时，
 *          要看5前面的数字，
 *          若是奇数则进位，
 *          若是偶数则将5舍掉，
 *          即修约后末尾数字都成为偶数；
 *          若5的后面还有不为“0”的任何数，则此时无论5的前面是奇数还是偶数，均应进位。
 * @para   $num  结算数字
 * @para   $precision  保留位数
 */
function round465($num, $precision = 2)
{
    $pow = pow(10, $precision);
    if ((floor($num * $pow * 10) % 5 == 0) && (floor($num * $pow * 10) == $num * $pow * 10) && (floor($num * $pow) % 2 == 0)) {
//舍去位为5 && 舍去位后无数字 && 舍去位前一位是偶数    =》 不进一
        return floor($num * $pow) / $pow;
    } else {
//四舍五入
    }
        return round($num, $precision);
}
/*
 * 功能     胜智接口签名方法
 * @author  罗森
 * @date    2016.11.04
 * @para    $data  array  需要签名的字段数组
 *
 */
function szSign($data, $signKey)
{
    foreach ($data as $k => $v) {
        if (($v === "") || ($v === null) || $k === "sign") {
            unset($data[$k]);
        }
    }
    //参数按键值排序
    ksort($data);
    $str = "";
    //拼接uri  query字符串 ‘k1=v1&k2=v2&k3=v3’
    foreach ($data as $key => $val) {
        $str .= $key . "=" . $val . "&";
    }
    //$str = trim($str, "&")."&key=".C("SZ_SIGN_KEY");
    $str = trim($str, "&") . "&key=" . $signKey;
    $str = md5($str);
    return strtoupper($str);
}
function httpGet($url){

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $contents = curl_exec($ch);
    curl_close($ch);
    return json_decode($contents);

}


/*
 * 功能     利用CURL 获取的接口信息
 * @desc    post方式 json传输 
 * @date    2016.12.11
 * @para    $url   string 是要访问的接口地址
 * @para    $data  array  接口要求的参数数组
 */
function getCurlDataByjson($url,$jsonStr){
    $ch = curl_init($url); //请求的URL地址
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");//post方式发送
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonStr);//$data JSON类型字符串
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);//不输出在页面上
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Content-Length: ' . strlen($jsonStr)));
    $contents = curl_exec($ch);//这里的data打印出来是空的
    curl_close($ch);
    return json_decode($contents);
}
/*
 * 访问后台接口的签名方法
 */
function rySignStr($data){
    $key      = "04BF6939558F476E8B2DB1F7E60C4769";//签名秘钥
    $signTime = $data["signTime"];
    $funcName = $data["funcName"];
    $str      = $funcName.$key.$signTime;
    $sign     = strtoupper(sha1(strtoupper(md5($str))));
    return $sign;
}
function doPostArr($url, $post_data){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    return  curl_exec($ch);
}
/* 
 * @params
 *      $url    string
 *      $post_data array
 * curl 通过json格式请求
 * @author  sea
 * @email zouhai@ruiyit.com
 * @time 2016-10-20
 *  */
function doPost($url, $post_data){
    $jsonData = json_encode($post_data);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_TIMEOUT, 30); // 设置超时限制防止死循环
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$result = curl_exec($ch);
	curl_close($ch);
    return $result;
}

/*
 * 功能     利用CURL 获取的接口信息
 * @desc    post方式 以参数拼接后的字符形式：utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=querystr 传递
 * @author  罗森
 * @date    2017.11.04
 * @para    $url   string 是要访问的接口地址
 * @para    $data  array  接口要求的参数数组
 */
function getDownData($url, $data)
{
    $querystr = "";
    foreach ($data as $k => $v) {
        $querystr .= $k . "=" . $v . "&";
    }
    $querystr = trim($querystr, "&");
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url); //访问的接口地址
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); //不输出在页面上
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $querystr); //post参数值
    $contents = curl_exec($ch);
    curl_close($ch);
    return $contents;
}

//记录日志
function Add_LOG($name, $content){
	//检查目录
	$name = $name.'_'.substr(date('Y'), 2).'_'.date('m').'_'.date('d').'.log';
	$path = './Public/log/';
	mkdir($path, 0700);
	if(empty($content)){
		file_put_contents($path.$name, PHP_EOL, FILE_APPEND);
		$first = '[ '.date('Y-m-d H:i:s').' ]  '.$_SERVER['HTTP_HOST'].'/'.$_SERVER['REMOTE_ADDR'].'  http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'].($_SERVER['QUERY_STRING'] ? '?'.$_SERVER['QUERY_STRING'] : '');
		file_put_contents($path.$name, $first.PHP_EOL, FILE_APPEND);
	}else{
		file_put_contents($path.$name, date('Y-m-d H:i:s').'  '.$content.PHP_EOL, FILE_APPEND);		
	}
}

/*GET方法提交*/
function requestGet($url){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    $data = curl_exec($ch);
    return $data;
}


/**
　　* 下载图片到服务器
　　* @param string $image_file 网站图片地址
　　* @return $save_image_file 服务器图片绝对地址
　　*/
function DownLoadPic($image_file){
	$filename = date('His').floor(microtime()*1000);
	$fileupname = 'Public/person_photo/'.date('Ymd');
	if (!file_exists($fileupname)) {
		mkdir($fileupname);
	}
    $save_image_file = $fileupname.'/'.$filename.'.jpg';
	// $file = file_put_contents($save_image_file, file_get_contents($image_file),FILE_APPEND);
	$file = file_put_contents($save_image_file, $image_file,FILE_APPEND);
	return $save_image_file;
}

/*JSON报错展示*/
function callback($status,$message){
	echo json_encode(array('status'=>$status,'message'=>$message),JSON_UNESCAPED_UNICODE);exit;
}

/*JS 弹窗报错提示*/
function ajax_error($message){
	echo '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
	echo "<script type='text/javascript'>";
	echo "alert('$message');window.history.go(-1);";
	echo "</script>";exit;
}

function GetIpLookup($ip = ''){  
    if(empty($ip)){  
    	return '请输入IP地址'; 
    }  
    $res = @file_get_contents('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js&ip=' . $ip);  
    if(empty($res)){ return false; }  
    $jsonMatches = array();  
    preg_match('#\{.+?\}#', $res, $jsonMatches);  
    if(!isset($jsonMatches[0])){ return false; }  
    $json = json_decode($jsonMatches[0], true);
    if(isset($json['ret']) && $json['ret'] == 1){
    	$json['ip'] = $ip;
    	unset($json['ret']);
    }else{
    	return false;
    }
  	return $json;
}

/**
 * 获取用户真实 IP
 */
function getIP()
{
    static $realip;
    if (isset($_SERVER)){
        if (isset($_SERVER["HTTP_X_FORWARDED_FOR"])){
            $realip = $_SERVER["HTTP_X_FORWARDED_FOR"];
        } else if (isset($_SERVER["HTTP_CLIENT_IP"])) {
            $realip = $_SERVER["HTTP_CLIENT_IP"];
        } else {
            $realip = $_SERVER["REMOTE_ADDR"];
        }
    } else {
        if (getenv("HTTP_X_FORWARDED_FOR")){
            $realip = getenv("HTTP_X_FORWARDED_FOR");
        } else if (getenv("HTTP_CLIENT_IP")) {
            $realip = getenv("HTTP_CLIENT_IP");
        } else {
            $realip = getenv("REMOTE_ADDR");
        }
    }
    return $realip;
}

//获取用户IP地址
    function getRealIp()
    {

        if(!empty($_SERVER["HTTP_CLIENT_IP"]))
        {
            $cip = $_SERVER["HTTP_CLIENT_IP"];
        }
        else if(!empty($_SERVER["HTTP_X_FORWARDED_FOR"]))
        {
            $cip = $_SERVER["HTTP_X_FORWARDED_FOR"];
        }
        else if(!empty($_SERVER["REMOTE_ADDR"]))
        {
            $cip = $_SERVER["REMOTE_ADDR"];
        }
        else
        {
            $cip = '';
        }
        preg_match("/[\d\.]{7,15}/", $cip, $cips);
        $cip = isset($cips[0]) ? $cips[0] : 'unknown';
        unset($cips);

        return $cip;
    }


/** 
 * func 验证中文姓名 
 * @param $name 
 * @return bool 
 */  
function isChineseName($name){  
    if (preg_match('/^([\xe4-\xe9][\x80-\xbf]{2}){2,4}$/', $name)) {  
        return true;  
    } else {  
        return false;  
    }  
} 

/**
 * 判断是否为合法的身份证号码
 * @param $mobile
 * @return int
 */
function isCreditNo($vStr){
    $vCity = array(
	    '11','12','13','14','15','21','22',
	    '23','31','32','33','34','35','36',
	    '37','41','42','43','44','45','46',
	    '50','51','52','53','54','61','62',
	    '63','64','65','71','81','82','91'
    );
    if (!preg_match('/^([\d]{17}[xX\d]|[\d]{15})$/', $vStr)) return false;
    if (!in_array(substr($vStr, 0, 2), $vCity)) return false;
    $vStr = preg_replace('/[xX]$/i', 'a', $vStr);
    $vLength = strlen($vStr);
    if ($vLength == 18) {
    	$vBirthday = substr($vStr, 6, 4) . '-' . substr($vStr, 10, 2) . '-' . substr($vStr, 12, 2);
    } else {
    	$vBirthday = '19' . substr($vStr, 6, 2) . '-' . substr($vStr, 8, 2) . '-' . substr($vStr, 10, 2);
    }
    if (date('Y-m-d', strtotime($vBirthday)) != $vBirthday) return false;
    if ($vLength == 18) {
        $vSum = 0;
    	for ($i = 17 ; $i >= 0 ; $i--) {
        $vSubStr = substr($vStr, 17 - $i, 1);
        $vSum += (pow(2, $i) % 11) * (($vSubStr == 'a') ? 10 : intval($vSubStr , 11));
    }
    if($vSum % 11 != 1) return false;
    }
    return true;
}

/*通过身份证号 获取性别*/
function get_xingbie($cid) {
    //根据身份证号，自动返回性别
    // if(!isIdCard($cid)) return '';
    $sexint = (int)substr($cid,16,1);
    return $sexint % 2 === 0 ? '女' : '男';
}

/**根据身份证获取年龄
 * @param $cid 身份证
 * @param $type 1、身份证，2、年月日
 */
function getUserAge($cid,$type='1')
{
    if ($type == '1') {
        $time = substr($cid,6,8);
    }else{
        $time = $cid;
    }
    $date=strtotime($time);//获得出生年月日的时间戳
    $today=strtotime('today');//获得今日的时间戳
    $diff=floor(($today-$date)/86400/365);//得到两个日期相差的大体年数
    //strtotime加上这个年数后得到那日的时间戳后与今日的时间戳相比
    $age=strtotime($time.' +'.$diff.'years')>$today?($diff+1):$diff;
    return $age;
}

function send_request($url, $data, $refererUrl = '', $method = 'GET', $contentType = 'application/json', $timeout = 30, $proxy = false) {
    $ch = null;
    if('POST' === strtoupper($method)) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_HEADER,0 );
        curl_setopt($ch, CURLOPT_FRESH_CONNECT, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FORBID_REUSE, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
        if ($refererUrl) {
            curl_setopt($ch, CURLOPT_REFERER, $refererUrl);
        }
        if($contentType) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:'.$contentType));
        }
        if(is_string($data)){
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        } else {
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        }
    } else if('GET' === strtoupper($method)) {
        if(is_string($data)) {
            $real_url = $url. (strpos($url, '?') === false ? '?' : ''). $data;
        } else {
            $real_url = $url. (strpos($url, '?') === false ? '?' : ''). http_build_query($data);
        }
 
        $ch = curl_init($real_url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:'.$contentType));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
        if ($refererUrl) {
            curl_setopt($ch, CURLOPT_REFERER, $refererUrl);
        }
    } else {
        $args = func_get_args();
        return false;
    }
 
    if($proxy) {
        curl_setopt($ch, CURLOPT_PROXY, $proxy);
    }
    $ret = curl_exec($ch);
    $info = curl_getinfo($ch);
    $contents = array(
            'httpInfo' => array(
                    'send' => $data,
                    'url' => $url,
                    'ret' => $ret,
                    'http' => $info,
            )
    );
 
    curl_close($ch);
    return $ret;
}
?>