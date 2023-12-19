import React from 'react'
import './index.less'
import {FieldTimeOutlined} from '@ant-design/icons'
interface ItemProps{
    backgroundColor:string,
    reverseNum:number|string,
    reverseText:string,
    updateTime:string
}

const DataItem:React.FC<ItemProps>=(props)=>{
  const {backgroundColor,reverseNum,reverseText,updateTime} = props
  return (
    <div className='data-item' style={{background:backgroundColor}}>
        <div className="number">
            <div className="left">
                <span className='num'>{reverseNum}</span>
                <span className='text'>{reverseText}</span>
            </div>
            <div className="right" id='right'></div>
        </div>
        <div className="update-time">
        <FieldTimeOutlined style={{fontSize:'20px',marginRight:'10px'}}/>
        <span>update time: {updateTime}</span>
        </div>
    </div>
  )
}

export default DataItem