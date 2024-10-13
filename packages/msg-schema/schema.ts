// Server Data
const MessageTemplateDataDemo = {
  meta: {
    templateCode: 'HSBP_V1',
    templateName: '坏损包赔-部分退款解决方案',
    feTemplate: 'SIMPLE',
  },
  templateData: {
    title: {
      type: 0,
      value: '请您确认是否接受'
    },
    content: {
      type: 0,
      value: '系统检测到该订单符合坏损包赔协议条件, 请您确认是否接受部分退款解决方案'
    },
    orderInfo: {
      packageId: 'P1XXXXXXX',
      orderId: '45dae1k23dmk1',
      name: 'The North Face · 北面三合一冲锋衣国庆特惠',
      price: 189900,
      quantity: 1,
    },
    buttons: [
      {
        actionId: 'A11111',
        label: '确认部分退款',
        status: 'ENABLED',
        type: 'HTTP_ACTION',
        action: {
          url: 'https://www.something.com/api/xx1',
          requestDetail: '{"test":"demo"}',
          successAction: [
            { actionId: 'S111' },
          ]
        }
      }
    ]
  }
}


// Card Render Schema
const SimpleMessageCardSchema = {
  componentName: 'CardWrapper',
  style: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12,
    paddingRight: 12,
  },
  children: [
    {
      componentName: 'Title',
      propsResolver: '({ title }) => ({ ...title })',
    },
    {
      componentName: 'Text',
      propsResolver: '({ content }) => ({ content })',
      conditionResolver: '({ content }) => !!content',
      style: {
        marginTop: 4,
      }
    },
    {
      componentName: 'OrderInfo',
      propsResolver: '({ orderInfo }) => ({ orderInfo })',
      style: {
        marginTop: 4,
      }
    },
    {
      componentName: 'MultiButtons',
      propsResolver: '({ buttons }) => ({ buttons })',
      style: {
        marginTop: 4,
      }
    }
  ]
}