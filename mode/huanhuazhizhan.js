'use strict';
game.import('mode',function(lib,game,ui,get,ai,_status){
	return {
		name:'huanhuazhizhan',
		startBefore:function(){
			for(var i in lib.characterPack.mode_huanhuazhizhan){
				lib.character[i]=lib.characterPack.mode_huanhuazhizhan[i];
				if(!lib.character[i][4]){
					lib.character[i][4]=[];
				}
				if(!lib.translate[i]){
					lib.translate[i]=lib.translate[i.slice(3)];
				}
			}
			for(var i in lib.character){
				if(!lib.character[i][4]){
					lib.character[i][4]=[];
				}
				lib.character[i][4].remove('hiddenSkill');
			}
			if(lib.skill.sanchen) lib.skill.sanchen.derivation='pozhu';
			lib.element.content.gameDraw=function(player){
				var end=player;
				var numx;
				var num=function(player){
					return player._hSeat>5?5:4;
				};
				do{
					if(typeof num=='function'){
						numx=num(player);
					}
					if(player._hSeat>6) player.changeLingli(1);
					player.directgain(get.cards(numx));
					player=player.next;
				}
				while(player!=end);
			};
		},
		onreinit:function(){
			var pack=lib.characterPack.mode_huanhuazhizhan;
			for(var i in pack){
				lib.character[i]=pack[i];
				if(!lib.character[i][4]){
					lib.character[i][4]=[];
				}
				if(!lib.translate[i]){
					lib.translate[i]=lib.translate[i.slice(3)];
				}
			}
			for(var i in lib.character){
				lib.character[i][2]=4;
				lib.character[i][3]=[];
				if(!lib.character[i][4]){
					lib.character[i][4]=[];
				}
				lib.character[i][4].remove('hiddenSkill');
			}
			lib.element.content.gameDraw=function(player){
				var end=player;
				var numx;
				var num=function(player){
					return player._hSeat>5?5:4;
				};
				do{
					if(typeof num=='function'){
						numx=num(player);
					}
					if(player._hSeat>6) player.changeLingli(1);
					player.directgain(get.cards(numx));
					player=player.next;
				}
				while(player!=end);
			};
			for(var i=0;i<game.players.length;i++){
				game.players[i].markSkill('_lingli');
			}
		},
		start:function(){
			"step 0"
			_status.mode=get.config('huanhuazhizhan_mode');
			if(_status.brawl&&_status.brawl.submode){
				_status.mode=_status.brawl.submode;
			}
			"step 1"
			var playback=localStorage.getItem(lib.configprefix+'playback');
			if(playback){
				ui.create.me();
				ui.arena.style.display='none';
				ui.system.style.display='none';
				_status.playback=playback;
				localStorage.removeItem(lib.configprefix+'playback');
				var store=lib.db.transaction(['video'],'readwrite').objectStore('video');
				store.get(parseInt(playback)).onsuccess=function(e){
					if(e.target.result){
						game.playVideoContent(e.target.result.video);
					}
					else{
						alert('播放失败：找不到录像');
						game.reload();
					}
				}
				event.finish();
			}
			else if(!_status.connectMode){
				game.prepareArena();
			}
			"step 2"
			game.identityVideoName='幻化之战';
			var skills=[];
			var banned=[
				'xinfu_guhuo','reguhuo','jixi','duanchang','huashen','xinsheng','rehuashen','rexinsheng',
				'jinqu','nzry_binglve','nzry_huaiju','nzry_yili','nzry_zhenglun','nzry_mingren','nzry_zhenliang','drlt_qingce',
				'new_wuhun','qixing','kuangfeng','dawu','baonu','wumou','ol_wuqian','ol_shenfen','renjie','jilue','nzry_junlve','nzry_dinghuo','drlt_duorui',
				'chuanxin','cunsi',
				'jueqing','huilei','paiyi','fuhun','zhuiyi','olddanshou','yanzhu','juexiang','jiexun','bizhuan','tongbo',
				'xinfu_zhanji','xinfu_jijun','xinfu_fangtong',
				'xinfu_qianchong','pdgyinshi','shuliang',
				'zongkui','guju','bmcanshi','dingpan','xinfu_lingren','new_luoyan','junwei','gxlianhua',
				'qizhou','fenyue','dianhu','linglong','fenxin','mouduan',
				'cuorui','xinmanjuan','xinfu_jianjie','jianjie_faq','new_meibu','xinfu_xingzhao','jici',
				'xianfu','fenyong','xuehen','yingbin','midao','yishe','yinbing','juedi',
				'bushi','xinfu_dianhua','xinfu_falu','xinfu_zhenyi','lskuizhu','pingjian','xjshijian','fentian','zhiri','xindan',
				'xinzhengnan','xinfu_xiaode',
				'komari_xueshang','qiaosi_map',
			];
			var characters=[];
			for(var name in lib.character){
				if(['hhzz_shiona','hhzz_kanade','hhzz_takaramono1','hhzz_takaramono2'].contains(name)) continue;
				if(!lib.character[name]) continue;
				if(_status.connectMode&&!get.charactersOL().contains(name)) continue;
				if(lib.filter.characterDisabled(name)) continue;
				if(name.indexOf('old_')==0) continue;
				var skillsx=lib.character[name][3].slice(0);
				lib.character[name][2]=4;
				lib.character[name][3]=[];
				if(lib.character[name][4]) lib.character[name][4].remove('hiddenSkill');
				characters.push(name);
				var list=skillsx.slice(0);
				for(var j=0;j<skillsx.length;j++){
					var info=get.info(skillsx[j]);
					if(!info){
						skillsx.splice(j,1);
						list.splice(j--,1);
						continue;
					}
					if(typeof info.derivation=='string') list.push(info.derivation);
					else if(Array.isArray(info.derivation)) list.addArray(info.derivation);
				}
				for(var j=0;j<list.length;j++){
					if(skills.contains(list[j])||banned.contains(list[j])) continue;
					var info=get.info(list[j]);
					if(!info||info.zhuSkill||info.juexingji||info.charlotte||info.limited||info.hiddenSkill||info.dutySkill||info.groupSkill||info.equipSkill||(info.ai&&info.ai.combo)) continue;
					skills.push(list[j]);
				}
			}
			_status.characterlist=characters;
			var pack={
				skills:skills,
			};
			game.broadcastAll(function(pack){
				lib.huanhuazhizhan=pack;
			},pack);
			"step 3"
			if(_status.connectMode){
				game.waitForPlayer();
			}
			"step 4"
			if(_status.connectMode){
				if(lib.configOL.number<2){
					lib.configOL.number=2;
				}
				game.randomMapOL();
			}
			else{
				for(var i=0;i<game.players.length;i++){
					game.players[i].getId();
				}
				if(_status.brawl&&_status.brawl.chooseCharacterBefore){
					_status.brawl.chooseCharacterBefore();
				}
				game.chooseCharacter();
			}
			"step 5"
			var list=[
				game.createCard('hhzz_fudichouxin'),
				game.createCard('hhzz_toulianghuanzhu'),
				game.createCard('hhzz_toulianghuanzhu'),
				game.createCard('hhzz_toulianghuanzhu'),
			];
			for(var i=0;i<list.length;i++){
				ui.cardPile.insertBefore(list[i],ui.cardPile.childNodes[get.rand(ui.cardPile.childElementCount)]);
			}
			if(ui.coin){
				_status.coinCoeff=get.coinCoeff([game.me.name]);
			}
			if(game.players.length==2){
				game.showIdentity(true);
				var map={};
				for(var i in lib.playerOL){
					map[i]=lib.playerOL[i].identity;
				}
				game.broadcast(function(map){
					for(var i in map){
						lib.playerOL[i].identity=map[i];
						lib.playerOL[i].setIdentity();
						lib.playerOL[i].ai.shown=1;
					}
				},map);
			}
			else{
				for(var i=0;i<game.players.length;i++){
					game.players[i].ai.shown=0;
				}
			}
			game.syncState();
			event.trigger('gameStart');

			var players=get.players(lib.sort.position);
			var info=[];
			for(var i=0;i<players.length;i++){
				info.push({
					name:players[i].name1,
					name2:players[i].name2,
					identity:players[i].identity
				});
			}
			_status.videoInited=true;
			game.addVideo('init',null,info);
			"step 6"
			game.gameDraw(_status.firstAct2||game.zhu||_status.firstAct||game.me);
			"step 7"
			game.phaseLoop(_status.firstAct2||game.zhu||_status.firstAct||game.me);
		},
		game:{
			getState:function(){
				var state={};
				for(var i in lib.playerOL){
					var player=lib.playerOL[i];
					state[i]={
						identity:player.identity,
						shown:player.ai.shown,
					};
				}
				return state;
			},
			updateState:function(state){
				for(var i in state){
					var player=lib.playerOL[i];
					if(player){
						player.identity=state[i].identity;
						player.ai.shown=state[i].shown;
					}
				}
			},
			getRoomInfo:function(uiintro){
				uiintro.add('<div class="text chat">游戏模式：幻化');
				var last=uiintro.add('<div class="text chat">出牌时限：'+lib.configOL.choose_timeout+'秒');
				if(lib.configOL.banned.length){
					last=uiintro.add('<div class="text chat">禁用武将：'+get.translation(lib.configOL.banned));
				}
				if(lib.configOL.bannedcards.length){
					last=uiintro.add('<div class="text chat">禁用卡牌：'+get.translation(lib.configOL.bannedcards));
				}
				last.style.paddingBottom='8px';
			},
			getVideoName:function(){
				var str=get.translation(game.me.name);
				if(game.me.name2){
					str+='/'+get.translation(game.me.name2);
				}
				var str2=game.identityVideoName;
				var name=[
					str,
					str2,
				];
				return name;
			},
			addRecord:function(bool){
				if(typeof bool=='boolean'){
					var data=lib.config.gameRecord.huanhuazhizhan.data;
					var identity=game.me.identity;
					if(!data[identity]){
						data[identity]=[0,0];
					}
					if(bool){
						data[identity][0]++;
					}
					else{
						data[identity][1]++;
					}
					var list=['zhu','zhong','nei','fan'];
					var str='';
					for(var i=0;i<list.length;i++){
						if(data[list[i]]){
							str+=lib.translate[list[i]+'2']+'：'+data[list[i]][0]+'胜'+' '+data[list[i]][1]+'负<br>';
						}
					}
					lib.config.gameRecord.huanhuazhizhan.str=str;
					game.saveConfig('gameRecord',lib.config.gameRecord);
				}
			},
			showIdentity:function(me){
				for(var i=0;i<game.players.length;i++){
					// if(me===false&&game.players[i]==game.me) continue;
					game.players[i].node.identity.classList.remove('guessing');
					game.players[i].identityShown=true;
					game.players[i].ai.shown=1;
					game.players[i].setIdentity(game.players[i].identity);
					if(game.players[i].special_identity){
						game.players[i].node.identity.firstChild.innerHTML=get.translation(game.players[i].special_identity+'_bg');
					}
					if(game.players[i].identity=='zhu'){
						game.players[i].isZhu=true;
					}
				}
				if(_status.clickingidentity){
					for(var i=0;i<_status.clickingidentity[1].length;i++){
						_status.clickingidentity[1][i].delete();
						_status.clickingidentity[1][i].style.transform='';
					}
					delete _status.clickingidentity;
				}
			},
			checkResult:function(){
				var me=game.me._trueMe||game.me;
				if(_status.brawl&&_status.brawl.checkResult){
					_status.brawl.checkResult();
					return;
				}
				if(!game.zhu){
					if(get.population('fan')==0){
						switch(me.identity){
							case 'fan':game.over(false);break;
							case 'zhong':game.over(true);break;
							default:game.over();break;
						}
					}
					else if(get.population('zhong')==0){
						switch(me.identity){
							case 'fan':game.over(true);break;
							case 'zhong':game.over(false);break;
							default:game.over();break;
						}
					}
					return;
				}
				if(game.zhu.isAlive()&&get.population('fan')+get.population('nei')>0) return;
				if(game.zhong){
					game.zhong.identity='zhong';
				}
				game.showIdentity();
				if(me.identity=='zhu'||me.identity=='zhong'||me.identity=='mingzhong'){
					if(game.zhu.classList.contains('dead')){
						game.over(false);
					}
					else{
						game.over(true);
					}
				}
				else if(me.identity=='nei'){
					if(game.players.length==1&&me.isAlive()){
						game.over(true);
					}
					else{
						game.over(false);
					}
				}
				else{
					if((get.population('fan')+get.population('zhong')>0||get.population('nei')>1)&&
						game.zhu.classList.contains('dead')){
						game.over(true);
					}
					else{
						game.over(false);
					}
				}
			},
			checkOnlineResult:function(player){
				if(_status.winner&&_status.loser){
					if(_status.loser.length==game.players.length) return null;
					if(_status.loser.contains(player)) return false;
					if(_status.winner.contains(player)) return true;
				}
				if(game.zhu.isAlive()){
					return (player.identity=='zhu'||player.identity=='zhong');
				}
				else if(game.players.length==1&&game.players[0].identity=='nei'){
					return player.isAlive();
				}
				else{
					return player.identity=='fan';
				}
			},
			playerx:function(){
				return game.filterPlayer(function(current){
					if(current.name.indexOf('hhzz_')==0) return;
					return true;
				});
			},
			randomMission:function(){
				if(_status._aozhan) return;
				var players=game.playerx();
				for(var i=0;i<players.length;i++){
					var player=players[i];
					var list=players.slice(0).randomSort();
					list.remove(player);
					game.broadcastAll(function(player,_toKill,_toSave){
						player._toKill=_toKill;
						player._toSave=_toSave;
					},player,list[0],list[1]);
				}
				game.broadcastAll(function(){
					if(!ui.huanhuazhizhan){
						ui.huanhuazhizhan=ui.create.div('.touchinfo.left',ui.window);
						if(ui.time3) ui.time3.style.display='none';
					}
					var str='';
					if(game.me._toKill) str+='击杀'+get.translation(game.me._toKill);
					if(game.me._toKill&&game.me._toSave) str+='，';
					if(game.me._toSave) str+='保护'+get.translation(game.me._toSave);
					ui.huanhuazhizhan.innerHTML=str;
				});
			},
			getSkillDialog:function(skills,prompt){
				var dialog=[];
				if(prompt) dialog.push(prompt);
				for(var i=0;i<skills.length;i++){
					dialog.push('<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【'+get.translation(skills[i])+'】</div><div>'+lib.translate[skills[i]+'_info']+'</div></div>');
				}
				dialog.push(' <br> ');
				return dialog;
			},
			chooseCharacter:function(){
				var next=game.createEvent('chooseCharacter',false);
				next.showConfig=true;
				next.setContent(function(){
					'step 0'
					game.zhu=game.players.randomGet();
					var i=1;
					var current=game.zhu;
					while(true){
						current.skillH=[];
						current._hSeat=i;
						current.identity='nei';
						if(!current.node.nameol.innerHTML) current.setNickname(get.cnNumber(i,true)+'号位');
						current=current.next;
						i++;
						if(current==game.zhu) break;
					}
					ui.arena.classList.add('choose-character');
					game.me.chooseButton(['请选择角色形象',[_status.characterlist.randomRemove(5),'character']],true).onfree=true;
					'step 1'
					game.me.init(result.links[0]);
					var list=['xiandeng','shulv','xisheng'];
					game.me.chooseControl(list).dialog=game.getSkillDialog(list,'选择要获得的初始技能');
					'step 2'
					var list=['_lingli','_lingli_round','_lingli_draw','_lingli_save','_hhzz_qiankunbagua','_lingli_damage'];
					for(var i=0;i<list.length;i++){
						game.addGlobalSkill(list[i]);
					}
					game.me.addSkillH(result.control);
					game.countPlayer(function(current){
						if(!current.name){
							current.init(_status.characterlist.randomRemove(1)[0]);
							current.addSkillH(['xiandeng','shulv','xisheng'].randomGet());
						}
						current.storage._lingli=0;
						current.markSkill('_lingli');
					});
					game.showIdentity(true);
					'step 3'
					game.randomMission();
					game.updateRoundNumber();
					'step 4'
					setTimeout(function(){	
						ui.arena.classList.remove('choose-character');
					},500);
				});
			},
			chooseCharacterOL:function(){
				var next=game.createEvent('chooseCharacter',false);
				next.setContent(function(){
					'step 0'
					game.zhu=game.players.randomGet();
					var i=1;
					var current=game.zhu;
					while(true){
						game.broadcastAll(function(current,i){
							current.skillH=[];
							current._hSeat=i;
							current.identity='nei';
							if(!current.node.nameol.innerHTML) current.setNickname(get.cnNumber(i,true)+'号位');
							ui.arena.classList.add('choose-character');
						},current,i);
						current=current.next;
						i++;
						if(current==game.zhu) break;
					}
					var choose=[];
					for(var i=0;i<game.players.length;i++){
						choose.push([game.players[i],['请选择角色形象',[_status.characterlist.randomRemove(5),'character']],true]);
					}
					game.me.chooseButtonOL(choose,function(player,result){
						if(game.online||player==game.me) player.init(result.links[0]);
					}).set('onfree',true);
					'step 1'
					for(var i in result){
						if(result[i]=='ai'){
							result[i]=_status.characterlist.randomRemove(1)[0];
						}
						else{
							result[i]=result[i].links[0];
						}
						if(!lib.playerOL[i].name1){
							lib.playerOL[i].init(result[i]);
						}
					}
					game.broadcast(function(result){
						for(var i in result){
							if(!lib.playerOL[i].name1){
								lib.playerOL[i].init(result[i]);
							}
						}
						setTimeout(function(){
							ui.arena.classList.remove('choose-character');
						},500)
					},result);
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);
					var list=['_lingli','_lingli_round','_lingli_draw','_lingli_save','_hhzz_qiankunbagua','_lingli_damage'];
					for(var i=0;i<list.length;i++){
						game.addGlobalSkill(list[i]);
					}
					game.countPlayer(function(current){
						current.storage._lingli=0;
						current.markSkill('_lingli');
					});
					_status.onreconnect=[function(){
						var i=1;
						var current=game.zhu;
						while(current){
							game.broadcastAll(function(current,skillH,i,_toKill,_toSave){
								if(Array.isArray(skillH)){
									current.skillH=skillH;
								}
								else{
									current.skillH=[];
								}
								current._hSeat=i;
								if(!current.node.nameol.innerHTML) current.setNickname(get.cnNumber(i,true)+'号位');
								current._toKill=_toKill;
								current._toSave=_toSave;
								if(!ui.huanhuazhizhan){
									ui.huanhuazhizhan=ui.create.div('.touchinfo.left',ui.window);
									if(ui.time3) ui.time3.style.display='none';
								}
								var str='';
								if(_status._aozhan){
									str+='死战模式';
								}
								else{
									if(current._toKill) str+='击杀'+get.translation(current._toKill);
									if(current._toKill&&current._toSave) str+='，';
									if(current._toSave) str+='保护'+get.translation(current._toSave);
								}
								ui.huanhuazhizhan.innerHTML=str;
							},current,current.skillH,i,current._toKill,current._toSave);
							current=current.next;
							i++;
							if(current==game.zhu) break;
						}
					}];
					game.showIdentity(true);
					event.num=0;
					'step 2'
					var list=['xiandeng','shulv','xisheng'];
					game.players[event.num].chooseControl(list).set('dialog',game.getSkillDialog(list,'选择要获得的初始技能')).set('ai',()=>list.randomGet());
					'step 3'
					game.players[event.num].addSkillH(result.control);
					event.num++;
					if(event.num<game.players.length){
						event.goto(2);
					}
					'step 4'
					game.randomMission();
					game.updateRoundNumber();
				});
			},
		},
		translate:{
			mode_huanhuazhizhan_character_config:'幻化之战',
			_lingli:'聚灵',
			_lingli_bg:'灵',
			_lingli_draw:'聚灵',
			xiandeng:'先登',
			xiandeng_info:'锁定技，出牌阶段，你使用的第一张【杀】不计入次数且无距离限制。',
			shulv:'熟虑',
			shulv_info:'出牌阶段限一次，若你的手牌数大于体力值，则你可以弃置一张牌并摸一张牌。',
			xisheng:'牺牲',
			xisheng_info:'每名其他角色的回合限一次，你可以将两张牌当做【桃】使用。',
			hhzz_huilei:'挥泪',
			hhzz_youlian:'犹怜',
			hhzz_zhencang:'珍藏',
			hhzz_huizhen:'汇珍',
			hhzz_jubao:'聚宝',
			hhzz_huilei_info:'锁定技，杀死你的角色弃置所有的牌。',
			hhzz_youlian_info:'锁定技，杀死你的角色弃置所有牌并随机失去一个技能。',
			hhzz_zhencang_info:'锁定技，杀死你的角色摸一张牌并随机获得一个技能(已满则先随机移除一个)。',
			hhzz_huizhen_info:'锁定技，杀死你的角色摸三张牌并随机获得一个技能(已满则先随机移除一个)。',
			hhzz_jubao_info:'锁定技，当你受到伤害的点数确定时，伤害来源随机获得你区域内的X张牌（X为伤害点数）。',
			hhzz_shiona:'汐奈',
			hhzz_kanade:'立华奏',
			hhzz_takaramono1:'坚实宝箱',
			hhzz_takaramono2:'普通宝箱',
			hhzz_toulianghuanzhu:'偷梁换柱',
			hhzz_fudichouxin:'釜底抽薪',
			hhzz_toulianghuanzhu_info:'出牌阶段，对一名角色使用，随机更换其一个技能。可重铸。',
			hhzz_fudichouxin_info:'出牌阶段，对一名角色使用，随机弃置其一个技能。',
			nei:' ',
			nei2:' ',
			刷新_info:'消耗1点灵力值，刷新上述技能',
		},
		element:{
			content:{
				gameDraw:function(player){
					var end=player;
					var numx;
					var num=function(player){
						return player._hSeat>5?5:4;
					};
					do{
						if(typeof num=='function'){
							numx=num(player);
						}
						if(player._hSeat>6) player.changeLingli(1);
						player.directgain(get.cards(numx));
						player=player.next;
					}
					while(player!=end);
				},
			},
			player:{
				addSkillH:function(skill){
					game.broadcastAll(function(player,skillH,skill){
						if(Array.isArray(skillH)){
							player.skillH=skillH;
						}
						else{
							player.skillH=[];
						}
						player.skillH.add(skill);
					},this,this.skillH,skill);
					this.addSkillLog.apply(this,arguments);
				},
				removeSkillH:function(skill){
					game.broadcastAll(function(player,skillH,skill){
						if(Array.isArray(skillH)){
							player.skillH=skillH;
						}
						else{
							player.skillH=[];
						}
						player.skillH.remove(skill);
					},this,this.skillH,skill);
					game.log(this,'失去了技能','#g【'+get.translation(skill)+'】');
					this.removeSkill(skill);
				},
				dieAfter:function(){
					var evt=_status.event.getParent('phase');
					if(evt) evt._lastDead=this;
					if(game.playerx().length==1) game.over(game.me.isAlive());
				},
				$dieAfter:function(){},
				hasUnknown:function(){return false},
				isUnknown:function(){return false},
				getEnemies:function(){
					var list=game.playerx();
					list.remove(this);
					return list;
				},
				dieAfter2:function(source){
					if(source&&this.name.indexOf('hhzz_')!=0){
						if(source._toKill==this) game.log(source,'击杀目标成功');
						source.draw(this==source._toKill?2:1);
						source.changeLingli(this==source._toKill?3:2);
					}
					if(!_status._aozhan){
						var that=this;
						game.countPlayer(function(current){
							if(current._toSave==that){
								game.log(current,'保护失败');
								var cards=current.getCards('he');
								if(cards.length) current.discard(cards.randomGets(4));
							}
						});
					}
				},
				logAi:function(){},
				hasZhuSkill:function(){return false},
				changeLingli:function(num){
					if(typeof num!='number') num=1;
					if(typeof this.storage._lingli!='number') this.storage._lingli=0;
					if(num>0){
						num=Math.min(num,5-this.storage._lingli);
						if(num<1) return;
						game.log(this,'获得了','#y'+get.cnNumber(num)+'点','灵力');
					}
					else{
						if(-num>this.storage._lingli) num=-this.storage._lingli;
						if(num==0) return;
						game.log(this,'失去了','#y'+get.cnNumber(-num)+'点','灵力');
					}
					this.storage._lingli+=num;
					this.markSkill('_lingli');
				},
				showIdentity:function(){
					this.node.identity.classList.remove('guessing');
					this.identityShown=true;
					this.ai.shown=1;
					this.setIdentity();
					if(this.special_identity){
						this.node.identity.firstChild.innerHTML=get.translation(this.special_identity+'_bg');
					}
					if(this.identity=='zhu'){
						this.isZhu=true;
					}
					else{
						delete this.isZhu;
					}
					if(_status.clickingidentity){
						for(var i=0;i<_status.clickingidentity[1].length;i++){
							_status.clickingidentity[1][i].delete();
							_status.clickingidentity[1][i].style.transform='';
						}
						delete _status.clickingidentity;
					}
				}
			}
		},
		get:{
			rawAttitude:function(from,to){
				if(from==to||to==from._toSave) return 10;
				if(to==from._toKill) return -30;
				return -10;
			},
			realAttitude:function(from,to){
				if(!game.zhu){
					if(from.identity=='nei'||to.identity=='nei') return -1;
					if(from.identity==to.identity) return 6;
					return -6;
				}
				var situation=get.situation();
				var identity=from.identity;
				var identity2=to.identity;
				if(identity2=='zhu'&&!to.isZhu){
					identity2='zhong';
					if(from==to) return 10;
				}
				if(from!=to&&to.identity=='nei'&&to.ai.shown<1&&(to.ai.identity_mark=='fan'||to.ai.identity_mark=='zhong')){
					identity2=to.ai.identity_mark;
				}
				if(from.identity!='nei'&&from!=to&&get.population('fan')==0&&identity2=='zhong'){
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].identity=='nei'&&
						game.players[i].ai.identity_mark=='zhong'&&
						game.players[i].ai.shown<1){
							identity2='nei';break;
						}
					}
				}
				var zhongmode=false;
				if(!game.zhu.isZhu){
					zhongmode=true;
				}
				switch(identity){
					case 'zhu':
						switch(identity2){
							case 'zhu': return 10;
							case 'zhong': return 6;
							case 'nei':
								if(game.players.length==2) return -10;
								if(to.identity=='zhong') return 0;
								if(get.population('fan')==0){
									if(to.ai.identity_mark=='zhong'&&to.ai.shown<1) return 0;
									return -0.5;
								}
								if(zhongmode&&to.ai.sizhong&&to.ai.shown<1) return 6;
								if(get.population('fan')==1&&get.population('nei')==1&&game.players.length==3){
									var fan;
									for(var i=0;i<game.players.length;i++){
										if(game.players[i].identity=='fan'){
											fan=game.players[i];break;
										}
									}
									if(fan){
										if(to.hp>1&&to.hp>fan.hp&&to.countCards('he')>fan.countCards('he')){
											return -3;
										}
									}
									return 0;
								}
								if(situation>1) return 0;
								return Math.min(3,get.population('fan'));
							case 'fan':
								if(get.population('fan')==1&&get.population('nei')==1&&game.players.length==3){
									var nei;
									for(var i=0;i<game.players.length;i++){
										if(game.players[i].identity=='nei'){
											nei=game.players[i];break;
										}
									}
									if(nei){
										if(nei.hp>1&&nei.hp>to.hp&&nei.countCards('he')>to.countCards('he')){
											return 0;
										}
									}
									return -3;
								}
								return -4;
						}
						break;
					case 'zhong':
						switch(identity2){
							case 'zhu': return 10;
							case 'zhong': return 4;
							case 'nei':
								if(get.population('fan')==0) return -2;
								if(zhongmode&&to.ai.sizhong&&to.ai.shown<1) return 6;
								return Math.min(3,-situation);
							case 'fan': return -8;
						}
						break;
					case 'nei':
						if(identity2=='zhu'&&game.players.length==2) return -10;
						if(from!=to&&identity2!='zhu'&&game.players.length==3) return -8;
						var strategy=get.aiStrategy();
						if(strategy==4){
							if(from==to) return 10;
							return 0;
						}
						var num;
						switch(identity2){
							case 'zhu':
								if(strategy==6) return -1;
								if(strategy==5) return 10;
								if(to.hp<=0) return 10;
								if(get.population('fan')==1){
									var fan;
									for(var i=0;i<game.players.length;i++){
										if(game.players[i].identity=='fan'){
											fan=game.players[i];break;
										}
									}
									if(fan){
										if(to.hp>1&&to.hp>fan.hp&&to.countCards('he')>fan.countCards('he')){
											return -3;
										}
									}
									return 0;
								}
								else{
									if(situation>1||get.population('fan')==0) num=0;
									else num=get.population('fan')+Math.max(0,3-game.zhu.hp);
								}
								if(strategy==2) num--;
								if(strategy==3) num++;
								return num;
							case 'zhong':
								if(strategy==5) return Math.min(0,-situation);
								if(strategy==6) return Math.max(-1,-situation);
								if(get.population('fan')==0) num=-5;
								else if(situation<=0) num=0;
								else if(game.zhu&&game.zhu.hp<2) num=0;
								else if(game.zhu&&game.zhu.hp==2) num=-1;
								else if(game.zhu&&game.zhu.hp<=2&&situation>1) num=-1;
								else num=-2;
								if(zhongmode&&situation<2){
									num=4;
								}
								if(strategy==2) num--;
								if(strategy==3) num++;
								return num;
							case 'nei':
								if(from==to) return 10;
								if(from.ai.friend.contains(to)) return 5;
								if(get.population('fan')+get.population('zhong')>0) return 0;
								return -5;
							case 'fan':
								if(strategy==5) return Math.max(-1,situation);
								if(strategy==6) return Math.min(0,situation);
								if((game.zhu&&game.zhu.hp<=2&&situation<0)||situation<-1) num=-3;
								else if(situation<0||get.population('zhong')==0) num=-2;
								else if((game.zhu&&game.zhu.hp>=4&&situation>0)||situation>1) num=1;
								else num=0;
								if(strategy==2) num++;
								if(strategy==3) num--;
								return num;
						}
						break;
					case 'fan':
						switch(identity2){
							case 'zhu':
								if(get.population('nei')>0){
									if(situation==1) return -6;
									if(situation>1) return -5;
								}
								return -8;
							case 'zhong':
								if(!zhongmode&&game.zhu.hp>=3&&to.hp==1){
									return -10;
								}
								return -7;
							case 'nei':
								if(zhongmode&&to.ai.sizhong) return -7;
								if(get.population('fan')==1) return 0;
								if(get.population('zhong')==0) return -7;
								if(game.zhu&&game.zhu.hp<=2) return -1;
								return Math.min(3,situation);
							case 'fan': return 5;
						}
				}
			},
			situation:function(absolute){
				var i,j,player;
				var zhuzhong=0,total=0,zhu,fan=0;
				for(i=0;i<game.players.length;i++){
					player=game.players[i];
					var php=player.hp;
					if(player.hasSkill('benghuai')&&php>4){
						php=4;
					}
					else if(php>6){
						php=6;
					}
					j=player.countCards('h')+player.countCards('e')*1.5+php*2;
					if(player.identity=='zhu'){
						zhuzhong+=j*1.2+5;
						total+=j*1.2+5;
						zhu=j;
					}
					else if(player.identity=='zhong'){
						zhuzhong+=j*0.8+3;
						total+=j*0.8+3;
					}
					else if(player.identity=='fan'){
						zhuzhong-=j+4;
						total+=j+4;
						fan+=j+4;
					}
				}
				if(absolute) return zhuzhong;
				var result=parseInt(10*Math.abs(zhuzhong/total));
				if(zhuzhong<0) result=-result;
				if(!game.zhong){
					if(zhu<12&&fan>30) result--;
					if(zhu<6&&fan>15) result--;
					if(zhu<4) result--;
				}
				return result;
			},
		},
		card:{
			hhzz_toulianghuanzhu:{
				enable:true,
				cardimage:"toulianghuanzhu",
				chongzhu:true,
				type:'trick',
				filterTarget:function(card,player,target){
					return target.skillH.length>0;
				},
				content:function(){
					target.removeSkillH(target.skillH.randomGet());
					var skills=lib.huanhuazhizhan.skills;
					skills.randomSort();
					for(var i=0;i<skills.length;i++){
						if(!target.skillH.contains(skills[i])){
							target.addSkillH(skills[i]);
							break;
						}
					}
				},
				ai:{
					order:10,
					result:{
						target:function(){
							return 0.5-Math.random();
						},
					},
				},
			},
			hhzz_fudichouxin:{
				enable:true,
				cardimage:"fudichouxin",
				type:'trick',
				filterTarget:function(card,player,target){
					return target.skillH.length>0;
				},
				content:function(){
					target.removeSkillH(target.skillH.randomGet());
				},
				ai:{
					order:10,
					result:{target:-1},
				},
			},
		},
		characterPack:{
			mode_huanhuazhizhan:{
				hhzz_shiona:['female','sst_smash',1,['hhzz_huilei']],
				hhzz_kanade:['female','sst_smash',2,['hhzz_youlian']],
				hhzz_takaramono1:['male','sst_smash',5,['hhzz_jubao','hhzz_huizhen']],
				hhzz_takaramono2:['male','sst_smash',3,['hhzz_jubao','hhzz_zhencang']],
			}
		},
		skill:{
			_lingli_damage:{
				trigger:{source:'damage'},
				forced:true,
				popup:false,
				filter:function(event,player){
					return event.player==player._toKill;
				},
				content:function(){
					game.log(player,'对击杀目标造成了伤害');
					player.changeLingli(trigger.num);
				},
			},
			_lingli:{
				mark:true,
				marktext:'灵',
				popup:'聚灵',
				intro:{
					name:'灵力',
					content:'当前灵力点数：# / 5',
				},
				trigger:{
					player:'phaseBeginStart',
				},
				prompt:'是否消耗2点灵力获得一个技能？',
				filter:function(event,player){
					return player.storage._lingli>1;
				},
				check:function(event,player){
					return player.skillH.length<3;
				},
				content:function(){
					'step 0'
					player.changeLingli(-2);
					'step 1'
					event.skills=lib.huanhuazhizhan.skills;
					var skills=event.skills;
					skills.randomSort();
					var list=[];
					for(var i=0;i<skills[i].length;i++){
						if(!player.skillH.contains(skills[i])) list.push(skills[i]);
						if(list.length==3) break;
					}
					if(!list.length){event.finish();return;}
					if(player.storage._lingli>0)	list.push('刷新');
					event.list=list;
					var dialog=game.getSkillDialog(event.list,'选择获得一个技能');
					player.chooseControl(event.list).set('ai',function(){
						return 0;
					}).set('dialog',dialog);
					'step 2'
					if(result.control=='刷新'){
						player.changeLingli(-1);
						event.goto(1);
						return;
					}
					event.skill=result.control;
					if(player.skillH.length==3){
						event.lose=true;
						player.chooseControl(player.skillH).set(prompt,'选择失去1个已有技能');
					}
					'step 3'
					if(event.lose) player.removeSkillH(result.control);
					player.addSkillH(event.skill);
				},
			},
			_lingli_round:{
				trigger:{global:'roundStart'},
				forced:true,
				popup:false,
				filter:function(event,player){
					return _status._aozhan!=true&&game.roundNumber>1;
				},
				content:function(){
					player.changeLingli(1);
				},
			},
			_lingli_draw:{
				enable:'phaseUse',
				filter:function(event,player){
					return player.storage._lingli>0;
				},
				content:function(){
					player.changeLingli(-1);
					player.draw();
				},
				delay:0,
				ai:{
					order:10,
					result:{
						player:function(player){
							return (player.storage._lingli-2*(3-player.skillH.length))>0?1:0;
						},
					},
				},
			},
			_lingli_save:{
				trigger:{target:'useCardToTargeted'},
				forced:true,
				popup:false,
				filter:function(event,player){
					return event.card.name=='tao'&&player==event.player._toSave;
				},
				content:function(){
					game.log(trigger.player,'帮助了保护目标');
					trigger.player.changeLingli(1);
				},
			},
			xisheng:{
				enable:'chooseToUse',
				usable:1,
				viewAs:{name:'tao'},
				viewAsFilter:function(player){
					return player!=_status.currentPhase&&player.countCards('hes')>1;
				},
				selectCard:2,
				filterCard:true,
				position:'hes',
			},
			shulv:{
				inherit:'zhiheng',
				prompt:'弃置一张牌并摸一张牌',
				selectCard:1,
				filter:function(event,player){
					return player.countCards('hs')>player.hp;
				},
			},
			xiandeng:{
				mod:{
					cardUsable:function(card,player,num){
						if(card.name=='sha') return num+1;
					},
					targetInRange:function(card,player){
						if(card.name=='sha'&&player.countUsed('sha',true)==0) return true;
					},
				},
			},
			_hhzz_qiankunbagua:{
				trigger:{player:'phaseAfter'},
				forced:true,
				forceDie:true,
				popup:false,
				filter:function(event,player){
					return _status._aozhan&&!player.getStat('damage')&&player.isAlive()||event._lastDead!=undefined;
				},
				content:function(){
					'step 0'
					if(_status._aozhan&&!player.getStat('damage')){
						player.loseHp();
						player.changeLingli(1);
						game.log(player,'本回合内未造成伤害，触发死战模式惩罚');
					}
					if(trigger._lastDead==undefined) event.goto(2);
					'step 1'
					var type=get.rand(1,8);
					event.type=type;
					trigger._lastDead.playerfocus(1200);
					player.$fullscreenpop('乾坤八卦·'+['离','坎','乾','震','兑','艮','巽','坤'][type-1],get.groupnature(trigger._lastDead.group,'raw'));
					game.delay(1.5);
					'step 2'
					var type=event.type;
					switch(type){
						case 1:{
							game.countPlayer(function(current){
								current.loseHp();
							});
							break;
						}
						case 2:{
							game.countPlayer(function(current){
								current.draw(2,'nodelay');
							});
							break;
						}
						case 3:{
							game.broadcastAll(function(player){
								player.revive(3);
							},trigger._lastDead);
							trigger._lastDead.draw(3);
							break;
						}
						case 4:{
							game.countPlayer(function(current){
								var he=current.getCards('he');
								if(he.length) current.discard(he.randomGet()).set('delay',false);
							});
							break;
						}
						case 5:{
							game.countPlayer(function(current){
								current.changeLingli(1);
							});
							break;
						}
						case 6:{
							var cards=[];
							game.countPlayer(function(current){
								var card=get.cardPile(function(card){
									return !cards.contains(card)&&get.type(card)=='equip';
								});
								if(card){
									cards.push(card);
									current.$gain(card,'gain2')
									current.gain(card);
								}
							});
							break;
						}
						case 7:{
							game.countPlayer(function(current){
								if(current.skillH.length<3){
									var skills=lib.huanhuazhizhan.skills;
									skills.randomSort();
									for(var i=0;i<skills.length;i++){
										if(!current.skillH.contains(skills[i])){
											current.addSkillH(skills[i]);
											break;
										}
									}
								}
							});
							break;
						}
						case 8:{
							var name=['hhzz_shiona','hhzz_kanade','hhzz_takaramono1','hhzz_takaramono2'].randomGet();
							game.broadcastAll(function(player,name,skillH){
								player.revive(null,false);
								player.uninit();
								player.init(name);
								player.skillH=skillH;
								player.addSkill('hhzz_noCard');
							},trigger._lastDead,name,lib.character[name][3].slice(0));
							break;
						}
					}
					'step 3'
					if(game.playerx().length<=4&&!_status._aozhan){
						game.broadcastAll(function(){
							game.countPlayer2(function(current){
								delete current._toKill;
								delete current._toSave;
							});
							ui.huanhuazhizhan.innerHTML='死战模式';
						});
						_status._aozhan=true;
						game.playBackgroundMusic();
						trigger._lastDead.$fullscreenpop('死战模式',get.groupnature(trigger._lastDead.group,'raw')||'fire');
					}
					else game.randomMission();
				},
			},
			hhzz_noCard:{
				mod:{
					cardEnabled:function(){return false},
					cardSavable:function(){return false},
					cardRespondable:function(){return false},
				},
			},
			hhzz_huilei:{
				trigger:{player:'die'},
				forced:true,
				forceDie:true,
				skillAnimation:true,
				logTarget:'source',
				filter:function(event,player){
					return event.source!=undefined;
				},
				content:function(){
					var source=trigger.source;
					var cards=source.getCards('he');
					if(cards.length) source.discard(cards);
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'damage')) return [-5,0];
						}
					}
				}
			},
			hhzz_youlian:{
				trigger:{player:'die'},
				forced:true,
				forceDie:true,
				skillAnimation:true,
				logTarget:'source',
				filter:function(event,player){
					return event.source!=undefined;
				},
				content:function(){
					var source=trigger.source;
					var cards=source.getCards('he');
					if(cards.length) source.discard(cards);
					var skills=source.skillH;
					if(skills.length) source.removeSkillH(skills.randomGet());
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'damage')) return [-5,0];
						}
					}
				}
			},
			hhzz_zhencang:{
				trigger:{player:'die'},
				forced:true,
				filter:function(event,player){
					return event.source!=undefined;
				},
				forceDie:true,
				logTarget:'source',
				content:function(){
					var source=trigger.source;
					source.draw();
					if(source.skillH.length==3) source.removeSkillH(source.skillH.randomGet());
					var skills=lib.huanhuazhizhan.skills;
					skills.randomSort();
					for(var i=0;i<skills.length;i++){
						if(!source.skillH.contains(skills[i])){
							source.addSkillH(skills[i]);
							break;
						}
					}
				},
			},
			hhzz_huizhen:{
				trigger:{player:'die'},
				forced:true,
				forceDie:true,
				logTarget:'source',
				filter:function(event,player){
					return event.source!=undefined;
				},
				content:function(){
					var source=trigger.source;
					source.draw(3);
					if(source.skillH.length==3) source.removeSkillH(source.skillH.randomGet());
					var skills=lib.huanhuazhizhan.skills;
					skills.randomSort();
					for(var i=0;i<skills.length;i++){
						if(!source.skillH.contains(skills[i])){
							source.addSkillH(skills[i]);
							break;
						}
					}
				},
			},
			hhzz_jubao:{
				trigger:{player:'damage'},
				forced:true,
				logTarget:'source',
				filter:function(event,player){
					return event.source!=undefined&&player.countCards('he')>0;
				},
				content:function(){
					var cards=player.getCards('he');
					cards.randomSort();
					cards=cards.slice(0,trigger.num);
					trigger.source.gain('give',cards,player);
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'damage')) return [15,0];
						}
					}
				}
			},
		},
		help:{
			'幻化之战':'<div style="margin:10px">幻化之战</div><ul style="margin-top:0"><li>杀死所有其他角色，成为最后的存活者</li><li>所有角色改为四血白板，依靠灵力值获得技能。灵力值可以通过各种方式获得</li></ul>'
		}
	};
});
