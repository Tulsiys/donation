"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ImageLoader extends _react.default.Component {
  // constructor(props) {
  //     super(props);

  // this.onload = this.onload.bind(this);
  // }

  // onload(e) {
  //     console.log('image onload', new Date());
  // }

  render() {
    var _this$props$type, _this$props$type2;
    let file;
    // let ext = this.props.src?.substr(this.props.src.lastIndexOf('.'));
    // ext.match(/jpg|jpeg|png|svg/gi) &&

    if (((_this$props$type = this.props.type) === null || _this$props$type === void 0 ? void 0 : _this$props$type.toLowerCase()) === 'image') {
      var _this$props$alt, _this$props$id;
      file = /*#__PURE__*/_react.default.createElement("img", {
        src: this.props.src /* onLoad={this.onload} */,
        alt: (_this$props$alt = this.props.alt) !== null && _this$props$alt !== void 0 ? _this$props$alt : '',
        id: (_this$props$id = this.props.id) !== null && _this$props$id !== void 0 ? _this$props$id : ''
      });
      // ext.match(/mp3|mp4/gi) &&
    } else if (((_this$props$type2 = this.props.type) === null || _this$props$type2 === void 0 ? void 0 : _this$props$type2.toLowerCase()) === 'video') {
      file = /*#__PURE__*/_react.default.createElement("video", {
        width: "100%",
        height: "100%",
        loop: true,
        autoPlay: true,
        muted: true,
        playsInline: true
      }, /*#__PURE__*/_react.default.createElement("source", {
        src: this.props.src,
        type: "video/mp4"
      }), "Your browser does not support the video tag.");
    }
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, file);
  }
}
var _default = ImageLoader;
exports.default = _default;