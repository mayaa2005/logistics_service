/**
 * Created by pengxiaojing on 2017/2/16.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { ButtonToolbar, Button, Modal, ModalBody, ModalFooter, ModalHeader, Checkbox, Col } from 'react-bootstrap';
import s from './SetColModal.less';

const ColType = {
  key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  hide: PropTypes.bool,
  requireShow: PropTypes.bool
};

class SetColModal extends React.Component {
  static propTypes = {
    show:PropTypes.bool.isRequired,
    cols: PropTypes.arrayOf(PropTypes.shape(ColType)).isRequired,
    onHideModal: PropTypes.func.isRequired,
    onCheckChange: PropTypes.func.isRequired,
  };

  onCheckChange = (event) => {
    name = event.target.name;
    //console.log("name==", name);
    this.props.onCheckChange(name);
  };
  toModalBody = () => {
    const toCheckbox = (col, index) => {
      return (
        <Col sm={3} key={index}>
          <Checkbox name={col.title} checked={!col.hide} onChange={this.onCheckChange} disabled={col.requireShow}>
            {col.title}
          </Checkbox>
        </Col>
      );
    };
    let checkboxes = this.props.cols.map( (col, index) => {
      return toCheckbox(col, index);
    });
    return (
      <Modal.Footer className={s.modal}>
        {checkboxes}
      </Modal.Footer>
    );
  };
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHideModal} dialogClassName="custom-modal" >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">配置字段</Modal.Title>
        </Modal.Header>
        {this.toModalBody()}
      </Modal>
    );
  }
}

export default withStyles(s)(SetColModal);
