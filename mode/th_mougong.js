'use strict';
game.import("mode", function (lib, game, ui, get, ai, _status) {
	return {
		name: 'th_mougong',
		onreinit: function () {
			for (var i = 0; i < game.players.length; i++) {
				game.players[i].markSkill('th_anger');
			}
		},
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
					var data = lib.config.gameRecord.th_mougong.data;
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
					lib.config.gameRecord.th_mougong.str = str;
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
					for (var i = 0; i < game.players.length; i++) {
						game.players[i].markSkill('th_anger');
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
						game.players[i].markSkill('th_anger');
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
			_useAnger_juedou: {
				ruleSkill: true,
				charlotte: true,
				forced: true,
				popup: false,
				trigger: { source: 'damageBegin1' },
				filter: function (event, player) {
					var evt = event.getParent(2);
					if (!evt || evt.name != 'useCard') return false;
					if (typeof evt.th_anger != 'object') return false;
					if (typeof evt.th_anger[player.playerid] != 'number') return false;
					return evt.th_anger[player.playerid] != 0;
				},
				content: function () {
					var evt = trigger.getParent(2);
					trigger.num += evt.th_anger[player.playerid];
				}
			},
			th_anger: {
				mark: true,
				intro: {
					content: function (storage) {
						if (typeof storage != 'number') return '已有〇点怒气值'
						return '已有' + get.cnNumber(storage) + '点怒气值';
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
						intro: { content: '已发动' },
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
						intro: { content: '已发动' },
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
					game.broadcastAll(function (player, target) {
						if (player == game.me) {
							game.playAudio('skill', '_neiTequan');
							target.setIdentity('fan');
							target.node.identity.classList.remove('guessing');
							target.fanfixed = true;
						}
					}, player, event.target);
					if (!player.storage.zhibi) player.storage.zhibi = [];
					player.storage.zhibi.add(event.target);
					player.chooseControl('ok2', 'cancel2').set('dialog', [get.translation(event.target) + '是反贼，是否伪装' + get.translation(event.target) + '的身份？', [
						[event.target.name], 'character'
					], [
						['fan2'], 'vcard'
					]]).set('ai', () => 'ok2');
					'step 2'
					if (result.control == 'ok2') {
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
					player.chooseControl('ok2').set('dialog', ['你是' + get.translation(player.identity + '2') + identityInfo(player.identity), [
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
					event.player1.chooseBool('是否消耗1点怒气值查看' + get.translation(trigger.player) + '的身份？').set('ai', () => {
						var eventPlayer = _status.event.getTrigger().player;
						if (eventPlayer.identityShown == true) return false;
						var player1 = _status.event.getParent().player1;
						if (player1.storage.zhibi && player1.storage.zhibi.contains(eventPlayer) || player1.storage.seen && player1.storage.seen[eventPlayer.name] != undefined) return false;
						return true;
					});
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
			'谋攻篇': '<div style="margin:10px">作者：雷</div><br><div style="margin:10px">版本号：ver2.1</div><br><img style=width:238px alt="Thunder扩展2群：484475852" src="data:image/jpeg;base64,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a2dPYmpjAAAAAQAAAAAAAFJHQkMAAAADAAAAAFJkICBkb3ViQG/gAAAAAAAAAAAAR3JuIGRvdWJAb+AAAAAAAAAAAABCbCAgZG91YkBv4AAAAAAAAAAAAEJyZFRVbnRGI1JsdAAAAAAAAAAAAAAAAEJsZCBVbnRGI1JsdAAAAAAAAAAAAAAAAFJzbHRVbnRGI1B4bEBSAAAAAAAAAAAACnZlY3RvckRhdGFib29sAQAAAABQZ1BzZW51bQAAAABQZ1BzAAAAAFBnUEMAAAAATGVmdFVudEYjUmx0AAAAAAAAAAAAAAAAVG9wIFVudEYjUmx0AAAAAAAAAAAAAAAAU2NsIFVudEYjUHJjQFkAAAAAAAAAAAAQY3JvcFdoZW5QcmludGluZ2Jvb2wAAAAADmNyb3BSZWN0Qm90dG9tbG9uZwAAAAAAAAAMY3JvcFJlY3RMZWZ0bG9uZwAAAAAAAAANY3JvcFJlY3RSaWdodGxvbmcAAAAAAAAAC2Nyb3BSZWN0VG9wbG9uZwAAAAAAOEJJTQPtAAAAAAAQAEgAAAABAAEASAAAAAEAAThCSU0EJgAAAAAADgAAAAAAAAAAAAA/gAAAOEJJTQQNAAAAAAAEAAAAWjhCSU0EGQAAAAAABAAAAB44QklNA/MAAAAAAAkAAAAAAAAAAAEAOEJJTScQAAAAAAAKAAEAAAAAAAAAAThCSU0D9QAAAAAASAAvZmYAAQBsZmYABgAAAAAAAQAvZmYAAQChmZoABgAAAAAAAQAyAAAAAQBaAAAABgAAAAAAAQA1AAAAAQAtAAAABgAAAAAAAThCSU0D+AAAAAAAcAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAA4QklNBAAAAAAAAAIAAjhCSU0EAgAAAAAACAAAAAAAAAAAOEJJTQQwAAAAAAAEAQEBAThCSU0ELQAAAAAABgABAAAABzhCSU0ECAAAAAAAEAAAAAEAAAJAAAACQAAAAAA4QklNBB4AAAAAAAQAAAAAOEJJTQQaAAAAAANDAAAABgAAAAAAAAAAAAABwgAAAcIAAAAHAHQAaAB1AG4AZABlAHIA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FxBfjOduH06z/wBW3/vygyxqPFHeP5M+LIJHhOlv/9kAOEJJTQQhAAAAAABXAAAAAQEAAAAPAEEAZABvAGIAZQAgAFAAaABvAHQAbwBzAGgAbwBwAAAAFABBAGQAbwBiAGUAIABQAGgAbwB0AG8AcwBoAG8AcAAgADIAMAAyADAAAAABADhCSU0EBgAAAAAABwACAQEAAQEA/+EW52h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMi0wNy0wMlQyMjowMDoxNiswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMi0wNy0xNVQxMDoxNDozMCswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjItMDctMTVUMTA6MTQ6MzArMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmMDY1ZjE2Ni1mMDhmLWE0NDYtYTE3MC1lYjAzOWQwMTQ0MTgiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDplOTQxMjIxNi05ZWQ2LWQxNDctOGViZi0zMDg0YjJiMjU3MWQiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkNmI2MjlhOC00MDQxLTA0NDUtYTExZC02MTg5MDY5NDg5MjQiIHBob3Rvc2hvcDpMZWdhY3lJUFRDRGlnZXN0PSJFOEYxNUNGMzJGQzExOEExQTI3QjY3QURDNTY0RDVCQSIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IiI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDZiNjI5YTgtNDA0MS0wNDQ1LWExMWQtNjE4OTA2OTQ4OTI0IiBzdEV2dDp3aGVuPSIyMDIyLTA3LTAyVDIyOjAwOjE2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjVmOGQ5ODExLWIzZmItMWE0Ny04OGI1LTA1N2Y4NDJlZmVhYyIgc3RFdnQ6d2hlbj0iMjAyMi0wNy0wNFQwMjo0MjoyOSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9qcGVnIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL2pwZWciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjgwYWRlYTYyLTc5NGQtN2Q0Mi05YzVmLTc0NzdhMzkyMjJjOSIgc3RFdnQ6d2hlbj0iMjAyMi0wNy0wNFQwMjo0MjoyOSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMWJhNGFhYS1iMjkwLTRlNGQtYmQyOC0wMjNiYTI1ZjliODYiIHN0RXZ0OndoZW49IjIwMjItMDctMTVUMTA6MTQ6MTErMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGltYWdlL2pwZWcgdG8gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gaW1hZ2UvanBlZyB0byBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxNzRiZDQyNC1mYWY0LWRmNDAtYmFiMi01YjQ4NTA3NzhjZjYiIHN0RXZ0OndoZW49IjIwMjItMDctMTVUMTA6MTQ6MTErMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Y2I4N2RjOWItYWI3NC05ZDRiLWI1ZTQtMjgxZjMwMmJiMWIwIiBzdEV2dDp3aGVuPSIyMDIyLTA3LTE1VDEwOjE0OjMwKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL2pwZWciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvanBlZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZjA2NWYxNjYtZjA4Zi1hNDQ2LWExNzAtZWIwMzlkMDE0NDE4IiBzdEV2dDp3aGVuPSIyMDIyLTA3LTE1VDEwOjE0OjMwKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmNiODdkYzliLWFiNzQtOWQ0Yi1iNWU0LTI4MWYzMDJiYjFiMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxNzRiZDQyNC1mYWY0LWRmNDAtYmFiMi01YjQ4NTA3NzhjZjYiIHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkNmI2MjlhOC00MDQxLTA0NDUtYTExZC02MTg5MDY5NDg5MjQiLz4gPHBob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8cmRmOkJhZz4gPHJkZjpsaSBwaG90b3Nob3A6TGF5ZXJOYW1lPSLlm77lsYIgMSIgcGhvdG9zaG9wOkxheWVyVGV4dD0iIi8+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0i5omr56CB5Yqg5YWl576k6IGK77yM5L2g5oOz6KaB55qE6YO95Zyo6L+Z6YeMIiBwaG90b3Nob3A6TGF5ZXJUZXh0PSLmiavnoIHliqDlhaXnvqTogYrvvIzkvaDmg7PopoHnmoTpg73lnKjov5nph4wiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+4AIUFkb2JlAGSAAAAAAQMAEAMCAwYAAAAAAAAAAAAAAAD/2wCEAAgGBgYGBggGBggMCAcIDA4KCAgKDhANDQ4NDRARDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwBCQgICQoJCwkJCw4LDQsOEQ4ODg4REQwMDAwMEREMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/CABEIAcIBwgMBIgACEQEDEQH/xAD3AAACAwEBAQEAAAAAAAAAAAAFBgMEBwIAAQgBAAIDAQEAAAAAAAAAAAAAAAMEAAECBQYQAAEEAgICAQIEBQQDAAMAAAIBAwQFAAYREhMHIRAUMSIyFTAjMzQW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"><br>' +
				'<div style="margin:10px">声明</div><ul style="margin-top:0"><li>以下所有规则均为根据公开爆料整理，不代表任何官方意见。请以后续发布的官方规则作为标准。</li></ul>' +
				'<div style="margin:10px">谋攻篇系统简介</div><ul style="margin-top:0"><li>谋攻篇为6人全员暗身份模式，同时引入『怒气值』概念。</li>' +
				'<li>主公进入濒死状态时，或场上有不少于两名玩家死亡后，或第三轮主公的回合开始时，主公亮出身份牌、回复1点体力并获得武将牌上的主公技。</li></ul>' +
				'<div style="margin:10px">怒气值系统</div><ul style="margin-top:0"><li>回合开始或受到1点伤害后可以积攒1点怒气值。</li><li>怒气值上限为3点。</li><li>你令其他角色扣减体力后，可以消耗1点怒气洞察对方身份，系统提示是『敌』是『友』。</li><li>特殊地，内奸洞察身份时会明确告知具体身份，任何人洞察内奸身份都会提示为『友』。</li>' +
				'<li>内奸可以对一名反贼的身份进行伪装，使所有人探知其身份或其探知其他人身份时均为『敌』，但被伪装的反贼进入濒死时，若没有其他角色已死亡，并且其怒气值不少于2点，其亮出身份牌、消耗全部怒气、回复体力至2点并摸3张牌。</li></ul>' +
				'<div style="margin:10px">强化卡牌规则</div><ul style="margin-top:0"><li>第二轮起，怒气值可用于强化卡牌。</li><li>强化【杀】（消耗1点怒气）》需要消耗两张闪才能抵消；强化【闪】（消耗1点怒气）》可以抵消强化【杀】；强化【火攻/决斗】（消耗2点怒气）》造成的伤害+1；强化【桃】（消耗3点怒气）》回复值+1。</li></ul>',
		}
	};
});