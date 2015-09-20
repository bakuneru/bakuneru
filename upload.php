<?php
$imageData = filter_input(INPUT_POST, 'image');

print_r($realtime_image);

$filename = '/var/www/html/bak.seldnext.com/img/photo.png';
$fp = fopen($filename, 'w');

//fwrite($fp,base64_decode($imageData));


if(fwrite($fp,base64_decode($imageData))) {
  $seiko = true;
}

fclose($fp);


