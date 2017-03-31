import React from 'react';
import { Button, ButtonToolbar} from 'react-bootstrap';
import withStyles from '../../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import SuperTable2 from  '../../../../components/SuperTable2';
import EditTab from './editTab/EditTab';

import s from './ReceiveEdit.less';

class ReceiveEdit extends React.Component {
  onClick = (key) => {

  };

  toTitle = (title) => {
    return <p role="title">{title}</p>;
  };

  toLine = () => {
    return <hr role='line'/>;
  };

  toButton = ({key, title, props}) => {
    const btnProps = {
      ...props,
      key,
      onClick: this.onClick(key)
    };
    return <Button {...btnProps}>{title}</Button>;
  };

  toButtonToolBar = (config) => {
    let buttons = [
      {key:'newBtn', title:config.newBtn, props:{bsStyle:'primary', bsSize:'small'}},
      {key:'copyNewBtn', title:config.copyNewBtn, props:{bsStyle:'default', bsSize:'small'}},
      {key:'deleteBtn', title:config.deleteBtn, props:{bsStyle:'default', bsSize:'small'}}
    ];
    return (
      <ButtonToolbar>
        {buttons.map(button => this.toButton(button))}
      </ButtonToolbar>
    );
  };
  toTable = (config, items) => {
    const callback = {
    };
    return <div role='container'><SuperTable2 cols={config.tableCols} items={items} callback={callback} /></div>;
  };
  toTabContainer = (tab, onTabChange) => {
    return (
      <div role="tabContainer">
        <EditTab onTabChange={onTabChange} {...tab} />
      </div>
    );
  };
  render() {
    let {init, config, table, tab, onTabChange} = this.props;
    if (init) return <p>加载中...</p>;
    return (
      <div className={s.root}>
        {this.toTitle(config.title1)}
        {this.toLine()}
        {this.toTabContainer(tab, onTabChange)}
        {this.toTitle(config.title2)}
        {this.toLine()}
        {this.toButtonToolBar(config)}
        {this.toTable(config, table)}
      </div>
    );
  }
}

export default withStyles(s)(ReceiveEdit);
