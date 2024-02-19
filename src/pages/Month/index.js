import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useState,useMemo, useEffect } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import DailyBill from './DayBill'

const Month = () => {

//控制时间选择器的弹出
const [dateVisible,setDateVisible]=useState(false);

//在时间选择器上点击的内容
const [currentDate,setCurrentDate]=useState(()=>{ return dayjs(new Date()).format('YYYY-MM')});

const {billList} = useSelector(state=>state.bill);

//billList按月分组
const monthBillList = useMemo(()=>{
    return _.groupBy(billList,(item)=>{return dayjs(item.date).format('YYYY-MM')})
},[billList])

//monthBillList中选择的月份的数据
const [currentMonthList,setCurrentMonthList]=useState([]);

//按日分组
const dayBillList = useMemo(()=>{
  const dayList=_.groupBy(currentMonthList,(item)=>{return dayjs(item.date).format('YYYY-MM-DD')})
  const keys=Object.keys(dayList);
  return {
    keys,
    dayList
  }
},[currentMonthList])


//点击确认
function onConfirm(date){
    setDateVisible(false);
    const formatDate=dayjs(date).format('YYYY-MM')
    setCurrentDate(formatDate);
    setCurrentMonthList(monthBillList[formatDate]);
    
}

//月度统计区域的数值计算
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

//初始化的时候把当前月份的数据渲染出来
useEffect(()=>{
    const nowDate=dayjs().format('YYYY-MM');
    if(monthBillList[nowDate]){//因为monthBillList的值根据billList，而billList获取数据的请求是异步的，所以初次渲染时billList为undefined，需要加条件判断，只有当获取到数据时才进行更新
      setCurrentMonthList(monthBillList[nowDate]);
    }
},[monthBillList])


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
        {dayBillList.keys.map((key)=>{
          return <DailyBill key={key} date={key} billList={dayBillList.dayList[key]}/>
        })}
      </div>
    </div >
  )
}

export default Month