import React, { PropTypes } from 'react';
import withStyles from '../../../node_modules/isomorphic-style-loader/lib/withStyles'
import s from './SuperToolbar.less';
import { Button, ButtonToolbar } from 'react-bootstrap';

const ButtonType = {
  key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  bsStyle: PropTypes.string
};

const OptionType = {
  bsSize: PropTypes.string
};

const CallbackType = {
  onClick: PropTypes.func
};

class SuperToolbar extends React.Component {
  static propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape(ButtonType)).isRequired,
    option: PropTypes.shape(OptionType),
    callback: PropTypes.shape(CallbackType)
  };

  onClick = key => {
    const {callback = {}} = this.props;
    if (callback.onClick) {
      callback.onClick(key);
    }
  };

  toButton = ({key, title, bsStyle}, bsSize) => {
    const onClick = this.onClick.bind(this, key);
    return <Button {...{key, bsSize, bsStyle, onClick}}>{title}</Button>;
  };

  render() {
    const {buttons, option = {}} = this.props;
    return (
      <ButtonToolbar>
        {buttons.map(button => this.toButton(button, option.bsSize))}
      </ButtonToolbar>
    );
  }
}

export default withStyles(s)(SuperToolbar);
