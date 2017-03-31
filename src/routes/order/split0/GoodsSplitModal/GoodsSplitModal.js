/**
 * Created by pengxiaojing on 2017/2/16.
 */

import React, { PropTypes } from 'react';
import withStyles from '../../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import { ButtonToolbar, Button, Modal, ModalBody, ModalFooter, ModalHeader, Checkbox, Grid, Row, Col } from 'react-bootstrap';
import SuperTable2 from '../../../../components/SuperTable2';
import SuperList from '../../../../components/SuperList';
import SplitCountModalContainer from '../SplitCountModal/SplitCountModalContainer';
import s from './GoodsSplitModal.less';

class GoodsSplitModal extends React.Component {
  constructor(props) {
    super(props);
    this.componentWillReceiveProps(props);
  };
  componentWillReceiveProps = (props) => {
    props.onGetUIInfo();
  };

  toGoodsInfoTable = () => {
    let {splitUIInfo, onTableCheck, onTableSplit} = this.props;
    let {goodsTable} = this.props.goodsSplitModal;
    let colsName = splitUIInfo.goodsTable.tableCols;
    const cols = [
      {key: "index", title: colsName.index, type: "index"},
      {key: "checked", title: "", type: "checkbox"},
      {key: "chineseName", title: colsName.chineseName, type: "readonly"},
      {key: "number", title: colsName.number, type: "readonly"},
      {key: "weight", title: colsName.weight, type: "readonly"},
      {key: "size", title: colsName.size, type: "readonly"},
      {key: "option", title: colsName.option, type: "button", typeRelated: colsName.splitBtn, props: {bsSize:"small", bsStyle:"link"}}
    ];
    const callback = {
      onCheck: onTableCheck.bind(this, 'goodsTable'),
      onBtnClick: (rowIndex, keyName) => onTableSplit('goodsTable', rowIndex, goodsTable[rowIndex])
    };
    return <SuperTable2 cols={cols} items={goodsTable || []} callback={callback} /> ;
  };
  toSectionGoodsInfoTable = () => {
    let { splitUIInfo, onTableMerge } = this.props;
    const btnClick = () => onTableMerge( 'goodsTable', 'checked');
    return (
      <div className={s.title}>
        <div className={s.divTitle}>1</div>
        {splitUIInfo.goodsTable.titleName}
        <Button bsStyle="primary" bsSize="small" onClick={btnClick}>{splitUIInfo.goodsTable.mergeBtn}</Button>
        {this.toGoodsInfoTable()}
      </div>
    );
  };

  toCabinetInfoTable = () => {
    let {splitUIInfo, onTableCheck, onTableSplit, onTableRadio} = this.props;
    let {cabinetTable} = this.props.goodsSplitModal;
    let colsName = splitUIInfo.cabinetTable.tableCols;
    const cols = [
      {key: "index", title: colsName.index, type: "index"},
      {key: "radio", title: "  ", type: "radio"},
      {key: "checked", title: "", type: "checkbox"},
      {key: "carSize", title: colsName.carSize, type: "readonly"},
      {key: "number", title: colsName.number, type: "readonly"},
      {key: "size", title: colsName.size, type: "readonly"},
      {key: "weight", title: colsName.weight, type: "readonly", props: {real: true}},
      {key: "option", title: colsName.option, type: "button", typeRelated: colsName.splitBtn, props: {bsSize:"small", bsStyle:"link"}}
    ];
    const callback = {
      onCheck: onTableCheck.bind(this, 'cabinetTable'),
      onRadio: onTableRadio.bind(this, 'cabinetTable'),
      onBtnClick: (rowIndex, keyName) => onTableSplit('cabinetTable', rowIndex, cabinetTable[rowIndex])
    };
    return <SuperTable2 cols={cols} items={cabinetTable || []} callback={callback} /> ;
  };
  toSectionCabinetInfoTable = () => {
    let {splitUIInfo, onTableMerge } = this.props;
      const addClick = () => onTableMerge( 'cabinetTable', 'checked');
      return (
        <div className={s.title}>
          <div className={s.divTitle}>1</div>
          {splitUIInfo.cabinetTable.titleName}
          <Button bsStyle="primary" bsSize="small" onClick={addClick}>{splitUIInfo.cabinetTable.mergeBtn}</Button>
          {this.toCabinetInfoTable()}
        </div>
      );
  };
  toNodeTitle = (cabinet) => {
    if (cabinet) {
      let {carSize, number, weight, size} = this.props.splitUIInfo.cabinetTable.tableCols;
      return `${carSize}:${cabinet.carSize} ${number}:${cabinet.number} ${weight}:${cabinet.weight} ${size}:${cabinet.size}`;
    }
    return this.props.splitUIInfo.goodsTable.titleName;
  };
  toNodeChild = (goodsItem) => {
    let {chineseName, number, weight, size} = this.props.splitUIInfo.goodsTable.tableCols;
    return `${chineseName}:${goodsItem.chineseName} ${number}:${goodsItem.number} ${weight}:${goodsItem.weight} ${size}:${goodsItem.size}`;
  };
  toRelationNode = (item) => {
    let {cabinet, goodsList=[]} = item;
    let title = this.toNodeTitle(cabinet);
    let children = goodsList.map(goodsItem => this.toNodeChild(goodsItem));
    return {title, children};
  };

  toRelationInfo = () => {
    let {onListSelect} = this.props;
    let {relation=[]} = this.props.goodsSplitModal;
    let items = relation.map( item => this.toRelationNode(item));
    const callback = {onSelect: onListSelect};
    return <SuperList items={items || []} callback={callback} /> ;
  };
  toSectionRelationInfo = () => {
    return (
      <div className={s.title}>
        <div className={s.divTitle}>1</div>
        {this.props.splitUIInfo.relationInfo.titleName}
        {this.toRelationInfo()}
      </div>
    );
  };
  onMakeRelation = () => this.props.onMakeRelation('radio', 'checked');
  toModalBody = () => {
    return (
      <Modal.Body>
        <Grid>
          <Col md={5} >
            {this.toSectionGoodsInfoTable()}
            {this.toSectionCabinetInfoTable()}
          </Col>
          <Col md={1} >
            <Button bsStyle="primary" bsSize="small" onClick={this.onMakeRelation}>&nbsp;&nbsp;&gt;&gt;&nbsp;&nbsp;</Button>
            <Button bsStyle="primary" bsSize="small" onClick={this.props.onDeleteRelation}>&nbsp;&nbsp;&lt;&lt;&nbsp;&nbsp;</Button>
          </Col>
          <Col md={3} >
            {this.toSectionRelationInfo()}
          </Col>
          </Grid>
      </Modal.Body>
    );
  };
  toSplitCountModal = () => {
    let {tabKey, splitCountModal} = this.props;
    return <SplitCountModalContainer tabKey={tabKey} {...splitCountModal} />;
  };

  onCancel = () => {
    this.props.onModalChange(false);
  };
  onMakeSure = () => {

  };
  render() {
    let {splitUIInfo} = this.props;
    if(!splitUIInfo) {
      return null;
    }
    let {isShow} = this.props.goodsSplitModal;
    return (
      <Modal show={isShow} bsSize="large" dialogClassName="custom-modal">
        <Modal.Header>
          <Modal.Title id="contained-modal-title-lg">{splitUIInfo.headTitle}</Modal.Title>
        </Modal.Header>
        {this.toModalBody()}
        {this.toSplitCountModal()}
        <Modal.Footer>
          <Button bsStyle="danger" onClick={this.onCancel}>{splitUIInfo.cancelBtn}</Button>
          <Button bsStyle="success"onClick={this.onMakeSure}>{splitUIInfo.sureBtn}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default withStyles(s)(GoodsSplitModal);
