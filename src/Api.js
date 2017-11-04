import XmlParser from './XmlParser';

const xmlParser = new XmlParser();

class Api {
  search(query) {
    return fetch('./test.xml')
      .then(r => r.text())
      .then(r => xmlParser.parse(r))
      .then(r => ({
        markers: this.toMarkers(r)
      }));
  }

  toMarkers(r) {
    return r.resultset.result.map(r => ({
      lat: Number(r.$.latitude),
      lng: Number(r.$.longitude)
    }));
  }
}

export default Api;
