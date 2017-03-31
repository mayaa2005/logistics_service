import React, { PropTypes } from 'react';
import withStyles from '../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import s from './EditPage.less';
import {Button, FormControl, FormGroup} from 'react-bootstrap';
import SuperTable2 from '../../../components/SuperTable2';
import SuperForm from '../../../components/SuperForm';

class EditPage extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    forms: PropTypes.array,
    formValue: PropTypes.object,
    tableItems: PropTypes.array,
    tableCols: PropTypes.array,
    buttons: PropTypes.object
  };

  bindEvent = (event, ...args) => {
    const onEvent = this.props[event];
    const func = () => onEvent(...args);
    return onEvent ? func : null;
  };

  toButton = (config, key, bsStyle) => {
    const onClick = this.bindEvent('onClick', key);
    return (
      <Button bsSize='small' onClick={onClick} bsStyle={bsStyle}>
        {config[key]}
      </Button>
    );
  };

  toForm = () => {
    const {forms, onFormChange, formValue} = this.props;
    return <SuperForm controls={forms} value={formValue} onChange={onFormChange} bsSize='small' />;
  };

  toTitle = () => {
    const {title, buttons} = this.props;
    return (
      <div role='title'>
        <span>{title}</span>
        {this.toButton(buttons, 'add')}
        {this.toButton(buttons, 'copy')}
        {this.toButton(buttons, 'del')}
      </div>
    );
  };

  toTable = () => {
    const {tableCols, tableItems, onCheck, onContentChange} = this.props;
    const callback = {onCheck, onContentChange};
    return (
      <div role='container'>
        <SuperTable2 cols={tableCols} items={tableItems} callback={callback} />
      </div>
    );
  };

  toOperation = () => {
    const {buttons} = this.props;
    return (
      <div role="operation">
        {this.toButton(buttons, 'save', 'success')}
        {this.toButton(buttons, 'cancel', 'danger')}
      </div>
    );
  };

  render() {
    return (
      <div className={s.root}>
        {this.toForm()}
        {this.toTitle()}
        {this.toTable()}
        {this.toOperation()}
      </div>
    );
  }
}

export default withStyles(s)(EditPage);
