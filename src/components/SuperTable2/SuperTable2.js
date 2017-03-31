import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Table } from 'react-bootstrap';
import s from './SuperTable2.less';
import SuperTableRow from './SuperTableRow';
import SuperTableHeadRow from './SuperTableHeadRow';

/**
 * key：标识所在列，在一个表格中必须唯一
 * title：列的标题，type为checkbox时，title为空字符串时，表头才会显示为复选框
 * typeRelated的取值与type相关
 *  type为index时，typeRelated(可选)是取值为从0开始的整数，表示序号的基数
 *  type为select时，typeRelated(可选)是字符串数组，表示下拉列表框项的取值
 *  type为button时，typeRelated是字符串，表示按钮的标题
 *  type为其他值时，typeRelated未使用
 * props：传递参数给被嵌入的组件
 * align：对齐方式，默认为center
 * hide：是否隐藏当前列，默认为false
 */
const TypeEnum = ['readonly', 'index', 'checkbox', 'radio', 'text', 'number', 'select', 'button',
  'date', 'custom'];
const ColType = {
  key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(TypeEnum).isRequired,
  typeRelated: PropTypes.any,
  props: PropTypes.object,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  hide: PropTypes.bool
};

/**
 * head: 表示是否有表头，默认为true
 * bordered: bootstrap Table样式，默认为true
 * condensed：bootstrap Table样式，默认为true
 * hover: bootstrap Table样式, 默认为false
 * striped: bootstrap Table样式, 默认为false
 */
const OptionType = {
  head: PropTypes.bool,
  bordered: PropTypes.bool,
  condensed: PropTypes.bool,
  hover: PropTypes.bool,
  striped: PropTypes.bool
};

/**
 * onContentChange用于text，number，select和date中内容改变时，原型为function(rowIndex, keyName, value)
 * onCheck用于checkbox选中或取消选中时，原型为function(rowIndex, keyName, checked)
 * onRadio用于radio选中时，原型为function(rowIndex, keyName)
 * onBtnClick用于button点击时，原型为function(rowIndex, keyName)
 * onRenderCustom用于渲染type为custom类型的单元格，必须返回一个组件实例，原型为function(rowIndex, keyName, value，props)
 */
const CallbackType = {
  onContentChange: PropTypes.func,
  onCheck: PropTypes.func,
  onRadio: PropTypes.func,
  onBtnClick: PropTypes.func,
  onRenderCustom: PropTypes.func
};

class SuperTable2 extends React.Component {
  static propTypes = {
    cols: PropTypes.arrayOf(PropTypes.shape(ColType)).isRequired,
    items: PropTypes.array.isRequired,
    option: PropTypes.shape(OptionType),
    callback: PropTypes.shape(CallbackType)
  };

  isCheckAll = (cols, items) => {
    if (items.length) {
      for (let col of cols) {
        if (col.type === "checkbox") {
          return items.every(item => item[col.key]);
        }
      }
    }
    return false;
  };

  toHeadRow = (cols, checked) => {
    const {onCheck} = this.props.callback || {};
    return <SuperTableHeadRow {...{cols, checked, onCheck}}/>;
  };

  toHead = (cols, items, option) => {
    const head = !option || typeof option.head === "undefined" || option.head;
    if (head) {
      const checked = this.isCheckAll(cols, items);
      return <thead>{this.toHeadRow(cols, checked)}</thead>;
    } else {
      return null;
    }
  };

  toBodyRow = (cols, item, index, callback) => {
    const rowProps = {cols, item, index, callback};
    return <SuperTableRow key={index} {...rowProps}/>;
  };

  toBody = (cols, items, callbacks) => {
    const rows = items.map((item, index) => this.toBodyRow(cols, item, index, callbacks));
    return <tbody>{rows}</tbody>;
  };

  toBodyEmpty = ({length}) => {
    return <tbody><tr><td colSpan={length} style={{textAlign: 'center'}}>EMPTY</td></tr></tbody>;
  };

  getTableProps = (option) => {
    const defaultTrue = (value = true) => value;
    return {
      bordered: defaultTrue(option.bordered),
      condensed: defaultTrue(option.condensed),
      hover: option.hover,
      striped: option.striped
    }
  };

  render() {
    const { cols, items, option = {}, callback } = this.props;
    const cols2 = cols.filter(col => !col.hide);
    return (
      <Table className={s.root} {...this.getTableProps(option)}>
        {this.toHead(cols2, items, option)}
        {items.length ? this.toBody(cols2, items, callback) : this.toBodyEmpty(cols2)}
      </Table>
    );
  }
}

export default withStyles(s)(SuperTable2);
