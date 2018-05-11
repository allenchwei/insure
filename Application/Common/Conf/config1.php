<?php
//**********************
//Setting Constants
//**********************
require 'constants.php';

return array(
	'_URL'					=>	C_URL,
	
	/* 数据库 */
	'DB_DSN'	   			=>	DB_DSN,
	'DB_PREFIX'    			=>	DB_PREFIX,
		
	/* 提示 */
	'TMPL_ACTION_ERROR'		=>	'./Public/tips/tips.html', 		// Default Error Page
	'TMPL_ACTION_SUCCESS'	=>	'./Public/tips/tips.html', 		// Default Success Page
	'ERROR_PAGE'			=>	'./Public/tips/error.html', 	// Default Error page
	
	/* 模板替换 */
	'TMPL_PARSE_STRING'		=>	array(
		'__PUBLIC__'		=>	'/Public'
	),
	
	/* 配置信息 seo 资源 */
	'icp' 					=> '京ICP备13031807号',
	'icpright' 				=> '技术支持：北京浙星信息技术有限公司 © 2015',
	'seo_title' 			=> '积分宝业务运营管理平台',
	'seo_keywords' 			=> '积分宝业务运营管理平台,收单系统',
	'seo_description' 		=> '积分宝业务运营管理平台',                
	
);