var video = document.querySelector('video');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var localMediaStream = null;

//カメラ使えるかチェック
var hasGetUserMedia = function() {
	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia || navigator.msGetUserMedia);
}
//エラー
var onFailSoHard = function(e) {
	console.log('エラー!', e);
};

//カメラ画像アップロード
var fileupload = function() {
	if (localMediaStream) {
		ctx.drawImage(video, 0, 0);
        var canvasData = canvas.toDataURL('image/webp');
		document.querySelector('img').src = canvasData;

        var url = 'http://bak.seldnext.com/upload.php';
        var data = {};
        canvasData = canvasData.replace(/^data:image\/png;base64,/, '');

        data.image = canvasData;

        $.ajax({
          url: url,
          type: 'POST',
          success: function(){
            // ここで顔認識のメソッドを呼び出す
          },
          data: data,
          dataType: 'json'
        });
	}
}

//眠っている人数の設定
var setSleepNum = function(num) {
	$("#sleeperNum span").text(num);
}

if (hasGetUserMedia()) {
	console.log("カメラ OK");
} else {
	alert("未対応ブラウザです。");
}

window.URL = window.URL || window.webkitURL;
navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia ||
						  navigator.mozGetUserMedia || navigator.msGetUserMedia;

navigator.getUserMedia({video: true}, function(stream) {
  video.src = window.URL.createObjectURL(stream);
  localMediaStream = stream;
}, onFailSoHard);

var sleepCount = 0;

$(function(){
    setInterval(function(){
      fileupload();
    },1000);
		setInterval(function(){
      setSleepNum(sleepCount++);
    },1000);
});
