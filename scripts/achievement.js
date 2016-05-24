/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-20 11:43:08
 * @version $Id$
 */


$(function(){
	//轮播图实现

	ImgAutoPlay();
	
	//hover到header数值区域的动画
	$("#archHeaderBox .archTextBox a").hover(function(){
		/*console.log('ssss')	*/
		$(this).addClass('scaleIn');	//scaleIn是我写的一个动画,达到放大1.3，用于选中区域,增强交互
	},function(){
		$(this).removeClass('scaleIn');
	});

	//进场作品直线动画 两条直线分别进入区域
	$(".archMain .archPBox .leftLine").animate({left:'25px'},'slow',
		function(){
			$(this).animate({left:'0'},'slow');
	});
	$(".archMain .archPBox .RightLine").animate({right:'25px'},'slow',
		function(){
			$(this).animate({right:'0'},'slow');
	});

	//选中具体作品的动画
	$(".archMain #archSlider .archSliderImgLi ul li").hover(function(){
		$(".archMain #archSlider .btn").stop().fadeOut();	//按钮隐藏
		$(this).addClass('scaleIn');						//hover到具体图片时,图片放大 scaleIn
	},function(){
		$(".archMain #archSlider .btn").stop().fadeIn();	//按钮隐藏
		$(this).removeClass('scaleIn');						//mouseleave时移除scaleIn样式，图片恢复
	});

});

function ImgAutoPlay(){
	var imgCenter = $("#archSlider .archSliderImg");
	var imgLi = imgCenter.find(".archSliderImgLi");
	/*alert(imgLi.length);*/
	var iNow = 0;
	var clone = imgLi.first().clone();	//用于无缝滚动
	imgCenter.append(clone);			//添加到了ul中 现住相当于ul有5个li 最后一个li与第一个相同
	var imgLiSize = imgCenter.find(".archSliderImgLi").size();	//5
	var comWidth = imgLi.first().width();	//每一帧的宽度
	/*alert(imgLiSize);*/
	/*alert(comWidth);*/
	var timer = null;

	function tab(){
		//到达最后一张时,迅速拉回第一帧,达到无缝滚动的效果
		if(iNow == imgLiSize){	
			imgCenter.css({left:0});	
			iNow = 1;
		}

		//针对iNow到达-1时,要将ul移到最后一张
		if(iNow == -1){
			$(".img").css({"left":-(imgLiSize-1)*comWidth});
			iNow = imgLiSize-2;
 		}

		imgCenter.stop().animate({	//每1s 移动整个ul 
			left: -iNow*comWidth
		},1000);

		/*索引点变化*/
		if(iNow == imgLiSize-1){	//如果是最后一帧,再向下切换按钮时 要为第一个按钮添加active样式
			$("#archSlider .archSliderNum li").eq(0).addClass('active').siblings().removeClass('active');
		}else{						//其他情况根据自身索引来判断当前active按钮
			$("#archSlider .archSliderNum li").eq(iNow).addClass('active').siblings().removeClass('active');
		}
	}

	/*自动播放*/
	timer = setInterval(function(){
		iNow++;	//计时数,用于为当前按钮添加样式和为下一步tab添加移动
		tab();
	}, 2000);


	/*鼠标划入索引区域*/
	$("#archSlider .archSliderNum li").eq(0).addClass('active');		//页面加载完后为第一个按钮添加样式
	$("#archSlider .archSliderNum li").hover(function(){
		var index = $(this).index();									//用于与iNow同步,达到页面和按钮样式同步切换效果
		iNow = index;
		$("#archSlider .archSliderImg").stop().animate({left:-iNow*comWidth},600);
		$(this).addClass('active').siblings().removeClass('active');  	//为当前按钮添加active样式,同时去除别的按钮active样式
	});

	/*进入滑动区域清除计时器*/
	$("#archSlider").hover(function(){
		clearInterval(timer);			//消除计数器
		$(this).find(".btn").stop().fadeIn();	//按钮出现
	},function(){
		$(this).find(".btn").stop().fadeOut();	//按钮消失
		timer = setInterval(function(){	//划出移动区域重新开始计时运动
			iNow++;
			tab();
		}, 2000);
	});

	/* 左右按钮切换事件 */
	$("#archSlider .btn_r").click(function(){
    	iNow++;
		tab();
	});
	$("#archSlider .btn_l").click(function(){
		iNow--;
		tab();
	});
}