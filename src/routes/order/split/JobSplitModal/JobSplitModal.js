/**
 * Created by pengxiaojing on 2017/3/6.
 */

import React, { PropTypes } from 'react';
import withStyles from '../../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Radio } from 'react-bootstrap';
import SuperTable2 from '../../../../components/SuperTable2';
import Search2 from '../../../../components/Search2';

import s from './JobSplitModal.less';

class Custom extends React.Component {
  onAddClick = () =>{
    let {rowIndex, tableName, onAddClick } = this.props;
    onAddClick(tableName, rowIndex);
  };
  onDeleteClick = () =>{
    let {rowIndex, tableName, onDeleteClick } = this.props;
    onDeleteClick(tableName, rowIndex);
  };
  render() {
    let {addBtn, deleteBtn} = this.props;
    return (
      <span>
        <Button bsSize="small" bsStyle="link" onClick={this.onAddClick}>{addBtn}</Button>
        {" "}
        <Button bsSize="small" bsStyle="link" onClick={this.onDeleteClick}>{deleteBtn}</Button>
      </span>
    );
  }
}

class JobSplitModal extends React.Component {
  constructor(props) {
    super(props);
    this.componentWillReceiveProps(props);
  };
  componentWillReceiveProps = (props) => {
    props.onGetUIInfo();
  };
  componentDidMount() {
    let {table1, table2, getTable1Data, getTable2Data} = this.props;
    if (!table1){
      getTable1Data();
    }
    if (!table2){
      getTable2Data();
    }
  }
  toSearch1 = () => {
    let {radio1, splitUIInfo } = this.props;
    if (!radio1) return null;
    let props = {
      config: {
        search: splitUIInfo.searchBtn,
        reset: splitUIInfo.resetBtn
      },
      filters: [
        {type: 'select', key: 'jobType', title: splitUIInfo.jobSearch1, defaultValue:'', typeRelated: ['<--->', '国内运输', '港口运输', '报关', '铁路运输']},
        {type: 'text', key: 'jobUnit', title: splitUIInfo.jobSearch2, defaultValue:''}
      ],
      callback: {
      }
    };
    return <Search2 {...props} />;
  };
  toSearch2 = () => {
    let {radio2, splitUIInfo } = this.props;
    if (!radio2) return null;
    let props = {
      config: {
        search: splitUIInfo.searchBtn,
        reset: splitUIInfo.resetBtn
      },
      filters: [
        {type: 'text', key: 'first', title: splitUIInfo.codeSearch1, defaultValue:''},
        {type: 'text', key: 'second', title: splitUIInfo.codeSearch2, defaultValue:''}
      ],
      callback: {
      }
    };
    return <Search2 {...props} />;
  };
  toCustomProps = (tableName) => {
    let {splitUIInfo, onAddClick, onDeleteClick } = this.props;
    return {
      addBtn:splitUIInfo.addBtn,
      deleteBtn:splitUIInfo.deleteBtn,
      tableName,
      onAddClick,
      onDeleteClick
    };
  };
  onRenderCustom = (rowIndex, keyName, value, props) => {
    const customProps = {rowIndex, keyName, value, ...props};
    return <Custom {...customProps} />;
  };
  toTable1 = () => {
    let { radio1, splitUIInfo, table1 } = this.props;
    if (!radio1) return null;
    let colsName = splitUIInfo.table1Cols;
    const customProps = this.toCustomProps('table1');
    const cols = [
      {key: "index", title: colsName.index, type: "index"},
      {key: "option", title: colsName.option, type: "custom", props: customProps},
      {key: "jobType", title: colsName.jobType, type: "readonly"},
      {key: "jobUnit", title: colsName.jobUnit, type: "readonly"}
    ];
    const callback = {
      onRenderCustom: this.onRenderCustom
    };
    return (
      <div>
        <SuperTable2 cols={cols} items={table1 || []} callback={callback} />
      </div>
    );
  };
  toTable2 = () => {
    let {radio2, splitUIInfo, table2} = this.props;
    if (!radio2) return null;
    let colsName = splitUIInfo.table2Cols;
    const customProps = this.toCustomProps('table2');
    const cols = [
      {key: "index", title: colsName.index, type: "index"},
      {key: "option", title: colsName.option, type: "custom", props: customProps},
      {key: "jobType", title: colsName.jobType, type: "readonly"},
      {key: "code", title: colsName.code, type: "readonly"},
      {key: "codeName", title: colsName.codeName, type: "readonly"}
    ];
    const callback = {
      onRenderCustom: this.onRenderCustom
    };
    return (
      <div>
        <SuperTable2 cols={cols} items={table2 || []} callback={callback} />
      </div>
    );
  };
  toResult = (items) => {
    let result = '';
    items.map( (item, index) => {
      result += item;
      if (index != items.length-1) {
        result += '+';
      }
    });
    return result;
  };
  onRadioChange = (event) => this.props.onRadioChange(event.target.name);
  onHideModal = () => this.props.onModalChange(false);

  render() {
    if (!this.props.splitUIInfo) {
      return null;
    }
    let {isShow, splitUIInfo, radio1, radio2, resultList } = this.props;
    let result = this.toResult(resultList);
    return (
      <Modal show={isShow} bsSize="large" dialogClassName="custom-modal" onHide={this.onHideModal}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">{splitUIInfo.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={s.body}>
          <p>{splitUIInfo.firstStep}:</p>
          <Radio inline name="radio1" checked={radio1} onChange={this.onRadioChange}>{splitUIInfo.radio1}</Radio>
          <Radio inline name="radio2" checked={radio2} onChange={this.onRadioChange}>{splitUIInfo.radio2}</Radio>
          {this.toSearch1()}
          {this.toSearch2()}
          {this.toTable1()}
          {this.toTable2()}
          <p>{splitUIInfo.result} : {result}</p>
          <span>{splitUIInfo.secondStep}:</span>
          <Button bsStyle="success" bsSize="small">{splitUIInfo.makeBtn}</Button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default withStyles(s)(JobSplitModal);
