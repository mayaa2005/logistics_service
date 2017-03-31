import React, { PropTypes } from 'react';
import withStyles from '../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import s from './EditPage.less';
import {Button, Panel, Accordion} from 'react-bootstrap';
import SuperTable2 from '../../../components/SuperTable2';
import SuperFormGroup from '../../../components/SuperFormGroup2';
import Title from '../../../components/Title';
import SuperToolbar from '../../../components/SuperToolbar';

const BaseInfoType = {
  baseForm: PropTypes.array,
  cooperationForm: PropTypes.array,
  relationForm: PropTypes.array
};

class EditPage extends React.Component {
  static propTypes = {
    subTitle: PropTypes.object,
    panels: PropTypes.array,
    toolbar: PropTypes.array,
    buttons: PropTypes.array,
    baseInfo: PropTypes.shape(BaseInfoType)
  };

  toToolbar = (key) => {
    const {toolbar, onTableOption} = this.props;
    const props = {
      buttons: toolbar,
      option: {bsSize: 'small'},
      callback: {
        onClick: onTableOption.bind(this, key)
      }
    };
    return <SuperToolbar role='toolbar' {...props} />;
  };
  toTable = (key) => {
    let {onTableContentChange, onTableCheck} = this.props;
    let {cols=[], items=[]} = this.props[key];
    const callback = {
      onContentChange: onTableContentChange.bind(this, key),
      onCheck: onTableCheck.bind(this, key)
    };
    return <div role='container'><SuperTable2 cols={cols} items={items} callback={callback} /></div>;
  };

  toBaseInfo = (key) => {
    let {subTitle, baseInfo={}, onFormChange} = this.props;
    let {baseForm=[], cooperationForm=[], relationForm=[]} = baseInfo;
    return (
      <div>
        <Title title={subTitle.baseForm} />
        <SuperFormGroup groupKey={key} items={baseForm} values={this.props[key]} onChange={onFormChange} />
        <Title title={subTitle.cooperationForm} />
        <SuperFormGroup groupKey={key} items={cooperationForm} values={this.props[key]} onChange={onFormChange} />
        <Title title={subTitle.relationForm} />
        <SuperFormGroup groupKey={key} items={relationForm} values={this.props[key]} onChange={onFormChange} />
      </div>
    );
  };

  toPanel = ({key, title}, index) => {
    let subComponent = index ? this.toTable(key) : this.toBaseInfo(key);
    let optionBtn = index ? this.toToolbar(key) : null;
    return (
      <Panel key={index} header={title} eventKey={index}>
        {optionBtn}
        {subComponent}
      </Panel>
    );
  };
  toAccordion = (panels) => {
    let children = panels.map(this.toPanel);
    return <Accordion> {children} </Accordion>;
  };

  toButton = ({key, title, bsStyle}) => {
    const onClick = this.props.onBtnClick.bind(this, key);
    return (
      <Button key={key} bsSize='small' onClick={onClick} bsStyle={bsStyle}>
        {title}
      </Button>
    );
  };
  toOperation = (buttons) => {
    return (
      <div role="operation">
        {buttons.map(this.toButton)}
      </div>
    );
  };
  render() {
    let {panels, buttons} = this.props;
    return (
      <div className={s.root}>
        {this.toAccordion(panels)}
        {this.toOperation(buttons)}
      </div>
    );
  }
}

export default withStyles(s)(EditPage);
