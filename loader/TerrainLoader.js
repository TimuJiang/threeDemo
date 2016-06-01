/**
 * @author Bjorn Sandvik / http://thematicmapping.org/
 */

THREE.TerrainLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

};

THREE.TerrainLoader.prototype = {

	constructor: THREE.TerrainLoader,

	loadPNG:function(url, onLoad, onProgress, onError){
		var img = new Image();
		var cav = document.createElement("canvas");
		var context = cav.getContext('2d');
		img.addEventListener('load', function(e){
			context.drawImage(img,0,0,512,512);
			onLoad(context.getImageData(0,0,512,512));
		}, false);
		img.src = url;
	},

	//Uint8ClampedArray
	// 每四个元素为一个像素数据 r,g,b,alpha
	//http://www.jb51.net/article/80817.htm
	loadPNG2: function ( url, onLoad, onProgress, onError ) {

		var scope = this;
		var request = new XMLHttpRequest();

		if ( onLoad !== undefined ) {

			request.addEventListener( 'load', function ( event ) {
				var datas = new Uint8ClampedArray( event.target.response );
				var len = datas.length;
				var index = 0;
				for(var i=0;i<len;i++){
					if(i%4 === 0){ // 每四个元素为一个像素数据 r,g,b,alpha
						var x = i/4%512 + 1;                // 横坐标
						var y = Math.floor(i/4/512) + 1;          // 纵坐标
						var alpha = Math.round(datas[i+3]/255*100)/100; // alpha 值

						if(datas[i+3]==255){ // 没有alpha 值
							//var hex = gethex(datas[i], datas[i+1],datas[i+2]);
							//arrbox.push(x + 'px ' + y + 'px #' + hex);
							console.log(x + 'px ' + y + 'px rgba(' + rgba + ')')
						}else if(alpha>0){ // 有alpha 值
							var rgba = datas[i] + ',' + datas[i+1] + ',' + datas[i+2] + ',' + alpha;
							//arrbox.push(x + 'px ' + y + 'px rgba(' + rgba + ')');
							console.log(x + 'px ' + y + 'px rgba(' + rgba + ')')
						}

					}
				}
				onLoad(  );
				scope.manager.itemEnd( url );

			}, false );

		}

		if ( onProgress !== undefined ) {

			request.addEventListener( 'progress', function ( event ) {

				onProgress( event );

			}, false );

		}

		if ( onError !== undefined ) {

			request.addEventListener( 'error', function ( event ) {

				onError( event );

			}, false );

		}

		if ( this.crossOrigin !== undefined ) request.crossOrigin = this.crossOrigin;

		request.open( 'GET', url, true );

		request.responseType = 'arraybuffer';

		request.send( null );

		scope.manager.itemStart( url );

	},


	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;
		var request = new XMLHttpRequest();

		if ( onLoad !== undefined ) {

			request.addEventListener( 'load', function ( event ) {
				//onLoad( new Uint32Array( event.target.response ) );
				scope.manager.itemEnd( url );

			}, false );

		}

		if ( onProgress !== undefined ) {

			request.addEventListener( 'progress', function ( event ) {

				onProgress( event );

			}, false );

		}

		if ( onError !== undefined ) {

			request.addEventListener( 'error', function ( event ) {

				onError( event );

			}, false );

		}

		if ( this.crossOrigin !== undefined ) request.crossOrigin = this.crossOrigin;

		request.open( 'GET', url, true );

		request.responseType = 'arraybuffer';

		request.send( null );

		scope.manager.itemStart( url );

	},

	setCrossOrigin: function ( value ) {
		this.crossOrigin = value;
	}

};