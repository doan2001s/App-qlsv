import React, { useEffect, useState } from 'react';
import './Css/Add.css'
import { FaUserGraduate, FaTachometerAlt, FaSignInAlt, } from 'react-icons/fa'
import { BsList, BsTable } from 'react-icons/bs'
import { ImProfile, } from 'react-icons/im'
import { Link } from 'react-router-dom';
import { Input, Spacer, Button, Grid, Text } from "@nextui-org/react";
import { Form } from "react-bootstrap";
import { db, storage } from './firebase';
import { collection, addDoc, getDocs, where, query, } from 'firebase/firestore';
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
    const [data, setData] = useState();
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
            setErrorMessage({ masv: "H??y nh???p m?? sinh vi??n!" })
            setColorInput({ masv: 'error' });
        } else {
            setErrorMessage({ masv: "" });
            setColorInput({ masv: 'default' });
        }
    }
    const handleTen = (event) => {
        setTen(event.target.value)
        if (isEmpty(event.target.value.trim())) {
            setErrorMessage({ ten: "H??y nh???p t??n sinh vi??n!" })
            setColorInput({ ten: 'error' });
        } else {
            setErrorMessage({ ten: "" });
            setColorInput({ ten: 'default' });
        }
    }
    const handleNgaysinh = (event) => {
        setNgaysinh(event.target.value)
        if (isEmpty(event.target.value.trim())) {
            setErrorMessage({ ngaysinh: "H??y nh???p t??n sinh vi??n!" })
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
            setErrorMessage({ email: "" })
            setColorInput({ email: 'error' });
        } else if (!ergx.test(email) && email !== "") {
            setErrorMessage({ email: "Email c???a b???n ph???i c?? ki???u doan@gmail.com!" });
            setColorInput({ email: 'error' });
        }
    }
    const handleSdt = (event) => {
        setSdt(event.target.value)
        if (isEmpty(event.target.value.trim())) {
            setErrorMessage({ sdt: "H??y nh???p s??? ??i???n tho???i!" })
            setColorInput({ sdt: 'error' });
        } else {
            setErrorMessage({ sdt: "" });
            setColorInput({ sdt: 'default' });
        }
    }
    const handleDiachi = (event) => {
        setDiachi(event.target.value)
        if (isEmpty(event.target.value.trim())) {
            setErrorMessage({ diachi: "H??y nh???p s??? ??i???n tho???i!" })
            setColorInput({ diachi: 'error' });
        } else {
            setErrorMessage({ diachi: "" });
            setColorInput({ diachi: 'default' });
        }
    }
    const handleLop = (event) => {
        setLop(event.target.value)
        if (isEmpty(event.target.value.trim())) {
            setErrorMessage({ lop: "H??y nh???p s??? ??i???n tho???i!" })
            setColorInput({ lop: 'error' });
        } else {
            setErrorMessage({ lop: "" });
            setColorInput({ lop: 'default' });
        }
    }
    const handleKhoa = (event) => {
        setKhoa(event.target.value)
        if (isEmpty(event.target.value.trim())) {
            setErrorMessage({ khoa: "H??y nh???p s??? ??i???n tho???i!" })
            setColorInput({ khoa: 'error' });
        } else {
            setErrorMessage({ khoa: "" });
            setColorInput({ khoa: 'default' });
        }

    }
    const handleTrangthai = (event) => {
        setTrangthai(event.target.value)
        if (isEmpty(event.target.value.trim())) {
            setErrorMessage({ trangthai: "H??y nh???p s??? ??i???n tho???i!" })
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
            alert("B???n c???n ph???i nh???p ????? d??? li???u", setErrorMsg(true))
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
                    alert("M?? sinh vi??n ???? t???n t???i");
                    checkresul = false;
                }
                else {
                    checkresul = true
                }
                if (checkresul) {
                    const add = await addDoc(sinhvienCollectionRel, { masv: masv, tensv: ten, email: email, diachi: diachi, trangthai: trangthai, sdt: sdt, ngaysinh: ngaysinh, lop: lop, khoa: khoa, ...data })
                    if (add) {
                        alert("Th??m sinh vi??n th??nh c??ng")
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
                switch (snapshot.state) {
                    case "paused":
                        console.log("upload  is pause")
                        break;
                    case "running":
                        console.log("upload is runing")
                        break;
                    default:
                        break;
                }
            }, (error) => {
                console.log(error)
            },
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setData((prev) => ({ ...prev, img: downloadURL }))
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
                    <h5>Qu???n l?? sinh vi??n</h5>
                </div>
                <hr className='hr' />
                <div id="menu">
                    <ul>
                        <Link className="a" to="/sinhvien"><li className='active'><div className='icon'><FaUserGraduate size={22} /></div>Sinh vi??n</li></Link>
                        <Link className="a" to="/profile"><li className='li'><div className='icon'><ImProfile size={22} /></div>Ti???u s???</li></Link>
                        {/* <li className='li'><div className='icon'><ImTable size={22} /></div>Th???i kh??a bi???u</li> */}
                        <button className="buttonLog" onClick={handelLogOut}>
                            <li className='li'><div className='icon'><FaSignInAlt size={22} /></div>
                                ????ng xu???t
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
                                    <Link to="/sinhvien"><FaUserGraduate color='silver' /></Link>
                                </div>
                                <div className='right_1_text'> / Sinh vi??n </div>
                            </div>
                            <div className='top_ql_right_1'>
                                <h6 className='ql_h6'>Th??m sinh vi??n</h6>
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
                <div className={menu ? "responship_menu" : "responship_menu_block"}>
                    <div id="menu">
                        <ul>
                            <Link className="a" to="/sinhvien"><li className='active'><div className='icon'><FaUserGraduate size={22} /></div>Sinh vi??n</li></Link>
                            <Link className="a" to="/profile"><li className='li'><div className='icon'><ImProfile size={22} /></div>Ti???u s???</li></Link>
                            {/* <li className='li'><div className='icon'><ImTable size={22} /></div>Th???i kh??a bi???u</li> */}
                            <button className="buttonLog" onClick={handelLogOut}>
                                <li className='li'><div className='icon'><FaSignInAlt size={22} /></div>
                                    ????ng xu???t
                                </li>
                            </button>
                        </ul>
                    </div>
                </div>
                <div className="mr_mid">
                    <div>
                        <h4>Th??m sinh vi??n</h4>
                    </div>
                    <div>
                        {/* <Link to="/add" ><MdPersonAdd size={40} color="Silver"/></Link> */}
                    </div>
                </div>
                <div className="list_add">
                    <Form className='form_textt' style={{ zIndex: 0, }} onSubmit={createSinhvien}>
                        <Spacer y={2} />
                        <div className='form_container'>
                            <div className='div_input'>
                                <Input color={colorInput.masv} clearable bordered labelPlaceholder="M?? sinh vi??n" type="number" required
                                    // onChange={(event) => { setMa(event.target.value); }}
                                    onChange={handleMa}
                                />
                                <Text color="error"> {errorMessage.masv} </Text>
                                <Spacer y={2} />
                                <Input color={colorInput.ten} required clearable bordered labelPlaceholder="H??? v?? t??n" style={{ textTransform: 'capitalize' }}
                                    // onChange={(event) => { setTen(event.target.value); }}
                                    onChange={handleTen}
                                />
                                <Text color="error"> {errorMessage.ten} </Text>
                                <Spacer y={2} />
                                <label>Ng??y sinh</label>
                                <Input color={colorInput.ngaysinh} clearable bordered required
                                    onChange={handleNgaysinh}
                                    // onChange={(event) => { setNgaysinh(event.target.value); }}
                                    type="date" />
                                <Text color="error"> {errorMessage.ngaysinh}</Text>
                            </div>
                            <Spacer y={2} />
                            <div className='div_input'>
                                <Input color={colorInput.email} clearable bordered labelPlaceholder="Email" type="email" required style={{ textTransform: 'lowercase' }}
                                    // onChange={(event) => { setEmail(event.target.value); }}
                                    onChange={handleEmail}
                                />
                                <Text color="error">{errorMessage.email}</Text>
                                <Spacer y={2} />
                                <Input color={colorInput.sdt} clearable bordered labelPlaceholder="S??? ??i???n tho???i" required type="number"
                                    onChange={handleSdt}
                                // onChange={(event) => { setSdt(event.target.value); }}
                                />
                                <Text color="error">{errorMessage.sdt}</Text>
                                <Spacer y={2} />
                                <Input color={colorInput.diachi} clearable bordered labelPlaceholder="?????a ch???" style={{ textTransform: 'capitalize' }} required
                                    // onChange={(event) => { setDiachi(event.target.value); }}
                                    onChange={handleDiachi}
                                />
                                <Text color="error">{errorMessage.diachi}</Text>
                            </div>
                            <Spacer y={2} />
                            <div className='div_input'>
                                <Input color={colorInput.lop} clearable bordered labelPlaceholder="L???p" style={{ textTransform: 'uppercase' }} required
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
                                <Input color={colorInput.trangthai} clearable bordered labelPlaceholder="Tr???ng th??i" required
                                    // onChange={(event) => { setTrangthai(event.target.value); }}
                                    onChange={handleTrangthai}
                                />
                                <Text color='error'>{errorMessage.trangthai}</Text>
                                <Spacer y={1.5} />
                                <Label>???nh ?????i di???n:</Label>
                                <input Label="Upload" type="file" onChange={(e) => setFile(e.target.files[0])} />
                            </div>
                        </div>
                        <Spacer y={1} />
                        <Grid className='div_button' >
                            <Button className='button' type='submit'>
                                Th??m sinh vi??n
                            </Button>
                            <Button className='button' type='reset'>
                                L??m m???i
                            </Button>
                        </Grid>

                    </Form>
                </div>
            </div>
        </div>

    )
}
export default Add;