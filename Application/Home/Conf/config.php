<?php
return array(
	'_SESSION_TIME'		=>	'1800', 		//30分钟无操作退出
	'VAR_PAGE'			=>	'pageNum', 		//分页需要
	'PAGE_COUNT'		=>	'50', 			//分页数目
	'PAGE_COUNT_EXPORT'	=>	'5000', 		//导出分页数目
	'NEWS_COUNT_EXPORT'	=>	'10000', 		//导出分页数目	新
	'JFB_SHENG'			=>	'15',			//固定省
	'JFB_SHI'			=>	'18',			//固定市
	'JFB_XIAN'			=>	'21',			//固定县
	'JFB_CHUANG'		=>	'17',			//固定创业合伙人
	
	'tk_max_add_lay'	=>	'100',
	'tk_max_show_lay'	=>	'40',	
	'tk_max_w'			=>	'900',
	'tk_max_h'			=>	'550',
	
	'tk_max_w1'			=>	'640',
	'tk_max_h1'			=>	'380',
	
	'tk_max_w2'			=>	'770',
	'tk_max_h2'			=>	'470',

	'tk_max_w3'			=>	'1180',
	'tk_max_h3'			=>	'590',
	'MACKEY'			=>	'1111111111111111',
	
	'DAIKUAN_CONTENT'	=>  'mysql://root:daikuan168@127.0.0.1:3306/big_finance#utf8',
	'DAIKUAN_QIANZUI'	=>  'a_',
	//上面如果新增 宽度 和 高度，记得更改 getaction_select
	//----------------------------------------------------
		
	//汇米KEY
	'HMKEY' => 'C55ED90531F97512252224039DD3CEB9',
	
	//权限分配设置
	'USER_AUTH_ON' 			=> 	true,  				//开启认证
	'USER_AUTH_TYPE'		=> 	2,  				//认证类型 1登录认证2实时认证
	'USER_AUTH_KEY' 		=> 	'authId',  			//认证SESSION标记名称
	'ADMIN_AUTH_KEY' 		=> 	'administrator',  	//用户标记
	'USER_AUTH_MODEL' 		=> 	'a_user',  			//【用户表】
	'AUTH_PWD_ENCODER' 		=> 	'md5',				//用户认证密码加密方式
	'USER_AUTH_GATEWAY' 	=> 	'/index.php/Home/Public/logout.html',		//默认的认证网关
	'NOT_AUTH_MODULE' 		=> 	'Index,Apiserver,Public',  	//默认不需要认证的模块
	'REQUIRE_AUTH_MODULE' 	=>	'',  				//默认	需要认证的模块，不设置即为除了 NOT_AUTH_MODULE 中的模块外全部验证
	'NOT_AUTH_ACTION' 		=>	'install_add_more',  				//默认不需要认证的动作
	'REQUIRE_AUTH_ACTION' 	=>	'',  				//默认	需要认证的动作
	'GUEST_AUTH_ON' 		=>	false,				//是否开启游客授权访问
	'GUEST_AUTH_ID' 		=>	0,					//游客标记
	'RBAC_ROLE_TABLE' 		=>	'a_role',  			//【角色表】
	'RBAC_USER_TABLE' 		=>	'a_user', 			//【用户和角色对应关系表】
	'RBAC_ACCESS_TABLE' 	=>	'a_access',  		//【权限分配表】
	'RBAC_NODE_TABLE' 		=>	'a_menu',  			//【角色表】
	'SPECIAL_USER' 			=>	'100000', 			//Root

	//银盛支付
	'YinshengPay'			=>	array(
		'UserCode'			=> 	'JFB',			
		'Name'				=> 	'浙江积分宝控股有限公司',
		'pfxpath'			=> 	DOC_ROOT.'/Public/yinshengpay/JFB.pfx',
		'cerpath'			=> 	DOC_ROOT.'/Public/yinshengpay/JFBPub.cer',
		'pfxpassword'		=> 	'456852',
		'xmlbackmsg_url'	=> 	'http://pay.ysepay.com/businessgate/xmlbackmsg.do',		
	),
	
	//银盛百孝汇支付
	'YinshengBXHPay'			=>	array(
		'UserCode'			=> 	'bxh',			
		'Name'				=> 	'百孝汇云雀（深圳）科技有限公司',
		'pfxpath'			=> 	DOC_ROOT.'/Public/yinshengbxhpay/BXH.pfx',
		'cerpath'			=> 	DOC_ROOT.'/Public/yinshengbxhpay/BXHPub.cer',
		'pfxpassword'		=> 	'bxh886',
		'xmlbackmsg_url'	=> 	'http://pay.ysepay.com/businessgate/xmlbackmsg.do',		
	),
	
	//ChinaPay支付
	'ChinaPay'			=>	array(
		'pri_key'			=> 	DOC_ROOT.'/Public/chinapay/MerPrk2.key',
		'pub_key'			=> 	DOC_ROOT.'/Public/chinapay/PgPubk2.key',
		'url_netpay'		=> 	DOC_ROOT.'/Public/chinapay/netpayclient.php',		//chinapay 函数库加载文件
		'url_pay'			=> 	'http://sfj.chinapay.com/dac/SinCutServletGBK',		//生产请求地址
		'url_sel_pay'		=> 	'http://sfj.chinapay.com/dac/SinCutQueryServletGBK',//生产请求地址
	),
	'Uploads'			=>	DOC_ROOT.'/Public/file/upload/',
	
	'AD_TYPE_LIST' => array(
		'1' => 'APP BANNER AD'
	),
	
	//支付渠道
	'CHANNEL_LIST'      => array(
			array('id'=>0,'name'=>'上福'),
			array('id'=>3,'name'=>'民生'),
			array('id'=>5,'name'=>'威富通'),
			array('id'=>6,'name'=>'易联众'),
			array('id'=>7,'name'=>'通莞聚合'),
			array('id'=>9,'name'=>'ISV')
		),
	
	//通道权限表(用于归属下拉菜单)
	'AUTH_PASS_ID'		=>	array('100000'),					//可过滤的id
	'AUTH_PASS_LV'		=>	array('1'),							//保留标志
	//设备型号类型(model表)
	'MODEL_TYPE_ARR'	=>		array(
		'MODEL_STATUS'	=>	array('正常','锁定','注销'),							//型号状态
		'MODEL_TYPE'	=>	array('固定POS','移动POS','MPOS','读头POS','PINPAD'),	//型号类型
		'MODEL_COMM'	=>	array('电话','GPRS ','3G/4G','LAN','蓝牙','线缆'),		//通讯方式
		'MODEL_PINPAD'	=>	array('一体式','分体式'),								//密码键盘
		'MODEL_PRINTER'	=>	array('0'=>'热敏','1'=>'针式','9'=>'无'),				//打印机
	),
	//设备基本信息(device表)
	'DEVICE_TYPE_ARR'	=>		array(
		'DEVICE_ATTACH'	=>	array('自有','代理商'),													//型号状态
		'DEVICE_STATUS'	=>	array('0'=>'使用','1'=>'待开通','2'=>'待分配','3'=>'出库','4'=>'待维修','5'=>'报废','6'=>'丢失','8'=>'冻结','9'=>'注销'),	//设备状态
	),
	//通道权限表								
	'HOST_FLAG'		=>	array('正常处理','特殊处理'),					//保留标志

	'AUTH_ZONE'		   	=> array('0'=>'全国','2'=>'全省','3'=>'市级','4'=>'区县','5'=>'街道'),	//授权区域

	//合作伙伴银行账户[A_PBACT] 状态
	'PARTNER_BANK_FLAG'  	=> array('结算到对公', '结算到对私'),		//代理商状态
	
	//投保接口(新投保接口)
	'INSURE_URL1' => 'http://www.e-picclife.com/sia4/Partner/RemoteBusinessProcessController.jspx?_action=insure&partner=ZJJFB',
	//(养老险追加接口)
	'INSURE_URL2' => 'http://www.e-picclife.com/sia4/Partner/RemoteBusinessProcessController.jspx?_action=change&partner=ZJJFB',
	'INSURE_KEY' => 'ZPJ#I&JCFCB',
	
	
		
	
	
	//保险公司状态	security
	'SECURITY_STATUS'  	=> array('正常', '暂停'),
	//分支机构级别	branch
	'BRANCH_LEVEL'   	=> array('总部', '省分公司'),
	//分支机构状态	branch
	'BRANCH_STATUS'  	=> array('正常', '暂停'),
	//用户状态	user
	'USER_STATUS'  		=> array('正常', '锁定', '注销'),
	//用户级别	user
	'USER_LEVEL'  		=> array('总部', '省分公司', '地市子公司', '区县服务中心', '创业合伙人'),
	//短信标识	smamodel
	'SMS_MODEL_TYPE'  	=> array(
		'1' 			=> 	'会员注册提示', 
		'2' 			=> 	'会员激活提示', 
		'3' 			=> 	'会员注销提示', 
		'4' 			=> 	'会员绑定提示', 
		'5' 			=> 	'会员消费提示', 
		'6' 			=> 	'商户代扣成功提示', 
		'7' 			=> 	'商户代扣余额不足提示', 
		'8' 			=> 	'营销短信', 
		'9' 			=> 	'验证码',
		'a' 			=> 	'子母卡绑定验证码',
		'b' 			=> 	'商家找回密码提示',
		'c' 			=> 	'商家注册提示'
	),
	//短信状态	smamodel
	'SMS_MODLE_STATUS'  => array('正常', '停用'),
	//合作伙伴等级	partner
	'PLEVEL_NAME'	   	=> array('1'=>'地市子公司', '2'=>'区县服务中心', '3'=>'创业合伙人'),
	'PLEVEL_ROLE_NAME'  => array('3'=>'普通', '5'=>'大商家'),
	//合作伙伴 与上级的关系	partner
	'PARTNER_P_FLAG'	=> array('无关系', '本公司'),
	//合作伙伴 类型 partner
	'PARTNER_G_FLAG'	=> array('普通公司', '个体户', '集团总公司','集团子公司'),

	//分润名目	feecfg
	'CFG_FLAG'	   		=> array('1'=>'运营收益分润', '2'=>'30元收费卡卡费分润', '3'=>'30元预免卡卡费分润'),	
	//卡类型	card_bin
	'CARD_TYPE'			=>	array(
		'1' 			=> 	'内卡借记卡',
		'2' 			=> 	'内卡贷记卡',
		'3' 			=> 	'外卡',
		'9' 			=> 	'储值卡'
	),
	//磁道类型	card_bin
	'CARD_TRACK'		=>	array(
		'2'				=> 	'二磁道',
		'3' 			=> 	'三磁道'
	),
	//联机PIN支持能力	pbocpara
	'IC_ONLINE_PIN'		=>	array('支持', '不支持'),
	//日志类型	log
	'LOG_TYPES'	=>		array(
		'1' 			=>  '登录',
		'2'				=>  '进件/添加',
		'3'				=> 	'修改',
		'4' 			=> 	'删除',
		'5' 			=> 	'审核/复核',
		'6' 			=> 	'手工',
		'7' 			=> 	'退出',
		'8' 			=> 	'交易',
		'9' 			=> 	'日切',
	),
	//MCC分类	hmdr
	'MCC_TYPE'	=>		array(
		'1' 			=>  '餐娱类',
		'2'				=>  '一般类',
		'3'				=> 	'民生类',
		'4' 			=> 	'公益类',
		'5' 			=> 	'房车类',
		'6' 			=> 	'批发类',
		'7' 			=> 	'县乡优惠',
		'8' 			=> 	'特殊类',
		'9' 			=> 	'其它'
	),
	//审批标志	check,
	'CHECK_FLAG' 		=> 	array('1'=>'进件', '2'=>'变更'),
	//映射规则 	hauth,
	'HOST_PPP_FLAG'		=> 	array('POS对应', '商户对应', '大商户', '混合'),	
	//审核状态 	hauth,hmdr,hcls
	'CHECK_POINT'	   	=> 	array(
		'all'			=>	array('0'=>'正常','1'=>'暂停','2'=>'注销','3'=>'复核不通过','4'=>'待复核','5'=>'初审不通过','6'=>'待初审','7'=>'拒绝','11'=>'待修改'),
		'check'			=>	array('0'=>'正常','3'=>'复核不通过','4'=>'待复核','5'=>'初审不通过','6'=>'待初审'),
		'all2'			=>	array('0'=>'正常','1'=>'暂停','2'=>'注销','3'=>'复核不通过','4'=>'待复核','5'=>'初审不通过','6'=>'待初审','7'=>'拒绝','8'=>'老用户','9'=>'手机验证码通过未件','10'=>'线上新注册商户','11'=>'待修改','12'=>'上福通道返回失败')																																																																						 
	),
	//商户状态	hshop,
	'HSHOP_STATUS'	   	=> 	array('正常', '冻结', '注销'),
	//签到标志	hpos,
	'LOGIN_FLAG'	   	=> 	array('签到成功', '签退','签到失败'),
	//终端状态	hpos
	'HPOS_STATUS'	   	=>	array('正常', '冻结', '注销'),
	//周期单位	hcls
	'SETTLE_T_UNIT'	   	=> 	array('实时', '天'),			
	//清算模式	hcls
	'HOST_SETTLE_FLAG' 	=> 	array('收单模式（二清）', '代理清算模式'),
	//最低结算标志	hcls
	'SETTLE_FLAG'	   	=> 	array('顺延下个周期', '本周期结算'),	
	//POS状态	pos
	'POS_STATUS'	   	=> 	array('正常', '装机申请中'),
	//风险级别 srisk,riskrun
	'SHOP_GRADE'		=> array('0'=>'所有','1'=>'优质商户','2'=>'良质商户','3'=>'合格商户','4'=>'可疑风险商户','5'=>'高危风险商户'),
	//设备厂商公司状态 factory
	'FACTORY_STATUS'	=> array('正常','锁定','注销'),
	//风险调整状态 riskrun
	'RISKRUN_STATUS'	=> array('正常使用','暂停使用'),
	//风控规则类型 riskrule
	'RULE_TYPE'			=> array('实时风控','事后风控'),
	//风险规则模式 riskrule
	'RULE_MODE'			=> array('1'=>'百分比控制','2'=>'绝对值控制'),
	//风险规则状态 riskrule
	'RULE_STATUS'		=> array('正常使用','暂停使用'),
	//风险规则阀值状态 riskval
	'RISK_STATUS'		=> array('正常使用','暂停使用'),
	//风险周期 riskval
	'RISK_T'			=> array('当天','1天','7天','30天'),
	//风险动作 riskval
	'RISK_ACTIVE'		=> array('1'=>'可疑风险', '2'=>'中度风险', '3'=>'高危风险', '9'=>'拒绝'),
	//卡标识 crisk
	'CARDBLACK_FLAG'	=> array('9'=>'黑卡'),
	//代扣公司收费标准 dkco
	'DKCO_FEE_FLAG'		=> array('每笔固定金额','每笔百分比'),
	//代扣公司状态 dkco
	'DKCO_STATUS'		=> array('正常','暂停'),
	//代扣公司工作日 dkco
	'DKCO_DK_WD'		=> array('自然日','工作日'),
	//险种类型 srba, tbls
	'SECURITY_TYPE'		=> array('3'=>'网络支付安全险','2'=>'养老险','1'=>'意外险'),
	//保险公司在线标志 security, tbls
	'ONLINE_FLAG'		=> array('在线','非在线'),
	//保险公司状态 security
	'SECURITY_STATUS'	=> array('正常','暂停'),
	//短信状态 smsls
	'SMS_STATUS'		=> array('发送成功','失败','未知'),
	//商户级别
	'SHOP_LEVEL'		=> array('1'=>'普通商户','2'=>'集团主商户','3'=>'集团子商户'),
	'SHOP_KIND' => array(
		'2015050700000000' => '美食',
		'2016042200000148' => '教育培训',
		'2015063000020189' => '生活服务',
		'2016062900190296' => '医疗健康',
		'2016062900190371' => '政府/社会组织',
		'2016062900190337' => '专业销售/批发',
		'2015080600000001' => '航旅',
		'2015062600004525' => '休闲娱乐',
		'2015062600002758' => '购物',
		'2016062900190124' => '爱车',
		'2015091000052157' => '超市便利店',
	),
	//产品推广标志 crisk
	'MARKET_FLAG'		=> array('生效','暂停/失效'),
	//商户编号前3位
	'SHOP_NO_FT'		=> '888',
	//手工输入卡号 POS
	'POS_MAN_MODE'		=> array('不支持','支持'),
	//IC公钥更新标志 POS
	'POS_PBOCKEYFLAG'	=> array('否','是'),
	//IC参数更新标志 POS
	'POS_PBOCPARAFLAG'	=> array('否','是'),
	//参数更新标志 POS
	'POS_PARAFLAG'		=> array('否','是'),
	//程序更新标志 POS
	'POS_PROGFLAG'		=> array('否','是'),
	//IC黑名单更新标志 POS
	'POS_HMDFLAG'		=> array('否','是'),
	//转赠产品 SCFG/TMP
	'DONATE_TYPE'		=> array('1'=>'发卡地区县收益','2'=>'创业合伙人收益','3'=>'消费地区县收益','9'=>'全部收益'),
	//秘钥体系	host
	'KEY_TYPE'			=> 	array('平台密钥','一机一密'),
	//代扣证件类型	A_SDKB/TMP
	'DK_IDNO_TYPE'		=> 	array('0'=>'身份证','1'=>'护照','2'=>'军人证','3'=>'回乡证','9'=>'未知'),
	//渠道公司信息表 A_CHANNEL
	'CHANNEL_STATUS'	=> 	array('0'=>'正常','1'=>'冻结'),
	//商户申请表 APPLY_STATUS
	'APPLY_STATUS'		=> 	array('0'=>'未联系','1'=>'已联系'),
	
	
	//GLA库
	//实名认证 vip
	'VIP_AUTH_FLAG'		=> array('否','是'),
	//子母卡 vip
	'VIP_DONATE'		=> array('无','子卡'),
	//会员状态 vip
	'VIP_STATUS'		=> array('0'=>'正常','1'=>'暂停','2'=>'冻结','9'=>'销户'),
	//证件类型 vip
	'VIP_IDNOTYPE'		=> array('0'=>'身份证','1'=>'护照','2'=>'军人证','3'=>'回乡证','9'=>'未知'),
	//会员性别 vip
	'VIP_SEX'			=> array('1'=>'男','0'=>'女'),
	//发卡过程 makecard
	'OUT_STATUS'		=> array('已制卡','在途中'),
	//卡状态 vipcard
	'CARD_STATUS'		=> array('0'=>'正常','1'=>'库存','2'=>'冻结', '3'=>'已换卡','8'=>'制卡中','9'=>'销户'),
	//卡套餐表 cproduct
	'CARD_P_MAP_ID'		=> array('2'=>'付费卡','3'=>'预免卡'),
	

	//TRA库
	//处理方式 trace
	'TRANS_TYPE'		=>	array('正常','手工'),
	//流水标志 trace
	'TRACE_STATUS'		=>	array('成功','失败','处理中'),
	//超扣标志 trace
	'FEE_STATUS'		=>	array('正常','超扣'),
	//差错标志 trace
	'ERROR_POINT'		=>	array('正常','拒付','调单'),
	//会员卡类型 trace,jfbls
	'VIP_FLAG'			=>	array('非会员','虚拟卡','收费卡','预免卡'),
	//商户划转标志 trace
	'CLEAR_SFLAG'		=>	array('已清','未清','代扣成功（仅现金）'),
	//商户结算方式 trace
	'SETTLE_STYPE'		=>	array('商户直收','通道直接到商户','渠道给商户','平台给商户','平台给集团商户','平台给代理'),
	//代理划转标志 trace
	'CLEAR_AFLAG'		=>	array('已清','未清'),
	//代理结算方式 trace
	'SETTLE_ATYPE'		=>	array('1'=>'收单给代理','2'=>'平台给代理'),
	//渠道划转标志 trace
	'CLEAR_CFLAG'		=>	array('已清','未清'),
	//渠道结算方式 trace
	'SETTLE_CFLAG'		=>	array('平衡','渠道多','平台多','待对'),
	//通道对账标志 trace
	'CLEAR_HFLAG'		=>	array('已清','未清'),
	//通道划转标志 trace
	'SETTLE_HFLAG'		=>	array('0'=>'平衡','1'=>'追偿','2'=>'挂账','3'=>'待对','9'=>'异常'),
	//分润划转标志 trace
	'CLEAR_PFLAG'		=>	array('已清','未清'),
	//分润结算方式 trace
	'SETTLE_PTYPE'		=>	array(),
	//分润标志 jfbls
	'JFB_CLEAR_FLAG'	=>	array('已清分','未清分'),
	//代扣到帐标志 dkls
	'DK_FLAG'			=>	array('成功','待代扣','失败','等待中'),
	//投保结果 tbls
	'TB_FLAG'			=> array('成功', '失败', '待提交', '待复核', '待确认', '已撤销', '已过期'),
	//移除标识 tbls
	'TB_DEL_FLAG'		=> array('参保','移除'),
	//审核过程 hbill
	'CHECK_FLAG_HBILL'	=>	array('待初审', '初审通过', '复核通过'),
	//审批标志	check,
	'CHECK_FLAG' 		=> array('1'=>'进件', '2'=>'变更'),
	//投保汇总状态 tbbill
	'TB_STATUS_TBBILL'	=> array('0'=>'正常','1'=>'失败','4'=>'待复核'),
	//划转标志 hbill
	'ACCT_FLAG'			=>	array('已划转', '未划转'),
	//撤销状态 trace
	'TRACE_REFUNDFLAG'	=>	array('正常', '撤销确认','撤销退货'),
	//结算标志 hbill
	'BANKACCT_FLAG'		=>	array('对公账号', '对私账号'),
	//发票确认 bbill
	'TAX_TICKET_FLAG'	=>	array('已开票', '未开票'),
	//投保交易模式(用于投保接口)1:Trial(核保与保费试算) 2:Original(投保确认) 3:Renewal(续保)
	'TransMode'			=>	array('1' => 'Trial','2' => 'Original','3' => 'Renewal'),
	//通道金额统计 pibill
	'SOURCE_TYPE' 		=>  array('通道','渠道'),	//0为通道,1为渠道
	//商户等级扣率通道 'SHOP_GRADE' 字段
	'GRADE_LEVEL'		=>  array('1'=>'一级','2'=>'二级','3'=>'三级'),
	//商户等级扣率通道 'STATUS' 字段
	'GRADE_STATUS'      =>  array('0'=>'正常','1'=>'关闭'),
	//转账流水管理 STATUS 字段
	'TRANSFERLS_STATUS' =>  array('0'=>'正常','1'=>'处理中','2'=>'失败'),
	//APP文本管理
	'TEXT_CATEGORY'		=>  array('1'=>'关于我们','2'=>'用户协议','3'=>'APP版本','4'=>'意见反馈','6'=>'APP通知','7'=>'APP快捷收款通知'),
	//APP版本显示
	'ENABLE'			=>  array('1'=>'是','2'=>'否'),
	//APP版本强制升级
	'FORCE'				=>  array('1'=>'是','2'=>'否'),
	//downmch表状态正常与关闭
	'DOWNMCH_STATUS'	=>  array('1'=>'正常','0'=>'关闭'),
	//downmch表扣率
	'DOWNMCH_FLAG'		=>  array('0'=>'低扣','1'=>'髙扣'),
	//汇财角色
	'R_ID'				=>  array('1'=>'金牌合伙人','2'=>'合伙人','3'=>'主管','4'=>'VIP'),

	//实名认证参数,版本号
	'VERSION'			=>	'1.0',
	//调用方注册的账户ID
	'ACCCODE'			=>	'SS001',
	//用户申请的密钥的索引
	'ACCESSKEYID'		=>	'3c08ff27c92347ffb6312724e05cdae8',
	//实名认证签名秘钥
	'PRIVATEKEY'		=>	'b3a4084e09c749a5a146fd8dd3ec4595',
	//商户号
	'MERCHANTID'		=>	'SS17101927',
	//身份认证模式
	'SERVICECODE'		=>	'105',
	//实名URL
	'SONGSHUN_URL'		=>	'http://39.108.115.111/SMRZ_SRV'
);