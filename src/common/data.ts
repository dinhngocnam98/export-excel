import * as moment from 'moment/moment';

const size = 10000;
const now = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
const endNow = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');

const firstDayOfMonth = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');
const startDay_1 = moment()
  .subtract(1, 'days')
  .startOf('day')
  .format('YYYY-MM-DD HH:mm:ss');
const endDay_1 = moment()
  .subtract(1, 'days')
  .endOf('day')
  .format('YYYY-MM-DD HH:mm:ss');
const startDay_2 = moment()
  .subtract(2, 'days')
  .startOf('day')
  .format('YYYY-MM-DD HH:mm:ss');
const endDay_2 = moment()
  .subtract(2, 'days')
  .endOf('day')
  .format('YYYY-MM-DD HH:mm:ss');
const startDay_3 = moment()
  .subtract(3, 'days')
  .startOf('day')
  .format('YYYY-MM-DD HH:mm:ss');
const endDay_3 = moment()
  .subtract(3, 'days')
  .endOf('day')
  .format('YYYY-MM-DD HH:mm:ss');
export const apiInfos = [
  {
    name: 'Giám sát hàng phát(CN phát)',
    url: 'https://jmsgw.jtexpress.vn/businessindicator/bigdataReport/detail/day_dispatch_monitor_total',
    body: {
      current: 1,
      size: size,
      dimensionType: 334,
      proxyAreaCode: '238001',
      startTime: startDay_1,
      endTime: endDay_1,
      countryId: '1',
    },
  },
  {
    name: 'Giám sát hàng phát(NVPK)',
    url: 'https://jmsgw.jtexpress.vn/businessindicator/bigdataReport/detail/day_dispatch_monitor_total',
    body: {
      current: 1,
      size: size,
      dimensionType: 1,
      proxyAreaCode: '238001',
      startTime: startDay_1,
      endTime: endDay_1,
      countryId: '1',
    },
  },
  {
    name: 'Tra cứu đơn ký nhận',
    url: 'https://jmsgw.jtexpress.vn/businessindicator/bigdataReport/detail/network_delivery_sign_detail',
    body: {
      current: 1,
      size: size,
      startTime: startDay_1,
      endTime: endDay_1,
      agentCode: '238001',
      queryType: 'sign',
      userCode: '00664122',
      userId: 4607291,
      listTypes: '1',
      countryId: '1',
    },
  },
  {
    name: 'Tra cứu thông tin chuyển hoàn',
    url: 'https://jmsgw.jtexpress.vn/operatingplatform/returnExpress/listPageNew',
    body: {
      current: 1,
      size: size,
      startTime: startDay_1,
      endTime: endDay_1,
      queryType: 2,
      waybillNos: [],
      countryId: '1',
    },
  },
  {
    name: 'Báo biểu tỷ lệ nhận hàng kịp thời',
    url: 'https://jmsgw.jtexpress.vn/businessindicator/bigdataReport/detail/punctuality_platform_pick_detail',
    body: {
      current: 1,
      size: size,
      agentId: 3993,
      agentName: 'Nghệ An',
      agentCode: '238001',
      staffType: 0,
      timeType: 'A',
      SourcesType: 0,
      bestPickTimeStart: now,
      bestPickTimeEnd: endNow,
      countryId: '1',
    },
  },
  {
    name: 'Phân tích kí nhận toàn trình(Chi nhánh xuất phát Nghệ An)',
    url: 'https://jmsgw.jtexpress.vn/businessindicator/bigdataReport/detail/fulltime_aging_sign_detail',
    body: {
      current: 1,
      size: size,
      startTime: startDay_1,
      endTime: endDay_1,
      agentCode: '238001',
      takingAgentCode: '238001',
      detailType: '1',
      detailTypes: '1',
      countryId: '1',
    },
  },
  {
    name: 'Phân tích kí nhận toàn trình(Chi nhánh đích đến Nghệ An)',
    url: 'https://jmsgw.jtexpress.vn/businessindicator/bigdataReport/detail/fulltime_aging_sign_detail',
    body: {
      current: 1,
      size: size,
      startTime: startDay_1,
      endTime: endDay_1,
      agentCode: '238001',
      signAgentCode: '238001',
      detailType: '1',
      detailTypes: '1',
      countryId: '1',
    },
  },
  {
    name: 'Tỷ lệ đạt thời hiệu cam kết',
    url: 'https://jmsgw.jtexpress.vn/businessindicator/bigdataReport/detail/achievement_rate_detail',
    body: {
      current: 1,
      size: size,
      timeDeminsion: 2,
      startTime: startDay_1,
      endTime: endDay_1,
      effectStantard: 'TIKTOK',
      waybillSourceCode: ['TIKTOK'],
      desAgentCode: '238001',
      countryId: '1',
    },
  },
  {
    name: 'Báo biểu tỷ lệ nhận hàng kịp thời(Chi tiết)',
    url: 'https://jmsgw.jtexpress.vn/businessindicator/bigdataReport/detail/punctuality_platform_pick_detail',
    body: {
      current: 1,
      size: size,
      agentId: 3993,
      agentName: 'Nghệ An',
      agentCode: '238001',
      staffType: 0,
      timeType: 'A',
      SourcesType: 0,
      bestPickTimeStart: startDay_1,
      bestPickTimeEnd: endDay_1,
      countryId: '1',
    },
  },
  {
    name: 'Báo biểu tỷ lệ nhận hàng kịp thời(Tổng)',
    url: 'https://jmsgw.jtexpress.vn/businessindicator/bigdataReport/detail/punctuality_platform_pick_collect',
    body: {
      current: 1,
      size: size,
      agentId: 3993,
      agentName: 'Nghệ An',
      agentCode: '238001',
      bestPickTimeStart: startDay_1,
      bestPickTimeEnd: endDay_1,
      SourcesType: 0,
      staffType: 0,
      timeType: 'A',
      countryId: '1',
    },
  },
  {
    name: 'Báo biểu tỷ lệ gửi kiện đúng giờ(Mới)',
    url: 'https://jmsgw.jtexpress.vn/businessindicator/bigdataReport/detail/bus_delontime_routing_rate_detail',
    body: {
      current: 1,
      size: size,
      Dimensionsflag: 'startDate',
      takingAgentCode: '238001',
      startTime: startDay_1,
      endTime: endDay_1,
      countryId: '1',
    },
  },
  {
    name: 'Giám sát tồn kho',
    url: 'https://jmsgw.jtexpress.vn/businessindicator/bigdataReport/detail/take_ret_mon_detail',
    body: {
      current: 1,
      size: size,
      dimension: '1',
      actionAreaCode: '238001',
      startDate: startDay_2,
      endDate: endDay_2,
      countryId: '1',
    },
  },
  {
    name: 'Ký nhận thực tế(T-1) Ngày - 1',
    url: 'https://jmsgw.jtexpress.vn/businessindicator/bigdataReport/detail/terminal_sign_real_total_plan',
    body: {
      current: 1,
      size: size,
      newAgentCode: '238001',
      planStartTime: startDay_1,
      planEndTime: endDay_1,
      hasOrderSource: 0,
      countryId: '1',
    },
  },
  {
    name: 'Ký nhận thực tế(T-1) chi tiết',
    url: 'https://jmsgw.jtexpress.vn/businessindicator/bigdataReport/detail/terminal_sign_real',
    body: {
      current: 1,
      size: size,
      newAgentCode: '238001',
      planStartTime: startDay_1,
      planEndTime: endDay_1,
      countryId: '1',
    },
  },
  {
    name: 'Ký nhận thực tế(T-1) đơn chuyển hoàn',
    url: 'https://jmsgw.jtexpress.vn/businessindicator/bigdataReport/detail/terminal_sign_real_total_plan',
    body: {
      current: 1,
      size: size,
      newAgentCode: '238001',
      isRefund: 'Y',
      planStartTime: startDay_1,
      planEndTime: endDay_1,
      hasOrderSource: 0,
      countryId: '1',
    },
  },
  {
    name: 'Ký nhận thực tế(T-1) đơn chuyển hoàn + nguồn đặt đơn',
    url: 'https://jmsgw.jtexpress.vn/businessindicator/bigdataReport/detail/terminal_sign_real_total_plan',
    body: {
      current: 1,
      size: size,
      ordersourcecode: ['TIKTOKCB', 'TIKTOK-OW', 'TIKTOK'],
      newAgentCode: '238001',
      isRefund: 'Y',
      planStartTime: startDay_1,
      planEndTime: endDay_1,
      hasOrderSource: 1,
      countryId: '1',
    },
  },
  {
    name: 'Ký nhận thực tế(T-1) Ngày - 2',
    url: 'https://jmsgw.jtexpress.vn/businessindicator/bigdataReport/detail/terminal_sign_real_total_plan',
    body: {
      current: 1,
      size: size,
      newAgentCode: '238001',
      planStartTime: startDay_2,
      planEndTime: endDay_2,
      hasOrderSource: 0,
      countryId: '1',
    },
  },
  {
    name: 'Ký nhận thực tế(T-1) Ngày - 3',
    url: 'https://jmsgw.jtexpress.vn/businessindicator/bigdataReport/detail/terminal_sign_real_total_plan',
    body: {
      current: 1,
      size: size,
      newAgentCode: '238001',
      planStartTime: startDay_3,
      planEndTime: endDay_3,
      hasOrderSource: 0,
      countryId: '1',
    },
  },
  {
    name: 'GS thao tác của BCP(sót đến sót phát)',
    url: 'https://jmsgw.jtexpress.vn/businessindicator/bigdataReport/detail/miss_scan_arrival_deliver_total',
    body: {
      current: 1,
      size: size,
      agentcode: '238001',
      startTime: startDay_1,
      endTime: endDay_1,
      countPage: 'network',
      countryId: '1',
    },
  },
  {
    name: 'GS thao tác của BCP(sót đến sót phát) từ ngày 1',
    url: 'https://jmsgw.jtexpress.vn/businessindicator/bigdataReport/detail/miss_scan_arrival_deliver_total',
    body: {
      current: 1,
      size: size,
      agentcode: '238001',
      startTime: firstDayOfMonth,
      endTime: endDay_1,
      countPage: 'network',
      countryId: '1',
    },
  },
  {
    name: 'Thống kê kiểm kho',
    url: 'https://jmsgw.jtexpress.vn/businessindicator/bigdataReport/detail/opt_stocktaking_total',
    body: {
      current: 1,
      size: size,
      dimension: 'Network',
      scanAgentCode: '238001',
      startDate: startDay_1,
      endDate: endDay_1,
      startTime: startDay_1,
      endTime: endDay_1,
      countryId: '1',
    },
  },
  {
    name: 'Tỷ lệ ký nhận tồn kho tổng',
    url: 'https://jmsgw.jtexpress.vn/businessindicator/bigdataReport/detail/bus_stock_sign_rate_total',
    body: {
      current: 1,
      size: size,
      Dimensions: 'network',
      actionAreaCode: '238001',
      startTime: startDay_2,
      endTime: endDay_2,
      countryId: '1',
    },
  },
  {
    name: 'Tỷ lệ ký nhận tồn kho tổng',
    url: 'https://jmsgw.jtexpress.vn/businessindicator/bigdataReport/detail/bus_stock_sign_rate_detail',
    body: {
      current: 1,
      size: size,
      actionAreaCode: ['238001'],
      startTime: '2024-05-03 00:00:00',
      endTime: '2024-05-03 23:59:59',
      countryId: '1',
    },
  },
];
