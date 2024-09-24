import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header(props) {
  return (
    <div>
    <NavLink to="/home">HOME</NavLink>
    
    <NavLink to="/contact">contacts</NavLink>
    <NavLink to="/about">About</NavLink><br/>
    <span>Cryptop : {props.currentPage}</span>
</div>

  )
}

