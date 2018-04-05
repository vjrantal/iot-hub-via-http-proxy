module.exports = function (client, message, callback) {
  var close = function (error) {
    if (error) {
      console.error(error);
    }
    client.removeAllListeners();
    client.close(function () {
      callback();
    });
  };
  client.open(function (error) {
    if (error) {
      close(error);
      return;
    }
    client.on('error', function (error) {
      close(error);
    });
    client.on('disconnect', function (error) {
      close(error);
    });
    client.sendEvent(message, function (error, result) {
      if (error) {
        close(error);
        return;
      }
      console.log('Message sent');
      close();
    });
  });
};
