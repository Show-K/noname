"use strict";
game.import("mode",function(lib,game,ui,get,ai,_status){
	return {
		name:"super_smash_tabletop",
		start:function(){
			"step 0"
			if(lib.config.player_border=="normal"&&(lib.config.layout=="long"||lib.config.layout=="long2")){
				ui.arena.classList.add("lslim_player");
			}
			"step 1"
			lib.init.css(lib.assetURL+"layout/mode","chess");
			ui.chesssheet=document.createElement("style");
			document.head.appendChild(ui.chesssheet);
			ui.create.cardsAsync();
			game.finishCards();
			game.addGlobalSkill("autoswap");
			ui.chessContainer=ui.create.div("#chess-container",ui.arena);
			ui.chessContainer.move=ui.click.moveContainer;
			ui.chessContainer.chessLeft=0;
			ui.chessContainer.chessTop=0;
			// lib.setScroll(ui.chessContainer);
			ui.chess=ui.create.div("#chess",ui.chessContainer);
			ui.canvas2=document.createElement("canvas");
			ui.canvas2.id="canvas2";
			ui.chess.appendChild(ui.canvas2);
			ui.ctx2=ui.canvas2.getContext("2d");
			game.me=ui.create.player();
			lib.init.onfree();
		}
	};
});
