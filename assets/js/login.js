$(function() {
    //点击注册账号的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    });
    //点击登录账号的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    });
    // 从 layui 中获取 form 对象
    var form = layui.form;
    var layer = layui.layer;
    //通过 form.verify()函数定义校验规则
    form.verify({
        //自定义pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //校验两次密码是否一致的规则
        repwd: function(value) {
            //通过形参拿到的是确认密码框的内容
            //还需要拿到密码框中的内容
            //然后进行一次等于的判断
            //如果判断失败return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }
    });
    //注册用户
    // $('.reg-box form').on('submit', function(e) {
    //     e.preventDefault()
    //     axios.post('/api/reg', $(this).serialize()).then(({ data: res }) => {
    //         if (res.code === 0) {
    //             // 提示用户注册成功
    //             layer.msg('注册成功，请登录~')
    //                 // 展示登录的盒子
    //             $('#link-login').click()
    //         } else {
    //             layer.msg(res.message)
    //         }
    //     })
    // });

    // 注册新用户
    $('.reg-box form').on('submit', function(e) {
        e.preventDefault()
        axios.post('/api/reg', $(this).serialize()).then(({ data: res }) => {
            if (res.code === 0) {
                // 提示用户注册成功
                layer.msg('注册成功，请登录~')
                    // 展示登录的盒子
                $('#link_login').click()
            } else {
                layer.msg(res.message)
            }
        })
    });
    //用户登录
    $('.login-box form').on('submit', function(e) {
        e.preventDefault()
        axios.post('/api/login', $(this).serialize()).then(({ data: res }) => {
            if (res.code === 0) {
                // 提示用户注册成功
                layer.msg('登录成功~');
                // 展示登录的盒子
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            } else {
                layer.msg('登陆失败')
            }
        })
    });
})