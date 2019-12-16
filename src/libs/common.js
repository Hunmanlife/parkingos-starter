import axios from 'axios';
const RoleFuncion = [
    {'value_no': 0, 'value_name': '无'},
    {'value_no': 1, 'value_name': '收费功能'},
    {'value_no': 2, 'value_name': '巡查功能'},
    {'value_no': 3, 'value_name': '开卡功能'}

];
var path = process.env.BASE_API;
export default {
    setBaseUrl(url){
        path = url;
        return url;
    },
    /**
     * 某些状态、名称等需要格式化显示的数据
     * @param arr,state
     * @returns {str}
     */
    formatCommonSateFn(arr,state){
        let stateText = '';
        arr.forEach(item=>{
            if(item.value_no == state){
                stateText = item.value_name;
                return stateText;
            }
        });
        return stateText;
    },
    timestampFormat:function (d) {
        var date = d;
        date = date.substring(0,19);
        date = date.replace(/-/g,'/');
        var timestamp = new Date(date).getTime();
        return timestamp
    },
    dateformat: function (longtime) {
        if (longtime == '' || longtime == null) {
            return '';
        }
        let nTime = new Date(longtime * 1000);
        let month = nTime.getMonth() + 1;
        let day = nTime.getDate();
        let hour = nTime.getHours();
        let minute = nTime.getMinutes();
        let second = nTime.getSeconds();
        return nTime.getFullYear() + '-' + (month < 10 ? ('0' + month) : month) + '-' + (day < 10 ? ('0' + day) : day) + ' ' + (hour < 10 ? ('0' + hour) : hour) + ':' + (minute < 10 ? ('0' + minute) : minute) + ':' + (second < 10 ? ('0' + second) : second);
    },
    dateformatonly: function (longtime) {
        if (longtime == '' || longtime == null) {
            return '';
        }
        var nTime = new Date(longtime * 1000);
        var month = nTime.getMonth() + 1;
        var day = nTime.getDate();
        return nTime.getFullYear() + '-' + (month < 10 ? ('0' + month) : month) + '-' + (day < 10 ? ('0' + day) : day);
    },
    datetosecond: function (d) {
        return Math.round((d.getTime()) / 1000);
    },
    secondtodate: function (d) {
        return Math.round((d.getTime()) * 1000);
    },
    getordertype: function (order) {
        if (order.substring(0, 1) == 'a') {
            return order.substring(0, 3);
        } else {
            return order.substring(0, 4);
        }
    },
    gww: function (_w) {
        let w = 0;
        if (window.innerWidth) {
            w = window.innerWidth;
        } else {
            w = document.documentElement.offsetWidth || document.body.clientWidth || 0;
        }

        w = w < _w ? _w : w;
        return parseInt(w);
    },
    gwh: function (_h) {
        let h = 0;
        if (window.innerHeight) {
            h = window.innerHeight;
        } else {
            h = document.documentElement.offsetHeight || document.body.clientHeight || 0;
        }

        h = h < _h ? _h : h;
        return parseInt(h);
    },
    clone: function (obj) {
        let o = '', i = '', j = '';
        if (typeof(obj) != 'object' || obj === null) return obj;
        if (obj instanceof (Array)) {
            o = [];
            i = 0;
            j = obj.length;
            for (; i < j; i++) {
                if (typeof(obj[i]) == 'object' && obj[i] != null) {
                    o[i] = arguments.callee(obj[i]);
                }
                else {
                    o[i] = obj[i];
                }
            }
        }
        else {
            o = {};
            for (i in obj) {
                if (typeof(obj[i]) == 'object' && obj[i] != null) {
                    o[i] = arguments.callee(obj[i]);
                }
                else {
                    o[i] = obj[i];
                }
            }
        }

        return o;
    },
    intervalchange: function (vm, val, field) {
        var start = field + 'start';
        var end = field + 'end';

        if (val == 'between') {
            vm.searchShow[start] = true;
            vm.searchShow[end] = true;
        } else if (val == 'null') {
            vm.searchShow[start] = false;
            vm.searchShow[end] = false;
        } else {
            vm.searchShow[start] = true;
            vm.searchShow[end] = false;
        }
    },
    stateformat: function (state) {
        if (state == 0) return '未审核';
        if (state == 1) return '已审核';
        if (state == 2) return '禁用';
        if (state == 3) return '已锁定';
    },
    ynformat: function (state) {
        if (state == 0) return '否';
        if (state == 1) return '是';
    },
    balanceformat: function (balance, digit) {
        if (balance == null) {
            return '-';
        } else {
            return balance.toFixed(digit) + ' 元';
        }
    },
    nameformat: function (row, list, col) {
        // console.log(row)
        for (let x in list) {
            // console.log('for '+x)
            // console.log('value_no '+list[x].value_no)
            // console.log('row '+row[col])
            if (row[col] == null) {
                if (col == 'com_id') {
                    return '(未知车场)';
                } else if (col == 'car_union_id') {
                    return '-';
                } else if (col == 'server_id') {
                    return '(无服务商)';
                } else {
                    return '';
                }
            }
            // console.log(list)
            if ((list[x].value_no == row[col])||(list[x].value_no+'' == row[col])) {
                return list[x].value_name;
            }
        }
    },
    getMoneyData:function(){


    },
    funcformat: function (is_collector, is_inspect, is_opencard) {
        if (is_collector == 1) {
            return RoleFuncion[1].value_name;
        }
        if (is_inspect == 1) {
            return RoleFuncion[2].value_name;
        }
        if (is_opencard == 1) {
            return RoleFuncion[3].value_name;
        }
        return RoleFuncion[0].value_name;
    },
    getWorkSite_id() {
        let param = '?token=' + sessionStorage.getItem('token')
            + this.attachParams('comid');
        return axios.get(path+'/getdata/getWorkSiteId' + param);
    },

    getChannelType() {
        let param = '?token=' + sessionStorage.getItem('token')
            + this.attachParams('comid');
        return axios.get(path+'/getdata/getChannelType' + param);
    },
    getChannelTypeByGroupid(groupid) {
        let param = '?groupid=' + groupid
        return axios.get(path+'/getdata/getgroupchannels' + param);
    },
    getChannelTypeByComid(comid) {
        let param = '?comid=' + comid
        return axios.get(path+'/getdata/getChannelType' + param);
    },
    getSuperimposed() {
        if(sessionStorage.getItem('comid')){
          let param = '?token=' + sessionStorage.getItem('token')
              + this.attachParams('comid');
          return axios.get(path+'/getdata/getSuperimposed' + param);
        }
        else{
          return {};
        }


    },
    getMonitorName() {
        let param = '?token=' + sessionStorage.getItem('token')
            + this.attachParams('comid');
        return axios.get(path+'/getdata/getMonitorName' + param);

    },
    // getUnionList: function (params) {
    //     let param = '?token=' + sessionStorage.getItem('token');
    //     if (typeof(params) != 'undefined') {
    //         param += params;
    //     }
    //     return axios.get('/getdata/unionlist' + param);
    // },
    getServerList: function (params) {
        let param = '?token=' + sessionStorage.getItem('token');
        if (typeof(params) != 'undefined') {
            param += params;
        }
        return axios.get(path+'/getdata/serverlist' + param);
    },
    getParkList: function (params) {
        let param = '?token=' + sessionStorage.getItem('token');
        if (typeof(params) != 'undefined') {
            param += params;
        }
        return axios.get(path+'/getdata/parklist' + param);
    },
    getParkLists: function () {
        let param = '?token=' + sessionStorage.getItem('token');
        return axios.get(path+'/getdata/parklists' + param);
    },
    getBaPayUnionList: function () {
        let param = '?token=' + sessionStorage.getItem('token');
        return axios.get(path+'/getdata/payunionlist' + param);
    },
    getBankInfo: function () {
        let param = '?token=' + sessionStorage.getItem('token');
        return axios.get(path+'/getdata/getbankinfo' + param);
    },
    getCentralPaymentList: function (params) {
        let param = '?token=' + sessionStorage.getItem('token');
        if (typeof(params) != 'undefined') {
            param += params;
        }
        return axios.get(path+'/getdata/getcentralpaymentlist' + param);
    },
    getEventLists() {
        let param = '?token=' + sessionStorage.getItem('token');
        return axios.get(path+'/getdata/geteventlist' + param);
    },
    /**
     * 集团接口
     * @returns {AxiosPromise}
     */
    getAllParks() {
        // 获得集团和城市下的所有车场
        let param = '?token=' + sessionStorage.getItem('token')
            + this.commonParams();
        return axios.get(path+'/getdata/cityparks' + param);
    },
    getAllShops() {
        // 获得集团和城市下的所有车场
        let param = '?token=' + sessionStorage.getItem('token')
            + this.commonParams();
        return axios.get(path+'/getdata/getshops' + param);
    },
    getAShops() {
        // 获得集团和城市下的所有车场
        let param = '?token=' + sessionStorage.getItem('token')
            + "&isNewType=0"
            + this.commonParams();
        return axios.get(path+'/getdata/getshops' + param);
    },
    getBShops() {
        // 获得集团和城市下的所有车场
        let param = '?token=' + sessionStorage.getItem('token')
            + "&isNewType=1"
            + this.commonParams();
        return axios.get(path+'/getdata/getshops' + param);
    },
    getAllCollector() {
        // 获得集团和城市下面所有的收费员
        let param = '?token=' + sessionStorage.getItem('token')
            + this.commonParams();
        return axios.get(path+'/getdata/allcollectors' + param);
    },
    getAllPName() {
        let param = '?token=' + sessionStorage.getItem('token')
            + this.commonParams();
        return axios.get(path+'/getdata/getAllPackage' + param);
    },
    getAllEmployeeRole() {
        //获取员工角色
        let param = '?token=' + sessionStorage.getItem('token')
            + this.commonParams();
        return axios.get(path+'/groupmember/getrole' + param);
    },
    getCityEmployeeRole() {
        //获取员工角色
        let param = '?token=' + sessionStorage.getItem('token')
            + this.commonParams();
        return axios.get(path+'/citymember/getrole' + param);
    },
    /**
     * 车场接口
     * @returns {AxiosPromise}
     */
    getCollector() {
        //获取收费员
        let param = '?token=' + sessionStorage.getItem('token')
            + this.commonParams();
        return axios.get(path+'/getdata/getalluser' + param);
    },
    getLiftReason() {
        //获取收费员
        let param = '?token=' + sessionStorage.getItem('token');
        return axios.get(path+'/liftRod/getLiftReason' + param);
    },
    getEmployeeRole() {
        //获取员工角色
        //alert('111')
        let param = '?token=' + sessionStorage.getItem('token')
            + this.commonParams()+ this.attachParams('loginroleid');
        return axios.get(path+'/member/getrole' + param);
    },
    getShopRole() {
        //获取员工角色

        let param = '?token=' + sessionStorage.getItem('token')
            + this.commonParams() + this.attachParams('shopid') + this.attachParams('loginroleid');
        return axios.get(path+'/shopmember/getrole' + param);
    },

    getShopUsers(){
        let param = '?token=' + sessionStorage.getItem('token')
             + this.attachParams('shopid') ;
        return axios.get(path+'/shopmember/getshopusers' + param);
    },
    getPName() {
        //获得月卡套餐
        let param = '?token=' + sessionStorage.getItem('token')
            + this.commonParams();
        return axios.get(path+'/getdata/getpname' + param);
    },
    getPNameByCar(carId){
        //获得月卡套餐
        let param = '?token=' + sessionStorage.getItem('token')
            +'&carId='+carId
            + this.commonParams();
        return axios.get(path+'/getdata/getpnamebycar' + param);
    },
    getUnionList() {
        //获取城市下面所有的集团
        let param = '?token=' + sessionStorage.getItem('token')
            + this.commonParams();
        return axios.get(path+'/getdata/getallunion' + param);
    },
    getCarType() {
        //获得车型类型
        let param = '?token=' + sessionStorage.getItem('token')
            + this.commonParams();
        return axios.get(path+'/getdata/getcartype' + param);
    },
    editCarNum(carnumber, id,carNumber) {
        //更改车牌号
        let param = '?token=' + sessionStorage.getItem('token')
            + this.commonParams()
            + '&id=' + id
            + '&carnumber=' + encodeURI(encodeURI(carnumber))
            + '&old_carnumber=' + encodeURI(encodeURI(carNumber));
        return axios.get(path+'/vip/editCarNum' + param);
    },
    getProdSum(p_name, month) {
        //通过续费月数和月卡套餐获取金额
        let param = '?token=' + sessionStorage.getItem('token')
            + this.commonParams()
            + '&p_name=' + p_name
            + '&months=' + month;
        return axios.get(path+'/getdata/getprodsum' + param);
    },
    getEndTime(begin, month,pid) {
        //通过续费月数和月卡套餐获取金额
        let param = '?token=' + sessionStorage.getItem('token')
            + this.commonParams()
            + '&beginTime=' + begin
            + '&pid=' + pid
            + '&months=' + month;
        return axios.get(path+'/getdata/getEndTime' + param);
    },
    reNewProduct(p_name, month, name, b_time, id, remark, act_total,total, nickname,card_id,e_time) {
        // reNewProduct(this.pnameno,this.refillcount,this.currentRow.name,this.Btime,this.currentRow.pid,this.currentRow.remark,this.RefillTotalact,roleid==30?'车场':roleid){
        //月卡续费
        let param = '?token=' + sessionStorage.getItem('token')
            + this.commonParams()
            + '&p_name=' + p_name
            + '&months=' + month
            + '&name=' + name
            + '&b_time=' + b_time
            + '&id=' + id
            + '&remark=' + remark
            + '&act_total=' + act_total
            + '&total=' + total
            + '&card_id=' + card_id
            + '&nickname=' + nickname
            + '&e_time=' + e_time;
        return axios.get(path+'/vip/renewproduct' + param);
    },


    /**
     *
     * @returns {AxiosPromise<any>}
     */


    getSmsInfo() {
        //短信续费
        let param = '?token=' + sessionStorage.getItem('token');
        return axios.get(path+'/getdata/getmessageprice' + param);
    },
    getLength: function (obj) {
        var count = 0;
        for (var key in obj) {
            count++;
        }
        return count;
    },
    paytypeformat: function (paytype) {
        if (paytype == 0) return '主扫';
        if (paytype == 1) return '被扫';
        if (paytype == 2) return '免密';
        if (paytype == 3) return '现金';
    },
    paychannelformat: function (paychennel) {
        if (paychennel == 0) return '微信';
        if (paychennel == 1) return '支付宝';
        if (paychennel == 2) return '余额';
        if (paychennel == 3) return '银联';
    },
    pageShow: function (user, pageName) {
        for (var item of user.authlist) {
            if (pageName == item.auth_id) {
                // console.log(item.nname)
                return true;
            }
        }

        return false;
    },
    showSettlement:function (sub_auth) {
    //    0元结算
        if (sub_auth.indexOf('手动结算') > -1) {
            return true;
        }
        return false;
    },
    showSubSearch: function (sub_auth) {
        //显示高级查询
        if (sub_auth.indexOf('查看') > -1) {
            return true;
        }
        return false;
    },
    showSubExport: function (sub_auth) {
        //显示导出
        if (sub_auth.indexOf('导出') > -1) {
            return true;
        }
        return false;
    },
    showSubImport: function (sub_auth) {
        //显示导入
        if (sub_auth.indexOf('导入') > -1) {
            return true;
        }
        return false;
    },
    showQrBtn:function(sub_auth){
        if (sub_auth.indexOf('二维码') > -1) {
            return true;
        }
        return false;
    },
    downLoadBtn:function(sub_auth){
        if (sub_auth.indexOf('下载') > -1) {
            return true;
        }
        return false;
    },
    showSubAdd: function (sub_auth) {
        //显示新增
        if (sub_auth.indexOf('注册') > -1) {
            return true;
        }
        if (sub_auth.indexOf('添加') > -1) {
            return true;
        }
        return false;
    },
    showSetSMS: function (sub_auth) {
        //显示新增
        if (sub_auth.indexOf('短信设置') > -1) {
            return true;
        }
        return false;
    },
    showSubBatch: function (sub_auth) {
        if (sub_auth.indexOf('批量延期') > -1) {
            return true;
        }
        return false;
    },
    showSubEdit: function (sub_auth) {
        if (sub_auth.indexOf('编辑') > -1 || sub_auth.indexOf('漂白') > -1) {
            return true;
        }
        return false;
    },
    showPublic: function (sub_auth) {
        if (sub_auth.indexOf('公众号设置') > -1 ) {
            return true;
        }
        return false;
    },
    payAndOpen:function(sub_auth){
        if (sub_auth.indexOf('支付开通') > -1 ) {
            return true;
        }
        return false;
    },
    showSubDel: function (sub_auth) {
        if (sub_auth.indexOf('删除') > -1||sub_auth.indexOf('销户')>-1) {
            return true;
        }
        return false;
    },
    showBatchDelete: function (sub_auth) {
        if (sub_auth.indexOf('批量移除') > -1) {
            return true;
        }
        return false;
    },
    showRefund: function (sub_auth) {
        if (sub_auth.indexOf('退款') > -1) {
            return true;
        }
        return false;
    },
    showSubUpdate: function (sub_auth) {
        if (sub_auth.indexOf('修改') > -1) {
            return true;
        }
        return false;
    },
    showSubReFill: function (sub_auth) {
        if (sub_auth.indexOf('续费') > -1) {
            return true;
        }
        return false;
    },
    showSubPermission: function (sub_auth) {
        if (sub_auth.indexOf('权限') > -1 || sub_auth.indexOf('修改权限') > -1 ) {
            return true;
        }
        return false;
    }, showSetting: function (sub_auth) {
        if (sub_auth.indexOf('设置') > -1) {
            return true;
        }
        return false;
    },
    showSubSetFee: function (sub_auth) {
        if (sub_auth.indexOf('收费设置') > -1) {
            return true;
        }
        return false;
    },
    showSubReset: function (sub_auth) {
        if (sub_auth.indexOf('修改密码') > -1) {
            return true;
        }
        return false;
    },
    showResources:function(sub_auth) {
        if (sub_auth.indexOf('禁用') > -1) {
            return true;
        }
        return false;
    },
    distribution:function (sub_auth) {
        if (sub_auth.indexOf('分配') > -1) {
            return true;
        }
        return false;
    },
    rechargeIndexOf:function (sub_auth) {
        if (sub_auth.indexOf('充值') > -1) {
            return true;
        }
        return false;
    },
    getShopMemberList(obj) {
        return axios.get(path+'/shopmember/quickquery' + '?token=' + sessionStorage.getItem('token') + '&shop_id=' + obj.shop_id + '&page=' + obj.page);
    },
    saveShopMember(obj) {
        return axios.get(path+'/shopmember/create' + '?token=' + sessionStorage.getItem('token')
            + '&shop_id=' + obj.shop_id
            + '&nickname=' + encodeURI(encodeURI(obj.nickname)) + '&phone=' + obj.phone
            + '&mobile=' + obj.mobile + '&auth_flag=' + obj.auth_flag
            + '&userId=' + obj.userId + this.commonParams());
    },
    addMoney(obj) {
        return axios.get(path+'/shop/addmoney' + '?token=' + sessionStorage.getItem('token')
            + '&shop_id=' + obj.shop_id + '&addmoney=' + obj.addmoney
            + '&operator=' + obj.operator + '&parkid=' + obj.parkid
            + '&ticket_time=' + obj.ticket_time + '&ticket_money=' + obj.ticket_money
            + '&ticketfree_limit=' + obj.ticketfree_limit+ this.commonParams());
    },
    editPass(obj) {
        return axios.get(path+'/shopmember/editpass' + '?token=' + sessionStorage.getItem('token')
            + '&newpass=' + obj.newpass + '&confirmpass=' + obj.confirmpass
            + '&id=' + obj.id+ this.commonParams());
    },
    deleteShopMember(id) {
        return axios.get(path+'/shopmember/delete' + '?token=' + sessionStorage.getItem('token') + '&id=' + id+ this.commonParams());
    },
    generateForm(sform) {
        //用来构建相同的参数-表单中添加这几个属性
        sform.token = this.attachParams('token',1);
        sform.oid = sform.oid || this.attachParams('oid', 1);
        sform.comid = sform.comid || this.attachParams('comid', 1);
        sform.groupid =sform.groupid ||this.attachParams('groupid', 1);
        sform.cityid =sform.cityid || this.attachParams('cityid', 1);
        sform.serverid = sform.serverid || this.attachParams('serverid', 1);
        sform.unionid = this.attachParams('unionid', 1);
        sform.channelid = this.attachParams('channelid', 1);
        sform.loginuin = this.attachParams('loginuin', 1);
        sform.ishdorder = this.attachParams('ishdorder', 1);
        sform.roleid = this.attachParams('loginroleid', 1);
        sform.shopid = this.attachParams('shopid', 1);
        sform.nickname1 = this.attachParams('nickname1', 1);
        return sform;
    },

    commonParams() {
        //返回通用的一些参数
        return this.attachParams('comid')
            + this.attachParams('groupid')
            + this.attachParams('cityid')
            + this.attachParams('loginuin')
            + this.attachParams('supperadmin')
            + this.attachParams('nickname1');
    },
    attachParams(key,type) {
        //判断是否是undifined，如果是，则不添加该参数
        let params = '';
        try{
          let p = sessionStorage.getItem(key);
          //alert(p);
          //   alert(p);
           if(key=='nickname1'&&type!==1) {
               p=encodeURI(encodeURI(p));
           }
          if (p !== undefined && p !== 'undefined') {
              if(type!==1){
                  //如果不是1，则说明是默认的拼接参数；否则是获得key对应的值
                  params += '&' + key + '=';
              }
              params += p;
          }
        }
        catch(e){
            console.log(e);
        }

        return params;
    },
    formatNumber(num) {
        //数字格式化成两位 xx
        if (num > 9)
            return num;
        else
            return '0' + num;
    },
    currentDate() {
        //返回当前日期年月日 2018-03-20
        let start = new Date();
        return start.getFullYear() + '-' + this.formatNumber(start.getMonth() + 1) + '-' + this.formatNumber(start.getDate());
    },
    yesterdayDate() {
        //返回昨天日期年月日 2018-03-20
        let start = new Date();
        return start.getFullYear() + '-' + this.formatNumber(start.getMonth() + 1) + '-' + this.formatNumber(start.getDate()-1);
    },
    getFirstDayOfWeek() {
        //返回当前日期年月日 2018-03-20
        let start = new Date();
        var weekday = start.getDay()||7;
        start.setDate(start.getDate()-weekday+1);
        return start.getFullYear() + '-' + this.formatNumber(start.getMonth() + 1) + '-' + this.formatNumber(start.getDate());
    },
    currentMonth() {
        //返回当前年月 2018-03
        let start = new Date();
        return start.getFullYear() + '-' + this.formatNumber(start.getMonth() + 1);
    },
    yearStart() {
        //返回当前年月 2018-03
        let start = new Date();
        return start.getFullYear() + '-01' ;
    },
    currentFormatDate() {
        //返回时间区间 2018-03-20 00:00:00至 2018-03-20 23:59:59
        return this.currentDate() + ' 00:00:00至' + this.currentDate() + ' 23:59:59';
    },
    currentDateArray(delay){
        let threeDaysAgo = new Date(new Date().getTime()-(delay-1)*24*60*60*1000);
        let tda = threeDaysAgo.getFullYear() + '-' + this.formatNumber(threeDaysAgo.getMonth() + 1) + '-' + this.formatNumber(threeDaysAgo.getDate());
        return [tda+' 00:00:00',this.currentDate()+' 23:59:59'];
    },
    timestampToTime(timestamp){
        var date,Y,M,D,h,m,s;
        var date = new Date(timestamp*1000 );//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
        return Y+M+D+h+m+s;
    },
    //js+运算
    accAdd(arg1,arg2){
        var r1,r2,m;
        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
        m=Math.pow(10,Math.max(r1,r2))
        return (arg1*m+arg2*m)/m
    },
    /**
     *
     * @description:字符串时间转时间戳
     * @value:date
     * @case: 2019-05-22 00:00:00 ===> 1558454400000
     */
    strTimeToTimestamp(date){
        var ndate = date.substring(0,19);
            ndate = ndate.replace(/-/g,'/');
        var timestamp = new Date(ndate).getTime();
        return timestamp
    },
    /**
     *
     * @description:校验是不是数字
     * @value:num
     * @case:
     */
    CheckNum:function (num) {
        let check = /^[0-9]+.?[0-9]*$/;
        return (check.test(num)||num==0);
    },
    /**
     *
     * @description 日期格式化
     * @params num
     */
    formatDate(num) {
        let formatNum = num?num:0;
        let date = new Date(new Date().getTime() - (24*60*60*1000*formatNum))
        return date.getFullYear() + '-' + this.formatNumber(date.getMonth() + 1) + '-' + this.formatNumber(date.getDate());
    },
};
