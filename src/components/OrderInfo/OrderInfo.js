/**
 * Created by pengxiaojing on 2017/2/9.
 */
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './OrderInfo.less';
import { ButtonToolbar, Button, Form, FormGroup, Col, FormControl, Checkbox, ControlLabel, option, Radio } from 'react-bootstrap';
import GoodsSplitModalContainer from '../../routes/order/split/GoodsSplitModal/GoodsSplitModalContainer';
import JobSplitModalContainer from '../../routes/order/split/JobSplitModal/JobSplitModalContainer';
import SuperTable2 from '../SuperTable2';
import SuperFormGroup from '../SuperFormGroup';
import Title from '../Title';
import SuperButtonToolbar from '../SuperButtonToolbar';

class OrderInfo extends React.Component {
  static PropTypes = {
    rootType: PropTypes.oneOf(['input', 'split', 'job']),
    tabKey: PropTypes.string,
    orderInfoUIInfo: PropTypes.object,
    orderInfo: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.componentWillReceiveProps(props);
  };

  componentWillReceiveProps = (props) => {
    props.onGetUIInfo();
    props.onGetOptions();
  };

  toGoodsInfoTable = () => {
    let {orderInfo, orderInfoUIInfo, onContentChange, onDelete} = this.props;
    let colsName = orderInfoUIInfo.goodsInfoTable.tableCols;
    const cols = [
      {key: "index", title: colsName.index, type: "index"},
      {key: "numberPO", title: colsName.numberPO, type: "text"},
      {key: "supplier", title: colsName.supplier, type: "text"},
      {key: "goodsCode", title: colsName.goodsCode, type: "text"},
      {key: "codeHS", title: colsName.codeHS, type: "text"},
      {key: "goodsName", title: colsName.goodsName, type: "text"},
      {key: "goodsBarCode", title: colsName.goodsBarCode, type: "text"},
      {key: "batchNumber", title: colsName.batchNumber, type: "text"},
      {key: "productionDate", title: colsName.productionDate, type: "text"},
      {key: "goodsNumber", title: colsName.goodsNumber, type: "text"},
      {key: "boxNumber", title: colsName.boxNumber, type: "number"},
      {key: "number", title: colsName.number, type: "number"},
      {key: "size", title: colsName.size, type: "number"},
      {key: "weight", title: colsName.weight, type: "number", props: {real: true}},
      {key: "option", title: colsName.option, type: "button", typeRelated: colsName.deleteBtn, props: {bsSize:"small", bsStyle:"link"}}
    ];
    const callback = {
      onContentChange: onContentChange.bind(this, 'goodsInfoTable', 'all'),
      onBtnClick: onDelete.bind(this, 'goodsInfoTable', 'all')
    };
    return <SuperTable2 cols={cols} items={orderInfo.goodsInfoTable || []} callback={callback} /> ;
  };
  toSectionGoodsInfoTable = () => {
    let { tabKey, orderInfo, orderInfoUIInfo, goodsModalRoot, jobSplitModal} = this.props;
    let isHide = !orderInfo.serviceType || !orderInfo.serviceType.domesticTransport ||
      (orderInfo.serviceType.domesticTransport.requireGoodsInfo==false);
    if(isHide){
      //return null;
    }
    let buttons = [];
    let goodsModal = null;
    let jobModal = null;
    let type = tabKey.substr(0, tabKey.indexOf('-'));
    switch (type) {
      case 'newOrder':
      case 'copyNewOrder':
      case 'inputEditOrder':
        buttons = [
          {key:'goodsAddRow', title:orderInfoUIInfo.goodsInfoTable.addRowBtn, props:{bsStyle:'primary', bsSize:'small'}}
        ];
        break;
      case 'splitEditOrder':
        buttons = [
        {key:'goodsAddRow', title:orderInfoUIInfo.goodsInfoTable.addRowBtn, props:{bsStyle:'primary', bsSize:'small'}},
        {key:'goodsSplit', title:orderInfoUIInfo.goodsInfoTable.goodsSplitBtn, props:{bsStyle:'primary', bsSize:'small'}},
        {key:'jobSplit', title:orderInfoUIInfo.goodsInfoTable.jobSplitBtn, props:{bsStyle:'primary', bsSize:'small'}}
        ];
        let {goodsSplitModal, splitCountModal} = goodsModalRoot;
        goodsModal = <GoodsSplitModalContainer tabKey={tabKey} goodsSplitModal={goodsSplitModal[tabKey]} splitCountModal={splitCountModal[tabKey]} /> ;
        jobModal = <JobSplitModalContainer tabKey={tabKey} {...jobSplitModal} /> ;
        break;
      case 'splitEditChildOrder':
        buttons = [
          {key:'jobSplit', title:orderInfoUIInfo.goodsInfoTable.jobSplitBtn, props:{bsStyle:'primary', bsSize:'small'}}
        ];
        break;
      case 'jobEditOrder':
        break;
    }
    return (
      <div>
        <Title title={orderInfoUIInfo.goodsInfoTable.titleName} inline={true}/>
        <SuperButtonToolbar buttons={buttons} inline={true} onClick={this.onClick} />
        {goodsModal}
        {jobModal}
        {this.toGoodsInfoTable()}
      </div>
    );
  };

  toCabinetInfoTable = () => {
    let {orderInfo, orderInfoUIInfo, onContentChange, onDelete} = this.props;
    let colsName = orderInfoUIInfo.cabinetInfoTable.tableCols;
    const cars = ["货车", "小汽车", "挂车"];
    const cols = [
      {key: "index", title: colsName.index, type: "index"},
      {key: "carSize", title: colsName.carSize, type: "select", typeRelated: cars},
      {key: "number", title: colsName.number, type: "number"},
      {key: "size", title: colsName.size, type: "number"},
      {key: "weight", title: colsName.weight, type: "number", props: {real: true}},
      {key: "option", title: colsName.option, type: "button", typeRelated: colsName.deleteBtn, props: {bsSize:"small", bsStyle:"link"}}
    ];
    const callback = {
      onContentChange: onContentChange.bind(this, 'cabinetInfoTable', 'all'),
      onBtnClick: onDelete.bind(this, 'cabinetInfoTable', 'all')
    };
    return <SuperTable2 cols={cols} items={orderInfo.cabinetInfoTable || []} callback={callback} /> ;
  };
  toSectionCabinetInfoTable = () => {
    let { orderInfo, orderInfoUIInfo } = this.props;
    let serviceType = orderInfo.serviceType;
    let isShow = serviceType && ( (serviceType.domesticTransport&&serviceType.domesticTransport.transportWay=='')
      || serviceType.portTransportIn || serviceType.portTransportOut || serviceType.portLocalTransport
      || serviceType.bookingTransport || serviceType.bondedTransport || serviceType.railwayTransport
      || serviceType.seaTransport || serviceType.coastalTrade || serviceType.portTransport);

    if (isShow) {
      let buttons = [
        {key:'cabinetAddRow', title:orderInfoUIInfo.cabinetInfoTable.addRowBtn, props:{bsStyle:'primary', bsSize:'small'}}
      ];
      return (
        <div>
          <Title title={orderInfoUIInfo.cabinetInfoTable.titleName} inline={true}/>
          <SuperButtonToolbar buttons={buttons} inline={true} onClick={this.onClick} />
          {this.toCabinetInfoTable()}
        </div>
      );
    }else {
      return null;
    }
  };

  toLoadSendAddressTable = (serviceTypeName) => {
    let {orderInfo, orderInfoUIInfo, onContentChange, onDelete} = this.props;
    let colsName = orderInfoUIInfo.loadSendAddressTable.tableCols;
    const cols = [
      {key: "index", title: colsName.index, type: "index"},
      {key: "loadGoodsTime", title: colsName.loadGoodsTime, type: "text"},
      {key: "loadAddress", title: colsName.loadAddress, type: "text"},
      {key: "loadPerson", title: colsName.loadPerson, type: "text"},
      {key: "loadPersonPhone", title: colsName.loadPersonPhone, type: "text"},
      {key: "sendGoodsTime", title: colsName.sendGoodsTime, type: "text"},
      {key: "sendAddress", title: colsName.sendAddress, type: "text"},
      {key: "sendPerson", title: colsName.sendPerson, type: "text"},
      {key: "sendPersonPhone", title: colsName.sendPersonPhone, type: "text"},
      {key: "option", title: colsName.option, type: "button", typeRelated: colsName.deleteBtn, props: {bsSize:"small", bsStyle:"link"}}
    ];
    const callback = {
      onContentChange: onContentChange.bind(this, 'loadSendAddressTable', serviceTypeName),
      onBtnClick: onDelete.bind(this, 'loadSendAddressTable', serviceTypeName)
    };
    if (! orderInfo[serviceTypeName] ){
      orderInfo[serviceTypeName] = {loadSendAddressTable:[]};
    }
    return <SuperTable2 cols={cols} items={orderInfo[serviceTypeName].loadSendAddressTable || []} callback={callback} /> ;
  };
  toSectionLoadSendAddressTable = (serviceTypeName) => {
    let isShow = (serviceTypeName == 'domesticTransport') || (serviceTypeName == 'bondedTransport');
    if (!isShow) return null;
    let {orderInfoUIInfo, onAddRow} = this.props;

    let buttons = [
      {key:'addressTableAddRow', title:orderInfoUIInfo.loadSendAddressTable.addRowBtn, props:{bsStyle:'primary', bsSize:'small'}}
    ];
    const addClick = (key) => onAddRow('loadSendAddressTable', serviceTypeName);
    return (
      <div>
        <Title title={orderInfoUIInfo.loadSendAddressTable.titleName} inline={true}/>
        <SuperButtonToolbar buttons={buttons} inline={true} onClick={addClick} />
        {this.toLoadSendAddressTable(serviceTypeName)}
      </div>
    );
  };

  toLoadSendAddressTable2 = (serviceTypeName) => {
    let {orderInfo, orderInfoUIInfo, onContentChange, onDelete } = this.props;
    let colsName = orderInfoUIInfo.loadSendAddressTable2.tableCols;
    const cols = [
      {key: "index", title: colsName.index, type: "index"},
      {key: "requireTime", title: colsName.requireTime, type: "text"},
      {key: "factory", title: colsName.factory, type: "text"},
      {key: "firstAddress", title: colsName.firstAddress, type: "text"},
      {key: "firstContactPerson", title: colsName.firstContactPerson, type: "text"},
      {key: "firstPersonPhone", title: colsName.firstPersonPhone, type: "text"},
      {key: "secondAddress", title: colsName.secondAddress, type: "text"},
      {key: "secondContactPerson", title: colsName.secondContactPerson, type: "text"},
      {key: "secondPersonPhone", title: colsName.secondPersonPhone, type: "text"},
      {key: "option", title: colsName.option, type: "button", typeRelated: colsName.deleteBtn, props: {bsSize:"small", bsStyle:"link"}}
    ];
    const callback = {
      onContentChange: onContentChange.bind(this, 'loadSendAddressTable2', serviceTypeName),
      onBtnClick: onDelete.bind(this, 'loadSendAddressTable2', serviceTypeName)
    };
    if (! orderInfo[serviceTypeName] ){
      orderInfo[serviceTypeName] = {loadSendAddressTable2:[]};
    }
    return <SuperTable2 cols={cols} items={orderInfo[serviceTypeName].loadSendAddressTable2 || []} callback={callback} /> ;
  };
  toSectionLoadSendAddressTable2 = (serviceTypeName) => {
    let isShow = (serviceTypeName == 'portTransport');
    if (!isShow) return null;
    let {orderInfoUIInfo, onAddRow} = this.props;

    let buttons = [
      {key:'addressTable2AddRow', title:orderInfoUIInfo.loadSendAddressTable2.addRowBtn, props:{bsStyle:'primary', bsSize:'small'}}
    ];
    const addClick = (key) => onAddRow('loadSendAddressTable2', serviceTypeName);
    return (
      <div>
        <Title title={orderInfoUIInfo.loadSendAddressTable2.titleName} inline={true}/>
        <SuperButtonToolbar buttons={buttons} inline={true} onClick={addClick} />
        {this.toLoadSendAddressTable2(serviceTypeName)}
      </div>
    );
  };

  onServiceTypeCheckChange = (event) => this.props.onServiceCheck(event.target.name);
  toCheckboxCol = (type = {}, index) => {
    return (
      <Checkbox inline key={index} name={type.name} checked={type.bSelect} onChange={this.onServiceTypeCheckChange} >
        {type.label}
      </Checkbox>
    );
  };
  toServiceType = (typeArr) => {
    const children = (typeArr || []).map((type, index) => this.toCheckboxCol(type, index));
    return (
      <div key="serviceType">
        {children}
      </div>
    );
  };
  toFiledSet = (title, bShow, serviceTypeName, infoGroup, value) => {
    return bShow ? (
      <fieldset className={s.fieldset}>
        <legend className={s.legend}>{title}</legend>
        <SuperFormGroup groupKey={serviceTypeName} items={infoGroup} onChange={this.props.onInputChange} values={value} />
        {this.toSectionLoadSendAddressTable(serviceTypeName)}
        {this.toSectionLoadSendAddressTable2(serviceTypeName)}
      </fieldset>
    ) : null;
  };

  onClick = (key) => {
    let {orderInfo, onCancelTab, onSave, onSubmit, onInitGoodsModal,
      onModalChange, onInitJobModal, onAddRow} = this.props;
    switch (key) {
      case 'save':
        onSave(orderInfo);
        break;
      case 'cancel':
        onCancelTab();
        break;
      case 'submit':
        onSubmit(orderInfo);
        break;
      case 'goodsAddRow':
        onAddRow('goodsInfoTable', 'all');
        break;
      case 'goodsSplit':
        onInitGoodsModal(orderInfo);
        onModalChange(true);
        break;
      case 'jobSplit':
        onInitJobModal(orderInfo);
        break;
      case 'cabinetAddRow':
        onAddRow('cabinetInfoTable', 'all');
        break;
    }
  };
  toButtonToolbar = () => {
    let {orderInfoUIInfo} = this.props;
    let buttons = [
      {key:'save', title:orderInfoUIInfo.saveBtn, props:{bsStyle:'primary', bsSize:'small'}},
      {key:'cancel', title:orderInfoUIInfo.cancelBtn, props:{bsStyle:'danger', bsSize:'small'}},
      {key:'submit', title:orderInfoUIInfo.submitBtn, props:{bsStyle:'success', bsSize:'small'}}
    ];
    return <SuperButtonToolbar buttons={buttons} onClick={this.onClick} />;
  };

  render() {
    if (!this.props.orderInfoUIInfo) {
      return <p>正在加载</p>;
    }
    let baseInfoUI = this.props.orderInfoUIInfo.baseInfo.children;
    let {baseInfo={}, goodsInfo={}, serviceType={}, domesticTransport={}, portTransportIn={},
      portTransportOut={}, portLocalTransport={}, bookingTransport={}, bondedTransport={},
      railwayTransport={}, seaTransport={}, airTransport={}, toDO={}, delegateOption={},
      coastalTrade={}, portTransport={}, options={}} = this.props.orderInfo;
    let {delegateClient=[] } = options;
    const baseInfoArr = [
      { key: 'delegateClient', label: baseInfoUI.delegateClient, bRequired: true, type: 'superSelect', options: options.delegateClient},
      { key: 'contactPerson', label: baseInfoUI.contactPerson, bRequired: false, type: 'text'},
      { key: 'contactPersonPhone', label: baseInfoUI.contactPersonPhone, bRequired: false, type: 'text' },
      { key: 'contactPersonEmail', label: baseInfoUI.contactPersonEmail, bRequired: false, type: 'text' },
      { key: 'clientDelegateCode', label: baseInfoUI.clientDelegateCode, bRequired: false, type: 'text' },
      { key: 'delegateReferCode', label: baseInfoUI.delegateReferCode, bRequired: false, type: 'text' },
      { key: 'payClient', label: baseInfoUI.payClient, bRequired: false, type: 'text' },
      { key: 'contractNumber', label: baseInfoUI.contractNumber, bRequired: false, type: 'text' },
      { key: 'salesman', label: baseInfoUI.salesman, bRequired: false, type: 'text' }
    ];
    let goodsInfoUI = this.props.orderInfoUIInfo.goodsInfo.children;
    const goodsInfoArr = [
      { key: 'chineseName', label: goodsInfoUI.chineseName, bRequired: false, type: 'text' },
      { key: 'englishName', label: goodsInfoUI.englishName, bRequired: false, type: 'text' },
      { key: 'number', label: goodsInfoUI.number, bRequired: false, type: 'text' },
      { key: 'packingUnit', label: goodsInfoUI.packingUnit, bRequired: false, type: 'text' },
      { key: 'size', label: goodsInfoUI.size, bRequired: false, type: 'text' },
      { key: 'allWeight', label: goodsInfoUI.allWeight, bRequired: false, type: 'text' },
      { key: 'goodsPrice', label: goodsInfoUI.goodsPrice, bRequired: false, type: 'text' },
      { key: 'cardBoardSize', label: goodsInfoUI.cardBoardSize, bRequired: false, type: 'text' },
      { key: 'mark', label: goodsInfoUI.mark, bRequired: false, type: 'text' },
      { key: 'description', label: goodsInfoUI.description, bRequired: false, type: 'text' },
      { key: 'goodsType', label: goodsInfoUI.goodsType, bRequired: false, type: 'text' },
      { key: 'coldRequirement', label: goodsInfoUI.coldRequirement, bRequired: false, type: 'text' },
      { key: 'placeRequirement', label: goodsInfoUI.placeRequirement, bRequired: false, type: 'text' },
      { key: 'dangerLevel', label: goodsInfoUI.dangerLevel, bRequired: false, type: 'text' },
      { key: 'dangerInfo', label: goodsInfoUI.dangerInfo, bRequired: false, type: 'text' },
      { key: 'specifications', label: goodsInfoUI.specifications, bRequired: false, type: 'text' }
    ];
    let serviceTypeUI = this.props.orderInfoUIInfo.serviceType.children;
    const serviceTypeArr = [
      { key: 'domesticTransport', label: serviceTypeUI.domesticTransport, type: 'checkbox', name: 'domesticTransport', bSelect: serviceType.domesticTransport||false },
      { key: 'portTransportIn', label: serviceTypeUI.portTransportIn, type: 'checkbox', name: 'portTransportIn', bSelect:serviceType.portTransportIn||false },
      { key: 'portTransportOut', label: serviceTypeUI.portTransportOut, type: 'checkbox', name: 'portTransportOut', bSelect:serviceType.portTransportOut||false },
      { key: 'portLocalTransport', label: serviceTypeUI.portLocalTransport, type: 'checkbox', name: 'portLocalTransport', bSelect:serviceType.portLocalTransport||false },
      { key: 'bookingTransport', label: serviceTypeUI.bookingTransport, type: 'checkbox', name: 'bookingTransport', bSelect:serviceType.bookingTransport||false },
      { key: 'bondedTransport', label: serviceTypeUI.bondedTransport, type: 'checkbox', name: 'bondedTransport', bSelect:serviceType.bondedTransport||false },
      { key: 'railwayTransport', label: serviceTypeUI.railwayTransport, type: 'checkbox', name: 'railwayTransport', bSelect:serviceType.railwayTransport||false },
      { key: 'seaTransport', label: serviceTypeUI.seaTransport, type: 'checkbox', name: 'seaTransport', bSelect:serviceType.seaTransport||false },
      { key: 'airTransport', label: serviceTypeUI.airTransport, type: 'checkbox', name: 'airTransport', bSelect:serviceType.airTransport||false },
      { key: 'toDO', label: serviceTypeUI.toDO, type: 'checkbox', name: 'toDO', bSelect:serviceType.toDO||false },
      { key: 'delegateOption', label: serviceTypeUI.delegateOption, type: 'checkbox', name: 'delegateOption', bSelect:serviceType.delegateOption||false },
      { key: 'coastalTrade', label: serviceTypeUI.coastalTrade, type: 'checkbox', name: 'coastalTrade', bSelect:serviceType.coastalTrade||false },
      { key: 'portTransport', label: serviceTypeUI.portTransport, type: 'checkbox', name: 'portTransport', bSelect:serviceType.portTransport||false }
    ];

    let domesticTransportUI = this.props.orderInfoUIInfo.domesticTransport.children;
    const domesticTransportArr = [
      { key: 'goodsNumber', label: domesticTransportUI.goodsNumber, bRequired: false, type: 'text' },
      { key: 'signRequirement', label: domesticTransportUI.signRequirement, bRequired: false, type: 'text' },
      { key: 'signOtherRequirement', label: domesticTransportUI.signOtherRequirement, bRequired: false, type: 'text'},
      { key: 'goodsPrice', label: domesticTransportUI.goodsPrice, bRequired: false, type: 'text', value:domesticTransport.goodsPrice||'' },
      { key: 'goodsPlaceRequirement', label: domesticTransportUI.goodsPlaceRequirement, bRequired: false, type: 'text' },
      { key: 'transportWay', label: domesticTransportUI.transportWay, bRequired: false, type: 'text' },
      { key: 'multiAddress', label: domesticTransportUI.multiAddress, bRequired: false, type: 'text' },
      { key: 'requireGoodsInfo', label: domesticTransportUI.requireGoodsInfo, bRequired: false, type: 'text' }
    ];

    let portTransportInUI = this.props.orderInfoUIInfo.portTransportIn.children;
    const portTransportInArr = [
      { key: 'loadGoodsDate', label: portTransportInUI.loadGoodsDate, bRequired: false, type: 'text'},
      { key: 'openStoreDate', label: portTransportInUI.openStoreDate, bRequired: false, type: 'text'},
      { key: 'loadGoodsCompany', label: portTransportInUI.loadGoodsCompany, bRequired: false, type: 'text'},
      { key: 'loadContactPerson', label: portTransportInUI.loadContactPerson, bRequired: false, type: 'text' },
      { key: 'loadPhone', label: portTransportInUI.loadPhone, bRequired: false, type: 'text'},
      { key: 'loadAttention', label: portTransportInUI.loadAttention, bRequired: false, type: 'text' },
      { key: 'unloadGoodsCompany', label: portTransportInUI.unloadGoodsCompany, bRequired: false, type: 'text' },
      { key: 'unloadGoodsAddress', label: portTransportInUI.unloadGoodsAddress, bRequired: false, type: 'text' },
      { key: 'unloadContactPerson', label: portTransportInUI.unloadContactPerson, bRequired: false, type: 'text' },
      { key: 'unloadPhone', label: portTransportInUI.unloadPhone, bRequired: false, type: 'text' },
      { key: 'unloadAttention', label: portTransportInUI.unloadAttention, bRequired: false, type: 'text' },
      { key: 'goodsBLNO', label: portTransportInUI.goodsBLNO, bRequired: false, type: 'text' },
      { key: 'placeTailRequire', label: portTransportInUI.placeTailRequire, bRequired: false, type: 'text' },
      { key: 'isSpeedOrder', label: portTransportInUI.isSpeedOrder, bRequired: false, type: 'text' },
      { key: 'originCountry', label: portTransportInUI.originCountry, bRequired: false, type: 'text' },
      { key: 'declareWay', label: portTransportInUI.declareWay, bRequired: false, type: 'text' },
      { key: 'clientLandDeclare', label: portTransportInUI.clientLandDeclare, bRequired: false, type: 'text' },
      { key: 'landDeclare', label: portTransportInUI.landDeclare, bRequired: false, type: 'text' },
      { key: 'landContactPerson', label: portTransportInUI.landContactPerson, bRequired: false, type: 'text' },
      { key: 'landPhone', label: portTransportInUI.landPhone, bRequired: false, type: 'text' },
      { key: 'clientHKDeclare', label: portTransportInUI.clientHKDeclare, bRequired: false, type: 'text' },
      { key: 'hkDeclare', label: portTransportInUI.hkDeclare, bRequired: false, type: 'text' },
      { key: 'hkContactPerson', label: portTransportInUI.hkContactPerson, bRequired: false, type: 'text' },
      { key: 'hkPhone', label: portTransportInUI.hkPhone, bRequired: false, type: 'text' },
      { key: 'entryPort', label: portTransportInUI.entryPort, bRequired: false, type: 'text' },
      { key: 'quarantineWay', label: portTransportInUI.quarantineWay, bRequired: false, type: 'text' },
      { key: 'seamless', label: portTransportInUI.seamless, bRequired: false, type: 'text' },
      { key: 'roadCabin', label: portTransportInUI.roadCabin, bRequired: false, type: 'text' },
      { key: 'otherAttention', label: portTransportInUI.otherAttention, bRequired: false, type: 'text' }
    ];

    let portTransportOutUI = this.props.orderInfoUIInfo.portTransportOut.children;
    const portTransportOutArr = [
      { key: 'loadGoodsDate', label: portTransportOutUI.loadGoodsDate, bRequired: false, type: 'text', value:portTransportOut.loadGoodsDate||'' },
      { key: 'closePassesDate', label: portTransportOutUI.closePassesDate, bRequired: false, type: 'text', value:portTransportOut.closePassesDate||'' },
      { key: 'loadGoodsCompany', label: portTransportOutUI.loadGoodsCompany, bRequired: false, type: 'text', value:portTransportOut.loadGoodsCompany||'' },
      { key: 'loadGoodsAddress', label: portTransportOutUI.loadGoodsAddress, bRequired: false, type: 'text', value:portTransportOut.loadGoodsAddress||'' },
      { key: 'loadContactPerson', label: portTransportOutUI.loadContactPerson, bRequired: false, type: 'text', value:portTransportOut.loadContactPerson||'' },
      { key: 'loadPhone', label: portTransportOutUI.loadPhone, bRequired: false, type: 'text', value:portTransportOut.loadPhone||'' },
      { key: 'loadAttention', label: portTransportOutUI.loadAttention, bRequired: false, type: 'text', value:portTransportOut.loadAttention||'' },
      { key: 'unloadGoodsCompany', label: portTransportOutUI.unloadGoodsCompany, bRequired: false, type: 'text', value:portTransportOut.unloadGoodsCompany||'' },
      { key: 'unloadContactPerson', label: portTransportOutUI.unloadContactPerson, bRequired: false, type: 'text', value:portTransportOut.unloadContactPerson||'' },
      { key: 'unloadPhone', label: portTransportOutUI.unloadPhone, bRequired: false, type: 'text', value:portTransportOut.unloadPhone||'' },
      { key: 'unloadAttention', label: portTransportOutUI.unloadAttention, bRequired: false, type: 'text', value:portTransportOut.unloadAttention||'' },
      { key: 'goodsSONO', label: portTransportOutUI.goodsSONO, bRequired: false, type: 'text', value:portTransportOut.goodsSONO||'' },
      { key: 'placeTailRequire', label: portTransportOutUI.placeTailRequire, bRequired: false, type: 'text', value:portTransportOut.placeTailRequire||'' },
      { key: 'isOwnCabinet', label: portTransportOutUI.isOwnCabinet, bRequired: false, type: 'text', value:portTransportOut.isOwnCabinet||'' },
      { key: 'isSpeedOrder', label: portTransportOutUI.isSpeedOrder, bRequired: false, type: 'text', value:portTransportOut.isSpeedOrder||'' },
      { key: 'isTransportCompanyUnload', label: portTransportOutUI.isTransportCompanyUnload, bRequired: false, type: 'text', value:portTransportOut.isTransportCompanyUnload||'' },
      { key: 'declareWay', label: portTransportOutUI.declareWay, bRequired: false, type: 'text', value:portTransportOut.declareWay||'' },
      { key: 'clientLandDeclare', label: portTransportOutUI.clientLandDeclare, bRequired: false, type: 'text', value:portTransportOut.clientLandDeclare||'' },
      { key: 'landDeclare', label: portTransportOutUI.landDeclare, bRequired: false, type: 'text', value:portTransportOut.landDeclare||'' },
      { key: 'landContactPerson', label: portTransportOutUI.landContactPerson, bRequired: false, type: 'text', value:portTransportOut.landContactPerson||'' },
      { key: 'landPhone', label: portTransportOutUI.landPhone, bRequired: false, type: 'text', value:portTransportOut.landPhone||'' },
      { key: 'clientHKDeclare', label: portTransportOutUI.clientHKDeclare, bRequired: false, type: 'text', value:portTransportOut.clientHKDeclare||'' },
      { key: 'hkDeclare', label: portTransportOutUI.hkDeclare, bRequired: false, type: 'text', value:portTransportOut.hkDeclare||'' },
      { key: 'hkContactPerson', label: portTransportOutUI.hkContactPerson, bRequired: false, type: 'text', value:portTransportOut.hkContactPerson||'' },
      { key: 'hkPhone', label: portTransportOutUI.hkPhone, bRequired: false, type: 'text', value:portTransportOut.hkPhone||'' },
      { key: 'entryPort', label: portTransportOutUI.entryPort, bRequired: false, type: 'text', value:portTransportOut.entryPort||'' },
      { key: 'seamless', label: portTransportOutUI.seamless, bRequired: false, type: 'text', value:portTransportOut.seamless||'' },
      { key: 'roadCabin', label: portTransportOutUI.roadCabin, bRequired: false, type: 'text', value:portTransportOut.roadCabin||'' },
      { key: 'otherAttention', label: portTransportOutUI.otherAttention, bRequired: false, type: 'text', value:portTransportOut.otherAttention||'' }
    ];
    let portLocalTransportUI = this.props.orderInfoUIInfo.portLocalTransport.children;
    const portLocalTransportArr = [
      { key: 'getOrSend', label: portLocalTransportUI.getOrSend, bRequired: false, type: 'text', value:portLocalTransport.getOrSend||'' },
      { key: 'loadGoodsDate', label: portLocalTransportUI.loadGoodsDate, bRequired: false, type: 'text', value:portLocalTransport.loadGoodsDate||'' },
      { key: 'closePassesDate', label: portLocalTransportUI.closePassesDate, bRequired: false, type: 'text', value:portLocalTransport.closePassesDate||'' },
      { key: 'companyName', label: portLocalTransportUI.companyName, bRequired: false, type: 'text', value:portLocalTransport.companyName||'' },
      { key: 'address', label: portLocalTransportUI.address, bRequired: false, type: 'text', value:portLocalTransport.address||'' },
      { key: 'phone', label: portLocalTransportUI.phone, bRequired: false, type: 'text', value:portLocalTransport.phone||'' },
      { key: 'goodsAttention', label: portLocalTransportUI.goodsAttention, bRequired: false, type: 'text', value:portLocalTransport.goodsAttention||'' },
      { key: 'storeHouse', label: portLocalTransportUI.storeHouse, bRequired: false, type: 'text', value:portLocalTransport.storeHouse||'' },
      { key: 'storeContactPerson', label: portLocalTransportUI.storeContactPerson, bRequired: false, type: 'text', value:portLocalTransport.storeContactPerson||'' },
      { key: 'storePhone', label: portLocalTransportUI.storePhone, bRequired: false, type: 'text', value:portLocalTransport.storePhone||'' },
      { key: 'storeAttention', label: portLocalTransportUI.storeAttention, bRequired: false, type: 'text', value:portLocalTransport.storeAttention||'' },
      { key: 'goodsSONO', label: portLocalTransportUI.goodsSONO, bRequired: false, type: 'text', value:portLocalTransport.goodsSONO||'' },
      { key: 'getOrderNumber', label: portLocalTransportUI.getOrderNumber, bRequired: false, type: 'text', value:portLocalTransport.getOrderNumber||'' },
      { key: 'placeTailRequire', label: portLocalTransportUI.placeTailRequire, bRequired: false, type: 'text', value:portLocalTransport.placeTailRequire||'' },
      { key: 'isSpeedOrder', label: portLocalTransportUI.isSpeedOrder, bRequired: false, type: 'text', value:portLocalTransport.isSpeedOrder||'' },
      { key: 'isChangeDO', label: portLocalTransportUI.isChangeDO, bRequired: false, type: 'text', value:portLocalTransport.isChangeDO||'' },
      { key: 'orderSend', label: portLocalTransportUI.orderSend, bRequired: false, type: 'text', value:portLocalTransport.orderSend||'' },
      { key: 'isDelegatePay', label: portLocalTransportUI.isDelegatePay, bRequired: false, type: 'text', value:portLocalTransport.isDelegatePay||'' },
      { key: 'otherAttention', label: portLocalTransportUI.otherAttention, bRequired: false, type: 'text', value:portLocalTransport.otherAttention||'' }
    ];
    let bookingTransportUI = this.props.orderInfoUIInfo.bookingTransport.children;
    const bookingTransportArr = [
      { key: 'delegate', label: bookingTransportUI.delegate, bRequired: false, type: 'text', value:bookingTransport.delegate||'' },
      { key: 'shipCompany', label: bookingTransportUI.shipCompany, bRequired: false, type: 'text', value:bookingTransport.shipCompany||'' },
      { key: 'closePassesDate', label: bookingTransportUI.closePassesDate, bRequired: false, type: 'text', value:bookingTransport.closePassesDate||'' },
      { key: 'preOutGoodsDate', label: bookingTransportUI.preOutGoodsDate, bRequired: false, type: 'text', value:bookingTransport.preOutGoodsDate||'' },
      { key: 'boatName', label: bookingTransportUI.boatName, bRequired: false, type: 'text', value:bookingTransport.boatName||'' },
      { key: 'voyage', label: bookingTransportUI.voyage, bRequired: false, type: 'text', value:bookingTransport.voyage||'' },
      { key: 'startPort', label: bookingTransportUI.startPort, bRequired: false, type: 'text', value:bookingTransport.startPort||'' },
      { key: 'destinationPort', label: bookingTransportUI.destinationPort, bRequired: false, type: 'text', value:bookingTransport.destinationPort||'' },
      { key: 'seaTransportRule', label: bookingTransportUI.seaTransportRule, bRequired: false, type: 'text', value:bookingTransport.seaTransportRule||'' },
      { key: 'getOrderType', label: bookingTransportUI.getOrderType, bRequired: false, type: 'text', value:bookingTransport.getOrderType||'' },
      { key: 'consignor', label: bookingTransportUI.consignor, bRequired: false, type: 'text', value:bookingTransport.consignor||'' },
      { key: 'consignorHead', label: bookingTransportUI.consignorHead, bRequired: false, type: 'text', value:bookingTransport.consignorHead||'' },
      { key: 'consignee', label: bookingTransportUI.consignee, bRequired: false, type: 'text', value:bookingTransport.consignee||'' },
      { key: 'consigneeHead', label: bookingTransportUI.consigneeHead, bRequired: false, type: 'text', value:bookingTransport.consigneeHead||'' },
      { key: 'notifier', label: bookingTransportUI.notifier, bRequired: false, type: 'text', value:bookingTransport.notifier||'' },
      { key: 'notifierHead', label: bookingTransportUI.notifierHead, bRequired: false, type: 'text', value:bookingTransport.notifierHead||'' }
    ];
    let bondedTransportUI = this.props.orderInfoUIInfo.bondedTransport.children;
    const bondedTransportArr = [
      { key: 'originAddress', label: bondedTransportUI.originAddress, bRequired: false, type: 'text', value:bondedTransport.originAddress||'' },
      { key: 'destination', label: bondedTransportUI.destination, bRequired: false, type: 'text', value:bondedTransport.destination||'' }
    ];
    let railwayTransportUI = this.props.orderInfoUIInfo.railwayTransport.children;
    const railwayTransportArr = [
      { key: 'preStartTime', label: railwayTransportUI.preStartTime, bRequired: false, type: 'text', value:railwayTransport.preStartTime||'' },
      { key: 'preArriveTime', label: railwayTransportUI.preArriveTime, bRequired: false, type: 'text', value:railwayTransport.preArriveTime||'' },
      { key: 'startStation', label: railwayTransportUI.startStation, bRequired: false, type: 'text', value:railwayTransport.startStation||'' },
      { key: 'startStationDescription', label: railwayTransportUI.startStationDescription, bRequired: false, type: 'text', value:railwayTransport.startStationDescription||'' },
      { key: 'endStation', label: railwayTransportUI.endStation, bRequired: false, type: 'text', value:railwayTransport.endStation||'' },
      { key: 'endStationDescription', label: railwayTransportUI.endStationDescription, bRequired: false, type: 'text', value:railwayTransport.endStationDescription||'' },
      { key: 'destination', label: railwayTransportUI.destination, bRequired: false, type: 'text', value:railwayTransport.destination },
      { key: 'destinationDescription', label: railwayTransportUI.destinationDescription, bRequired: false, type: 'text', value:railwayTransport.destinationDescription||'' },
      { key: 'consignor', label: railwayTransportUI.consignor, bRequired: false, type: 'text', value:railwayTransport.consignor||'' },
      { key: 'consignorHead', label: railwayTransportUI.consignorHead, bRequired: false, type: 'text', value:railwayTransport.consignorHead||'' },
      { key: 'consignee', label: railwayTransportUI.consignee, bRequired: false, type: 'text', value:railwayTransport.consignee||'' },
      { key: 'consigneeHead', label: railwayTransportUI.consigneeHead, bRequired: false, type: 'text', value:railwayTransport.consigneeHead||'' },
      { key: 'payWay', label: railwayTransportUI.payWay, bRequired: false, type: 'text', value:railwayTransport.payWay||'' },
      { key: 'otherDescription', label: railwayTransportUI.otherDescription, bRequired: false, type: 'text', value:railwayTransport.otherDescription||'' }
    ];
    let seaTransportUI = this.props.orderInfoUIInfo.seaTransport.children;
    const seaTransportArr = [
      { key: 'startPort', label: seaTransportUI.startPort, bRequired: false, type: 'text', value:seaTransport.startPort||'' },
      { key: 'startPortDescription', label: seaTransportUI.startPortDescription, bRequired: false, type: 'text', value:seaTransport.startPortDescription||'' },
      { key: 'endPort', label: seaTransportUI.endPort, bRequired: false, type: 'text', value:seaTransport.endPort||'' },
      { key: 'endPortDescription', label: seaTransportUI.endPortDescription, bRequired: false, type: 'text', value:seaTransport.endPortDescription||'' },
      { key: 'destination', label: seaTransportUI.destination, bRequired: false, type: 'text', value:seaTransport.destination||'' },
      { key: 'destinationDescription', label: seaTransportUI.destinationDescription, bRequired: false, type: 'text', value:seaTransport.destinationDescription||'' },
      { key: 'transportDirection', label: seaTransportUI.transportDirection, bRequired: false, type: 'text', value:seaTransport.transportDirection||'' },
      { key: 'isBackGoods', label: seaTransportUI.isBackGoods, bRequired: false, type: 'text', value:seaTransport.isBackGoods||'' },
      { key: 'shipCompany', label: seaTransportUI.shipCompany, bRequired: false, type: 'text', value:seaTransport.shipCompany||'' },
      { key: 'closePassesDate', label: seaTransportUI.closePassesDate, bRequired: false, type: 'text', value:seaTransport.closePassesDate||'' },
      { key: 'boatName', label: seaTransportUI.boatName, bRequired: false, type: 'text', value:seaTransport.boatName||'' },
      { key: 'voyage', label: seaTransportUI.voyage, bRequired: false, type: 'text', value:seaTransport.voyage||'' },
      { key: 'preGoTime', label: seaTransportUI.preGoTime, bRequired: false, type: 'text', value:seaTransport.preGoTime||'' },
      { key: 'preArriveTime', label: seaTransportUI.preArriveTime, bRequired: false, type: 'text', value:seaTransport.preArriveTime||'' },
      { key: 'consignor', label: seaTransportUI.consignor, bRequired: false, type: 'text', value:seaTransport.consignor||'' },
      { key: 'consignorHead', label: seaTransportUI.consignorHead, bRequired: false, type: 'text', value:seaTransport.consignorHead||'' },
      { key: 'consignee', label: seaTransportUI.consignee, bRequired: false, type: 'text', value:seaTransport.consignee||'' },
      { key: 'consigneeHead', label: seaTransportUI.consigneeHead, bRequired: false, type: 'text', value:seaTransport.consigneeHead||'' },
      { key: 'notifier', label: seaTransportUI.notifier, bRequired: false, type: 'text', value:seaTransport.notifier||'' },
      { key: 'notifierHead', label: seaTransportUI.notifierHead, bRequired: false, type: 'text', value:seaTransport.notifierHead||'' },
      { key: 'isTradeCompany', label: seaTransportUI.isTradeCompany, bRequired: false, type: 'text', value:seaTransport.isTradeCompany||'' },
      { key: 'seaTransportRule', label: seaTransportUI.seaTransportRule, bRequired: false, type: 'text', value:seaTransport.seaTransportRule||'' },
      { key: 'getOrderType', label: seaTransportUI.getOrderType, bRequired: false, type: 'text', value:seaTransport.getOrderType||'' },
      { key: 'payWay', label: seaTransportUI.payWay, bRequired: false, type: 'text', value:seaTransport.payWay||'' },
      { key: 'transportWay', label: seaTransportUI.transportWay, bRequired: false, type: 'text', value:seaTransport.transportWay||'' }
    ];
    let airTransportUI = this.props.orderInfoUIInfo.airTransport.children;
    const airTransportArr = [
      { key: 'startStation', label: airTransportUI.startStation, bRequired: false, type: 'text', value:airTransport.startStation||'' },
      { key: 'startStationDescription', label: airTransportUI.startStationDescription, bRequired: false, type: 'text', value:airTransport.startStationDescription||'' },
      { key: 'endStation', label: airTransportUI.endStation, bRequired: false, type: 'text', value:airTransport.endStation||'' },
      { key: 'endStationDescription', label: airTransportUI.endStationDescription, bRequired: false, type: 'text', value:airTransport.endStationDescription||'' },
      { key: 'destination', label: airTransportUI.destination, bRequired: false, type: 'text', value:airTransport.destination||'' },
      { key: 'destinationDescription', label: airTransportUI.destinationDescription, bRequired: false, type: 'text', value:airTransport.destinationDescription||'' },
      { key: 'transportDirection', label: airTransportUI.transportDirection, bRequired: false, type: 'text', value:airTransport.transportDirection||'' },
      { key: 'airCompany', label: airTransportUI.airCompany, bRequired: false, type: 'text', value:airTransport.airCompany||'' },
      { key: 'preGoTime', label: airTransportUI.preGoTime, bRequired: false, type: 'text', value:airTransport.preGoTime||'' },
      { key: 'preArriveTime', label: airTransportUI.preArriveTime, bRequired: false, type: 'text', value:airTransport.preArriveTime||'' },
      { key: 'payWay', label: airTransportUI.payWay, bRequired: false, type: 'text', value:airTransport.payWay||'' },
      { key: 'flightNumber', label: airTransportUI.flightNumber, bRequired: false, type: 'text', value:airTransport.flightNumber||'' },
      { key: 'consignor', label: airTransportUI.consignor, bRequired: false, type: 'text', value:airTransport.consignor||'' },
      { key: 'consignorHead', label: airTransportUI.consignorHead, bRequired: false, type: 'text', value:airTransport.consignorHead||'' },
      { key: 'consignee', label: airTransportUI.consignee, bRequired: false, type: 'text', value:airTransport.consignee||'' },
      { key: 'consigneeHead', label: airTransportUI.consigneeHead, bRequired: false, type: 'text', value:airTransport.consigneeHead||'' },
      { key: 'notifier', label: airTransportUI.notifier, bRequired: false, type: 'text', value:airTransport.notifier||'' },
      { key: 'notifierHead', label: airTransportUI.notifierHead, bRequired: false, type: 'text', value:airTransport.notifierHead||'' },
      { key: 'file', label: airTransportUI.file, bRequired: false, type: 'text', value:airTransport.file||'' },
      { key: 'airTransportRule', label: airTransportUI.airTransportRule, bRequired: false, type: 'text', value:airTransport.airTransportRule ||''},
      { key: 'goodsSize', label: airTransportUI.goodsSize, bRequired: false, type: 'text', value:airTransport.goodsSize||'' }
    ];
    let toDOUI = this.props.orderInfoUIInfo.toDO.children;
    const toDOArr = [
      { key: 'shipCompany', label: toDOUI.shipCompany, bRequired: false, type: 'text' },
      { key: 'boatName', label: toDOUI.boatName, bRequired: false, type: 'text' },
      { key: 'voyage', label: toDOUI.voyage, bRequired: false, type: 'text' },
      { key: 'startPort', label: toDOUI.startPort, bRequired: false, type: 'text' },
      { key: 'destinationPort', label: toDOUI.destinationPort, bRequired: false, type: 'text' },
      { key: 'preGoTime', label: toDOUI.preGoTime, bRequired: false, type: 'text' },
      { key: 'preArriveTime', label: toDOUI.preArriveTime, bRequired: false, type: 'text' },
      { key: 'orderNumber', label: toDOUI.orderNumber, bRequired: false, type: 'text' },
      { key: 'supplier', label: toDOUI.supplier, bRequired: false, type: 'text' },
      { key: 'cabinetNumber', label: toDOUI.cabinetNumber, bRequired: false, type: 'text' },
      { key: 'changeDONumber', label: toDOUI.changeDONumber, bRequired: false, type: 'text' },
      { key: 'isDelegatePay', label: toDOUI.isDelegatePay, bRequired: false, type: 'text' },
      { key: 'otherDescription', label: toDOUI.otherDescription, bRequired: false, type: 'text' }
    ];
    let delegateOptionUI = this.props.orderInfoUIInfo.delegateOption.children;
    const delegateOptionArr = [
      { key: 'serviceType', label: delegateOptionUI.serviceType, bRequired: false, type: 'text' }
    ];
    let coastalTradeUI = this.props.orderInfoUIInfo.coastalTrade.children;
    const coastalTradeArr = [
      { key: 'startPort', label: coastalTradeUI.startPort, bRequired: false, type: 'text' },
      { key: 'destinationPort', label: coastalTradeUI.destinationPort, bRequired: false, type: 'text' },
      { key: 'destination', label: coastalTradeUI.destination, bRequired: false, type: 'text' },
      { key: 'loadGoodsDate', label: coastalTradeUI.loadGoodsDate, bRequired: false, type: 'text' },
      { key: 'boatName', label: coastalTradeUI.boatName, bRequired: false, type: 'text' },
      { key: 'voyage', label: coastalTradeUI.voyage, bRequired: false, type: 'text' },
      { key: 'loadFactory', label: coastalTradeUI.loadFactory, bRequired: false, type: 'text' },
      { key: 'loadAddress', label: coastalTradeUI.loadAddress, bRequired: false, type: 'text' },
      { key: 'loadContactPerson', label: coastalTradeUI.loadContactPerson, bRequired: false, type: 'text' },
      { key: 'loadPhone', label: coastalTradeUI.loadPhone, bRequired: false, type: 'text' },
      { key: 'receiver', label: coastalTradeUI.receiver, bRequired: false, type: 'text' },
      { key: 'receiveAddress', label: coastalTradeUI.receiveAddress, bRequired: false, type: 'text'},
      { key: 'receiveContactPerson', label: coastalTradeUI.receiveContactPerson, bRequired: false, type: 'text' },
      { key: 'receivePhone', label: coastalTradeUI.receivePhone, bRequired: false, type: 'text' },
      { key: 'otherDescription', label: coastalTradeUI.otherDescription, bRequired: false, type: 'text' }
    ];
    let portTransportUI = this.props.orderInfoUIInfo.portTransport.children;
    const portTransportArr = [
      { key: 'transportType', label: portTransportUI.transportType, bRequired: false, type: 'text', value:portTransport.transportType||'' },
      { key: 'outInType', label: portTransportUI.outInType, bRequired: false, type: 'text', value:portTransport.outInType||'' },
      { key: 'bookingNumber', label: portTransportUI.bookingNumber, bRequired: false, type: 'text', value:portTransport.bookingNumber||'' },
      { key: 'port', label: portTransportUI.port, bRequired: false, type: 'text', value:portTransport.port||'' },
      { key: 'shipCompany', label: portTransportUI.shipCompany, bRequired: false, type: 'text', value:portTransport.shipCompany||'' },
      { key: 'closePassesDate', label: portTransportUI.closePassesDate, bRequired: false, type: 'text', value:portTransport.closePassesDate||'' },
      { key: 'closeFeedingDate', label: portTransportUI.closeFeedingDate, bRequired: false, type: 'text', value:portTransport.closeFeedingDate||'' },
      { key: 'openStoreDate', label: portTransportUI.openStoreDate, bRequired: false, type: 'text', value:portTransport.openStoreDate||'' },
      { key: 'isNeedCross', label: portTransportUI.isNeedCross, bRequired: false, type: 'text', value:portTransport.isNeedCross||'' },
      { key: 'crossDate', label: portTransportUI.crossDate, bRequired: false, type: 'text', value:portTransport.crossDate||'' },
      { key: 'declareWay', label: portTransportUI.declareWay, bRequired: false, type: 'text', value:portTransport.declareWay||'' },
      { key: 'closeDeclareAddress', label: portTransportUI.closeDeclareAddress, bRequired: false, type: 'text', value:portTransport.closeDeclareAddress||'' },
      { key: 'clientDeclareSelf', label: portTransportUI.clientDeclareSelf, bRequired: false, type: 'text', value:portTransport.clientDeclareSelf||'' },
      { key: 'declarePlace', label: portTransportUI.declarePlace, bRequired: false, type: 'text', value:portTransport.declarePlace||'' },
      { key: 'declareContactPerson', label: portTransportUI.declareContactPerson, bRequired: false, type: 'text', value:portTransport.declareContactPerson||'' },
      { key: 'declarePhone', label: portTransportUI.declarePhone, bRequired: false, type: 'text', value:portTransport.declarePhone||'' },
      { key: 'multiPlace', label: portTransportUI.multiPlace, bRequired: false, type: 'text', value:portTransport.multiPlace||'' }
    ];

    let orderInfoUIInfo = this.props.orderInfoUIInfo;
    return (
      <div className={s.root}>
        <Form horizontal>
          <Title title={orderInfoUIInfo.baseInfo.titleName} />
          <SuperFormGroup groupKey={'baseInfo'} items={baseInfoArr} onChange={this.props.onInputChange} onSuperChange={this.props.onSuperChange} values={baseInfo} />
          <Title title={orderInfoUIInfo.goodsInfo.titleName} />
          <SuperFormGroup groupKey={'goodsInfo'} items={goodsInfoArr} onChange={this.props.onInputChange} values={goodsInfo} />
          <Title title={orderInfoUIInfo.serviceType.titleName} />
          {this.toServiceType(serviceTypeArr)}
          {this.toFiledSet(orderInfoUIInfo.domesticTransport.titleName, serviceType.domesticTransport, 'domesticTransport', domesticTransportArr, domesticTransport)}
          {this.toFiledSet(orderInfoUIInfo.portTransportIn.titleName, serviceType.portTransportIn, 'portTransportIn', portTransportInArr, portTransportIn)}
          {this.toFiledSet(orderInfoUIInfo.portTransportOut.titleName, serviceType.portTransportOut, 'portTransportOut', portTransportOutArr, portTransportOut)}
          {this.toFiledSet(orderInfoUIInfo.portLocalTransport.titleName, serviceType.portLocalTransport, 'portLocalTransport', portLocalTransportArr, portLocalTransport)}
          {this.toFiledSet(orderInfoUIInfo.bookingTransport.titleName, serviceType.bookingTransport, 'bookingTransport', bookingTransportArr, bookingTransport)}
          {this.toFiledSet(orderInfoUIInfo.bondedTransport.titleName, serviceType.bondedTransport, 'bondedTransport', bondedTransportArr, bondedTransport)}
          {this.toFiledSet(orderInfoUIInfo.railwayTransport.titleName, serviceType.railwayTransport, 'railwayTransport', railwayTransportArr, railwayTransport)}
          {this.toFiledSet(orderInfoUIInfo.seaTransport.titleName, serviceType.seaTransport, 'seaTransport', seaTransportArr, seaTransport)}
          {this.toFiledSet(orderInfoUIInfo.airTransport.titleName, serviceType.airTransport, 'airTransport', airTransportArr, airTransport)}
          {this.toFiledSet(orderInfoUIInfo.toDO.titleName, serviceType.toDO, 'toDO', toDOArr, toDO)}
          {this.toFiledSet(orderInfoUIInfo.delegateOption.titleName, serviceType.delegateOption, 'delegateOption', delegateOptionArr, delegateOption)}
          {this.toFiledSet(orderInfoUIInfo.coastalTrade.titleName, serviceType.coastalTrade, 'coastalTrade', coastalTradeArr, coastalTrade)}
          {this.toFiledSet(orderInfoUIInfo.portTransport.titleName, serviceType.portTransport, 'portTransport', portTransportArr, portTransport)}
          {this.toSectionGoodsInfoTable()}
          {this.toSectionCabinetInfoTable()}
        </Form>
        {this.toButtonToolbar()}
      </div>
    );
  }
}

export default withStyles(s)(OrderInfo);
