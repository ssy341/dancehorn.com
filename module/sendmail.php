<?php
require("mail.php");

$name = $_POST['name'];
$contact = $_POST['contact'];
$msg = $_POST['msg'];

if ($name & $contact) {
    $content = '姓名:' . $name . '联系方式:' . $contact . '留言:' . $msg;
    $result = send_mail_lazypeople('333@dancehorn.com', '来自DanceHorn网站的留言', $content);
    echo $result;
} else {
    echo "请填写电话号码和姓名";
}

?>
