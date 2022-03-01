"use strict";
game.import("card",function(lib,game,ui,get,ai,_status){
	var sst={
		name:"sst_standard",
		connect:true,
		card:{
			sst_aegises:{
				fullskin:true,
				type:"equip",
				subtype:"equip1",
				distance:{attackFrom:-2},
				ai:{
					basic:{
						equipValue:4.5
					}
				},
				skills:["sst_aegises_skill"]
			},
		},
		skill:{
			sst_aegises_skill:{
				//mark:true,
				zhuanhuanji:true,
				equipSkill:true,
				/*
				intro:{
					content:function(storage,player,skill){
						return !player.storage.sst_aegises_skill?"转换技，出牌阶段限一次，你可以与一名角色拼点，赢的一方获得没赢的一方拼点的牌，然后若你没有获得牌，你对一名角色造成1点火焰伤害。":"转换技，出牌阶段限一次，你可以与牌堆顶的一张牌拼点，赢的一方获得没赢的一方拼点的牌，然后若你没有获得牌，你对一名角色造成1点雷电伤害。";
					},
				},
				*/
				enable:"phaseUse",
				usable:1,
				prompt:function(){
					if(_status.event.player.storage.sst_aegises_skill) return "转换技，出牌阶段限一次，你可以与牌堆顶的一张牌拼点，赢的一方获得没赢的一方拼点的牌，然后若你没有获得牌，你对一名角色造成1点雷电伤害。";
					return "转换技，出牌阶段限一次，你可以与一名角色拼点，赢的一方获得没赢的一方拼点的牌，然后若你没有获得牌，你对一名角色造成1点火焰伤害。";
				},
				filter:function(event,player){
					if(!player.storage.sst_aegises_skill){
						return game.hasPlayer(function(current){
							return player.canCompare(current);
						});
					}
					else{
						return player.countCards("h")&&ui.cardPile.childNodes.length;
					}
				},
				filterTarget:function(card,player,target){
					if(!player.storage.sst_aegises_skill){
						return player.canCompare(target);
					}
					else{
						return false;
					}
				},
				selectTarget:function(){
					var player=_status.event.player;
					if(!player.storage.sst_aegises_skill){
						return 1;
					}
					else{
						return 0;
					}
				},
				delay:false,
				content:function(){
					"step 0"
					if(!player.storage.sst_aegises_skill){
						event.sst_aegises_skill=false;
						player.storage.sst_aegises_skill=true;
						player.chooseToCompare(target);
					}
					else{
						event.sst_aegises_skill=true;
						player.storage.sst_aegises_skill=false;
						//与牌堆顶的一张牌拼点
						var next=game.createEvent("chooseToCompare");
						next.player=player;
						next.set("ai",function(card){
							if(typeof card=="string"&&lib.skill[card]){
								var ais=lib.skill[card].check||function(){return 0};
								return ais();
							}
							var player=get.owner(card);
							var getn=function(card){
								if(player.hasSkill("tianbian")&&get.suit(card)=="heart") return 13;
								return get.number(card);
							};
							var event=_status.event.getParent();
							var addi=(get.value(card)>=8&&get.type(card)!="equip")?-10:0;
							if(card.name=="du") addi+=5;
							return getn(card)-get.value(card)/2+addi;
						});
						next.setContent(lib.skill.sst_aegises_skill.contentx);
						//next._args=Array.from(arguments);
					};
					"step 1"
					if(result.winner){
						event.winner=result.winner;
						event.winner.gain(event.winner==player?result.target:result.player,"gain2");
					}
					"step 2"
					if(event.winner!=player){
						var str="炫奕：对一名角色造成1点";
						str+=!event.sst_aegises_skill?"火焰":"雷电";
						str+="伤害";
						player.chooseTarget(str,true).set("ai",function(target){
							return get.damageEffect(target,player,player,!_status.event.sst_aegises_skill?"fire":"thunder");
						}).set("sst_aegises_skill",event.sst_aegises_skill);
					}
					else{
						event.finish();
					}
					"step 3"
					if(result.targets&&result.targets.length){
						player.line(result.targets[0],!event.sst_aegises_skill?"fire":"thunder");
						result.targets[0].damage(player,!event.sst_aegises_skill?"fire":"thunder");
					}
				},
				contentx:function(){
					"step 0"
					if(((!event.fixedResult||!event.fixedResult[player.playerid])&&player.countCards("h")==0)||!ui.cardPile.childNodes.length){
						event.result={cancelled:true,bool:false};
						return;
					}
					game.log(player,"对","#b牌堆顶","发起拼点");
					event.lose_list=[];
					"step 1"
					if(event.fixedResult&&event.fixedResult[player.playerid]){
						event.card1=event.fixedResult[player.playerid];
						event.lose_list.push([player,event.card1]);
					}
					else{
						event.localPlayer=true;
						player.chooseCard("请选择拼点牌",true).set("type","compare").set("glow_result",true).ai=event.ai;
					}
					"step 2"
					if(event.localPlayer){
						if(result.skill&&lib.skill[result.skill]&&lib.skill[result.skill].onCompare){
							result.cards=lib.skill[result.skill].onCompare(player);
							player.logSkill(result.skill);
						}
						else event.lose_list.push([player,result.cards[0]]);
						event.card1=result.cards[0];
					}
					"step 3"
					var card=get.cards()[0];
					//event.lose_list.push([player,card]);
					event.card2=card;
					"step 4"
					if(event.lose_list.length){
						game.loseAsync({
							lose_list:event.lose_list,
						}).setContent("chooseToCompareLose");
					}
					if(event.card2) game.cardsGotoOrdering(event.card2);
					"step 5"
					game.broadcast(function(){
						ui.arena.classList.add("thrownhighlight");
					});
					ui.arena.classList.add("thrownhighlight");
					game.addVideo("thrownhighlight1");
					player.$compare(event.card1,player,event.card2);
					game.log(player,"的拼点牌为",event.card1);
					game.log("#b牌堆顶","的拼点牌为",event.card2);
					event.num1=event.card1.number;
					event.num2=event.card2.number;
					event.trigger("compare");
					game.delay(0,1500);
					"step 6"
					event.result={
						player:event.card1,
						target:event.card2,
						num1:event.num1,
						num2:event.num2
					};
					var str;
					if(event.num1>event.num2){
						event.result.bool=true;
						event.result.winner=player;
						str=get.translation(player)+"拼点成功";
						player.popup("胜");
					}
					else{
						event.result.bool=false;
						str=get.translation(player)+"拼点失败";
						if(event.num1==event.num2){
							event.result.tie=true;
							player.popup("平");
						}
						else{
							event.result.winner=null;
							player.popup("负");
						}
					}
					game.broadcastAll(function(str){
						var dialog=ui.create.dialog(str);
						dialog.classList.add("center");
						setTimeout(function(){
							dialog.close();
						},1000);
					},str);
					game.delay(2);
					"step 7"
					game.broadcastAll(function(){
						ui.arena.classList.remove("thrownhighlight");
					});
					game.addVideo("thrownhighlight2");
					if(event.clear!==false){
						game.broadcastAll(ui.clear);
					}
					if(typeof event.preserve=="function"){
						event.preserve=event.preserve(event.result);
					}
					else if(event.preserve=="win"){
						event.preserve=event.result.bool;
					}
					else if(event.preserve=="lose"){
						event.preserve=!event.result.bool;
					}
				},
				ai:{
					order:5,
					expose:0.2,
					damage:true,
					result:{
						player:function(player,target){
							if(!player.storage.sst_aegises_skill) return -get.attitude(player,target)/2;
							return 1;
						}
					}
				}
			}
		},
		translate:{
			//Tag
			sst_64_tag:"64",
			sst_melee_tag:"Melee",
			sst_brawl_tag:"Brawl",
			sst_4_tag:"For WiiU/3DS",
			sst_ultimate_tag:"Ultimate",
			sst_spirits_tag:"命魂",
			sst_players_tag:"玩家",
			sst_sp_tag:"SP",
			sst_light_tag:"光",
			sst_reality_tag:"现",
			sst_smash_tag:"斗",
			//Equip
			sst_aegises:"天之圣杯",
			sst_aegises_info:"转换技，出牌阶段限一次，你可以与①一名角色②牌堆顶的一张牌拼点，赢的一方获得没赢的一方拼点的牌，然后若你没有获得牌，你对一名角色造成1点①火焰②雷电伤害。",
			//Skill
			sst_aegises_skill:"炫奕",
			sst_aegises_skill_info:"转换技，出牌阶段限一次，你可以与①一名角色②牌堆顶的一张牌拼点，赢的一方获得没赢的一方拼点的牌，然后若你没有获得牌，你对一名角色造成1点①火焰②雷电伤害。"
		},
		list:[
		]
	};
	return sst;
});