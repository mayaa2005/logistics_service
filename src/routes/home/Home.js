import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';
import s from './Home.less';

class Home extends React.Component {
  onUserNameChange = (event) => {
    this.props.onInputChange('userName', event.target.value);
  };
  onPasswordChange = (event) => {
    this.props.onInputChange('password', event.target.value);
  };
  onClick = () => {
    let {userName, password, onLogin} = this.props;
    onLogin(userName, password);
  };
  render() {
    let {userName, password} = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                UserName
              </Col>
              <Col sm={3}>
                <FormControl type="text" placeholder="UserName" value={userName} onChange={this.onUserNameChange} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={3}>
                <FormControl type="password" placeholder="Password"  value={password} onChange={this.onPasswordChange} />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button onClick={this.onClick}>
                  Sign in
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
