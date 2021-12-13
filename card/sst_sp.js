"use strict";
game.import("card",function(lib,game,ui,get,ai,_status){
	var sst_sp={
		name:"sst_sp",//卡包命名
		connect:true,//卡包是否可以联机
		card:{
			ska_grab:{
				//fullskin:true,
				type:"basic",
				enable:true,
				usable:1,
				updateUsable:"phaseUse",
				range:{attack:1},
				selectTarget:1,
				yingbian_prompt:function(card){
					var str="";
					if(get.cardtag(card,"yingbian_gain")){
						str+="当你声明使用此牌时，你获得此牌响应的目标牌";
					}
					if(get.cardtag(card,"yingbian_hit")){
						str+="此牌不可被响应";
					}
					if(get.cardtag(card,"yingbian_draw")){
						if(str.length) str+="；";
						str+="当你声明使用此牌时，你摸一张牌";
					}
					if(get.cardtag(card,"yingbian_remove")){
						if(str.length) str+="；";
						str+="当你使用此牌选择目标后，你可为此牌减少一个目标";
					}
					if(!str.length||get.cardtag(card,"yingbian_add")){
						if(str.length) str+="；";
						str+="当你使用此牌选择目标后，你可为此牌增加一个目标";
					}
					return str;
				},
				yingbian:function(event){
					var card=event.card,bool=false;
					if(get.cardtag(event.card,"yingbian_gain")){
						bool=true;
						var cardx=event.respondTo;
						if(cardx&&cardx[1]&&cardx[1].cards&&cardx[1].cards.filterInD("od").length) event.player.gain(cardx[1].cards.filterInD("od"),"gain2","log");
					}
					if(get.cardtag(card,"yingbian_hit")){
						bool=true;
						event.directHit.addArray(game.players);
						game.log(card,"不可被响应");
					}
					if(get.cardtag(event.card,"yingbian_draw")){
						bool=true;
						event.player.draw();
					}
					if(get.cardtag(card,"yingbian_remove")){
						bool=true;
						event.yingbian_removeTarget=true;
					}
					if(!bool||get.cardtag(card,"yingbian_add")){
						event.yingbian_addTarget=true;
					}
				},
				yingbian_tags:["gain","hit","draw","remove","add"],
				filterTarget:function(card,player,target){
					return player!=target;
				},
				content:function(){
					"step 0"
					if(typeof event.shanRequired!="number"||!event.shanRequired||event.shanRequired<0){
						event.shanRequired=1;
					}
					event.shan=[];
					"step 1"
					if(!_status.connectMode&&lib.config.skip_shan&&!target.hasShan()){
						event._result={bool:false};
					}
					else if(event.skipShan){
						event._result={bool:true,result:"shaned"};
					}
					else{
						var next=target.chooseCard("抓：请展示一张【闪】");
						next.set("position","he");
						next.set("filterCard",function(card,player){
							return get.name(card)=="shan"&&!_status.event.shan.contains(card);
						});
						next.set("shan",event.shan);
						if(event.shanRequired>1){
							next.set("prompt2","（共需展示"+event.shanRequired+"张不同的【闪】）");
						}
					}
					"step 2"
					if(!result||!result.bool){
						event.trigger("ska_grabHit");
					}
					else{
						event.shanRequired--;
						target.showCards(result.cards);
						event.shan.push(result.cards[0]);
						if(event.shanRequired>0){
							event.goto(1);
						}
						else{
							event.trigger("ska_grabMiss");
						}
					}
					"step 3"
					if((!result||!result.bool)){
						player.discardPlayerCard("抓：弃置"+get.translation(target)+"一张牌",target,"he",true);
						event.result={bool:true}
						event.trigger("ska_grabDiscard");
					}
					else{
						event.result={bool:false}
						event.trigger("ska_grabNoDiscard");
					}
				},
				ai:{
					yingbian:function(card,player,targets,viewer){
						if(get.attitude(viewer,player)<=0) return 0;
						var base=0,hit=false;
						if(get.cardtag(card,"yingbian_hit")){
							hit=true;
							if(targets.filter(function(target){
								return target.hasShan()&&get.attitude(viewer,target)<0&&target.countCards("he")>0;
							})) base+=5;
						}
						if(get.cardtag(card,"yingbian_add")){
							if(game.hasPlayer(function(current){
								return !targets.contains(current)&&lib.filter.targetEnabled2(card,player,current)&&get.effect(current,card,player,player)>0;
							})) base+=5;
						}
						return base;
					},
					basic:{
						useful:[5,3,1],
						value:[5,3,1]
					},
					order:function(item,player){
						if(player.hasSkillTag("presha",true,null,true)) return 10;
						return 3.05;
					},
					result:{
						target:function(player,target,card,isLink){
							var eff=function(){
								if(!target.countDiscardableCards("he")) return 0;
								return -1.5;
							}();
							if(target.mayHaveShan()&&!player.hasSkillTag("directHit_ai",true,{
								target:target,
								card:card,
							},true)) return eff/1.2;
							return eff;
						}
					},
					tag:{
						loseCard:1,
						discard:1
					}
				}
			},
			ska_shield:{
				type:"basic",
				cardcolor:"black",
				notarget:true,
				nodelay:true,
				global:"ska_shield_skill",
				content:function(){
					event.getParent().delayx=false;
					var evt=event.getParent("damage");
					if(evt&&typeof evt.num=="number"){
						evt.num--;
						if(evt.num>=2) player.turnOver();
					}
				},
				ai:{
					order:3,
					basic:{
						useful:[7,5.1,2],
						value:[7,5.1,2]
					},
					result:{player:1}
				}
			},
			ska_smash:{
				//fullskin:true,
				nature:["thunder","fire","kami","ice"],
				type:"basic",
				enable:true,
				usable:1,
				updateUsable:"phaseUse",
				global:["icesha_skill","ska_smash_skill"],
				range:{attack:1},
				selectTarget:1,
				baseDamage:2,
				cardPrompt:function(card){
					if(card.nature=="stab") return "出牌阶段，对你攻击范围内的一名角色使用。其须使用一张【闪】（若如此做，其可以获得你一张牌），且在此之后需弃置一张手牌（没有则不弃）。否则你对其造成2点伤害。";
					if(lib.linked.contains(card.nature)) return "出牌阶段，对你攻击范围内的一名角色使用。其须使用一张【闪】（若如此做，其可以获得你一张牌），否则你对其造成2点"+get.translation(card.nature)+"属性伤害。";
					return "出牌阶段，对你攻击范围内的一名角色使用。其须使用一张【闪】（若如此做，其可以获得你一张牌），否则你对其造成2点伤害。";
				},
				yingbian_prompt:function(card){
					var str="";
					if(get.cardtag(card,"yingbian_damage")){
						if(str.length) str+="；";
						str+="此牌的伤害值基数+1";
					}
					if(get.cardtag(card,"yingbian_gain")){
						str+="当你声明使用此牌时，你获得此牌响应的目标牌";
					}
					if(get.cardtag(card,"yingbian_hit")){
						str+="此牌不可被响应";
					}
					if(get.cardtag(card,"yingbian_draw")){
						if(str.length) str+="；";
						str+="当你声明使用此牌时，你摸一张牌";
					}
					if(get.cardtag(card,"yingbian_remove")){
						if(str.length) str+="；";
						str+="当你使用此牌选择目标后，你可为此牌减少一个目标";
					}
					if(!str.length||get.cardtag(card,"yingbian_add")){
						if(str.length) str+="；";
						str+="当你使用此牌选择目标后，你可为此牌增加一个目标";
					}
					return str;
				},
				yingbian:function(event){
					var card=event.card,bool=false;
					if(get.cardtag(card,"yingbian_damage")){
						bool=true;
						if(typeof event.baseDamage!="number") event.baseDamage=2;
						event.baseDamage++;
						game.log(event.card,"的伤害值基数+1");
					}
					if(get.cardtag(event.card,"yingbian_gain")){
						bool=true;
						var cardx=event.respondTo;
						if(cardx&&cardx[1]&&cardx[1].cards&&cardx[1].cards.filterInD("od").length) event.player.gain(cardx[1].cards.filterInD("od"),"gain2","log");
					}
					if(get.cardtag(card,"yingbian_hit")){
						bool=true;
						event.directHit.addArray(game.players);
						game.log(card,"不可被响应");
					}
					if(get.cardtag(event.card,"yingbian_draw")){
						bool=true;
						event.player.draw();
					}
					if(get.cardtag(card,"yingbian_remove")){
						bool=true;
						event.yingbian_removeTarget=true;
					}
					if(!bool||get.cardtag(card,"yingbian_add")){
						event.yingbian_addTarget=true;
					}
				},
				yingbian_tags:["damage","gain","hit","draw","remove","add"],
				filterTarget:function(card,player,target){return player!=target},
				content:function(){
					"step 0"
					if(typeof event.shanRequired!="number"||!event.shanRequired||event.shanRequired<0){
						event.shanRequired=1;
					}
					if(typeof event.baseDamage!="number") event.baseDamage=2;
					if(typeof event.extraDamage!="number") event.extraDamage=0;
					"step 1"
					if(event.directHit||event.directHit2||(!_status.connectMode&&lib.config.skip_shan&&!target.hasShan())){
						event._result={bool:false};
					}
					else if(event.skipShan){
						event._result={bool:true,result:"shaned"};
					}
					else{
						var next=target.chooseToUse("请使用一张闪响应猛击");
						next.set("type","respondShan");
						next.set("filterCard",function(card,player){
							if(get.name(card)!="shan") return false;
							return lib.filter.cardEnabled(card,player,"forceEnable");
						});
						if(event.shanRequired>1){
							next.set("prompt2","（共需使用"+event.shanRequired+"张闪）");
						}
						else if(event.card.nature=="stab"){
							next.set("prompt2","（在此之后仍需弃置一张手牌）");
						}
						next.set("ai1",function(card){
							var target=_status.event.player;
							var evt=_status.event.getParent();
							var bool=true;
							if(_status.event.shanRequired>1&&!get.is.object(card)&&target.countCards("h","shan")<_status.event.shanRequired){
								bool=false;
							}
							else if(target.hasSkillTag("useShan")){
								bool=true;
							}
							else if(target.hasSkillTag("noShan")){
								bool=false;
							}
							else if(get.damageEffect(target,evt.player,target,evt.card.nature)>=0) bool=false;
							if(bool){
								return get.order(card);
							}
							return 0;
						}).set("shanRequired",event.shanRequired);
						next.set("respondTo",[player,card]);
						//next.autochoose=lib.filter.autoRespondShan;
					}
					"step 2"
					if(!result||!result.bool||!result.result||result.result!="shaned"){
						event.trigger("ska_smashHit");
					}
					else{
						event.shanRequired--;
						if(event.shanRequired>0){
							event.goto(1);
						}
						else if(event.card.nature=="stab"&&target.countCards("h")>0){
							event.responded=result;
							event.goto(4);
						}
						else{
							event.trigger("ska_smashMiss");
							event.responded=result;
						}
					}
					"step 3"
					if((!result||!result.bool||!result.result||result.result!="shaned")&&!event.unhurt){
						target.damage(get.nature(event.card),event.baseDamage+event.extraDamage);
						event.result={bool:true}
						event.trigger("ska_smashDamage");
					}
					else{
						event.result={bool:false}
						event.trigger("ska_smashUnhirt");
					}
					event.finish();
					"step 4"
					target.chooseToDiscard("刺猛击：请弃置一张牌，否则此【猛击】依然造成伤害").set("ai",function(card){
						var target=_status.event.player;
						var evt=_status.event.getParent();
						var bool=true;
						if(get.damageEffect(target,evt.player,target,evt.card.nature)>=0) bool=false;
						if(bool){
							return 8-get.useful(card);
						}
						return 0;
					});
					"step 5"
					if((!result||!result.bool)&&!event.unhurt){
						target.damage(get.nature(event.card),event.baseDamage+event.extraDamage);
						event.result={bool:true}
						event.trigger("ska_smashDamage");
						event.finish();
					}
					else{
						event.trigger("ska_smashMiss");
					}
					"step 6"
					if((!result||!result.bool)&&!event.unhurt){
						target.damage(get.nature(event.card),event.baseDamage+event.extraDamage);
						event.result={bool:true}
						event.trigger("ska_smashDamage");
						event.finish();
					}
					else{
						event.result={bool:false}
						event.trigger("ska_smashUnhirt");
					}
				},
				ai:{
					yingbian:function(card,player,targets,viewer){
						if(get.attitude(viewer,player)<=0) return 0;
						var base=0,hit=false;
						if(get.cardtag(card,"yingbian_hit")){
							hit=true;
							if(targets.filter(function(target){
								return target.hasShan()&&get.attitude(viewer,target)<0&&get.damageEffect(target,player,viewer,get.nature(card))>0;
							})) base+=5;
						}
						if(get.cardtag(card,"yingbian_add")){
							if(game.hasPlayer(function(current){
								return !targets.contains(current)&&lib.filter.targetEnabled2(card,player,current)&&get.effect(current,card,player,player)>0;
							})) base+=5;
						}
						if(get.cardtag(card,"yingbian_damage")){
							if(targets.filter(function(target){
								return get.attitude(player,target)<0&&(hit||!target.mayHaveShan()||player.hasSkillTag("directHit_ai",true,{
								target:target,
								card:card,
								},true))&&!target.hasSkillTag("filterDamage",null,{
									player:player,
									card:card,
									jiu:true,
								})
							})) base+=5;
						}
						return base;
					},
					canLink:function(player,target,card){
						if(!target.isLinked()&&!player.hasSkill("wutiesuolian_skill")) return false;
						if(target.mayHaveShan()&&!player.hasSkillTag("directHit_ai",true,{
							target:target,
							card:card,
						},true)) return false;
						if(player.hasSkill("jueqing")||player.hasSkill("gangzhi")||target.hasSkill("gangzhi")) return false;
						return true;
					},
					basic:{
						useful:[5,3,1],
						value:[5,3,1]
					},
					order:function(item,player){
						if(player.hasSkillTag("presha",true,null,true)) return 10;
						if(lib.linked.contains(get.nature(item))){
							if(game.hasPlayer(function(current){
								return current!=player&&current.isLinked()&&player.canUse(item,current,null,true)&&get.effect(current,item,player,player)>0&&lib.card.sha.ai.canLink(player,current,item);
							})&&game.countPlayer(function(current){
								return current.isLinked()&&get.damageEffect(current,player,player,get.nature(item))>0;
							})>1) return 3.1;
							return 3;
						}
						return 3.05;
					},
					result:{
						target:function(player,target,card,isLink){
							var eff=function(){
								if(!isLink){
									if(!target.hasSkillTag("filterDamage",null,{
										player:player,
										card:card,
										jiu:true,
									})){
										if(get.attitude(player,target)>0){
											return -7;
										}
										else{
											return -4;
										}
									}
									return -0.5;
								}
								return -1.5;
							}();
							if(!isLink&&target.mayHaveShan()&&!player.hasSkillTag("directHit_ai",true,{
								target:target,
								card:card,
							},true)) return eff/1.2;
							return eff;
						}
					},
					tag:{
						respond:1,
						respondShan:1,
						damage:function(card){
							if(card.nature=="poison") return;
							return 2;
						},
						natureDamage:function(card){
							if(card.nature) return 2;
						},
						fireDamage:function(card,nature){
							if(card.nature=="fire") return 2;
						},
						thunderDamage:function(card,nature){
							if(card.nature=="thunder") return 2;
						},
						poisonDamage:function(card,nature){
							if(card.nature=="poison") return 2;
						}
					}
				}
			}
		},
		skill:{
			/*
			_ska_counter:{
				ruleSkill:true,
				forceLoad:true,
				group:["ska_counter_suit1","ska_counter_suit2","ska_counter_suit3"],
			},
			*/
			_ska_counter_suit1:{
				ruleSkill:true,
				direct:true,
				trigger:{target:"useCardToTarget"},
				filter:function(event,player){
					if(!["sha","ska_smash"].contains(get.name(event.card))) return false;
					if(player.countCards("hs",function(card){
						return get.name(card)=="ska_shield"&&get.suit(card)==get.suit(event.card);
					})) return true;
					if(player.hasSkillTag("respondska_shield",true,"respond",true)) return true;
					return false;
				},
				content:function(){
					"step 0"
					var next=player.chooseToRespond();
					next.set("logSkill",["ska_counter_suit1",trigger.player]);
					next.set("prompt",get.prompt("ska_counter_suit1",trigger.player));
					next.set("prompt2",get.translation("ska_counter_suit1_info"));
					next.set("filterCard",function(card){
						return get.name(card)=="ska_shield"&&get.suit(card)==_status.event.suit;
					});
					next.set("suit",get.suit(trigger.card));
					next.set("ai",function(card){
						var player=_status.event.player;
						var evt=_status.event.getParent("useCard");
						if(evt&&get.effect(player,evt.card,evt.player,player)>=0) return 0;
						return get.order(card);
					});
					"step 1"
					if(result.card){
						var evt=trigger.getParent();
						evt.excluded.add(player);
						var cards=evt.cards.filterInD("o");
						if(cards&&cards.length) player.gain(cards,"gain2");
					}
				}
			},
			_ska_counter_suit2:{
				ruleSkill:true,
				direct:true,
				trigger:{global:"useCard"},
				filter:function(event,player){
					if(get.name(event.card)!="ska_shield") return false;
					var evt=event.getParent("damage");
					if(!evt||evt.source!=player) return false;
					if(player.countCards("hs",function(card){
						return get.name(card)=="ska_grab"&&get.suit(card)==get.suit(event.card);
					})) return true;
					if(player.hasSkillTag("respondska_grab",true,"respond",true)) return true;
					return false;
				},
				content:function(){
					"step 0"
					var next=player.chooseToRespond();
					next.set("logSkill",["ska_counter_suit2",trigger.player]);
					next.set("prompt",get.prompt("ska_counter_suit2",trigger.player));
					next.set("prompt2",get.translation("ska_counter_suit2_info"));
					next.set("filterCard",function(card){
						return get.name(card)=="ska_grab"&&get.suit(card)==_status.event.suit;
					});
					next.set("suit",get.suit(trigger.card));
					next.set("ai",function(card){
						var player=_status.event.player;
						var evt=_status.event.getParent("damage");
						if(evt&&get.damageEffect(evt.player,evt.source,player)<0) return 0;
						return get.order(card);
					});
					"step 1"
					if(result.card){
						trigger.cancel();
						player.gainPlayerCard("花色反制：获得"+get.translation(trigger.player)+"一张牌",trigger.player,"he",true);
					}
				}
			},
			_ska_counter_suit3:{
				ruleSkill:true,
				direct:true,
				trigger:{target:"useCardToTarget"},
				filter:function(event,player){
					if(get.name(event.card)!="ska_grab") return false;
					if(player.countCards("hs",function(card){
						return get.name(card)=="sha"&&get.suit(card)==get.suit(event.card);
					})) return true;
					if(player.countCards("hs","hufu")) return true;
					if(player.countCards("hs","yuchanqian")) return true;
					if(player.hasSkillTag("respondSha",true,"respond",true)) return true;
					return false;
				},
				content:function(){
					"step 0"
					var next=player.chooseToRespond();
					next.set("logSkill",["ska_counter_suit3",trigger.player]);
					next.set("prompt",get.prompt("ska_counter_suit3",trigger.player));
					next.set("prompt2",get.translation("ska_counter_suit3_info"));
					next.set("filterCard",function(card){
						return get.name(card)=="sha"&&get.suit(card)==_status.event.suit;
					});
					next.set("suit",get.suit(trigger.card));
					next.set("ai",function(card){
						var player=_status.event.player;
						var evt=_status.event.getParent("useCard");
						if(evt&&get.effect(player,evt.card,evt.player,player)>=0) return 0;
						return get.order(card);
					});
					"step 1"
					if(result.card){
						trigger.getParent().excluded.add(player);
						trigger.player.damage(player);
					}
				}
			},
			ska_shield_skill:{
				cardSkill:true,
				trigger:{player:"damageBegin3"},
				forced:true,
				popup:false,
				filter:function(event,player){
					return player.hasUsableCard("ska_shield");
				},
				content:function(){
					"step 0"
					player.chooseToUse("即将受到"+(trigger.source?(get.translation(trigger.source)+"造成的"):"")+trigger.num+"点伤害，是否使用【盾】？").set("ai1",function(card){
						return _status.event.bool;
					}).set("bool",-get.damageEffect(trigger.player,trigger.source,player,trigger.nature)).set("filterCard",function(card,player){
						if(get.name(card)!="ska_shield") return false;
						return lib.filter.cardEnabled(card,player,"forceEnable");
					});
				}
			},
			ska_smash_skill:{
				forced:true,
				popup:false,
				trigger:{player:"useCardAfter"},
				filter:function(event,player){
					return event.respondTo&&event.respondTo[0]&&event.respondTo[1]&&get.name(event.respondTo[1])=="ska_smash";
				},
				content:function(){
					var target=trigger.respondTo[0];
					player.gainPlayerCard("猛击：你可以获得"+get.translation(target)+"一张牌",target,"he");
				}
			}
		},
		translate:{
			//技能
			ska_counter_suit1:"花色反制",
			ska_counter_suit1_info:"当你成为一名角色使用【杀】/【猛击】的目标时，你可以打出一张相同花色的【盾】，令此牌对你无效，且获得此牌。",
			ska_counter_suit2:"花色反制",
			ska_counter_suit2_info:"一名角色使用【盾】时，若伤害来源为你，你可以打出一张相同花色的【抓】，取消之，且获得其一张牌。",
			ska_counter_suit3:"花色反制",
			ska_counter_suit3_info:"当你成为一名角色使用【抓】的目标时，你可以打出一张相同花色的【杀】，令此牌对你无效，且对其造成1点伤害。",
			//卡牌
			ska_grab:"抓",
			ska_grab_info:"出牌阶段，对你攻击范围内的一名角色使用。其须展示一张【闪】，否则你弃置其一张牌。",
			ska_shield:"盾",
			ska_shield_info:"当你受到伤害时，你令伤害值-1，然后若伤害值不小于2，你翻面。",
			ska_smash:"猛击",
			ska_smash_info:"出牌阶段，对你攻击范围内的一名角色使用。其须使用一张【闪】（若如此做，其可以获得你一张牌），否则你对其造成2点伤害。"
		},
		list:[
			["diamond",7,"ska_grab"],
			["diamond",6,"ska_grab"],
			["diamond",6,"ska_grab"],
			["diamond",5,"ska_grab"],
			["diamond",5,"ska_grab"],
			["diamond",4,"ska_grab"],
			["diamond",4,"ska_grab"],
			["heart",12,"ska_grab"],
			["heart",11,"ska_grab"],
			["heart",10,"ska_grab"],
			["heart",9,"ska_grab"],
			["heart",8,"ska_grab"],
			["heart",7,"ska_grab"],
			["heart",6,"ska_grab"],
			["heart",6,"ska_grab"],
			["heart",5,"ska_grab"],
			["heart",5,"ska_grab"],
			["heart",4,"ska_grab"],
			["heart",4,"ska_grab"],
			["heart",3,"ska_grab"],
			["heart",3,"ska_grab"],
			["club",4,"ska_grab"],
			["club",4,"ska_grab"],
			["club",3,"ska_grab"],
			["spade",8,"ska_grab"],
			["spade",7,"ska_grab"],
			["spade",6,"ska_grab"],
			["spade",5,"ska_grab"],
			["spade",4,"ska_grab"],
			["spade",1,"ska_grab"],
			["spade",12,"ska_shield"],
			["spade",12,"ska_shield"],
			["spade",1,"ska_shield"],
			["club",12,"ska_shield"],
			["club",12,"ska_shield"],
			["club",11,"ska_shield"],
			["club",10,"ska_shield"],
			["club",9,"ska_shield"],
			["club",8,"ska_shield"],
			["club",7,"ska_shield"],
			["club",6,"ska_shield"],
			["club",5,"ska_shield"],
			["club",4,"ska_shield"],
			["club",3,"ska_shield"],
			["club",3,"ska_shield"],
			["club",5,"ska_smash"],
			["heart",11,"ska_smash"],
			["heart",5,"ska_smash"],
			["diamond",11,"ska_smash"],
			["diamond",5,"ska_smash"]
		]
	};
	return sst_sp;
});