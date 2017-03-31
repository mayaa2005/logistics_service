import React, { PropTypes } from 'react';
import withStyles from '../../../node_modules/isomorphic-style-loader/lib/withStyles';
import {Button } from 'react-bootstrap';
import s from './JobUnit.less';
import SuperTable2 from '../SuperTable2';
import SuperToolbar from '../SuperToolbar';
import SuperFormGroup from '../SuperFormGroup2';
import Title from '../Title';

/**
 * onContentChange用于text，number，select和date中内容改变时，原型为function(rowIndex, keyName, value)
 * onCheck用于checkbox选中或取消选中时，原型为function(rowIndex, keyName, checked)
 * onRadio用于radio选中时，原型为function(rowIndex, keyName)
 * onBtnClick用于button点击时，原型为function(rowIndex, keyName)
 * onRenderCustom用于渲染type为custom类型的单元格，必须返回一个组件实例，原型为function(rowIndex, keyName, value，props)
 */
const CallbackType = {
  onTableAdd: PropTypes.func,
  onTableDelete: PropTypes.func,
  onTableCount: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func
};

/**
 * key：标识该section
 * title：section的标题
 * type: section的类型
 * buttons：section内的按钮数组，key必须为组件中validButtons中预定义的
 * hide：是否隐藏当前section，默认为false
 * typeRelated的取值与type相关
 *  type为form时，typeRelated是组件SuperFormGroup的相关属性数据
 *  type为table时,typeRelated是组件SuperTable2的相关属性数据
 *  type为option时，typeRelated 暂未使用
 */
const TypeEnum = ['form', 'table', 'operation'];
const SectionType = {
  key: PropTypes.string.isRequired,
  title: PropTypes.string,
  type: PropTypes.oneOf(TypeEnum).isRequired,
  buttons: PropTypes.array,
  hide: PropTypes.bool,
  typeRelated: PropTypes.any
};

class JobUnit extends React.Component {
  static propTypes = {
    jobKey: PropTypes.string.isRequired,
    sections: PropTypes.arrayOf(PropTypes.shape(SectionType)).isRequired,
    callback: PropTypes.shape(CallbackType)
  };

  static validButtons = {
    add: 'onTableAdd',
    delete: 'onTableDelete',
    count: 'onTableCount',
    save: 'onSave',
    cancel: 'onCancel'
  };

  //toToolbar = (key) => {
  //  const {buttons} = this.props[key];
  //  const props = {
  //    buttons,
  //    option: {bsSize: 'small'},
  //    callback: this.getCallback(key)
  //  };
  //  return <SuperToolbar {...props} />;
  //};
  toTitle = (title) => <Title title={title} />;

  toForm = ({key, typeRelated}) => {
    return <SuperFormGroup {...typeRelated} />;
  };
  toTable = ({key, buttons=[], typeRelated}) => {
    return <div role='container'><SuperTable2 {...typeRelated}/></div>;
  };

  onClick = (key, tableKey) => {
    let {jobKey, callback={}} = this.props;
    let funcName = JobUnit.validButtons[key];
    if (callback[funcName]) {
      return tableKey ? callback[funcName].bind(this, jobKey, tableKey) : callback[funcName].bind(this, jobKey);
    }
  };
  toButton = ({key, title, bsStyle='primary'}, tableKey) => {
    const onClick = this.onClick.bind(this, key, tableKey);
    return (
      <Button key={key} bsSize='small' onClick={onClick} bsStyle={bsStyle}>
        {title}
      </Button>
    );
  };
  toOperation = ({buttons}) => {
    return (
      <div role="operation">
        {buttons.map(this.toButton)}
      </div>
    );
  };

  toSection = (section, index) => {
    const {title, type, hide=false} = section;
    if (hide) return null;
    const reducers = {
      form: this.toForm,
      table: this.toTable,
      operation: this.toOperation
    };
    let subComponent;
    if (reducers.hasOwnProperty(type)) {
      subComponent = reducers[type];
    } else {
      console.log('unknown section type: ', type);
      return null;
    }
    return (
      <div key={index}>
        {title ? this.toTitle(title) : null}
        {subComponent(section)}
      </div>
    );
  };

  render() {
    const {sections=[]} = this.props;
    return (
      <div className={s.root}>
        {sections.map(this.toSection)}
      </div>
    );
  }
}

export default withStyles(s)(JobUnit);
