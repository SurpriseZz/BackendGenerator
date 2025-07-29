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
<script src="https://cdn.bootcss.com/axios/0.18.0/axios.min.js"></script>
<script type="text/javascript">
        const handleClick = () => {
            axios.get('/api/project/list').then(
                (res) => {
                    console.log(res.data)
                }
            )
        }

</script>
</html>