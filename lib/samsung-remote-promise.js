var SamsungRemote = require('samsung-remote');
var Promise = require('bluebird');

var Remote = function(config) {

  var client = new SamsungRemote(config);
  var remote = this;

  this.send = function(command) {
    if (Array.isArray(command)) {
        var p = Promise.resolve();
        for (var i = 0; i < command.length; i++) {
          p = p.then((function(command) {
              return remote.send(command)
          }).bind(this, command[i]));
        }
        return p;
    } else {
      return new Promise(function(resolve, reject) {
        client.send(command, function callback(err) {
          if (err) {
            return reject(err);
          }
          setTimeout(function() { resolve(true) }, 300);
        });
      });
    }
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
