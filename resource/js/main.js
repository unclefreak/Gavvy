define(function(require){
	var RLoader = require('./resource-loader');
	var loader = new RLoader();
	var move = require('./move');
	console.log(move);
	loader.load([
		{src: 'resource/images/background.jpg'},
		{src: 'resource/images/load_1.png'},
		{src: 'resource/images/load_2.png'},
		{src: 'resource/images/load_3.png'},
		{src: 'resource/images/load_4.png'},
		{src: 'resource/images/load_5.png'},
		{src: 'resource/images/load_6.png'},
		{src: 'resource/images/load_7.png'},
		{src: 'resource/images/load_8.png'},
		{src: 'resource/images/load_9.png'},
		{src: 'resource/images/title.png'}
	]);
	loader.on('progress', function(e){
		//TODO: 根据百分比来判断显示的载入图片
		if(e.loadedCount < 10){
			$('section.load .imgbox img').attr('src', 'resource/images/load_' + e.loadedCount + ".png");
		}
	});
	loader.on('load', function(e){
		console.log(e);
	});

	var count = 1;
	var timer = setInterval(function(){
		$('section.load .imgbox img').attr('src', 'resource/images/load_' + (count++) + ".png");
		if(count > 9){
			clearInterval(timer);
			//$('section.load .loadbar').hide();
		}
	}, 200);
	var step = 0;
	var isAnimating = false;
	$('.scene_1').click(function(){
		if(isAnimating){
			return;
		}
		isAnimating = true;
		step++;
		switch(step){
			case 1:
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

					$('.chips').addClass('chips_big').removeClass('chips').removeAttr('style');
					$('.feature_1 .f1').addClass('end');
					$('.feature_1 .f2').addClass('end');
					$('.feature_1 .f3').addClass('end');
				});
		}
		
		return;
	})
});