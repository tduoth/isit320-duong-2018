var ReactBasics = function (_React$Component) {
   _inherits(ReactBasics, _React$Component);

   function ReactBasics() {
      _classCallCheck(this, ReactBasics);

      return _possibleConstructorReturn(this,
        (ReactBasics.__proto__ ||
           Object.getPrototypeOf(ReactBasics)).apply(this, arguments));
   }

   _createClass(ReactBasics, [{
      key: 'render',
      value: function render() {
         return _react2.default.createElement(
            'h1',
            null,
            'An H1 element in a React Component'
         );
      }
   }]);

   return ReactBasics;
}(_react2.default.Component);