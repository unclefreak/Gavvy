define(function(require){
	var RLoader = require('./resource-loader');
	var loader = new RLoader();
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
});