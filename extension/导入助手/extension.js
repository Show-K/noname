game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"导入助手",content:function (config,pack){
    
	var importExtension = game.importExtension;
	
	game.importExtension = function(data, finishLoad, exportext, pkg) {
		if (!window.JSZip || get.objtype(data)=='object') return importExtension.call(this, data, finishLoad, exportext, pkg);
		
		try {
			var zip = new JSZip();
			zip.load(data);
			
			var file = zip.file('extension.js');
			if (file == null) {
				alert('缺少 extension.js 文件，请检查该扩展文件的文件结构是否正确！');
				return false;
			}
			
			var str = file.asText();
			_status.importingExtension = true;
			eval(str);
			_status.importingExtension = false;
			

			if (!game.importedPack || lib.config.all.plays.contains('extname')) {
				throw ('err');
			}
			
			var extname = game.importedPack.name;
			var config = {};
			if (lib.config.extensions.contains(extname)) {
				for (var key in lib.config) {
					if (key.indexOf('extension_' + extname) >= 0) {
						config[key] = lib.config[key];
					}
				}
				game.removeExtension(extname, true);
			}
			
			lib.config.extensions.add(extname);
			game.saveConfig('extensions', lib.config.extensions);
			game.saveConfig('extension_' + extname + '_enable', true);
			for (var key in game.importedPack.config) {
				var fullKey = 'extension_' + extname + '_' + key;
				if (config[fullKey]) {
					game.saveConfig(fullKey, config[fullKey]);
				} else if (game.importedPack.config[key].init) {
					game.saveConfig(fullKey, game.importedPack.config[key].init);
				}
			}
			
			if (game.download) {
				var filelist = [];
				for (var i in zip.files) {
					if (i[0] != '.' && i[0] != '_') {
						filelist.push(i);
					}
				}
				
				var dirs = [];
				for (var i = 0; i < filelist.length; i++) {
					if (filelist[i].indexOf('.') < 0) {
						dirs.push(filelist[i]);
						filelist.splice(i--, 1);
						if (filelist.length == 0) break;
					}
				}
				
				console.time('导入成功');
				
				var finished = false;
				
				if (lib.node && lib.node.fs) {
					var makedir = function(dirname, callback){
						lib.node.fs.access(dirname, function(e){
							if (e && e.code == 'ENOENT') {
								lib.node.fs.mkdir(dirname, function(e){
									if ((typeof callback) == 'function') callback();
								});
							} else {
								if ((typeof callback) == 'function') callback();
							}
						});
					};
					
					var writeFile = function(){
						if (filelist.length) {
							var filename = filelist.shift();
							lib.node.fs.writeFile(__dirname + '/extension/' + extname + '/' + filename, zip.files[filename].asNodeBuffer(), null, writeFile);
						} else if (!finished) {
							finished = true;
							finishLoad();
							console.timeEnd('导入成功');
						}
					};
					
					makedir(__dirname + '/extension/' + extname, function(){
						var recur = function() {
							if (dirs.length) {
								var dirname = __dirname + '/extension/' + extname + '/' + dirs.shift();
								makedir(dirname, recur);
							} else {
								writeFile();
								writeFile();
							}
						};
						
						recur();
					});
				} else {
					window.resolveLocalFileSystemURL(lib.assetURL, function(entry){
						
						var writeFile = function(){
							if (filelist.length) {
								var filename = filelist.shift();
								entry.getFile('extension/' + extname + '/' + filename, { create: true, exclusive: false }, function(fileEntry){
									fileEntry.createWriter(function(fileWriter){
										fileWriter.write(zip.files[filename].asArrayBuffer());
									});
								});
								
								if (window.requestIdleCallback) {
									requestIdleCallback(writeFile, { timeout: 333 });
								} else {
									setTimeout(writeFile, 100);
								}
								
							} else if (!finished) {
								finished = true;
								finishLoad();
								console.timeEnd('导入成功');
							}
						};
						
						entry.getDirectory('extension/' + extname, { create: true }, function(){
							var recur = function(){
								if (dirs.length) {
									var dirname = 'extension/' + extname + '/' + dirs.shift();
									entry.getDirectory(dirname, { create: true }, recur, function(err){ console.log(err); });
								} else {
									writeFile();
								}
							};
							
							recur();
						});
					});
				}
			} else {
				localStorage.setItem(lib.configprefix + 'extension_' + extname, str);
				var imglist = [];
				for (var i in zip.files) {
					if (i[0] != '.' && i[0] != '_') {
						if (i.indexOf('.jpg') != -1 || i.indexOf('.png') != -1) {
							imglist.push(i);
						}
					}
				}
				if (imglist.length && lib.db) {
					lib.config.extensionInfo[extname] = {
						image: imglist
					}
					game.saveConfig('extensionInfo', lib.config.extensionInfo);
					for (var i = 0; i < imglist.length; i++) {
						var imgname = imglist[i];
						var str = zip.file(imgname).asArrayBuffer();
						if (str) {
							var blob = new Blob([str]);
							var fileReader = new FileReader();
							fileReader.onload = (function(imgname){
								return function(fileLoadedEvent) {
									var data = fileLoadedEvent.target.result;
									game.putDB('image', 'extension-' + extname + ':' + imgname, data);
								};
							}(imgname));
							
							fileReader.readAsDataURL(blob, "UTF-8");
						}
					}
				}
				finishLoad();
			}
			
			delete game.importedPack;
		} catch(e) {
			console.log(e);
			alert('导入失败');
			return false;
		}
	};
	
	
	
},precontent:function(){
    // var script = document.createElement('script');
        // script.src = 'http://eruda.liriliri.io/eruda.min.js'; 
        // document.body.appendChild(script); 
        // script.onload = function(){ eruda.init(); };
	
	
},help:{},config:{},package:{
    character:{
        character:{
        },
        translate:{
        },
    },
    card:{
        card:{
        },
        translate:{
        },
        list:[],
    },
    skill:{
        skill:{
        },
        translate:{
        },
    },
    intro:(function(){
		var log = [
			'功能特点：导入扩展更快，导入新扩展时保存旧扩展配置',
			'当前版本：v1.1.1',
			'更新日期：2020-10-24',
			'- 修复兼容版的BUG；',
		];
		

		return '<p style="color:rgb(200,200,000); font-size:12px; line-height:14px; text-shadow: 0 0 2px black;">' + log.join('<br>') + '</p>';
	})(),
    author:"短歌 QQ464598631",
    diskURL:"",
    forumURL:"",
    version:"1.1.1",
},files:{"character":[],"card":[],"skill":[]},editable:false}})