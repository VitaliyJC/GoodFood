import './Like.scss'
import { useState } from 'react'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/UserContext'

const Like = () => {
  const { user } = useContext(AuthContext)
  const [activeState, setActiveState] = useState(false)
  const state = () => {
    setActiveState(!activeState)
  }
  return (
    <button
      className={
        !user?.email
          ? 'like like--disabled'
          : `${activeState ? 'like like--active' : 'like'}`
      }
      onClick={() => state()}
    >
      <svg
        className='like__icon'
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M4.66683 14.6667H2.66683C2.31321 14.6667 1.97407 14.5262 1.72402 14.2762C1.47397 14.0261 1.3335 13.687 1.3335 13.3334V8.66671C1.3335 8.31309 1.47397 7.97395 1.72402 7.7239C1.97407 7.47385 2.31321 7.33337 2.66683 7.33337H4.66683M9.3335 6.00004V3.33337C9.3335 2.80294 9.12278 2.29423 8.74771 1.91916C8.37264 1.54409 7.86393 1.33337 7.3335 1.33337L4.66683 7.33337V14.6667H12.1868C12.5084 14.6703 12.8204 14.5576 13.0654 14.3494C13.3105 14.1411 13.4719 13.8513 13.5202 13.5334L14.4402 7.53337C14.4692 7.34228 14.4563 7.14716 14.4024 6.96154C14.3485 6.77592 14.2549 6.60424 14.1281 6.45838C14.0012 6.31253 13.8442 6.196 13.6679 6.11685C13.4915 6.03771 13.3001 5.99785 13.1068 6.00004H9.3335Z'
          // stroke='#7F8999'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </button>
  )
}

export default Like
