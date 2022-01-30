import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import {
  hexMD5
} from "../../utils/md5.js"
import {
  login
} from '../../apis/api_music'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgPicList: ['https://pic1.zhimg.com/80/v2-81edb0e3eb31a081c2968ac20df4031c_720w.jpg?source=1940ef5c',
      'https://pic2.zhimg.com/80/v2-e601e1f87e462e2b48e862ee710c04d0_720w.jpg?source=1940ef5c', 'https://pic3.zhimg.com/80/v2-c51ab51a4cd7a838246e62baa9b29354_720w.jpg?source=1940ef5c', 'https://pic1.zhimg.com/80/v2-363a736abc4577c98320afc3fa0c2f52_720w.jpg?source=1940ef5c', 'https://pic1.zhimg.com/80/v2-084b769ff956d4283ce4eb1c37ac73b9_720w.jpg?source=1940ef5c', 'https://pic3.zhimg.com/80/v2-980b6be35b890fcac085bf61aff79add_720w.jpg?source=1940ef5c', 'https://pica.zhimg.com/80/v2-4ad7eb8c5d20f60869755c0dbc31d3db_720w.jpg?source=1940ef5c', 'https://pic3.zhimg.com/80/v2-80fb532b369d97e845be0ed98ca14cd3_720w.jpg?source=1940ef5c', 'https://pic2.zhimg.com/80/v2-1197240bdbce7180a6d9136bafc34eaa_720w.jpg?source=1940ef5c', 'https://pica.zhimg.com/80/v2-086471057d327c969f719f41a440129f_720w.jpg?source=1940ef5c'
    ],
    bgPicUrl: '',
    phone: '',
    password: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBackgroundPic()

  },


  getBackgroundPic: function () {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let randValue = this.getArrRandValue(arr)
    const bgPicUrl = this.data.bgPicList[randValue]
    this.setData({
      bgPicUrl: bgPicUrl
    })

  },
  // 获取数组随机值
  getArrRandValue: function (arr) {
    if (arr.length < 1) {
      return '';
    }
    let index = Math.floor((Math.random() * arr.length));
    return arr[index];
  },
  handleBackBtnClick: function () {
    wx.navigateBack()
  },


  handleInput(event) {
    let type = event.currentTarget.id;
    this.setData({
      [type]: event.detail.value, // 对象中使用变量要用中括号 []
    });



  },

  login: function () {
    let {
      phone,
      password
    } = this.data;
    // 前端验证
    if (!phone) {
      // wx.showToast({
      //   title: '手机号不能为空',
      //   icon: 'error',
      // })
      Dialog.alert({
        message: '手机号不能为空!',
      })
      return;
    }



    // 定义正则表达式
    let phoneReg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
    if (!phoneReg.test(phone)) {
      // wx.showToast({
      //   title: '输入合法手机号',
      //   icon: 'error',
      // })
      Dialog.alert({
        message: '请输入合法手机号!',
      })
      return;
    }

    if (!password) {
      // wx.showToast({
      //   title: '密码不能为空',
      //   icon: 'error',
      // })
      Dialog.alert({
        message: '密码不能为空!',
      })
      return;
    }
    const md5_password = hexMD5(password)
    // 后端验证
    login(phone, md5_password).then(res => {
      if (res.code === 200) {

        Dialog.alert({
          message: '登录成功!',
        })

        // 将用户的信息存储到本地
        wx.setStorageSync('userInfo', JSON.stringify(res.profile));


        wx.reLaunch({
          url: '/pages/user/index',
        })
      } else if (result.code === 400) {
        // wx.showToast({
        //   title: '手机号错误',
        //   icon: 'error',
        // })
        Dialog.alert({
          message: '登录成功!',
        })
      } else if (result.code === 502) {
        // wx.showToast({
        //   title: '密码错误',
        //   icon: 'error',
        // })
        Dialog.alert({
          message: '密码错误!',
        })
      } else {
        // wx.showToast({
        //   title: '登录失败',
        //   icon: 'error',
        // })
        Dialog.alert({
          message: '登录失败!',
        })
      }
    })

  },




  // this.setData({
  //   bannerList: bannerListData.banners,
  //   recommandList: recommandListData.result,
  //   topList: topListData,
  // })


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})