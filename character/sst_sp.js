"use strict";
game.import("character",function(lib,game,ui,get,ai,_status){
	var sst_sp={
		name:"sst_sp",//武将包命名（必填）
		connect:true,//该武将包是否可以联机（必填）
		characterSort:{
			sst_sp:{
				sst_ymk:["ymk_isabelle","ymk_577","ymk_yumiko"],
				sst_ska:["ska_bobby","ska_olivia","ska_xiaojie","ska_show_k","ska_bowser","ska_professor_toad"],
				sst_nnk:[],
			},
		},
		character:{
			//武将格式:
			//"武将名字":["性别","势力",体力,[技能],[]],
			//格式内每一样东西都不能缺少，否则无法导入该武将包及其以下内容
			ymk_isabelle:["female","sst_light",3,["ymk_zhongmi","ymk_mihu"],[]],
			ska_bobby:["male","sst_spirit",3,["ska_jixing","ska_daishi","ska_yangxun"],[]],
			ska_olivia:["female","sst_spirit",3,["ska_shenqi","ska_zhefu"],[]],
			ymk_577:["male","sst_reality",3,["ymk_jiagou","ymk_jicai"],[]],
			ska_xiaojie:["male","sst_reality",3,["ska_kezhi","ska_jiyan"],[]],
			//ska_show_k:["male","sst_reality",3,["ska_lunli","ska_shubian"],[]],
			ymk_yumiko:["female","sst_reality",3,["ymk_qiuyi","ymk_xifang"],[]],
			//ska_bowser:["male","sst_darkness",4,["ska_mengjin"],[]],
			ska_professor_toad:["male","sst_spirit",3,["ska_juegu","ska_kuiwang"],[]],
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
			ymk_isabelle:"0827. 西施惠/Isabelle/しずえ<br>"+
			"系列：Animal Crossing（动物森友会）<br>"+
			"初登场：Animal Crossing: New Leaf（来吧！动物森友会）<br>"+
			"武将作者：Yumikohimi<br>"+
			"--------------------------------<br>"+
			"在3DS版《动物森友会》中，她是村民们的可靠秘书；而在NS版中，她也为每个无人岛居民提供生活服务。她有时可能健忘，但总的来说很靠谱。有个叫西施德的弟弟。她在3DS和WiiU版《任天堂明星大乱斗》中是辅助模型，NS版中则成为了斗士。<br>"+
			"——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>"+
			"--------------------------------<br>"+
			"上次柚子的武将就被老摸吵着要删，这次希望不要太IMBA……老摸的西施慧出来了，柚子的武将至少还是被借鉴了一点的。",
			ska_bobby:"????. 炸弹彬/Bobby/ボム平<br>"+
			"系列：Mario（马力欧）<br>"+
			"初登场：Paper Mario: The Origami King（纸片马力欧 折纸国王）<br>"+
			"武将作者：Show-K<br>"+
			"--------------------------------<br>"+
			"炸弹兵，通常被奥莉维亚称为“炸弹彬”，也曾被错误地称为“Bhomas”和“Bomber”，是纸片马力欧 折纸国王中马力欧的伙伴。作为一个没有保险丝、失忆的炸弹兵，他加入了马力欧和奥莉维亚的探险，努力回忆起他的记忆。在他们的冒险过程中，他将马力欧和奥莉维亚分别称为“大哥”和“女士”。<br>"+
			"——翻译自《超级马力欧维基》（来源：https://www.mariowiki.com/Bob-omb_(Paper_Mario%3A_The_Origami_King)）<br>"+
			"--------------------------------<br>"+
			"“我？哦，我是炸弹兵。”",
			ska_olivia:"1426. 奥莉维亚/Olivia/オリビア<br>"+
			"系列：Mario（马力欧）<br>"+
			"初登场：Paper Mario: The Origami King（纸片马力欧 折纸国王）<br>"+
			"武将作者：Show-K<br>"+
			"--------------------------------<br>"+
			"由掌握赋生折法的匠人制作的折纸，奥利王的妹妹。非常天真烂漫，对世界充满了好奇心。为了阻止哥哥的野心而踏上冒险之途，虽然也有过悲痛和犹豫，但是还是走到了最后。非常擅长唱歌跳舞，喜欢泡温泉和撸狗。<br>"+
			"——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>"+
			"--------------------------------<br>"+
			"一个拥有赋之能力的折纸妹妹，在和马里奥的冒险路途上成长很多啊……",
			ymk_577:"武将作者：Yumikohimi<br>"+
			"--------------------------------<br>"+
			"柚子设计的577，估计又要偏强……意外的还行？",
			ska_xiaojie:"武将作者：Show-K<br>"+
			"--------------------------------<br>"+
			"喜欢没事说嬲，但更喜欢不放弃。",
			ska_show_k:"武将作者：Show-K<br>"+
			"--------------------------------<br>"+
			"写我自己只是用来测试一下我写的技能的，目前根本就没计划加入我……",
			ymk_yumiko:"武将作者：Yumikohimi<br>"+
			"--------------------------------<br>"+
			"果然刚设计出来就要被削，果然还是三方定律。",
			ska_professor_toad:"????. 考古学家奇诺比奥/Professor Toad/考古学者キノピオ<br>"+
			"系列：Mario（马力欧）<br>"+
			"初登场：Paper Mario: The Origami King（纸片马力欧 折纸国王）<br>"+
			"武将作者：Show-K<br>"+
			"--------------------------------<br>"+
			"考古学家奇诺比奥是第一次出现在纸片马里奥 折纸国王中的奇诺比奥。作为古代历史学院教授兼考古学家，他与马力欧和奥莉维亚联手，帮助他们破坏黄色神祇胶带。他的棕色探险家装束和黄色斑点蘑菇头（大部分隐藏在他的髓质头盔中）以及他总是随身携带的铁锹和记事本，很容易将他与其他奇诺比奥区分开来。<br>"+
			"——翻译自《超级马力欧维基》（来源：https://www.mariowiki.com/Professor_Toad）<br>"+
			"--------------------------------<br>"+
			"大概是现代纸片马力欧中最有特色的奇诺比奥了吧……",
		},//武将介绍（选填）
		characterTitle:{
			ymk_isabelle:"尽忠职守",
			ska_bobby:"枫海思忆",
			ska_olivia:"折纸赋情",
			ymk_577:"生电妙手",
			ska_xiaojie:"永不言弃",
			ska_show_k:"灵跃文理",
			ymk_yumiko:"新厨明灶",
			ska_bowser:"联挚之火",
			ska_professor_toad:"沙原博时",
		},//武将标题（用于写称号或注释）（选填）
		skill:{
			//标准技能
			ymk_zhongmi:{
				trigger:{player:["gainAfter","loseAfter"]},
				filter:function(event,player){
					if(_status.currentPhase==player) return false;
					if(event.name=="lose"){
						//game.log(event.getParent());
						return ((event.hs&&event.hs.length)||(event.es&&event.es.length))&&!["useCard","respond"].contains(event.getParent().name);
					}
					else if(event.name=="gain"){
						return event.cards&&event.cards.length;
					}
					return false;
				},
				direct:true,
				content:function(){
					"step 0"
					event.num=player.maxHp-player.hp+1;
					player.chooseTarget(get.prompt("ymk_zhongmi"),"你可以令一名其他角色摸"+get.cnNumber(event.num)+"张牌，或弃置一名其他角色的"+get.cnNumber(event.num)+"张牌",function(card,player,target){
						return player!=target;
					}).set("ai",function(target){
						var player=_status.event.player;
						if(get.attitude(_status.event.player,target)>0){
							return 10+get.attitude(_status.event.player,target);
						}
						return 1;
					});
					"step 1"
					if(result.bool){
						player.logSkill("ymk_zhongmi",result.targets);
						event.target=result.targets[0];
						player.discardPlayerCard("弃置"+get.translation(event.target)+get.cnNumber(event.num)+"张牌，或令"+get.translation(event.target)+"摸"+get.cnNumber(event.num)+"张牌",event.target,Math.min(event.num,event.target.countCards("he")),"he");
					}
					else{
						event.finish();
					}
					"step 2"
					if(!result.bool){
						event.target.draw(event.num);
					}
				},
				ai:{
					expose:0.2,
					noe:1,
					noh:1,
					effect:{
						target:function(card,player,target){
							if(!target.hasFriend()) return;
							if(get.tag(card,"draw")||get.tag(card,"loseCard")) return [1,target.maxHp-target.hp+1];
						},
					},
				},
			},
			ymk_mihu:{
				trigger:{
					player:"useCardToPlayered",
				},
				filter:function(event,player){
					//game.log(event.getParent());
					//if(event.getParent().name=="ymk_mihu") return false;
					if(event.getParent().triggeredTargets3.length>1) return false;
					if(get.type(event.card)!="basic"&&get.type(event.card)!="trick") return false;
					return event.targets&&event.targets.length;
				},
				forced:true,
				content:function(){
					"step 0"
					player.judge();
					"step 1"
					event.num=player.maxHp-player.hp+1;
					switch(result.color){
						case "red":{
							event.type="add";
							player.chooseTarget("迷糊：为"+get.translation(trigger.card)+"增加"+get.cnNumber(event.num)+"个目标",event.num,true,function(card,player,target){
								var trigger=_status.event.getTrigger();
								return !trigger.targets.contains(target)&&lib.filter.targetEnabled2(trigger.card,trigger.player,target);
							}).set("ai",function(target){
								var trigger=_status.event.getTrigger();
								return get.effect(target,trigger.card,trigger.player,_status.event.player);
							});
							break;
						}
						case "black":{
							event.type="remove";
							player.chooseTarget("迷糊：为"+get.translation(trigger.card)+"减少"+get.cnNumber(event.num)+"个目标",event.num,true,function(card,player,target){
								return _status.event.targets.contains(target);
							}).set("ai",function(target){
								var trigger=_status.event.getTrigger();
								return -get.effect(target,trigger.card,trigger.player,_status.event.player);
							}).set("targets",trigger.targets);
							break;
						}
					}
					"step 2"
					if(result.targets&&result.targets.length){
						player.line(result.targets,"green");
						if(event.type=="add"){
							trigger.getParent().targets.addArray(result.targets);
							trigger.getParent().triggeredTargets2.addArray(result.targets);
						}
						else{
							//trigger.getParent().excluded.addArray(result.targets);
							trigger.targets.remove(result.targets);
							trigger.getParent().triggeredTargets2.remove(result.targets);
						}
					}
				},
			},
			ska_jixing:{
				enable:"phaseUse",
				filterCard:true,
				position:"he",
				usable:1,
				check:function(card){
					return 5-get.value(card);
				},
				filterTarget:function(card,player,target){
					return player.inRange(target);
				},
				delay:false,
				content:function(){
					"step 0"
					player.judge(function(card){
						var suit=get.suit(card);
						if(suit!="diamond"){
							return 2;
						}
					});
					"step 1"
					if(result.bool){
						target.damage(player);
					}
				},
				ai:{
					order:5,
					expose:0.2,
					damage:true,
					result:{
						target:function(player,target){
							return get.damageEffect(target,player,target);
						},
					},
				},
			},
			ska_daishi:{
				mod:{
					suit:function(card,suit){
						if(suit=="spade") return "diamond";
					},
				},
			},
			ska_yangxun:{
				trigger:{global:"judgeEnd"},
				direct:true,
				forced:true,
				filter:function(event,player){
					return event.result.suit=="diamond";
				},
				content:function(){
					"step 0"
					player.chooseTarget("洋寻：选择一名角色，其获得弃牌堆顶两张牌中一张牌，然后若其不是你，其须弃置一张牌",true).set("ai",function(target){
						if(!target.countCards("he")) return 0;
						return get.attitude(_status.event.player,target);
					});
					"step 1"
					if(result.targets&&result.targets.length){
						player.logSkill("ska_yangxun",result.targets);
						event.target=result.targets[0];
						//player.gain(trigger.result.card,"gain2");
						if(ui.discardPile.childNodes.length>1){
							var cards=[];
							if(get.position(ui.discardPile.childNodes[ui.discardPile.childNodes.length-1],true)=="d") cards.push(ui.discardPile.childNodes[ui.discardPile.childNodes.length-1]);
							if(get.position(ui.discardPile.childNodes[ui.discardPile.childNodes.length-2],true)=="d") cards.push(ui.discardPile.childNodes[ui.discardPile.childNodes.length-2]);
							player.chooseCardButton("洋寻：选择一张牌，令"+get.translation(event.target)+"获得此牌",true,cards).set("ai",function(button){
								return get.value(button.link);
							});
						}
						else if(ui.discardPile.childNodes.length){
							var card=ui.discardPile.childNodes[ui.discardPile.childNodes.length-1];
							if(card) event.target.gain(card,"gain2");
							player.chat("只有一张牌可得了吗");
							game.log("但是弃牌堆里面已经只有一张牌了！");
							event.goto(3);
						}
						else{
							player.chat("无牌可得了吗");
							game.log("但是弃牌堆里面已经没有牌了！");
							event.finish();
						}
					}
					"step 2"
					if(result.links&&result.links.length){
						event.target.gain(result.links,"gain2");
					}
					else{
						event.finish();
					}
					"step 3"
					if(event.target!=player) event.target.chooseToDiscard("洋寻：弃置一张牌","he",true);
				},
				ai:{
					expose:0.2,
				},
				group:["ska_yangxun2"],
			},
			ska_yangxun2:{
				trigger:{global:"judgeAfter"},
				filter:function(event,player){
					//game.log(player.storage.ska_yangxun_count);
					return _status.sst_judge_count==11;
				},
				forced:true,
				content:function(){
					"step 0"
					//player.draw(2);
					if(ui.discardPile.childNodes.length>1){
						var cards=[];
						cards.push(ui.discardPile.childNodes[ui.discardPile.childNodes.length-1]);
						cards.push(ui.discardPile.childNodes[ui.discardPile.childNodes.length-2]);
						if(cards.length) player.gain(cards,"gain2");
					}
					else if(ui.discardPile.childNodes.length){
						var card=ui.discardPile.childNodes[ui.discardPile.childNodes.length-1];
						if(card) player.gain(card,"gain2");
						player.chat("只有一张牌可得了吗");
						game.log("但是弃牌堆里面已经只有一张牌了！");
					}
					else{
						player.chat("无牌可得了吗");
						game.log("但是弃牌堆里面已经没有牌了！");
					}
					"step 1"
					player.chooseCard("he","洋寻：重铸一张牌",true).set("ai",function(card){
						return 8-get.value(card);
					});
					"step 2"
					if(result.cards&&result.cards.length>0){
						var card=result.cards[0];
						player.lose(card,ui.discardPile,"visible","_chongzhu");
						player.$throw(card,1000);
						game.log(player,"将",card,"置入弃牌堆");
						player.draw();
					}
					"step 3"
					if(player.getDamagedHp()) player.recover(player.maxHp-player.hp);
					"step 4"
					player.removeSkill("ska_daishi");
					game.log(player,"失去了技能","#g【怠事】");
				},
			},
			ska_shenqi:{
				audio:2,
				trigger:{global:["roundStart","damageEnd"]},
				frequent:true,
				init:function(player){
					if(!player.storage.ska_shenqi) player.storage.ska_shenqi=[];
				},
				filter:function(event,player){
					return player.storage.ska_shenqi.length<6;
				},
				content:function(){
					"step 0"
					player.judge();
					"step 1"
					var card=result.card;
					if(get.position(card,true)=="d"){
						game.cardsGotoSpecial(card);
						player.$gain2(card);
						player.storage.ska_shenqi.push(card);
						player.syncStorage("ska_shenqi");
						player.markSkill("ska_shenqi");
						game.log(player,"将",card,"置于武将牌上作为“祇”");
						game.delayx();
					}
				},
				marktext:"祇",
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
					maixie:true,
				},
				group:["ska_shenqi2"],
			},
			/*
			old_ska_shenqi2:{
				enable:"phaseUse",
				filter:function(event,player){
					return player.storage.ska_shenqi&&player.storage.ska_shenqi.length>0;
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog("神祇",player.storage.ska_shenqi,"hidden")
					},
					select:[1,Infinity],
					backup:function(links,player){
						return {
							filterCard:function(){return false;},
							selectCard:-1,
							cards:links,
							delay:false,
							content:lib.skill.ska_shenqi2.contentx,
							ai:{
								order:10,
								result:{
									player:function(player,target){
										return 1;
									}
								},
							},
						}
					},
					//prompt:function(){return "请选择〖排异〗的目标"},
				},
				contentx:function(){
					"step 0"
					var cards=lib.skill.ska_shenqi2_backup.cards;
					game.cardsDiscard(cards);
					player.$throw(cards);
					for(var i=0;i<cards.length;i++){
						player.storage.ska_shenqi.remove(cards[i]);
					}
					game.log(cards,"进入了弃牌堆");
					if(!player.storage.ska_shenqi.length){
						player.unmarkSkill("ska_shenqi");
					}
					else{
						player.markSkill("ska_shenqi");
					}
					player.syncStorage("ska_shenqi");
					event.cards=cards;
					"step 1"
					player.draw(event.cards.length);
				},
				ai:{
					order:1,
					result:{
						player:function(player,target){
							var num=player.getStat("skill").ska_shenqi2||0;
							num++;
							return 2/num;
						},
					},
				},
			},
			*/
			ska_shenqi2:{
				trigger:{player:"useCard"},
				filter:function(event,player){
					return player.storage.ska_shenqi.length;
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseCardButton(player.storage.ska_shenqi,get.prompt("ska_shenqi2")).set("ai",function(button){
						var player=_status.event.player;
						if(player.isPhaseUsing()) return player.getUseValue(button.link);
						return get.useful(button.link);
					});
					"step 1"
					if(result.links&&result.links.length){
						player.logSkill("ska_shenqi");
						player.gain(result.links,"gain2","fromStorage",false);
						player.storage.ska_shenqi.remove(result.links[0]);
						player.syncStorage("ska_shenqi");
						if(!player.storage.ska_shenqi.length){
							player.unmarkSkill("ska_shenqi");
						}
						else{
							player.markSkill("ska_shenqi");
						}
					}
				},
			},
			ska_zhefu:{
				enable:"phaseUse",
				usable:1,
				filter:function(event,player){
					return player.storage.ska_shenqi&&player.storage.ska_shenqi.length>0;
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog("折赋",player.storage.ska_shenqi,"hidden")
					},
					check:function(button){
						return get.value(button.link);
					},
					backup:function(links,player){
						return {
							filterCard:function(){return false;},
							selectCard:-1,
							filterTarget:true,
							cards:links,
							delay:false,
							content:lib.skill.ska_zhefu.contentx,
							ai:{
								order:10,
								result:{
									target:function(player,target){
										//return target.getUseValue(links[0]);
										return 2;
									},
								},
							},
						}
					},
					prompt:function(){return "请选择〖折赋〗的目标"},
				},
				contentx:function(){
					"step 0"
					var cards=lib.skill.ska_zhefu_backup.cards;
					event.card=cards[0];
					target.chooseCard("he","折赋：交给"+get.translation(player)+"一张牌，然后使用"+get.translation(cards)+"，或获得"+get.translation(cards)).set("ai",function(card){
						var player=_status.event.player;
						return player.getUseValue(_status.event.cardx)-get.useful(card);
					}).set("cardx",cards[0]);
					"step 1"
					player.storage.ska_shenqi.remove(event.card);
					if(!player.storage.ska_shenqi.length){
						player.unmarkSkill("ska_shenqi");
					}
					else{
						player.markSkill("ska_shenqi");
					}
					if(result.cards&&result.cards.length){
						target.give(result.cards,player);
						target.chooseUseTarget(true,event.card,false);
					}
					else{
						target.gain(event.card,player,"gain2","fromStorage");
					}
					player.syncStorage("ska_shenqi");
					"step 1"
					if(!result.bool){
						game.cardsDiscard(event.card);
						player.$throw(event.card,1000);
						game.log(event.card,"进入了弃牌堆");
					}
				},
				ai:{
					combo:"ska_shenqi",
					order:8,
					expose:0.2,
					result:{
						player:function(player,target){
							return 1;
						},
					},
				},
			},
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
					expose:0.1,
				},
				group:["ymk_jiagou3","ymk_jiagou_clear"],
				subSkill:{
					clear:{
						trigger:{global:"phaseAfter"},
						silent:true,
						content:function(){
							delete player.storage.ymk_jiagou;
						},
					},
				},
			},
			ymk_jiagou2:{
				onremove:function(player){
					delete player.storage.ymk_jiagou;
				},
				mod:{
					maxHandcardBase:function(player,num){
						return player.storage.ymk_jiagou;
					},
				},
			},
			ymk_jiagou3:{
				trigger:{global:"phaseJieshuBegin"},
				filter:function(event,player){
					return player.storage.ymk_jiagou&&player.storage.ymk_jiagou<=5;
				},
				forced:true,
				content:function(){
					player.drawTo(player.maxHp);
				},
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
						},
					},
				},
				group:["ymk_jicai2"],
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
				},
			},
			ska_kezhi:{
				trigger:{player:"useCardAfter"},
				direct:true,
				filter:function(event,player){
					return event.ska_kezhi&&player.countCards("he");
				},
				content:function(){
					var next=player.chooseToUse("###"+get.prompt("ska_kezhi")+"###你可以将一张牌当作"+get.translation(trigger.card)+"使用并失去1点体力",-1).set("logSkill","ska_kezhi");
					next.set("norestore",true);
					next.set("_backupevent","ska_kezhix");
					next.backup("ska_kezhix");
					//next.set("viewAs",trigger.card);
					next.set("addCount",false);
					/*
					next.set("filterTarget",function(card,player,target){
						return target==_status.event.targetx&&lib.filter.targetEnabled2({name:"sha"},player,target);
					});
					*/
					//next.set("targetx",trigger.target);
					next.set("cardx",trigger.card);
				},
				group:["ska_kezhi_respond","ska_kezhi2"],
				subSkill:{
					respond:{
						trigger:{global:["respond","useCard"]},
						filter:function(event,player){
							if(!event.respondTo) return false;
							if(player!=event.respondTo[0]) return false;
							return true;
						},
						silent:true,
						content:function(){
							//game.log(trigger.getParent(3));
							trigger.getParent("useCard").ska_kezhi=true;
						},
						sub:true,
					},
				},
			},
			ska_kezhix:{
				viewAs:function(){
					//return {name:_status.event.cardx.name,nature:_status.event.cardx.nature};
					return _status.event.cardx;
				},
				filterCard:true,
				filterTarget:function(){
					return lib.filter.filterTarget.apply(this,arguments);
				},
				selectTarget:function(){
					return lib.filter.selectTarget.apply(this,arguments);
				},
				position:"he",
				check:function(card){return 5-get.value(card)},
				onuse:function(result,player){
					player.loseHp();
				},
			},
			ska_kezhi2:{
				trigger:{player:"useCardEnd"},
				filter:function(event,player){
					//game.log(event.getParent().skill);
					return !player.hasSkill("ska_kezhi3")&&event.skill=="ska_kezhix"&&player.getHistory("sourceDamage",function(evt){
						return evt.card==event.card;
					}).length;
				},
				frequent:true,
				content:function(){
					player.addTempSkill("ska_kezhi3");
					player.recover();
					player.draw(2);
				},
			},
			ska_kezhi3:{},
			ska_jiyan:{
				init:function(player){
					if(!player.storage.ska_jiyan||!player.storage.ska_jiyan.length) player.storage.ska_jiyan=["sha","shan","tao","jiu"];
				},
				group:["ska_jiyan_sha","ska_jiyan_shan","ska_jiyan_tao","ska_jiyan_jiu"],
				subSkill:{
					sha:{
						enable:["chooseToUse","chooseToRespond"],
						filterCard:function(){return false;},
						selectCard:-1,
						viewAs:{name:"sha"},
						filter:function(event,player){
							return player.storage.ska_jiyan.contains("sha");
						},
						prompt:"视为使用或打出一张【杀】",
						onuse:function(result,player){
							player.popup("《话语权》");
							player.chat("《话语权》");
							player.storage.ska_jiyan.remove("sha");
							if(!player.storage.ska_jiyan.length){
								player.gainMaxHp();
								player.recover();
								player.removeSkill("ska_jiyan");
								game.log(player,"失去了技能","#g【籍验】");
							}
						},
						onrespond:function(){return this.onuse.apply(this,arguments);},
						ai:{
							respondSha:true,
							skillTagFilter:function(player){
								return player.storage.ska_jiyan.contains("sha");
							},
							order:function(){
								return get.order({name:"sha"})+0.1;
							},
							useful:-1,
							value:-1,
						},
						sub:true,
					},
					shan:{
						enable:["chooseToUse","chooseToRespond"],
						filterCard:function(){return false;},
						selectCard:-1,
						viewAs:{name:"shan"},
						prompt:"视为使用或打出一张【闪】",
						filter:function(event,player){
							return player.storage.ska_jiyan.contains("shan");
						},
						onuse:function(result,player){
							player.popup("《理解》");
							player.chat("《理解》");
							player.storage.ska_jiyan.remove("shan");
							if(!player.storage.ska_jiyan.length){
								player.gainMaxHp();
								player.recover();
								player.removeSkill("ska_jiyan");
								game.log(player,"失去了技能","#g【籍验】");
							}
						},
						onrespond:function(){return this.onuse.apply(this,arguments);},
						ai:{
							respondShan:true,
							skillTagFilter:function(player){
								return player.storage.ska_jiyan.contains("shan");
							},
							order:function(){
								return get.order({name:"shan"})+0.1;
							},
							useful:-1,
							value:-1,
						},
						sub:true,
					},
					tao:{
						enable:["chooseToUse","chooseToRespond"],
						filterCard:function(){return false;},
						selectCard:-1,
						viewAs:{name:"tao"},
						prompt:"视为使用或打出一张【桃】",
						filter:function(event,player){
							return player.storage.ska_jiyan.contains("tao");
						},
						onuse:function(result,player){
							player.popup("《硬气》");
							player.chat("《硬气》");
							player.storage.ska_jiyan.remove("tao");
							if(!player.storage.ska_jiyan.length){
								player.gainMaxHp();
								player.recover();
								player.removeSkill("ska_jiyan");
								game.log(player,"失去了技能","#g【籍验】");
							}
						},
						onrespond:function(){return this.onuse.apply(this,arguments);},
						ai:{
							save:true,
							skillTagFilter:function(player){
								return player.storage.ska_jiyan.contains("tao");
							},
							order:function(){
								return get.order({name:"tao"})+0.1;
							},
							useful:-1,
							value:-1,
						},
						sub:true,
					},
					jiu:{
						enable:["chooseToUse","chooseToRespond"],
						filterCard:function(){return false;},
						selectCard:-1,
						viewAs:{name:"jiu"},
						prompt:"视为使用或打出一张【酒】",
						filter:function(event,player){
							return player.storage.ska_jiyan.contains("jiu");
						},
						onuse:function(result,player){
							player.popup("《压迫感》");
							player.chat("《压迫感》");
							player.storage.ska_jiyan.remove("jiu");
							if(!player.storage.ska_jiyan.length){
								player.gainMaxHp();
								player.recover();
								player.removeSkill("ska_jiyan");
								game.log(player,"失去了技能","#g【籍验】");
							}
						},
						onrespond:function(){return this.onuse.apply(this,arguments);},
						ai:{
							save:true,
							skillTagFilter:function(player){
								return player.storage.ska_jiyan.contains("jiu");
							},
							order:function(){
								return get.order({name:"jiu"})+0.1;
							},
							useful:-1,
							value:-1,
						},
						sub:true,
					},
				},
			},
			ska_lunli:{
				trigger:{target:"useCardToTargeted"},
				direct:true,
				filter:function(event,player){
					return player.countCards("he");
				},
				content:function(){
					"step 0"
					player.chooseCard("he",get.prompt2("ska_lunli",trigger.player),function(card){
						var number=get.number(_status.event.cardx);
						var player=_status.event.player; 
						return Math.abs(number-get.number(card))==player.hp;
					}).set("cardx",trigger.card).set("ai",function(card){
						return 11-get.value(card);
					});
					"step 1"
					if(result.bool){
						player.logSkill("ska_lunli",trigger.player);
						player.showCards(result.cards);
					}
					else{
						event.finish();
					}
					"step 2"
					player.chooseBool("论理：是否摸一张牌？").set("ai",function(){
						return true;
					});
					"step 3"
					if(result.bool) player.draw();
					"step 4"
					player.chooseBool("论理：是否令"+get.translation(trigger.player)+"弃置一张牌？").set("ai",function(){
						var player=_status.event.player;
						var target=_status.event.targetx;
						return get.attitude(player,target)<0;
					}).set("targetx",trigger.player);
					"step 5"
					if(result.bool){
						if(typeof player.ai.shown=="number"&&player.ai.shown<0.95){
							player.ai.shown+=0.3;
							if(player.ai.shown>0.95) player.ai.shown=0.95;
						}
						trigger.player.chooseToDiscard("论理：弃置一张牌","he",true);
					}
				},
			},
			ska_shubian:{
				enable:"phaseUse",
				usable:1,
				position:"he",
				complexCard:true,
				filterTarget:true,
				selectTarget:function(){
					return ui.selected.cards.length;
				},
				filterCard:function(card){
					var num=0;
					for(var i=0;i<ui.selected.cards.length;i++){
						num+=get.number(ui.selected.cards[i]);
					}
					return get.number(card)+num<=13;
				},
				selectCard:function(){
					var num=0;
					for(var i=0;i<ui.selected.cards.length;i++){
						num+=get.number(ui.selected.cards[i]);
					}
					if(num==13) return ui.selected.cards.length;
					return ui.selected.cards.length+2;
				},
				check:function(card){
					var num=0;
					for(var i=0;i<ui.selected.cards.length;i++){
						num+=get.number(ui.selected.cards[i]);
					}
					if(num+get.number(card)==13) return 9-get.value(card);
					if(ui.selected.cards.length==0){
						var cards=_status.event.player.getCards("h");
						for(var i=0;i<cards.length;i++){
							for(var j=i+1;j<cards.length;j++){
								if(cards[i].number+cards[j].number==13){
									if(cards[i]==card||cards[j]==card) return 8.5-get.value(card);
								}
							}
						}
					}
					return 0;
				},
				line:"thunder",
				content:function (){
					"step 0"
					player.chooseBool("数变：令"+get.translation(target)+"回复1点体力，否则受到你造成的1点伤害").set("ai",function(){
						var player=_status.event.player;
						var target=_status.event.targetx;
						return get.sgn(get.recoverEffect(target,player,player)-get.damageEffect(target,player,player))>0;
					}).set("targetx",target);
					"step 1"
					if(typeof player.ai.shown=="number"&&player.ai.shown<0.95){
						player.ai.shown+=0.3;
						if(player.ai.shown>0.95) player.ai.shown=0.95;
					}
					if(result.bool){
						target.recover();
					}
					else{
						target.damage(player);
					}
				},
				ai:{
					order:10,
					result:{
						target:function(player,target){
							if(get.attitude(player,target)>0&&!target.getDamagedHp()) return -1;
							return get.sgn(get.attitude(player,target));
						},
						player:1,
					},
				},
			},
			ymk_qiuyi:{
				trigger:{global:"useCardAfter"},
				direct:true,
				filter:function(event,player){
					return !player.hasSkill("ymk_qiuyi3")&&!["shan","wuxie"].contains(get.name(event.card))&&["basic","trick"].contains(get.type(event.card))&&(event.player.hp>=player.hp||event.player.countCards("h")>=player.countCards("h"));
				},
				content:function(){
					"step 0"
					player.chooseCard("he",get.prompt2("ymk_qiuyi",trigger.player)).set("ai",function(card){
						var player=_status.event.player;
						var cardx=_status.event.cardx;
						return player.getUseValue(cardx)-7+get.value(card);
					}).set("cardx",trigger.card);
					"step 1"
					if(result.cards&&result.cards.length){
						player.logSkill("ymk_qiuyi",trigger.player);
						player.addTempSkill("ymk_qiuyi3");
						player.give(result.cards,trigger.player);
						if(!trigger.player.storage.ymk_qiuyi) trigger.player.storage.ymk_qiuyi=0;
						trigger.player.storage.ymk_qiuyi++;
						trigger.player.addTempSkill("ymk_qiuyi2");
					}
					else{
						event.finish();
					}
					"step 2"
					player.chooseUseTarget("求艺：使用"+get.translation(trigger.card),trigger.card,true,false);
				},
			},
			ymk_qiuyi2:{
				mod:{
					maxHandcard:function(player,num){
						if(typeof player.storage.ymk_qiuyi=="number"){
							return num+player.storage.ymk_qiuyi;
						}
					},
				},
			},
			ymk_qiuyi3:{},
			ymk_xifang:{
				usable:1,
				trigger:{source:"gainAfter"},
				filter:function(event,player){
					return event.player.countCards("h");
				},
				frequent:true,
				logTarget:"player",
				content:function(){
					"step 0"
					player.viewHandcards(trigger.player);
					"step 2"
					var cards=trigger.player.getCards("h");
					var colors=[];
					var types=[];
					for(var i=0;i<cards.length;i++){
						if(!colors.contains(get.color(cards[i]))) colors.push(get.color(cards[i]));
						if(!types.contains(get.type(cards[i],"trick"))) types.push(get.type(cards[i],"trick"));
					}
					if(colors.length>1||types.length>1) player.draw();
					//if(colors.length>1) player.draw();
					//if(types.length>1) player.draw();
				},
			},
			ska_mengjin:{
				locked:false,
				init:function(player){
					if(!player.storage.ska_mengjin) player.storage.ska_mengjin=[];
				},
				enable:"phaseUse",
				usable:1,
				filterTarget:function(card,player,target){
					return player!=target;
				},
				viewAsFilter:function(player){
					if(!player.countCards("h")) return false;
				},
				filterCard:true,
				selectCard:function(){
					var player=_status.event.player;
					return Math.ceil(player.countCards("h")/2);
				},
				check:function(card){
					return 7-get.value(card);
				},
				discard:false,
				lose:false,
				delay:false,
				position:"he",
				content:function (){
					"step 0"
					target.gain(cards,player,"giveAuto");
					"step 1"
					var num=Math.ceil(target.countCards("h")/2);
					if(num){
						target.chooseCard("盟进：交给"+get.translation(player)+get.cnNumber(num)+"张牌",num,"he",true).set("ai",function(card){
							if(get.attitude(_status.event.player,_status.event.getParent().player)>0){
								return 11-get.value(card);
							}
							else{
								return 7-get.value(card);
							}
						});
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.cards&&result.cards.length){
						player.gain(result.cards,target,"giveAuto");
						player.storage.ska_mengjin.addArray(result.cards);
					}
				},
				mod:{
					cardUsable:function(card,player){
						var cards=player.storage.ska_mengjin;
						for(var i=0;i<cards.length;i++){
							if(card.cards&&card.cards.contains(cards[i])) return Infinity;
						}
					},
					targetInRange:function(card,player){
						var cards=player.storage.ska_mengjin;
						for(var i=0;i<cards.length;i++){
							if(card.cards&&card.cards.contains(cards[i])) return true;
						}
					},
				},
				ai:{
					order:5,
					expose:0.2,
					result:{
						target:function(player,target){
							if(target.hasSkillTag("nogain")) return 0;
							if(player.countCards("h")==player.countCards("h","du")) return -1;
							if(get.attitude(player,target)<0) return player.countCards("h")/2-target.countCards("h")/2;
							return 2;
						},
						player:function(player,target){
							return 1;
						},
					},
				},
				group:["ska_mengjin_clear"],
				subSkill:{
					clear:{
						trigger:{global:"phaseAfter"},
						silent:true,
						content:function(){
							player.storage.ska_mengjin=[];
						},
					},
				},
			},
			ska_juegu:{
				group:["ska_juegu_sha","ska_juegu_shan"],
				subSkill:{
					sha:{
						enable:["chooseToUse","chooseToRespond"],
						viewAs:{name:"sha",isCard:true},
						filterCard:true,
						filter:function(event,player){
							if(player.hasSkill("ska_juegu_disable")||event.ska_juegu||!player.countCards("he")) return false;
							return true;
						},
						selectCard:1,
						position:"he",
						check:function(card){
							if(ui.discardPile.childNodes.length&&get.suit(card)==get.suit(ui.discardPile.childNodes[ui.discardPile.childNodes.length-1])) return 8-get.value(card);
							return 5-get.value(card);
						},
						precontent:function(){
							"step 0"
							player.logSkill("ska_juegu");
							event.card_top=event.result.cards[0];
							player.showCards(event.card_top);
							"step 1"
							player.$throw(event.card_top);
							game.log(player,"将",event.card_top,"置于牌堆顶");
							player.lose(event.card_top,ui.cardPile,"insert");
							"step 2"
							event.card_bottom=get.bottomCards()[0];
							player.showCards(event.card_bottom,get.translation(player.name)+"展示的牌堆底牌");
							"step 3"
							if(ui.discardPile.childNodes.length&&get.suit(event.card_top)==get.suit(ui.discardPile.childNodes[ui.discardPile.childNodes.length-1])){
								event.result.card={name:event.result.card.name,isCard:true};
								event.result.cards=[];
							}
							else{
								if(!ui.discardPile.childNodes.length){
									player.chat("无牌可比较了吗");
									game.log("但是弃牌堆里面已经没有牌了！");
								}
								var evt=event.getParent();
								evt.set("ska_juegu",true);
								evt.goto(0);
								player.addTempSkill("ska_juegu_disable");
							}
							//delete event.result.skill;
							//delete event.result.card.suit;
							//delete event.result.card.number;
							"step 4"
							var can_damage=get.color(event.card_top)==get.color(event.card_bottom);
							player.chooseTarget("掘古：你可以令一名角色获得"+get.translation(event.card_bottom)+(can_damage?"，然后你可以对其造成1点伤害":"")).set("ai",function(target){
								var player=_status.event.player;
								if(get.value(event.card_bottom)<=get.damageEffect(target,player)&&_status.event.can_damage) return get.damageEffect(target,player);
								return get.attitude(player,target);
							}).set("cardx",event.card_bottom).set("can_damage",can_damage);
							"step 5"
							if(result.targets&&result.targets.length){
								event.target=result.targets[0];
								player.line(event.target,"green");
								event.target.gain(event.card_bottom,"gain2",false);
							}
							else{
								event.finish();
							}
							"step 6"
							if(get.color(event.card_top)==get.color(event.card_bottom)){
								player.chooseBool("掘古：是否对"+get.translation(event.target)+"造成1点伤害？").set("ai",function(){
									var player=_status.event.player;
									var target=_status.event.targetx;
									return get.damageEffect(target,player)>0;
								}).set("targetx",event.target);
							}
							else{
								event.finish();
							}
							"step 7"
							if(result.bool){
								player.line(event.target,"green");
								event.target.damage(player);
							}
						},
						prompt:"当你需要使用或打出一张【杀】时，你可以展示一张牌并将其置于牌堆顶，然后展示牌堆底一张牌，1. 若你置于牌堆顶的牌花色与弃牌堆顶的花色相同，你视为使用或打出一张【杀】，否则你不能发动此技能直到回合结束；2. 你可以令一名角色获得展示的牌堆底牌，然后若你置于牌堆顶的牌颜色与此牌相同，你可以对其造成1点伤害",
						ai:{
							order:function(){
								return get.order({name:"sha"})+0.1;
							},
							skillTagFilter:function(player,tag,arg){
								if(player.hasSkill("ska_juegu_disable")||_status.event.ska_juegu||!player.countCards("he")) return false;
							},
							respondSha:true,
							guanxing:true,
							expose:0.2,
						}
					},
					shan:{
						enable:["chooseToUse","chooseToRespond"],
						viewAs:{name:"shan",isCard:true},
						filterCard:true,
						filter:function(event,player){
							if(player.hasSkill("ska_juegu_disable")||event.ska_juegu||!player.countCards("he")) return false;
							return true;
						},
						check:function(card){
							if(get.suit(card)==get.suit(ui.discardPile.childNodes[ui.discardPile.childNodes.length-1])) return 8-get.value(card);
							return 5-get.value(card);
						},
						precontent:function(){
							"step 0"
							player.logSkill("ska_juegu");
							event.card_top=event.result.cards[0];
							player.showCards(event.card_top);
							"step 1"
							player.$throw(event.card_top);
							game.log(player,"将",event.card_top,"置于牌堆顶");
							player.lose(event.card_top,ui.cardPile,"insert");
							"step 2"
							event.card_bottom=get.bottomCards()[0];
							player.showCards(event.card_bottom,get.translation(player.name)+"展示的牌堆底牌");
							"step 3"
							if(get.suit(event.card_top)==get.suit(ui.discardPile.childNodes[ui.discardPile.childNodes.length-1])){
								event.result.card={name:event.result.card.name,isCard:true};
								event.result.cards=[];
							}
							else{
								var evt=event.getParent();
								evt.set("ska_juegu",true);
								evt.goto(0);
								player.addTempSkill("ska_juegu_disable");
							}
							//delete event.result.skill;
							//delete event.result.card.suit;
							//delete event.result.card.number;
							"step 4"
							var can_damage=get.color(event.card_top)==get.color(event.card_bottom);
							player.chooseTarget("掘古：你可以令一名角色获得"+get.translation(event.card_bottom)+(can_damage?"，然后你可以对其造成1点伤害":"")).set("ai",function(target){
								var player=_status.event.player;
								if(get.value(event.card_bottom)<=get.damageEffect(target,player)&&_status.event.can_damage) return get.damageEffect(target,player);
								return get.attitude(player,target);
							}).set("cardx",event.card_bottom).set("can_damage",can_damage);
							"step 5"
							if(result.targets&&result.targets.length){
								event.target=result.targets[0];
								player.line(event.target,"green");
								event.target.gain(event.card_bottom,"gain2");
							}
							else{
								event.finish();
							}
							"step 6"
							if(get.color(event.card_top)==get.color(event.card_bottom)){
								player.chooseBool("掘古：是否对"+get.translation(event.target)+"造成1点伤害？").set("ai",function(){
									var player=_status.event.player;
									var target=_status.event.targetx;
									return get.damageEffect(target,player)>0;
								}).set("targetx",event.target);
							}
							else{
								event.finish();
							}
							"step 7"
							if(result.bool){
								player.line(event.target,"green");
								event.target.damage(player);
							}
						},
						selectCard:1,
						position:"he",
						prompt:"当你需要使用或打出一张【闪】时，你可以展示一张牌并将其置于牌堆顶，然后展示牌堆底一张牌，1. 若你置于牌堆顶的牌花色与弃牌堆顶的花色相同，你视为使用或打出一张【闪】，否则你不能发动此技能直到回合结束；2. 你可以令一名角色获得展示的牌堆底牌，然后若你置于牌堆顶的牌颜色与此牌相同，你可以对其造成1点伤害",
						ai:{
							order:function(){
								return get.order({name:"shan"})+0.1;
							},
							skillTagFilter:function(player){
								if(player.hasSkill("ska_juegu_disable")||_status.event.ska_juegu||!player.countCards("he")) return false;
							},
							respondShan:true,
							guanxing:true,
							expose:0.2,
						}
					},
					disable:{},
				},
			},
			ska_kuiwang:{
				trigger:{player:"gainAfter"},
				frequent:true,
				filter:function(event,player){
					return event.getParent().name=="draw";
				},
				content:function(){
					"step 0"
					player.gain(get.bottomCards(trigger.cards.length),"gain2");
					"step 1"
					player.chooseCard("窥往：将"+get.cnNumber(trigger.cards.length)+"张牌置于牌堆底（后选择的在下）",trigger.cards.length,true);
					"step 2"
					if(result.cards&&result.cards.length){
						player.$throw(result.cards);
						game.log(player,"将",result.cards,"置于牌堆底");
						player.lose(result.cards,ui.cardPile);
					}
				},
			},
			/*
			ska_fuyuan:{
				init:function(player){
					if(!player.storage.ska_fuyuan) player.storage.ska_fuyuan={};
				},
				trigger:{player:["gainAfter","loseAfter"]},
				filter:function(event,player){
					var players=game.filterPlayer(function(current){
						return current!=player&&((!player.storage.ska_fuyuan[current.playerid]&&(event.name=="gain"||(event.name=="lose"&&current.countCards("he"))))||(event.name=="gain"&&player.storage.ska_fuyuan[current.playerid].draw<3)||(event.name=="lose"&&current.countCards("he")&&player.storage.ska_fuyuan[current.playerid].discard<3));
					});
					return players&&players.length;
				},
				direct:true,
				content:function(){
					"step 0"
					var str=event.triggername=="gainAfter"?"当你获得牌时，你可以令一名其他角色摸等量的牌（一回合累计以此法摸的牌不能超过三张），若其因此手牌数与其体力值相等，你可以观看牌堆顶一张牌，然后你可以使用此牌":"当你失去牌时，你可以令一名其他角色弃置等量的牌（一回合累计以此法摸/弃置的牌不能超过三张），若其因此手牌数与其体力值相等，你可以观看牌堆顶一张牌，然后你可以使用此牌";
					player.chooseTarget(get.prompt("ska_fuyuan"),str,function(card,player,target){
						var triggernamex=_status.event.triggernamex;
						return target!=player&&(!player.storage.ska_fuyuan[target.playerid]&&(triggernamex=="gainAfter"||(triggernamex=="loseAfter"&&target.countCards("he")))||(triggernamex=="gainAfter"&&player.storage.ska_fuyuan[target.playerid].draw<3)||(triggernamex=="loseAfter"&&target.countCards("he")&&player.storage.ska_fuyuan[target.playerid].discard<3));
					}).set("ai",function(target){
						var triggernamex=_status.event.triggernamex;
						if(triggernamex=="loseAfter") return -get.attitude(_status.event.player,target);
						return get.attitude(_status.event.player,target);
					}).set("triggernamex",event.triggername);
					"step 1"
					if(result.targets&&result.targets.length){
						event.target=result.targets[0];
						player.logSkill("ska_fuyuan",event.target);
						if(!player.storage.ska_fuyuan[event.target.playerid]){
							player.storage.ska_fuyuan[event.target.playerid]={};
							player.storage.ska_fuyuan[event.target.playerid].draw=0;
							player.storage.ska_fuyuan[event.target.playerid].discard=0;
						}
						var num=Math.min(3,trigger.cards.length);
						if(event.triggername=="gainAfter"){
							num=Math.min(num,3-player.storage.ska_fuyuan[event.target.playerid].draw);
							player.storage.ska_fuyuan[event.target.playerid].draw+=num;
							event.target.draw(num);
						}
						else{
							num=Math.min(num,3-player.storage.ska_fuyuan[event.target.playerid].discard);
							player.storage.ska_fuyuan[event.target.playerid].discard+=num;
							event.target.chooseToDiscard("复愿：弃置"+get.translation(num)+"张牌",num,"he",true);
						}
					}
					else{
						event.finish();
					}
					"step 2"
					//game.log(event.target.countCards("h")==event.target.hp);
					if(event.target.countCards("h")==event.target.hp){
						event.card=get.cards()[0];
						game.log(player,"观看了牌堆顶的一张牌");
						player.chooseControl("ok").set("dialog",["复愿",event.card]);
					}
					else{
						event.finish();
					}
					"step 3"
					ui.cardPile.insertBefore(event.card,ui.cardPile.firstChild);
					game.updateRoundNumber();
					"step 4"
					player.chooseUseTarget(event.card,false);
				},
				group:["ska_fuyuan_clear"],
				subSkill:{
					clear:{
						trigger:{global:"phaseAfter"},
						silent:true,
						content:function(){
							player.storage.ska_fuyuan={};
						},
					},
				},
				ai:{
					nodiscard:true,
					nolose:true,
					noe:true,
					noh:true,
				},
			},
			*/
		},//技能（必填）
		dynamicTranslate:{
		},
		/*
		characterReplace:{
			ska_mario:["sst_mario","sst_dr_mario","ska_mario"],
			ska_bowser:["sst_bowser","ska_bowser"],
			ymk_yumiko:["sst_yumiko","ymk_yumiko"],
			ymk_isabelle:["sst_isabelle","ymk_isabelle"],
		},//武将替换
		*/
		translate: {
			//武将
			ymk_isabelle:"SP西施惠",
			ska_bobby:"炸弹彬",
			ska_olivia:"奥莉维亚",
			ymk_577:"方块君",
			ska_xiaojie:"小桀",
			ska_show_k:"小溪",
			ymk_yumiko:"SP柚子",
			ska_bowser:"☆SP酷霸王",
			ska_professor_toad:"考古学家奇诺比奥",
			//身份技能
			ymk_zhongmi:"忠秘",
			ymk_zhongmi_info:"你的回合外，当你获得或不因使用或打出而失去牌时，你可以选择一项：1. 令一名其他角色摸X+1张牌；2. 弃置一名其他角色的X+1张牌。（X为你损失的体力值）",
			ymk_mihu:"迷糊",
			ymk_mihu_info:"锁定技，当你使用基本牌或普通锦囊牌指定目标后，你判定。若判定结果为（X为你损失的体力值）：<br>"+
			"红色：此牌增加X+1个目标（不足则全选）；<br>"+
			"黑色：此牌减少X+1个目标（不足则全选）。<br>",
			ska_jixing:"激行",
			ska_jixing_info:"出牌阶段限一次，你可以弃置一张牌并指定攻击范围内一名角色，然后你判定，若结果不为♦，你对其造成1点伤害。",
			ska_daishi:"怠事",
			ska_daishi_info:"锁定技，你区域内的♠牌和♠判定牌均视为♦。",
			ska_yangxun:"洋寻",
			ska_yangxun2:"洋寻",
			ska_yangxun_info:"锁定技，当一名角色的判定牌生效后，若花色为♦，你令一名角色获得弃牌堆顶两张牌中一张牌，然后若其不是你，其须弃置一张牌。当一名角色判定结算后，若此判定为本局游戏第11次判定，你获得弃牌堆顶两张牌，重铸一张牌，回复体力至体力上限，失去〖怠事〗。",
			ska_shenqi:"神祇",
			ska_shenqi2:"神祇",
			ska_shenqi_info:"每轮游戏开始时或一名角色受到伤害后，若武将牌上的“祇”少于6张，你可以判定，然后将判定牌置于武将牌上称为“祇”；当你使用牌时，你可以获得武将牌上的一张“祇”。",
			ska_zhefu:"折赋",
			ska_zhefu_backup:"折赋",
			ska_zhefu_info:"出牌阶段限一次，你可以选择一张“祇”，并令一名角色选择一项：1. 获得这张“祇”；2. 交给你一张牌，然后使用这张“祇”（若不能使用则弃置）。",
			ymk_jiagou:"架构",
			ymk_jiagou2:"架构",
			ymk_jiagou3:"架构",
			ymk_jiagou_info:"一名角色的准备阶段，你可将一张牌置于牌堆顶，令此角色本回合的手牌上限为此牌点数，然后若此牌点数不大于5，本回合结束阶段，你将手牌补至体力上限。",
			ymk_jicai:"积材",
			ymk_jicai2:"积材",
			ymk_jicai_info:"锁定技，你跳过判定阶段，改为执行一个弃牌阶段；你跳过不以此法执行的弃牌阶段，改为执行一个摸牌阶段。",
			ska_kezhi:"恪志",
			ska_kezhi2:"恪志",
			ska_kezhi_info:"你使用牌结算后，若此牌被响应，你可以将一张牌当作此牌使用并失去1点体力。每回合限一次，你以此法使用牌后，若此牌造成过伤害，你可以回复1点体力并摸两张牌。",
			ska_kezhi2_info:"每回合限一次，你以此法使用牌后，若此牌造成过伤害，你可以回复1点体力并摸两张牌。",
			ska_jiyan:"籍验",
			ska_jiyan_sha:"籍验·杀",
			ska_jiyan_shan:"籍验·闪",
			ska_jiyan_tao:"籍验·桃",
			ska_jiyan_jiu:"籍验·酒",
			ska_jiyan_info:"每局每个选项限一次，你可以视为使用一张：1. 【杀】；2. 【闪】；3. 【桃】；4. 【酒】。然后若你已没有可选选项，你增加1点体力上限并回复1点体力，失去〖籍验〗。",
			ska_lunli:"论理",
			ska_lunli_info:"当你成为一名角色使用牌的目标后，你可以展示一张与此牌点数差等于你的体力值的牌，若如此做，你可以摸一张牌，然后你可以令来源弃置一张牌。",
			ska_shubian:"数变",
			ska_shubian_info:"出牌阶段限一次，你可以弃置任意张点数和等于13的牌，然后指定等量角色，你依次令其回复1点体力或受到你造成的1点伤害。",
			ymk_qiuyi:"求艺",
			ymk_qiuyi_info:"每回合限一次，一名角色使用的基本牌或普通锦囊牌结算完成后，若其体力值或手牌数不小于你，你可以交给此角色一张牌，然后你使用此牌。",
			ymk_xifang:"析方",
			ymk_xifang_info:"每回合限一次，一名角色获得你的牌后，你可以观看其手牌，若：1. 不止一种颜色；2. 不止一种类型。每满足一项，你摸一张牌。",
			ska_mengjin:"盟进",
			ska_mengjin_info:"出牌阶段限一次，你可以交给一名其他角色X张牌，然后其交给你Y张牌（X、Y为各自手牌数的一半且向上取整）。你以此法获得的牌无使用距离和次数限制直到回合结束。",
			ska_juegu:"掘古",
			ska_juegu_sha:"掘古·杀",
			ska_juegu_shan:"掘古·闪",
			ska_juegu_info:"当你需要使用或打出一张【杀】/【闪】时，你可以展示一张牌并将其置于牌堆顶，然后展示牌堆底一张牌，1. 若你置于牌堆顶的牌花色与弃牌堆顶的花色相同，你视为使用或打出一张【杀】/【闪】，否则你不能发动此技能直到回合结束；2. 你可以令一名角色获得展示的牌堆底牌，然后若你置于牌堆顶的牌颜色与此牌相同，你可以对其造成1点伤害。",
			ska_kuiwang:"窥往",
			ska_kuiwang_info:"当你因摸牌而获得牌时，你可以从牌堆底获得等量的牌，然后将等量的牌置于牌堆底。",
			//武将分类
			//sst_sp:"SP",
			sst_ymk:"Yumikohimi",
			sst_ska:"Show-K",
			sst_nnk:"南柯",
		},
		perfectPair:{
			ymk_isabelle:["sst_villager"],
			ymk_yumiko:["sst_mnm","sst_terry"],
			ska_olivia:["sst_mario","ska_bobby","ska_professor_toad"],
			ska_xiaojie:["sst_mario","sst_luigi"],
		},//珠联璧合武将（选填）
	};
	/*
	for(var i in sst.character){
		sst.character[i][4].push(i+".png");
	}
	*/
	/*
	if(lib.device||lib.node){
		for(var i in sst.character){
			sst.character[i][4].push("ext:大乱桌斗/"+i+".png");
		}
	}
	else{
		for(var i in sst.character){
			sst.character[i][4].push("db:extension-大乱桌斗:"+i+".png");
		}
	}//由于以此法加入的武将包武将图片是用源文件的，所以要用此法改变路径
	*/
	/*
	if(lib.config.sst_zhuless){
		for(var i in sst.character){
			if(sst.character[i][4].indexOf("zhu")>-1) sst.character[i][4].splice(sst.character[i][4].indexOf("zhu"),1);
		}
	}
	if(lib.config.sst_smash){
		for(var i in sst.character){
			sst.character[i][1]="sst_smash";
		}
	}
	if(lib.config.sst_hidden){
		for(var i in sst.character){
			if(sst.character[i][4].indexOf("hiddenSkill")<0) sst.character[i][4].push("hiddenSkill");
		}
	}
	if(lib.config.sst_jiamian_disable){
		sst.character["sst_young_link"][2]++;
		if(sst.character["sst_young_link"][3].indexOf("sst_jiamian")>-1) sst.character["sst_young_link"][3].splice(sst.character[i][3].indexOf("sst_jiamian"),1);
	}
	if(lib.config.sst_compare!="4"){
		lib.element.player.canCompare=function(target){
			if(this==target) return false;
			if(this.hasSkillTag("noCompareSource")||target.hasSkillTag("noCompareTarget")) return false;
			return true;
		};
	}
	*/
	return sst_sp;
});