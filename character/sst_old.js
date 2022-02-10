"use strict";
game.import("character",function(lib,game,ui,get,ai,_status){
	if(!lib.translateEnglish) lib.translateEnglish={};
	var sst_old={
		name:"sst_old",
		connect:true,
		characterSort:{
			sst_old:{
                sst_64:["old_sst_samus","old_sst_donkey_kong"],
                sst_melee:[],
                sst_brawl:[],
                sst_4:[],
                sst_ultimate:["old_sst_ken","old_sst_dark_samus"],
                sst_spirits:[],
                sst_players:[],
				sst_ymk:["old_ymk_claude","ymk_577"],
			},
		},
		character:{
			//LTK
			caocao:["male","sst_smash",4,["jianxiong","hujia"],["zhu","unseen"]],
			simayi:["male","sst_smash",3,["fankui","guicai"],["unseen"]],
			xiahoudun:["male","sst_smash",4,["ganglie"],["unseen"]],
			zhangliao:["male","sst_smash",4,["tuxi"],["unseen"]],
			xuzhu:["male","sst_smash",4,["luoyi"],["unseen"]],
			guojia:["male","sst_smash",3,["tiandu","yiji"],["unseen"]],
			zhenji:["female","sst_smash",3,["luoshen","qingguo"],["unseen"]],
			liubei:["male","sst_smash",4,["rende","jijiang"],["zhu","unseen"]],
			guanyu:["male","sst_smash",4,["wusheng"],["unseen"]],
			zhangfei:["male","sst_smash",4,["paoxiao"],["unseen"]],
			zhugeliang:["male","sst_smash",3,["guanxing","kongcheng"],["unseen"]],
			zhaoyun:["male","sst_smash",4,["longdan"],["unseen"]],
			machao:["male","sst_smash",4,["mashu","tieji"],["unseen"]],
			huangyueying:["female","sst_smash",3,["jizhi","qicai"],["unseen"]],
			sunquan:["male","sst_smash",4,["zhiheng","jiuyuan"],["zhu","unseen"]],
			ganning:["male","sst_smash",4,["qixi"],["unseen"]],
			lvmeng:["male","sst_smash",4,["keji"],["unseen"]],
			huanggai:["male","sst_smash",4,["kurou"],["unseen"]],
			zhouyu:["male","sst_smash",3,["yingzi","fanjian"],["unseen"]],
			daqiao:["female","sst_smash",3,["guose","liuli"],["unseen"]],
			luxun:["male","sst_smash",3,["qianxun","lianying"],["unseen"]],
			sunshangxiang:["female","sst_smash",3,["xiaoji","jieyin"],["unseen"]],
			huatuo:["male","sst_smash",3,["qingnang","jijiu"],["unseen"]],
			lvbu:["male","sst_smash",4,["wushuang"],["unseen"]],
			diaochan:["female","sst_smash",3,["lijian","biyue"],["unseen"]],
			huaxiong:["male","sst_smash",6,["yaowu"],["unseen"]],
			gongsunzan:["male","sst_smash",4,["reyicong"],["unseen"]],
			xf_yiji:["male","sst_smash",3,["xinfu_jijie","xinfu_jiyuan"],["unseen"]],
			re_yuanshu:["male","sst_smash",4,["rewangzun","retongji"],["unseen"]],
			//SST
			old_sst_samus:["female","sst_light",4,["old_sst_juezhan","old_sst_zailu"],[]],
			old_sst_ken:["male","sst_light",4,["old_sst_yanyang","sst_shenglong"],[]],
			old_ymk_claude:["male","sst_spirit",3,["old_ymk_yunchou","old_ymk_guimou"],[]],
			old_sst_donkey_kong:["male","sst_light",4,["old_sst_baochui"],[]],
			old_sst_dark_samus:["female","sst_darkness",3,["sst_yingliu","old_sst_shunxing"],[]],
			ymk_577:["male","sst_reality",3,["ymk_jiagou","ymk_jicai"],[]]
		},
		characterFilter:{
		},
		characterIntro:{
			/*
			"<br>"+
			"系列：（）<br>"+
			"初登场：（）<br>"+
			"武将作者：Yumikohimi<br>"+
			"武将作者：mario not mary<br>"+
			"武将作者：Show-K<br>"+
			"------------------------------<br>"+
			"<br>"+
			"——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>"+
			"------------------------------<br>"+
			"

			"+
			"
			*/
			//LTK
			liubei:"先主姓刘，讳备，字玄德，涿郡涿县人，汉景帝子中山靖王胜之后也。以仁德治天下。",
			guanyu:"字云长，本字长生，并州河东解州人。五虎上将之首，爵至汉寿亭侯，谥曰“壮缪侯”。被奉为“关圣帝君”，崇为“武圣”。",
			zhangfei:"字翼德，涿郡人，燕颔虎须，豹头环眼。有诗云：“长坂坡头杀气生，横枪立马眼圆睁。一声好似轰雷震，独退曹家百万兵”。",
			zhugeliang:"字孔明，号卧龙，琅琊阳都人，蜀汉丞相。在世时被封为武乡侯，谥曰忠武侯。著有《出师表》、《诫子书》等。怀不世之才，以空城戏司马，能观星象而通鬼神。",
			zhaoyun:"字子龙，常山真定人。身长八尺，姿颜雄伟。长坂坡单骑救阿斗，先主云：“子龙一身都是胆也。”",
			machao:"字孟起，扶风茂陵人。面如冠玉，目如流星，虎体猿臂，彪腹狼腰，声雄力猛。因衣着讲究，举止非凡，故人称“锦马超”。麾铁骑，捻金枪。",
			huangyueying:"荆州沔南白水人，沔阳名士黄承彦之女，诸葛亮之妻，诸葛瞻之母。容貌甚丑，而有奇才：上通天文，下察地理，韬略近于诸书无所不晓，诸葛亮在南阳闻其贤而迎娶。",
			sunquan:"吴大帝，字仲谋，吴郡富春县人。统领吴与蜀魏三足鼎立，制衡天下。",
			ganning:"字兴霸，巴郡临江人，祖籍荆州南阳郡。为人勇猛刚强，忠心耿耿，勇往无前。曾带兵百人于二更奇袭曹营，大挫其锐气。",
			lvmeng:"字子明，汝南富陂人。陈寿评曰：“吕蒙勇而有谋断，识军计，谲郝普，擒关羽，最其妙者。初虽轻果妄杀，终于克己，有国士之量，岂徒武将而已乎！”",
			huanggai:"字公覆，零陵郡泉陵县人。官至偏将军、武陵太守。以苦肉计骗曹孟德，亲往诈降，火烧战船，重创敌军。",
			zhouyu:"字公瑾，庐江舒县人，任东吴三军大都督，雄姿英发，人称“美周郎”。赤壁之战前，巧用反间计杀了精通水战的叛将蔡瑁、张允。",
			daqiao:"庐江皖县人，为乔公长女，孙策之妻，小乔之姊。与小乔并称为“江东二乔”，容貌国色流离。",
			luxun:"本名陆议，字伯言，吴郡吴县人。历任东吴大都督、丞相。吴大帝孙权兄孙策之婿，世代为江东大族。以谦逊之书麻痹关羽，夺取荆州，又有火烧连营大破蜀军。",
			sunshangxiang:"孙夫人，乃孙权之妹。刘备定荆州，孙权进妹与其结姻，重固盟好。孙夫人才捷刚猛，有诸兄之风。后人为其立庙，号曰“枭姬庙”。",
			caocao:"魏武帝曹操，字孟德，小名阿瞒、吉利，沛国谯人。精兵法，善诗歌，乃治世之能臣，乱世之奸雄也。",
			simayi:"晋宣帝，字仲达，河内温人。曾任职过曹魏的大都督，太尉，太傅。少有奇节，聪明多大略，博学洽闻，伏膺儒教，世之鬼才也。",
			xiahoudun:"字元让，沛国谯人。有拔矢啖睛之勇，性格勇猛刚烈。",
			zhangliao:"字文远，魏雁门马邑人。官至前将军、征东将军、晋阳侯。武功高强，又谋略过人，多次建立奇功，以800人突袭孙权十万大军，皆望风披靡。",
			xuzhu:"字仲康，谯国谯县人。和典韦一同统率着曹操的亲卫队“虎卫军”。因为他十分勇猛，所以有“虎痴”的绰号。曾有裸衣斗马超之举。",
			guojia:"字奉孝，颍川阳翟人，官至军师祭酒。惜天妒英才，英年早逝。有诗云：“良计环环不遗策，每临制变满座惊”。",
			zhenji:"中山无极人，别称甄洛或甄宓，庙号文昭甄皇后。魏文帝曹丕的正室。懂诗文，有倾国倾城之貌，《洛神赋》即是曹植为她所作。",
			huatuo:"字元化，一名旉，沛国谯人，“建安三神医”之一。集平生之所得著《青囊经》，现已失传。",
			lvbu:"字奉先，五原郡九原县人。三国第一猛将，曾独力战刘关张三人，其武力世之无双。时人语曰：“人中有吕布，马中有赤兔。”",
			diaochan:"中国古代四大美女之一，有闭月羞花之貌。司徒王允之义女，由王允授意施行连环计，离间董卓、吕布，借布手除卓。后貂蝉成为吕布的妾。",
			huaxiong:"董卓旗下名将，自荐抵抗山东地区反对董卓的诸侯联军于汜水关前，他先后斩杀济北相鲍信之弟鲍忠和孙坚部将祖茂、以及袁术部将俞涉和韩馥手下潘凤等人，最后关东联军派出关羽与之一对一决斗而被杀。",
			xf_yiji:"伊籍，字机伯，生卒年不详，兖州山阳郡（今山东金乡县）人，三国时期蜀汉官员。年少时依附于同乡刘表。刘备落难到荆州时，伊籍时常拜访，托请刘备照顾。建安十三年（208年），刘表病死，伊籍便转投刘备，一起渡江南下。建安十六年（211年），刘备入蜀帮助刘璋，伊籍亦有跟随。随后刘备和刘璋双方决裂。建安十九年（214年），刘备平定益州，任命伊籍为左将军从事中郎，其待遇次于简雍、孙乾等。后升任昭文将军，并与诸葛亮、法正、刘巴、李严共同编制《蜀科》。",
			//SST
			old_sst_samus:"0264. 萨姆斯/Samus/サムス<br>"+
			"系列：Metroid（密特罗德）<br>"+
			"初登场：Metroid（密特罗德）<br>"+
			"武将作者：mario not mary<br>"+
			"------------------------------<br>"+
			"萨姆斯·亚兰是游戏历史上第一个女主角，以只身一人在外星球的作战闻名。她的能量装甲是高等文明“鸟人族”的成果，给了她强大的火力、防护力和升级的可能性。在大乱斗中，虽然她是道具人，但是她的体术也不差。她的蓄力射击威力惊人。<br>"+
			"——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>"+
			"------------------------------<br>"+
			"“萨姆斯，很不幸的消息……”",
			old_sst_ken:"0978. 肯/Ken/ケン<br>"+
			"系列：Street Fighter（街头霸王）<br>"+
			"初登场：Street Fighter（街头霸王）<br>"+
			"武将作者：mario not mary<br>"+
			"------------------------------<br>"+
			"肯是隆的头号挚友兼劲敌，两人师出同门，与风餐露宿四处苦行的隆不同，肯有着自己的家族与财大气粗的产业，据说现在空手道网课也办的红红火火。他在年轻时因为急躁吃过不少败仗，但现在的他已经有了自己的家庭，即便如此，在顾家的闲暇也一定要挤出时间与挚友对战几局，才是男人的快乐。<br>"+
			"——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>"+
			"------------------------------<br>"+
			"我准备好了，来吧。",
			old_ymk_claude:"1386. 库罗德/Claude/クロード<br>"+
			"系列：Fire Emblem（火焰纹章）<br>"+
			"初登场：Fire Emblem: Three Houses（火焰纹章 风花雪月）<br>"+
			"武将作者：Yumikohimi<br>"+
			"------------------------------<br>"+
			"雷斯塔诸侯同盟盟主之孙、爵位继承人。喜欢策略，喜欢琢磨战术，为了达到目标可以不择手段。不论玩家选择的是贝雷特还是贝雷丝，他都会以“兄弟”称呼他的老师。<br>"+
			"——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>"+
			"------------------------------<br>"+
			"芙朵拉内外都要变革，才能得以见到所愿之景……对吧？",
			old_sst_donkey_kong:"0134. 森喜刚/Donkey Kong/ドンキーコング<br>"+
			"系列：Donkey Kong（森喜刚）<br>"+
			"初登场：Donkey Kong（森喜刚）<br>"+
			"武将作者：mario not mary<br>"+
			"------------------------------<br>"+
			"丛林的王者，也是最狂热的香蕉狂魔。他的冒险总是以某人偷了他的香蕉开始。在大乱斗中，他的力度和投技是众所周知的。虽然体积很大，但是速度也不是特别慢。他的前投掷还能扛着对手走哦！要合理利用这一点！<br>"+
			"——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>"+
			"------------------------------<br>"+
			"砸人很疼的。",
			old_sst_dark_samus:"0265. 黑暗萨姆斯/Dark Samus/ダークサムス<br>"+
			"系列：Metroid（密特罗德）<br>"+
			"初登场：（）<br>"+
			"武将作者：mario not mary<br>"+
			"━━━━━━━━━━━━━━━━━<br>"+
			"萨姆斯的废弃盔甲、究极密特罗德和有机矿石“啡宗”结合的产物，不但有强大的恢复能力，还能精神控制其他生物和制造自己的分身。它在3ds和WiiU版《任天堂明星大乱斗》中作为辅助模型的时候还能使用啡宗的力量攻击，成为斗士之后各个招式倒是完全和萨姆斯一样了，遗憾。<br>"+
			"——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>"+
			"━━━━━━━━━━━━━━━━━<br>"+
			"“堕入黑暗”",
			ymk_577:"武将作者：Yumikohimi<br>"+
			"━━━━━━━━━━━━━━━━━<br>"+
			"柚子设计的577，估计又要偏强……意外的还行？"
		},
		characterTitle:{
			old_sst_samus:"银河战士",
			old_sst_ken:"红莲格斗王",
			old_ymk_claude:"连系世界之王",
			old_sst_donkey_kong:"丛林的王者",
			old_sst_dark_samus:"暗流涌动",
			ymk_577:"生电妙手"
		},
		skill:{
			//LTK
			rewangzun:{
				trigger:{global:"phaseZhunbeiBegin"},
				forced:true,
				audio:"wangzun",
				filter:function(event,player){
					return event.player.hp>player.hp;
				},
				logTarget:"player",
				content:function(){
					player.draw();
					var zhu=false;
					var target=trigger.player;
					switch(get.mode()){
						case "identity":{
							zhu=target.isZhu;
							break;
						}
						case "guozhan":{
							zhu=get.is.jun(target);
							break;
						}
						case "versus":{
							zhu=target.identity=="zhu";
							break;
						}
						case "doudizhu":{
							zhu=target==game.zhu;
							break;
						}
					}
					if(zhu){
						player.draw();
						target.addTempSkill("rewangzun2");
						target.addMark("rewangzun2",1,false);
					}
				},
			},
			rewangzun2:{
				onremove:true,
				mod:{
					maxHandcard:function(player,num){
						return num-player.countMark("rewangzun2");
					},
				},
				intro:{content:"手牌上限-#"},
			},
			retongji:{
				trigger:{global:"useCardToTarget"},
				logTarget:"target",
				audio:"tongji",
				direct:true,
				filter:function(event,player){
					return event.card.name=="sha"&&event.player!=player&&!event.targets.contains(player)&&
					event.target.inRange(player)&&event.target.countCards("he")>0;
				},
				content:function(){
					"step 0"
					trigger.target.chooseCard("he","是否对"+get.translation(player)+"发动【同疾】？","弃置一张牌，将"+get.translation(trigger.card)+"转移给"+get.translation(player)).set("ai",function(card){
						if(!_status.event.check) return -1;
						return get.unuseful(card)+9;
					}).set("check",function(){
						if(trigger.target.countCards("h","shan")){
							return -get.attitude(trigger.target,player);
						}
						if(get.attitude(trigger.target,player)<5){
							return 6-get.attitude(trigger.target,player);
						}
						if(trigger.target.hp==1&&player.countCards("h","shan")==0){
							return 10-get.attitude(trigger.target,player);
						}
						if(trigger.target.hp==2&&player.countCards("h","shan")==0){
							return 8-get.attitude(trigger.target,player);
						}
						return -1;
					}()>0);
					"step 1"
					if(result.bool){	
						player.logSkill("retongji",trigger.target);
						trigger.target.discard(result.cards);
						var evt=trigger.getParent();
						evt.triggeredTargets2.remove(trigger.target);
						evt.targets.remove(trigger.target);
						evt.targets.push(player);
					}
				},
			},
			hujia:{
				audio:2,
				audioname:["re_caocao"],
				unique:true,
				zhuSkill:true,
				trigger:{player:["chooseToRespondBefore","chooseToUseBefore"]},
				filter:function(event,player){
					if(event.responded) return false;
					if(player.storage.hujiaing) return false;
					if(!player.hasZhuSkill("hujia")) return false;
					if(!event.filterCard({name:"shan"},player,event)) return false;
					return game.hasPlayer(function(current){
						return current!=player&&current.group==player.group;
					});
				},
				check:function(event,player){
					if(get.damageEffect(player,event.player,player)>=0) return false;
					return true;
				},
				content:function(){
					"step 0"
					if(event.current==undefined) event.current=player.next;
					if(event.current==player){
						event.finish();
					}
					else if(event.current.group==player.group){
						if((event.current==game.me&&!_status.auto)||(
							get.attitude(event.current,player)>2)||
							event.current.isOnline()){
							player.storage.hujiaing=true;
							var next=event.current.chooseToRespond("是否替"+get.translation(player)+"打出一张闪？",{name:"shan"});
							next.set("ai",function(){
								var event=_status.event;
								return (get.attitude(event.player,event.source)-2);
							});
							next.set("skillwarn","替"+get.translation(player)+"打出一张闪");
							next.autochoose=lib.filter.autoRespondShan;
							next.set("source",player);
						}
					}
					"step 1"
					player.storage.hujiaing=false;
					if(result.bool){
						event.finish();
						trigger.result={bool:true,card:{name:"shan",isCard:true}};
						trigger.responded=true;
						trigger.animate=false;
						if(typeof event.current.ai.shown=="number"&&event.current.ai.shown<0.95){
							event.current.ai.shown+=0.3;
							if(event.current.ai.shown>0.95) event.current.ai.shown=0.95;
						}
					}
					else{
						event.current=event.current.next;
						event.goto(0);
					}
				},
				ai:{
					respondShan:true,
					skillTagFilter:function(player){
						if(player.storage.hujiaing) return false;
						if(!player.hasZhuSkill("hujia")) return false;
						return game.hasPlayer(function(current){
							return current!=player&&current.group==player.group;
						});
					},
				},
			},
			jianxiong:{
				audio:2,
				preHidden:true,
				trigger:{player:"damageEnd"},
				filter:function(event,player){
					return get.itemtype(event.cards)=="cards"&&get.position(event.cards[0],true)=="o";
				},
				content:function(){
					player.gain(trigger.cards,"gain2");
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					effect:{
						target:function(card,player,target){
							if(player.hasSkillTag("jueqing",false,target)) return [1,-1];
							if(get.tag(card,"damage")) return [1,0.55];
						}
					}
				}
			},
			fankui:{
				audio:2,
				trigger:{player:"damageEnd"},
				logTarget:"source",
				preHidden:true,
				filter:function(event,player){
					return (event.source&&event.source.countGainableCards(player,"he")&&event.num>0&&event.source!=player);
				},
				content:function(){
					player.gainPlayerCard(true,trigger.source,"he");
				},
				ai:{
					maixie_defend:true,
					effect:{
						target:function(card,player,target){
							if(player.countCards("he")>1&&get.tag(card,"damage")){
								if(player.hasSkillTag("jueqing",false,target)) return [1,-1.5];
								if(get.attitude(target,player)<0) return [1,1];
							}
						}
					}
				}
			},
			guicai:{
				audio:2,
				trigger:{global:"judge"},
				direct:true,
				preHidden:true,
				filter:function(event,player){
					return player.countCards(get.mode()=="guozhan"?"hes":"hs")>0;
				},
				content:function(){
					"step 0"
					player.chooseCard(get.translation(trigger.player)+"的"+(trigger.judgestr||"")+"判定为"+
					get.translation(trigger.player.judging[0])+"，"+get.prompt("guicai"),get.mode()=="guozhan"?"hes":"hs",function(card){
						var player=_status.event.player;
						var mod2=game.checkMod(card,player,"unchanged","cardEnabled2",player);
						if(mod2!="unchanged") return mod2;
						var mod=game.checkMod(card,player,"unchanged","cardRespondable",player);
						if(mod!="unchanged") return mod;
						return true;
					}).set("ai",function(card){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						var judging=_status.event.judging;
						var result=trigger.judge(card)-trigger.judge(judging);
						var attitude=get.attitude(player,trigger.player);
						if(attitude==0||result==0) return 0;
						if(attitude>0){
							return result-get.value(card)/2;
						}
						else{
							return -result-get.value(card)/2;
						}
					}).set("judging",trigger.player.judging[0]).setHiddenSkill("guicai");
					"step 1"
					if(result.bool){
						player.respond(result.cards,"guicai","highlight","noOrdering");
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool){
						if(trigger.player.judging[0].clone){
							trigger.player.judging[0].clone.classList.remove("thrownhighlight");
							game.broadcast(function(card){
								if(card.clone){
									card.clone.classList.remove("thrownhighlight");
								}
							},trigger.player.judging[0]);
							game.addVideo("deletenode",player,get.cardsInfo([trigger.player.judging[0].clone]));
						}
						game.cardsDiscard(trigger.player.judging[0]);
						trigger.player.judging[0]=result.cards[0];
						trigger.orderingCards.addArray(result.cards);
						game.log(trigger.player,"的判定牌改为",result.cards[0]);
						game.delay(2);
					}
				},
				ai:{
					rejudge:true,
					tag:{
						rejudge:1,
					}
				}
			},
			ganglie:{
				audio:2,
				trigger:{player:"damageEnd"},
				filter:function(event,player){
					return (event.source!=undefined);
				},
				check:function(event,player){
					return (get.attitude(player,event.source)<=0);
				},
				logTarget:"source",
				content:function(){
					"step 0"
					player.judge(function(card){
						if(get.suit(card)=="heart") return -2;
						return 2;
					}).judge2=function(result){
						return result.bool;
					};
					"step 1"
					if(result.judge<2){
						event.finish();return;
					}
					trigger.source.chooseToDiscard(2).set("ai",function(card){
						if(card.name=="tao") return -10;
						if(card.name=="jiu"&&_status.event.player.hp==1) return -10;
						return get.unuseful(card)+2.5*(5-get.owner(card).hp);
					});
					"step 2"
					if(result.bool==false){
						trigger.source.damage();
					}
				},
				ai:{
					maixie_defend:true,
					effect:{
						target:function(card,player,target){
							if(player.hasSkillTag("jueqing",false,target)) return [1,-1];
							return 0.8;
							// if(get.tag(card,"damage")&&get.damageEffect(target,player,player)>0) return [1,0,0,-1.5];
						}
					}
				}
			},
			ganglie_three:{
				audio:"ganglie",
				trigger:{player:"damageEnd"},
				direct:true,
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt2("ganglie_three"),function(card,player,target){
						return target.isEnemyOf(player);
					}).set("ai",function(target){
						return -get.attitude(_status.event.player,target)/(1+target.countCards("h"));
					});
					"step 1"
					if(result.bool){
						event.target=result.targets[0];
						player.logSkill("ganglie_three",target);
					}
					else event.finish();
					"step 2"
					player.judge(function(card){
						if(get.suit(card)=="heart") return -2;
						return 2;
					}).judge2=function(result){
						return result.bool;
					};
					"step 3"
					if(result.judge<2){
						event.finish();return;
					}
					target.chooseToDiscard(2).set("ai",function(card){
						if(card.name=="tao") return -10;
						if(card.name=="jiu"&&_status.event.player.hp==1) return -10;
						return get.unuseful(card)+2.5*(5-get.owner(card).hp);
					});
					"step 4"
					if(result.bool==false){
						target.damage();
					}
				},
				ai:{
					maixie_defend:true,
					effect:{
						target:function(card,player,target){
							if(player.hasSkillTag("jueqing",false,target)) return [1,-1];
							return 0.8;
							// if(get.tag(card,"damage")&&get.damageEffect(target,player,player)>0) return [1,0,0,-1.5];
						}
					}
				}
			},
			tuxi:{
				audio:2,
				trigger:{player:"phaseDrawBegin1"},
				direct:true,
				filter:function(event,player){
					return !event.numFixed;
				},
				content:function(){
					"step 0"
					var check;
					var i,num=game.countPlayer(function(current){
						return current!=player&&current.countCards("h")&&get.attitude(player,current)<=0;
					});
					check=(num>=2);
					player.chooseTarget(get.prompt("tuxi"),"获得其他一至两名角色的各一张手牌",[1,2],function(card,player,target){
						return target.countCards("h")>0&&player!=target;
					},function(target){
						if(!_status.event.aicheck) return 0;
						var att=get.attitude(_status.event.player,target);
						if(target.hasSkill("tuntian")) return att/10;
						return 1-att;
					}).set("aicheck",check);
					"step 1"
					if(result.bool){
						player.logSkill("tuxi",result.targets);
						player.gainMultiple(result.targets);
						trigger.changeToZero();
					}
					else{
						event.finish();
					}
					"step 2"
					game.delay();
				},
				ai:{
					threaten:2,
					expose:0.3
				}
			},
			luoyi:{
				audio:2,
				trigger:{player:"phaseDrawBegin2"},
				check:function(event,player){
					if(player.countCards("h")<3) return false;
					if(!player.hasSha()) return false;
					return game.hasPlayer(function(current){
						return get.attitude(player,current)<0&&player.canUse("sha",current);
					});
				},
				preHidden:true,
				filter:function(event,player){
					return !event.numFixed&&event.num>0;
				},
				content:function(){
					player.addTempSkill("luoyi2","phaseJieshuBegin");
					trigger.num--;
				}
			},
			luoyi2:{
				trigger:{source:"damageBegin1"},
				filter:function(event){
					return event.card&&(event.card.name=="sha"||event.card.name=="juedou")&&event.notLink();
				},
				forced:true,
				content:function(){
					trigger.num++;
				},
				ai:{
					damageBonus:true
				}
			},
			tiandu:{
				audio:2,
				audioname:["re_guojia","xizhicai","gz_nagisa"],
				trigger:{player:"judgeEnd"},
				preHidden:true,
				frequent:function(event){
					if(event.result.card.name=="du") return false;
					//if(get.mode()=="guozhan") return false;
					return true;
				},
				check:function(event){
					if(event.result.card.name=="du") return false;
					return true;
				},
				filter:function(event,player){
					return get.position(event.result.card,true)=="o";
				},
				content:function(){
					player.gain(trigger.result.card,"gain2");
				}
			},
			yiji:{
				audio:2,
				trigger:{player:"damageEnd"},
				frequent:true,
				filter:function(event){
					return (event.num>0)
				},
				content:function(){
					"step 0"
					event.count=trigger.num;
					"step 1"
					event.count--;
					event.cards=get.cards(2);
					"step 2"
					if(event.cards.length>1){
						player.chooseCardButton("将“遗计”牌分配给任意角色",true,event.cards,[1,event.cards.length]).set("ai",function(button){
							if(ui.selected.buttons.length==0) return 1;
							return 0;
						});
					}
					else if(event.cards.length==1){
						event._result={links:event.cards.slice(0),bool:true};
					}
					else{
						event.goto(5);
					}
					"step 3"
					if(result.bool){
						for(var i=0;i<result.links.length;i++){
							event.cards.remove(result.links[i]);
						}
						event.togive=result.links.slice(0);
						player.chooseTarget("将"+get.translation(result.links)+"交给一名角色",true).set("ai",function(target){
							var att=get.attitude(_status.event.player,target);
							if(_status.event.enemy){
								return -att;
							}
							else if(att>0){
								return att/(1+target.countCards("h"));
							}
							else{
								return att/100;
							}
						}).set("enemy",get.value(event.togive[0],player,"raw")<0);
					}
					"step 4"
					if(result.targets.length){
						result.targets[0].gain(event.togive,"draw");
						player.line(result.targets[0],"green");
						game.log(result.targets[0],"获得了"+get.cnNumber(event.togive.length)+"张牌");
						event.goto(2);
					}
					"step 5"
					if(event.count>0) player.chooseBool(get.prompt2(event.name)).set("frequentSkill",event.name);
					else event.finish();
					"step 6"
					if(result.bool){
						player.logSkill(event.name);
						event.goto(1);
					}
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					effect:{
						target:function(card,player,target){
							if(get.tag(card,"damage")){
								if(player.hasSkillTag("jueqing",false,target)) return [1,-2];
								if(!target.hasFriend()) return;
								var num=1;
								if(get.attitude(player,target)>0){
									if(player.needsToDiscard()){
										num=0.7;
									}
									else{
										num=0.5;
									}
								}
								if(target.hp>=4) return [1,num*2];
								if(target.hp==3) return [1,num*1.5];
								if(target.hp==2) return [1,num*0.5];
							}
						}
					}
				}
			},
			luoshen:{
				audio:2,
				trigger:{player:"phaseZhunbeiBegin"},
				frequent:true,
				preHidden:true,
				content:function(){
					"step 0"
					if(event.cards==undefined) event.cards=[];
					var next=player.judge(function(card){
						if(get.color(card)=="black") return 1.5;
						return -1.5;
					});
					next.judge2=function(result){
						return result.bool;
					};
					if(get.mode()!="guozhan"&&!player.hasSkillTag("rejudge")) next.set("callback",function(){
						if(event.judgeResult.color=="black"&&get.position(card,true)=="o") player.gain(card,"gain2");
					});
					else next.set("callback",function(){
						if(event.judgeResult.color=="black") event.getParent().orderingCards.remove(card);
					});
					"step 1"
					if(result.judge>0){
						event.cards.push(result.card);
						player.chooseBool("是否再次发动【洛神】？").set("frequentSkill","luoshen");
					}
					else{
						for(var i=0;i<event.cards.length;i++){
							if(get.position(event.cards[i],true)!="o"){
								event.cards.splice(i,1);i--;
							}
						}
						if(event.cards.length){
							player.gain(event.cards,"gain2");
						}
						event.finish();
					}
					"step 2"
					if(result.bool){
						event.goto(0);
					}
					else{
						if(event.cards.length){
							player.gain(event.cards,"gain2");
						}
					}
				}
			},
			xinluoshen:{
				audio:"luoshen",
				// alter:true,
				trigger:{player:"phaseZhunbeiBegin"},
				frequent:true,
				content:function(){
					"step 0"
					if(event.cards==undefined) event.cards=[];
					player.judge(function(card){
						if(get.color(card)=="black") return 1.5;
						return -1.5;
					},ui.special).judge2=function(result){
						return result.bool;
					};
					"step 1"
					if(result.judge>0){
						event.cards.push(result.card);
						if(lib.config.autoskilllist.contains("luoshen")){
							player.chooseBool("是否再次发动【洛神】？");
						}
						else{
							event._result={bool:true};
						}
					}
					else{
						for(var i=0;i<event.cards.length;i++){
							if(get.position(event.cards[i])!="s"){
								event.cards.splice(i,1);i--;
							}
						}
						player.gain(event.cards,"gain2");
						player.storage.xinluoshen=event.cards.slice(0);
						event.finish();
					}
					"step 2"
					if(result.bool){
						event.goto(0);
					}
					else{
						if(event.cards.length){
							player.gain(event.cards,"gain2");
							player.storage.xinluoshen=event.cards.slice(0);
						}
					}
				},
				mod:{
					ignoredHandcard:function(card,player){
						if(get.is.altered("xinluoshen")&&player.storage.xinluoshen&&player.storage.xinluoshen.contains(card)){
							return true;
						}
					}
				},
				group:"xinluoshen_clear",
				subSkill:{
					clear:{
						trigger:{player:"phaseAfter"},
						silent:true,
						content:function(){
							delete player.storage.xinluoshen;
						}
					}
				}
			},
			qingguo:{
				mod:{
					aiValue:function(player,card,num){
						if(get.name(card)!="shan"&&get.color(card)!="black") return;
						var cards=player.getCards("hs",function(card){
							return get.name(card)=="shan"||get.color(card)=="black";
						});
						cards.sort(function(a,b){
							return (get.name(b)=="shan"?1:2)-(get.name(a)=="shan"?1:2);
						});
						var geti=function(){
							if(cards.contains(card)){
								return cards.indexOf(card);
							}
							return cards.length;
						};
						if(get.name(card)=="shan") return Math.min(num,[6,4,3][Math.min(geti(),2)])*0.6;
						return Math.max(num,[6.5,4,3][Math.min(geti(),2)]);
					},
					aiUseful:function(){
						return lib.skill.qingguo.mod.aiValue.apply(this,arguments);
					},
				},
				locked:false,
				audio:2,
				enable:["chooseToRespond","chooseToUse"],
				filterCard:function(card){
					return get.color(card)=="black";
				},
				viewAs:{name:"shan"},
				viewAsFilter:function(player){
					if(!player.countCards("hs",{color:"black"})) return false;
				},
				position:"hs",
				prompt:"将一张黑色手牌当闪使用或打出",
				check:function(){return 1},
				ai:{
					order:3,
					respondShan:true,
					skillTagFilter:function(player){
						if(!player.countCards("hs",{color:"black"})) return false;
					},
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,"respondShan")&&current<0) return 0.6
						}
					}
				}
			},
			rende:{
				audio:2,
				enable:"phaseUse",
				filterCard:true,
				selectCard:[1,Infinity],
				discard:false,
				lose:false,
				delay:0,
				filterTarget:function(card,player,target){
					return player!=target;
				},
				check:function(card){
					if(ui.selected.cards.length>1) return 0;
					if(ui.selected.cards.length&&ui.selected.cards[0].name=="du") return 0;
					if(!ui.selected.cards.length&&card.name=="du") return 20;
					var player=get.owner(card);
					var num=0;
					var evt2=_status.event.getParent();
					var num=0;
					player.getHistory("lose",function(evt){
						if(evt.getParent().skill=="rende"&&evt.getParent(3)==evt2) num+=evt.cards.length;
					});
					if(player.hp==player.maxHp||num>1||player.countCards("h")<=1){
						if(ui.selected.cards.length){
							return -1;
						}
						var players=game.filterPlayer();
						for(var i=0;i<players.length;i++){
							if(players[i].hasSkill("haoshi")&&
								!players[i].isTurnedOver()&&
								!players[i].hasJudge("lebu")&&
								get.attitude(player,players[i])>=3&&
								get.attitude(players[i],player)>=3){
								return 11-get.value(card);
							}
						}
						if(player.countCards("h")>player.hp) return 10-get.value(card);
						if(player.countCards("h")>2) return 6-get.value(card);
						return -1;
					}
					return 10-get.value(card);
				},
				content:function(){
					target.gain(cards,player,"giveAuto");
					var evt2=event.getParent(3);
					var num=0;
					player.getHistory("lose",function(evt){
						if(evt.getParent(2).name=="rende"&&evt.getParent(5)==evt2) num+=evt.cards.length;
					});
					if(num<2&&num+cards.length>1) player.recover();
				},
				ai:{
					order:function(skill,player){
						if(player.hp<player.maxHp&&player.storage.rende<2&&player.countCards("h")>1){
							return 10;
						}
						return 1;
					},
					result:{
						target:function(player,target){
							if(target.hasSkillTag("nogain")) return 0;
							if(ui.selected.cards.length&&ui.selected.cards[0].name=="du"){
								if(target.hasSkillTag("nodu")) return 0;
								return -10;
							}
							if(target.hasJudge("lebu")) return 0;
							var nh=target.countCards("h");
							var np=player.countCards("h");
							if(player.hp==player.maxHp||player.storage.rende<0||player.countCards("h")<=1){
								if(nh>=np-1&&np<=player.hp&&!target.hasSkill("haoshi")) return 0;
							}
							return Math.max(1,5-nh);
						}
					},
					effect:{
						target:function(card,player,target){
							if(player==target&&get.type(card)=="equip"){
								if(player.countCards("e",{subtype:get.subtype(card)})){
									var players=game.filterPlayer();
									for(var i=0;i<players.length;i++){
										if(players[i]!=player&&get.attitude(player,players[i])>0){
											return 0;
										}
									}
								}
							}
						}
					},
					threaten:0.8
				}
			},
			rende1:{
				trigger:{player:"phaseUseBegin"},
				silent:true,
				content:function(){
					player.storage.rende=0;
				}
			},
			jijiang:{
				audio:"jijiang1",
				audioname:["liushan","re_liubei","re_liushan","ol_liushan"],
				unique:true,
				group:["jijiang1"],
				zhuSkill:true,
				filter:function(event,player){
					if(!player.hasZhuSkill("jijiang")||!game.hasPlayer(function(current){
						return current!=player&&current.group==player.group;
					})) return false;
					return !event.jijiang&&(event.type!="phase"||!player.hasSkill("jijiang3"));
				},
				enable:["chooseToUse","chooseToRespond"],
				viewAs:{name:"sha"},
				filterCard:function(){return false},
				selectCard:-1,
				ai:{
					order:function(){
						return get.order({name:"sha"})+0.3;
					},
					respondSha:true,
					skillTagFilter:function(player){
						if(!player.hasZhuSkill("jijiang")||!game.hasPlayer(function(current){
							return current!=player&&current.group==player.group;
						})) return false;
					},
				},
			},
			jijiang1:{
				audio:2,
				audioname:["liushan","re_liubei","re_liushan","ol_liushan"],
				trigger:{player:["useCardBegin","respondBegin"]},
				logTarget:"targets",
				filter:function(event,player){
					return event.skill=="jijiang";
				},
				forced:true,
				content:function(){
					"step 0"
					delete trigger.skill;
					trigger.getParent().set("jijiang",true);
					"step 1"
					if(event.current==undefined) event.current=player.next;
					if(event.current==player){
						player.addTempSkill("jijiang3");
						event.finish();
						trigger.cancel();
						trigger.getParent().goto(0);
					}
					else if(event.current.group==player.group){
						var next=event.current.chooseToRespond("是否替"+get.translation(player)+"打出一张杀？",{name:"sha"});
						next.set("ai",function(){
							var event=_status.event;
							return (get.attitude(event.player,event.source)-2);
						});
						next.set("source",player);
						next.set("jijiang",true);
						next.set("skillwarn","替"+get.translation(player)+"打出一张杀");
						next.noOrdering=true;
						next.autochoose=lib.filter.autoRespondSha;
					}
					else{
						event.current=event.current.next;
						event.redo();
					}
					"step 2"
					if(result.bool){
						event.finish();
						trigger.card=result.card;
						trigger.cards=result.cards;
						trigger.throw=false;
						if(typeof event.current.ai.shown=="number"&&event.current.ai.shown<0.95){
							event.current.ai.shown+=0.3;
							if(event.current.ai.shown>0.95) event.current.ai.shown=0.95;
						}
					}
					else{
						event.current=event.current.next;
						event.goto(1);
					}
				}
			},
			jijiang3:{
				trigger:{global:["useCardAfter","useSkillAfter","phaseAfter"]},
				silent:true,
				charlotte:true,
				filter:function(event){
					return event.skill!="jijiang"&&event.skill!="qinwang";
				},
				content:function(){
					player.removeSkill("jijiang3");
				}
			},
			wusheng:{
				audio:2,
				audioname2:{old_guanzhang:"old_fuhun"},
				audioname:["re_guanyu","guanzhang","jsp_guanyu","guansuo"],
				enable:["chooseToRespond","chooseToUse"],
				filterCard:function(card,player){
					if(get.zhu(player,"shouyue")) return true;
					return get.color(card)=="red";
				},
				position:"hes",
				viewAs:{name:"sha"},
				viewAsFilter:function(player){
					if(get.zhu(player,"shouyue")){
						if(!player.countCards("hes")) return false;
					}
					else{
						if(!player.countCards("hes",{color:"red"})) return false;
					}
				},
				prompt:"将一张红色牌当杀使用或打出",
				check:function(card){return 4-get.value(card)},
				ai:{
					skillTagFilter:function(player){
						if(get.zhu(player,"shouyue")){
							if(!player.countCards("hes")) return false;
						}
						else{
							if(!player.countCards("hes",{color:"red"})) return false;
						}
					},
					respondSha:true,
				}
			},
			zhongyi:{
				audio:2,
				enable:"phaseUse",
				limited:true,
				skillAnimation:true,
				animationColor:"orange",
				filterCard:true,
				position:"he",
				filter:function(event,player){
					return player.countCards("he")>0;
				},
				toStorage:true,
				discard:false,
				content:function(){
					player.awakenSkill("zhongyi");
					player.addTempSkill("zhongyi2","roundStart");
					player.markAuto("zhongyi2",cards);
				},
			},
			zhongyi2:{
				trigger:{global:"damageBegin1"},
				forced:true,
				popup:false,
				logTarget:"source",
				filter:function(event,player){
					return event.getParent().name=="sha"&&event.source&&event.source.isFriendOf(player);
				},
				content:function(){trigger.num++},
				intro:{content:"cards",onunmark:"throw"},
			},
			paoxiao:{
				audio:2,
				firstDo:true,
				audioname2:{old_guanzhang:"old_fuhun"},
				audioname:["re_zhangfei","guanzhang","xiahouba"],
				trigger:{player:"useCard1"},
				forced:true,
				filter:function(event,player){
					return !event.audioed&&event.card.name=="sha"&&player.countUsed("sha",true)>1&&event.getParent().type=="phase";
				},
				content:function(){
					trigger.audioed=true;
				},
				mod:{
					cardUsable:function(card,player,num){
						if(card.name=="sha") return Infinity;
					}
				},
				ai:{
					unequip:true,
					skillTagFilter:function(player,tag,arg){
						if(!get.zhu(player,"shouyue")) return false;
						if(arg&&arg.name=="sha") return true;
						return false;
					}
				}
			},
			guanxing_fail:{},
			guanxing:{
				audio:2,
				audioname:["jiangwei","re_jiangwei","re_zhugeliang"],
				trigger:{player:"phaseZhunbeiBegin"},
				frequent:true,
				preHidden:true,
				content:function(){
					"step 0"
					var num=Math.min(5,game.countPlayer());
					if(player.hasSkill("yizhi")&&player.hasSkill("guanxing")){
						num=5;
					}
					var cards=get.cards(num);
					game.cardsGotoOrdering(cards);
					var next=player.chooseToMove();
					next.set("list",[
						["牌堆顶",cards],
						["牌堆底"],
					]);
					next.set("prompt","观星：点击将牌移动到牌堆顶或牌堆底");
					next.processAI=function(list){
						var cards=list[0][1],player=_status.event.player;
						var top=[];
						var judges=player.getCards("j");
						var stopped=false;
						if(!player.hasWuxie()){
							for(var i=0;i<judges.length;i++){
								var judge=get.judge(judges[i]);
								cards.sort(function(a,b){
									return judge(b)-judge(a);
								});
								if(judge(cards[0])<0){
									stopped=true;break;
								}
								else{
									top.unshift(cards.shift());
								}
							}
						}
						var bottom;
						if(!stopped){
							cards.sort(function(a,b){
								return get.value(b,player)-get.value(a,player);
							});
							while(cards.length){
								if(get.value(cards[0],player)<=5) break;
								top.unshift(cards.shift());
							}
						}
						bottom=cards;
						return [top,bottom];
					}
					"step 1"
					var top=result.moved[0];
					var bottom=result.moved[1];
					top.reverse();
					for(var i=0;i<top.length;i++){
						ui.cardPile.insertBefore(top[i],ui.cardPile.firstChild);
					}
					for(i=0;i<bottom.length;i++){
						ui.cardPile.appendChild(bottom[i]);
					}
					player.popup(get.cnNumber(top.length)+"上"+get.cnNumber(bottom.length)+"下");
					game.log(player,"将"+get.cnNumber(top.length)+"张牌置于牌堆顶");
					game.updateRoundNumber();
					game.delayx();
				},
				ai:{
					threaten:1.2
				}
			},
			kongcheng:{
				mod:{
					targetEnabled:function(card,player,target,now){
						if(target.countCards("h")==0){
							if(card.name=="sha"||card.name=="juedou") return false;
						}
					}
				},
				group:"kongcheng1",
				audio:"kongcheng1",
				audioname:["re_zhugeliang"],
				ai:{
					noh:true,
					skillTagFilter:function(player,tag){
						if(tag=="noh"){
							if(player.countCards("h")!=1) return false;
						}
					}
				}
			},
			kongcheng1:{
				audio:2,
				trigger:{player:"loseEnd"},
				forced:true,
				firstDo:true,
				audioname:["re_zhugeliang"],
				filter:function(event,player){
					if(player.countCards("h")) return false;
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].original=="h") return true;
					}
					return false;
				},
				content:function(){}
			},
			longdan:{
				audio:"longdan_sha",
				audioname:["re_zhaoyun"],
				group:["longdan_sha","longdan_shan","longdan_draw"],
				subSkill:{
					draw:{
						trigger:{player:["useCard","respond"]},
						forced:true,
						popup:false,
						filter:function(event,player){
							if(!get.zhu(player,"shouyue")) return false;
							return event.skill=="longdan_sha"||event.skill=="longdan_shan";
						},
						content:function(){
							player.draw();
							player.storage.fanghun2++;
						}
					},
					sha:{
						audio:2,
						audioname:["re_zhaoyun"],
						enable:["chooseToUse","chooseToRespond"],
						filterCard:{name:"shan"},
						viewAs:{name:"sha"},
						viewAsFilter:function(player){
							if(!player.countCards("hs","shan")) return false;
						},
						position:"hs",
						prompt:"将一张闪当杀使用或打出",
						check:function(){return 1},
						ai:{
							effect:{
								target:function(card,player,target,current){
									if(get.tag(card,"respondSha")&&current<0) return 0.6
								}
							},
							respondSha:true,
							skillTagFilter:function(player){
								if(!player.countCards("hs","shan")) return false;
							},
							order:function(){
								return get.order({name:"sha"})+0.1;
							},
							useful:-1,
							value:-1
						}
					},
					shan:{
						audio:"longdan_sha",
						audioname:["re_zhaoyun"],
						enable:["chooseToRespond","chooseToUse"],
						filterCard:{name:"sha"},
						viewAs:{name:"shan"},
						prompt:"将一张杀当闪使用或打出",
						check:function(){return 1},
						position:"hs",
						viewAsFilter:function(player){
							if(!player.countCards("hs","sha")) return false;
						},
						ai:{
							respondShan:true,
							skillTagFilter:function(player){
								if(!player.countCards("hs","sha")) return false;
							},
							effect:{
								target:function(card,player,target,current){
									if(get.tag(card,"respondShan")&&current<0) return 0.6
								}
							},
							order:4,
							useful:-1,
							value:-1
						}
					}
				}
			},
			mashu:{
				mod:{
					globalFrom:function(from,to,distance){
						return distance-1;
					}
				}
			},
			mashu2:{
				mod:{
					globalFrom:function(from,to,distance){
						return distance-1;
					}
				}
			},
			feiying:{
				mod:{
					globalTo:function(from,to,distance){
						return distance+1;
					}
				}
			},
			tieji:{
				audio:2,
				shaRelated:true,
				trigger:{player:"useCardToPlayered"},
				check:function(event,player){
					return get.attitude(player,event.target)<=0;
				},
				filter:function(event,player){
					return event.card.name=="sha";
				},
				logTarget:"target",
				preHidden:true,
				content:function(){
					"step 0"
					player.judge(function(card){
						if(get.zhu(_status.event.player,"shouyue")){
							if(get.suit(card)!="spade") return 2;
						}
						else{
							if(get.color(card)=="red") return 2;
						}
						return -0.5;
					}).judge2=function(result){
						return result.bool;
					};
					"step 1"
					if(result.bool){
						trigger.getParent().directHit.add(trigger.target);
					}
				},
				ai:{
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						if(get.attitude(player,arg.target)>0||arg.card.name!="sha"||!ui.cardPile.firstChild||get.color(ui.cardPile.firstChild,player)!="red") return false;
					},
				},
			},
			jizhi:{
				audio:2,
				audioname:["jianyong"],
				trigger:{player:"useCard"},
				frequent:true,
				preHidden:true,
				filter:function(event){
					return (get.type(event.card)=="trick"&&event.card.isCard);
				},
				content:function(){
					player.draw();
				},
				ai:{
					threaten:1.4,
					noautowuxie:true,
				}
			},
			xinjizhi:{
				audio:"jizhi",
				trigger:{player:"useCard"},
				frequent:true,
				// alter:true,
				filter:function(event){
					if(!get.is.altered("xinjizhi")&&get.type(event.card)=="delay") return false;
					return (get.type(event.card,"trick")=="trick"&&event.cards[0]&&event.cards[0]==event.card);
				},
				init:function(player){
					player.storage.xinjizhi=0;
				},
				content:function(){
					"step 0"
					player.draw();
					"step 1"
					if(get.is.altered("xinjizhi")&&get.type(result[0])=="basic"){
						event.card=result[0];
						player.chooseBool("是否弃置"+get.translation(event.card)+"并令本回合手牌上限+1？").set("ai",function(evt,player){
							return _status.currentPhase==player&&player.needsToDiscard(-3)&&_status.event.value<6;
						}).set("value",get.value(event.card,player));
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool){
						player.discard(event.card);
						player.storage.xinjizhi++;
						if(_status.currentPhase==player){
							player.markSkill("xinjizhi");
						}
					}
				},
				ai:{
					threaten:1.4,
					noautowuxie:true,
				},
				mod:{
					maxHandcard:function(player,num){
						if(get.is.altered("xinjizhi")&&_status.currentPhase==player){
							return num+player.storage.xinjizhi;
						}
						return num;
					}
				},
				intro:{
					content:"本回合手牌上限+#"
				},
				group:"xinjizhi_clear",
				subSkill:{
					clear:{
						trigger:{global:"phaseAfter"},
						silent:true,
						content:function(){
							player.storage.xinjizhi=0;
							player.unmarkSkill("xinjizhi");
						}
					}
				}
			},
			qicai:{
				mod:{
					targetInRange:function(card,player,target,now){
						var type=get.type(card);
						if(type=="trick"||type=="delay") return true;
					}
				},
			},
			xinqicai:{
				// alter:true,
				mod:{
					targetInRange:function(card,player,target,now){
						var type=get.type(card);
						if(type=="trick"||type=="delay") return true;
					},
					canBeDiscarded:function(card){
						if(get.is.altered("xinqicai")&&get.position(card)=="e") return false;
					},
					cardDiscardable:function(card){
						if(get.is.altered("xinqicai")&&get.position(card)=="e") return false;
					}
				},
			},
			xinzhiheng:{
				audio:"zhiheng",
				enable:"phaseUse",
				// alter:true,
				usable:1,
				position:"he",
				filterCard:true,
				selectCard:[1,Infinity],
				check:function(card){
					var player=_status.event.player;
					if(get.is.altered("xinzhiheng")&&get.position(card)=="h"&&!player.countCards("h",function(card){
						return get.value(card)>=8;
					})){
						return 8-get.value(card);
					}
					return 6-get.value(card)
				},
				delay:0,
				content:function(){
					"step 0"
					if(!player.hasSkill("xinzhiheng_delay")) game.delayx();
					"step 1"
					player.draw(cards.length);
				},
				group:"xinzhiheng_draw",
				subSkill:{
					draw:{
						trigger:{player:"loseEnd"},
						silent:true,
						filter:function(event,player){
							if(event.getParent(2).skill!="xinzhiheng") return false;
							if(!get.is.altered("xinzhiheng")) return false;
							if(player.countCards("h")) return false;
							for(var i=0;i<event.cards.length;i++){
								if(event.cards[i].original=="h") return true;
							}
							return false;
						},
						content:function(){
							player.draw();
							player.addTempSkill("xinzhiheng_delay","xinzhihengAfter");
						}
					},
					delay:{}
				},
				ai:{
					order:1,
					result:{
						player:1
					},
					threaten:1.55
				},
			},
			zhiheng:{
				audio:2,
				audioname:["gz_jun_sunquan"],
				enable:"phaseUse",
				usable:1,
				position:"he",
				filterCard:true,
				selectCard:[1,Infinity],
				prompt:"弃置任意张牌并摸等量的牌",
				check:function(card){
					return 6-get.value(card)
				},
				content:function(){
					player.draw(cards.length);
				},
				ai:{
					order:1,
					result:{
						player:1
					},
					threaten:1.5
				},
			},
			jiuyuan:{
				audio:2,
				unique:true,
				trigger:{target:"taoBegin"},
				zhuSkill:true,
				forced:true,
				filter:function(event,player){
					if(event.player==player) return false;
					if(!player.hasZhuSkill("jiuyuan")) return false;
					if(event.player.group!=player.group) return false;
					return true;
				},
				content:function(){
					trigger.baseDamage++;
				}
			},
			xinjiuyuan:{
				audio:"jiuyuan",
				unique:true,
				// alter:true,
				trigger:{target:"taoBegin"},
				zhuSkill:true,
				forced:true,
				filter:function(event,player){
					if(get.is.altered("xinjiuyuan")) return false;
					if(event.player==player) return false;
					if(!player.hasZhuSkill("jiuyuan")) return false;
					if(player.hp>0) return false;
					if(event.player.group!=player.group) return false;
					return true;
				},
				content:function(){
					player.recover();
				},
				global:"xinjiuyuan2",
			},
			xinjiuyuan2:{
				audio:"jiuyuan",
				forceaudio:true,
				trigger:{player:"taoBegin"},
				filter:function(event,player){
					if(!get.is.altered("xinjiuyuan")) return false;
					return game.hasPlayer(function(target){
						return player!=target&&player.group==target.group&&target.isDamaged()&&target.hp<player.hp&&target.hasZhuSkill("xinjiuyuan",player);
					});
				},
				direct:true,
				content:function(){
					"step 0"
					var list=game.filterPlayer(function(target){
						return player!=target&&target.isDamaged()&&target.hp<player.hp&&target.hasZhuSkill("xinjiuyuan",player);
					});
					list.sortBySeat();
					event.list=list;
					"step 1"
					if(event.list.length){
						var current=event.list.shift();
						event.current=current;
						player.chooseBool(get.prompt("xinjiuyuan",current)).set("choice",get.attitude(player,current)>0);
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool){
						player.logSkill("xinjiuyuan",event.current);
						event.current.recover();
						player.draw();
					}
					event.goto(1);
				}
			},
			qixi:{
				audio:2,
				audioname:["re_ganning","re_heqi"],
				enable:"chooseToUse",
				filterCard:function(card){
					return get.color(card)=="black";
				},
				position:"hes",
				viewAs:{name:"guohe"},
				viewAsFilter:function(player){
					if(!player.countCards("hes",{color:"black"})) return false;
				},
				prompt:"将一张黑色牌当过河拆桥使用",
				check:function(card){return 4-get.value(card)}
			},
			keji:{
				audio:2,
				audioname:["re_lvmeng","sp_lvmeng"],
				trigger:{player:"phaseDiscardBefore"},
				frequent:function(event,player){
					return player.needsToDiscard();
				},
				filter:function(event,player){
					if(player.getHistory("skipped").contains("phaseUse")) return true;
					var history=player.getHistory("useCard").concat(player.getHistory("respond"));
					for(var i=0;i<history.length;i++){
						if(history[i].card.name=="sha"&&history[i].isPhaseUsing()) return false;
					}
					return true;
				},
				content:function(){
					trigger.cancel();
				}
			},
			kurou:{
				audio:2,
				enable:"phaseUse",
				prompt:"失去一点体力并摸两张牌",
				content:function(){
					"step 0"
					player.loseHp(1);
					"step 1"
					player.draw(2);
				},
				ai:{
					basic:{
						order:1
					},
					result:{
						player:function(player){
							if(player.countCards("h")>=player.hp-1) return -1;
							if(player.hp<3) return -1;
							return 1;
						}
					}
				}
			},
			yingzi:{
				audio:2,
				audioname:["sp_lvmeng"],
				trigger:{player:"phaseDrawBegin2"},
				frequent:true,
				filter:function(event,player){
					return !event.numFixed;
				},
				content:function(){
					trigger.num++;
				},
				ai:{
					threaten:1.3
				}
			},
			fanjian:{
				audio:2,
				enable:"phaseUse",
				usable:1,
				filter:function(event,player){
					return player.countCards("h")>0;
				},
				filterTarget:function(card,player,target){
					return player!=target;
				},
				content:function(){
					"step 0"
					target.chooseControl("heart2","diamond2","club2","spade2").set("ai",function(event){
						switch(Math.floor(Math.random()*6)){
							case 0:return "heart2";
							case 1:case 4:case 5:return "diamond2";
							case 2:return "club2";
							case 3:return "spade2";
						}
					});
					"step 1"
					game.log(target,"选择了"+get.translation(result.control));
					event.choice=result.control;
					target.popup(event.choice);
					event.card=player.getCards("h").randomGet();
					target.gain(event.card,player,"give");
					game.delay();
					"step 2"
					if(get.suit(event.card)+"2"!=event.choice) target.damage("nocard");
				},
				ai:{
					order:1,
					result:{
						target:function(player,target){
							var eff=get.damageEffect(target,player);
							if(eff>=0) return 1+eff;
							var value=0,i;
							var cards=player.getCards("h");
							for(i=0;i<cards.length;i++){
								value+=get.value(cards[i]);
							}
							value/=player.countCards("h");
							if(target.hp==1) return Math.min(0,value-7);
							return Math.min(0,value-5);
						}
					}
				}
			},
			guose:{
				audio:2,
				filter:function(event,player){
					return player.countCards("hes",{suit:"diamond"})>0;
				},
				enable:"chooseToUse",
				filterCard:function(card){
					return get.suit(card)=="diamond";
				},
				position:"hes",
				viewAs:{name:"lebu"},
				prompt:"将一张方片牌当乐不思蜀使用",
				check:function(card){return 6-get.value(card)},
				ai:{
					threaten:1.5
				}
			},
			liuli:{
				audio:2,
				audioname:["re_daqiao","daxiaoqiao"],
				trigger:{target:"useCardToTarget"},
				direct:true,
				preHidden:true,
				filter:function(event,player){
					if(event.card.name!="sha") return false;
					if(player.countCards("he")==0) return false;
					return game.hasPlayer(function(current){
						return player.inRange(current)&&current!=event.player&&
							current!=player&&lib.filter.targetEnabled(event.card,event.player,current);
					});
				},
				content:function(){
					"step 0"
					var next=player.chooseCardTarget({
						position:"he",
						filterCard:lib.filter.cardDiscardable,
						filterTarget:function(card,player,target){
							var trigger=_status.event;
							if(player.inRange(target)&&target!=trigger.source){
								if(lib.filter.targetEnabled(trigger.card,trigger.source,target)) return true;
							}
							return false;
						},
						ai1:function(card){
							return get.unuseful(card)+9;
						},
						ai2:function(target){
							if(_status.event.player.countCards("h","shan")){
								return -get.attitude(_status.event.player,target);
							}
							if(get.attitude(_status.event.player,target)<5){
								return 6-get.attitude(_status.event.player,target);
							}
							if(_status.event.player.hp==1&&player.countCards("h","shan")==0){
								return 10-get.attitude(_status.event.player,target);
							}
							if(_status.event.player.hp==2&&player.countCards("h","shan")==0){
								return 8-get.attitude(_status.event.player,target);
							}
							return -1;
						},
						prompt:get.prompt("liuli"),
						prompt2:"弃置一张牌，将此【杀】转移给攻击范围内的一名其他角色",
						source:trigger.player,
						card:trigger.card,
					}).setHiddenSkill(event.name);
					"step 1"
					if(result.bool){
						var target=result.targets[0];
						player.logSkill(event.name,target);
						player.discard(result.cards);
						var evt=trigger.getParent();
						evt.triggeredTargets2.remove(player);
						evt.targets.remove(player);
						evt.targets.push(target);
					}
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(target.countCards("he")==0) return;
							if(card.name!="sha") return;
							var min=1;
							var friend=get.attitude(player,target)>0;
							var vcard={name:"shacopy",nature:card.nature,suit:card.suit};
							var players=game.filterPlayer();
							for(var i=0;i<players.length;i++){
								if(player!=players[i]&&
									get.attitude(target,players[i])<0&&
									target.canUse(card,players[i])){
									if(!friend) return 0;
									if(get.effect(players[i],vcard,player,player)>0){
										if(!player.canUse(card,players[0])){
											return [0,0.1];
										}
										min=0;
									}
								}
							}
							return min;
						}
					}
				}
			},
			qianxun:{
				mod:{
					targetEnabled:function(card,player,target,now){
						if(card.name=="shunshou"||card.name=="lebu") return false;
					}
				},
				audio:2,
			},
			lianying:{
				audio:2,
				trigger:{
					player:"loseAfter",
					global:["equipAfter","addJudgeAfter","gainAfter","loseAsyncAfter"],
				},
				frequent:true,
				filter:function(event,player){
					if(player.countCards("h")) return false;
					var evt=event.getl(player);
					return evt&&evt.player==player&&evt.hs&&evt.hs.length>0;
				},
				content:function(){
					player.draw();
				},
				ai:{
					threaten:0.8,
					effect:{
						target:function(card){
							if(card.name=="guohe"||card.name=="liuxinghuoyu") return 0.5;
						}
					},
					noh:true,
					skillTagFilter:function(player,tag){
						if(tag=="noh"){
							if(player.countCards("h")!=1) return false;
						}
					}
				}
			},
			xiaoji:{
				audio:2,
				audioname:["sp_sunshangxiang","re_sunshangxiang"],
				trigger:{
					player:"loseAfter",
					global:["equipAfter","addJudgeAfter","gainAfter","loseAsyncAfter"],
				},
				frequent:true,
				filter:function(event,player){
					var evt=event.getl(player);
					return evt&&evt.player==player&&evt.es&&evt.es.length>0;
				},
				content:function(){
					"step 0"
					event.count=trigger.getl(player).es.length;
					"step 1"
					event.count--;
					player.draw(2);
					"step 2"
					if(event.count>0){
						player.chooseBool(get.prompt2("xiaoji")).set("frequentSkill","xiaoji").ai=lib.filter.all;
					}
					"step 3"
					if(result.bool){
						player.logSkill("xiaoji");
						event.goto(1);
					}
				},
				ai:{
					noe:true,
					reverseEquip:true,
					effect:{
						target:function(card,player,target,current){
							if(get.type(card)=="equip"&&!get.cardtag(card,"gifts")) return [1,3];
						}
					}
				}
			},
			jieyin:{
				audio:2,
				enable:"phaseUse",
				filterCard:true,
				usable:1,
				selectCard:2,
				check:function(card){
					var player=get.owner(card);
					if(player.countCards("h")>player.hp)
						return 8-get.value(card)
					if(player.hp<player.maxHp)
						return 6-get.value(card)
					return 4-get.value(card)
				},
				filterTarget:function(card,player,target){
					if(!target.hasSex("male")) return false;
					if(target.hp>=target.maxHp) return false;
					if(target==player) return false;
					return true;
				},
				content:function(){
					player.recover();
					target.recover();
				},
				ai:{
					order:5.5,
					result:{
						player:function(player){
							if(player.hp<player.maxHp) return 4;
							if(player.countCards("h")>player.hp) return 0
							return -1;
						},
						target:4
					},
					threaten:2,
				}
			},
			xinjieyin:{
				group:["xinjieyin_old","xinjieyin_new"],
				// alter:true,
				subSkill:{
					new:{
						audio:"jieyin",
						enable:"phaseUse",
						filterCard:true,
						usable:1,
						position:"he",
						filter:function(event,player){
							if(!get.is.altered("xinjieyin")) return false;
							return player.countCards("he")>0;
						},
						check:function(card){
							var player=_status.event.player;
							if(get.position(card)=="e"){
								var subtype=get.subtype(card);
								if(!game.hasPlayer(function(current){
									return current!=player&&current.hp!=player.hp&&get.attitude(player,current)>0&&!current.countCards("e",{subtype:subtype});
								})){
									return 0;
								}
								if(player.countCards("h",{subtype:subtype})) return 20-get.value(card);
								return 10-get.value(card);
							}
							else{
								if(player.countCards("e")) return 0;
								if(player.countCards("h",{type:"equip"})) return 0;
								return 8-get.value(card);
							}
						},
						filterTarget:function(card,player,target){
							if(!target.hasSex("male")) return false;
							var card=ui.selected.cards[0];
							if(!card) return false;
							if(get.position(card)=="e"&&target.countCards("e",{subtype:get.subtype(card)})) return false;
							return true;
						},
						discard:false,
						delay:0,
						lose:false,
						content:function(){
							"step 0"
							if(get.position(cards[0])=="e"){
								player.$give(cards,target);
								target.equip(cards[0]);
							}
							else{
								player.discard(cards);
							}
							"step 1"
							if(player.hp>target.hp){
								player.draw();
								if(target.isDamaged()) target.recover();
							}
							else if(player.hp<target.hp){
								target.draw();
								if(player.isDamaged()) player.recover();
							}
						},
						ai:{
							order:function(){
								var player=_status.event.player;
								var es=player.getCards("e");
								for(var i=0;i<es.length;i++){
									if(player.countCards("h",{subtype:get.subtype(es[i])})) return 10;
								}
								return 2;
							},
							result:{
								target:function(player,target){
									var goon=function(){
										var es=player.getCards("e");
										for(var i=0;i<es.length;i++){
											if(player.countCards("h",{subtype:get.subtype(es[i])})) return true;
										}
										return false;
									}
									if(player.hp<target.hp){
										if(player.isHealthy()){
											if(!player.needsToDiscard(1)||goon()) return 0.1;
											return 0;
										}
										return 1.5;
									}
									if(player.hp>target.hp){
										if(target.isHealthy()){
											if(!player.needsToDiscard(1)||goon()) return 0.1;
											return 0;
										}
										return 1;
									}
									return 0;
								}
							}
						}
					},
					old:{
						audio:"jieyin",
						enable:"phaseUse",
						filterCard:true,
						usable:1,
						selectCard:2,
						filter:function(event,player){
							if(get.is.altered("xinjieyin")) return false;
							return player.countCards("h")>=2;
						},
						check:function(card){
							var player=get.owner(card);
							if(player.countCards("h")>player.hp)
								return 8-get.value(card)
							if(player.hp<player.maxHp)
								return 6-get.value(card)
							return 4-get.value(card)
						},
						filterTarget:function(card,player,target){
							if(!target.hasSex("male")) return false;
							if(target.hp>=target.maxHp) return false;
							if(target==player) return false;
							return true;
						},
						content:function(){
							player.recover();
							target.recover();
						},
						ai:{
							order:5.5,
							result:{
								player:function(player){
									if(player.hp<player.maxHp) return 4;
									if(player.countCards("h")>player.hp) return 0
									return -1;
								},
								target:4
							}
						}
					}
				},
				ai:{
					threaten:2.3
				}
			},
			qingnang:{
				audio:2,
				enable:"phaseUse",
				filterCard:true,
				usable:1,
				check:function(card){
					return 9-get.value(card)
				},
				filterTarget:function(card,player,target){
					if(target.hp>=target.maxHp) return false;
					return true;
				},
				content:function(){
					target.recover();
				},
				ai:{
					order:9,
					result:{
						target:function(player,target){
							if(target.hp==1) return 5;
							if(player==target&&player.countCards("h")>player.hp) return 5;
							return 2;
						}
					},
					threaten:2
				}
			},
			jijiu:{
				mod:{
					aiValue:function(player,card,num){
						if(get.name(card)!="tao"&&get.color(card)!="red") return;
						var cards=player.getCards("hs",function(card){
							return get.name(card)=="tao"||get.color(card)=="red";
						});
						cards.sort(function(a,b){
							return (get.name(a)=="tao"?1:2)-(get.name(b)=="tao"?1:2);
						});
						var geti=function(){
							if(cards.contains(card)){
								return cards.indexOf(card);
							}
							return cards.length;
						};
						return Math.max(num,[6.5,4,3,2][Math.min(geti(),2)]);
					},
					aiUseful:function(){
						return lib.skill.kanpo.mod.aiValue.apply(this,arguments);
					},
				},
				locked:false,
				audio:2,
				audioname:["re_huatuo"],
				enable:"chooseToUse",
				viewAsFilter:function(player){
					return player!=_status.currentPhase&&player.countCards("hes",{color:"red"})>0;
				},
				filterCard:function(card){
					return get.color(card)=="red";
				},
				position:"hes",
				viewAs:{name:"tao"},
				prompt:"将一张红色牌当桃使用",
				check:function(card){return 15-get.value(card)},
				ai:{
					threaten:1.5,
				}
			},
			wushuang:{
				shaRelated:true,
				audio:2,
				audioname:["re_lvbu","shen_lvbu","lvlingqi"],
				forced:true,
				locked:true,
				group:["wushuang1","wushuang2"],
				preHidden:["wushuang1","wushuang2"],
			},
			wushuang1:{
				audio:"wushuang",
				audioname:["re_lvbu","shen_lvbu","lvlingqi"],
				trigger:{player:"useCardToPlayered"},
				forced:true,
				filter:function(event,player){
					return event.card.name=="sha"&&!event.getParent().directHit.contains(event.target);
				},
				//priority:-1,
				logTarget:"target",
				content:function(){
					var id=trigger.target.playerid;
					var map=trigger.getParent().customArgs;
					if(!map[id]) map[id]={};
					if(typeof map[id].shanRequired=="number"){
						map[id].shanRequired++;
					}
					else{
						map[id].shanRequired=2;
					}
				},
				ai:{
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						if(arg.card.name!="sha"||arg.target.countCards("h","shan")>1) return false;
					},
				},
			},
			wushuang2:{
				audio:"wushuang",
				audioname:["re_lvbu","shen_lvbu","lvlingqi"],
				trigger:{player:"useCardToPlayered",target:"useCardToTargeted"},
				forced:true,
				logTarget:function(trigger,player){
					return player==trigger.player?trigger.target:trigger.player
				},
				filter:function(event,player){
					return event.card.name=="juedou";
				},
				//priority:-1,
				content:function(){
					var id=(player==trigger.player?trigger.target:trigger.player)["playerid"];
					var idt=trigger.target.playerid;
					var map=trigger.getParent().customArgs;
					if(!map[idt]) map[idt]={};
					if(!map[idt].shaReq) map[idt].shaReq={};
					if(!map[idt].shaReq[id]) map[idt].shaReq[id]=1;
					map[idt].shaReq[id]++;
				},
				ai:{
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						if(arg.card.name!="juedou"||Math.floor(arg.target.countCards("h","sha")/2)>player.countCards("h","sha")) return false;
					}
				}
			},
			zhanshen:{
				audio:2,
				trigger:{player:"phaseZhunbeiBegin"},
				forced:true,
				skillAnimation:true,
				animationColor:"gray",
				filter:function(event,player){
					return player.isDamaged()&&game.dead.filter(function(target){
						return target.isFriendOf(player);
					}).length>0
				},
				content:function(){
					player.awakenSkill("zhanshen");
					var card=player.getEquip(1);
					if(card) player.discard(card);
					player.loseMaxHp();
					player.addSkill("mashu");
					player.addSkill("shenji");
				},
				derivation:["mashu","shenji"],
			},
			shenji:{
				mod:{
					selectTarget:function(card,player,range){
						if(range[1]==-1) return;
						if(card.name=="sha") range[1]+=2;
					},
					cardUsable:function(card,player,num){
						if(card.name=="sha") return num+1;
					}
				},
			},
			lijian:{
				audio:2,
				audioname:["re_diaochan"],
				enable:"phaseUse",
				usable:1,
				filter:function(event,player){
					return game.countPlayer(function(current){
						return current!=player&&current.hasSex("male");
					})>1;
				},
				check:function(card){return 10-get.value(card)},
				filterCard:true,
				position:"he",
				filterTarget:function(card,player,target){
					if(player==target) return false;
					if(!target.hasSex("male")) return false;
					if(ui.selected.targets.length==1){
						return target.canUse({name:"juedou"},ui.selected.targets[0]);
					}
					return true;
				},
				targetprompt:["先出杀","后出杀"],
				selectTarget:2,
				multitarget:true,
				content:function(){
					targets[1].useCard({name:"juedou",isCard:true},"nowuxie",targets[0],"noai").animate=false;
					game.delay(0.5);
				},
				ai:{
					order:8,
					result:{
						target:function(player,target){
							if(ui.selected.targets.length==0){
								return -3;
							}
							else{
								return get.effect(target,{name:"juedou"},ui.selected.targets[0],target);
							}
						}
					},
					expose:0.4,
					threaten:3,
				}
			},
			biyue:{
				audio:2,
				trigger:{player:"phaseJieshuBegin"},
				frequent:true,
				preHidden:true,
				content:function(){
					player.draw();
				},
			},
			xinbiyue:{
				audio:"biyue",
				trigger:{player:"phaseJieshuBegin"},
				frequent:true,
				// alter:true,
				content:function(){
					var num=1;
					if(get.is.altered("xinbiyue")&&!player.countCards("h")){
						num=2;
					}
					player.draw(num);
				},
			},
			yaowu:{
				trigger:{player:"damageBegin3"},
				//priority:1,
				audio:2,
				filter:function(event){
					if(event.card&&(event.card.name=="sha")){
						if(get.color(event.card)=="red") return true;
					}
					return false;
				},
				forced:true,
				check:function(){
					return false;
				},
				content:function(){
					trigger.source.chooseDrawRecover(true);
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(card.name=="sha"&&(get.color(card)=="red")){
								return [1,-2];
							}
						}
					}
				}
			},
			new_jiangchi:{
				audio:2,
				trigger:{
					player:"phaseDrawEnd",
				},
				direct:true,
				content:function (){
					"step 0"
					var list=["弃牌","摸牌","取消"];
					if(!player.countCards("he")) list.remove("弃牌");
					player.chooseControl(list,function(){
						var player=_status.event.player;
						if(list.contains("弃牌")){
							if(player.countCards("h")>3&&player.countCards("h","sha")>1){
								return "弃牌";
							}
							if(player.countCards("h","sha")>2){
								return "弃牌";
							}
						}
						if(!player.countCards("h","sha")){
							return "摸牌";
						}
						return "cancel2";
					}).set("prompt",get.prompt2("new_jiangchi"));
					"step 1"
					if(result.control=="弃牌"){
						player.chooseToDiscard(true,"he");
						player.addTempSkill("jiangchi2","phaseUseEnd");
						player.logSkill("new_jiangchi");
					}
					else if(result.control=="摸牌"){
						player.draw();
						player.addTempSkill("new_jiangchi3","phaseEnd");
						player.logSkill("new_jiangchi");
					}
				},
			},
			new_jiangchi3:{
				mod:{
					cardEnabled:function(card){
						if(card.name=="sha") return false;
					},
					cardRespondable:function(card){
						if(card.name=="sha") return false;
					},
					ignoredHandcard:function(card,player){
						if(get.name(card)=="sha"){
							return true;
						}
					},
					cardDiscardable:function(card,player,name){
						if(name=="phaseDiscard"&&get.name(card)=="sha"){
							return false;
						}
					},
				},
			},
			xinfu_jijie:{
				enable:"phaseUse",
				usable:1,
				audio:2,
				//filter:function(){
					//return ui.cardPile.hasChildNodes();
				//},
				content:function (){
					"step 0"
					//event.card=ui.cardPile.lastChild;
					event.card=get.bottomCards()[0];
					var content=["牌堆底的一张牌",[event.card]];
					game.log(player,"观看了牌堆底的一张牌");
					player.chooseControl("ok").set("dialog",content);
					"step 1"
					player.chooseTarget("选择获得此牌的角色").set("ai",function(target){
							var att=get.attitude(_status.event.player,target);
							if(_status.event.du){
								if(target.hasSkillTag("nodu")) return 0.5;
								return -att;
							}
						if(att>0){
								if(_status.event.player!=target) att+=2;
								return att+Math.max(0,5-target.countCards("h"));
							}
							return att;
					}).set("du",event.card.name=="du").set("same",event.same);
					"step 2"
					if(result.bool){
						event.target=result.targets[0];
						player.line(event.target,"green");
						player.give(event.card,event.target);
					}
					else ui.cardPile.appendChild(event.card);
					game.updateRoundNumber();
				},
				ai:{
					order:7.2,
					result:{
						player:1,
					},
				},
			},
			xinfu_jiyuan:{
				trigger:{
					global:"dying",
					source:"gainAfter",
				},
				//priority:6,
				audio:2,
				filter:function (event,player){
					if(event.name=="dying") return true;
					return event.player!=player&&event.bySelf!=true;
				},
				check:function (event,player){
					return get.attitude(player,event.player)>0;
				},
				logTarget:"player",
				content:function (){
					trigger.player.draw();
				},
			},
			reyicong:{
				trigger:{
					player:["changeHp"],
				},
				audio:2,
				audioname:{gongsunzan:"yicong"},
				forced:true,
				filter:function(event,player){
					return get.sgn(player.hp-2.5)!=get.sgn(player.hp-2.5-event.num);
				},
				content:function (){},
				mod:{
					globalFrom:function(from,to,current){
						return current-1;
					},
					globalTo:function(from,to,current){
						if(to.hp<=2) return current+1;
					},
				},
				ai:{
					threaten:0.8
				}
			},
			//SST
			//Samus
			old_sst_juezhan:{
				mod:{
					cardUsable:function (card,player,num){
						if(card.name=="sha") return num+player.getDamagedHp();
					},
					attackFrom:function (from,to,distance){
						return distance-from.getDamagedHp();
					}
				}
			},
			old_sst_zailu:{
				trigger:{
					global:"dieAfter",
				},
				filter:function (event,player){
					return true;
				},
				frequent:true,
				content:function (){
					"step 0"
					player.draw();
					"step 1"
					if(!player.storage.old_sst_zailu2) player.storage.old_sst_zailu2=0;
					if(!player.storage.old_sst_zailu3) player.storage.old_sst_zailu3=0;
					/*
					if(game.players.length<=player.storage.old_sst_zailu3+1){
						game.log(player,"选择了","摸牌阶段摸牌数+1");
						player.popup("摸牌+1");
						player.storage.old_sst_zailu2++;
						event.finish();
					}
					*/
					player.chooseControl("摸牌阶段摸牌数+1","使用基本牌或普通锦囊牌可以额外指定一个目标").set("ai",function(){
						//return ["摸牌阶段摸牌数+1","使用牌可以额外指定一个目标"].randomGet();
						var players=game.filterPlayer(function(current){
							return get.attitude(player,current)<0;
						});
						if(players&&players.length>player.storage.old_sst_zailu3+1){
							return "使用基本牌或普通锦囊牌可以额外指定一个目标";
						}
						else{
							return "摸牌阶段摸牌数+1";
						}
					});
					"step 2"
					if(result.control=="使用基本牌或普通锦囊牌可以额外指定一个目标"){
						game.log(player,"选择了","#y使用基本牌或普通锦囊牌可以额外指定一个目标");
						player.popup("额外目标");
						player.storage.old_sst_zailu3++;
					}
					else{
						game.log(player,"选择了","#y摸牌阶段摸牌数+1");
						player.popup("摸牌+1");
						player.storage.old_sst_zailu2++;
					}
				},
				group:["old_sst_zailu2","old_sst_zailu3"]
			},
			old_sst_zailu2:{
				trigger:{
					player:"phaseDrawBegin2",
				},
				locked:false,
				forced:true,
				filter:function (event,player){
					return player.storage.old_sst_zailu2&&!event.numFixed;
				},
				content:function (){
					trigger.num+=player.storage.old_sst_zailu2;
				},
				ai:{
					threaten:function (player,target){
						if(!player.storage.old_sst_zailu2) return 1;
						return 1+player.storage.old_sst_zailu2*0.2;
					}
				}
			},
			old_sst_zailu3:{
				trigger:{
					player:"useCard2",
				},
				filter:function (event,player){
					if(!player.storage.old_sst_zailu3) return false;
					if(get.type(event.card)!="basic"&&get.type(event.card)!="trick") return false;
					return game.hasPlayer(function(current){
						//return !event.targets.contains(current)&&player.canUse(event.card,current);
						return !event.targets.contains(current)&&lib.filter.targetEnabled2(event.card,player,current);
					});
				},
				direct:true,
				content:function (){
					"step 0"
					player.chooseTarget(get.prompt("old_sst_zailu"),"为"+get.translation(trigger.card)+"增加目标",[1,player.storage.old_sst_zailu3],function(card,player,target){
						return !_status.event.sourcex.contains(target)&&lib.filter.targetEnabled2(_status.event.card,player,target);
					}).set("sourcex",trigger.targets).set("card",trigger.card).set("ai",function(target){
						var player=_status.event.player;
						return get.effect(target,_status.event.card,player,player);
					});
					"step 1"
					if(result.bool){
						if(!event.isMine()&&!_status.connectMode) game.delayx();
						event.targets=result.targets;
					}
					else{
						event.finish();
					}
					"step 2"
					player.logSkill("old_sst_zailu",event.targets);
					trigger.targets.addArray(event.targets);
				},
				ai:{
					threaten:function (player,target){
						if(!player.storage.old_sst_zailu3) return 1;
						return 1+player.storage.old_sst_zailu3*0.2;
					}
				}
			},
			//Ken
			old_sst_yanyang:{
				enable:"chooseToUse",
				filterCard:function(){return true},
				selectCard:[1,2],
				position:"he",
				viewAs:{name:"huogong",nature:"fire"},
				viewAsFilter:function(player){
					if(!player.countCards("he")) return false;
				},
				check:function(card){
					var player=_status.currentPhase;
					if(player.countCards("he")>player.hp){
						return 6-get.value(card);
					}
					return 3-get.value(card);
				},
				group:["old_sst_yanyang2"],
			},
			old_sst_yanyang2:{
				trigger:{player:"useCard1"},
				filter:function(event,player){
					return event.skill=="old_sst_yanyang";
				},
				silent:true,
				content:function(){
					if(typeof trigger.baseDamage!="number") trigger.baseDamage=1;
					trigger.baseDamage+=trigger.cards.length-1;
				},
				ai:{
					damageBonus:true
				}
			},
			//Claude
			old_ymk_yunchou:{
				group:["old_ymk_yunchou2"],
				init:function(player){
					if(!player.storage.old_ymk_yunchou) player.storage.old_ymk_yunchou=[];
				},
				intro:{
					name:"运筹",
					name2:"筹",
					content:"cards",
					onunmark:function(storage,player){
						if(storage&&storage.length){
							player.$throw(storage,1000);
							game.cardsDiscard(storage);
							game.log(storage,"被置入了弃牌堆");
							storage.length=0;
						}
					},
				},
				trigger:{
					player:"phaseDiscardBegin",
				},
				direct:true,
				filter:function(event,player){
					return player.storage.old_ymk_yunchou.length==0&&player.countCards("he");
				},
				content:function(){
					"step 0"
					player.chooseCard(get.prompt("old_ymk_yunchou"),"你可以将最多"+get.cnNumber(Math.max(1,player.getDamagedHp()))+"张牌置于武将牌上","he",[1,Math.max(1,player.getDamagedHp())]).set("ai",function(card){
						return 11-get.value(card);
					});
					"step 1"
					if(result.cards&&result.cards.length){
						player.logSkill("old_ymk_yunchou");
						player.lose(result.cards,ui.special,"toStorage");
						player.$give(result.cards,player,"visible",false);
						player.storage.old_ymk_yunchou=player.storage.old_ymk_yunchou.concat(result.cards);
						player.syncStorage("old_ymk_yunchou");
						player.markSkill("old_ymk_yunchou");
						game.log(player,"将",result.cards,"置于武将牌上");
					}
				}
				/*
				ai:{
					effect:{
						player:function(card,player){
							if(player.countCards("h")<=2) return [-1,-3];
						},
					},
				},
				*/
			},
			old_ymk_yunchou2:{
				trigger:{
					player:"moveLastCardFromStorage",
				},
				filter:function(event,player){
					return true;
				},
				direct:true,
				content:function(){
					"step 0"
					if(!player.getDamagedHp()&&!player.canMoveCard(true)){
						event.finish();
					}
					else if(player.getDamagedHp()&&!player.canMoveCard(true)){
						player.chooseControl("回复一点体力","cancel2").set("prompt",get.prompt("old_ymk_yunchou")).set("prompt2","你可以回复一点体力").set("ai",function(){
							var player=_status.event.player;
							if(player.getDamagedHp()>0&&get.recoverEffect(player,player,player)>0){
								return "回复一点体力";
							}
							else{
								return "cancel2";
							}
						});
					}
					else if(!player.getDamagedHp()&&player.canMoveCard(true)){
						player.chooseControl("移动场上的一张牌","cancel2").set("prompt",get.prompt("old_ymk_yunchou")).set("prompt2","你可以移动场上的一张牌").set("ai",function(){
							var player=_status.event.player;
							if(player.canMoveCard(true)){
								return "移动场上的一张牌";
							}
							else{
								return "cancel2";
							}
						});
					}
					else{
						player.chooseControl("回复一点体力","移动场上的一张牌","cancel2").set("prompt",get.prompt("old_ymk_yunchou")).set("prompt2","你可以回复一点体力或移动场上的一张牌").set("ai",function(){
							var player=_status.event.player;
							if(player.getDamagedHp()>0&&get.recoverEffect(player,player,player)>0){
								return "回复一点体力";
							}
							else if(player.canMoveCard(true)){
								return "移动场上的一张牌";
							}
							else{
								return "cancel2";
							}
						});
					}
					"step 1"
					switch(result.control){
						case "回复一点体力":{
							player.logSkill("old_ymk_yunchou");
							player.recover();
							break;
						}
						case "移动场上的一张牌":{
							player.logSkill("old_ymk_yunchou");
							player.moveCard();
							break;
						}
						default:{
							event.finish();
							break;
						}
					}
				},
				ai:{
					expose:0.2
				}
			},
			old_ymk_guimou:{
				group:["old_ymk_guimou2","old_ymk_guimou3","old_ymk_guimou4","old_ymk_guimou5"],
				enable:"chooseToUse",
				filter:function(event,player){
					/*
					if(event.type=="wuxie"||event.type=="respondShan"||!player.storage.old_ymk_yunchou||!player.storage.old_ymk_yunchou.length) return false;
					var list=["sha","tao","shan","jiu","taoyuan","wugu","juedou","huogong","jiedao","tiesuo","guohe","shunshou","wuzhong","wanjian","nanman"];
					if(get.mode()=="guozhan"){
						list=list.concat(["xietianzi","shuiyanqijunx","lulitongxin","lianjunshengyan","chiling","diaohulishan","yuanjiao","huoshaolianying"]);
					}
					for(var i=0;i<list.length;i++){
						if(event.filterCard({name:list[i]},player)) return true;
					}
					return false;
					*/
					return event.type!="wuxie"&&event.type!="respondShan"&&player.storage.old_ymk_yunchou&&player.storage.old_ymk_yunchou.length;
				},
				chooseButton:{
					dialog:function(){
						var list=[];
						for(var i=0;i<lib.inpile.length;i++){
							var name=lib.inpile[i];
							if(name=="wuxie") continue;
							if(name=="sha"){
								list.push(["基本","","sha"]);
								list.push(["基本","","sha","fire"]);
								list.push(["基本","","sha","thunder"]);
								list.push(["基本","","sha","ice"]);
							}
							else if(get.type(name)=="trick") list.push(["锦囊","",name]);
							else if(get.type(name)=="basic") list.push(["基本","",name]);
						}
						return ui.create.dialog("鬼谋",[list,"vcard"]);
					},
					filter:function(button,player){
						/*
						var evt=_status.event.getParent();
						if(evt&&evt.filterCard){
							return evt.filterCard({name:button.link[2]},player,evt);
						}
						return true;
						*/
						return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
					},
					check:function(button){
						var player=_status.event.player;
						if(player.countCards("hs",button.link[2])>0) return 0;
						if(button.link[2]=="wugu") return;
						var effect=player.getUseValue(button.link[2]);
						if(effect>0) return effect;
						return 0;
					},
					backup:function(links,player){
						return {
							filterCard:function(){return false;},
							selectCard:-1,
							viewAs:{name:links[0][2],nature:links[0][3]},
						}
					},
					prompt:function(links,player){
						return "将武将牌上的一张牌置于牌堆顶，视为你使用一张"+get.translation(links[0][2]);
					},
				},
				ai:{
					threaten:2,
					order:5,
					result:{
						player:1
					},
					save:true,
					respondSha:true,
					respondTao:true,
					skillTagFilter:function(player){
						if(!player.storage.old_ymk_yunchou||!player.storage.old_ymk_yunchou.length) return false;
					}
				}
			},
			old_ymk_guimou2:{
				trigger:{player:"useCardBefore"},
				filter:function(event,player){
					return event.skill=="old_ymk_guimou_backup"||event.skill=="old_ymk_guimou4"||event.skill=="old_ymk_guimou5";
				},
				silent:true,
				priority:15,
				content:function(){
					"step 0"
					player.logSkill("old_ymk_guimou");
					player.chooseCardButton("鬼谋：选择武将牌上的一张牌",player.storage.old_ymk_yunchou,true).set("ai",function(button){
						return 1/Math.max(0.1,get.value(button.link));
					});
					"step 1"
					if(result.links){
						event.card=result.links[0];
						//game.cardsDiscard(card);
						player.$throw(event.card,1000);
						player.storage.old_ymk_yunchou.remove(event.card);
						player.syncStorage("old_ymk_yunchou");
						player.updateMarks();
						game.delayx();
						if(!player.storage.old_ymk_yunchou.length){
							player.unmarkSkill("old_ymk_yunchou");
							event.trigger("moveLastCardFromStorage");
						}
					}
					else{
						event.finish();
					}
					"step 2"
					event.card.fix();
					ui.cardPile.insertBefore(event.card,ui.cardPile.firstChild);
					game.log(player,"将",event.card,"置于牌堆顶");
					game.updateRoundNumber();
				}
			},
			old_ymk_guimou3:{
				trigger:{player:"chooseToRespondBegin"},
				filter:function(event,player){
					if(event.responded) return false;
					if(!event.filterCard({name:"shan"})&&!event.filterCard({name:"sha"})) return false;
					if(!player.storage.old_ymk_yunchou||!player.storage.old_ymk_yunchou.length) return false;
					return true;
				},
				direct:true,
				content:function(){
					"step 0"
					if(trigger.filterCard({name:"shan"})&&lib.filter.cardRespondable({name:"shan"},player,trigger)) event.name="shan";
					else event.name="sha";
					player.chooseBool(get.prompt("old_ymk_guimou"),"你可以将武将牌上的一张牌置于牌堆顶，视为打出一张"+get.translation(event.name)).set("ai",function(){
						return true;
					});
					"step 1"
					if(result.bool){
						player.logSkill("old_ymk_guimou");
						player.chooseCardButton("鬼谋：选择武将牌上的一张牌",player.storage.old_ymk_yunchou,true).set("ai",function(button){
							return 1/Math.max(0.1,get.value(button.link));
						});
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.links){
						event.card=result.links[0];
						player.$throw(event.card,1000);
						player.storage.old_ymk_yunchou.remove(event.card);
						player.syncStorage("old_ymk_yunchou");
						player.updateMarks();
						if(!player.storage.old_ymk_yunchou.length) {
							player.unmarkSkill("old_ymk_yunchou");
							event.trigger("moveLastCardFromStorage");
						}
					}
					"step 3"
					event.card.fix();
					ui.cardPile.insertBefore(event.card,ui.cardPile.firstChild);
					game.log(player,"将",event.card,"置于牌堆顶");
					game.updateRoundNumber();
					"step 4"
					trigger.untrigger();
					trigger.responded=true;
					trigger.result={bool:true,card:{name:event.name}};
				},
				ai:{
					basic:{
						useful:[6,4],
						value:[6,4]
					},
					result:{
						player:1
					}
				}
			},
			old_ymk_guimou4:{
				prompt:"将武将牌上的一张牌置于牌堆顶，视为使用一张闪",
				enable:"chooseToUse",
				filter:function(event,player){
					return player.storage.old_ymk_yunchou&&player.storage.old_ymk_yunchou.length;
				},
				filterCard:function(){return false;},
				selectCard:-1,
				viewAs:{name:"shan"},
				ai:{
					skillTagFilter:function(player){
						return player.storage.old_ymk_yunchou&&player.storage.old_ymk_yunchou.length;
					},
					respondShan:true
				}
			},
			old_ymk_guimou5:{
				enable:"chooseToUse",
				filterCard:function(){return false;},
				selectCard:-1,
				viewAsFilter:function(player){
					return player.storage.old_ymk_yunchou&&player.storage.old_ymk_yunchou.length;
				},
				viewAs:{name:"wuxie"},
				/*
				check:function(card){
					if (card.name == "wuxie") return 1000;
					return 0;
				},
				*/
				prompt:"将武将牌上的一张牌置于牌堆顶，视为使用一张无懈可击",
				/*
				threaten:1.2,
				ai:{
					basic:{
						useful:[6,4],
						value:[6,4],
					},
					result:{
						player:1,
					},
					expose:0.2,
				},
				*/
			},
			//Donkey Kong
			old_sst_baochui:{
				trigger:{player:"phaseDiscardEnd"},
				init:function(player){
					player.storage.old_sst_baochui=[];
				},
				filter:function(event,player){
					return event.cards&&event.cards.length&&event.cards.filterInD("d")&&event.cards.filterInD("d").length;
				},
				frequent:true,
				content:function(){
					var cards=trigger.cards.filterInD("d");
					player.lose(cards,ui.special,"toStorage");
					player.$gain2(cards);
					player.storage.old_sst_baochui=player.storage.old_sst_baochui.concat(cards);
					player.syncStorage("old_sst_baochui");
					player.markSkill("old_sst_baochui");
					game.log(player,"将",cards,"置于武将牌上");
				},
				intro:{
					content:"cards",
					onunmark:function(storage,player){
						if(storage&&storage.length){
							player.$throw(storage,1000);
							game.cardsDiscard(storage);
							game.log(storage,"被置入了弃牌堆");
							storage.length=0;
						}
					}
				},
				ai:{
					threaten:2
				},
				group:["old_sst_baochui2","old_sst_baochui3"]
			},
			old_sst_baochui2:{
				enable:"chooseToUse",
				prompt:function(){
					if(_status.event.player.storage.old_sst_baochui.length){
						return "你可以将武将牌上的所有牌视为伤害为"+Math.min(3,_status.event.player.storage.old_sst_baochui.length)+"的【杀】使用";
					}
				},
				filter:function(event,player){
					if(event.filterCard&&!event.filterCard({name:"sha"},player,event)) return false;
					if(!lib.filter.cardUsable({name:"sha"},player)) return false;
					return player.storage.old_sst_baochui.length;
				},
				filterTarget:function(card,player,target){
					if(_status.event._backup&&
						typeof _status.event._backup.filterTarget=="function"&&
						!_status.event._backup.filterTarget({name:"sha"},player,target)){
						return false;
					}
					return player.canUse({name:"sha"},target);
				},
				direct:true,
				line:false,
				delay:false,
				content:function(){
					var cards=player.storage.old_sst_baochui;
					player.storage.old_sst_baochui_num=cards.length;
					player.useCard({name:"sha"},cards,target,"old_sst_baochui");
					player.storage.old_sst_baochui.length=0;
					player.syncStorage("old_sst_baochui");
					player.updateMarks();
					player.unmarkSkill("old_sst_baochui");
				},
				ai:{
					respondSha:true,
					skillTagFilter:function(player){
						if(!player.storage.old_sst_baochui.length) return false;
					},
					result:{
						target:function(player,target){
							var num=0;
							if(player.storage.old_sst_baochui.length) num=player.storage.old_sst_baochui.length;
							return get.effect(target,{name:"sha"},player,target)-3+num;
						}
					},
					order:function(){
						return get.order({name:"sha"})+1;
					}
				}
			},
			old_sst_baochui3:{
				trigger:{player:"useCard1"},
				direct:true,
				forced:true,
				filter:function(event,player){
					return event.skill=="old_sst_baochui";
				},
				content:function(){
					//trigger.directHit.addArray(game.players);
					if(typeof trigger.baseDamage!="number") trigger.baseDamage=1;
					trigger.baseDamage+=Math.min(3,player.storage.old_sst_baochui_num)-1;
				},
				ai:{
					damageBonus:true
				}
			},
			//Dark Samus
			old_sst_shunxing:{
				group:["old_sst_shunxing1","old_sst_shunxing2"],
				ai:{
					threaten:2,
					expose:0.2
				}
			},
			old_sst_shunxing1:{
				trigger:{player:"phaseDrawBefore"},
				direct:true,
				content:function(){
					"step 0"
					var check,i,num=0,num2=0,players=game.filterPlayer();
					for(var i=0;i<players.length;i++){
						if(player!=players[i]&&players[i].countCards("h")){
							var att=get.attitude(player,players[i]);
							if(att<=0){
								num++;
							}
							if(att<0){
								num2++;
							}
						}
					}
					check=(num>=2&&num2>0);
					player.chooseBool(get.prompt("old_sst_shunxing1"),"你可以跳过此摸牌阶段，然后获得一名其他角色区域内的一张牌").set("ai",function(){
						if(!_status.event.check) return false;
						if(player.hasCard(function(card){
							return get.name(card)=="bingliang";
						},"j")) return false;
						/*
						var val=0;
						var cards=player.getCards("h");
						for(var i=0;i<cards.length;i++){
							val+=get.value(cards[i]);
						}
						val=val/cards.length;
						return val>=7;
						*/
						return true;
					}).set("check",check);
					"step 1"
					if(result.bool){
						trigger.cancel();
						player.logSkill("old_sst_shunxing1");
						game.log(player,"跳过了此摸牌阶段");
						player.chooseTarget("瞬形：获得一名其他角色区域内的一张牌",true,function(card,player,target){
							return target!=player&&target.countGainableCards(player,"hej");
						}).set("ai",function(target){
							var player=_status.event.player;
							var att=get.attitude(player,target);
							if(att<0){
								att=-Math.sqrt(-att);
							}
							else{
								att=Math.sqrt(att);
							}
							return att*lib.card.shunshou.ai.result.target(player,target);
						})
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool){
						result.targets.sortBySeat();
						player.line(result.targets,"green");
						event.targets=result.targets;
						if(!event.targets.length) event.finish();
					}
					else{
						event.finish();
					}
					"step 3"
					player.gainMultiple(event.targets,"hej");
					"step 4"
					game.delayx();
				}
			},
			old_sst_shunxing2:{
				trigger:{player:"phaseUseBefore"},
				direct:true,
				content:function(){
					"step 0"
					var check;
					if(player.countCards("h")>player.hp+1){
						check=false;
					}
					else if(player.countCards("h",{name:["wuzhong"]})){
						check=false;
					}
					else{
						check=true;
					}
					player.chooseBool(get.prompt("old_sst_shunxing2"),"你可以跳过此出牌阶段，然后重铸任意张红色手牌").set("ai",function(){
						if(!_status.event.check) return false;
						if(player.hasCard(function(card){
							return get.name(card)=="lebu";
						},"j")) return false;
						var val=0;
						var cards=player.getCards("h");
						for(var i=0;i<cards.length;i++){
							val+=get.value(cards[i]);
						}
						val=val/cards.length;
						return player.hasCard(function(card){
							return get.color(card)=="red";
						},"h")&&val<=4;
					}).set("check",check);
					"step 1"
					if(result.bool){
						trigger.cancel();
						player.logSkill("old_sst_shunxing2");
						game.log(player,"跳过了此出牌阶段");
						player.chooseCard("h",[1,Infinity],"瞬形：你可以重铸任意张红色手牌",function(card){
							return get.color(card)=="red";
						}).set("ai",function(card){
							return 8-get.value(card);
						});
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.cards&&result.cards.length) {
						var cards=result.cards;
						player.$throw(cards,1000);
						player.lose(cards,ui.discardPile,"visible").set("type","chongzhu");
						game.log(player,"将",cards,"置入了弃牌堆");
						player.draw(cards.length);
					}
				}
			},
			//577
			ymk_jiagou:{
				trigger:{global:"phaseZhunbeiBegin"},
				filter:function(event,player){
					return player.countCards("he");
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseCard("he",get.prompt2("ymk_jiagou",trigger.player)).set("ai",function(card){
						var player=_status.event.player;
						var target=_status.event.targetx;
						var judges=target.getCards("j");
						if(ui.selected.cards&&ui.selected.cards.length){
							for(var i=0;i<ui.selected.cards.length;i++){
								if(judges&&judges.length) judges.shift();
							}
						}
						if(judges&&judges.length){
							var judge=get.judge(judges[0]);
							return judge(card)*(11-get.value(card));
						}
						var att=get.attitude(player,target)*(get.number(card)-target.getHandcardLimit())*Math.max(0,5-get.useful(card));
						var num=get.number(card)<=5?Math.max(0,player.maxHp-player.countCards("h")):0;
						return Math.pow(att,1/3)+num;
					}).set("targetx",trigger.player);
					"step 1"
					if(result.cards&&result.cards.length){
						player.logSkill("ymk_jiagou",trigger.player);
						var card=result.cards[0];
						/*
						event.card=card;
						player.lose(card,ui.special,"visible");
						player.$throw(card,1000);
						game.log(player,"将",card,"置于牌堆顶");
						*/
						player.$throw(card,1000);
						game.log(player,"将",card,"置于牌堆顶");
						player.lose(card,ui.cardPile,"insert");
						player.storage.ymk_jiagou=get.number(card);
						trigger.player.storage.ymk_jiagou=get.number(card);
						trigger.player.addTempSkill("ymk_jiagou2");
					}
				},
				ai:{
					expose:0.1
				},
				group:["ymk_jiagou3","ymk_jiagou_clear"],
				subSkill:{
					clear:{
						trigger:{global:"phaseAfter"},
						silent:true,
						content:function(){
							delete player.storage.ymk_jiagou;
						}
					}
				}
			},
			ymk_jiagou2:{
				onremove:function(player){
					delete player.storage.ymk_jiagou;
				},
				mod:{
					maxHandcardBase:function(player,num){
						return player.storage.ymk_jiagou;
					}
				}
			},
			ymk_jiagou3:{
				trigger:{global:"phaseJieshuBegin"},
				filter:function(event,player){
					return player.storage.ymk_jiagou&&player.storage.ymk_jiagou<=5;
				},
				forced:true,
				content:function(){
					player.drawTo(player.maxHp);
				}
			},
			ymk_jicai:{
				trigger:{player:"phaseJudgeBefore"},
				forced:true,
				content:function(){
					trigger.cancel();
					player.phaseDiscard();
				},
				ai:{
					effect:{
						player:function(card,player,target){
							if(get.type(card)=="delay"){
								return "zeroplayertarget";
							}
						},
						target:function(card,player,target){
							if(get.type(card)=="delay"){
								return "zeroplayertarget";
							}
						}
					}
				},
				group:"ymk_jicai2"
			},
			ymk_jicai2:{
				trigger:{player:"phaseDiscardBefore"},
				filter:function(event,player){
					return event.getParent().name!="ymk_jicai";
				},
				forced:true,
				content:function(){
					trigger.cancel();
					player.phaseDraw();
				}
			}
		},
		dynamicTranslate:{
		},
		translate: {
			//LTK
			caocao:"曹操",
			hujia:"护驾",
			hujia_info:"主公技，当你需要使用或打出一张【闪】时，你可以令其他本势力角色选择是否打出一张【闪】。若有角色响应，则你视为使用或打出了一张【闪】。",
			jianxiong:"奸雄",
			jianxiong_info:"当你受到伤害后，你可以获得对你造成伤害的牌。",
			simayi:"司马懿",
			fankui:"反馈",
			fankui_info:"当你受到伤害后，你可以获得伤害来源的一张牌。",
			guicai:"鬼才",
			guicai_info:"一名角色的判定牌生效前，你可以打出一张手牌代替之。",
			guicai_info_guozhan:"一名角色的判定牌生效前，你可以打出一张牌代替之。",
			xiahoudun:"夏侯惇",
			zhangliao:"张辽",
			xuzhu:"许褚",
			guojia:"郭嘉",
			zhenji:"甄姬",
			liubei:"刘备",
			guanyu:"关羽",
			zhangfei:"张飞",
			zhugeliang:"诸葛亮",
			zhaoyun:"赵云",
			machao:"马超",
			huangyueying:"黄月英",
			sunquan:"孙权",
			ganning:"甘宁",
			lvmeng:"吕蒙",
			huanggai:"黄盖",
			zhouyu:"周瑜",
			daqiao:"大乔",
			luxun:"陆逊",
			sunshangxiang:"孙尚香",
			huatuo:"华佗",
			lvbu:"吕布",
			diaochan:"貂蝉",
			huaxiong:"华雄",
			xf_yiji:"伊籍",
			re_yuanshu:"袁术",
			caozhang:"曹彰",
			ganglie:"刚烈",
			tuxi:"突袭",
			luoyi:"裸衣",
			luoyi2:"裸衣",
			tiandu:"天妒",
			yiji:"遗计",
			luoshen:"洛神",
			xinluoshen:"洛神",
			qingguo:"倾国",
			rende:"仁德",
			jijiang:"激将",
			jijiang1:"激将",
			jijiang2:"激将",
			wusheng:"武圣",
			paoxiao:"咆哮",
			guanxing:"观星",
			kongcheng:"空城",
			kongcheng1:"空城",
			longdan:"龙胆",
			longdan1:"龙胆",
			longdan2:"龙胆",
			mashu:"马术",
			mashu2:"马术",
			feiying:"飞影",
			tieji:"铁骑",
			jizhi:"集智",
			qicai:"奇才",
			zhiheng:"制衡",
			jiuyuan:"救援",
			qixi:"奇袭",
			keji:"克己",
			kurou:"苦肉",
			yingzi:"英姿",
			fanjian:"反间",
			guose:"国色",
			liuli:"流离",
			qianxun:"谦逊",
			lianying:"连营",
			xiaoji:"枭姬",
			jieyin:"结姻",
			xinjieyin:"结姻",
			qingnang:"青囊",
			jijiu:"急救",
			wushuang:"无双",
			wushuang1:"无双",
			wushuang2:"无双",
			lijian:"离间",
			biyue:"闭月",
			xinbiyue:"闭月",
			ganglie_info:"当你受到伤害后，你可以判定。若结果不为红桃，则伤害来源须弃置两张手牌，否则受到来自你的一点伤害。",
			tuxi_info:"摸牌阶段，你可以改为获得至多两名其他角色的各一张手牌。",
			luoyi_info:"摸牌阶段，你可以少摸一张牌。若如此做，当你本回合内使用【杀】或【决斗】造成伤害时，此伤害+1。",
			tiandu_info:"当你的判定牌生效后，你可以获得之。",
			yiji_info:"当你受到一点伤害后，你可以观看牌堆顶的两张牌，然后将其分配给任意角色。",
			luoshen_info:"准备阶段，你可以判定。若结果为黑色，你获得判定牌。你可重复此流程，直到出现红色的判定结果。",
			luoshen_info_guozhan:"准备阶段，你可以判定。若结果为黑色，则可以继续判定，直到出现红色的判定牌。然后你获得所有黑色的判定牌。（判定结果为黑色的牌在此过程中不会进入弃牌堆）",
			xinluoshen_info:"准备阶段，你可以判定，若为黑色则可以继续判定，直到出现红色。然后你获得所有黑色的判定牌",
			xinluoshen_info_alter:"准备阶段，你可以判定，若为黑色则可以继续判定，直到出现红色。然后你获得所有黑色的判定牌。你通过洛神获得的牌，不计入当前回合的手牌上限",
			qingguo_info:"你可以将一张黑色手牌当做【闪】使用或打出。",
			rende_info:"出牌阶段，你可以将任意张手牌交给其他角色。当你以此法于一回合内给出第二张牌时，你回复1点体力。",
			jijiang_info:"主公技，当你需要使用或打出【杀】时，你可以令其他本势力角色依次选择是否打出一张【杀】。若有角色响应，则你视为使用或打出了此【杀】。",
			wusheng_info:"你可以将一张红色牌当做【杀】使用或打出。",
			paoxiao_info:"锁定技，出牌阶段，你使用【杀】没有数量限制。",
			guanxing_info:"准备阶段，你可以观看牌堆顶的X张牌，并将其以任意顺序置于牌堆项或牌堆底。（X为存活角色数且至多为5）",
			kongcheng_info:"锁定技，当你没有手牌时，你不能成为【杀】或【决斗】的目标。",
			longdan_info:"你可以将【杀】当做【闪】，或将【闪】当做【杀】使用或打出。",
			mashu_info:"锁定技，你计算与其他角色的距离时-1。",
			mashu2_info:"锁定技，你计算与其他角色的距离时-1。",
			feiying_info:"锁定技，其他角色计算与你的距离时+1。",
			tieji_info:"当你使用【杀】指定目标后，你可以进行判定。若结果为红色，则此【杀】不可被闪避。",
			jizhi_info:"当你使用非转化的普通锦囊牌时，你可以摸一张牌。",
			xinjizhi:"集智",
			xinjizhi_info:"当你使用非转化的普通锦囊牌时，你可以摸一张牌。",
			xinjizhi_info_alter:"每当你使用一张非转化的锦囊牌，可以摸一张牌，如果摸到的是基本牌，你可以弃置这张牌，然后本回合手牌上限+1",
			xinqicai:"奇才",
			xinqicai_info:"锁定技，你使用锦囊牌无距离限制。",
			xinqicai_info_alter:"锁定技，你使用的锦囊牌无距离限制，你装备区内的牌不能被弃置",
			qicai_info:"锁定技，你使用锦囊牌无距离限制。",
			zhiheng_info:"出牌阶段一次，你可以弃置任意张牌，然后摸等量的牌。",
			xinzhiheng:"制衡",
			xinzhiheng_info:"出牌阶段限1次，你可以弃置任意张牌并摸等量的牌",
			xinzhiheng_info_alter:"出牌阶段限1次，你可以弃置任意张牌并摸等量的牌，如果在发动制衡时弃置了所有手牌，你额外摸一张牌",
			jiuyuan_info:"主公技，锁定技，其他本势力角色对你使用的【桃】的回复值+1。",
			xinjiuyuan:"救援",
			xinjiuyuan_info:"主公技，锁定技，濒死阶段，本势力角色对你使用的[桃]额外回复一点体力",
			xinjiuyuan_info_alter:"主公技，其他本势力角色对自己使用【桃】时，如果他的体力值大于你，他可以选择让你回复1点体力，然后他摸1张牌",
			qixi_info:"你可以将一张黑色牌当做【过河拆桥】使用。",
			keji_info:"弃牌阶段开始时，若你于本回合的出牌阶段内没有过使用或打出过【杀】，则你可以跳过此阶段。",
			kurou_info:"出牌阶段，你可以失去一点体力，然后摸两张牌。",
			yingzi_info:"摸牌阶段，你可以多摸一张牌。",
			fanjian_info:"出牌阶段限一次，你可以令一名角色选择一种花色并展示你的一张手牌，若选择的花色与展示的不同，该角色受到来自你的一点伤害。然后该角色获得展示的牌。",
			guose_info:"你可以将一张方片手牌当做【乐不思蜀】使用。",
			liuli_info:"当你成为【杀】的目标时，你可以弃置一张牌并将此【杀】转移给攻击范围内的一名其他角色（不能是此【杀】的使用者）。",
			qianxun_info:"锁定技，你不能成为【顺手牵羊】和【乐不思蜀】的目标。",
			lianying_info:"当你失去最后的手牌时，你可以摸一张牌。",
			xiaoji_info:"当你失去一张装备区内的牌后，你可以摸两张牌。",
			jieyin_info:"出牌阶段限一次，你可以弃置两张手牌并选择一名已经受伤的男性角色。你与其各回复一点体力。",
			xinjieyin_info:"出牌阶段，你可以弃置两张牌并选择1名已经受伤的男性角色，你与其各回复一点体力，每阶段限一次",
			xinjieyin_old_info:"出牌阶段，你可以弃置两张牌并选择1名已经受伤的男性角色，你与其各回复一点体力。每阶段限一次。",
			xinjieyin_new_info:"出牌阶段限1次，你可以选择一名男性角色，弃置一张手牌或将一张装备牌置于其装备区，你与其体力较高的角色摸一张牌，体力值较低的角色回复1点体力",
			xinjieyin_info_alter:"出牌阶段限1次，你可以选择一名男性角色，弃置一张手牌或将一张装备牌置于其装备区，你与其体力较高的角色摸一张牌，体力值较低的角色回复1点体力",
			qingnang_info:"出牌阶段限一次，你可以弃置一张手牌并令一名角色回复一点体力。",
			jijiu_info:"你的回合外，你可以将一张红色牌当做【桃】使用。",
			wushuang_info:"锁定技，当你使用【杀】或【决斗】指定目标后，你令此牌需要依次使用或打出两张【闪】或【杀】响应。",
			lijian_info:"出牌阶段限一次，你可以弃置一张牌，视为一名男性角色对另一名男性角色使用一张【决斗】（不可被【无懈可击】响应）。",
			biyue_info:"结束阶段，你可以摸一张牌。",
			xinbiyue_info:"结束阶段，你可以摸一张牌",
			xinbiyue_info_alter:"结束阶段，你可以摸一张牌，如果你没有手牌，改为摸2张牌",
			yaowu:"耀武",
			yaowu_info:"锁定技，一名角色使用红色【杀】对你造成伤害时，该角色回复1点体力或摸一张牌。",
			new_jiangchi:"将驰",
			new_jiangchi_info:"摸牌阶段结束时，你可以选择一项：1、摸一张牌，若如此做，你本回合内不能使用或打出【杀】且【杀】不计入手牌上限。 2、弃置一张牌，若如此做，出牌阶段你使用【杀】无距离限制且你可以额外使用一张【杀】，直到回合结束。",
			xinfu_jijie:"机捷",
			xinfu_jijie_info:"出牌阶段限一次。你可以观看牌堆底的一张牌，然后将其交给一名角色。",
			xinfu_jiyuan:"急援",
			xinfu_jiyuan_info:"当一名角色进入濒死状态时，或你交给一名其他角色牌时，你可以令其摸一张牌。",
			ganglie_three:"刚烈",
			ganglie_three_info:"当你受到伤害后，你可令一名敌方角色判定。若结果不为♥，其弃置两张牌或受到来自你的1点伤害。",
			zhongyi:"忠义",
			zhongyi2:"忠义",
			zhongyi_info:"限定技，出牌阶段，你可以将一张牌置于武将牌上。你的武将牌上有〖忠义〗牌时，己方角色使用【杀】造成的伤害+1。下轮游戏开始时，你将〖忠义〗牌置入弃牌堆。",
			zhanshen:"战神",
			zhanshen_info:"觉醒技，准备阶段，若场上有已死亡的其他己方角色且你已受伤，则你弃置装备区的武器牌，减1点体力上限，获得技能〖马术〗和〖神戟〗。",
			shenji:"神戟",
			shenji_info:"锁定技，你使用【杀】指定的目标数上限+2，次数上限+1。",
			rewangzun:"妄尊",
			rewangzun2:"妄尊",
			rewangzun_info:"锁定技，一名其他角色的准备阶段开始时，若其体力值大于你，你摸一张牌。然后若其身份为主公/主帅/君主/地主且明置，则你摸一张牌，且其本回合的手牌上限-1。",
			retongji:"同疾",
			retongji_info:"攻击范围内包含你的角色成为【杀】的目标时，若你不是此【杀】的使用者或目标，其可弃置一张牌，然后将此【杀】转移给你。",
			gongsunzan:"公孙瓒",
			reyicong:"义从",
			reyicong_info:"锁定技，你计算与其他角色的距离时-1。若你的体力值不大于2，则其他角色计算与你的距离时+1。",
			//SST
			//Character
			old_sst_samus:"旧萨姆斯",
			old_sst_ken:"旧肯",
			old_ymk_claude:"旧库罗德",
			old_sst_donkey_kong:"旧森喜刚",
			old_sst_dark_samus:"黑暗萨姆斯",
			ymk_577:"方块君",
			//Identity mode skill
			old_sst_juezhan:"绝战",
			old_sst_juezhan_info:"锁定技，你于出牌阶段可以额外使用X张【杀】，你的攻击距离+X。（X为你已损失的体力值）",
			old_sst_zailu:"载录",
			old_sst_zailu2:"载录",
			old_sst_zailu3:"载录",
			old_sst_zailu_info:"一名角色死亡后，你可以摸一张牌，然后选择一项：1. 令你本局游戏中摸牌阶段摸牌数+1；2. 使用基本牌或普通锦囊牌可以额外指定一个目标。",
			old_sst_yanyang:"焰扬",
			old_sst_yanyang2:"焰扬",
			old_sst_yanyang_info:"你可以将至多两张牌当作【火攻】使用；你以此法使用的【火攻】造成伤害时，其基础伤害为其对应实体牌数。",
			old_ymk_yunchou:"运筹",
			old_ymk_yunchou2:"运筹",
			old_ymk_yunchou_info:"弃牌阶段开始时，若你的武将牌上没有牌，你可以将至多X张牌（X为你已损失的体力值且至少为1）置于你的武将牌上。当你失去武将牌上的最后一张牌时，你可以回复一点体力或移动场上的一张牌。",
			old_ymk_guimou:"鬼谋",
			old_ymk_guimou_backup:"鬼谋",
			old_ymk_guimou3:"鬼谋",
			old_ymk_guimou4:"鬼谋",
			old_ymk_guimou5:"鬼谋",
			old_ymk_guimou_info:"当你需要使用或打出一张基本牌或普通锦囊牌时，你可以将武将牌上的一张牌置于牌堆顶，视为你使用或打出这张牌。",
			old_sst_baochui:"爆锤",
			old_sst_baochui2:"爆锤",
			old_sst_baochui3:"爆锤",
			old_sst_baochui_info:"弃牌阶段，你可以将你弃置的牌置于你的武将牌上。当你需要使用【杀】时，你可以将你武将牌上的所有牌视为伤害为X的【杀】使用。（X为此杀对应的实体牌数量且至多为3）",
			old_sst_shunxing:"瞬形",
			old_sst_shunxing1:"瞬形·摸牌",
			old_sst_shunxing2:"瞬形·出牌",
			old_sst_shunxing_info:"你可以跳过你的一个摸牌阶段，然后获得一名其他角色区域内的一张牌；你可以跳过你的一个出牌阶段，然后重铸任意张红色手牌。",
			ymk_jiagou:"架构",
			ymk_jiagou2:"架构",
			ymk_jiagou3:"架构",
			ymk_jiagou_info:"一名角色的准备阶段，你可将一张牌置于牌堆顶，令此角色本回合的手牌上限为此牌点数，然后若此牌点数不大于5，本回合结束阶段，你将手牌补至体力上限。",
			ymk_jicai:"积材",
			ymk_jicai2:"积材",
			ymk_jicai_info:"锁定技，你跳过判定阶段，改为执行一个弃牌阶段；你跳过不以此法执行的弃牌阶段，改为执行一个摸牌阶段。"
			//Character Sort
		},
		translateEnglish:{
			old_sst_samus:"Old Samus",
			old_sst_ken:"Old Ken",
			old_ymk_claude:"Old Claude",
			old_sst_donkey_kong:"Old Donkey Kong",
			old_sst_dark_samus:"Dark Samus",
			ymk_577:"577"
		},
		perfectPair:{
			//LTK
			xiahoudun:["xiahouyuan"],
			zhenji:["caopi"],
			caocao:["xuzhu","dianwei","bianfuren"],
			huangzhong:["weiyan"],
			zhugeliang:["jiangwei","jiangfei","huangyueying"],
			liubei:["guanyu","zhangfei","ganfuren"],
			zhaoyun:["liushan"],
			daqiao:["xiaoqiao"],
			zhouyu:["huanggai","xiaoqiao","zhouyi"],
			sunquan:["zhoutai"],
			lvbu:["diaochan"],
			machao:["madai","mayunlu"],
			zhangliao:["zangba"],
			ganning:["lingtong","xf_sufei"],
			//SST
            old_sst_ken:["sst_ryu"],
			old_ymk_claude:["sst_byleth_male","sst_byleth_female"],
			old_sst_donkey_kong:["sst_mario"],
		},
	};
	return sst_old;
});