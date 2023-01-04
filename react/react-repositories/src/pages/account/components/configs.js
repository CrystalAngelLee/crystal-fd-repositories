const getAmount = (amount) => Math.round(parseFloat(amount) * 100) / 100

export const getCurTplConfig = (grossSalary, takeHomePay) => {
  return [
    {
      key: 'income',
      name: '收入',
      children: [
        {
          key: 'grossSalary',
          name: '税前工资',
          amount: grossSalary,
        },
        {
          key: 'takeHomePay',
          name: '税后工资',
          amount: takeHomePay,
        },
      ],
    },
    {
      key: 'savings',
      name: '储蓄20%',
      amount: getAmount(takeHomePay * 0.2),
      children: [
        {
          key: 'personalSavings',
          name: '个人储蓄',
          amount: getAmount(takeHomePay * 0.1),
          location: {
            id: 'BOC',
            name: '中国银行',
          },
        },
        {
          key: 'parentsSavings',
          name: '父母储蓄',
          amount: getAmount(takeHomePay * 0.1),
          location: {
            id: 'BOC',
            name: '中国银行',
          },
        },
      ],
    },
    {
      key: 'insurance',
      name: '保险',
      amount: getAmount(10000 / 13),
      location: {
        id: 'CMB',
        name: '招商银行',
      },
    },
    {
      key: 'financial',
      name: '理财30%',
      amount: getAmount(takeHomePay * 0.3),
      children: [
        {
          key: 'fund',
          name: '股票基金75%',
          amount: getAmount(takeHomePay * 0.3 * 0.75),
          location: {
            id: 'CMB_f',
            name: '一创_招行',
          },
        },
        {
          key: 'bond',
          name: '债券15%',
          amount: getAmount(takeHomePay * 0.3 * 0.15),
          // location: {
          //   id: 'CMB_f',
          //   name: '一创_招行'
          // },
        },
        {
          key: 'gold',
          name: '黄金5%',
          amount: getAmount(takeHomePay * 0.3 * 0.05),
          location: {
            id: 'CMB_f',
            name: '一创_招行',
          },
        },
        {
          key: 'realEstate',
          name: '房产5%',
          amount: getAmount(takeHomePay * 0.3 * 0.05),
          location: {
            id: 'alipay',
            name: '支付宝',
          },
        },
      ],
    },
    {
      key: 'daily',
      name: '日常',
      children: [
        {
          key: 'rent',
          name: '房租',
          amount: getAmount(4500 / 2),
          location: {
            id: 'webank',
            name: '微众银行',
          },
        },
        {
          key: 'learn',
          name: '学习',
          amount: getAmount(10000 / 13),
          location: {
            id: 'PBOC',
            name: '邮政银行',
          },
        },
        {
          key: 'other',
          name: '其他',
          amount: getAmount(
            takeHomePay -
              takeHomePay * 0.2 -
              10000 / 13 -
              takeHomePay * 0.3 -
              4500 / 2 -
              10000 / 13
          ),
        },
      ],
    },
  ]
}
