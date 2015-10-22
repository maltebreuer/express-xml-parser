/*jshint expr: true*/
/*jshint mocha: true*/
var fs = require('fs');
var path = require('path');

var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

var express = require('express');

// Module that is tested
var parser = require('../index.js');

describe('Using the express-xml-parser middleware', function() {
  var app = express();

  // Prepare file to be sent
  var xmlFile = fs.readFileSync(path.resolve(__dirname, 'test.xml'));

  beforeEach(function() {
    // Setup middleware to be tested
    app.use(parser());
  });

  it('should set the _xml flag on the req object to true', function(done) {
    app.use(function(req, res) {
      expect(req._xml).to.be.true;
      res.end();
    });

    request(app)
      .post('/')
      .send(xmlFile)
      .set('Content-Type', 'application/xml')
      .expect(200, done);
  });

  it('should set the content of rawXml to the original XML content', function(done) {
    app.use(function(req, res) {
      expect(req.rawXml).to.exist;
      expect(req.rawXml).to.equal(xmlFile.toString());
      res.end();
    });

    request(app)
      .post('/')
      .send(xmlFile)
      .set('Content-Type', 'application/xml')
      .expect(200, done);
  });

  it('should set the content of xml2js to the xml2js-converted Javascript object representation of the original XML', function(done) {
    app.use(function(req, res) {
      expect(req.xml2js).to.exist;
      res.end();
    });

    request(app)
      .post('/')
      .send(xmlFile)
      .set('Content-Type', 'application/xml')
      .expect(200, done);
  });
});
