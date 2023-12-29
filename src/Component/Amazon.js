import React from 'react'
import './Amazon.css'
import list from '../Data'
import Card from './Card'
// 

const Amazon = ({ handleClick }) => {
    return (
        <section>
            {
                list.map((item) => (
                    <Card item={item} key={item.id} handleClick={handleClick} />
                    // ,
                    // console.log(item)           geting all the items based on index

                ))
            }
        </section>
    )
}

export default Amazon
