"use strict";
game.import("character",function(lib,game,ui,get,ai,_status){
	var sst_old={
		name:"sst_old",//武将包命名（必填）
		connect:true,//该武将包是否可以联机（必填）
		characterSort:{
			sst_old:{
                old_sst_64:["old_sst_samus"],
                old_sst_melee:[],
                old_sst_brawl:[],
                old_sst_4:[],
                old_sst_ultimate:["old_sst_ken"],
                old_sst_spirits:[],
                old_sst_players:[],
			},
		},
		character:{
			//武将格式:
			//"武将名字":["性别","势力",体力,[技能],[]],
			//格式内每一样东西都不能缺少，否则无法导入该武将包及其以下内容
			old_sst_samus:["female","sst_light",4,["old_sst_juezhan","old_sst_zailu"],[]],
			old_sst_ken:["male","sst_light",4,["old_sst_yanyang","sst_shenglong"],[]],
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
			old_sst_samus:"0264. 萨姆斯/Samus/サムス<br>"+
			"系列：Metroid（密特罗德）<br>"+
			"初登场：Metroid（密特罗德）<br>"+
			"武将作者：mario not mary<br>"+
			"--------------------------------<br>"+
			"萨姆斯·亚兰是游戏历史上第一个女主角，以只身一人在外星球的作战闻名。她的能量装甲是高等文明“鸟人族”的成果，给了她强大的火力、防护力和升级的可能性。在大乱斗中，虽然她是道具人，但是她的体术也不差。她的蓄力射击威力惊人。<br>"+
			"——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>"+
			"--------------------------------<br>"+
			"“萨姆斯，很不幸的消息……”",
			old_sst_ken:"0978. 肯/Ken/ケン<br>"+
			"系列：Street Fighter（街头霸王）<br>"+
			"初登场：Street Fighter（街头霸王）<br>"+
			"武将作者：mario not mary<br>"+
			"--------------------------------<br>"+
			"肯是隆的头号挚友兼劲敌，两人师出同门，与风餐露宿四处苦行的隆不同，肯有着自己的家族与财大气粗的产业，据说现在空手道网课也办的红红火火。他在年轻时因为急躁吃过不少败仗，但现在的他已经有了自己的家庭，即便如此，在顾家的闲暇也一定要挤出时间与挚友对战几局，才是男人的快乐。<br>"+
			"——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>"+
			"--------------------------------<br>"+
			"我准备好了，来吧。",
		},//武将介绍（选填）
		characterTitle:{
			old_sst_samus:"银河战士",
			old_sst_ken:"红莲格斗王",
		},//武将标题（用于写称号或注释）（选填）
		skill:{
			//标准技能
			//Samus
			old_sst_juezhan:{
				mod:{
					cardUsable:function (card,player,num){
						if(card.name=="sha") return num+player.getDamagedHp();
					},
					attackFrom:function (from,to,distance){
						return distance-from.getDamagedHp();
					},
				},
			},
			old_sst_zailu:{
				trigger:{
					global:"dieAfter",
				},
				filter:function (event,player){
					return true;
				},
				frequent:true,
				content:function (){
					"step 0"
					player.draw();
					"step 1"
					if(!player.storage.old_sst_zailu2) player.storage.old_sst_zailu2=0;
					if(!player.storage.old_sst_zailu3) player.storage.old_sst_zailu3=0;
					/*
					if(game.players.length<=player.storage.old_sst_zailu3+1){
						game.log(player,"选择了","摸牌阶段摸牌数+1");
						player.popup("摸牌+1");
						player.storage.old_sst_zailu2++;
						event.finish();
					}
					*/
					player.chooseControl("摸牌阶段摸牌数+1","使用基本牌或普通锦囊牌可以额外指定一个目标").set("ai",function(){
						//return ["摸牌阶段摸牌数+1","使用牌可以额外指定一个目标"].randomGet();
						var players=game.filterPlayer(function(current){
							return get.attitude(player,current)<0;
						});
						if(players&&players.length>player.storage.old_sst_zailu3+1){
							return "使用基本牌或普通锦囊牌可以额外指定一个目标";
						}
						else{
							return "摸牌阶段摸牌数+1";
						}
					});
					"step 2"
					if(result.control=="使用基本牌或普通锦囊牌可以额外指定一个目标"){
						game.log(player,"选择了","#y使用基本牌或普通锦囊牌可以额外指定一个目标");
						player.popup("额外目标");
						player.storage.old_sst_zailu3++;
					}
					else{
						game.log(player,"选择了","#y摸牌阶段摸牌数+1");
						player.popup("摸牌+1");
						player.storage.old_sst_zailu2++;
					}
				},
				group:["old_sst_zailu2","old_sst_zailu3"],
			},
			old_sst_zailu2:{
				trigger:{
					player:"phaseDrawBegin2",
				},
				locked:false,
				forced:true,
				filter:function (event,player){
					return player.storage.old_sst_zailu2&&!event.numFixed;
				},
				content:function (){
					trigger.num+=player.storage.old_sst_zailu2;
				},
				ai:{
					threaten:function (player,target){
						if(!player.storage.old_sst_zailu2) return 1;
						return 1+player.storage.old_sst_zailu2*0.2;
					},
				},
			},
			old_sst_zailu3:{
				trigger:{
					player:"useCard2",
				},
				filter:function (event,player){
					if(!player.storage.old_sst_zailu3) return false;
					if(get.type(event.card)!="basic"&&get.type(event.card)!="trick") return false;
					return game.hasPlayer(function(current){
						//return !event.targets.contains(current)&&player.canUse(event.card,current);
						return !event.targets.contains(current)&&lib.filter.targetEnabled2(event.card,player,current);
					});
				},
				direct:true,
				content:function (){
					"step 0"
					player.chooseTarget(get.prompt("old_sst_zailu"),"为"+get.translation(trigger.card)+"增加目标",[1,player.storage.old_sst_zailu3],function(card,player,target){
						return !_status.event.sourcex.contains(target)&&lib.filter.targetEnabled2(_status.event.card,player,target);
					}).set("sourcex",trigger.targets).set("card",trigger.card).set("ai",function(target){
						var player=_status.event.player;
						return get.effect(target,_status.event.card,player,player);
					});
					"step 1"
					if(result.bool){
						if(!event.isMine()&&!_status.connectMode) game.delayx();
						event.targets=result.targets;
					}
					else{
						event.finish();
					}
					"step 2"
					player.logSkill("old_sst_zailu",event.targets);
					trigger.targets.addArray(event.targets);
				},
				ai:{
					threaten:function (player,target){
						if(!player.storage.old_sst_zailu3) return 1;
						return 1+player.storage.old_sst_zailu3*0.2;
					},
				},
			},
			//Ken
			old_sst_yanyang:{
				enable:"chooseToUse",
				filterCard:function(){return true},
				selectCard:[1,2],
				position:"he",
				viewAs:{name:"huogong",nature:"fire"},
				viewAsFilter:function(player){
					if(!player.countCards("he")) return false;
				},
				check:function(card){
					var player=_status.currentPhase;
					if(player.countCards("he")>player.hp){
						return 6-get.value(card);
					}
					return 3-get.value(card);
				},
				group:["old_sst_yanyang2"],
			},
			old_sst_yanyang2:{
				trigger:{player:"useCard1"},
				filter:function(event,player){
					return event.skill=="old_sst_yanyang";
				},
				silent:true,
				content:function(){
					if(typeof trigger.baseDamage!="number") trigger.baseDamage=1;
					trigger.baseDamage+=trigger.cards.length-1;
				},
				ai:{
					damageBonus:true,
				},
			},
		},//技能（必填）
		dynamicTranslate:{
		},
		translate: {
			//武将
			old_sst_samus:"旧萨姆斯",
			old_sst_ken:"旧肯",
			//身份技能
			old_sst_juezhan:"绝战",
			old_sst_juezhan_info:"锁定技，你于出牌阶段可以额外使用X张【杀】，你的攻击距离+X。（X为你已损失的体力值）",
			old_sst_zailu:"载录",
			old_sst_zailu2:"载录",
			old_sst_zailu3:"载录",
			old_sst_zailu_info:"一名角色死亡后，你可以摸一张牌，然后选择一项：1. 令你本局游戏中摸牌阶段摸牌数+1；2. 使用基本牌或普通锦囊牌可以额外指定一个目标。",
			old_sst_yanyang:"焰扬",
			old_sst_yanyang2:"焰扬",
			old_sst_yanyang_info:"你可以将至多两张牌当作【火攻】使用；你以此法使用的【火攻】造成伤害时，其基础伤害为其对应实体牌数。",
			//武将分类
			old_sst_64:"64",
			old_sst_melee:"Melee",
			old_sst_brawl:"Brawl",
			old_sst_4:"For WiiU/3DS",
			old_sst_ultimate:"Ultimate",
			old_sst_spirits:"命魂",
			old_sst_players:"玩家",
		},
		perfectPair:{
            old_sst_ken:["sst_ryu"],
		},//珠联璧合武将（选填）
	};
	return sst_old;
});