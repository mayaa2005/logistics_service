import React, { PropTypes } from 'react';
import { Modal, Button, FormControl, FormGroup } from 'react-bootstrap';
import SuperFormGroup from '../../../components/SuperFormGroup';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AddCar.less';

class AddCar extends React.Component {
  static propTypes = {
    show: PropTypes.bool
  };

  onCancel = () => {
    this.props.onHide();
  };

  onOk = () => {
    this.props.onHide();
  };

  toHeader = (title) => {
    return (
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
    );
  };

  toBody = () => {
    const {baseUIInfo,baseInfo={}} = this.props;
    const baseInfoArr = [
      { key: 'belongSupplier', label: baseUIInfo.tableCols.belongSupplier, bRequired: false, type: 'text',layoutScale:[6,4,8] },
      { key: 'plateNo', label: baseUIInfo.tableCols.plateNo, bRequired: false, type: 'text',layoutScale:[6,4,8] },
      { key: 'crossBorderPlate', label: baseUIInfo.tableCols.crossBorderPlate, bRequired: false, type: 'text',layoutScale:[6,4,8] },
      { key: 'ICNumber', label: baseUIInfo.tableCols.ICNumber, bRequired: false, type: 'text',layoutScale:[6,4,8] },
      { key: 'containerNo', label: baseUIInfo.tableCols.containerNo, bRequired: false, type: 'text',layoutScale:[6,4,8] },
      { key: 'customsNo', label: baseUIInfo.tableCols.customsNo, bRequired: false, type: 'text',layoutScale:[6,4,8]},
      { key: 'driverName', label: baseUIInfo.tableCols.driverName, bRequired: false, type: 'text',layoutScale:[6,4,8]},
      { key: 'driverPhoneNo', label: baseUIInfo.tableCols.driverPhoneNo, bRequired: false, type: 'text',layoutScale:[6,4,8] },
      { key: 'carLookUpCompany', label: baseUIInfo.tableCols.carLookUpCompany, bRequired: false, type: 'text',layoutScale:[6,4,8] },
      { key: 'cardAddress', label: baseUIInfo.tableCols.cardAddress, bRequired: false, type: 'text',layoutScale:[6,4,8] },
      { key: 'mannerContacts', label: baseUIInfo.tableCols.mannerContacts, bRequired: false, type: 'text',layoutScale:[6,4,8] },
      { key: 'mannerPhoneNo', label: baseUIInfo.tableCols.mannerPhoneNo, bRequired: false, type: 'text',layoutScale:[6,4,8] },
      { key: 'carBodyWeight', label: baseUIInfo.tableCols.carBodyWeight, bRequired: false, type: 'text',layoutScale:[6,4,8]},
      { key: 'enterpriseCode', label: baseUIInfo.tableCols.enterpriseCode, bRequired: false, type: 'text',layoutScale:[6,4,8]},
      { key: 'otherDescription', label: baseUIInfo.tableCols.otherDescription, bRequired: false, type: 'text' ,layoutScale:[12,2,10]},
      { key: 'entryTime', label: baseUIInfo.tableCols.entryTime, bRequired: false, type: 'text',layoutScale:[6,4,8]},
      { key: 'updateTime', label: baseUIInfo.tableCols.updateTime, bRequired: false, type: 'text',layoutScale:[6,4,8] }
    ];
    return (
      <Modal.Footer>
          <div data-pos='top'>
          <span role='title'>{baseUIInfo.titleName}</span>
          </div>
        <div data-pos='bottom'>
        <SuperFormGroup groupKey={'baseInfo'} items={baseInfoArr} value={{}}  />
        </div>
      </Modal.Footer>
    );
  };

  toFooter = (ok, cancel) => {
    return (
      <Modal.Footer>
        <Button bsStyle='success' bsSize='small' onClick={this.onOk}>{ok}</Button>
        <Button bsStyle='danger' bsSize='small' onClick={this.onCancel}>{cancel}</Button>
      </Modal.Footer>
    );
  };

  render() {
    //console.log(this.props);
    const {title,ok,cancel,show} = this.props;
    const {baseInfo,baseInfoArr}=this.props;
    return (
      <Modal className={s.root} show={show} bsSize='large'>
        {this.toHeader(title)}
        {this.toBody(baseInfo,baseInfoArr)}
        {this.toFooter(ok,cancel)}
      </Modal>
    );
  }
}

export default withStyles(s)(AddCar);
