'use strict';
game.import("mode", function (lib, game, ui, get, ai, _status) {
	return {
		name: 'th_mougong',
		start: function () {
			"step 0"
			if (!lib.config.new_tutorial) {
				ui.arena.classList.add('only_dialog');
			}
			_status.mode = get.config('identity_mode');
			if (_status.brawl && _status.brawl.submode) {
				_status.mode = _status.brawl.submode;
			}
			event.replacePile = function () {
				var list = ['shengdong', 'qijia', 'caomu', 'jinchan', 'zengbin', 'fulei', 'qibaodao', 'zhungangshuo', 'lanyinjia'];
				var map = {
					shunshou: 'shengdong',
					jiedao: 'qijia',
					bingliang: 'caomu',
					wuxie: 'jinchan',
					wuzhong: 'zengbin',
					wugu: 'zengbin',
					shandian: 'fulei',
					qinggang: 'qibaodao',
					qinglong: 'zhungangshuo',
					bagua: 'lanyinjia'
				};
				for (var i = 0; i < lib.card.list.length; i++) {
					var name = lib.card.list[i][2];
					if (list.contains(name)) {
						lib.card.list.splice(i--, 1);
					} else if (map[name]) {
						lib.card.list[i][2] = map[name];
						lib.card.list[i]._replaced = true;
					}
				}
			}
			"step 1"
			var playback = localStorage.getItem(lib.configprefix + 'playback');
			if (playback) {
				ui.create.me();
				ui.arena.style.display = 'none';
				ui.system.style.display = 'none';
				_status.playback = playback;
				localStorage.removeItem(lib.configprefix + 'playback');
				var store = lib.db.transaction(['video'], 'readwrite').objectStore('video');
				store.get(parseInt(playback)).onsuccess = function (e) {
					if (e.target.result) {
						game.playVideoContent(e.target.result.video);
					} else {
						alert('播放失败：找不到录像');
						game.reload();
					}
				}
				event.finish();
			} else if (!_status.connectMode) {
				game.prepareArena();
				if (!lib.config.new_tutorial) {
					game.delay();
				}
			}
			"step 2"
			if (!_status.connectMode) {
				game.showChangeLog();
			}
			"step 3"
			if (_status.connectMode) {
				game.waitForPlayer(function () {
					if (lib.configOL.identity_mode == 'zhong' || lib.configOL.identity_mode == 'purple') {
						lib.configOL.number = 8;
					}
				});
			}
			"step 4"
			if (_status.connectMode) {
				if (lib.configOL.number < 2) {
					lib.configOL.number = 2;
				}
				game.randomMapOL();
			} else {
				for (var i = 0; i < game.players.length; i++) {
					game.players[i].getId();
				}
				if (_status.brawl && _status.brawl.chooseCharacterBefore) {
					_status.brawl.chooseCharacterBefore();
				}
				game.chooseCharacter();
			}
			"step 5"
			if (ui.coin) {
				_status.coinCoeff = get.coinCoeff([game.me.name]);
			}
			if (!_status.firstAct) {
				_status.firstAct = game.players[Math.floor(Math.random() * game.players.length)];
			}
			if (game.players.length == 2) {
				game.showIdentity(true);
				var map = {};
				for (var i in lib.playerOL) {
					map[i] = lib.playerOL[i].identity;
				}
				game.broadcast(function (map) {
					for (var i in map) {
						lib.playerOL[i].identity = map[i];
						lib.playerOL[i].setIdentity();
						lib.playerOL[i].ai.shown = 1;
					}
				}, map);
			} else {
				for (var i = 0; i < game.players.length; i++) {
					game.players[i].ai.shown = 0;
				}
			}
			// if (game.zhu == game.me && game.zhu.identity != 'zhu' && _status.brawl && _status.brawl.identityShown) {
			//     delete game.zhu;
			// } else {
			//     game.zhu.ai.shown = 1;
			//     if (game.zhu2) {
			//         game.zhong = game.zhu;
			//         game.zhu = game.zhu2;
			//         delete game.zhu2;
			//         if (game.zhong.sex == 'male' && game.zhong.maxHp <= 4) {
			//             game.zhong.addSkill('dongcha');
			//         } else {
			//             game.zhong.addSkill('sheshen');
			//         }
			//     }

			// }
			game.syncState();
			event.trigger('gameStart');

			var players = get.players(lib.sort.position);
			var info = [];
			for (var i = 0; i < players.length; i++) {
				info.push({
					name: players[i].name1,
					name2: players[i].name2,
					identity: players[i].identity
				});
			}
			_status.videoInited = true;
			game.addVideo('init', null, info);
			for (var i = 0; i < players.length; i++) {
				players[i].markSkill('th_anger');
			}
			"step 6"
			game.gameDraw(_status.firstAct2 || game.zhong || game.zhu || _status.firstAct || game.me, function (player) {
				return 4;
			});
			if (_status.connectMode && lib.configOL.change_card) game.replaceHandcards(game.players.slice(0));
			"step 7"
			game.phaseLoop(_status.firstAct2 || _status.firstAct || game.me);
		},
		card: {
			fan2: {
				forceDie: true,
				fullskin: true,
			},
			zhu2: {
				forceDie: true,
				fullskin: true,
			},
			zhong2: {
				forceDie: true,
				fullskin: true,
			},
			nei2: {
				forceDie: true,
				fullskin: true,
			},
			enemy2: {
				forceDie: true,
				fullskin: true,
			},
			friend2: {
				forceDie: true,
				fullskin: true,
			},
		},
		game: {
			getState: function () {
				var state = {};
				for (var i in lib.playerOL) {
					var player = lib.playerOL[i];
					state[i] = { identity: player.identity };
					if (player == game.zhu) {
						state[i].zhu = true;
					}
					if (player == game.zhong) {
						state[i].zhong = true;
					}
					if (player.isZhu) {
						state[i].isZhu = true;
					}
					if (player.special_identity) {
						state[i].special_identity = player.special_identity;
					}
					state[i].shown = player.ai.shown;
					//state[i].group=player.group;
				}
				return state;
			},
			updateState: function (state) {
				for (var i in state) {
					var player = lib.playerOL[i];
					if (player) {
						player.identity = state[i].identity;
						if (state[i].zhu) {
							game.zhu = player;
						}
						if (state[i].isZhu) {
							player.isZhu = true;
						}
						if (state[i].zhong) {
							game.zhong = player;
						}
						player.ai.shown = state[i].shown;
						//player.group=state[i].group;
						//player.node.name.dataset.nature=get.groupnature(player.group);
					}
				}
			},
			getRoomInfo: function (uiintro) {
				uiintro.add('<div class="text chat">双将模式：' + (lib.configOL.double_character ? '开启' : '关闭'));
				var last = uiintro.add('<div class="text chat">出牌时限：' + lib.configOL.choose_timeout + '秒');
				if (lib.configOL.banned.length) {
					last = uiintro.add('<div class="text chat">禁用武将：' + get.translation(lib.configOL.banned));
				}
				if (lib.configOL.bannedcards.length) {
					last = uiintro.add('<div class="text chat">禁用卡牌：' + get.translation(lib.configOL.bannedcards));
				}
				last.style.paddingBottom = '8px';
			},
			getIdentityList: function (player) {
				if (player.identityShown) return;
				if (player == game.me) return;
				if (player.fanfixed) return;
				return {
					fan: '反',
					zhong: '忠',
					nei: '内',
					zhu: '主',
					enemy: '敌',
					friend: '友',
					cai: '猜',
				}
			},
			getIdentityList2: function (list) {
				for (var i in list) {
					switch (i) {
						case 'fan':
							list[i] = '反贼';
							break;
						case 'zhong':
							list[i] = '忠臣';
							break;
						case 'nei':
							list[i] = '内奸';
							break;
						case 'zhu':
							list[i] = '主公';
							break;
						case 'friend':
							list[i] = '友方';
							break;
						case 'enemy':
							list[i] = '敌方';
							break;
						case 'cai':
						case 'cai2':
							list[i] = '未知';
							break;
					}
				}
			},
			getVideoName: function () {
				var str = get.translation(game.me.name);
				if (game.me.name2) {
					str += '/' + get.translation(game.me.name2);
				}
				var str2;
				if (game.identityVideoName) str2 = game.identityVideoName;
				else {
					str2 = get.cnNumber(get.playerNumber()) + '人' +
						get.translation(lib.config.mode) + ' - ' + lib.translate[game.me.identity + '2']
				}
				var name = [
					str,
					str2,
				];
				return name;
			},
			addRecord: function (bool) {
				if (typeof bool == 'boolean') {
					var data = lib.config.gameRecord.identity.data;
					var identity = game.me.identity;
					if (!data[identity]) {
						data[identity] = [0, 0];
					}
					if (bool) {
						data[identity][0]++;
					} else {
						data[identity][1]++;
					}
					var list = ['zhu', 'zhong', 'nei', 'fan'];
					var str = '';
					for (var i = 0; i < list.length; i++) {
						if (data[list[i]]) {
							str += lib.translate[list[i] + '2'] + '：' + data[list[i]][0] + '胜' + ' ' + data[list[i]][1] + '负<br>';
						}
					}
					lib.config.gameRecord.identity.str = str;
					game.saveConfig('gameRecord', lib.config.gameRecord);
				}
			},
			getDeathIdentity: function () {
				if (game.dead.length == 0) return {};
				var death = {};
				for (var i of game.dead) {
					if (!death[i.identity]) death[i.identity] = [];
					death[i.identity].add(i);
				}
				return death;
			},
			showIdentity: function (me) {
				for (var i = 0; i < game.players.length; i++) {
					// if(me===false&&game.players[i]==game.me) continue;
					game.players[i].node.identity.classList.remove('guessing');
					game.players[i].identityShown = true;
					game.players[i].ai.shown = 1;
					game.players[i].setIdentity(game.players[i].identity);
					if (game.players[i].special_identity) {
						game.players[i].node.identity.firstChild.innerHTML = get.translation(game.players[i].special_identity + '_bg');
					}
					if (game.players[i].identity == 'zhu') {
						game.players[i].isZhu = true;
					}
				}
				if (_status.clickingidentity) {
					for (var i = 0; i < _status.clickingidentity[1].length; i++) {
						_status.clickingidentity[1][i].delete();
						_status.clickingidentity[1][i].style.transform = '';
					}
					delete _status.clickingidentity;
				}
			},
			checkResult: function () {
				var me = game.me._trueMe || game.me;
				if (_status.brawl && _status.brawl.checkResult) {
					_status.brawl.checkResult();
					return;
				} else if (!game.zhu) {
					if (get.population('fan') == 0) {
						switch (me.identity) {
							case 'fan':
								game.over(false);
								break;
							case 'zhong':
								game.over(true);
								break;
							default:
								game.over();
								break;
						}
					} else if (get.population('zhong') == 0) {
						switch (me.identity) {
							case 'fan':
								game.over(true);
								break;
							case 'zhong':
								game.over(false);
								break;
							default:
								game.over();
								break;
						}
					}
					return;
				}
				if (game.zhu.isAlive() && get.population('fan') + get.population('nei') > 0) return;
				if (game.zhong) {
					game.zhong.identity = 'zhong';
				}
				game.showIdentity();
				if (me.identity == 'zhu' || me.identity == 'zhong' || me.identity == 'mingzhong') {
					if (game.zhu.classList.contains('dead')) {
						game.over(false);
					} else {
						game.over(true);
					}
				} else if (me.identity == 'nei') {
					if (game.players.length == 1 && me.isAlive()) {
						game.over(true);
					} else {
						game.over(false);
					}
				} else {
					if ((get.population('fan') + get.population('zhong') > 0 || get.population('nei') > 1) &&
						game.zhu.classList.contains('dead')) {
						game.over(true);
					} else {
						game.over(false);
					}
				}
			},
			checkOnlineResult: function (player) {
				if (_status.winner && _status.loser) {
					if (_status.loser.length == game.players.length) return null;
					if (_status.loser.contains(player)) return false;
					if (_status.winner.contains(player)) return true;
				}
				if (game.zhu.isAlive()) {
					return (player.identity == 'zhu' || player.identity == 'zhong');
				} else if (game.players.length == 1 && game.players[0].identity == 'nei') {
					return player.isAlive();
				} else {
					return player.identity == 'fan';
				}
			},
			chooseCharacter: function () {
				var next = game.createEvent('chooseCharacter', false);
				next.showConfig = true;
				next.addPlayer = function (player) {
					var list = lib.config.mode_config.identity.identity[game.players.length - 3].slice(0);
					var list2 = lib.config.mode_config.identity.identity[game.players.length - 2].slice(0);
					for (var i = 0; i < list.length; i++) list2.remove(list[i]);
					player.identity = list2[0];
					player.setIdentity('cai');
				};
				next.removePlayer = function () {
					return game.players.randomGet(game.me, game.zhu);
				};
				next.ai = function (player, list, list2, back) {
					if (_status.brawl && _status.brawl.chooseCharacterAi) {
						if (_status.brawl.chooseCharacterAi(player, list, list2, back) !== false) {
							return;
						}
					}
					if (player.identity == 'zhong' && (Math.random() < 0.5)) {
						var listc = list.slice(0);
						for (var i = 0; i < listc.length; i++) {
							var listx = lib.characterReplace[listc[i]];
							if (listx && listx.length) listc[i] = listx.randomGet();
						}
						var choice = 0;
						for (var i = 0; i < listc.length; i++) {
							if (lib.character[listc[i]][1] == game.zhu.group) {
								choice = i;
								break;
							}
						}
						if (get.config('double_character')) {
							player.init(listc[choice], listc[choice == 0 ? choice + 1 : choice - 1]);
						} else {
							player.init(listc[choice]);
						}
					} else {
						var listc = list.slice(0, 2);
						for (var i = 0; i < listc.length; i++) {
							var listx = lib.characterReplace[listc[i]];
							if (listx && listx.length) listc[i] = listx.randomGet();
						}
						if (get.config('double_character')) {
							player.init(listc[0], listc[1]);
						} else {
							player.init(listc[0]);
						}
					}
					if (back) {
						list.remove(get.sourceCharacter(player.name1));
						list.remove(get.sourceCharacter(player.name2));
						for (var i = 0; i < list.length; i++) {
							back.push(list[i]);
						}
					}
					if (typeof lib.config.test_game == 'string' && player == game.me.next) {
						player.init(lib.config.test_game);
					}
					if (get.is.double(player.name1)) {
						player._groupChosen = true;
						player.group = get.is.double(player.name1, true).randomGet();
						player.node.name.dataset.nature = get.groupnature(player.group);
					} else if (get.config('choose_group') && player.group == 'shen' && !player.isUnseen(0)) {
						var list = lib.group.slice(0);
						list.remove('shen');
						if (list.length) player.group = function () {
							if (_status.mode != 'zhong' && game.zhu && game.zhu.group) {
								if (['re_zhangjiao', 'liubei', 're_liubei', 'caocao', 're_caocao', 'sunquan', 're_sunquan', 'zhangjiao', 'sp_zhangjiao', 'caopi', 're_caopi', 'liuchen', 'caorui', 'sunliang', 'sunxiu', 'sunce', 're_sunben', 'ol_liushan', 're_liushan', 'key_akane', 'dongzhuo', 're_dongzhuo', 'ol_dongzhuo', 'jin_simashi', 'caomao'].contains(game.zhu.name)) return game.zhu.group;
								if (game.zhu.name == 'yl_yuanshu') {
									if (player.identity == 'zhong') list.remove('qun');
									else return 'qun';
								}
								if (['sunhao', 'xin_yuanshao', 're_yuanshao', 're_sunce', 'ol_yuanshao', 'yuanshu', 'jin_simazhao', 'liubian'].contains(game.zhu.name)) {
									if (player.identity != 'zhong') list.remove(game.zhu.group);
									else return game.zhu.group;
								}
							}
							return list.randomGet();
						}();
					}
					player.node.name.dataset.nature = get.groupnature(player.group);
				}
				next.setContent(function () {
					"step 0"
					ui.arena.classList.add('choose-character');
					var i;
					var list;
					var list2 = [];
					var list3 = [];
					var list4 = [];
					var identityList;
					var chosen = lib.config.continue_name || [];
					game.saveConfig('continue_name');
					event.chosen = chosen;
					identityList = lib.config.mode_config.identity.identity[game.players.length - 2].slice(0);
					if (get.config('double_nei')) {
						switch (get.playerNumber()) {
							case 8:
								identityList.remove('fan');
								identityList.push('nei');
								break;
							case 7:
								identityList.remove('zhong');
								identityList.push('nei');
								break;
							case 6:
								identityList.remove('fan');
								identityList.push('nei');
								break;
							case 5:
								identityList.remove('fan');
								identityList.push('nei');
								break;
							case 4:
								identityList.remove('zhong');
								identityList.push('nei');
								break;
							case 3:
								identityList.remove('fan');
								identityList.push('nei');
								break;
						}
					}


					var addSetting = function (dialog) {
						dialog.add('选择身份').classList.add('add-setting');
						var table = document.createElement('div');
						table.classList.add('add-setting');
						table.style.margin = '0';
						table.style.width = '100%';
						table.style.position = 'relative';
						var listi = ['random', 'zhu', 'zhong', 'nei', 'fan'];
						for (var i = 0; i < listi.length; i++) {
							var td = ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
							td.link = listi[i];
							if (td.link === game.me.identity) {
								td.classList.add('bluebg');
							}
							table.appendChild(td);
							td.innerHTML = '<span>' + get.translation(listi[i] + '2') + '</span>';

							td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
								if (_status.dragged) return;
								if (_status.justdragged) return;
								_status.tempNoButton = true;
								setTimeout(function () {
									_status.tempNoButton = false;
								}, 500);
								var link = this.link;
								// if (game.zhu) {
								//     // if (link != 'random') {
								//     //     _status.event.parent.fixedseat = get.distance(game.me, game.zhu, 'absolute');
								//     // }
								//     if (game.zhu.name) game.zhu.uninit();
								//     delete game.zhu.isZhu;
								//     delete game.zhu.identityShown;
								// }
								var current = this.parentNode.querySelector('.bluebg');
								if (current) {
									current.classList.remove('bluebg');
								}
								current = seats.querySelector('.bluebg');
								if (current) {
									current.classList.remove('bluebg');
								}
								if (link == 'random') {
									link = ['zhu', 'zhong', 'nei', 'fan'].randomGet();
									for (var i = 0; i < this.parentNode.childElementCount; i++) {
										if (this.parentNode.childNodes[i].link == link) {
											this.parentNode.childNodes[i].classList.add('bluebg');
										}
									}
								} else {
									this.classList.add('bluebg');
								}
								num = get.config('choice_' + link);
								_status.event.parent.swapnodialog = function (dialog, list) {
									var buttons = ui.create.div('.buttons');
									var node = dialog.buttons[0].parentNode;
									dialog.buttons = ui.create.buttons(list, 'characterx', buttons);
									dialog.content.insertBefore(buttons, node);
									buttons.animate('start');
									node.remove();
									game.uncheck();
									game.check();
									for (var i = 0; i < seats.childElementCount; i++) {
										seats.childNodes[i].classList.remove('bluebg');
									}
								}
								_status.event = _status.event.parent;
								_status.event.step = 0;
								_status.event.identity = link;
								game.resume();
							});
						}
						dialog.content.appendChild(table);

						dialog.add('选择座位').classList.add('add-setting');
						var seats = document.createElement('div');
						seats.classList.add('add-setting');
						seats.style.margin = '0';
						seats.style.width = '100%';
						seats.style.position = 'relative';

						for (var i = 1; i <= game.players.length; i++) {
							var td = ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
							td.innerHTML = get.cnNumber(i, true);
							td.link = i - 1;
							seats.appendChild(td);
							td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
								if (_status.dragged) return;
								if (_status.justdragged) return;
								var current = this.parentNode.querySelector('.bluebg');
								if (current) {
									current.classList.remove('bluebg');
								}
								this.classList.add('bluebg');
								_status.firstAct2 = game.me;
								var goal = game.me;
								for (var i = 0; i < this.link; i++) {
									_status.firstAct2 = goal.previous;
									goal = goal.previous;
								}

								// for (var i = 0; i < game.players.length; i++) {
								//     if (get.distance(game.players[i], game.me, 'absolute') == this.link) {
								//         game.swapSeat(game.zhu, game.players[i], false);
								//         return;
								//     }
								// }
							});
						}
						dialog.content.appendChild(seats);
						// if (game.me == game.zhu) {
						//     seats.previousSibling.style.display = 'none';
						//     seats.style.display = 'none';
						// }

						dialog.add(ui.create.div('.placeholder.add-setting'));
						dialog.add(ui.create.div('.placeholder.add-setting'));
						if (get.is.phoneLayout()) dialog.add(ui.create.div('.placeholder.add-setting'));
					};
					var removeSetting = function () {
						var dialog = _status.event.dialog;
						if (dialog) {
							dialog.style.height = '';
							delete dialog._scrollset;
							var list = Array.from(dialog.querySelectorAll('.add-setting'));
							while (list.length) {
								list.shift().remove();
							}
							ui.update();
						}
					};
					event.addSetting = addSetting;
					event.removeSetting = removeSetting;
					event.list = [];
					identityList.randomSort();
					if (event.identity) {
						identityList.remove(event.identity);
						identityList.unshift(event.identity);
						if (event.fixedseat) {
							var zhuIdentity = 'zhu';
							if (zhuIdentity != event.identity) {
								identityList.remove(zhuIdentity);
								identityList.splice(event.fixedseat, 0, zhuIdentity);
							}
							delete event.fixedseat;
						}
						delete event.identity;
					} else if (_status.mode != 'zhong' && (!_status.brawl || !_status.brawl.identityShown)) {
						var ban_identity = [];
						ban_identity.push(get.config('ban_identity') || 'off');
						if (ban_identity[0] != 'off') {
							ban_identity.push(get.config('ban_identity2') || 'off');
							if (ban_identity[1] != 'off') {
								ban_identity.push(get.config('ban_identity3') || 'off');
							}
						}
						ban_identity.remove('off');
						if (ban_identity.length) {
							var identityList2 = identityList.slice(0);
							for (var i = 0; i < ban_identity.length; i++) {
								while (identityList2.remove(ban_identity[i]));
							}
							ban_identity = identityList2.randomGet();
							identityList.remove(ban_identity);
							identityList.splice(game.players.indexOf(game.me), 0, ban_identity);
						}
					}
					for (i = 0; i < game.players.length; i++) {
						game.players[i].node.identity.classList.add('guessing');
						game.players[i].identity = identityList[i];
						game.players[i].setIdentity('cai');
						if (identityList[i] == 'zhu') {
							game.zhu = game.players[i];
						}
						game.players[i].identityShown = false;
					}
					ui.playerids.style.display = 'none';
					_status.identityShown = false;

					if (!game.zhu) game.zhu = game.me;
					else {
						game.me.setIdentity();
						game.me.node.identity.classList.remove('guessing');
					}
					//选将框分配
					for (i in lib.characterReplace) {
						var ix = lib.characterReplace[i];
						for (var j = 0; j < ix.length; j++) {
							if (chosen.contains(ix[j]) || lib.filter.characterDisabled(ix[j])) ix.splice(j--, 1);
						}
						if (ix.length) {
							event.list.push(i);
							list4.addArray(ix);
							var bool = false;
							(bool ? list2 : list3).push(i);
						}
					}
					for (i in lib.character) {
						if (list4.contains(i)) continue;
						if (chosen.contains(i)) continue;
						if (lib.filter.characterDisabled(i)) continue;
						event.list.push(i);
						list4.push(i);
						list3.push(i);
					}
					list2.sort(lib.sort.character);
					event.list.randomSort();
					_status.characterlist = list4.slice(0).randomSort();
					list3.randomSort();
					if (_status.brawl && _status.brawl.chooseCharacterFilter) {
						_status.brawl.chooseCharacterFilter(event.list, list2, list3);
					}
					var num = get.config('choice_' + game.me.identity);
					event.list11 = event.list.slice(0);
					event.list22 = list2.slice(0);
					if (game.zhu != game.me) {
						//event.ai(game.zhu, event.list11, event.list22);
						//event.list.remove(get.sourceCharacter(game.zhu.name1));
						//event.list.remove(get.sourceCharacter(game.zhu.name2));
						if (_status.brawl && _status.brawl.chooseCharacter) {
							list = _status.brawl.chooseCharacter(event.list, num);
							if (list === false || list === 'nozhu') {
								list = event.list.slice(0, num);
							}
						} else {
							list = event.list.slice(0, num);
						}
					} else {
						if (_status.brawl && _status.brawl.chooseCharacter) {
							list = _status.brawl.chooseCharacter(list2, list3, num);
							if (list === false) {
								list = list2.concat(list3.slice(0, num));
							} else if (list === 'nozhu') {
								list = event.list.slice(0, num);
							}
						} else {
							list = list2.concat(list3.slice(0, num));
						}
					}
					delete event.swapnochoose;
					var dialog;
					if (event.swapnodialog) {
						dialog = ui.dialog;
						event.swapnodialog(dialog, list);
						delete event.swapnodialog;
					} else {
						var str = '选择角色';
						if (_status.brawl && _status.brawl.chooseCharacterStr) {
							str = _status.brawl.chooseCharacterStr;
						}
						dialog = ui.create.dialog(str, 'hidden', [list, 'characterx']);
						if (!_status.brawl || !_status.brawl.noAddSetting) {
							if (get.config('change_identity')) {
								addSetting(dialog);
							}
						}
					}
					if (game.me.special_identity) {
						dialog.setCaption('选择角色（' + get.translation(game.me.special_identity) + '）');
						game.me.node.identity.firstChild.innerHTML = get.translation(game.me.special_identity + '_bg');
					} else {
						dialog.setCaption('选择角色');
						game.me.setIdentity();
					}
					if (!event.chosen.length) {
						game.me.chooseButton(dialog, true).set('onfree', true).selectButton = function () {
							if (_status.brawl && _status.brawl.doubleCharacter) return 2;
							return get.config('double_character') ? 2 : 1
						};
					} else {
						lib.init.onfree();
					}
					ui.create.cheat = function () {
						_status.createControl = ui.cheat2;
						ui.cheat = ui.create.control('更换', function () {
							if (ui.cheat2 && ui.cheat2.dialog == _status.event.dialog) {
								return;
							}
							if (game.changeCoin) {
								game.changeCoin(-3);
							}
							if (game.zhu != game.me) {
								event.list.randomSort();
								if (_status.brawl && _status.brawl.chooseCharacter) {
									list = _status.brawl.chooseCharacter(event.list, num);
									if (list === false || list === 'nozhu') {
										list = event.list.slice(0, num);
									}
								} else {
									list = event.list.slice(0, num);
								}
							} else {
								list2.sort(lib.sort.character);
								list3.randomSort();
								if (_status.brawl && _status.brawl.chooseCharacter) {
									list = _status.brawl.chooseCharacter(list2, list3, num);
									if (list === false) {
										list = list2.concat(list3.slice(0, num));
									} else if (list === 'nozhu') {
										event.list.randomSort();
										list = event.list.slice(0, num);
									}
								} else {
									list = list2.concat(list3.slice(0, num));
								}
							}
							var buttons = ui.create.div('.buttons');
							var node = _status.event.dialog.buttons[0].parentNode;
							_status.event.dialog.buttons = ui.create.buttons(list, 'characterx', buttons);
							_status.event.dialog.content.insertBefore(buttons, node);
							buttons.animate('start');
							node.remove();
							game.uncheck();
							game.check();
						});
						delete _status.createControl;
					};
					if (lib.onfree) {
						lib.onfree.push(function () {
							event.dialogxx = ui.create.characterDialog('heightset');
							if (ui.cheat2) {
								ui.cheat2.animate('controlpressdownx', 500);
								ui.cheat2.classList.remove('disabled');
							}
						});
					} else {
						event.dialogxx = ui.create.characterDialog('heightset');
					}

					ui.create.cheat2 = function () {
						ui.cheat2 = ui.create.control('自由选将', function () {
							if (this.dialog == _status.event.dialog) {
								if (game.changeCoin) {
									game.changeCoin(50);
								}
								this.dialog.close();
								_status.event.dialog = this.backup;
								this.backup.open();
								delete this.backup;
								game.uncheck();
								game.check();
								if (ui.cheat) {
									ui.cheat.animate('controlpressdownx', 500);
									ui.cheat.classList.remove('disabled');
								}
							} else {
								if (game.changeCoin) {
									game.changeCoin(-10);
								}
								this.backup = _status.event.dialog;
								_status.event.dialog.close();
								_status.event.dialog = _status.event.parent.dialogxx;
								this.dialog = _status.event.dialog;
								this.dialog.open();
								game.uncheck();
								game.check();
								if (ui.cheat) {
									ui.cheat.classList.add('disabled');
								}
							}
						});
						if (lib.onfree) {
							ui.cheat2.classList.add('disabled');
						}
					}
					if (!_status.brawl || !_status.brawl.chooseCharacterFixed) {
						if (!ui.cheat && get.config('change_choice'))
							ui.create.cheat();
						if (!ui.cheat2 && get.config('free_choose'))
							ui.create.cheat2();
					}
					"step 1"
					if (ui.cheat) {
						ui.cheat.close();
						delete ui.cheat;
					}
					if (ui.cheat2) {
						ui.cheat2.close();
						delete ui.cheat2;
					}
					if (event.chosen.length) {
						event.choosed = event.chosen;
					} else if (event.modchosen) {
						if (event.modchosen[0] == 'random') event.modchosen[0] = result.buttons[0].link;
						else event.modchosen[1] = result.buttons[0].link;
						event.choosed = event.modchosen;
					} else if (result.buttons.length == 2) {
						event.choosed = [result.buttons[0].link, result.buttons[1].link];
						game.addRecentCharacter(result.buttons[0].link, result.buttons[1].link);
					} else {
						event.choosed = [result.buttons[0].link];
						game.addRecentCharacter(result.buttons[0].link);
					}
					var name = event.choosed[0];
					if (get.is.double(name)) {
						game.me._groupChosen = true;
						game.me.chooseControl(get.is.double(name, true)).set('prompt', '请选择你的势力');
					} else if (lib.character[name][1] == 'shen' && !lib.character[name][4].contains('hiddenSkill') && get.config('choose_group')) {
						var list = lib.group.slice(0);
						list.remove('shen');
						game.me.chooseControl(list).set('prompt', '请选择神武将的势力');
					}
					"step 2"
					event.group = result.control || false;
					if (event.choosed.length == 2) {
						game.me.init(event.choosed[0], event.choosed[1]);
					} else {
						game.me.init(event.choosed[0]);
					}
					event.list.remove(get.sourceCharacter(game.me.name1));
					event.list.remove(get.sourceCharacter(game.me.name2));
					for (var i = 0; i < game.players.length; i++) {
						if (game.players[i] != game.me) {
							event.list.randomSort();
							event.ai(game.players[i], event.list.splice(0, get.config('choice_' + game.players[i].identity)), null, event.list)
						}
					}
					"step 3"
					if (event.group) {
						game.me.group = event.group;
						game.me.node.name.dataset.nature = get.groupnature(game.me.group);
						game.me.update();
					}
					for (var i = 0; i < game.players.length; i++) {
						_status.characterlist.remove(game.players[i].name);
						_status.characterlist.remove(game.players[i].name1);
						_status.characterlist.remove(game.players[i].name2);
					}
					"step 4"
					setTimeout(function () {
						ui.arena.classList.remove('choose-character');
					}, 500);
				});
			},
			chooseCharacterOL: function () {
				var next = game.createEvent('chooseCharacter', false);
				next.setContent(function () {
					"step 0"
					ui.arena.classList.add('choose-character');
					var i;
					var identityList;
					identityList = lib.config.mode_config.identity.identity[game.players.length - 2].slice(0);
					identityList.randomSort();
					for (i = 0; i < game.players.length; i++) {
						game.players[i].identity = identityList[i];
						game.players[i].setIdentity('cai');
						game.players[i].node.identity.classList.add('guessing');
						if (identityList[i] == 'zhu') {
							game.zhu = game.players[i];
						}
						game.players[i].identityShown = false;
					}
					game.me.setIdentity();
					game.me.node.identity.classList.remove('guessing');

					for (var i = 0; i < game.players.length; i++) {
						game.players[i].send(function (zhu, zhuid, me, identity) {
							for (var i in lib.playerOL) {
								lib.playerOL[i].setIdentity('cai');
								lib.playerOL[i].node.identity.classList.add('guessing');
							}
							me.setIdentity(identity);
							me.node.identity.classList.remove('guessing');
							ui.arena.classList.add('choose-character');
						}, game.zhu, game.zhu.identity, game.players[i], game.players[i].identity);
					}

					var list;
					var list2 = [];
					var list3 = [];
					var list4 = [];
					event.list = [];
					event.list2 = [];

					var libCharacter = {};
					for (var i = 0; i < lib.configOL.characterPack.length; i++) {
						var pack = lib.characterPack[lib.configOL.characterPack[i]];
						for (var j in pack) {
							if (j == 'zuoci') continue;
							if (lib.character[j]) libCharacter[j] = pack[j];
						}
					}
					for (i in lib.characterReplace) {
						var ix = lib.characterReplace[i];
						for (var j = 0; j < ix.length; j++) {
							if (!libCharacter[ix[j]] || lib.filter.characterDisabled(ix[j])) ix.splice(j--, 1);
						}
						if (ix.length) {
							event.list.push(i);
							event.list2.push(i);
							list4.addArray(ix);
							var bool = false;
							(bool ? list2 : list3).push(i);
						}
					}
					game.broadcast(function (list) {
						for (var i in lib.characterReplace) {
							var ix = lib.characterReplace[i];
							for (var j = 0; j < ix.length; j++) {
								if (!list.contains(ix[j])) ix.splice(j--, 1);
							}
						}
					}, list4);
					for (i in libCharacter) {
						if (list4.contains(i)) continue;
						if (lib.filter.characterDisabled(i, libCharacter)) continue;
						event.list.push(i);
						event.list2.push(i);
						list4.push(i);
						list3.push(i);
					}
					_status.characterlist = list4.slice(0);
					list2.sort(lib.sort.character);
					list = list2.concat(list3.randomGets(5));
					// var next = game.zhu.chooseButton(true);
					// next.set('selectButton', (lib.configOL.double_character ? 2 : 1));
					// next.set('createDialog', ['选择角色', [list, 'characterx']]);
					// next.set('callback', function (player, result) {
					//     player.init(result.links[0], result.links[1]);
					// });
					// next.set('ai', function (button) {
					//     return Math.random();
					// });
					"step 1"
					// if (game.me != game.zhu) {
					//     game.zhu.init(result.links[0], result.links[1])
					// }
					// event.list.remove(get.sourceCharacter(game.zhu.name1));
					// event.list.remove(get.sourceCharacter(game.zhu.name2));
					// event.list2.remove(get.sourceCharacter(game.zhu.name1));
					// event.list2.remove(get.sourceCharacter(game.zhu.name2));

					// game.broadcast(function (zhu, name, name2, addMaxHp) {
					//     if (game.zhu != game.me) {
					//         zhu.init(name, name2);
					//     }
					//     if (addMaxHp) {
					//         zhu.maxHp++;
					//         zhu.hp++;
					//         zhu.update();
					//     }
					// }, game.zhu, result.links[0], result.links[1], game.players.length > 4);

					// if (game.zhu.group == 'shen' && !game.zhu.isUnseen(0)) {
					//     var list = ['wei', 'shu', 'wu', 'qun', 'jin', 'key'];
					//     for (var i = 0; i < list.length; i++) {
					//         if (!lib.group.contains(list[i])) list.splice(i--, 1);
					//         else list[i] = ['', '', 'group_' + list[i]];
					//     }
					//     game.zhu.chooseButton(['请选择神武将的势力', [list, 'vcard']], true).set('ai', function () {
					//         return Math.random();
					//     });
					// } else if (get.is.double(game.zhu.name1)) {
					//     game.zhu._groupChosen = true;
					//     var list = get.is.double(game.zhu.name1, true);
					//     for (var i = 0; i < list.length; i++) {
					//         if (!lib.group.contains(list[i])) list.splice(i--, 1);
					//         else list[i] = ['', '', 'group_' + list[i]];
					//     }
					//     game.zhu.chooseButton(['请选择你的势力', [list, 'vcard']], true).set('ai', function () {
					//         return Math.random();
					//     });
					// } else event.goto(3);
					"step 2"
					// var name = result.links[0][2].slice(6);
					// game.zhu.changeGroup(name);
					"step 3"
					var list = [];
					var selectButton = (lib.configOL.double_character ? 2 : 1);

					var num, num2 = 0;
					num = Math.floor(event.list.length / game.players.length);
					if (num > 5) {
						num = 5;
					}
					num2 = event.list.length - num * game.players.length;
					if (num2 > 2) {
						num2 = 2;
					}
					for (var i = 0; i < game.players.length; i++) {
						var num3 = 0;
						if (game.players[i].identity == 'nei') {
							num3 = num2;
						}
						var str = '选择角色';
						list.push([game.players[i],
						[str, [event.list.randomRemove(num + num3), 'characterx']], selectButton, true
						]);
					}
					game.me.chooseButtonOL(list, function (player, result) {
						if (game.online || player == game.me) player.init(result.links[0], result.links[1]);
					});
					"step 4"
					var shen = [];
					for (var i in result) {
						if (result[i] && result[i].links) {
							for (var j = 0; j < result[i].links.length; j++) {
								event.list2.remove(get.sourceCharacter(result[i].links[j]));
							}
						}
					}
					for (var i in result) {
						if (result[i] == 'ai') {
							result[i] = event.list2.randomRemove(lib.configOL.double_character ? 2 : 1);
							for (var j = 0; j < result[i].length; j++) {
								var listx = lib.characterReplace[result[i][j]];
								if (listx && listx.length) result[i][j] = listx.randomGet();
							}
						} else {
							result[i] = result[i].links;
						}
						if (get.is.double(result[i][0]) ||
							lib.character[result[i][0]] && lib.character[result[i][0]][1] == 'shen' && !lib.character[result[i][0]][4].contains('hiddenSkill')) shen.push(lib.playerOL[i]);
					}
					event.result2 = result;
					if (shen.length) {
						var list = ['wei', 'shu', 'wu', 'qun', 'jin', 'key'];
						for (var i = 0; i < list.length; i++) {
							if (!lib.group.contains(list[i])) list.splice(i--, 1);
							else list[i] = ['', '', 'group_' + list[i]];
						}
						for (var i = 0; i < shen.length; i++) {
							if (get.is.double(result[shen[i].playerid][0])) {
								shen[i]._groupChosen = true;
								shen[i] = [shen[i],
								['请选择你的势力', [get.is.double(result[shen[i].playerid][0], true).map(function (i) {
									return ['', '', 'group_' + i];
								}), 'vcard']], 1, true
								];
							} else shen[i] = [shen[i],
							['请选择神武将的势力', [list, 'vcard']], 1, true
							];
						}
						game.me.chooseButtonOL(shen, function (player, result) {
							if (player == game.me) player.changeGroup(result.links[0][2].slice(6), false, false);
						}).set('switchToAuto', function () {
							_status.event.result = 'ai';
						}).set('processAI', function () {
							return {
								bool: true,
								links: [_status.event.dialog.buttons.randomGet().link],
							}
						});
					} else event._result = {};
					"step 5"
					if (!result) result = {};
					for (var i in result) {
						if (result[i] && result[i].links) result[i] = result[i].links[0][2].slice(6);
						else if (result[i] == 'ai') result[i] = function () {
							var player = lib.playerOL[i];
							var list = ['wei', 'shu', 'wu', 'qun', 'jin', 'key'];
							for (var ix = 0; ix < list.length; ix++) {
								if (!lib.group.contains(list[ix])) list.splice(ix--, 1);
							}
							if (_status.mode != 'zhong' && game.zhu && game.zhu.group) {
								if (['re_zhangjiao', 'liubei', 're_liubei', 'caocao', 're_caocao', 'sunquan', 're_sunquan', 'zhangjiao', 'sp_zhangjiao', 'caopi', 're_caopi', 'liuchen', 'caorui', 'sunliang', 'sunxiu', 'sunce', 're_sunben', 'ol_liushan', 're_liushan', 'key_akane', 'dongzhuo', 're_dongzhuo', 'ol_dongzhuo', 'jin_simashi', 'caomao'].contains(game.zhu.name)) return game.zhu.group;
								if (game.zhu.name == 'yl_yuanshu') {
									if (player.identity == 'zhong') list.remove('qun');
									else return 'qun';
								}
								if (['sunhao', 'xin_yuanshao', 're_yuanshao', 're_sunce', 'ol_yuanshao', 'yuanshu', 'jin_simazhao', 'liubian'].contains(game.zhu.name)) {
									if (player.identity != 'zhong') list.remove(game.zhu.group);
									else return game.zhu.group;
								}
							}
							return list.randomGet();
						}();
					}
					var result2 = event.result2;
					game.broadcast(function (result, result2) {
						for (var i in result) {
							if (!lib.playerOL[i].name) {
								lib.playerOL[i].init(result[i][0], result[i][1]);
							}
							if (result2[i] && result2[i].length) lib.playerOL[i].changeGroup(result2[i], false, false);
						}
						setTimeout(function () {
							ui.arena.classList.remove('choose-character');
						}, 500);
					}, result2, result);

					for (var i in result2) {
						if (!lib.playerOL[i].name) {
							lib.playerOL[i].init(result2[i][0], result2[i][1]);
						}
						if (result[i] && result[i].length) lib.playerOL[i].changeGroup(result[i], false, false);
					}

					for (var i = 0; i < game.players.length; i++) {
						_status.characterlist.remove(game.players[i].name);
						_status.characterlist.remove(game.players[i].name1);
						_status.characterlist.remove(game.players[i].name2);
					}
					setTimeout(function () {
						ui.arena.classList.remove('choose-character');
					}, 500);
				});
			}
		},
		translate: {
			zhu: "主",
			zhong: "忠",
			nei: "内",
			fan: "反",
			enemy: "敌",
			friend: "友",
			cai: "猜",
			cai2: "猜",
			zhu2: "主公",
			zhong2: "忠臣",
			nei2: "内奸",
			fan2: "反贼",
			random2: "随机",
			enemy2: "敌方",
			friend2: "友方",
			th_anger: "怒气值",
			ai_strategy_1: '均衡',
			ai_strategy_2: '偏反',
			ai_strategy_3: '偏主',
			ai_strategy_4: '酱油',
			ai_strategy_5: '天使',
			ai_strategy_6: '仇主',
			_chongzhen: '重振',
			_useAnger: '怒气',
			_letMeSee: '洞察',
			_mingjun: '明君',
			identity_card: "身份牌"
		},
		element: {
			content: {
				gameDraw: function () {
					"step 0"
					if (_status.brawl && _status.brawl.noGameDraw) {
						event.finish();
						return;
					}
					var end = player;
					var numx = num;
					do {
						if (typeof num == 'function') {
							numx = num(player);
						}
						if (player.getTopCards) player.directgain(player.getTopCards(numx));
						else player.directgain(get.cards(numx));
						if (player.singleHp === true && get.mode() != 'guozhan' && (lib.config.mode != 'doudizhu' || _status.mode != 'online')) {
							player.doubleDraw();
						}
						player._start_cards = player.getCards('h');
						player = player.next;
					}
					while (player != end);
					event.changeCard = get.config('change_card');
					if (_status.connectMode || (lib.config.mode == 'doudizhu' && _status.mode == 'online') || lib.config.mode != 'identity' && lib.config.mode != 'guozhan' && lib.config.mode != 'doudizhu' && lib.config.mode != 'th_mougong') {
						event.changeCard = 'disabled';
					}
					"step 1"
					if (event.changeCard != 'disabled' && !_status.auto) {
						event.dialog = ui.create.dialog('是否使用手气卡？');
						ui.create.confirm('oc');
						event.custom.replace.confirm = function (bool) {
							_status.event.bool = bool;
							game.resume();
						}
					}
					else {
						event.finish();
					}
					"step 2"
					if (event.changeCard == 'once') {
						event.changeCard = 'disabled';
					}
					else if (event.changeCard == 'twice') {
						event.changeCard = 'once';
					}
					else if (event.changeCard == 'disabled') {
						event.bool = false;
						return;
					}
					_status.imchoosing = true;
					event.switchToAuto = function () {
						_status.event.bool = false;
						game.resume();
					}
					game.pause();
					"step 3"
					_status.imchoosing = false;
					if (event.bool) {
						if (game.changeCoin) {
							game.changeCoin(-3);
						}
						var hs = game.me.getCards('h');
						game.addVideo('lose', game.me, [get.cardsInfo(hs), [], [], []]);
						for (var i = 0; i < hs.length; i++) {
							hs[i].discard(false);
						}
						game.me.directgain(get.cards(hs.length));
						event.goto(2);
					}
					else {
						if (event.dialog) event.dialog.close();
						if (ui.confirm) ui.confirm.close();
						game.me._start_cards = game.me.getCards('h');
						event.finish();
					}
				},
			},
			player: {
				hasZhuSkill: function (skill, player) {
					if (!this.hasSkill(skill)) return false;
					var mode = get.mode();
					if (mode == 'identity' || (mode == 'versus' && (_status.mode == 'four' || _status.mode == 'guandu'))) {
						if (mode != 'identity') {
							if (player && this.side != player.side) return false;
						}
						if (_status.mode == 'purple') {
							if (player && this.identity.slice(0, 1) != player.identity.slice(0, 1)) return false;
						}
						if (this.isZhu == true) return true;
						for (var i in this.storage) {
							if (i.indexOf('zhuSkill_') == 0 && this.storage[i].contains(skill)) return true;
						}
					}
					else if (mode == 'th_mougong') {
						if (this.identity != 'zhu') return false;
						if (this.identityShown == false) return false;
						return true;
					}
					return false;
				},
				$dieAfter: function () {
					if (_status.video) return;
					if (!this.node.dieidentity) {
						var str = get.translation(this.identity + '2');
						var node = ui.create.div('.damage.dieidentity', str, this);
						ui.refresh(node);
						node.style.opacity = 1;
						this.node.dieidentity = node;
					}
					var trans = this.style.transform;
					if (trans) {
						if (trans.indexOf('rotateY') != -1) {
							this.node.dieidentity.style.transform = 'rotateY(180deg)';
						} else if (trans.indexOf('rotateX') != -1) {
							this.node.dieidentity.style.transform = 'rotateX(180deg)';
						} else {
							this.node.dieidentity.style.transform = '';
						}
					} else {
						this.node.dieidentity.style.transform = '';
					}
				},
				dieAfter2: function (source) {

				},
				dieAfter: function (source) {
					if (!this.identityShown) {
						game.broadcastAll(function (player, identity, identity2) {
							player.setIdentity(player.identity);
							player.identityShown = true;
							player.node.identity.classList.remove('guessing');
							if (identity) {
								player.node.identity.firstChild.innerHTML = get.translation(identity + '_bg');
								game.log(player, '的身份是', '#g' + get.translation(identity));
							} else {
								game.log(player, '的身份是', '#g' + get.translation(identity2 + '2'));
							}
						}, this, this.special_identity, this.identity);
					}
					game.checkResult();
					if (game.zhu && game.zhu.isZhu) {
						if (get.population('zhong') + get.population('nei') == 0 ||
							get.population('zhong') + get.population('fan') == 0) {
							game.broadcastAll(function () {
								game.showIdentity();
								if (game.zhu && game.zhu.isAlive() && get.population('nei') == 1 && get.config('nei_fullscreenpop')) {
									game.zhu.$fullscreenpop('<span style="font-family:fzhtk"><span data-nature="fire">SUDDEN</span> <span data-nature="thunder">DEATH</span></span>');
									setTimeout(function () {
										game.zhu.$fullscreenpop('<span style="font-family:fzhtk"><span data-nature="soil">GO!</span></span>');
									}, 1000);
								}
							});
						}
					}
					if (this == game.zhong) {
						game.broadcastAll(function (player) {
							game.zhu = player;
							game.zhu.identityShown = true;
							game.zhu.ai.shown = 1;
							game.zhu.setIdentity();
							game.zhu.isZhu = true;
							game.zhu.node.identity.classList.remove('guessing');
							if (lib.config.animation && !lib.config.low_performance) game.zhu.$legend();
							delete game.zhong;
							if (_status.clickingidentity && _status.clickingidentity[0] == game.zhu) {
								for (var i = 0; i < _status.clickingidentity[1].length; i++) {
									_status.clickingidentity[1][i].delete();
									_status.clickingidentity[1][i].style.transform = '';
								}
								delete _status.clickingidentity;
							}
						}, game.zhu);
						game.delay(2);
						game.zhu.playerfocus(1000);
						_status.event.trigger('zhuUpdate');
					}

					if (!_status.over) {
						var giveup;
						if (get.population('fan') + get.population('nei') == 1) {
							for (var i = 0; i < game.players.length; i++) {
								if (game.players[i].identity == 'fan' || game.players[i].identity == 'nei') {
									giveup = game.players[i];
									break;
								}
							}
						} else if (get.population('zhong') + get.population('nei') == 0) {
							giveup = game.zhu;
						}
						if (giveup) {
							giveup.showGiveup();
						}
					}

				},
				logAi: function (targets, card) {
					if (this.ai.shown == 1 || this.isMad()) return;
					if (typeof targets == 'number') {
						this.ai.shown += targets;
					} else {
						var effect = 0,
							c, shown;
						var info = get.info(card);
						if (info.ai && info.ai.expose) {
							if (_status.event.name == '_wuxie') {
								if (_status.event.source && _status.event.source.ai.shown) {
									this.ai.shown += 0.2;
								}
							} else {
								this.ai.shown += info.ai.expose;
							}
						}
						if (targets.length > 0) {
							for (var i = 0; i < targets.length; i++) {
								shown = Math.abs(targets[i].ai.shown);
								if (shown < 0.2 || targets[i].identity == 'nei') c = 0;
								else if (shown < 0.4) c = 0.5;
								else if (shown < 0.6) c = 0.8;
								else c = 1;
								var eff = get.effect(targets[i], card, this);
								effect += eff * c;
								if (eff == 0 && shown == 0 && ['zhong'].contains(this.identity) && targets[i] != this) {
									effect += 0.1;
								}
							}
						}
						if (effect > 0) {
							if (effect < 1) c = 0.5;
							else c = 1;
							if (targets.length == 1 && targets[0] == this);
							else if (targets.length == 1) this.ai.shown += 0.2 * c;
							else this.ai.shown += 0.1 * c;
						} else if (effect < 0 && this == game.me && ['nei', 'rYe', 'bYe'].contains(game.me.identity)) {
							if (targets.length == 1 && targets[0] == this);
							else if (targets.length == 1) this.ai.shown -= 0.2;
							else this.ai.shown -= 0.1;
						}
					}
					if (this != game.me) this.ai.shown *= 2;
					if (this.ai.shown > 0.95) this.ai.shown = 0.95;
					if (this.ai.shown < -0.5) this.ai.shown = -0.5;

					var marknow = (!_status.connectMode && this != game.me && get.config('auto_mark_identity') && this.ai.identity_mark != 'finished');
					// if(true){
					if (marknow && _status.clickingidentity && _status.clickingidentity[0] == this) {
						for (var i = 0; i < _status.clickingidentity[1].length; i++) {
							_status.clickingidentity[1][i].delete();
							_status.clickingidentity[1][i].style.transform = '';
						}
						delete _status.clickingidentity;
					}
					if (!Array.isArray(targets)) {
						targets = [];
					}
					var effect = 0,
						c, shown;
					var zhu = game.zhu;
					if (_status.mode == 'zhong' && !game.zhu.isZhu) {
						zhu = game.zhong;
					}
					if (targets.length == 1 && targets[0] == this) {
						effect = 0;
					} else if (this.identity != 'nei') {
						if (this.ai.shown > 0) {
							if (this.identity == 'fan') {
								effect = -1;
							} else {
								effect = 1;
							}
						}
					} else if (targets.length > 0) {
						for (var i = 0; i < targets.length; i++) {
							shown = Math.abs(targets[i].ai.shown);
							if (shown < 0.2 || targets[i].identity == 'nei') c = 0;
							else if (shown < 0.4) c = 0.5;
							else if (shown < 0.6) c = 0.8;
							else c = 1;
							effect += get.effect(targets[i], card, this, zhu) * c;
						}
					}
					if (this.identity == 'nei') {
						if (effect > 0) {
							if (this.ai.identity_mark == 'fan') {
								if (marknow) this.setIdentity();
								this.ai.identity_mark = 'finished';
							} else {
								if (marknow) this.setIdentity('zhong');
								this.ai.identity_mark = 'zhong';
							}
						} else if (effect < 0 && get.population('fan') > 0) {
							if (this.ai.identity_mark == 'zhong') {
								if (marknow) this.setIdentity();
								this.ai.identity_mark = 'finished';
							} else {
								if (marknow) this.setIdentity('fan');
								this.ai.identity_mark = 'fan';
							}
						}
					} else if (marknow) {
						if (effect > 0 && this.identity != 'fan') {
							this.setIdentity('zhong');
							this.ai.identity_mark = 'finished';
						} else if (effect < 0 && this.identity == 'fan') {
							this.setIdentity('fan');
							this.ai.identity_mark = 'finished';
						}
					}
					// }

				},
				showIdentity: function () {
					this.node.identity.classList.remove('guessing');
					this.identityShown = true;
					this.ai.shown = 1;
					this.setIdentity();
					if (this.special_identity) {
						this.node.identity.firstChild.innerHTML = get.translation(this.special_identity + '_bg');
					}
					if (this.identity == 'zhu') {
						this.isZhu = true;
					} else {
						delete this.isZhu;
					}
					if (_status.clickingidentity) {
						for (var i = 0; i < _status.clickingidentity[1].length; i++) {
							_status.clickingidentity[1][i].delete();
							_status.clickingidentity[1][i].style.transform = '';
						}
						delete _status.clickingidentity;
					}
				}
			}
		},
		get: {
			rawAttitude: function (from, to) {
				var x = 0,
					num = 0,
					temp, i;
				if (_status.ai.customAttitude) {
					for (i = 0; i < _status.ai.customAttitude.length; i++) {
						temp = _status.ai.customAttitude[i](from, to);
						if (temp != undefined) {
							x += temp;
							num++;
						}
					}
				}
				if (num) {
					return x / num;
				}
				var difficulty = 0;
				// var eff = 1;
				// if ((from.storage.th_weizhuang || to.storage.th_weizhuang) && from != to) eff = -1;
				if (to == game.me) difficulty = 2 - get.difficulty();
				if (from == to || to.identityShown || (from.storage.dongcha == to) || to.identityShown || from.storage.zhibi && from.storage.zhibi.contains(to)) {  //定义对目标身份已知
					return get.realAttitude(from, to) + difficulty * 1.5;
				} else {
					if (from.identity == 'zhong' && to.ai.shown == 0 && from.ai.tempIgnore &&      //定义忠臣不知道其他人身份（只知道主公）
						!from.ai.tempIgnore.contains(to)) {
						for (var i = 0; i < game.players.length; i++) {
							if (game.players[i].ai.shown == 0 && game.players[i].identity == 'fan') {
								return -0.1 + difficulty * 1.5;
							}
						}
					}
					var aishown = to.ai.shown;
					if (to.identity == 'nei' && to.ai.shown < 1 && (to.ai.identity_mark == 'fan' || to.ai.identity_mark == 'zhong')) {  //未跳明的内奸，身份暴露为0.5
						aishown = 0.5;
					} else if (aishown == 0 && to.identity != 'fan' && to.identity != 'zhu') {
						var fanshown = true;
						for (var i = 0; i < game.players.length; i++) {
							if (game.players[i].identity == 'fan' && game.players[i].ai.shown == 0 && game.players[i] != from) {
								fanshown = false;
								break;
							}
						}
						if (fanshown) aishown = 0.3;
					}
					if (to.ai.shown == 0) {
						if ((!from.storage.zhibi || from.storage.zhibi && !from.storage.zhibi.contains(to)) && (!from.storage.seen || from.storage.seen && !from.storage.seen[to.name])) return -1;
					}
					switch (from.identity) {
						case 'zhu': case 'zhong':
							if (from.storage.seen && from.storage.seen[to.name] && from.storage.seen[to.name] == 'enemy') return get.realAttitude(from, to) + difficulty * 1.5;
							else if (to.ai.shown < 1) {
								if (from.storage.seen && from.storage.seen[to.name] && from.storage.seen[to.name] == 'friend') {
									if (game.getDeathIdentity().zhong || game.getDeathIdentity.nei) return get.realAttitude(from, to) + difficulty * 1.5;
									else return get.realAttitude(from, to) * aishown + difficulty * 1.5;
								}
							}
						case 'fan':
							if (from.storage.seen && from.storage.seen[to.name] && from.storage.seen[to.name] == 'enemy') {
								if (from.storage.th_weizhuang || to.storage.th_weizhuang) return -(get.realAttitude(from, to) + difficulty * 1.5);
								else return get.realAttitude(from, to) + difficulty * 1.5;
							}
							else if (to.ai.shown < 1) {
								if (from.storage.seen && from.storage.seen[to.name] && from.storage.seen[to.name] == 'friend') {
									if (game.getDeathIdentity.nei) return get.realAttitude(from, to) + difficulty * 1.5;
									else return get.realAttitude(from, to) * aishown + difficulty * 1.5;
								}
							}
					}
					return get.realAttitude(from, to) * aishown + difficulty * 1.5;
				}
			},
			realAttitude: function (from, to) {
				if (!game.zhu) {
					if (from.identity == 'nei' || to.identity == 'nei') return -1;
					if (from.identity == to.identity) return 6;
					return -6;
				}
				var situation = get.situation();
				var identity = from.identity;
				var identity2 = to.identity;
				if (identity2 == 'zhu' && !to.isZhu) {
					identity2 = 'zhong';
					if (from == to) return 10;
				}
				if (from != to && to.identity == 'nei' && to.ai.shown < 1 && (to.ai.identity_mark == 'fan' || to.ai.identity_mark == 'zhong')) {
					identity2 = to.ai.identity_mark;
				}
				if (from.identity != 'nei' && from != to && get.population('fan') == 0 && identity2 == 'zhong') {
					for (var i = 0; i < game.players.length; i++) {
						if (game.players[i].identity == 'nei' &&
							game.players[i].ai.identity_mark == 'zhong' &&
							game.players[i].ai.shown < 1) {
							identity2 = 'nei';
							break;
						}
					}
				}
				switch (identity) {
					case 'zhu':
						switch (identity2) {
							case 'zhu':
								return 10;
							case 'zhong':
								return 6;
							case 'nei':
								if (game.players.length == 2) return -10;
								if (to.identity == 'zhong') return 0;
								if (get.population('fan') == 0) {
									if (to.ai.identity_mark == 'zhong' && to.ai.shown < 1) return 0;
									return -0.5;
								}
								if (to.ai.sizhong && to.ai.shown < 1) return 6;
								if (get.population('fan') == 1 && get.population('nei') == 1 && game.players.length == 3) {
									var fan;
									for (var i = 0; i < game.players.length; i++) {
										if (game.players[i].identity == 'fan') {
											fan = game.players[i];
											break;
										}
									}
									if (fan) {
										if (to.hp > 1 && to.hp > fan.hp && to.countCards('he') > fan.countCards('he')) {
											return -3;
										}
									}
									return 0;
								}
								if (situation > 1) return 0;
								return Math.min(3, get.population('fan'));
							case 'fan':
								if (get.population('fan') == 1 && get.population('nei') == 1 && game.players.length == 3) {
									var nei;
									for (var i = 0; i < game.players.length; i++) {
										if (game.players[i].identity == 'nei') {
											nei = game.players[i];
											break;
										}
									}
									if (nei) {
										if (nei.hp > 1 && nei.hp > to.hp && nei.countCards('he') > to.countCards('he')) {
											return 0;
										}
									}
									return -3;
								}
								return -4;
						}
						break;
					case 'zhong':
						switch (identity2) {
							case 'zhu':
								return 10;
							case 'zhong':
							case 'mingzhong':
								return 4;
							case 'nei':
								if (get.population('fan') == 0) return -2;
								if (to.ai.sizhong && to.ai.shown < 1) return 6;
								return Math.min(3, -situation);
							case 'fan':
								return -8;
						}
						break;
					case 'nei':
						if (identity2 == 'zhu' && game.players.length == 2) return -10;
						if (from != to && identity2 != 'zhu' && game.players.length == 3) return -8;
						var strategy = get.aiStrategy();
						if (strategy == 4) {
							if (from == to) return 10;
							return 0;
						}
						var num;
						switch (identity2) {
							case 'zhu':
								if (strategy == 6) return -1;
								if (strategy == 5) return 10;
								if (to.hp <= 0) return 10;
								if (get.population('fan') == 1) {
									var fan;
									for (var i = 0; i < game.players.length; i++) {
										if (game.players[i].identity == 'fan') {
											fan = game.players[i];
											break;
										}
									}
									if (fan) {
										if (to.hp > 1 && to.hp > fan.hp && to.countCards('he') > fan.countCards('he')) {
											return -3;
										}
									}
									return 0;
								} else {
									if (situation > 1 || get.population('fan') == 0) num = 0;
									else num = get.population('fan') + Math.max(0, 3 - game.zhu.hp);
								}
								if (strategy == 2) num--;
								if (strategy == 3) num++;
								return num;
							case 'zhong':
								if (strategy == 5) return Math.min(0, -situation);
								if (strategy == 6) return Math.max(-1, -situation);
								if (get.population('fan') == 0) num = -5;
								else if (situation <= 0) num = 0;
								else if (game.zhu && game.zhu.hp < 2) num = 0;
								else if (game.zhu && game.zhu.hp == 2) num = -1;
								else if (game.zhu && game.zhu.hp <= 2 && situation > 1) num = -1;
								else num = -2;
								if (situation < 2) {
									num = 4;
								}
								if (strategy == 2) num--;
								if (strategy == 3) num++;
								return num;
							case 'mingzhong':
								if (strategy == 5) return Math.min(0, -situation);
								if (strategy == 6) return Math.max(-1, -situation);
								if (get.population('fan') == 0) num = -5;
								else if (situation <= 0) num = 0;
								else num = -3;
								if (strategy == 2) num--;
								if (strategy == 3) num++;
								return num;
							case 'nei':
								if (from == to) return 10;
								if (from.ai.friend.contains(to)) return 5;
								if (get.population('fan') + get.population('zhong') > 0) return 0;
								return -5;
							case 'fan':
								if (strategy == 5) return Math.max(-1, situation);
								if (strategy == 6) return Math.min(0, situation);
								if ((game.zhu && game.zhu.hp <= 2 && situation < 0) || situation < -1) num = -3;
								else if (situation < 0 || get.population('zhong') + get.population('mingzhong') == 0) num = -2;
								else if ((game.zhu && game.zhu.hp >= 4 && situation > 0) || situation > 1) num = 1;
								else num = 0;
								if (strategy == 2) num++;
								if (strategy == 3) num--;
								return num;
						}
						break;
					case 'fan':
						switch (identity2) {
							case 'zhu':
								if (get.population('nei') > 0) {
									if (situation == 1) return -6;
									if (situation > 1) return -5;
								}
								return -8;
							case 'zhong':
								if (game.zhu.hp >= 3 && to.hp == 1) {
									return -10;
								}
								return -7;
							case 'mingzhong':
								return -5;
							case 'nei':
								if (to.ai.sizhong) return -7;
								if (get.population('fan') == 1) return 0;
								if (get.population('zhong') + get.population('mingzhong') == 0) return -7;
								if (game.zhu && game.zhu.hp <= 2) return -1;
								return Math.min(3, situation);
							case 'fan':
								return 5;
						}
				}
			},
			situation: function (absolute) {
				var i, j, player;
				var zhuzhong = 0,
					total = 0,
					zhu, fan = 0;
				for (i = 0; i < game.players.length; i++) {
					player = game.players[i];
					var php = player.hp;
					if (player.hasSkill('benghuai') && php > 4) {
						php = 4;
					} else if (php > 6) {
						php = 6;
					}
					j = player.countCards('h') + player.countCards('e') * 1.5 + php * 2;
					if (player.identity == 'zhu') {
						zhuzhong += j * 1.2 + 5;
						total += j * 1.2 + 5;
						zhu = j;
					} else if (player.identity == 'zhong' || player.identity == 'mingzhong') {
						zhuzhong += j * 0.8 + 3;
						total += j * 0.8 + 3;
					} else if (player.identity == 'fan') {
						zhuzhong -= j + 4;
						total += j + 4;
						fan += j + 4;
					}
				}
				if (absolute) return zhuzhong;
				var result = parseInt(10 * Math.abs(zhuzhong / total));
				if (zhuzhong < 0) result = -result;
				if (!game.zhong) {
					if (zhu < 12 && fan > 30) result--;
					if (zhu < 6 && fan > 15) result--;
					if (zhu < 4) result--;
				}
				return result;
			},
		},
		skill: {
			_useAnger: {
				audio: true,
				forceaudio: true,
				charlotte: true,
				ruleSkill: true,
				trigger: { player: 'useCard1' },
				filter: function (event, player) {
					if (game.roundNumber == 1) return false;
					if (!player.hasMark('th_anger')) return false;
					var cardName = get.name(event.card);
					if (!_status.mougong_buff.contains(cardName)) return false;
					var marks = player.countMark('th_anger');
					if ((cardName == 'sha' || cardName == 'shan') && marks < 1) return false;
					if ((cardName == 'juedou' || cardName == 'huogong') && marks < 2) return false;
					if (cardName == 'tao' && marks < 3) return false;
					return true;
				},
				prompt2: function (event, player) {
					var str = '你可以消耗';
					var cardName = get.name(event.card);
					if (cardName == 'sha' || cardName == 'shan') str += '1';
					else if (cardName == 'juedou' || cardName == 'huogong') str += '2';
					else if (cardName == 'tao') str += '3';
					str += '点怒气强化' + get.translation(event.card);
					return str;
				},
				check: function (event, player) {
					if (!player.storage.zhibi && !player.storage.seen && !game.hasPlayer(function (current) {
						return current.identityShown == true;
					})) return false;
					var cardName = get.name(event.card);
					if (cardName == 'sha' || cardName == 'juedou' || cardName == 'huogong' || cardName == 'tao') {
						var val = 0;
						game.filterPlayer(function (current) {
							if (event.targets.contains(current)) {
								if (cardName == 'sha' && !current.mayHaveShan()) return;
								if (cardName == 'tao' && current.hp + event.baseDamage + 1 > current.maxHp) return;
								val += get.effect(current, event.card, event.player, player);
							}
						}).length;
						val /= event.targets.length;
						return val > 0;
					}
					var evt = event.getParent(2);
					if (!evt || evt.name != 'sha') return false;
					return evt.shanRequired > 1;
				},
				content: function () {
					var cardName = get.name(trigger.card);
					if (cardName == 'sha') {
						player.popup(cardName, 'fire');
						player.removeMark('th_anger', 1);
						game.log(player, '消耗了1点怒气强化了', trigger.card);
						var map = trigger.customArgs;
						game.filterPlayer2(function (current) {
							var id = current.playerid;
							if (!map[id]) map[id] = {};
							if (typeof map[id].shanRequired == 'number') {
								map[id].shanRequired++;
							}
							else {
								map[id].shanRequired = 2;
							}
						});
						trigger.mougong_shaBuffed = true;
					}
					else if (cardName == 'shan') {
						player.popup(cardName, 'fire');
						player.removeMark('th_anger', 1);
						game.log(player, '消耗了1点怒气强化了', trigger.card);
						var evt = trigger.getParent(2);
						if (evt && evt.name == 'sha') {
							evt.shanRequired--;
						}
					}
					else if (cardName == 'juedou') {
						player.popup(cardName, 'fire');
						player.removeMark('th_anger', 2);
						game.log(player, '消耗了2点怒气强化了', trigger.card);
						if (typeof trigger.th_anger != 'object') trigger.th_anger = {};
						if (typeof trigger.th_anger[trigger.player.playerid] != 'number') trigger.th_anger[trigger.player.playerid] = 0;
						trigger.th_anger[trigger.player.playerid]++;
					}
					else if (cardName == 'huogong') {
						player.popup(cardName, 'fire');
						player.removeMark('th_anger', 2);
						game.log(player, '消耗了2点怒气强化了', trigger.card);
						trigger.baseDamage++;
					}
					else if (cardName == 'tao') {
						player.popup(cardName, 'fire');
						player.removeMark('th_anger', 3);
						game.log(player, '消耗了3点怒气强化了', trigger.card);
						trigger.baseDamage++;
					}
				},
				ai: {
					respondShan: true,
					save: true,
					skillTagFilter: function (player, tag, arg) {
						if (tag == 'respondShan' && !(player.countCards('hs', { name: 'shan' }) > 0 && player.hasMark('th_anger'))) return false;
						if (tag == 'save' && !(player.countCards('hs', { name: 'tao' }) > 0 && player.countMark('th_anger') > 2)) return false;
					}
				}
			},
			th_anger: {
				mark: true,
				intro: {
					content: function (content, player) {
						return '已有' + get.cnNumber(player.storage.th_anger) + '点怒气值';
					}
				}
			},
			_chongzhen: {
				charlotte: true,
				ruleSkill: true,
				skillAnimation: true,
				animationStr: "重振",
				animationColor: "wood",
				trigger: { player: 'dying' },
				forced: true,
				filter: function (event, player) {
					if (!player.storage.th_weizhuang) return false;
					if (game.dead.length || player.countMark('th_anger') < 2) return false;
					return true;
				},
				firstDo: true,
				content: function () {
					'step 0'
					delete player.storage.th_weizhuang;
					game.broadcastAll(function (player) {
						player.showIdentity();
					}, player);
					game.log(player, '的身份是', '#g反贼');
					player.discard(player.getCards('hej'));
					player.markSkill('_chongzhen_chong');
					'step 1'
					player.link(false);
					'step 2'
					player.turnOver(false);
					'step 3'
					player.draw(3);
					'step 4'
					if (player.hp < 2) {
						player.recover(2 - player.hp);
					}
					'step 5'
					player.storage.seen = {};
					for (var i = 0; i < game.players.length; i++) {
						if (game.players[i].storage.seen && game.players[i].storage.seen[player.name]) delete game.players[i].storage.seen[player.name];
					}
				},
				subSkill: {
					chong: {
						mark: true,
						intro: { content: '【重振】已发动' },
					}
				}
			},
			_mingjun: {
				charlotte: true,
				ruleSkill: true,
				skillAnimation: true,
				animationStr: "明君",
				animationColor: "fire",
				trigger: { global: 'dieAfter', player: ['phaseBegin', 'dying'] },
				forced: true,
				filter: function (event, player) {
					if (player.storage.th_mingjun) return false;
					if (player.identity != 'zhu') return false;
					//if (player.identityShown == true) return false;
					if (event.name == 'phase') return game.roundNumber > 2;
					if (event.name == 'die') return game.dead.length >= 2;
					return true;
				},
				firstDo: true,
				content: function () {
					'step 0'
					player.storage.th_mingjun = true;
					game.log(player, '的身份是', '#g主公');
					game.broadcastAll(function (player) {
						player.showIdentity();
					}, player);
					player.markSkill('_mingjun_ming');
					'step 1'
					game.broadcastAll(function (player) {
						game.zhu = player;
						player.isZhu = true;
					}, player);
					'step 2'
					player.recover();
					player.draw();
					'step 3'
					var list = [];
					for (var i = 0; i < player.skills.length; i++) {
						if (lib.skill[player.skills[i]] && lib.skill[player.skills[i]].zhuSkill) {
							list.push(player.skills[i]);
						}
					}
					if (list.length) game.log(player, '重新获得了主公技', '#g【' + get.translation(list) + '】');
				},
				subSkill: {
					ming: {
						mark: true,
						intro: { content: '【明君】已发动' },
					}
				}
			},
			_addAnger: {
				charlotte: true,
				ruleSkill: true,
				forced: true,
				trigger: { player: ['phaseBegin', 'damageEnd'] },
				//init: function (player) { player.storage.zhibi = [] },
				filter: function (event, player) {
					if (!event.player.storage.th_anger) event.player.storage.th_anger = 0;
					return event.player.storage.th_anger < 3;
				},
				content: function () {
					trigger.player.addMark('th_anger');
				}
			},
			_neiTequan: {
				charlotte: true,
				ruleSkill: true,
				trigger: { global: 'gameStart' },
				forced: true,
				popup: false,
				content: function () {
					'step 0'
					if (player.identity != 'nei') event.goto(3);
					'step 1'
					var list = [];
					for (var i = 0; i < game.players.length; i++) {
						if (game.players[i].identity == 'fan') {
							list.push(game.players[i]);
						}
					}
					event.target = list.randomGet();
					if (player == game.me) {
						game.playAudio('skill', '_neiTequan');
						event.target.setIdentity('fan');
						event.target.node.identity.classList.remove('guessing');
						event.target.fanfixed = true;
						if (!player.storage.zhibi) player.storage.zhibi = [];
						player.storage.zhibi.add(event.target);
						player.line(event.target, 'green');
						player.chooseBool('ok', 'cancel2').set('dialog', ui.create.dialog(get.translation(event.target) + '是反贼，是否伪装' + get.translation(event.target) + '的身份？', [
							[event.target.name], 'character'
						], [
							['fan2'], 'vcard'
						])).ai = () => true;
					}
					'step 2'
					if (result.bool) {
						event.target.storage.th_weizhuang = true;
					}
					event.finish();
					'step 3'
					var identityInfo = function (identity) {
						if (identity == 'fan') return '，仔细观察局势，找到其他反贼，击败主公';
						if (identity == 'zhong') return '，仔细观察局势，找到并保护主公';
						if (identity == 'zhu') return '，仔细观察局势，保护自己';
						return '';
					};
					player.chooseControl('ok').set('dialog', ['你是' + get.translation(player.identity + '2') + identityInfo(player.identity), [
						[player.name], 'character'
					], [
						[player.identity + '2'], 'vcard'
					]]);
				}
			},
			// _levelUpCard1: {
			//     trigger: { target: 'useCardToTargeted' },
			//     filter: function (event, player) {
			//         if (game.roundNumber == 1) return false;
			//         if (event.card.name != 'sha') return false;
			//         console.log(event);
			//         return true;
			//     },
			//     content: function () {
			//         'step 0'
			//         player.chooseBool(get.translation(trigger.player) + '对你使用了强化杀，是否消耗1点怒气强化一张闪，或点取消来使用两张普通闪').ai = () => true;
			//         'step 1'
			//         if (result.bool) {
			//             player.removeMark('th_anger', 1);
			//             game.log(player, '消耗1点怒气强化了【闪】');
			//             var id = player.playerid;
			//             var map = trigger.getParent().customArgs;
			//             if (!map[id]) map[id] = {};
			//             if (typeof map[id].shanRequired == 'number') {
			//                 map[id].shanRequired--;
			//             } else {
			//                 map[id].shanRequired = 1;
			//             }
			//         }
			//     }
			// },
			// _levelUpCard2: {
			//     trigger: { player: 'useCardToPlayered' },
			//     filter: function (event, player) {
			//         if (game.roundNumber == 1) return false;
			//         switch (event.card.name) {
			//             case 'sha':
			//                 return player.countMark('th_anger') > 0 && !event.getParent().directHit.contains(event.target);
			//             case 'juedou':
			//             case 'huogong':
			//                 return player.countMark('th_anger') > 1;
			//             case 'tao':
			//                 return player.countMark('th_anger') > 2;
			//         }
			//         return false;
			//     },
			//     direct: true,
			//     content: function () {
			//         'step 0'
			//         event.num = 0;
			//         var str = '';
			//         switch (trigger.card.name) {
			//             case 'sha':
			//                 event.num = 1;
			//                 str = '，使此【杀】需要两张【闪】来抵消？';
			//                 break;
			//             case 'juedou':
			//             case 'huogong':
			//                 event.num = 2;
			//                 str = '，使其伤害+1？';
			//                 break;
			//             case 'tao':
			//                 event.num = 3;
			//                 str = '，使其回复效果+1？';
			//                 break;
			//         }
			//         player.chooseBool('是否消耗' + event.num + '点怒气强化' + get.translation(trigger.card.name) + str).ai = () => {
			//             if (event.num < 3) return get.attitude(player, trigger.target) < 0;
			//             if (event.num == 3 && trigger.target.getDamagedHp() > 1) return get.attitude(player, trigger.target) > 0;
			//             return false;
			//         };
			//         'step 1'
			//         if (result.bool) {
			//             player.removeMark('th_anger', event.num);
			//             switch (event.num) {
			//                 case 1:
			//                     {
			//                         var id = trigger.target.playerid;
			//                         var map = trigger.getParent().customArgs;
			//                         if (!map[id]) map[id] = {};
			//                         if (typeof map[id].shanRequired == 'number') {
			//                             map[id].shanRequired++;
			//                         } else {
			//                             map[id].shanRequired = 2;
			//                         }
			//                     }
			//                 case 2:
			//                 case 3:
			//                     {
			//                         trigger.baseDamage++;
			//                     }
			//             }
			//             game.log(player, '消耗' + event.num + '点怒气强化了【' + get.translation(trigger.card.name) + '】');
			//         }
			//     }
			// },
			_letMeSee: {
				charlotte: true,
				ruleSkill: true,
				trigger: { global: 'changeHp', },
				filter: function (event, player) {
					if (event.hasSeen) return false;
					if (event.num >= 0) return false;
					if (!event.player.isIn()) return false;
					var player1;
					if (event.getParent().name == 'loseHp') {
						player1 = event.getParent(2).player;
					} else if (event.getParent().name == 'damage') {
						player1 = event.parent.source;
					}
					if (!player1) return false;
					if (!player1.isIn()) return false;
					if (player1.countMark('th_anger') == 0) return false;
					if (player1 == event.player) return false;
					if (event.player.identityShown == true) return false;
					return true;
				},
				direct: true,
				content: function () {
					'step 0'
					if (trigger.getParent().name == 'loseHp') {
						event.player1 = trigger.getParent(2).player;
					} else if (trigger.getParent().name == 'damage') {
						event.player1 = trigger.parent.source;
					}
					event.player1.chooseBool('是否消耗1点怒气值查看' + get.translation(trigger.player) + '的身份？').ai = () => {
						var eventPlayer = _status.event.getTrigger().player;
						if (eventPlayer.identityShown == true) return false;
						var player1 = _status.event.getParent().player1;
						if (player1.storage.zhibi && player1.storage.zhibi.contains(eventPlayer) || player1.storage.seen && player1.storage.seen[eventPlayer.name] != undefined) return false;
						return true;
					};
					'step 1'
					trigger.set('hasSeen', true);
					if (result.bool) {
						event.player1.logSkill('_letMeSee', trigger.player);
						event.player1.removeMark('th_anger', 1);
						event.player1.line(trigger.player, 'yellow');
						if (!event.player1.storage.zhibi) event.player1.storage.zhibi = [];
						if (!event.player1.storage.seen) event.player1.storage.seen = {};
						if (event.player1.identity == 'nei') {
							event.player1.storage.zhibi.add(trigger.player);
							var str = get.translation(trigger.player) + '的身份是：' + get.translation(trigger.player.identity + 2);
							event.player1.chooseControl('ok').set('dialog', [str, [[trigger.player.identity + 2], 'vcard']]);
						} else {
							var ident = '';
							if (trigger.player.identity == 'nei') ident = 'friend2';
							else if (trigger.player.storage.th_weizhuang || event.player1.storage.th_weizhuang) ident = 'enemy2';
							else if (['zhu', 'zhong'].contains(event.player1.identity)) {
								if (['zhu', 'zhong'].contains(trigger.player.identity)) ident = 'friend2';
								else ident = 'enemy2';
							} else if (event.player1.identity == 'fan') {
								if (trigger.player.identity == 'fan') ident = 'friend2';
								else ident = 'enemy2';
							}
							event.player1.storage.seen[trigger.player.name] = ident;
							var str = get.translation(trigger.player) + '的身份是：' + get.translation(ident);
							event.player1.chooseControl('ok').set('dialog', [str, [[ident], 'vcard']]);
						}
						game.log(event.player1, '探知了', trigger.player, '的身份')
					}
				}
			},
		},
		help: {
			'谋攻篇': '<div style="margin:10px">作者：雷</div><br><div style="margin:10px">版本号：ver2.1</div><br><img style=width:238px alt="Thunder扩展2群：484475852" src=' + lib.assetURL + 'image/other/qunliao.jpg><br>' +
				'<div style="margin:10px">声明</div><ul style="margin-top:0"><li>以下所有规则均为根据公开爆料整理，不代表任何官方意见。请以后续发布的官方规则作为标准。</li></ul>' +
				'<div style="margin:10px">谋攻篇系统简介</div><ul style="margin-top:0"><li>谋攻篇为6人全员暗身份模式，同时引入『怒气值』概念。</li>' +
				'<li>主公进入濒死状态时，或场上有不少于两名玩家死亡后，或第三轮主公的回合开始时，主公亮出身份牌、回复1点体力并获得武将牌上的主公技。</li></ul>' +
				'<div style="margin:10px">怒气值系统</div><ul style="margin-top:0"><li>回合开始或受到1点伤害后可以积攒1点怒气值。</li><li>怒气值上限为3点。</li><li>你令其他角色扣减体力后，可以消耗1点怒气洞察对方身份，系统提示是『敌』是『友』。</li><li>特殊地，内奸洞察身份时会明确告知具体身份，任何人洞察内奸身份都会提示为『友』。</li>' +
				'<li>内奸可以对一名反贼的身份进行伪装，使所有人探知其身份或其探知其他人身份时均为『敌』，但被伪装的反贼进入濒死时，若没有其他角色已死亡，并且其怒气值不少于2点，其亮出身份牌、消耗全部怒气、回复体力至2点并摸3张牌。</li></ul>' +
				'<div style="margin:10px">强化卡牌规则</div><ul style="margin-top:0"><li>第二轮起，怒气值可用于强化卡牌。</li><li>强化【杀】（消耗1点怒气）》需要消耗两张闪才能抵消；强化【闪】（消耗1点怒气）》可以抵消强化【杀】；强化【火攻/决斗】（消耗2点怒气）》造成的伤害+1；强化【桃】（消耗3点怒气）》回复值+1。</li></ul>',
		}
	};
});