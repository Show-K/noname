"use strict";
game.import("character",function(lib,game,ui,get,ai,_status){
	if(!lib.translateEnglish) lib.translateEnglish={};
	var sst_extra={
		name:"sst_extra",
		connect:true,
		characterSort:{
			sst_extra:{
				sst_response:["sst_claude","sst_geno","sst_duck_hunt"],
				sst_beginning:["sst_ness","sst_chrom","sst_lucina","sst_robin"]
			}
		},
		character:{
			sst_claude:["male","sst_spirit",3,["sst_yunchou","sst_guimou"],[]],
			sst_geno:["male","sst_spirit",3,["sst_fuyuan","sst_xingjiang"],[]],
			sst_duck_hunt:["male","sst_light",3,["sst_gonglie","sst_weishou"],[]],
			sst_ness:["male","sst_light",4,["sst_wenxin"],[]],
			sst_chrom:["male","sst_light",4,["sst_niming","sst_cuifeng"],[]],
			sst_lucina:["female","sst_light",4,["sst_suxing","sst_shengyi"],[]],
			sst_robin:["none","sst_darkness",3,["sst_zuozhan","sst_junce"],[]],
			sst_robin_male:["male","sst_darkness",3,["sst_zuozhan","sst_junce"],["unseen"]],
			sst_robin_female:["female","sst_darkness",3,["sst_zuozhan","sst_junce"],["unseen"]]
		},
		characterFilter:{
		},
		characterIntro:{
			/*
			"武将作者：Yumikohimi<br>\
			武将作者：mario not mary<br>\
			武将作者：Show-K<br>\
			━━━━━━━━━━━━━━━━━<br>\
			<br>\
			系列：（）<br>\
			初登场：（）<br>\
			<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			━━━━━━━━━━━━━━━━━<br>\
			"
			*/
			sst_claude:"武将作者：mario not mary、Yumikohimi<br>\
			━━━━━━━━━━━━━━━━━<br>\
			1386. 库罗德/Claude/クロード<br>\
			系列：Fire Emblem（火焰纹章）<br>\
			初登场：Fire Emblem: Three Houses（火焰纹章 风花雪月）<br>\
			雷斯塔诸侯同盟盟主之孙、爵位继承人。喜欢策略，喜欢琢磨战术，为了达到目标可以不择手段。不论玩家选择的是贝雷特还是贝雷丝，他都会以“兄弟”称呼他的老师。<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			━━━━━━━━━━━━━━━━━<br>\
			芙朵拉内外都要变革，才能得以见到所愿之景……对吧？",
			sst_geno:"武将作者：Show-K<br>\
			━━━━━━━━━━━━━━━━━<br>\
			0104. Geno/ジーノ<br>\
			系列：Mario（马力欧）<br>\
			初登场：Super Mario RPG（超级马力欧RPG）<br>\
			他是星之族的一员，本来没有身体，本名也是无法拼读的“♡♪!?”，所以选择附身在一个叫Geno的木偶上行动。他总是自信满满，擅长分析问题，战斗能力也相当出色。他会和马力欧、桃花公主、酷霸王和Mallow一起打败恶人。<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			━━━━━━━━━━━━━━━━━<br>\
			所以Square什么时候能把超级马力欧RPG交一下！",
			sst_duck_hunt:"武将作者：mario not mary<br>\
			━━━━━━━━━━━━━━━━━<br>\
			0974. 打猎/Duck Hunt/ダックハント<br>\
			系列：Duck Hunt（打猎）<br>\
			初登场：Duck Hunt（打猎）<br>\
			《打猎》是1984年的FC游戏，经常和FC捆绑销售。玩家需要用光枪打鸭子，而这只看起来有点欠揍的狗负责捡鸭子。在大乱斗中，狗和鸭子转而并肩作战。它们扔出的罐子和飞盘都会被某人射击从而移动或爆炸。让对手也尝尝被打猎的感觉吧！<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			━━━━━━━━━━━━━━━━━<br>\
			MNM再一次对应变大打出手了。",
			sst_ness:"武将作者：mario not mary<br>\
			━━━━━━━━━━━━━━━━━<br>\
			0563. 奈斯/Ness/ネス<br>\
			系列：EarthBound（地球冒险）<br>\
			初登场：EarthBound（地球冒险）<br>\
			奈斯在Eagleland国的Onett镇上长大，虽然看起来很普通，但却能使用意念能力。在原作中，他要对抗邪恶的Giygas，在大乱斗中，他的意念能力让大家感到难以对付。他的意念之雷如果击中自己就能向前突进，而意念之火击中对手后会持续燃烧。<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			━━━━━━━━━━━━━━━━━<br>\
			接着MNM开始对使命技大打出手了。",
			sst_chrom:"武将作者：mario not mary<br>\
			━━━━━━━━━━━━━━━━━<br>\
			0613. 库洛姆/Chrom/クロム<br>\
			系列：Fire Emblem（火焰纹章）<br>\
			初登场：Fire Emblem Awakening（火焰纹章 觉醒）<br>\
			伊利斯圣王国的王子，英雄王马尔斯的后代。他率领一个保卫王国的自卫团。虽然他在训练时经常很莽以至于搞砸事情，但在战场上他是非常可靠的。他还会在鲁弗莱的最终必杀中出场。<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			━━━━━━━━━━━━━━━━━<br>\
			“运命改变了！”",
			sst_lucina:"武将作者：mario not mary<br>\
			━━━━━━━━━━━━━━━━━<br>\
			0611. 露琪娜/Lucina/ルキナ<br>\
			系列：Fire Emblem（火焰纹章）<br>\
			初登场：Fire Emblem Awakening（火焰纹章 觉醒）<br>\
			库洛姆的女儿，伊利斯圣王国的公主，从悲惨的未来穿越到现在，阻止那种未来发生。她最初以女扮男装，自称马尔斯的形态出现。在大乱斗中，她的技能和马尔斯是一样的，但没有马尔斯那种剑尖与剑根的伤害差异。<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			━━━━━━━━━━━━━━━━━<br>\
			“为了终结这个世界的战争……我会努力的。”",
			sst_robin:"武将作者：mario not mary<br>\
			━━━━━━━━━━━━━━━━━<br>\
			0616. 鲁弗莱（男性）/Robin (Male)/ルフレ（男性）<br>\
			系列：Fire Emblem（火焰纹章）<br>\
			初登场：Fire Emblem Awakening（火焰纹章 觉醒）<br>\
			《火焰纹章：觉醒》中的主角，形象和性别可以自定义。根据选择的性别不同，能够攻略的对象也不一样——比如男鲁弗莱可以攻略露琪娜。在大乱斗中，鲁弗莱除了剑术之外，还会使用魔法。魔法书用完之后需要等待恢复。<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			━━━━━━━━━━━━━━━━━<br>\
			0617. 鲁弗莱（女性）/Robin (Female)/ルフレ（女性）<br>\
			系列：Fire Emblem（火焰纹章）<br>\
			初登场：Fire Emblem Awakening（火焰纹章 觉醒）<br>\
			《火焰纹章：觉醒》中的主角，根据选择的性别不同，能够攻略的对象也不一样——比如女鲁弗莱可以攻略库洛姆。她可以切换青铜剑和雷剑进行攻击，在地面或空中输入快弹就可以切换为雷剑，但雷剑使用时也会像魔法书一样消耗耐久。<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			━━━━━━━━━━━━━━━━━<br>\
			然后MNM开始对智囊大打出手了。",
			sst_robin_male:"武将作者：mario not mary<br>\
			━━━━━━━━━━━━━━━━━<br>\
			0616. 鲁弗莱（男性）/Robin (Male)/ルフレ（男性）<br>\
			系列：Fire Emblem（火焰纹章）<br>\
			初登场：Fire Emblem Awakening（火焰纹章 觉醒）<br>\
			《火焰纹章：觉醒》中的主角，形象和性别可以自定义。根据选择的性别不同，能够攻略的对象也不一样——比如男鲁弗莱可以攻略露琪娜。在大乱斗中，鲁弗莱除了剑术之外，还会使用魔法。魔法书用完之后需要等待恢复。<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			━━━━━━━━━━━━━━━━━<br>\
			然后MNM开始对智囊大打出手了。（已选择男性）",
			sst_robin_female:"武将作者：mario not mary<br>\
			━━━━━━━━━━━━━━━━━<br>\
			0617. 鲁弗莱（女性）/Robin (Female)/ルフレ（女性）<br>\
			系列：Fire Emblem（火焰纹章）<br>\
			初登场：Fire Emblem Awakening（火焰纹章 觉醒）<br>\
			《火焰纹章：觉醒》中的主角，根据选择的性别不同，能够攻略的对象也不一样——比如女鲁弗莱可以攻略库洛姆。她可以切换青铜剑和雷剑进行攻击，在地面或空中输入快弹就可以切换为雷剑，但雷剑使用时也会像魔法书一样消耗耐久。<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			━━━━━━━━━━━━━━━━━<br>\
			然后MNM开始对智囊大打出手了。（已选择女性）"
		},
		characterTitle:{
			sst_claude:"连系世界之王",
			sst_geno:"星路战士",
			sst_duck_hunt:"天敌共演",
			sst_ness:"踏梦寻音",
			sst_chrom:"英雄王的血裔",
			sst_lucina:"觉醒的圣王女",
			sst_robin:"卓越的战术师",
			sst_robin_male:"卓越的战术师",
			sst_robin_female:"卓越的战术师"
		},
		skill:{
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
					return !player.hasSkill("sst_guimou2")&&get.is.yingbian(event.card);
				},
				content:function(){
					"step 0"
					var list=lib.card[get.name(trigger.card)].yingbian_tags.slice(0);
					for(var i=0;i<list.length;i++){
						list[i]="yingbian_"+list[i]+"_tag";
					}
					player.chooseControl(list,"cancel2").set("ai",function(){
						var choices=["yingbian_all_tag","yingbian_damage_tag","yingbian_hit_tag","yingbian_draw_tag","yingbian_gain_tag","yingbian_add_tag","yingbian_remove_tag"];
						var list=_status.event.list;
						var card=_status.event.card;
						for(var i=0;i<choices.length;i++){
							if(_status.cardtag&&_status.cardtag[choices[i].slice(0,-4)]&&_status.cardtag[choices[i].slice(0,-4)].contains(card.cardid)) return "cancel2";
							if(list.contains(choices[i])) return choices[i];
						}
						return "cancel2";
					}).set("list",list).set("card",trigger.card).set("prompt",get.prompt("sst_guimou")).set("prompt2",get.translation("sst_guimou_info"));
					"step 1"
					if(result.control&&result.control!="cancel2"){
						player.logSkill("sst_guimou");
						player.addTempSkill("sst_guimou2");
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
				enable:"phaseUse",
				usable:1,
				position:"he",
				delay:false,
				content:function(){
					"step 0"
					event.card=get.cards()[0];
					ui.cardPile.insertBefore(event.card.fix(),ui.cardPile.firstChild);
					player.showCards(event.card);
					"step 1"
					player.chooseToRespond("复愿：你可以打出一张牌，令一名角色使用下一张带有「伤害」标签的牌伤害值基数+1，然后若与"+get.translation(event.card)+"的点数相同，你可以令一名角色一个限定技视为未发动过").set("ai",function(card){
						var player=_status.event.player;
						var cardx=_status.event.cardx;
						var num=5-get.value(card);
						if(get.number(card)==get.number(cardx)&&game.hasPlayer(function(current){
							var skills=current.getSkills(null,null,false);
							for(var i=0;i<skills.length;i++){
								var info=get.info(skills[i]);
								if(info.limited&&current.awakenedSkills.contains(skills[i])) return true;
							}
							return false;
						})) num+=3;
						return num;
					}).set("position","hes").set("cardx",event.card);
					"step 2"
					if(result.card){
						if(get.number(result.card)==get.number(event.card)) event.goon=true;
					}
					else{
						event.finish();
					}
					"step 3"
					player.chooseTarget("复愿：令一名角色使用下一张带有「伤害」标签的牌伤害值基数+1",true).set("ai",function(target){
						return get.sgnAttitude(player,target);
					});
					"step 4"
					if(result.targets&&result.targets.length){
						player.line(result.targets[0],"green");
						player.addExpose(0.2);
						result.targets[0].addSkill("sst_fuyuan_effect");
						result.targets[0].addMark("sst_fuyuan_effect",1,false);
					}
					if(!event.goon) event.finish();
					"step 5"
					if(game.hasPlayer(function(current){
						var skills=current.getSkills(null,null,false);
						for(var i=0;i<skills.length;i++){
							var info=get.info(skills[i]);
							if(info.limited&&current.awakenedSkills.contains(skills[i])) return true;
						}
						return false;
					})){
						player.chooseTarget("复愿：你可以令一名角色一个限定技视为未发动过",function(card,player,target){
							var skills=target.getSkills(null,null,false);
							for(var i=0;i<skills.length;i++){
								var info=get.info(skills[i]);
								if(info.limited&&target.awakenedSkills.contains(skills[i])) return true;
							}
							return false;
						}).set("ai",function(target){
							return get.sgnAttitude(player,target);
						});
					}
					"step 6"
					if(result.targets&&result.targets.length){
						event.current=result.targets[0];
						player.line(event.current,"green");
						player.addExpose(0.2);
						var list=[];
						var skills=event.current.getSkills(null,null,false);
						for(var i=0;i<skills.length;i++){
							var info=get.info(skills[i]);
							if(info.limited&&event.current.awakenedSkills.contains(skills[i])) list.push(skills[i]);
						}
						player.chooseControl(list).set("prompt","复愿：选择一个限定技恢复之");
					}
					else{
						event.finish();
					}
					"step 7"
					if(result.control){
						event.current.restoreSkill(result.control);
						event.current.popup(result.control,"fire");
						game.log(player,"恢复了技能","#g【"+get.translation(result.control)+"】");
					}
				},
				ai:{
					order:7,
					result:{
						player:1
					}
				}
			},
			sst_fuyuan_effect:{
				charlotte:true,
				forced:true,
				intro:{
					content:"你使用下一张带有「伤害」标签的牌伤害值基数+#"
				},
				onremove:function(player){
					player.removeMark("sst_fuyuan_effect",player.countMark("sst_fuyuan_effect"),false);
				},
				trigger:{player:"useCard1"},
				filter:function(event,player){
					return event.card&&get.tag(event.card,"damage");
				},
				content:function(){
					trigger.baseDamage+=player.countMark("sst_fuyuan_effect");
					player.removeSkill("sst_fuyuan_effect");
				},
				ai:{
					damageBonus:true
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
				trigger:{global:"phaseJieshuBegin"},
				filter:function(event,player){
					return player.getHistory("gain").length||player.getHistory("lose").length;
				},
				direct:true,
				content:function(){
					"step 0"
					event.num_draw=0;
					player.getHistory("gain",function(evt){
						event.num_draw+=evt.cards.length;
					});
					//event.num_draw=Math.min(7,event.num_draw);
					event.num_discard=0;
					player.getHistory("lose",function(evt){
						event.num_discard+=evt.cards.length;
					});
					//event.num_discard=Math.min(7,event.num_discard);
					var str="限定技，你可以令一名角色";
					if(event.num_draw) str+="摸"+get.cnNumber(event.num_draw)+"张牌";
					if(event.num_draw&&event.num_discard) str+="并";
					if(event.num_discard) str+="弃置"+get.cnNumber(event.num_discard)+"张牌";
					str+="，然后若其手牌数与其体力值或体力上限相等，你观看牌堆顶一张牌且可以使用之（其应变效果直接生效）";
					player.chooseTarget(get.prompt("sst_xingjiang"),str).set("ai",function(target){
						var att=get.sgnAttitude(_status.event.player,target);
						var diff_hp=target.countCards("h",function(card){
							return lib.filter.cardDiscardable(card,player);
						})+_status.event.num_draw-target.hp;
						var diff_max_hp=target.countCards("h",function(card){
							return lib.filter.cardDiscardable(card,player);
						})+_status.event.num_draw-target.maxHp;
						var expectation_num_discard=_status.event.num_discard-target.countCards("e",function(card){
							return lib.filter.cardDiscardable(card,player);
						});
						if(_status.event.num_discard>=diff_hp&&expectation_num_discard<=diff_hp) att*=2;
						if(_status.event.num_discard>=diff_max_hp&&expectation_num_discard<=diff_max_hp) att*=2;
						if(_status.event.num_draw<_status.event.num_discard){
							if(!target.countCards("he",function(card){
								return lib.filter.cardDiscardable(card,player);
							})) return 0;
							return -att;
						}
						if(_status.event.num_draw==_status.event.num_discard&&!target.countCards("he",function(card){
							return lib.filter.cardDiscardable(card,player);
						})) return 0;
						return att;
					}).set("num_draw",event.num_draw).set("num_discard",event.num_discard);
					"step 1"
					if(result.targets&&result.targets.length){
						event.target=result.targets[0];
						player.logSkill("sst_xingjiang",event.target);
						player.awakenSkill("sst_xingjiang");
						if(event.num_draw) event.target.draw(event.num_draw);
						if(event.num_discard) event.target.chooseToDiscard("星降：弃置"+get.cnNumber(event.num_discard)+"张牌",event.num_discard,true,"he");
					}
					else{
						event.finish();
					}
					"step 2"
					if(event.target.isIn()&&(event.target.countCards("h")==Math.max(0,event.target.hp)||event.target.countCards("h")==event.target.maxHp)){
						var top=get.cards();
						event.card=top[0];
						ui.cardPile.insertBefore(event.card.fix(),ui.cardPile.firstChild);
						//game.log(player,"观看了牌堆顶的一张牌");
						player.viewCards("星降",top);
					}
					else{
						event.finish();
					}
					"step 3"
					player.addTempSkill("sst_xingjiang2");
					player.chooseUseTarget(event.card,false);
				},
				group:"sst_xingjiang2",
				ai:{
					expose:0.2
				}
			},
			sst_xingjiang2:{
				charlotte:true,
				trigger:{player:"useCard1"},
				forced:true,
				popup:false,
				filter:function(event,player){
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
						if(player.storage.sst_wenxin_alter) return get.color(card)=="red";
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
						player.damage("nosource");
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
					players.sortBySeat();
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
			}
		},
		dynamicTranslate:{
			sst_wenxin:function(player){
				if(player.storage.sst_wenxin){
					if(player.storage.sst_wenxin_alter) return "结束阶段，你可以弃置至少一张手牌并依次弃置场上等量的红色牌，然后展示手牌并摸等同于你弃置黑色牌数量的牌。";
					return "结束阶段，你可以弃置至少一张手牌并依次弃置场上等量的牌，然后展示手牌并摸等同于你弃置黑色牌数量的牌。";
				}
				return "使命技。①结束阶段，你可以弃置至少一张手牌并依次弃置场上等量的牌，然后展示手牌并摸等同于你弃置黑色牌数量的牌。②使命：若以此法连续两次展示的手牌均为红色，此技能改为非使命技，你取消弃牌阶段。③失败：以此法展示三次手牌后，此技能改为非使命技，“场上等量的牌”改为“场上等量的红色牌”。";
			}
		},
		/*
		characterReplace:{
			ska_mario:["sst_mario","sst_dr_mario","ska_mario"],
			ska_bowser:["sst_bowser","ska_bowser"],
			ymk_yumikohimi:["sst_yumikohimi","ymk_yumikohimi"],
			ymk_isabelle:["sst_isabelle","ymk_isabelle"],
		},
		*/
		translate: {
			//Character
			sst_claude:"库罗德",
			sst_geno:"♡♪!?",
			sst_duck_hunt:"打猎",
			sst_ness:"奈斯",
			sst_chrom:"库洛姆",
			sst_lucina:"露琪娜",
			sst_robin:"鲁弗莱",
			sst_robin_male:"鲁弗莱",
			sst_robin_female:"鲁弗莱",
			//Character ab.
			sst_geno_ab:"Geno",
			//Skill
			sst_yunchou:"运筹",
			sst_yunchou_info:"若你使用的牌具有应变效果，你可以令此牌允许满足任意一种应变条件。",
			sst_guimou:"鬼谋",
			sst_guimou_info:"每回合限一次，若你使用的牌具有应变效果，你可以任意指定此牌的应变效果。",
			sst_fuyuan:"复愿",
			sst_fuyuan_effect:"复愿",
			sst_fuyuan_info:"出牌阶段限一次，你可以展示牌堆顶一张牌，然后你可以打出一张牌，令一名角色使用下一张带有「伤害」标签的牌伤害值基数+1。若这两张牌的点数相同，你可以令一名角色一个限定技视为未发动过。",
			sst_xingjiang:"星降",
			sst_xingjiang_info:"限定技，一名角色的结束阶段，你可以令一名角色摸X张牌并弃置Y张牌，然后若其手牌数与其体力值或体力上限相等，你观看牌堆顶一张牌且可以使用之（其应变效果直接生效）。（X/Y为你本回合获得/失去牌数量）",
			sst_gonglie:"共猎",
			sst_gonglie_info:"你使用【杀】可以为其附加「助战→目标+1」应变效果；然后若有人响应「助战」且【杀】造成了伤害，其可以获得受到此【杀】伤害的角色一张牌。",
			sst_weishou:"围狩",
			sst_weishou2:"围狩",
			sst_weishou_info:"一名其他角色因响应「助战」而弃置时，可以改为将牌交给你。",
			sst_wenxin:"问心",
			sst_wenxin_effect:"问心",
			sst_wenxin_info:"使命技。①结束阶段，你可以弃置至少一张手牌并依次弃置场上等量的牌，然后展示手牌并摸等同于你弃置黑色牌数量的牌。②使命：若以此法连续两次展示的手牌均为红色，此技能改为非使命技，你取消弃牌阶段。③失败：以此法展示三次手牌后，此技能改为非使命技，“场上等量的牌”改为“场上等量的红色牌”。",
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
			//Tag
			yingbian_recover_tag:'(回复)',
			zhinang_tricks_tag:"智囊",
			//Sort
			sst_response:"应变",
			sst_beginning:"始计"
		},
		translateEnglish:{
			sst_claude:"Claude",
			sst_geno:"Geno",
			sst_duck_hunt:"Duck Hunt",
			sst_ness:"Ness",
			sst_chrom:"Chrom",
			sst_lucina:"Lucina",
			sst_robin:"Robin",
			sst_robin_male:"Robin",
			sst_robin_female:"Robin"
		},
		perfectPair:{
			sst_claude:["sst_byleth_male","sst_byleth_female"],
			sst_geno:["sst_mario","sst_bowser","sst_peach"],
			sst_chrom:["sst_marth","sst_lucina","sst_robin","sst_robin_male","sst_robin_female"],
			sst_lucina:["sst_marth","sst_robin","sst_robin_male","sst_robin_female"],
			sst_robin:["sst_robin_male","sst_robin_female"],
			sst_robin_male:["sst_robin","sst_robin_female"],
			sst_robin_female:["sst_robin","sst_robin_male"]
		},
		help:{
			"乱斗EX":"<div style=\"margin:10px\">背水</div><ul style=\"margin-top:0\"><li>你执行背水效果后，依次执行上述两项/上述出现的“或”改为“和”</ul>\
			<div style=\"margin:10px\">交给技能</div><ul style=\"margin-top:0\"><li>交给技能为专属技能\
			<li>理论上，场上只能存在一个交给技能\
			<li>将交给技能交给一名角色前，先前角色失去此交给技能</ul>\
			<div style=\"margin:10px\">使命技</div><ul style=\"margin-top:0\"><li>本身可包含标准技能效果\
			<li>若满足成功条件，失去此技能，执行成功分支的效果\
			<li>若满足失败条件，失去此技能，执行失败分支的效果"
		}
	};
	return sst_extra;
});