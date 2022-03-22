"use strict";
game.import("card",function(lib,game,ui,get,ai,_status){
	var sst_sp={
		name:"sst_sp",
		connect:true,
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
					if(get.cardtag(card,"yingbian_gain")){
						bool=true;
						var cardx=event.respondTo;
						if(cardx&&cardx[1]&&cardx[1].cards&&cardx[1].cards.filterInD("od").length) event.player.gain(cardx[1].cards.filterInD("od"),"gain2","log");
					}
					if(get.cardtag(card,"yingbian_hit")){
						bool=true;
						event.directHit.addArray(game.players);
						game.log(card,"不可被响应");
					}
					if(get.cardtag(card,"yingbian_draw")){
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
								if(!target.countDiscardableCards(player,"he")) return 0;
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
					if(get.cardtag(card,"yingbian_gain")){
						bool=true;
						var cardx=event.respondTo;
						if(cardx&&cardx[1]&&cardx[1].cards&&cardx[1].cards.filterInD("od").length) event.player.gain(cardx[1].cards.filterInD("od"),"gain2","log");
					}
					if(get.cardtag(card,"yingbian_hit")){
						bool=true;
						event.directHit.addArray(game.players);
						game.log(card,"不可被响应");
					}
					if(get.cardtag(card,"yingbian_draw")){
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
			},
			ska_sauce:{
				fullskin:true,
				type:"star",
				enable:true,
				filterTarget:function(card,player,target){
					return target.isDamaged()&&target.countCards("h",function(card){
						return lib.filter.cardDiscardable(card,target);
					});
				},
				content:function(){
					"step 0"
					target.discard(target.getCards("h",function(card){
						return lib.filter.cardDiscardable(card,target);
					}));
					"step 1"
					target.recover();
				},
				ai:{
					basic:{
						order:1,
						useful:5,
						value:5
					},
					result:{
						target:function(player,target){
							return get.recoverEffect(target,player,target)-2*target.countCards("h",function(card){
								return lib.filter.cardDiscardable(card,target);
							});
						}
					},
					tag:{
						loseCard:1,
						discard:1,
						recover:1
					}
				}
			},
			ska_rise_of_the_block:{
				fullskin:true,
				type:"star",
				enable:true,
				selectTarget:-1,
				toself:true,
				filterTarget:function(card,player,target){
					return target==player;
				},
				modTarget:true,
				content:function(){
					"step 0"
					if(!target.hasSkill("ska_rise_of_the_block_skill")) target.addTempSkill("ska_rise_of_the_block_skill");
					target.chooseControl(["basic","trick","equip"]).set("ai",function(){
						var count=0;
						var value=0;
						var list=["basic","trick","equip"];
						var choice=[];
						var cards=[];
						for(var i=0;i<list.length;i++){
							for(var j=0;j<ui.cardPile.childNodes.length;j++){
								if(lib.suit.contains(list[i])){
									if(get.suit(ui.cardPile.childNodes[j])==list[i]){
										cards.push(ui.cardPile.childNodes[j]);
										value+=get.value(ui.cardPile.childNodes[j]);
									}
								}
								else{
									if(get.type(ui.cardPile.childNodes[j],"trick")==list[i]){
										cards.push(ui.cardPile.childNodes[j]);
										value+=get.value(ui.cardPile.childNodes[j]);
									}
								}
							}
							if(value>count){
								count=value;
								choice=[list[i]];
							}
							else if(value==count){
								choice.push(list[i]);
							}
							cards=[];
							value=0;
						}
						return choice.randomGet();
					}).set("prompt","方块崛起：声明一种类别，然后从牌堆顶亮出体力值张牌并获得此类别牌中一张，若你以此法获得牌，你可以弃置一名角色一个区域内所有牌");
					"step 1"
					event.control=result.control;
					target.popup(event.control);
					game.log(target,"声明了","#y"+get.translation(event.control));
					event.cards=get.cards(Math.max(0,target.hp));
					game.cardsGotoOrdering(event.cards);
					target.showCards(event.cards,get.translation(target.name)+"展示的牌（声明了"+get.translation(event.control)+"）");
					"step 2"
					var goon=false;
					for(var i=0;i<event.cards.length;i++){
						if(get.type(event.cards[i],"trick")==event.control){
							goon=true;
							break;
						}
					}
					if(goon){
						target.chooseCardButton("方块崛起：获得一张"+get.translation(event.control)+"牌",true,event.cards).set("filterButton",function(button){
							return get.type(button.link,"trick")==_status.event.control;
						}).set("ai",function(button){
							return get.value(button.link);
						}).set("control",event.control);
					}
					else{
						event.finish();
					}
					"step 3"
					if(result.links&&result.links.length){
						target.gain(result.links,"gain2");
					}
					else{
						event.finish();
					}
					"step 4"
					target.chooseTarget("方块崛起：你可以弃置一名一个角色区域内所有牌",function(card,player,target){
						return target.countDiscardableCards(player,"hej");
					}).set("ai",function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target);
						if(att<0){
							att=-Math.sqrt(-att);
						}
						else{
							att=Math.sqrt(att);
						}
						return att*lib.card.guohe.ai.result.target(player,target);
					});
					"step 5"
					if(result.targets&&result.targets.length){
						target.line(result.targets,"green");
						target.discardPlayerCard("方块崛起：弃置"+get.translation(result.targets)+"一个区域内的所有牌",result.targets[0],"hej",true).set("filterButton",function(button){
							if(!ui.selected.buttons||!ui.selected.buttons.length) return true;
							return get.position(button.link)==get.position(ui.selected.buttons[0].link);
						}).set("selectButton",function(){
							if(!ui.selected.buttons||!ui.selected.buttons.length) return 1;
							var cards=_status.event.targetx.getDiscardableCards(_status.event.player,get.position(ui.selected.buttons[0].link));
							for(var i=0;i<ui.selected.buttons.length;i++){
								if(cards.contains(ui.selected.buttons[i].link)) cards.remove(ui.selected.buttons[i].link);
							}
							if(!cards.length) return ui.selected.buttons.length;
							return ui.selected.buttons.length+1;
						}).set("complexSelect",true).set("targetx",result.targets[0]);
					}
				},
				ai:{
					basic:{
						order:7.2,
						useful:4.5,
						value:9.2
					},
					result:{
						target:4,
					},
					tag:{
						draw:1
					}
				}
			},
			ska_doing_absolutely_nothing:{
				fullskin:true,
				type:"star",
				enable:true,
				filterTarget:true,
				content:function(){
					target.addTempSkill("ska_doing_absolutely_nothing_skill",{player:"phaseBeginStart"});
				},
				ai:{
					basic:{
						order:10,
						value:4,
						useful:[2,1]
					},
					result:{
						player:function(player,target){
							var att=get.attitude(player,target);
							if(target.hp==1&&att<0) return 0;
							if(game.hasPlayer(function(current){
								return get.attitude(player,current)<att;
							})){
								var num=1;
								if(target==player.next||target==player.previous){
									num+=0.5;
								}
								return num;
							}
							return 0;
						}
					}
				}
			},
			ska_big_merger:{
				type:"star",
				fullskin:true,
				enable:true,
				filterTarget:function(card,player,target){
					return target!=player&&target.countGainableCards(player,"hej")>0;
				},
				content:function(){
					"step 0"
					player.draw(2);
					"step 1"
					event.all_cards=target.getGainableCards(player,"hej");
					player.gain(event.all_cards,target,"giveAuto","bySelf");
					"step 2"
					if(event.all_cards&&event.all_cards.length&&target.isIn()){
						var num=event.all_cards.length,hs=player.getCards("he");
						if(!hs.length){
							event.finish();
						}
						else if(hs.length<num){
							event._result={bool:true,cards:hs};
						}
						else{
							player.chooseCard("he",true,[num,Infinity],"交给"+get.translation(target)+"至少"+get.cnNumber(num)+"张牌").set("ai",get.unuseful);
						}
					}
					else{
						event.finish();
					}
					"step 3"
					if(result.bool) target.gain(result.cards,player,"giveAuto");
				},
				ai:{
					basic:{
						order:7.2,
						useful:7,
						value:9.2
					},
					tag:{
						loseCard:1,
						gain:1
					},
					result:{
						target:function(player,target){
							if(get.attitude(player,target)<=0) return ((target.countCards("he",function(card){
								return get.value(card,target)>0&&card!=target.getEquip("jinhe");
							})>0)?-0.3:0.3)*Math.sqrt(player.countCards("h"));
							return ((target.countCards("ej",function(card){
								if(get.position(card)=="e") return get.value(card,target)<=0;
								var cardj=card.viewAs?{name:card.viewAs}:card;
								return get.effect(target,cardj,target,player)<0;
							})>0)?1.5:-0.3)*Math.sqrt(player.countCards("h"));
						}
					}
				}
			},
			ska_pumpkin:{
				fullskin:true,
				type:"star",
				enable:true,
				filterTarget:function(card,player,target){
					return target!=player&&(target.countDiscardableCards(player,"he")>1||target.countCards("he",function(card){
						return lib.filter.cardDiscardable(card,target);
					}));
				},
				content:function(){
					"step 0"
					var list=[];
					if(target.countDiscardableCards(player,"he")>1) list.push("选项一");
					if(target.countCards("he",function(card){
						return lib.filter.cardDiscardable(card,target);
					})) list.push("选项二");
					if(list.contains("选项一")&&!list.contains("选项二")){
						player.discardPlayerCard("南瓜：弃置"+get.translation(target)+"两张牌",2,true);
						event.goto(2);
					}
					else if(!list.contains("选项一")&&list.contains("选项二")){
						target.chooseToDiscard("南瓜：弃置一张牌","he",true);
						event.goto(3);
					}
					else if(list.contains("选项一")&&list.contains("选项二")){
						target.chooseControl(list).set("ai",function(){
							var player=_status.event.player;
							var source=_status.event.source;
							if(get.attitude(player,source)<0){
								if(source.hp<=1) return "选项一";
								var val=0;
								var cards=player.getDiscardableCards(source,"he");
								for(var i=0;i<cards.length;i++){
									val+=get.value(cards[i]);
								}
								val/=cards.length;
								if(val<=5) return "选项一";
							}
							return "选项二";
						}).set("list",list).set("source",player).set("choiceList",["令"+get.translation(player)+"弃置你两张牌，然后"+get.translation(player)+"失去1点体力","你弃置一张牌且本轮非锁定技失效"]);
					}
					else{
						event.finish();
					}
					"step 1"
					if(result.control=="选项一"){
						player.discardPlayerCard("南瓜：弃置"+get.translation(target)+"两张牌",2,true);
					}
					else if(result.control=="选项二"){
						target.chooseToDiscard("南瓜：弃置一张牌","he",true);
						event.goto(3);
					}
					"step 2"
					player.loseHp();
					event.finish();
					"step 3"
					target.addTempSkill("fengyin","roundStart");
					event.finish();
					
				},
				ai:{
					basic:{
						order:9,
						useful:5,
						value:5
					},
					result:{
						target:function(player,target){
							var att=get.attitude(player,target);
							if(att<0&&player.hp<=1) return 0;
							var nh=target.countCards('h');
							if(att>0){
								if(target.getEquip('baiyin')&&target.isDamaged()&&
									get.recoverEffect(target,player,player)>0){
									if(target.hp==1&&!target.hujia) return 1.6;
								}
								if(target.countCards('e',function(card){
									if(get.position(card)=='e') return get.value(card,target)<0;
								})>0) return 1;
							}
							var es=target.getCards('e');
							var noe=(es.length==0||target.hasSkillTag('noe'));
							var noe2=(es.filter(function(esx){
								return get.value(esx,target)>0;
							}).length==0);
							var noh=(nh==0||target.hasSkillTag('noh'));
							if(noh&&(noe||noe2)) return 0;
							if(att<=0&&!target.countCards('he')) return 1.5;
							return -1.5;
						}
					},
					tag:{
						loseCard:1,
						discard:1
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
					return get.name(event.card)=="shan"&&event.respondTo&&event.respondTo[0]&&event.respondTo[1]&&get.name(event.respondTo[1])=="ska_smash";
				},
				content:function(){
					var target=trigger.respondTo[0];
					player.gainPlayerCard("猛击：你可以获得"+get.translation(target)+"一张牌",target,"he");
				}
			},
			ska_rise_of_the_block_skill:{
				charlotte:true,
				nobracket:true,
				mark:true,
				intro:{
					content:"本回合你受到伤害时，防止此伤害"
				},
				trigger:{player:"damageBegin4"},
				forced:true,
				content:function(){
					trigger.cancel();
				}
			},
			ska_doing_absolutely_nothing_skill:{
				charlotte:true,
				nobracket:true,
				trigger:{player:["damageBegin4","loseHpBefore","recoverBefore"]},
				forced:true,
				content:function(){
					trigger.cancel();
				},
				mod:{
					cardRespondable:function(){
						return false;
					},
					cardEnabled:function(){
						return false;
					},
					cardSavable:function(){
						return false;
					},
					targetEnabled:function(){
						return false;
					}
				},
				mark:true,
				intro:{
					content:"直到回合开始，你不计入距离的计算，不能使用或打出牌，不是牌的合法目标，不能失去或回复体力，不能受到伤害"
				},
				group:"undist",
				ai:{
					nofire:true,
					nothunder:true,
					nodamage:true,
					effect:{
						target:function(card,player,target){
							if(get.tag(card,"recover")||get.tag(card,"damage")) return "zeroplayertarget";
						}
					}
				}
			}
		},
		cardType:{
			food:0.3,
			star:0.5
		},
		translate:{
			//Type
			food:"食物",
			star:"明星",
			//Test
			ska_grab:"抓",
			ska_grab_info:"出牌阶段，对你攻击范围内的一名角色使用。其须展示一张【闪】，否则你弃置其一张牌。",
			ska_shield:"盾",
			ska_shield_info:"当你受到伤害时，你令伤害值-1，然后若伤害值不小于2，你翻面。",
			ska_smash:"猛击",
			ska_smash_info:"出牌阶段，对你攻击范围内的一名角色使用。其须使用一张【闪】（若如此做，其可以获得你一张牌），否则你对其造成2点伤害。",
			//Star
			ska_sauce:"酱料",
			ska_sauce_info:"出牌阶段，对一名已受伤角色使用。目标角色弃置所有手牌，然后回复1点体力。",
			ska_sauce_append:"<span class=\"text\" style=\"font-family: fzktk\">“这里是我的一个……我吃的一些酱料啊。”——超级小桀</span>",
			ska_rise_of_the_block:"方块崛起",
			ska_rise_of_the_block_info:"出牌阶段，对包含你在内的一名角色使用。目标角色声明一种类别，然后从牌堆顶亮出体力值张牌并获得此类别牌中一张，若其以此法获得牌，其可以弃置一名角色区域内所有牌。本回合目标受到伤害时，防止此伤害。",
			ska_rise_of_the_block_append:"<span class=\"text\" style=\"font-family: fzktk\">我们至今不知道为什么Tweek在那次比赛惨败给那个史蒂夫选手。</span>",
			ska_rise_of_the_block_skill:"方块崛起",
			ska_doing_absolutely_nothing:"不动定律",
			ska_doing_absolutely_nothing_info:"出牌阶段，对一名角色使用。直到目标角色回合开始，其不计入距离的计算，不能使用或打出牌，不是牌的合法目标，不能失去或回复体力，不能受到伤害。",
			ska_doing_absolutely_nothing_append:"<span class=\"text\" style=\"font-family: fzktk\">“路易吉这角色就离谱！”——超级小桀</span>",
			ska_doing_absolutely_nothing_skill:"不动定律",
			ska_big_merger:"大收购",
			ska_big_merger_info:"出牌阶段，对一名区域内有可获得牌的其他角色使用。你摸两张牌，获得目标角色区域内所有牌，然后交给其至少等量牌。",
			ska_big_merger_append:"<span class=\"text\" style=\"font-family: fzktk\">Microsoft怎么就这么有钱呢！</span>",
			ska_pumpkin:"南瓜",
			ska_pumpkin_info:"出牌阶段，对一名有牌的其他角色使用。目标角色选择一项：1. 令你弃置其两张牌，然后你失去1点体力；2. 其弃置一张牌，然后本轮非锁定技失效。",
			ska_pumpkin_append:"<span class=\"text\" style=\"font-family: fzktk\">困难模式第一人在背题，多人对战8,000分在背题，我呢？我被任天堂封了14天。</span>",
			//Skill
			ska_counter_suit1:"花色反制",
			ska_counter_suit1_info:"当你成为一名角色使用【杀】/【猛击】的目标时，你可以打出一张相同花色的【盾】，令此牌对你无效，且获得此牌。",
			ska_counter_suit2:"花色反制",
			ska_counter_suit2_info:"一名角色使用【盾】时，若伤害来源为你，你可以打出一张相同花色的【抓】，取消之，且获得其一张牌。",
			ska_counter_suit3:"花色反制",
			ska_counter_suit3_info:"当你成为一名角色使用【抓】的目标时，你可以打出一张相同花色的【杀】，令此牌对你无效，且对其造成1点伤害。"
		},
		list:[
			/*
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
			*/
			["club",8,"ska_sauce",null,["sst_reality"]],
			["diamond",1,"ska_rise_of_the_block",null,["sst_smash"]],
			["spade",2,"ska_doing_absolutely_nothing",null,["sst_light"]],
			["diamond",13,"ska_big_merger",null,["sst_reality"]],
			["spade",4,"ska_pumpkin",null,["sst_light","sst_reality"]]
		]
	};
	return sst_sp;
});