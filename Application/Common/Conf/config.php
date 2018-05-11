<?php
//**********************
//Setting Constants
//**********************
// require 'constants.php';

return array(
    '_URL'                => C_URL,

    /* 数据库 */
    //数据库配置信息
    'DB_TYPE'             => 'mysql', // 数据库类型
    'DB_HOST'             => '127.0.0.1', // 服务器地址
    'DB_NAME'             => 'big_finance', // 数据库名
    'DB_USER'             => 'root', // 用户名
    'DB_PWD'              => 'daikuan168', // 密码
    'DB_PORT'             =>  3306, // 端口
    'DB_PREFIX'           => 'a_', // 数据库表前缀 
    'DB_CHARSET'          => 'utf8', // 字符集
    'DB_DEBUG'            =>  TRUE, // 数据库调试模式 开启后可以记录SQL日志 3.2.3新增   

    /* 提示 */
    'TMPL_ACTION_ERROR'   => './Public/tips/tips.html', // Default Error Page
    'TMPL_ACTION_SUCCESS' => './Public/tips/tips.html', // Default Success Page
    'ERROR_PAGE'          => './Public/tips/error.html', // Default Error page

    /* 模板替换 */
    'TMPL_PARSE_STRING'   => array(
        '__PUBLIC__' => '/Public',
    ),

    /* 配置信息 seo 资源 */
    'icp'                 => '京ICP备13031807号',
    'icpright'            => '技术支持：北京浙星信息技术有限公司 © 2015',
    'seo_title'           => '越满业务运营管理平台',
    'seo_keywords'        => '越满业务运营管理平台,收单系统',
    'seo_description'     => '越满业务运营管理平台',

);
