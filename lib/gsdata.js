var signature = require('./signature');
var urllib = require('co-urllib');
var co = require('co');
var Base64 = require('js-base64').Base64;

function Gsdata(appId, appKey) {
  this.appId = appId;
  this.appKey = appKey;
  this._url = 'http://open.gsdata.cn';
}

Gsdata.prototype.getSysUserInfo = function (loginName) {
  
  var params = {
    'loginname': loginName
  }

  return this.callApi('/api/sys/sysapi/user_info', params)
}

Gsdata.prototype.getSysCheckUser = function (loginName) {

  var params = {
    'loginname': loginName
  }

  return this.callApi('/api/sys/sysapi/check_user', params)
}

Gsdata.prototype.callApi = co.wrap(function* (api, params) {

  params['appid'] = this.appId;
  params['signature'] = signature.md5(signature.stringify(params).toLowerCase() + this.appKey);

  var str = signature.stringify(params);
  var result = yield urllib.request(this._url + api, {
    method : 'POST',
    data: Base64.encode(str),
    headers: {'Content-Type': 'application/octet-stream'}
  });

  return JSON.parse(result.data);
})

Gsdata.addChainFn = function(name, onCall) {
  Object.defineProperty(Gsdata.prototype, name, {
    get: function() {
      return onCall(this);
    },
    enumerable: true
  });
}

Gsdata.addChainFn('wx', function(that) {

  return {
    getNickNames: function() {
      return that.callApi('/api/wx/wxapi/nickname', {});   
    },

    getResultDay: function(day, groupId) {
      var params = {}
      params['day'] = day;
      params['groupid'] = groupId;

      return that.callApi('/api/wx/wxapi/result_day', params);
    },

    getResultWeek: function(day, groupId) {
      var params = {}
      params['day'] = day;
      params['groupid'] = groupId;

      return that.callApi('/api/wx/wxapi/result_week', params);
    },

    getResultTables: function(month, type) {
      var params = {}
      params['month'] = month;
      params['type'] = type;

      return that.callApi('/api/wx/wxapi/result_tables', params);
    }

  }
});

module.exports = Gsdata;
