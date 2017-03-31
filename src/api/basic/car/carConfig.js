const config = {
  search: {
    search: '搜索',
    more: '更多',
    less: '简化',
    reset: '重置'
  },
  toolbar: [
    {key: 'add', title: '新建'},
    {key: 'collapse', title: 'xxxxx'},
    {key: 'optimize', title: 'xxxxx'},
    {key: 'append', title: 'xxxxx'},
    {key: 'commit', title: 'xxxxx'},
    {key: 'edit_job', title: 'xxxx'},
    {key: 'edit_content', title: 'xxxxxx'},
    {key: 'config', title: '配置字段', props: {bsStyle: 'primary'}}
  ],
  table: {
    cols:[
      {key: 'key1', title: '序号',type:'index'},
      {key: 'key2', title: '',type:'checkbox'},
      {key: 'key3', title: '车牌号',type: 'readonly'},
      {key: 'key4', title: '所属供应商',type: 'readonly'},
      {key: 'key5', title: '司机姓名',type: 'readonly'},
      {key: 'key6', title: '操作',type:'readonly'}
  ]
},
  pagination: {
    pageDesp: '共有{maxRecords}条记录，当前第 {currentPage}/{totalPage} 页',
    pageGoto: {placeholder: '跳转页数', btnTitle: '确定'},
    pageSize: {start: '每页显示', end: '条'},
    prevPage: '上一页',
    nextPage: '下一页',
    firstPage: '首页',
    lastPage: '尾页'
  }
};

export default config;
