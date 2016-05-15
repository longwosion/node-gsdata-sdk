## node-gsdata-sdk

![MIT](https://img.shields.io/npm/l/express.svg) 
[![Build Status](https://travis-ci.org/longwosion/node-gsdata-sdk.svg?branch=master)](https://travis-ci.org/longwosion/node-gsdata-sdk)

### Introduction

[node-gsdata-sdk](http://github.com/longwosion/node-gsdata-sdk) is a unoffical [gsdata](http://open.gsdata.cn) sdk for nodejs.

### Install

```bash
$ npm install node-gsdata-sdk
```

### Usage

```node
var Gsdata = require('node-gsdata-sdk');

// create new api client
var client = new Gsdata("YOUR_API_ID", "YOUR_APP_SECRET");

// get user information
client.getSysUserInfo('longwosion@gmail.com').then(function(data) {
    var user = data.returnData;
    console.log(user.uid)
})

// call other api
//   - 1st parameter is api-path
//   - 2nd parameter is extra parameters object (ignore appId and appKey)
client.callApi('/api/wx/wxapi/wx_content', {
    'url': 'http://mp.weixin.qq.com/s?__biz=MzAxOTEyMDI1MQ==&mid=400950548&idx=3&sn=cca852f541f93c53633a4e0069230313&3rd=MzA3MDU4NTYzMw==&scene=6#rd'
}).then(function(data) {
    console.log(data)
})
```

You could also use `co` to avoid callback style.

```node
var co = require('co');
var Gsdata = require('node-gsdata-sdk');

// create new api client
var client = new Gsdata("YOUR_API_ID", "YOUR_APP_SECRET");

co(function *(){
    // get user information
    var data = yield client.getSysUserInfo('longwosion@gmail.com');
    console.log(data.returnData.uid);

    // call other api
    //   - 1st parameter is api-path
    //   - 2nd parameter is extra parameters object (ignore appId and appKey)
    var info = yield client.callApi('/api/wx/wxapi/wx_content', {
        'url': 'http://mp.weixin.qq.com/s?__biz=MzAxOTEyMDI1MQ==&mid=400950548&idx=3&sn=cca852f541f93c53633a4e0069230313&3rd=MzA3MDU4NTYzMw==&scene=6#rd'
    });
    console.log(info);
})


});

```
