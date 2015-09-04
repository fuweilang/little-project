<?php
	header("Access-Control-Allow-Origin:*");
	
	$url='http://suggestion.baidu.com/su?wd=';
	
	function getJSONStr($str){
		return substr($str,17);
	}
	
	function crul($key){
		global $url;
		
		$data = file_get_contents($url.$key);
		
		$data = getJSONStr($data);
		$data = str_replace("{q:\"","",$data);
		$data = str_replace("\",p:","{%aaa%}",$data);
		$data = str_replace(",s:[","{%aaa%}",$data);
		$data = str_replace("]});","",$data);
		$arr = explode("{%aaa%}",$data);
		$res = array();
		$res['q'] = iconv("GB2312","UTF-8",$arr[0]);
		if ($arr[1] == 'true'){
			$arr[1] = true;
		}else{
			$arr[1] = false;
		}
		
		$res['p'] = $arr[1];
		if (strlen($arr[2])>0){
			$arr[2] = substr($arr[2],1,-1);
			$arr[2] = str_replace("\",\"",",",$arr[2]);
			$arr[2] = iconv("GB2312","UTF-8",$arr[2]);
		}
		$res['s'] = explode(',',$arr[2]);
		//print_r( $res['s']);
		

		echo json_encode($res);
		//$a = json_decode($data);

	}
	
	$key = $_REQUEST['keyword'];
	crul($key);
?>