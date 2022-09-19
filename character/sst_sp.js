"use strict";
game.import("character",function(lib,game,ui,get,ai,_status){
	if(!lib.translateEnglish) lib.translateEnglish={};
	var sst_sp={
		name:"sst_sp",
		connect:true,
		characterSort:{
			sst_sp:{
				sst_mnm:["mnm_edelgard"],
				sst_ymk:["ymk_isabelle","ymk_yumikohimi","ymk_tianyi"],
				sst_ska:["ska_bobby","ska_olivia","ska_super_xiaojie","ska_show_k","ska_professor_toad","ska_king_olly","ska_koopa_troopa","ska_daroach"],
				sst_nnk:["nnk_robin"],
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
			//ska_bowser:["male","sst_dark",4,["ska_mengjin"],[]],
			ska_professor_toad:["male","sst_spirit",3,["ska_juegu","ska_kuiwang"],[]],
			mnm_edelgard:["female","sst_spirit",3,["mnm_tianjiu","mnm_yanhai"],[]],
			alz_kyo_kusanagi:["male","sst_spirit",4,["alz_wushi","alz_huangyao"],[]],
			mnm_captain_falcon:["male","sst_light",4,["mnm_jijing"],[]],
			ska_king_olly:["male","sst_spirit",3,["ska_shenqi2","ska_zhesheng"],[]],
			ska_koopa_troopa:["male","sst_spirit",3,["ska_suixuan","ska_xiangshi"],[]],
			mnm_9_volt_18_volt:["male","sst_spirit",4,["mnm_huaijiu"],[]],
			nnk_robin:["","sst_dark",4,["nnk_yuanlei"],[]],
			alz_yuri_kozukata:["female","sst_spirit","3",["alz_yingjian","alz_qushui"]],
			ymk_tianyi:["male","sst_reality",4,["ymk_kaibai"],[]],
			xsj_yu_narukami:["male","sst_spirit",3,["xsj_dongqie","xsj_taluo"],[]],
			xsj_dante:["male","sst_spirit",4,["xsj_wanxie","xsj_moxue"],[]],
			ska_daroach:["male","sst_spirit",3,["ska_zhidai","ska_siyi"],["hiddenSkill"]]
		},
		characterFilter:{
			mnm_edelgard:function(mode){
				return mode=="identity";
			}
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
			插图作者：海鮮炒め<br>"+
			"——"+get.formatUrl("https://www.pixiv.net/artworks/84022575")+"<br>\
			<hr>\
			S003. 炸弹彬/Bobby/ボム平<br>\
			系列：<ruby>马力欧<rp>（</rp><rt>Mario</rt><rp>）</rp></ruby><br>\
			首次登场：<ruby>纸片马力欧：折纸国王<rp>（</rp><rt>Paper Mario: The Origami King</rt><rp>）</rp></ruby><br>\
			炸弹兵，通常被奥莉维亚称为“炸弹彬”，也曾被错误地称为“Bhomas”和“Bomber”，是《纸片马力欧 折纸国王》中马力欧的伙伴。作为一个没有保险丝、失忆的炸弹兵，他加入了马力欧和奥莉维亚的探险，努力回忆起他的记忆。在他们的冒险过程中，他将马力欧和奥莉维亚分别称为“大哥”和“女士”。<br>\
			——翻译自《超级马力欧维基》<br>"+
			"——"+get.formatUrl("https://www.mariowiki.com/Bob-omb_(Paper_Mario%3A_The_Origami_King)")+"<br>\
			<hr>\
			“我？哦，我是炸弹兵。”",
			ska_olivia:"武将作者：Show-K<br>\
			插图作者：蛇のこ<br>"+
			"——"+get.formatUrl("https://www.pixiv.net/artworks/94074877")+"<br>\
			<hr>\
			1426. 奥莉维亚/Olivia/オリビア<br>\
			系列：<ruby>马力欧<rp>（</rp><rt>Mario</rt><rp>）</rp></ruby><br>\
			首次登场：<ruby>纸片马力欧：折纸国王<rp>（</rp><rt>Paper Mario: The Origami King</rt><rp>）</rp></ruby><br>\
			由掌握赋生折法的匠人制作的折纸，奥利王的妹妹。非常天真烂漫，对世界充满了好奇心。为了阻止哥哥的野心而踏上冒险之途，虽然也有过悲痛和犹豫，但是还是走到了最后。非常擅长唱歌跳舞，喜欢泡温泉和撸狗。<br>\
			——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>\
			<hr>\
			一个拥有赋之能力的折纸妹妹，在和马里奥的冒险路途上成长很多啊……",
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
			首次登场：<ruby>纸片马力欧：折纸国王<rp>（</rp><rt>Paper Mario: The Origami King</rt><rp>）</rp></ruby><br>\
			考古学家奇诺比奥是第一次出现在《纸片马里奥 折纸国王》中的奇诺比奥。作为古代历史学院教授兼考古学家，他与马力欧和奥莉维亚联手，帮助他们破坏黄色神祇胶带。其棕色探险家装束和黄色斑点蘑菇头（大部分隐藏在他的髓质头盔中）以及他总是随身携带的铁锹和记事本，很容易将他与其他奇诺比奥区分开来。<br>\
			——翻译自《超级马力欧维基》<br>"+
			"——"+get.formatUrl("https://www.mariowiki.com/Professor_Toad")+"<br>\
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
			插图作者：チョコ<br>"+
			"——"+get.formatUrl("https://www.pixiv.net/artworks/91848135")+"<br>\
			<hr>\
			1427. 奥利王/King Olly/オリー王<br>\
			系列：<ruby>马力欧<rp>（</rp><rt>Mario</rt><rp>）</rp></ruby><br>\
			首次登场：<ruby>纸片马力欧：折纸国王<rp>（</rp><rt>Paper Mario: The Origami King</rt><rp>）</rp></ruby><br>\
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
			团长！你在干什么啊！团长！"
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
			ska_daroach:"宇宙盗贼团前来拜访"
		},
		skill:{
			//SP Isabelle
			ymk_zhongmi:{
				trigger:{player:["gainAfter","loseAfter"]},
				filter:function(event,player){
					if(_status.currentPhase==player) return false;
					if(event.name=="lose"){
						//game.log(event.getParent());
						return ((event.hs&&event.hs.length)||(event.es&&event.es.length))&&!["useCard","respond"].contains(event.getParent().name);
					}
					else if(event.name=="gain"){
						return event.cards&&event.cards.length;
					}
					return false;
				},
				direct:true,
				content:function(){
					"step 0"
					event.num=player.maxHp-player.hp+1;
					player.chooseTarget(get.prompt("ymk_zhongmi"),"你可以令一名其他角色摸"+get.cnNumber(event.num)+"张牌，或弃置一名其他角色的"+get.cnNumber(event.num)+"张牌",lib.filter.notMe).set("ai",function(target){
						var player=_status.event.player;
						if(get.attitude(_status.event.player,target)>0){
							return 10+get.attitude(_status.event.player,target);
						}
						return 1;
					});
					"step 1"
					if(result.bool){
						player.logSkill("ymk_zhongmi",result.targets);
						event.target=result.targets[0];
						player.discardPlayerCard("弃置"+get.translation(event.target)+get.cnNumber(event.num)+"张牌，或令"+get.translation(event.target)+"摸"+get.cnNumber(event.num)+"张牌",event.target,Math.min(event.num,event.target.countCards("he")),"he");
					}
					else{
						event.finish();
					}
					"step 2"
					if(!result.bool){
						event.target.draw(event.num);
					}
				},
				ai:{
					expose:0.2,
					noe:1,
					noh:1,
					effect:{
						target:function(card,player,target){
							if(!target.hasFriend()) return;
							if(get.tag(card,"draw")||get.tag(card,"loseCard")) return [1,target.maxHp-target.hp+1];
						}
					}
				}
			},
			ymk_mihu:{
				trigger:{player:"useCardToPlayered"},
				filter:function(event,player){
					//game.log(event.getParent());
					//if(event.getParent().name=="ymk_mihu") return false;
					if(event.getParent().triggeredTargets3.length>1) return false;
					if(get.type(event.card)!="basic"&&get.type(event.card)!="trick") return false;
					return event.targets&&event.targets.length;
				},
				forced:true,
				content:function(){
					"step 0"
					player.judge();
					"step 1"
					event.num=player.maxHp-player.hp+1;
					switch(result.color){
						case "red":{
							event.type="add";
							player.chooseTarget("迷糊：为"+get.translation(trigger.card)+"增加"+get.cnNumber(event.num)+"个目标",event.num,true,function(card,player,target){
								var trigger=_status.event.getTrigger();
								return !trigger.targets.contains(target)&&lib.filter.targetEnabled2(trigger.card,trigger.player,target);
							}).set("ai",function(target){
								var trigger=_status.event.getTrigger();
								return get.effect(target,trigger.card,trigger.player,_status.event.player);
							});
							break;
						}
						case "black":{
							event.type="remove";
							player.chooseTarget("迷糊：为"+get.translation(trigger.card)+"减少"+get.cnNumber(event.num)+"个目标",event.num,true,function(card,player,target){
								return _status.event.targets.contains(target);
							}).set("ai",function(target){
								var trigger=_status.event.getTrigger();
								return -get.effect(target,trigger.card,trigger.player,_status.event.player);
							}).set("targets",trigger.targets);
							break;
						}
					}
					"step 2"
					if(result.targets&&result.targets.length){
						player.line(result.targets,"green");
						if(event.type=="add"){
							trigger.getParent().targets.addArray(result.targets);
							trigger.getParent().triggeredTargets2.addArray(result.targets);
						}
						else{
							//trigger.getParent().excluded.addArray(result.targets);
							trigger.targets.remove(result.targets);
							trigger.getParent().triggeredTargets2.remove(result.targets);
						}
					}
				}
			},
			//Bobby
			_sst_judge_count:{
				charlotte:true,
				superCharlotte:true,
				trigger:{player:"judgeBegin"},
				ruleSkill:true,
				silent:true,
				firstDo:true,
				content:function(){
					/*
					if(!_status.sstJudgeCount) _status.sstJudgeCount=0;
					_status.sstJudgeCount++;
					*/
					player.actionHistory[player.actionHistory.length-1].custom.push(trigger);
				}
			},
			ska_jixing:{
				enable:"phaseUse",
				usable:1,
				filterTarget:function(card,player,target){
					return player.inRange(target);
				},
				content:function(){
					"step 0"
					player.judge(function(card){
						var suit=get.suit(card);
						if(suit!="diamond"){
							return 2;
						}
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
						target:function(player,target){
							return get.damageEffect(target,player,target);
						}
					}
				}
			},
			ska_yangxun:{
				trigger:{global:"judgeAfter"},
				forced:true,
				filter:function(event,player){
					return event.result.color=="red";
				},
				content:function(){
					"step 0"
					player.chooseTarget("洋寻：选择一名角色，其获得弃牌堆顶的一张牌，然后若其不是你，其交给你一张牌",true).set("ai",function(target){
						if(!target.countCards("he")) return 0;
						return get.attitude(_status.event.player,target);
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
					if(event.target!=player){
						event.target.chooseCard("洋寻：交给"+get.translation(player)+"一张牌","he",true);
					}
					"step 3"
					if(result.cards&&result.cards.length){
						event.target.give(result.cards,player);
					}
				}
			},
			ska_wangshi:{
				dutySkill:true,
				mod:{
					suit:function(card,suit){
						if(suit=="spade") return "diamond";
					}
				},
				group:"ska_wangshi_achieve",
				subSkill:{
					achieve:{
						trigger:{player:"phaseZhunbeiBegin"},
						filter:function(event,player){
							return player.getAllHistory("custom",function(evt){
								return evt.name=="judge";
							})>=11;
						},
						forced:true,
						skillAnimation:true,
						animationColor:"fire",
						content:function(){
							"step 0"
							game.log(player,"成功完成使命");
							player.awakenSkill("ska_wangshi");
							//player.draw(2);
							if(ui.discardPile.childNodes.length>1){
								var cards=[];
								cards.push(ui.discardPile.childNodes[ui.discardPile.childNodes.length-1]);
								cards.push(ui.discardPile.childNodes[ui.discardPile.childNodes.length-2]);
								if(cards.length) player.gain(cards,"gain2");
							}
							else if(ui.discardPile.childNodes.length){
								var card=ui.discardPile.childNodes[ui.discardPile.childNodes.length-1];
								if(card) player.gain(card,"gain2");
								player.chat("只有一张牌可得了吗");
								game.log("但是弃牌堆里面已经只有一张牌了！");
							}
							else{
								player.chat("无牌可得了吗");
								game.log("但是弃牌堆里面已经没有牌了！");
							}
							"step 1"
							player.chooseCard("he","洋寻：重铸一张牌",true).set("ai",function(card){
								return 5.5-get.value(card);
							});
							"step 2"
							if(result.cards&&result.cards.length>0){
								player.loseToDiscardpile(result.cards).set("skill","_chongzhu");
								player.draw();
							}
							"step 3"
							if(player.getDamagedHp()) player.recover(player.maxHp-player.hp,"nocard");
						}
					}
				}
			},
			//Olivia
			ska_shenqi:{
				preHidden:true,
				trigger:{global:"damageEnd"},
				frequent:true,
				init:player=>{
					player.storage.renku=true;
				},
				filter:()=>{
					if(!_status.renku) return true;
					return _status.renku.length<6;
				},
				content:()=>{
					player.judge(card=>get.value(card)).set("callback",()=>{
						if(get.position(card,true)=="o"){
							game.log(_status.event.player,"将",card,"置入了仁库");
							game.cardsGotoSpecial(card,"toRenku");
						}
					}).set("judge2",()=>true);
				},
				ai:{
					maixie:true
				},
				group:"ska_shenqi3"
			},
			ska_shenqi3:{
				trigger:{player:"useCard"},
				filter:function(event,player){
					if(!_status.renku||!_status.renku.length) return false;
					for(var i=0;i<_status.renku.length;i++){
						if(get.color(event.card)==get.color(_status.renku[i])) return true;
					}
					return false;
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseCardButton(_status.renku,get.prompt("ska_shenqi3"),"你可以从仁库中获得与此牌颜色相同的一张牌").set("filterButton",function(button){
						return get.color(button.link)==get.color(_status.event.cardx);
					}).set("ai",function(button){
						var player=_status.event.player;
						if(get.name(button.link)=="du") return -10;
						if(player.isPhaseUsing()) return player.getUseValue(button.link)+5;
						return get.value(button.link)+5;
					}).set("cardx",trigger.card);
					"step 1"
					if(result.links&&result.links.length){
						player.logSkill("ska_shenqi3");
						_status.renku.removeArray(result.links);
						game.updateRenku();
						player.gain(result.links,"fromRenku");
						player.$gain2(result.links,true);
					}
				}
			},
			ska_zhefu:{
				enable:"phaseUse",
				usable:1,
				filter:function(event,player){
					return _status.renku&&_status.renku.length;
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog("折赋",_status.renku,"hidden");
					},
					check:function(button){
						return get.value(button.link)+5;
					},
					backup:function(links,player){
						return {
							filterCard:function(){return false;},
							selectCard:-1,
							filterTarget:true,
							cards:links,
							delay:false,
							content:lib.skill.ska_zhefu.contentx,
							ai:{
								order:10,
								result:{
									target:function(){
										return get.value(links[0]);
									}
								}
							}
						}
					},
					prompt:function(){return "请选择〖折赋〗的目标";},
				},
				contentx:function(){
					"step 0"
					event.card=lib.skill.ska_zhefu_backup.cards[0];
					_status.renku.remove(event.card);
					game.updateRenku();
					game.cardsGotoOrdering(event.card).set("fromRenku",true);
					player.showCards(event.card);
					target.chooseCard("he","折赋：交给"+get.translation(player)+"一张牌，然后使用"+get.translation(event.card)+"，或获得"+get.translation(event.card),function(card){
						var target=_status.event.targetx;
						var player=_status.event.player;
						return lib.filter.canBeGained(card,target,player);
					}).set("ai",function(card){
						var player=_status.event.player;
						return player.getUseValue(_status.event.cardx)-get.value(card);
					}).set("cardx",event.card).set("targetx",player);
					"step 1"
					if(result.cards&&result.cards.length){
						target.give(result.cards,player);
					}
					else{
						target.gain(event.card,"gain2");
						event.finish();
					}
					"step 2"
					if(game.hasPlayer(function(current){
						return target.canUse(event.card,current);
					})){
						target.chooseUseTarget(event.card,true,false);
					}
					else{
						game.cardsDiscard(event.card);
					}
				},
				ai:{
					combo:["ska_shenqi","ska_shenqi2"],
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
				filter:function(event,player){
					return player.countCards("hes")&&event.respondTo&&event.respondTo[0]&&event.respondTo[0]==player&&event.respondTo[1];
				},
				content:function(){
					player.addTempSkill("ska_kezhi_effect");
					var card=Object.assign({},trigger.respondTo[1]);
					delete card.isCard;
					var next=player.chooseToUse();
					next.set("logSkill","ska_kezhi");
					next.set("prompt",get.prompt("ska_kezhi"));
					next.set("prompt2","你可以失去1点体力并将一张牌当作"+get.translation(trigger.respondTo[1])+"使用，若此牌造成过伤害，你可以回复1点体力或摸两张牌");
					next.set("norestore",true);
					next.set("_backupevent","ska_kezhix");
					next.backup("ska_kezhix");
					next.set("addCount",false);
					next.set("custom",{
						add:{},
						replace:{window:function(){}}
					});
					next.set("cardx",card);
					next.set("ai2",player.hp>1?get.effect_use:function(){
						return 0;
					});
				}
			},
			ska_kezhix:{
				viewAs:function(){
					return _status.event.cardx;
				},
				filterCard:function(card){
					return get.itemtype(card)=="card";
				},
				position:"hes",
				check:function(card){return 5-get.value(card);},
				onuse:function(result,player){
					player.loseHp();
				}
			},
			ska_kezhi_effect:{
				charlotte:true,
				trigger:{player:"useCardAfter"},
				filter:function(event){
					return event.skill=="ska_kezhix"&&game.cardCausedDamage(event.card);
				},
				silent:true,
				content:function(){
					player.chooseDrawRecover(2,"恪志：你可以回复1点体力或摸两张牌");
				}
			},
			ska_jiyan:{
				dutySkill:true,
				locked:true,
				init:function(player){
					if(!Array.isArray(player.storage.ska_jiyan)) player.storage.ska_jiyan=["sha","shan","tao","jiu"];
				},
				group:["ska_jiyan_sha","ska_jiyan_shan","ska_jiyan_tao","ska_jiyan_jiu","ska_jiyan_achieve"],
				subSkill:{
					sha:{
						locked:false,
						mod:{
							targetInRange:function(){
								if(_status.event.skill=="ska_jiyan_sha") return true;
							}
						},
						enable:["chooseToUse","chooseToRespond"],
						filterCard:function(){return false;},
						selectCard:-1,
						viewAs:{name:"sha",isCard:true},
						filter:function(event,player){
							return player.storage.ska_jiyan.contains("sha");
						},
						prompt:()=>"视为使用或打出一张【杀】",
						precontent:function(){
							player.logSkill("ska_jiyan");
							delete event.result.skill;
							player.popup("《话语权》");
							player.chat("《话语权》");
							player.storage.ska_jiyan.remove("sha");
						},
						ai:{
							respondSha:true,
							skillTagFilter:function(player){
								if(!player.storage.ska_jiyan.contains("sha")) return false;
							},
							order:function(){
								return get.order({name:"sha",isCard:true})+0.1;
							},
							useful:-1,
							value:-1
						}
					},
					shan:{
						locked:false,
						mod:{
							targetInRange:function(){
								if(_status.event.skill=="ska_jiyan_shan") return true;
							}
						},
						enable:["chooseToUse","chooseToRespond"],
						filterCard:function(){return false;},
						selectCard:-1,
						viewAs:{name:"shan",isCard:true},
						prompt:()=>"视为使用或打出一张【闪】",
						filter:function(event,player){
							return player.storage.ska_jiyan.contains("shan");
						},
						precontent:function(){
							player.logSkill("ska_jiyan");
							delete event.result.skill;
							player.popup("《理解》");
							player.chat("《理解》");
							player.storage.ska_jiyan.remove("shan");
						},
						ai:{
							respondShan:true,
							skillTagFilter:function(player){
								if(!player.storage.ska_jiyan.contains("shan")) return false;
							},
							order:function(){
								return get.order({name:"shan",isCard:true})+0.1;
							},
							useful:-1,
							value:-1
						}
					},
					tao:{
						locked:false,
						mod:{
							targetInRange:function(){
								if(_status.event.skill=="ska_jiyan_tao") return true;
							}
						},
						enable:["chooseToUse","chooseToRespond"],
						filterCard:function(){return false;},
						selectCard:-1,
						viewAs:{name:"tao",isCard:true},
						prompt:()=>"视为使用或打出一张【桃】",
						filter:function(event,player){
							return player.storage.ska_jiyan.contains("tao");
						},
						precontent:function(){
							player.logSkill("ska_jiyan");
							delete event.result.skill;
							player.popup("《硬气》");
							player.chat("《硬气》");
							player.storage.ska_jiyan.remove("tao");
						},
						ai:{
							save:true,
							respondTao:true,
							skillTagFilter:function(player){
								if(!player.storage.ska_jiyan.contains("tao")) return false;
							},
							order:function(){
								return get.order({name:"tao",isCard:true})+0.1;
							},
							useful:-1,
							value:-1
						}
					},
					jiu:{
						locked:false,
						mod:{
							targetInRange:function(){
								if(_status.event.skill=="ska_jiyan_jiu") return true;
							}
						},
						enable:["chooseToUse","chooseToRespond"],
						filterCard:function(){return false;},
						selectCard:-1,
						viewAs:{name:"jiu",isCard:true},
						prompt:()=>"视为使用或打出一张【酒】",
						filter:function(event,player){
							return player.storage.ska_jiyan.contains("jiu");
						},
						precontent:function(){
							player.logSkill("ska_jiyan");
							delete event.result.skill;
							player.popup("《压迫感》");
							player.chat("《压迫感》");
							player.storage.ska_jiyan.remove("jiu");
						},
						ai:{
							save:true,
							skillTagFilter:function(player){
								if(!player.storage.ska_jiyan.contains("jiu")) return false;
							},
							order:function(){
								return get.order({name:"jiu",isCard:true})+0.1;
							},
							useful:-1,
							value:-1
						}
					},
					achieve:{
						skillAnimation:true,
						animationColor:"wood",
						forced:true,
						trigger:{player:"useCardAfter"},
						filter:function(event,player){
							return !player.storage.ska_jiyan.length;
						},
						content:function(){
							game.log(player,"成功完成使命");
							player.awakenSkill("ska_jiyan");
							player.gainMaxHp();
							player.recover("nocard");
						}
					}
				}
			},
			ska_lunli:{
				trigger:{target:"useCardToTargeted"},
				direct:true,
				filter:function(event,player){
					return player.countCards("he");
				},
				content:function(){
					"step 0"
					player.chooseCard("he",get.prompt2("ska_lunli",trigger.player),function(card){
						var number=get.number(_status.event.cardx);
						var player=_status.event.player; 
						return Math.abs(number-get.number(card))==player.hp;
					}).set("cardx",trigger.card).set("ai",function(card){
						return 11-get.value(card);
					});
					"step 1"
					if(result.bool){
						player.logSkill("ska_lunli",trigger.player);
						player.showCards(result.cards);
					}
					else{
						event.finish();
					}
					"step 2"
					player.chooseBool("论理：是否摸一张牌？").set("ai",function(){
						return true;
					});
					"step 3"
					if(result.bool) player.draw();
					"step 4"
					player.chooseBool("论理：是否令"+get.translation(trigger.player)+"弃置一张牌？").set("ai",function(){
						var player=_status.event.player;
						var target=_status.event.targetx;
						return get.attitude(player,target)<0;
					}).set("targetx",trigger.player);
					"step 5"
					if(result.bool){
						if(typeof player.ai.shown=="number"&&player.ai.shown<0.95){
							player.ai.shown+=0.3;
							if(player.ai.shown>0.95) player.ai.shown=0.95;
						}
						trigger.player.chooseToDiscard("论理：弃置一张牌","he",true);
					}
				}
			},
			ska_shubian:{
				enable:"phaseUse",
				usable:1,
				position:"he",
				complexCard:true,
				filterTarget:true,
				selectTarget:function(){
					return ui.selected.cards.length;
				},
				filterCard:function(card){
					var num=0;
					for(var i=0;i<ui.selected.cards.length;i++){
						num+=get.number(ui.selected.cards[i]);
					}
					return get.number(card)+num<=13;
				},
				selectCard:function(){
					var num=0;
					for(var i=0;i<ui.selected.cards.length;i++){
						num+=get.number(ui.selected.cards[i]);
					}
					if(num==13) return ui.selected.cards.length;
					return ui.selected.cards.length+2;
				},
				check:function(card){
					var num=0;
					for(var i=0;i<ui.selected.cards.length;i++){
						num+=get.number(ui.selected.cards[i]);
					}
					if(num+get.number(card)==13) return 9-get.value(card);
					if(ui.selected.cards.length==0){
						var cards=_status.event.player.getCards("h");
						for(var i=0;i<cards.length;i++){
							for(var j=i+1;j<cards.length;j++){
								if(cards[i].number+cards[j].number==13){
									if(cards[i]==card||cards[j]==card) return 8.5-get.value(card);
								}
							}
						}
					}
					return 0;
				},
				line:"thunder",
				content:function (){
					"step 0"
					player.chooseBool("数变：令"+get.translation(target)+"回复1点体力，否则受到你造成的1点伤害").set("ai",function(){
						var player=_status.event.player;
						var target=_status.event.targetx;
						return get.sgn(get.recoverEffect(target,player,player)-get.damageEffect(target,player,player))>0;
					}).set("targetx",target);
					"step 1"
					if(typeof player.ai.shown=="number"&&player.ai.shown<0.95){
						player.ai.shown+=0.3;
						if(player.ai.shown>0.95) player.ai.shown=0.95;
					}
					if(result.bool){
						target.recover("nocard");
					}
					else{
						target.damage(player,"nocard");
					}
				},
				ai:{
					order:10,
					result:{
						target:function(player,target){
							if(get.attitude(player,target)>0&&!target.getDamagedHp()) return -1;
							return get.sgn(get.attitude(player,target));
						},
						player:1
					}
				}
			},
			ska_jingli:{
				enable:"phaseUse",
				usable:1,
				filterTarget:lib.filter.notMe,
				filterCard:true,
				selectCard:function(){
					var player=_status.event.player;
					return Math.ceil(player.countCards()/2);
				},
				check:function(card){
					return 7-get.useful(card);
				},
				discard:false,
				lose:false,
				delay:false,
				position:"he",
				content:function(){
					"step 0"
					if(cards&&cards.length) player.give(cards,target);
					"step 1"
					var num=Math.ceil(target.countCards()/2);
					if(num){
						target.chooseCard("径理：交给"+get.translation(player)+get.cnNumber(num)+"张牌",num,"he",true);
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.cards&&result.cards.length){
						target.give(result.cards,player);
					}
				},
				ai:{
					order:7,
					result:{
						target:function(player,target){
							if(!ui.selected.cards||!ui.selected.cards.length) return;
							if(get.attitude(player,target)>0){
								var val=0;
								for(var i=0;i<ui.selected.cards.length;i++){
									val+=get.useful(ui.selected.cards[i]);
								}
								return Math.cbrt(val);
							}
							return ui.selected.cards.length-(target.countCards()+ui.selected.cards.length)/2;
						}
					}
				}
			},
			ska_zhiyi:{
				init:function(player){
					if(!player.hasSkill("ska_zhiyi2")) player.addSkill("ska_zhiyi2");
				},
				frequent:true,
				trigger:{player:"useCardAfter"},
				direct:true,
				filter:function(event,player){
					return player.hasHistory("lose",function(evt){
						if(evt.getParent()!=event) return false;
						for(var i in evt.gaintag_map){
							if(evt.gaintag_map[i].contains("ska_zhiyi")) return true;
						}
						return false;
					});
				},
				content:function(){
					"step 0"
					if(trigger.ska_zhiyi){
						if(player.countCards("hes")){
							var card=Object.assign({},trigger.card);
							delete card.isCard;
							var next=player.chooseToUse();
							next.set("logSkill","ska_zhiyi");
							next.set("prompt",get.prompt("ska_zhiyi"));
							next.set("prompt2","你可以将一张牌当作"+get.translation(trigger.card)+"使用");
							next.set("norestore",true);
							next.set("_backupevent","ska_zhiyix");
							next.backup("ska_zhiyix");
							next.set("addCount",false);
							next.set("custom",{
								add:{},
								replace:{window:function(){}}
							});
							next.set("cardx",card);
						}
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
						player:function(card){
							if(get.itemtype(card)=="card"&&card.hasGaintag("ska_zhiyi")) return [1,1];
						}
					}
				},
				group:"ska_zhiyi_respond",
				subSkill:{
					respond:{
						trigger:{global:["respond","useCard"]},
						filter:function(event,player){
							if(!event.respondTo) return false;
							if(player!=event.respondTo[0]) return false;
							return true;
						},
						silent:true,
						content:function(){
							//game.log(trigger.getParent(3));
							trigger.getParent("useCard").set("ska_zhiyi",true);
						}
					}
				}
			},
			ska_zhiyix:{
				viewAs:function(){
					//return {name:_status.event.cardx.name,nature:_status.event.cardx.nature};
					return _status.event.cardx;
				},
				filterCard:function(card){
					return get.itemtype(card)=="card";
				},
				/*
				filterTarget:function(){
					return lib.filter.filterTarget.apply(this,arguments);
				},
				selectTarget:function(){
					return lib.filter.selectTarget.apply(this,arguments);
				},
				*/
				position:"hes",
				check:function(card){
					var val=5-get.value(card);
					if(card.hasGaintag("ska_zhiyi")) val++;
					return val;
				}
			},
			ska_zhiyi2:{
				charlotte:true,
				superCharlotte:true,
				trigger:{player:"gainEnd"},
				silent:true,
				filter:function(event,player){
					return event.source;
				},
				content:function(){
					player.addGaintag(trigger.cards,"ska_zhiyi");
				}
			},
			//SP Yumikohimi
			ymk_qiuyi:{
				preHidden:true,
				usable:1,
				trigger:{global:"useCardAfter"},
				direct:true,
				filter:function(event,player){
					return !["shan","wuxie"].contains(get.name(event.card))&&["basic","trick"].contains(get.type(event.card))&&(event.player.hp>=player.hp||event.player.countCards("h")>=player.countCards("h"));
				},
				content:function(){
					"step 0"
					player.chooseCard("he",get.prompt2("ymk_qiuyi",trigger.player)).set("ai",function(card){
						var player=_status.event.player;
						var cardx=_status.event.cardx;
						return player.getUseValue(cardx)-7+get.value(card);
					}).set("cardx",trigger.card);
					"step 1"
					if(result.cards&&result.cards.length){
						player.logSkill("ymk_qiuyi",trigger.player);
						player.give(result.cards,trigger.player);
						if(!trigger.player.hasSkill("ymk_qiuyi_effect")) trigger.player.addTempSkill("ymk_qiuyi_effect");
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
					content:function(storage,player){
						return "本回合你的手牌上限+"+storage+"<br>当前你的手牌上限："+player.getHandcardLimit();
					}
				},
				onremove:function(player){
					player.removeMark("ymk_qiuyi_effect",player.countMark("ymk_qiuyi_effect"),false);
				},
				mod:{
					maxHandcard:function(player,num){
						return num+player.countMark("ymk_qiuyi_effect");
					}
				}
			},
			ymk_xifang:{
				usable:1,
				trigger:{source:"gainAfter"},
				filter:function(event,player){
					return event.player.countCards("h");
				},
				frequent:true,
				logTarget:"player",
				content:function(){
					"step 0"
					player.viewHandcards(trigger.player);
					"step 2"
					var cards=trigger.player.getCards("h");
					var colors=[];
					var types=[];
					for(var i=0;i<cards.length;i++){
						if(!colors.contains(get.color(cards[i]))) colors.push(get.color(cards[i]));
						if(!types.contains(get.type(cards[i],"trick"))) types.push(get.type(cards[i],"trick"));
					}
					if(colors.length>1||types.length>1) player.draw();
					//if(colors.length>1) player.draw();
					//if(types.length>1) player.draw();
				}
			},
			ska_mengjin:{
				locked:false,
				init:function(player){
					if(!player.storage.ska_mengjin) player.storage.ska_mengjin=[];
				},
				enable:"phaseUse",
				usable:1,
				filterTarget:lib.filter.notMe,
				viewAsFilter:function(player){
					if(!player.countCards("h")) return false;
				},
				filterCard:true,
				selectCard:function(){
					var player=_status.event.player;
					return Math.ceil(player.countCards("h")/2);
				},
				check:function(card){
					return 7-get.value(card);
				},
				discard:false,
				lose:false,
				delay:false,
				position:"he",
				content:function (){
					"step 0"
					target.gain(cards,player,"giveAuto");
					"step 1"
					var num=Math.ceil(target.countCards("h")/2);
					if(num){
						target.chooseCard("盟进：交给"+get.translation(player)+get.cnNumber(num)+"张牌",num,"he",true).set("ai",function(card){
							if(get.attitude(_status.event.player,_status.event.getParent().player)>0){
								return 11-get.value(card);
							}
							else{
								return 7-get.value(card);
							}
						});
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.cards&&result.cards.length){
						player.gain(result.cards,target,"giveAuto");
						player.storage.ska_mengjin.addArray(result.cards);
					}
				},
				mod:{
					cardUsable:function(card,player){
						var cards=player.storage.ska_mengjin;
						for(var i=0;i<cards.length;i++){
							if(card.cards&&card.cards.contains(cards[i])) return Infinity;
						}
					},
					targetInRange:function(card,player){
						var cards=player.storage.ska_mengjin;
						for(var i=0;i<cards.length;i++){
							if(card.cards&&card.cards.contains(cards[i])) return true;
						}
					}
				},
				ai:{
					order:5,
					expose:0.2,
					result:{
						target:function(player,target){
							if(target.hasSkillTag("nogain")) return 0;
							if(player.countCards("h")==player.countCards("h","du")) return -1;
							if(get.attitude(player,target)<0) return player.countCards("h")/2-target.countCards("h")/2;
							return 2;
						},
						player:1
					}
				},
				group:"ska_mengjin_clear",
				subSkill:{
					clear:{
						trigger:{global:"phaseAfter"},
						silent:true,
						content:function(){
							player.storage.ska_mengjin=[];
						}
					}
				}
			},
			//Professor Toad
			ska_juegu:{
				trigger:{player:["useCardBegin","respondBegin"]},
				filter:function(event,player){
					return event.skill=="ska_juegu_sha"||event.skill=="ska_juegu_shan";
				},
				logTarget:"targets",
				forced:true,
				content:function(){
					"step 0"
					delete trigger.skill;
					trigger.getParent().set("ska_juegu",true);
					event.card_top=trigger.cards[0];
					player.showCards(event.card_top);
					"step 1"
					player.$throw(1);
					game.log(player,"将一张牌置于牌堆顶");
					player.lose(event.card_top,ui.cardPile,"insert");
					"step 2"
					event.card_bottom=get.bottomCards()[0];
					game.cardsGotoOrdering(event.card_bottom);
					player.showCards(event.card_bottom,get.translation(player.name)+"展示的牌（牌堆底牌）");
					"step 3"
					if(ui.discardPile.childNodes.length&&get.suit(event.card_top)==get.suit(ui.discardPile.childNodes[ui.discardPile.childNodes.length-1])){
						trigger.card.cards=[];
						trigger.cards=[];
						delete trigger.card.suit;
						delete trigger.card.number;
					}
					else{
						if(!ui.discardPile.childNodes.length){
							player.chat("无牌可比较了吗");
							game.log("但是弃牌堆里面已经没有牌了！");
						}
						player.addTempSkill("ska_juegu_disable");
						trigger.cancel();
						trigger.getParent().goto(0);
					}
					"step 4"
					event.can_damage=get.color(event.card_top)!=get.color(event.card_bottom);
					player.chooseTarget("掘古：你可以令一名角色获得"+get.translation(event.card_bottom)+(event.can_damage?"，然后你可以对其造成1点伤害":"")).set("ai",function(target){
						var player=_status.event.player;
						if(get.value(event.card_bottom)<=get.damageEffect(target,player,player)&&_status.event.can_damage) return get.damageEffect(target,player,player);
						return get.sgnAttitude(player,target);
					}).set("cardx",event.card_bottom).set("can_damage",event.can_damage);
					"step 5"
					if(result.targets&&result.targets.length){
						event.target=result.targets[0];
						player.line(event.target,"green");
						event.target.gain(event.card_bottom);
						event.target.$gain2(event.card_bottom,true);
					}
					else{
						event.finish();
					}
					"step 6"
					if(event.can_damage){
						player.chooseBool("掘古：是否对"+get.translation(event.target)+"造成1点伤害？").set("ai",function(){
							var player=_status.event.player;
							var target=_status.event.targetx;
							return get.damageEffect(target,player,player)>0;
						}).set("targetx",event.target);
					}
					else{
						event.finish();
					}
					"step 7"
					if(result.bool){
						//player.line(event.target,"green");
						event.target.damage(player,"nocard");
					}
				},
				group:["ska_juegu_sha","ska_juegu_shan"],
				subSkill:{
					sha:{
						ignoreMod:true,
						enable:["chooseToUse","chooseToRespond"],
						viewAs:{name:"sha",isCard:true},
						filterCard:true,
						filter:function(event,player){
							return !event.ska_juegu&&(event.type!="phase"||!player.hasSkill("ska_juegu_disable"));
						},
						viewAsFilter:function(player){
							if(!player.countCards("he")) return false;
						},
						position:"he",
						check:function(card){
							if(ui.discardPile.childNodes.length&&get.suit(card)==get.suit(ui.discardPile.childNodes[ui.discardPile.childNodes.length-1])) return 8-get.value(card);
							return 5-get.value(card);
						},
						ai:{
							order:function(){
								return get.order({name:"sha",isCard:true})+0.1;
							},
							skillTagFilter:function(player,tag,arg){
								if(!player.countCards("he")) return false;
							},
							respondSha:true,
							expose:0.2
						}
					},
					shan:{
						ignoreMod:true,
						enable:["chooseToUse","chooseToRespond"],
						viewAs:{name:"shan",isCard:true},
						filterCard:true,
						filter:function(event,player){
							return !event.ska_juegu&&(event.type!="phase"||!player.hasSkill("ska_juegu_disable"));
						},
						viewAsFilter:function(player){
							if(!player.countCards("he")) return false;
						},
						check:function(card){
							if(get.suit(card)==get.suit(ui.discardPile.childNodes[ui.discardPile.childNodes.length-1])) return 8-get.value(card);
							return 5-get.value(card);
						},
						position:"he",
						ai:{
							order:function(){
								return get.order({name:"shan",isCard:true})+0.1;
							},
							skillTagFilter:function(player){
								if(!player.countCards("he")) return false;
							},
							respondShan:true,
							guanxing:true,
							expose:0.2
						}
					},
					disable:{
						trigger:{global:["useCardAfter","useSkillAfter","phaseAfter"]},
						silent:true,
						charlotte:true,
						filter:function(event){
							return event.skill!="ska_juegu_sha"&&event.skill!="ska_juegu_shan";
						},
						content:function(){
							player.removeSkill("ska_juegu_disable");
						}
					}
				}
			},
			ska_kuiwang:{
				trigger:{player:"gainAfter"},
				frequent:true,
				filter:function(event,player){
					return event.getParent().name=="draw";
				},
				content:function(){
					"step 0"
					player.gain(get.bottomCards(trigger.cards.length));
					player.$draw(trigger.cards.length);
					"step 1"
					player.chooseCard("窥往：将"+get.cnNumber(trigger.cards.length)+"张牌置于牌堆底（后选择的在下）",trigger.cards.length,true);
					"step 2"
					if(result.cards&&result.cards.length){
						player.$throw(result.cards.length);
						game.log(player,"将",get.cnNumber(result.cards.length),"张牌置于牌堆底");
						player.lose(result.cards,ui.cardPile);
					}
					else{
						event.finish();
					}
					"step 3"
					game.broadcastAll(ui.clear);
				}
			},
			//Edelgard
			mnm_tianjiu:{
				forced:true,
				trigger:{player:"phaseUseBegin"},
				content:function(){
					"step 0"
					player.chooseToDiscard("天鹫：你须弃置一张手牌或失去1点体力，视为对攻击范围内任意名角色使用一张【杀】").set("ai",get.unuseful3);
					"step 1"
					if(!result.cards||!result.cards.length){
						player.loseHp();
					}
					"step 2"
					if(game.hasPlayer(function(current){
						return player.canUse({name:"sha",isCard:true},current);
					})) player.chooseUseTarget("天鹫：视为对攻击范围内任意名角色使用一张【杀】",{name:"sha"},true,false).set("selectTarget",[1,Infinity]);
				}
			},
			mnm_yanhai:{
				skillAnimation:true,
				animationColor:"fire",
				juexingji:true,
				unique:true,
				forced:true,
				trigger:{player:"dieBefore"},
				filter:function(event,player){
					return player.identity!="zhu";
				},
				content:function(){
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
					game.broadcastAll(function(player){
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
				filter:function(event,player){
					return event.targets&&event.targets.length==1&&player.canCompare(event.target);
				},
				logTarget:"target",
				check:function(event,player){
					return get.attitude(player,event.target)<0;
				},
				content:function(){
					"step 0"
					player.chooseToCompare(trigger.target);
					"step 1"
					if(result.bool){
						event.num=get.distance(player,trigger.target)+1;
					}
					"step 2"
					event.num--;
					if(event.num>=0){
						var next=player.chooseToUse("无式：你可以对"+get.translation(trigger.target)+"使用一张【杀】（剩余"+event.num+"次）");
						//next.set("logSkill","alz_wushi");
						next.set("addCount",false);
						next.set("targetx",trigger.target);
						next.set("filterCard",function(card){
							return get.name(card)=="sha"&&lib.filter.targetEnabled(card,_status.event.player,_status.event.targetx);
						});
						next.set("filterTarget",function(card,player,target){
							return target==_status.event.targetx&&lib.filter.targetEnabled(card,player,target);
						});
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
				filterCard:function(card,player){
					return get.color(card)=="red";
				},
				position:"hes",
				viewAs:{name:"sha",nature:"fire"},
				viewAsFilter:function(player){
					if(!player.countCards("hes",function(card){
						return get.color(card)=="red";
					})) return false;
				},
				check:function(card){
					return 5-get.value(card);
				},
				ai:{
					skillTagFilter:function(player){
						if(!player.countCards("hes",function(card){
							return get.color(card)=="red";
						})) return false;
					},
					respondSha:true
				}
			},
			//SP Captain Falcon
			mnm_jijing:{
				enable:"phaseUse",
				usable:1,
				delay:false,
				filterTarget:lib.filter.notMe,
				content:function(){
					"step 0"
					event.rank=[];
					var note=function(bpm,beat){
						var len=60000/bpm;
						return Math.round(beat*len);
					}
					var bpm=208;
					event.beatmap=[
						//Bar 1
						note(bpm,9),
						note(bpm,12),
						note(bpm,12.5),
						//Bar 2
						//Bar 3
						note(bpm,17),
						note(bpm,20),
						note(bpm,20.5),
						//Bar 4
						//Bar 5
						note(bpm,25),
						note(bpm,28),
						note(bpm,28.5),
						//Bar 6
						note(bpm,33),
						note(bpm,36),
						note(bpm,36.5),
						//Bar 7
						note(bpm,38),
						note(bpm,38.5),
						//Bar 8
						note(bpm,39),
						note(bpm,39.5),
						note(bpm,40),
						note(bpm,40.5),
						//Bar 9
						note(bpm,9+32),
						note(bpm,12+32),
						note(bpm,12.5+32),
						//Bar 10
						//Bar 11
						note(bpm,17+32),
						note(bpm,20+32),
						note(bpm,20.5+32),
						//Bar 12
						note(bpm,22+32),
						note(bpm,22.5+32),
						note(bpm,24+32),
						note(bpm,24.5+32),
						//Bar 13
						note(bpm,25+32),
						note(bpm,28+32),
						note(bpm,28.5+32),
						//Bar 14
						note(bpm,31+32),
						note(bpm,31.75+32),
						note(bpm,32.5+32),
						//Bar 15
						note(bpm,33+32),
						note(bpm,33.5+32),
						note(bpm,36+32),
						note(bpm,36.5+32)
						//Bar 16
					];
					player.chooseToPlayBeatmap({
						//Song name
						name:"Big Blue",
						//Song filename
						filename:"sst_big_blue",
						//Beatmap (millisecond)
						timeleap:event.beatmap,
						//Offset
						current:lib.config.touchscreen?0:35,
						//Judge bar height
						judgebar_height:0.176,
						//Judge range of Good/Great/Prefect
						range1:[72,120],
						range2:[84,108],
						range3:[92,100],
						//Speed
						speed:12.5
					});
					"step 1"
					event.rank[0]=result.rank[0];
					player.popup(result.rank[0],result.rank[1]);
					game.log(player,"的演奏评级为","#y"+result.rank[0]);
					"step 2"
					target.chooseToPlayBeatmap({
						//Song name
						name:"Big Blue",
						//Song filename
						filename:"sst_big_blue",
						//Note (millisecond)
						timeleap:event.beatmap,
						//Offset
						current:lib.config.touchscreen?0:35,
						//Judge bar height
						judgebar_height:0.176,
						//Judge range of Good/Great/Prefect
						range1:[72,120],
						range2:[84,108],
						range3:[92,100],
						//Speed
						speed:12.5
					});
					"step 3"
					event.rank[1]=result.rank[0];
					target.popup(result.rank[0],result.rank[1]);
					game.log(target,"的演奏评级为","#y"+result.rank[0]);
					"step 4"
					var grade=function(rank){
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
					if(grade(event.rank[0])>grade(event.rank[1])){
						game.log(player,"#y胜");
						player.popup("胜");
						target.popup("负");
						player.line(target,"green");
						target.damage(player,"nocard");
					}
					else if(grade(event.rank[0])<grade(event.rank[1])){
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
				},
				ai:{
					order:10,
					result:{
						target:function(player,target){
							return get.damageEffect(target,player,target)/2;
						}
					}
				}
			},
			//King Olly
			ska_shenqi2:{
				preHidden:true,
				trigger:{global:"damageSource"},
				frequent:true,
				init:function(player){
					player.storage.renku=true;
				},
				content:function(){
					"step 0"
					event.cards=get.bottomCards(2);
					player.chooseCardButton("神祇：将其中一张牌置入仁库中",event.cards,true).set("ai",function(button){
						return get.value(button.link);
					});
					"step 1"
					if(result.links&&result.links.length){
						event.card=result.links[0];
						event.cards.remove(event.card);
						game.cardsGotoSpecial(event.card,"toRenku");
						player.$throw(event.card);
						game.log(player,"将",event.card,"置入了仁库");
					}
					else{
						event.goto(3);
					}
					"step 2"
					game.broadcastAll(ui.clear);
					"step 3"
					for(var i=0;i<event.cards.length;i++){
						ui.cardPile.appendChild(event.cards[i]);
					}
				},
				ai:{
					maixie:true
				},
				group:"ska_shenqi3"
			},
			ska_zhesheng:{
				enable:"phaseUse",
				usable:1,
				filter:function(event,player){
					return _status.renku&&_status.renku.length;
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog("折生",_status.renku,"hidden");
					},
					check:function(button){
						return get.value(button.link)+5;
					},
					backup:function(links,player){
						return {
							filterCard:function(){return false;},
							selectCard:-1,
							filterTarget:function(card,player,target){
								if(!ui.selected.targets||!ui.selected.targets.length){
									//return lib.filter.cardEnabled(links[0],target);
									return game.hasPlayer(function(current){
										return current!=target&&lib.filter.targetEnabled3(links[0],target,current);
									});
								}
								else{
									return lib.filter.targetEnabled3(links[0],ui.selected.targets[0],target);
								}
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
									target:function(player,target){
										if(!ui.selected.targets||!ui.selected.targets.length){
											//return Math.abs(get.attitude(target,player));
											var players=game.filterPlayer();
											players.remove(target);
											var val=0;
											for(var i=0;i<players.length;i++){
												if(get.attitude(player,target)<0){
													val=Math.min(val,get.effect(players[i],links[0],target,target));
												}
												else{
													val=Math.max(val,get.effect(players[i],links[0],target,target));
												}
											}
											return val;
										}
										else{
											return get.effect(target,links[0],ui.selected.targets[0],target);
										}
									}
								}
							}
						}
					},
					prompt:function(){return "请选择〖折生〗的目标";},
				},
				contentx:function(){
					"step 0"
					event.card=lib.skill.ska_zhesheng_backup.cards[0];
					_status.renku.remove(event.card);
					game.updateRenku();
					game.cardsGotoOrdering(event.card).set("fromRenku",true);
					player.showCards(event.card);
					"step 1"
					targets[0].useCard(event.card,targets[1],false,"noai");
				},
				ai:{
					combo:["ska_shenqi","ska_shenqi2"],
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
				filter:function(event,player){
					return event.getParent().name=="ska_zhesheng_backup";
				},
				content:function(){
					trigger.directHit.addArray(game.players);
				}
			},
			//Koopa Troopa
			ska_suixuan:{
				forced:true,
				trigger:{player:"damageEnd"},
				content:function(){
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
				content:function(){
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
				content:function(){
					"step 0"
					player.turnOver();
					"step 1"
					player.chooseToRespond("向矢：你可以打出一张牌，然后弃置一名角色区域内的一张牌，若这两张牌的花色相同，你翻面").set("ai",function(card){
						var player=_status.event.player;
						if(!game.hasPlayer(function(current){
							return current.countDiscardableCards(player,"hej");
						})) return 0;
						if(!game.hasPlayer(function(current){
							var att=get.attitude(player,current);
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
						player.chooseTarget("向矢：弃置一名角色区域内的一张牌",function(card,player,target){
							return target.countDiscardableCards(player,"hej");
						}).set("ai",function(target){
							var player=_status.event.player;
							var att=get.attitude(player,target);
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
					if(result.cards&&result.cards.length&&get.suit(event.card)==get.suit(result.cards[0])) player.turnOver();
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
				content:function(){
					"step 0"
					var list=[
						"caocao","simayi","xiahoudun","zhangliao","xuzhu","guojia","zhenji","liubei","guanyu","zhangfei","zhugeliang","zhaoyun","machao","huangyueying","sunquan","ganning","lvmeng","huanggai","zhouyu","daqiao","luxun","sunshangxiang","huatuo","lvbu","diaochan",
						"huaxiong","re_yuanshu",
						"gongsunzan","xf_yiji"
					];
					//console.log(get.translation(list));
					player.chooseButton([get.prompt2("mnm_huaijiu"),[list,"character"]]).set("ai",function(button){
						var skills=lib.characterPack.sst_old[button.link][3];
						if(!Array.isArray(skills)) return 0;
						var val=0;
						for(var i=0;i<skills.length;i++){
							val+=(get.skillRank(skills[i],"in")+get.skillRank(skills[i],"out"))/2;
						}
						val/=skills.length;
						return val+Math.random();
					});
					"step 1"
					if(result.links&&result.links.length){
						player.logSkill("mnm_huaijiu");
						player.flashAvatar("mnm_huaijiu",result.links[0]);
						player.popup(result.links[0],"thunder");
						game.log(player,"选择了","#b"+get.translation(result.links[0]));
						var skills=lib.characterPack.sst_old[result.links[0]][3];
						if(Array.isArray(skills)){
							for(var i=0;i<skills.length;i++){
								player.addTempSkill(skills[i],{player:"phaseBegin"});
								player.popup(skills[i],"thunder");
								game.log(player,"获得了技能","#g【"+get.translation(skills[i])+"】");
							}
						}
					}
				}
			},
			//SP Robin
			nnk_yuanlei:{
				locked:false,
				mod:{
					targetInRange:function(card,player,target){
						if(_status.event.skill=="nnk_yuanlei") return true;
					}
				},
				enable:"phaseUse",
				usable:1,
				filterCard:true,
				selectCard:function(){
					return [1,_status.event.player.maxHp];
				},
				position:"hes",
				viewAs:{name:"sha",nature:"thunder"},
				viewAsFilter:function(player){
					if(!player.countCards("hs")) return false;
				},
				check:function(card){
					return 5-get.value(card);
				},
				ai:{
					order:function(){
						return get.order({name:"sha"})+0.1;
					},
					skillTagFilter:function(player,tag,arg){
						if(arg!="use") return false;
						if(!player.isPhaseUsing()) return false;
						if(!player.countCards("hs")) return false;
					},
					respondSha:true
				},
				group:"nnk_yuanlei2"
			},
			nnk_yuanlei2:{
				trigger:{player:"useCardAfter"},
				forced:true,
				popup:false,
				filter:function(event,player){
					return event.skill=="nnk_yuanlei"&&game.cardCausedDamage(event.card)&&event.cards&&event.cards.length;
				},
				content:function(){
					if(trigger.cards.length>=1) player.addTempSkill("nnk_yuanlei_effect");
					if(trigger.cards.length>=2) player.draw(2);
					if(trigger.cards.length>=3){
						player.addTempSkill("nnk_yuanlei_effect3");
						player.addMark("nnk_yuanlei_effect3",1,false);
					}
					if(trigger.cards.length>=4){
						player.addTempSkill("nnk_yuanlei_effect4");
						player.addMark("nnk_yuanlei_effect4",2,false);
					}
				}
			},
			nnk_yuanlei_effect:{
				charlotte:true,
				forced:true,
				mark:true,
				intro:{
					content:"本回合你使用的下一张牌不可被响应"
				},
				trigger:{player:"useCard"},
				content:function(){
					trigger.directHit.addArray(game.players);
					player.removeSkill("nnk_yuanlei_effect");
				}
			},
			nnk_yuanlei_effect3:{
				charlotte:true,
				intro:{
					content:"本回合你可以额外使用&张【杀】，且使用【杀】可以额外指定&个目标"
				},
				onremove:function(player){
					player.removeMark("nnk_yuanlei_effect3",player.countMark("nnk_yuanlei_effect3"),false);
				},
				mod:{
					cardUsable:function(card,player,num){
						if(card.name=="sha") return num+player.countMark("nnk_yuanlei_effect3");
					},
					selectTarget:function(card,player,range){
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
				onremove:function(player){
					player.removeMark("nnk_yuanlei_effect4",player.countMark("nnk_yuanlei_effect4"),false);
				},
				trigger:{player:"useCard1"},
				filter:function(event,player){
					return event.card&&get.name(event.card)=="sha";
				},
				content:function(){
					trigger.baseDamage+=player.countMark("nnk_yuanlei_effect4");
					player.removeSkill("nnk_yuanlei_effect4");
				},
				ai:{
					damageBonus:true
				}
			},
			//Yuri Kozukata
			alz_yingjian:{
				direct:true,
				trigger:{global:"phaseJieshuBegin"},
				filter:function(event,player){
					if(!_status.renku||!_status.renku.length||!game.hasPlayer2(function(current){
						return current.hasHistory("useCard",function(evt){
							return evt.targets.contains(player);
						});
					})) return false;
					var used=[];
					game.filterPlayer2(function(current){
						current.getHistory("useCard",function(evt){
							if(!used.contains(evt.card)&&["basic","trick"].contains(get.type(evt.card))) used.push(evt.card);
						});
					});
					return used.length;
				},
				content:function(){
					"step 0"
					var used=[];
					game.filterPlayer2(function(current){
						current.getHistory("useCard",function(evt){
							if(!used.contains(evt.card)&&["basic","trick"].contains(get.type(evt.card))) used.push(evt.card);
						});
					});
					used=used.map(function(card){
						return [card.suit,card.number,card.name,card.nature];
					});
					player.chooseButton([get.prompt2("alz_yingjian"),"仁库中的牌",_status.renku,"本回合使用过的基本牌或普通锦囊牌",[used,"vcard"]]).set("filterButton",function(button){
						if(_status.renku.contains(button.link)){
							if(!ui.selected.buttons||!ui.selected.buttons.length) return true;
							for(var i=0;i<ui.selected.buttons.length;i++){
								if(_status.renku.contains(ui.selected.buttons[i].link)) return false;
							}
							return true;
						}
						return _status.event.player.hasUseTarget({suit:button.link[0],number:button.link[1],name:button.link[2],nature:button.link[3]});
					}).set("selectButton",2).set("complexSelect",true);
					"step 1"
					if(result.links&&result.links.length>1){
						player.logSkill("alz_yingjian");
						var card,viewAs;
						result.links.forEach(function(link){
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
					threaten:function(){
						if(_status.renku&&_status.renku.length) return 0.8;
						return 1;
					}
				}
			},
			alz_qushui:{
				mark:true,
				marktext:"☯",
				intro:{
					content:function(storage){
						return storage?"转换技，出牌阶段限一次，你可以将三张牌置于仁库中，令一名角色本轮非锁定技失效。":"转换技，出牌阶段限一次，你可以将三张牌置于仁库中，令一名角色翻面。";
					}
				},
				init:function(player){
					player.storage.renku=true;
				},
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
				check:function(card){
					return 7-get.value(card);
				},
				content:function(){
					"step 0"
					event.zhuanhuanji=player.storage.alz_qushui==true;
					player.changeZhuanhuanji(event.name);
					player.$throw(cards);
					game.log(player,"将",cards,"置入了仁库");
					player.lose(cards,ui.special,"toRenku");
					"step 1"
					game.delayx();
					"step 2"
					if(!event.zhuanhuanji){
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
						target:function(player,target){
							if(!player.storage.alz_qushui){
								if(target.hasSkillTag("noturn")) return -0.5;
								return target.isTurnedOver()?2:-2;
							}
							var skills=target.getSkills();
							for(var i=0;i<skills.length;i++){
								if(!get.is.locked(skills[i])){
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
				filter:function(event,player){
					return get.type(event.card)!="equip";
				},
				check:function(event,player){
					var val=0;
					var cards=player.getCards();
					for(var i=0;i<cards.length;i++){
						val+=get.value(cards[i]);
					}
					val=val/cards.length;
					return Math.cbrt(6-val)>0;
				},
				content:function(){
					"step 0"
					player.discard(player.getCards("h",function(card){
						return lib.filter.cardDiscardable(card,player);
					}));
					"step 1"
					player.judge(function(card){
						return Math.ceil(get.number(card)/2);
					}).set("judge2",function(result){
						return result.number;
					});
					"step 2"
					if(Math.ceil(result.number/2)) player.draw(Math.ceil(result.number/2));
					var evt=trigger.getParent();
					var next=game.createEvent("ymk_kaibai_clear");
					event.next.remove(next);
					evt.after.push(next);
					next.set("player",player);
					next.set("card",trigger.card);
					next.setContent(function(){
						if(game.cardCausedDamage(card,null,player)&&Math.floor(player.countCards()/2)) player.chooseToDiscard("开摆：弃置"+get.cnNumber(Math.floor(player.countCards()/2))+"张手牌",Math.floor(player.countCards()/2),"h",true);
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
				content:function(){
					"step 0"
					var evt=event.getParent("phase");
					if(evt&&evt.name=="phase"&&!evt.xsj_dongqie){
						evt.set("xsj_dongqie",true);
						var next=game.createEvent("xsj_dongqie_clear");
						event.next.remove(next);
						evt.after.push(next);
						next.set("player",player);
						next.setContent(function(){
							delete player.storage.xsj_dongqie;
							player.unmarkSkill("xsj_dongqie");
						});
					}
					"step 1"
					player.draw();
					"step 2"
					var cards=result.filter(function(card){
						return player.getCards("he").contains(card);
					});
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
				filter:function(event,player){
					return player.storage.xsj_dongqie&&get.suit(event.card)==get.suit(player.storage.xsj_dongqie)&&game.cardCausedDamage(event.card,player,game.filterPlayer2(function(current){
						return current!=player;
					}));
				},
				content:function(){
					var card=game.createCard("lebu","","");
					player.chooseUseTarget(card,false).set("prompt",get.prompt("xsj_dongqie2")).set("prompt2",get.translation("xsj_dongqie_info")).set("logSkill","xsj_dongqie2");
					card._destroy=true;
					card.expired=true;
					game.broadcast(function(card){
						card._destroy=true;
						card.expired=true;
					},card);
				},
				ai:{
					effect:{
						player:function(card,player,target){
							if(player.storage.xsj_dongqie&&get.itemtype(card)=="card"&&get.suit(card)==get.suit(player.storage.xsj_dongqie)) return [1,1];
						}
					}
				}
			},
			xsj_taluo:{
				frequent:true,
				trigger:{player:["useCardAfter","respondAfter"]},
				filter:function(event,player){
					return event.respondTo&&event.respondTo[1]&&(get.name(event.respondTo[1])=="sha"||get.tag(event.respondTo[1],"damage"))&&event.respondTo[1].cards&&event.respondTo[1].cards.filterInD("od").length;
				},
				content:function(){
					var respond=trigger.respondTo[1];
					if(respond&&respond.cards&&respond.cards.filterInD("od").length) player.gain(respond.cards.filterInD("od"),"gain2");
				}
			},
			//Dante
			xsj_wanxie:{
				trigger:{global:["loseAfter","cardsDiscardAfter"]},
				direct:true,
				filter:function(event,player){
					return event.cards&&event.cards.filter(function(card){
						return get.position(card,true)=="d"&&get.subtype(card,false)=="equip1";
					}).length>0;
				},
				content:function(){
					"step 0"
					player.chooseToRespond().set("ai",function(card){
						var cards=_status.event.getTrigger().cards.filter(function(card){
							return get.position(card,true)=="d"&&get.subtype(card,false)=="equip1";
						});
						var val=0;
						for(var i=0;i<cards.length;i++){
							val+=get.value(cards[i]);
						}
						return val-get.value(card);
					}).set("position","hes").set("logSkill","xsj_wanxie").set("prompt",get.prompt("xsj_wanxie")).set("prompt2","你可以打出一张牌，然后获得"+get.translation(trigger.cards.filter(function(card){
						return get.position(card,true)=="d"&&get.subtype(card,false)=="equip1";
					})));
					"step 1"
					if(result.card){
						var cards=trigger.cards.filter(function(card){
							return get.position(card,true)=="d"&&get.subtype(card,false)=="equip1";
						});
						if(cards.length) player.gain(cards,"gain2");
					}
				}
			},
			xsj_moxue:{
				direct:true,
				trigger:{player:"damageEnd"},
				filter:function(event,player){
					return player.countCards("e");
				},
				content:function(){
					"step 0"
					player.chooseCard(get.prompt2("xsj_moxue"),"e").set("ai",function(card){
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
					skillTagFilter:function(player){
						if(!player.countCards("e")) return false;
					}
				}
			},
			//Daroach
			ska_zhidai:{
				init:player=>{
					player.storage.ska_zhidai=[];
				},
				direct:true,
				trigger:{global:"useCard1"},
				filter:event=>event.player.countUsed(null,true)<=1&&!_status.dying.length&&event.targets&&event.targets.length,
				content:()=>{
					"step 0"
					player.chooseToRespond().set("ai",card=>{
						var player=_status.event.player;
						var evt=_status.event.getTrigger();
						var before=0,after=0;
						evt.targets.forEach(target=>{
							before+=get.effect(target,evt.card,evt.player,player);
							after+=get.effect(target,card,evt.player,player);
						});
						before/=evt.targets.length;
						after/=evt.targets.length;
						return after-before;
					}).set("noOrdering",true).set("position","hes").set("logSkill",["ska_zhidai",trigger.player]).set("prompt",get.prompt("ska_zhidai")).set("prompt2","你可以打出一张牌替换"+get.translation(trigger.card)+"对应的实体牌，若如此做，本回合结束阶段，你对自己使用"+get.translation(trigger.card)+"对应的实体牌");
					"step 1"
					if(result.card&&result.cards){
						event.cards=trigger.cards.filterInD("o");
						if(event.cards.length){
							player.$gain2(event.cards,true);
							player.gain(event.cards);
							if(Array.isArray(player.storage.ska_zhidai)){
								player.storage.ska_zhidai.addArray(event.cards);
							}
							else{
								player.storage.ska_zhidai=event.cards;
							}
						}
						trigger.card=result.card;
						trigger.cards=result.cards;
						if(!Array.isArray(trigger.orderingCards)) trigger.orderingCards=[];
						trigger.orderingCards.addArray(result.cards);
						trigger.throw=false;
						trigger.noai=true;
						var evt=event.getParent("phase");
						if(evt&&evt.name=="phase"&&!evt.ska_zhidai){
							evt.set("ska_zhidai",true);
							var next=game.createEvent("ska_zhidai_clear");
							event.next.remove(next);
							evt.after.push(next);
							next.set("player",player);
							next.setContent(()=>{
								player.removeGaintag("ska_zhidai",player.storage.ska_zhidai);
								player.storage.ska_zhidai=[];
							});
						}
					}
					else{
						event.finish();
					}
					"step 2"
					player.addGaintag(event.cards,"ska_zhidai");
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
				filter:(event,player)=>player.storage.ska_zhidai.filter(card=>card.hasGaintag("ska_zhidai")).length,
				content:()=>{
					"step 0"
					event.cards=player.storage.ska_zhidai.filter(card=>card.hasGaintag("ska_zhidai"));
					"step 1"
					if(event.cards.length){
						var card=event.cards.shift();
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
			}
		},
		dynamicTranslate:{
			ska_jiyan:function(player){
				if(!Array.isArray(player.storage.ska_jiyan)) return "使命技。每个选项限一次，你可以视为使用一张：<span class=\"bluetext\">1. 【杀】；</span><span class=\"bluetext\">2. 【闪】；</span><span class=\"bluetext\">3. 【桃】；</span><span class=\"bluetext\">4. 【酒】。</span><br>\
				成功：你使用牌结算后，若所有选项均选择过，你增加1点体力上限并回复1点体力。";
				if(!player.storage.ska_jiyan.length) return "使命技。每个选项限一次，你可以视为使用一张：1. 【杀】；2. 【闪】；3. 【桃】；4. 【酒】。<br>\
				成功：你使用牌结算后，若所有选项均选择过，你增加1点体力上限并回复1点体力。";
				var str="使命技。每个选项限一次，你可以视为使用一张：";
				str+=player.storage.ska_jiyan.contains("sha")?"<span class=\"bluetext\">1. 【杀】；</span>":"<span style=\"opacity:0.5\">1. 【杀】；</span>";
				str+=player.storage.ska_jiyan.contains("shan")?"<span class=\"bluetext\">2. 【闪】；</span>":"<span style=\"opacity:0.5\">2. 【闪】；</span>";
				str+=player.storage.ska_jiyan.contains("tao")?"<span class=\"bluetext\">3. 【桃】；</span>":"<span style=\"opacity:0.5\">3. 【桃】；</span>";
				str+=player.storage.ska_jiyan.contains("jiu")?"<span class=\"bluetext\">4. 【酒】。</span>":"<span style=\"opacity:0.5\">4. 【酒】。</span>";
				str+="<br>成功：你使用牌结算后，若所有选项均选择过，你增加1点体力上限并回复1点体力。";
				return str;
			},
			alz_qushui:function(player){
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
			ska_wangshi:"惘事",
			ska_wangshi_info:"使命技。你区域内的♠牌和♠判定牌均视为♦。<br>\
			成功：准备阶段，若本局已结算过11次判定，你获得弃牌堆顶两张牌，重铸一张牌，回复体力至体力上限。",
			ska_yangxun:"洋寻",
			ska_yangxun_info:"锁定技，当一名角色的判定牌生效后，若为红色，你令一名角色获得弃牌堆顶的一张牌，然后若其不是你，其交给你一张牌。",
			ska_shenqi:"神祇-",
			ska_shenqi3:"神祇",
			ska_shenqi_info:"一名角色受到伤害后，若仁库未满，你可以判定，然后将判定牌置于仁库中；当你使用牌时，你可以从仁库中获得与此牌颜色相同的一张牌。",
			ska_zhefu:"折赋",
			ska_zhefu_backup:"折赋",
			ska_zhefu_info:"出牌阶段限一次，你可以亮出仁库中的一张牌，并令一名角色选择一项：1. 获得这张牌；2. 交给你一张牌，然后使用这张牌（若不能使用则弃置）。",
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
			ska_juegu_sha:"掘古·杀",
			ska_juegu_shan:"掘古·闪",
			ska_juegu_info:"当你需要使用或打出一张【杀】/【闪】时，你可以展示一张牌A并将其置于牌堆顶，然后亮出牌堆底一张牌B：1. 若A花色与弃牌堆顶牌相同，你视为使用或打出一张【杀】/【闪】；2. 你可以令一名角色获得B，然后若与A颜色不同，你可以对其造成1点伤害。",
			ska_kuiwang:"窥往",
			ska_kuiwang_info:"当你因摸牌而获得牌时，你可以从牌堆底获得等量的牌，然后将等量的牌置于牌堆底。",
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
			mnm_jijing_info:"出牌阶段限一次，你可以与一名其他角色依次演奏《Big Blue》的前奏，然后若你的评级：大于其，你对其造成1点伤害；小于其，其对你造成1点伤害。；等于其，你与其各摸两张牌。",
			ska_shenqi2:"神祇+",
			ska_shenqi2_info:"一名角色造成伤害后，你可以观看牌堆底两张牌，然后将其中一张牌置于仁库中；当你使用牌时，你可以从仁库中获得一张与此牌颜色相同的牌。",
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
			nnk_yuanlei2:"远雷",
			nnk_yuanlei_effect:"远雷",
			nnk_yuanlei_effect3:"远雷",
			nnk_yuanlei_effect4:"远雷",
			nnk_yuanlei_info:"出牌阶段限一次，你可以将X张牌当作无距离限制的雷【杀】使用。若此雷【杀】造成了伤害，且X不小于：一，本回合你使用的下一张牌不可被响应；二，你摸两张牌；三，本回合你可以额外使用一张【杀】，且使用【杀】可以额外指定一个目标；四，本回合你使用的下一张【杀】伤害值基数+2。（X不超过你的体力上限且至少为1）",
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
			ska_zhidai_info:"当一名角色于回合内声明使用第一张牌时，若场上没有处于濒死状态的角色，且此牌有目标，你可以打出一张牌替换之。本回合结束阶段，你对自己依次使用被替换牌（无视合法性）。",
			ska_siyi:"嘶咿",
			ska_siyi_effect:"嘶咿",
			ska_siyi_info:"隐匿技，当你登场后，你可以令一名其他角色的手牌本局游戏对你可见。",
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
			ska_daroach:"Daroach"
		},
		perfectPair:{
			ymk_isabelle:["sst_villager"],
			ymk_yumikohimi:["sst_mario_not_mary","sst_terry"],
			ska_olivia:["sst_mario","ska_bobby","ska_professor_toad","ska_king_olly"],
			ska_super_xiaojie:["sst_mario","sst_luigi"],
			ska_show_k:["sst_mario"],
			ska_king_olly:["sst_mario"],
			ska_koopa_troopa:["sst_mario"],
			alz_kyo_kusanagi:["sst_kyo_kusanagi"],
			mnm_9_volt_18_volt:["sst_9_volt_18_volt","sst_wario"],
			nnk_robin:["sst_robin","sst_lucina","sst_chrom"],
			ymk_tianyi:["sst_mario_not_mary","sst_yumikohimi","ymk_yumikohimi","sst_kirby","sst_kazuya"],
			xsj_yu_narukami:["sst_joker"],
			ska_daroach:["sst_kirby","sst_meta_knight","sst_king_dedede","sst_bandana_waddle_dee","sst_magolor"]
		}
	};
	return sst_sp;
});
