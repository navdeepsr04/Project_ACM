import React from 'react'
import './Popular.css'
import Pop_women from '../Assets/data'
import {Items} from '../Items/Items'

export const Popular = () => {
  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className="popular-items">
          {Pop_women.map((item, i) => {
            return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          } )}
        </div>
    </div>
  )
}
