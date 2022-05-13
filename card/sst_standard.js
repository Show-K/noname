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
				onEquip:function(){
					player.markSkill("sst_aegises_skill");
				},
				onLose:function(){
					player.unmarkSkill("sst_aegises_skill");
				},
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
				init:function(player,skill){
					if(typeof player.storage[skill]!="boolean") player.storage[skill]=false;
				},
				intro:{
					content:function(storage,player){
						return storage?"转换技，出牌阶段限一次，你可以与牌堆顶的一张牌拼点，赢的一方获得没赢的一方拼点的牌，然后若你没有获得牌，你对一名角色造成1点雷电伤害。":"转换技，出牌阶段限一次，你可以与一名角色拼点，赢的一方获得没赢的一方拼点的牌，然后若你没有获得牌，你对一名角色造成1点火焰伤害。";
					}
				},
				equipSkill:true,
				zhuanhuanji:true,
				inherit:"sst_xuanyi",
				filter:function(event,player){
					if(!player.storage.sst_aegises_skill){
						return game.hasPlayer(function(current){
							return player.canCompare(current);
						});
					}
					else{
						return player.canComparePlayer();
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
			sst_aegises_append:"<span class=\"text\" style=\"font-family: fzktk\">所以到底算不算大家。</span>",
			//Skill
			sst_aegises_skill:"天之圣杯",
			sst_aegises_skill_info:"转换技，出牌阶段限一次，你可以与①一名角色②牌堆顶的一张牌拼点，赢的一方获得没赢的一方拼点的牌，然后若你没有获得牌，你对一名角色造成1点①火焰②雷电伤害。"
		},
		list:[
		]
	};
	return sst;
});