<?php
namespace Act\Controller;

use Think\Controller;
use Think\Model;

class OpenController extends Controller{
	// 下放接口
	public function doLnsure(){
		$data = array();
		$data['adCode'] = getPara("adCode");//投放编码
		$data['policyHolderName'] = getPara("policyHolderName");//投保人姓名
		$data['policyHolderIdCard'] = getPara("policyHolderIdCard");//投保人身份证号
		$data['mobile'] = getPara("mobile");
		$data['fromIp'] = getPara("fromIp");//客户ip
		$data['sign'] = getPara("sign");
		Add_LOG('open', __FUNCTION__ . ' ' . __LINE__ . ' para ' . file_get_contents('php://input'));

		$home = array("adCode"=>"投放编码","policyHolderName"=>"投保人姓名","policyHolderIdCard"=>"投保人身份证号","mobile"=>"手机号码","fromIp"=>"客户IP","sign"=>"签名");

		foreach ($data as $key => $value) {
			if (empty($value)) {
				callback('202',$home[$key].'不能为空');
			}
		}

		if (!isChineseName($data['policyHolderName'])) {
			callback('202',$home["policyHolderName"].'格式不正确');
		}

		if (!preg_match("/^1[34578]\d{9}$/", $data['mobile'])) {
			callback('202',$home["mobile"].'格式不正确');
		}

		if (!isCreditNo($data['policyHolderIdCard'])) {
			callback('202',$home["policyHolderIdCard"].'格式不正确');
		}

		//判断投保编号是否存在且正常
		$downmch = $this->checkDownmch($data['adCode']);
		$downmchMessage = $downmch['message'];
		if ($downmch['status'] != '200') {
			callback('203',$downmchMessage);
		}

		//验签
		$checkSign = $this->makeSign($data['adCode'],$downmchMessage['key'],$data['mobile']);
		if ($checkSign != $data['sign']) {
			callback('203',$home['sign'].'错误');
		}

		//判断关联通道是否存在且正常
		$checkHost = $this->getHost($downmchMessage['bxhost_map_id']);
		$hostMessage = $checkHost['message'];
		if ($checkHost['status'] != '200') {
			callback('203',$hostMessage);
		}

		//上游投保编号和密钥和生产环境url
		$host_mch_id = $hostMessage['host_mch_id'];
		$host_key = $hostMessage['host_key'];
		$host_url = $hostMessage['host_url'];
		if (empty($host_mch_id) || empty($host_key) || empty($host_url)) {
			callback('204','通道投保信息未录入，请联系管理员');
		}

		//添加投保信息
		$result = $shop->addShop($data);
		if ($result['status'] !== '200') {
			callback('205',$result['message']);
		}

		$host_map_id = $downmchMessage['bxhost_map_id'];
		switch ($host_map_id) {
			//新旦通道
			case '1':
				/*过滤身份证 出生年月日*/
		        $date = substr($data['policyHolderIdCard'], 6, 8);
		        $date = date('Y-m-d', strtotime($date));
		        /*通过身份证号 获取性别*/
		        $sex = get_xingbie($get['idCard']);

				$para = array();
				$para['adCode'] = $host_mch_id;//adCode
				$para['policyHolderName'] = $data['policyHolderName'];//投保人姓名
				$para['mobile'] = $data['mobile'];//手机号码
				$para['policyHolderIdCard'] = $data['policyHolderIdCard'];//投保人身份证号
				$para['policyHolderBirth'] = $date;//被保人出生日期
				$para['policyHolderSex'] = ($sex == '男' ? 'MALE' : 'FEMALE');//被保人性别
				$para['questionnaire'] = $data['questionnaire'];//问卷信息
				$para['activityConfigNum'] = 0;//活动配置号
				$para['sign'] = $this->makeSign($para['adCode'].$host_key.$para['mobile']);
		        $para = json_encode($para);
		        // var_dump($para);
		        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' para ' . $para);
		        $charge = getCurlDataByjson($host_url,$para);
		        $return =  json_decode(json_encode($charge),true);
				break;
			
			default:
				$message = '该投放已下线，请联系管理员';
				callback('402',$message);
				break;
		}
	}

	//录入下游投保信息
	private function addShop($data){
		$shopModel = M('bxshop',C('DAIKUAN_QIANZUI'), C('DAIKUAN_CONTENT'));
		$shopModel->startTrans();//开启事务
		$para = array();
		// $para[''] = 
		$shop = $shopModel->add($data);
		if ($shop === false) {
			$shopModel->rollback();
			return array('status'=>'202','message'=>'插表失败');
		}
		$shopModel->commit();
		return array('status'=>'200','message'=>'插表成功');
	}

	//检查上下游路由配置
	private function checkDownmch($mch_id){
		$downmchModel = M('downmch',C('DAIKUAN_QIANZUI'), C('DAIKUAN_CONTENT'));
		$downmch = $downmchModel->field('key,bxhost_map_id,bxshop_map_id')->where(array('MCH_ID'=>$mch_id,'STATUS'=>'1'))->find();
		if ($downmch) {
			return array('status'=>'200','message'=>$downmch);
		}else{
			return array('status'=>'202','message'=>$home["adCode"].'不存在或状态异常');
		}
	}

	//获取上游信息
	private function getHost($bxhost_map_id){
		$bxhostModel = M('bxhost',C('DAIKUAN_QIANZUI'), C('DAIKUAN_CONTENT'));
		$bxhost = $bxhostModel->field('host_mch_id,host_key,host_url')->where(array('HOST_MAP_ID'=>$bxhost_map_id,'STATUS'=>'1'))->find();
		if ($bxhost) {
			return array('status'=>'200','message'=>$bxhost);
		}else{
			return array('status'=>'202','message'=>'通道不存在或状态异常');
		}
	}

	//md5加密
	private function makeSign($mch_id,$key,$mobile){
		return md5($mch_id.$key.$mobile);
	}
}