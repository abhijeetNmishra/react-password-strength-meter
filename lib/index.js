'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _zxcvbn = require('zxcvbn');

var _zxcvbn2 = _interopRequireDefault(_zxcvbn);

var PasswordStrengthMeter = (function (_Component) {
  _inherits(PasswordStrengthMeter, _Component);

  function PasswordStrengthMeter(props) {
    _classCallCheck(this, PasswordStrengthMeter);

    _get(Object.getPrototypeOf(PasswordStrengthMeter.prototype), 'constructor', this).call(this, props);
    this.handleInput = this.handleInput.bind(this);
    this.state = {
      resultScore: '',
      warning: '',
      suggestions: ''
    };
  }

  _createClass(PasswordStrengthMeter, [{
    key: 'handleInput',
    value: function handleInput(event) {
      event.preventDefault();
      var strength = this.props.strength;

      strength = strength ? strength : {
        0: 'Worst ☹',
        1: 'Bad ☹',
        2: 'Weak ☹',
        3: 'Good ☺',
        4: 'Strong ☻'
      };

      var password = _reactDom2['default'].findDOMNode(this.refs.password);
      var meter = _reactDom2['default'].findDOMNode(this.refs.passwordStrengthMeter);
      var text = _reactDom2['default'].findDOMNode(this.refs.passwordStrengthText);

      var val = password.value;
      var result = (0, _zxcvbn2['default'])(val);

      // Update the password strength meter
      meter.value = result.score;

      // Update the text indicator
      if (val !== '') {
        this.setState({
          resultScore: strength[result.score],
          warning: result.feedback.warning,
          suggestions: result.feedback.suggestions
        });
      } else {
        this.setState({
          resultScore: '',
          warning: '',
          suggestions: ''
        });
      }

      this.props.onChange(event);
    }
  }, {
    key: 'render',
    value: function render() {
      var passwordText = this.props.passwordText;

      var passwordHeader = passwordText ? passwordText : 'Enter Password';
      var _state = this.state;
      var resultScore = _state.resultScore;
      var warning = _state.warning;
      var suggestions = _state.suggestions;

      return _react2['default'].createElement(
        'section',
        null,
        _react2['default'].createElement(
          'label',
          { forHtml: 'password' },
          passwordHeader
        ),
        _react2['default'].createElement('input', { onInput: this.handleInput, type: 'password', name: 'password', id: 'password', ref: 'password' }),
        _react2['default'].createElement('meter', { max: '4', id: 'password-strength-meter', ref: 'passwordStrengthMeter' }),
        _react2['default'].createElement(
          'p',
          { id: 'password-strength-text', ref: 'passwordStrengthText' },
          resultScore && 'Strength: ',
          _react2['default'].createElement(
            'strong',
            null,
            resultScore
          ),
          _react2['default'].createElement(
            'span',
            { className: 'feedback' },
            warning + ' ' + suggestions
          )
        )
      );
    }
  }]);

  return PasswordStrengthMeter;
})(_react.Component);

exports['default'] = PasswordStrengthMeter;

PasswordStrengthMeter.propTypes = {
  passwordText: _react2['default'].PropTypes.string,
  strength: _react2['default'].PropTypes.object,
  onChange: _react2['default'].PropTypes.func
};
module.exports = exports['default'];
