import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { ButtonToolbar, Button, Form, FormGroup, Col, FormControl, Checkbox, ControlLabel, option, Radio, Grid, Row} from 'react-bootstrap';
import SuperTable2 from '../../../components/SuperTable2';
import SuperButtonToolbar from '../../../components/SuperButtonToolbar';
import s from './SettleEdit.less';

class SettleEdit extends React.Component {
  static PropTypes = {
    tabKey: PropTypes.string.isRequired,
    settleEditUIInfo: PropTypes.object.isRequired,
    settleInfo: PropTypes.object.isRequired,
    options: PropTypes.object
  };

  toHeader = () => {
    return (
      <form className={s.head}>
        <label>{this.props.settleEditUIInfo.documentNo}</label>
        <input type="text" disabled="disabled" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <label>{this.props.settleEditUIInfo.order}</label>
        <input type="text" disabled="disabled"/>
      </form>
    );
  }

  toLin=()=>{
    return(
      <hr className={s.hr0} width="98%"/>
    )
  }

  toSection = () => {
    return(
      <Grid>
        <Row className="show-grid">
          <Col md={4}>{this.props.settleEditUIInfo.customer}</Col>
          <Col md={4}>{this.props.settleEditUIInfo.startPlace}</Col>
          <Col  md={4}>{this.props.settleEditUIInfo.destination}</Col>
        </Row>
        <Row className="show-grid">
          <Col  md={4}>{this.props.settleEditUIInfo.weight}</Col>
          <Col  md={4}>{this.props.settleEditUIInfo.volume}</Col>
          <Col  md={4}>{this.props.settleEditUIInfo.status}</Col>
        </Row>
        <Row className="show-grid">
          <Col  md={4}>{this.props.settleEditUIInfo.operator}</Col>
          <Col  md={8}>{this.props.settleEditUIInfo.operateTime}</Col>
        </Row>
        <Row className="show-grid">
          <Col  md={4}>{this.props.settleEditUIInfo.alterMen}</Col>
          <Col  md={8}>{this.props.settleEditUIInfo.alterTime}</Col>
        </Row>

        <Row className="show-grid">
          <Col  md={12}>{this.props.settleEditUIInfo.remarks1}</Col>
        </Row>
      </Grid>
    );
  }

  toTitle=()=>{
    return(
      <label>应收明细信息</label>
    )
  }
  toLin1=()=>{
    return(
      <hr className={s.hr1} />
    )
  }

  onNewDetail = () => {
    this.props.onNewDetail("新增");
  };
  onCopyNewDetail = () => {
    this.props.onCopyNewDetail("复制新增");
  };
  toMyToolbar = ( bsSize) => {
    return (
      <ButtonToolbar className={s.toolbar1}>
        <Button bsSize={bsSize} bsStyle="primary" onClick={this.onNewDetail}>新增 </Button>
        <Button bsSize={bsSize} onClick={this.onCopyNewDetail}>复制新增</Button>
        <Button bsSize={bsSize}>删除</Button>
      </ButtonToolbar>
    );
  };

  toDetailTable = () => {
    let { tabKey, settleInfo, settleEditUIInfo, onTable2ContentChange, onTable2Delete} = this.props;
    let colsName = settleEditUIInfo.detailTable.tableCols;
    const costs = ["运输费用组", "额外费用组","dddd","ccccc"];
    const businesses=["报关","运输","dddd","xxxx"];
    const names=["报关费","压车费","吊柜费"];
    const taxes=["计税","不计税"];
    const cols = [
      {key: "index", title: colsName.index, type: "index"},
      {key: "checked", title: "", type: "checkbox"},
      {key: "costType", title: colsName.costType, type: "select",typeRelated: costs},
      {key: "businessAttribute", title: colsName.businessAttribute, type: "select",typeRelated: businesses},
      {key: "costName", title: colsName.costName, type: "select",typeRelated: names},
      {key: "accountUnit", title: colsName.accountUnit, type: "text"},
      {key: "taxWay", title: colsName.taxWay,type: "select",typeRelated: taxes},
      {key: "price", title: colsName.price, type: "number"},
      {key: "quantity", title: colsName.quantity, type: "number"},
      {key: "rate", title: colsName.rate, type: "number",props: {real: true}},
      {key: "tax", title: colsName.tax, type: "number"},
      {key: "netPrice", title: colsName.netPrice, type: "number"},
      {key: "incomeNumber", title: colsName.incomeNumber, type: "number"},
      {key: "remarks", title: colsName.remarks, type: "text"}
    ];
    const callback = {
      onContentChange: onTable2ContentChange.bind(this, tabKey),
      onBtnClick: onTable2Delete.bind(this, tabKey)
    };
    return <SuperTable2 cols={cols} items={settleInfo.detailTable || []} callback={callback} /> ;
  };

  toSectionDetailTable = () => {
    let { tabKey, settleInfo, settleEditUIInfo} = this.props;
    return (
      <div>
        {this.toDetailTable()}
      </div>
    );
  };

  onClick = (key) => {
    let { tabKey, orderInfo, onCancelTab, onSave, onSubmit, onTable2AddRow} = this.props;
    switch (key) {
      case 'save':
        onSave( tabKey, orderInfo);
        break;
      case 'cancel':
        onCancelTab( tabKey);
        break;
      case 'submit':
        onSubmit( tabKey, orderInfo);
        break;
      case 'settleAddRow':
        onTable2AddRow( tabKey, 'detailTable');
        break;
    }
  };
  toButtonToolbar = () => {
    let {settleEditUIInfo} = this.props;
    let buttons = [
      {key:'save', title:settleEditUIInfo.saveBtn, props:{bsStyle:'primary', bsSize:'small'}},
      {key:'cancel', title:settleEditUIInfo.cancelBtn, props:{bsStyle:'danger', bsSize:'small'}},
      {key:'submit', title:settleEditUIInfo.submitBtn, props:{bsStyle:'success', bsSize:'small'}}
    ];
    return <SuperButtonToolbar buttons={buttons} onClick={this.onClick} />;
  };


  render() {
    //let settleEditUIInfo = this.props.settleEditUIInfo;
    const bsSize = 'small';
    return (
      <div className={s.root}>
        {this.toHeader()}
        {this.toLin()}
        {this.toSection()}

        <div className={s.content}>
          {this.toTitle()}
          {this.toLin1()}
          {this.toMyToolbar(bsSize)}
          {this.toSectionDetailTable()}
        </div>
        {this.toButtonToolbar()}
      </div>
    );
  }
}

export default withStyles(s)(SettleEdit);
