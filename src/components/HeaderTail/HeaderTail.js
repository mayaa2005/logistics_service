import React from 'react';
import withStyles from '../../../node_modules/isomorphic-style-loader/lib/withStyles';
import s from './HeaderTail.less';
import Link from '../Link';
import mailUrl from './mail.png';
import settingUrl from './setting.png';
import photoUrl from './photo.png';

class HeaderTail extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <Link to="/">
          <img src={mailUrl} width="20" height="20" alt="消息"/>
          <span>消息</span>
        </Link>
        <Link to="/basic">
          <img src={settingUrl} width="20" height="20" alt="设置" />
          <span>设置</span>
        </Link>
        <Link to="/">
          <img src={photoUrl} width="35" height="35" alt="头像"/>
          <span>马云</span>
        </Link>
      </div>
      );
  }
}

export default withStyles(s)(HeaderTail);
