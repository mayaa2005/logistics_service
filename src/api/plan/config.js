const config = {
  search: {
    search: '搜索',
    more: '更多',
    less: '简化',
    reset: '重置'
  },
  toolbar: [
    {key: 'split', title: '线路拆分'},
    {key: 'collapse', title: '线路折叠'},
    {key: 'optimize', title: '装载优化'},
    {key: 'append', title: '追加任务'},
    {key: 'commit', title: '生成任务'},
    {key: 'edit_job', title: '修改作业单'},
    {key: 'edit_content', title: '内容修改'},
    {key: 'config', title: '配置字段', bsStyle: 'primary'}
  ],
  table: [
    {key: 'key1', title: '操作单元'},
    {key: 'key2', title: '优化状态'},
    {key: 'key3', title: '当前状态'},
    {key: 'key4', title: '作业单号'},
    {key: 'key5', title: '委托客户'},
    {key: 'key6', title: '是否散货运输'},
    {key: 'key7', title: '提货方式'},
    {key: 'key8', title: '送货方式'},
    {key: 'key9', title: '计划提货日期'},
    {key: 'key10', title: '计划送货日期'},
    {key: 'key11', title: '始发地'},
    {key: 'key12', title: '目的地'},
    {key: 'key13', title: '预约提货时间'},
    {key: 'key14', title: '预约送货时间'},
    {key: 'key15', title: '提货地址'},
    {key: 'key16', title: '提货联系人'},
    {key: 'key17', title: '送货地址'},
    {key: 'key18', title: '送货联系人'},
    {key: 'key19', title: '柜型'},
    {key: 'key20', title: '柜数量'},
    {key: 'key21', title: '运输方式'},
    {key: 'key22', title: '货物类别'},
    {key: 'key23', title: '特殊货物描述'},
    {key: 'key24', title: '箱数'},
    {key: 'key25', title: '件数'},
    {key: 'key26', title: '品种数'},
    {key: 'key27', title: '货物名称'},
    {key: 'key28', title: '货物明细'},
    {key: 'key29', title: '唛头'},
    {key: 'key30', title: '立方'},
    {key: 'key31', title: '公斤'},
    {key: 'key32', title: '包装'},
    {key: 'key33', title: '特殊服务'},
    {key: 'key34', title: '运输包装服务'},
    {key: 'key35', title: '尾纸交何处'}
  ],
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
