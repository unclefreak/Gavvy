define('swipe', function (require, exports, module) {
    var tools = require('./tools');
    var SwipeNode = function(node){
        this._initSwipeNode(node);

    };

    SwipeNode.prototype = {
        _initSwipeNode: function (node) {
            tools.EventEmitter.call(this);
            this.touchInfo = {
                startX: null,
                startY: null,
                endX: null,
                endY: null,
                diffX: null,
                diffY: null
            };
            var self = this;
            node.addEventListener('touchstart', function(e){
                var touch = e.touches[0];
                self.touchInfo.startX = touch.clientX;
                self.touchInfo.startY = touch.clientY;
            }, false);
            node.addEventListener('touchmove', function(e){

            }, false);
            node.addEventListener('touchend', function (e) {
                var touch = e.changedTouches[0];
                self.touchInfo.endX = touch.clientX;
                self.touchInfo.endY = touch.clientY;
                var diffX = self.touchInfo.deffX = self.touchInfo.endX - self.touchInfo.startX;
                var diffY = self.touchInfo.diffY = self.touchInfo.endY - self.touchInfo.startY;
                if(Math.abs(diffX) > 10){
                    if(diffX > 0){
                        self.emit('swiperight', tools.mix({}, self.touchInfo));
                    }else{
                        self.emit('swipeleft', tools.mix({}, self.touchInfo));
                    }
                }
                if(Math.abs(diffY) > 10){
                    if(diffY > 0){
                        self.emit('swipedown', tools.mix({}, self.touchInfo));
                    }else{
                        self.emit('swipeup', tools.mix({}, self.touchInfo));
                    }
                }
            }, false);
        }


    };
    tools.extend(SwipeNode, tools.EventEmitter);
    var Swipe = function(selector){
        this._initSwipe(selector);
    };
    Swipe.prototype = {
        _initSwipe: function (selector) {
            tools.EventEmitter.call(this);
            this.events = ['swiperight', 'swipeleft', 'swipeup', 'swipedown'];
            var self = this;
            var nodes = document.querySelectorAll(selector);
            for(var i = 0, len = nodes.length; i < len; i++){
                var sn = new SwipeNode(nodes[i]);

                this.bindEvents(sn);
                /*
                sn.on('swiperight', function(e){
                    self.emit('swiperight', e);
                });
                sn.on('swipeleft', function(e){
                    self.emit('swipeleft', e);
                });
                sn.on('swiperight', function(e){
                    self.emit('swiperight', e);
                });
                sn.on('swiperight', function(e){
                    self.emit('swiperight', e);
                });
                */
            }

        },

        bindEvents: function(sn){
            var self = this;
            for(var i = 0, len = this.events.length; i < len; i++){
                self.bindEvent(sn, this.events[i]);
            }
        },

        bindEvent: function(sn, event){
            var self = this;
            sn.on(event, function (e) {
                self.emit(event, e);
            });
        }
    };
    tools.extend(Swipe, tools.EventEmitter);
    module.exports = function(selector){
        return new Swipe(selector);
    };
});