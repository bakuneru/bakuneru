<?php
filter_input(INPUT_POST, $realtime_image);

print_r($realtime_image);

$data = file_get_contents($realtime_image);
file_put_contents('img/photo.jpg',$data);
