(function(){	
	BKGM.Rat=function(Game){
		BKGM.Rat.superclass.constructor.call(this);		
		var speed=29;
		this.Game=Game;
		this.speed=speed;
		
		return this;
	}
	BKGM.Rat.prototype={
		runaway:function(callback){
			var randomID=Math.random()*4;
			var x = Math.random()*(this.Game.WIDTH-50)+25;
			var y = Math.random()*(this.Game.HEIGHT-50)+25;
			if(randomID<1){
				x = -200;
			} else {
				if(randomID<2){
					x = this.Game.WIDTH+200;
				} else {
					if(randomID<3){
						y = -200;
					} else {
						y = this.Game.HEIGHT+200;
					}	
				}
			}
			this.speed=20;
			var target={x:x,y:y};
			this.target=target;
			var dx=target.x-this.x;
			var dy=target.y-this.y;
			var angle = Math.atan2(dy, dx);
			this.rotation = angle;
			if(this.box) this.box.rotate(angle);
			
			var speedX=this.speed*Math.cos(angle);
			var speedY=this.speed*Math.sin(angle);
			this.speedXY={spx:speedX,spy:speedY};
			this.d = this.speed+1>>0;
			this.endRun=function(){
				callback();
			}
		},
		setTarget:function(){
			posx=(Math.random()*(this.Game.WIDTH-100))+50;
    		posy=(Math.random()*(this.Game.HEIGHT-100))+50;
    		this.speed=Math.random()*8+5;
    		// var m=Math.min(this.Game.WIDTH,this.Game.HEIGHT)/100>>0;
    		// this.speed=Math.random()*m+(m*0.7);
			var target={x:posx,y:posy};
			this.target=target;
			var dx=target.x-this.x;
			var dy=target.y-this.y;
			var angle = Math.atan2(dy, dx);
			this.rotation = angle;
			if(this.box) this.box.rotate(angle);
			
			var speedX=this.speed*Math.cos(angle);
			var speedY=this.speed*Math.sin(angle);
			this.speedXY={spx:speedX,spy:speedY};
			this.d = this.speed+1>>0;
			var self=this;
			this.endRun=function(){
				self.setTarget();
			}
		},
		updateCheckBox:function(){
			this.rotation = 0;
		},
		update:function(){
			this.x+=this.speedXY.spx;
			this.y+=this.speedXY.spy;
			var d = this.d;
			if(this.target.x<this.x+d&&this.target.x>this.x-d&&this.target.y<this.y+d&&this.target.y>this.y-d){
				// if(this._behaviorend) this._behaviorend();
				this.endRun();
			}
			if(this.box) {
				this.box.position=new BKGM.Vector(this.x,this.y);
				// this.box.updateCorners();
			}
			
			
		}
	
	}
	extend(BKGM.Rat, BKGM.Actor);
	
})();