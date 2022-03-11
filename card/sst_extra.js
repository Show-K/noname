"use strict";
game.import("card",function(lib,game,ui,get,ai,_status){
	var sst_extra={
		name:"sst_extra",
		connect:true,
		card:{
			sst_hylian_shield:{
				fullskin:true,
				type:"equip",
				subtype:"equip2",
				ai:{
					basic:{
						equipValue:7.5
					}
				},
				skills:["sst_hylian_shield_skill"]
			}
		},
		skill:{
			sst_hylian_shield_skill:{
				equipSkill:true,
				enable:["chooseToUse","chooseToRespond"],
				viewAs:{name:"shan",isCard:true},
				filterCard:function(){return false;},
				selectCard:-1,
				viewAsFilter:function(player){
					if(player.hasSkill("sst_hylian_shield_skill_round")) return false;
				},
				precontent:function(){
					player.addTempSkill("sst_hylian_shield_skill_round","roundStart");
				},
				ai:{
					skillTagFilter:function(player,tag,arg){
						if(player.hasSkill("sst_hylian_shield_skill_round")) return false;
					},
					respondShan:true,
					order:function(){
						return get.order({name:"shan"})+0.1;
					}
				}
			},
			sst_hylian_shield_skill_round:{
				mark:true,
				intro:{content:"本轮已发动"},
			}
		},
		translate:{
			//Type
			//Trick
			//Equip
			sst_hylian_shield:"海利亚盾",
			sst_hylian_shield_info:"每轮限一次，你可以视为使用或打出一张闪。",
			//Skill
			sst_hylian_shield_skill:"海利亚盾",
			sst_hylian_shield_skill_round:"海利亚盾",
			sst_hylian_shield_skill_info:"每轮限一次，你可以视为使用或打出一张闪。"
		},
		list:[
			["diamond",10,"sst_hylian_shield",null,["sst_light"]]
		]
	};
	return sst_extra;
});