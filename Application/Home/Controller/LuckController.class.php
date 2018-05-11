<?php
namespace Home\Controller;
use Think\Controller;

class LuckController extends Controller
{
    public function index()
    {
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' _SERVER ' . json_encode($_SERVER));
    	$channel_key = I('channel');
        $channelModel = M('channel', C('DAIKUAN_QIANZUI'), C('DAIKUAN_CONTENT'));
        $check_channel = $channelModel->where(array('CHANNEL_KEY'=>$channel_key,'CHANNEL_STATUS'=>1))->find();
        $channel_map_id = $check_channel['channel_map_id'];
        $time = $check_channel['time'];
        $_SESSION['channel_map_id']=$channel_map_id;

        $shadModel = M('luck_shad', C('DAIKUAN_QIANZUI'), C('DAIKUAN_CONTENT'));
        $shad = $shadModel->where(array('TYPE'=>array('in','top,down'),'CHANNEL_MAP_ID'=>$channel_map_id,'STATUS'=>1))->select();
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' shad ' . $shadModel->getlastsql());
        $count = $shadModel->where(array('TYPE'=>array('in','top,down'),'CHANNEL_MAP_ID'=>$channel_map_id,'STATUS'=>1))->count();
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' count ' . $count);
        $shad_back = $channelModel->field('IMAGE_URL')->where(array('CHANNEL_MAP_ID'=>$channel_map_id,'CHANNEL_STATUS'=>1))->find();
        $as = array();
        if ($count == '1') {
            foreach ($shad as $key => $value) {
                foreach ($value as $k1 => $val1) {
                    $as[$k1] = $val1;
                }
            }
        }else{
            foreach ($shad as $key => $value) {
                if ($key == '0') {
                    foreach ($value as $k => $val) {
                        $k = $k.'1';
                        $as[$k] = $val;
                    }
                }
                foreach ($value as $k1 => $val1) {
                    $as[$k1] = $val1;
                }
            }
        }
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' shad ' . json_encode($shad));
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' as ' . json_encode($as));
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' shad_back ' . $shad_back['image_url']);
        $this->assign('list',$as);
        $this->assign('shad_back',$shad_back['image_url']);
        $this->assign('CHANNEL_MAP_ID',$channel_map_id);
    	$this->assign('TIME',$time);
        $this->display('index');

    }

    public function __construct(){
        parent::__construct();
        Session_start();
        
    }

    public function test2(){
        $url = 'http://m.turntable8.com/Home/Luck/index?channel=931c386956c1a402';
        $charge = header('Location:'.$url);
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' charge ' . json_encode($charge));
    }

    public function act(){
        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' =======计算次数开始======：' . json_encode($_POST));
        $post = $_POST;
        $channelModel = M('luck_record', C('DAIKUAN_QIANZUI'), C('DAIKUAN_CONTENT'));
        $traceModel = M('trace', C('DAIKUAN_QIANZUI'), C('DAIKUAN_CONTENT'));
        switch ($post['type']) {
            case 'MD5':
                $channel = $channelModel->where(array('CHANNEL_MAP_ID'=>$post['CHANNEL_MAP_ID']))->find();
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' CHANNEL_MAP_ID ' . $post['channel_map_id']);
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' channelModel ' . $channelModel->getlastsql());
                if (!$channel) {
                    callback(202,'渠道不存在');
                }

                //取值权重,出价
                $channel_select = $channelModel->field('*')->where(array('STATUS'=>1,'CHANNEL_MAP_ID'=>$post['CHANNEL_MAP_ID']))->select();
                $channel_select_sum = $channelModel->field('sum(WEIGHT) as WEIGHT1,sum(OFFER) as OFFER1')->where(array('STATUS'=>1))->select();
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' channel_select ' . json_encode($channel_select));
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' channel_select_sum ' . json_encode($channel_select_sum));
                foreach ($channel_select_sum as $value) {
                    $sumWeight = $value['weight1'];
                    $sumOffer = $value['offer1'];
                }
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' sumWeight=' . $sumWeight);
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' sumOffer=' . $sumOffer);

                foreach ($channel_select as $value) {
                    $weight = $value['weight'];
                    $OFFER = $value['offer'];
                    $sum[] = array('sum'=>round(($weight+$OFFER)/($sumWeight+$sumOffer) * 100),'id'=>$value['id']);
                }
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' sum=' . json_encode($sum));

                for ($i=0; $i < count($sum); $i++) {
                    if ($i == 0) {
                        $start = 0;
                        $end = $sum[$i]['sum'] + $start;
                    }else{
                        $start = $array[$i-1]['end'];
                        $end = $sum[$i]['sum'] + $array[$i-1]['end'];
                    }
                    $array[] = array('start'=>$start,'end'=>$end,'id'=>$sum[$i]['id']);
                }
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' array=' . json_encode($array));

                foreach ($array as $value) {
                    $around[] = $value['end'];
                }
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' around=' . json_encode($around));
                $max = max($around);
                $min = min($around);
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' max=' . json_encode($max));
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' min=' . json_encode($min));
                $round = mt_rand('1',$max);
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' round=' . $round);
                foreach ($array as $value) {
                    if ($round <= $value['end'] && $round > $value['start']) {
                        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' end=' . $value['end']);
                        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' start=' . $value['start']);
                        $luck_record_find = $channelModel->where(array('ID'=>$value['id'],'CHANNEL_MAP_ID'=>$post['CHANNEL_MAP_ID']))->find();
                        $id = $value['id'];

                        // $data = array(
                        //     "RECORD_ID"=>$id,
                        //     "CHANNEL_MAP_ID"=>$post['CHANNEL_MAP_ID'],
                        //     "DATE_TIME"=>date('Y-m-d H:i:s',time()),
                        //     "TRACE_PUSH"=>'1'
                        // );
                        // $trace = $traceModel->add($data);
                        $channel_map_id = $post['CHANNEL_MAP_ID'];
                        $trace = $traceModel->where("RECORD_ID = $id and CHANNEL_MAP_ID = $channel_map_id and TRACE_PUSH > 0 and DATE_TIME >= '".date('Y-m-d',time())." 00:00:00' and DATE_TIME <= '".date('Y-m-d',time())." 23:59:59'")->find();
                        if ($trace) {
                            $update = $traceModel->where("RECORD_ID = $id and CHANNEL_MAP_ID = $channel_map_id and TRACE_PUSH > 0 and DATE_TIME >= '".date('Y-m-d',time())." 00:00:00' and DATE_TIME <= '".date('Y-m-d',time())." 23:59:59'")->setInc('TRACE_PUSH');
                        }else{
                            $data = array(
                                "RECORD_ID"=>$id,
                                "CHANNEL_MAP_ID"=>$post['CHANNEL_MAP_ID'],
                                "DATE_TIME"=>date('Y-m-d H:i:s',time()),
                                "TRACE_PUSH"=>'1'
                            );
                            $trace = $traceModel->add($data);
                        }
                        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' data ' . $data);
                        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' channel_count ' . json_encode($trace));
                        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' channelModel ' . $traceModel->getlastsql());
                    }
                }

                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' id ' . $id);
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' luck_record_find=' . json_encode($luck_record_find));
                //按钮点击数
                // $data = array(
                //     "CHANNEL_MAP_ID"=>$post['CHANNEL_MAP_ID'],
                //     "DATE_TIME"=>date('Y-m-d H:i:s',time()),
                //     "ZP_CLICK"=>'1'
                // );
                // $channel_count = $traceModel->add($data);
                $channel_map_id = $post['CHANNEL_MAP_ID'];
                $trace = $traceModel->where("TRACE_PV > 0 and CHANNEL_MAP_ID = $channel_map_id and DATE_TIME >= '".date('Y-m-d',time())." 00:00:00' and DATE_TIME <= '".date('Y-m-d',time())." 23:59:59'")->find();
                if ($trace) {
                    $update = $traceModel->where("TRACE_PV > 0 and CHANNEL_MAP_ID = $channel_map_id and DATE_TIME >= '".date('Y-m-d',time())." 00:00:00' and DATE_TIME <= '".date('Y-m-d',time())." 23:59:59'")->setInc('ZP_CLICK');
                }
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' data ' . $data);
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' channel_count ' . $channel_count);
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' channelModel ' . $traceModel->getlastsql());

                // $channel_find = $channelModel->field('LINK_CLICK,CLICK,LUCK_PUSH,OFFER')->where(array('ID'=>$id))->find();
                // Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' channel_find=' . json_encode($channel_find));
                // $click_rate = round(($channel_find['link_click']/$channel_find['luck_push'])* 100,2);
                // $click_rate = $click_rate;
                // Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' click_rate=' . $click_rate);
                // if ($click_rate == 0) {
                //     $click_rate = 0;
                // }

                // $channel_save = $channelModel->where(array('ID'=>$id))->save(array('CLICK_RATE'=>$click_rate));
                // Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' channelModel ' . $channelModel->getlastsql());

                // $total = round($channel_find['link_click']*$channel_find['offer'],2);
                // $total = sprintf('%01.2f',$total);
                // Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' total ' . $total);
                // $channel_save_total = $channelModel->where(array('ID'=>$id))->save(array('TOTAL'=>$total));
                // Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' channelModel ' . $channelModel->getlastsql());
                // Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' channel_save_total ' . $channel_save_total);

                $json = array('status'=>'200','imgurl'=>$luck_record_find['image_url'],'link'=>$luck_record_find['link_url'],'position'=>'6','id'=>$id,'title'=>$luck_record_find['prize_name']);
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' =======计算次数结束======：'.json_encode($json));
                echo json_encode($json);exit;
                break;
            case 'PUSH':
                //转盘PV
                // $data = array(
                //     "TRACE_PV"=>'1',//转盘PV
                //     "DATE_TIME"=>date('Y-m-d H:i:s',time()),
                //     "CHANNEL_MAP_ID"=>$post['CHANNEL_MAP_ID'],
                // );
                // $channel_count = $traceModel->add($data);
                $channel_map_id = $post['CHANNEL_MAP_ID'];
                $trace = $traceModel->where("TRACE_PV > 0 and CHANNEL_MAP_ID = $channel_map_id and DATE_TIME >= '".date('Y-m-d',time())." 00:00:00' and DATE_TIME <= '".date('Y-m-d',time())." 23:59:59'")->find();
                if ($trace) {
                    $update = $traceModel->where("TRACE_PV > 0 and CHANNEL_MAP_ID = $channel_map_id and DATE_TIME >= '".date('Y-m-d',time())." 00:00:00' and DATE_TIME <= '".date('Y-m-d',time())." 23:59:59'")->setInc('TRACE_PV');
                }else{
                    $data = array(
                        "CHANNEL_MAP_ID"=>$post['CHANNEL_MAP_ID'],
                        "DATE_TIME"=>date('Y-m-d H:i:s',time()),
                        "TRACE_PV"=>'1'
                    );
                    $trace = $traceModel->add($data);
                }
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' data ' . json_encode($data));
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' trace ' . json_encode($trace));
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' channelModel ' . $traceModel->getlastsql());


                // if (isset($_COOKIE['PHPSESSID'])) {
                //     Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' _COOKIE ' . json_encode($_COOKIE));
                // }else{
                //     $sessionid = session_id();
                //     Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' sessionid ' . $sessionid);
                //     $expire = time() + 10; // 设置24小时的有效期
                //     setcookie("uid", $sessionid, $expire,'/');

                //     $trace = $traceModel->where("TRACE_PV > 0 and CHANNEL_MAP_ID = $channel_map_id and DATE_TIME >= '".date('Y-m-d',time())." 00:00:00' and DATE_TIME <= '".date('Y-m-d',time())." 23:59:59'")->find();
                //     if ($trace) {
                //         $update = $traceModel->where("TRACE_PV > 0 and CHANNEL_MAP_ID = $channel_map_id and DATE_TIME >= '".date('Y-m-d',time())." 00:00:00' and DATE_TIME <= '".date('Y-m-d',time())." 23:59:59'")->setInc('TRACE_UV');
                //     }
                //     Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' trace ' . json_encode($trace));
                //     Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' update ' . $update);
                //     Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' channelModel ' . $traceModel->getlastsql());
                // }
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' uid ' . json_encode($_COOKIE));
                break;
            case 'LINK_CLICK':
                //计算 链接点击数
                // $data = array(
                //     "TRACE_CLICK"=>'1',//链接点击
                //     "DATE_TIME"=>date('Y-m-d H:i:s',time()),
                //     "CHANNEL_MAP_ID"=>$post['CHANNEL_MAP_ID'],
                //     "RECORD_ID"=>$post['id']
                // );
                // $channel_count = $traceModel->add($data);
                $channel_map_id = $post['CHANNEL_MAP_ID'];
                $id = $post['id'];
                $trace = $traceModel->where("TRACE_CLICK > 0 and RECORD_ID = $id and CHANNEL_MAP_ID = $channel_map_id and DATE_TIME >= '".date('Y-m-d',time())." 00:00:00' and DATE_TIME <= '".date('Y-m-d',time())." 23:59:59'")->find();
                if ($trace) {
                    $update = $traceModel->where("TRACE_CLICK > 0 and RECORD_ID = $id and CHANNEL_MAP_ID = $channel_map_id and DATE_TIME >= '".date('Y-m-d',time())." 00:00:00' and DATE_TIME <= '".date('Y-m-d',time())." 23:59:59'")->setInc('TRACE_CLICK');
                }else{
                    $update = $traceModel->where("RECORD_ID = $id and CHANNEL_MAP_ID = $channel_map_id and DATE_TIME >= '".date('Y-m-d',time())." 00:00:00' and DATE_TIME <= '".date('Y-m-d',time())." 23:59:59'")->save(array('TRACE_CLICK'=>'1'));
                }
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' traceModel ' . $traceModel->getlastsql());
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' channel_count ' . $update);

                // $channel_find = $channelModel->field('LINK_CLICK,CLICK,OFFER,CHANNEL_MAP_ID')->where(array('ID'=>$post['id']))->find();
                // Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' channel_find=' . json_encode($channel_find));
                // $click_rate = round(($channel_find['link_click']/$channel_find['click']) * 100,2);
                // $click_rate = $click_rate;
                // Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' click_rate=' . $click_rate);
                // if ($click_rate == 0) {
                //     $click_rate = 0;
                // }
                // $channel_save = $channelModel->where(array('ID'=>$post['id']))->save(array('CLICK_RATE'=>$click_rate));

                // $total = round($channel_find['link_click']*$channel_find['offer'],2);
                // $total = sprintf('%01.2f',$total);
                // Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' total ' . $total);
                // $channel_save_total = $channelModel->where(array('ID'=>$post['id']))->save(array('TOTAL'=>$total));
                // Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' channel_save_total ' . $channel_save_total);
                break;
            case 'SHADOWE_TIME':
                // $shadModel = M('luck_shad', C('DAIKUAN_QIANZUI'), C('DAIKUAN_CONTENT'));
                // $shad = $shadModel->where(array('ID'=>$post['id']))->setInc('TIME');
                // Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' shad ' . $shadModel->getlastsql());

                // $channel_find = $shadModel->field('CHANNEL_MAP_ID')->where(array('ID'=>$post['id']))->find();
                // //添加每日点击次数
                // $data = array(
                //         "PHOTO_ID"=>$post['id'],
                //         "CHANNEL_MAP_ID"=>$channel_find['channel_map_id'],
                //         "DATE_TIME"=>date("Y-m-d H:i:s",time()),
                //         "TRACE_CLICK"=>'1'
                //     );
                // Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' data   ' . json_encode($data));
                // $traceModel = M('trace', C('DAIKUAN_QIANZUI'), C('DAIKUAN_CONTENT'));
                // $trace = $traceModel->add($data);
                // Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' trace ' . $trace);
                $channel_map_id = $post['CHANNEL_MAP_ID'];
                $id = $post['id'];
                $trace = $traceModel->where("TRACE_CLICK > 0 and PHOTO_ID = $id and CHANNEL_MAP_ID = $channel_map_id and DATE_TIME >= '".date('Y-m-d',time())." 00:00:00' and DATE_TIME <= '".date('Y-m-d',time())." 23:59:59'")->find();
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' traceModel ' . $traceModel->getlastsql());
                if ($trace) {
                    $update = $traceModel->where("TRACE_CLICK > 0 and PHOTO_ID = $id and CHANNEL_MAP_ID = $channel_map_id and DATE_TIME >= '".date('Y-m-d',time())." 00:00:00' and DATE_TIME <= '".date('Y-m-d',time())." 23:59:59'")->setInc('TRACE_CLICK');
                    Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' traceModel ' . $traceModel->getlastsql());
                }else{
                    $update = $traceModel->where("PHOTO_ID = $id and CHANNEL_MAP_ID = $channel_map_id and DATE_TIME >= '".date('Y-m-d',time())." 00:00:00' and DATE_TIME <= '".date('Y-m-d',time())." 23:59:59'")->save(array('TRACE_CLICK'=>'1'));
                    Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' traceModel ' . $traceModel->getlastsql());
                    // if (!$update) {
                    //     $data = array(
                    //         "PHOTO_ID"=>$post['id'],
                    //         "CHANNEL_MAP_ID"=>$channel_find['channel_map_id'],
                    //         "DATE_TIME"=>date("Y-m-d H:i:s",time()),
                    //         "TRACE_CLICK"=>'1'
                    //     );
                    //     Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' data   ' . json_encode($data));
                    //     $traceModel = M('trace', C('DAIKUAN_QIANZUI'), C('DAIKUAN_CONTENT'));
                    //     $trace = $traceModel->add($data);
                    //     Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' trace ' . $trace);
                    // }
                }
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' traceModel ' . $traceModel->getlastsql());
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' update ' . $update);
                break;
            case 'SHADOWE_SHOW':
                //第三方渠道推送
                // $data = array(
                //         "PHOTO_ID"=>$post['id1'],
                //         "CHANNEL_MAP_ID"=>$post['CHANNEL_MAP_ID'],
                //         "DATE_TIME"=>date("Y-m-d H:i:s",time()),
                //         "TRACE_PUSH"=>'1'
                //     );
                // Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' data   ' . json_encode($data));
                // $trace = $traceModel->add($data);
                // Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' trace ' . $trace);

                // $data1 = array(
                //         "PHOTO_ID"=>$post['id2'],
                //         "CHANNEL_MAP_ID"=>$post['CHANNEL_MAP_ID'],
                //         "DATE_TIME"=>date("Y-m-d H:i:s",time()),
                //         "TRACE_PUSH"=>'1'
                //     );
                // Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' data1   ' . json_encode($data1));
                // $trace1 = $traceModel->add($data1);
                // Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' trace ' . $trace1);
                $channel_map_id = $post['CHANNEL_MAP_ID'];
                $id1 = $post['id1'];
                $id2 = $post['id2'];
                $trace = $traceModel->where("TRACE_PUSH > 0 and PHOTO_ID = $id1 and CHANNEL_MAP_ID = $channel_map_id and DATE_TIME >= '".date('Y-m-d',time())." 00:00:00' and DATE_TIME <= '".date('Y-m-d',time())." 23:59:59'")->find();
                if ($trace) {
                    $update = $traceModel->where("TRACE_PUSH > 0 and PHOTO_ID = $id1 and CHANNEL_MAP_ID = $channel_map_id and DATE_TIME >= '".date('Y-m-d',time())." 00:00:00' and DATE_TIME <= '".date('Y-m-d',time())." 23:59:59'")->setInc('TRACE_PUSH');
                }else{
                    $update = $traceModel->where("PHOTO_ID = $id1 and CHANNEL_MAP_ID = $channel_map_id and DATE_TIME >= '".date('Y-m-d',time())." 00:00:00' and DATE_TIME <= '".date('Y-m-d',time())." 23:59:59'")->save(array('TRACE_PUSH'=>'1'));
                    if (!$update) {
                        $data = array(
                            "PHOTO_ID"=>$id1,
                            "CHANNEL_MAP_ID"=>$channel_map_id,
                            "DATE_TIME"=>date("Y-m-d H:i:s",time()),
                            "TRACE_PUSH"=>'1'
                        );
                        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' data   ' . json_encode($data));
                        $traceModel = M('trace', C('DAIKUAN_QIANZUI'), C('DAIKUAN_CONTENT'));
                        $trace = $traceModel->add($data);
                        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' trace ' . $trace);
                    }
                }
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' update ' . $update);

                $trace1 = $traceModel->where("TRACE_PUSH > 0 and PHOTO_ID = $id2 and CHANNEL_MAP_ID = $channel_map_id and DATE_TIME >= '".date('Y-m-d',time())." 00:00:00' and DATE_TIME <= '".date('Y-m-d',time())." 23:59:59'")->find();
                if ($trace1) {
                    $update = $traceModel->where("TRACE_PUSH > 0 and PHOTO_ID = $id2 and CHANNEL_MAP_ID = $channel_map_id and DATE_TIME >= '".date('Y-m-d',time())." 00:00:00' and DATE_TIME <= '".date('Y-m-d',time())." 23:59:59'")->setInc('TRACE_PUSH');
                }else{
                    $update = $traceModel->where("PHOTO_ID = $id2 and CHANNEL_MAP_ID = $channel_map_id and DATE_TIME >= '".date('Y-m-d',time())." 00:00:00' and DATE_TIME <= '".date('Y-m-d',time())." 23:59:59'")->save(array('TRACE_PUSH'=>'1'));
                    if (!$update) {
                        $data = array(
                            "PHOTO_ID"=>$id2,
                            "CHANNEL_MAP_ID"=>$channel_map_id,
                            "DATE_TIME"=>date("Y-m-d H:i:s",time()),
                            "TRACE_PUSH"=>'1'
                        );
                        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' data   ' . json_encode($data));
                        $traceModel = M('trace', C('DAIKUAN_QIANZUI'), C('DAIKUAN_CONTENT'));
                        $trace = $traceModel->add($data);
                        Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' trace ' . $trace);
                    }
                }
                Add_LOG('index', __FUNCTION__ . ' ' . __LINE__ . ' update ' . $update);
                break;
            default:
                break;
        }
    }

}?>