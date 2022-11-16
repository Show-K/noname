'use strict';
decadeModule.import(function (lib, game, ui, get, ai, _status) {
	/*
	十周年UI动皮使用说明：
	- 首先打开动态皮肤的开关，直接替换原有武将皮肤显示；
	- 目前不支持动态皮肤的切换功能；
	- 动态皮肤参数表在线文档链接：https://docs.qq.com/sheet/DS2Vaa0ZGWkdMdnZa；可以在群在线文档提供你设置好的参数
	- 所有相关的文件请放到	十周年UI/assets/dynamic目录下；
	- 关于格式请参考下面示例：
		武将名:{
			皮肤名:{
				name: "xxx",	//	必★填	骨骼名称，一般是yyy.skel，注意xxx不带后缀名.skel；
				action: "xxx",	//	可删掉	播放动作，xxx 一般是 DaiJi，目前手杀的骨骼文件需要填；
				x: [10, 0.5],	//	可删掉	[10, 0.5]相当于 left: calc(10px + 50%)，不填默认为[0, 0.5]；
				y: [10, 0.5],	//	可删掉	[10, 0.5]相当于 bottom: calc(10px + 50%)，不填默认为[0, 0.5]；
				scale: 0.5,		//	可删掉	缩放大小，不填默认为1；
				angle: 0,		//	可删掉	旋转角度，不填默认为0；
				speed: 1,		//	可删掉	播放速度，不填默认为1；
				hideSlots: ['隐藏的部件'],	// 隐藏不需要的部件，想知道具体部件名称请使用SpineAltasSplit工具查看
				clipSlots: ['裁剪的部件'],	// 剪掉超出头的部件，仅针对露头动皮，其他勿用
				background: "xxx.jpg",	//	可删掉	背景图片，注意后面要写后缀名，如.jpg .png等 
			}
		},
	- 为了方便得到动皮的显示位置信息，请在游戏选将后，用控制台或调试助手小齿轮执行以下代码(没用到的属性请删掉以免报错):
		game.me.stopDynamic();
		game.me.playDynamic({
			name: 'xxxxxxxxx',		// 勿删
			action: undefined,
			speed: 1,
			loop: true,				// 勿删
			x: [0, 0.5],
			y: [0, 0.5],
			scale: 0.5,
			angle: 0,
			hideSlots: ['隐藏的部件'],	// 隐藏不需要的部件，想知道具体部件名称请使用SpineAltasSplit工具查看
			clipSlots: ['裁剪的部件'],	// 剪掉超出头的部件，仅针对露头动皮，其他勿用
		});
		// 这里可以改成  }, true);  设置右将动皮
	*/

	decadeUI.dynamicSkin = {};

	var extend = {};
	decadeUI.get.extend(decadeUI.dynamicSkin, extend);

});
