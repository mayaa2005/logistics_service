/**
 * Created by xiaojing on 17/3/4.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { ButtonToolbar, Button } from 'react-bootstrap';
import s from './SuperButtonToolbar.less';

const ButtonType = {
  key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  props: PropTypes.object
};

/*
 onClick: 按钮点击事件处理回调函数,原型为func(key)
 inline: 组件是否为内联,默认为false
 */

class SuperButtonToolbar extends React.Component {
  static propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape(ButtonType)).isRequired,
    onClick: PropTypes.func,
    inline: PropTypes.bool,
  };

  onClick = (event) => {
    let name = event.target.name;
    this.props.onClick(name);
  };
  toButton = (button) => {
    let {key, title, props} = button;
    return <Button key={key} name={key} onClick={this.onClick} {...props}>{title}</Button> ;
  };

  toButtons = (buttons) => {
    return buttons.map((button) => {
      return this.toButton(button);
    });
  };
  render() {
    let {buttons, inline} = this.props;
    if (!inline) {
      inline = false;
    };
    let className = inline ? `${s.root} ${s.inline}` : s.root;
    return (
      <ButtonToolbar className={className}>
        {this.toButtons(buttons)}
      </ButtonToolbar>
    );
  }
}

export default withStyles(s)(SuperButtonToolbar);
