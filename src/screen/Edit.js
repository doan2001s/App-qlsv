import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { FaUserGraduate, FaTachometerAlt, FaSignInAlt } from 'react-icons/fa'
import { Link, } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import { Form } from "react-bootstrap";
import { Input, Spacer, Button, Grid } from "@nextui-org/react";
import './Edit.css'


const Edit = () => {
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
    const Edit = async (e) => {
        confirmAlert({
            title: 'Xác nhận sửa thông tin ',
            message: 'Bạn có chắc chắn muốn sửa thông tin sinh viên này không ?',
            buttons: [
              {
                label: 'Có',
                onClick: async () => {
                    const sinhvien = doc(db, "sinhvien", id)
                    const data = { masv: masv, tensv: tensv, email: email, diachi: diachi, trangthai: trangthai, sdt: sdt, ngaysinh: ngaysinh, lop: lop, khoa: khoa }
                    updateDoc(sinhvien, data)
                }
              },
              {
                label: 'Không',
                onClick: () => true
              }
            ]
          })
        // e.preventDefault();
        // const sinhvien = doc(db, "sinhvien", id)
        // const data = { masv: masv, tensv: tensv, email: email, diachi: diachi, trangthai: trangthai, sdt: sdt, ngaysinh: ngaysinh, lop: lop, khoa: khoa }
        // updateDoc(sinhvien, data)
    }
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
                        <li className='li'><div className='icon'><FaTachometerAlt size={22} /></div><Link to="/home">Quản lý</Link></li>
                        <li className='active'><div className='icon'><FaUserGraduate size={22} /></div><Link to="/sinhvien">Sinh viên</Link></li>
                        {/* <li className='li'><div className='icon'><ImProfile size={22} /></div><Link to="/edit">Tiểu sử</Link></li>
                        <li className='li'><div className='icon'><ImTable size={22} /></div>Thời khóa biểu</li> */}
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
                        <h4>Sửa thông tin sinh viên</h4>
                    </div>
                    <div className="detail_name">
                        <h4>{tensv}</h4>
                    </div>
                </div>
                <div className="container_detailSV">
                    <div>
                        <Form >
                            <Spacer y={2} />
                            <div className='form_container'>
                                <div className='div_input'>
                                    <Input clearable bordered labelPlaceholder="Email" type="email"
                                        onChange={(event) => { setEmail(event.target.value); }} value={email} />
                                    <Spacer y={2} />
                                    <Input clearable bordered labelPlaceholder="Họ và tên" style={{ textTransform: 'capitalize' }}
                                        onChange={(event) => { setTen(event.target.value); }} value={tensv} />
                                    <Spacer y={2} />
                                    <Input clearable bordered labelPlaceholder="Ngày sinh"
                                        onChange={(event) => { setNgaysinh(event.target.value); }} value={ngaysinh} />

                                </div>
                                <div className='div_input'>
                                    <Input clearable bordered labelPlaceholder="Địa chỉ" style={{ textTransform: 'capitalize' }}
                                        onChange={(event) => { setDiachi(event.target.value); }} value={diachi} />
                                    <Spacer y={2} />
                                    <Input clearable bordered labelPlaceholder="Khoa" style={{ textTransform: 'uppercase' }}
                                        onChange={(event) => { setKhoa(event.target.value); }} value={khoa} />
                                       <Spacer y={2} />
                                    <Input clearable bordered labelPlaceholder="Lớp" style={{ textTransform: 'uppercase' }}
                                        onChange={(event) => { setLop(event.target.value); }} value={lop} />

                                </div>
                                <div className='div_input2'>
                                    <Input clearable bordered labelPlaceholder="Trạng thái"
                                        onChange={(event) => { setTrangthai(event.target.value); }} value={trangthai} />
                                    <Spacer y={2} />
                                </div>
                            </div>
                            <Spacer y={1} />
                            <Grid className='div_button' >
                                <Button className='button' onClick={Edit}>
                                    Sửa thông tin
                                </Button>
                                <Button className='button' type='reset'>
                                    Làm mới
                                </Button>
                            </Grid>

                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Edit