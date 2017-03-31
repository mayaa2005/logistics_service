import React, { PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';

class NumberInput extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    real: PropTypes.bool,
    sign: PropTypes.bool,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.initState(props);
  }

  componentWillReceiveProps(nextProps) {
    this.initState(nextProps);
  }

  initState = (props) => {
    if (this.isFit(String(props.defaultValue))) {
      this.state = { value: String(props.defaultValue) };
    } else {
      this.state = { value: '' };
    }
  };

  onCompositionStart = (event) => {
    this.compositing = true;
    this.originalValue = event.target.value;
  };

  onCompositionEnd = () => {
    this.compositing = false;
  };

  onChange = (event) => {
    const value = event.target.value;
    if (this.compositing) {
      this.setState({ value });
    } else if (this.isFit(value)) {
      if (value !== this.state.value) {
        this.setState({ value });
        if (this.props.onChange) {
          this.props.onChange(event);
        }
      }
    } else if (!this.isFit(this.state.value)) {
      // 打开输入法后，编辑框中的内容可能会被非法字符替换，所以需要恢复到打开输入法之前的状态
      const originalValue = this.originalValue || '';
      if (value !== originalValue) {
        this.setState({ value: originalValue });
      }
    }
  };

  isFit = str => {
    const {sign = false, real = false} = this.props;
    return real ? this.isRealNumber(str, sign) : this.isInteger(str, sign);
  };

  isInteger = (str, sign) => {
    return str.match(sign ? /^(\+|-)?\d*$/ : /^\d*$/);
  };

  isRealNumber = (str, sign) => {
    return str.match(sign ? /^(\+|-)?\d*(\.)?\d*$/ : /^\d*(\.)?\d*$/);
  };

  buildProps = () => {
    const { ...otherProps } = this.props;
    delete otherProps.defaultValue;
    delete otherProps.sign;
    delete otherProps.real;
    return {
      ...otherProps,
      type: 'text',
      value: this.state.value,
      onChange: this.onChange,
      onCompositionStart: this.onCompositionStart,
      onCompositionEnd: this.onCompositionEnd
    };
  };

  render() {
    return <FormControl {...this.buildProps()} />;
  }
}

export default NumberInput;
