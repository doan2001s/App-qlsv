import React from "react";
import { FaUserGraduate, FaTachometerAlt, FaSignInAlt } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { AiFillPhone } from 'react-icons/ai'
import { IoMail } from 'react-icons/io5'
import { Link, useNavigate } from "react-router-dom";
import "./profile.css"
import { Avatar } from '@nextui-org/react'

const Profile = () => {
    const navigate = useNavigate()
    const handelLogOut = () => {
        localStorage.clear();
        navigate("/")
    }
    return (
        <div className="body">
            <div className='main_left'>
                <div className='mf_content'>
                    <h5>Quản lý sinh viên</h5>
                </div>
                <hr className='hr' />
                <div id="menu">
                    <ul>
                        <li className='li'><div className='icon'><FaTachometerAlt size={22} /></div><Link to="/home">Quản lý</Link></li>
                        <li className='li'><div className='icon'><FaUserGraduate size={22} /></div><Link to="/sinhvien">Sinh viên</Link></li>
                        <li className='active'><div className='icon'><ImProfile size={22} /></div><Link to="/profile">Tiểu sử</Link></li>
                        {/* <li className='li'><div className='icon'><ImTable size={22} /></div>Thời khóa biểu</li> */}
                        <li className='li'><div className='icon'><FaSignInAlt size={22} /></div>Đăng xuất</li>
                    </ul>
                </div>
            </div>
            <div className='main_right'>
                <div className='mr_top'>
                    <div className='mr_top_ql'>
                        <div className='top_ql_right'>
                            <div className='top_ql_right_1'>
                                <div className='right_1_icon'>
                                    <Link to="/"><FaUserGraduate color='silver' /></Link>
                                </div>
                                <div className='right_1_text'> / Tiểu sử </div>
                            </div>
                            <div className='top_ql_right_1'>
                                <h6 className='ql_h6'>Tiểu sử</h6>
                            </div>
                        </div>
                        <div className='right_2_icon'>
                            <div className='icon_2'>
                                <h6>Hello, {localStorage.getItem("email")}</h6>
                                {/* <Link to="/"><FaUserCircle color='silver' size={25} /></Link> */}
                            </div>
                            {/* <div className='icon_2'>
                  <Link to="/"><IoNotificationsCircle color='silver' size={30} /></Link>
                </div> */}
                        </div>
                    </div>
                </div>
                <div className="mr_content">
                    <div className="content_left">
                        <div className="content_detail">
                            <div className="img_detail">
                                <div className="img">
                                    <Avatar
                                        size="xl"
                                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                        color="gradient"
                                        bordered
                                    />
                                </div>
                            </div>
                            <div className="detail">
                                <h6>Xin chào,</h6>
                                <strong>Nguyen Dinh Doan</strong>
                                <br />
                                <div className="detail_icon">
                                    <AiFillPhone color="blue" size={20} />
                                    <p>
                                        0123456789
                                    </p>
                                </div>
                                <div className="detail_icon">
                                    <IoMail color="blue" size={20} /><p>
                                        doan9908@gmail.com
                                    </p>
                                </div>
                            </div>
                        </div>

                        <hr />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profile;