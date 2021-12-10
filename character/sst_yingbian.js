"use strict";
game.import("character",function(lib,game,ui,get,ai,_status){
	var sst_yingbian={
		name:"sst_yingbian",//武将包命名（必填）
		connect:true,//该武将包是否可以联机（必填）
		characterSort:{
			sst_yingbian:{
				sst_spirits:["sst_claude","sst_geno"],
			},
		},
		character:{
			//武将格式:
			//"武将名字":["性别","势力",体力,[技能],[]],
			//格式内每一样东西都不能缺少，否则无法导入该武将包及其以下内容
			sst_claude:["male","sst_spirit",3,["sst_yunchou","sst_guimou"],[]],
			sst_geno:["male","sst_spirit",3,["sst_xingjiang","sst_fuyuan"],[]],
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
			sst_claude:"1386. 库罗德/Claude/クロード<br>"+
			"系列：Fire Emblem（火焰纹章）<br>"+
			"初登场：Fire Emblem: Three Houses（火焰纹章 风花雪月）<br>"+
			"武将作者：mario not mary、Yumikohimi<br>"+
			"--------------------------------<br>"+
			"雷斯塔诸侯同盟盟主之孙、爵位继承人。喜欢策略，喜欢琢磨战术，为了达到目标可以不择手段。不论玩家选择的是贝雷特还是贝雷丝，他都会以“兄弟”称呼他的老师。<br>"+
			"——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>"+
			"--------------------------------<br>"+
			"芙朵拉内外都要变革，才能得以见到所愿之景……对吧？",
			sst_geno:"0104. Geno/ジーノ<br>"+
			"系列：Mario（马力欧）<br>"+
			"初登场：Super Mario RPG（超级马力欧RPG）<br>"+
			"武将作者：Show-K<br>"+
			"--------------------------------<br>"+
			"他是星之族的一员，本来没有身体，本名也是无法拼读的“♡♪!?”，所以选择附身在一个叫Geno的木偶上行动。他总是自信满满，擅长分析问题，战斗能力也相当出色。他会和马力欧、桃花公主、酷霸王和Mallow一起打败恶人。<br>"+
			"——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>"+
			"--------------------------------<br>"+
			"所以Square什么时候能把超级马力欧RPG交一下！",
		},//武将介绍（选填）
		characterTitle:{
			sst_claude:"连系世界之王",
			sst_geno:"星路战士",
		},//武将标题（用于写称号或注释）（选填）
		skill:{
			//标准技能
			//Claude
			sst_yunchou:{
				frequent:true,
				trigger:{player:"useCardBegin"},
				filter:function(event,player){
					return get.is.yingbian(event.card);
				},
				content:function(){
					if(!_status.cardtag) _status.cardtag={};
					var list=["yingbian_kongchao","yingbian_canqu","yingbian_fujia","yingbian_zhuzhan"];
					var cardtag=["yingbian_kongchao","yingbian_canqu","yingbian_fujia","yingbian_zhuzhan"];
					for(var i=0;i<list.length;i++){
						if(!_status.cardtag[list[i]]) _status.cardtag[list[i]]=[];
						if(!_status.cardtag[list[i]].contains(trigger.card.cardid)){
							_status.cardtag[list[i]].push(trigger.card.cardid);
						}
						else{
							cardtag.remove(list[i]);
						}
					}
					var evt=event.getParent("useCard");
					if(evt&&evt.name=="useCard"&&!evt.sst_yunchou){
						evt.sst_yunchou=true;
						var next=game.createEvent("sst_yunchou_clear");
						event.next.remove(next);
						evt.after.push(next);
						next.player=player;
						next.card=trigger.card;
						next.set("cardtag",cardtag);
						next.setContent(lib.skill.sst_yunchou.contentx);
					}
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
				},
			},
			sst_guimou:{
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
						var choices=["yingbian_damage_tag","yingbian_hit_tag","yingbian_draw_tag","yingbian_gain_tag","yingbian_add_tag","yingbian_all_tag","yingbian_remove_tag"];
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
						_status.cardtag[result.control.slice(0,-4)].push(trigger.card.cardid);
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
				},
				contentx:function(){
					if(!_status.cardtag) _status.cardtag={};
					var list=["yingbian_add","yingbian_remove","yingbian_draw","yingbian_all","yingbian_hit","yingbian_gain","yingbian_damage"];
					for(var i=0;i<list.length;i++){
						if(!_status.cardtag[list[i]]) _status.cardtag[list[i]]=[];
					}
					_status.cardtag[event.cardtag_temp].remove(card.cardid);
					for(var i=0;i<event.cardtag.length;i++){
						_status.cardtag[event.cardtag[i]].push(card.cardid);
					}
				},
			},
			sst_guimou2:{},
			//Geno
			sst_xingjiang:{
				enable:"phaseUse",
				usable:1,
				delay:false,
				content:function(){
					"step 0"
					event.card=get.cards()[0];
					game.cardsGotoOrdering(event.card);
					player.showCards(event.card);
					"step 1"
					player.chooseToRespond("星降：你可以打出一张牌，然后若与"+get.translation(event.card)+"的类型相同，你可以弃置场上一张牌；花色相同，你可以对一名角色造成1点伤害；点数相同，你可以令一名角色翻面。").set("ai",function(card){
						var player=_status.event.player;
						var cardx=_status.event.cardx;
						var num=0;
						if(get.type(card,"trick")==get.type(cardx,"trick")) num++;
						if(get.suit(card)==get.suit(cardx)) num++;
						if(get.number(card)==get.number(cardx)) num++;
						if(num){
							if(get.type(card,"trick")==get.type(cardx,"trick")&&game.hasPlayer(function(current){
								var att=get.attitude(player,current);
								if(att==0) return false;
								if(att<0) return current.countCards("e",function(card){
									return get.value(card,current)>5;
								})>0;
								return current.countCards("ej",function(card){
									return get.position(card)=="j"||get.value(card,current)<=0;
								})>0;
							})) return 7-get.value(card);
							return 6-get.value(card)+num;
						}
						else{
							return 0;
						}
					}).set("position","hes").set("cardx",event.card);
					"step 2"
					if(result.card){
						var card=result.card;
						event.conditions=[false,false,false];
						event.num=0;
						if(get.type(card,"trick")==get.type(event.card,"trick")) event.conditions[0]=true;
						if(get.suit(card)==get.suit(event.card)) event.conditions[1]=true;
						if(get.number(card)==get.number(event.card)) event.conditions[2]=true;
					}
					else{
						event.finish();
					}
					"step 3"
					event.num++;
					if(event.num<=3){
						if(event.conditions[event.num-1]){
							var str="";
							switch(event.num){
								case 1:{
									str="弃置场上一张牌";
									break;
								}
								case 2:{
									str="对一名角色造成1点伤害";
									break;
								}
								case 3:{
									str="令一名角色翻面";
									break;
								}
							}
							player.chooseTarget("星降：你可以"+str,function(card,player,target){
								var num=_status.event.num;
								if(num==1) return target.countDiscardableCards(player,"ej");
								return true;
							}).set("ai",function(target){
								var player=_status.event.player;
								var num=_status.event.num;
								switch(num){
									case 1:{
										var att=get.attitude(player,target);
										if(att>0&&target.countCards("ej",function(card){
											return get.position(card)=="j"||get.value(card,target)<=0;
										})) return 2*att;
										else if(att<0&&target.countCards("e",function(card){
											return get.value(card,target)>5;
										})) return -att;
										return -att;
									}
									case 2:{
										return get.damageEffect(target,player,player);
									}
									case 3:{
										if(target.hasSkillTag("noturn")) return 0;
										if(target.classList.contains("turnedover")) return get.attitude(player,target);
										return -get.attitude(player,target);
									}
								}
								return 0;
							}).set("num",event.num);
						}
					}
					else{
						event.finish();
					}
					"step 4"
					if(result.targets&&result.targets.length){
						var target=result.targets[0];
						player.line(target,"green");
						switch(event.num){
							case 1:{
								player.discardPlayerCard("星降：弃置"+get.translation(target)+"场上的一张牌",target,"ej",true);
								break;
							}
							case 2:{
								target.damage(player);
								break;
							}
							case 3:{
								target.turnOver();
								break;
							}
						}
						result.targets.length=0;
					}
					event.goto(3);
				},
				ai:{
					order:5,
					result:{
						player:1,
					},
					expose:0.2,
				},
			},
			sst_fuyuan:{
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
					event.num_draw=Math.min(7,event.num_draw);
					event.num_discard=0;
					player.getHistory("lose",function(evt){
						event.num_discard+=evt.cards.length;
					});
					event.num_discard=Math.min(7,event.num_discard);
					var str="一名角色的结束阶段，你可以令一名角色";
					if(event.num_draw) str+="摸"+get.cnNumber(event.num_draw)+"张牌";
					if(event.num_draw&&event.num_discard) str+="，然后";
					if(event.num_discard) str+="弃置"+get.cnNumber(event.num_discard)+"张牌";
					str+="。若因此其手牌数与其体力值或体力上限相等，你可以观看牌堆顶一张牌，然后你可以使用此牌（其应变效果直接生效）";
					player.chooseTarget(get.prompt("sst_fuyuan"),str).set("ai",function(target){
						if(_status.event.num_draw<=_status.event.num_discard&&target.countCards("he")-_status.event.num_discard+_status.event.num_draw<=0){
							return 0;
						}
						if(_status.event.num_draw<_status.event.num_discard) return -get.attitude(_status.event.player,target);
						return get.attitude(_status.event.player,target);
					}).set("num_draw",event.num_draw).set("num_discard",event.num_discard);
					"step 1"
					if(result.targets&&result.targets.length){
						event.target=result.targets[0];
						player.logSkill("sst_fuyuan",event.target);
						if(event.num_draw) event.target.draw(event.num_draw);
						if(event.num_discard) event.target.chooseToDiscard("复愿：弃置"+get.cnNumber(event.num_discard)+"张牌",event.num_discard,true,"he");
					}
					else{
						event.finish();
					}
					"step 2"
					if(event.target.countCards("h")==event.target.hp||event.target.countCards("h")==event.target.maxHp){
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
					player.chooseUseTarget(event.card,false).logSkill="sst_fuyuan";
				},
				group:"sst_fuyuan2",
				ai:{
					expose:0.2,
				},
			},
			sst_fuyuan2:{
				trigger:{player:"useCard1"},
				forced:true,
				filter:function(event,player){
					return event.skill=="sst_fuyuan"&&!event.card.yingbian&&get.is.yingbian(event.card);
				},
				content:function(){
					trigger.card.yingbian=true;
					var info=get.info(trigger.card);
					if(info&&info.yingbian) info.yingbian(trigger);
					player.addTempSkill("yingbian_changeTarget");
				},
			},
		},//技能（必填）
		dynamicTranslate:{
		},
		/*
		characterReplace:{
			ska_mario:["sst_mario","sst_dr_mario","ska_mario"],
			ska_bowser:["sst_bowser","ska_bowser"],
			ymk_yumikohimi:["sst_yumikohimi","ymk_yumikohimi"],
			ymk_isabelle:["sst_isabelle","ymk_isabelle"],
		},//武将替换
		*/
		translate: {
			//武将
			sst_claude:"库罗德",
			sst_geno:"基诺",
			//身份技能
			sst_yunchou:"运筹",
			sst_yunchou_info:"若你使用的牌具有应变效果，你可以令此牌允许满足任意一种应变条件。",
			sst_guimou:"鬼谋",
			sst_guimou_backup:"鬼谋",
			sst_guimou3:"鬼谋",
			sst_guimou4:"鬼谋",
			sst_guimou5:"鬼谋",
			sst_guimou_info:"每回合限一次，若你使用的牌具有应变效果，你可以任意指定此牌的应变效果。",
			sst_xingjiang:"星降",
			sst_xingjiang_info:"出牌阶段限一次，你可以亮出牌堆顶一张牌。若如此做，你可以打出一张牌，然后若这两张牌的类型相同，你可以弃置场上一张牌；花色相同，你可以对一名角色造成1点伤害；点数相同，你可以令一名角色翻面。",
			sst_fuyuan:"复愿",
			sst_fuyuan2:"复愿",
			sst_fuyuan_info:"一名角色的结束阶段，你可以令一名角色摸X张牌，然后弃置Y张牌（X/Y为本回合累计获得/失去的牌且至多为7）。若因此其手牌数与其体力值或体力上限相等，你可以观看牌堆顶一张牌，然后你可以使用此牌（其应变效果直接生效）。",
			//武将分类
		},
		perfectPair:{
			sst_claude:["sst_byleth_male","sst_byleth_female"],
			sst_geno:["sst_mario","sst_bowser","sst_peach"],
		},//珠联璧合武将（选填）
	};
	return sst_yingbian;
});