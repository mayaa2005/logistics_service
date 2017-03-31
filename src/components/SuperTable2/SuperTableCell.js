import React, { PropTypes } from 'react';
import {Button, FormControl} from 'react-bootstrap';
import NumberInput from '../NumberInput';

// 单元格的type只能取如下值：
// 'readonly', 'index', 'checkbox', 'radio', 'text', 'number', select', 'button', 'date', 'custom'

const CallbackType = {
  onContentChange: PropTypes.func,
  onCheck: PropTypes.func,
  onRadio: PropTypes.func,
  onBtnClick: PropTypes.func,
  onRenderCustom: PropTypes.func
};

class SuperTableCell extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    keyName: PropTypes.string.isRequired,
    rowIndex: PropTypes.number.isRequired,
    value: PropTypes.any,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    typeRelated: PropTypes.any,
    props: PropTypes.object,
    callback: PropTypes.shape(CallbackType)
  };

  constructor(props) {
    super(props);
    this.state = {editing: false};
  }

  onCheck = event => {
    const {keyName, rowIndex, callback = {}} = this.props;
    if (callback.onCheck) {
      callback.onCheck(rowIndex, keyName, event.target.checked);
    }
  };

  onRadio = () => {
    const {keyName, rowIndex, value, callback = {}} = this.props;
    if (!value && callback.onRadio) {
      callback.onRadio(rowIndex, keyName);
    }
  };

  onBtnClick = () => {
    const {keyName, rowIndex, callback = {}} = this.props;
    if (callback.onBtnClick) {
      callback.onBtnClick(rowIndex, keyName);
    }
  };

  onCellClick = event => {
    this.width = event.target.offsetWidth;
    this.setState({editing: true});
  };

  onInputBlur = (event) => {
    this.setState({editing: false});
    if (this.props.value !== event.target.value) {
      const {rowIndex, keyName, callback = {}} = this.props;
      if (callback.onContentChange) {
        callback.onContentChange(rowIndex, keyName, event.target.value);
      }
    }
  };

  onKeyPress = event => {
    // 按下了回车键
    if (event.charCode === 13) {
      this.onInputBlur(event);
    }
  };

  toIndexComponent = () => {
    const {rowIndex, typeRelated} = this.props;
    if (typeof typeRelated === "number") {
      return rowIndex + typeRelated;
    } else {
      return rowIndex + 1;
    }
  };

  toCheckboxComponent = (value, props) => {
    return <input type="checkbox" checked={!!value} {...props} onChange={this.onCheck}/>;
  };

  toRadioComponent = (value, props) => {
    return <input type="radio" {...props} checked={!!value} onChange={this.onRadio}/>;
  };

  toButtonComponent = (value, props) => {
    return <Button {...props} onClick={this.onBtnClick}>{this.props.typeRelated}</Button>;
  };

  toTextComponent = (value, props) => {
    const compProps = {
      ...props,
      type: "text",
      defaultValue: value,
      autoFocus: true,
      onBlur: this.onInputBlur,
      onKeyPress: this.onKeyPress
    };
    return <FormControl {...compProps}/>;
  };

  toNumberComponent = (value, props) => {
    const compProps = {
      ...props,
      defaultValue: value,
      autoFocus: true,
      onBlur: this.onInputBlur,
      onKeyPress: this.onKeyPress
    };
    return <NumberInput {...compProps}/>;
  };

  toDateComponent = (value, props) => {
    const compProps = {
      ...props,
      type: "date",
      defaultValue: value,
      autoFocus: true,
      onBlur: this.onInputBlur
    };
    return <FormControl {...compProps}/>;
  };

  toSelectComponent = (value, props) => {
    const options = this.props.typeRelated || [];
    const compProps = {
      ...props,
      componentClass: "select",
      defaultValue: value,
      autoFocus: true,
      onBlur: this.onInputBlur
    };
    return (
      <FormControl {...compProps}>
        {options.map((value, index) => <option key={index}>{value}</option>)}
      </FormControl>
    );
  };

  toCustomComponent = (value, props) => {
    const {rowIndex, keyName} = this.props;
    const {onRenderCustom} = this.props.callback;
    return onRenderCustom ? onRenderCustom(rowIndex, keyName, value, props) : value;
  };

  toGeneralCell = (toComponent) => {
    const {value, props, align} = this.props;
    const style = {textAlign: align || "center"};
    const component = toComponent(value, props);
    return {editable: false, style, component};
  };

  toInputCell = (toComponent) => {
    const editing = this.state.editing;
    const {value, props, align} = this.props;
    let component, style;
    if (editing) {
      style = {width: this.width, minWidth: this.width, padding: 0};
      component = toComponent(value, props);
    } else {
      style = {cursor: "text", textAlign: align || "center"};
      component = value;
    }
    return {editable: !editing, style, component};
  };

  toCell = () => {
    switch (this.props.type) {
      case "index":
        return this.toGeneralCell(this.toIndexComponent);
      case "checkbox":
        return this.toGeneralCell(this.toCheckboxComponent);
      case "radio":
        return this.toGeneralCell(this.toRadioComponent);
      case "button":
        return this.toGeneralCell(this.toButtonComponent);
      case "text":
        return this.toInputCell(this.toTextComponent);
      case "number":
        return this.toInputCell(this.toNumberComponent);
      case "select":
        return this.toInputCell(this.toSelectComponent);
      case "date":
        return this.toInputCell(this.toDateComponent);
      case "custom":
        return this.toGeneralCell(this.toCustomComponent);
      case "readonly":
        return this.toGeneralCell(value => value);
      default:
        return this.toGeneralCell(() => "error type");
    }
  };

  render() {
    const {editable, component, style} = this.toCell();
    const onClick = editable ? this.onCellClick : null;
    return <td style={style} onClick={onClick}>{component}</td>
  }
}

export default SuperTableCell;
