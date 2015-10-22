# express-xml-parser [![Build Status](https://travis-ci.org/maltebreuer/express-xml-parser.svg)](https://travis-ci.org/maltebreuer/express-xml-parser)
XML parser middleware for Express.

# Purpose
The parser can be used by any Express.js application to retrieve a Javascript representation of an XML that is sent to the Express app with header `application/xml`.

You can use the middleware in the same way other Express middleware is used:

    var expressXmlParser = require('express-xml-parser');
    ...
    app.use(xmlParser());
    app.use(bodyParser.json());
    ...

# Changes to the req object

If the XML can be parsed the `req._xml` flag is set to `true`.

The XML content is parsed into a Javascript object for further processing. It is also stored in its raw format, so that

    req.rawXml // contains raw XML data
    req.xml2js // contains parsed XML as a Javascript object
