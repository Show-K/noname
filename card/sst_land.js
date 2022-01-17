"use strict";
game.import("card",function(lib,game,ui,get,ai,_status){
	var sst_land={
		name:"sst_land",
		connect:true,
		card:{
			ska_battlefield:{
				global:["sst_system_card1","sst_system_card2","sst_system_card3"],
				type:"land",
				fullborder:"simple",
				system_card:true,
				enable:function(card,player){
					return !player.hasSkill("land_used");
				},
				notarget:true,
				content:function(){
					"step 0"
					game.changeLand("ska_battlefield",player);
					"step 1"
					var players=game.filterPlayer().sortBySeat();
					game.asyncDraw(players);
				},
				ai:{
					value:5,
					useful:3,
					order:4,
					result:{
						player:1
					}
				}
			},
			ska_small_battlefield:{
				type:"land",
				fullborder:"simple",
				system_card:true,
				enable:function(card,player){
					return !player.hasSkill("land_used");
				},
				notarget:true,
				content:function(){
					"step 0"
					game.changeLand("ska_small_battlefield",player);
					"step 1"
					var players=game.filterPlayer().sortBySeat();
					for(var i=0;i<players.length;i++){
						players[i].draw("nodelay");
						players[i].chooseToDiscard("小战场：弃置一张牌","he",true);
					}
				},
				ai:{
					value:5,
					useful:3,
					order:4,
					result:{
						player:1
					}
				}
			},
			ska_big_battlefield:{
				type:"land",
				fullborder:"simple",
				system_card:true,
				enable:function(card,player){
					return !player.hasSkill("land_used");
				},
				notarget:true,
				content:function(){
					"step 0"
					game.changeLand("ska_big_battlefield",player);
					"step 1"
					var players=game.filterPlayer().sortBySeat();
					game.asyncDraw(players,2);
				},
				ai:{
					value:5,
					useful:3,
					order:4,
					result:{
						player:1
					}
				}
			},
			ska_final_destination:{
				global:["sst_system_card1","sst_system_card2","sst_system_card3"],
				type:"land",
				fullborder:"simple",
				system_card:true,
				enable:function(card,player){
					return !player.hasSkill("land_used");
				},
				notarget:true,
				content:function(){
					"step 0"
					game.changeLand("ska_final_destination",player);
					"step 1"
					var players=game.filterPlayer().sortBySeat();
					for(var i=0;i<players.length;i++){
						players[i].drawTo(4,"nodelay");
						if(players[i].hp<3) players[i].recover(3-players[i].hp);
					}
				},
				ai:{
					value:5,
					useful:3,
					order:4,
					result:{
						player:1
					}
				}
			},
			ska_new_donk_city_hall:{
				type:"land",
				fullborder:"simple",
				enable:function(card,player){
					return !player.hasSkill("land_used");
				},
				notarget:true,
				content:function(){
					"step 0"
					game.changeLand("ska_new_donk_city_hall",player);
					"step 1"
					player.draw(2);
					"step 2"
					var evt=event.getParent("phaseUse");
					if(evt){
						var next=player.phaseUse();
						event.next.remove(next);
						evt.next.push(next);
					}
				},
				ai:{
					value:5,
					useful:3,
					order:4,
					result:{
						player:1
					}
				}
			},
			ska_great_plateau_tower:{
				type:"land",
				fullborder:"simple",
				enable:function(card,player){
					return !player.hasSkill("land_used");
				},
				notarget:true,
				content:function(){
					"step 0"
					game.changeLand("ska_great_plateau_tower",player);
					"step 1"
					if(player.hp<player.maxHp) player.recover(player.maxHp-player.hp);
				},
				ai:{
					value:5,
					useful:3,
					order:4,
					result:{
						player:1
					}
				}
			},
			ska_moray_towers:{
				type:"land",
				fullborder:"simple",
				enable:function(card,player){
					return !player.hasSkill("land_used");
				},
				notarget:true,
				content:function(){
					"step 0"
					game.changeLand("ska_moray_towers",player);
					"step 1"
					var num=0;
					game.countPlayer(function(current){
						if(current.countCards("h")>num) num=current.countCards("h");
					});
					var draw=Math.min(num-player.countCards("h"),5);
					if(draw) player.draw(draw);
				},
				ai:{
					value:5,
					useful:3,
					order:4,
					result:{
						player:1
					}
				}
			},
			ska_garreg_mach_monastery:{
				type:"land",
				fullborder:"simple",
				enable:function(card,player){
					return !player.hasSkill("land_used");
				},
				notarget:true,
				content:function(){
					"step 0"
					game.changeLand("ska_garreg_mach_monastery",player);
					"step 1"
					player.chooseCard("加尔古·玛库大修道院：你可以重铸任意张牌","he",[1,Infinity]).set("ai",function(card){
						return 5-get.value(card);
					});
					"step 2"
					if(result.cards&&result.cards.length) {
						var cards=result.cards;
						player.$throw(cards,1000);
						player.lose(cards,ui.discardPile,"visible").set("type","_chongzhu");
						game.log(player,"将",cards,"置入了弃牌堆");
						player.draw(cards.length);
					}
				},
				ai:{
					value:5,
					useful:3,
					order:4,
					result:{
						player:1
					}
				}
			},
			ska_cloud_sea_of_alrest:{
				type:"land",
				fullborder:"simple",
				enable:function(card,player){
					return !player.hasSkill("land_used");
				},
				notarget:true,
				content:function(){
					"step 0"
					game.changeLand("ska_cloud_sea_of_alrest",player);
					"step 1"
					var card=null;
					for(var i=ui.discardPile.childNodes.length-1;i>=0;i--){
						if(get.subtype(ui.discardPile.childNodes[i])=="equip1"){
							card==ui.discardPile.childNodes[i];
							break;
						}
					}
					if(card){
						player.gain(card,"gain2");
					}
					else{
						player.chat("无牌可得了吗");
						game.log("但是弃牌堆里面已经没有武器牌了！");
					}
				},
				ai:{
					value:5,
					useful:3,
					order:4,
					result:{
						player:1
					}
				}
			},
			ska_spring_stadium:{
				type:"land",
				fullborder:"simple",
				enable:function(card,player){
					return !player.hasSkill("land_used");
				},
				notarget:true,
				content:function(){
					"step 0"
					game.changeLand("ska_spring_stadium",player);
					"step 1"
					player.chooseUseTarget("弹簧竞技场：你可以视为对一名角色使用【杀】",{name:"sha",isCard:true},false,"nodistance");
				},
				ai:{
					value:5,
					useful:3,
					order:4,
					result:{
						player:1
					}
				}
			}
		},
		skill:{
			//后台技能
			sst_system_card1:{
				trigger:{
					player:"loseEnd",
					global:"cardsDiscardEnd"
				},
				filter:function(event,player){
					var evt=event.getParent().relatedEvent;
					if(evt&&evt.name=="useCard") return false;
					for(var i=0;i<event.cards.length;i++){
						if(["ska_battlefield","ska_final_destination"].contains(event.cards[i].name)&&get.position(event.cards[i],true)=="d"){
							return true;
						}
					}
					return false;
				},
				forced:true,
				popup:false,
				content:function(){
					var cards=[];
					for(var i=0;i<trigger.cards.length;i++){
						if(["ska_battlefield","ska_final_destination"].contains(trigger.cards[i].name)&&get.position(trigger.cards[i],true)=="d"){
							cards.push(trigger.cards[i]);
						}
					}
					if(cards.length){
						game.cardsGotoSpecial(cards);
						game.log(cards,"已被移出游戏");
						for(var i=0;i<cards.length;i++){
							_status.system_card=cards[i].name;
							if(player&&player.popup) player.popup(cards[i].name);
							if(cards[i].name=="ska_battlefield"&&!lib.inpile.contains("ska_final_destination")){
								lib.inpile.push("ska_final_destination");
								var card=game.createCard2("ska_final_destination","spade",13);
								//card.set("cardtag",["sst_ultimate"]);
								if(!_status.cardtag) _status.cardtag={};
								if(!_status.cardtag["sst_ultimate"]) _status.cardtag["sst_ultimate"]=[];
								_status.cardtag["sst_ultimate"].push(card.cardid);
								game.log(card,"被置于了牌堆底");
								ui.cardPile.appendChild(card);
								game.updateRoundNumber();
							}
							else if(cards[i].name=="ska_final_destination"&&!lib.inpile.contains("ska_battlefield")){
								lib.inpile.push("ska_battlefield");
								var card=game.createCard2("ska_battlefield","diamond",5);
								//card.set("cardtag",["sst_ultimate"]);
								if(!_status.cardtag) _status.cardtag={};
								if(!_status.cardtag["sst_ultimate"]) _status.cardtag["sst_ultimate"]=[];
								_status.cardtag["sst_ultimate"].push(card.cardid);
								game.log(card,"被置于了牌堆底");
								ui.cardPile.appendChild(card);
								game.updateRoundNumber();
							}
						}
					}
				}
			},
			sst_system_card2:{},
			sst_system_card3:{
				trigger:{player:"phaseAfter"},
				forced:true,
				popup:false,
				filter:function(){
					//game.log(_status.system_card);
					return _status.system_card;
				},
				content:function(){
					"step 0"
					event.system_card=_status.system_card;
					_status.system_card=false;
					game.changeLand(event.system_card);
					switch(event.system_card){
						case "ska_battlefield":{
							event.goto(1);
							break;
						}
						case "ska_final_destination":{
							event.goto(2);
							break;
						}
					}
					"step 1"
					//Battlefield
					var players=game.filterPlayer().sortBySeat();
					game.asyncDraw(players);
					event.finish();
					"step 2"
					//Final Destination
					var players=game.filterPlayer().sortBySeat();
					for(var i=0;i<players.length;i++){
						players[i].drawTo(4,"nodelay");
						if(players[i].hp<3) players[i].recover(3-players[i].hp,"nosource");
					}
					event.finish();
				}
			},
			//地图技能
			ska_battlefield_skill:{
				mod:{
					maxHandcard:function(player,num){
						return num+1;
					}
				},
				trigger:{player:"phaseJieshuBegin"},
				forced:true,
				filter:function(event,player){
					return player.countCards("h")<player.getHandcardLimit();
				},
				content:function(){
					player.draw();
				},
				ai:{
					mapValue:2
				}
			},
			ska_small_battlefield_skill:{
				mod:{
					maxHandcard:function(player,num){
						return num+1;
					}
				}
			},
			ska_big_battlefield_skill:{
				mod:{
					maxHandcard:function(player,num){
						return num+2;
					}
				},
				trigger:{player:"phaseJieshuBegin"},
				forced:true,
				filter:function(event,player){
					return player.countCards("h")<player.getHandcardLimit();
				},
				content:function(){
					player.draw(2);
				},
				ai:{
					mapValue:2
				}
			},
			ska_final_destination_skill:{
				trigger:{player:"phaseUseBegin"},
				forced:true,
				content:function(){
					var players=game.filterPlayer().sortBySeat();
					for(var i=0;i<players.length;i++){
						players[i].addTempSkill("fengyin","phaseUseAfter");
					}
				},
				ai:{
					mapValue:-4
				}
			},
			ska_new_donk_city_hall_skill:{
				trigger:{player:["useCard","respond"]},
				frequent:true,
				filter:function(event,player){
					return get.number(event.card)==7;
				},
				content:function(){
					player.draw(2,"nodelay");
				},
				ai:{
					mapValue:2
				}
			},
			ska_great_plateau_tower_skill:{
				trigger:{player:"phaseZhunbeiBegin"},
				filter:function(event,player){
					return player.countCards("h");
				},
				check:function(event,player){
					if(!player.getDamagedHp()) return false;
					var cards=player.getCards("h");
					var color=get.color(cards[0],player);
					for(var i=1;i<cards.length;i++){
						if(get.color(cards[i],player)!=color) return false;
					}
					return true;
				},
				content:function(){
					"step 0"
					player.showHandcards();
					"step 1"
					var cards=player.getCards("h");
					var color=get.color(cards[0],player);
					for(var i=1;i<cards.length;i++){
						if(get.color(cards[i],player)!=color) return;
					}
					player.recover();
				},
				ai:{
					mapValue:2
				}
			},
			ska_moray_towers_skill:{
				trigger:{source:"damageSource"},
				logSkill:"player",
				filter:function(event,player){
					return player.countCards("h")<event.player.countCards("h");
				},
				check:function(event,player){
					return get.attitude(player,event.player)<0;
				},
				content:function(){
					"step 0"
					player.draw();
					"step 1"
					player.discardPlayerCard("时钟塔：弃置"+get.translation(trigger.player)+"一张手牌",trigger.player,"h",true);
				},
				ai:{
					mapValue:2
				}
			},
			ska_garreg_mach_monastery_skill:{
				enable:"phaseUse",
				usable:1,
				filterTarget:function(card,player,target){
					return player!=target;
				},
				viewAsfilter:function(player){
					if(!player.countCards("he")) return false;
				},
				filterCard:true,
				selectCard:1,
				discard:false,
				lose:false,
				delay:false,
				position:"he",
				content:function(){
					"step 0"
					target.gain(cards,player,"giveAuto");
					"step 1"
					player.draw();
				},
				ai:{
					mapValue:2,
					order:3,
					expose:0.2,
					result:{
						target:function(player,target){
							if(target.hasSkillTag("nogain")) return 0;
							if(player.countCards("h")==player.countCards("h","du")) return -1;
							return 1;
						}
					}
				}
			},
			ska_cloud_sea_of_alrest_skill:{
				trigger:{player:"phaseZhunbeiBegin"},
				filter:function(event,player){
					return ui.discardPile.childNodes.length;
				},
				frequent:true,
				content:function(){
					player.gain(ui.discardPile.childNodes[ui.discardPile.childNodes.length-1],"gain2");
				},
				ai:{
					mapValue:2
				}
			},
			ska_spring_stadium_skill:{
				mod:{
					targetInRange:function(card,player){
						if(card.name=="sha"&&player.countUsed("sha",true)==0) return true;
					}
				},
				trigger:{player:"useCard"},
				filter:function(event,player){
					return get.name(event.card)=="sha"&&player.countUsed("sha",true)==1;
				},
				forced:true,
				content:function(){
					player.draw();
				},
				ai:{
					mapValue:2
				}
			},
		},
		cardType:{
			land:0.6
		},
		translate:{
			//Type
			land:"地图",
			//Land
			ska_battlefield:"战场",
			ska_battlefield_info:"所有角色依次摸一张牌。当【战场】因判定或弃置而置入弃牌堆时，系统将之移出游戏并将【终点】置于牌堆底，然后系统于当前回合结束后视为使用【战场】。地图效果：锁定技，你的手牌上限+1。结束阶段，若你的手牌数小于手牌上限，你摸一张牌。",
			ska_battlefield_skill:"战场",
			ska_battlefield_skill_info:"锁定技，你的手牌上限+1。结束阶段，若你的手牌数小于手牌上限，你摸一张牌。",
			ska_small_battlefield:"小战场",
			ska_small_battlefield_info:"所有角色依次摸一张牌，然后弃置一张牌。地图效果：锁定技，你的手牌上限+1。",
			ska_small_battlefield_skill:"小战场",
			ska_small_battlefield_skill_info:"地图效果：锁定技，你的手牌上限+1。",
			ska_big_battlefield:"大战场",
			ska_big_battlefield_info:"所有角色依次摸两张牌。地图效果：锁定技，你的手牌上限+2。结束阶段，若你的手牌数小于手牌上限，你摸两张牌。",
			ska_big_battlefield_skill:"大战场",
			ska_big_battlefield_skill_info:"锁定技，你的手牌上限+2。结束阶段，若你的手牌数小于手牌上限，你摸两张牌。",
			ska_final_destination:"终点",
			ska_final_destination_info:"所有角色依次将手牌补至四张，然后将体力回复至3点。当【终点】因判定或弃置而置入弃牌堆时，系统将之移出游戏并将【战场】置于牌堆底，然后系统于当前回合结束后视为使用【终点】。地图效果：锁定技，出牌阶段开始时，所有角色非锁定技失效直到出牌阶段结束。",
			ska_final_destination_skill:"终点",
			ska_final_destination_skill_info:"锁定技，出牌阶段开始时，所有角色非锁定技失效直到出牌阶段结束。",
			ska_new_donk_city_hall:"纽敦市政厅",
			ska_new_donk_city_hall_info:"你摸两张牌，然后你的出牌阶段结束后，你执行一个额外的出牌阶段。地图效果：当你使用或打出一张点数为7的牌时，你可以摸两张牌。",
			ska_new_donk_city_hall_skill:"纽敦市政厅",
			ska_new_donk_city_hall_skill_info:"当你使用或打出一张点数为7的牌时，你可以摸两张牌。",
			ska_great_plateau_tower:"初始之塔",
			ska_great_plateau_tower_info:"你将体力回复至体力上限。地图效果：准备阶段，你可以展示自己手牌，若颜色均相同，你回复1点体力。",
			ska_great_plateau_tower_skill:"初始之塔",
			ska_great_plateau_tower_skill_info:"准备阶段，你可以展示自己手牌，若其中颜色均相同，你回复1点体力。",
			ska_moray_towers:"时钟塔",
			ska_moray_towers_info:"你将手牌摸至与全场手牌数最多的人相同（最多摸五张）。地图效果：当你造成伤害后，若你的手牌数小于目标，你可以摸一张牌，然后弃置目标一张手牌。",
			ska_moray_towers_skill:"时钟塔",
			ska_moray_towers_skill_info:"当你造成伤害后，若你的手牌数小于目标，你可以摸一张牌，然后弃置目标一张手牌。",
			ska_garreg_mach_monastery:"加尔古·玛库大修道院",
			ska_garreg_mach_monastery_info:"你可以重铸任意张牌。地图效果：出牌阶段限一次，你可以将一张牌交给一名其他角色，然后你摸一张牌。",
			ska_garreg_mach_monastery_skill:"加尔古·玛库大修道院",
			ska_garreg_mach_monastery_skill_info:"出牌阶段限一次，你可以将一张牌交给一名其他角色，然后你摸一张牌。",
			ska_cloud_sea_of_alrest:"幽界云海",
			ska_cloud_sea_of_alrest_info:"你从弃牌堆获得一张最顶端的武器牌。地图效果：准备阶段，你可以获得弃牌堆顶一张牌。",
			ska_cloud_sea_of_alrest_skill:"幽界云海",
			ska_cloud_sea_of_alrest_skill_info:"准备阶段，你可以获得弃牌堆顶一张牌。",
			ska_spring_stadium:"弹簧竞技场",
			ska_spring_stadium_info:"你可以视为对一名角色使用【杀】。地图效果：锁定技，你于一个回合使用的第一张【杀】无距离限制。当你于一个回合使用第一张【杀】时，你摸一张牌。",
			ska_spring_stadium_skill:"弹簧竞技场",
			ska_spring_stadium_skill_info:"锁定技，你于一个回合使用的第一张【杀】无距离限制。当你于一个回合使用第一张【杀】时，你摸一张牌。"
		},
		list:[
			["diamond",5,"ska_battlefield",null,["sst_ultimate"]],
			["diamond",4,"ska_small_battlefield",null,["sst_ultimate"]],
			["diamond",6,"ska_big_battlefield",null,["sst_ultimate"]],
			//["spade",13,"ska_final_destination",null,["sst_ultimate"]],
			["heart",7,"ska_new_donk_city_hall",null,["sst_ultimate"]],
			["heart",1,"ska_great_plateau_tower",null,["sst_ultimate"]],
			["spade",8,"ska_moray_towers",null,["sst_ultimate"]],
			["spade",3,"ska_garreg_mach_monastery",null,["sst_ultimate"]],
			["club",2,"ska_cloud_sea_of_alrest",null,["sst_ultimate"]],
			["club",11,"ska_spring_stadium",null,["sst_ultimate"]]
		],
		help:{
			"乱斗地图":"<ul><li>地图牌可于出牌阶段使用，每阶段最多使用一张地图牌<li>"+
			"地图牌分为两部分：即时效果以及地图效果，即时效果由使用者在使用时选择；地图效果对所有角色有效<li>"+
			"当使用者死亡或下个回合开始时，当前地图效果消失<li>"+
			"新地图被使用时会覆盖当前地图效果"
		}
	};
	return sst_land;
});