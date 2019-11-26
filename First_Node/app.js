// 필요한 모듈을 불러옴
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// morgan: http 리퀘스트에 대해 로깅하는 모듈 / 객체를 생성함
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// app이라는 객체를 선언하고 express() 함수로 생성함 
// 이 객체를  이용하여 웹 서버의 특징을 기술함
var app = express();

// view engine setup
// app 객체에 대한 트깅, 즉 우리가 생성할 웹 서버의 특징을 기술하는 부분
// 화면을 보이게 할 뷰 템플릿 파일들이 있는 경로를 라우팅하기 위해 그 값을 미리 정의
// 화면의 출력을 담당하는 뷰 계층을 구성하는 파일들을 연결하는 부부이라고 이해하면 됨.
// 앞으로 view 템플릿 파일을 만들고 난 후, views 폴더 안에 넣어주고 라우팅 설정
app.set('views', path.join(__dirname, 'views'));
// 뷰에 사용될 기본 엔진의 이름을 정의 express 에서는 ejs, pug(jade) 등을 지원함.
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 디렉터리 구조를 url에 반영하여 쉽게 접근 가능한 정적 디렉토리를 설정
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler : 에러 발생할때 어떻게 처리할건지
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
