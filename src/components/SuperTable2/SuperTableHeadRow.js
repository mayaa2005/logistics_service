import React, { PropTypes } from 'react';

class SuperTableHeadRow extends React.Component {
  static propTypes = {
    cols: PropTypes.array.isRequired,
    checked: PropTypes.bool,
    onCheck: PropTypes.func
  }

  onCheck = (key, event) => {
    const {onCheck} = this.props;
    if (onCheck) {
      onCheck(-1, key, event.target.checked);
    }
  }

  toCell = (key, title, align) => {
    const style = {textAlign: align || "center"};
    return <th key={key} style={style}>{title}</th>;
  }

  toCheckboxCell = (col) => {
    const checked = !!this.props.checked;
    const onChange = this.onCheck.bind(this, col.key);
    const checkbox = <input type="checkbox" onChange={onChange} checked={checked} />;
    return this.toCell(col.key, checkbox, col.align);
  }

  colToCell = col => {
    if ((col.type === "checkbox") && (col.title === "")) {
      return this.toCheckboxCell(col);
    } else {
      return this.toCell(col.key, col.title, col.align);
    }
  }

  colsToCells = () => {
    return this.props.cols.map(col => this.colToCell(col));
  }

  render() {
    return <tr>{this.colsToCells()}</tr>;
  }
}

export default SuperTableHeadRow;
