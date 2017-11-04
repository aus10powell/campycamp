const parseString = require('xml2js').parseString;

class XmlParser {
  parse(xmlString) {
    return new Promise((resolve, reject) => {
      parseString(xmlString, {trim: true}, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

export default XmlParser;
