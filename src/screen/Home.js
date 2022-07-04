import React from 'react';
import './dashboard.css'

import {Link} from 'react-router-dom'
import {FaUserGraduate,FaTachometerAlt,FaSignInAlt,FaHome,FaUserCircle } from 'react-icons/fa'
import { ImProfile,ImTable} from 'react-icons/im'
import {IoNotificationsCircle} from 'react-icons/io5'
const Home = () => {
  return (
    <div>
      <div className='main_left'>
        <div className='mf_content'>
          <h5>Quản lý sinh viên</h5>
        </div>
        <hr className='hr'/>
        <div id="menu">
          <ul>
            <li className='active'><div className='icon'><FaTachometerAlt size={22}/></div><Link to="/home">Quản lý</Link></li>
            <li className='li'><div className='icon'><FaUserGraduate size={22}/></div><Link to="/sinhvien">Sinh viên</Link></li>
            <li className='li'><div className='icon'><ImProfile size={22}/></div>Tiểu sử</li>
            <li className='li'><div className='icon'><ImTable size={22}/></div>Thời khóa biểu</li>
            <li className='li'><div className='icon'><FaSignInAlt size={22}/></div>Đăng xuất</li>
          </ul>
        </div>
        <div>
        </div>
      </div>
      <div className='main_right'>
        <div className='mr_top'>
          <div className='mr_top_ql'>
            <div className='top_ql_right'>
              <div className='top_ql_right_1'>
                <div className='right_1_icon'> 
                <Link  to="/"><FaHome color='silver'/></Link> 
                </div>
                <div className='right_1_text'> / Quản lý </div>
              </div>
              <div className='top_ql_right_1'>
                <h6 className='ql_h6'>Quản lý</h6>
              </div>
            </div>
            <div className='right_2_icon'>
              <div className='icon_2'>
              <h6>Hello</h6>
              </div>
              <div className='icon_2'>
                <Link to="/"><IoNotificationsCircle  color='silver' size={30} /></Link>
              </div> 
            </div>
          </div>
        </div>
        <div className=''>
        </div>
      </div>
    </div>

  );
}
export default Home;