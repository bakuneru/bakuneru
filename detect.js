// 初期人数
var initNum = $("#allNum span").text();

// 顔数を数える
function tagNum(photo){
  console.log(photo.tags);
  if (photo.tags) {
    console.log("Number of faces: " + photo.tags.length);
    return photo.tags.length;
  }
  else {
    console.log("Failed to detect photo object");
  }
}

// 顔数を記載
function writeTagNum(photo){
  if (initNum == "...") {
    // 初期人数を設定
    initNum = tagNum(photo);
    $("#allNum span").text(initNum);
  } else {
    // 寝ている人数を算出
    var currNum = tagNum(photo);
    var sleepNum = parseInt(initNum) - parseInt(currNum);
    console.log(sleepNum);
    $('span#current_num').text(sleepNum);
  }
}

function callback(data) {
  console.log("callback");
  writeTagNum(data.photos[0]);
  console.log("End of callback");
}

// 画像をAPIで判定
function detectFace(){
  console.log("Start detectFace");
  client.facesDetect("http://bak.seldnext.com/img/photo.png",
    null, options, callback);
  console.log("End detectFace");
}