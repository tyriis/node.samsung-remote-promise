var SamsungRemote = require('samsung-remote');
var Promise = require('bluebird');

var Remote = function(config) {

  var client = new SamsungRemote(config);

  this.send = function(command) {
    return new Promise(function(resolve, reject) {
      client.send(command, function callback(err) {
        if (err) {
          return reject(err);
        }
        resolve(true);
      });
    });
  };

  this.isAlive = function() {
    return new Promise(function(resolve, reject) {
      client.isAlive(function(err) {
        if (err) {
          return reject('TV is offline');
        }
        resolve(true);
      });
    });
  }
};

module.exports = Remote;