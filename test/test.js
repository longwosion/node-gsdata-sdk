describe('Gsdata', function() {
  
  var signature = require('../lib/signature');
  var Gsdata = require('../lib/gsdata');
  var coMocha = require('co-mocha');

  var appId = 'bz14X7D8Qy9K6kaKhrJi';
  var appKey = 'HuC7xP6hCNbEQNd2qBfP8Q161';
  var email = 'longwosion@gmail.com'

  var client = new Gsdata(appId, appKey);

  it('should return corrent md5 signature', function() {
    var str = '{"appid":"'+appId+'","loginname":"'+email+'"}';
    str = str.toLowerCase() + appKey;
    signature.md5(str).should.be.eql('59d29662a8ca8f2d25664f79b7d864d3');
  });

  it('should output stable stringify json', function() {
    var obj = {'loginname': 'longwosion@gmail.com', 'appid':'bz14X7D8Qy9K6kaKhrJi'};
    signature.stringify(obj).should.be.eql('{"appid":"bz14X7D8Qy9K6kaKhrJi","loginname":"longwosion@gmail.com"}');
  });

  it('GET sys_user_info', function* () {
    this.timeout(10000);
    var data = yield client.getSysUserInfo('longwosion@gmail.com');
    data.returnCode.should.be.eql('1001')
  });

  it('GET sys_check_user', function* () {
    this.timeout(10000);
    var data = yield client.getSysCheckUser('longwosion@gmail.com');
    data.returnCode.should.be.eql('1001')
  });

  it('GET wx_content', function* () {
    this.timeout(10000);
    var api = '/api/wx/wxapi/wx_content';
    var params = {'url':'http://mp.weixin.qq.com/s?__biz=MzAxOTEyMDI1MQ==&mid=400950548&idx=3&sn=cca852f541f93c53633a4e0069230313&3rd=MzA3MDU4NTYzMw==&scene=6#rd'}
    var data = yield client.callApi(api, params)
    data.returnCode.should.be.eql('1001')
  });

})
