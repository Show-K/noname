'use strict';
game.import('mode',function(lib,game,ui,get,ai,_status){
	return {
		name:'guozhan',
		startBefore:function(){
			var playback=localStorage.getItem(lib.configprefix+'playback');
			for(var i in lib.characterPack.mode_guozhan){
				if(!get.config('onlyguozhan')&&!playback){
					if(lib.character[i.slice(3)]) continue;
				}
				lib.character[i]=lib.characterPack.mode_guozhan[i];
				if(!lib.character[i][4]){
					lib.character[i][4]=[];
				}
				if(!lib.translate[i]){
					lib.translate[i]=lib.translate[i.slice(3)];
				}
			}
			for(var i in lib.character){
				if(lib.character[i][1]=='shen'){
					if(lib.character[i][4]&&(lib.group.contains(lib.character[i][4][0])||lib.character[i][4][0]=='key')){
						lib.character[i][1]=lib.character[i][4][0];
					}
					else{
						lib.character[i][1]='sst_smash';
					}
				}
			}
			if(lib.skill.sanchen) lib.skill.sanchen.derivation='pozhu';
		},
		onreinit:function(){
			var pack=lib.characterPack.mode_guozhan;
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
				if(lib.character[i][1]=='shen'){
					if(lib.character[i][4]&&(lib.group.contains(lib.character[i][4][0])||lib.character[i][4][0]=='key')){
						lib.character[i][1]=lib.character[i][4][0];
					}
					else{
						lib.character[i][1]='sst_smash';
					}
				}
			}
		},
		start:function(){
			"step 0"
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
			else if(_status.connectMode){
				game.waitForPlayer();
			}
			else{
				_status.mode=get.config('guozhan_mode');
				if(!['normal','yingbian','old','free'].contains(_status.mode)) _status.mode='normal';
				//决定牌堆
				switch(_status.mode){
					case 'old':lib.card.list=lib.guozhanPile_old.slice(0);break;
					case 'yingbian':
						lib.card.list=lib.guozhanPile_yingbian.slice(0);
						delete lib.translate.shuiyanqijunx_info_guozhan;
						break;
					case 'normal':lib.card.list=lib.guozhanPile.slice(0);break;
				}
				if(_status.mode!='free') game.fixedPile=true;
				else{
					delete lib.translate.shuiyanqijunx_info_guozhan;
				}
				game.prepareArena();
				// game.delay();
				game.showChangeLog();
			}
			if(!_status.connectMode){
				_status.mode=get.config('guozhan_mode');
				if(_status.brawl&&_status.brawl.submode){
					_status.mode=_status.brawl.submode;
				}
			}
			"step 1"
			if(_status.connectMode){
				_status.mode=lib.configOL.guozhan_mode;
				if(!['normal','yingbian','old'].contains(_status.mode)) _status.mode='normal';
				//决定牌堆
				switch(_status.mode){
					case 'old':lib.card.list=lib.guozhanPile_old.slice(0);break;
					case 'yingbian':lib.card.list=lib.guozhanPile_yingbian.slice(0);break;
					default:lib.card.list=lib.guozhanPile.slice(0);break;
				}
				game.fixedPile=true;
				game.broadcastAll(function(mode){
					_status.mode=mode;
					if(mode=='yingbian'){
						delete lib.translate.shuiyanqijunx_info_guozhan;
					}
					for(var i=0;i<game.players.length;i++){
						game.players[i].node.name.hide();
						game.players[i].node.name2.hide();
					}
					var pack=lib.characterPack.mode_guozhan;
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
						if(lib.character[i][1]=='shen'){
							if(lib.character[i][4]&&(lib.group.contains(lib.character[i][4][0])||lib.character[i][4][0]=='key')){
								lib.character[i][1]=lib.character[i][4][0];
							}
							else{
								lib.character[i][1]='sst_smash';
							}
						}
					}
					lib.characterReplace={};
					if(lib.skill.sanchen) lib.skill.sanchen.derivation='pozhu';
				},_status.mode);
				game.randomMapOL();
			}
			else{
				lib.characterReplace={};
				for(var i=0;i<game.players.length;i++){
					game.players[i].node.name.hide();
					game.players[i].node.name2.hide();
					game.players[i].getId();
				}
				if(_status.brawl&&_status.brawl.chooseCharacterBefore){
					_status.brawl.chooseCharacterBefore();
				}
				game.chooseCharacter();
			}
			"step 2"
			//game.broadcastAll(function(){
			//	lib.inpile.removeArray(['gz_haolingtianxia','gz_kefuzhongyuan','gz_guguoanbang','gz_wenheluanwu']);
			//});
			if(ui.coin){
				_status.coinCoeff=get.coinCoeff([game.me.name1,game.me.name2]);
			}
			var player;
			if(_status.cheat_seat){
				var seat=_status.cheat_seat.link;
				if(seat==0){
					player=game.me;
				}
				else{
					player=game.players[game.players.length-seat];
				}
				if(!player) player=game.me;
				delete _status.cheat_seat;
			}
			else{
				player=game.players[Math.floor(Math.random()*game.players.length)];
			}
			event.playerx=player;
			event.trigger('gameStart');

			"step 3"
			game.gameDraw(event.playerx);
			game.broadcastAll(function(player){
				for(var i=0;i<game.players.length;i++){
					game.players[i].name='unknown'+get.distance(player,game.players[i],'absolute');
					game.players[i].node.name_seat=ui.create.div('.name.name_seat',get.verticalStr(lib.translate[game.players[i].name]),game.players[i]);
					// if(game.players[i]==game.me){
					// 	lib.translate[game.players[i].name]+='（你）';
					// }
				}
			},event.playerx);

			var players=get.players(lib.sort.position);
			var info=[];
			for(var i=0;i<players.length;i++){
				info.push({
					name:game.players[i].name,
					translate:lib.translate[game.players[i].name],
					name1:players[i].name1,
					name2:players[i].name2,
				});
			}
			_status.videoInited=true,
			game.addVideo('init',null,info);
			if(_status.mode=='mingjiang'){
				game.showIdentity(true);
			}
			else{
				for(var i=0;i<game.players.length;i++){
					game.players[i].ai.shown=0;
				}
			}
			if(_status.connectMode&&lib.configOL.change_card) game.replaceHandcards(game.players.slice(0));
			game.phaseLoop(event.playerx);
		},
		card:{
			junling1:{
				type:'junling',
				vanish:true,
				derivation:'guozhan',
			},
			junling2:{
				type:'junling',
				vanish:true,
				derivation:'guozhan',
			},
			junling3:{
				type:'junling',
				vanish:true,
				derivation:'guozhan',
			},
			junling4:{
				type:'junling',
				vanish:true,
				derivation:'guozhan',
			},
			junling5:{
				type:'junling',
				vanish:true,
				derivation:'guozhan',
			},
			junling6:{
				type:'junling',
				vanish:true,
				derivation:'guozhan',
			},
			zhulian_card:{
				cardimage:'wuzhong',
			},
		},
		aozhanRank:{
			'8':['gz_ymk_tianyi'],
			'7':[],
			'6':[],
			'5':[
				'gz_sst_meta_knight','gz_sst_kyuukou','gz_sst_bowser_jr','gz_ymk_yumikohimi','gz_sst_fox','gz_sst_king_dedede'
			],
			'4':[
				'gz_sst_zero_suit_samus','gz_sst_luigi','gz_sst_dark_samus','gz_sst_greninja','gz_sst_chrom','gz_sst_mr_8','gz_sst_srf','gz_sst_waluigi','gz_ymk_577','gz_sst_ike','gz_sst_miumiu','gz_sst_spring_man','gz_sst_joker','gz_sst_captain_falcon','gz_sst_lucario','gz_sst_steve','gz_sst_pikachu','gz_sst_pokemon_trainer_leaf','gz_sst_palutena','gz_sst_rosalina','gz_sst_richter','gz_sst_ma','gz_sst_claude','gz_ska_olivia','gz_sst_kyo_kusanagi','gz_sst_pyra_mythra','gz_sst_donkey_kong'
			],
			'3':[
				'gz_sst_mario','gz_sst_link','gz_sst_dr_mario','gz_sst_marth','gz_sst_byleth_female','gz_sst_haine','gz_sst_terry','gz_sst_incineroar','gz_sst_oc','gz_sst_ryu','gz_sst_ken','gz_sst_toon_link','gz_sst_wolf','gz_sst_snake','gz_sst_jigglypuff','gz_sst_feiji','gz_sst_sonic','gz_sst_alex','gz_sst_min_min','gz_ska_professor_toad','gz_sst_geno','gz_sst_lucina','gz_sst_master_hand','gz_sst_mii_fighters','gz_sst_zelda','gz_sst_peach','gz_sst_massy','gz_sst_bowser','gz_ska_super_xiaojie','gz_sst_pokemon_trainer_leaf','gz_sst_pauline','gz_sst_9_volt_18_volt','gz_ska_show_k','gz_ska_koopa_troopa','gz_sst_kazuya','gz_sst_duck_hunt'
			],
			'2':[
				'gz_sst_wario','gz_sst_byleth_male','gz_sst_mr_game_watch','gz_sst_simon','gz_sst_pokemon_trainer_red','gz_sst_isabelle','gz_sst_dark_link','gz_sst_windier','gz_sst_sheik','gz_sst_rex','gz_sst_cuphead_mugman','gz_sst_krystal','gz_sst_mega_man','gz_sst_hero','gz_sst_falco','gz_sst_enderman','gz_sst_king_k_rool','gz_sst_koopalings','gz_sst_pichu','gz_sst_mario_not_mary','gz_sst_ganondorf','gz_sst_daisy','gz_sst_little_mac','gz_sst_sans','gz_ska_bobby'
			],
			'1':[
				'gz_sst_yoshi','gz_sst_villager','gz_sst_rentianshu','gz_sst_ridley','gz_sst_yumikohimi','gz_sst_kirby'
			],
		},
		guozhanRank:{
			'8':['gz_ymk_tianyi'],
			'7':[
				'gz_ymk_isabelle','gz_sst_meta_knight','gz_sst_kyuukou','gz_sst_richter','gz_sst_king_dedede','gz_sst_ganondorf','gz_sst_donkey_kong','gz_sst_dr_wily','gz_sst_fox','gz_ymk_yumikohimi'
			],
			'6':[
				'gz_sst_zero_suit_samus','gz_sst_luigi','gz_sst_dark_samus','gz_sst_greninja','gz_sst_isabelle','gz_sst_mr_8','gz_sst_bowser_jr','gz_sst_waluigi','gz_sst_ike','gz_sst_miumiu','gz_sst_spring_man','gz_sst_joker','gz_sst_steve','gz_sst_pikachu','gz_sst_enderman','gz_sst_pokemon_trainer_leaf','gz_sst_palutena','gz_sst_rosalina','gz_sst_king_k_rool','gz_sst_master_hand','gz_sst_yumikohimi','gz_sst_claude','gz_ska_olivia','gz_sst_kyo_kusanagi','gz_sst_pyra_mythra'
			],
			'5':[
				'gz_sst_mario','gz_sst_link','gz_sst_marth','gz_sst_byleth_female','gz_sst_haine','gz_sst_terry','gz_sst_incineroar','gz_sst_chrom','gz_sst_dark_link','gz_sst_ken','gz_ymk_577','gz_sst_toon_link','gz_sst_snake','gz_sst_lucario','gz_sst_feiji','gz_sst_sonic','gz_sst_min_min','gz_ska_professor_toad','gz_sst_geno','gz_sst_koopalings','gz_sst_ma','gz_sst_zelda','gz_sst_peach','gz_sst_massy','gz_sst_bowser','gz_ska_bobby','gz_ska_super_xiaojie','gz_sst_pokemon_trainer_leaf','gz_sst_pauline','gz_sst_9_volt_18_volt','gz_ska_show_k','gz_ska_koopa_troopa','gz_sst_kazuya','gz_sst_duck_hunt'
			],
			'4':[
				'gz_sst_wario','gz_sst_dr_mario','gz_sst_byleth_male','gz_sst_mr_game_watch','gz_sst_simon','gz_sst_pokemon_trainer_red','gz_sst_oc','gz_sst_windier','gz_sst_srf','gz_sst_sheik','gz_sst_wolf','gz_sst_rex','gz_sst_captain_falcon','gz_sst_alex','gz_sst_ridley','gz_sst_lucina','gz_sst_pichu','gz_sst_mii_fighters','gz_sst_mario_not_mary','gz_sst_little_mac','gz_sst_sans'
			],
			'3':[
				'gz_sst_yoshi','gz_sst_rentianshu','gz_sst_ryu','gz_sst_cuphead_mugman','gz_sst_krystal','gz_sst_mega_man','gz_sst_jigglypuff','gz_sst_hero','gz_sst_falco','gz_sst_kirby','gz_sst_daisy'
			],
			'2':[
				'gz_sst_villager'
			],
			'1':[
			],
		},
		characterSort:{
			mode_guozhan:{
				sst_64:["gz_sst_mario","gz_sst_donkey_kong","gz_sst_link","gz_sst_yoshi","gz_sst_kirby","gz_sst_luigi","gz_sst_captain_falcon","gz_sst_jigglypuff","gz_sst_fox","gz_sst_pikachu"],
				sst_melee:["gz_sst_bowser","gz_sst_peach","gz_sst_zelda","gz_sst_sheik","gz_sst_dr_mario","gz_sst_ganondorf","gz_sst_mr_game_watch","gz_sst_marth","gz_sst_young_link","gz_sst_pichu","gz_sst_falco"],
				sst_brawl:["gz_sst_zero_suit_samus","gz_sst_wario","gz_sst_pokemon_trainer_red","gz_sst_meta_knight","gz_sst_ike","gz_sst_toon_link","gz_sst_wolf","gz_sst_snake","gz_sst_king_dedede","gz_sst_lucario","gz_sst_sonic","gz_sst_pokemon_trainer_leaf"],
				sst_4:["gz_sst_villager","gz_sst_rosalina","gz_sst_little_mac","gz_sst_greninja","gz_sst_palutena","gz_sst_lucina","gz_sst_bowser_jr","gz_sst_koopalings","gz_sst_ryu","gz_sst_mega_man","gz_sst_mii_fighters","gz_sst_duck_hunt"],
				sst_ultimate:["gz_sst_dark_samus","gz_sst_daisy","gz_sst_chrom","gz_sst_ridley","gz_sst_simon","gz_sst_richter","gz_sst_king_k_rool","gz_sst_isabelle","gz_sst_incineroar","gz_sst_ken"],
				sst_dlc:["gz_sst_terry","gz_sst_byleth_male","gz_sst_byleth_female","gz_sst_joker","gz_sst_steve","gz_sst_alex","gz_sst_hero","gz_sst_min_min","gz_sst_pyra_mythra","gz_sst_kazuya"],
				sst_spirits:["gz_sst_dark_link","gz_sst_sans","gz_sst_waluigi","gz_sst_master_hand","gz_sst_spring_man","gz_sst_rex","gz_sst_cuphead_mugman","gz_sst_krystal","gz_sst_enderman","gz_sst_geno","gz_sst_kyo_kusanagi","gz_sst_pauline","gz_sst_dr_wily","gz_sst_9_volt_18_volt"],
				sst_players:["gz_sst_mario_not_mary","gz_sst_yumikohimi","gz_sst_massy","gz_sst_haine","gz_sst_oc","gz_sst_mr_8","gz_sst_kyuukou","gz_sst_windier","gz_sst_rentianshu","gz_sst_srf","gz_sst_miumiu","gz_sst_ma","gz_sst_feiji"],
				sst_special:["gz_sst_claude","gz_ymk_isabelle","gz_ska_bobby","gz_ska_olivia","gz_ymk_577","gz_ska_super_xiaojie","gz_ska_show_k","gz_ymk_yumikohimi","gz_ska_bowser","gz_ska_professor_toad","gz_ska_koopa_troopa","gz_alz_kyo_kusanagi"],
			}
		},
		characterPack:{
			mode_guozhan:{
				gz_shibing1sst_light:['male','sst_light',0,[],['unseen']],
				gz_shibing2sst_light:['female','sst_light',0,[],['unseen']],
				gz_shibing1sst_dark:['male','sst_dark',0,[],['unseen']],
				gz_shibing2sst_dark:['female','sst_dark',0,[],['unseen']],
				gz_shibing1sst_spirit:['male','sst_spirit',0,[],['unseen']],
				gz_shibing2sst_spirit:['female','sst_spirit',0,[],['unseen']],
				gz_shibing1sst_reality:['male','sst_reality',0,[],['unseen']],
				gz_shibing2sst_reality:['female','sst_reality',0,[],['unseen']],
				gz_shibing1sst_smash:['male','sst_smash',0,[],['unseen']],
				gz_shibing2sst_smash:['female','sst_smash',0,[],['unseen']],
				gz_shibing1ye:['male','ye',0,[],['unseen']],
				gz_shibing2ye:['female','ye',0,[],['unseen']],
				//身份武将
				gz_sst_mario:["male","sst_light",4,["sst_jueyi"],[]],
				gz_sst_link:["male","sst_light",4,["sst_qingyong"],[]],
				gz_sst_yoshi:["male","sst_light",4,["sst_tanshi"],[]],
				gz_sst_wario:["male","sst_dark",4,["sst_haoduo"],[]],
				gz_sst_villager:["male","sst_light",4,["sst_huandai"],[]],
				gz_sst_dr_mario:["male","sst_light",4,["sst_quji"],[]],
				gz_sst_marth:["male","sst_light",4,["sst_hanmang","sst_jianbu"],[]],
				gz_sst_zero_suit_samus:["female","sst_light",3,["sst_guangsuo","sst_qingying"],[]],
				gz_sst_luigi:["male","sst_light",4,["sst_que","sst_guiyun"],[]],
				gz_sst_byleth_female:["female","sst_light",3,["sst_potian","sst_shenjiao"],[]],
				gz_sst_byleth_male:["male","sst_light",4,["sst_yanchuan","sst_tianmai"],[]],
				//gz_sst_samus:["female","sst_light",4,["sst_juezhan","sst_zailu"],[]],
				gz_sst_dark_samus:["female","sst_dark",3,["sst_yingliu","sst_shunxing"],[]],
				gz_sst_mr_game_watch:["male","sst_dark",3,["sst_shenpan"],[]],
				gz_sst_haine:["male","sst_reality",3,["sst_yiqing","sst_mingxi"],[]],
				gz_sst_terry:["male","sst_light",4,["sst_elang","sst_paoxiao"],[]],
				gz_sst_simon:["male","sst_dark",4,["sst_shengfa","sst_shengbian"],[]],
				gz_sst_incineroar:["male","sst_dark",4,["sst_weihe","sst_fuchou"],[]],
				gz_sst_greninja:["male","sst_dark",3,["sst_huanbian","sst_yingxi"],[]],
				gz_sst_donkey_kong:["male","sst_light",4,["sst_baochui"],[]],
				gz_sst_pokemon_trainer_red:["male","sst_light",4,["sst_xiandu"],[]],
				gz_sst_isabelle:["female","sst_light",3,["sst_wenxu","sst_mihu"],[]],
				gz_ymk_isabelle:["female","sst_light",3,["sst_zhongmi","ymk_mihu"],[]],
				gz_sst_chrom:["male","sst_light",4,["sst_niming","sst_cuifeng"],[]],
				gz_sst_meta_knight:["male","sst_dark",4,["sst_canyun"],[]],
				gz_sst_oc:["male","sst_reality",4,["sst_baling"],[]],
				gz_sst_mr_8:["male","sst_reality",3,["sst_yingzi","sst_geliao"],[]],
				gz_sst_dark_link:["male","sst_spirit",4,["sst_jingyue"],[]],
				gz_sst_kyuukou:["male","sst_reality",4,["sst_jianxiang","sst_baochao"],[]],
				gz_sst_windier:["female","sst_reality",3,["sst_chixing","sst_chuanxiao"],[]],
				gz_sst_rentianshu:["male","sst_reality",4,["sst_jilve","sst_yuanchuan"],[]],
				gz_sst_srf:["male","sst_reality",3,["sst_diebu","sst_bielian"],[]],
				gz_sst_bowser_jr:["male","sst_dark",3,["sst_guaibi","sst_daonao"],[]],
				gz_sst_ryu:["male","sst_light",4,["sst_tandao","sst_bodong"],[]],
				gz_sst_ken:["male","sst_light",4,["sst_yanyang","sst_shenglong"],[]],
				gz_sst_waluigi:["male","sst_spirit",4,["sst_zhamou"],[]],
				gz_ymk_577:["male","sst_reality",3,["ymk_jiagou","ymk_jicai"],[]],
				gz_sst_ike:["male","sst_light",4,["sst_tugu"],[]],
				gz_sst_sheik:["female","sst_dark",3,["sst_nixing","sst_shouyin"],[]],
				gz_sst_miumiu:["female","sst_reality",3,["sst_qichang","sst_shizhu"],[]],
				gz_sst_toon_link:["male","sst_light",4,["sst_yufeng","sst_chihang"],[]],
				gz_sst_wolf:["male","sst_dark",4,["sst_xishou"],[]],
				//sst_young_link:["male","sst_dark",3,["sst_shishi","sst_jiamian"],[]],
				//sst_ocarina_of_time_link:["male","sst_light",4,["sst_shisu","sst_yongfeng"],["forbidai"]],
				gz_sst_spring_man:["male","sst_spirit",4,["sst_shenbi","sst_lanbo"],[]],
				gz_sst_joker:["male","sst_dark",3,["sst_daoxin","sst_fanni"],[]],
				gz_sst_rex:["male","sst_spirit",3,["sst_qianban","sst_tanyun"],[]],
				gz_sst_cuphead_mugman:["male","sst_spirit",3,["sst_zhuizhai","sst_fanfei"],[]],
				gz_sst_krystal:["female","sst_spirit",3,["sst_liaoyi","sst_shuanghan"],[]],
				gz_sst_snake:["male","sst_dark",4,["sst_qianlong"],[]],
				//ska_show_k:["male","sst_reality",3,["ska_lunli","ska_shubian"],[]],
				gz_ymk_yumikohimi:["female","sst_reality",3,["ymk_qiuyi","ymk_xifang"],[]],
				gz_sst_mega_man:["male","sst_light",4,["sst_guangpao","sst_tewu"],[]],
				gz_sst_captain_falcon:["male","sst_light",4,["sst_jijing"],[]],
				gz_sst_jigglypuff:["female","sst_light",3,["sst_yinyao","sst_anke"],[]],
				gz_sst_lucario:["male","sst_dark",4,["sst_bodao","sst_juyuan"],[]],
				//sst_corrin:["none","sst_smash",2,["sst_juelu","sst_longwei"],[]],
				//sst_corrin_male:["male","sst_dark",2,["sst_juelu","sst_longwei"],["forbidai"]],
				//sst_corrin_female:["female","sst_light",2,["sst_juelu","sst_longwei"],["forbidai"]],
				//ska_bowser:["male","sst_dark",4,["ska_mengjin"],[]],
				gz_sst_steve:["male","sst_light",4,["sst_tankuang"],[]],
				gz_sst_feiji:["male","sst_reality",4,["sst_xuhuang"],[]],
				gz_sst_sonic:["male","sst_light",4,["sst_jibu","sst_juechen"],[]],
				//gz_sst_hero:["male","sst_light",4,["sst_songmo","sst_yonghun"],[]],
				gz_sst_fox:["male","sst_light",4,["sst_powei"],[]],
				gz_sst_alex:["female","sst_light",3,["sst_qiaoqi","sst_fumo"],[]],
				gz_sst_min_min:["female","sst_light",3,["sst_longbo","sst_fengcu"],[]],
				gz_sst_pikachu:["male","sst_light",3,["sst_fulei","sst_duoshan"],[]],
				gz_sst_falco:["male","sst_light",4,["sst_juao"],[]],
				gz_ska_professor_toad:["male","sst_spirit",3,["ska_juegu","ska_kuiwang"],[]],
				gz_sst_pyra_mythra:["female","sst_light",3,["sst_xuanyi","sst_fuxin"],[]],
				gz_sst_pokemon_trainer_leaf:["female","sst_light",3,["sst_jiliu"],[]],
				gz_sst_enderman:["male","sst_dark",2,["sst_lingying","sst_fankui","sst_xiangzhu"],[]],
				gz_sst_kyo_kusanagi:["male","sst_spirit",4,["sst_congyun","sst_fuzhuo"],[]],
				gz_sst_geno:["male","sst_spirit",3,["sst_xingjiang","sst_fuyuan"],[]],
				gz_sst_pokemon_trainer_leaf:["female","sst_light",3,["sst_jiliu"],[]],
				gz_sst_pauline:["female","sst_spirit",3,["sst_shangzheng","sst_yinyuan"],[]],
				gz_sst_dr_wily:["male","sst_spirit",3,["sst_zaowu","sst_fuqi"],[]],
				gz_sst_9_volt_18_volt:["male","sst_spirit",4,["sst_tanfen","sst_sutong"],[]],
				gz_sst_king_k_rool:["male","sst_dark",4,["sst_badao","sst_jinjia"],[]],
				gz_ska_show_k:["male","sst_reality",3,["ska_jingli","ska_zhiyi"],[]],
				gz_ska_koopa_troopa:["male","sst_spirit",3,["ska_suixuan","ska_xiangshi"],[]],
				gz_alz_kyo_kusanagi:["male","sst_spirit",4,["alz_wushi","alz_huangyao"],[]],
				gz_sst_kazuya:["male","sst_dark",5,["sst_chouyu","sst_xuehai"],[]],
				gz_sst_duck_hunt:["male","sst_light",3,["sst_gonglie","sst_weishou"],[]],
				gz_sst_mewtwo:["none","sst_dark",3,["sst_xiongli","sst_nixi"],[]],
				gz_sst_piranha_plant:["none","sst_dark",4,["sst_tunshi","sst_yangfen"],[]],
				gz_sst_paipai:["male","sst_reality",4,["sst_aoshang","sst_lianxia"],[]],
				//修改武将
				//gz_sst_palutena:["female","sst_light",3,["gz_sst_qiji","sst_shengbing"],[]],
				//gz_sst_rosalina:["female","sst_light",3,["sst_xingchen","gz_sst_zhuansheng"],[]],
				//gz_sst_ridley:["male","sst_dark",5,["sst_baozheng","gz_sst_furan"],[]],
				//gz_sst_richter:["male","sst_dark",4,["sst_shengxi","gz_sst_xuelun"],[]],
				//gz_sst_lucina:["female","sst_light",4,["sst_suxing","gz_sst_shengyi"],[]],
				//gz_sst_koopalings:["male","sst_dark",7,["sst_shimo"],[]],
				gz_sst_master_hand:["male","sst_spirit",4,["sst_zhuzai"],[]],
				//gz_sst_pichu:["male","sst_light",3,["sst_tieyan","sst_gaoya"],[]],
				//gz_sst_king_dedede:["male","sst_dark",4,["sst_baoshi"],[]],
				gz_sst_ma:["male","sst_reality",4,["sst_fumiao","sst_huayu"],[]],
				gz_sst_mii_fighters:["none","sst_smash",4,["sst_bianshe"],["doublegroup:sst_smash:sst_light:sst_dark:sst_spirit:sst_reality"]],
				//国战武将
				gz_sst_mario_not_mary:["male","sst_reality",5,["gz_sst_qixiao","sst_zhongpao"],[]],
				gz_sst_yumikohimi:["female","sst_reality",3,["sst_zhengshi","sst_muyuan"],[]],
				gz_sst_ganondorf:["male","sst_dark",4,["gz_sst_chengli","sst_baoling"],[]],
				gz_sst_zelda:["female","sst_light",3,["gz_sst_anzhi","gz_sst_yinjie"],[]],
				gz_sst_peach:["female","sst_light",3,["gz_sst_yice","gz_sst_hongyan"],[]],
				gz_sst_claude:["male","sst_spirit",3,["gz_ymk_yunchou","gz_ymk_guimou"],[]],
				gz_sst_massy:["male","sst_reality",4,["sst_shenao"],[]],
				gz_sst_bowser:["male","sst_dark",5,["gz_sst_yujun","gz_sst_xiduo"],[]],
				gz_sst_kirby:["male","sst_light",3,["sst_tunxing","sst_xinghuo"],[]],
				gz_sst_daisy:["female","sst_light",3,["sst_paozhi"],[]],
				gz_sst_little_mac:["male","sst_light",4,["gz_sst_douhun"],[]],
				gz_sst_sans:["male","sst_spirit",3,["sst_shuangguan","sst_langu"],[]],
				gz_ska_olivia:["female","sst_spirit",3,["gz_ska_shenqi","gz_ska_zhefu"],[]],
				gz_ska_bobby:["male","sst_spirit",4,["ska_jixing","ska_sheran"],[]],
				gz_ska_super_xiaojie:["male","sst_reality",4,["ska_kezhi","gz_ska_jiyan"],[]],
				gz_ymk_tianyi:["male","ye",4,["gz_ymk_kaibai"],[]]
			}
		},
		skill:{
			junling4_eff:{
				mod:{
					cardEnabled2:function(card){
						if(get.position(card)=='h') return false
					},
				},
				mark:true,
				marktext:'令',
				intro:{
					content:'不能使用或打出手牌'
				}
			},
			junling5_eff:{
				trigger:{player:"recoverBefore"},
				priority:44,
				forced:true,
				silent:true,
				popup:false,
				content:function(){trigger.cancel()},
				mark:true,
				marktext:'令',
				intro:{
					content:'不能回复体力'
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'recover')) return 'zeroplayertarget';
						},
					},
				}
			},
			fengyin_main:{
				init:function(player,skill){
					player.addSkillBlocker(skill);
				},
				onremove:function(player,skill){
					player.removeSkillBlocker(skill);
				},
				charlotte:true,
				skillBlocker:function(skill,player){
					return lib.character[player.name1][3].contains(skill)&&!lib.skill[skill].charlotte&&!get.is.locked(skill,player);
				},
				mark:true,
				marktext:'主',
				intro:{
					content:function(storage,player,skill){
						var list=player.getSkills(null,null,false).filter(function(i){
							return lib.skill.fengyin_main.skillBlocker(i,player);
						});
						if(list.length) return '失效技能：'+get.translation(list);
						return '无失效技能';
					}
				}
			},
			fengyin_vice:{
				init:function(player,skill){
					player.addSkillBlocker(skill);
				},
				onremove:function(player,skill){
					player.removeSkillBlocker(skill);
				},
				charlotte:true,
				skillBlocker:function(skill,player){
					return lib.character[player.name2][3].contains(skill)&&!lib.skill[skill].charlotte&&!get.is.locked(skill,player);
				},
				mark:true,
				marktext:'主',
				intro:{
					content:function(storage,player,skill){
						var list=player.getSkills(null,null,false).filter(function(i){
							return lib.skill.fengyin_vice.skillBlocker(i,player);
						});
						if(list.length) return '失效技能：'+get.translation(list);
						return '无失效技能';
					}
				}
			},
			"_mingzhisuodingji":{
				mode:["guozhan"],
				enable:"phaseUse",
				filter:function(event,player){
					if(player.hasSkillTag('nomingzhi',false,null,true)) return false;
					var bool=false;
					var skillm=lib.character[player.name1][3];
					var skillv=lib.character[player.name2][3];
					if(player.isUnseen(0)){
						for(var i=0;i<skillm.length;i++){
							if(get.is.locked(skillm[i])){
								bool=true;
							}
						}
					}
					if(player.isUnseen(1)){
						for(var i=0;i<skillv.length;i++){
							if(get.is.locked(skillv[i])){
								bool=true;
							}
						}
					}
					return bool;
				},
				popup:false,
				content:function(){
					"step 0"
					var choice=[];
					var skillm=lib.character[player.name1][3];
					var skillv=lib.character[player.name2][3];
					if(player.isUnseen(0)){
						for(var i=0;i<skillm.length;i++){
							if(get.is.locked(skillm[i])&&!choice.contains('明置主将')){
								choice.push("明置主将");
							}
						}
					}
					if(player.isUnseen(1)){
						for(var i=0;i<skillv.length;i++){
							if(get.is.locked(skillv[i])&&!choice.contains('明置副将')){
								choice.push("明置副将");
							}
						}
					}
					if(choice.length==2) choice.push('全部明置')
					player.chooseControl(choice);
					"step 1"
					if(result.control){
						switch(result.control){
							case "取消":break;
							case "明置主将":player.showCharacter(0);break;
							case "明置副将":player.showCharacter(1);break;
							case "全部明置":player.showCharacter(2);break;
						}
					}
				},
				ai:{
					order:11,
					result:{
						player:-99,
					},
				},
			},
			/*----分界线----*/
			_viewnext:{
				trigger:{
					global:"gameDrawBefore",
				},
				silent:true,
				popup:false,
				forced:true,
				filter:function(){
					if(_status.connectMode&&!lib.configOL.viewnext) return false;
					else if(!_status.connectMode&&!get.config('viewnext')) return false;
					return game.players.length>1;
				},
				content:function(){
					var target=player.getNext();
					player.viewCharacter(target,1);
				},
			},
			_aozhan_judge:{
				trigger:{
					player:"phaseBefore",
				},
				forced:true,
				priority:22,
				filter:function(event,player){
					if(get.mode()!='guozhan') return false;
					if(_status.connectMode&&!lib.configOL.aozhan) return false;
					else if(!_status.connectMode&&!get.config('aozhan')) return false;
					if(_status._aozhan) return false;
					if(game.players.length>4) return false;
					if(game.players.length>3&&game.players.length+game.dead.length<=7) return false;
					for(var i=0;i<game.players.length;i++){
						for(var j=i+1;j<game.players.length;j++){
							if(game.players[i].isFriendOf(game.players[j])) return false;
						}
					}
					return true;
				},
				content:function(){
					var color=get.groupnature(player.group,"raw");
					if(player.isUnseen()) color='fire';
					player.$fullscreenpop('SUDDEN DEATH',color);
					setTimeout(function(){
						player.$fullscreenpop('GO!',"soil");
					},1000);
					game.broadcastAll(function(){
					_status._aozhan=true;
					ui.aozhan=ui.create.div('.touchinfo.left',ui.window);
					ui.aozhan.innerHTML='鏖战模式';
					if(ui.time3) ui.time3.style.display='none';
					ui.aozhanInfo=ui.create.system('鏖战模式',null,true);
					lib.setPopped(ui.aozhanInfo,function(){
						var uiintro=ui.create.dialog('hidden');
						uiintro.add('鏖战模式');
						var list=[
							'当游戏中仅剩四名或更少角色时（七人以下游戏时改为三名或更少），若此时全场没有超过一名势力相同的角色，则从一个新的回合开始，游戏进入鏖战模式直至游戏结束。',
							'在鏖战模式下，任何角色均不是非转化的【桃】的合法目标。【桃】可以被当做【杀】或【闪】使用或打出。',
							'进入鏖战模式后，即使之后有两名或者更多势力相同的角色出现，仍然不会取消鏖战模式。'
						];
						var intro='<ul style="text-align:left;margin-top:0;width:450px">';
						for(var i=0;i<list.length;i++){
							intro+='<li>'+list[i];
						}
						intro+='</ul>'
						uiintro.add('<div class="text center">'+intro+'</div>');
						var ul=uiintro.querySelector('ul');
						if(ul){
							ul.style.width='180px';
						}
						uiintro.add(ui.create.div('.placeholder'));
						return uiintro;
					},250);
					game.playBackgroundMusic();
					});
					game.countPlayer(function(current){current.addSkill('aozhan')});
				},
			},
			_guozhan_marks:{
				ruleSkill:true,
				enable:'phaseUse',
				filter:function(event,player){
					return player.hasMark('yexinjia_mark')||player.hasMark('xianqu_mark')||player.hasMark('yinyang_mark')||player.hasMark('zhulianbihe_mark');
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog('###国战标记###弃置一枚对应的标记，发动其对应的效果');
					},
					chooseControl:function(event,player){
						var list=[],bool=player.hasMark('yexinjia_mark');
						if(bool||player.hasMark('xianqu_mark')) list.push('先驱');
						if(bool||player.hasMark('zhulianbihe_mark')){
							list.push('珠联(摸牌)');
							if(event.filterCard({name:'tao',isCard:true},player,event)) list.push('珠联(桃)');
						}
						if(bool||player.hasMark('yinyang_mark')) list.push('阴阳鱼');
						list.push('cancel2');
						return list;
					},
					check:function(){
						var player=_status.event.player,bool=player.hasMark('yexinjia_mark');
						if((bool||player.hasMark('xianqu_mark'))&&(4-player.countCards('h'))>1) return '先驱';
						if(bool||player.hasMark('zhulianbihe_mark')){
							if(_status.event.getParent().filterCard({name:'tao',isCard:true},player,event)&&get.effect_use(player,{name:'tao'},player)>0) return '珠联(桃)';
							if(player.getHandcardLimit()-player.countCards('h')>1&&!game.hasPlayer(function(current){
								return current!=player&&current.isFriendOf(player)&&current.hp+current.countCards('h','shan')<=2;
							})) return '珠联(摸牌)';
						}
						if(player.hasMark('yinyang_mark')&&player.getHandcardLimit()-player.countCards('h')>0) return '阴阳鱼';
						return 'cancel2';
					},
					backup:function(result,player){
						switch(result.control){
							case '珠联(桃)': return get.copy(lib.skill._zhulianbihe_mark_tao);
							case '珠联(摸牌)': return {
								content:function(){
								 player.draw(2);
								 player.removeMark(player.hasMark('zhulianbihe_mark')?'zhulianbihe_mark':'yexinjia_mark',1);
								},
							};
							case '阴阳鱼': return {
								content:function(){
									player.draw();
									player.removeMark(player.hasMark('yinyang_mark')?'yinyang_mark':'yexinjia_mark',1);
								}
							};
							case '先驱': return {content:lib.skill.xianqu_mark.content};
						}
					},
				},
				ai:{
					order:1,
					result:{
						player:1,
					},
				},
			},
			xianqu_mark:{
				intro:{
					content:"◇出牌阶段，你可以弃置此标记，然后将手牌摸至四张并观看一名其他角色的一张武将牌。",
				},
				content:function(){
					"step 0"
					player.removeMark(player.hasMark('xianqu_mark')?'xianqu_mark':'yexinjia_mark',1);
					var num=4-player.countCards('h');
					if(num) player.draw(num);
					"step 1"
					if(game.hasPlayer(function(current){
						return current!=player&&current.isUnseen(2);
					})) player.chooseTarget('是否观看一名其他角色的一张暗置武将牌？',function(card,player,target){
						return target!=player&&target.isUnseen(2);
					}).set('ai',function(target){
						if(target.isUnseen()){
							var next=_status.event.player.getNext();
							if (target!=next) return 10;
							return 9;
						}
						return -get.attitude(_status.event.player,target);
					});
					else event.finish();
					"step 2"
					if(result.bool){
						event.target=result.targets[0];
						player.line(event.target,'green');
						var controls=[];
						if(event.target.isUnseen(0)) controls.push('主将');
						if(event.target.isUnseen(1)) controls.push('副将');
						if(controls.length>1){
							player.chooseControl(controls);
						}
						if(controls.length==0) event.finish();
					}
					else{
						player.removeSkill('xianqu_mark');
						event.finish();
					}
					"step 3"
					if(result.control){
						if(result.control=='主将'){
							player.viewCharacter(event.target,0);
						}
						else{
							player.viewCharacter(event.target,1);
						}
					}
					else if(target.isUnseen(0)){
						player.viewCharacter(event.target,0);
					}
					else{
						player.viewCharacter(event.target,1);
					}
				},
			},
			zhulianbihe_mark:{
				intro:{
					content:"◇出牌阶段，你可以弃置此标记 然后摸两张牌。<br>◇你可以将此标记当做【桃】使用。",
				},
			},
			yinyang_mark:{
				intro:{
					content:"◇出牌阶段，你可以弃置此标记，然后摸一张牌。<br>◇弃牌阶段，你可以弃置此标记，然后本回合手牌上限+2。",
				},
			},
			_zhulianbihe_mark_tao:{
				ruleSkill:true,
				enable:"chooseToUse",
				filter:function(event,player){
					return event.type!='phase'&&(player.hasMark('zhulianbihe_mark')||player.hasMark('yexinjia_mark'));
				},
				viewAsFilter:function(player){
					return player.hasMark('zhulianbihe_mark')||player.hasMark('yexinjia_mark');
				},
				viewAs:{
					name:"tao",
					isCard:true,
				},
				filterCard:function(){return false},
				selectCard:-1,
				precontent:function(){
					player.removeMark(player.hasMark('zhulianbihe_mark')?'zhulianbihe_mark':'yexinjia_mark',1);
				},
			},
			_yinyang_mark_add:{
				ruleSkill:true,
				trigger:{
					player:"phaseDiscardBegin",
				},
				filter:function(event,player){
					return (player.hasMark('yinyang_mark')||player.hasMark('yexinjia_mark'))&&player.needsToDiscard();
				},
				prompt:function(event,player){
					return '是否弃置一枚【'+(player.hasMark('yinyang_mark')?'阴阳鱼':'野心家')+'】标记，使本回合的手牌上限+2？';
				},
				content:function(){
					player.addTempSkill('yinyang_add','phaseAfter');
					player.removeMark(player.hasMark('yinyang_mark')?'yinyang_mark':'yexinjia_mark',1);
				},
			},
			yinyang_add:{
				mod:{
					maxHandcard:function(player,num){
						return num+2;
					},
				},
			},
			yexinjia_mark:{
				intro:{
					content:'◇你可以弃置此标记，并发动【先驱】标记或【珠联璧合】标记或【阴阳鱼】标记的效果。',
				},
			},
			yexinjia_friend:{
				marktext:'盟',
				intro:{
					name:'结盟',
					content:'已经与$结成联盟',
				},
			},
			/*----分界线----*/
			_lianheng:{
				mode:['guozhan'],
				enable:'phaseUse',
				usable:1,
				prompt:'将至多三张可合纵的牌交给一名与你势力不同的角色，或未确定势力的角色，若你交给与你势力不同的角色，则你摸等量的牌',
				filter:function(event,player){
					if(player.hasSkillTag('lianheng')) return true;
					return player.hasCard(function(card){
						return card.hasTag('lianheng')||card.hasGaintag('_lianheng');
					},'h');
				},
				filterCard:function(card){
					if(_status.event.player.hasSkillTag('lianheng')) return true;
					return card.hasTag('lianheng')||card.hasGaintag('_lianheng');
				},
				filterTarget:function(card,player,target){
					if(target==player) return false;
					if(player.isUnseen()) return target.isUnseen();
					if(player.identity=='ye') return true;
					return target.identity!=player.identity;
				},
				check:function(card){
					if(card.name=='tao') return 0;
					return 5-get.value(card);
				},
				selectCard:[1,3],
				prepare:'give',
				discard:false,
				// delay:0.5,
				content:function(){
					"step 0"
					target.gain(cards,player);
					"step 1"
					if(!target.isUnseen()){
						player.draw(cards.length);
					}
				},
				ai:{
					basic:{
						order:2
					},
					result:{
						player:function(player,target){
							var huoshao=false;
							for(var i=0;i<ui.selected.cards.length;i++){
								if(ui.selected.cards[i].name=='huoshaolianying'){huoshao=true;break}
							}
							if(huoshao&&player.inline(target.getNext())) return -3;
							if(target.isUnseen()) return 0;
							if(player.isMajor()) return 0;
							return 0.5;
						},
						target:function(player,target){
							if(target.isUnseen()) return 0;
							return 1;
						}
					},
				}
			},
			_mingzhi1:{
				trigger:{player:'phaseBeginStart'},
				priority:19,
				forced:true,
				popup:false,
				content:function(){
					"step 0"
					var choice=1;
					for(var i=0;i<player.hiddenSkills.length;i++){
						if(lib.skill[player.hiddenSkills[i]].ai){
							var mingzhi=lib.skill[player.hiddenSkills[i]].ai.mingzhi;
							if(mingzhi==false){
								choice=0;break;
							}
							if(typeof mingzhi=='function'&&mingzhi(trigger,player)==false){
								choice=0;break;
							}
						}
					}
					if(player.isUnseen()){
						var group=lib.character[player.name1][1];
						player.chooseControl('bumingzhi','明置'+get.translation(player.name1),
							'明置'+get.translation(player.name2),'tongshimingzhi',true).ai=function(event,player){
							if(player.hasSkillTag('mingzhi_yes')) return get.rand(1,2);
							if(player.hasSkillTag('mingzhi_no')) return 0;
							var popu=get.population(lib.character[player.name1][1])
							if(popu>=2||(popu==1&&game.players.length<=4)){
								return Math.random()<0.5?3:(Math.random()<0.5?2:1);
							}
							if(choice==0) return 0;
							if(get.population(group)>0&&player.wontYe()){
								return Math.random()<0.2?(Math.random()<0.5?3:(Math.random()<0.5?2:1)):0;
							}
							var nming=0;
							for(var i=0;i<game.players.length;i++){
								if(game.players[i]!=player&&game.players[i].identity!='unknown'){
									nming++;
								}
							}
							if(nming==game.players.length-1) return Math.random()<0.5?(Math.random()<0.5?3:(Math.random()<0.5?2:1)):0;
							return (Math.random()<0.1*nming/game.players.length)?(Math.random()<0.5?3:(Math.random()<0.5?2:1)):0;
						};
					}
					else{
						if(Math.random()<0.5) choice=0;
						if(player.isUnseen(0)){
							player.chooseControl('bumingzhi','明置'+get.translation(player.name1),true).choice=choice;
						}
						else if(player.isUnseen(1)){
							player.chooseControl('bumingzhi','明置'+get.translation(player.name2),true).choice=choice;
						}
						else{
							event.finish();
						}
					}
					"step 1"
					switch(result.control){
						case '明置'+get.translation(player.name1):player.showCharacter(0);break;
						case '明置'+get.translation(player.name2):player.showCharacter(1);break;
						case 'tongshimingzhi':player.showCharacter(2);break;
					}
				}
			},
			_mingzhi2:{
				trigger:{player:'triggerHidden'},
				forced:true,
				forceDie:true,
				popup:false,
				priority:10,
				content:function(){
					"step 0"
					if(get.info(trigger.skill).silent){
						event.finish();
					}
					else{
						event.skillHidden=true;
						var bool1=(game.expandSkills(lib.character[player.name1][3]).contains(trigger.skill));
						var bool2=(game.expandSkills(lib.character[player.name2][3]).contains(trigger.skill));
						var nai=function(){
							var player=_status.event.player;
							if(!_status.event.yes) return false;
							if(player.hasSkillTag('mingzhi_no')) return false;
							if(player.hasSkillTag('mingzhi_yes')) return true;
							if(player.identity!='unknown') return true;
							if(Math.random()<0.5) return true;
							var info=get.info(_status.event.hsskill);
							if(info&&info.ai&&info.ai.mingzhi==true) return true;
							if(info&&info.ai&&info.ai.maixie) return true;
							var group=lib.character[player.name1][1];
							var popu=get.population(lib.character[player.name1][1])
							if(popu>=2||(popu==1&&game.players.length<=4)){
								return true;
							}
							if(get.population(group)>0&&player.wontYe()){
								return Math.random()<0.2?true:false;
							}
							var nming=0;
							for(var i=0;i<game.players.length;i++){
								if(game.players[i]!=player&&game.players[i].identity!='unknown'){
									nming++;
								}
							}
							if(nming==game.players.length-1) return Math.random()<0.5?true:false;
							return (Math.random()<0.1*nming/game.players.length)?true:false;
						}
						if(bool1&&bool2){
							event.name=player.name1;
							event.name2=player.name2;
						}
						else{
							event.name=bool1?player.name1:player.name2;
						}
						var info=get.info(trigger.skill);
						var next=player.chooseBool('是否明置'+get.translation(event.name)+'以发动【'+get.translation(trigger.skill)+'】？');
						next.set('yes',!info.check||info.check(trigger._trigger,player));
						next.set('hsskill',trigger.skill);
						next.set('ai',nai);
					}
					"step 1"
					if(result.bool){
						if(event.name==player.name1) player.showCharacter(0);
						else player.showCharacter(1);
						trigger.revealed=true;
						event.finish();
					}
					else if(event.name2){
						var info=get.info(trigger.skill);
						var next=player.chooseBool('是否明置'+get.translation(event.name2)+'以发动【'+get.translation(trigger.skill)+'】？');
						next.set('yes',!info.check||info.check(trigger._trigger,player));
						next.set('ai',function(){
							return _status.event.yes;
						});
					}
					else{
						event.finish();
						trigger.untrigger();
						trigger.cancelled=true;
					}
					"step 2"
					if(event.name2){
						if(result.bool){
							player.showCharacter(1);
							trigger.revealed=true;
						}
						else{
							trigger.untrigger();
							trigger.cancelled=true;
						}
					}
				}
			},
			_mingzhi3:{
				trigger:{player:'phaseBefore'},
				priority:19.1,
				forced:true,
				popup:false,
				filter:function(event,player){
					if(player.storage._mingzhi3) return false
					if(_status.connectMode){
						if(!lib.configOL.junzhu) return false;
					}
					else if(!get.config('junzhu')) return false;
					return true;
				},
				content:function(){
					'step 0'
					player.storage._mingzhi3=true;
					var name=player.name1;
					if(!player.isUnseen(0)||name.indexOf('gz_')!=0
					||!lib.junList.contains(name.slice(3))||!lib.character['gz_jun_'+name.slice(3)]
					||(player.identity!='ye'&&player.identity!='unknown'&&lib.character[player.name1][1]!=player.identity)) event.finish();
					else{
						player.chooseBool("是否将主武将牌替换为君主武将？").ai=function(){
							var player=_status.event.player;
							return player.name1=='gz_liubei'||!player.hasSkillTag('mingzhi_no');
						};
					}
					'step 1'
					if(result.bool){
						var from=player.name1;
						var to='gz_jun_'+player.name1.slice(3);
						event.maxHp=player.maxHp;
						player.reinit(from,to,4);
						if(lib.skill[to]) game.trySkillAudio(to,player);
						player.showCharacter(0);
						var yelist=[];
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].identity=='ye'&&game.players[i]._group==player.group&&lib.character[game.players[i].name1][1]!='ye'){
								yelist.push(game.players[i]);
							}
						}
						game.broadcastAll(function(list,group){
							for(var i=0;i<list.length;i++){
								list[i].identity=group;
								list[i].setIdentity();
							}
						},yelist,player.group);
					}
					else event.finish();
					'step 2'
					if(player.maxHp>event.maxHp) player.recover(player.maxHp-event.maxHp);
				}
			},
			_zhenfazhaohuan:{
				enable:'phaseUse',
				usable:1,
				getConfig:function(player,target){
					var config={};
					var skills=player.getSkills();
					for(var i=0;i<skills.length;i++){
						var info=get.info(skills[i]).zhenfa;
						if(info){
							config[info]=true;
						}
					}
					if(config.inline){
						var next=target.getNext();
						var previous=target.getPrevious();
						if(next==player||previous==player||next&&next.inline(player)||previous&&previous.inline(player)) return true;
					}
					if(config.siege){
						if(target==player.getNext().getNext()||target==player.getPrevious().getPrevious()) return true;
					}
					return false;
				},
				filter:function(event,player){
					if(player.identity=='ye') return false;
					if(player.hasSkill('undist')) return false;
					if(game.countPlayer(function(current){
						return !current.hasSkill('undist');
					})<4) return false;
					return game.hasPlayer(function(current){
						return current!=player&&current.isUnseen()&&lib.skill._zhenfazhaohuan.getConfig(player,current);
					});
				},
				content:function(){
					'step 0'
					event.list=game.filterPlayer(function(current){
						return current!=player&&current.isUnseen();
					});
					'step 1'
					event.current=event.list.shift();
					if(lib.skill._zhenfazhaohuan.getConfig(player,event.current)){
						player.line(event.current,'green');
						if(event.current._group==player.group&&event.current.wontYe()){
							event.current.chooseControl('明置主将','明置副将','取消').set('prompt','是否响应'+get.translation(player)+'的阵法召唤？').ai=function(){return Math.floor(Math.random()*2)};
						}
						else event.goto(3);
					}
					else event.goto(3);
					'step 2'
					if(result.control=='明置主将'){
						event.current.showCharacter(0);
					}
					else if(result.control=='明置副将'){
						event.current.showCharacter(1);
					}
					'step 3'
					if(event.list.length) event.goto(1);
					'step 4'
					game.delay();
				},
				ai:{
					order:5,
					result:{
						player:1
					}
				}
			},
			//全局技能
			//修改技能
			gz_sst_qiji:{
				inherit:"sst_qiji",
			},
			gz_sst_zhuansheng:{
				unique:true,
				mark:true,
				limited:true,
				skillAnimation:true,
				animationStr:"转生",
				animationColor:"water",
				init:function (player){
					player.storage.gz_sst_zhuansheng=false;
				},
				intro:{
					content:"limited",
				},
				logTarget:"player",
				trigger:{
					global:"dieBefore",
				},
				content:function (){
					"step 0"
					trigger.cancel();
					player.awakenSkill("gz_sst_zhuansheng");
					player.storage.gz_sst_zhuansheng=true;
					player.discard(player.getCards("hej"));
					"step 1"
					trigger.player.changeVice();
					"step 2"
					if(trigger.player.hp<Math.ceil(trigger.player.maxHp/2)){
						trigger.player.recover(trigger.player.maxHp-trigger.player.hp-Math.floor(trigger.player.maxHp/2));
					}
				},
				check:function(event,player){
					//if(event.player==player) return true;
					return get.attitude(player,event.player)>0;
				}
			},
			gz_sst_furan:{
				unique:true,
				mark:true,
				limited:true,
				skillAnimation:true,
				animationStr:"复燃",
				animationColor:"fire",
				init:function (player){
					player.storage.gz_sst_furan=false;
				},
				intro:{
					content:"limited",
				},
				trigger:{
					player:"dying",
				},
				forced:true,
				content:function (){
					"step 0"
					player.awakenSkill("gz_sst_furan");
					player.storage.gz_sst_furan=true;
					player.discard(player.getCards("h"));
					"step 1"
					if(player.hp<1){
						player.recover(1-player.hp);
					}
				},
			},
			gz_sst_shengyi:{
				skillAnimation:true,
				animationColor:"water",
				derivation:["sst_hanmang","sst_cuifeng"],
				viceSkill:true,
				init:function(player){
					if(player.checkViceSkill("gz_sst_shengyi")&&!player.viceChanged){
						player.removeMaxHp();
					}
				},
				trigger:{player:"phaseZhunbeiBegin"},
				filter:function(event,player){
					return event.skill=="sst_suxing"||!player.countCards("h");
				},
				forced:true,
				//priority:3,
				content:function(){
					player.addTempSkill("sst_hanmang");
					player.addTempSkill("sst_cuifeng");
				},
			},
			gz_sst_shengxi:{
				global:["gz_sst_shengxi2","gz_sst_shengxi4"],
				init:function(player){
					var players=game.filterPlayer();
					for(var i=0;i<players.length;i++){
						if(!players[i].storage.gz_sst_shengxi) players[i].storage.gz_sst_shengxi=[];
					}
				},
				//marktext:"袭",
				intro:{
					content:"cards",
					/*
					onunmark:function(storage,player){
						var players=game.filterPlayer();
						for(var i=0;i<players.length;i++){
							if(players[i].storage.gz_sst_shengxi&&players[i].storage.gz_sst_shengxi.length) players[i].storage.gz_sst_shengxi.length=0;
						}
					},
					*/
				},
				onremove:function(player){
					var players=game.filterPlayer();
					for(var i=0;i<players.length;i++){
						if(players[i].storage.gz_sst_shengxi&&players[i].storage.gz_sst_shengxi.length){
							players[i].storage.gz_sst_shengxi.length=0;
							players[i].unmarkSkill("gz_sst_shengxi");
						}
					}
				},
				ai:{
					threaten:1.5,
				},
			},
			gz_sst_shengxi2:{
				trigger:{
					player:"useCardToPlayer",
				},
				filter:function(event,player) {
					return !event.getParent().gz_sst_shengxi&&(player.hasSkill("gz_sst_shengxi")||game.hasPlayer(function(current){
						return event.targets.contains(current)&&current.hasSkill("gz_sst_shengxi");
					}))&&game.hasPlayer(function(current){
						return event.targets.contains(current)&&current.countCards("h");
					});
				},
				direct:true,
				content:function(){
					"step 0"
					trigger.getParent().gz_sst_shengxi=true;
					player.chooseTarget(get.prompt("gz_sst_shengxi"),function(card,player,target){
						return _status.event.targetsx.contains(target)&&target.countCards("h");
					}).set("ai",function(target){
						return -get.attitude(_status.event.player,target);
					}).set("targetsx",trigger.targets);
					"step 1"
					if(result.targets&&result.targets.length){
						event.target=result.targets[0];
						player.logSkill("gz_sst_shengxi",event.target);
						player.choosePlayerCard("圣袭：将"+get.translation(event.target)+"一张手牌移出游戏","h",event.target,true);
					}
					"step 2"
					if(result.cards&&result.cards.length){
						//player.logSkill("gz_sst_shengxi2",trigger.target);
						var card=result.cards[0];
						/*
						if(trigger.target.storage.gz_sst_shengxi.length){
							for(var i=0;i<trigger.target.storage.gz_sst_shengxi.length;i++){
								if(cards.contains(trigger.target.storage.gz_sst_shengxi[i])) cards.remove(trigger.target.storage.gz_sst_shengxi[i]);
							}
						}
						var card=cards.randomGet();
						if(result.cards&&result.cards.length){
							card=result.cards[0];
						}
						*/
						event.target.$give(card,event.target,false);
						event.target.lose(card,ui.special,"toStorage");
						event.target.storage.gz_sst_shengxi.push(card);
						event.target.syncStorage("gz_sst_shengxi");
						event.target.updateMarks();
						event.target.markSkill("gz_sst_shengxi");
						game.delayx();
						game.log(player,"将",event.target,"的",card,"移出游戏");
					}
				},
				ai:{
					expose:0.2,
					effect:{
						player:function(card,player,target){
							if(get.tag(card,"multitarget")) return [1,3];
							if(player.storage.gz_sst_shengxi&&player.storage.gz_sst_shengxi.contains(card)) return [1,3];
						},
					},
				},
			},
			gz_sst_shengxi4:{
				enable:"chooseToUse",
				filter:function(event,player){
					var gz_sst_shengxi=[];
					var players=game.filterPlayer();
					for(var i=0;i<players.length;i++){
						if(players[i].storage.gz_sst_shengxi&&players[i].storage.gz_sst_shengxi.length){
							gz_sst_shengxi=gz_sst_shengxi.concat(players[i].storage.gz_sst_shengxi);
						}
						players[i].syncStorage("gz_sst_shengxi");
					}
					if(!gz_sst_shengxi||!gz_sst_shengxi.length) return false;
					for(var i=0;i<gz_sst_shengxi.length;i++){
						if(event.filterCard(gz_sst_shengxi[i],player,event)) return true;
					}
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						var gz_sst_shengxi=[];
						var players=game.filterPlayer();
						for(var i=0;i<players.length;i++){
							if(players[i].storage.gz_sst_shengxi&&players[i].storage.gz_sst_shengxi.length){
								gz_sst_shengxi=gz_sst_shengxi.concat(players[i].storage.gz_sst_shengxi);
							}
							players[i].syncStorage("gz_sst_shengxi");
						}
						return ui.create.dialog("圣袭",gz_sst_shengxi,"hidden");
					},
					filter:function(button,player){
						var evt=_status.event.getParent();
						if(evt&&evt.filterCard){
							return evt.filterCard(button.link,player,evt);
						}
						return true;
					},
					check:function(button){
						if(button.link.name=="du") return 10;
						var player=_status.event.player;
						if(player.getUseValue(button.link)>0) return get.order(button.link);
						return -1;
					},
					backup:function(links,player){
						return {
							filterCard:function(){return false;},
							selectCard:-1,
							viewAs:links[0],
							onuse:function(result,player){
								//player.logSkill("gz_sst_shengxi4_backup");
								/*
								var players=game.filterPlayer();
								for(var i=0;i<players.length;i++){
									if(players[i].storage.gz_sst_shengxi&&players[i].storage.gz_sst_shengxi.length){
										gz_sst_shengxi=gz_sst_shengxi.concat(players[i].storage.gz_sst_shengxi);
									}
									players[i].syncStorage("gz_sst_shengxi");
								}
								player.storage.gz_sst_shengxi.remove(result.card);
								player.syncStorage("gz_sst_shengxi");
								player.updateMarks();
								if(!player.storage.gz_sst_shengxi||!player.storage.gz_sst_shengxi.length){
									player.unmarkSkill("gz_sst_shengxi");
								}
								*/
								var owner=game.filterPlayer(function(current){
									return current.storage.gz_sst_shengxi&&current.storage.gz_sst_shengxi.length&&current.storage.gz_sst_shengxi.contains(result.card);
								})[0];
								owner.storage.gz_sst_shengxi.remove(result.card);
								owner.syncStorage("gz_sst_shengxi");
								owner.updateMarks();
								if(!owner.storage.gz_sst_shengxi||!owner.storage.gz_sst_shengxi.length){
									owner.unmarkSkill("gz_sst_shengxi");
								}
							}
						}
					},
					prompt:function(links,player){
						return "选择"+get.translation(links)+"的目标";
					},
				},
				ai:{
					order:function(item,player){
						return 10;
					},
					result:{
						player:function(player){
							if(_status.event.dying) return get.attitude(player,_status.event.dying);
							return 1;
						}
					},
					useful:-1,
					value:-1,
				},
			},
			gz_sst_xuelun:{
				trigger:{player:"die"},
				logTarget:"source",
				forced:true,
				skillAnimation:true,
				animationColor:"fire",
				forceDie:true,
				filter:function(event,player){
					return event.source;
				},
				content:function(){//trigger.source
					var target=trigger.source;
					target.addSkillLog("gz_sst_shengxi");
				}
			},
			//国战技能
			gz_sst_qixiao:{
				trigger:{player:"phaseZhunbeiBegin"},
				forced:true,
				filter:function(event,player){
					return !player.hasMark("xianqu_mark");
				},
				content:function(){
					player.addMark("xianqu_mark",1);
					//game.log(player,"获得了","#g【先驱】","标记");
				},
				group:["gz_sst_qixiao2","gz_sst_qixiao3"]
			},
			gz_sst_qixiao2:{
				trigger:{player:"_guozhan_marks_backupBegin"},
				forced:true,
				filter:function(event,player){
					return get.translation(event.content).indexOf("xianqu_mark")!=-1;
				},
				content:function(){
					player.storage.gz_sst_qixiao=Math.min(4,player.countCards("h"));
					var evt=event.getParent("phase");
					if(evt&&evt.name=="phase"&&!evt.gz_sst_qixiao){
						evt.set("gz_sst_qixiao",true);
						var next=game.createEvent("gz_sst_qixiao_clear");
						event.next.remove(next);
						evt.after.push(next);
						next.set("player",player);
						next.setContent(function(){
							delete player.storage.gz_sst_qixiao;
						});
					}
				},
				mod:{
					maxHandcardBase:function(player,num){
						if(typeof player.storage.gz_sst_qixiao=="number"){
							return player.storage.gz_sst_qixiao;
						}
					}
				}
			},
			gz_sst_qixiao3:{
				trigger:{player:"phaseJieshuBegin"},
				forced:true,
				filter:function(event,player){
					return player.hasMark("xianqu_mark");
				},
				content:function(){
					player.loseHp();
				}
			},
			sst_zhongpao:{
				trigger:{source:"damageSource"},
				forced:true,
				logTarget:"player",
				filter:function(event,player){
					return event.card;
				},
				content:function(){
					"step 0"
					player.chooseToDiscard("重炮：弃置一张牌，否则失去一点体力","he").set("ai",get.unuseful3);
					"step 1"
					if(!result.cards||!result.cards.length) player.loseHp();
					"step 2"
					if(trigger.player.isAlive()) trigger.player.damage(player);
				}
			},
			sst_zhengshi:{
				trigger:{player:"showCharacterAfter"},
				forced:true,
				logTarget:function(event,player){
					var list=game.filterPlayer(function(current){
						return current.isFriendOf(player);
					});
					list.sortBySeat(player);
					return list;
				},
				filter:function(event,player){
					var list=lib.skill.sst_zhengshi.logTarget(event,player);
					return event.toShow.contains("gz_sst_yumikohimi")&&list&&list.length;
				},
				content:function(){
					var list=lib.skill.sst_zhengshi.logTarget(trigger,player);
					for(var i=0;i<list.length;i++){
						list[i].addMark("zhulianbihe_mark",1);
					}
				}
			},
			sst_muyuan:{
				global:"sst_muyuan2",
				locked:true
			},
			sst_muyuan2:{
				trigger:{player:"phaseDrawBegin2"},
				forced:true,
				filter:function(event,player){
					var num=player.countMark("zhulianbihe_mark")+player.countMark("xianqu_mark");
					return !event.numFixed&&game.hasPlayer(function(current){
						return current.hasSkill("sst_muyuan")&&current.isFriendOf(player);
					})&&num;
				},
				content:function(){
					var num=player.countMark("zhulianbihe_mark")+player.countMark("xianqu_mark");
					trigger.num+=num;
				},
				ai:{
					threaten:function(player,target){
						if(!game.hasPlayer(function(current){
							return current.hasSkill("sst_muyuan")&&current.isFriendOf(player);
						})) return 1;
						var num=player.countMark("zhulianbihe_mark")+player.countMark("xianqu_mark");
						return 1+num*0.2;
					}
				},
				mod:{
					cardUsable:function(card,player,num){
						if(card.name=="sha"&&game.hasPlayer(function(current){
							return current.hasSkill("sst_muyuan")&&current.isFriendOf(player);
						})){
							var count=player.countMark("zhulianbihe_mark")+player.countMark("xianqu_mark");
							return num+count;
						}
					}
				}
			},
			/*
			sst_zhulianbihe_skill:{
				ruleSkill:true,
				group:["sst_zhulianbihe_skill_draw","sst_zhulianbihe_skill_tao"],
				mark:true,
				//marktext:"<p style=\"color:red;\">珠</p>",
				marktext:"璧",
				intro:{
					content:"◇出牌阶段，你可以弃置此标记 然后摸两张牌。<br>◇你可以将此标记当做【桃】使用。",
				},
			},
			sst_zhulianbihe_skill_draw:{
				ruleSkill:true,
				enable:"phaseUse",
				usable:1,
				content:function (){
					player.draw(2);
					player.removeSkill("sst_zhulianbihe_skill");
				},
				ai:{
					order:function (item,player){
						var cards=player.getCards("h");
						if(player.hp>=3){
							if(cards.length>=3){
								for(var i=0;i<cards.length;i++){
									if(get.tag(cards[i],"recover")>=1) return 7.2;
								}
								return 1;
							}
							else return 7.2;
						}
						if(player.hp=2){
							if(cards.length<2){
								for(var i=0;i<cards.length;i++){
									if(get.tag(cards[i],"recover")>=1) return 7.2;
								}
								return 1;
							}
						}
						return 1;
					},
					result:{
						player:2,
					},
				},
			},
			sst_zhulianbihe_skill_tao:{
				ruleSkill:true,
				enable:"chooseToUse",
				viewAs:{
					name:"tao",
				},
				filterCard:function (){return false},
				selectCard:-1,
				precontent:function (){
					player.removeSkill("sst_zhulianbihe_skill");
				},
				ai:{
					save:true,
					respondTao:true,
				},
			},
			*/
			gz_sst_chengli:{
				enable:"chooseToUse",
				filter:function(event,player){
					return event.type!="wuxie"&&event.type!="respondShan"&&!player.storage.gz_sst_chengli.contains(player.hp);
				},
				init:function(player){
					if(!player.storage.gz_sst_chengli) player.storage.gz_sst_chengli=[];
				},
				chooseButton:{
					dialog:function(event,player){
						var list=[];
						for(var i=0;i<lib.inpile.length;i++){
							var name=lib.inpile[i];
							if(name=="sha"){
								list.push(["基本","","sha"]);
								list.push(["基本","","sha","fire"]);
								list.push(["基本","","sha","thunder"]);
								list.push(["基本","","sha","ice"]);
							}
							else if(get.type(name)=="trick") list.push(["锦囊","",name]);
							else if(get.type(name)=="basic") list.push(["基本","",name]);
						}
						return ui.create.dialog("逞力",[list,"vcard"]);
					},
					filter:function(button,player){
						return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
					},
					check:function(button){
						var player=_status.event.player;
						if(player.countCards("h",button.link[2])>0) return 0;
						if(button.link[2]=="wugu") return;
						var effect=player.getUseValue(button.link[2]);
						if(effect>0) return effect;
						return 0;
					},
					backup:function(links,player){
						return {
							filterCard:function(){return false},
							selectCard:-1,
							popname:true,
							position:"he",
							viewAs:{name:links[0][2],nature:links[0][3]},
							onuse:function(result,player){
								player.storage.gz_sst_chengli.add(player.hp);
							},
						}
					},
					prompt:function(links,player){
						return "视为使用一张"+(get.translation(links[0][3])||"")+get.translation(links[0][2]);
					},
				},
				ai:{
					order:4,
					result:{
						player:function(player){
							return 1;
						}
					},
					save:true,
					respondShan:true,
					respondSha:true,
					threaten:1.5,
				},
				group:["gz_sst_chengli2","gz_sst_chengli3"],
			},
			gz_sst_chengli2:{
				enable:"chooseToUse",
				prompt:"视为使用一张无懈可击",
				viewAsFilter:function(player){
					return !player.storage.gz_sst_chengli.contains(player.hp);
				},
				onuse:function(result,player){
					player.storage.gz_sst_chengli.add(player.hp);
				},
				filterCard:function(){return false},
				selectCard:-1,
				viewAs:{name:"wuxie",isCard:true},
			},
			gz_sst_chengli3:{
				prompt:"视为使用一张闪",
				enable:"chooseToUse",
				filter:function(event,player){
					return !player.storage.gz_sst_chengli.contains(player.hp);
				},
				onuse:function(result,player){
					player.storage.gz_sst_chengli.add(player.hp);
				},
				filterCard:function(){return false},
				selectCard:-1,
				viewAs:{name:"shan",isCard:true},
				ai:{
					skillTagFilter:function(player){
						return !player.storage.gz_sst_chengli.contains(player.hp);
					},
					respondShan:true,
				},
			},
			sst_baoling:{
				trigger:{player:"phaseUseEnd"},
				init:function(player){
					player.checkMainSkill("sst_baoling");
				},
				mainSkill:true,
				forced:true,
				filter:function(event,player){
					return player.hasViceCharacter();
				},
				check:function(event,player){
					return player.hp<=1||get.guozhanRank(player.name2,player)<=3;
				},
				content:function(){
					"step 0"
					player.removeCharacter(1);
					"step 1"
					player.removeSkill("sst_baoling");
					player.gainMaxHp(3,true);
					"step 2"
					player.recover(3);
					player.addSkill("sst_benghuai");
				},
				derivation:"sst_benghuai",
			},
			sst_benghuai:{
				trigger:{player:"phaseJieshuBegin"},
				forced:true,
				check:function(){
					return false;
				},
				filter:function(event,player){
					return !player.isMinHp()&&!player.hasSkill("rejiuchi_air")&&!player.hasSkill("oljiuchi_air");
				},
				content:function(){
					"step 0"
					player.chooseControl("baonue_hp","baonue_maxHp",function(event,player){
						if(player.hp==player.maxHp) return "baonue_hp";
						if(player.hp<player.maxHp-1||player.hp<=2) return "baonue_maxHp";
						return "baonue_hp";
					}).set("prompt","崩坏：失去1点体力或减1点体力上限");
					"step 1"
					if(result.control=="baonue_hp"){
						player.loseHp();
					}
					else{
						player.loseMaxHp(true);
					}
				},
				ai:{
					threaten:0.5,
					neg:true,
				},
			},
			gz_sst_anzhi:{
				trigger:{player:"phaseUseBegin"},
				direct:true,
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt2("gz_sst_anzhi"),function(card,player,target){
						return target.countGainableCards(player,"he")>0;
					}).set("ai",function(target){
						return 10-get.attitude(_status.event.player,target);
					});
					"step 1"
					if(result.bool){
						var target=result.targets[0];
						player.logSkill("gz_sst_anzhi",target);
						player.gainPlayerCard(target,"he",true);
						player.storage.gz_sst_anzhi=true;
					}
				},
				group:["gz_sst_anzhi2","gz_sst_anzhi_clear"],
				subSkill:{
					clear:{
						trigger:{player:"phaseAfter"},
						silent:true,
						content:function(){
							delete player.storage.gz_sst_anzhi;
						},
					},
				},
			},
			gz_sst_anzhi2:{
				trigger:{player:"phaseJieshuBegin"},
				filter:function(event,player){
					return player.storage.gz_sst_anzhi;
				},
				forced:true,
				content:function(){
					"step 0"
					player.chooseCardTarget({
						filterCard:true,
						filterTarget:function(card,player,target){
							return player!=target;
						},
						position:"he",
						forced:true,
						ai1:function(card){
							var player=_status.event.player;
							if(player.maxHp-player.hp==1&&card.name=="du") return 30;
							var check=_status.event.check;
							if(check<1) return 0;
							if(player.hp>1&&check<2) return 0;
							return get.unuseful(card)+9;
						},
						ai2:function(target){
							var att=get.attitude(_status.event.player,target);
							if(ui.selected.cards.length==1&&ui.selected.cards[0].name=="du") return 1-att;
							return att-2;
						},
						prompt:"安智：将一张牌交给一名其他角色",
					});
					"step 1"
					player.line(result.targets,"green");
					result.targets[0].gain(result.cards,event.player,"giveAuto");
					delete player.storage.gz_sst_anzhi;
				},
			},
			gz_sst_yinjie:{
				enable:"phaseUse",
				usable:1,
				filterTarget:function(card,player,target){
					return player.canCompareTarget(target);
				},
				content:function(){
					"step 0"
					var next=player.chooseToCompare(target);
					if(!next.fixedResult) next.fixedResult={};
					next.fixedResult[player.playerid]=get.cards()[0];
					"step 1"
					/*
					if(result.bool){
						target.addTempSkill("gz_sst_yinjie2");
					}
					else if(result.tie){
						player.addTempSkill("gz_sst_yinjie2");
						target.addTempSkill("gz_sst_yinjie2");
					}
					else{
						player.addTempSkill("gz_sst_yinjie2");
					}
					*/
					if(result.winner!=player) player.addTempSkill("gz_sst_yinjie2");
					if(result.winner!=target) target.addTempSkill("gz_sst_yinjie2");
				},
				ai:{
					result:{
						target:function(player,target){
							var hs=player.getCards("h");
							if(hs.length<3) return 0;
							var bool=false;
							for(var i=0;i<hs.length;i++){
								if(hs[i].number>=9&&get.value(hs[i])<7){
									bool=true;
									break;
								}
							}
							if(!bool) return 0;
							if(player.canUse("sha",target)&&(player.countCards("h","sha"))){
								return -2;
							}
							return -0.5;
						}
					},
					order:6,
				},
			},
			gz_sst_yinjie2:{
				mark:true,
				mod:{
					cardEnabled:function(){
						return false;
					},
					cardUsable:function(){
						return false;
					},
					cardSavable:function(){
						return false;
					}
				},
				intro:{
					content:"不能使用牌",
				},
			},
			gz_sst_yice:{
				enable:"phaseUse",
				usable:1,
				viewAs:{name:"zhibi"},
				//prepare:"throw",
				filterCard:function(){return true},
				position:"hes",
				check:function(card){
					return 5-get.value(card);
				},
				/*
				onuse:function(result,player){
					var next=game.createEvent("gz_sst_yice_use",false,_status.event.getParent());
					next.player=player;
					next.targets=_status.event.getParent().targets;
					next.color=result.card.color;
					next.setContent(function(){
						player.line(targets,"green");
						for(var i=0;i<targets.length;i++){
							var next=targets[i].chooseToUse("议策：你可以将一张不为"+get.translation(color)+"的牌当作【远交近攻】对"+get.translation(player)+"使用").set("targetRequired",true).set("complexSelect",true).set("filterTarget",function(card,player,target){
								if(target!=_status.event.sourcex&&!ui.selected.targets.contains(_status.event.sourcex)) return false;
								return lib.filter.filterTarget.apply(this,arguments);
							});
							next.set("sourcex",player);
							next.set("color",color);
							next.set("norestore",true);
							next.set("_backupevent","gz_sst_yicex");
							next.backup("gz_sst_yicex");
						}
					});
				},
				*/
				ai:{
					result:{
						player:1,
					},
				},
				group:["gz_sst_yice2"],
			},
			gz_sst_yice2:{
				trigger:{player:"useCardAfter"},
				forced:true,
				filter:function(event,player){
					return event.skill=="gz_sst_yice";
				},
				content:function(){
					var targets=trigger.targets;
					var color=get.color(trigger.card);
					for(var i=0;i<targets.length;i++){
						var next=targets[i].chooseToUse("议策：你可以将一张不为"+get.translation(color)+"的牌当作【远交近攻】对"+get.translation(player)+"使用").set("targetRequired",true).set("complexSelect",true).set("filterTarget",function(card,player,target){
							if(target!=_status.event.sourcex&&!ui.selected.targets.contains(_status.event.sourcex)) return false;
							return lib.filter.filterTarget.apply(this,arguments);
						});
						next.set("sourcex",player);
						next.set("color",color);
						next.set("norestore",true);
						next.set("_backupevent","gz_sst_yicex");
						next.backup("gz_sst_yicex");
					}
				},
			},
			gz_sst_yicex:{
				filterCard:function(card){
					return get.itemtype(card)=="card"&&get.color(card)!=_status.event.color;
					//return true;
				},
				position:"hes",
				viewAs:{
					name:"yuanjiao",
				},
				/*
				filterTarget:function(card,player,target){
					if(target!=_status.event.sourcex&&!ui.selected.targets.contains(_status.event.sourcex)) return false;
					return lib.filter.filterTarget.apply(this,arguments);
				},
				*/
				check:function(card){return 5-get.value(card)},
			},
			gz_sst_hongyan:{
				mod:{
					suit:function(card,suit){
						if(suit=="spade") return "heart";
					}
				},
				trigger:{player:"loseEnd"},
				filter:function(event,player){
					if(player==_status.currentPhase||!event.visible||player.hp<=player.countCards("h")) return false;
					for(var i=0;i<event.cards2.length;i++){
						if(get.suit(event.cards2[i],player)=="heart") return true;
					}
					return false;
				},
				frequent:true,
				content:function(){
					player.draw();
				},
			},
			/*
			sst_shenao:{
				enable:"phaseUse",
				usable:1,
				popup:true,
				line:false,
				delay:false,
				prompt:"将所有手牌（至少一张）当作无距离限制且不计入使用次的【杀】对一名不同势力的角色使用；若以此法造成了伤害，你将手牌补至体力上限",
				filterTarget:function(card,player,target){
					return player.canUse({name:"sha"},target,false)&&!target.isFriendOf(player);
				},
				filter:function(event,player){
					return player.countCards("h");
				},
				content:function(){
					player.useCard({name:"sha"},player.getCards("h"),target,false,"sst_shenao");
				},
				group:["sst_shenao2"],
				ai:{
					order:function(){
						return get.order({name:"sha"})+0.1;
					},
					result:{
						target:function(player,target){
							return get.effect(target,{name:"sha"},player,target);
						}
					},
					effect:{
						player:function(card,player,target){
							if(_status.event.skill=="sst_shenao"){
								if(player.countCards("h")>=3||target.countCards("h")>=3) return "zeroplayertarget";
								if(player.countCards("h","tao")) return "zeroplayertarget";
								if(target.countCards("h","shan")>1) return "zeroplayertarget";
							}
						}
					}
				}
			},
			*/
			sst_shenao:{
				enable:"chooseToUse",
				usable:1,
				prompt:"将所有手牌（至少一张）当作无距离限制且不计入使用次数的【杀】对一名不同势力的角色使用；若以此法造成了伤害，你将手牌补至体力上限",
				filterTarget:function(card,player,target){
					if(target.isFriendOf(player)) return false;
					return lib.filter.targetEnabled.apply(this,arguments);
				},
				viewAs:{name:"sha"},
				viewAsFilter:function(player){
					if(!player.countCards("h")) return false;
				},
				filterCard:function(card){
					return get.position(card)=="h";
				},
				selectCard:-1,
				ai:{
					skillTagFilter:function(player,tag,arg){
						if(arg!="use") return false;
						if(!player.countCards("h")) return false;
					},
					respondSha:true,
					order:function(){
						return get.order({name:"sha"})+0.1;
					},
					effect:{
						player:function(card,player,target){
							if(_status.event.skill=="sst_shenao"){
								if(player.countCards("h")>=3||target.countCards("h")>=3) return "zeroplayertarget";
								if(player.countCards("h","tao")) return "zeroplayertarget";
								if(target.countCards("h","shan")>1) return "zeroplayertarget";
							}
						}
					},
					useful:-1,
					value:-1
				},
				group:"yudun_count",
				subSkill:{
					count:{
						trigger:{player:"useCard1"},
						silent:true,
						filter:function(event,player){
							return event.skill=="sst_shenao"&&_status.currentPhase==player;
						},
						content:function(){
							player.getStat().card.sha--;
						}
					}
				}
			},
			sst_shenao2:{
				trigger:{player:"useCardAfter"},
				forced:true,
				filter:function(event,player){
					return event.skill=="sst_shenao"&&game.cardCausedDamage(event.card);
				},
				content:function(){
					player.drawTo(player.maxHp);
				}
			},
			gz_sst_yujun:{
				zhenfa:"inline",
				global:"gz_sst_yujun2",
			},
			gz_sst_yujun2:{
				trigger:{
					player:["useCard"],
				},
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current.hasSkill("gz_sst_yujun")&&current.inline(player);
					});
				},
				forced:true,
				content:function(){
					trigger.directHit.addArray(game.players);
				},
				ai:{
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						return game.hasPlayer(function(current){
							return current.hasSkill("gz_sst_yujun")&&current.inline(player);
						});
					},
				},
			},
			gz_sst_xiduo:{
				trigger:{player:"phaseBegin"},
				forced:true,
				filter:function(event,player){
					var targets=lib.skill.gz_sst_xiduo.logTarget(event,player);
					return targets.length;
				},
				logTarget:function(event,player){
					var list=game.filterPlayer(function(current){
						return !current.isFriendOf(player);
					});
					var targets=[];
					for(var i=0;i<list.length;i++){
						if(game.hasPlayer(function(current){
							return current.inline(list[i]);
						})){
							targets.push(list[i]);
						}
					}
					targets.sortBySeat(player);
					return targets;
				},
				content:function(){
					var targets=lib.skill.gz_sst_xiduo.logTarget(trigger,player);
					player.storage.gz_sst_xiduo=targets;
					for(var i=0;i<targets.length;i++){
						targets[i].addTempSkill("baiban");
					}
					player.addTempSkill("gz_sst_xiduo3");
				},
				group:["gz_sst_xiduo_clear"],
				subSkill:{
					clear:{
						trigger:{player:"phaseAfter"},
						silent:true,
						content:function(){
							delete player.storage.gz_sst_xiduo;
						},
					},
				},
			},
			gz_sst_xiduo2:{
				init:function(player,skill){
					player.disableSkill(skill,player.skills);
				},
				onremove:function(player,skill){
					player.enableSkill(skill);
				},
				marktext:"袭",
				locked:true,
				mark:true,
				intro:{
					content:"武将牌上的全部技能失效",
				},
			},
			gz_sst_xiduo3:{
				mod:{
					targetInRange:function(card,player,target){
						if(card.name=="sha"&&player.storage.gz_sst_xiduo.contains(target)){
							return true;
						}
					},
				},
			},
			/*
			gz_sst_xiduo:{
				global:"gz_sst_xiduo2",
				group:"gz_sst_xiduo3",
			},
			gz_sst_xiduo2:{
				trigger:{global:["phaseBegin","phaseAfter","dieAfter"]},
				content:function(){
					player.removeSkillBlocker(event.name);
					player.addSkillBlocker(event.name);
				},
				skillBlocker:function(skill,player){
					return _status.currentPhase.isAlive()&&_status.currentPhase.hasSkill("gz_sst_xiduo")&&!player.isFriendOf(_status.currentPhase)&&game.hasPlayer(function(current){
						return current.inline(player);
					})&&skill!="gz_sst_xiduo2"&&!lib.skill[skill].charlotte;
				},
				silent:true,
				charlotte:true,
				mark:true,
				intro:{
					content:function(storage,player,skill){
						var list=player.getSkills(null,false,false).filter(function(i){
							return lib.skill.gz_sst_xiduo2.skillBlocker(i,player);
						});
						if(list.length) return "失效技能："+get.translation(list);
						return "无失效技能";
					}
				}
			},
			gz_sst_xiduo3:{
				mod:{
					targetInRange:function(card,player,target){
						if(_status.currentPhase==player&&!target.isFriendOf(player)&&game.hasPlayer(function(current){
							return current.inline(target);
						})){
							return true;
						}
					},
				},
			},
			*/
			sst_tunxing:{
				trigger:{player:"showCharacterAfter"},
				direct:true,
				filter:function(event,player){
					return event.toShow.contains("gz_sst_kirby");
				},
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt2("sst_tunxing"),[1,Infinity],function(card,player,target){
						return target.countCards("h")>player.countCards("h");
					}).set("ai",function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target);
						var nh=target.countCards("h");
						if(att<0){
							att=-Math.sqrt(-att);
						}
						else{
							att=Math.sqrt(att);
						}
						if(att>0){
							if(target.getEquip("baiyin")&&target.isDamaged()&&
								get.recoverEffect(target,player,player)>0){
								if(target.hp==1&&!target.hujia) return att*1.6;
								if(target.hp==2) return att*0.01;
								return att*0;
							}
						}
						var es=target.getCards("e");
						var noe=(es.length==0||target.hasSkillTag("noe"));
						var noe2=(es.filter(function(esx){
							return esx.name=="tengjia"||get.value(esx)>0;
						}).length==0);
						var noh=(nh==0||target.hasSkillTag("noh"));
						if(noh&&(noe||noe2)) return att*0;
						if(att<=0&&!target.countCards("he")) return att*1.5;
						return att*(-1.5);
					});
					"step 1"
					if(result.targets&&result.targets.length){
						var targets=result.targets;
						targets.sortBySeat();
						player.logSkill("sst_tunxing",targets);
						for(var i=0;i<targets.length;i++){
							player.discardPlayerCard(targets[i],2,"he",true);
						}
					}
				},
			},
			gz_sst_douhun:{
				trigger:{
					player:"useCardToPlayer",
					target:"useCardToTarget"
				},
				forced:true,
				filter:function(event,player){
					return get.name(event.card)=="sha"&&event.targets.length==1;
				},
				logTarget:function(event,player){
					if(event.name=="useCardToTarget") return event.player;
					return event.target;
				},
				content:function(){
					"step 0"
					trigger.cancel();
					trigger.getParent().cancel();
					"step 1"
					var source=lib.skill.gz_sst_douhun.logTarget(trigger,player);
					if(source.canUse({name:"juedou",isCard:true},player,false,false)) source.useCard({name:"juedou",isCard:true},player,false);
				},
				ai:{
					effect:{
						player:function(card,player,target){
							if(get.name(card)=="sha") return [0,get.effect(target,{name:"juedou",isCard:true},player,player)];
						},
						target:function(card,player,target){
							if(get.name(card)=="sha") return [0,get.effect(target,{name:"juedou",isCard:true},player,player)];
						}
					}
				},
				mod:{
					cardname:function(card,player){
						//game.log(_status.event.getParent("useCard"));
						//game.log(_status.event.getParent().name);
						//if(_status.event.getParent("chooseToRespond")&&_status.event.getParent("chooseToRespond").player==player&&_status.event.getParent("useCard")&&get.name(_status.event.getParent("useCard").card)=="juedou"&&_status.event.getParent("useCard").targets.contains(player)) return "sha";
						var evt=_status.event.getParent("juedou");
						if(evt&&evt.name=="juedou"&&get.position(card)=="h") return "sha";
					}
				}
			},
			sst_shuangguan:{
				locked:false,
				mod:{
					aiOrder:function(player,card,num){
						if(typeof card=="object"&&player.isPhaseUsing()){
							var history=player.getAllHistory("useCard");
							if(history&&history.length&&history.length>=1&&history.length%2) var evt=history[history.length-1];
							if(evt&&evt.card&&get.translation(get.name(evt.card)).length==get.translation(get.name(card)).length){
								return num+5;
							}
						}
					},
				},
				trigger:{player:"useCard"},
				filter:function(event,player){
					if(!player.isPhaseUsing()) return false;
					var history=player.getAllHistory("useCard");
					if(!history||!history.length||history.length<=1||history.length%2) return false;
					var card=history[history.length-2].card;
					//game.log(card);
					//game.log(get.translation(get.name(event.card)),get.translation(get.name(event.card)).length);
					//game.log(get.translation(get.name(card)),get.translation(get.name(card)).length);
					return get.translation(get.name(event.card)).length==get.translation(get.name(card)).length;
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt("sst_shuangguan"),"你可以弃置一名角色一张牌",function(card,player,target){
						return target.countDiscardableCards(player,"he");
					}).set("ai",function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target);
						if(att<0){
							att=-Math.sqrt(-att);
						}
						else{
							att=Math.sqrt(att);
						}
						var nh=target.countCards("h");
						if(att>0){
							if(target.getEquip("baiyin")&&target.isDamaged()&&
								get.recoverEffect(target,player,player)>0){
								if(target.hp==1&&!target.hujia) return 1.6*att;
								if(target.hp==2) return 0.01*att;
								return 0;
							}
						}
						var es=target.getCards("e");
						var noe=(es.length==0||target.hasSkillTag("noe"));
						var noe2=(es.filter(function(esx){
							return esx.name=="tengjia"||get.value(esx)>0;
						}).length==0);
						var noh=(nh==0||target.hasSkillTag("noh"));
						if(noh&&(noe||noe2)) return 0;
						if(att<=0&&!target.countCards("he")) return 1.5*att;
						return -1.5*att;
					});
					"step 1"
					if(result.bool){
						player.logSkill("sst_shuangguan",result.targets);
						event.target=result.targets[0];
						player.discardPlayerCard(event.target,"he",true);
					}
				},
				intro:{
					mark:function(dialog,content,player){
						if(player.storage.sst_shuangguan){
							dialog.addText("使用的上一张牌（第"+player.storage.sst_shuangguan_parity+"张牌）名称字数："+player.storage.sst_shuangguan);
						}
					},
					content:function(storage,player){
						if(storage){
							return "使用的上一张牌（第"+player.storage.sst_shuangguan_parity+"张牌）名称字数："+storage;
						}
					},
				},
				group:["sst_shuangguan_use"],
				subSkill:{
					use:{
						trigger:{player:"useCard"},
						silent:true,
						content:function(){
							var history=player.getAllHistory("useCard");
							//if(!player.storage.sst_shuangguan) player.storage.sst_shuangguan=[];
							player.storage.sst_shuangguan=get.translation(get.name(trigger.card)).length;
							player.storage.sst_shuangguan_parity=(history.length%2)?"奇数":"偶数";
							//player.updateMarks();
							//player.markSkill("sst_shuangguan");
						},
						sub:true,
					},
				},
			},
			sst_langu:{
				enable:"phaseUse",
				usable:1,
				filterCard:function(){return false},
				selectCard:-1,
				viewAs:{name:"lianjunshengyan"},
				precontent:function(){
					player.turnOver();
				},
				ai:{
					order:function(){
						return get.order({name:"lianjunshengyan"})-0.1;
					},
					useful:-1,
					value:-1,
				},
			},
			gz_ska_shenqi:{
				trigger:{global:"damageEnd"},
				direct:true,
				init:function(player){
					if(!player.storage.gz_ska_shenqi) player.storage.gz_ska_shenqi={};
				},
				filter:function(event,player){
					var players=game.filterPlayer(function(current){
						//game.log(player.storage.gz_ska_shenqi[current.playerid]);
						return !player.storage.gz_ska_shenqi[current.playerid]||player.storage.gz_ska_shenqi[current.playerid]<3;
					});
					return players&&players.length;
				},
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt2("gz_ska_shenqi"),function(card,player,target){
						return !player.storage.gz_ska_shenqi[target.playerid]||player.storage.gz_ska_shenqi[target.playerid]<3;
					}).set("ai",function(target){
						return get.attitude(_status.event.player,target);
					});
					"step 1"
					if(result.targets&&result.targets.length){
						player.logSkill("gz_ska_shenqi",result.targets);
						if(!player.storage.gz_ska_shenqi[result.targets[0].playerid]) player.storage.gz_ska_shenqi[result.targets[0].playerid]=0;
						player.storage.gz_ska_shenqi[result.targets[0].playerid]++;
						result.targets[0].draw();
					}
				},
				ai:{
					maixie:true,
				},
				group:["gz_ska_shenqi_clear"],
				subSkill:{
					clear:{
						trigger:{global:"roundStart"},
						silent:true,
						content:function(){
							player.storage.gz_ska_shenqi={};
						},
					},
				},
			},
			gz_ska_zhefu:{
				enable:"phaseUse",
				usable:1,
				filterTarget:function (card,player,target){
					return player!=target;
				},
				viewAsFilter:function(player){
					if(!player.countCards("he")) return false;
				},
				filterCard:true,
				selectCard:1,
				discard:false,
				lose:false,
				delay:false,
				position:"he",
				check:function(card){
					if(card.name=="du") return 10;
					var player=_status.event.player;
					return player.getUseValue(card);
				},
				content:function(){
					"step 0"
					target.gain(cards,player,"giveAuto");
					"step 1"
					target.chooseUseTarget(true,cards[0],false);
				},
				ai:{
					order:8,
					expose:0.2,
					result:{
						target:function(player,target){
							if(target.hasSkillTag("nogain")) return 0;
							if(player.countCards("h")==player.countCards("h","du")) return -1;
							return 1;
						},
					},
				},
			},
			ska_sheran:{
				init:function(player){
					if(player.checkMainSkill("ska_sheran")){
						player.removeMaxHp();
					}
				},
				mainSkill:true,
				skillAnimation:true,
				animationStr:"舍燃",
				animationColor:"fire",
				unique:true,
				forceunique:true,
				enable:"phaseUse",
				filterCard:true,
				selectCard:3,
				line:"fire",
				filterTarget:function(card,player,target){
					return target!=player;
				},
				content:function(){
					"step 0"
					target.damage(2,player,"fire");
					"step 1"
					player.removeCharacter(0);
					"step 2"
					player.chooseTarget("舍燃：是否令一名角色摸两张牌并获得技能〖激行〗？").set("ai",function(target){
						var att=get.attitude(_status.event.player,target);
						return 10+att;
					});
					"step 3"
					if(result.bool){
						player.line(result.targets[0],"fire");
						result.targets[0].draw(2);
						game.log(result.targets[0],"获得了技能","#g【"+get.translation("ska_jixing")+"】");
						result.targets[0].addSkill("ska_jixing");
					}
				},
				ai:{
					order:3,
					expose:0.2,
					damage:true,
					result:{
						target:function(player,target){
							if(get.attitude(player,target)<0){
								return get.damageEffect(target,player,target,"fire");
							}
							return 0;
						},
					},
				},
			},
			gz_ymk_yunchou:{
				trigger:{player:"phaseDiscardBefore"},
				direct:true,
				filter:function(event,player){
					return player.countCards("he");
				},
				content:function(){
					"step 0"
					player.chooseToDiscard(get.prompt("gz_ymk_yunchou"),"你可以弃置至多"+get.cnNumber(player.maxHp)+"张牌，若如此做，结束阶段，你摸等量的牌。","he",[1,player.maxHp]).set("ai",function(card){
						return 8-get.value(card);
					}).set("logSkill","gz_ymk_yunchou");
					"step 1"
					if(result.cards&&result.cards.length){
						//player.logSkill("gz_ymk_yunchou");
						player.storage.gz_ymk_yunchou=result.cards.length;
						player.addTempSkill("gz_ymk_yunchou2");
					}
				},
			},
			gz_ymk_yunchou2:{
				trigger:{player:"phaseJieshuBegin"},
				forced:true,
				content:function(){
					player.draw(player.storage.gz_ymk_yunchou);
					player.removeSkill("gz_ymk_yunchou2");
				},
				onremove:function(player){
					delete player.storage.gz_ymk_yunchou;
				},
			},
			gz_ymk_guimou:{
				trigger:{global:"judge"},
				direct:true,
				content:function(){
					"step 0"
					player.chooseControl("牌堆顶","牌堆底","cancel2").set("prompt",get.translation(trigger.player)+"的"+(trigger.judgestr||"")+"判定为"+get.translation(trigger.player.judging[0])+"，"+get.prompt("gz_ymk_guimou")).set("ai",function(){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						var judging=_status.event.judging;
						var result=trigger.judge(judging);
						var check=false;
						var attitude=get.attitude(player,trigger.player);
						if(attitude==0||result==0) return "cancel2";
						if(attitude>0){
							check=result<0;
						}
						else{
							check=result>0;
						}
						if(check) return ["牌堆顶","牌堆底"].randomGet();
						return "cancel2";
					}).set("judging",trigger.player.judging[0]);
					"step 1"
					if(result.control!="cancel2"){
						player.logSkill("gz_ymk_guimou");
						player.popup(result.control);
						var cards=[];
						var num=trigger.player.hp;
						game.log(player,"观看了","#y"+result.control,"的"+get.cnNumber(trigger.player.hp)+"张牌");
						if(ui.cardPile.childNodes.length<num){
							var discardcards=get.cards(num);
							game.cardsDiscard(discardcards);
						}
						if(result.control=="牌堆顶"){
							for(var i=0;i<num;i++){
								if(ui.cardPile.childNodes.length>i) cards.push(ui.cardPile.childNodes[i]);
							}
						}
						else{
							for(var i=0;i<num;i++){
								if(ui.cardPile.childNodes.length>i) cards.push(ui.cardPile.childNodes[ui.cardPile.childNodes.length-1-i]);
							}
						}
						player.chooseCardButton("鬼谋：选择一张牌代替",cards,true).set("ai",function(button){
							var trigger=_status.event.getTrigger();
							var player=_status.event.player;
							var judging=_status.event.judging;
							var result=trigger.judge(button.link)-trigger.judge(judging);
							var attitude=get.attitude(player,trigger.player);
							if(attitude==0||result==0) return 0;
							if(attitude>0){
								return result;
							}
							else{
								return -result;
							}
						}).set("judging",trigger.player.judging[0]);
					}
					else{
						event.finish();
					}
					"step 2"
					event.card=result.links[0];
					game.cardsGotoOrdering(event.card).relatedEvent=trigger;
					"step 3"
					var card=event.card;
					player.$throw(card);
					card.clone.classList.add("thrownhighlight");
					if(trigger.player.judging[0].clone){
						trigger.player.judging[0].clone.classList.remove("thrownhighlight");
						game.addVideo("deletenode",player,get.cardsInfo([trigger.player.judging[0].clone]));
					}
					game.cardsDiscard(trigger.player.judging[0]);
					trigger.player.judging[0]=card;
					game.log(trigger.player,"的判定牌改为",card);
					game.delay(2);
				},
				ai:{
					rejudge:true,
					tag:{
						rejudge:1,
					},
				},
			},
			gz_ska_jiyan:{
				init:function(player){
					if(player.checkViceSkill("gz_ska_jiyan")&&!player.viceChanged){
						player.removeMaxHp();
					}
				},
				viceSkill:true,
				group:["gz_ska_jiyan_sha","gz_ska_jiyan_shan","gz_ska_jiyan_tao","gz_ska_jiyan_jiu"],
				subSkill:{
					sha:{
						enable:["chooseToUse","chooseToRespond"],
						filterCard:function(){return false},
						selectCard:-1,
						viewAs:{name:"sha"},
						filter:function(event,player){
							return !player.hasSkill("gz_ska_jiyan_disable");
						},
						mark:false,
						prompt:"视为使用或打出一张【杀】",
						onuse:function(result,player){
							player.popup("《话语权》");
							player.chat("《话语权》");
							player.addTempSkill("gz_ska_jiyan_disable","roundStart");
						},
						onrespond:function(){return this.onuse.apply(this,arguments);},
						ai:{
							respondSha:true,
							skillTagFilter:function(player){
								if(player.hasSkill("gz_ska_jiyan_disable")) return false;
							},
							order:function(){
								return get.order({name:"sha"})-0.1;
							},
							useful:-1,
							value:-1,
						},
					},
					shan:{
						enable:["chooseToUse","chooseToRespond"],
						filterCard:function(){return false},
						selectCard:-1,
						viewAs:{name:"shan"},
						prompt:"视为使用或打出一张【闪】",
						filter:function(event,player){
							return !player.hasSkill("gz_ska_jiyan_disable");
						},
						mark:false,
						onuse:function(result,player){
							player.popup("《理解》");
							player.chat("《理解》");
							player.addTempSkill("gz_ska_jiyan_disable","roundStart");
						},
						onrespond:function(){return this.onuse.apply(this,arguments);},
						ai:{
							respondShan:true,
							skillTagFilter:function(player){
								if(player.hasSkill("gz_ska_jiyan_disable")) return false;
							},
							order:function(){
								return get.order({name:"shan"})-0.1;
							},
							useful:-1,
							value:-1,
						},
					},
					tao:{
						enable:["chooseToUse","chooseToRespond"],
						filterCard:function(){return false},
						selectCard:-1,
						viewAs:{name:"tao"},
						prompt:"视为使用或打出一张【桃】",
						filter:function(event,player){
							return !player.hasSkill("gz_ska_jiyan_disable");
						},
						mark:false,
						onuse:function(result,player){
							player.popup("《硬气》");
							player.chat("《硬气》");
							player.addTempSkill("gz_ska_jiyan_disable","roundStart");
						},
						onrespond:function(){return this.onuse.apply(this,arguments);},
						ai:{
							save:true,
							skillTagFilter:function(player){
								if(player.hasSkill("gz_ska_jiyan_disable")) return false;
							},
							order:function(){
								return get.order({name:"tao"})-0.1;
							},
							useful:-1,
							value:-1,
						},
					},
					jiu:{
						enable:["chooseToUse","chooseToRespond"],
						filterCard:function(){return false},
						selectCard:-1,
						viewAs:{name:"jiu"},
						prompt:"视为使用或打出一张【酒】",
						filter:function(event,player){
							return !player.hasSkill("gz_ska_jiyan_disable");
						},
						mark:false,
						onuse:function(result,player){
							player.popup("《压迫感》");
							player.chat("《压迫感》");
							player.addTempSkill("gz_ska_jiyan_disable","roundStart");
						},
						onrespond:function(){return this.onuse.apply(this,arguments);},
						ai:{
							save:true,
							skillTagFilter:function(player){
								if(player.hasSkill("gz_ska_jiyan_disable")) return false;
							},
							order:function(){
								return get.order({name:"jiu"})-0.1;
							},
							useful:-1,
							value:-1,
						},
					},
					disable:{
						mark:true,
						intro:{
							content:"本轮已发动"
						},
					},
				},
			},
			/*
			sst_paozhi:{
				enable:"phaseUse",
				usable:1,
				prompt:"将至多三张手牌交给一名与你势力不同的角色，或未确定势力的角色，若你交给与你势力不同的角色，则你摸等量的牌",
				filter:function(event,player){
					return player.countCards("h");
				},
				filterCard:true,
				filterTarget:function(card,player,target){
					if(target==player) return false;
					if(player.isUnseen()) return target.isUnseen();
					if(player.identity=="ye") return true;
					return target.identity!=player.identity;
				},
				check:function(card){
					if(card.name=="tao") return 0;
					return 5-get.value(card);
				},
				selectCard:[1,3],
				prepare:"give",
				discard:false,
				// delay:0.5,
				content:function(){
					"step 0"
					target.gain(cards,player);
					"step 1"
					if(!target.isUnseen()){
						player.draw(cards.length);
					}
				},
				ai:{
					basic:{
						order:2
					},
					result:{
						player:function(player,target){
							var huoshao=false;
							for(var i=0;i<ui.selected.cards.length;i++){
								if(ui.selected.cards[i].name=="huoshaolianying"){huoshao=true;break}
							}
							if(huoshao&&player.inline(target.getNext())) return -3;
							if(target.isUnseen()) return 0;
							if(player.isMajor()) return 0;
							return 0.5;
						},
						target:function(player,target){
							if(target.isUnseen()) return 0;
							return 1;
						}
					}
				}
			},
			*/
			sst_paozhi:{
				locked:true,
				ai:{
					lianhengh:true
				}
			},
			sst_fuxin:{
				skillAnimation:true,
				animationStr:"付心",
				animationColor:"fire",
				line:"fire",
				enable:"phaseUse",
				usable:1,
				filterTarget:function(card,player,target){
					return target!=player;
				},
				content:function(){
					"step 0"
					if(player.checkMainSkill('sst_fuxin',false)){
						player.removeCharacter(0);
					}
					else{
						player.removeCharacter(1);
					}
					"step 1"
					lib.inpile.push("sst_aegises");
					var card=game.createCard2("sst_aegises","","");
					//card.set("cardtag",["sst_ultimate"]);
					if(!_status.cardtag) _status.cardtag={};
					if(!_status.cardtag["sst_ultimate"]) _status.cardtag["sst_ultimate"]=[];
					_status.cardtag["sst_ultimate"].push(card.cardid);
					player.give(card,target,"give",true);
					target.addAdditionalSkill("sst_fuxin","sst_fuxin_card");
				},
				ai:{
					order:1,
					expose:0.2,
					damage:true,
					result:{
						target:3
					}
				}
			},
			//天翊
			gz_ymk_kaibai:{
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
						return get.number(card);
					}).set("judge2",function(result){
						return result.number;
					});
					"step 2"
					if(result.number) player.draw(result.number);
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
				threaten:4
			}
		},
		game:{
			showYexings:function(){
				if(_status.showYexings) return;
				_status.showYexings=true;
				var next=game.createEvent('showYexings',false);
				next.setContent(function(){
					'step 0'
					event.targets=game.filterPlayer(function(current){
						return lib.character[current.name1][1]=='ye';
					}).sortBySeat(_status.currentPhase);
					event.targets2=[];
					'step 1'
					var target=targets.shift();
					event.target=target;
					target.chooseBool('是否【暴露野心】，展示主将并继续战斗？','若选择“否”，则视为本局游戏失败');
					'step 2'
					if(result.bool){
						event.targets2.push(target);
						target.$fullscreenpop('暴露野心','thunder');
						game.log(target,'暴露了野心');
						target.showCharacter(0);
						game.delay(2);
						if(targets.length) event.goto(1);
						else if(game.players.length<3){
							delete _status.showYexings;
							event.finish();
						}
					}
					else{
						if(targets.length) event.goto(1);
						else{
							var winner=game.findPlayer(function(current){
								return lib.character[current.name1][1]!='ye';
							});
							if(winner){
								game.broadcastAll(function(id){
									game.winner_id=id;
								},winner.playerid);
								game.checkResult();
							}
							delete _status.showYexings;
							event.finish();
						}
					}
					'step 3'
					var source=event.targets2.shift();
					event.source=source;
					var targets=game.filterPlayer(function(current){
						return current.identity!='ye'&&current!=source&&!get.is.jun(current)&&!event.targets2.contains(current)&&!current.storage.yexinjia_friend;
					}).sortBySeat(source);
					if(!targets.length){
						delete _status.showYexings;
						event.finish();
					}
					else{
						event.targets=targets;
						source.chooseBool('是否发起【拉拢人心】？','令所有其他不为君主/暴露野心家的角色依次选择是否与你结盟。第一个选择加入的人将势力和胜利条件改为与你相同');
					}
					'step 4'
					if(!result.bool){
						if(event.targets2.length) event.goto(3);
						return;
					}
					'step 5'
					var target=targets.shift();
					event.target=target;
					source.line(target,'green');
					target.chooseBool('是否响应'+get.translation(source)+'发起的【拉拢人心】？','将势力改为野心家，且视为和该角色阵营相同').set('ai',function(){
						if(game.players.length<4) return true;
						if(game.players.length<5) return Math.random()<0.5;
						return Math.random()<0.3;
					});
					'step 6'
					if(result.bool){
						target.chat('加入');
						if(!_status.yexinjia_list) _status.yexinjia_list=['夏','商','周','秦','汉','隋','唐','宋','辽','金','元','明'];
						source.chooseControl(_status.yexinjia_list).set('prompt','请选择自己所属的野心家势力的标识').set('ai',()=>(_status.yexinjia_list?_status.yexinjia_list.randomGet():0));
					}
					else{
						target.chat('拒绝');
						game.delay(1.5);
						if(targets.length) event.goto(5);
						else event.goto(8);
					}
					'step 7'
					game.broadcastAll(function(player,target,text){
						player.identity='ye';
						source.setIdentity(text,'ye');
						player.setIdentity(text,'ye');
						player.storage.yexinjia_friend=target;
					},target,source,result.control);
					_status.yexinjia_list.remove(result.control);
					target.markSkill('yexinjia_friend');
					source.removeMark('yexinjia_mark',1);
					target.drawTo(4);
					target.recover();
					'step 8'
					if(event.targets2.length) event.goto(3);
					else delete _status.showYexings;
				});
			},
			getCharacterChoice:function(list,num){
				var choice=list.splice(0,num).sort(function(a,b){
					return (get.is.double(a)?1:-1)-(get.is.double(b)?1:-1);
				});
				var map={sst_light:[],sst_dark:[],sst_spirit:[],sst_reality:[],sst_smash:[],ye:[]};
				for(var i=0;i<choice.length;i++){
					if(get.is.double(choice[i])){
						var group=get.is.double(choice[i],true);
						for(var ii of group){
							if(map[ii]&&map[ii].length){
								map[ii].push(choice[i]);
								lib.character[choice[i]][1]=ii;
								group=false;
								break;
							}
						}
						if(group) choice.splice(i--,1);
					}
					else{
						var group=lib.character[choice[i]][1];
						if(map[group]){
							map[group].push(choice[i]);
						}
					}
				}
				if(map.ye.length){
					for(var i in map){
						if(i!='ye'&&map[i].length) return choice.randomSort();
					}
					choice.remove(map.ye[0]);
					map.ye.remove(map.ye[0]);
					for(var i=0;i<list.length;i++){
						if(lib.character[list[i]][1]!='ye'){
							choice.push(list[i]);
							list.splice(i--,1);
							return choice.randomSort();
						}
					}
				}
				for(var i in map){
					if(map[i].length<2){
						if(map[i].length==1){
							choice.remove(map[i][0]);
							list.push(map[i][0]);
						}
						map[i]=false;
					}
				}
				if(choice.length==num-1){
					for(var i=0;i<list.length;i++){
						if(map[lib.character[list[i]][1]]){
							choice.push(list[i]);
							list.splice(i--,1);
							break;
						}
					}
				}
				else if(choice.length<num-1){
					var group=null;
					for(var i=0;i<list.length;i++){
						if(group){
							if(lib.character[list[i]][1]==group||lib.character[list[i]][1]=='ye'){
								choice.push(list[i]);
								list.splice(i--,1);
								if(choice.length>=num){
									break;
								}
							}
						}
						else{
							if(!map[lib.character[list[i]][1]]&&!get.is.double(list[i])){
								group=lib.character[list[i]][1];
								if(group=='ye') group=null;
								choice.push(list[i]);
								list.splice(i--,1);
								if(choice.length>=num){
									break;
								}
							}
						}
					}
				}
				return choice.randomSort();
			},
			getState:function(){
				var state={};
				for(var i in lib.playerOL){
					var player=lib.playerOL[i];
					state[i]={
						identity:player.identity,
						//group:player.group,
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
						//player.group=state[i].group;
						player.ai.shown=state[i].shown;
					}
				}
			},
			getRoomInfo:function(uiintro){
				var num,last;
				if(lib.configOL.initshow_draw=='off'){
					num='关闭'
				}
				else{
					num={mark:'标记',draw:'摸牌'}[lib.configOL.initshow_draw];
				}
				uiintro.add('<div class="text chat">首亮奖励：'+num);
				uiintro.add('<div class="text chat">珠联璧合：'+(lib.configOL.zhulian?'开启':'关闭'));
				uiintro.add('<div class="text chat">出牌时限：'+lib.configOL.choose_timeout+'秒');
				uiintro.add('<div class="text chat">国战牌堆：'+(lib.configOL.guozhanpile?'开启':'关闭'));
				uiintro.add('<div class="text chat">鏖战模式：'+(lib.configOL.aozhan?'开启':'关闭'));
				last=uiintro.add('<div class="text chat">观看下家副将：'+(lib.configOL.viewnext?'开启':'关闭'));
				last.style.paddingBottom='8px';
			},
			addRecord:function(bool){
				if(typeof bool=='boolean'){
					var data=lib.config.gameRecord.guozhan.data;
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
					var list=lib.group.slice(0);
					list.add('ye');
					var str='';
					for(var i=0;i<list.length;i++){
						if(list[i]!='shen'&&data[list[i]]){
							str+=lib.translate[list[i]+'2']+'：'+data[list[i]][0]+'胜'+' '+data[list[i]][1]+'负<br>';
						}
					}
					lib.config.gameRecord.guozhan.str=str;
					game.saveConfig('gameRecord',lib.config.gameRecord);
				}
			},
			getIdentityList:function(player){
				if(!player.isUnseen()) return;
				if(player==game.me) return;
				var list={
					sst_light:'光',
					sst_dark:'暗',
					sst_spirit:'魂',
					sst_reality:'现',
					sst_smash:'斗',
					ye:'野',
					unknown:'猜'
				}
				var num=Math.floor((game.players.length+game.dead.length)/2);
				var noye=true;
				if(get.population('sst_light')>=num){
					delete list.sst_light;
					noye=false;
				}
				if(get.population('sst_dark')>=num){
					delete list.sst_dark;
					noye=false;
				}
				if(get.population('sst_spirit')>=num){
					delete list.sst_spirit;
					noye=false;
				}
				if(get.population('sst_reality')>=num){
					delete list.sst_reality;
					noye=false;
				}
				if(get.population('sst_smash')>=num){
					delete list.sst_smash;
					noye=false;
				}
				if(noye){
					delete list.ye;
				}
				return list;
			},
			getIdentityList2:function(list){
				for(var i in list){
					switch(i){
						case 'unknown':list[i]='未知';break;
						case 'ye':list[i]='野心家';break;
						case 'qun':list[i]+='雄';break;
						case 'key':list[i]='Key';break;
						case 'jin':list[i]+='朝';break;
						default:list[i]+='国';
					}
				}
			},
			getVideoName:function(){
				var str=get.translation(game.me.name1)+'/'+get.translation(game.me.name2);
				var str2=get.cnNumber(parseInt(get.config('player_number')))+'人'+
					get.translation(lib.config.mode);
				if(game.me.identity=='ye'){
					str2+=' - 野心家';
				}
				var name=[str,str2];
				return name;
			},
			showIdentity:function(started){
				if(game.phaseNumber==0&&!started) return;
				for(var i=0;i<game.players.length;i++){
					game.players[i].showCharacter(2,false);
				}
			},
			tryResult:function(){
				var map={},sides=[],pmap=_status.connectMode?lib.playerOL:game.playerMap,hiddens=[];
				for(var i of game.players){
					if(i.identity=='unknown'){
						hiddens.push(i);
						continue;
					}
					var added=false;
					for(var j of sides){
						if(i.isFriendOf(pmap[j])){
							added=true;
							map[j].push(i);
							break;
						}
					}
					if(!added){
						map[i.playerid]=[i];
						sides.push(i.playerid);
					}
				}
				if(!sides.length) return;
				else if(sides.length>1){
					if(!hiddens.length&&sides.length==2){
						if(map[sides[0]].length==1&&!map[sides[1]].filter(function(i){
							return i.identity!='ye'&&i.isUnseen(0);
						}).length) map[sides[0]][0].showGiveup();
						if(map[sides[1]].length==1&&!map[sides[0]].filter(function(i){
							return i.identity!='ye'&&i.isUnseen(0);
						}).length) map[sides[1]][0].showGiveup();
					}
				}
				else{
					var isYe=function(player){
						return player.identity!='ye'&&lib.character[player.name1][1]=='ye';
					}
					if(!hiddens.length){
						if(map[sides[0]].length>1){
							for(var i of map[sides[0]]){
								if(isYe(i)){
									game.showYexings();
									return;
								}
							}
						}
						game.broadcastAll(function(id){
							game.winner_id=id;
						},sides[0]);
						game.checkResult();
					}
					else{
						var identity=map[sides[0]][0].identity;
						if(identity=='ye') return;
						for(var i of map[sides[0]]){
							if(isYe(i)) return;
						}
						for(var i of hiddens){
							if(isYe(i)||i.getGuozhanGroup(2)!=identity||!i.wontYe()) return;
						}
						game.broadcastAll(function(id){
							game.winner_id=id;
						},sides[0]);
						game.checkResult();
					}
				}
			},
			checkResult:function(){
				_status.overing=true;
				var me=game.me._trueMe||game.me;
				for(var i=0;i<game.players.length;i++){
					game.players[i].showCharacter(2);
				}
				var winner=(_status.connectMode?lib.playerOL:game.playerMap)[game.winner_id];
				game.over(winner&&winner.isFriendOf(me)?true:false);
				game.showIdentity();
			},
			checkOnlineResult:function(player){
				var winner=lib.playerOL[game.winner_id];
				return winner&&winner.isFriendOf(game.me);
			},
			chooseCharacter:function(){
				var next=game.createEvent('chooseCharacter',false);
				next.showConfig=true;
				next.addPlayer=true;
				next.ai=function(player,list,back){
					if(_status.brawl&&_status.brawl.chooseCharacterAi){
						if(_status.brawl.chooseCharacterAi(player,list,back)!==false){
							return;
						}
					}
					var filterChoice=function(name1,name2){
						if(get.config('qunxionggeju')) return true;
						if(get.is.double(name1)) return false;
						var group1=lib.character[name1][1];
						var group2=lib.character[name2][1];
						if(group1=='ye') return group2!='ye';
						var double=get.is.double(name2,true);
						if(double) return double.contains(group1);
						return group1==group2;
					};
					for(var i=0;i<list.length-1;i++){
						for(var j=i+1;j<list.length;j++){
							if(filterChoice(list[i],list[j])||filterChoice(list[j],list[i])){
								var mainx=list[i];
								var vicex=list[j];
								if(!filterChoice(mainx,vicex)||(filterChoice(vicex,mainx)&&get.guozhanReverse(mainx,vicex))){
									mainx=list[j];
									vicex=list[i];
								}
								player.init(mainx,vicex,false);
								if(back){
									list.remove(player.name1);
									list.remove(player.name2);
									for(var i=0;i<list.length;i++){
										back.push(list[i]);
									}
								}
								return;
							}
						}
					}
				}
				next.setContent(function(){
					"step 0"
					ui.arena.classList.add('choose-character');
					var addSetting=function(dialog){
						dialog.add('选择座位').classList.add('add-setting');
						var seats=document.createElement('table');
						seats.classList.add('add-setting');
						seats.style.margin='0';
						seats.style.width='100%';
						seats.style.position='relative';
						for(var i=1;i<=game.players.length;i++){
							var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
							td.innerHTML='<span>'+get.cnNumber(i,true)+'</span>';
							td.link=i-1;
							seats.appendChild(td);
							td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
								if(_status.dragged) return;
								if(_status.justdragged) return;
								if(_status.cheat_seat){
									_status.cheat_seat.classList.remove('bluebg');
									if(_status.cheat_seat==this){
										delete _status.cheat_seat;
										return;
									}
								}
								this.classList.add('bluebg');
								_status.cheat_seat=this;
							});
						}
						dialog.content.appendChild(seats);
						if(game.me==game.zhu){
							seats.previousSibling.style.display='none';
							seats.style.display='none';
						}

						dialog.add(ui.create.div('.placeholder.add-setting'));
						dialog.add(ui.create.div('.placeholder.add-setting'));
						if(get.is.phoneLayout()) dialog.add(ui.create.div('.placeholder.add-setting'));
					};
					var removeSetting=function(){
						var dialog=_status.event.dialog;
						if(dialog){
							dialog.style.height='';
							delete dialog._scrollset;
							var list=Array.from(dialog.querySelectorAll('.add-setting'));
							while(list.length){
								list.shift().remove();
							}
							ui.update();
						}
					};
					event.addSetting=addSetting;
					event.removeSetting=removeSetting;

					var chosen=lib.config.continue_name||[];
					game.saveConfig('continue_name');
					event.chosen=chosen;

					var i;
					event.list=[];
					for(i in lib.character){
						if(i.indexOf('gz_shibing')==0) continue;
						if(chosen.contains(i)) continue;
						if(lib.filter.characterDisabled(i)) continue;
						if(get.config('onlyguozhan')){
							if(!lib.characterPack.mode_guozhan[i]) continue;
							if(get.is.jun(i)) continue;
						}
						if(lib.character[i][4].contains('hiddenSkill')) continue;
						if(lib.character[i][2]==3||lib.character[i][2]==4||lib.character[i][2]==5)
						event.list.push(i);
					}
					_status.characterlist=event.list.slice(0);
					_status.yeidentity=[];
					if(_status.brawl&&_status.brawl.chooseCharacterFilter){
						event.list=_status.brawl.chooseCharacterFilter(event.list);
					}
					event.list.randomSort();
					// var list=event.list.splice(0,parseInt(get.config('choice_num')));
					var list;
					if(_status.brawl&&_status.brawl.chooseCharacter){
						list=_status.brawl.chooseCharacter(event.list,game.me);
					}
					else{
						list=game.getCharacterChoice(event.list,parseInt(get.config('choice_num')));
					}
					if(_status.auto){
						event.ai(game.me,list);
						lib.init.onfree();
					}
					else if(chosen.length){
						game.me.init(chosen[0],chosen[1],false);
						lib.init.onfree();
					}
					else{
						var dialog=ui.create.dialog('选择角色','hidden',[list,'character']);
						if(!_status.brawl||!_status.brawl.noAddSetting){
							if(get.config('change_identity')){
								addSetting(dialog);
							}
						}
						var next=game.me.chooseButton(dialog,true,2).set('onfree',true);
						next.filterButton=function(button){
							if(get.config('qunxionggeju')){
								if(ui.dialog.buttons.length<=10){
									for(var i=0;i<ui.dialog.buttons.length;i++){
										if(ui.dialog.buttons[i]!=button){
											if(lib.element.player.perfectPair.call({
												name1:button.link,name2:ui.dialog.buttons[i].link
											})){
												button.classList.add('glow2');
											}
										}
									}
								}
								return true;
							}
							if(ui.dialog.buttons.length<=10){
								for(var i=0;i<ui.dialog.buttons.length;i++){
									if(ui.dialog.buttons[i]!=button){
										if(lib.element.player.perfectPair.call({
											name1:button.link,name2:ui.dialog.buttons[i].link
										})){
											button.classList.add('glow2');
										}
									}
								}
							}
							if(lib.character[button.link][4].contains('hiddenSkill')) return false;
							if(ui.selected.buttons.length==0){
								if(get.is.double(button.link)) return false;
								if(lib.character[button.link][1]=='ye') return true;
								for(var i=0;i<ui.dialog.buttons.length;i++){
									var double=get.is.double(ui.dialog.buttons[i].link,true);
									if(ui.dialog.buttons[i]!=button&&(lib.character[button.link][1]==lib.character[ui.dialog.buttons[i].link][1]||double&&double.contains(lib.character[button.link][1]))){
										return true;
									}
								}
								return false;
							};
							if(!lib.character[button.link]||lib.character[button.link][1]=='ye') return false;
							if(get.is.double(ui.selected.buttons[0].link)) return false;
							if(lib.character[ui.selected.buttons[0].link][1]=='ye') return true;
							if(get.is.double(button.link)) return get.is.double(button.link,true).contains(lib.character[ui.selected.buttons[0].link][1]);
							return (lib.character[button.link][1]==lib.character[ui.selected.buttons[0].link][1]);
						};
						next.switchToAuto=function(){
							event.ai(game.me,list);
							ui.arena.classList.remove('selecting');
						};
						var createCharacterDialog=function(){
							event.dialogxx=ui.create.characterDialog('heightset',function(i){
								if(i.indexOf('gz_shibing')==0) return true;
								if(get.config('onlyguozhan')){
									if(!lib.characterPack.mode_guozhan[i]) return true;
									if(get.is.jun(i)) return true;
								}
							},get.config('onlyguozhanexpand')?'expandall':undefined,get.config('onlyguozhan')?'onlypack:mode_guozhan':undefined);
							if(ui.cheat2){
								ui.cheat2.animate('controlpressdownx',500);
								ui.cheat2.classList.remove('disabled');
							}
						};
						if(lib.onfree){
							lib.onfree.push(createCharacterDialog);
						}
						else{
							createCharacterDialog();
						}
						ui.create.cheat2=function(){
							ui.cheat2=ui.create.control('自由选将',function(){
								if(this.dialog==_status.event.dialog){
									if(game.changeCoin){
										game.changeCoin(50);
									}
									this.dialog.close();
									_status.event.dialog=this.backup;
									this.backup.open();
									delete this.backup;
									game.uncheck();
									game.check();
									if(ui.cheat){
										ui.cheat.animate('controlpressdownx',500);
										ui.cheat.classList.remove('disabled');
									}
								}
								else{
									if(game.changeCoin){
										game.changeCoin(-10);
									}
									this.backup=_status.event.dialog;
									_status.event.dialog.close();
									_status.event.dialog=_status.event.parent.dialogxx;
									this.dialog=_status.event.dialog;
									this.dialog.open();
									game.uncheck();
									game.check();
									if(ui.cheat){
										ui.cheat.classList.add('disabled');
									}
								}
							});
							if(lib.onfree){
								ui.cheat2.classList.add('disabled');
							}
						}
						ui.create.cheat=function(){
							_status.createControl=ui.cheat2;
							ui.cheat=ui.create.control('更换',function(){
								if(ui.cheat2&&ui.cheat2.dialog==_status.event.dialog){
									return;
								}
								if(game.changeCoin){
									game.changeCoin(-3);
								}
								event.list=event.list.concat(list);
								event.list.randomSort();
								// list=event.list.splice(0,parseInt(get.config('choice_num')));
								list=game.getCharacterChoice(event.list,parseInt(get.config('choice_num')));
								var buttons=ui.create.div('.buttons');
								var node=_status.event.dialog.buttons[0].parentNode;
								_status.event.dialog.buttons=ui.create.buttons(list,'character',buttons);
								_status.event.dialog.content.insertBefore(buttons,node);
								buttons.animate('start');
								node.remove();
								game.uncheck();
								game.check();
							});
							delete _status.createControl;
						}
						if(!_status.brawl||!_status.brawl.chooseCharacterFixed){
							if(!ui.cheat&&get.config('change_choice'))
							ui.create.cheat();
							if(!ui.cheat2&&get.config('free_choose'))
							ui.create.cheat2();
						}
					}
					"step 1"
					if(ui.cheat){
						ui.cheat.close();
						delete ui.cheat;
					}
					if(ui.cheat2){
						ui.cheat2.close();
						delete ui.cheat2;
					}
					if(result.buttons){
						game.me.init(result.buttons[0].link,result.buttons[1].link,false);
						game.addRecentCharacter(result.buttons[0].link,result.buttons[1].link);
					}
					// game.me.setIdentity(game.me.group);
					event.list.remove(game.me.name1);
					event.list.remove(game.me.name2);
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]!=game.me){
							event.ai(game.players[i],game.getCharacterChoice(event.list,parseInt(get.config('choice_num'))),event.list);
						}
					}
					for(var i=0;i<game.players.length;i++){
						game.players[i].classList.add('unseen');
						game.players[i].classList.add('unseen2');
						_status.characterlist.remove(game.players[i].name);
						_status.characterlist.remove(game.players[i].name2);
						if(game.players[i]!=game.me){
							game.players[i].node.identity.firstChild.innerHTML='猜';
							game.players[i].node.identity.dataset.color='unknown';
							game.players[i].node.identity.classList.add('guessing');
						}
						game.players[i].hiddenSkills=lib.character[game.players[i].name1][3].slice(0);
						var hiddenSkills2=lib.character[game.players[i].name2][3];
						for(var j=0;j<hiddenSkills2.length;j++){
							game.players[i].hiddenSkills.add(hiddenSkills2[j]);
						}
						for(var j=0;j<game.players[i].hiddenSkills.length;j++){
							if(!lib.skill[game.players[i].hiddenSkills[j]]){
								game.players[i].hiddenSkills.splice(j--,1);
							}
						}
						game.players[i].group='unknown';
						game.players[i].sex='unknown';
						game.players[i].name1=game.players[i].name;
						game.players[i].name='unknown';
						game.players[i].identity='unknown';
						game.players[i].node.name.show();
						game.players[i].node.name2.show();
						game.players[i]._group=lib.character[game.players[i].name1][1];
						for(var j=0;j<game.players[i].hiddenSkills.length;j++){
							game.players[i].addSkillTrigger(game.players[i].hiddenSkills[j],true);
						}
					}
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);
				});
			},
			chooseCharacterOL:function(){
				var next=game.createEvent('chooseCharacter',false);
				next.setContent(function(){
					'step 0'
					game.broadcastAll(function(){
						ui.arena.classList.add('choose-character');
					});
					var list=[];
					//if(lib.configOL.onlyguozhan){
						//list=[];
						for(var i in lib.characterPack.mode_guozhan){
							if(i.indexOf('gz_shibing')==0) continue;
							if(get.is.jun(i)) continue;
							if(lib.config.guozhan_banned&&lib.config.guozhan_banned.contains(i)) continue;
							list.push(i);
						}
					//}
					//else{
					//	list=get.charactersOL(function(i){
					//		return lib.character[i][4].contains('hiddenSkill');
					//	});
					//}
					_status.characterlist=list.slice(0);
					_status.yeidentity=[];
					event.list=list.slice(0);
					var list2=[];
					var num;
					if(lib.configOL.number*6>list.length){
						num=5;
					}
					else if(lib.configOL.number*7>list.length){
						num=6;
					}
					else{
						num=7;
					}
					var filterButton=function(button){
						if(get.config('qunxionggeju')&&ui.dialog){
							if(ui.dialog.buttons.length<=10){
								for(var i=0;i<ui.dialog.buttons.length;i++){
									if(ui.dialog.buttons[i]!=button){
										if(lib.element.player.perfectPair.call({
											name1:button.link,name2:ui.dialog.buttons[i].link
										})){
											button.classList.add('glow2');
										}
									}
								}
							}
							return true;
						}
						if(ui.dialog){
							if(ui.dialog.buttons.length<=10){
								for(var i=0;i<ui.dialog.buttons.length;i++){
									if(ui.dialog.buttons[i]!=button){
										if(lib.element.player.perfectPair.call({
											name1:button.link,name2:ui.dialog.buttons[i].link
										})){
											button.classList.add('glow2');
										}
									}
								}
							}
						}
						if(ui.selected.buttons.length==0){
							if(get.is.double(button.link)) return false;
							if(lib.character[button.link][1]=='ye') return true;
							for(var i=0;i<ui.dialog.buttons.length;i++){
								var double=get.is.double(ui.dialog.buttons[i].link,true);
								if(ui.dialog.buttons[i]!=button&&(lib.character[button.link][1]==lib.character[ui.dialog.buttons[i].link][1]||double&&double.contains(lib.character[button.link][1]))){
									return true;
								}
							}
							return false;
						};
						if(!lib.character[button.link]||lib.character[button.link][1]=='ye') return false;
						if(lib.character[ui.selected.buttons[0].link][1]=='ye') return true;
						if(get.is.double(ui.selected.buttons[0].link)) return false;
						if(get.is.double(button.link)) return get.is.double(button.link,true).contains(lib.character[ui.selected.buttons[0].link][1]);
						return (lib.character[button.link][1]==lib.character[ui.selected.buttons[0].link][1]);
					};
					list.randomSort();
					for(var i=0;i<game.players.length;i++){
						list2.push([game.players[i],['选择角色',[game.getCharacterChoice(list,num),'character']],2,
						true,function(){return Math.random()},filterButton]);
					}
					game.me.chooseButtonOL(list2,function(player,result){
						if(game.online||player==game.me) player.init(result.links[0],result.links[1],false);
					}).set('switchToAuto',function(){
						_status.event.result='ai';
					}).set('processAI',function(){
						var buttons=_status.event.dialog.buttons;
						var filterChoice=function(name1,name2){
							if(get.config('qunxionggeju')) return true;
							if(get.is.double(name1)) return false;
							var group1=lib.character[name1][1];
							var group2=lib.character[name2][1];
							if(group1=='ye') return group2!='ye';
							var double=get.is.double(name2,true);
							if(double) return double.contains(group1);
							return group1==group2;
						};
						for(var i=0;i<buttons.length-1;i++){
							for(var j=i+1;j<buttons.length;j++){
								if(filterChoice(buttons[i].link,buttons[j].link)||filterChoice(buttons[j].link,buttons[i].link)){
									var mainx=buttons[i].link;
									var vicex=buttons[j].link;
									if(!filterChoice(mainx,vicex)||(filterChoice(vicex,mainx)&&get.guozhanReverse(mainx,vicex))){
										mainx=buttons[j].link;
										vicex=buttons[i].link;
									}
									var list=[mainx,vicex];
									return {
										bool:true,
										links:list,
									}
								}
							}
						}
					});
					'step 1'
					var sort=true;
					for(var i in result){
						if(result[i]&&result[i].links){
							for(var j=0;j<result[i].links.length;j++){
								event.list.remove(result[i].links[j]);
							}
						}
					}
					for(var i in result){
						if(result[i]=='ai'||!result[i].links||result[i].links.length<1){
							if(sort){
								sort=false;
								event.list.randomSort();
							}
							result[i]=[event.list.shift()];
							var group=lib.character[result[i][0]][1];
							for(var j=0;j<event.list.length;j++){
								if(lib.character[event.list[j]][1]==group){
									result[i].push(event.list[j]);
									event.list.splice(j--,1);
									break;
								}
							}
						}
						else{
							result[i]=result[i].links
						}
						if(!lib.playerOL[i].name){
							lib.playerOL[i].init(result[i][0],result[i][1],false);
						}
					}

					for(var i=0;i<game.players.length;i++){
						_status.characterlist.remove(game.players[i].name);
						_status.characterlist.remove(game.players[i].name2);
						game.players[i].hiddenSkills=lib.character[game.players[i].name1][3].slice(0);
						var hiddenSkills2=lib.character[game.players[i].name2][3];
						for(var j=0;j<hiddenSkills2.length;j++){
							game.players[i].hiddenSkills.add(hiddenSkills2[j]);
						}
						for(var j=0;j<game.players[i].hiddenSkills.length;j++){
							if(!lib.skill[game.players[i].hiddenSkills[j]]){
								game.players[i].hiddenSkills.splice(j--,1);
							}
						}
						for(var j=0;j<game.players[i].hiddenSkills.length;j++){
							game.players[i].name1=game.players[i].name;
							game.players[i].addSkillTrigger(game.players[i].hiddenSkills[j],true);
						}
					}
					game.broadcastAll(function(result){
						for(var i in result){
							if(!lib.playerOL[i].name){
								lib.playerOL[i].init(result[i][0],result[i][1],false);
							}
						}
						for(var i=0;i<game.players.length;i++){
							game.players[i].classList.add('unseen');
							game.players[i].classList.add('unseen2');
							if(game.players[i]!=game.me){
								game.players[i].node.identity.firstChild.innerHTML='猜';
								game.players[i].node.identity.dataset.color='unknown';
								game.players[i].node.identity.classList.add('guessing');
							}
							game.players[i].hiddenSkills=lib.character[game.players[i].name1][3].slice(0);
							var hiddenSkills2=lib.character[game.players[i].name2][3];
							for(var j=0;j<hiddenSkills2.length;j++){
								game.players[i].hiddenSkills.add(hiddenSkills2[j]);
							}
							for(var j=0;j<game.players[i].hiddenSkills.length;j++){
								if(!lib.skill[game.players[i].hiddenSkills[j]]){
									game.players[i].hiddenSkills.splice(j--,1);
								}
							}
							game.players[i].group='unknown';
							game.players[i].sex='unknown';
							game.players[i].name1=game.players[i].name;
							game.players[i].name='unknown';
							game.players[i].identity='unknown';
							game.players[i].node.name.show();
							game.players[i].node.name2.show();
							game.players[i]._group=lib.character[game.players[i].name2][1];
						}
						setTimeout(function(){
							ui.arena.classList.remove('choose-character');
						},500);
					},result);
				});
			}
		},
		ui:{
			click:{
				// identity:function(){
				// 	if(this.touched) {this.touched=false;return;}
				// 	_status.clicked=true;
				// 	if(this.parentNode.isUnseen()&&this.parentNode!=game.me){
				// 		switch(this.firstChild.innerHTML){
				// 			case '魏':this.firstChild.innerHTML='蜀';this.dataset.color='shu';break;
				// 			case '蜀':this.firstChild.innerHTML='吴';this.dataset.color='wu';break;
				// 			case '吴':this.firstChild.innerHTML='群';this.dataset.color='qun';break;
				// 			case '群':this.firstChild.innerHTML='野';this.dataset.color='ye';break;
				// 			case '野':this.firstChild.innerHTML='猜';this.dataset.color='unknown';break;
				// 			default:this.firstChild.innerHTML='魏';this.dataset.color='wei';break;
				// 		}
				// 	}
				// }
			}
		},
		translate:{
			ye:'野',
			ye2:'野心家',
			yexinjia_mark:'野心家',
			bumingzhi:'不明置',
			mingzhizhujiang:'明置主将',
			mingzhifujiang:'明置副将',
			tongshimingzhi:'同时明置',
			mode_guozhan_character_config:'国战武将',
			_zhenfazhaohuan:'阵法召唤',
			_zhenfazhaohuan_info:'由拥有阵法技的角色发起，满足此阵法技条件的未确定势力角色均可按逆时针顺序依次明置其一张武将牌(响应阵法召唤)，以发挥阵法技的效果。',
			junling:'军令',
			junling1:'军令一',
			junling1_bg:'令',
			junling1_info:'若被执行，执行者对发起者指定的一名角色造成一点伤害。',
			junling2:'军令二',
			junling2_bg:'令',
			junling2_info:'若被执行，执行者摸一张牌，然后依次交给发起者两张牌。',
			junling3:'军令三',
			junling3_bg:'令',
			junling3_info:'若被执行，执行者失去一点体力。',
			junling4:'军令四',
			junling4_bg:'令',
			junling4_info:'若被执行，直到回合结束，执行者不能使用或打出手牌且非锁定技全部失效。',
			junling4_eff:'军令四',
			junling5:'军令五',
			junling5_bg:'令',
			junling5_info:'若被执行，执行者将武将牌叠置，且不能回复体力直到回合结束。',
			junling5_eff:'军令五',
			junling6:'军令六',
			junling6_bg:'令',
			junling6_info:'若被执行，执行者选择一张手牌和一张装备区内牌（若有），然后弃置其余的牌。',
			_guozhan_marks:'标记',
			_guozhan_marks_backup:'标记',
			xianqu_mark:"先驱",
			zhulianbihe_mark:"珠联璧合",
			yinyang_mark:"阴阳鱼",
			_zhulianbihe_mark_tao:"珠联",
			_yinyang_mark_add:"阴阳鱼",
			yinyang_add:"阴阳鱼",
			"fengyin_main":"封印[主将]",
			"fengyin_main_info":"",
			"fengyin_vice":"封印[副将]",
			"fengyin_vice_info":"",
			"_mingzhisuodingji":"亮将",
			"_mingzhisuodingji_info":"出牌阶段，你可以明置拥有“锁定技”的武将牌。",
			_lianheng:'合纵',
			lianheng_tag:'合',
			guo_tag:'国',
			gz_shibing1sst_light:'光兵',
			gz_shibing2sst_light:'光兵',
			gz_shibing1sst_dark:'暗兵',
			gz_shibing2sst_dark:'暗兵',
			gz_shibing1sst_spirit:'魂兵',
			gz_shibing2sst_spirit:'魂兵',
			gz_shibing1sst_reality:'现兵',
			gz_shibing2sst_reality:'现兵',
			gz_shibing1sst_smash:'斗兵',
			gz_shibing2sst_smash:'斗兵',
			gz_shibing1ye:'士兵',
			gz_shibing2ye:'士兵',
			guozhan_default:"国战标准",
			guozhan_zhen:"君临天下·阵",
			guozhan_shi:"君临天下·势",
			guozhan_bian:"君临天下·变",
			guozhan_quan:"君临天下·权",
			guozhan_jun:"君主武将",
			guozhan_jin:'文德武备',
			guozhan_single:'君临天下EX',
			guozhan_double:'双势力武将',
			guozhan_yexinjia:'野心家武将',
			guozhan_zongheng:'纵横捭阖',
			guozhan_others:"其他",
			//国战武将
			//修改技能
			gz_sst_qiji:"奇迹",
			gz_sst_qiji_info:"出牌阶段每种选项各限一次：1. 你可以叠置，令一名角色摸三张牌；2. 你可以弃置三张牌，令一名角色叠置。",
			gz_sst_zhuansheng:"转生",
			gz_sst_zhuansheng_info:"限定技，一名角色死亡前，你可以弃置你区域内的所有牌，令其变更副将，然后回复体力至上限的一半。",
			gz_sst_furan:"复燃",
			gz_sst_furan_info:"限定技，锁定技，当你处于濒死状态时，弃置所有手牌，将体力回复至1点。",
			sst_jinjia_info:"锁定技，每当你受到一点伤害前，你令此伤害减1，若此前你于本回合以此法减少过伤害，你叠置，失去〖金甲〗。",
			gz_sst_shengxi:"圣袭",
			gz_sst_shengxi2:"圣袭",
			gz_sst_shengxi4:"圣袭",
			gz_sst_shengxi4_backup:"圣袭",
			gz_sst_shengxi_info:"你使用牌指定目标时，或你成为牌的目标时，使用牌的角色可以将一名目标角色一张手牌移出游戏；一名角色可以使用以此法移出游戏的牌。",
			gz_sst_xuelun:"血轮",
			gz_sst_xuelun_info:"锁定技，你死亡后，杀死你的角色获得〖血轮〗。",
			gz_sst_shengyi:"圣裔",
			gz_sst_shengyi_info:"副将技，此武将牌减少半个阴阳鱼。准备阶段，若此回合因〖溯行〗执行或你没有手牌，你获得技能〖寒芒〗〖摧锋〗直到回合结束。",
			//国战技能
			gz_sst_qixiao:"奇嚣",
			gz_sst_qixiao2:"奇嚣",
			gz_sst_qixiao3:"奇嚣",
			gz_sst_qixiao_info:"锁定技，准备阶段，若你没有先驱标记，你获得一个先驱标记；你使用先驱标记时，将你本回合手牌上限改为X；结束阶段，若你有先驱标记，你失去一点体力。（X为使用先驱标记时你的手牌数且至多为4）",
			sst_zhongpao:"重炮",
			sst_zhongpao_info:"锁定技，你使用牌对一名角色造成伤害后，你须弃置一张牌或失去1点体力，然后对该角色造成1点伤害。",
			sst_zhengshi:"整势",
			sst_zhengshi_info:"锁定技，当你明置此武将牌时，所有同势力角色获得一个珠联璧合标记。",
			sst_muyuan:"睦援",
			sst_muyuan2:"睦援",
			sst_muyuan_info:"锁定技，同势力角色每有一个珠联璧合或先驱标记，其摸牌阶段摸牌数与出牌阶段使用杀的次数上限便+1。",
			sst_zhulianbihe_skill:"大乱斗·珠联璧合",
			sst_zhulianbihe_skill_info:"",
			sst_zhulianbihe_skill_draw:"大乱斗·珠联·摸牌",
			sst_zhulianbihe_skill_draw_info:"",
			sst_zhulianbihe_skill_tao:"大乱斗·珠联·桃",
			sst_zhulianbihe_skill_tao_info:"",
			gz_sst_chengli:"逞力",
			gz_sst_chengli2:"逞力",
			gz_sst_chengli3:"逞力",
			gz_sst_chengli_backup:"逞力",
			gz_sst_chengli_info:"你可以视为使用一张基本牌或普通锦囊牌，然后你不能再于此体力值发动此技能。",
			sst_baoling:"暴凌",
			sst_baoling_info:"主将技，锁定技，出牌阶段结束时，若你有副将，则你移除副将，然后加3点体力上限，回复3点体力，失去技能〖暴凌〗并获得〖崩坏〗。",
			sst_benghuai:"崩坏",
			sst_benghuai_info:"结束阶段，若你的体力不是全场最少的（或之一），你须减1点体力或体力上限。",
			gz_sst_anzhi:"安智",
			gz_sst_anzhi2:"安智",
			gz_sst_anzhi_info:"出牌阶段开始时，你可以获得一名其他角色的一张牌，若如此做，结束阶段，你须交给一名其他角色一张牌。",
			gz_sst_yinjie:"印结",
			gz_sst_yinjie2:"印结",
			gz_sst_yinjie_info:"出牌阶段限一次，你可以用牌堆顶的一张牌与一名其他角色拼点，没赢的角色本回合不能使用牌。",
			gz_sst_yice:"议策",
			gz_sst_yice_info:"出牌阶段限一次，你可以将一张牌当作【知己知彼】使用，然后此牌目标角色可以将一张与此牌颜色不同的牌当作【远交近攻】对你使用。",
			gz_sst_hongyan:"红颜",
			gz_sst_hongyan_info:"锁定技，你区域内的♠牌和♠判定牌均视为♥。当你于回合外正面朝上失去♥牌后，若你的手牌数小于体力值，你摸一张牌。",
			sst_shenao:"神凹",
			sst_shenao2:"神凹",
			sst_shenao3:"神凹",
			sst_shenao_info:"出牌阶段限一次，你可以将所有手牌（至少一张）当作无距离限制且不计入使用次数的的杀对一名不同势力的角色使用；若以此法造成了伤害，你将手牌补至体力上限。",
			gz_sst_yujun:"驭军",
			gz_sst_yujun2:"驭军",
			gz_sst_yujun_info:"阵法技，与你处于同一队列的角色使用牌不可被响应。",
			gz_sst_xiduo:"袭夺",
			gz_sst_xiduo2:"袭夺",
			gz_sst_xiduo3:"袭夺",
			gz_sst_xiduo_info:"锁定技，回合开始时，当前处于同一队列的其他势力角色技能失效且视为在你攻击范围内直到回合结束。",
			sst_tunxing:"吞星",
			sst_tunxing_info:"你明置此武将牌时，你可以弃置任意名手牌数大于你的角色的两张牌。",
			gz_sst_douhun:"斗魂",
			gz_sst_douhun2:"斗魂",
			gz_sst_douhun_info:"锁定技，你使用【杀】指定唯一目标或你成为【杀】的唯一目标时，取消之，然后视为对方对你使用一张【决斗】；【决斗】流程内，你的手牌均视为【杀】。",
			sst_shuangguan:"双关",
			sst_shuangguan_info:"出牌阶段，当你使用第偶数张牌时，若此牌名称的字数与你使用的上一张牌相同，你可以弃置一名角色一张牌。",
			sst_langu:"懒骨",
			sst_langu_info:"出牌阶段限一次，你可以叠置，视为使用一张【联军盛宴】。",
			gz_ska_shenqi:"神祇",
			gz_ska_shenqi_info:"一名角色受到伤害后，你可以令一名本轮未以此法摸过三张牌的角色摸一张牌。",
			gz_ska_zhefu:"折赋",
			gz_ska_zhefu_info:"出牌阶段限一次，你可以交给一名其他角色一张牌，然后其可以使用此牌。",
			ska_sheran:"舍燃",
			ska_sheran_info:"主将技，此武将牌减少半个阴阳鱼。出牌阶段，你可以弃置三张手牌并对一名其他角色造成2点火焰伤害。若如此做，你移除此武将牌，然后你可以令一名角色摸两张牌并获得〖激行〗。",
			gz_ymk_yunchou:"运筹",
			gz_ymk_yunchou2:"运筹",
			gz_ymk_yunchou_info:"弃牌阶段开始前，你可以弃置至多为你体力上限的牌，若如此做，结束阶段，你摸等量的牌。",
			gz_ymk_guimou:"鬼谋",
			gz_ymk_guimou_info:"一名角色的判定结果生效前，你可观看牌堆顶或牌堆底的X张牌（X为此角色的体力值），然后用其中一张牌代替之。",
			gz_ska_jiyan:"籍验",
			gz_ska_jiyan_sha:"籍验·杀",
			gz_ska_jiyan_shan:"籍验·闪",
			gz_ska_jiyan_tao:"籍验·桃",
			gz_ska_jiyan_jiu:"籍验·酒",
			gz_ska_jiyan_info:"副将技，此武将牌减少半个阴阳鱼。每轮限一次，你可以视为使用或打出一张【杀】/【闪】/【桃】/【酒】。",
			sst_paozhi:"抛枝",
			sst_paozhi_info:"锁定技，你的手牌均可合纵。",
			gz_ymk_kaibai:"开摆",
			gz_ymk_kaibai_info:"每回合限一次，当你成为一名角色使用非装备牌的目标时，你可以弃置所有手牌并判定，然后你摸X张牌（X为你判定牌的点数）。若此牌对你造成了伤害，你弃置一半手牌（向下取整）。"
		},
		junList:[],
		guozhanPile_yingbian:[
			['spade',1,'juedou'],
			['spade',1,'shandian'],
			['spade',2,'cixiong'],
			['spade',2,'bagua'],
			['spade',2,'taigongyinfu'],
			['spade',3,'shuiyanqijunx',null,['yingbian_zhuzhan']],
			['spade',3,'zhujinqiyuan',null,['yingbian_zhuzhan']],
			['spade',4,'guohe'],
			['spade',4,'shuiyanqijunx',null,['yingbian_zhuzhan']],
			['spade',5,'sha'],
			['spade',5,'jueying'],
			['spade',6,'qinggang'],
			['spade',6,'sha','ice'],
			['spade',7,'sha'],
			['spade',7,'sha','ice'],
			['spade',8,'sha','ice'],
			['spade',8,'sha','ice'],
			['spade',9,'sha'],
			['spade',9,'jiu'],
			['spade',10,'sha',null,['yingbian_canqu']],
			['spade',10,'bingliang'],
			['spade',11,'sha',null,['yingbian_canqu']],
			['spade',11,'wuxie',null,['yingbian_kongchao']],
			['spade',12,'zhangba'],
			['spade',12,'tiesuo'],
			['spade',13,'nanman',null,['yingbian_fujia']],
			['spade',13,'wutiesuolian'],

			['heart',1,'taoyuan'],
			['heart',1,'wanjian'],
			['heart',2,'shan'],
			['heart',2,'chuqibuyi',null,['yingbian_zhuzhan']],
			['heart',3,'wugu'],
			['heart',3,'chuqibuyi',null,['yingbian_zhuzhan']],
			['heart',4,'tao'],
			['heart',4,'sha','fire',['yingbian_canqu']],
			['heart',5,'qilin'],
			['heart',5,'chitu'],
			['heart',6,'tao'],
			['heart',6,'lebu'],
			['heart',7,'tao'],
			['heart',7,'dongzhuxianji'],
			['heart',8,'tao'],
			['heart',8,'dongzhuxianji'],
			['heart',9,'tao'],
			['heart',9,'yuanjiao'],
			['heart',10,'tao'],
			['heart',10,'sha'],
			['heart',11,'shan'],
			['heart',11,'yiyi'],
			['heart',12,'tao'],
			['heart',12,'sha'],
			['heart',12,'guohe'],
			['heart',13,'shan'],
			['heart',13,'zhuahuang'],

			['diamond',1,'zhuge'],
			['diamond',1,'wuxinghelingshan'],
			['diamond',2,'shan'],
			['diamond',2,'tao'],
			['diamond',3,'shan'],
			['diamond',3,'shunshou'],
			['diamond',4,'yiyi'],
			['diamond',4,'sha','fire',['yingbian_canqu']],
			['diamond',5,'guanshi'],
			['diamond',5,'sha','fire'],
			['diamond',6,'shan'],
			['diamond',6,'wuliu'],
			['diamond',7,'shan',null,['yingbian_kongchao']],
			['diamond',7,'shan',null,['yingbian_kongchao']],
			['diamond',8,'shan',null,['yingbian_kongchao']],
			['diamond',8,'shan',null,['yingbian_kongchao']],
			['diamond',9,'shan'],
			['diamond',9,'jiu'],
			['diamond',10,'shan'],
			['diamond',10,'sha'],
			['diamond',11,'shan'],
			['diamond',11,'sha'],
			['diamond',12,'sha'],
			['diamond',12,'sanjian'],
			['diamond',12,'wuxie',null,['guo']],
			['diamond',13,'shan'],
			['diamond',13,'zixin'],

			['club',1,'juedou'],
			['club',1,'huxinjing'],
			['club',2,'sha'],
			['club',2,'tengjia'],
			['club',2,'renwang'],
			['club',3,'guohe'],
			['club',3,'zhibi'],
			['club',4,'sha',null,['yingbian_kongchao']],
			['club',4,'zhibi'],
			['club',5,'sha',null,['yingbian_kongchao']],
			['club',5,'tongque'],
			['club',6,'lebu'],
			['club',6,'sha','thunder'],
			['club',7,'nanman'],
			['club',7,'sha','thunder'],
			['club',8,'sha'],
			['club',8,'sha','thunder'],
			['club',9,'sha'],
			['club',9,'jiu'],
			['club',10,'sha'],
			['club',10,'bingliang'],
			['club',11,'sha'],
			['club',11,'sha'],
			['club',12,'zhujinqiyuan',null,['yingbian_zhuzhan']],
			['club',12,'tiesuo'],
			['club',13,'wuxie',null,['guo']],
			['club',13,'tiesuo'],
		],
		guozhanPile_old:[
			['spade',1,'juedou'],
			['spade',1,'shandian'],
			['spade',2,'cixiong'],
			['spade',2,'bagua'],
			['spade',2,'hanbing'],
			['spade',3,'guohe'],
			['spade',3,'shunshou'],
			['spade',4,'guohe'],
			['spade',4,'shunshou'],
			['spade',5,'sha'],
			['spade',5,'jueying'],
			['spade',6,'qinggang'],
			['spade',6,'sha','thunder'],
			['spade',7,'sha'],
			['spade',7,'sha','thunder'],
			['spade',8,'sha'],
			['spade',8,'sha'],
			['spade',9,'sha'],
			['spade',9,'jiu'],
			['spade',10,'sha'],
			['spade',10,'bingliang'],
			['spade',11,'sha'],
			['spade',11,'wuxie'],
			['spade',12,'zhangba'],
			['spade',12,'tiesuo'],
			['spade',13,'nanman'],
			['spade',13,'dawan'],

			['club',1,'juedou'],
			['club',1,'baiyin'],
			['club',2,'sha'],
			['club',2,'tengjia'],
			['club',2,'renwang'],
			['club',3,'sha'],
			['club',3,'zhibi'],
			['club',4,'sha'],
			['club',4,'zhibi'],
			['club',5,'sha'],
			['club',5,'dilu'],
			['club',6,'lebu'],
			['club',6,'sha','thunder'],
			['club',7,'nanman'],
			['club',7,'sha','thunder'],
			['club',8,'sha'],
			['club',8,'sha','thunder'],
			['club',9,'sha'],
			['club',9,'jiu'],
			['club',10,'sha'],
			['club',10,'bingliang'],
			['club',11,'sha'],
			['club',11,'sha'],
			['club',12,'jiedao'],
			['club',12,'tiesuo'],
			['club',13,'wuxie',null,['guo']],
			['club',13,'tiesuo'],

			['diamond',1,'zhuge'],
			['diamond',1,'zhuque'],
			['diamond',2,'shan'],
			['diamond',2,'tao'],
			['diamond',3,'shan'],
			['diamond',3,'shunshou'],
			['diamond',4,'yiyi'],
			['diamond',4,'sha','fire'],
			['diamond',5,'guanshi'],
			['diamond',5,'sha','fire'],
			['diamond',6,'shan'],
			['diamond',6,'wuliu'],
			['diamond',7,'shan'],
			['diamond',7,'shan'],
			['diamond',8,'shan'],
			['diamond',8,'shan'],
			['diamond',9,'shan'],
			['diamond',9,'jiu'],
			['diamond',10,'shan'],
			['diamond',10,'sha'],
			['diamond',11,'shan'],
			['diamond',11,'sha'],
			['diamond',12,'sha'],
			['diamond',12,'sanjian'],
			['diamond',12,'wuxie',null,['guo']],
			['diamond',13,'shan'],
			['diamond',13,'zixin'],

			['heart',1,'taoyuan'],
			['heart',1,'wanjian'],
			['heart',2,'shan'],
			['heart',2,'huogong'],
			['heart',3,'wugu'],
			['heart',3,'huogong'],
			['heart',4,'tao'],
			['heart',4,'sha','fire'],
			['heart',5,'qilin'],
			['heart',5,'chitu'],
			['heart',6,'tao'],
			['heart',6,'lebu'],
			['heart',7,'tao'],
			['heart',7,'wuzhong'],
			['heart',8,'tao'],
			['heart',8,'wuzhong'],
			['heart',9,'tao'],
			['heart',9,'yuanjiao'],
			['heart',10,'tao'],
			['heart',10,'sha'],
			['heart',11,'shan'],
			['heart',11,'yiyi'],
			['heart',12,'tao'],
			['heart',12,'sha'],
			['heart',12,'guohe'],
			['heart',13,'shan'],
			['heart',13,'zhuahuang'],
		],
		guozhanPile:[
			['spade',1,'juedou'],
			['spade',1,'shandian'],
			['spade',2,'feilongduofeng'],
			['spade',2,'bagua'],
			['spade',2,'hanbing'],
			['spade',3,'guohe'],
			['spade',3,'shunshou'],
			['spade',4,'guohe'],
			['spade',4,'shunshou'],
			['spade',5,'sha'],
			['spade',5,'jueying'],
			['spade',6,'qinggang'],
			['spade',6,'sha','thunder'],
			['spade',7,'sha'],
			['spade',7,'sha','thunder'],
			['spade',8,'sha'],
			['spade',8,'sha'],
			['spade',9,'sha'],
			['spade',9,'jiu'],
			['spade',10,'sha'],
			['spade',10,'bingliang'],
			['spade',11,'sha'],
			['spade',11,'wuxie'],
			['spade',12,'zhangba'],
			['spade',12,'tiesuo'],
			['spade',13,'nanman'],
			['spade',13,'dawan'],

			['club',1,'juedou'],
			['club',1,'baiyin'],
			['club',2,'sha'],
			['club',2,'tengjia'],
			['club',2,'renwang'],
			['club',3,'sha'],
			['club',3,'zhibi'],
			['club',4,'sha'],
			['club',4,'zhibi'],
			['club',5,'sha'],
			['club',5,'dilu'],
			['club',6,'lebu'],
			['club',6,'sha','thunder'],
			['club',7,'nanman'],
			['club',7,'sha','thunder'],
			['club',8,'sha'],
			['club',8,'sha','thunder'],
			['club',9,'sha'],
			['club',9,'jiu'],
			['club',10,'sha'],
			['club',10,'bingliang'],
			['club',11,'sha'],
			['club',11,'sha'],
			['club',12,'jiedao'],
			['club',12,'tiesuo'],
			['club',13,'wuxie',null,['guo']],
			['club',13,'tiesuo'],

			['diamond',1,'zhuge'],
			['diamond',1,'zhuque'],
			['diamond',2,'shan'],
			['diamond',2,'tao'],
			['diamond',3,'shan'],
			['diamond',3,'shunshou'],
			['diamond',4,'yiyi'],
			['diamond',4,'sha','fire'],
			['diamond',5,'guanshi'],
			['diamond',5,'sha','fire'],
			['diamond',6,'shan'],
			['diamond',6,'wuliu'],
			['diamond',7,'shan'],
			['diamond',7,'shan'],
			['diamond',8,'shan'],
			['diamond',8,'shan'],
			['diamond',9,'shan'],
			['diamond',9,'jiu'],
			['diamond',10,'shan'],
			['diamond',10,'sha'],
			['diamond',11,'shan'],
			['diamond',11,'sha'],
			['diamond',12,'sha'],
			['diamond',12,'sanjian'],
			['diamond',12,'wuxie',null,['guo']],
			['diamond',13,'shan'],
			['diamond',13,'zixin'],

			['heart',1,'taoyuan'],
			['heart',1,'wanjian'],
			['heart',2,'shan'],
			['heart',2,'huogong'],
			['heart',3,'wugu'],
			['heart',3,'taipingyaoshu'],
			['heart',3,'huogong'],
			['heart',4,'tao'],
			['heart',4,'sha','fire'],
			['heart',5,'qilin'],
			['heart',5,'chitu'],
			['heart',6,'tao'],
			['heart',6,'lebu'],
			['heart',7,'tao'],
			['heart',7,'wuzhong'],
			['heart',8,'tao'],
			['heart',8,'wuzhong'],
			['heart',9,'tao'],
			['heart',9,'yuanjiao'],
			['heart',10,'tao'],
			['heart',10,'sha'],
			['heart',11,'shan'],
			['heart',11,'yiyi'],
			['heart',12,'tao'],
			['heart',12,'sha'],
			['heart',12,'guohe'],
			['heart',13,'shan'],
			['heart',13,'zhuahuang'],

			['spade',1,'xietianzi',null,['lianheng']],
			['spade',2,'minguangkai'],
			['spade',3,'huoshaolianying',null,['lianheng']],
			['spade',4,'sha'],
			['spade',5,'qinglong'],
			['spade',6,'jiu',null,['lianheng']],
			['spade',7,'sha'],
			['spade',8,'sha'],
			['spade',9,'sha','thunder'],
			['spade',10,'sha','thunder'],
			['spade',11,'sha','thunder',['lianheng']],
			['spade',12,'lulitongxin'],
			['spade',13,'wuxie'],

			['heart',1,'lianjunshengyan'],
			['heart',2,'diaohulishan'],
			['heart',3,'jingfanma',null,['lianheng']],
			['heart',4,'shan'],
			['heart',5,'shan'],
			['heart',6,'shan'],
			['heart',7,'shan'],
			['heart',8,'tao'],
			['heart',9,'tao'],
			['heart',10,'sha'],
			['heart',11,'sha'],
			['heart',12,'huoshaolianying',null,['lianheng']],
			['heart',13,'shuiyanqijunx'],

			['club',1,'yuxi'],
			['club',2,'huxinjing',null,['lianheng']],
			['club',3,'chiling'],
			['club',4,'sha'],
			['club',5,'sha','thunder',['lianheng']],
			['club',6,'sha'],
			['club',7,'sha'],
			['club',8,'sha'],
			['club',9,'jiu'],
			['club',10,'lulitongxin'],
			['club',11,'huoshaolianying',null,['lianheng']],
			['club',12,'shuiyanqijunx'],
			['club',13,'wuxie',null,['guo']],

			['diamond',1,'xietianzi',null,['lianheng']],
			['diamond',2,'tao'],
			['diamond',3,'tao',null,['lianheng']],
			['diamond',4,'xietianzi',null,['lianheng']],
			['diamond',5,'muniu'],
			['diamond',6,'shan'],
			['diamond',7,'shan'],
			['diamond',8,'sha','fire'],
			['diamond',9,'sha','fire'],
			['diamond',10,'diaohulishan',null,['lianheng']],
			['diamond',11,'wuxie',null,['guo']],
			['diamond',12,'fangtian'],
			['diamond',13,'shan'],

			['diamond',6,'dinglanyemingzhu'],
			['heart',13,'liulongcanjia'],
			
			['spade',12,'gz_haolingtianxia'],
			['diamond',1,'gz_kefuzhongyuan'],
			['heart',1,'gz_guguoanbang'],
			['club',12,'gz_wenheluanwu'],
		],
		element:{
			content:{
				hideCharacter:function(){
					'step 0'
					event.trigger('hideCharacterEnd');
					'step 1'
					event.trigger('hideCharacterAfter');
				},
				chooseJunlingFor:function(){
					'step 0'
					var list=['junling1','junling2','junling3','junling4','junling5','junling6'];
					list=list.randomGets(2).sort();
					for(var i=0;i<list.length;i++) list[i]=['军令','',list[i]];
					var prompt=event.prompt||'选择一张军令牌';
					if(target!=undefined&&!event.prompt){
						var str=target==player?'（你）':'';
						prompt+='，令'+get.translation(target)+str+'选择是否执行';
					}
					player.chooseButton([prompt,[list,'vcard']],true).set('ai',function(button){
						return get.junlingEffect(_status.event.player,button.link[2],_status.event.getParent().target,[],_status.event.player);
					});
					'step 1'
					event.result={
						junling:result.links[0][2],
						targets:[],
					};
					if(result.links[0][2]=='junling1') player.chooseTarget('选择一名角色，做为若该军令被执行，受到伤害的角色',true).set('ai',function(_target){
						return get.damageEffect(_target,target,player);
					});
					'step 2'
					if(result.targets.length){
						player.line(result.targets,'green');
						event.result.targets=result.targets;
					}
				},
				chooseJunlingControl:function(){
					'step 0'
					var dialog=[];
					var str1=source==player?'（你）':'';
					var str2=event.targets?'（被指定的角色为'+get.translation(event.targets)+'）':'';
					if(!event.prompt) dialog.add(get.translation(event.source)+str1+'选择的军令'+str2+'为');
					else{
						dialog.add(event.prompt);
						dialog.add(get.translation(event.source)+str1+'选择的军令'+str2+'为');
					}
					dialog.add([[event.junling],'vcard']);
					var controls=[];
					if(event.choiceList){
						for(var i=0;i<event.choiceList.length;i++){
							dialog.add('<div class="popup text" style="width:calc(100% - 10px);display:inline-block">选项'+get.cnNumber(i+1,true)+'：'+event.choiceList[i]+'</div>');
							controls.push('选项'+get.cnNumber(i+1,true));
						}
					}
					else if(event.controls) controls=event.controls;
					else controls=['执行该军令','不执行该军令'];
					if(!event.ai) event.ai=function(){return Math.floor(controls.length*Math.random())};
					player.chooseControl(controls).set('dialog',dialog).set('ai',event.ai);
					'step 1'
					event.result={
						index:result.index,
						control:result.control,
					};
				},
				carryOutJunling:function(){
					'step 0'
					switch(event.junling){
						case 'junling1':{
							if(targets[0].isAlive()){
								player.line(targets,'green');
								targets[0].damage(player);
							}
							break;
						}
						case 'junling2':player.draw();event.num=1;break;
						case 'junling3':player.loseHp();break;
						case 'junling4':player.addTempSkill('junling4_eff');player.addTempSkill('fengyin_vice');player.addTempSkill('fengyin_main');break;
						case 'junling5':player.turnOver();player.addTempSkill('junling5_eff');break;
					}
					'step 1'
					if(event.junling=='junling2'&&source!=player&&player.countCards('he')>0){
						player.chooseCard('交给'+get.translation(source)+'第'+get.cnNumber(event.num)+'张牌（共两张）','he',true);
						event.ing=true;
					}
					if(event.junling=='junling6'){
						var position='',num0=0;
						if(player.countCards('h')){position+='h';num0++;}
						if(player.countCards('e')){position+='e';num0++;}
						player.chooseCard('选择一张手牌和一张装备区内牌（若有），然后弃置其余的牌',position,num0,function(card){
							if(ui.selected.cards.length) return get.position(card)!=get.position(ui.selected.cards[0]);
							return true;
						},true).set('complexCard',true).set('ai',function(card){return get.value(card)});
					}
					'step 2'
					if(event.junling=='junling2'&&source!=player){
						if(result.cards.length&&event.ing){
							source.gain(result.cards,player,'giveAuto');
						}
						event.num++;
						if(event.num<3){
							event.ing=false;
							event.goto(1);
						}
					}
					if(event.junling=='junling6'){
						var cards=player.getCards('he');
						for(var i=0;i<result.cards.length;i++) cards.remove(result.cards[i]);
						player.discard(cards);
					}
				},
				doubleDraw:function(){
					if(!player.hasMark('yinyang_mark')) player.addMark('yinyang_mark',1);
				},
				changeViceOnline:function(){
					'step 0'
					var group=lib.character[player.name1][1];
					_status.characterlist.randomSort();
					var name=false;
					for(var i=0;i<_status.characterlist.length;i++){
						if(lib.character[_status.characterlist[i]][1]==group&&!get.is.double(_status.characterlist[i])){name=_status.characterlist[i];break;}
					}
					if(!name){event.finish();return;}
					_status.characterlist.remove(name);
					if(player.hasViceCharacter()){
							event.change=true;
						_status.characterlist.add(player.name2);
					}
					event.toRemove=player.name2;
					event.toChange=name;
					if(event.change) event.trigger('removeCharacterBefore');
					'step 1'
					var name=event.toChange;
					game.log(player,'将副将变更为','#g'+get.translation(name));
					player.viceChanged=true;
					if(player.isUnseen(1)){
						player.showCharacter(1,false);
					}
					player.reinit(player.name2,name,false);
				},
				changeVice:function(){
					'step 0'
					if(!event.num) event.num=3;
					var group=player.identity;
					if(!lib.group.contains(group)) group=lib.character[player.name1][1];
					_status.characterlist.randomSort();
					event.tochange=[]
					for(var i=0;i<_status.characterlist.length;i++){
						var double=get.is.double(_status.characterlist[i],true);
						if(group=='ye'?(lib.character[_status.characterlist[i]][1]!=group):(lib.character[_status.characterlist[i]][1]==group||(double&&double.contains(group)))) event.tochange.push(_status.characterlist[i]);
						if(event.tochange.length==event.num) break;
					}
					if(!event.tochange.length) event.finish();
					else{
						if(event.tochange.length==1) event._result={
							bool:true,
							links:event.tochange,
						}
						else player.chooseButton(true,['选择要变更的武将牌',[event.tochange,'character']]).ai=function(button){
							return get.guozhanRank(button.link);
						};
					}
					'step 1'
					var name=result.links[0];
					_status.characterlist.remove(name);
					if(player.hasViceCharacter()){
						event.change=true;
						_status.characterlist.add(player.name2);
					}
					event.toRemove=player.name2;
					event.toChange=name;
					if(event.change) event.trigger('removeCharacterBefore');
					if(event.hidden){
						if(player.isUnseen(0)) player.showCharacter(0,false);
						if(!player.isUnseen(1)) player.hideCharacter(1);
					}
					else if(player.isUnseen(1)){
						player.showCharacter(1,false);
					}
					'step 2'
					var name=event.toChange;
					if(event.hidden) game.log(player,'替换了副将','#g'+get.translation(player.name2));
					else game.log(player,'将副将从','#g'+get.translation(player.name2),'变更为','#g'+get.translation(name));
					player.viceChanged=true;
					player.reinit(player.name2,name,false);
				},
				/*----分界线----*/
				mayChangeVice:function(){
					'step 0'
					player.chooseBool('是否变更副将？').set('ai',function(){
						var player=_status.event.player;
						return get.guozhanRank(player.name2,player)<=3;
					});
					'step 1'
					if(result.bool){
						if(!event.repeat) _status.changedSkills.add(event.skill)
						player.changeVice(event.hidden);
					}
				},
				zhulian:function(){
					player.popup('珠联璧合');
					if(!player.hasMark('zhulianbihe_mark')) player.addMark('zhulianbihe_mark',1);
				},
			},
			player:{
				getGuozhanGroup:function(num){
					if(get.config('qunxionggeju')){
						if(num==1) return lib.character[this.name2][1];
						return lib.character[this.name1][1];
					}
					if(get.is.double(this.name2)) return lib.character[this.name1][1];
					return lib.character[this.name2][1];
				},
				chooseJunlingFor:function(target){
						var next=game.createEvent('chooseJunlingFor');
						next.player=this;
						next.target=target;
						next.setContent('chooseJunlingFor');
						return next;
					},
					chooseJunlingControl:function(source,junling,targets){
						var next=game.createEvent('chooseJunlingControl');
						next.player=this;
						next.source=source;
						next.junling=junling;
						if(targets.length) next.targets=targets;
						next.setContent('chooseJunlingControl');
						return next;
					},
					carryOutJunling:function(source,junling,targets){
						var next=game.createEvent('carryOutJunling');
						next.source=source;
						next.player=this;
						if(targets.length) next.targets=targets;
						next.junling=junling;
						next.setContent('carryOutJunling');
						return next;
					},
				/**/
				mayChangeVice:function(repeat,hidden){
					if(!_status.changedSkills) _status.changedSkills=[];
					var skill=_status.event.name;
					if(repeat||!_status.changedSkills.contains(skill)){
						var next=game.createEvent('mayChangeVice');
						next.setContent('mayChangeVice');
						next.player=this;
						next.skill=skill;
						if(repeat||(!_status.connectMode&&get.config('changeViceType')=='online')) next.repeat=true;
						if(hidden=='hidden') next.hidden=true;
						return next;
					}
				},
				differentIdentityFrom:function(target,self){
					if(this==target) return false;
					if(this.storage.yexinjia_friend==target||target.storage.yexinjia_friend==this) return false;
					if(self){
						if(target.identity=='unknown') return false;
						if(target.identity=='ye'||this.identity=='ye') return true;
						if(this.identity=='unknown'){
							var identity=lib.character[this.name1][1];
							if(this.wontYe()) return identity!=target.identity;
							return true;
						}
					}
					else{
						if(this.identity=='unknown'||target.identity=='unknown') return false;
						if(this.identity=='ye'||target.identity=='ye') return true;
					}
					return this.identity!=target.identity;
				},
				sameIdentityAs:function(target,shown){
					if(this.storage.yexinjia_friend==target||target.storage.yexinjia_friend==this) return true;
					if(shown){
						if(this.identity=='ye'||this.identity=='unknown') return false;
					}
					else{
						if(this==target) return true;
						if(target.identity=='unknown'||target.identity=='ye'||this.identity=='ye') return false;
						if(this.identity=='unknown'){
							var identity=lib.character[this.name1][1];
							if(this.wontYe()) return identity==target.identity;
							return false;
						}
					}
					return this.identity==target.identity;
				},
				getModeState:function(){
					return {
						unseen:this.isUnseen(0),
						unseen2:this.isUnseen(1),
					}
				},
				setModeState:function(info){
					if(info.mode.unseen) this.classList.add('unseen');
					if(info.mode.unseen2) this.classList.add('unseen2');
					if(!info.name) return;
					// if(info.name.indexOf('unknown')==0){
					// 	if(this==game.me){
					// 		lib.translate[info.name]+='（你）';
					// 	}
					// }
					this.init(info.name1,info.name2,false);
					this.name1=info.name1;
					this.name=info.name;
					this.node.name_seat=ui.create.div('.name.name_seat',get.verticalStr(lib.translate[this.name].slice(0,3)),this);
					if(info.identityShown){
						this.setIdentity(info.identity);
						this.node.identity.classList.remove('guessing');
					}
					else if(this!=game.me){
						this.node.identity.firstChild.innerHTML='猜';
						this.node.identity.dataset.color='unknown';
						this.node.identity.classList.add('guessing');
					}
				},
				dieAfter2:function(source){
					var that=this;
					if(source&&source.hasSkillTag('noDieAfter2',null,this)) return;
					if(source&&source.shijun){
						source.discard(source.getCards('he'));
						delete source.shijun;
					}
					else if(source&&source.identity!='unknown'){
						if(source.identity=='ye') source.draw(3);
						else if(source.shijun2){
							delete source.shijun2;
							source.draw(1+game.countPlayer(function(current){
								return current.group==that.group
							}));
						}
						else if(this.identity=='ye') source.draw(1);
						else if(this.identity!=source.identity) source.draw(get.population(this.identity)+1);
						else source.discard(source.getCards('he'));
					}
				},
				dieAfter:function(source){
					this.showCharacter(2);
					if(get.is.jun(this.name1)){
						if(source&&source.identity==this.identity) source.shijun=true;
						else if(source&&source.identity!='ye') source.shijun2=true;
						var yelist=[];
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].identity==this.identity){
								yelist.push(game.players[i]);
							}
						}
						game.broadcastAll(function(list){
							for(var i=0;i<list.length;i++){
								list[i].identity='ye';
								list[i].setIdentity();
							}
						},yelist);
						_status.yeidentity.add(this.identity);
					}
					game.tryResult();
				},
				viewCharacter:function(target,num){
					if(num!=0&&num!=1){
						num=2;
					}
					if(!target.isUnseen(num)){
						return;
					}
					var next=game.createEvent('viewCharacter');
					next.player=this;
					next.target=target;
					next.num=num;
					next.setContent(function(){
						if(!player.storage.zhibi){
							player.storage.zhibi=[];
						}
						player.storage.zhibi.add(target);
						var content,str=get.translation(target)+'的';
						if(event.num==0||!target.isUnseen(1)){
							content=[str+'主将',[[target.name1],'character']];
							game.log(player,'观看了',target,'的主将');
						}
						else if(event.num==1||!target.isUnseen(0)){
							content=[str+'副将',[[target.name2],'character']];
							game.log(player,'观看了',target,'的副将');
						}
						else{
							content=[str+'主将和副将',[[target.name1,target.name2],'character']];
							game.log(player,'观看了',target,'的主将和副将');
						}
						player.chooseControl('ok').set('dialog',content);
					})
				},
				checkViceSkill:function(skill,disable){
					if(game.expandSkills(lib.character[this.name2][3].slice(0)).contains(skill)){
						return true;
					}
					else{
						if(disable!==false){
							this.awakenSkill(skill);
						}
						return false;
					}
				},
				checkMainSkill:function(skill,disable){
					if(game.expandSkills(lib.character[this.name1][3].slice(0)).contains(skill)){
						return true;
					}
					else{
						if(disable!==false){
							this.awakenSkill(skill);
						}
						return false;
					}
				},
				removeMaxHp:function(){
					if(game.online) return;
					if(typeof this.singleHp=='boolean'){
						if(this.singleHp){
							this.singleHp=false;
						}
						else{
							this.singleHp=true;
							this.maxHp--;
						}
					}
					else{
						this.maxHp--;
					}
					this.update();
				},
				hideCharacter:function(num,log){
					if(this.isUnseen(2)){
						return;
					}
					game.addVideo('hideCharacter',this,num);
					var toHide;
					var skills;
					switch(num){
						case 0:
						if(log!==false) game.log(this,'暗置了主将'+get.translation(this.name1));
						toHide=this.name1;
						skills=lib.character[this.name1][3];
						this.name=this.name2;
						this.sex=lib.character[this.name2][0];
						this.classList.add('unseen');
						break;
						case 1:
						if(log!==false) game.log(this,'暗置了副将'+get.translation(this.name2));
						toHide=this.name2;
						skills=lib.character[this.name2][3];
						this.classList.add('unseen2');
						break;
					}
					game.broadcast(function(player,name,sex,num,skills){
						player.name=name;
						player.sex=sex;
						switch(num){
							case 0:player.classList.add('unseen');break;
							case 1:player.classList.add('unseen2');break;
						}
						for(var i=0;i<skills.length;i++){
							if(!player.skills.contains(skills[i])) continue;
							player.hiddenSkills.add(skills[i]);
							player.skills.remove(skills[i]);
						}
					},this,this.name,this.sex,num,skills);
					for(var i=0;i<skills.length;i++){
						if(!this.skills.contains(skills[i])) continue;
						this.hiddenSkills.add(skills[i]);
						var info=get.info(skills[i]);
						if(info.ondisable&&info.onremove){
							info.onremove(this);
						}
						this.skills.remove(skills[i]);
					}
					this.checkConflict();
					var next=game.createEvent('hideCharacter',false);
					next.player=this;
					next.toHide=toHide;
					next.setContent('hideCharacter');
					return next;
				},
				removeCharacter:function(num){
					var name=this['name'+(num+1)];
					var next=game.createEvent('removeCharacter');
					next.player=this;
					next.toRemove=name;
					next.num=num;
					next.setContent('removeCharacter');
					return next;
				},
				$removeCharacter:function(num){
					var name=this['name'+(num+1)];
					var info=lib.character[name];
					if(!info) return;
					var to='gz_shibing'+(info[0]=='male'?1:2)+info[1];
					game.log(this,'移除了'+(num?'副将':'主将'),'#b'+name);
					this.reinit(name,to,false);
					this.showCharacter(num,false);
					_status.characterlist.add(name);
				},
				changeVice:function(hidden){
					var next=game.createEvent('changeVice');
					next.player=this;
					next.setContent('changeVice');
					next.num=(!_status.connectMode&&get.config('changeViceType')=='online')?1:3;
					if(hidden) next.hidden=true;
					return next;
				},
				hasMainCharacter:function(){
					return this.name1.indexOf('gz_shibing')!=0;
				},
				hasViceCharacter:function(){
					return this.name2.indexOf('gz_shibing')!=0;
				},
				$showCharacter:function(num,log){
					var showYe=false;
					if(num==0&&!this.isUnseen(0)){
						return;
					}
					if(num==1&&!this.isUnseen(1)){
						return;
					}
					if(!this.isUnseen(2)){
						return;
					}
					game.addVideo('showCharacter',this,num);
					if(this.identity=='unknown'||(this.identity!='ye'&&(num==0||num==2)&&lib.character[this.name1][1]=='ye')){
						this.group=this.getGuozhanGroup(num);
						this._group=this.group;
						if((num==0||num==2)&&lib.character[this.name1][1]=='ye'){
							this.identity='ye';
							if(!this._ye){
								this._ye=true;
								showYe=true;
							}
						}
						else if(get.is.jun(this.name1)&&this.isAlive()){
							this.identity=this.group;
						}
						else if(this.wontYe(this.group)){
							this.identity=this.group;
						}
						else{
							this.identity='ye';
						}
						this.setIdentity(this.identity);
						this.ai.shown=1;
						this.node.identity.classList.remove('guessing');

						if(_status.clickingidentity&&_status.clickingidentity[0]==this){
							for(var i=0;i<_status.clickingidentity[1].length;i++){
								_status.clickingidentity[1][i].delete();
								_status.clickingidentity[1][i].style.transform='';
							}
							delete _status.clickingidentity;
						}
						game.addVideo('setIdentity',this,this.identity);
					}
					var skills;
					switch(num){
						case 0:
						if(log!==false) game.log(this,'展示了主将','#b'+this.name1);
						this.name=this.name1;
						skills=lib.character[this.name][3];
						this.sex=lib.character[this.name][0];
						this.classList.remove('unseen');
						break;
						case 1:
						if(log!==false) game.log(this,'展示了副将','#b'+this.name2);
						skills=lib.character[this.name2][3];
						if(this.sex=='unknown') this.sex=lib.character[this.name2][0];
						if(this.name.indexOf('unknown')==0) this.name=this.name2;
						this.classList.remove('unseen2');
						break;
						case 2:
						if(log!==false) game.log(this,'展示了主将','#b'+this.name1,'、副将','#b'+this.name2);
						this.name=this.name1;
						skills=lib.character[this.name][3].concat(lib.character[this.name2][3]);
						this.sex=lib.character[this.name][0];
						this.classList.remove('unseen');
						this.classList.remove('unseen2');
						break;
					}
					game.broadcast(function(player,name,sex,num,identity,group){
						player.identityShown=true;
						player.group=group;
						player.name=name;
						player.sex=sex;
						player.node.identity.classList.remove('guessing');
						switch(num){
							case 0:player.classList.remove('unseen');break;
							case 1:player.classList.remove('unseen2');break;
							case 2:player.classList.remove('unseen');player.classList.remove('unseen2');break;
						}
						player.ai.shown=1;
						player.identity=identity;
						player.setIdentity(identity);
						if(_status.clickingidentity&&_status.clickingidentity[0]==player){
							for(var i=0;i<_status.clickingidentity[1].length;i++){
								_status.clickingidentity[1][i].delete();
								_status.clickingidentity[1][i].style.transform='';
							}
							delete _status.clickingidentity;
						}
					},this,this.name,this.sex,num,this.identity,this.group);
					this.identityShown=true;
					for(var i=0;i<skills.length;i++){
						this.hiddenSkills.remove(skills[i]);
						this.addSkill(skills[i]);
					}
					this.checkConflict();
					if(!this.viceChanged){
						var initdraw=get.config('initshow_draw');
						if(_status.connectMode) initdraw=lib.configOL.initshow_draw;
						if(!_status.initshown&&!_status.overing&&initdraw!='off'&&this.isAlive()&&_status.mode!='mingjiang'){
							this.popup('首亮');
							if(initdraw=='draw'){
								game.log(this,'首先明置武将，得到奖励');
								game.log(this,'摸了两张牌');
								this.draw(2).log=false;
							}
							else{
								this.addMark('xianqu_mark',1);
							}
							_status.initshown=true;
						}
						if(!this.isUnseen(2)&&!this._mingzhied){
							this._mingzhied=true;
							if(this.singleHp){
								this.doubleDraw();
							}
							if(this.perfectPair()){
								var next=game.createEvent('guozhanDraw');
								next.player=this;
								next.setContent('zhulian');
							}
						}
						if(showYe){
							this.addMark('yexinjia_mark',1);
						}
					}
					game.tryResult();
				},
				wontYe:function(group){
					if(get.config('qunxionggeju')){
						if(!group) group=lib.character[this.name1][1];
						if(_status.yeidentity&&_status.yeidentity.contains(group)) return false;
						if(get.zhu(this,null,true)) return true;
						var num=3,total=get.population();
						if(total<6) num=1;
						else if(total<8) num=2;
						return get.totalPopulation(group)+1<=num;
					}
					if(!group) group=lib.character[this.name1][1];
					if(_status.yeidentity&&_status.yeidentity.contains(group)) return false;
					if(get.zhu(this,null,true)) return true;
					return get.totalPopulation(group)+1<=get.population()/2;
				},
				perfectPair:function(){
					if(_status.connectMode){
						if(!lib.configOL.zhulian) return false;
					}
					else{
						if(!get.config('zhulian')) return false;
					}
					var name1=this.name1;
					var name2=this.name2;
					if(name1.indexOf('gz_shibing')==0) return false;
					if(name2.indexOf('gz_shibing')==0) return false;
					//if(lib.character[name1][1]!='ye'&&lib.character[name2][1]!='ye'&&lib.character[name1][1]!=lib.character[name2][1]) return false;
					if(get.is.jun(this.name1)) return true;
					var list=['re','diy','sp','jsp','shen','jg','xin','old','gz','ol'];
					for(var i=0;i<list.length;i++){
						if(name1.indexOf(list[i]+'_')==0){
							name1=name1.slice(list[i].length+1);
						}
						if(name2.indexOf(list[i]+'_')==0){
							name2=name2.slice(list[i].length+1);
						}
					}
					if(lib.perfectPair[name1]&&lib.perfectPair[name1].contains(name2)){
						return true;
					}
					if(lib.perfectPair[name2]&&lib.perfectPair[name2].contains(name1)){
						return true;
					}
					return false;
				},
				siege:function(player){
					if(this.identity=='unknown'||this.identity=='ye'||this.hasSkill('undist')) return false;
					if(!player){
						var next=this.getNext();
						if(next&&next.sieged()) return true;
						var previous=this.getPrevious();
						if(previous&&previous.sieged()) return true;
						return false;
					}
					else{
						return player.sieged()&&(player.getNext()==this||player.getPrevious()==this);
					}
				},
				sieged:function(player){
					if(this.identity=='unknown') return false;
					if(player){
						return player.siege(this);
					}
					else{
						var next=this.getNext();
						var previous=this.getPrevious();
						if(next&&previous&&next!=previous){
							if(next.identity=='unknown'||next.identity=='ye'||next.identity==this.identity) return false;
							return next.identity==previous.identity;
						}
						return false;
					}
				},
				inline:function(){
					if(this.identity=='unknown'||this.identity=='ye'||this.hasSkill('undist')) return false;
					var next=this,previous=this;
					var list=[];
					for(var i=0;next||previous;i++){
						if(next){
							next=next.getNext();
							if(next.identity!=this.identity||next==this){
								next=null;
							}
							else{
								list.add(next);
							}
						}
						if(previous){
							previous=previous.getPrevious();
							if(previous.identity!=this.identity||previous==this){
								previous=null;
							}
							else{
								list.add(previous);
							}
						}
					}
					if(!list.length) return false;
					for(var i=0;i<arguments.length;i++){
						if(!list.contains(arguments[i])&&arguments[i]!=this) return false;
					}
					return true;
				},
				isMajor:function(){
					if(this.identity=='unknown') return false;
					var list=game.filterPlayer(function(current){
						return current.identity!='unknown'&&current.hasSkillTag('forceMajor');
					});
					if(list.length){
						for(var i of list){
							if(i.isFriendOf(this)) return true;
						}
						return false;
					}
					var map={},sides=[],pmap=_status.connectMode?lib.playerOL:game.playerMap,player;
					for(var i of game.players){
						if(i.identity=='unknown') continue;
						var added=false;
						for(var j of sides){
							if(i.isFriendOf(pmap[j])){
								added=true;
								map[j].push(i);
								if(i==this) player=j;
								break;
							}
						}
						if(!added){
							map[i.playerid]=[i];
							sides.push(i.playerid);
							if(i==this) player=i.playerid;
						}
					}
					if(!player||map[player].length<2) return false;
					for(var i in map){
						if(map[i].length>map[player].length) return false;
					}
					return true;
				},
				isNotMajor:function(){
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].isMajor()){
							return !this.isMajor();
						}
					}
					return false;
				},
				isMinor:function(nomajor){
					if(this.identity=='unknown'||(!nomajor&&this.isMajor())) return false;
					if(!nomajor&&!game.hasPlayer(function(current){
						return current.isMajor();
					})){
						return false;
					}
					var map={},sides=[],pmap=_status.connectMode?lib.playerOL:game.playerMap,player;
					for(var i of game.players){
						if(i.identity=='unknown') continue;
						var added=false;
						for(var j of sides){
							if(i.isFriendOf(pmap[j])){
								added=true;
								map[j].push(i);
								if(i==this) player=j;
								break;
							}
						}
						if(!added){
							map[i.playerid]=[i];
							sides.push(i.playerid);
							if(i==this) player=i.playerid;
						}
					}
					for(var i in map){
						if(map[i].length<map[player].length) return false;
					}
					return true;
				},
				logAi:function(targets,card){
					if(this.ai.shown==1||this.isMad()) return;
					if(typeof targets=='number'){
						this.ai.shown+=targets;
					}
					else{
						var effect=0,c,shown;
						var info=get.info(card);
						if(info.ai&&info.ai.expose){
							if(_status.event.name=='_wuxie'){
								if(_status.event.source&&_status.event.source.ai.shown){
									this.ai.shown+=0.2;
								}
							}
							else{
								this.ai.shown+=info.ai.expose;
							}
						}
						if(targets.length>0){
							for(var i=0;i<targets.length;i++){
								shown=Math.abs(targets[i].ai.shown);
								if(shown<0.2||targets[i].identity=='nei') c=0;
								else if(shown<0.4) c=0.5;
								else if(shown<0.6) c=0.8;
								else c=1;
								effect+=get.effect(targets[i],card,this)*c;
							}
						}
						if(effect>0){
							if(effect<1) c=0.5;
							else c=1;
							if(targets.length==1&&targets[0]==this);
							else if(targets.length==1) this.ai.shown+=0.2*c;
							else this.ai.shown+=0.1*c;
						}
					}
					if(this.ai.shown>0.95) this.ai.shown=0.95;
					if(this.ai.shown<-0.5) this.ai.shown=-0.5;
				},
			}
		},
		get:{
			guozhanReverse:function(name1,name2){
				if(get.is.double(name2)) return false;
				if(['gz_xunyou','gz_lvfan','gz_liubei'].contains(name2)) return true;
				if(name1=='gz_re_xushu') return true;
				if(name2=='gz_dengai') return lib.character[name1][2]%2==1;
				if(['gz_sunce','gz_jiangwei'].contains(name1)) return name2=='gz_zhoutai'||lib.character[name2][2]%2==1;
				return false;
			},
			guozhanRank:function(name,player){
				if(name.indexOf('gz_shibing')==0) return -1;
				if(name.indexOf('gz_jun_')==0) return 7;
				if(player){
					var skills=lib.character[name][3].slice(0);
					for(var i=0;i<skills.length;i++){
						if(lib.skill[skills[i]].limited&&player.awakenedSkills.contains(skills[i])) return skills.length-1;
					}
				}
				if(_status._aozhan){
					for(var i in lib.aozhanRank){
						if(lib.aozhanRank[i].contains(name)) return parseInt(i);
					}
				}
				for(var i in lib.guozhanRank){
					if(lib.guozhanRank[i].contains(name)) return parseInt(i);
				}
				return 0;
			},
			junlingEffect:function(source,junling,performer,targets,viewer){
				var att1=get.attitude(viewer,source),att2=get.attitude(viewer,performer);
				var eff1=0,eff2=0;
				switch(junling){
					case 'junling1':
					if(!targets.length&&game.countPlayer(function(current){return get.damageEffect(viewer,current,viewer)>0})) eff1=2;
					else{
						if(get.damageEffect(targets[0],performer,source)>=0) eff1=2;
						else eff1=-2;
						if(get.damageEffect(targets[0],source,performer)>=0) eff2=2;
						else eff2=-2;
					}
					break;
					case 'junling2':
					if(performer.countCards('he')){eff1=1;eff2=0;}
					else{eff1=2;eff2=-1;}
					break;
					case 'junling3':
					if(performer.hp==1&&!performer.hasSkillTag('save',true)) eff2=-5;
					else{
						if(performer==viewer){
							if(performer.hasSkillTag('maihp',true)) eff2=3;
							else eff2=-2;
						}
						else{
							if(performer.hasSkillTag('maihp',false)) eff2=3;
							else eff2=-2;
						}
					}
					break;
					case 'junling4':eff1=0;eff2=-2;break;
					case 'junling5':
					var td=performer.isTurnedOver();
					if(td){
						if(performer==viewer){
							if(_status.currentPhase==performer&&performer.hasSkill('jushou')) eff2=-3;
							else eff2=3;
						}
						else eff2=3;
					}
					else{
						if(performer==viewer){
							if(performer.hasSkillTag('noturn',true)) eff2=0;
							else eff2=-3;
						}
						else{
							if(performer.hasSkillTag('noturn',false)) eff2=0;
							else eff2=-3;
						}
					}
					break;
					case 'junling6':
					if(performer.countCards('h')>1) eff2+=1-performer.countCards('h');
					if(performer.countCards('e')>1) eff2+=1-performer.countCards('e');
					break;
				}
				return Math.sign(att1)*eff1+Math.sign(att2)*eff2;
			},
			realAttitude:function(from,to,difficulty,toidentity){
				if(from.identity==toidentity&&toidentity!='ye'){
					return 4+difficulty;
				}
				if(from.identity=='unknown'&&lib.character[from.name1][1]==toidentity){
					if(from.wontYe()) return 4+difficulty;
				}
				var groups=[];
				var map={},sides=[],pmap=_status.connectMode?lib.playerOL:game.playerMap,player;
				for(var i of game.players){
					if(i.identity=='unknown') continue;
					var added=false;
					for(var j of sides){
						if(i.isFriendOf(pmap[j])){
							added=true;
							map[j].push(i);
							if(i==this) player=j;
							break;
						}
					}
					if(!added){
						map[i.playerid]=[i];
						sides.push(i.playerid);
						if(i==this) player=i.playerid;
					}
				}
				for(var i in map) groups.push(map[i].length);
				var max=Math.max.apply(this,groups);
				if(max<=1) return -3;
				var from_p;
				if(from.identity=='unknown'&&from.wontYe()) from_p=get.population(lib.character[from.name1][1]);
				else from_p=game.countPlayer(function(current){
					return current.isFriendOf(from);
				});
				var to_p=game.countPlayer(function(current){
					return current.isFriendOf(to);
				});

				if(to_p==max) return -5;
				if(from_p==max) return -2-to_p;
				if(max>=game.players.length/2){
					if(to_p<=from_p){
						return 0.5;
					}
					return 0;
				}
				if(to_p<max-1) return 0;
				return -0.5;
			},
			rawAttitude:function(from,to){
				if(to.identity=='unknown'&&game.players.length==2) return -5;
				if(_status.currentPhase==from&&from.ai.tempIgnore&&
					from.ai.tempIgnore.contains(to)&&to.identity=='unknown'&&
					(!from.storage.zhibi||!from.storage.zhibi.contains(to))) return 0;
				var difficulty=0;
				if(to==game.me) difficulty=(2-get.difficulty())*1.5;
				if(from==to) return 5+difficulty;
				if(from.isFriendOf(to)) return 5+difficulty;
				if(from.identity=='unknown'&&lib.character[from.name1][1]==to.identity){
					if(from.wontYe()) return 4+difficulty;
				}
				var toidentity=to.identity;
				if(toidentity=='unknown'){
					toidentity=lib.character[to.name1][1];
					if(!to.wontYe()){
						toidentity='ye';
					}
				}
				var att=get.realAttitude(from,to,difficulty,toidentity);
				if(from.storage.zhibi&&from.storage.zhibi.contains(to)){
					return att;
				}
				if(to.ai.shown>=0.5) return att*to.ai.shown;

				var nshown=0;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=from&&game.players[i].identity=='unknown'){
						nshown++;
					}
				}
				if(to.ai.shown==0){
					if(nshown>=game.players.length/2&&att>=0){
						return 0;
					}
					return Math.min(0,Math.random()-0.5)+difficulty;
				}
				if(to.ai.shown>=0.2){
					if(att>2){
						return Math.max(0,Math.random()-0.5)+difficulty;
					}
					if(att>=0){
						return 0;
					}
					return Math.min(0,Math.random()-0.7)+difficulty;
				}
				if(att>2){
					return Math.max(0,Math.random()-0.7)+difficulty;
				}
				if(att>=0){
					return Math.min(0,Math.random()-0.3)+difficulty;
				}
				return Math.min(0,Math.random()-0.5)+difficulty;
			},
		},
		help:{
			'国战模式':
			'<div style="margin:10px">声明</div><ul style="margin-top:0"><li>以下所有规则均为根据公开爆料整理，经村规改动后制定的临时规则。不代表任何官方意见。请以后续发布的官方规则作为标准。</ul>'
			+'<div style="margin:10px">双势力武将</div><ul style="margin-top:0"><li>双势力武将牌只能放在副将位置。主将可以为普通武将牌和野心家武将牌。<br><li>双势力武将牌明置时，势力按照主将的势力进行结算（无论是否明置主将）。胜负条件与正常的单势力武将相同。<br><li>变更副将时，可以选择包含原势力的双势力武将牌。左慈发动【役鬼】时，可以使用双势力武将牌同时指定两个不同势力的角色为目标。<br><li>特殊地，“冈崎汐”作为多势力武将牌，结算流程和规则与其他双势力武将相同。</ul>'
			+'<div style="margin:10px">野心家武将</div><ul style="margin-top:0"><li>野心家武将只能放在主将位置。副将可以为任意非野心家武将牌。<br><li>选择了野心家武将牌的角色（以下简称“野心家角色”）仅明置副将时，若副将为单势力武将牌，则势力暂时视为与该武将牌相同。若副将为双势力武将牌，则势力视为野心家。<br><li>野心家角色明置主将时，其势力改为野心家。若其是首次明置该武将牌，则其获得一个“野心家”标记。<br><li>“野心家”标记可以当做“先驱”标记，“阴阳鱼”标记或是“珠联璧合”标记使用。当同时拥有两种标记时，优先弃置原装标记，下次发动时才弃置“野心家”标记。<br><li>野心家角色变更副将时，若其主将未明置过，则按照副将的势力进行变更。若主将已经明置过，则可以选择所有的非野心家武将牌。左慈发动【役鬼】时，可以使用野心家武将牌同时指定所有势力的角色为目标。'
			+'<br><li>当场上触发了胜利条件时，若这些角色中存在未明置过主将的野心家角色，则这些野心家角色选择是否“暴露野心”。若无人选择“是”且场上存在非野心家角色存活，则所有非野心家角色胜利，野心家角色失败。若有人选择“是”，则这些角色明置主将。然后若场上存活角色数大于等于3，则这些角色选择是否发起“拉拢人心”<br><li>选择发起“拉拢人心”的野心家角色，令所有其他非野心家角色和非君主角色依次选择是否和该野心家角色“结盟”。若有人选择“是”，则野心家角色弃置“野心家”标记，且该角色将势力改为野心家，将手牌摸至四张并回复1点体力，且视为和发起“拉拢人心”的野心家角色势力相同，并终止对其他角色的询问。</ul>'
			+'<div style="margin:10px">纵横捭阖</div><ul style="margin-top:0"><li>当一名角色对目标角色发动具有拥有“纵横”衍生技的技能时，其可以令对方获得“纵横”衍生技直到其下回合结束。</ul>',
		},
	};
});
