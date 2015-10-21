var getRawBody = require('raw-body');
var xml2js = require('xml2js');
var typeis = require('type-is');

module.exports = function xmlParser(options) {
  return function(req,res,next) {
    // Check whether the passed body is in fact XML
    if (!typeis(req, 'xml')) return next();

    // parse
    getRawBody(req, {
      length: req.headers['content-length'],
      limit: '1mb',
      encoding: 'utf8'
    }, function (err, string) {
      if (err)
        return next(err)

      // Indicate that XML was parsed
      req._xml = true;

      req.rawXml = string
      req.xml = xml2js.parseString(string, {"explicitArray":false}, function(err,result) {
        // Flag as parsed
        req._xml2js = true;

        req.xml2js = result;
      })
      next()
    })
  }
}
