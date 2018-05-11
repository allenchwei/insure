<?php
namespace Act\Controller;

use Think\Controller;
use Think\Model;

// +----------------------------------------------------------------------
// | @ljf  保险页面后台处理
// +----------------------------------------------------------------------
class IndexController extends Controller
{
    /*主页显示*/
    public function index()
    {
        $channel_map_id = I('channel');
        $home = array(
            "CHANNEL_MAP_ID"=>$channel_map_id
        );
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' 注册渠道号：' . $channel_map_id);

        $channelModel = M('channel', C('DAIKUAN_QIANZUI'), C('DAIKUAN_CONTENT'));
        $channel = $channelModel->where(array('CHANNEL_KEY'=>$channel_map_id,'CHANNEL_STATUS'=>'1'))->find();
        $channel_id = $channel['channel_map_id'];
        $_SESSION['channel_map_id']=$channel_id;

        $traceModel = M('trace', C('DAIKUAN_QIANZUI'), C('DAIKUAN_CONTENT'));
        $trace = $traceModel->where("TRACE_PV > 0 and CHANNEL_MAP_ID = $channel_id and DATE_TIME >= '".date('Y-m-d',time())." 00:00:00' and DATE_TIME <= '".date('Y-m-d',time())." 23:59:59'")->find();
        if ($trace) {
            $update = $traceModel->where("TRACE_PV > 0 and CHANNEL_MAP_ID = $channel_id and DATE_TIME >= '".date('Y-m-d',time())." 00:00:00' and DATE_TIME <= '".date('Y-m-d',time())." 23:59:59'")->setInc('TRACE_PV');
        }else{
            $data = array(
                "CHANNEL_MAP_ID"=>$channel_id,
                "DATE_TIME"=>date('Y-m-d H:i:s',time()),
                "TRACE_PV"=>'1'
            );
            $trace = $traceModel->add($data);
        }
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' channel_map_id ' . $channel_id);
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' data ' . json_encode($data));
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' trace ' . json_encode($trace));
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' channelModel ' . $traceModel->getlastsql());

        $this->assign('home',$home);
        $this->display();
    }

    /*第二个页面提交  数据再提交*/
    public function index_submit()
    {
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' =======第一步提交开始======：' . json_encode($_POST));
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' =======第一步提交开始======：' . json_encode($_GET));
        $post = $_POST;
        $get = $_GET;
    	$daikuanModel = M('baoxian', C('DAIKUAN_QIANZUI'), C('DAIKUAN_CONTENT'));
        $channelModel = M('channel', C('DAIKUAN_QIANZUI'), C('DAIKUAN_CONTENT'));
        /*事务开启*/
        $daikuanModel->startTrans();
        /*获取验证码|验证手机号码*/
        if (!empty($get)) {
            // callback(200,'测试短信发送专用!');
        	$mobile = $_GET['mobile'];/*获取手机号码*/
        	Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' 注册手机号码：' . $mobile);
        	/*手机号判空*/
	        if (empty($mobile)) {
	            callback(202,'手机号必填!');
	        }
	        /*手机号格式校验*/
	        if (!preg_match("/^1[34578]\d{9}$/", $mobile)) {
	            callback(202,'手机号格式不正确!');
	        }

            $ip_address = getIP();//获取IP地址
            $ipInfos = GetIpLookup($ip_address); //baidu.com IP地址
            $province = $ipInfos['province'];//省
            $city = $ipInfos['city'];//市级
            if (empty($city)) {
                $url = 'http://api.ip138.com/query/?ip='.$ip_address.'&oid=15971&mid=78748&sign='.md5("ip=".$ip_address."&token=29e7827abedd0783dfe95d4e3420d434");
                $ret = file_get_contents($url);
                $result = json_decode($ret,true);
                if ($result['ret'] == 'ok') {
                    $province = $result['data'][1];
                    $city = $result['data'][2];
                }
            }
            
            /*检测渠道是否异常*/
            $channel_key = $_GET['channel_map_id'];/*获取渠道号*/
            Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' 注册渠道号：' . $channel_key);
            $channel = $channelModel->where(array('CHANNEL_KEY'=>$channel_key,'CHANNEL_STATUS'=>'1'))->find();
            Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' channel=' . json_encode($channel));
            if (empty($channel)) {
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' 注册渠道号渠道异常');
                callback(202,'渠道异常!');
            }
            $channel_map_id = $channel['channel_map_id'];

            /*检测手机号码重复*/
	        $check_mobile = $daikuanModel->where(array('MOBILE' => $mobile))->find();
	        if ($check_mobile) {
	        	Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' 重复提交mobile：' . json_encode($check_mobile));
	            callback(202,'该手机号已经提交过申请，请勿重复提交!');
	        }

	        // $mobile = 0;
        	$code = getrand_code();/*生成6位数验证码*/
        	Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' 注册验证码：' . $code);
        	$url = 'http://m.turntable8.com/Home/AliYun/sendSms';
        	Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' url ' . $url);
        	$data = array(
        		"phone"=>$mobile,
        		"code"=>$code
        	);
        	$charge = send_request($url,$data,'','GET');
        	$return = json_decode($charge,true);
        	Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' charge '.' ' . $charge);
        	if ($return['status'] != '200') {
        		Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' 验证码发送失败');
        		callback(202,'验证码发送失败!');
        	}
        	Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' 验证码发送成功');
        	$data = array(
        		'CODE'=>$code,
        		'MOBILE'=>$mobile,
        		'CREATE_TIME'=>date('Y-m-d H:i:s',time()),
        		'STATUS'=>'2',
        		'USER_NAME'=>0,
        		'USER_ID'=>time(),
        		'USER_BIRTHDAY'=>0,
        		'USER_SEX'=>0,
        		'USER_AGE'=>0,
                'AMOUNT'=>0,
                "PROVINCE" => $province,//省份
                "CITY" => $city,//市级
                "IP_ADDRESS" => $ip_address,//IP地址
        		'CHANNEL_MAP_ID'=>$channel_map_id?$channel_map_id:0,
        	);
        	Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' add：' . json_encode($data));
        	$daikuan = $daikuanModel->add($data);
        	Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' daikuan：' . $daikuan);
        	Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' daikuan：' . $daikuanModel->getLastSql());
        	Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' daikuan：' . $daikuanModel->getError());
        	if (empty($daikuan)) {
        		$daikuanModel->rollback();
        		Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' 插表失败！');
        		callback(204,'插表错误!');
        	}
        	$daikuanModel->commit();
        	Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' 插表成功！');
        	callback(200,'验证码已发送');
        	exit;
        }
        /*姓名判空*/
        if (empty($post['name'])) {
            ajax_error('姓名必填!');
        }
        /*身份证号判空*/
        if (empty($post['idCard'])) {
            ajax_error('身份证号必填!');
        }
        /*身份证号格式校验*/
        if (!isCreditNo($post['idCard'])) {
            ajax_error('身份证号格式不正确!');
        }
        $idCard = $daikuanModel->where(array('USER_ID' => $post['idCard']))->find();
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' idCard：' . json_encode($idCard));
        if ($idCard) {
            ajax_error('该身份证号已经提交过申请，请勿重复提交!');
        }

        /*过滤身份证 出生年月日*/
        $date = substr($post['idCard'], 6, 8);
        $date = date('Y-m-d', strtotime($date));

        /*通过身份证号 获取性别*/
        $sex = get_xingbie($post['idCard']);
        $userAge = getUserAge($post['idCard']);

        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' userAge：' . json_encode($userAge));
        /*贷款金额判空*/
        // if (empty($post['loanAomunt'])) {
        //     ajax_error('贷款金额必填!');
        // }
        /*手机号判空*/
        if (empty($post['mobile'])) {
            ajax_error('手机号必填!');
        }
        /*验证码判空*/
        if (empty($post['captcha'])) {
            ajax_error('验证码必填!');
        }
        /*姓名格式校验*/
        if (!isChineseName($post['name'])) {
            ajax_error('姓名格式不正确!');
        }
        /*手机号格式校验*/
        if (!preg_match("/^1[34578]\d{9}$/", $post['mobile'])) {
            ajax_error('手机号格式不正确!');
        }

        
        // $mobile = $daikuanModel->where(array('MOBILE' => $post['mobile']))->find();
        // Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' mobile' . json_encode($mobile));
        // if ($mobile) {
        //     ajax_error('该手机号已经提交过申请，请勿重复提交!');
        // }
        $check = $daikuanModel->field('code,create_time,status,id')->where(array('MOBILE'=>$post['mobile']))->find();
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' check ' . json_encode($check));
        /*2：未注册成功*/
        if ($check['status'] == '2') {
        	if ($post['captcha'] != $check['code']) {
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' 验证码输入错误 ');
        		ajax_error('验证码输入错误!');
        	}
        	$check_time = date('Y-m-d H:i:s',time());
        	if (strtotime($check_time) - strtotime($check['create_time']) > 300) {
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' 验证码超时 ');
        		ajax_error('验证码超时!');
        	}
        /*1：已注册*/
        }elseif ($check['status'] == '1') {
            Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' 您已提交申请过，请勿重复提交 ');
    		ajax_error('您已提交申请过，请勿重复提交!');
        }else{
            Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' 请获取验证码后，再提交申请 ');
        	ajax_error('请获取验证码后，再提交申请!');
        }

        $ip_address = getIP();//获取IP地址
        
        /*第一步存储*/
        $data = array(
            "USER_NAME" 	=> $post['name'],//姓名
            "USER_ID"		=> $post['idCard']?$post['idCard']:time(),//身份证号
            "AMOUNT" 		=> $post['loanAomunt'] ? $post['loanAomunt']: "0",//贷款金额
            "MOBILE" 		=> $post['mobile'],//手机号
            "USER_BIRTHDAY" => $date,//出生年月日
            "USER_SEX" 		=> $sex == '男' ? '1' : '2',//性别
            "USER_AGE" 		=> $userAge,
            "STEP"     		=>'1',
            "STATUS"     	=>'1',//更新状态，变为已注册
        );
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' data' . json_encode($data));
        
        $daikuanModel->startTrans();
        $select_baoxian = $daikuanModel->where(array('MOBILE'=>$post['mobile']))->save($data);
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' data=' . $daikuanModel->getlastsql());
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' select_baoxian=' . $select_baoxian);
        if (empty($select_baoxian)) {
            $daikuanModel->rollback();
            ajax_error('提交失败!');
        }
        $daikuanModel->commit();
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' 注册成功！');

        // $return = $this->toubao($post);

        $this->assign('daikuan_id', $check['id']);
        $this->display('index2');
    }

    /*第二步信息提交*/
    public function success()
    {
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' =======第二步提交开始======：' . json_encode($_POST));
        $post = $_POST;
        if (empty($post)) {
        	ajax_error('资料不能为空!');
        }
        $ip_address = getIP();//获取IP地址
        $ipInfos = GetIpLookup($ip_address); //baidu.com IP地址
        $province = $ipInfos['province'];//省
        $city = $ipInfos['city'];//市级
        $daikuanId = $post['daikuan_id'];
        // $daikuanId = '94';
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' daikuanId ' . json_encode($daikuanId));
        if (empty($daikuanId)) {
        	ajax_error('非法操作!');
        }
        $baoxianId = $post['baoxian_id'];
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' baoxianId ' . json_encode($baoxianId));
        if (empty($post['monthlySalary'])) {
            ajax_error('月收入必填!');
        }
        if (empty($post['children'])) {
            ajax_error('子女类型必填!');
        }
        if (empty($post['property'])) {
            ajax_error('资产情况必填!');
        }
        if (empty($post['tourism'])) {
            ajax_error('出游类型必填!');
        }
        if (empty($post['guarantee'])) {
            ajax_error('保障类型必填!');
        }
        if (empty($post['money'])) {
            ajax_error('保障金额必填!');
        }
        if (empty($post['policy'])) {
            ajax_error('保单类型必填!');
        }
        if (empty($post['pay'])) {
            ajax_error('缴费方式必填!');
        }
        $data = array(
            "MONTH_INCOME" => $post['monthlySalary'],//月收入
            "CHILDREN" => $post['children'],//子女类型  
            "HOUSE_PROPERTY_CAR" => $post['property'],//资产情况
            "POLICY_ONLINE" => $post['policy'],//保单类型  
            "TOURISM" => $post['tourism'],//出游类型  
            "MONEY" => $post['money'],//保障金额  
            "PROVINCE" => $province,//省份
            "CITY" => $city,//市级
            "STEP" => '2',//第二步
            "IP_ADDRESS" => $ip_address,//IP地址
            "GUARANTEE" => $post['guarantee'],//保障类型  
            "PAY" => $post['pay'],//缴费方式必填  ？
        );
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' data：' . json_encode($data));
        $daikuanModel = M('baoxian', C('DAIKUAN_QIANZUI'), C('DAIKUAN_CONTENT'));
        $daikuanModel->startTrans();
        $check_step = $daikuanModel->field('step')->where(array('ID' => $daikuanId))->find();
        if ($check_step['step'] == '2') {
        	redirect(U('Act/index/index'), 1, '<h1>请勿重复提交，页面跳转中...</h1>');exit;
        }
        $daikuan = $daikuanModel->where(array('ID' => $daikuanId))->save($data);
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' daikuan' . json_encode($daikuan));
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' daikuan' . $daikuanModel->_sql());
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' daikuan' . $daikuanModel->getDbError());
        if (!$daikuan) {
            $daikuanModel->rollback();
            ajax_error('插表失败_1!');
        }
        $daikuanModel->commit();
        
        $find = $daikuanModel->where(array('ID' => $daikuanId))->find();
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' find=' . json_encode($find));

        $return = $this->toubao($find);//投保渠道
        $decode = json_decode($return,true);
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' decode=' . json_encode($decode,JSON_UNESCAPED_UNICODE));
        //如果新旦投保失败，则投保增险渠道
        if ($decode['status'] == "FAILED") {
            $zx_return = $this->zengXian($find);//增险渠道
            Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' zx_return=' . json_encode($zx_return,JSON_UNESCAPED_UNICODE));
            if ($zx_return['state'] == 'true') {
                $daikuan = $daikuanModel->where(array('ID' => $daikuanId))->save(array('KIND_ACCIDENT'=>$zx_return['companyNam'],'POLICY_NUM'=>'','KIND_STATUS'=>1));
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' daikuan=' . $daikuan);
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' daikuanModel=' . $daikuanModel->getlastsql());
                $this->assign('type','yangguang');
            }else{
                $daikuan = $daikuanModel->where(array('ID' => $daikuanId))->save(array('KIND_ACCIDENT'=>'','POLICY_NUM'=>'','KIND_STATUS'=>2));
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' daikuan=' . $daikuan);
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' daikuanModel=' . $daikuanModel->getlastsql());
            }
            exit;
        }

        $detailMessage = $decode['detailMessage'];
        $productCode = '';
        $companyName = '';
        $time = '';
        foreach ($detailMessage as $value) {
            if ($value['status'] == 'SUCCEEDED') {
                $productCode = $value['productCode'];//险种缩写
                $companyName = $value['companyName'];//险种名称
                break;
            }else{
                if ($value['msg'] == '每日可用余量超量') {
                    $time = 'yes';
                    $companyName = $value['companyName'].'('.$value['msg'].')';
                    break;
                }
            }
        }
        if ($decode['status'] == "FAILED") {
            if ($time == 'yes') {
                $kind_status = 3;//投保未成功
            }else{
                $companyName = $decode['message'];
                $kind_status = 2;//投保状态  失败
            }
        }elseif ($decode['status'] == "SUCCEEDED") {
            $kind_status = 1;//成功
        }
        
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' productCode=' . $productCode);
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' companyName=' . $companyName);
        $type='';
        if ( $productCode == "v_zy_lxys") {
            $type="zhongying";
        }elseif ( $productCode == "ddh_jtzhyw_a") {
            $type="daduhui";
        }elseif( $productCode == "taiping_bwxwy") {
            $type="taiping";
        }elseif( $productCode == "huaxia_yiwai") {
            $type="huaxia";
        }elseif( $productCode == "tk_lxwy") {
            $type="taikang";
        }
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' type=' . $type);
        $daikuan = $daikuanModel->where(array('ID' => $daikuanId))->save(array('KIND_ACCIDENT'=>$companyName,'POLICY_NUM'=>$decode['policyNo'],'KIND_STATUS'=>$kind_status));
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' daikuan=' . $daikuan);
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' daikuanModel=' . $daikuanModel->getlastsql());
        $this->assign('type',$type);
        $this->display();
}

    /*页面测试*/
    public function success1()
    {
        $this->assign('type','yangguang');
        // Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' =======第一步提交开始======：' . json_encode($_POST ? $_POST : $_GET));
        $this->display('success');
    }

    public function index2(){
    	$this->display();
    }

    public function act(){
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' =======第一步提交开始======：' . file_get_contents('php:input'));
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' =======第一步提交开始======：' . json_encode($_GET));
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' =======第一步提交开始======：' . json_encode($_POST));
    	echo json_encode(array('imgurl'=>'__PUBLIC__/bigwheel/images/LBi9h3jJXg.jpg','link'=>'http://www.ef.com.cn/online/lp/cn/2016yr/mobile/newStyle-161203.aspx?ctr=cn&lng=cs&ptn=Ykcn&etag=tc-bluegirl','position'=>'6'));
    }


    public function toubao($data){
        if (empty($data)) {
            callback(202,'参数为空!');
        }

        // $data['user_name'] = '吴能';
        // $data['mobile'] = '18633339551';
        // $data['user_id'] = '430802199504037454';
        // $sumInsured = '10000000';

        if ($data['month_income'] == '1') {
            $month_income = "500000";
        }elseif ($data['month_income'] == '2') {
            $month_income = "1000000";
        }elseif ($data['month_income'] == '3') {
            $month_income = "2000000";
        }else{
            $month_income = "500000";
        }

        if ($data['house_property_car'] == '1') {
            $house_property_car = "有车有房";
        }elseif ($data['house_property_car'] == '2') {
            $house_property_car = "有车无房";
        }elseif ($data['house_property_car'] == '3') {
            $house_property_car = "无车有房";
        }elseif ($data['house_property_car'] == '4') {
            $house_property_car = "无车无房";
        }

        if ($data['children'] == '1') {
            $children = "一个";
        }elseif ($data['children'] == '2') {
            $children = "两个或以上";
        }elseif ($data['children'] == '3') {
            $children = "没有";
        }

        if ($data['tourism'] == '1') {
            $tourism = '自驾';
        }elseif ($data['tourism'] == '2') {
            $tourism = "火车或公交";
        }elseif ($data['tourism'] == '3') {
            $tourism = "飞机";
        }

        if ($data['guarantee'] == '1') {
            $guarantee = '意外保障';
        }elseif ($data['guarantee'] == '2') {
            $guarantee = '重疾保障';
        }elseif ($data['guarantee'] == '3') {
            $guarantee = '医疗保障';
        }

        if ($data['money'] == '1') {
            $sumInsured = '10000000';
        }elseif ($data['money'] == '2') {
            $sumInsured = '20000000';
        }elseif ($data['money'] == '3') {
            $sumInsured = '30000000';
        }elseif ($data['money'] == '4') {
            $sumInsured = '50000000';
        }

        if ($data['policy_online'] == '1') {
            $policy_online = '有';
        }elseif ($data['policy_online'] == '2') {
            $policy_online = '无';
        }

        if ($data['pay'] == '1') {
            $pay = '年缴';
        }

        $url = 'http://xbbapi.data88.cn/insurance/doInsure';
        $key = '3be20a0334e99695e123b54df785d2f3';
        $para = array();
        $para['adCode'] = '601459d8';//投放编码
        $para['policyHolderName'] = $data['user_name'];//投保人姓名
        $para['mobile'] = $data['mobile'];//手机号码
        $para['policyHolderIdCard'] = $data['user_id'];//投保人身份证号
        $para['activityConfigNum'] = 0;//活动配置号
        $para['premiumInfo'] = array("paymentType"=>"ANNUAL","sumInsured"=>$sumInsured);//测保字段
        $para['questionnaire'] = array(
            array('question'=>'您的月收入是多少？','answers'=>array($month_income)),
            array("question"=>"您的资产状况？","answers"=>array($house_property_car)),
            array("question"=>"请问您是否已有子女？","answers"=>array($children)),
            array("question"=>"请问您平时与家人出游多以什么方式？","answers"=>array($tourism)),
            array("question"=>"如果让您选择您更倾向于哪种商业保障？","answers"=>array($guarantee)),
            array("question"=>"您的期望保障金额是？","answers"=>array($sumInsured)),
            array("question"=>"您目前是否已有在效保单？","answers"=>array($policy_online)),
            // array("question"=>"缴费方式","answers"=>array($pay))
        );
        $para['fromIp'] = $data['ip_address'] ? $data['ip_address'] : $_SERVER["REMOTE_ADDR"];//客户ip
        $para['sign'] = md5($para['adCode'].$key.$para['mobile']);
        $para = json_encode($para);
        // var_dump($para);
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' para ' . $para);
        $charge = getCurlDataByjson($url,$para);
        return json_encode($charge);
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' charge' . json_encode($charge,JSON_UNESCAPED_UNICODE));
    }

    public function qry_info(){
        $url = 'http://xbbapi.data88.cn/insurance/channel/policy/info';
        $key = '3be20a0334e99695e123b54df785d2f3';

        list($msec, $sec) = explode(' ', microtime());
        $msectime = (float)sprintf('%.0f', (floatval($msec) + floatval($sec)) * 1000);

        $para = array();
        $para['adCode'] = '601459d8';//投放编码
        $para['date'] = $time ? $time :date('Y-m-d');//查询日期
        $para['sign'] = md5($para['adCode'].$key.$msectime);
        $para = json_encode($para);
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' para ' . $para);
        $charge = getCurlDataByjson($url,$para);
        var_dump($charge);
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' charge' . json_encode($charge,JSON_UNESCAPED_UNICODE));
    }

    public function pv(){
        $daikuanModel = M('baoxian', C('DAIKUAN_QIANZUI'), C('DAIKUAN_CONTENT'));
        $find = $daikuanModel->where(array('ID' => '2687'))->find();
        $a = $this->zengXian($find);
        var_dump($a);
        // Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' input =' . json_encode($_POST));
    }

    //囎险第三方接口
    public function zengXian($data){
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' data' . json_encode($data,JSON_UNESCAPED_UNICODE));
        $url = 'http://www.ylxqgo.com/yx/ygrsData.aspx';

        if ($data['user_sex'] == '1') {
            $sex = '男';
        }elseif ($data['user_sex'] == '2') {
            $sex = '女';
        }

        if ($data['house_property_car'] == '1') {
            $hasCar = '有';
            $hasHouse = '有';
        }elseif ($data['house_property_car'] == '2') {
            $hasCar = '有';
            $hasHouse = '无';
        }elseif ($data['house_property_car'] == '3') {
            $hasCar = '无';
            $hasHouse = '有';
        }elseif ($data['house_property_car'] == '4') {
            $hasCar = '无';
            $hasHouse = '无';
        }

        if ($data['policy_online'] == '1') {
            $isCommercialInsurance = '有';
        }elseif ($data['policy_online'] == '2') {
            $isCommercialInsurance = '无';
        }

        if ($data['house_property_car'] == '1') {
            $house_property_car = "有车有房";
        }elseif ($data['house_property_car'] == '2') {
            $house_property_car = "有车无房";
        }elseif ($data['house_property_car'] == '3') {
            $house_property_car = "无车有房";
        }elseif ($data['house_property_car'] == '4') {
            $house_property_car = "无车无房";
        }

        if ($data['guarantee'] == '1') {
            $guarantee = '意外保障';
        }elseif ($data['guarantee'] == '2') {
            $guarantee = '重疾保障';
        }elseif ($data['guarantee'] == '3') {
            $guarantee = '医疗保障';
        }

        if ($data['money'] == '1') {
            $sumInsured = '10万';
        }elseif ($data['money'] == '2') {
            $sumInsured = '20万';
        }elseif ($data['money'] == '3') {
            $sumInsured = '30万';
        }else{
            $sumInsured = '30万';
        }

        $para = array();
        $para['access_token'] = 'ylxqbjzswebbest';//识别代码
        $para['name'] = $data['user_name'];//姓名
        $para['mobile'] = $data['mobile'];//手机号
        $para['city'] = $data['city'];//城市（必填）
        $para['sex'] = $sex;//性别（必填）
        $para['birth'] = $data['user_birthday'];//生日（必填）
        $para['insuranceName'] = '阳光人寿出行无忧意外伤害保险';//保险名称
        $para['socialSecurity'] = '信息流';//是否有社保 有/无
        $para['hasCar'] = $hasCar;//是否有车
        $para['hasHouse'] = $hasHouse;//是否有房
        $para['income'] = '信息流';//收入/薪资 数字，如：100000 若为区间则传最大值
        $para['loanAmount'] = '信息流';//贷款额度
        $para['workIdentity'] = '信息流';//职业身份
        $para['propertyType'] = '信息流';//房产类型
        $para['isCommercialInsurance'] = $isCommercialInsurance;//是否有保单
        $para['localProvidentFund'] = '信息流';//是否有公积金
        $para['needLoan'] = '信息流';//是否有贷款需求
        $para['hasCreditCard'] = '信息流';//是否有信用卡
        $para['channelProperty'] = '信息流';//渠道属性   
        $para['carModel'] = '信息流';//汽车品牌及型号
        $para['channelsource'] = 'ylxqbjzswebbest';//渠道编码     
        $para['answer1'] = $house_property_car;//问卷1
        $para['answer2'] = $guarantee;//问卷2  
        $para['answer3'] = $sumInsured;//问卷3
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' para' . json_encode($para,JSON_UNESCAPED_UNICODE));
        // var_dump($para);exit;
        $charge = json_decode(doPost($url,$para),true);
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' charge' . json_encode($charge,JSON_UNESCAPED_UNICODE));
        return $charge;
    }
}
	