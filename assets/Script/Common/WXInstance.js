window.G_WX = {
    wx_code : "",
    wx_encryptedData : "",
    wx_iv : "",
    baseToken : "MTxo7FCsilhbzH7s",

    /**
     * 获取电池电量
     * @param {事件对象} event 
     * @param {自定义数据} cusData 
     */
    getBatteryInfo() {
        let battery = wx.getBatteryInfoSync();
        wx.showModal(
            {
                title: "电量信息",
                content: "电量：" + battery.level,
                success: (res) => {
                    cc.log("对话框显示成功");
                    cc.log("confirm:" + res.confirm);
                    cc.log("cancel:" + res.cancel);
                },
                fail: () => {
                    cc.log("对话框显示失败");
                },
                complete: () => {
                    cc.log("对话框调用完成");
                }
            }
        );
    },

    /**
     * 获取剪切板数据
     */
    getClipboardData() {
        wx.getClipboardData({
            success: (data) => {
                cc.log("获取剪切板数据成功");
                wx.showModal(
                    {
                        title: "剪切板数据",
                        content: data.data,
                        success: (res) => {
                            cc.log("对话框显示成功");
                            cc.log("confirm:" + res.confirm);
                            cc.log("cancel:" + res.cancel);
                        },
                        fail: () => {
                            cc.log("对话框显示失败");
                        },
                        complete: () => {
                            cc.log("对话框调用完成");
                        }
                    }
                );
            },
            fail: () => {
                cc.log("获取剪切板数据失败");
            },
            complete: () => {
                cc.log("获取剪切板数据完成");
            }
        });
    },

    /**
     * 获取系统信息
     */
    getSysInfoClick() {
        let sysInfo = wx.getSystemInfoSync();
        let sysContent = "手机品牌:" + sysInfo.brand;
        sysContent += "\r\n手机型号:" + sysInfo.model;
        sysContent += "\r\n设备像素比:" + sysInfo.pixelRatio;
        sysContent += "\r\n屏幕宽度:" + sysInfo.screenWidth;
        sysContent += "\r\n屏幕高度:" + sysInfo.screenHeight;
        sysContent += "\r\n可使用窗口宽度:" + sysInfo.windowWidth;
        sysContent += "\r\n可使用窗口高度:" + sysInfo.windowHeight;
        sysContent += "\r\n微信设置语言:" + sysInfo.language;
        sysContent += "\r\n微信版本号:" + sysInfo.version;
        sysContent += "\r\n操作系统版本:" + sysInfo.system;
        sysContent += "\r\n客户端平台:" + sysInfo.platform;
        sysContent += "\r\n用户字体大小设置:" + sysInfo.fontSizeSetting;
        sysContent += "\r\n客户端基础库版本:" + sysInfo.SDKVersion;
        sysContent += "\r\n性能等级:" + sysInfo.benchmarkLevel;
        sysContent += "\r\n电量:" + sysInfo.battery;
        sysContent += "\r\nwifi 信号强度:" + sysInfo.wifiSignal;

        wx.showModal(
            {
                title: "系统信息",
                content: sysContent,
                cancelText: "关闭，红",
                cancelColor: "#76ffa4",
                confirmText: "确认，绿",
                confirmColor: "#103cf0",
                success: (res) => {
                    cc.log("对话框显示成功");
                    cc.log("confirm:" + res.confirm);
                    cc.log("cancel:" + res.cancel);
                },
                fail: () => {
                    cc.log("对话框显示失败");
                },
                complete: () => {
                    cc.log("对话框调用完成");
                }

            }
        );
    },

    /**
     * 获取网络信息 
     */
    getNetworkInfo() {
        wx.getNetworkType({
            success: (res) => {
                cc.log("获取网络信息成功");
                wx.showModal({
                    title: "网络信息",
                    content: "是否连接:" + res.isConnected + "\r\n网络类型:" + res.networkType
                });
            },
            fail: () => {
                cc.log("获取网络信息失败");
            },
            complete: () => {
                cc.log("获取网络信息完成");
            }
        });
    },

    /**
     * 加速计监听开关
     * @param {toggle组件} toggle 
     */
    toggleAccelerometer(isChecked) {
        if (isChecked) {
            wx.startAccelerometer(
                {
                    success: () => {
                        cc.log("监听加速度数据启动成功");
                    },
                    fail: () => {
                        cc.log("监听加速度数据启动失败");
                    },
                    complete: () => {
                        cc.log("监听加速计数据启动调用完成");
                    }
                }
            );
        } else {
            wx.stopAccelerometer(
                {
                    success: () => {
                        cc.log("停止监听加速度数据成功");
                    },
                    fail: () => {
                        cc.log("停止监听加速度数据失败");
                    },
                    complete: () => {
                        cc.log("停止监听加速计数据调用完成");
                    }
                }
            );
        }
    },

    /**
     * 罗盘监听开关
     * @param {toggle组件} toggle 
     */
    toggleCompassChange(isChecked) {
        if (isChecked) {
            wx.startCompass(
                {
                    success: () => {
                        cc.log("监听罗盘数据启动成功");
                    },
                    fail: () => {
                        cc.log("监听罗盘数据启动失败");
                    },
                    complete: () => {
                        cc.log("监听罗盘数据启动调用完成");
                    }
                }
            );
        } else {
            wx.stopCompass(
                {
                    success: () => {
                        cc.log("停止监听罗盘数据成功");
                    },
                    fail: () => {
                        cc.log("停止监听罗盘数据失败");
                    },
                    complete: () => {
                        cc.log("停止监听罗盘数据调用完成");
                    }
                }
            );
        }
    },

    /**
     * 长震动400 ms
     */
    vibrateLong() {
        wx.vibrateLong(
            {
                success: function () {
                    cc.log("长震动调用成功");
                },
                fail: function () {
                    cc.log("长震动调用失败");
                },
                complete: function () {
                    cc.log("长震动调用完成");
                },
            }
        );
    },
    /**
     * 短震动15 ms
     */
    vibrateShort() {
        wx.vibrateShort(
            {
                success: function () {
                    cc.log("短动调用成功");
                },
                fail: function () {
                    cc.log("短动调用失败");
                },
                complete: function () {
                    cc.log("短动调用完成");
                },
            }
        );
    },

    /**
     * @param {slide组件} slide 
     * @param {自定义数据} cusData 
     */
    screenBrightnessSlideChange(slide, cusData) {
        wx.setScreenBrightness({
            value: slide.progress
        });
    },

    /**
     * 检测Session
     */
    checkSession() {
        wx.checkSession({
            success: () => {
                wx.showModal({
                    title: "登录信息有效"
                });
            },
            fail: () => {
                wx.showModal({
                    title: "登录已失效"
                });
            }
        });
    },

    /**
     * 登录
     */
    wxLogin() {
        wx.login({
            success: (res) => {
                console.log("wxLogin success code is : " + res.code);
                this.wx_code = res.code;
                G_EventManager.pushEvent(G_Event.wx_wxLoginSuccess,[res]);
            },
            fail: () => {
                wx.showModal({
                    title: "用户取消授权",
                });
            }
        });
    },

    /**
     * 请求用户授权信息
     * @param {事件对象} event 
     * @param {自定义数据} cusData 
     */
    authorizeUserInfo() {
        console.log("authorizeUserInfo");
        wx.authorize({
            scope: "scope.userInfo",
            success: () => {
                console.log("用户信息授权成功");
                G_EventManager.pushEvent(G_Event.wx_authorizeUserInfoSuccess);
            },
            fail: () => {
                console.log("授权失败");
            }
        });
    },

    createUserInfoBtn() {
        let button = wx.createUserInfoButton({
            type: 'text',
            text: '获取用户信息',
            style: {
                left: 10,
                top: 76,
                width: 200,
                height: 40,
                lineHeight: 40,
                backgroundColor: '#ff0000',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 4
            }
        })
        button.onTap((res) => {
            console.log(res)
        })
    },

    /**
     * 直接获取用户数据
     */
    getUserInfo() {
        wx.getUserInfo({
            success: (res) => {
                // cc.log("获取用户数据成功");
                // let userInfo = "country province city 所用的语言:" + res.userInfo.language;
                // userInfo += "\r\n昵称:" + res.userInfo.nickName;
                // userInfo += "\r\n头像图片 url:" + res.userInfo.avatarUrl;
                // userInfo += "\r\n性别(0:未知,1:男,2:女):" + res.userInfo.gender;
                // wx.showModal({
                //     title: "用户信息",
                //     content: userInfo
                // });
                console.log("getUserInfo success ");
                this.wx_encryptedData = res.encryptedData;
                this.wx_iv = res.iv;
                G_EventManager.pushEvent(G_Event.wx_getUserInfoSuccess,[res]);
            },
            fail: () => {
                cc.log("获取用户数据失败");
            }
        });
    },
    /**
     * 打开设置界面
     */
    btnOpenSetting() {
        wx.openSetting({
            success: (res) => {
                let setting = "scope.userInfo:" + res.authSetting["scope.userInfo"];
                setting += "\r\nscope.userLocation:" + res.authSetting["scope.userLocation"];
                cc.log("打开设置页面成功");
                wx.showModal({
                    title: "授权设置",
                    content: setting
                });
            },
            fail: () => {
                cc.log("打开设置页面失败");
            }
        });
    }
}
