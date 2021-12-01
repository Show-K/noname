"use strict";
game.import("character",function(lib,game,ui,get,ai,_status){
	var sst_old={
		name:"sst_old",//武将包命名（必填）
		connect:true,//该武将包是否可以联机（必填）
		characterSort:{
			sst_old:{
                sst_64:["old_sst_samus","old_sst_donkey_kong"],
                sst_melee:[],
                sst_brawl:[],
                sst_4:[],
                sst_ultimate:["old_sst_ken"],
                sst_spirits:[],
                sst_players:[],
				sst_ymk:["old_ymk_claude"],
			},
		},
		character:{
			//武将格式:
			//"武将名字":["性别","势力",体力,[技能],[]],
			//格式内每一样东西都不能缺少，否则无法导入该武将包及其以下内容
			old_sst_samus:["female","sst_light",4,["old_sst_juezhan","old_sst_zailu"],[]],
			old_sst_ken:["male","sst_light",4,["old_sst_yanyang","sst_shenglong"],[]],
			old_ymk_claude:["male","sst_spirit",3,["old_ymk_yunchou","old_ymk_guimou"],[]],
			old_sst_donkey_kong:["male","sst_light",4,["old_sst_baochui"],[]],
		},//武将（必填）
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
			"--------------------------------<br>"+
			"<br>"+
			"——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>"+
			"--------------------------------<br>"+
			"

			"+
			"
			*/
			old_sst_samus:"0264. 萨姆斯/Samus/サムス<br>"+
			"系列：Metroid（密特罗德）<br>"+
			"初登场：Metroid（密特罗德）<br>"+
			"武将作者：mario not mary<br>"+
			"--------------------------------<br>"+
			"萨姆斯·亚兰是游戏历史上第一个女主角，以只身一人在外星球的作战闻名。她的能量装甲是高等文明“鸟人族”的成果，给了她强大的火力、防护力和升级的可能性。在大乱斗中，虽然她是道具人，但是她的体术也不差。她的蓄力射击威力惊人。<br>"+
			"——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>"+
			"--------------------------------<br>"+
			"“萨姆斯，很不幸的消息……”",
			old_sst_ken:"0978. 肯/Ken/ケン<br>"+
			"系列：Street Fighter（街头霸王）<br>"+
			"初登场：Street Fighter（街头霸王）<br>"+
			"武将作者：mario not mary<br>"+
			"--------------------------------<br>"+
			"肯是隆的头号挚友兼劲敌，两人师出同门，与风餐露宿四处苦行的隆不同，肯有着自己的家族与财大气粗的产业，据说现在空手道网课也办的红红火火。他在年轻时因为急躁吃过不少败仗，但现在的他已经有了自己的家庭，即便如此，在顾家的闲暇也一定要挤出时间与挚友对战几局，才是男人的快乐。<br>"+
			"——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>"+
			"--------------------------------<br>"+
			"我准备好了，来吧。",
			old_ymk_claude:"1386. 库罗德/Claude/クロード<br>"+
			"系列：Fire Emblem（火焰纹章）<br>"+
			"初登场：Fire Emblem: Three Houses（火焰纹章 风花雪月）<br>"+
			"武将作者：Yumikohimi<br>"+
			"--------------------------------<br>"+
			"雷斯塔诸侯同盟盟主之孙、爵位继承人。喜欢策略，喜欢琢磨战术，为了达到目标可以不择手段。不论玩家选择的是贝雷特还是贝雷丝，他都会以“兄弟”称呼他的老师。<br>"+
			"——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>"+
			"--------------------------------<br>"+
			"芙朵拉内外都要变革，才能得以见到所愿之景……对吧？",
			old_sst_donkey_kong:"0134. 森喜刚/Donkey Kong/ドンキーコング<br>"+
			"系列：Donkey Kong（森喜刚）<br>"+
			"初登场：Donkey Kong（森喜刚）<br>"+
			"武将作者：mario not mary<br>"+
			"--------------------------------<br>"+
			"丛林的王者，也是最狂热的香蕉狂魔。他的冒险总是以某人偷了他的香蕉开始。在大乱斗中，他的力度和投技是众所周知的。虽然体积很大，但是速度也不是特别慢。他的前投掷还能扛着对手走哦！要合理利用这一点！<br>"+
			"——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>"+
			"--------------------------------<br>"+
			"砸人很疼的。",
		},//武将介绍（选填）
		characterTitle:{
			old_sst_samus:"银河战士",
			old_sst_ken:"红莲格斗王",
			old_ymk_claude:"连系世界之王",
			old_sst_donkey_kong:"丛林的王者",
		},//武将标题（用于写称号或注释）（选填）
		skill:{
			//标准技能
			//Samus
			old_sst_juezhan:{
				mod:{
					cardUsable:function (card,player,num){
						if(card.name=="sha") return num+player.getDamagedHp();
					},
					attackFrom:function (from,to,distance){
						return distance-from.getDamagedHp();
					},
				},
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
				group:["old_sst_zailu2","old_sst_zailu3"],
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
					},
				},
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
					},
				},
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
					damageBonus:true,
				},
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
				},
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
					expose:0.2,
				},
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
						player:1,
					},
					save:true,
					respondSha:true,
					respondTao:true,
					skillTagFilter:function(player){
						if(!player.storage.old_ymk_yunchou||!player.storage.old_ymk_yunchou.length) return false;
					},
				},
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
				},
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
						value:[6,4],
					},
					result:{
						player:1,
					},
				},
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
					respondShan:true,
				},
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
					},
				},
				ai:{
					threaten:2,
				},
				group:["old_sst_baochui2","old_sst_baochui3"],
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
					},
				},
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
					damageBonus:true,
				},
			},
		},//技能（必填）
		dynamicTranslate:{
		},
		translate: {
			//武将
			old_sst_samus:"旧萨姆斯",
			old_sst_ken:"旧肯",
			old_ymk_claude:"旧库罗德",
			old_sst_donkey_kong:"旧森喜刚",
			//身份技能
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
			//武将分类
			/*
			old_sst_64:"64",
			old_sst_melee:"Melee",
			old_sst_brawl:"Brawl",
			old_sst_4:"For WiiU/3DS",
			old_sst_ultimate:"Ultimate",
			old_sst_spirits:"命魂",
			old_sst_players:"玩家",
			old_sst_ymk:"Yumikohimi",
			*/
		},
		perfectPair:{
            old_sst_ken:["sst_ryu"],
			old_ymk_claude:["sst_byleth_male","sst_byleth_female"],
			old_sst_donkey_kong:["sst_mario"],
		},//珠联璧合武将（选填）
	};
	return sst_old;
});