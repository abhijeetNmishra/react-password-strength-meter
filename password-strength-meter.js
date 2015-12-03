import React, {Component,PropTypes} from 'react';
import ReactDom from 'react-dom';
import zxcvbn from 'zxcvbn';

export default class PasswordStrengthMeter extends Component{
  constructor(props){
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.state = {
      resultScore: '',
      warning: '',
      suggestions:''
    };
  }

  handleInput(event){
    event.preventDefault();
    let { strength } = this.props;
    strength = (strength) ? strength : {
      0: "Worst ☹",
      1: "Bad ☹",
      2: "Weak ☹",
      3: "Good ☺",
      4: "Strong ☻"
    }

    const password = ReactDom.findDOMNode(this.refs.password);
    const meter = ReactDom.findDOMNode(this.refs.passwordStrengthMeter);
    const text = ReactDom.findDOMNode(this.refs.passwordStrengthText);

    let val = password.value;
    let result = zxcvbn(val);

    // Update the password strength meter
    meter.value = result.score;

    // Update the text indicator
    if(val !== "") {
        this.setState({
          resultScore:strength[result.score],
          warning:result.feedback.warning,
          suggestions:result.feedback.suggestions
        });
    }
    else {
      this.setState({
        resultScore:'',
        warning:'',
        suggestions:''
      })
    }

    this.props.onChange(event);
  }

  render(){
    const { passwordText } = this.props;
    const passwordHeader = (passwordText) ? passwordText : 'Enter Password';
    const {resultScore,warning,suggestions} = this.state;
    return(
      <section>
        <label forHtml="password">{passwordHeader}</label>
        <input onInput={this.handleInput} type="password" name="password" id="password" ref="password" />

        <meter max="4" id="password-strength-meter" ref="passwordStrengthMeter"></meter>
        <p id="password-strength-text" ref="passwordStrengthText">
          {resultScore &&
            "Strength: "}
            <strong>{resultScore}</strong><span className="feedback">{warning + " " + suggestions}</span>
        </p>
      </section>
    )
  }
}

PasswordStrengthMeter.propTypes = {
  passwordText: React.PropTypes.string,
  strength: React.PropTypes.object,
  onChange: React.PropTypes.func,
}
