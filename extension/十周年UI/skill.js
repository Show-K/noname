'use strict';
decadeModule.import(function (lib, game, ui, get, ai, _status) {
	decadeUI.skill = {
		identity_junshi: {
			name: '军师',
			mark: true,
			silent: true,
			intro: { content: '准备阶段开始时，可以观看牌堆顶的三张牌，然后将这些牌以任意顺序置于牌堆顶或牌堆底' },
			trigger: {
				player: 'phaseBegin'
			},
			content: function () {
				"step 0"
				if (player.isUnderControl()) {
					game.modeSwapPlayer(player);
				}
				var num = 3;
				var cards = get.cards(num);
				var guanxing = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
				guanxing.caption = '【军师】';
				game.broadcast(function (player, cards, callback) {
					if (!window.decadeUI) return;
					var guanxing = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
					guanxing.caption = '【军师】';
					guanxing.callback = callback;
				}, player, cards, guanxing.callback);

				event.switchToAuto = function () {
					var cards = guanxing.cards[0].concat();
					var cheats = [];
					var judges = player.node.judges.childNodes;

					if (judges.length) cheats = decadeUI.get.cheatJudgeCards(cards, judges, true);
					if (cards.length) {
						for (var i = 0; i >= 0 && i < cards.length; i++) {
							if (get.value(cards[i], player) >= 5) {
								cheats.push(cards[i]);
								cards.splice(i, 1)
							}
						}
					}

					var time = 500;
					for (var i = 0; i < cheats.length; i++) {
						setTimeout(function (card, index, finished) {
							guanxing.move(card, index, 0);
							if (finished) guanxing.finishTime(1000);
						}, time, cheats[i], i, (i >= cheats.length - 1) && cards.length == 0);
						time += 500;
					}

					for (var i = 0; i < cards.length; i++) {
						setTimeout(function (card, index, finished) {
							guanxing.move(card, index, 1);
							if (finished) guanxing.finishTime(1000);
						}, time, cards[i], i, (i >= cards.length - 1));
						time += 500;
					}
				}

				if (event.isOnline()) {
					event.player.send(function () {
						if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
					}, event.player);

					event.player.wait();
					decadeUI.game.wait();
				} else if (!event.isMine()) {
					event.switchToAuto();
				}
				"step 1"
				player.popup(get.cnNumber(event.num1) + '上' + get.cnNumber(event.num2) + '下');
				game.log(player, '将' + get.cnNumber(event.num1) + '张牌置于牌堆顶，' + get.cnNumber(event.num2) + '张牌置于牌堆底');
				game.updateRoundNumber();
			},
		}
	};

	decadeUI.inheritSkill = {};

	for (var key in decadeUI.skill) {
		if (lib.skill[key]) lib.skill[key] = decadeUI.skill[key];
	}

	for (var key in decadeUI.inheritSkill) {
		if (lib.skill[key]) {
			for (var j in decadeUI.inheritSkill[key]) {
				lib.skill[key][j] = decadeUI.inheritSkill[key][j];
			}
		}
	}

});

