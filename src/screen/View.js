import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { getDoc, doc,} from 'firebase/firestore'
import { FaUserGraduate, FaTachometerAlt, FaSignInAlt } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { Link, } from "react-router-dom";
import './Css/View.css'

const View = () => {
    //logout
    const handelLogOut = () => {
        localStorage.clear();
        navigate("/")
    }
    const [masv, setMa] = useState('');
    const [tensv, setTen] = useState('');
    const [email, setEmail] = useState('');
    const [trangthai, setTrangthai] = useState('');
    const [diachi, setDiachi] = useState('');
    const [khoa, setKhoa] = useState('');
    const [sdt, setSdt] = useState('');
    const [ngaysinh, setNgaysinh] = useState('');
    const [lop, setLop] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    // const view = async (e) => {
    //     e.preventDefault();
    //     const sinhvien = doc(db, "sinhvien", id)
    //     const data = { masv: masv, tensv: tensv, email: email, diachi: diachi, trangthai: trangthai, sdt: sdt, ngaysinh: ngaysinh, lop: lop, khoa: khoa }
    //     updateDoc(sinhvien, data)
    // }
    const getSinhvien = async (id) => {
        const sinhvien = await getDoc(doc(db, "sinhvien", id))
        if (sinhvien.exists()) {
            setMa(sinhvien.data().masv)
            setTen(sinhvien.data().tensv)
            setKhoa(sinhvien.data().khoa)
            setTrangthai(sinhvien.data().trangthai)
            setEmail(sinhvien.data().email)
            setDiachi(sinhvien.data().diachi)
            setLop(sinhvien.data().lop)
            setNgaysinh(sinhvien.data().ngaysinh)
            setSdt(sinhvien.data().sdt)
        } else {

        }
    }

    useEffect(() => {
        getSinhvien(id)
    }, [])
    return (
        <div className="body">
            <div className='main_left'>
                <div className='mf_content'>
                    <h5>Quản lý sinh viên</h5>
                </div>
                <hr className='hr' />
                <div id="menu">
                    <ul>
                        <li className='active'><div className='icon'><FaUserGraduate size={22} /></div><Link to="/sinhvien">Sinh viên</Link></li>
                        <li className='li'><div className='icon'><ImProfile size={22} /></div><Link to="/profile">Tiểu sử</Link></li>
                        {/* <li className='li'><div className='icon'><ImTable size={22} /></div>Thời khóa biểu</li> */}
                        <li className='li'><div className='icon'><FaSignInAlt size={22} /></div>
                            <button className="buttonLog" onClick={handelLogOut}>
                                Đăng xuất
                            </button></li>
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
                                <div className='right_1_text'> / Sinh viên </div>
                            </div>
                            {/* <div className='top_ql_right_1'>
                                <h6 className='ql_h6'>Sinh viên</h6>
                            </div> */}
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
                <div className="mr_mid2">
                    <div>
                        <h4>Thông tin sinh viên</h4>
                    </div>
                    <div className="detail_name">
                        <h4>{tensv}</h4>
                    </div>
                </div>
                <div className="container_detailSV">
                    <div>
                        <strong>Mã sinh viên: </strong>
                        <span>{masv}</span>
                        <br />
                        <br />
                        <strong>Ngày sinh: </strong>
                        <span>{ngaysinh}</span>
                        <br />
                        <br />
                        <strong>Khoa: </strong>
                        <span>{khoa}</span>
                        <br />
                        <br />
                        <strong>Lớp: </strong>
                        <span>{lop}</span>
                        <br />
                        <br />
                        <strong>Email: </strong>
                        <span>{email}</span>
                        <br />
                        <br />
                        <strong>Nơi sinh: </strong>
                        <span>{diachi}</span>
                        <br />
                        <br />
                        <strong>Trạng thái: </strong>
                        <span style={{ color: 'red' }}>{trangthai}</span>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default View