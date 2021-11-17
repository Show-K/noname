"use strict";
game.import("card",function(lib,game,ui,get,ai,_status){
	var sst={
		name:"sst",//卡包命名
		connect:true,//卡包是否可以联机
		card:{
			sst_aegises:{
				fullskin:true,
				type:"equip",
				subtype:"equip1",
				distance:{attackFrom:-2},
				ai:{
					basic:{
						equipValue:4.5,
					}
				},
				skills:["sst_xuanyi"],
			},
		},
		skill:{
		},
		translate:{
			//标签
			sst_64_tag:"64",
			sst_melee_tag:"Melee",
			sst_brawl_tag:"Brawl",
			sst_4_tag:"For WiiU/3DS",
			sst_ultimate_tag:"Ultimate",
			sst_spirits_tag:"命魂",
			sst_players_tag:"玩家",
			sst_sp_tag:"SP",
			//武器
			sst_aegises:"天之圣杯",
			sst_aegises_info:"转换技，出牌阶段限一次，你可以与①一名角色②牌堆顶的一张牌拼点，赢的一方获得没赢的一方拼点的牌，然后若你没有获得牌，你对一名角色造成1点①火焰②雷电伤害。",
		},
		list:[
		],
	};
	return sst;
});