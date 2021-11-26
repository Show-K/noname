"use strict";
game.import("character",function(lib,game,ui,get,ai,_status){
	var sst_yingbian={
		name:"sst_yingbian",//武将包命名（必填）
		connect:true,//该武将包是否可以联机（必填）
		characterSort:{
			sst_yingbian:{
				sst_spirits:["sst_claude"],
			},
		},
		character:{
			//武将格式:
			//"武将名字":["性别","势力",体力,[技能],[]],
			//格式内每一样东西都不能缺少，否则无法导入该武将包及其以下内容
			sst_claude:["male","sst_spirit",3,["sst_yunchou","sst_guimou"],[]],
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
			"武将作者：Yumikohimi<br>"+
			"--------------------------------<br>"+
			"雷斯塔诸侯同盟盟主之孙、爵位继承人。喜欢策略，喜欢琢磨战术，为了达到目标可以不择手段。不论玩家选择的是贝雷特还是贝雷丝，他都会以“兄弟”称呼他的老师。<br>"+
			"——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>"+
			"--------------------------------<br>"+
			"芙朵拉内外都要变革，才能得以见到所愿之景……对吧？",
		},//武将介绍（选填）
		characterTitle:{
			sst_claude:"连系世界之王",
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
			sst_claude:"库罗德",
			//身份技能
			sst_yunchou:"运筹",
			sst_yunchou_info:"若你使用的牌具有应变效果，你可以令此牌允许满足任意一种应变条件。",
			sst_guimou:"鬼谋",
			sst_guimou_backup:"鬼谋",
			sst_guimou3:"鬼谋",
			sst_guimou4:"鬼谋",
			sst_guimou5:"鬼谋",
			sst_guimou_info:"每回合限一次，若你使用的牌具有应变效果，你可以任意指定此牌的应变效果。",
			//武将分类
		},
		perfectPair:{
			sst_claude:["sst_byleth_male","sst_byleth_female"],
		},//珠联璧合武将（选填）
	};
	return sst_yingbian;
});