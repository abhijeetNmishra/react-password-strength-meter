# [React Password Strength Meter](https://github.com/abhijeetNmishra/react-password-strength-meter)
React Component to display password strength meter with message and warning

## Installation & Usage

```
npm install react-color --save
```

### Include the Component

```
var React = require('react');
var PasswordStrengthMeter = require('react-password-strength-meter');

class Component extends React.Component {
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event){

  }

  render() {
    return <PasswordStrengthMeter passwordText={"Enter Password"} onChange={this.onChange} />;
  }
}
```

## License

MIT © [Abhijeet Mishra](https://github.com/abhijeetNmishra)
