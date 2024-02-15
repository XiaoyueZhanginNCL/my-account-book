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
const [currentDate,setCurrentDate]=useState(dayjs(new Date()).format('YYYY/MM'));

function onConfirm(date){
    setDateVisible(false);
    setCurrentDate(dayjs(date).format('YYYY/MM'));
}

const {billList} = useSelector(state=>state.bill);
const monthBillList = useMemo(()=>{
    return _.groupBy(billList,(item)=>{return dayjs(item.date).format('YYYY/MM')})
},[billList])
console.log(monthBillList);

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
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
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