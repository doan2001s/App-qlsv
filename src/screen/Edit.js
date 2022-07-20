import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { BsList, BsTable } from 'react-icons/bs'
import { FaUserGraduate, FaSignInAlt } from 'react-icons/fa'
import { Link, } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import { Form } from "react-bootstrap";
import { isEmpty } from 'validator'
import { Input, Spacer, Button, Grid, Text } from "@nextui-org/react";
import './Css/Edit.css'
import { ImProfile } from "react-icons/im"
import Avatar from 'react-avatar';
const Edit = () => {
    const handelLogOut = () => {
        localStorage.clear();
        navigate("/")
    }
    const [error, setErrorMsg] = useState(false)
    const [masv, setMa] = useState('');
    const [tensv, setTen] = useState('');
    const [email, setEmail] = useState('');
    const [trangthai, setTrangthai] = useState('');
    const [diachi, setDiachi] = useState('');
    const [khoa, setKhoa] = useState('');
    const [sdt, setSdt] = useState('');
    const [ngaysinh, setNgaysinh] = useState('');
    const [lop, setLop] = useState('');
    const [img, setImg] = useState('');
    const [errorMessage, setErrorMessage] = useState({
        masv: '',
        ten: '',
        email: '',
        trangthai: '',
        diachi: '',
        khoa: '',
        sdt: '',
        ngaysinh: '',
        lop: '',
    });
    const [colorInput, setColorInput] = useState({
        masv: '',
        ten: '',
        email: '',
        trangthai: '',
        diachi: '',
        khoa: '',
        sdt: '',
        ngaysinh: '',
        lop: '',
    });
    const handleMa = (event) => {
        setMa(event.target.value)
        if (isEmpty(event.target.value.trim())) {
            setErrorMessage({ masv: "Hãy nhập mã sinh viên!" })
            setColorInput({ masv: 'error' });
        } else {
            setErrorMessage({ masv: "" });
            setColorInput({ masv: 'default' });
        }
    }
    const handleTen = (event) => {
        setTen(event.target.value)
        if (isEmpty(event.target.value.trim())) {
            setErrorMessage({ ten: "Hãy nhập tên sinh viên!" })
            setColorInput({ ten: 'error' });
        } else {
            setErrorMessage({ ten: "" });
            setColorInput({ ten: 'default' });
        }
    }
    const handleNgaysinh = (event) => {
        setNgaysinh(event.target.value)
        if (isEmpty(event.target.value.trim())) {
            setErrorMessage({ ngaysinh: "Hãy nhập tên sinh viên!" })
            setColorInput({ ngaysinh: 'error' });
        } else {
            setErrorMessage({ ngaysinh: "" });
            setColorInput({ ngaysinh: 'default' });
        }
    }
    const handleEmail = (event) => {
        setEmail(event.target.value)
        const ergx = /[a-zA-Z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
        if (ergx.test(email)) {
            setErrorMessage({ email: "Email hop le" })
            setColorInput({ email: 'error' });
        } else if (!ergx.test(email) && email !== "") {
            setErrorMessage({ email: "Email của bạn phải có kiểu doan@gmail.com!" });
            setColorInput({ email: 'error' });
        }
    }
    const handleSdt = (event) => {
        setSdt(event.target.value)
        if (isEmpty(event.target.value.trim())) {
            setErrorMessage({ sdt: "Hãy nhập số điện thoại!" })
            setColorInput({ sdt: 'error' });
        } else {
            setErrorMessage({ sdt: "" });
            setColorInput({ sdt: 'default' });
        }
    }
    const handleDiachi = (event) => {
        setDiachi(event.target.value)
        if (isEmpty(event.target.value.trim())) {
            setErrorMessage({ diachi: "Hãy nhập số điện thoại!" })
            setColorInput({ diachi: 'error' });
        } else {
            setErrorMessage({ diachi: "" });
            setColorInput({ diachi: 'default' });
        }
    }
    const handleLop = (event) => {
        setLop(event.target.value)
        if (isEmpty(event.target.value.trim())) {
            setErrorMessage({ lop: "Hãy nhập số điện thoại!" })
            setColorInput({ lop: 'error' });
        } else {
            setErrorMessage({ lop: "" });
            setColorInput({ lop: 'default' });
        }
    }
    const handleKhoa = (event) => {
        setKhoa(event.target.value)
        if (isEmpty(event.target.value.trim())) {
            setErrorMessage({ khoa: "Hãy nhập số điện thoại!" })
            setColorInput({ khoa: 'error' });
        } else {
            setErrorMessage({ khoa: "" });
            setColorInput({ khoa: 'default' });
        }

    }
    const handleTrangthai = (event) => {
        setTrangthai(event.target.value)
        if (isEmpty(event.target.value.trim())) {
            setErrorMessage({ trangthai: "Hãy nhập số điện thoại!" })
            setColorInput({ trangthai: 'error' });
        } else {
            setErrorMessage({ trangthai: "" });
            setColorInput({ trangthai: 'default' });
        }
    }
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
                        if (masv.length === 0 || tensv.length === 0 || trangthai.length === 0 || diachi.length === 0 ||
                            sdt.length === 0 || ngaysinh.length === 0 || khoa.length === 0 || lop.length === 0 || email.length.length === 0) {
                            alert("Bạn cần phải nhập đủ dữ liệu", setErrorMsg(true))
                        }
                        else {
                            const sinhvien = doc(db, "sinhvien", id)
                            const data = { masv: masv, tensv: tensv, email: email, diachi: diachi, trangthai: trangthai, sdt: sdt, ngaysinh: ngaysinh, lop: lop, khoa: khoa }
                            updateDoc(sinhvien, data)
                            navigate("/gridview")
                            alert("Cập nhật thành công")
                        }

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
            setSdt(sinhvien.data().sdt)
            setImg(sinhvien.data().img)
        } else {

        }
    }

    useEffect(() => {
        getSinhvien(id)
    }, [])
    const [menu, setMenu] = useState(false);
    const showMenu = () => {
        setMenu(!menu)
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
                        <Link className="a" to="/sinhvien"><li className='active'><div className='icon'><FaUserGraduate size={22} /></div>Sinh viên</li></Link>
                        <Link className="a" to="/profile"><li className='li'><div className='icon'><ImProfile size={22} /></div>Tiểu sử</li></Link>
                        {/* <li className='li'><div className='icon'><ImTable size={22} /></div>Thời khóa biểu</li> */}
                        <button className="buttonLog" onClick={handelLogOut}>
                            <li className='li'><div className='icon'><FaSignInAlt size={22} /></div>
                                Đăng xuất
                            </li>
                        </button>
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
                        <div className="menu_show">
                            <BsList size={25} onClick={showMenu} />
                        </div>
                        <div className='right_2_icon'>
                            <div className='icon_2'>
                                <h6>Hello, {localStorage.getItem("email")}</h6>
                            </div>
                            {/* <div className='icon_2'>
                <Link to="/"><IoNotificationsCircle color='silver' size={30} /></Link>
              </div> */}
                        </div>
                    </div>
                </div>
                <div className={menu ? "responship_menu" : "responship_menu_block"}>
                    <div id="menu">
                        <ul>
                            <Link className="a" to="/sinhvien"><li className='active'><div className='icon'><FaUserGraduate size={22} /></div>Sinh viên</li></Link>
                            <Link className="a" to="/profile"><li className='li'><div className='icon'><ImProfile size={22} /></div>Tiểu sử</li></Link>
                            {/* <li className='li'><div className='icon'><ImTable size={22} /></div>Thời khóa biểu</li> */}
                            <button className="buttonLog" onClick={handelLogOut}>
                                <li className='li'><div className='icon'><FaSignInAlt size={22} /></div>
                                    Đăng xuất
                                </li>
                            </button>
                        </ul>
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
                <div className="container_detailSV1">
                    <div className="detailSV1_img">
                        <Avatar
                            size={150}
                            src={img} />
                    </div>
                    <div>
                        <Form >
                            <Spacer y={2} />
                            <div className='form_container2'>
                                <div className='div_input1'>
                                    <Input clearable bordered labelPlaceholder="Mã sinh viên" type="text" disabled
                                        value={masv} />
                                    <Spacer y={2} />
                                    <Input color={colorInput.email} required clearable bordered labelPlaceholder="Email" type="email" style={{ textTransform: 'lowercase' }}
                                        onChange={handleEmail} value={email} />
                                    <Text>{errorMessage.email}</Text>
                                    <Spacer y={2} />
                                    <Input color={colorInput.ten} clearable bordered labelPlaceholder="Họ và tên" required style={{ textTransform: 'capitalize' }}
                                        onChange={handleTen} value={tensv} />
                                    <Text>{errorMessage.ten}</Text>
                                    <Spacer y={2} />

                                </div>
                                <div className='div_input1'>
                                    <Input color={colorInput.ngaysinh} clearable bordered labelPlaceholder="Ngày sinh" required
                                        onChange={handleNgaysinh} value={ngaysinh} type="date" />
                                    <Text>{errorMessage.ngaysinh}</Text>
                                    <Spacer y={2} />
                                    <Input color={colorInput.diachi} clearable bordered labelPlaceholder="Địa chỉ" required style={{ textTransform: 'capitalize' }}
                                        onChange={handleDiachi} value={diachi} />
                                    <Text>{errorMessage.diachi}</Text>
                                    <Spacer y={2} />
                                    <Input color={colorInput.khoa} clearable bordered labelPlaceholder="Khoa" required style={{ textTransform: 'uppercase' }}
                                        onChange={handleKhoa} value={khoa} />
                                    <Text>{errorMessage.khoa}</Text>
                                    <Spacer y={2} />
                                </div>
                                <div className='div_input1'>
                                    <Input color={colorInput.lop} clearable bordered labelPlaceholder="Lớp" required style={{ textTransform: 'uppercase' }}
                                        onChange={handleLop} value={lop} />
                                    <Text>{errorMessage.lop}</Text>
                                    <Spacer y={2} />
                                    <Input color={colorInput.trangthai} required clearable bordered labelPlaceholder="Trạng thái"
                                        onChange={handleTrangthai} value={trangthai} />
                                    <Text>{errorMessage.trangthai}</Text>
                                    <Spacer y={2} />
                                    <Input color={colorInput.sdt} clearable bordered labelPlaceholder="Số điện thoại" required
                                        onChange={handleSdt} value={sdt} />
                                    <Text>{errorMessage.sdt}</Text>
                                    <Spacer y={2} />
                                </div>
                            </div>
                            <Spacer y={1} />
                            <Grid className='div_button' >
                                <Button className='button' onClick={Edit}>
                                    Sửa thông tin
                                </Button>
                                {/* <Button className='button' type='reset'>
                                    Làm mới
                                </Button> */}
                            </Grid>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Edit