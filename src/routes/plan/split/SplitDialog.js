import React, { PropTypes } from 'react';
import { Modal, Button, FormControl, FormGroup } from 'react-bootstrap';
import SuperList from '../../../components/SuperList';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SplitDialog.less';
import removeUrl from './remove.png';

const defConfig = {
  title: '线路拆分',
  route: '路由段数',
  station: '中转站',
  segment: '段数',
  job: '作业单号',
  source: '起始地',
  destination: '目的地',
  ok: '确定',
  cancel: '取消'
};

class SplitDialog extends React.Component {
  static propTypes = {
    config: PropTypes.object,
    show: PropTypes.bool,
    path: PropTypes.array,
    segment: PropTypes.array,
    jobId: PropTypes.string
  };

  onCancel = () => {
    this.props.onHide();
  };

  onOk = () => {
    this.props.onHide();
  };

  onSegNumberChange = (event) => {
    this.props.onSegNumberChange(event.target.value);
  };

  onStationChange = (index, event) => {
    this.props.onStationChange(index, event.target.value);
  };

  onStationDelete = (index) => {
    this.props.onStationDelete(index);
  };

  numberToArray = num => {
    let arr = [];
    for (let i = 1; i <= num; i++) {
      arr.push(i);
    }
    return arr;
  };

  toDel = (index) => {
    const onClick = this.onStationDelete.bind(this, index);
    return (
      <div>
        <img src={removeUrl} alt='remove' onClick={onClick} style={{cursor: 'pointer'}}/>
      </div>);
  };

  toFromGroup = (title, value, options, onChange, del = false, index = null) => {
    return (
      <FormGroup bsSize='small' key={index}>
        <FormControl.Static>{title}</FormControl.Static>
        <FormControl componentClass='select' value={value} onChange={onChange}>
          {options.map((value, index) => <option key={index}>{value}</option>)}
        </FormControl>
        {del ? this.toDel(index) : false}
      </FormGroup>
    );
  };

  toSegNumber = (path, segment, route) => {
    const title = `${route}:`;
    const options = this.numberToArray(path.length - 1);
    const segNumber = segment.length + 1;
    return this.toFromGroup(title, segNumber, options, this.onSegNumberChange);
  };

  pathToGroups = (path, segment, station) => {
    const segNumber = segment.length + 1;
    return path.slice(1, segNumber).reduce((result, value, index) => {
      const title = `${station}${index + 1}:`;
      const options = ['.', value];
      const onChange = this.onStationChange.bind(this, index);
      result.push(this.toFromGroup(title, segment[index], options, onChange, true, index));
      return result;
    }, []);
  };

  toBodyLeft = ({route, station}, path, segment) => {
    return (
      <form>
        {this.toSegNumber(path, segment, route)}
        {this.pathToGroups(path, segment, station)}
      </form>
    );
  };

  toBodyRight = ({job, source, destination, segment}, path, segNumber, jobId) => {
    let children = [];
    const title = `${job}: ${jobId}; ${source}: ${path[0]}; ${destination}: ${path[path.length - 1]}`;

    if (segNumber > 1) {
      children = path.slice(0, segNumber).reduce((result, value, index) => {
        result.push(`${segment}${index+1} ${source}: ${value}; ${destination}: ${path[index+1]}`);
        return result;
      }, []);
    }

    return <SuperList items={[{title, children}]} />
  };

  toBody = (config) => {
    const {path, jobId, segment} = this.props;
    return (
      <Modal.Body>
        {this.toBodyLeft(config, path, segment)}
        {this.toBodyRight(config, path, segment.length + 1, jobId)}
      </Modal.Body>
    );
  };

  toHeader = ({title}) => {
    return (
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
    );
  };

  toFooter = ({ok, cancel}) => {
    return (
      <Modal.Footer>
        <Button bsStyle='success' bsSize='small' onClick={this.onOk}>{ok}</Button>
        <Button bsStyle='danger' bsSize='small' onClick={this.onCancel}>{cancel}</Button>
      </Modal.Footer>
    );
  };

  render() {
    const {show, container, config = defConfig} = this.props;
    return (
      <Modal className={s.root} show={show} bsSize='large' container={container}>
        {this.toHeader(config)}
        {this.toBody(config)}
        {this.toFooter(config)}
      </Modal>
    );
  }
}

export default withStyles(s)(SplitDialog);
