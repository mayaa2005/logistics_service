import React, { PropTypes } from 'react';
import SuperTableCell from './SuperTableCell';

class SuperTableRow extends React.Component {
  static propTypes = {
    cols: PropTypes.array.isRequired,
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    callback: PropTypes.object
  };

  colToCellProps = col => {
    const {type, key, align, typeRelated, props} = col;
    const {item, index, callback} = this.props;
    return {
      keyName: key,
      rowIndex: index,
      value: item[key],
      type,
      align,
      typeRelated,
      props,
      callback
    }
  }

  colToCell = col => {
    const cellProps = this.colToCellProps(col);
    return <SuperTableCell key={col.key} {...cellProps} />;
  }

  render() {
    const cells = this.props.cols.map(col => this.colToCell(col));
    return <tr>{cells}</tr>;
  }
}

export default SuperTableRow;
