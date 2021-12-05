import React from 'react'
import "../Style/Forloop.css"
export default function Forloop (props) {
    const creepers = [];

    for (let i = 0; i < props.creep; i++) {
        creepers.push(<img src='../../public/assets/images/dirt.jpg' key={i} alt='creeper' className='creeper'></img>)
    }
    return(
        <div>{creepers}</div>
        )
}