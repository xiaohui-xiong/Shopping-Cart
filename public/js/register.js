window.onload = () => {
    $("#email").blur(checkEmail);

    function checkEmail() {
        // debugger
        let email = this.value;
        if (!email) {
            $('#preEmail').html('邮箱不能为空');
            $('#preEmail').css({ "color": "red" });
            return;
        };
        if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) {
            $('#preEmail').html('邮箱格式不正确');
            $('#preEmail').css({ "color": "red" });
            return
        };
        $('#preEmail').html('邮箱可用');
        $('#preEmail').css({ "color": "green" });
    }

    $("#password").blur(checkPwd);

    function checkPwd() {
        let pwd = this.value;
        if (!pwd) {
            $('#pwd').html('密码不能为空');
            $('#pwd').css({ "color": "red" });
            return;
        };
        if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(pwd)) {
            $('#pwd').html('密码格式不正确');
            $('#pwd').css({ "color": "red" });
            return
        };
        $('#pwd').html('密码可用');
        $('#pwd').css({ "color": "green" });

    }
    $("#repwd").blur(checkrePwd);

    function checkrePwd() {
        let repwd = this.value;
        console.log(repwd);
        console.log($('#password').val());
        if (repwd != $('#password').val()) {
            $('#prorepwd').html('两次密码不一致');
            $('#prorepwd').css({ "color": "red" });
            return;
        };
        if (!repwd) {
            $('#prorepwd').html('请再次输入密码');
            $('#prorepwd').css({ "color": "red" });
            return;
        }
        $('#prorepwd').html('密码一致');
        $('#prorepwd').css({ "color": "green" });
    }
    $('#Verification').blur(checkerYan);

    function checkerYan() {
        let Verification = this.value;
        if (!Verification) {
            $('#reVerification').html("请输入验证码");
            $('#reVerification').css({ "color": "red" });
            return;
        };
        $('#reVerification').html("验证码输入成功");
        $('#reVerification').css({ "color": "green" });
    }
    $('#butt').click(checkButt);

    function checkButt() {
        pAjax({
            url: 'http://localhost:3000/api/user/getCode',
            method: 'get',
            data: {
                email: $('#email').val(),
                password: $('#password').val(),
                repwd: $('#repwd').val(),
            },
            dataType: 'json',
        }).then(res => {
            if (res.code == 0) {
                console.log(res.data);
                $('#Verification').val(res.data)
            }
        })
    }
    $('#register').click(checkregister);

    function checkregister() {
        pAjax({
            url: 'http://localhost:3000/api/user/register',
            method: 'post',
            data: {
                email: $('#email').val(),
                password: $('#password').val(),
                repwd: $('#repwd').val(),
                Verification: $('#Verification').val(),
            },
            dataType: 'json',
        }).then(res => {
            if (res.code == 0) {
                location.href = "/login.html"
            }
        })
    }
    $('#Jump').click(chivkJump);

    function chivkJump() {
        location.href = "/login.html"
    }

}