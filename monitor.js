var video = document.querySelector('video');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var localMediaStream = null;

// APIの初期化
var client = new FCClientJS("ca7f568066a44d348991584314fec224", "1dd6c0839ab943eaa4e084189fed33d5");
var options = new Object();

// カメラ使えるかチェック
var hasGetUserMedia = function() {
	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

if (hasGetUserMedia()) {
  console.log("カメラ OK");
} else {
  alert("未対応ブラウザです。");
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
          data: data,
          dataType: 'json'
        });
	}
        console.log("File uploaded");
}

window.URL = window.URL || window.webkitURL;
navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia ||
						  navigator.mozGetUserMedia || navigator.msGetUserMedia;

navigator.getUserMedia({video: true}, function(stream) {
  video.src = window.URL.createObjectURL(stream);
  localMediaStream = stream;
}, onFailSoHard);

$(function(){
  // 画像のアップ
  setInterval(function(){
    fileupload();
  },30000);

  // 顔の検知処理
  // setInterval(function(){
  //   detectFace();
  // },10000);
});
