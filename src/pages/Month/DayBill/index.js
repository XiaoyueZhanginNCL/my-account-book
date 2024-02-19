import classNames from 'classnames'
import './index.scss'
import { useMemo } from 'react';

const DailyBill = ({date,billList}) => {
  //每日统计区域计算
const dayResult=useMemo(()=>{
  //计算收入
  const income = billList.filter(item=> item.type==='income' ).reduce((a,c)=>{ return a+c.money},0);
  //计算支出
  const pay = billList.filter((item)=>{ return item.type==='pay' }).reduce((a,c)=>{ return a+c.money},0);
  const total=income+pay;
  return{
      income,
      pay,
      total
  }
},[billList]);


  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames('arrow')}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dayResult.pay}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dayResult.income}</span>
          </div>
          <div className="balance">
            <span className="money">{dayResult.total}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DailyBill