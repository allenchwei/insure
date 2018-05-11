<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/12/29/029
 * Time: 15:47
 */

namespace Home\Controller;


use Think\Controller;

class TestController extends Controller
{
    public function test()
    {
    	$channel_map_id = I('channel');
    	$this->assign('CHANNEL_MAP_ID',$channel_map_id);
        $this->display('index');

    }

    public function act(){
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' =======第一步提交开始======：' . json_encode($_POST?$_POST:$_GET));
    	$json = json_encode(array('imgurl'=>'/Public/bigwheel/images/LBi9h3jJXg.jpg','link'=>'http://www.ef.com.cn/online/lp/cn/2016yr/mobile/newStyle-161203.aspx?ctr=cn&lng=cs&ptn=Ykcn&etag=tc-bluegirl','position'=>'6','id'=>'2'));
    	echo $json;
    	// Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' json：' . $json);
    }
}