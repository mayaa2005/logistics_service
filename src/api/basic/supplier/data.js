const data = {
  returnCode: 0,
  returnMsg: '成功',
  result: {
    returnTotalItem: 100,
    keys: [
      'supplierInfo',
      'supplierContact',
      'supplierTaskUnitType',
      'supplierCarInfo',
      'supplierDriverInfo',
      'supplierTaxRate'
    ],
    data: [{
      supplierInfo: {guid: '2017-03-23', supplierCode: '2017-03-23', active: 1},
      supplierContact: [{guid: 'guid1'}, {guid: 'guid2', supplierContactName: '张艳为'}],
      supplierTaskUnitType: [{guid: 'guid1'}],
      supplierCarInfo: [],
      supplierDriverInfo: [],
      supplierTaxRate: []
    }, {
      supplierInfo: {guid: '2017-03-24', supplierCode: '2017-03-24', active: 0},
      supplierContact: [],
      supplierTaskUnitType: [],
      supplierCarInfo: [],
      supplierDriverInfo: [],
      supplierTaxRate: []
    }]
  }
};

export default data;
