define('resource-loader', function(require, exports, module){
	var tools = require('./tools');
	var EventEmitter = tools.EventEmitter;

	var ResourceLoader = function(options){
		this._initResourceLoader(options);
	};
	ResourceLoader.prototype = {
		_initResourceLoader: function(options){
			this.options = tools.mix({
				maxConnections: 4
			}, options);
			EventEmitter.call(this);

			this.totalCount = 0;
			this.loadedCount = 0;
			this.resources = {};
			this.loading = 0;
			this.unloadResources = [];
		},
		/**
		 * [{name: '', type: '', src: ''}]
		 */
		load: function(resources){

			this.unloadResources = resources;
			this.totalCount += resources.length;
			var self = this;
			this.execQueue();
		},
		execQueue: function(){
			while(this.loading <= this.options.maxConnections && this.unloadResources.length > 0){
				var res = this.unloadResources.shift();
				(!!res.type) || (res.type = 'image');
				switch(res.type){
					case 'image':
						this.loadImage(res);
						break;
					case 'tmx': 
						break;
					case 'audio':
						break;
					case 'json': 
						break;
					default:
						break;
				}
			}
		},
		loadPerResource: function(target){
			var self = this;
			self.emit('progress',{
				loadedCount: self.loadedCount, 
				totalCount: self.totalCount,
				target: target 
			});
			this.loading--;

			if(self.totalCount === self.loadedCount){
				self.emit('load', {totalCount: self.totalCount});
			}else{
				self.execQueue();
			}
		},
		loadImage: function(resource){
			var self = this;
			var img = new Image();
			img.onload = function(){
				++self.loadedCount;
				if(resource.name){
					self.resources[resource.name] = this;
				}
				self.loadPerResource(this);
			};
			
			img.onerror = function(){
				++self.loadedCount;
				self.loadPerResource(this);
				console.log('Error on: ' + this.dataName);
			};
			
			img.src = resource.src;
			this.loading++;
		},
		get: function(name){
			if(this.resources[name] !== undefined){
				return this.resources[name];
			}else{
				console.log('Error on get resource: ' + name);
				return false;
			}
		}
	};
	tools.extend(ResourceLoader, EventEmitter);
	
	module.exports = ResourceLoader;
});