<?php
namespace Home\Controller;

use Think\Controller;
use Think\Model;

// +----------------------------------------------------------------------
// | @ljf  贷款页面后台处理
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
    	$daikuanModel = M('daikuan', C('DAIKUAN_QIANZUI'), C('DAIKUAN_CONTENT'));
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
            
            /*检测渠道是否异常*/
            $channel_map_id = $_GET['channel_map_id'];/*获取渠道号*/
            Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' 注册渠道号：' . $channel_map_id);
            if (!empty($channel_map_id)) {
                $channel = $channelModel->where(array('CHANNEL_MAP_ID'=>$channel_map_id,'CHANNEL_STATUS'=>'1'))->find();
                if (empty($channel)) {
                    Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' 注册渠道号渠道异常');
                    callback(202,'渠道异常!');
                }
            }

            /*检测手机号码重复*/
	        $check_mobile = $daikuanModel->where(array('MOBILE' => $mobile))->find();
	        if ($check_mobile) {
	        	Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' 重复提交mobile：' . json_encode($check_mobile));
	            callback(202,'该手机号已经提交过申请，请勿重复提交!');
	        }

	        // $mobile = 0;
        	$code = getrand_code();/*生成6位数验证码*/
        	Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' 注册验证码：' . $code);
        	$url = 'http://zs.pg956.cn/Home/AliYun/sendSms';
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
        /*检测是否渠道传值*/
        if (!empty($post['channel_map_id'])) {
            $channel = $channelModel->where(array('CHANNEL_MAP_ID'=>$post['channel_map_id'],'CHANNEL_STATUS'=>'1'))->find();
            if (empty($channel)) {
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' 注册渠道号渠道异常');
                ajax_error('渠道异常!');
            }
            if (strtotime($post['birth']) > strtotime(date('Y-m-d')) || strtotime($post['birth']) < strtotime('1950-01-01')) {
                ajax_error('出生年月超出限制!');
            }
            $date = $post['birth'];
            $sex = '男';//默认为男
            $userAge = getUserAge($date,'2');
        }else{
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
        }
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' userAge：' . json_encode($userAge));
        /*贷款金额判空*/
        if (empty($post['loanAomunt'])) {
            ajax_error('贷款金额必填!');
        }
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


        //根据链接获取供应商和渠道
        //  `HOST_MAP_ID` int(8) DEFAULT NULL COMMENT '供应商（通道ID）',
        //  `CHANNEL_MAP_ID` int(8) DEFAULT NULL COMMENT '渠道',
        /*第一步存储*/
        $data = array(
            "USER_NAME" 	=> $post['name'],//姓名
            "USER_ID"		=> $post['idCard']?$post['idCard']:time(),//身份证号
            "AMOUNT" 		=> $post['loanAomunt'],//贷款金额
            "MOBILE" 		=> $post['mobile'],//手机号
            "USER_BIRTHDAY" => $date,//出生年月日
            "USER_SEX" 		=> $sex == '男' ? '1' : '2',//性别
            "USER_AGE" 		=> $userAge,
            "STEP"     		=>'1',
            "STATUS"     	=>'1',//更新状态，变为已注册
        );
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' data' . json_encode($data));
        $daikuan = $daikuanModel->where(array('MOBILE'=>$post['mobile']))->save($data);
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' daikuan' . json_encode($daikuan));
        if (empty($daikuan)) {
            $daikuanModel->rollback();
            ajax_error('提交失败_1!');
        }
        $daikuanModel->commit();
        /*判断是否勾选保险业务*/
        if (!empty($post['isInsurance'])) {
            $baoxianModel = M('baoxian', C('DAIKUAN_QIANZUI'), C('DAIKUAN_CONTENT'));
            $baoxianModel->startTrans();
            $select_baoxian = $baoxianModel->where(array('MOBILE'=>$post['mobile']))->find();
            if (empty($select_baoxian)) {
            	unset($data['STATUS']);
            	$baoxian = $baoxianModel->add($data);
	            Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' baoxian' . json_encode($baoxian));
	            if (empty($baoxian)) {
	                $baoxianModel->rollback();
	                ajax_error('提交失败_2!');
	            }
	            $baoxianModel->commit();
	            $this->assign('baoxian_id', $baoxian);
            }
        }
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' 注册成功！');
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
        if (empty($post['workIdentity'])) {
            ajax_error('职业类型必填!');
        }
        if (empty($post['property'])) {
            ajax_error('资产情况必填!');
        }
        if (empty($post['welfare'])) {
            ajax_error('社保公积金缴纳情况必填!');
        }
        if (empty($post['isCommercialInsurance'])) {
            ajax_error('寿险保单必填!');
        }
        if (empty($post['particle_loan'])) {
            ajax_error('微粒贷必填!');
        }
        $data = array(
            "MONTH_INCOME" => $post['monthlySalary'],//月收入
            "JOB_CATEGORY" => $post['workIdentity'],//职业类型
            "HOUSE_PROPERTY_CAR" => $post['property'],//资产情况
            "SOCIAL_SECURITY_FOUND" => $post['welfare'],//社保公积金缴纳
            "POLICY" => $post['isCommercialInsurance'],//寿险保单
            "PARTICLE_LOAN" => $post['particle_loan'],//微粒贷
            "PROVINCE" => $province,//省份
            "CITY" => $city,//市级
            "STEP" => '2',//第二步
            "IP_ADDRESS" => $ip_address,//IP地址
        );
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' data：' . json_encode($data));
        $daikuanModel = M('daikuan', C('DAIKUAN_QIANZUI'), C('DAIKUAN_CONTENT'));
        $daikuanModel->startTrans();
        $check_step = $daikuanModel->field('step')->where(array('ID' => $daikuanId))->find();
        if ($check_step['step'] == '2') {
        	redirect(U('Home/index/index'), 1, '<h1>请勿重复提交，页面跳转中...</h1>');exit;
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
        if (!empty($baoxianId)) {
        	//请求保险接口 赋值
	        $data['POLICY_NUM'] = "123456";
	        $data['BAOXIAN_TYPE'] = "1";
	        $baoxianModel = M('baoxian', C('DAIKUAN_QIANZUI'), C('DAIKUAN_CONTENT'));
	        $baoxianModel->startTrans();
	        $baoxian = $baoxianModel->where(array('ID' => $baoxianId))->save($data);
	        if (!$baoxian) {
	            $baoxianModel->rollback();
	            ajax_error('插表失败_2!');
	        }
	        $baoxianModel->commit();
        }
        
        $this->display();
}

    /*页面测试*/
    public function success1()
    {
        // Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' =======第一步提交开始======：' . json_encode($_POST ? $_POST : $_GET));
        $this->display('success');
    }

    public function index2(){
    	$this->display();
    }

    public function act(){
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' =======第一步提交开始======：' . file_get_contents('php:input'));
    	echo json_encode(array('imgurl'=>'__PUBLIC__/bigwheel/images/LBi9h3jJXg.jpg','link'=>'http://www.ef.com.cn/online/lp/cn/2016yr/mobile/newStyle-161203.aspx?ctr=cn&lng=cs&ptn=Ykcn&etag=tc-bluegirl','position'=>'6'));
    }
}
	