//express 호출하기

var express = require('express');
var app = express();

//option 파일 불러오기 작은 따옴표 안은 경로 자신의 파일이 있는 경로로 바꿔주기

var options = require('./src/option');


var loginData = {
        host: options.storageConfig.HOST,
        user: options.storageConfig.user,
        password: options.storageConfig.password
};

/*mysql과의 연결부분. mysql에서 설정해둔 정보로 바꿔준다. mysql 의 기본포트는 3306 이다. 바꾸지 않았다면 그대로 쓸 것.
실제적인 connection 은 이워지지 않는다.*/

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  port:'3306',
  user:'root',
  password:'moon1234',
  database:'Local'
})
connection.connect();

/*express의 정적파일을 불러온다 public 폴더 안에 있으므로 'public'으로 지정함 다른 경로에 넣었다면 바꿀 것
보통 이 경로안의 파일은 css 파일이나 이미지를 불러온다.*/

app.use(express.static('public'));

app.listen(3000,function(){
  console.log("server start on port 3000!");
})

app.get('/', function(req,res){
  res.sendFile(__dirname+'/public/main.html');//작은 따옴표 안의 경로를 자신이 지정해 둔 파일의 경로로 바꾸자  
});

//서버 부분으로 button클릭해 쿼리를 데이터 베이스에 전송한다. 

app.post('/', function(req, res){
  var responseData = {};

  var query =  connection.query('select score from Data_Comparison where uid="ma" ORDER BY num DESC limit 10', function(err,rows){
    responseData.score = [];
    if(err) throw err;
    if(rows[0]){
      responseData.result = "ok";
      rows.forEach(function(val){
        responseData.score.push(val.score);
      })
    }
    else{
      responseData.result = "none";
      responseData.score = "";
    }
    res.json(responseData);
  });
});