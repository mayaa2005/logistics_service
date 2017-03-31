import React, { PropTypes } from 'react';
import withStyles from '../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import s from './EditPage.less';
import {Accordion, Panel, Button} from 'react-bootstrap';
import SuperTable2 from '../../../components/SuperTable2';
import SuperToolbar from '../../../components/SuperToolbar';
import SuperForm from '../../../components/SuperForm';

const PartType = {
  key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['form', 'table']).isRequired,
  buttons: PropTypes.array,
  cols: PropTypes.array
};

class EditPage extends React.Component {
  static propTypes = {
    activePart: PropTypes.string.isRequired,
    parts: PropTypes.arrayOf(PropTypes.shape(PartType)).isRequired,
    footer: PropTypes.object.isRequired,
    value: PropTypes.object
  };

  toForm = ({controls, key}) => {
    const {value, onChange} = this.props;
    return <SuperForm controls={controls} value={value[key]} onChange={onChange}/>;
  };

  toTable = ({buttons, cols, key}) => {
    const items = this.props.value[key];
    const onClick = this.props.onClick.bind(this, key);
    const callback = {onClick};
    const callback2 = {
      onCheck: this.props.onCheck.bind(this, key),
      onContentChange: this.props.onContentChange.bind(this, key)
    };
    return [
      <SuperToolbar key={1} buttons={buttons} option={{bsSize:'small'}} callback={callback} />,
      <div key={2} role='container'><SuperTable2 items={items} cols={cols} callback={callback2} /></div>
    ];
  };

  toPanel = (part) => {
    const {type, key, title} = part;
    const component = type === 'table' ? this.toTable(part) : this.toForm(part);
    return <Panel key={key} eventKey={key} header={title}>{component}</Panel>;
  };

  toButton = (title, key, bsStyle) => {
    const onClick = this.props.onClick.bind(this, null, key);
    return (
      <Button bsSize='small' onClick={onClick} bsStyle={bsStyle}>
        {title}
      </Button>
    );
  };

  toAccordion = () => {
    const {parts, activePart} = this.props;
    return (
      <Accordion activeKey={activePart} onSelect={this.props.onActivePart}>
        {parts.map(part => this.toPanel(part))}
      </Accordion>
    );
  };

  toFooter = () => {
    const {footer} = this.props;
    return (
      <div role="footer">
        {this.toButton(footer.save, 'save', 'success')}
        {this.toButton(footer.cancel, 'cancel', 'danger')}
      </div>
    );
  };

  render() {
    return (
      <div className={s.root}>
        {this.toAccordion()}
        {this.toFooter()}
      </div>
    );
  }
}

export default withStyles(s)(EditPage);
