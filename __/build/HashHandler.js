"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var RequestHandler = require('./RequestHandler');
module.exports = zn.Class(RequestHandler, {
  events: ['hashchange', 'handler'],
  properties: {},
  methods: {
    init: function init(argv, events) {
      this.__initEvents(events);
      if (this["super"].caller) {
        this["super"](argv);
      } else {
        this.constructor._super_.prototype.init(argv, events);
      }
      if (this._main.length && !location.hash) {
        location.hash = this._main.pop();
      } else {
        this.__hashchange();
      }
      window.addEventListener('hashchange', this.__hashchange.bind(this), false);
    },
    __initEvents: function __initEvents(events) {
      if (events && _typeof(events) == 'object') {
        for (var event in events) {
          this.on(event, events[event], this);
        }
      }
    },
    __hashchange: function __hashchange(event) {
      var _return = this.fire('hashchange', event);
      if (_return === false) return false;
      var _hash = this.__parseHash(),
        _request = this.createRequest(_hash, event);
      _return = this.fire('handler', event, _hash);
      if (_return === false) return false;
      this.doRequest(_request);
    },
    __parseHash: function __parseHash() {
      var _hash = location.hash,
        _search = location.search,
        _hashSplitIndex = _hash.indexOf('?');
      if (_search && _search.indexOf('?') !== -1) {
        _search = _search.replace('?', '');
      }
      if (_hashSplitIndex !== -1) {
        _search = _search + '&' + _hash.substring(_hashSplitIndex + 1);
        _hash = _hash.substring(0, _hashSplitIndex);
      }
      return {
        path: _hash.substring(1),
        search: zn.querystring.parse(_search)
      };
    }
  }
});