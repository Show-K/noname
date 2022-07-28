"use strict";
game.import("character",function(lib,game,ui,get,ai,_status){
	if(!lib.translateEnglish) lib.translateEnglish={};
	var sst_extra={
		name:"sst_extra",
		connect:true,
		characterSort:{
			sst_extra:{
				sst_civil_war:["sst_pyra_mythra","sst_9_volt_18_volt"],
				sst_response:["sst_claude","sst_geno","sst_duck_hunt","sst_paipai"],
				sst_laying_plans:["sst_ness","sst_chrom","sst_lucina","sst_robin","sst_bandana_waddle_dee"],
				sst_attack_by_stratagem:["sst_magolor","sst_roy"]
			}
		},
		character:{
			sst_pyra_mythra:["female","sst_light",3,["sst_xuanyi","sst_fuxin"],["type:support"]],
			sst_9_volt_18_volt:["male","sst_spirit",4,["sst_tanfen","sst_sutong"],["type:support"]],
			sst_claude:["male","sst_spirit",3,["sst_yunchou","sst_guimou"],[]],
			sst_geno:["male","sst_spirit",3,["sst_fuyuan","sst_xingjiang"],[]],
			sst_duck_hunt:["male","sst_light",3,["sst_gonglie","sst_weishou"],[]],
			sst_ness:["male","sst_light",4,["sst_wenxin"],[]],
			sst_chrom:["male","sst_light",4,["sst_niming","sst_cuifeng"],[]],
			sst_lucina:["female","sst_light",4,["sst_suxing","sst_shengyi"],[]],
			sst_robin:["none","sst_dark",3,["sst_zuozhan","sst_junce"],[]],
			sst_robin_male:["male","sst_dark",3,["sst_zuozhan","sst_junce"],["unseen"]],
			sst_robin_female:["female","sst_dark",3,["sst_zuozhan","sst_junce"],["unseen"]],
			sst_paipai:["male","sst_reality",4,["sst_aoshang","sst_lianxia"],[]],
			sst_bandana_waddle_dee:["male","sst_spirit",3,["sst_qiangdu","sst_mengchen"],[]],
			sst_magolor:["male","sst_spirit","1/1/5",["sst_miulu","sst_mofan"],[]],
			sst_roy:["male","sst_light",4,["sst_nuyan"],[]]
		},
		characterFilter:{},
		characterIntro:{
			/*
			"武将作者：Yumikohimi<br>\
			武将作者：mario not mary<br>\
			武将作者：Show-K<br>\
			武将作者：南柯<br>\
			武将作者：Axel_Zhai<br>\
			武将作者：小时节<br>\
			插图作者：未知<br>\
			<hr>\
			<br>\
			系列：（）<br>\
			首次登场：（）<br>\
			<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			<hr>\
			"
			*/
			sst_pyra_mythra:"武将作者：mario not mary<br>\
			插图作者：未知<br>\
			<hr>\
			1458. 焰（斗士）/Pyra(Fighter)/ホムラ（ファイター）<br>\
			系列：<ruby>异度神剑<rp>（</rp><rt>Xenoblade Chronicles</rt><rp>）</rp></ruby><br>\
			首次登场：<ruby>异度神剑2<rp>（</rp><rt>Xenoblade Chronicles 2</rt><rp>）</rp></ruby><br>\
			没错，不是莱克斯参战，而是天之圣杯参战了！——当然，莱克斯还是会在进场、炫耀和胜利画面中出现的。作为斗士的焰速度较慢，但伤害和击杀能力非常强。如有需要，她还能随时切换为光。立绘姿势来源于之前出的手办。<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			<hr>\
			1459. 光（斗士）/Mythra(Fighter)/ヒカリ（ファイター）<br>\
			系列：<ruby>异度神剑<rp>（</rp><rt>Xenoblade Chronicles</rt><rp>）</rp></ruby><br>\
			首次登场：<ruby>异度神剑2<rp>（</rp><rt>Xenoblade Chronicles 2</rt><rp>）</rp></ruby><br>\
			光的机动性和回场能力明显高于焰，但她的招式伤害较低。此外，在恰当的时机闪避还能触发“因果律预测”，创造反击机会。灵活运用天之圣杯不同形态的特点是取胜的关键。立绘姿势同样来源于之前出的手办。<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			<hr>\
			最终，少年遇到了少女。",
			sst_9_volt_18_volt:"武将作者：mario not mary、Show-K<br>\
			插图作者：未知<br>\
			<hr>\
			0733. 九伏特&十八伏特【九伏&十八伏】/9-Volt & 18-Volt/ナインボルト & エイティーンボルト<br>\
			系列：<ruby>瓦力欧<rp>（</rp><rt>Wario</rt><rp>）</rp></ruby><br>\
			首次登场：<br>\
			九伏特——<ruby>瓦力欧制造<rp>（</rp><rt>WarioWare, Inc.: Mega Microgame$!</rt><rp>）</rp></ruby><br>\
			十八伏特——<ruby>まわる 瓦力欧制造<rp>（</rp><rt>WarioWare: Twisted!</rt><rp>）</rp></ruby><br>\
			九伏特和十八伏特是最要好的朋友，目前正在钻石城市读小学——没错，看起来高大又成熟的十八伏特其实是个小学生。两人都喜欢玩游戏，其中九伏特会在晚上躲着妈妈偷偷玩。九伏特有个黄色的像素宠物蓬蓬，而十八伏特还很擅长rap，作为rapper的标志是老虎。<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			<hr>\
			此次推出的三噩梦命魂武将其三。",
			sst_claude:"武将作者：mario not mary、Yumikohimi<br>\
			插图作者：井塚大介<br>\
			——《TCG火焰纹章<ruby>0<rp>（</rp><rt>Cipher</rt><rp>）</rp></ruby>》<br>\
			<hr>\
			1386. 库罗德/Claude/クロード<br>\
			系列：<ruby>火焰纹章<rp>（</rp><rt>Fire Emblem</rt><rp>）</rp></ruby><br>\
			首次登场：<ruby>火焰纹章 风花雪月<rp>（</rp><rt>Fire Emblem: Three Houses</rt><rp>）</rp></ruby><br>\
			雷斯塔诸侯同盟盟主之孙、爵位继承人。喜欢策略，喜欢琢磨战术，为了达到目标可以不择手段。不论玩家选择的是贝雷特还是贝雷丝，他都会以“兄弟”称呼他的老师。<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			<hr>\
			芙朵拉内外都要变革，才能得以见到所愿之景……对吧？",
			sst_geno:"武将作者：Show-K<br>\
			插图作者：ハルノ＠マリオ垢<br>"+
			"——"+get.formatUrl("https://www.pixiv.net/artworks/88378758")+"<br>\
			<hr>\
			0104. Geno/ジーノ<br>\
			系列：<ruby>马力欧<rp>（</rp><rt>Mario</rt><rp>）</rp></ruby><br>\
			首次登场：<ruby>超级马力欧RPG<rp>（</rp><rt>Super Mario RPG: Legend of the Seven Stars</rt><rp>）</rp></ruby><br>\
			他是星之族的一员，本来没有身体，本名也是无法拼读的“♡♪!?”，所以选择附身在一个叫Geno的木偶上行动。他总是自信满满，擅长分析问题，战斗能力也相当出色。他会和马力欧、桃花公主、酷霸王和Mallow一起打败恶人。<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			<hr>\
			所以Square什么时候能把超级马力欧RPG交一下！",
			sst_duck_hunt:"武将作者：mario not mary<br>\
			插图作者：未知<br>\
			<hr>\
			0974. 打猎/Duck Hunt/ダックハント<br>\
			系列：<ruby>打猎<rp>（</rp><rt>Duck Hunt</rt><rp>）</rp></ruby><br>\
			首次登场：<ruby>打猎<rp>（</rp><rt>Duck Hunt</rt><rp>）</rp></ruby><br>\
			《打猎》是1984年的FC游戏，经常和FC捆绑销售。玩家需要用光枪打鸭子，而这只看起来有点欠揍的狗负责捡鸭子。在大乱斗中，狗和鸭子转而并肩作战。它们扔出的罐子和飞盘都会被某人射击从而移动或爆炸。让对手也尝尝被打猎的感觉吧！<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			<hr>\
			MNM再一次对应变大打出手了。",
			sst_ness:"武将作者：mario not mary<br>\
			插图作者：未知<br>\
			<hr>\
			0563. 奈斯/Ness/ネス<br>\
			系列：<ruby>地球冒险<rp>（</rp><rt>EarthBound</rt><rp>）</rp></ruby><br>\
			首次登场：<ruby>地球冒险<rp>（</rp><rt>EarthBound</rt><rp>）</rp></ruby><br>\
			奈斯在Eagleland国的Onett镇上长大，虽然看起来很普通，但却能使用意念能力。在原作中，他要对抗邪恶的Giygas，在大乱斗中，他的意念能力让大家感到难以对付。他的意念之雷如果击中自己就能向前突进，而意念之火击中对手后会持续燃烧。<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			<hr>\
			接着MNM开始对使命技大打出手了。",
			sst_chrom:"武将作者：mario not mary<br>\
			插图作者：北千里<br>\
			——《TCG火焰纹章<ruby>0<rp>（</rp><rt>Cipher</rt><rp>）</rp></ruby>》<br>\
			<hr>\
			0613. 库洛姆/Chrom/クロム<br>\
			系列：<ruby>火焰纹章<rp>（</rp><rt>Fire Emblem</rt><rp>）</rp></ruby><br>\
			首次登场：<ruby>火焰纹章 觉醒<rp>（</rp><rt>Fire Emblem Awakening</rt><rp>）</rp></ruby><br>\
			伊利斯圣王国的王子，英雄王马尔斯的后代。他率领一个保卫王国的自卫团。虽然他在训练时经常很莽以至于搞砸事情，但在战场上他是非常可靠的。他还会在鲁弗莱的最终必杀中出场。<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			<hr>\
			“运命改变了！”",
			sst_lucina:"武将作者：mario not mary<br>\
			插图作者：北千里<br>\
			——《TCG火焰纹章<ruby>0<rp>（</rp><rt>Cipher</rt><rp>）</rp></ruby>》<br>\
			<hr>\
			0611. 露琪娜/Lucina/ルキナ<br>\
			系列：<ruby>火焰纹章<rp>（</rp><rt>Fire Emblem</rt><rp>）</rp></ruby><br>\
			首次登场：<ruby>火焰纹章 觉醒<rp>（</rp><rt>Fire Emblem Awakening</rt><rp>）</rp></ruby><br>\
			库洛姆的女儿，伊利斯圣王国的公主，从悲惨的未来穿越到现在，阻止那种未来发生。她最初以女扮男装，自称马尔斯的形态出现。在大乱斗中，她的技能和马尔斯是一样的，但没有马尔斯那种剑尖与剑根的伤害差异。<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			<hr>\
			“为了终结这个世界的战争……我会努力的。”",
			sst_robin:"武将作者：mario not mary<br>\
			插图作者：未知<br>\
			<hr>\
			0616. 鲁弗莱（男性）/Robin (Male)/ルフレ（男性）<br>\
			系列：<ruby>火焰纹章<rp>（</rp><rt>Fire Emblem</rt><rp>）</rp></ruby><br>\
			首次登场：<ruby>火焰纹章 觉醒<rp>（</rp><rt>Fire Emblem Awakening</rt><rp>）</rp></ruby><br>\
			《火焰纹章：觉醒》中的主角，形象和性别可以自定义。根据选择的性别不同，能够攻略的对象也不一样——比如男鲁弗莱可以攻略露琪娜。在大乱斗中，鲁弗莱除了剑术之外，还会使用魔法。魔法书用完之后需要等待恢复。<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			<hr>\
			0617. 鲁弗莱（女性）/Robin (Female)/ルフレ（女性）<br>\
			系列：<ruby>火焰纹章<rp>（</rp><rt>Fire Emblem</rt><rp>）</rp></ruby><br>\
			首次登场：<ruby>火焰纹章 觉醒<rp>（</rp><rt>Fire Emblem Awakening</rt><rp>）</rp></ruby><br>\
			《火焰纹章：觉醒》中的主角，根据选择的性别不同，能够攻略的对象也不一样——比如女鲁弗莱可以攻略库洛姆。她可以切换青铜剑和雷剑进行攻击，在地面或空中输入快弹就可以切换为雷剑，但雷剑使用时也会像魔法书一样消耗耐久。<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			<hr>\
			然后MNM开始对智囊大打出手了。",
			sst_robin_male:"武将作者：mario not mary<br>\
			插图作者：未知<br>\
			<hr>\
			0616. 鲁弗莱（男性）/Robin (Male)/ルフレ（男性）<br>\
			系列：<ruby>火焰纹章<rp>（</rp><rt>Fire Emblem</rt><rp>）</rp></ruby><br>\
			首次登场：<ruby>火焰纹章 觉醒<rp>（</rp><rt>Fire Emblem Awakening</rt><rp>）</rp></ruby><br>\
			《火焰纹章：觉醒》中的主角，形象和性别可以自定义。根据选择的性别不同，能够攻略的对象也不一样——比如男鲁弗莱可以攻略露琪娜。在大乱斗中，鲁弗莱除了剑术之外，还会使用魔法。魔法书用完之后需要等待恢复。<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			<hr>\
			然后MNM开始对智囊大打出手了。（已选择男性）",
			sst_robin_female:"武将作者：mario not mary<br>\
			插图作者：未知<br>\
			<hr>\
			0617. 鲁弗莱（女性）/Robin (Female)/ルフレ（女性）<br>\
			系列：<ruby>火焰纹章<rp>（</rp><rt>Fire Emblem</rt><rp>）</rp></ruby><br>\
			首次登场：<ruby>火焰纹章 觉醒<rp>（</rp><rt>Fire Emblem Awakening</rt><rp>）</rp></ruby><br>\
			《火焰纹章：觉醒》中的主角，根据选择的性别不同，能够攻略的对象也不一样——比如女鲁弗莱可以攻略库洛姆。她可以切换青铜剑和雷剑进行攻击，在地面或空中输入快弹就可以切换为雷剑，但雷剑使用时也会像魔法书一样消耗耐久。<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			<hr>\
			然后MNM开始对智囊大打出手了。（已选择女性）",
			sst_paipai:"武将作者：mario not mary<br>\
			插图作者：无<br>\
			<hr>\
			R015. 派派\
			<hr>\
			然后MNM开始对指定牌不能响应大打出手了。",
			sst_bandana_waddle_dee:"武将作者：Show-K<br>\
			插图作者：Konna-Nani<br>"+
			"——"+get.formatUrl("https://www.pixiv.net/artworks/98930493")+"<br>\
			<hr>\
			0361. 头巾瓦豆鲁迪/Bandana Waddle Dee/バンダナワドルディ<br>\
			系列：<ruby>星之卡比<rp>（</rp><rt>Kirby</rt><rp>）</rp></ruby><br>\
			首次登场：<ruby>星之卡比 超级豪华版<rp>（</rp><rt>Kirby Super Star</rt><rp>）</rp></ruby><br>\
			头巾瓦豆鲁迪并非一个种群，而是指一位特定的戴蓝色头巾的瓦豆鲁迪。他是族群中的精英，使得一手好长枪，自《星之卡比：重返梦幻岛》以来多次作为可操作角色出场，可以用长枪使出暴风骤雨般的攻击。他直接效忠于帝帝帝大王，但同时也是卡比最好的朋友之一。目前他在星之卡比系列中的戏份地位堪比主角，仅次于卡比，帝帝帝大王，魅塔骑士。如果星之卡比系列还有人能够参战大乱斗，他将是最有竞争力的候选人之一。<br>\
			——封羽翎烈、鸿渐于陆，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			<hr>\
			一是为了蹭《星之卡比 探索发现》的热度，二是为了庆祝无名杀武将牌上牌机制变革，三是为了调侃卡比四人组中就剩他一直没有参战了。",
			sst_magolor:"武将作者：Show-K<br>\
			插图作者：邪仁寿<br>"+
			"——"+get.formatUrl("https://www.pixiv.net/artworks/22504365")+"<br>\
			<hr>\
			0355. 魔法洛亚/Magolor/マホロア<br>\
			系列：<ruby>星之卡比<rp>（</rp><rt>Kirby</rt><rp>）</rp></ruby><br>\
			首次登场：<ruby>星之卡比Wii<rp>（</rp><rt>Kirby\x27s Return to Dream Land</rt><rp>）</rp></ruby><br>\
			某一天，梦幻岛的上空出现了大洞，魔法洛亚的飞船从洞中摔到了地面。虽然飞船坏了，但是魔法洛亚本人并没有事。他拜托卡比和它的朋友们一起收集飞船的部件，并且一起穿越次元回到自己的家乡。一切看起来好像都很平常，直到……<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			<hr>\
			比起某个把“无双，万军取首”作为台词的武将，他这个大骗子属性简直可以忽略不计了。",
			sst_roy:"武将作者：mario not mary<br>\
			插图作者：山田孝太郎<br>\
			——《TCG火焰纹章<ruby>0<rp>（</rp><rt>Cipher</rt><rp>）</rp></ruby>》<br>\
			<hr>\
			0612. 罗伊/Roy (Fire Emblem)/ロイ（ファイアーエムブレム）<br>\
			系列：<ruby>火焰纹章<rp>（</rp><rt>Fire Emblem</rt><rp>）</rp></ruby><br>\
			首次登场：<ruby>任天堂明星大乱斗DX<rp>（</rp><rt>Super Smash Bros. Melee</rt><rp>）</rp></ruby><br>\
			在父亲突病、局势动荡时毅然担当起责任，率兵抵抗敌国入侵的贵族少年。小小年纪就擅长带兵打仗和取信于人。顺便，他是先在大乱斗中出场，随后原作才发售的存在。以及，他和酷霸王军团中的洛伊是同一个英文名。<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			<hr>\
			率先体验谋攻篇。"
		},
		characterTitle:{
			sst_pyra_mythra:"天之圣杯",
			sst_9_volt_18_volt:"电子幻界",
			sst_claude:"连系世界之王",
			sst_geno:"星路战士",
			sst_duck_hunt:"天敌共演",
			sst_ness:"踏梦寻音",
			sst_chrom:"英雄王的血裔",
			sst_lucina:"觉醒的圣王女",
			sst_robin:"卓越的战术师",
			sst_robin_male:"卓越的战术师",
			sst_robin_female:"卓越的战术师",
			sst_paipai:"针强砭弱",
			sst_bandana_waddle_dee:"瓦豆鲁迪的传说",
			sst_magolor:"心中的最佳盟友",
			sst_roy:"年轻的狮子"
		},
		skill:{
			//Civil War mode reference
			_guozhan_marks:{
				ruleSkill:true,
				enable:"phaseUse",
				filter:function(event,player){
					return player.hasMark("yexinjia_mark")||player.hasMark("xianqu_mark")||player.hasMark("yinyang_mark")||player.hasMark("zhulianbihe_mark");
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog("###国战标记###弃置一枚对应的标记，发动其对应的效果");
					},
					chooseControl:function(event,player){
						var list=[],bool=player.hasMark("yexinjia_mark");
						if(bool||player.hasMark("xianqu_mark")) list.push("先驱");
						if(bool||player.hasMark("zhulianbihe_mark")){
							list.push("珠联(摸牌)");
							if(event.filterCard({name:"tao",isCard:true},player,event)) list.push("珠联(桃)");
						}
						if(bool||player.hasMark("yinyang_mark")) list.push("阴阳鱼");
						list.push("cancel2");
						return list;
					},
					check:function(){
						var player=_status.event.player,bool=player.hasMark("yexinjia_mark");
						if((bool||player.hasMark("xianqu_mark"))&&(4-player.countCards("h"))>1) return "先驱";
						if(bool||player.hasMark("zhulianbihe_mark")){
							if(_status.event.getParent().filterCard({name:"tao",isCard:true},player,event)&&get.effect_use(player,{name:"tao"},player)>0) return "珠联(桃)";
							if(player.getHandcardLimit()-player.countCards("h")>1&&!game.hasPlayer(function(current){
								return current!=player&&current.isFriendOf(player)&&current.hp+current.countCards("h","shan")<=2;
							})) return "珠联(摸牌)";
						}
						if(player.hasMark("yinyang_mark")&&player.getHandcardLimit()-player.countCards("h")>0) return "阴阳鱼";
						return "cancel2";
					},
					backup:function(result,player){
						switch(result.control){
							case "珠联(桃)": return get.copy(lib.skill._zhulianbihe_mark_tao);
							case "珠联(摸牌)": return {
								content:function(){
								 player.draw(2);
								 player.removeMark(player.hasMark("zhulianbihe_mark")?"zhulianbihe_mark":"yexinjia_mark",1);
								},
							};
							case "阴阳鱼": return {
								content:function(){
									player.draw();
									player.removeMark(player.hasMark("yinyang_mark")?"yinyang_mark":"yexinjia_mark",1);
								}
							};
							case "先驱": return {content:lib.skill.xianqu_mark.content};
						}
					}
				},
				ai:{
					order:1,
					result:{
						player:1
					}
				}
			},
			xianqu_mark:{
				intro:{
					content:"◇出牌阶段，你可以弃置此标记，然后将手牌摸至四张并观看一名其他角色的一张武将牌。",
				},
				content:function(){
					"step 0"
					player.removeMark(player.hasMark("xianqu_mark")?"xianqu_mark":"yexinjia_mark",1);
					var num=4-player.countCards("h");
					if(num) player.draw(num);
					"step 1"
					if(game.hasPlayer(function(current){
						return current!=player&&current.isUnseen(2);
					})) player.chooseTarget("是否观看一名其他角色的一张暗置武将牌？",function(card,player,target){
						return target!=player&&target.isUnseen(2);
					}).set("ai",function(target){
						if(target.isUnseen()){
							var next=_status.event.player.getNext();
							if (target!=next) return 10;
							return 9;
						}
						return -get.attitude(_status.event.player,target);
					});
					else event.finish();
					"step 2"
					if(result.bool){
						event.target=result.targets[0];
						player.line(event.target,"green");
						var controls=[];
						if(event.target.isUnseen(0)) controls.push("主将");
						if(event.target.isUnseen(1)) controls.push("副将");
						if(controls.length>1){
							player.chooseControl(controls);
						}
						if(controls.length==0) event.finish();
					}
					else{
						player.removeSkill("xianqu_mark");
						event.finish();
					}
					"step 3"
					if(result.control){
						if(result.control=="主将"){
							player.viewCharacter(event.target,0);
						}
						else{
							player.viewCharacter(event.target,1);
						}
					}
					else if(target.isUnseen(0)){
						player.viewCharacter(event.target,0);
					}
					else{
						player.viewCharacter(event.target,1);
					}
				}
			},
			//Pyra/Mythra
			sst_xuanyi:{
				init:function(player,skill){
					if(typeof player.storage[skill]!="boolean") player.storage[skill]=false;
				},
				zhuanhuanji:true,
				enable:"phaseUse",
				usable:1,
				filter:function(event,player){
					if(!player.storage.sst_xuanyi){
						return game.hasPlayer(function(current){
							return player.canCompare(current);
						});
					}
					else{
						return player.canComparePlayer();
					}
				},
				filterTarget:function(card,player,target){
					if(!player.storage.sst_xuanyi){
						return player.canCompare(target);
					}
					else{
						return false;
					}
				},
				selectTarget:function(){
					var player=_status.event.player;
					if(!player.storage.sst_xuanyi){
						return 1;
					}
					else{
						return 0;
					}
				},
				delay:false,
				content:function(){
					"step 0"
					event[event.name]=player.storage[event.name]==true;
					player.changeZhuanhuanji(event.name);
					if(!event[event.name]){
						player.chooseToCompare(target);
					}
					else{
						player.chooseToComparePileTop();
					};
					"step 1"
					if(result.winner){
						event.winner=result.winner;
						event.winner.gain(event.winner==player?result.target:result.player,"gain2");
					}
					"step 2"
					if(event.winner!=player){
						var str="炫奕：对一名角色造成1点";
						str+=!event[event.name]?"火焰":"雷电";
						str+="伤害";
						player.chooseTarget(str,true).set("ai",function(target){
							var player=_status.event.player;
							var evt=_status.event.getParent();
							return get.damageEffect(target,player,player,!evt[evt.name]?"fire":"thunder");
						});
					}
					else{
						event.finish();
					}
					"step 3"
					if(result.targets&&result.targets.length){
						player.line(result.targets[0],!event[event.name]?"fire":"thunder");
						result.targets[0].damage(player,!event[event.name]?"fire":"thunder","nocard");
						player.addExpose(0.2);
					}
					else{
						event.finish();
					}
					"step 4"
					game.delayx();
				},
				ai:{
					order:5,
					expose:0.2,
					damage:true,
					result:{
						player:function(player,target){
							if(!player.storage.sst_xuanyi) return -get.attitude(player,target)/2;
							return 1;
						}
					}
				}
			},
			sst_fuxin:{
				skillAnimation:true,
				animationStr:"付心",
				animationColor:"fire",
				line:"fire",
				enable:"phaseUse",
				usable:1,
				filterTarget:function(card,player,target){
					return target!=player;
				},
				content:function(){
					"step 0"
					var name=player.name;
					var next=game.createEvent("removeCharacter");
					next.set("player",player);
					next.toRemove=name;
					next.setContent(function(){
						var name=player.name;
						var info=lib.character[name];
						if(!info) return;
						var to="shibing"+(info[0]=="male"?1:2)+info[1];
						game.log(player,"移除了武将牌","#b"+name);
						player.reinit(name,to,false);
						if(_status.characterlist) _status.characterlist.add(name);
					});
					"step 1"
					lib.inpile.push("sst_aegises");
					var card=game.createCard4("sst_aegises","","","",["sst_pyra_mythra"]);
					player.give(card,target,"give",true);
					target.addTempSkill("sst_fuxin_card",{player:"die"});
				},
				ai:{
					order:1,
					expose:0.2,
					damage:true,
					result:{
						target:function(player,target){
							if(player.hp<3) return 1;
						}
					}
				}
			},
			sst_fuxin_card:{
				trigger:{player:"phaseZhunbeiBegin"},
				filter:function(event,player){
					return !player.hasCard(function(card){
						return get.name(card)=="sst_aegises";
					},"hej");
				},
				frequent:true,
				content:function(){
					var card=get.cardPile("sst_aegises","field");
					if(card){
						player.gain(card,"gain2");
					}
				}
			},
			//9-Volt & 18-Volt
			sst_tanfen:{
				trigger:{player:"phaseDrawBegin1"},
				filter:function(event,player){
					return !event.numFixed&&player.countCards()<player.getHandcardLimit();
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseControl(lib.suit,"cancel2").set("ai",function(){
						var statistic={};
						for(var i=0;i<ui.cardPile.childNodes.length;i++){
							var suit=get.suit(ui.cardPile.childNodes[i]);
							if(!lib.suit.contains(suit)) continue;
							if(!statistic[suit]) statistic[suit]=0;
							statistic[suit]++;
						}
						var min=ui.cardPile.childNodes.length;
						var choice="cancel2";
						for(var i in statistic){
							if(!lib.suit.contains(i)) continue;
							if(statistic[i]<min){
								min=statistic[i];
								choice=i;
							}
						}
						return choice;
					}).set("prompt",get.prompt("sst_tanfen")).set("prompt2",get.translation("sst_tanfen_info"));
					"step 1"
					if(result.control!="cancel2"){
						player.logSkill("sst_tanfen");
						player.popup(result.control);
						game.log(player,"声明了","#y"+get.translation(result.control));
						event.control=result.control;
						trigger.changeToZero();
					}
					else{
						event.finish();
					}
					"step 2"
					event.card=get.cards()[0];
					game.cardsGotoOrdering(event.card);
					player.showCards(event.card,get.translation(player)+"发动了【"+get.skillTranslation(event.name,player)+"】（声明了"+get.translation(event.control)+"）",0.5);
					"step 3"
					player.gain(event.card);
					player.$gain2(event.card,true);
					if(get.suit(event.card)!=event.control) event.goto(2);
					"step 4"
					game.delayx();
				},
				ai:{
					threaten:3
				}
			},
			sst_sutong:{
				frequent:true,
				trigger:{player:"phaseJieshuBegin"},
				filter:function(event,player){
					if(player.hasMark("xianqu_mark")) return false;
					var history=player.getHistory("useCard");
					return history&&history.length<=player.countCards();
				},
				content:function(){
					player.addMark("xianqu_mark",1);
					game.delayx();
				}
			},
			//Claude
			sst_yunchou:{
				frequent:true,
				trigger:{player:"useCardBegin"},
				filter:function(event,player){
					return get.is.yingbian(event.card);
				},
				content:function(){
					var list=["yingbian_kongchao","yingbian_canqu","yingbian_fujia","yingbian_zhuzhan"];
					if(!trigger.card.cardtags) trigger.card.cardtags=[];
					trigger.card.cardtags.addArray(list);
				},
				contentx:function(){
					if(!_status.cardtag) _status.cardtag={};
					var list=["yingbian_kongchao","yingbian_canqu","yingbian_fujia","yingbian_zhuzhan"];
					for(var i=0;i<list.length;i++){
						if(!_status.cardtag[list[i]]) _status.cardtag[list[i]]=[];
					}
					for(var i=0;i<event.cardtag.length;i++){
						_status.cardtag[event.cardtag[i]].remove(card.cardid);
					}
					game.broadcastAll(function(cardtag){
						_status.cardtag=cardtag;
					},_status.cardtag);
				},
				ai:{
					effect:{
						player:function(card){
							if(get.is.yingbian(card)) return [1,1];
						}
					}
				}
			},
			sst_guimou:{
				usable:1,
				direct:true,
				trigger:{player:"useCardBegin"},
				filter:function(event,player){
					return get.is.yingbian(event.card);
				},
				content:function(){
					"step 0"
					var list=lib.card[get.name(trigger.card)].yingbian_tags.slice(0);
					for(var i=0;i<list.length;i++){
						list[i]="yingbian_"+list[i]+"_tag";
					}
					player.chooseControl(list,"cancel2").set("ai",function(){
						var choices=["yingbian_all_tag","yingbian_damage_tag","yingbian_hit_tag","yingbian_draw_tag","yingbian_gain_tag","yingbian_add_tag","yingbian_remove_tag"];
						var list=_status.event.controls;
						var card=_status.event.card;
						for(var i=0;i<choices.length;i++){
							if(_status.cardtag&&_status.cardtag[choices[i].slice(0,-4)]&&_status.cardtag[choices[i].slice(0,-4)].contains(card.cardid)) return "cancel2";
							if(list.contains(choices[i])) return choices[i];
						}
						return "cancel2";
					}).set("card",trigger.card).set("prompt",get.prompt("sst_guimou")).set("prompt2",get.translation("sst_guimou_info"));
					"step 1"
					if(result.control&&result.control!="cancel2"){
						player.logSkill("sst_guimou");
						if(!_status.cardtag) _status.cardtag={};
						var list=["yingbian_add","yingbian_remove","yingbian_draw","yingbian_all","yingbian_hit","yingbian_gain","yingbian_damage"];
						var cardtag=[];
						for(var i=0;i<list.length;i++){
							if(!_status.cardtag[list[i]]) _status.cardtag[list[i]]=[];
							if(_status.cardtag[list[i]].contains(trigger.card.cardid)){
								_status.cardtag[list[i]].remove(trigger.card.cardid);
								cardtag.push(list[i]);
							}
						}
						_status.cardtag[result.control.slice(0,-4)].add(trigger.card.cardid);
						game.broadcastAll(function(cardtag){
							_status.cardtag=cardtag;
						},_status.cardtag);
						player.popup(result.control,"wood");
						game.log(player,"指定此牌的应变效果为","#y"+result.control);
						var evt=event.getParent("useCard");
						if(evt&&evt.name=="useCard"&&!evt.sst_guimou){
							evt.sst_guimou=true;
							var next=game.createEvent("sst_guimou_clear");
							event.next.remove(next);
							evt.after.push(next);
							next.player=player;
							next.card=trigger.card;
							next.set("cardtag",cardtag);
							next.cardtag_temp=result.control.slice(0,-4);
							next.setContent(lib.skill.sst_guimou.contentx);
						}
					}
					else{
						player.storage.counttrigger[event.name]--;
					}
				},
				contentx:function(){
					if(!_status.cardtag) _status.cardtag={};
					var list=["yingbian_add","yingbian_remove","yingbian_draw","yingbian_all","yingbian_hit","yingbian_gain","yingbian_damage"];
					for(var i=0;i<list.length;i++){
						if(!_status.cardtag[list[i]]) _status.cardtag[list[i]]=[];
					}
					_status.cardtag[event.cardtag_temp].remove(card.cardid);
					for(var i=0;i<event.cardtag.length;i++){
						_status.cardtag[event.cardtag[i]].add(card.cardid);
					}
					game.broadcastAll(function(cardtag){
						_status.cardtag=cardtag;
					},_status.cardtag);
				}
			},
			//Geno
			sst_fuyuan:{
				frequent:true,
				trigger:{global:"roundStart"},
				content:function(){
					"step 0"
					event.pileTop=get.cards()[0];
					ui.cardPile.insertBefore(event.pileTop.fix(),ui.cardPile.firstChild);
					player.showCards(event.pileTop,get.translation(player)+"发动了【"+get.skillTranslation(event.name,player)+"】");
					"step 1"
					player.chooseCardTarget({
						position:"he",
						ai1:function(card){
							var pileTop=_status.event.getParent().pileTop;
							var num=5.5-get.value(card);
							if(get.number(card)==get.number(pileTop)&&game.hasPlayer(function(current){
								var skills=current.getSkills(null,null,false);
								for(var i=0;i<skills.length;i++){
									var info=get.info(skills[i]);
									if(info.limited&&current.awakenedSkills.contains(skills[i])) return true;
								}
								return false;
							})) num+=3;
							return num;
						},
						ai2:function(target){
							var att=get.sgnAttitude(player,target);
							var skills=target.getSkills(null,null,false);
							for(var i=0;i<skills.length;i++){
								var info=get.info(skills[i]);
								if(info.limited&&target.awakenedSkills.contains(skills[i])){
									att*=2;
									break;
								}
							}
							return att;
						},
						prompt:"复愿：你可以重铸一张牌，令一名角色下次造成伤害后再次结算此伤害，然后若与"+get.translation(event.pileTop)+"的点数相同，你令其一个限定技视为未发动过"
					});
					"step 2"
					if(result.cards&&result.cards.length){
						player.loseToDiscardpile(result.cards).set("skill","_chongzhu");
						player.draw();
						if(get.number(result.cards[0])==get.number(event.pileTop)) event.equal=true;
						if(result.targets&&result.targets.length){
							event.target=result.targets[0];
							player.line(event.target,"green");
							if(event.target!=player) player.addExpose(0.2);
						}
						else{
							event.finish();
						}
					}
					else{
						event.finish();
					}
					"step 3"
					event.target.addSkill("sst_fuyuan_effect");
					event.target.addMark("sst_fuyuan_effect",1,false);
					game.log(player,"令",event.target,"下次造成伤害后再次结算此伤害");
					game.delayx();
					if(!event.equal) event.finish();
					"step 4"
					var list=[];
					var skills=event.target.getSkills(null,null,false);
					for(var i=0;i<skills.length;i++){
						var info=get.info(skills[i]);
						if(info.limited&&event.target.awakenedSkills.contains(skills[i])) list.push(skills[i]);
					}
					if(list.length){
						player.chooseControl(list).set("prompt","复愿：选择一个限定技恢复之");
					}
					else{
						event.finish();
					}
					"step 5"
					if(result.control){
						event.target.restoreSkill(result.control);
						event.target.popup(result.control,"fire");
						game.log(player,"恢复了技能","#g【"+get.translation(result.control)+"】");
						game.delayx();
					}
				}
			},
			sst_fuyuan_effect:{
				charlotte:true,
				forced:true,
				intro:{
					content:"你下&次造成伤害后再次结算此伤害"
				},
				onremove:true,
				trigger:{source:"damageSource"},
				filter:function(event,player){
					return event.player.isIn();
				},
				logTarget:"player",
				content:function(){
					player.removeMark("sst_fuyuan_effect",1,false);
					if(!player.hasMark("sst_fuyuan_effect")) player.removeSkill("sst_fuyuan_effect");
					var next=game.createEvent("damage");
					next.set("player",trigger.player);
					if(typeof trigger.cards!="undefined") next.set("cards",trigger.cards);
					if(typeof trigger.card!="undefined") next.set("card",trigger.card);
					if(typeof trigger.num!="undefined") next.set("num",trigger.num);
					if(typeof trigger.source!="undefined") next.set("source",trigger.source);
					if(typeof trigger._triggered!="undefined") next.set("_triggered",trigger._triggered);
					if(typeof trigger.notrigger!="undefined") next.set("notrigger",trigger.notrigger);
					if(typeof trigger.nature!="undefined") next.set("nature",trigger.nature);
					next.setContent("damage");
					next.set("filterStop",function(){
						if(this.source&&this.source.isDead()) delete this.source;
						if(this.num<=0){
							delete this.filterStop;
							this.trigger("damageZero");
							this.finish();
							this._triggered=null;
							return true;
						}
					});
				}
			},
			sst_xingjiang:{
				unique:true,
				mark:true,
				limited:true,
				skillAnimation:true,
				animationStr:"星降",
				animationColor:"metal",
				intro:{
					content:"limited"
				},
				group:"sst_xingjiang2",
				enable:"phaseUse",
				filterCard:true,
				selectCard:[1,Infinity],
				position:"he",
				content:function(){
					"step 0"
					player.awakenSkill("sst_xingjiang");
					event.toUse=get.cards(cards.length*2);
					game.cardsGotoOrdering(event.toUse);
					player.showCards(event.toUse,get.translation(player)+"发动了【"+get.skillTranslation(event.name,player)+"】");
					"step 1"
					if(event.toUse.length){
						player.chooseCardButton("星降：你可以使用"+get.translation(event.toUse),event.toUse).set("filterButton",function(button){
							return _status.event.player.hasUseTarget(button.link);
						}).set("ai",function(button){
							return _status.event.player.getUseValue(button.link);
						});
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.links&&result.links.length){
						event.toUse.removeArray(result.links);
						player.addTempSkill("sst_xingjiang2");
						player.chooseUseTarget(result.links[0],"nodistance",false);
						event.goto(1);
					}
				},
				ai:{
					order:1,
					result:{
						player:function(player){
							if(!game.hasPlayer(function(current){
								return game.checkMod(null,player,current,"unchanged","playerEnabled",player)!=false;
							})) return 0;
							return 1;
						}
					}
				}
			},
			sst_xingjiang2:{
				charlotte:true,
				trigger:{player:"useCard1"},
				forced:true,
				popup:false,
				filter:function(event){
					return event.getParent(2).name=="sst_xingjiang"&&!event.card.yingbian&&get.is.yingbian(event.card);
				},
				content:function(){
					trigger.card.yingbian=true;
					var info=get.info(trigger.card);
					if(info&&info.yingbian) info.yingbian(trigger);
					player.addTempSkill("yingbian_changeTarget");
				}
			},
			//Duck Hunt
			sst_gonglie:{
				frequent:true,
				trigger:{player:"useCardBegin"},
				filter:function(event,player){
					return get.name(event.card)=="sha"&&!(get.cardtag(event.card,"yingbian_zhuzhan")&&get.cardtag(event.card,"yingbian_add"));
				},
				content:function(){
					if(!trigger.card.cardtags) trigger.card.cardtags=[];
					trigger.card.cardtags.add("yingbian_zhuzhan");
					trigger.card.cardtags.add("yingbian_add");
					//game.log(get.cardtag(trigger.card,"yingbian_zhuzhan"));
					player.addTempSkill("sst_gonglie2");
					if(!trigger.sst_gonglie){
						trigger.set("sst_gonglie",[true,null]);
						var next=game.createEvent("sst_gonglie_clear");
						event.next.remove(next);
						trigger.after.push(next);
						next.set("player",player);
						next.set("card",trigger.card);
						next.set("sst_gonglie",trigger.sst_gonglie);
						next.setContent(lib.skill.sst_gonglie.contentx);
					}
				},
				contentx:function(){
					"step 0"
					if(get.itemtype(event.sst_gonglie[1])=="player"&&game.cardCausedDamage(card)){
						event.targets=game.filterPlayer(function(current){
							return current.hasHistory("damage",function(evt){
								return evt.card==card;
							})
						});
						if(event.targets&&event.targets.length){
							event.num=0;
							event.sst_gonglie[1].line(event.targets,"green");
						}
						else{
							event.finish();
						}
					}
					else{
						event.finish();
					}
					"step 1"
					event.sst_gonglie[1].gainPlayerCard("共猎：你可以获得"+get.translation(event.targets[event.num])+"一张牌",event.targets[event.num],"he");
					"step 2"
					event.num++;
					if(event.num<event.target.length) event.goto(1);
				}
			},
			sst_gonglie2:{
				charlotte:true,
				superCharlotte:true,
				forced:true,
				silent:true,
				trigger:{player:"_yingbianAfter"},
				content:function(){
					var evt=trigger.getParent();
					if(evt.sst_gonglie&&evt.sst_gonglie[0]&&trigger.zhuzhanresult) evt.sst_gonglie[1]=trigger.zhuzhanresult;
				}
			},
			sst_weishou:{
				global:"sst_weishou2"
			},
			sst_weishou2:{
				direct:true,
				trigger:{player:"discardBegin"},
				filter:function(event,player){
					return game.hasPlayer(function(current){
						if(current==player) return false;
						if(!current.hasSkill("sst_weishou")) return false;
						for(var i=0;i<event.cards.length;i++){
							if(lib.filter.canBeGained(event.cards[i],current,player)) return true;
						}
					})&&event.getParent().name=="_yingbian";
				},
				content:function(){
					"step 0"
					var targets=game.filterPlayer(function(current){
						if(current==player) return false;
						if(!current.hasSkill("sst_weishou")) return false;
						for(var i=0;i<trigger.cards.length;i++){
							if(lib.filter.canBeGained(trigger.cards[i],current,player)) return true;
						}
					});
					var str="你可以改为将"+get.translation(trigger.cards)+"交给"+get.translation(targets);
					if(targets.length>1) str+="其中的一人";
					player.chooseTarget(get.prompt("sst_weishou2"),str,function(card,player,target){
						return _status.event.targetsx.contains(target);
					}).set("ai",function(target){
						var cards=_status.event.cardsx;
						var val=0;
						for(var i=0;i<cards.length;i++){
							val+=get.value(cards[i]);
						}
						return Math.cbrt(get.attitude(_status.event.player,target)*val);
					}).set("cardsx",trigger.cards).set("targetsx",targets);
					"step 1"
					if(result.targets&&result.targets.length){
						player.logSkill("sst_weishou2",result.targets);
						trigger.cancel();
						var cards=trigger.cards.filter(function(card){
							return lib.filter.canBeGained(card,result.targets[0],player);
						});
						player.give(cards,result.targets[0],true);
					}
				}
			},
			//Ness
			sst_wenxin:{
				init:function(player){
					player.storage.sst_wenxin_record=[];
				},
				dutySkill:true,
				direct:true,
				trigger:{player:"phaseJieshuBegin"},
				filter:function(event,player){
					return player.countCards("h",function(card){
						return lib.filter.cardDiscardable(card,player);
					})&&game.countPlayer(function(current){
						return current.countCards("ej",function(card){
							if(player.storage.sst_wenxin_alter) return get.color(card)=="red";
							return true;
						});
					});
				},
				content:function(){
					"step 0"
					var num=game.countPlayer(function(current){
						if(player.storage.sst_wenxin_alter) current.countCards("ej",function(card){
							return get.color(card)=="red";
						});
						return current.countCards("ej");
					});
					player.chooseToDiscard(get.prompt("sst_wenxin"),get.skillInfoTranslation("sst_wenxin",player),[1,num]).set("ai",function(card){
						var selected=(ui.selected.cards&&ui.selected.cards.length)?ui.selected.cards.length:0;
						var num=game.countPlayer(function(current){
							return current.countCards("ej",function(card){
								if(_status.event.player.storage.sst_wenxin_alter&&get.color(card)!="red") return false;
								var fieldValue=function(card){
									var player=get.owner(card);
									if(!player) player=_status.event.player;
									if(player.getCards("j").contains(card)){
										var efff=get.effect(player,{
											name:card.viewAs||card.name,
											cards:[card],
										},player,player);
										if(efff>0) return 0.5;
										if(efff==0) return 0;
										return -1.5;
									}
									if(player.getCards("e").contains(card)){
										var evalue=get.value(card,player);
										if(player.hasSkillTag("noe")){
											if(evalue>=7){
												return evalue/6;
											}
											return evalue/10;
										}
										return evalue/3;
									}
									if(player.hasSkillTag("noh")) return 0.1;
									var nh=player.countCards("h");
									switch(nh){
										case 1:return 2;
										case 2:return 1.6;
										case 3:return 1;
										case 4:return 0.8;
										case 5:return 0.6;
										default:return 0.4;
									}
								};
								var val=fieldValue(card);
								if(get.attitude(_status.event.player,get.owner(card))>0) return -val>0;
								return val>0;
							});
						});
						if(selected>=num) return 0;
						var val=5-get.useful(card);
						if(get.color(card)=="black") val+=3;
						return val;
					}).set("logSkill","sst_wenxin");
					"step 1"
					if(result.cards&&result.cards.length){
						event.num=result.cards.length;
						event.black=0;
						for(var i=0;i<result.cards.length;i++){
							if(get.color(result.cards[i])=="black") event.black++;
						}
					}
					else{
						event.finish();
					}
					"step 2"
					event.num--;
					if(event.num>=0){
						player.chooseTarget("问心：弃置场上的一张"+(player.storage.sst_wenxin_alter?"红色":"")+"牌（剩余"+get.cnNumber(event.num)+"张）",true,function(card,player,target){
							return target.countDiscardableCards(player,"ej",function(card){
								if(player.storage.sst_wenxin_alter) return get.color(card)=="red";
								return true;
							});
						}).set("ai",function(target){
							var guohe=function(player,target){
								var att=get.attitude(player,target);
								if(att>0){
									if(target.countCards("j",function(card){
										if(player.storage.sst_wenxin_alter&&get.color(card)!="red") return false;
										var cardj=card.viewAs?{name:card.viewAs}:card;
										return get.effect(target,cardj,target,player)<0;
									})>0) return 3;
									var baiyin=target.getEquip("baiyin");
									if(baiyin&&(player.storage.sst_wenxin_alter?get.color(baiyin)=="red":true)&&target.isDamaged()&&
										get.recoverEffect(target,player,player)>0){
										if(target.hp==1&&!target.hujia) return 1.6;
									}
									if(target.countCards("e",function(card){
										if(player.storage.sst_wenxin_alter&&get.color(card)!="red") return false;
										if(get.position(card)=="e") return get.value(card,target)<0;
									})>0) return 1;
								}
								var es=target.getCards("e",function(card){
									if(player.storage.sst_wenxin_alter) return get.color(card)=="red";
									return true;
								});
								var noe=(es.length==0||target.hasSkillTag("noe"));
								var noe2=(es.filter(function(esx){
									return get.value(esx,target)>0;
								}).length==0);
								if(noe||noe2) return 0;
								if(att<=0&&!target.countCards("e",function(card){
									if(player.storage.sst_wenxin_alter) return get.color(card)=="red";
									return true;
								})) return 1.5;
								return -1.5;
							};
							var player=_status.event.player;
							var att=get.attitude(player,target);
							if(att<0){
								att=-Math.sqrt(-att);
							}
							else{
								att=Math.sqrt(att);
							}
							return att*guohe(player,target);
						});
					}
					else{
						event.goto(5);
					}
					"step 3"
					if(result.targets&&result.targets.length){
						player.line(result.targets,"green");
						player.discardPlayerCard("问心：弃置"+get.translation(result.targets[0])+"场上一张"+(player.storage.sst_wenxin_alter?"红色":"")+"牌",result.targets[0],"ej",true).set("filterButton",function(button){
							if(_status.event.player.storage.sst_wenxin_alter) return get.color(button.link)=="red";
							return true;
						});
					}
					"step 4"
					if(result.cards&&result.cards.length&&get.color(result.cards[0])=="black") event.black++;
					event.goto(2);
					"step 5"
					player.showHandcards();
					if(!player.storage.sst_wenxin&&player.countCards()&&!player.countCards("h",function(card){
						return get.color(card)!="red";
					})) event.red=true;
					"step 6"
					if(event.black) player.draw(event.black);
					if(player.storage.sst_wenxin) event.finish();
					"step 7"
					player.storage.sst_wenxin_record.push(event.red?true:false);
					var goon=true;
					for(var i=0;i<player.storage.sst_wenxin_record.length;i++){
						if(player.storage.sst_wenxin_record[i]){
							for(var j=i+1;j<player.storage.sst_wenxin_record.length;j++){
								if(player.storage.sst_wenxin_record[j]){
									event.trigger("dutySkillAchieve");
									goon=false;
									break;
								}
							}
						}
						if(!goon) break;
					}
					if(goon&&player.storage.sst_wenxin_record.length>=3) event.trigger("dutySkillFail");
				},
				ai:{
					expose:0.1
				},
				group:["sst_wenxin_achieve","sst_wenxin_fail"],
				subSkill:{
					achieve:{
						forced:true,
						trigger:{player:"dutySkillAchieve"},
						filter:function(event,player){
							return event.name=="sst_wenxin";
						},
						skillAnimation:true,
						animationColor:"fire",
						content:function(){
							"step 0"
							game.log(player,"成功完成使命");
							//player.awakenSkill("sst_wenxin");
							//player.addSkill("sst_wenxin_alter");
							player.storage.sst_wenxin=true;
							player.addSkill("sst_wenxin_effect");
							game.delayx();
						}
					},
					fail:{
						forced:true,
						trigger:{player:"dutySkillFail"},
						filter:function(event,player){
							return event.name=="sst_wenxin";
						},
						content:function(){
							"step 0"
							game.log(player,"使命失败");
							//player.awakenSkill("sst_wenxin");
							//player.addSkill("sst_wenxin_alter");
							player.storage.sst_wenxin=true;
							player.storage.sst_wenxin_alter=true;
							game.delayx();
						}
					}
				}
			},
			sst_wenxin_effect:{
				charlotte:true,
				mark:true,
				intro:{
					content:"你取消弃牌阶段"
				},
				firstDo:true,
				forced:true,
				popup:false,
				trigger:{player:"phaseDiscardBefore"},
				content:function(){
					trigger.cancel();
				}
			},
			//Chrom
			sst_niming:{
				trigger:{global:"judge"},
				check:function(event,player){
					var result=event.judge(event.player.judging[0]);
					var attitude=get.attitude(player,event.player);
					if(attitude==0||result==0) return false;
					if(attitude>0){
						return result<0;
					}
					else{
						return result>0;
					}
				},
				content:function(){
					"step 0"
					var card=get.cards()[0];
					event.card=card;
					game.cardsGotoOrdering(card).relatedEvent=trigger;
					"step 1"
					player.$throw(card);
					card.clone.classList.add("thrownhighlight");
					if(trigger.player.judging[0].clone){
						trigger.player.judging[0].clone.classList.remove("thrownhighlight");
						game.addVideo("deletenode",player,get.cardsInfo([trigger.player.judging[0].clone]));
					}
					game.cardsDiscard(trigger.player.judging[0]);
					trigger.player.judging[0]=card;
					game.log(trigger.player,"的判定牌改为",card);
					game.delay(2);
				},
				ai:{
					expose:0.1,
					rejudge:true,
					tag:{
						rejudge:1
					}
				}
			},
			sst_cuifeng:{
				trigger:{player:"phaseZhunbeiBegin"},
				check:function(event,player){
					return game.hasPlayer(function(current){
						return player.canUse({name:"sha"},current)&&get.effect(current,{name:"sha"},player,player)>0;
					});
				},
				content:function(){
					"step 0"
					player.judge(function(card){
						var color=get.color(card);
						switch(color){
							case "black":return -1;
							case "red":return 2;
							default:return 0;
						}
					}).set("judge2",()=>true);
					"step 1"
					if(game.hasPlayer(function(current){
						return player.canUse({name:"sha",cards:[result.card]},current);
					})) player.chooseUseTarget({name:"sha"},[result.card],false,true).set("viewAs",true).set("ai",(get.color(result.card)=="red"||(get.color(result.card)=="black"&&player.hp>1))?get.effect_use:()=>0);
				},
				ai:{
					threaten:1.5
				},
				group:"sst_cuifeng2"
			},
			sst_cuifeng2:{
				trigger:{player:"useCard1"},
				forced:true,
				popup:false,
				filter:function(event,player){
					return event.getParent(2).name=="sst_cuifeng";
				},
				content:function(){
					"step 0"
					if(get.color(trigger.card)=="black"){
						var list=[],list2=[
							"弃置两张牌",
							"受到1点伤害令此【杀】伤害值基数+1",
							"背水！令此【杀】不可被响应，然后依次执行上述所有选项",
						];
						if(player.countCards("he",function(card){
							return lib.filter.cardDiscardable(card,player);
						})>1) list.push("选项一");
						list.push("选项二");
						list.push("背水！");
						player.chooseControl(list).set("choiceList",list2).set("ai",function(){
							var player=_status.event.player;
							if(player.hp>1){
								var evt=_status.event.getTrigger();
								if(evt.targets&&evt.targets.length&&evt.targets[0].mayHaveShan()) return "背水！";
								return "选项二";
							}
							return 0;
						});
					}
					else if(get.color(trigger.card)=="red"){
						if(player.getDamagedHp()) player.recover();
						event.finish();
					}
					else{
						event.finish();
					}
					"step 1"
					if(typeof result.control=="string"){
						event.control=result.control;
						if(event.control=="背水！") trigger.directHit.addArray(game.players);
					}
					else{
						event.finish();
					}
					"step 2"
					if(event.control=="选项一"||event.control=="背水！") player.chooseToDiscard("摧锋：弃置两张牌",2,"he",true);
					"step 3"
					if(event.control=="选项二"||event.control=="背水！"){
						player.damage("nosource","nocard");
						if(typeof trigger.baseDamage!="number") trigger.baseDamage=1;
						trigger.baseDamage++;
					}
				},
				ai:{
					damageBonus:true
				}
			},
			//Lucina
			sst_suxing:{
				init:function(player){
					player.addSkill("sst_suxing2");
				},
				trigger:{global:"roundStart"},
				forced:true,
				filter:function(event,player){
					return typeof player.storage.sst_suxing_enable=="number"&&game.roundNumber-player.storage.sst_suxing_enable==1;
				},
				content:function(){
					player.storage.sst_suxing=true;
					var next=player.phase("sst_suxing");
					event.next.remove(next);
					trigger.next.push(next);
				}
			},
			sst_suxing2:{
				charlotte:true,
				superCharlotte:true,
				firstDo:true,
				trigger:{global:"loseAfter"},
				filter:function(event,player){
					if(event.player.countCards("h")) return false;
					return event.hs&&event.hs.length>0;
				},
				silent:true,
				content:function(){
					player.storage.sst_suxing_enable=game.roundNumber;
				}
			},
			sst_shengyi:{
				skillAnimation:true,
				animationColor:"water",
				juexingji:true,
				unique:true,
				derivation:["sst_hanmang","sst_cuifeng"],
				trigger:{player:"phaseJieshuBegin"},
				filter:function(event,player){
					return player.storage.sst_suxing&&!player.storage.sst_shengyi;
				},
				forced:true,
				//priority:3,
				content:function(){
					player.loseMaxHp();
					player.addSkillLog("sst_hanmang");
					player.addSkillLog("sst_cuifeng");
					player.awakenSkill("sst_shengyi");
					player.storage.sst_shengyi=true;
				}
			},
			//Robin
			sst_zuozhan:{
				preHidden:true,
				trigger:{global:"damageBegin4"},
				filter:function(event,player){
					return !event.player.hasSkill("sst_junce");
				},
				logTarget:"player",
				check:function(event,player){
					return get.attitude(player,event.player)>0;
				},
				content:function(){
					"step 0"
					var players=game.filterPlayer(function(current){
						return current.hasSkill("sst_junce");
					});
					players.sortBySeat(_status.currentPhase);
					for(var i=0;i<players.length;i++){
						player.line(players[i],"green");
						players[i].removeSkill("sst_junce");
						game.log(players[i],"失去了技能","#g【军策】");
						players[i].draw(2);
					}
					"step 1"
					trigger.player.addSkillLog("sst_junce");
				},
				ai:{
					expose:0.2,
					maixie:true,
					maixie_hp:true
				}
			},
			sst_junce:{
				unique:true,
				direct:true,
				trigger:{player:"damageEnd"},
				content:function(){
					"step 0"
					player.chooseControl("选项一","选项二","背水！","cancel2").set("choiceList",[
						"摸一张牌",
						"获得一张额外智囊",
						"背水！弃置所有手牌，然后依次执行上述所有选项",
					]).set("ai",function(){
						var player=_status.event.player;
						var cards=player.getCards("h",function(card){
							return lib.filter.cardDiscardable(card,player);
						});
						var val=0;
						for(var i=0;i<cards.length;i++){
							val+=get.useful(cards[i]);
						}
						if(val<7) return 2;
						return Math.round(Math.random());
					});
					"step 1"
					if(result.control!="cancel2"){
						player.logSkill("sst_junce");
						event.control=result.control;
						if(event.control=="背水！") player.discard(player.getCards("h",function(card){
							return lib.filter.cardDiscardable(card,player);
						}));
					}
					else{
						event.finish();
					}
					"step 2"
					if(event.control=="选项一"||event.control=="背水！") player.draw();
					"step 3"
					if(event.control=="选项二"||event.control=="背水！"){
						var name=get.zhinangs().randomGet();
						/*
						var card=ui.create.card(ui.special);
						card.storage.vanish=true;
						card=card.init([lib.suit.randomGet(),Math.ceil(Math.random()*13),name,lib.card[name].cardnature,["zhinang_tricks"]]);
						*/
						var card=game.createCard3(name,null,null,null,["zhinang_tricks"]);
						player.gain(card,"gain2");
					}
				},
				ai:{
					threaten:function(){
						if(game.hasPlayer(function(current){
							return current.hasSkill("sst_zuozhan");
						})) return 2;
						return 1;
					},
					maixie:true,
					maixie_hp:true
				}
			},
			//派派
			sst_aoshang:{
				init:function(player){
					if(!_status.sst_aoshang){
						_status.sst_aoshang=true;
						game.broadcastAll(function(){
							for(var i=0;i<lib.inpile.length;i++){
								var info=lib.card[lib.inpile[i]];
								if(!info.backup_yingbian_prompt){
									info.backup_yingbian_prompt=function(card){
										var str="";
										if(get.cardtag(card,"yingbian_gain")){
											str+="当你声明使用此牌时，你获得此牌响应的目标牌";
										}
										if(get.cardtag(card,"yingbian_hit")){
											if(str.length) str+="；";
											str+="此牌不可被响应";
										}
										if(get.cardtag(card,"yingbian_all")){
											str+="此牌的效果改为依次执行所有选项";
										}
										if(get.cardtag(card,"yingbian_draw")){
											if(str.length) str+="；";
											str+="当你声明使用此牌时，你摸一张牌";
										}
										if(get.cardtag(card,"yingbian_remove")){
											if(str.length) str+="；";
											str+="当你使用此牌选择目标后，你可为此牌减少一个目标";
										}
										if(get.cardtag(card,"yingbian_add")){
											if(str.length) str+="；";
											str+="当你使用此牌选择目标后，你可为此牌增加一个目标";
										}
										return str;
									};
									info.yingbian_prompt=function(card){
										var str="";
										if(get.cardtag(card,"yingbian_recover")){
											str+="当你声明使用此牌时，你回复1点体力";
										}
										var str2=this.backup_yingbian_prompt.apply(this,arguments);
										if(str.length&&str2.length) str+="；";
										return str+str2;
									}
								}
								else if(info.yingbian_prompt){
									info.sst_aoshang_yingbian_prompt=info.yingbian_prompt;
									info.yingbian_prompt=function(card){
										var str="";
										if(get.cardtag(card,"yingbian_recover")){
											str+="当你声明使用此牌时，你回复1点体力";
										}
										var str2=this.sst_aoshang_yingbian_prompt.apply(this,arguments);
										if(str.length&&str2.length) str+="；";
										return str+str2;
									}
								}
								if(!info.backup_yingbian){
									info.backup_yingbian=function(event){
										var card=event.card;
										if(get.cardtag(card,"yingbian_gain")){
											var cardx=event.respondTo;
											if(cardx&&cardx[1]&&cardx[1].cards&&cardx[1].cards.filterInD("od").length) event.player.gain(cardx[1].cards.filterInD("od"),"gain2","log");
										}
										if(get.cardtag(card,"yingbian_hit")){
											event.directHit.addArray(game.players);
											game.log(card,"不可被响应");
										}
										if(get.cardtag(card,"yingbian_all")){
											card.yingbian_all=true;
											game.log(card,"执行所有选项");
										}
										if(get.cardtag(card,"yingbian_draw")){
											event.player.draw();
										}
										if(get.cardtag(card,"yingbian_remove")){
											event.yingbian_removeTarget=true;
										}
										if(get.cardtag(card,"yingbian_add")){
											event.yingbian_addTarget=true;
										}
									};
									info.yingbian=function(event){
										var card=event.card;
										if(get.cardtag(card,"yingbian_recover")&&player.maxHp-player.hp>0){
											event.player.recover();
										}
										this.backup_yingbian.apply(this,arguments);
									}
								}
								else if(info.yingbian){
									info.sst_aoshang_yingbian=info.yingbian;
									info.yingbian=function(event){
										var card=event.card;
										if(get.cardtag(card,"yingbian_recover")&&player.maxHp-player.hp>0){
											event.player.recover();
										}
										this.sst_aoshang_yingbian.apply(this,arguments);
									}
								}
							}
						});
					}
				},
				forced:true,
				popup:false,
				trigger:{player:"useCardBegin"},
				filter:function(event,player){
					return !(get.cardtag(event.card,"yingbian_kongchao")&&get.cardtag(event.card,"yingbian_recover"));
				},
				content:function(){
					if(!trigger.card.cardtags) trigger.card.cardtags=[];
					trigger.card.cardtags.add("yingbian_kongchao");
					trigger.card.cardtags.add("yingbian_recover");
				},
				group:"sst_aoshang2"
			},
			sst_aoshang2:{
				forced:true,
				popup:false,
				trigger:{global:["chooseToUseBegin","chooseToRespondBegin"]},
				filter:function(event,player){
					var evt=event.getParent(2);
					if(!evt||evt.name!="useCard") return false;
					return evt.player==player&&typeof get.number(evt.card)=="number";
				},
				content:function(){
					var evt=trigger.getParent(2);
					if(trigger.filterCard){
						trigger.set("sstAoshangFilterCard",trigger.filterCard);
						trigger.set("filterCard",function(card){
							if(card&&_status.event.respondToCard&&get.number(card)>get.number(_status.event.respondToCard)) return false;
							if(typeof _status.event.sstAoshangFilterCard!="function") return true;
							return _status.event.sstAoshangFilterCard.apply(this,arguments);
						});
						trigger.set("respondToCard",evt.card);
					}
					else{
						trigger.set("filterCard",function(card){
							return card&&_status.event.respondToCard&&!(get.number(card)>get.number(_status.event.respondToCard));
						});
						trigger.set("respondToCard",evt.card);
					}
				}
			},
			sst_lianxia:{
				enable:"phaseUse",
				usable:1,
				filterTarget:function(card,player,target){
					return target.countCards()<player.countCards();
				},
				filter:function(event,player){
					return player.countCards("he");
				},
				filterCard:true,
				discard:false,
				lose:false,
				delay:false,
				position:"he",
				content:function(){
					"step 0"
					player.give(cards,target);
					"step 1"
					event.players=game.filterPlayer(function(current){
						return current.countCards("he")&&current.isMaxHandcard();
					});
					if(event.players.length){
						event.players.sortBySeat(_status.currentPhase);
						player.line(event.players,"green");
						event.num=0;
					}
					else{
						event.finish();
					}
					"step 2"
					if(event.players[event.num]!=player){
						event.players[event.num].chooseCard("怜下：交给"+get.translation(player)+"一张牌","he",true);
					}
					else{
						event.goto(4);
					}
					"step 3"
					if(result.cards&&result.cards.length){
						event.players[event.num].give(result.cards,player);
					}
					"step 4"
					event.num++;
					if(event.num<event.players.length){
						event.goto(2);
					}
				},
				ai:{
					order:7,
					result:{
						player:function(player,target){
							if(!ui.selected.cards||!ui.selected.cards.length) return;
							if(target.hasSkillTag("nogain")) return 0;
							return Math.cbrt(get.attitude(player,target)*get.value(ui.selected.cards[0]));
						}
					}
				}
			},
			//Bandana Waddle Dee
			sst_qiangdu:{
				locked:false,
				direct:true,
				mod:{
					targetInRange:function(card){
						if(card.name=="sst_spear_thrust") return true;
					}
				},
				trigger:{
					player:"loseAfter",
					global:["equipAfter","addJudgeAfter","gainAfter","loseAsyncAfter","addToExpansionAfter"]
				},
				filter:function(event,player){
					if(!player.countCards("he")) return false;
					var evt=event.getl(player);
					if(evt){
						if(event.visible&&evt.hs&&evt.hs.length){
							for(var i of evt.hs){
								if(get.suit(i,player)=="spade") return true;
							}
						}
						if(evt.es&&evt.es.length){
							for(var i of evt.es){
								if(get.suit(i,player)=="spade") return true;
							}
						}
						if(evt.js&&evt.js.length){
							for(var i of evt.js){
								if(get.suit(i,player)=="spade") return true;
							}
						}
					}
					return false;
				},
				content:function(){
					var next=player.chooseToUse();
					next.set("prompt",get.prompt("sst_qiangdu"));
					next.set("prompt2","你可以将一张牌当作【刺枪】使用");
					next.set("logSkill","sst_qiangdu");
					next.set("norestore",true);
					next.set("_backupevent","sst_qiangdux");
					next.backup("sst_qiangdux");
					next.set("addCount",false);
					next.set("custom",{
						add:{},
						replace:{window:function(){}}
					});
				},
				ai:{
					effect:{
						player:function(card){
							if(card.suit=="spade") return [1,1];
						}
					}
				},
				group:"sst_qiangdu_init"
			},
			sst_qiangdu_init:{
				forced:true,
				locked:false,
				trigger:{
					global:"phaseBefore",
					player:"enterGame"
				},
				filter:function(event,player){
					return (event.name!="phase"||game.phaseNumber==0)&&!lib.inpile.contains("sst_spear_thrust");
				},
				content:function(){
					"step 0"
					var cards=[];
					for(var i=1;i<=11;i++){
						var card=game.createCard2("sst_spear_thrust","spade",i);
						cards.push(card);
						ui.cardPile.insertBefore(card,ui.cardPile.childNodes[get.rand(0,ui.cardPile.childNodes.length)]);
					}
					game.broadcastAll(function(){
						lib.inpile.add("sst_spear_thrust");
					});
					game.updateRoundNumber();
					player.$throw(cards);
					"step 1"
					game.broadcastAll(ui.clear);
					game.delayx();
				}
			},
			sst_qiangdux:{
				viewAs:{name:"sst_spear_thrust"},
				filterCard:function(card){
					return get.itemtype(card)=="card";
				},
				position:"hes",
				check:function(card){return 5-get.value(card);}
			},
			sst_mengchen:{
				direct:true,
				trigger:{player:"damageEnd"},
				content:function(){
					"step 0"
					event.count=trigger.num;
					"step 1"
					if(event.count){
						event.count--;
						player.chooseTarget(get.prompt2("sst_mengchen")).set("ai",function(target){
							return get.rawAttitude(_status.event.player,target);
						});
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.targets&&result.targets.length){
						event.target=result.targets[0];
						event.targets=result.targets;
						player.logSkill("sst_mengchen",event.targets);
						event.cards=[];
						event.num=0;
						event.targets.push(player);
						event.targets.sortBySeat(_status.currentPhase);
					}
					else{
						event.finish();
					}
					"step 3"
					event.targets[event.num].draw();
					"step 4"
					event.targets[event.num].chooseToDiscard("盟谌：弃置一张牌","he",true);
					"step 5"
					if(result.cards&&result.cards.length){
						event.cards.addArray(result.cards);
					}
					event.num++;
					if(event.num<event.targets.length) event.goto(3);
					"step 6"
					if(event.cards.length){
						event.target.chooseCardButton("盟谌：你可以使用"+get.translation(event.cards)+"中的一张牌",event.cards).set("filterButton",function(button){
							return ["o","d"].contains(get.position(button.link,true))&&_status.event.player.hasUseTarget(button.link);
						}).set("ai",function(button){
							return _status.event.player.getUseValue(button.link);
						});
					}
					else{
						event.goto(1);
					}
					"step 7"
					if(result.links&&result.links.length){
						event.target.chooseUseTarget(result.links[0],false);
					}
					event.goto(1);
				},
				ai:{
					expose:0.2,
					maixie:true,
					maixie_hp:true
				}
			},
			//Magolor
			sst_miulu:{
				forced:true,
				trigger:{player:"damageBegin4"},
				filter:function(event,player){
					return event.num>1&&player.hujia;
				},
				content:function(){
					trigger.num=1;
				},
				ai:{
					filterDamage:true,
					skillTagFilter:function(player){
						if(!player.hujia) return false;
					}
				},
				group:"sst_miulu2"
			},
			sst_miulu2:{
				forced:true,
				trigger:{player:"changeHujiaAfter"},
				filter:function(event,player){
					return event.num<0;
				},
				content:function(){
					"step 0"
					player.addSkill("sst_miulu_effect");
					if(player.countCards("h",function(card){
						return !card.hasGaintag("viewHandcard");
					})) player.chooseCard("谬陆：明置"+get.cnNumber(-trigger.num)+"张暗置手牌",-trigger.num,function(card){
						return !card.hasGaintag("viewHandcard");
					},true).set("ai",get.value);
					"step 1"
					if(result.cards&&result.cards.length){
						player.$give(result.cards,player,false);
						player.addGaintag(result.cards,"viewHandcard");
						player.addGaintag(result.cards,"sst_miulu");
						game.log(player,"明置了",result.cards);
						game.delayx();
					}
					"step 2"
					player.addMark("sst_miulu_effect",-trigger.num,false);
					player.$damagepop(player.countMark("sst_miulu_effect"),"water");
					game.delayx();
				},
				ai:{
					maixie:true,
					skillTagFilter:function(player){
						if(!player.hujia) return false;
					}
				}
			},
			sst_miulu_effect:{
				charlotte:true,
				intro:{
					content:function(storage,player){
						return "本局游戏你的手牌上限+"+storage+"<br>当前你的手牌上限："+player.getHandcardLimit();
					}
				},
				onremove:true,
				mod:{
					ignoredHandcard:function(card){
						if(card.hasGaintag("viewHandcard")) return true;
					},
					maxHandcard:function(player,num){
						return num+player.countMark("sst_miulu_effect");
					}
				}
			},
			sst_mofan:{
				global:"sst_mofan_effect",
				mahouSkill:true,
				enable:"phaseUse",
				usable:1,
				filter:function(event,player){
					return player.countCards("he")&&!player.hasSkill("sst_mofan_mahou");
				},
				filterCard:true,
				selectCard:[1,3],
				position:"he",
				content:function(){
					player.storage.sst_mofan_mahou=[cards.length,cards.length];
					player.addTempSkill("sst_mofan_mahou",{player:"die"});
					game.delayx();
				},
				check:function(card){
					var player=_status.event.player;
					var val=6-get.useful(card);
					var needsToDiscard=player.needsToDiscard();
					if(ui.selected.cards&&ui.selected.cards.length){
						for(var i=0;i<ui.selected.cards.length;i++){
							if(get.position(ui.selected.cards[i])=="h"&&game.checkMod(ui.selected.cards[i],player,false,"ignoredHandcard",player)!=true) needsToDiscard--;
						}
					}
					if(needsToDiscard>0&&get.position(card)=="h"&&game.checkMod(card,player,false,"ignoredHandcard",player)!=true) val+=5;
					return val;
				},
				ai:{
					order:1,
					result:{
						player:1
					}
				},
				subSkill:{
					mahou:{
						trigger:{global:"phaseEnd"},
						forced:true,
						popup:false,
						charlotte:true,
						content:function(){
							"step 0"
							var list=player.storage.sst_mofan_mahou;
							list[1]--;
							if(list[1]==0){
								event.num=list[0];
								game.log(player,"的“魔帆”魔法生效");
								player.removeSkill("sst_mofan_mahou");
								player.chooseTarget("魔帆：你可以令至多"+get.cnNumber(5-event.num)+"名角色摸"+get.cnNumber(event.num)+"张牌（手牌数大于手牌上限的角色少摸一张牌）",[1,5-event.num]).set("ai",function(target){
									return get.attitude(_status.event.player,target);
								});
							}
							else{
								game.log(player,"的“魔帆”魔法剩余","#g"+(list[1])+"回合");
								player.markSkill("sst_mofan_mahou");
								event.finish();
							}
							"step 1"
							if(result.targets&&result.targets.length){
								event.targets=result.targets.sortBySeat(_status.currentPhase);
								player.logSkill("sst_mofan_mahou",event.targets);
								event.numTarget=0;
							}
							else{
								event.finish();
							}
							"step 2"
							var draw=event.num;
							if(event.targets[event.numTarget].countCards()>event.targets[event.numTarget].getHandcardLimit()) draw--;
							if(draw>0) event.targets[event.numTarget].draw(draw,(event.numTarget<event.targets.length-1)?"nodelay":undefined);
							"step 3"
							event.numTarget++;
							if(event.numTarget<event.targets.length){
								event.goto(2);
							}
						},
						ai:{
							expose:0.2
						},
						mark:true,
						onremove:true,
						marktext:"♗",
						intro:{
							name:"施法：魔帆",
							markcount:function(storage){
								if(storage) return storage[1];
								return 0;
							},
							content:function(storage){
								if(storage){
									return "经过"+storage[1]+"个“回合结束时”后，可以令至多"+get.cnNumber(5-storage[0])+"名角色摸"+get.cnNumber(storage[0])+"张牌（手牌数大于手牌上限的角色少摸一张牌）";
								}
								return "未指定施法效果";
							}
						}
					}
				}
			},
			//Roy
			sst_nuyan:{
				direct:true,
				trigger:{player:"useCard"},
				filter:function(event){
					return _status.mougong_buff.contains(get.name(event.card));
				},
				content:function(){
					"step 0"
					player.chooseToDiscard(get.prompt2(event.name),function(card){
						return get.color(card)=="red";
					},"he").set("ai",function(card){
						if(get.tag(card,"fireDamage")) return get.unuseful3(card);
						var evt=_status.event.getTrigger();
						var cardName=get.name(evt.card);
						if(cardName=="sha"||cardName=="juedou"||cardName=="huogong"||cardName=="tao"){
							var val=0;
							game.filterPlayer(function(current){
								if(evt.targets.contains(current)){
									if(cardName=="sha"&&!current.mayHaveShan()) return;
									if(cardName=="tao"&&current.hp+evt.baseDamage+1>current.maxHp) return;
									val+=get.effect(current,evt.card,evt.player,player);
								}
							}).length;
							val/=evt.targets.length;
							return val-get.useful(card);
						}
						var sha=evt.getParent(2);
						if(!sha||sha.name!="sha"||sha.shanRequired<2) return false;
						return 5-get.useful(card);
					}).set("logSkill",event.name);
					"step 1"
					if(result.cards&&result.cards.length){
						event.cards=result.cards;
						var cardName=get.name(trigger.card);
						if(cardName=="sha"){
							var map=trigger.customArgs;
							game.filterPlayer2(function(current){
								var id=current.playerid;
								if(!map[id]) map[id]={};
								if(typeof map[id].shanRequired=="number"){
									map[id].shanRequired++;
								}
								else{
									map[id].shanRequired=2;
								}
							});
						}
						else if(cardName=="shan"){
							var evt=trigger.getParent(2);
							if(evt&&evt.name=="sha"){
								evt.shanRequired--;
							}
						}
						else if(cardName=="juedou"){
							if(typeof trigger.th_anger!="object") trigger.th_anger={};
							if(typeof trigger.th_anger[trigger.player.playerid]!="number") trigger.th_anger[trigger.player.playerid]=0;
							trigger.th_anger[trigger.player.playerid]++;
						}
						else if(cardName=="huogong"||cardName=="tao"){
							trigger.baseDamage++;
						}
						player.popup(cardName,"fire");
						game.log(player,"强化了",trigger.card);
					}
					else{
						event.finish();
					}
					"step 2"
					var cards=event.cards.filter(function(card){
						return get.tag(card,"fireDamage");
					})
					if(cards.length){
						player.chooseTarget("怒炎：你可以对一名角色造成1点火焰伤害").set("ai",function(target){
							return get.damageEffect(target,player,player,"fire");
						});
					}
					else{
						event.finish();
					}
					"step 3"
					if(result.targets&&result.targets.length){
						player.line(result.targets,"fire");
						result.targets[0].damage(player,"nocard");
						player.addExpose(0.2);
					}
					else{
						event.finish();
					}
					"step 4"
					game.delayx();
				},
				ai:{
					damage:true
				}
			}
		},
		dynamicTranslate:{
			sst_wenxin:function(player){
				if(player.storage.sst_wenxin){
					if(player.storage.sst_wenxin_alter) return "结束阶段，你可以弃置至少一张手牌并依次弃置场上等量的红色牌，然后展示手牌并摸等同于你弃置黑色牌数量的牌。";
					return "结束阶段，你可以弃置至少一张手牌并依次弃置场上等量的牌，然后展示手牌并摸等同于你弃置黑色牌数量的牌。";
				}
				return "使命技。结束阶段，你可以弃置至少一张手牌并依次弃置场上等量的牌，然后展示手牌并摸等同于你弃置黑色牌数量的牌。<br>\
				成功：若以此法连续两次展示的手牌均为红色，此技能改为非使命技，你取消弃牌阶段。<br>\
				失败：以此法展示三次手牌后，此技能改为非使命技，“场上等量的牌”改为“场上等量的红色牌”。";
			}
		},
		translate: {
			//Civil War mode reference
			_guozhan_marks:"标记",
			_guozhan_marks_backup:"标记",
			xianqu_mark:"先驱",
			//Character
			sst_pyra_mythra:"焰／光",
			sst_9_volt_18_volt:"九伏特＆十八伏特",
			sst_claude:"库罗德",
			sst_geno:"♡♪!?",
			sst_duck_hunt:"打猎",
			sst_ness:"奈斯",
			sst_chrom:"库洛姆",
			sst_lucina:"露琪娜",
			sst_robin:"鲁弗莱",
			sst_robin_male:"鲁弗莱",
			sst_robin_female:"鲁弗莱",
			sst_paipai:"派派",
			sst_bandana_waddle_dee:"头巾瓦豆鲁迪",
			sst_magolor:"魔法洛亚",
			sst_roy:"罗伊",
			//Character ab.
			sst_9_volt_18_volt_ab:"九伏十八伏",
			sst_geno_ab:"Geno",
			sst_bandana_waddle_dee_ab:"瓦豆鲁迪",
			//Skill
			sst_yunchou:"运筹",
			sst_yunchou_info:"若你使用的牌具有应变效果，你可以令此牌允许满足任意一种应变条件。",
			sst_guimou:"鬼谋",
			sst_guimou_info:"每回合限一次，若你使用的牌具有应变效果，你可以任意指定此牌的应变效果。",
			sst_fuyuan:"复愿",
			sst_fuyuan_effect:"复愿",
			sst_fuyuan_info:"每轮游戏开始时，你可以展示牌堆顶一张牌，然后你可以重铸一张牌，令一名角色下次造成伤害后再次结算此伤害。若这两张牌点数相同，你令其一个限定技视为未发动过。",
			sst_xingjiang:"星降",
			sst_xingjiang_info:"限定技，出牌阶段，你可以弃置至少一张牌。若如此做，你亮出牌堆顶两倍数量的牌且可以使用之（无距离限制且应变效果直接生效）。",
			sst_gonglie:"共猎",
			sst_gonglie_info:"你使用【杀】可以为其附加「助战→目标+1」应变效果；然后若有人响应「助战」且【杀】造成了伤害，其可以获得受到此【杀】伤害的角色一张牌。",
			sst_weishou:"围狩",
			sst_weishou2:"围狩",
			sst_weishou_info:"一名其他角色因响应「助战」而弃置时，可以改为将牌交给你。",
			sst_wenxin:"问心",
			sst_wenxin_effect:"问心",
			sst_wenxin_info:"使命技。结束阶段，你可以弃置至少一张手牌并依次弃置场上等量的牌，然后展示手牌并摸等同于你弃置黑色牌数量的牌。<br>\
			成功：若以此法连续两次展示的手牌均为红色，此技能改为非使命技，你取消弃牌阶段。<br>\
			失败：以此法展示三次手牌后，此技能改为非使命技，“场上等量的牌”改为“场上等量的红色牌”。",
			sst_niming:"逆命",
			sst_niming_info:"一名角色的判定牌生效前，你可以用牌堆顶的一张牌代替判定牌。",
			sst_cuifeng:"摧锋",
			sst_cuifeng2:"摧锋",
			sst_cuifeng_info:"准备阶段，你可以判定，然后将此判定牌当作【杀】使用：若此【杀】为红色，你回复1点体力；若为黑色，你弃置两张牌，或受到1点伤害令此【杀】伤害值基数+1（背水：令此【杀】不可被响应）。",
			sst_suxing:"溯行",
			sst_suxing_info:"锁定技，每轮游戏开始时，若上一轮至少一名角色失去过所有手牌，你执行一个额外的回合。",
			sst_shengyi:"圣裔",
			sst_shengyi_info:"觉醒技，结束阶段，若你已发动过〖溯行〗，你减1点体力上限，然后获得技能〖寒芒〗〖摧锋〗。",
			sst_zuozhan:"佐战",
			sst_zuozhan_info:"一名角色受到伤害时，你可以将〖军策〗交给其。因此失去〖军策〗的角色摸两张牌。",
			sst_junce:"军策",
			sst_junce_info:"当你受到伤害后，你可以摸一张牌或获得一张额外智囊。背水：弃置所有手牌。",
			sst_aoshang:"傲上",
			sst_aoshang2:"傲上",
			sst_aoshang_info:"锁定技，你使用的牌不能被点数大于此牌的牌响应且拥有「空巢→回复1点体力」应变效果。",
			sst_lianxia:"怜下",
			sst_lianxia_info:"出牌阶段限一次，你可以将一张牌交给一名手牌数小于你的角色，然后手牌数最多的角色依次交给你一张牌（若为你则无需交给牌）。",
			sst_qiangdu:"枪笃",
			sst_qiangdu_init:"枪笃",
			sst_qiangdu_info:"游戏开始时，你将11张【刺枪】加入牌堆。你使用【刺枪】无距离限制。当你的♠牌正面向上离开你的区域后，你可以将一张牌当作【刺枪】使用。",
			sst_mengchen:"盟谌",
			sst_mengchen_info:"当你受到1点伤害后，你可以与一名角色依次摸一张牌并弃置一张牌，然后其可以使用其中一张牌。",
			sst_miulu:"谬陆",
			sst_miulu2:"谬陆",
			sst_miulu_effect:"谬陆",
			sst_miulu_info:"锁定技，若你有护甲，你最多受到1点伤害。每当你失去1点护甲，你明置一张暗置手牌，且本局游戏你的手牌上限+1。你的明置手牌不计入上限。",
			sst_mofan:"魔帆",
			sst_mofan_info:"出牌阶段限一次，你可以弃置X张牌并施法：可以令至多5-X名角色摸X张牌（手牌数大于手牌上限的角色少摸一张牌）。",
			sst_nuyan:"怒炎",
			sst_nuyan_info:"当你使用可以被怒气强化的牌时，你可以弃置一张红色牌强化之，然后若弃置的牌可以造成火属性伤害，你可以对一名角色造成1点火焰伤害。",
			//Tag
			sst_pyra_mythra_tag:"焰／光",
			yingbian_recover_tag:"(回复)",
			zhinang_tricks_tag:"智囊",
			//Sort
			sst_civil_war:"国战",
			sst_response:"应变",
			sst_laying_plans:"始计",
			sst_attack_by_stratagem:"谋攻"
		},
		translateEnglish:{
			sst_pyra_mythra:"Pyra/Mythra",
			sst_9_volt_18_volt:"9-Volt & 18-Volt",
			sst_claude:"Claude",
			sst_geno:"♡♪!?",
			sst_duck_hunt:"Duck Hunt",
			sst_ness:"Ness",
			sst_chrom:"Chrom",
			sst_lucina:"Lucina",
			sst_robin:"Robin",
			sst_robin_male:"Robin",
			sst_robin_female:"Robin",
			sst_paipai:"Paipai",
			sst_bandana_waddle_dee:"Bandana Waddle Dee",
			sst_magolor:"Magolor",
			sst_roy:"Roy"
		},
		perfectPair:{
			sst_pyra_mythra:["sst_rex"],
			sst_9_volt_18_volt:["sst_wario"],
			sst_claude:["sst_byleth_male","sst_byleth_female"],
			sst_geno:["sst_mario","sst_bowser","sst_peach"],
			sst_chrom:["sst_marth","sst_lucina","sst_robin","sst_robin_male","sst_robin_female"],
			sst_lucina:["sst_marth","sst_robin","sst_robin_male","sst_robin_female"],
			sst_robin:["sst_robin_male","sst_robin_female"],
			sst_robin_male:["sst_robin","sst_robin_female"],
			sst_robin_female:["sst_robin","sst_robin_male"],
			sst_bandana_waddle_dee:["sst_kirby","sst_meta_knight","sst_king_dedede"],
			sst_magolor:["sst_kirby","sst_meta_knight","sst_king_dedede","sst_bandana_waddle_dee"]
		},
		help:{
			"乱斗EX":"<div style=\"margin:10px\">\
				背水\
			</div>\
			<ul style=\"margin-top:0\">\
				<li>\
					你执行背水效果后，依次执行上述两项/上述出现的“或”改为“和”\
				</li>\
			</ul>\
			<div style=\"margin:10px\">\
				交给技能\
			</div>\
			<ul style=\"margin-top:0\">\
				<li>\
					交给技能为专属技能\
				</li>\
				<li>\
					理论上，场上只能存在一个交给技能\
				</li>\
				<li>\
					将交给技能交给一名角色前，先前角色失去此交给技能\
				</li>\
			</ul>\
			<div style=\"margin:10px\">\
				使命技\
			</div>\
			<ul style=\"margin-top:0\">\
				<li>\
					本身可包含子技能\
				</li>\
				<li>\
					若满足成功条件，失去此技能，执行成功分支的效果\
				</li>\
				<li>\
					若满足失败条件，失去此技能，执行失败分支的效果\
				</li>\
			</ul>\
			<div style=\"margin:10px\">\
				应变篇\
			</div>\
			<ul style=\"margin-top:0\">\
				<li>\
					派派：专属应变效果\
					<ul style=\"padding-left:20px;padding-top:5px\">\
						<li>\
							回复：回复1点体力\
						</li>\
					</ul>\
				</li>\
			</ul>\
			<div style=\"margin:10px\">\
				怒气强化说明\
			</div>\
			<ul style=\"margin-top:0\">\
				<li>\
					【杀】：消耗1点怒气强化，需要一张强化【闪】或两张【闪】才能抵消\
				</li>\
				<li>\
					【闪】：消耗1点怒气强化，使用时视为两张【闪】的效果\
				</li>\
				<li>\
					【决斗】：消耗2点怒气强化，对目标造成伤害时，伤害+1\
				</li>\
				<li>\
					【火攻】：消耗2点怒气强化，造成的伤害+1\
				</li>\
				<li>\
					【桃】：消耗3点怒气强化，回复的体力+1\
				</li>\
			</ul>"
		}
	};
	return sst_extra;
});