import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Table } from 'react-bootstrap';
import s from './SuperTable.less';

const ColType = {
  key: PropTypes.string.isRequired,
  title: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  hide: PropTypes.bool,
  sort: PropTypes.bool
};

const ItemType = {
  checked: PropTypes.bool
};

const OptionType = {
  head: PropTypes.bool,
  index: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  indexTitle: PropTypes.string,
  checkbox: PropTypes.bool,

  bordered: PropTypes.bool,
  condensed: PropTypes.bool,
  hover: PropTypes.bool,
  striped: PropTypes.bool
};

/**
 * onCheck：点击复选框时触发，原型func(isAll, checked, rowIndex)
 * onSort: 点击表头时触发，原型func(key)
 * onSwapCol: 拖放表头时触发，原型func(key1, key2)
 */
const CallbackType = {
  onCheck: PropTypes.func,
  onSort: PropTypes.func,
  onSwapCol: PropTypes.func
};

class SuperTable extends React.Component {
  static propTypes = {
    cols: PropTypes.arrayOf(PropTypes.shape(ColType)).isRequired,
    items: PropTypes.arrayOf(PropTypes.shape(ItemType)).isRequired,
    option: PropTypes.shape(OptionType),
    callback: PropTypes.shape(CallbackType)
  };

  genAlignClass = align => {
    if (align === 'left') {
      return s['col-left'];
    } else if (align === 'right') {
      return s['col-right'];
    }
    return null;
  };

  genDragEvent = key => {
    const dragObject = {};
    dragObject.draggable = true;
    dragObject.onDragStart = this.onDragStart.bind(this, key);
    dragObject.onDragEnd = this.onDragEnd.bind(this);
    dragObject.onDragEnter = this.onDragEnter.bind(this, key);
    dragObject.onDragOver = this.onDragOver.bind(this);
    dragObject.onDrop = this.onDrop.bind(this, key);
    return dragObject;
  };

  handleCheckbox = option => {
    const key = 'checkbox';
    const has = option.checkbox || false;
    return { has, key };
  };

  handleIndex = option => {
    const key = 'index';
    const title = option.indexTitle || '序号';
    let has = false;
    let base = 1;

    if (typeof option.index === 'number') {
      has = true;
      base = option.index;
    } else {
      has = option.index || false;
    }

    return { has, key, base, title };
  };

  handleHead = option => {
    if (typeof option.head === "undefined") {
      return true;
    } else {
      return option.head;
    }
  };

  handleOption = option => {
    option = option || {};
    return {
      head: this.handleHead(option),
      indexOption: this.handleIndex(option),
      checkOption: this.handleCheckbox(option)
    };
  };

  onCheckAll = (event) => {
    const onCheck = this.callback.onCheck;
    if (onCheck) {
      onCheck(true, event.target.checked, null);
    }
  };

  onCheckRow = (index, event) => {
    const onCheck = this.callback.onCheck;
    if (onCheck) {
      onCheck(false, event.target.checked, index);
    }
  };

  onSort = (key) => {
    const onSort = this.callback.onSort;
    if (onSort) {
      onSort(key);
    }
  };

  onDragStart = (key, event) => {
    this.dragKey = key;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text', key);
  };

  onDragEnd = () => {
    this.dragKey = '';
  };

  onDragEnter = (key) => {
    if (this.dragKey) {
      const onSwapCol = this.callback.onSwapCol;
      if (key != this.dragKey && onSwapCol) {
        onSwapCol(key, this.dragKey);
      }
    }
  };

  onDragOver = (event) => {
    if (this.dragKey) {
      event.preventDefault();
    }
  };

  onDrop = (key, event) => {
    event.preventDefault();
  };

  toHeader = (cols, option, isCheckAll = false) => {
    const toCol = (key, title, align, sort = false, drag = false) => {
      const onSort = sort ? this.onSort.bind(this, key) : null;
      const className = this.genAlignClass(align);
      const dragObject = drag ? this.genDragEvent(key) : {};
      return <th key={key} className={className} onClick={onSort} {...dragObject}>{title}</th>;
    };
    const toCheckboxCol = (isCheckAll) => {
      const info = option.checkOption;
      const checkbox = <input type="checkbox" onChange={this.onCheckAll} checked={isCheckAll} />;
      return info.has ? toCol(info.key, checkbox) : null;
    };
    const toIndexCol = () => {
      const info = option.indexOption;
      return info.has ? toCol(info.key, info.title) : null;
    };
    const toOtherCols = cols => cols.map(col => toCol(col.key, col.title, col.align, col.sort, true));
    return <thead><tr>{toCheckboxCol(isCheckAll)}{toIndexCol()}{toOtherCols(cols)}</tr></thead>;
  };

  toEmptyBody = (cols, option) => {
    let colNumber = cols.length;
    if (option.checkOption.has) {
      colNumber++;
    }
    if (option.checkOption.has) {
      colNumber++;
    }
    return <tbody><tr><td colSpan={colNumber}>EMPTY</td></tr></tbody>;
  };

  toBody = (cols, items, option) => {
    const toCol = (key, value, align) => <td key={key} className={this.genAlignClass(align)}>{value}</td>;
    const toCheckboxCol = (rowIndex) => {
      const info = option.checkOption;
      const checked = items[rowIndex].checked || false;
      const checkbox = <input type="checkbox" checked={checked} onChange={this.onCheckRow.bind(this, rowIndex)} />;
      return info.has ? toCol(info.key, checkbox) : null;
    };
    const toIndexCol = (rowIndex) => {
      const info = option.indexOption;
      return info.has ? toCol(info.key, info.base + rowIndex) : null;
    };
    const toOtherCols = (item) => cols.map(col => toCol(col.key, item[col.key], col.align));
    const toRow = (item, index) => <tr key={index}>{toCheckboxCol(index)}{toIndexCol(index)}{toOtherCols(item)}</tr>;
    const toRows = () => items.map((item, index) => toRow(item, index));
    return <tbody>{toRows()}</tbody>;
  };

  getTableProps = (option) => {
    const defaultTrue = (value = true) => value;
    return {
      bordered: defaultTrue(option.bordered),
      condensed: defaultTrue(option.condensed),
      hover: defaultTrue(option.hover),
      striped: option.striped
    }
  };

  render() {
    const {cols, items, option = {}, callback} = this.props;
    const option2 = this.handleOption(option);
    const cols2 = cols.filter(col => !col.hide);
    const isCheckAll = option2.checkOption.has && items.length && items.every(item => item.checked);
    this.callback = callback || {};
    return (
      <Table className={s.root} {...this.getTableProps(option)}>
        {option2.head ? this.toHeader(cols2, option2, isCheckAll) : null}
        {items.length ? this.toBody(cols2, items, option2) : this.toEmptyBody(cols2, option2)}
      </Table>
    );
  }
}

export default withStyles(s)(SuperTable);
