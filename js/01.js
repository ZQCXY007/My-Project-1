(function($) {
    $.fn.extend({
        IMGDEMO:function(opt) {
            
            var opt 	= arguments[0] ? arguments[0] :false;
            var $button = $(this).children("li")	;			//瀹瑰櫒;
            var $sec 	= 3000						; 			//鑷姩鎾斁榛樿鏃堕棿;
            var $min 	= $button.last().width() 	;			//鏈€灏忓搴�;
            var $max 	= $button.first().width() 	;			//鏈€澶у搴�;
            var $index 	= 1   						;			//杞挱寮€濮嬬储寮曞彿;
            
            $default = {										//榛樿鍙傛暟;
                speed	:	opt.speed 	? 	opt.speed 						:	"slow"	,
                by		:	opt.by 		? 	opt.by 							:	"click"	,
                auto	:	opt.auto 	? 	opt.auto						:	false	,
                sec		:	opt.sec 	? 	opt.sec < 1000 ? 1000 : opt.sec	:	$sec	,
                maxWidth:	$max														,
                minWidth:	$min														,
                index	:	$index
            };            
            $button.bind($default.by, this.run).autoPlay();		//缁戝畾浜嬩欢;
        },
        run:function() {										//杩愯鏂规硶;
            var $obj = $(this);
            if ($obj.width() == $default.minWidth) {
                var timeDo = window.setTimeout(function() {
                    $default.index = $obj.index();
                    $obj.anim();
                }, 100);
                $obj.mouseout(function() {
                    window.clearTimeout(timeDo);
                });
            }
        },
        autoPlay:function() {									//鑷姩鎾斁;
            if ($default.auto) {
                var $this = $(this);
                $this.autoDo();
                $this.mouseover(function() {
                    window.clearInterval(timeL);
                });
                $this.mouseout(function() {
                    $this.autoDo();
                });
            }
        },
        autoDo:function() {										//鎾斁鏂规硶;
            var $len 	= 	$(this).length - 1;
            var $this 	= 	$(this);
            	timeL 	= 	window.setInterval(function() {
                				$this.eq($default.index).anim();
                				$default.index < $len ? $default.index++ :$default.index = 0;
            				}, $default.sec);
        },
        anim:function() {										//鍔ㄧ敾鏂规硶;
            var $fx = function() {
                $(this).siblings("li").animate({
                    width	:	$default.minWidth,  
                     opacity	:	0.5
                }, $default.speed).removeClass('active');
                $(this).animate({
                    width	:	$default.maxWidth,
					 opacity	:	1                   
                }, $default.speed).addClass('active');
				
                $(this).siblings("li").children("div").fadeOut();
                $(this).children("div").fadeTo($default.speed,0.7);
                $(this).dequeue();
            };
            $(this).queue($fx);
        }
    });
})(jQuery);