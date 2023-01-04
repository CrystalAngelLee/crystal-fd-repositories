export default defineAppConfig({
  pages: [/* 'pages/details/index', */ 'pages/plan/index', 'pages/mine/index'],
  subPackages: [
    {
      root: 'pages/templatelist/',
      pages: ['index']
    },
    {
      root: 'pages/template/',
      pages: ['index']
    },
    {
      root: 'pages/suggest/',
      pages: ['index']
    },
    {
      root: 'pages/book/',
      pages: ['index']
    },
    {
      root: 'pages/bookmanage/',
      pages: ['index']
    },
    {
      root: 'pages/booknew/',
      pages: ['index']
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fdf89a',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    /** tab 上的文字默认颜色 */
    color: '#A3B3BF', // #A3B3BF
    /** tab 上的文字选中时的颜色 */
    selectedColor: '#F49876', //#F49876
    /** tab 的背景色 */
    backgroundColor: '#fdf89a', // #FDF89A
    list: [
      {
        pagePath: 'pages/plan/index',
        text: '资产配置',
        iconPath: './static/images/plan.png',
        selectedIconPath: './static/images/aplan.png'
      },
      // {
      //   pagePath: 'pages/details/index',
      //   text: '明细',
      //   iconPath: './static/images/plan.png',
      //   selectedIconPath: './static/images/aplan.png'
      // },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: './static/images/mine.png',
        selectedIconPath: './static/images/amine.png'
      }
    ]
  },
  cloud: true,
  lazyCodeLoading: 'requiredComponents'
})
