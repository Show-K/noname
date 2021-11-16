"use strict";
game.import("card",function(lib,game,ui,get,ai,_status){
	var sst={
		name:"sst",//卡包命名
		connect:true,//卡包是否可以联机
		card:{
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
		},
		list:[
		],
	};
	return sst;
});