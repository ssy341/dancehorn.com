

var contactForm = {
    sendmail: function (name, contact, msg, callback) {
        $.ajax({
            url: "/templets/dancehorn/module/sendmail.php",
            data: {
                name: name,
                msg: msg,
                contact: contact
            },
            type: "post",
            success: function (data) {
                callback(data);
            }
        });
    },
    formVaild:function(){
        $("#sendAction").click(function () {
            var name = $("input[name='name']").val();
            var contact = $("input[name='contact']").val();
            var msg = $("#msg").val();
            if (name.length < 0 || name === "姓名") $("#error").html("请输入姓名");
            if (contact.length < 0 || contact === "电话或者邮箱") $("#error").html("请输入电话或者邮箱");
            if (name.length > 0 && name != "姓名" && contact.length > 0 && contact != "电话或者邮箱") {
                contactForm.sendmail(name,contact,msg,function (data) {
                    console.log(data);
                    alert("感谢您的来信，我们已经收到！");
                    $("input[name='name']").val("姓名");
                    $("input[name='contact']").val("电话或者邮箱");
                    $("#msg").val("");
                });
            }
        });
    },
    clearForm:function(){
        $("#clearAction").click(function(){
            $("#ContactForm")[0].reset();
        });
    }
};

$(document).ready(function(){
    contactForm.formVaild();
    contactForm.clearForm();
});
