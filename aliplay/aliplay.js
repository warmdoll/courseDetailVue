(function()
{
	var defalutSkinLayout=
	 {
	    bigPlayButton:{
	        "name":"bigPlayButton",
	        "align":"blabs",
	        "x":30,
	        "y":80
	    },
	    H5Loading:{
            "name": "H5Loading", 
            "align": "cc"
        },
        errorDisplay:{
        	name: "errorDisplay", 
        	align: "tlabs", 
        	x: 0, 
        	y: 0
        },
        infoDisplay:{
        	name: "infoDisplay", 
        	align: "cc"
        },
	    controlBar:{
	        "name":"controlBar",
	        "align":"blabs",
	        "x":0,
	        "y":0,
	        "children":[]
	    },
	    progress:{
	        "name":"progress",
	        "align":"tlabs",
	        "x":0,
	        "y":0
	    },
	    playButton:{
	        "name":"playButton",
	        "align":"tl",
	        "x":15,
	        "y":26
	    },
	    fullScreenButton:{
	        "name":"fullScreenButton",
	        "align":"tr",
	        "x":20,
	        "y":25
	    },
	    timeDisplay:{
	        "name":"timeDisplay",
	        "align":"tl",
	        "x":10,
	        "y":24
	    },
	    setButton:{
	        "name":"setButton",
	        "align":"tr",
	        "x":20,
	        "y":25
	    },
	    streamButton:{
	        "name":"streamButton",
	        "align":"tr",
	        "x":20,
	        "y":23
	    },
	    speedButton:{
	    	"name":"speedButton", 
	    	"align":"tr",
	    	"x":10, 
	    	"y":23
	    },
	    volume:{
	        "name":"volume",
	        "align":"tr",
	        "x":20,
	        "y":25
	    },
	    snapshot:{
	    	"name": "snapshot", 
	    	"align": "tr", 
	    	"x": 20, 
	    	"y": 25
	    },
	    fullControlBar:{
	      "name":"fullControlBar",
	      "align":"tlabs",
	      "x":0,
	      "y":0,
	      "children":[]
	    },
	    fullTitle:{
	        "name":"fullTitle",
	        "align":"tl",
	        "x":25,
	        "y":6
	    },
	    fullNormalScreenButton:{
	        "name":"fullNormalScreenButton",
	        "align":"tr",
	        "x":24,
	        "y":13
	    },
	    fullTimeDisplay:{
	        "name":"fullTimeDisplay",
	        "align":"tr",
	        "x":10,
	        "y":12
	    },
	    fullZoom:{
	            "name":"fullZoom",
	            "align":"cc"
	        }
	  };

	var controlBarLayout = {
	    "name":"controlBar",
	    "align":"blabs",
	    "x":0,
	    "y":0,
	    "children":[]
	  };
	var fullControlBarLayout = {
	    "name":"fullControlBar",
	    "align":"blabs",
	    "x":0,
	    "y":0,
	    "children":[]
	  };
	var alignDesc = {
		'cc':"相对于父组件绝对居中",

        'tl':"相对于父组件左上对齐，受同级组件的占位影响，以组件的相对位置左上角作为偏移原点，可类比于css中的float: left",

		'tr':"相对于父组件右上对齐，受同级组件的占位影响，以组件的相对位置右上角作为偏移原点，可类比于css中的float: right",

		'tlabs':"相对于父组件左上绝对对齐，不受同级组件的占位影响，以父组件左上角作为偏移原点",

		'trabs':"相对于父组件右上绝对对齐，不受同级组件的占位影响，以父组件右上角作为偏移原点",

		'blabs':"相对于父组件左下绝对对齐，不受同级组件的占位影响，以父组件左下角作为偏移原点",

		'brabs':"相对于父组件右下绝对对齐，不受同级组件的占位影响，以父组件右下角作为偏移原点"
	}

	function getValue(id)
	{
	    return $('#'+id).val();
	}

	function showLayoutSetting(obj, name,item)
	 {
	 	var layoutSetting = $('.layout-skin-setting');
	 	var tip = $('.layout-skin-setting-tip');
	    layoutSetting.show();
	    tip.show();
	    layoutSetting.find('.panel-title').val(name);
	    if(!item)
	    {
	      item.align = 'blabs';
	      item.x = 0;
	      item.y = 0;
	    }
	    layoutSetting.find('#align').val(it.align);
	    layoutSetting.find('#x').val(item.x);
	    layoutSetting.find('#y').val(item.xy);

	 }

	  function findItem(items,name)
	  {
	    if(items.length ==0)
	      return -1;
	    var length = items.length;
	    for(var i=0;i<length;i++)
	    {
	       if(items[i] == name || items[i].name == name)
	        return i;
	    }
	    return -1;
	  }

	function generateLayoutString(item)
	{
		return '{name:'+item.name + ",align:"+item.align+",x:"+item.x+",y:"+item.y+"}";
	}
	function PlayerConfiguration()
	{
	    this.skinLayout = [];
		this.videoType = 'vod';
        this.playerType = 'all';
        this.player = null;
        this.option = {
		  id: 'J_prismPlayer',
		  cover:"",
		  source:"",
		  isLive:false,
		  playsinline:true,
		  autoplay:true,
		  controlBarVisibility:"always"
		  };
	}

	PlayerConfiguration.prototype.play = function()
	{
	    this.prepareOption();
	    
	    this.player = new Aliplayer(this.option);
	   
	}

	PlayerConfiguration.prototype.generateCode = function()
	{
	    this.prepareOption();
	   
		var template = '<!DOCTYPE HTML>\n'+
                       '<html>\n'+
                       '<head>\n'+
                       '<meta charset="UTF-8">\n'+
                       '<meta http-equiv="x-ua-compatible" content="IE=edge" >\n'+
                       '<meta name="viewport"   content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"/>\n'+
                       '<title>Aliplayer在线配置</title>\n'+
                       '<link rel="stylesheet" href="//g.alicdn.com/de/prismplayer/2.2.0/skins/default/aliplayer-min.css" />\n'+
                       '<script type="text/javascript" src="//g.alicdn.com/de/prismplayer/2.2.0/aliplayer-min.js"></script>\n'+
                       '</head>\n'+
                       '<body>\n'+
                       ' <div  class="prism-player" id="J_prismPlayer" style="position: absolute;left:0%;"></div>\n'+
                       ' <script>\n'+

					   '    var player = new Aliplayer({\n'+
					   '    id: "J_prismPlayer",\n'+
					   '         autoplay: '+this.option.autoplay+",\n"+
					   '         isLive:' +this.option.isLive+",\n"+
					   '         playsinline:'+this.option.playsinline+",\n"+
					   '         width:"'+this.option.width+'",\n'+
					   '         height:"'+this.option.height+'",\n'+
					   '         controlBarVisibility:"always",\n'+
					   '         useH5Prism:'+this.option.useH5Prism + ',\n'+
					   '         useFlashPrism:'+this.option.useFlashPrism + ',\n'+
					   '         source:"'+this.option.source+'",\n'+
					   '         cover:"'+this.option.cover+'"';
	    if(this.option.skinLayout)
	    {
	    	var layout = JSON.stringify(this.option.skinLayout).replace(new RegExp(',{"name"',"gm") , ',\n                {"name"');
	    	template = template + ",\n" + '         skinLayout:' + layout;
	    }
        
					   
		template = template +'                  \n});\n'+
					   '  </script>\n'+
					   '</body>\n'
					   '</html>'

	    $('#settingCode')[0].innerText = template;
	}




	PlayerConfiguration.prototype.prepareOption = function()
	{
	    this.generateLayout();
	    if(this.videoType=='vod' || this.videoType == 'isLive')
	    {
	      this.option.source = getValue('source');
	      if(this.videoType == 'isLive')
	      {
	        this.option.isLive = true;
	      }
	      else
	      {
	      	this.option.isLive = false;
	      }
	    }
	    this.option.useH5Prism = this.playerType== 'html5' ? true: false;
	    this.option.useFlashPrism = this.playerType== 'flash' ? true: false;
	    var cover  = getValue('cover');
	    if(cover)
	      this.option.cover = cover;
	    var width  = getValue('width');
	    if(width)
	      this.option.width = width;
	    var height  = getValue('height');
	    if(height)
	      this.option.height = height;
	  return this.option;

	 }

    PlayerConfiguration.prototype.generateLayout = function()
	{
	    var length = this.skinLayout.length;
	    if(length>0)
	    {
	       this.option.skinLayout = [];
	    }
	    else
	    {
	      delete this.option.skinLayout;
	    }
	    for(var i=0;i<length;i++)
	    {
	      var item = this.skinLayout[i];
	      var index = item.indexOf('.');
	      if(index < 0)
	      {
	        this.option.skinLayout.push(defalutSkinLayout[item]);
	      }
	      else
	      {
	        var items = item.split('.');
	        var outerIndex = findItem(this.option.skinLayout,items[0]);
	        var outerItem;
	        if(outerIndex==-1)
	        {
	          outerItem = defalutSkinLayout[items[0]];
	          outerItem.children = [];
	          this.option.skinLayout.push(outerItem)
	        }
	        else
	        {
	          outerItem = this.option.skinLayout[outerIndex];
	        }
	        outerItem.children.push(defalutSkinLayout[items[1]]);
	      }
	    }
	}

  PlayerConfiguration.prototype.handle = function(obj,type)
  {
    var checked = $(obj).attr('checked');
    if(checked=="checked")
    {
      this.option[type] = true;
    }
    else
    {
      this.option[type] = false;
    }
  }

  PlayerConfiguration.prototype.handleLayout = function(obj,name)
  {
    var checked = $(obj).attr('checked');
    var index = findItem(this.skinLayout,name);
    if(checked=="checked" && index ==-1)
    {
      this.skinLayout.push(name);
      // showLayoutSetting(obj.name)
    }
    else
    {
      if(index>-1)
      {
        this.skinLayout.splice(index,1);
      }
    }
  }

  PlayerConfiguration.prototype.handleLayoutAlign = function()
  {
  	var align = $('#align').val();
  	$('.layout-skin-setting-tip').text(alignDesc[align]);
  }

  window.PlayerConfiguration = PlayerConfiguration;
})(window);