import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Pagination, Button, InputGroup, FormControl, FormGroup, Form} from 'react-bootstrap';
import NumberInput from '../NumberInput';
import s from './SuperPagination.less';

/*
// config的所有属性(属性值只是一个例子)如下，并不需要配置所有，存在相应的配置才会显示相应的组件
const config = {
  pageDesp: "共有{maxRecords}条记录，当前第 {currentPage}/{totalPage} 页",
  pageGoto: {placeholder: "跳转页数", btnTitle: "确定"},
  pageSize: {start: "每页显示", end: "条"},
  prevPage: "上一页",
  nextPage: "下一页",
  firstPage: "首页",
  lastPage: "尾页"
};
*/

/**
 * maxRecords: 最大记录数
 * currentPage：当前所在页面
 * pageSize：页面大小，即一个页面的记录数
 */
const PageType = {
  maxRecords: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize:  PropTypes.number.isRequired
};

/**
 * pageSizeType: 页面大小规格，存在该选项则会显示一个下拉框来选择所需页面大小
 * align: 分页组件的对齐方式，默认居右
 * bsSize: 分页组件的大小
 * boundaryLinks: 为true时，第1页与最后1页按钮始终显示，默认为false
 * maxButtons: 最大显示的按钮数，默认为3个
 */
const OptionType = {
  pageSizeType: PropTypes.array,
  align: PropTypes.oneOf(['left', 'right', 'center']),
  bsSize: PropTypes.oneOf(['small', 'large']),
  boundaryLinks: PropTypes.bool,
  maxButtons: PropTypes.number
};

/**
 * onPageChange：跳转到新的一页时触发，原型func(pageNumber)
 * onPageSizeChange: 页大小改变时触发，原型func(pageSize, pageNumber)
 */
const CallbackType = {
  onPageNumberChange: PropTypes.func,
  onPageSizeChange: PropTypes.func
};

class SuperPagination extends React.Component {
  static propTypes = {
    page: PropTypes.shape(PageType).isRequired,
    config: PropTypes.object,
    option: PropTypes.shape(OptionType),
    callback: PropTypes.shape(CallbackType)
  };

  constructor(props) {
    super(props);
    this.state = {disabled: true};
    this.number = -1;
  }

  componentWillReceiveProps(newProps) {
    if (this.number !== -1) {
      this.disableButtonByProps(newProps);
    }
  };

  disableButtonByProps = (props) => {
    const {maxRecords, pageSize, currentPage} = props.page;
    const totalPage = Math.ceil(maxRecords / pageSize);
    if ((this.number !== currentPage) && (this.number >= 1) && (this.number <= totalPage)) {
      if (this.state.disabled) {
        this.setState({disabled: false});
      }
    } else {
      if (!this.state.disabled) {
        this.setState({disabled: true});
      }
    }
  };

  gotoPage = (pageNumber) => {
    const {onPageNumberChange} = this.props.callback || {};
    if (onPageNumberChange) {
      onPageNumberChange(pageNumber);
    }
  };

  calNewPageNumber = (page, newPageSize) => {
    const firstRecord = (page.currentPage - 1) * page.pageSize + 1;
    return Math.ceil(firstRecord / newPageSize);
  };

  onPageSizeChange = (event) => {
    const {callback = {}, page} = this.props;
    let newPageSize, newPageNumber;
    if (callback.onPageSizeChange) {
      newPageSize = Number(event.target.value);
      newPageNumber = this.calNewPageNumber(page, newPageSize);
      callback.onPageSizeChange(newPageSize, newPageNumber);
    }
  };

  onNumberChange = (event) => {
    this.number = Number(event.target.value);
    this.disableButtonByProps(this.props);
  };

  onKeyPress = (event) => {
    if (event.charCode === 13) {
      event.preventDefault();
      if (!this.state.disabled) {
        this.gotoPage(this.number);
      }
    }
  };

  onBtnClick = () => {
    this.gotoPage(this.number);
  };

  onPageClick = (pageNumber) => {
    if (this.props.page.currentPage != pageNumber) {
      this.gotoPage(pageNumber);
    }
  };

  toPageDesp = (pageDesp) => {
    const {maxRecords, pageSize, currentPage} = this.props.page;
    const totalPage = Math.ceil(maxRecords / pageSize);
    let desp = pageDesp;
    desp = desp.replace("{maxRecords}", String(maxRecords));
    desp = desp.replace("{currentPage}", String(currentPage));
    desp = desp.replace("{totalPage}", String(totalPage));
    return <span style={{marginRight: 5}}>{desp}</span>;
  };

  toPagination = () => {
    const {page, option = {}, config = {}} = this.props;
    const totalPage = Math.ceil(page.maxRecords / page.pageSize);
    const props = {
      prev: config.prevPage,
      next: config.nextPage,
      first: config.firstPage,
      last: config.lastPage,
      items: totalPage,
      activePage: page.currentPage,
      ellipsis: true,
      maxButtons: option.maxButtons || 3,
      bsSize: option.bsSize,
      boundaryLinks: option.boundaryLinks,
      onSelect: this.onPageClick
    };
    return <Pagination {...props}/>;
  };

  toGoto = ({placeholder, btnTitle}) => {
    const {option = {}} = this.props;
    const numberProps = {
      placeholder,
      style: {textAlign: "center", width: "7em"},
      defaultValue: this.number !== -1 ? this.number : undefined,
      onChange: this.onNumberChange,
      onKeyPress: this.onKeyPress
    };
    const btnProps = {
      bsStyle: "success",
      disabled: this.state.disabled,
      onClick: this.onBtnClick
    };
    return (
      <InputGroup bsSize={option.bsSize}>
        <NumberInput {...numberProps}/>
        <InputGroup.Button>
          <Button {...btnProps}>{btnTitle}</Button>
        </InputGroup.Button>
      </InputGroup>
    );
  };

  toPageSizeSelect = (option, page) => {
    const props = {
      componentClass: "select",
      value: page.pageSize,
      onChange: this.onPageSizeChange
    };
    return (
      <FormControl {...props}>
        {option.pageSizeType.map((value, index) => <option key={index}>{value}</option>)}
      </FormControl>
    );
  };

  toSizeComponent = (option, page) => {
    if (option.pageSizeType) {
      return this.toPageSizeSelect(option, page);
    } else {
      return <span>{page.pageSize}</span>
    }
  };

  toPageSize = ({start, end}) => {
    const {page, option = {}} = this.props;
    return (
      <FormGroup bsSize={option.bsSize}>
        <span>{start}{' '}</span>
        {this.toSizeComponent(option, page)}
        <span>{' '}{end}</span>
      </FormGroup>
    );
  };

  genClassName = bsSize => {
    if (bsSize === "small") {
      return `${s.root} ${s.small}`;
    } else if (bsSize === "large") {
      return `${s.root} ${s.large}`;
    } else {
      return s.root;
    }
  };

  render() {
    const {config = {}, option = {}} = this.props;
    const {align = "right"} = option;
    return (
      <Form className={this.genClassName(option.bsSize)} style={{textAlign: align}} inline>
        {config.pageDesp ? this.toPageDesp(config.pageDesp) : null}
        {this.toPagination()}
        {config.pageGoto ? this.toGoto(config.pageGoto) : null}
        {config.pageSize ? this.toPageSize(config.pageSize) : null}
      </Form>
    );
  }
}

export default withStyles(s)(SuperPagination);
