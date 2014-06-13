(function(){
            var menuBrandingImage;
            // device APIs are available
            	 var canvas = document.getElementById('canvas');
	            // canvas.setAttribute("id", "game"); 
	            // document.body.appendChild(canvas);

	            var ctx=canvas.getContext('2d');
	            canvas.width=window.innerWidth;
	            canvas.height=window.innerHeight;
        
            	
            	preLoad();
	            // });
            	
            	
            
            function preLoad(){
            	var preload= new BKGM.preload();           	
					preload.load("image","chim","img/chuotngu.png")		
							.load("image","slap","img/slap.png")
							.load("audio","slap","audio/slap.mp3")
						    .load("audio","hit","audio/hit.mp3")
						    .load("audio","gameover","audio/gameover.mp3")
						   ;
					preload.onloadAll= function(){
						windowLoad(preload);  
					}
            }
	// window.onload=function(){
        function windowLoad(preload) {
   //      	if (navigator.isCocoonJS) {
			//     CocoonJS.App.setAntialias(true);
			// }
           

            var director;
            
            
            var Game = new BKGM({
			    setup: function(){
			    	
			        director = new BKGM.States();
			        var Game = this;
			       
			        // BKGM.debug=1;
			        Game.addRes(preload);
			       	// context draw
			        var ctx=Game.ctx;
			        var dt=1/60;
			        // Image in game
			        var Images=Game.resource.images;
			        // Audio in game
			        var slap_audio=Game.resource.audios['slap'];
					var hit_audio=Game.resource.audios['hit'];
					var gameover_sound=Game.resource.audios['gameover'];

					// The Rat
			        var sprite = new BKGM.Sprite({image:Images["chim"],rows:2,columns:2}).addAnimation("run",[0,2],200,"loop").addAnimation("tap",[1,3],200,"loop").playAnimation("run");
					var Rat=new BKGM.Rat(Game).addSprite(sprite);

					Rat.mouseDown=Rat.touchStart=function(e){
						// alert(1)
							Game.score++;
							if (Game.score>2) Rat.playAnimation("tap");
							slap_audio.forceplay();
							hit_audio.forceplay();
							Rat.isslap=true;
							Rat.slapX=Rat.x-Images['slap'].width/2;
							Rat.slapY=Rat.y-Images['slap'].height/2;
							Rat.slapcount=1;
							Rat.setTarget();
													
					}
					Game.addChild(Rat);

    				
				    //States
				    

				    

				    director.state("game", [	
				     	"background",
				     	"setup",
				     	"Rat.update",
				     	"Rat.draw",
				     	"score"
				    ]);

				    

				    director.taskOnce("setup", function(){
				    	Rat.x=Game.WIDTH/2;
				        Rat.y=Game.HEIGHT/2;
				        // Rat.width=Images["chim"].width;
				        // Rat.height=Images["chim"].height;
				        Rat.updateCheckBox();
				        Game.countTime=3;
				        Rat.slapcount=1;
				        Rat.setTarget();
				        Game.score = 0;
				        Game.highscore=0;
				        Game.runaway=false;
				        console.log
				        //Game.highscore = readLocalData("highscore", 0);
				    });
				    director.task("background", function(){

				    	//ctx.globalAlpha = 0.1;
				    	// ctx.drawImage(Images.background2,0,0,Game.WIDTH,Game.HEIGHT);
				    	// ctx.drawImage(Game.imgbg,mx-Game.WIDTH,0,Game.WIDTH,Game.HEIGHT);
				        // Game.background(16,16,16,1);
				    },true);

				    
				    director.task("Rat.update", function(){
				    	Game.countTime-=dt;
				    	
				    	
				    	// Check slap image
				    	if(Rat.slapcount<=0.1){
				    		Rat.slapcount=0;
				    		Rat.isslap=false;
				    	} else if(Rat.slapcount>0){
				    		Rat.slapcount-=dt;
				    	}
				        Rat._update();

				    });

				    director.task("Rat.draw", function(){
				        // Rat._draw(Game);
				        Rat._draw(Game)
				        if(Rat.isslap){
				        	ctx.save();
				        	ctx.globalAlpha = Rat.slapcount;
				        	ctx.drawImage(Images['slap'],Rat.slapX,Rat.slapY);
				        	ctx.restore();
				        }
				    },true);

				    director.task("score", function(){  
				        var score=Game.score+"";
				        ctx.font="50pt Arial"
				        ctx.fillText(score,Game.WIDTH/2-ctx.measureText(score).width/2,Rat.height);
				    },true);
				    
				   
				    Game.mouseDown=function(e){
				    	
				    	
				    }
				    
				    director.switch("game");
			    },
			    draw: function(){
			    	// if(window.innerWidth>window.innerHeight && this.screen=="portrait"){
			    	// 	this.screen="landscape";
			    	// 	this.rerun();
			    	// } else 
			    	// if (window.innerWidth<window.innerHeight && this.screen=="landscape") {
			    	// 	this.screen="portrait";
			    	// 	this.rerun();
			    	// }
			    	// Runs every interval
			        director.run();
			        // Runs every interval
			        director.draw();
			    },
			    update: function(){
			        
			    }
			}).run();
        }
	// };
})()