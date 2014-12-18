define(function(require){
	var RLoader = require('./resource-loader');
	var loader = new RLoader();
	var move = require('./move');
	loader.load([
		{src: 'resource/images/background.jpg'},
		{src: 'resource/images/title.png'},
		{src: 'resource/images/load_1.png'},
		{src: 'resource/images/load_2.png'},
		{src: 'resource/images/load_3.png'},
		{src: 'resource/images/load_4.png'},
		{src: 'resource/images/load_5.png'},
		{src: 'resource/images/load_6.png'},
		{src: 'resource/images/load_7.png'},
		{src: 'resource/images/load_8.png'},
		{src: 'resource/images/load_9.png'},
		{src: 'resource/images/tablet_bottom.png'},
        {src: 'resource/images/tablet_top.png'},
        {src: 'resource/images/tablet_top_screen.png'},
        {src: 'resource/images/glur.png'},
        {src: 'resource/images/chips.png'},
        {src: 'resource/images/chips_big.png'},
        {src: 'resource/images/chips_big_1.png'},
        {src: 'resource/images/chips_1.png'},
        {src: 'resource/images/chips_1_light.png'},
        {src: 'resource/images/f_1_1.png'},
        {src: 'resource/images/f_1_2.png'},
        {src: 'resource/images/f_1_3.png'},
        {src: 'resource/images/f_2_1.png'},
        {src: 'resource/images/f_2_2.png'},
        {src: 'resource/images/f_2_3.png'},

        {src: 'resource/images/chips_2.png'},
        {src: 'resource/images/chips_2_light.png'},
        {src: 'resource/images/chips_2_shadow.png'},
        {src: 'resource/images/f_3_1.png'},
        {src: 'resource/images/f_3_2.png'},
        {src: 'resource/images/f_3_3.png'},

        {src: 'resource/images/chips_3.png'},
        {src: 'resource/images/chips_3_light.png'},
        {src: 'resource/images/chips_3_shadow.png'},
        {src: 'resource/images/chips_4.png'},
        {src: 'resource/images/chips_4_light.png'},
        {src: 'resource/images/f_4_1.png'},
        {src: 'resource/images/f_4_2.png'},
        {src: 'resource/images/f_4_3.png'},
        {src: 'resource/images/f_5_1.png'},
        {src: 'resource/images/f_5_2.png'},
        {src: 'resource/images/f_5_3.png'},
       
        {src: 'resource/images/bg.png'},
	]);
	loader.on('progress', function(e){
		//TODO: 根据百分比来判断显示的载入图片
		var percenter = e.loadedCount / e.totalCount;
		percenter = Math.ceil(percenter * 10) - 1;
		if(percenter > 0)
			$('section.load .imgbox img').attr('src', 'resource/images/load_' + percenter + ".png");
	});
	loader.on('load', function(e){
		//TODO: begin 
		$('section.load').hide();
		$('section.scene_1').show();
		$('.arrow').show().attr('class', 'arrow upper');
	});
/*
	var count = 1;
	var timer = setInterval(function(){
		$('section.load .imgbox img').attr('src', 'resource/images/load_' + (count++) + ".png");
		if(count > 9){
			clearInterval(timer);
			//$('section.load .loadbar').hide();
			$('section.load').hide();
			$('section.scene_1').show();
		}
	}, 200);
*/
	var step = 0;
	var isAnimating = false;
    var delay = 100;
	var sceneAnimate = function(){
		if(isAnimating){
			return;
		}
		isAnimating = true;
		step++;
		switch(step){
			case 1:
				$('.arrow').show().attr('class', 'arrow');
				move('.tablet_top').scale(1.2, 1.2).translate(-45, 116).duration('1s').end(function(){
					$('.chips').show();
					move(".screen")
						.set('opacity', 0)
						.duration('.5s')
							.then()
								.set('opacity', 1)
								.duration('.5s')
									.then()
										.set('opacity', 0)
										.duration('.5s')
										.pop()
									.pop()
								.end(function(){
									isAnimating = false;
									
								});
				});
				move('.tablet_bottom').translate(-511, 607).duration('1s').end();
				break;
			case 2:
				$('.tablet_top').css({'backgroundImage': 'url(resource/images/glur.png)'});
				move('.tablet_top').scale(4, 4).translate(0, 92).duration('1s').set('opacity', 0).end();
				move('.chips').scale(1, 1).translate(-10, 170).duration('1s').end(function(){
					isAnimating = false;
					$('.tablet_top, .tablet_bottom').hide();
				});
				break;
			case 3: 
				move('.chips').scale(2.1, 2.1).translate(-8, 113).duration('1s').end(function(){
					isAnimating = false;

					$('.chips').hide();
					$('.chips_big_box').show();
					$('.feature_1').show();
					setTimeout(function(){
						$('.feature_1 p').addClass('end');
					}, delay);
					//$('.feature_2 p').addClass('end');
					//$('.feature_3 p').addClass('end');
				});
				break;
			case 4:
				$('.feature_1').hide();
                $('.chips_big').addClass('split');
				move('.chips_big').y(-24).duration('.2s').ease('ease-out')
					.then()
                        .y(24)
                        .duration('.2s')
                        .set('opacity', 0.2)
                        .pop()
					.end(function(){

                    });
                $('.chips_1_box').show();
                setTimeout(function(){
                    move('.chips_1_box').translate(0, -120).duration('1s').end(function(){
                        move('.chips_1>.light').set('height', '189px').duration('.2s').end(function(){
                            $('.feature_2').show();
                            setTimeout(function(){
                                $('.feature_2 p').addClass('end');
                                isAnimating = false;
                            }, delay);
                        });
                    });
                }, delay);
				break;
            case 5:
                $('.feature_2').hide();
                $('.chips_2_box').show();
                $('.chips_1>.light').hide();
                
                setTimeout(function(){
                    move('.chips_2').translate(0, -64).duration('.8s').end(function(){
                    	move('.chips_1').set('opacity', .2).duration('.2s').end();
                        move('.chips_2>.light').set('height', '109px').duration('.2s').end(function(){
                            $('.feature_3').show();
                            setTimeout(function(){
                                $('.feature_3 p').addClass('end');
                                isAnimating = false;
                            }, delay);
                        });
                    });
                }, delay);
                break;
            case 6:
            	$('.feature_3').hide();
            	$('.chips_3_box').show();
            	$('.chips_2>.light').hide();
            	setTimeout(function(){
          			move('.chips_2').set('opacity', .2).duration('.2s').end();
            		move('.chips_4_box').translate(0, -113).duration('.8s').end(function(){
            			move('.chips_3>.light').set('height', '178px').duration('.2s').end(function(){
            				$('.feature_4').show();
            				setTimeout(function(){
            					$('.feature_4 p').addClass('end');
            					isAnimating = false;
            				}, delay);
            			});
            		});
            	}, delay);
            	break;
            case 7:
            	$('.arrow').show().attr('class', 'arrow bottom');
            	$('.feature_4').hide();
            	$('.chips_3>.light').hide();
            	move('.chips_3').set('opacity', .2).duration('.2s').end();
            	move('.chips_4').translate(0, -81).duration('.8s').end(function(){
            		move('.chips_4>.light').set('height', '131px').duration('.2s').end(function(){
            			$('.feature_5').show();
            			setTimeout(function(){
            				$('.feature_5 p').addClass('end');
            				isAnimating = false;
            			});
            		})
            	});
            	break;
		}
		
	};

    document.addEventListener('touchmove', function (event) {
        event.preventDefault();
        event.stopPropagation();
    }, false);

    document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
        event.stopPropagation();
    }, false);
    /*
    $(document.body).on('swipe', function(){
        console.log("swipe up");
    });
    */
    var swipeInfo = {
        startX: null,
        startY: null,
        endX: null,
        endY: null
    };
    document.body.addEventListener('touchstart', function(e){
        var touch = e.touches[0];
        swipeInfo.startX = touch.clientX;
        swipeInfo.startY = touch.clientY;

    }, false);
    document.body.addEventListener('touchmove', function(e){
        var touch = e.touches[0];
    }, false);
    document.body.addEventListener('touchend', function(e){
        var touch = e.changedTouches[0];
        swipeInfo.endX = touch.clientX;
        swipeInfo.endY = touch.clientY;
        var diffY = swipeInfo.endY - swipeInfo.startY;
        //console.log(swipeInfo.endY - swipeInfo.startY, swipeInfo.endX - swipeInfo.startX);
        if(Math.abs(diffY) < 10){
        	return;
        }
        if(diffY > 0){
            //Swipe down
        }else{
            //swipe up
            sceneAnimate();
        }
    }, false);
    //$('.feature p').addClass('end');
});