//banner部分轮播效果代码
$(function(){
	var index = 0;
	var imgWidth = $('.picsSwitch .picBox').width();//单张图片宽度
	var len = $('.picsSwitch .picBox').length;//图片数
	var totalImgWidth = imgWidth*len;//图片序列宽度
	
	//默认banne宽度是1600，低于1600的分辨率会出现位置偏差，需要调整，故在低于1600下设置banner宽度为100%；
	if($(window).width()<imgWidth) {
		$('.banner .picsSwitch').css({'width':$(window).width()});
		$('.banner .picsSwitch .picBox').css({'width':$(window).width()});
		$('.banner .picsSwitch .picBox a').css({'width':$(window).width()});
		imgWidth = $(window).width();
	}
	
	//为小按钮添加鼠标滑入事件，以显示相应的内容
	$('.banner .picsSwitchClients ul li').mouseover(function() {
		index = $('.banner .picsSwitchClients ul li').index(this);
		showPics(index);
	}).eq(0).trigger("mouseover");
	
	//上一页按钮
	$(".banner .prev").click(function() {
		index -= 1;
		if(index == -1) {index = len - 1;}
		showPics(index);
	});
	
	//下一页按钮
	$(".banner .next").click(function() {
		index += 1;
		if(index == len) {index = 0;}
		showPics(index);
	});
	
	$('.banner .pb').css({'width':totalImgWidth});
	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
	$('.banner .pb').hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			showPics(index);
			index++;
			if(index == len) {index = 0;}
		},4000); 
	}).trigger("mouseleave");
	
	//显示图片函数，根据接收的index值显示相应的内容
	function showPics(index) {
		var nowLeft = -index*imgWidth; //根据index值计算ul元素的left值
		$('.banner .pb').stop(true,false).animate({"marginLeft":nowLeft},1000,'easeInOutExpo'); //通过animate()调整ul元素滚动到计算出的position
		$('.banner .picsSwitchClients ul li span').stop(true,false).css("background-color","#B1B9BB").eq(index).stop(true,false).css("background-color","#666"); //为当前的按钮切换到选中的效果
	}
	
});

//infor部分鼠标滑过图标动态效果
$(function() {
	$('.infor ul li .imgBox').hover(function() {
		$(this).find('img').css('left', '-111px');
	}, function() {
		$(this).find('img').css('left', '0');
	});
})