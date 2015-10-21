# express-xml-parser
XML parser middleware for Express

# Purpose
This XML parser can be used by any node.js application to create a parsed XML as part of the request object.
It uses

- xml2js
- raw-body

as packages to parse the body and can be inserted as a middleware in express by using:

    var xmlParser = require('./xml-parser');
    ...
    app.use(xmlParser());
    app.use(bodyParser.json());
    ...

If the XML can be parsed the `req._xml` flag is set to `true`.

The XML content is parsed into a Javascript object for further processing. It is also stored in its raw format, so that

    req.rawXml // contains raw XML data
    req.xml2js // contains parsed XML as a Javascript object
