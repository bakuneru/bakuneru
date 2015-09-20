// 初期人数
var initNum = $("#allNum span").text();

// 顔数を数える
function tagNum(photo){
  console.log(photo.tags);
  if (photo.tags) {
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
    $("#allNum span").text(tagNum(photo));
  } else {
    // 寝ている人数を算出
    var currNum = tagNum(photo);
    var sleepNum = initNum - currNum;
    $('span#current_num').text(tagNum(photo));
  }
}

// 画像をAPIで判定
function detectFace(){
  client.facesDetect("http://bak.seldnext.com/img/photo.png",
    null, options, callback);
}