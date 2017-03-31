/**
 * Created by pengxiaojing on 2017/2/14.
 */
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './JobUnit1.less';
import { ButtonToolbar, Button, Tabs, Tab, Form, FormGroup, Col, FormControl, Checkbox, ControlLabel, option, Radio } from 'react-bootstrap';



class JobUnit1 extends React.Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired, //取消、返回按钮点击回调函数
    formLabelInfo: PropTypes.object.isRequired, //各字段界面信息
    orderInfo: PropTypes.object.isRequired, //订单信息,
  };

  toSectionTitle = (title) => {
    return (
      <div className={s.title}>
        <div className={s.divtitle}>1</div>
        {title}
      </div>
    );
  }

  toSelectCol = (info = {}, index) => {
    const ops = (info.options || []).map((option, index) => <option key={index} value={option.value}>{option.name}</option>);
    return (
      <span key={index}>
        <Col componentClass={ControlLabel} sm={1} className={s.col}>
          {info.label}
          {info.bRequired ? <span className={s.required}>*</span> : null}
        </Col>
        <Col sm={3} className={s.col2}>
          <FormControl componentClass="select" placeholder="select" >
            {ops}
          </FormControl>
        </Col>
      </span>
    );
  }

  toTextCol = (info = {}, index) => (
    <span key={index}>
      <Col componentClass={ControlLabel} sm={1} className={s.col}>
        {info.label}
        {info.bRequired ? <span key="required" className={s.required}>*</span> : null}
      </Col>
      <Col sm={3} className={s.col2}>
        <FormControl type="text" />
      </Col>
    </span>
  )

  toRadioCol = (info = {}, index) => (
    <Radio inline key={index} name={info.name} className={s.radio}>
      {info.label}
    </Radio>
  )
  toCheckboxCol = (info = {}, index) => {
    let disable = false;
    if (this.props.infoType == 'splitModifyOrder' || this.props.infoType == 'splitModifyChildOrder' || this.props.infoType == 'jobModifyOrder') {
      disable = true;
    }
    return (
      <Checkbox inline key={index} name={info.name} value={info.value} className={s.checkbox} checked={info.bSelect} onChange={info.onChange} disabled={disable}>
        {info.label}
      </Checkbox>
    );
  }
  toFormGroup = (baseInfos) => {
    const childrens = (baseInfos || []).map((info, index) => {
      switch (info.type) {
        case 'select':
          return this.toSelectCol(info, index);
        case 'calendar':
        case 'text':
          return this.toTextCol(info, index);
        case 'radio':
          return this.toRadioCol(info, index);
        case 'checkbox':
          return this.toCheckboxCol(info, index);
        default:
          return null;
      }
    });
    return (
      <FormGroup controlId="baseInfo" bsSize="small">
        {childrens}
      </FormGroup>
    );
  }
  toFiledset = (title, bShow, infos) => bShow ? (
    <fieldset className={s.fieldset}>
      <legend className={s.legend}>{title}</legend>
      {this.toFormGroup(infos)}
    </fieldset>
  ) : null

  toButtonToolbar = () => (
    <ButtonToolbar className={s.toolbar}>
      <Button bsStyle="success" >保存 </Button>
      <Button bsStyle="danger" onClick={this.props.onCancel}>返回</Button>
    </ButtonToolbar>
  )

  render() {
    let port = this.props.formLabelInfo.labels.portInfo.children;
    const portInfo = [
      {key:'startPort', label:port.startPort , bRequired: true, type: 'select', options: [] },
      {key:'startPortDescription', label:port.startPortDescription , bRequired: false, type: 'text'},
      {key:'destinationPort', label:port.destinationPort , bRequired: true, type: 'select', options: [] },
      {key:'destinationPortDescription', label:port.destinationPortDescription , bRequired: false, type: 'text'},
      {key:'middlePort', label:port.middlePort , bRequired: false, type: 'select', options: [] },
      {key:'middlePortDescription', label:port.middlePortDescription , bRequired: false, type: 'text'},
      {key:'destination', label:port.destination , bRequired: false, type: 'select', options: [] },
      {key:'destinationDescription', label:port.destinationDescription , bRequired: false, type: 'text'},
    ];
    let booking = this.props.formLabelInfo.labels.bookingInfo.children;
    const bookingInfo = [
      {key:'shipCompany', label:booking.shipCompany , bRequired: false, type: 'select'},
      {key:'shipName', label:booking.shipName , bRequired: false, type: 'text'},
      {key:'voyage', label:booking.voyage , bRequired: false, type: 'text'},
      {key:'closePassesDate', label:booking.closePassesDate , bRequired: true, type: 'calendar'},
      {key:'expectSailDate', label:booking.expectSailDate , bRequired: true, type: 'calendar'},
      {key:'expectArriveDate', label:booking.expectArriveDate , bRequired: false, type: 'calendar'},
      {key:'clientPayWay', label:booking.clientPayWay , bRequired: true, type: 'select'},
      {key:'transportProvisions', label:booking.transportProvisions , bRequired: true, type: 'select'},
      {key:'clientBillType', label:booking.clientBillType , bRequired: false, type: 'select'},
    ];
    let goods = this.props.formLabelInfo.labels.goodsInfo.children;
    const goodsInfo = [
      {key:'englishName', label:goods.englishName , bRequired: true, type: 'text'},
      {key:'chineseName', label:goods.chineseName , bRequired: true, type: 'text'},
      {key:'numbers', label:goods.numbers , bRequired: true, type: 'text'},
      {key:'mark', label:goods.mark , bRequired: true, type: 'text'},
      {key:'packingUnit', label:goods.packingUnit , bRequired: true, type: 'text'},
      {key:'allWeight', label:goods.allWeight , bRequired: true, type: 'text'},
      {key:'size', label:goods.size , bRequired: true, type: 'text'},
      {key:'netWeight', label:goods.netWeight , bRequired: false, type: 'text'},
      {key:'description', label:goods.description , bRequired: false, type: 'text'},
    ];
    let contact = this.props.formLabelInfo.labels.contactInfo.children;
    const contactInfo = [
      {key:'consignor', label:contact.consignor , bRequired: false, type: 'text'},
      {key:'consignorHead', label:contact.consignorHead , bRequired: false, type: 'text'},
      {key:'consignee', label:contact.consignee , bRequired: false, type: 'text'},
      {key:'consigneeHead', label:contact.consigneeHead , bRequired: false, type: 'text'},
      {key:'notifier', label:contact.notifier , bRequired: false, type: 'text'},
      {key:'notifierHead', label:contact.notifierHead , bRequired: false, type: 'text'},
      {key:'agent', label:contact.agent , bRequired: false, type: 'text'},
      {key:'agentHead', label:contact.agentHead , bRequired: false, type: 'text'},
    ] ;
    return (
      <div className={s.root}>
        <Form horizontal>
          {this.toSectionTitle(this.props.formLabelInfo.labels.portInfo.titleName)}
          {this.toFormGroup(portInfo)}
          {this.toSectionTitle(this.props.formLabelInfo.labels.bookingInfo.titleName)}
          {this.toFormGroup(bookingInfo)}
          {this.toSectionTitle(this.props.formLabelInfo.labels.goodsInfo.titleName)}
          {this.toFormGroup(goodsInfo)}
          {this.toSectionTitle(this.props.formLabelInfo.labels.contactInfo.titleName)}
          {this.toFormGroup(contactInfo)}
        </Form>
        {this.toButtonToolbar()}
      </div>
    );
  }
}

export default withStyles(s)(JobUnit1);
