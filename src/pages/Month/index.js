import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useState,useMemo } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'

const Month = () => {

//控制时间选择器的弹出
const [dateVisible,setDateVisible]=useState(false);

//在时间选择器上点击的内容
const [currentDate,setCurrentDate]=useState(()=>{ return dayjs(new Date()).format('YYYY-MM')});

//monthBillList中选择的月份的数据
const [currentMonthList,setCurrentMonthList]=useState([]);

const {billList} = useSelector(state=>state.bill);

//billList按月分组
const monthBillList = useMemo(()=>{
    return _.groupBy(billList,(item)=>{return dayjs(item.date).format('YYYY-MM')})
},[billList])

//点击确认
function onConfirm(date){
    setDateVisible(false);
    const formatDate=dayjs(date).format('YYYY-MM')
    setCurrentDate(formatDate);
    setCurrentMonthList(monthBillList[formatDate]);
    
}



const monthResult=useMemo(()=>{
    //计算收入
    const incomeArr = currentMonthList.filter(item=> item.type==='income' );
    const income=incomeArr.reduce((a,c)=>{ return a+c.money},0);
    //计算支出
    const pay = currentMonthList.filter((item)=>{ return item.type==='pay' }).reduce((a,c)=>{ return a+c.money},0);
    const total=income+pay;
    return{
        income,
        pay,
        total
    }
},[currentMonthList]);

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={()=>{setDateVisible(true)}}>
            <span className="text">
              {currentDate} 账单
            </span>
            <span className={classNames('arrow',dateVisible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{monthResult.pay}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            max={new Date()}
            onClose={() => {
                setDateVisible(false)
              }}
            onConfirm={onConfirm}
          />
        </div>
      </div>
    </div >
  )
}

export default Month