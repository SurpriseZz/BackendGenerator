<!DOCTYPE html>
<html>
<head>
    <title>{{name}}</title>
    <link href="/static/normalize.css" rel="stylesheet">
    <link href="/static/logo.png" rel="icon" type="image/x-icon">
</head>
<body>
<h1 style="color: red;">Page1</h1>
<button onclick="handleClick()">发送请求</button>
</body>
<script src="/static/axios.min.js"></script>
<script src="/static/md5.min.js"></script>
<script type="text/javascript">
    const handleClick = () => {
        const signKey = 'asd23rasd33rferf23rf23234';
        const st = Date.now();
        axios.request({
            method: 'get',
            url: '/api/project/list',
            params:{proj_key:'text'},
            headers: {
                s_t:st,
                s_sign: md5(`${signKey}_${st}`)
            }
        })
    }

</script>
</html>