import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { ButtonToolbar, Button, Form, FormGroup, Col, FormControl, Checkbox, ControlLabel, option, Radio, Grid, Row} from 'react-bootstrap';
import SuperTable2 from '../../../components/SuperTable2';
import SuperFormGroup from '../../../components/SuperFormGroup';
import SuperButtonToolbar from '../../../components/SuperButtonToolbar';
import s from './ChangeReceiveEdit.less';

class ChangeReceiveEdit extends React.Component {
  static PropTypes = {
    tabKey: PropTypes.string.isRequired,
    changeReceiveEditUIInfo: PropTypes.object.isRequired,
    changeReceiveInfo: PropTypes.object.isRequired,
    options: PropTypes.object
  };

  toHeader = () => {
    return (
      <form className={s.head}>
        <label>{this.props.changeReceiveEditUIInfo.changeOrderNo}</label>
        <input type="text" disabled="disabled" />
      </form>
    );
  }

  toLin=()=>{
    return(
      <hr className={s.hr0} width="98%"/>
    )
  }


  toTitle=()=>{
    return(
      <label>改单明细信息</label>
    )
  }
  toLin1=()=>{
    return(
      <hr className={s.hr1} />
    )
  }

  //toMyToolbar = (bsSize) => {
    //let {changeReceiveEditUIInfo} = this.props;
    //let buttons = [
         // {key:'newDetail', title:changeReceiveEditUIInfo.newBtn, props:{bsStyle:'default', bsSize:bsSize}},
         // {key:'copyNewDetail', title:changeReceiveEditUIInfo.copyNewBtn, props:{bsStyle:'default', bsSize:bsSize}},
          //{key:'deleteDetail', title:changeReceiveEditUIInfo.deleteBtn, props:{bsStyle:'default', bsSize:bsSize}},
        //];
    //return <SuperButtonToolbar buttons={buttons} onClick={this.onClick} />;
  //}

  //onNewDetail = () => {
   // this.props.onNewDetail("新增");
  //};
  //onCopyNewDetail = () => {
    //this.props.onCopyNewDetail("复制新增");
 // };
 // toMyToolbar = ( bsSize) => {
    //return (
     // <ButtonToolbar className={s.toolbar1}>
        //<Button bsSize={bsSize} bsStyle="primary" onClick={this.onNewDetail}>新增 </Button>
        //<Button bsSize={bsSize} onClick={this.onCopyNewDetail}>复制新增</Button>
       // <Button bsSize={bsSize}>删除</Button>
      //</ButtonToolbar>
    //);
  //};

  toDetailTable = () => {
    let { tabKey, changeReceiveInfo, changeReceiveEditUIInfo, onTable2ContentChange,onTableCheck} = this.props;
    let colsName = changeReceiveEditUIInfo.detailTable.tableCols;
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
      onCheck: onTableCheck.bind(this,tabKey),
      onContentChange: onTable2ContentChange.bind(this, tabKey)
      //onBtnClick: onTable2Delete.bind(this, tabKey)
    };
    return <SuperTable2 cols={cols} items={changeReceiveInfo.detailTable || []} callback={callback} /> ;
  };

  toSectionDetailTable = () => {
    let { tabKey, changeReceiveInfo, changeReceiveEditUIInfo} = this.props;
    let buttons = [
      {key:'table2AddRow', title:changeReceiveEditUIInfo.newBtn, props:{bsStyle:'default',  bsSize:'small'}},
      {key:'copyNewDetail', title:changeReceiveEditUIInfo.copyNewBtn, props:{bsStyle:'default', bsSize:'small'}},
      {key:'table2Delete', title:changeReceiveEditUIInfo.deleteBtn, props:{bsStyle:'default',  bsSize:'small'}},
    ];
    return (
      <div>
        <SuperButtonToolbar buttons={buttons} inline={true} onClick={this.onClick} />
        {this.toDetailTable()}
      </div>
    );
  };

  toButtonToolbar = () => {
    let {changeReceiveEditUIInfo} = this.props;
    let buttons = [
      {key:'save', title:changeReceiveEditUIInfo.saveBtn, props:{bsStyle:'primary', bsSize:'small'}},
      {key:'cancel', title:changeReceiveEditUIInfo.cancelBtn, props:{bsStyle:'danger', bsSize:'small'}},
      {key:'submit', title:changeReceiveEditUIInfo.submitBtn, props:{bsStyle:'success', bsSize:'small'}}
    ];
    return <SuperButtonToolbar buttons={buttons} onClick={this.onClick} />;
  };

  onClick = (key) => {
    let { tabKey,rowIndex, changeReceiveInfo,onCancelTab, onSave, onSubmit,onTable2AddRow, onTable2Delete} = this.props;
    switch (key) {
      case 'save':
        onSave( tabKey, changeReceiveInfo);
        break;
      case 'cancel':
        onCancelTab( tabKey);
        break;
      case 'submit':
        onSubmit( tabKey, changeReceiveInfo);
        break;
      case 'table2AddRow':
        onTable2AddRow(tabKey);
        break;
      case 'copyNewDetail':
        //onTable2AddRow('detailTable');
        break;
      case 'table2Delete':
        onTable2Delete(tabKey, rowIndex);
        break;
    }
  };

  render() {
    let baseInfoUI = this.props.changeReceiveEditUIInfo.baseInfo.children;
    let {baseInfo={}} = this.props.changeReceiveInfo;
    const baseInfoArr = [
      { key: 'order', label: baseInfoUI.order, bRequired: false, type: 'text'},
      { key: 'jobNo', label: baseInfoUI.jobNo, bRequired: false, type: 'text' },
      { key: 'jobUnit', label: baseInfoUI.jobUnit, bRequired: false, type: 'text' },
      { key: 'changeOrderResponsibility', label: baseInfoUI.changeOrderResponsibility, bRequired: false, type: 'text' },
      { key: 'changeOrderReason', label: baseInfoUI.changeOrderReason, bRequired: false, type: 'text' },
      { key: 'status', label: baseInfoUI.status, bRequired: false, type: 'text' },
      { key: 'applicant', label: baseInfoUI.applicant, bRequired: false, type: 'text' },
      { key: 'applyTime', label: baseInfoUI.applyTime, bRequired: false, type: 'text',layoutScale:[8,2,10] },
      { key: 'remarks1', label: baseInfoUI.remarks1, bRequired: false, type: 'text',layoutScale:[12,1,11] }
    ];

    return (
      <div className={s.root}>
        {this.toHeader()}
        {this.toLin()}
        <SuperFormGroup groupKey={'baseInfo'} items={baseInfoArr} onChange={this.props.onInputChange} value={baseInfo} />
        <div className={s.content}>
          {this.toTitle()}
          {this.toLin1()}
          {this.toSectionDetailTable()}
        </div>
        {this.toButtonToolbar()}
      </div>
    );
  }
}

export default withStyles(s)(ChangeReceiveEdit);
