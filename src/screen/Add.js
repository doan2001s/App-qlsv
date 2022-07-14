import React, { useEffect, useState } from 'react';
import './Css/Add.css'
import { FaUserGraduate, FaTachometerAlt, FaSignInAlt, } from 'react-icons/fa'
import {BsList,BsTable } from 'react-icons/bs'
import { ImProfile, } from 'react-icons/im'
import { Link } from 'react-router-dom';
import { Input, Spacer, Button, Grid, Text } from "@nextui-org/react";
import { Form } from "react-bootstrap";
import { db, storage } from './firebase';
import { collection, addDoc, getDocs, where, query,} from 'firebase/firestore';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { isEmpty } from "validator"
import { Label } from 'semantic-ui-react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
const Add = () => {
    //logout
    const handelLogOut = () => {
        localStorage.clear();
        navigate("/")
    }
    const navigate = useNavigate()
    const [masv, setMa] = useState('');
    const [ten, setTen] = useState('');
    const [email, setEmail] = useState('');
    const [trangthai, setTrangthai] = useState('');
    const [diachi, setDiachi] = useState('');
    const [khoa, setKhoa] = useState('');
    const [sdt, setSdt] = useState('');
    const [ngaysinh, setNgaysinh] = useState('');
    const [lop, setLop] = useState('');
    const [file, setFile] = useState(null);
    const [error, setErrorMsg] = useState(false)
    const [progress, setProgress] = useState(null);
    const sinhvienCollectionRel = collection(db, "sinhvien")
    const [data,setData] = useState();
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
    const createSinhvien = async (event) => {
        event.preventDefault();
        if (masv.length === 0 || ten.length === 0 || trangthai.length === 0 || diachi.length === 0 ||
            sdt.length === 0 || ngaysinh.length === 0 || khoa.length === 0 || lop.length === 0 || email.length.length === 0) {
            alert("Bạn cần phải nhập đủ dữ liệu", setErrorMsg(true))
        }
        else {
            if (masv && ten && trangthai && diachi && sdt && ngaysinh && khoa && lop && email) {
                let check = 0;
                const test = query(collection(db, "sinhvien"), where("masv", "==", masv))
                const resul = await getDocs(test)
                let checkresul;
                resul.forEach((doc) => {
                    console.log("doc", doc.data())
                    if (doc.data().masv === masv) {
                        check++;
                    }
                })
                if (check >= 1) {
                    alert("Mã sinh viên đã tồn tại");
                    checkresul = false;
                }
                else {
                    checkresul = true
                }
                if (checkresul) {
                    const add = await addDoc(sinhvienCollectionRel, { masv: masv, tensv: ten, email: email, diachi: diachi, trangthai: trangthai, sdt: sdt, ngaysinh: ngaysinh, lop: lop, khoa: khoa,...data })
                    if (add) {
                        alert("Thêm sinh viên thành công")
                        navigate("/gridview")
                    }
                }
                else {

                }
            }
        }

        // await addDoc(sinhvienCollectionRel, { masv: ma, tensv: ten, email: email, diachi: diachi, trangthai: trangthai, sdt: sdt, ngaysinh: ngaysinh, lop: lop, khoa: khoa })
    }
    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on("state_changed", (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                    switch(snapshot.state){
                        case "paused":
                            console.log("upload  is pause")
                        break ;
                        case "running":
                            console.log("upload is runing")
                        break;
                        default:
                            break;
                    }
            },(error)=>{
                console.log(error)
            },
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                setData((prev)=>({...prev,img:downloadURL}))
            })
            )
        }
        file && uploadFile()
    }, [file])
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
                        <li className='active'><div className='icon'><FaUserGraduate size={22} /></div><Link to="/sinhvien">Sinh viên</Link></li>
                        <li className='li'><div className='icon'><ImProfile size={22} /></div><Link to="/edit">Tiểu sử</Link></li>
                        {/* <li className='li'><div className='icon'><ImTable size={22} /></div>Thời khóa biểu</li> */}
                        <li className='li'><div className='icon'><FaSignInAlt size={22} /></div>
                            <button className="buttonLog" onClick={handelLogOut}>
                                Đăng xuất
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='main_right'>
                <div className='mr_top'>
                    <div className='mr_top_ql'>
                        <div className='top_ql_right'>
                            <div className='top_ql_right_1'>
                                <div className='right_1_icon'>
                                    <Link to="/sinhvien"><FaUserGraduate color='silver' /></Link>
                                </div>
                                <div className='right_1_text'> / Sinh viên </div>
                            </div>
                            <div className='top_ql_right_1'>
                                <h6 className='ql_h6'>Thêm sinh viên</h6>
                            </div>
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
                <div className={menu? "responship_menu":"responship_menu_block"}>
                    <div id="menu">
                        <ul>
                            <li className='active'><div className='icon'><FaUserGraduate size={22} /></div><Link to="/gridview">Sinh viên</Link></li>
                            <li className='li'><div className='icon'><ImProfile size={22} /></div><Link to="/profile">Tiểu sử</Link></li>
                            <li className="li"><div className="icon"><BsTable/></div>Thời khóa biểu</li>
                            {/* <li className='li'><div className='icon'><ImTable size={22} /></div>Thời khóa biểu</li> */}
                            <li className='li'><div className='icon'><FaSignInAlt size={22} /></div>
                                <button className="buttonLog" onClick={handelLogOut}>
                                    Đăng xuất
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mr_mid">
                    <div>
                        <h4>Thêm sinh viên</h4>
                    </div>
                    <div>
                        {/* <Link to="/add" ><MdPersonAdd size={40} color="Silver"/></Link> */}
                    </div>
                </div>
                <div className="list_add">
                    <Form className='form_textt' style={{zIndex:0,}} onSubmit={createSinhvien}>
                        <Spacer y={2} />
                        <div className='form_container'>
                            <div className='div_input'>
                                <Input color={colorInput.masv} clearable bordered labelPlaceholder="Mã sinh viên" type="number" required
                                    // onChange={(event) => { setMa(event.target.value); }}
                                    onChange={handleMa}
                                />
                                <Text color="error"> {errorMessage.masv} </Text>
                                <Spacer y={2} />
                                <Input color={colorInput.ten} required clearable bordered labelPlaceholder="Họ và tên" style={{ textTransform: 'capitalize' }}
                                    // onChange={(event) => { setTen(event.target.value); }}
                                    onChange={handleTen}
                                />
                                <Text color="error"> {errorMessage.ten} </Text>
                                <Spacer y={2} />
                                <label>Ngày sinh</label>
                                <Input color={colorInput.ngaysinh} clearable bordered required
                                    onChange={handleNgaysinh}
                                    // onChange={(event) => { setNgaysinh(event.target.value); }}
                                    type="date" />
                                <Text color="error"> {errorMessage.ngaysinh}</Text>
                            </div>
                            <Spacer y={2} />
                            <div className='div_input'>
                                <Input color={colorInput.email} clearable bordered labelPlaceholder="Email" type="email" required
                                    // onChange={(event) => { setEmail(event.target.value); }}
                                    onChange={handleEmail}
                                />
                                <Text color="error">{errorMessage.email}</Text>
                                <Spacer y={2} />
                                <Input color={colorInput.sdt} clearable bordered labelPlaceholder="Số điện thoại" required
                                    onChange={handleSdt}
                                // onChange={(event) => { setSdt(event.target.value); }}
                                />
                                <Text color="error">{errorMessage.sdt}</Text>
                                <Spacer y={2} />
                                <Input color={colorInput.diachi} clearable bordered labelPlaceholder="Địa chỉ" style={{ textTransform: 'capitalize' }} required
                                    // onChange={(event) => { setDiachi(event.target.value); }}
                                    onChange={handleDiachi}
                                />
                                <Text color="error">{errorMessage.diachi}</Text>
                            </div>
                            <Spacer y={2} />
                            <div className='div_input'>
                                <Input color={colorInput.lop} clearable bordered labelPlaceholder="Lớp" style={{ textTransform: 'uppercase' }} required
                                    // onChange={(event) => { setLop(event.target.value); }}
                                    onChange={handleLop}
                                />
                                <Text color="error">{errorMessage.lop}</Text>
                                <Spacer y={2} />
                                <Input color={colorInput.khoa} clearable bordered labelPlaceholder="Khoa" style={{ textTransform: 'uppercase' }} required
                                    // onChange={(event) => { setKhoa(event.target.value); }}
                                    onChange={handleKhoa}
                                />
                                <Text color='error'>{errorMessage.khoa}</Text>
                                <Spacer y={2} />
                                <Input color={colorInput.trangthai} clearable bordered labelPlaceholder="Trạng thái" required
                                    // onChange={(event) => { setTrangthai(event.target.value); }}
                                    onChange={handleTrangthai}
                                />
                                <Text color='error'>{errorMessage.trangthai}</Text>
                                <Spacer y={1.5} />
                                <Label>Ảnh đại diện:</Label>
                                <input Label="Upload" type="file" onChange={(e) => setFile(e.target.files[0])} />
                            </div>
                        </div>
                        <Spacer y={1} />
                        <Grid className='div_button' >
                            <Button className='button' type='submit'>
                                Thêm sinh viên
                            </Button>
                            <Button className='button' type='reset'>
                                Làm mới
                            </Button>
                        </Grid>

                    </Form>
                </div>
            </div>
        </div>

    )
}
export default Add;