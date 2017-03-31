import React, { PropTypes } from 'react';
import { Modal, Button, FormControl, FormGroup } from 'react-bootstrap';
import SuperList from '../../../components/SuperList';
import SuperTable2 from '../../../components/SuperTable2';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './OptimizeDialog.less';
import moveUrl from './move.png';

const defConfig = {
  title: '装载优化',
  result: '优化结果',
  choice: '车型选择',
  redo: '撤销',
  reset: '重置',
  ok: '确定',
  cancel: '取消'
};

class OptimizeDialog extends React.Component {
  static propTypes = {
    config: PropTypes.object,
    show: PropTypes.bool,
    listItems: PropTypes.array,
    hasTable: PropTypes.bool,
    tableItems: PropTypes.array,
    tableCols: PropTypes.array
  };

  static callbacks = {
    change: 'onCarTableChange',
    choice: 'onChoiceCar',
    redo: 'onRedo',
    reset: 'onReset',
    ok: 'onHide',
    cancel: 'onHide'
  };

  getCallback = (key) => {
    const name = OptimizeDialog.callbacks[key];
    return this.props[name];
  };

  onBtnClick = (key) => {
    const callback = this.getCallback(key);
    if (callback) {
      callback();
    }
  };

  toButton = (config, key, bsStyle) => {
    const onClick = this.onBtnClick.bind(this, key);
    return (
      <Button bsSize='small' bsStyle={bsStyle} onClick={onClick}>
        {config[key]}
      </Button>
    );
  };

  toHeader = ({title}) => {
    return (
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
    );
  };

  toBodyTop = (config) => {
    const {listItems = []} = this.props;
    return (
      <div data-pos='top'>
        <div>
          <span role='title'>{config.result}</span>
          {this.toButton(config, 'choice')}
          {this.toButton(config, 'redo')}
          {this.toButton(config, 'reset')}
        </div>
        <SuperList items={listItems} option={{itemIcon: moveUrl}}/>
      </div>
    );
  };

  toBodyBottom = ({choice}) => {
    const {tableCols = [], tableItems = []} = this.props;
    const callback = {onContentChange: this.getCallback('change')};
    return (
      <div data-pos='bottom'>
        <div><span role='title'>{choice}</span></div>
        <SuperTable2 cols={tableCols} items={tableItems} callback={callback} />
      </div>
    );
  };

  toBody = (config) => {
    const {hasTable = false} = this.props;
    return (
      <Modal.Body>
        {this.toBodyTop(config)}
        {hasTable ? this.toBodyBottom(config) : null}
      </Modal.Body>
    );
  };

  toFooter = (config) => {
    return (
      <Modal.Footer>
        {this.toButton(config, 'ok', 'success')}
        {this.toButton(config, 'cancel', 'danger')}
      </Modal.Footer>
    );
  };

  render() {
    const {show, container, config = defConfig} = this.props;
    return (
      <Modal className={s.root} show={show} bsSize='large' container={container}>
        {this.toHeader(config)}
        {this.toBody(config)}
        {this.toFooter(config)}
      </Modal>
    );
  }
}

export default withStyles(s)(OptimizeDialog);
