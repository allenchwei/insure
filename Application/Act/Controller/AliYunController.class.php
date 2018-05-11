<?php
namespace Home\Controller;
use Think\Controller;
use Aliyun\Core\Config as Config;
use Aliyun\Core\Profile\DefaultProfile as DefaultProfile;
use Aliyun\Core\DefaultAcsClient as DefaultAcsClient;
use Aliyun\Api\Sms\Request\V20170525\SendSmsRequest as SendSmsRequest;
use Aliyun\Api\Sms\Request\V20170525\QuerySendDetailsRequest as QuerySendDetailsRequest;

// +----------------------------------------------------------------------
// | @explain  阿里云短信验证接口
// +----------------------------------------------------------------------
class AliYunController extends Controller {
    static $acsClient = null;

    public function  __construct()
    {
        parent::__construct();
        ini_set("display_errors", "on");
        require_once '/phpstudy/www/zs.pg956.cn/ThinkPHP/Library/Aliyun/api_sdk/vendor/autoload.php';
        // 加载区域结点配置
        Config::load();
    }

	/**
     * 发送短信
     * @return stdClass
     */
    public function sendSms($phone,$code) {
        Add_LOG('index',__FUNCTION__.' '.__LINE__.' phone,code：'.json_encode($_GET));
    	if (empty($phone) || empty($code)) {
    		callback('202','参数异常');
    	}
        // 初始化SendSmsRequest实例用于设置发送短信的参数
        $request = new SendSmsRequest();
        // 必填，设置短信接收号码
        $request->setPhoneNumbers($phone);
        // 必填，设置签名名称，应严格按"签名名称"填写，请参考: https://dysms.console.aliyun.com/dysms.htm#/develop/sign
        $request->setSignName("有米专享");
        // 必填，设置模板CODE，应严格按"模板CODE"填写, 请参考: https://dysms.console.aliyun.com/dysms.htm#/develop/template
        $request->setTemplateCode("SMS_119080823");
        // 可选，设置模板参数, 假如模板中存在变量需要替换则为必填项
        $request->setTemplateParam(json_encode(Array(  // 短信模板中字段的值
            "code"=>$code,
            "product"=>"dsd"
        ), JSON_UNESCAPED_UNICODE));
        Add_LOG('index',__FUNCTION__.' '.__LINE__.' request：'.json_encode($request));
        // 发起访问请求
        $acsResponse = static::getAcsClient()->getAcsResponse($request);
        Add_LOG('index',__FUNCTION__.' '.__LINE__.' acsResponse：'.json_encode($acsResponse));
        Add_LOG('index',__FUNCTION__.' '.__LINE__.' acsResponse：'.$acsResponse->Message);
        if ($acsResponse->Code == 'OK') {
            callback('200','短信发送成功');
        }else{
            callback('204',$acsResponse->Message);
        }
        // return $acsResponse;
    }

    /**
     * 取得AcsClient
     *
     * @return DefaultAcsClient
     */
    public static function getAcsClient() {
        //产品名称:云通信流量服务API产品,开发者无需替换
        $product = "Dysmsapi";

        //产品域名,开发者无需替换
        $domain = "dysmsapi.aliyuncs.com";

        $accessKeyId = "LTAId1Tgky4CEGe5"; // AccessKeyId

        $accessKeySecret = "vz9hmmtUYEZ1j6Qd8VU08In8GZ470C"; //AccessKeySecret

        // 暂时不支持多Region
        $region = "cn-hangzhou";

        // 服务结点
        $endPointName = "cn-hangzhou";


        if(static::$acsClient == null) {

            //初始化acsClient,暂不支持region化
            $profile = DefaultProfile::getProfile($region, $accessKeyId, $accessKeySecret);

            // 增加服务结点
            DefaultProfile::addEndpoint($endPointName, $region, $product, $domain);

            // 初始化AcsClient用于发起请求
            static::$acsClient = new DefaultAcsClient($profile);
        }
        return static::$acsClient;
    }
}