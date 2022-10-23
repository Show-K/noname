"use strict";
game.import("character",(lib,game,ui,get,ai,_status)=>{
	/**
	 * @type {importCharacterConfig}
	 */
	const SST_SP={
		name:"sst_sp",
		connect:true,
		characterSort:{
			sst_sp:{
				sst_mnm:["mnm_edelgard"],
				sst_ymk:["ymk_isabelle","ymk_yumikohimi","ymk_tianyi"],
				sst_ska:["ska_bobby","ska_olivia","ska_super_xiaojie","ska_show_k","ska_professor_toad","ska_king_olly","ska_koopa_troopa","ska_daroach"],
				sst_nnk:["nnk_robin","nnk_decidueye","nnk_machamp"],
				sst_alz:["alz_kyo_kusanagi","alz_yuri_kozukata"],
				sst_xsj:["xsj_yu_narukami","xsj_dante"],
				sst_entertainment:["mnm_captain_falcon","mnm_9_volt_18_volt"]
			}
		},
		character:{
			ymk_isabelle:["female","sst_light",3,["ymk_zhongmi","ymk_mihu"],[]],
			ska_bobby:["male","sst_spirit",3,["ska_jixing","ska_yangxun","ska_wangshi"],[]],
			ska_olivia:["female","sst_spirit",3,["ska_shenqi","ska_zhefu"],[]],
			ska_super_xiaojie:["male","sst_reality",3,["ska_kezhi","ska_jiyan"],[]],
			ska_show_k:["male","sst_reality",3,["ska_jingli","ska_zhiyi"],[]],
			ymk_yumikohimi:["female","sst_reality",3,["ymk_qiuyi","ymk_xifang"],[]],
			ska_professor_toad:["male","sst_spirit",3,["ska_juegu","ska_kuiwang"],[]],
			mnm_edelgard:["female","sst_spirit",3,["mnm_tianjiu","mnm_yanhai"],[]],
			alz_kyo_kusanagi:["male","sst_spirit",4,["alz_wushi","alz_huangyao"],[]],
			mnm_captain_falcon:["male","sst_light",4,["mnm_jijing"],[]],
			ska_king_olly:["male","sst_spirit",3,["ska_shenqi_alter","ska_zhesheng"],[]],
			ska_koopa_troopa:["male","sst_spirit",3,["ska_suixuan","ska_xiangshi"],[]],
			mnm_9_volt_18_volt:["male","sst_spirit",4,["mnm_huaijiu"],[]],
			nnk_robin:["","sst_dark",4,["nnk_yuanlei"],[]],
			nnk_robin_female:["female","sst_dark",4,["nnk_yuanlei"],["unseen"]],
			nnk_robin_male:["male","sst_dark",4,["nnk_yuanlei"],["unseen"]],
			alz_yuri_kozukata:["female","sst_spirit","3",["alz_yingjian","alz_qushui"]],
			ymk_tianyi:["male","sst_reality",4,["ymk_kaibai"],[]],
			xsj_yu_narukami:["male","sst_spirit",3,["xsj_dongqie","xsj_taluo"],[]],
			xsj_dante:["male","sst_spirit",4,["xsj_wanxie","xsj_moxue"],[]],
			ska_daroach:["male","sst_spirit",3,["ska_zhidai","ska_siyi"],["hiddenSkill"]],
			nnk_decidueye:["male","sst_spirit",4,["nnk_fengying","nnk_biantou"],[]],
			nnk_machamp:["male","sst_spirit",4,["nnk_manwu","nnk_mianyu"],[]]
		},
		characterFilter:{
			mnm_edelgard:mode=>mode=="identity"
		},
		characterIntro:{
			/*
			"武将作者：Yumikohimi<br>\
				武将作者：mario not mary<br>\
				武将作者：Show-K<br>\
				武将作者：南柯<br>\
				武将作者：Axel_Zhai<br>\
				武将作者：小时节<br>\
				插图作者：未知<br>\
				<hr>\
				<br>\
				系列：（）<br>\
				首次登场：（）<br>\
				<br>\
				——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
				<hr>\
				"
			*/
			ymk_isabelle:"武将作者：Yumikohimi<br>\
				插图作者：未知<br>\
				<hr>\
				0827. 西施惠/Isabelle/しずえ<br>\
				系列：<ruby>动物森友会<rp>（</rp><rt>Animal Crossing</rt><rp>）</rp></ruby><br>\
				首次登场：<ruby>来吧！动物森友会<rp>（</rp><rt>Animal Crossing: New Leaf</rt><rp>）</rp></ruby><br>\
				在3DS版《动物森友会》中，她是村民们的可靠秘书；而在NS版中，她也为每个无人岛居民提供生活服务。她有时可能健忘，但总的来说很靠谱。有个叫西施德的弟弟。她在3DS和WiiU版《任天堂明星大乱斗》中是辅助模型，NS版中则成为了斗士。<br>\
				——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
				<hr>\
				上次柚子的武将就被老摸吵着要删，这次希望不要太IMBA……老摸的西施慧出来了，柚子的武将至少还是被借鉴了一点的。",
			ska_bobby:"武将作者：Show-K<br>\
				插图作者：海鮮炒め<br>\
				——"+get.formatUrl("https://www.pixiv.net/artworks/84022575")+"<br>\
				<hr>\
				S003. 炸弹彬/Bobby/ボム平<br>\
				系列：<ruby>马力欧<rp>（</rp><rt>Mario</rt><rp>）</rp></ruby><br>\
				首次登场：<ruby>纸片马力欧 折纸国王<rp>（</rp><rt>Paper Mario: The Origami King</rt><rp>）</rp></ruby><br>\
				炸弹兵，通常被奥莉维亚称为“炸弹彬”，也曾被错误地称为“Bhomas”和“Bomber”，是《纸片马力欧 折纸国王》中马力欧的伙伴。作为一个没有保险丝、失忆的炸弹兵，他加入了马力欧和奥莉维亚的探险，努力回忆起他的记忆。在他们的冒险过程中，他将马力欧和奥莉维亚分别称为“大哥”和“女士”。<br>\
				——翻译自《超级马力欧维基》<br>\
				——"+get.formatUrl("https://www.mariowiki.com/Bob-omb_(Paper_Mario%3A_The_Origami_King)")+"<br>\
				<hr>\
				“我？哦，我是炸弹兵。”",
			ska_olivia:"武将作者：Show-K<br>\
				插图作者：蛇のこ<br>\
				——"+get.formatUrl("https://www.pixiv.net/artworks/94074877")+"<br>\
				<hr>\
				1426. 奥莉维亚/Olivia/オリビア<br>\
				系列：<ruby>马力欧<rp>（</rp><rt>Mario</rt><rp>）</rp></ruby><br>\
				首次登场：<ruby>纸片马力欧 折纸国王<rp>（</rp><rt>Paper Mario: The Origami King</rt><rp>）</rp></ruby><br>\
				由掌握赋生折法的匠人制作的折纸，奥利王的妹妹。非常天真烂漫，对世界充满了好奇心。为了阻止哥哥的野心而踏上冒险之途，虽然也有过悲痛和犹豫，但是还是走到了最后。非常擅长唱歌跳舞，喜欢泡温泉和撸狗。<br>\
				——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
				<hr>\
				在和马力欧的冒险路途上成长诸多啊……",
			ska_super_xiaojie:"武将作者：Show-K<br>\
				插图作者：未知<br>\
				<hr>\
				R017. 超级小桀\
				<hr>\
				喜欢没事说嬲，但更喜欢不放弃。",
			ska_show_k:"武将作者：Show-K<br>\
				插图作者：Show-K<br>\
				<hr>\
				R016. 小溪/Show-K\
				<hr>\
				有人建议我给我自己写一个，于是我就写出来了。",
			ymk_yumikohimi:"武将作者：Yumikohimi<br>\
				插图作者：mario not mary<br>\
				<hr>\
				R003. 柚子/Yumikohimi\
				<hr>\
				果然刚设计出来就要被削，果然还是三方定律。现在削了，感觉可以。",
			ska_professor_toad:"武将作者：Show-K<br>\
				插图作者：未知<br>\
				<hr>\
				S004. 考古学家奇诺比奥/Professor Toad/考古学者キノピオ<br>\
				系列：<ruby>马力欧<rp>（</rp><rt>Mario</rt><rp>）</rp></ruby><br>\
				首次登场：<ruby>纸片马力欧 折纸国王<rp>（</rp><rt>Paper Mario: The Origami King</rt><rp>）</rp></ruby><br>\
				考古学家奇诺比奥是第一次出现在《纸片马里奥 折纸国王》中的奇诺比奥。作为古代历史学院教授兼考古学家，他与马力欧和奥莉维亚联手，帮助他们破坏黄色神祇胶带。其棕色探险家装束和黄色斑点蘑菇头（大部分隐藏在他的髓质头盔中）以及他总是随身携带的铁锹和记事本，很容易将他与其他奇诺比奥区分开来。<br>\
				——翻译自《超级马力欧维基》<br>\
				——"+get.formatUrl("https://www.mariowiki.com/Professor_Toad")+"<br>\
				<hr>\
				大概是现代纸片马力欧中最有特色的奇诺比奥了吧……",
			mnm_edelgard:"武将作者：mario not mary<br>\
				插图作者：未知<br>\
				<hr>\
				1382. 艾黛尔贾特/Edelgard/エーデルガルト<br>\
				系列：<ruby>火焰纹章<rp>（</rp><rt>Fire Emblem</rt><rp>）</rp></ruby><br>\
				首次登场：<ruby>火焰纹章 风花雪月<rp>（</rp><rt>Fire Emblem: Three Houses</rt><rp>）</rp></ruby><br>\
				阿德剌斯忒亚帝国的皇女、皇位继承人。气质高雅充满自信，有很强的执行能力，怀有深藏不露的野心。似乎和神秘人“炎帝”有什么关系？<br>\
				——Marioraz、封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
				<hr>\
				请握住我的手，在我随风飘落，散入黎明之前……",
			alz_kyo_kusanagi:"武将作者：Axel_Zhai<br>\
				插图作者：未知<br>\
				<hr>\
				1362. 草薙京/Kyo Kusanagi/草薙京<br>\
				系列：<ruby>拳皇<rp>（</rp><rt>The King of Fighters</rt><rp>）</rp></ruby><br>\
				首次登场：<ruby>拳皇\x2794<rp>（</rp><rt>The King of Fighters \x2794</rt><rp>）</rp></ruby><br>\
				炎之贵公子草薙京，三神器之一“草薙剑”的传人，因此能够使用神器所带来的火焰之力。三神器家族自1800年前便与大蛇结下了宿命的渊源。大蛇作为地球的意志，想要清除一直以来破坏地球的人类，而三神器一族则世世代代守护着大蛇的封印。他们也背负上了与大蛇一族战斗的宿命。不过听说他现在还拿不到中学毕业证。<br>\
				——Mario_not_mary、封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
				<hr>\
				另外一位新人设计的第一个武将，但是为什么要选择一个已经有了的武将呢……",
			mnm_captain_falcon:"武将作者：Show-K、mario not mary<br>\
				插图作者：未知<br>\
				<hr>\
				0591. 飞隼队长/Captain Falcon/キャプテン・ファルコン<br>\
				系列：<ruby>零式赛车<rp>（</rp><rt>F-Zero</rt><rp>）</rp></ruby><br>\
				首次登场：<ruby>零式赛车<rp>（</rp><rt>F-Zero</rt><rp>）</rp></ruby><br>\
				在F-Zero赛车大赛中，飞隼队长驾驶着他的“蓝色猎鹰”取得了优秀的成绩。虽然参战了大乱斗，但他的真实身份仍然是个谜。他的速度和力量都很强，还有演出效果爆炸的招牌技能“飞隼拳”，可以在落地的时候尝试使用哦！<br>\
				——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
				<hr>\
				MNM曾经提过一个“面杀”版本技能，最近无名杀能玩音游了，于是我就借鉴了这种思路（不就是小游戏武将吗）。",
			ska_king_olly:"武将作者：Show-K<br>\
				插图作者：チョコ<br>\
				——"+get.formatUrl("https://www.pixiv.net/artworks/91848135")+"<br>\
				<hr>\
				1427. 奥利王/King Olly/オリー王<br>\
				系列：<ruby>马力欧<rp>（</rp><rt>Mario</rt><rp>）</rp></ruby><br>\
				首次登场：<ruby>纸片马力欧 折纸国王<rp>（</rp><rt>Paper Mario: The Origami King</rt><rp>）</rp></ruby><br>\
				由掌握赋生折法的匠人制作的折纸，奥莉维亚的哥哥。自称折纸国王，将匠人的所有文具变为了自己的手下，有把整个纸片世界都变成折纸的野心。手段残忍，即使是亲妹妹也会毫不犹豫的下手。骄傲的背后其实是极端的玻璃心和无知。<br>\
				——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
				<hr>\
				马里奥RPG系列中唯二原创最终Boss之一，极具历史意义！",
			ska_koopa_troopa:"武将作者：Show-K、mario not mary<br>\
				插图作者：未知<br>\
				<hr>\
				0037. 慢慢龟/Koopa Troopa/ノコノコ<br>\
				系列：<ruby>马力欧<rp>（</rp><rt>Mario</rt><rp>）</rp></ruby><br>\
				首次登场：<ruby>超级马力欧兄弟<rp>（</rp><rt>Super Mario Bros.</rt><rp>）</rp></ruby><br>\
				在酷霸王军团里，最常见的不是栗宝宝就是慢慢龟了。它们看起来很温顺，但它们也有奋不顾身地跳崖的勇气。马力欧如果踩到慢慢龟，它们会缩进壳里，这个状态下的它们经常被踢来踢去或者扔来扔去。马力欧游戏的不少地名都是以慢慢龟命名的哦。<br>\
				——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
				<hr>\
				黑历史重铸武将之一。",
			mnm_9_volt_18_volt:"武将作者：mario not mary<br>\
				插图作者：未知<br>\
				<hr>\
				0733. 九伏特&十八伏特【九伏&十八伏】/9-Volt & 18-Volt/ナインボルト & エイティーンボルト<br>\
				系列：<ruby>瓦力欧<rp>（</rp><rt>Wario</rt><rp>）</rp></ruby><br>\
				首次登场：<ruby>瓦力欧制造<rp>（</rp><rt>WarioWare, Inc.: Mega Microgame$!</rt><rp>）</rp></ruby><br>\
				九伏特和十八伏特是最要好的朋友，目前正在钻石城市读小学——没错，看起来高大又成熟的十八伏特其实是个小学生。两人都喜欢玩游戏，其中九伏特会在晚上躲着妈妈偷偷玩。九伏特有个黄色的像素宠物蓬蓬，而十八伏特还很擅长rap，作为rapper的标志是老虎。<br>\
				——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
				<hr>\
				MNM的娱乐武将，超值N合1！",
			nnk_robin:"武将作者：南柯<br>\
				插图作者：未知<br>\
				<hr>\
				0616. 鲁弗莱（男性）/Robin (Male)/ルフレ（男性）<br>\
				系列：<ruby>火焰纹章<rp>（</rp><rt>Fire Emblem</rt><rp>）</rp></ruby><br>\
				首次登场：<ruby>火焰纹章 觉醒<rp>（</rp><rt>Fire Emblem Awakening</rt><rp>）</rp></ruby><br>\
				《火焰纹章：觉醒》中的主角，形象和性别可以自定义。根据选择的性别不同，能够攻略的对象也不一样——比如男鲁弗莱可以攻略露琪娜。在大乱斗中，鲁弗莱除了剑术之外，还会使用魔法。魔法书用完之后需要等待恢复。<br>\
				——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
				<hr>\
				0617. 鲁弗莱（女性）/Robin (Female)/ルフレ（女性）<br>\
				系列：<ruby>火焰纹章<rp>（</rp><rt>Fire Emblem</rt><rp>）</rp></ruby><br>\
				首次登场：<ruby>火焰纹章 觉醒<rp>（</rp><rt>Fire Emblem Awakening</rt><rp>）</rp></ruby><br>\
				《火焰纹章：觉醒》中的主角，根据选择的性别不同，能够攻略的对象也不一样——比如女鲁弗莱可以攻略库洛姆。她可以切换青铜剑和雷剑进行攻击，在地面或空中输入快弹就可以切换为雷剑，但雷剑使用时也会像魔法书一样消耗耐久。<br>\
				——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
				<hr>\
				南柯设计的第二个武将，值得一试。",
			alz_yuri_kozukata:"武将作者：Show-K、Axel_Zhai<br>\
				插图作者：未知<br>\
				<hr>\
				1241. 不来方夕莉/Yuri Kozukata/不来方夕莉<br>\
				系列：<ruby>零<rp>（</rp><rt>Fatal Frame</rt><rp>）</rp></ruby><br>\
				首次登场：<ruby>零～濡鸦之巫女～<rp>（</rp><rt>Fatal Frame: Maiden of Black Water</rt><rp>）</rp></ruby><br>\
				在经历过交通事故之后，拥有了能看见死者的能力。被这个能力困扰的她本想自杀，最后被人救下，并学会了使用“射影机”对抗怨灵。在一次委托中，她逐渐发现了灵山中的真相。在大乱斗中，作为辅助模型的她可以使用射影机对被拍到的斗士造成伤害。<br>\
				——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
				<hr>\
				咕了好久了……",
			ymk_tianyi:"武将作者：Yumikohimi<br>\
				插图作者：未知<br>\
				<hr>\
				R018. 天翊\
				<hr>\
				啊对对对。",
			xsj_yu_narukami:"武将作者：小时节、Yumikohimi<br>\
				插图作者：未知<br>\
				<hr>\
				S005. 鸣上悠/Yu Narukami/鳴上悠<br>\
				系列：<ruby>女神异闻录<rp>（</rp><rt>Persona</rt><rp>）</rp></ruby><br>\
				首次登场：<ruby>女神异闻录4<rp>（</rp><rt>Persona 4</rt><rp>）</rp></ruby><br>\
				鸣上悠是Atlus开发的《女神异闻录》系列中的一个虚构角色，作为2008年角色扮演视频游戏《女神异闻录4》的主角首次亮相。在游戏中，鸣上悠本身不说话，其思想和行动由玩家决定。作为一名高中生，他搬到远离城市的农村地区稻叶，与他的叔叔堂岛辽太郎和表弟菜菜子住在一起，而他的父母正忙于工作。抵达稻叶后不久，鸣上悠开始调查一起谋杀案，受害者在他居住的小镇上被神秘绑架并挂在电话线上。他与同学们合作，探索另一个被称为电视世界的维度，在那里他获得了一种被称为“Persona”的力量——他潜意识的物理表现，以对抗并击败谋杀第一批受害者的生物Shadows。鸣上悠还出现在与《女神异闻录4》相关的其他作品中，包括名为《女神异闻录4 动画》的动画改编、漫画版和几款衍生游戏。对于这些作品，鸣上悠在故事中得到了自己的刻画和发展。<br>\
				——翻译自《维基百科》<br>\
				<hr>\
				总算有新人来设计武将了。",
			xsj_dante:"武将作者：Show-K、小时节、Yumikohimi<br>\
				插图作者：未知<br>\
				<hr>\
				S006. 但丁/Dante/ダンテ<br>\
				系列：<ruby>鬼泣<rp>（</rp><rt>Devil May Cry</rt><rp>）</rp></ruby><br>\
				首次登场：<ruby>鬼泣<rp>（</rp><rt>Devil May Cry</rt><rp>）</rp></ruby><br>\
				但丁是鬼泣系列的游戏角色。但丁是1代至3代的主角，以华丽的动作身手成为一个受欢迎的人物。在4代和5代中，但丁将会担任游戏后半段的主角。<br>\
				——《维基百科》<br>\
				<hr>\
				啊，差点就忘记了。",
			ska_daroach:"武将作者：Show-K<br>\
				插图作者：HAL研究所<br>\
				——《星之卡比 新星同盟》\
				<hr>\
				0351. 怪盗洛切/Daroach/ドロッチェ<br>\
				系列：<ruby>星之卡比<rp>（</rp><rt>Kirby</rt><rp>）</rp></ruby><br>\
				首次登场：<ruby>星之卡比 参上！呐喊团<rp>（</rp><rt>Kirby: Squeak Squad</rt><rp>）</rp></ruby><br>\
				洛切是探寻宝藏的怪盗组织呐喊团的领导者，他们盗取了自认为装有宝物的宝箱，却被卡比认为是盗取了他的蛋糕的凶手（整个游戏直到最终关前以卡比视角来看就是在追逐自己的蛋糕）。在冰雪之岛，卡比终于追上了洛切并将其打败，魅塔骑士却突然出现并夺走了宝箱，卡比不得不为了自己的“蛋糕”重新追了上去。<br>\
				——封羽翎烈、鸿渐于陆，《任天堂明星大乱斗特别版全命魂介绍》<br>\
				<hr>\
				团长！你在干什么啊！团长！",
			nnk_decidueye:"武将作者：南柯、Show-K<br>\
				插图作者：《宝可拳 POKKÉN TOURNAMENT DX》<br>\
				<hr>\
				S007. 狙射树枭/Decidueye/ジュナイパー<br>\
				系列：<ruby>宝可梦<rp>（</rp><rt>Pokémon</rt><rp>）</rp></ruby><br>\
				首次登场：<ruby>精灵宝可梦 太阳／月亮<rp>（</rp><rt>Pokémon Sun and Moon</rt><rp>）</rp></ruby><br>\
				狙射树枭是草属性和幽灵属性宝可梦，而洗翠的样子是草属性和格斗属性宝可梦。<br>\
				狙射树枭外表看起来就像是披着一件大大的披风，实际上身上都覆盖着满满的羽毛，它羽毛呈现绿色，而身体则是白色色调，狙射树枭比较不同的就是脸部有着深色的眼睑以及鸟喙，它的胸部有着领结一样的带子，头顶的羽毛颜色较为不同，头部的颜色更深一些，形似兜帽。<br>\
				为了在严苛的自然环境中生存下去，洗翠地区的投羽枭进化成性情粗暴又坚韧的狙射树枭。它看起来戴着一顶斗笠，实际上却是红色的羽毛，相比起一般的狙射树枭，它的“披风”更短。为抵抗洗翠地区的严寒气候，羽毛的芯中含有空气，因而能够防寒。<br>\
				狙射树枭把藏在翅膀里的羽毛箭像弓箭一样发射，由拔箭到发射为止的时间只需0.1秒左右，在在敌人发现前贯穿其要害，在一瞬之间决出胜负。在绝对不想射偏时，会拉紧头上的藤蔓集中精神，有着连前方100米的小石头也能穿透的精度，即使在1公里以外也能准确无误射中目标。同时，狙射树枭也擅长特技般的曲线射击。狙射树枭可把自己的气息完全消除，趁着对手看不见自己的时机进行攻击。它会飞上高空且以快速旋转的姿态下降，并连续射穿多个目标。虽然狙射树枭平常表现得沉着冷静，但不擅长应付突发状况，受到突如其来的袭击它会表现得惊慌失措。<br>\
				洗翠地区的狙射树枭没有固定的地盘，会为找寻食物而四处改变居所。它的脚力十分发达，踢击的威力之大能折断树木，击裂岩石。与至今为止所发现的样子不同，它会积极发动近身战并以力量制服对手。擅长利用飞翔冲向对手发出踢技，并用藏在翅膀里的箭释放连续攻击的战法。另一方面，对于不存敌意的对手它似乎会有宽容的一面。<br>\
				——《神奇宝贝百科》<br>\
				<hr>\
				竟然没有被《任天堂明星大乱斗 特别版》收录为命魂。",
			nnk_machamp:"武将作者：南柯<br>\
				插图作者：《宝可拳 POKKÉN TOURNAMENT DX》<br>\
				<hr>\
				0437. 怪力/Machamp/カイリキー<br>\
				系列：<ruby>宝可梦<rp>（</rp><rt>Pokémon</rt><rp>）</rp></ruby><br>\
				首次登场：<ruby>宝可梦 红／绿<rp>（</rp><rt>Pokémon Red and Green Versions</rt><rp>）</rp></ruby><br>\
				一种拥有无穷的力量的宝可梦，用发达的4只手在2秒内可以出拳1000发，四只手发出的格斗招式几乎无法阻挡。与此相对，它们相当不擅长干细活儿。虽然看上去非常雄壮，但其实也有雌性的怪力。<br>\
				——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
				<hr>\
				真的暴力。"
		},
		characterTitle:{
			ymk_isabelle:"尽忠职守",
			ska_bobby:"枫海思忆",
			ska_olivia:"折纸赋情",
			ska_super_xiaojie:"永不言弃",
			ska_show_k:"中流砥柱",
			ymk_yumikohimi:"新厨明灶",
			ska_bowser:"联挚之火",
			ska_professor_toad:"沙原博时",
			mnm_edelgard:"炎翼的皇女",
			alz_kyo_kusanagi:"炎之贵公子",
			mnm_captain_falcon:"风驰电掣",
			ska_king_olly:"折纸生望",
			ska_koopa_troopa:"从逸不逾",
			mnm_9_volt_18_volt:"电子幻界",
			nnk_robin:"卓越的战术师",
			alz_yuri_kozukata:"濡鸦之巫女",
			ymk_tianyi:"虚假的废物",
			xsj_yu_narukami:"钢之妹控番长",
			xsj_dante:"斯巴达之子",
			ska_daroach:"宇宙盗贼团前来拜访",
			nnk_decidueye:"遮天蔽日",
			nnk_machamp:"百裂拳击"
		},
		skill:{
			//SP Isabelle
			ymk_zhongmi:{
				trigger:{player:["gainAfter","loseAfter"]},
				filter:(event,player)=>{
					if(_status.currentPhase==player) return false;
					if(event.name=="lose"){
						return ((event.hs&&event.hs.length)||(event.es&&event.es.length))&&!["useCard","respond"].contains(event.getParent().name);
					}
					else if(event.name=="gain"){
						return event.cards&&event.cards.length;
					}
					return false;
				},
				direct:true,
				content:()=>{
					"step 0"
					event.num=player.maxHp-player.hp+1;
					player.chooseTarget(get.prompt("ymk_zhongmi"),"你可以令一名其他角色摸"+get.cnNumber(event.num)+"张牌，或弃置一名其他角色的"+get.cnNumber(event.num)+"张牌",lib.filter.notMe).set("ai",target=>{
						if(get.attitude(_status.event.player,target)>0) return 10+get.attitude(_status.event.player,target);
						return 1;
					});
					"step 1"
					if(result.bool){
						player.logSkill("ymk_zhongmi",result.targets);
						event.target=result.targets[0];
						player.discardPlayerCard("弃置"+get.translation(event.target)+get.cnNumber(num)+"张牌，或令"+get.translation(event.target)+"摸"+get.cnNumber(num)+"张牌",event.target,Math.min(num,event.target.countCards("he")),"he");
					}
					else{
						event.finish();
					}
					"step 2"
					if(!result.bool) target.draw(num);
				},
				ai:{
					expose:0.2,
					noe:1,
					noh:1,
					effect:{
						target:(card,player,target)=>{
							if(!target.hasFriend()) return;
							if(get.tag(card,"draw")||get.tag(card,"loseCard")) return [1,target.maxHp-target.hp+1];
						}
					}
				}
			},
			ymk_mihu:{
				trigger:{player:"useCardToPlayered"},
				filter:(event,player)=>{
					const evt=event.getParent();
					if(typeof evt.ymk_mihu=="object"&&evt.ymk_mihu[player.playerid]) return false;
					if(get.type(event.card)!="basic"&&get.type(event.card)!="trick") return false;
					return event.targets&&event.targets.length;
				},
				forced:true,
				content:()=>{
					"step 0"
					player.judge();
					"step 1"
					const num=player.maxHp-player.hp+1;
					switch(result.color){
						case "red":
							event.type="add";
							player.chooseTarget("迷糊：为"+get.translation(trigger.card)+"增加"+get.cnNumber(num)+"个目标",num,true,(card,player,target)=>{
								const evt=_status.event.getTrigger();
								return !evt.targets.contains(target)&&lib.filter.targetEnabled2(evt.card,evt.player,target);
							}).set("ai",target=>{
								const evt=_status.event.getTrigger();
								return get.effect(target,evt.card,evt.player,_status.event.player);
							});
							break;
						case "black":
							event.type="remove";
							player.chooseTarget("迷糊：为"+get.translation(trigger.card)+"减少"+get.cnNumber(num)+"个目标",num,true,(card,player,target)=>_status.event.getTrigger().targets.contains(target)).set("ai",target=>{
								const evt=_status.event.getTrigger();
								return -get.effect(target,evt.card,evt.player,_status.event.player);
							});
							break;
					}
					"step 2"
					if(result.targets&&result.targets.length){
						player.line(result.targets,"green");
						const evt=trigger.getParent();
						if(typeof evt.ymk_mihu!="object") evt.set("ymk_mihu",{});
						evt.ymk_mihu[player.playerid]=true;
						if(event.type=="add"){
							evt.targets.addArray(result.targets);
						}
						else{
							evt.targets.removeArray(result.targets);
							evt.triggeredTargets3.removeArray(result.targets);
						}
					}
				}
			},
			//Bobby
			_sst_judge_count:{
				charlotte:true,
				trigger:{player:"judgeBegin"},
				ruleSkill:true,
				silent:true,
				firstDo:true,
				content:()=>{
					player.actionHistory[player.actionHistory.length-1].custom.push(trigger);
				}
			},
			ska_jixing:{
				delay:false,
				enable:"phaseUse",
				usable:1,
				filterTarget:(card,player,target)=>player.inRange(target),
				content:()=>{
					"step 0"
					player.judge(card=>{
						if(get.suit(card)!="diamond") return 2;
						return -1;
					});
					"step 1"
					if(result.bool){
						target.damage(player,"nocard");
					}
					else{
						player.chooseToDiscard("激行：弃置一张牌","he",true);
					}
				},
				ai:{
					order:5,
					expose:0.2,
					damage:true,
					result:{
						target:(player,target)=>Math.cbrt(get.damageEffect(target,player,target))
					}
				}
			},
			ska_yangxun:{
				trigger:{global:"judgeAfter"},
				forced:true,
				filter:event=>event.result.color=="red",
				content:()=>{
					"step 0"
					player.chooseTarget("洋寻：令一名角色获得弃牌堆顶的一张牌，然后若其不为你，其〖赠予〗你一张牌",true).set("ai",target=>{
						if(!ui.discardPile.childNodes.length) return 0;
						if(target!=_status.event.player&&!target.countCards("he")) return 0;
						return get.sgnAttitude(_status.event.player,target)*get.value(ui.discardPile.childNodes[ui.discardPile.childNodes.length-1]);
					});
					"step 1"
					if(result.targets&&result.targets.length){
						player.line(result.targets,"green");
						event.target=result.targets[0];
						if(ui.discardPile.childNodes.length){
							event.target.gain(ui.discardPile.childNodes[ui.discardPile.childNodes.length-1],"gain2");
						}
						else{
							player.chat("无牌可得了吗");
							game.log("但是弃牌堆里面已经没有牌了！");
							event.finish();
						}
					}
					else{
						event.finish();
					}
					"step 2"
					if(target!=player){
						target.chooseCard("洋寻：【赠予】"+get.translation(player)+"一张牌","he",true).set("ai",card=>{
							const gifts=(player,target)=>{
								if(target.hasSkillTag("refuseGifts")) return 0;
								if(get.type(card,false)=="equip") return get.effect(target,card,target,target);
								if(card.name=="du") return player.hp>target.hp?-1:0;
								if(target.hasSkillTag("nogain")) return 0;
								return Math.max(1,get.value(card,player)-get.value(card,target));
							};
							const player=_status.event.player;
							const target=_status.event.getParent().player;
							let att=get.attitude(player,target);
							if(att<0){
								att=-Math.sqrt(-att);
							}
							else{
								att=Math.sqrt(att);
							}
							return att*gifts(player,target);
						});
					}
					else{
						event.finish();
					}
					"step 3"
					if(result.cards&&result.cards.length){
						const next=game.createEvent("_yongjian_zengyu");
						next.player=target;
						next.target=player;
						next.cards=result.cards;
						next.setContent(lib.skill._yongjian_zengyu.content);
					}
				}
			},
			ska_wangshi:{
				dutySkill:true,
				mod:{
					suit:(card,suit)=>{
						if(suit=="spade") return "diamond";
					}
				},
				group:"ska_wangshi_achieve",
				subSkill:{
					achieve:{
						trigger:{player:"phaseZhunbeiBegin"},
						filter:()=>game.filterPlayer2(current=>current.hasAllHistory("custom",evt=>evt.name=="judge")).map(current=>current.getAllHistory("custom",evt=>evt.name=="judge").length).reduce((previousValue,currentValue)=>previousValue+currentValue,0)>=11,
						forced:true,
						skillAnimation:true,
						animationColor:"fire",
						content:()=>{
							"step 0"
							game.log(player,"成功完成使命");
							player.awakenSkill("ska_wangshi");
							if(ui.discardPile.childNodes.length>1){
								const cards=[];
								cards.push(ui.discardPile.childNodes[ui.discardPile.childNodes.length-1]);
								cards.push(ui.discardPile.childNodes[ui.discardPile.childNodes.length-2]);
								player.gain(cards,"gain2");
							}
							else if(ui.discardPile.childNodes.length){
								const card=ui.discardPile.childNodes[ui.discardPile.childNodes.length-1];
								player.gain(card,"gain2");
								player.chat("只有一张牌可得了吗");
								game.log("但是弃牌堆里面已经只有一张牌了！");
							}
							else{
								player.chat("无牌可得了吗");
								game.log("但是弃牌堆里面已经没有牌了！");
							}
							"step 1"
							player.chooseCard("he","洋寻：重铸一张牌",true).set("ai",card=>5.5-get.value(card));
							"step 2"
							if(result.cards&&result.cards.length>0){
								player.loseToDiscardpile(result.cards).set("skill","_chongzhu");
								player.draw();
							}
							"step 3"
							if(player.maxHp>player.hp) player.recover(player.maxHp-player.hp,"nocard");
						}
					}
				}
			},
			//Olivia
			ska_shenqi:{
				preHidden:true,
				trigger:{global:"damageEnd"},
				init:player=>player.storage.renku=true,
				check:()=>_status.renku.length<6,
				content:()=>{
					player.judge(card=>Math.cbrt(get.value(card))).set("callback",()=>{
						if(get.position(card,true)=="o"){
							game.log(_status.event.player,"将",card,"置入了仁库");
							game.cardsGotoSpecial(card,"toRenku");
						}
					}).set("judge2",()=>true);
				},
				ai:{
					maixie:true
				},
				group:"ska_shenqi2"
			},
			ska_shenqi2:{
				trigger:{player:"useCard"},
				filter:event=>{
					if(!_status.renku.length) return false;
					for(const card of _status.renku){
						if(get.color(event.card)==get.color(card)) return true;
					}
					return false;
				},
				direct:true,
				content:()=>{
					"step 0"
					player.chooseCardButton(_status.renku,"###"+get.prompt("ska_shenqi2")+"###你可以从仁库中获得与此牌颜色相同的一张牌").set("filterButton",button=>get.color(button.link)==get.color(_status.event.getTrigger().card)).set("ai",button=>{
						if(get.name(button.link)=="du") return -10;
						if(_status.event.player.isPhaseUsing()) return _status.event.player.getUseValue(button.link)+5;
						return get.value(button.link)+5;
					});
					"step 1"
					if(result.links&&result.links.length){
						player.logSkill("ska_shenqi2");
						_status.renku.removeArray(result.links);
						game.updateRenku();
						player.gain(result.links,"fromRenku");
						player.$gain2(result.links,true);
					}
				}
			},
			ska_zhefu:{
				init:player=>player.storage.renku=true,
				enable:"phaseUse",
				usable:1,
				filter:()=>_status.renku&&_status.renku.length,
				chooseButton:{
					dialog:()=>ui.create.dialog("折赋",_status.renku,"hidden"),
					check:button=>get.value(button.link)+5,
					backup:links=>({
						filterCard:()=>false,
						selectCard:-1,
						filterTarget:true,
						card:links[0],
						delay:false,
						content:lib.skill.ska_zhefu.contentx,
						ai:{
							order:10,
							result:{
								target:()=>get.value(links[0])
							}
						}
					}),
					prompt:()=>"请选择〖折赋〗的目标",
				},
				contentx:()=>{
					"step 0"
					event.card=lib.skill.ska_zhefu_backup.card;
					_status.renku.remove(event.card);
					game.updateRenku();
					game.cardsGotoOrdering(event.card).set("fromRenku",true);
					player.showCards(event.card);
					target.chooseCard("he","折赋：【赠予】"+get.translation(player)+"一张牌，然后使用"+get.translation(event.card)+"，或获得"+get.translation(event.card)).set("ai",card=>{
						const gifts=(player,target)=>{
							if(target.hasSkillTag("refuseGifts")) return 0;
							if(get.type(card,false)=="equip") return get.effect(target,card,target,target);
							if(card.name=="du") return player.hp>target.hp?-1:0;
							if(target.hasSkillTag("nogain")) return 0;
							return Math.max(1,get.value(card,player)-get.value(card,target));
						};
						const player=_status.event.player;
						const target=_status.event.getParent().player;
						let att=get.attitude(player,target);
						if(att<0){
							att=-Math.sqrt(-att);
						}
						else{
							att=Math.sqrt(att);
						}
						return player.getUseValue(_status.event.getParent().card)-att*gifts(player,target);
					});
					"step 1"
					if(result.cards&&result.cards.length){
						const next=game.createEvent("_yongjian_zengyu");
						next.player=target;
						next.target=player;
						next.cards=result.cards;
						next.setContent(lib.skill._yongjian_zengyu.content);
					}
					else{
						target.gain(event.card,"gain2");
						event.finish();
					}
					"step 2"
					if(game.hasPlayer(current=>target.canUse(card,current))){
						target.chooseUseTarget(card,true,false);
					}
					else{
						game.cardsDiscard(card);
					}
				},
				ai:{
					expose:0.2,
					order:8,
					result:{
						player:1
					}
				}
			},
			//Super Xiaojie
			ska_kezhi:{
				trigger:{global:["useCard","respond"]},
				direct:true,
				filter:(event,player)=>player.countCards("hes")&&event.respondTo&&event.respondTo[0]&&event.respondTo[0]==player&&event.respondTo[1],
				content:()=>{
					player.addTempSkill("ska_kezhi_effect");
					const card=Object.assign({},trigger.respondTo[1]);
					delete card.isCard;
					const next=player.chooseToUse();
					next.set("logSkill","ska_kezhi");
					next.set("prompt",get.prompt("ska_kezhi"));
					next.set("prompt2","你可以失去1点体力并将一张牌当作"+get.translation(trigger.respondTo[1])+"使用，若此牌造成过伤害，你可以回复1点体力或摸两张牌");
					next.set("norestore",true);
					next.set("_backupevent","ska_kezhix");
					next.backup("ska_kezhix");
					next.set("addCount",false);
					next.set("custom",{
						add:{},
						replace:{window:()=>{}}
					});
					next.set("cardx",card);
					next.set("ai2",player.hp>1?get.effect_use:()=>0);
				}
			},
			ska_kezhix:{
				viewAs:()=>_status.event.cardx,
				filterCard:card=>get.itemtype(card)=="card",
				position:"hes",
				check:card=>5-get.value(card),
				onuse:(result,player)=>player.loseHp()
			},
			ska_kezhi_effect:{
				charlotte:true,
				trigger:{player:"useCardAfter"},
				filter:event=>event.skill=="ska_kezhix"&&game.cardCausedDamage(event.card),
				silent:true,
				content:()=>{
					player.chooseDrawRecover(2,"恪志：你可以回复1点体力或摸两张牌");
				}
			},
			ska_jiyan:{
				dutySkill:true,
				locked:true,
				init:player=>{
					if(!Array.isArray(player.storage.ska_jiyan)) player.storage.ska_jiyan=["sha","shan","tao","jiu"];
				},
				group:["ska_jiyan_sha","ska_jiyan_shan","ska_jiyan_tao","ska_jiyan_jiu","ska_jiyan_achieve"],
				subSkill:{
					sha:{
						locked:false,
						mod:{
							targetInRange:card=>{
								if(card.storage&&card.storage.ska_jiyan) return true;
							}
						},
						enable:["chooseToUse","chooseToRespond"],
						filterCard:()=>false,
						selectCard:-1,
						viewAs:{name:"sha",isCard:true,storage:{ska_jiyan:true}},
						filter:(event,player)=>player.storage.ska_jiyan.contains("sha"),
						prompt:()=>"视为使用或打出一张【杀】",
						precontent:()=>{
							player.logSkill("ska_jiyan");
							delete event.result.skill;
							player.popup("《话语权》");
							player.chat("《话语权》");
							player.storage.ska_jiyan.remove("sha");
						},
						ai:{
							respondSha:true,
							skillTagFilter:player=>{
								if(!player.storage.ska_jiyan.contains("sha")) return false;
							},
							order:()=>get.order({name:"sha",isCard:true})+0.1,
							useful:-1,
							value:-1
						}
					},
					shan:{
						locked:false,
						enable:["chooseToUse","chooseToRespond"],
						filterCard:()=>false,
						selectCard:-1,
						viewAs:{name:"shan",isCard:true},
						prompt:()=>"视为使用或打出一张【闪】",
						filter:(event,player)=>player.storage.ska_jiyan.contains("shan"),
						precontent:()=>{
							player.logSkill("ska_jiyan");
							delete event.result.skill;
							player.popup("《理解》");
							player.chat("《理解》");
							player.storage.ska_jiyan.remove("shan");
						},
						ai:{
							respondShan:true,
							skillTagFilter:player=>{
								if(!player.storage.ska_jiyan.contains("shan")) return false;
							},
							order:()=>get.order({name:"shan",isCard:true})+0.1,
							useful:-1,
							value:-1
						}
					},
					tao:{
						locked:false,
						enable:["chooseToUse","chooseToRespond"],
						filterCard:()=>false,
						selectCard:-1,
						viewAs:{name:"tao",isCard:true},
						prompt:()=>"视为使用或打出一张【桃】",
						filter:(event,player)=>player.storage.ska_jiyan.contains("tao"),
						precontent:()=>{
							player.logSkill("ska_jiyan");
							delete event.result.skill;
							player.popup("《硬气》");
							player.chat("《硬气》");
							player.storage.ska_jiyan.remove("tao");
						},
						ai:{
							save:true,
							respondTao:true,
							skillTagFilter:player=>{
								if(!player.storage.ska_jiyan.contains("tao")) return false;
							},
							order:()=>get.order({name:"tao",isCard:true})+0.1,
							useful:-1,
							value:-1
						}
					},
					jiu:{
						locked:false,
						enable:["chooseToUse","chooseToRespond"],
						filterCard:()=>false,
						selectCard:-1,
						viewAs:{name:"jiu",isCard:true},
						prompt:()=>"视为使用或打出一张【酒】",
						filter:(event,player)=>player.storage.ska_jiyan.contains("jiu"),
						precontent:()=>{
							player.logSkill("ska_jiyan");
							delete event.result.skill;
							player.popup("《压迫感》");
							player.chat("《压迫感》");
							player.storage.ska_jiyan.remove("jiu");
						},
						ai:{
							save:true,
							skillTagFilter:player=>{
								if(!player.storage.ska_jiyan.contains("jiu")) return false;
							},
							order:()=>get.order({name:"jiu",isCard:true})+0.1,
							useful:-1,
							value:-1
						}
					},
					achieve:{
						skillAnimation:true,
						animationColor:"wood",
						forced:true,
						trigger:{player:"useCardAfter"},
						filter:(event,player)=>!player.storage.ska_jiyan.length,
						content:()=>{
							game.log(player,"成功完成使命");
							player.awakenSkill("ska_jiyan");
							player.gainMaxHp();
							player.recover("nocard");
						}
					}
				}
			},
			ska_jingli:{
				enable:"phaseUse",
				usable:1,
				filterTarget:lib.filter.notMe,
				filterCard:true,
				selectCard:()=>Math.ceil(_status.event.player.countCards()/2),
				check:card=>7-get.useful(card),
				discard:false,
				lose:false,
				delay:false,
				position:"he",
				content:()=>{
					"step 0"
					player.give(cards,target);
					"step 1"
					const num=Math.ceil(target.countCards()/2);
					if(num){
						target.chooseCard("径理：交给"+get.translation(player)+get.cnNumber(num)+"张牌",num,"he",true);
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.cards&&result.cards.length) target.give(result.cards,player);
				},
				ai:{
					order:7,
					result:{
						target:(player,target)=>{
							if(!ui.selected.cards.length) return;
							if(get.attitude(player,target)>0) return Math.cbrt(ui.selected.cards.map(card=>get.useful(card)).reduce((previousValue,currentValue)=>previousValue+currentValue,0));
							return ui.selected.cards.length-(target.countCards()+ui.selected.cards.length)/2;
						}
					}
				}
			},
			ska_zhiyi:{
				init:player=>player.addSkill("ska_zhiyi2"),
				frequent:true,
				trigger:{player:"useCardAfter"},
				direct:true,
				filter:(event,player)=>player.hasHistory("lose",evt=>{
					if(evt.getParent()!=event) return false;
					for(const i in evt.gaintag_map){
						if(evt.gaintag_map[i].contains("ska_zhiyi")) return true;
					}
					return false;
				}),
				content:()=>{
					"step 0"
					if(trigger.ska_zhiyi){
						const card=Object.assign({},trigger.card);
						delete card.isCard;
						const next=player.chooseToUse();
						next.set("logSkill","ska_zhiyi");
						next.set("prompt",get.prompt("ska_zhiyi"));
						next.set("prompt2","你可以将一张牌当作"+get.translation(trigger.card)+"使用");
						next.set("norestore",true);
						next.set("_backupevent","ska_zhiyix");
						next.backup("ska_zhiyix");
						next.set("addCount",false);
						next.set("custom",{
							add:{},
							replace:{window:()=>{}}
						});
						next.set("cardx",card);
						event.finish();
					}
					else{
						player.chooseBool(get.prompt("ska_zhiyi"),"你可以摸一张牌").set("frequentSkill","ska_zhiyi");
					}
					"step 1"
					if(result.bool){
						player.logSkill("ska_zhiyi");
						player.draw("nodelay");
					}
				},
				ai:{
					effect:{
						player:card=>{
							if(get.itemtype(card)=="card"&&card.hasGaintag("ska_zhiyi")) return [1,1];
						}
					}
				},
				group:"ska_zhiyi_respond",
				subSkill:{
					respond:{
						trigger:{global:["respond","useCard"]},
						filter:(event,player)=>{
							if(!event.respondTo) return false;
							if(player!=event.respondTo[0]) return false;
							return true;
						},
						silent:true,
						content:()=>{
							trigger.getParent("useCard").set("ska_zhiyi",true);
						}
					}
				}
			},
			ska_zhiyix:{
				viewAs:()=>_status.event.cardx,
				filterCard:card=>get.itemtype(card)=="card",
				position:"hes",
				check:card=>{
					let val=5-get.value(card);
					if(card.hasGaintag("ska_zhiyi")) val++;
					return val;
				}
			},
			ska_zhiyi2:{
				charlotte:true,
				trigger:{player:"gainEnd"},
				silent:true,
				filter:event=>event.source,
				content:()=>{
					player.addGaintag(trigger.cards,"ska_zhiyi");
				}
			},
			//SP Yumikohimi
			ymk_qiuyi:{
				preHidden:true,
				usable:1,
				trigger:{global:"useCardAfter"},
				direct:true,
				filter:(event,player)=>!["shan","wuxie"].contains(get.name(event.card))&&["basic","trick"].contains(get.type(event.card))&&(event.player.hp>=player.hp||event.player.countCards("h")>=player.countCards("h")),
				content:()=>{
					"step 0"
					player.chooseCard("he",get.prompt2("ymk_qiuyi",trigger.player)).set("ai",card=>_status.event.player.getUseValue(_status.event.getTrigger().card)-7+get.value(card));
					"step 1"
					if(result.cards&&result.cards.length){
						player.logSkill("ymk_qiuyi",trigger.player);
						player.give(result.cards,trigger.player);
						trigger.player.addTempSkill("ymk_qiuyi_effect");
						trigger.player.addMark("ymk_qiuyi_effect",1,false);
					}
					else{
						player.storage.counttrigger[event.name]--;
						event.finish();
					}
					"step 2"
					player.chooseUseTarget("求艺：使用"+get.translation(trigger.card),trigger.card,false);
				},
				ai:{
					threaten:2
				}
			},
			ymk_qiuyi_effect:{
				charlotte:true,
				intro:{
					content:(storage,player)=>"本回合你的手牌上限+"+storage+"<br>当前你的手牌上限："+player.getHandcardLimit()
				},
				onremove:true,
				mod:{
					maxHandcard:(player,num)=>num+player.countMark("ymk_qiuyi_effect")
				}
			},
			ymk_xifang:{
				usable:1,
				trigger:{source:"gainAfter"},
				filter:event=>event.player.countCards("h"),
				frequent:true,
				logTarget:"player",
				content:()=>{
					"step 0"
					player.viewHandcards(trigger.player);
					"step 2"
					const colors=[];
					const types=[];
					trigger.player.getCards("h").forEach(card=>{
						if(!colors.contains(get.color(card))) colors.push(get.color(card));
						if(!types.contains(get.type(card,"trick"))) types.push(get.type(card,"trick"));
					});
					if(colors.length>1||types.length>1) player.draw();
				}
			},
			//Professor Toad
			ska_juegu:{
				direct:true,
				trigger:{player:"phaseUseEnd"},
				filter:(event,player)=>{
					let num=0;
					player.getHistory("gain",evt=>{
						const phaseDraw=evt.getParent(2);
						if(!phaseDraw||phaseDraw.name!="phaseDraw") num+=evt.cards.length;
					});
					if(num<player.getHp()) return false;
					return player.countCards("he");
				},
				content:()=>{
					"step 0"
					player.chooseCardTarget({
						position:"he",
						filterTarget:lib.skill._yongjian_zengyu.filterTarget,
						ai1:card=>{
							const player=_status.event.player;
							const gifts=lib.skill._yongjian_zengyu.check(card);
							if(player.needsToDiscard()&&game.checkMod(card,player,false,"ignoredHandcard",player)!=true) return 9-get.useful(card)+gifts;
							return 5-get.useful(card)+gifts;
						},
						ai2:target=>{
							const player=_status.event.player;
							let att=get.attitude(player,target);
							if(att<0){
								att=-Math.sqrt(-att);
							}
							else{
								att=Math.sqrt(att);
							}
							return att*lib.skill._yongjian_zengyu.ai.result.target(player,target)+get.damageEffect(target,player,player);
						},
						prompt:get.prompt("ska_juegu"),
						prompt2:get.skillInfoTranslation("ska_juegu")
					});
					"step 1"
					if(result.cards&&result.cards.length&&result.targets&&result.targets.length){
						event.target=result.targets[0];
						player.logSkill("ska_juegu",event.target);
						const next=game.createEvent("_yongjian_zengyu");
						next.player=player;
						next.target=event.target;
						next.cards=result.cards;
						next.setContent(lib.skill._yongjian_zengyu.content);
					}
					else{
						event.finish();
					}
					"step 2"
					player.chooseBool("掘古：是否对"+get.translation(target)+"造成1点伤害？").set("ai",()=>get.damageEffect(_status.event.getParent().target,_status.event.player,_status.event.player)>0);
					"step 3"
					if(result.bool) target.damage(player,"nocard");
					"step 4"
					player.addExpose(0.1);
				},
				ai:{
					damage:true
				}
			},
			ska_kuiwang:{
				delay:false,
				hiddenCard:(player,name)=>name!="wuxie"&&player.countCards("he"),
				enable:["chooseToUse","chooseToRespond"],
				filter:(event,player)=>!event.ska_kuiwang&&!event.filterCard({name:"wuxie"},player,event)&&player.countCards("he"),
				filterCard:true,
				position:"he",
				discard:false,
				loseTo:"cardPile",
				insert:true,
				prepare:(cards,player)=>{
					const hs=[],nhs=[];
					cards.forEach(card=>{
						if(get.position(card)=="h"){
							hs.push(card);
						}
						else{
							nhs.push(card);
						}
					});
					if(hs.length){
						player.$throw(hs.length);
						game.log(player,"将"+get.cnNumber(hs.length)+"张牌置于牌堆顶");
					}
					if(nhs.length){
						player.$throw(nhs);
						game.log(player,"将",nhs,"置于牌堆顶");
					}
				},
				check:card=>5-get.value(card),
				content:()=>{
					const evt=event.getParent(2);
					evt.set("ska_kuiwang",true);
					evt.goto(0);
					player.gain(get.bottomCards(),"gain2");
				},
				ai:{
					result:{
						player:1
					}
				}
			},
			//Edelgard
			mnm_tianjiu:{
				forced:true,
				trigger:{player:"phaseUseBegin"},
				content:()=>{
					"step 0"
					player.chooseToDiscard("天鹫：你须弃置一张手牌或失去1点体力，视为对攻击范围内任意名角色使用一张【杀】").set("ai",get.unuseful3);
					"step 1"
					if(!result.cards||!result.cards.length) player.loseHp();
					"step 2"
					if(player.hasUseTarget({name:"sha",isCard:true})) player.chooseUseTarget("天鹫：视为对攻击范围内任意名角色使用一张【杀】",{name:"sha",isCard:true},true,false).set("selectTarget",[1,Infinity]);
				}
			},
			mnm_yanhai:{
				skillAnimation:true,
				animationColor:"fire",
				juexingji:true,
				unique:true,
				forced:true,
				trigger:{player:"dieBefore"},
				filter:(event,player)=>player.identity!="zhu",
				content:()=>{
					"step 0"
					player.awakenSkill("mnm_yanhai");
					trigger.cancel();
					"step 1"
					if(2-player.hp>0) player.recover(2-player.hp,"nocard");
					"step 2"
					player.draw(3);
					"step 3"
					player.addTempSkill("mnm_yanhai2",{player:"die"});
					"step 4"
					game.broadcastAll(player=>{
						player.identity="nei";
						player.setIdentity("炎");
						player.identityShown=true;
						player.node.identity.dataset.color="zhu";
					},player);
				}
			},
			mnm_yanhai2:{
				mod:{
					inRange:()=>true
				}
			},
			//SP Kyo Kusanagi
			alz_wushi:{
				trigger:{player:"useCardToPlayered"},
				filter:(event,player)=>event.targets&&event.targets.length==1&&player.canCompare(event.target),
				logTarget:"target",
				check:(event,player)=>get.attitude(player,event.target)<0,
				content:()=>{
					"step 0"
					player.chooseToCompare(trigger.target);
					"step 1"
					if(result.bool) event.num=get.distance(player,trigger.target)+1;
					"step 2"
					event.num--;
					if(event.num>=0){
						const next=player.chooseToUse("无式：你可以对"+get.translation(trigger.target)+"使用一张【杀】（剩余"+event.num+"次）");
						next.set("addCount",false);
						next.set("targetx",trigger.target);
						next.set("filterCard",card=>get.name(card)=="sha"&&lib.filter.targetEnabled(card,_status.event.player,_status.event.targetx));
						next.set("filterTarget",(card,player,target)=>target==_status.event.targetx&&lib.filter.targetEnabled(card,player,target));
					}
					else{
						event.finish();
					}
					"step 3"
					if(result.bool) event.goto(2);
				},
				ai:{
					expose:0.2
				}
			},
			alz_huangyao:{
				enable:["chooseToUse","chooseToRespond"],
				filterCard:card=>get.color(card)=="red",
				position:"hes",
				viewAs:{name:"sha",nature:"fire"},
				viewAsFilter:player=>{
					if(!player.countCards("hes",card=>get.color(card)=="red")) return false;
				},
				check:card=>5-get.value(card),
				ai:{
					skillTagFilter:player=>{
						if(!player.countCards("hes",card=>get.color(card)=="red")) return false;
					},
					respondSha:true
				}
			},
			//SP Captain Falcon
			mnm_jijing:{
				derivation:"mnm_jijing_faq",
				enable:"phaseUse",
				usable:1,
				delay:false,
				filterTarget:lib.filter.notMe,
				content:()=>{
					"step 0"
					event.rank={};
					event.beatmap=lib.skill.mnm_jijing.beatmaps.slice(0).randomGet();
					event.targets=[player,target].sortBySeat(_status.currentPhase);
					event.num=0;
					"step 1"
					targets[num].chooseToPlayBeatmap(event.beatmap);
					"step 2"
					event.rank[targets[num].playerid]=result.rank[0];
					targets[num].popup(result.rank[0],result.rank[1]);
					game.log(targets[num],"的演奏评级为","#y"+result.rank[0]);
					"step 3"
					event.num++;
					if(event.num<targets.length) event.goto(1);
					"step 4"
					const grade=rank=>{
						switch(rank){
							case "D":return 1;
							case "C":return 2;
							case "B":return 3;
							case "A":return 4;
							case "S":return 5;
							case "SS":return 6;
							default:return 0;
						}
					}
					const gradePlayer=grade(event.rank[player.playerid]);
					const gradeTarget=grade(event.rank[target.playerid]);
					if(gradePlayer>gradeTarget){
						game.log(player,"#y胜");
						player.popup("胜");
						target.popup("负");
						player.line(target,"green");
						target.damage(player,"nocard");
					}
					else if(gradePlayer<gradeTarget){
						game.log(target,"#y胜");
						player.popup("负");
						target.popup("胜");
						target.line(player,"green");
						player.damage(target,"nocard");
					}
					else{
						game.log(player,"、",target,"#y平");
						player.popup("平");
						target.popup("平");
						player.line(target,"green");
						target.line(player,"green");
						game.asyncDraw([player,target],2);
					}
					"step 5"
					game.delayx();
				},
				ai:{
					order:10,
					result:{
						target:(player,target)=>Math.cbrt(get.damageEffect(target,player,target))
					}
				},
				beatmaps:[
					{
						//歌曲名称
						name:"鳥の詩",
						//歌曲文件名（默认在audio/effect文件夹下 若要重定向到扩展 请写为"ext:扩展名称"的格式 并将文件名重命名为和上面的歌曲名称相同）
						filename:"tori_no_uta",
						//每个音符的开始时间点（毫秒，相对未偏移的开始播放时间）
						timeleap:[1047,3012,4978,5469,5961,6452,6698,7435,8909,10875,12840],
						//开始播放时间的偏移量（毫秒）
						current:-110,
						//判定栏高度（相对整个对话框高度比例）
						judgebar_height:0.16,
						//Good/Great/Prefect的位置判定范围（百分比，相对于整个对话框。以滑条的底部作为判定基准）
						range1:[84,110],
						range2:[90,104],
						range3:[94,100],
						//滑条每相对于整个对话框下落1%所需的时间（毫秒）
						speed:25
					},
					{
						name:"竹取飛翔　～ Lunatic Princess",
						filename:"taketori_hishou",
						timeleap:[1021,1490,1959,2896,3834,4537,4771,5709,6646,7585,8039,8494,9403,10291,11180,11832,12049,12920,13345,13771,14196],
						current:-110,
						judgebar_height:0.16,
						range1:[84,110],
						range2:[90,104],
						range3:[94,100],
						speed:25,
						node_color:"linear-gradient(rgba(250, 170, 190, 1), rgba(240, 160, 180, 1))",
						judgebar_color:"linear-gradient(rgba(240, 120, 243, 1), rgba(245, 106, 230, 1))"
					},
					{
						name:"ignotus",
						filename:"ignotus",
						timeleap:[0,1412,2824,4235,5647,5824,7059,8294,8471,9882,10941,11294,12000,12706,13412,14118,14824,15529,15882,16059,16235,16412,16588],
						current:-110,
						judgebar_height:0.16,
						range1:[84,110],
						range2:[90,104],
						range3:[94,100],
						speed:25,
						node_color:"linear-gradient(rgba(240, 250, 240, 1), rgba(230, 240, 230, 1))",
						judgebar_color:"linear-gradient(rgba(161, 59, 150, 1), rgba(58, 43, 74, 1))"
					},
					{
						name:"Super Mario 3D World Theme",
						filename:"sm3dw_overworld",
						timeleap:[0,1071,1518,2054,4018,4286,5357,6429,7500,8571,9643,10714,11786,12321,12589,12857,13929,15000,16071,17143,18214,18482,18750,19018,19286,20357],
						current:-110,
						judgebar_height:0.16,
						range1:[84,110],
						range2:[90,104],
						range3:[94,100],
						speed:25,
						node_color:"linear-gradient(rgba(120, 130, 240, 1), rgba(100, 100, 230, 1))",
						judgebar_color:"linear-gradient(rgba(230, 40, 30, 1), rgba(220, 30, 10, 1))"
					},
					{
						//Song name
						name:"Big Blue",
						//Song filename
						filename:"sst_big_blue",
						//Beatmap (millisecond)
						timeleap:[2596,3462,3606,4904,5769,5913,7212,8077,8221,9519,10385,10529,10962,11106,11250,11394,11538,11683,11827,12692,12837,14135,15000,15144,15577,15721,16154,16298,16442,17308,17452,18173,18389,18606,18750,18894,19615,19760],
						//Offset
						current:0,
						//Judge bar height
						judgebar_height:0.16,
						//Judge range of Good/Great/Prefect
						range1:[84,110],
						range2:[90,104],
						range3:[94,100],
						//Speed
						speed:25,
						node_color:"linear-gradient(#bffafdff, #a8edfdff)",
						judgebar_color:"linear-gradient(#3c5d78ff, #34484dff)"
					}
				]
			},
			//King Olly
			ska_shenqi_alter:{
				preHidden:true,
				trigger:{global:"damageSource"},
				init:player=>player.storage.renku=true,
				check:()=>_status.renku.length<6,
				content:()=>{
					"step 0"
					const cards=get.bottomCards();
					game.cardsGotoSpecial(cards,"toRenku");
					player.$throw(cards);
					game.log(player,"将",cards,"置入了仁库");
					"step 1"
					game.broadcastAll(ui.clear);
				},
				ai:{
					maixie:true
				},
				group:"ska_shenqi_alter2"
			},
			ska_shenqi_alter2:{
				trigger:{player:"useCard"},
				filter:event=>{
					if(!_status.renku.length) return false;
					for(const card of _status.renku){
						if(get.color(event.card)==get.color(card)) return true;
					}
					return false;
				},
				direct:true,
				content:()=>{
					"step 0"
					player.chooseCardButton(_status.renku,"###"+get.prompt("ska_shenqi_alter2")+"###你可以从仁库中获得与此牌颜色不同的一张牌").set("filterButton",button=>get.color(button.link)!=get.color(_status.event.getTrigger().card)).set("ai",button=>{
						if(get.name(button.link)=="du") return -10;
						if(_status.event.player.isPhaseUsing()) return _status.event.player.getUseValue(button.link)+5;
						return get.value(button.link)+5;
					});
					"step 1"
					if(result.links&&result.links.length){
						player.logSkill("ska_shenqi_alter2");
						_status.renku.removeArray(result.links);
						game.updateRenku();
						player.gain(result.links,"fromRenku");
						player.$gain2(result.links,true);
					}
				}
			},
			ska_zhesheng:{
				init:player=>player.storage.renku=true,
				enable:"phaseUse",
				usable:1,
				filter:()=>_status.renku&&_status.renku.length,
				chooseButton:{
					dialog:()=>ui.create.dialog("折生",_status.renku,"hidden"),
					check:button=>get.value(button.link)+5,
					backup:links=>({
						filterCard:()=>false,
						selectCard:-1,
						filterTarget:(card,player,target)=>{
							if(!ui.selected.targets.length) return game.hasPlayer(current=>current!=target&&lib.filter.targetEnabled3(lib.skill.ska_zhesheng_backup.cards[0],target,current));
							return lib.filter.targetEnabled3(lib.skill.ska_zhesheng_backup.cards[0],ui.selected.targets[0],target);
						},
						selectTarget:2,
						multitarget:true,
						targetprompt:["使用者","使用目标"],
						complexTarget:true,
						cards:links,
						delay:false,
						content:lib.skill.ska_zhesheng.contentx,
						ai:{
							order:10,
							result:{
								target:(player,target)=>{
									if(!ui.selected.targets.length){
										return game.filterPlayer(current=>current!=target).map(current=>get.effect(current,lib.skill.ska_zhesheng_backup.cards[0],target,target)).reduce((previousValue,currentValue)=>{
											if(get.attitude(player,target)<0) return Math.min(previousValue,currentValue);
											return Math.max(previousValue,currentValue);
										},0);
									}
									return get.effect(target,lib.skill.ska_zhesheng_backup.cards[0],ui.selected.targets[0],target);
								}
							}
						}
					}),
					prompt:()=>"请选择〖折生〗的目标",
				},
				contentx:()=>{
					"step 0"
					event.card=lib.skill.ska_zhesheng_backup.cards[0];
					_status.renku.remove(event.card);
					game.updateRenku();
					game.cardsGotoOrdering(event.card).set("fromRenku",true);
					player.showCards(event.card);
					"step 1"
					targets[0].useCard(card,targets[1],false,"noai");
				},
				ai:{
					expose:0.2,
					order:6,
					result:{
						player:1
					}
				},
				group:"ska_zhesheng2"
			},
			ska_zhesheng2:{
				forced:true,
				popup:false,
				trigger:{global:"useCard1"},
				filter:event=>event.getParent().name=="ska_zhesheng_backup",
				content:()=>{
					trigger.directHit.addArray(game.players);
				}
			},
			//Koopa Troopa
			ska_suixuan:{
				forced:true,
				trigger:{player:"damageEnd"},
				content:()=>{
					player.turnOver();
				},
				ai:{
					maixie_defend:true,
					threaten:0.8
				},
				group:"ska_suixuan2"
			},
			ska_suixuan2:{
				forced:true,
				trigger:{player:"turnOverAfter"},
				content:()=>{
					"step 0"
					player.chooseUseTarget("随旋：视为使用一张无距离限制的【杀】",{name:"sha",isCard:true},false,"nodistance",true);
					"step 1"
					player.chooseToDiscard("随旋：弃置一张牌","he",true);
				}
			},
			ska_xiangshi:{
				enable:"phaseUse",
				usable:1,
				delay:false,
				content:()=>{
					"step 0"
					player.turnOver();
					"step 1"
					player.chooseToRespond("向矢：你可以打出一张牌，然后弃置一名角色区域内的一张牌，若这两张牌的花色相同，你翻面").set("ai",card=>{
						const player=_status.event.player;
						if(!game.hasPlayer(current=>current.countDiscardableCards(player,"hej"))) return 0;
						if(!game.hasPlayer(current=>{
							let att=get.attitude(player,current);
							if(att<0){
								att=-Math.sqrt(-att);
							}
							else{
								att=Math.sqrt(att);
							}
							return att*lib.card.guohe.ai.result.target(player,current)>0;
						})) return 0;
						return get.unuseful2(card);
					}).set("position","hes");
					"step 2"
					if(result.card){
						event.card=result.card;
						player.chooseTarget("向矢：弃置一名角色区域内的一张牌",(card,player,target)=>target.countDiscardableCards(player,"hej")).set("ai",target=>{
							const player=_status.event.player;
							let att=get.attitude(player,target);
							if(att<0){
								att=-Math.sqrt(-att);
							}
							else{
								att=Math.sqrt(att);
							}
							return att*lib.card.guohe.ai.result.target(player,target);
						});
					}
					else{
						event.finish();
					}
					"step 3"
					if(result.targets&&result.targets.length){
						player.line(result.targets,"green");
						player.discardPlayerCard("向矢：弃置"+get.translation(result.targets)+"区域内的一张牌",result.targets[0],"hej",true);
					}
					else{
						event.finish();
					}
					"step 4"
					if(result.cards&&result.cards.length&&get.suit(card)==get.suit(result.cards[0])) player.turnOver();
				},
				ai:{
					expose:0.2,
					order:7,
					result:{
						player:1
					}
				}
			},
			//SP 9-Volt & 18-Volt
			mnm_huaijiu:{
				derivation:"mnm_huaijiu_faq",
				unique:true,
				direct:true,
				trigger:{player:"phaseZhunbeiBegin"},
				content:()=>{
					"step 0"
					const list=[
						"caocao","simayi","xiahoudun","zhangliao","xuzhu","guojia","zhenji","liubei","guanyu","zhangfei","zhugeliang","zhaoyun","machao","huangyueying","sunquan","ganning","lvmeng","huanggai","zhouyu","daqiao","luxun","sunshangxiang","huatuo","lvbu","diaochan",
						"huaxiong","re_yuanshu",
						"gongsunzan","xf_yiji"
					];
					player.chooseButton([get.prompt2("mnm_huaijiu"),[list,"character"]]).set("ai",button=>{
						const skills=lib.characterPack.sst_legacy[button.link][3];
						if(!Array.isArray(skills)) return 0;
						return skills.map(i=>(get.skillRank(i,"in")+get.skillRank(i,"out"))/2).reduce((previousValue,currentValue)=>previousValue+currentValue,0)/skills.length+Math.random();
					});
					"step 1"
					if(result.links&&result.links.length){
						player.logSkill("mnm_huaijiu");
						player.flashAvatar("mnm_huaijiu",result.links[0]);
						player.popup(result.links[0],"thunder");
						game.log(player,"选择了","#b"+get.translation(result.links[0]));
						const skills=lib.characterPack.sst_legacy[result.links[0]][3];
						if(Array.isArray(skills)){
							skills.forEach(i=>{
								player.addTempSkill(i,{player:"phaseBegin"});
								player.popup(i,"thunder");
								game.log(player,"获得了技能","#g【"+get.translation(i)+"】");
							});
						}
					}
				}
			},
			//SP Robin
			nnk_yuanlei:{
				locked:false,
				mod:{
					targetInRange:card=>{
						if(card.storage&&card.storage.nnk_yuanlei) return true;
					}
				},
				enable:"phaseUse",
				usable:1,
				filterCard:true,
				selectCard:()=>[1,_status.event.player.maxHp],
				position:"hes",
				viewAs:{name:"sha",nature:"thunder",storage:{nnk_yuanlei:true}},
				viewAsFilter:player=>{
					if(!player.countCards("hs")) return false;
				},
				check:card=>5-get.value(card),
				onuse:(result,player)=>player.addTempSkill("nnk_yuanlei_effect"),
				ai:{
					order:()=>get.order({name:"sha"})+0.1,
					skillTagFilter:(player,tag,arg)=>{
						if(arg!="use") return false;
						if(!player.isPhaseUsing()) return false;
						if(!player.countCards("hs")) return false;
					},
					respondSha:true
				}
			},
			nnk_yuanlei_effect:{
				charlotte:true,
				trigger:{player:"useCardBegin"},
				forced:true,
				popup:false,
				filter:event=>event.skill=="nnk_yuanlei",
				content:()=>{
					const next=game.createEvent("nnk_yuanlei_clear");
					event.next.remove(next);
					trigger.after.push(next);
					next.set("player",player);
					next.set("card",trigger.card);
					next.set("cards",trigger.cards);
					next.setContent(()=>{
						if(game.cardCausedDamage(card)&&cards&&cards.length){
							if(cards.length>=1) player.addTempSkill("nnk_yuanlei_effect1");
							if(cards.length>=2) player.draw(2);
							if(cards.length>=3){
								player.addTempSkill("nnk_yuanlei_effect3");
								player.addMark("nnk_yuanlei_effect3",1,false);
							}
							if(cards.length>=4){
								player.addTempSkill("nnk_yuanlei_effect4");
								player.addMark("nnk_yuanlei_effect4",2,false);
							}
						}
					});
				}
			},
			nnk_yuanlei_effect1:{
				charlotte:true,
				forced:true,
				mark:true,
				intro:{
					content:"本回合你使用的下一张牌不可被响应"
				},
				trigger:{player:"useCard"},
				content:()=>{
					trigger.directHit.addArray(game.players);
					player.removeSkill("nnk_yuanlei_effect1");
				}
			},
			nnk_yuanlei_effect3:{
				charlotte:true,
				intro:{
					content:"本回合你可以额外使用&张【杀】，且使用【杀】可以额外指定&个目标"
				},
				onremove:true,
				mod:{
					cardUsable:(card,player,num)=>{
						if(card.name=="sha") return num+player.countMark("nnk_yuanlei_effect3");
					},
					selectTarget:(card,player,range)=>{
						if(card.name!="sha") return;
						if(range[1]==-1) return;
						range[1]+=player.countMark("nnk_yuanlei_effect3");
					}
				}
			},
			nnk_yuanlei_effect4:{
				charlotte:true,
				forced:true,
				intro:{
					content:"本回合你使用的下一张【杀】伤害值基数+#"
				},
				onremove:true,
				trigger:{player:"useCard1"},
				filter:event=>event.card&&get.name(event.card)=="sha",
				content:()=>{
					trigger.baseDamage+=player.countMark("nnk_yuanlei_effect4");
					player.removeSkill("nnk_yuanlei_effect4");
				},
				ai:{
					damageBonus:true
				}
			},
			//Yuri Kozukata
			alz_yingjian:{
				init:player=>player.storage.renku=true,
				direct:true,
				trigger:{global:"phaseJieshuBegin"},
				filter:(event,player)=>{
					if(!_status.renku.length||!game.hasPlayer2(current=>current.hasHistory("useCard",evt=>evt.targets.contains(player)))) return false;
					const used=[];
					game.filterPlayer2(current=>current.getHistory("useCard",evt=>{
						if(!used.contains(evt.card)&&["basic","trick"].contains(get.type(evt.card))) used.push(evt.card);
					}));
					return used.length;
				},
				content:()=>{
					"step 0"
					const used=[];
					game.filterPlayer2(current=>current.getHistory("useCard",evt=>{
						if(!used.contains(evt.card)&&["basic","trick"].contains(get.type(evt.card))) used.push(evt.card);
					}));
					player.chooseButton([get.prompt2("alz_yingjian"),"仁库中的牌",_status.renku,"本回合使用过的基本牌或普通锦囊牌",[used.map(card=>[card.suit,card.number,card.name,card.nature]),"vcard"]]).set("filterButton",button=>{
						if(_status.renku.contains(button.link)){
							if(!ui.selected.buttons.length) return true;
							for(const i of ui.selected.buttons){
								if(_status.renku.contains(i.link)) return false;
							}
							return true;
						}
						return _status.event.player.hasUseTarget({suit:button.link[0],number:button.link[1],name:button.link[2],nature:button.link[3]});
					}).set("ai",button=>{
						if(_status.renku.contains(button.link)){
							if(!ui.selected.buttons.length) return 1;
							for(const i of ui.selected.buttons){
								if(_status.renku.contains(i.link)) return 0;
							}
							return 1;
						}
						return _status.event.player.getUseValue({suit:button.link[0],number:button.link[1],name:button.link[2],nature:button.link[3]});
					}).set("selectButton",2).set("complexSelect",true);
					"step 1"
					if(result.links&&result.links.length>1){
						player.logSkill("alz_yingjian");
						let card,viewAs;
						result.links.forEach(link=>{
							if(_status.renku.contains(link)){
								card=link;
							}
							else{
								viewAs=link;
							}
						});
						_status.renku.remove(card);
						game.updateRenku();
						game.cardsGotoOrdering(card).set("fromRenku",true);
						player.chooseUseTarget({suit:viewAs[0],number:viewAs[1],name:viewAs[2],nature:viewAs[3]},[card],false,true).set("viewAs",true);
					}
				},
				ai:{
					threaten:()=>{
						if(_status.renku&&_status.renku.length) return 0.8;
						return 1;
					}
				}
			},
			alz_qushui:{
				mark:true,
				marktext:"☯",
				intro:{
					content:storage=>storage?"转换技，出牌阶段限一次，你可以将三张牌置于仁库中，令一名角色本轮非锁定技失效。":"转换技，出牌阶段限一次，你可以将三张牌置于仁库中，令一名角色翻面。"
				},
				init:player=>player.storage.renku=true,
				zhuanhuanji:true,
				enable:"phaseUse",
				usable:1,
				filterTarget:true,
				filterCard:true,
				selectCard:3,
				discard:false,
				lose:false,
				delay:false,
				position:"he",
				check:card=>7-get.value(card),
				content:()=>{
					"step 0"
					event.rotation=player.storage.alz_qushui==true;
					player.changeZhuanhuanji(event.name);
					player.$throw(cards);
					game.log(player,"将",cards,"置入了仁库");
					player.lose(cards,ui.special,"toRenku");
					"step 1"
					game.delayx();
					"step 2"
					if(!event.rotation){
						target.turnOver();
					}
					else{
						target.addTempSkill("fengyin","roundStart");
					}
					"step 3"
					game.delayx();
				},
				ai:{
					threaten:1.25,
					order:5,
					result:{
						target:(player,target)=>{
							if(!player.storage.alz_qushui){
								if(target.hasSkillTag("noturn")) return -0.5;
								return target.isTurnedOver()?2:-2;
							}
							const skills=target.getSkills();
							for(const i of skills){
								if(!get.is.locked(i)){
									if(target.hasSkillTag("maixie")) return -2;
									return -get.threaten(target);
								}
							}
							return -0.5;
						}
					}
				}
			},
			//天翊
			ymk_kaibai:{
				usable:1,
				trigger:{target:"useCardToTarget"},
				filter:event=>get.type(event.card)!="equip",
				check:(event,player)=>{
					const cards=player.getCards();
					return Math.cbrt(6-cards.map(card=>get.value(card)).reduce((previousValue,currentValue)=>previousValue+currentValue,0))>0;
				},
				content:()=>{
					"step 0"
					player.discard(player.getCards("h",card=>lib.filter.cardDiscardable(card,player)));
					"step 1"
					player.judge(card=>Math.ceil(get.number(card)/2)).set("judge2",result=>result.number);
					"step 2"
					if(Math.ceil(result.number/2)) player.draw(Math.ceil(result.number/2));
					const evt=trigger.getParent();
					const next=game.createEvent("ymk_kaibai_clear");
					event.next.remove(next);
					evt.after.push(next);
					next.set("player",player);
					next.set("card",trigger.card);
					next.setContent(()=>{
						const num=Math.floor(player.countCards()/2);
						if(game.cardCausedDamage(card,null,player)&&num) player.chooseToDiscard("开摆：弃置"+get.cnNumber(num)+"张手牌",num,"h",true);
					});
				}
			},
			ai:{
				threaten:2
			},
			//Yu Narukami
			xsj_dongqie:{
				intro:{
					content:"card"
				},
				frequent:true,
				trigger:{player:"phaseBegin"},
				content:()=>{
					"step 0"
					const evt=event.getParent("phase");
					if(evt&&evt.name=="phase"&&!evt.xsj_dongqie){
						evt.set("xsj_dongqie",true);
						const next=game.createEvent("xsj_dongqie_clear");
						event.next.remove(next);
						evt.after.push(next);
						next.set("player",player);
						next.setContent(()=>{
							delete player.storage.xsj_dongqie;
							player.unmarkSkill("xsj_dongqie");
						});
					}
					"step 1"
					player.draw();
					"step 2"
					const cards=result.filter(card=>player.getCards("he").contains(card));
					if(cards.length){
						player.showCards(cards);
						player.storage.xsj_dongqie=cards[0];
						player.markSkill("xsj_dongqie");
					}
				},
				group:"xsj_dongqie2"
			},
			xsj_dongqie2:{
				direct:true,
				trigger:{player:"useCardAfter"},
				filter:(event,player)=>player.storage.xsj_dongqie&&get.suit(event.card)==get.suit(player.storage.xsj_dongqie)&&game.cardCausedDamage(event.card,player,game.filterPlayer2(current=>current!=player)),
				content:()=>{
					const card=game.createCard("lebu","","");
					player.chooseUseTarget(card,false).set("prompt",get.prompt("xsj_dongqie2")).set("prompt2",get.translation("xsj_dongqie_info")).set("logSkill","xsj_dongqie2");
					card._destroy=true;
					card.expired=true;
					game.broadcast(card=>{
						card._destroy=true;
						card.expired=true;
					},card);
				},
				ai:{
					effect:{
						player:(card,player)=>{
							if(player.storage.xsj_dongqie&&get.itemtype(card)=="card"&&get.suit(card)==get.suit(player.storage.xsj_dongqie)) return [1,1];
						}
					}
				}
			},
			xsj_taluo:{
				frequent:true,
				trigger:{player:["useCardAfter","respondAfter"]},
				filter:event=>event.respondTo&&event.respondTo[1]&&(get.name(event.respondTo[1])=="sha"||get.tag(event.respondTo[1],"damage"))&&event.respondTo[1].cards&&event.respondTo[1].cards.filterInD("od").length,
				content:()=>{
					const respond=trigger.respondTo[1];
					if(respond&&respond.cards&&respond.cards.filterInD("od").length) player.gain(respond.cards.filterInD("od"),"gain2");
				}
			},
			//Dante
			xsj_wanxie:{
				trigger:{global:["loseAfter","cardsDiscardAfter"]},
				direct:true,
				filter:event=>event.cards&&event.cards.filter(card=>get.position(card,true)=="d"&&get.subtype(card,false)=="equip1").length,
				content:()=>{
					"step 0"
					const next=player.chooseToRespond();
					next.set("ai",card=>_status.event.getTrigger().cards.filter(card=>get.position(card,true)=="d"&&get.subtype(card,false)=="equip1").map(card=>get.value(card)).reduce((previousValue,currentValue)=>previousValue+currentValue,0)-get.value(card));
					next.set("position","hes");
					next.set("logSkill","xsj_wanxie");
					next.set("prompt",get.prompt("xsj_wanxie"));
					next.set("prompt2","你可以打出一张牌，然后获得"+get.translation(trigger.cards.filter(card=>get.position(card,true)=="d"&&get.subtype(card,false)=="equip1")));
					"step 1"
					if(result.card){
						const cards=trigger.cards.filter(card=>get.position(card,true)=="d"&&get.subtype(card,false)=="equip1");
						if(cards.length) player.gain(cards,"gain2");
					}
				}
			},
			xsj_moxue:{
				direct:true,
				trigger:{player:"damageEnd"},
				filter:(event,player)=>player.countCards("e"),
				content:()=>{
					"step 0"
					player.chooseCard(get.prompt2("xsj_moxue"),"e").set("ai",card=>{
						if(player.hasValueTarget({name:"juedou",isCard:true})) return 8-get.value(card);
						return 0;
					});
					"step 1"
					if(result.cards&&result.cards.length){
						player.logSkill("xsj_moxue");
						player.gain(result.cards,"gain2");
					}
					else{
						event.finish();
					}
					"step 2"
					player.chooseUseTarget({name:"juedou",isCard:true});
				},
				ai:{
					maixie:true,
					maixie_defend:true,
					maixie_hp:true,
					skillTagFilter:player=>{
						if(!player.countCards("e")) return false;
					}
				}
			},
			//Daroach
			ska_zhidai:{
				direct:true,
				trigger:{global:"useCard1"},
				filter:event=>event.player.countUsed(null,true)<=1&&!_status.dying.length&&event.targets&&event.targets.length,
				content:()=>{
					"step 0"
					player.chooseCard(get.prompt("ska_zhidai"),"你可以打出一张手牌替换"+get.translation(trigger.card)+"对应的实体牌，若如此做，本回合结束阶段，你对自己使用"+get.translation(trigger.card)+"对应的实体牌","hs",card=>{
						const player=_status.event.player;
						const mod2=game.checkMod(card,player,"unchanged","cardEnabled2",player);
						if(mod2!="unchanged") return mod2;
						const mod=game.checkMod(card,player,"unchanged","cardRespondable",player);
						if(mod!="unchanged") return mod;
						return true;
					}).set("ai",card=>{
						const player=_status.event.player;
						const evt=_status.event.getTrigger();
						let before=0,after=0;
						evt.targets.forEach(target=>{
							before+=get.effect(target,evt.card,evt.player,player);
							after+=get.effect(target,card,evt.player,player);
						});
						before/=evt.targets.length;
						after/=evt.targets.length;
						return after-before;
					});
					"step 1"
					if(result.cards&&result.cards.length){
						const next=player.respond(result.cards,"highlight","ska_zhidai","noOrdering");
						event.card=next.card;
						event.cards=next.cards;
					}
					else{
						event.finish();
					}
					"step 2"
					if(card&&cards){
						const original=trigger.cards.filterInD("o");
						if(original.length){
							event.original=original;
							player.$gain2(original,true);
							player.gain(original);
						}
						trigger.card=card;
						trigger.cards=cards;
						if(!Array.isArray(trigger.orderingCards)) trigger.orderingCards=[];
						trigger.orderingCards.addArray(cards);
						trigger.throw=false;
						trigger.noai=true;
						const evt=event.getParent("phase");
						if(evt&&evt.name=="phase"&&!evt.ska_zhidai){
							evt.set("ska_zhidai",true);
							const next=game.createEvent("ska_zhidai_clear");
							event.next.remove(next);
							evt.after.push(next);
							next.set("player",player);
							next.setContent(()=>{
								player.removeGaintag("ska_zhidai",player.getCards());
							});
						}
					}
					else{
						event.finish();
					}
					"step 3"
					if(Array.isArray(event.original)) player.addGaintag(event.original,"ska_zhidai");
				},
				ai:{
					expose:0.2
				},
				group:"ska_zhidai2"
			},
			ska_zhidai2:{
				mod:{
					aiUseful:(player,card,num)=>{
						if(get.itemtype(card)=="card"&&card.hasGaintag("ska_zhidai")) return num-1;
					}
				},
				forced:true,
				trigger:{global:"phaseJieshuBegin"},
				filter:(event,player)=>player.countCards("h",card=>card.hasGaintag("ska_zhidai")),
				content:()=>{
					"step 0"
					event.cards=player.getCards("h",card=>card.hasGaintag("ska_zhidai"));
					"step 1"
					if(cards.length){
						const card=cards.shift();
						player.useCard(card,player,false);
						event.redo();
					}
				},
				ai:{
					effect:{
						player:card=>{
							if(card.cards&&card.cards.filter(card=>get.itemtype(card)=="card"&&card.hasGaintag("ska_zhidai")).length) return [1,1];
						}
					}
				}
			},
			ska_siyi:{
				hiddenSkill:true,
				direct:true,
				trigger:{player:"showCharacterAfter"},
				filter:(event,player)=>game.hasPlayer(current=>current.countGainableCards(player,"hej")),
				content:()=>{
					"step 0"
					player.chooseTarget(get.prompt2("ska_siyi"),lib.filter.notMe).set("ai",target=>10-get.attitude(_status.event.player,target));
					"step 1"
					if(result.targets&&result.targets.length){
						player.logSkill("ska_siyi",result.targets);
						player.storage.ska_siyi_effect=result.targets;
						player.addSkill("ska_siyi_effect");
						game.delayx();
					}
				},
				ai:{
					expose:0.2
				}
			},
			ska_siyi_effect:{
				charlotte:true,
				mark:true,
				intro:{
					content:"本局游戏$的手牌对你可见"
				},
				onremove:true,
				ai:{
					viewHandcard:true,
					skillTagFilter:(player,tag,arg)=>{
						if(!player.storage.ska_siyi_effect.contains(arg)) return false;
					}
				}
			},
			//Decidueye
			nnk_fengying:{
				intro:{
					name:"影",
					content:"expansion",
					markcount:"expansion"
				},
				marktext:"影",
				direct:true,
				trigger:{player:"phaseBegin"},
				filter:()=>game.hasPlayer(current=>current.countCards("he")&&!current.getExpansions("nnk_fengying").length),
				content:()=>{
					"step 0"
					player.chooseTarget(get.prompt2("nnk_fengying"),(card,player,target)=>target.countCards("he")&&!target.getExpansions("nnk_fengying").length).set("ai",target=>-get.attitude(_status.event.player,target));
					"step 1"
					if(result.targets&&result.targets.length){
						event.target=result.targets[0];
						player.logSkill("nnk_fengying",event.target);
						player.choosePlayerCard("缝影：将"+get.translation(event.target)+"一张牌置于其武将牌上作为“影”",event.target,true);
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.cards&&result.cards.length) target.addToExpansion(result.cards,target,"give").gaintag.add("nnk_fengying");
					"step 3"
					event.expansions=target.getExpansions("nnk_fengying");
					if(event.expansions.length){
						event.cards=target.getCards("he",card=>{
							if(lib.filter.cardDiscardable(card,target)) return false;
							for(const i of event.expansions){
								if(get.name(card)==get.name(i)) return true;
							}
							return false;
						});
						if(event.cards.length){
							target.chooseBool("缝影：展示手牌并弃置"+get.translation(event.cards)+"，否则本局游戏不能使用或打出与"+get.translation(event.expansions)+"同名的牌").set("ai",()=>{
								if(_status.event.player.hasSkill("nnk_fengying_effect")) return false;
								return true;
							});
						}
						else{
							target.chooseBool("缝影：本局游戏不能使用或打出与"+get.translation(event.expansions)+"同名的牌");
						}
					}
					else{
						event.finish();
					}
					"step 4"
					if(result.bool&&event.cards.length){
						target.showHandcards();
					}
					else{
						target.addSkill("nnk_fengying_effect");
						event.finish();
						game.delayx();
					}
					"step 5"
					target.discard(cards);
				},
				ai:{
					expose:0.2,
					threaten:2
				}
			},
			nnk_fengying_effect:{
				charlotte:true,
				mark:true,
				intro:{
					content:(storage,player)=>{
						const cards=player.getExpansions("nnk_fengying");
						if(cards.length) return "本局游戏你不能使用或打出与"+get.translation(cards)+"同名的牌";
						return "没有“影”";
					}
				},
				mod:{
					cardEnabled:(card,player)=>{
						const cards=player.getExpansions("nnk_fengying");
						if(cards.length){
							for(const i of cards){
								if(get.name(card)==get.name(i)) return false;
							}
						}
					},
					cardRespondable:function(){
						return lib.skill.nnk_fengying_effect.mod.cardEnabled.apply(this,arguments);
					},
					cardSavable:function(){
						return lib.skill.nnk_fengying_effect.mod.cardEnabled.apply(this,arguments);
					}
				}
			},
			nnk_biantou:{
				forced:true,
				trigger:{source:"damageBegin1"},
				filter:event=>event.player.getExpansions("nnk_fengying").length,
				logTarget:"player",
				content:()=>{
					"step 0"
					trigger.player.loseToDiscardpile(trigger.player.getExpansions("nnk_fengying"));
					"step 1"
					if(!trigger.player.isDisabled("equip2")){
						trigger.player.disableEquip("equip2");
					}
					else{
						trigger.num++;
					}
				},
				ai:{
					damageBonus:true
				}
			},
			//Machamp
			nnk_manwu:{
				forced:true,
				trigger:{source:"damageSource"},
				filter:event=>event.card&&get.name(event.card)=="sha",
				content:()=>{
					player.loseHp();
				},
				group:"nnk_manwu2",
				ai:{
					halfneg:true
				}
			},
			nnk_manwu2:{
				forced:true,
				trigger:{source:"damageBegin1"},
				filter:(event,player)=>event.card&&get.name(event.card)=="sha"&&player.getDamagedHp(),
				content:()=>{
					trigger.num+=player.getDamagedHp();
				},
				ai:{
					damageBonus:true
				}
			},
			nnk_mianyu:{
				mod:{
					cardname:card=>{
						if(["shan","tao"].contains(card.name)) return "sha";
					},
					cardUsable:card=>{
						if(card.name=="sha"&&card.isCard&&card.cards&&card.cards.length==1&&["shan","tao"].contains(card.cards[0].name)) return Infinity;
					}
				},
				ai:{
					halfneg:true,
					unequip:true,
					skillTagFilter:(player,tag,arg)=>{
						if(tag=="unequip"){
							if(!arg||!arg.card||arg.card.name!="sha"||!arg.card.isCard||!arg.card.cards||arg.card.cards.length!=1||!["shan","tao"].contains(arg.card.cards[0].name)) return false;
						}
					}
				}
			}
		},
		dynamicTranslate:{
			ska_jiyan:player=>{
				if(!Array.isArray(player.storage.ska_jiyan)) return "使命技。每个选项限一次，你可以视为使用一张：<span class=\"bluetext\">1. 【杀】；</span><span class=\"bluetext\">2. 【闪】；</span><span class=\"bluetext\">3. 【桃】；</span><span class=\"bluetext\">4. 【酒】。</span><br>\
					成功：你使用牌结算后，若所有选项均选择过，你增加1点体力上限并回复1点体力。";
				if(!player.storage.ska_jiyan.length) return "使命技。每个选项限一次，你可以视为使用一张：1. 【杀】；2. 【闪】；3. 【桃】；4. 【酒】。<br>\
					成功：你使用牌结算后，若所有选项均选择过，你增加1点体力上限并回复1点体力。";
				let str="使命技。每个选项限一次，你可以视为使用一张：";
				str+=player.storage.ska_jiyan.contains("sha")?"<span class=\"bluetext\">1. 【杀】；</span>":"<span style=\"opacity:0.5\">1. 【杀】；</span>";
				str+=player.storage.ska_jiyan.contains("shan")?"<span class=\"bluetext\">2. 【闪】；</span>":"<span style=\"opacity:0.5\">2. 【闪】；</span>";
				str+=player.storage.ska_jiyan.contains("tao")?"<span class=\"bluetext\">3. 【桃】；</span>":"<span style=\"opacity:0.5\">3. 【桃】；</span>";
				str+=player.storage.ska_jiyan.contains("jiu")?"<span class=\"bluetext\">4. 【酒】。</span>":"<span style=\"opacity:0.5\">4. 【酒】。</span>";
				str+="<br>成功：你使用牌结算后，若所有选项均选择过，你增加1点体力上限并回复1点体力。";
				return str;
			},
			alz_qushui:player=>{
				if(player.storage.alz_qushui) return "转换技，出牌阶段限一次，你可以将三张牌置于仁库中，令一名角色①翻面<span class=\"bluetext\">②本轮非锁定技失效</span>。";
				return "转换技，出牌阶段限一次，你可以将三张牌置于仁库中，令一名角色<span class=\"bluetext\">①翻面</span>②本轮非锁定技失效。";
			}
		},
		/*
		characterReplace:{
			//sst_mario:["sst_mario","sst_dr_mario","ska_mario"],
			//sst_bowser:["sst_bowser","ska_bowser"],
			sst_yumikohimi:["sst_yumikohimi","ymk_yumikohimi"],
			sst_isabelle:["sst_isabelle","ymk_isabelle"]
		},
		*/
		translate:{
			//Character
			ymk_isabelle:"SP西施惠",
			ska_bobby:"炸弹彬",
			ska_olivia:"奥莉维亚",
			ska_super_xiaojie:"超级小桀",
			ska_show_k:"小溪",
			ymk_yumikohimi:"SP柚子",
			ska_bowser:"☆SP酷霸王",
			ska_professor_toad:"考古学家奇诺比奥",
			mnm_edelgard:"艾黛尔贾特",
			alz_kyo_kusanagi:"SP草薙京",
			mnm_captain_falcon:"SP飞隼队长",
			ska_king_olly:"奥利王",
			ska_koopa_troopa:"慢慢龟",
			mnm_9_volt_18_volt:"SP九伏特＆十八伏特",
			nnk_robin:"SP鲁弗莱",
			alz_yuri_kozukata:"不来方夕莉",
			ymk_tianyi:"天翊",
			xsj_yu_narukami:"鸣上悠",
			xsj_dante:"但丁",
			ska_daroach:"怪盗洛切",
			nnk_decidueye:"狙射树枭",
			nnk_machamp:"怪力",
			//Character ab.
			ska_bobby_ab:"炸弹兵",
			ska_professor_toad_ab:"奇诺比奥",
			ska_king_olly_ab:"奥利",
			mnm_9_volt_18_volt_ab:"九伏十八伏",
			//Identity mode skill
			ymk_zhongmi:"忠秘",
			ymk_zhongmi_info:"你的回合外，当你获得或不因使用或打出而失去牌时，你可以选择一项：1. 令一名其他角色摸X+1张牌；2. 弃置一名其他角色的X+1张牌。（X为你损失的体力值）",
			ymk_mihu:"迷糊",
			ymk_mihu_info:"锁定技，当你使用基本牌或普通锦囊牌指定目标后，你判定。若判定结果为：红色：此牌增加X+1个目标（不足则全选）；黑色：此牌减少X+1个目标（不足则全选）。（X为你损失的体力值）",
			ska_jixing:"激行",
			ska_jixing_info:"出牌阶段限一次，你可以指定攻击范围内一名角色并判定，若结果不为♦，你对其造成1点伤害，否则你弃置一张牌。",
			ska_yangxun:"洋寻",
			ska_yangxun_info:"锁定技，当一名角色的判定牌生效后，若为红色，你令一名角色获得弃牌堆顶的一张牌，然后若其不为你，其〖赠予〗你一张牌。",
			ska_wangshi:"惘事",
			ska_wangshi_info:"使命技。你区域内的♠牌和♠判定牌均视为♦。<br>\
				成功：准备阶段，若本局已结算过11次判定，你获得弃牌堆顶两张牌，重铸一张牌，回复体力至体力上限。",
			ska_shenqi:"神祇-",
			ska_shenqi2:"神祇-",
			ska_shenqi_info:"一名角色受到伤害后，你可以判定并将判定牌置于仁库中；当你使用牌时，你可以从仁库中获得一张与此牌颜色相同的牌。",
			ska_zhefu:"折赋",
			ska_zhefu_backup:"折赋",
			ska_zhefu_info:"出牌阶段限一次，你可以亮出仁库中的一张牌，并令一名角色选择一项：1. 获得亮出牌；2. 〖赠予〗你一张牌，然后使用亮出牌（若不能使用则置入弃牌堆）。",
			ska_kezhi:"恪志",
			ska_kezhi_info:"一名角色使用或打出牌响应你使用的牌时，你可以失去1点体力并将一张牌当作被响应牌使用。若以此法使用的牌造成过伤害，你可以回复1点体力或摸两张牌。",
			ska_jiyan:"籍验",
			ska_jiyan2:"籍验",
			ska_jiyan_sha:"籍验·杀",
			ska_jiyan_shan:"籍验·闪",
			ska_jiyan_tao:"籍验·桃",
			ska_jiyan_jiu:"籍验·酒",
			ska_jiyan_info:"使命技。每个选项限一次，你可以视为使用一张：1. 【杀】；2. 【闪】；3. 【桃】；4. 【酒】。<br>\
				成功：你使用牌结算后，若所有选项均选择过，你增加1点体力上限并回复1点体力。",
			ska_lunli:"论理",
			ska_lunli_info:"当你成为一名角色使用牌的目标后，你可以展示一张与此牌点数差等于你的体力值的牌，若如此做，你可以摸一张牌，然后你可以令来源弃置一张牌。",
			ska_shubian:"数变",
			ska_shubian_info:"出牌阶段限一次，你可以弃置任意张点数和等于13的牌，然后指定等量角色，你依次令其回复1点体力或受到你造成的1点伤害。",
			ska_jingli:"径理",
			ska_jingli_info:"出牌阶段限一次，你可以交给一名其他角色X张牌，然后其交给你Y张牌。（X/Y为你/其手牌数一半且向上取整，若为0则无需交给牌）",
			ska_zhiyi:"执异",
			ska_zhiyi2:"执异",
			ska_zhiyi_info:"你使用从一名角色获得的牌结算后，若此牌：被响应，你可以将一张牌当作此牌使用；未被响应，你可以摸一张牌。",
			ymk_qiuyi:"求艺",
			ymk_qiuyi_effect:"求艺",
			ymk_qiuyi_info:"每回合限一次，当一名角色使用的基本牌或普通锦囊牌（【闪】【无懈可击】除外）结算完毕后，若其体力值或手牌数不小于你，你可以交给其一张牌并令其本回合手牌上限+1，然后你可以视为使用此牌。",
			ymk_xifang:"析方",
			ymk_xifang_info:"每回合限一次，一名角色获得你的牌后，你可以观看其手牌，若其满足类别不同或颜色不同，你摸一张牌。",
			ska_mengjin:"盟进",
			ska_mengjin_info:"出牌阶段限一次，你可以交给一名其他角色X张牌，然后其交给你Y张牌（X、Y为各自手牌数的一半且向上取整）。你以此法获得的牌无使用距离和次数限制直到回合结束。",
			ska_juegu:"掘古",
			ska_juegu_info:"出牌阶段结束时，若你本回合内不因摸牌阶段的额定摸牌而获得的牌数不小于体力值，你可以〖赠予〗一名其他角色一张牌，然后你可以对其造成1点伤害。",
			ska_kuiwang:"窥往",
			ska_kuiwang_info:"当你需要使用或打出牌（【无懈可击】除外）时，你可以将一张牌置于牌堆顶并获得牌堆底一张牌。",
			mnm_tianjiu:"天鹫",
			mnm_tianjiu_info:"锁定技，出牌阶段开始时，你须弃置一张手牌或失去1点体力，视为对攻击范围内任意名角色使用一张【杀】。",
			mnm_yanhai:"炎骸",
			mnm_yanhai2:"炎骸",
			mnm_yanhai_info:"觉醒技，若你不是主公，你死亡前，将体力回复至2点，摸三张牌，所有角色视为在你攻击范围内，胜利条件变更为“成为唯一存活者”。",
			alz_wushi:"无式",
			alz_wushi_info:"当你使用牌指定唯一目标后，你可以与目标角色拼点。若你赢，你可以对其使用X张无视距离的【杀】（X为你与其距离+1）。",
			alz_huangyao:"荒咬",
			alz_huangyao_info:"你可以将一张红色牌当作火【杀】使用或打出。",
			mnm_jijing:"急竞",
			mnm_jijing_info:"出牌阶段限一次，你可以与一名其他角色依次演奏相同音乐，然后若你的评级：大于其，你对其造成1点伤害；小于其，其对你造成1点伤害；否则你与其各摸两张牌。",
			mnm_jijing_faq:"目前的曲库",
			mnm_jijing_faq_info:"　<br>《鸟之诗》- 折户伸治<br>《竹取飛翔　～ Lunatic Princess》- ZUN<br>《ignotus》- ak+q<br>《Super Mario 3D World Theme》- 横田真人<br>《Big Blue》 - 石田尚人",
			ska_shenqi_alter:"神祇+",
			ska_shenqi_alter2:"神祇+",
			ska_shenqi_alter_info:"一名角色造成伤害后，你可以将牌堆底一张牌置于仁库中；当你使用牌时，你可以从仁库中获得一张与此牌颜色不同的牌。",
			ska_zhesheng:"折生",
			ska_zhesheng_backup:"折生",
			ska_zhesheng_info:"出牌阶段限一次，你可以亮出仁库中的一张牌，并指定一名角色，视为其对另外一名你指定的角色使用此牌（不能被响应）。",
			ska_suixuan:"随旋",
			ska_suixuan2:"随旋",
			ska_suixuan_info:"锁定技，当你受到伤害后，你翻面。当你翻面时，你视为使用一张无距离限制的【杀】，然后弃置一张牌。",
			ska_xiangshi:"向矢",
			ska_xiangshi_info:"出牌阶段限一次，你可以翻面。若如此做，你可以打出一张牌，然后弃置一名角色区域内的一张牌。若这两张牌的花色相同，你翻面。",
			mnm_huaijiu:"怀旧",
			mnm_huaijiu_info:"准备阶段，你可以获得一名《三国杀 标准版》武将的技能，直到你的下一个回合开始。",
			mnm_huaijiu_append:"<span style=\"font-family: fzktk\">*可选武将：曹操、司马懿、夏侯惇、张辽、许褚、郭嘉、甄姬、刘备、关羽、张飞、诸葛亮、赵云、马超、黄月英、孙权、甘宁、吕蒙、黄盖、周瑜、大乔、陆逊、孙尚香、华佗、吕布、貂蝉、华雄、袁术、公孙瓒、伊籍</span>",
			mnm_huaijiu_faq:"*",
			mnm_huaijiu_faq_info:"可选武将：曹操、司马懿、夏侯惇、张辽、许褚、郭嘉、甄姬、刘备、关羽、张飞、诸葛亮、赵云、马超、黄月英、孙权、甘宁、吕蒙、黄盖、周瑜、大乔、陆逊、孙尚香、华佗、吕布、貂蝉、华雄、袁术、公孙瓒、伊籍",
			nnk_yuanlei:"远雷",
			nnk_yuanlei_effect:"远雷",
			nnk_yuanlei_effect1:"远雷",
			nnk_yuanlei_effect3:"远雷",
			nnk_yuanlei_effect4:"远雷",
			nnk_yuanlei_info:"出牌阶段限一次，你可以将X张牌当作无距离限制的雷【杀】使用。若此雷【杀】造成了伤害，且X不小于：1，本回合你使用的下一张牌不可被响应；2，你摸两张牌；3，本回合你可以额外使用一张【杀】，且使用【杀】可以额外指定一个目标；4，本回合你使用的下一张【杀】伤害值基数+2。（X不超过你的体力上限且至少为1）",
			alz_yingjian:"影见",
			alz_yingjian_backup:"影见",
			alz_yingjian_info:"一名角色的结束阶段，若有角色对你使用过牌，你可以将仁库中的一张牌当作一张本回合使用过的基本牌或普通锦囊牌使用。",
			alz_qushui:"趋水",
			alz_qushui_info:"转换技，出牌阶段限一次，你可以将三张牌置于仁库中，令一名角色①翻面②本轮非锁定技失效。",
			ymk_kaibai:"开摆",
			ymk_kaibai_info:"每回合限一次，当你成为一名角色使用非装备牌的目标时，你可以弃置所有手牌并判定，然后你摸X张牌（X为判定结果点数的一半且向上取整）。若此牌对你造成了伤害，你弃置一半手牌（向下取整）。",
			xsj_dongqie:"洞怯",
			xsj_dongqie2:"洞怯",
			xsj_dongqie_info:"回合开始时，你可以摸一张牌并展示之。本回合你使用与之花色相同的【杀】或带有「伤害」标签的锦囊牌结算后，若对其他角色造成了伤害，你可以视为对一名角色使用【乐不思蜀】。",
			xsj_taluo:"塔罗",
			xsj_taluo_info:"当你使用或打出牌响应【杀】或带有「伤害」标签的锦囊牌后，你可以获得被响应的牌。",
			xsj_wanxie:"万械",
			xsj_wanxie_info:"当武器牌进入弃牌堆后，你可以打出一张牌，然后获得武器牌。",
			xsj_moxue:"魔血",
			xsj_moxue_info:"当你受到伤害后，你可以将装备区内的一张牌收回手牌，视为使用一张【决斗】。",
			ska_zhidai:"置代",
			ska_zhidai2:"置代",
			ska_zhidai_info:"当一名角色于回合内声明使用第一张牌时，若场上没有处于濒死状态的角色，且此牌有目标，你可以打出一张手牌替换之。本回合结束阶段，你对自己依次使用被替换牌（无视合法性）。",
			ska_siyi:"嘶咿",
			ska_siyi_effect:"嘶咿",
			ska_siyi_info:"隐匿技，当你登场后，你可以令一名其他角色的手牌本局游戏对你可见。",
			nnk_fengying:"缝影",
			nnk_fengying_effect:"缝影",
			nnk_fengying_info:"回合开始时，你可以将一名没有“影”的角色的一张牌置于其武将牌上，称为“影”；然后其须展示手牌并弃置所有与“影”同名的牌（至少一张），否则本局游戏不能使用或打出与“影”同名的牌。",
			nnk_biantou:"砭透",
			nnk_biantou_info:"锁定技，当你对有“影”的角色造成伤害时，你移去其所有“影”，然后废除其防具栏；若已废除，改为此伤害+1。",
			nnk_manwu:"蛮武",
			nnk_manwu2:"蛮武",
			nnk_manwu_info:"锁定技，当你使用【杀】造成伤害后，你失去1点体力；你使用【杀】造成的伤害+X。（X为你已损失的体力值）",
			nnk_mianyu:"免御",
			nnk_mianyu_info:"锁定技，你的【闪】和【桃】均视为【杀】；你使用以此法视为的【杀】无次数限制且无视防具。",
			//Sort
			sst_special:"SP",
			sst_mnm:"mario not mary",
			sst_ymk:"Yumikohimi",
			sst_ska:"Show-K",
			sst_nnk:"南柯",
			sst_alz:"Axel_Zhai",
			sst_xsj:"小时节",
			sst_entertainment:"娱乐"
		},
		translateEnglish:{
			//Character
			ymk_isabelle:"SP Isabelle",
			ska_bobby:"Bobby",
			ska_olivia:"Olivia",
			ska_super_xiaojie:"Super Xiaojie",
			ska_show_k:"Show-K",
			ymk_yumikohimi:"SP Yumikohimi",
			ska_bowser:"☆SP Bowser",
			ska_professor_toad:"Professor Toad",
			mnm_edelgard:"Edelgard",
			alz_kyo_kusanagi:"SP Kyo Kusanagi",
			mnm_captain_falcon:"SP Captain Falcon",
			ska_king_olly:"King Olly",
			ska_koopa_troopa:"Koopa Troopa",
			mnm_9_volt_18_volt:"SP 9-Volt & 18-Volt",
			nnk_robin:"SP Robin",
			alz_yuri_kozukata:"Yuri Kozukata",
			ymk_tianyi:"Tianyi",
			xsj_yu_narukami:"Yu Narukami",
			xsj_dante:"Dante",
			ska_daroach:"Daroach",
			nnk_decidueye:"Decidueye",
			nnk_machamp:"Machamp"
		},
		perfectPair:{
			ymk_isabelle:["sst_villager"],
			ymk_yumikohimi:["sst_mario_not_mary","sst_terry"],
			ska_bobby:["sst_mario"],
			ska_olivia:["sst_mario","ska_bobby"],
			ska_super_xiaojie:["sst_mario","sst_luigi"],
			ska_show_k:["sst_mario"],
			ska_professor_toad:["sst_mario","ska_olivia"],
			ska_king_olly:["sst_mario","ska_olivia"],
			ska_koopa_troopa:["sst_mario"],
			alz_kyo_kusanagi:["sst_kyo_kusanagi"],
			mnm_9_volt_18_volt:["sst_9_volt_18_volt","sst_wario"],
			nnk_robin:["sst_robin","sst_lucina","sst_chrom"],
			ymk_tianyi:["sst_mario_not_mary","sst_yumikohimi","ymk_yumikohimi","sst_kirby","sst_kazuya"],
			xsj_yu_narukami:["sst_joker"],
			ska_daroach:["sst_kirby","sst_meta_knight","sst_king_dedede","sst_bandana_waddle_dee","sst_magolor"]
		}
	};
	return SST_SP;
});
