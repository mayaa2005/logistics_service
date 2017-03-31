/**
 * Created by pengxiaojing on 2017/2/16.
 */

import React, { PropTypes } from 'react';
import withStyles from '../../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import SuperTable2 from '../../../../components/SuperTable2';
import s from './SplitCountModal.less';


class Custom extends React.Component {
  onCountClick = () =>{
    let {rowIndex, onCountClick } = this.props;
    onCountClick(rowIndex);
  };
  onDeleteClick = () =>{
    let {rowIndex, onTableDelete } = this.props;
    onTableDelete(rowIndex);
  };
  render() {
    let {countBtn, deleteBtn} = this.props;
    return (
      <span>
        <Button bsSize="small" bsStyle="link" onClick={this.onCountClick}>{countBtn}</Button>
        {" "}
        <Button bsSize="small" bsStyle="link" onClick={this.onDeleteClick}>{deleteBtn}</Button>
      </span>
    );
  }
}

class SplitCountModal extends React.Component {

  onRenderCustom = (rowIndex, keyName, value, props) => {
    const customProps = {rowIndex, keyName, value, ...props};
    return <Custom {...customProps} />;
  };

  toTable = () => {
    let {splitUIInfo, originTableName, table, onCountClick, onTableDelete, onContentChange} = this.props;
    if (!originTableName) originTableName = 'goodsTable';
    let colsName = splitUIInfo[originTableName].tableCols;
    const customProps = {
      countBtn:splitUIInfo[originTableName].countBtn,
      deleteBtn:splitUIInfo[originTableName].deleteBtn,
      onCountClick,
      onTableDelete
    };
    const cols = [
      {key: "number", title: colsName.number, type: "number"},
      {key: "weight", title: colsName.weight, type: "number", props: {real: true}},
      {key: "size", title: colsName.size, type: "number", props: {real: true}},
      {key: "option", title: colsName.option, type: "custom", props: customProps}
    ];
    const callback = {
      onContentChange: onContentChange,
      onRenderCustom: this.onRenderCustom
    };
    return <SuperTable2 cols={cols} items={table || []} callback={callback} /> ;
  };
  onCancelModal = () => this.props.onCancelModal(false);
  check = () => {
    return true;
  };
  onMakeSure = () => {
    let {table, originTableName, originRowIndex, onMakeSure, onCancelModal} = this.props;
    if (this.check()) {
      if (table.length > 1) {
        onMakeSure(originTableName, originRowIndex, table);
      }
      onCancelModal(false);
    }else {
      //待完成提示界面后提示校验结果
    }
  };
  render() {
    let {isShow, splitUIInfo, originTableName, originData } = this.props;
    if (!originTableName) originTableName = 'goodsTable';
    if (!originData) originData = {number:'', weight:'',size:''};
    let colUI = splitUIInfo[originTableName].tableCols;
    return (
      <Modal show={isShow} bsSize="small" dialogClassName="custom-modal">
        <Modal.Header>
          <Modal.Title id="contained-modal-title-lg">{colUI.number}:{originData.number} {colUI.weight}:{originData.weight} {colUI.size}:{originData.size}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.toTable()}
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="danger" onClick={this.onCancelModal}>{splitUIInfo.cancelBtn}</Button>
          <Button bsStyle="success"onClick={this.onMakeSure}>{splitUIInfo.sureBtn}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default withStyles(s)(SplitCountModal);
