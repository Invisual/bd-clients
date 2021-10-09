import React from 'react'
import { SingleMemberDiv } from '../../styles/singles'

export const SingleMonth = ({ id, name, activeMonth, changeActiveMonth }) => {
  const active = id === activeMonth ? ' active' : ''
  return (
    <SingleMemberDiv
      onClick={() => changeActiveMonth(id)}
      className={`single-card${active}`}
    >
      <div className="member-name ml5">{name}</div>
    </SingleMemberDiv>
  )
}
