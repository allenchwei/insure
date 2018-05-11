<?php
namespace Act\Controller;

use Think\Controller;
use Think\Model;

// +----------------------------------------------------------------------
// | @ljf  保险页面后台处理
// +----------------------------------------------------------------------
class TestController extends Controller
{
	public function changeType(){
		$baoxianModel = M('baoxian', C('DAIKUAN_QIANZUI'), C('DAIKUAN_CONTENT'));
		$baoxian = $baoxianModel->where(array("STEP"=>2,"CITY"=>""))->select();
		// echo $baoxianModel->getlastsql();
		var_dump($baoxian);exit;
		ob_implicit_flush(1);
		@ob_end_clean();
		foreach ($baoxian as $value) {
			$ip_address = $value['ip_address'];
			$url = 'http://api.ip138.com/query/?ip='.$ip_address.'&oid=15971&mid=78748&sign='.md5("ip=".$ip_address."&token=29e7827abedd0783dfe95d4e3420d434");
            $ret = file_get_contents($url);
            $result = json_decode($ret,true);
            $province = $result['data'][1];
            $city = $result['data'][2];

            $update = $baoxianModel->where(array('ID'=>$value['id']))->save(array('CITY'=>$city,'PROVINCE'=>$province));
			echo $ip_address.' ';
			if (empty($city)) {
				var_dump($result);
			}
			var_dump($baoxianModel->getlastsql());
			var_dump($update);

			echo '<br>';

			sleep(1);
		}
	}
}