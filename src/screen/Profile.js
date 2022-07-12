import React, { useState, useEffect, } from "react";
import { FaUserGraduate, FaTachometerAlt, FaSignInAlt } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { AiFillPhone } from 'react-icons/ai'
import { IoMail } from 'react-icons/io5'
import { BsFillPencilFill } from 'react-icons/bs'
import { Link, useNavigate, } from "react-router-dom";
import "./Css/profile.css"
import { Avatar, Button, Modal, Text, Input, Spacer } from '@nextui-org/react'
import { db, storage } from './firebase'
import { collection, where, query, onSnapshot, getDocs, getDoc, doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { confirmAlert } from 'react-confirm-alert';
import { isEmpty } from 'validator'
import { async } from "@firebase/util";
import { set } from "react-hook-form";
const Profile = () => {

    const navigate = useNavigate()
    const handelLogOut = () => {
        localStorage.clear();
        navigate("/")
    }
    const [profile, setProfile] = useState([]);
    const Email = localStorage.getItem("email")
    console.log(Email);
    const collectionXong = collection(db, "user");
    const getProfile = async () => {
        const queryXong = query(collectionXong, where("email", "==", Email));
        const Xong = onSnapshot(queryXong, (snapshot) =>
            setProfile(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, key: doc.id })))
        );
        // console.log("Profile", profile);
        return (Xong);
    }

    useEffect(() => {
        getProfile(id);
    }, []);
    const [hoten, setHoten] = useState('');
    const [email, setEmail] = useState('');
    const [sdt, setSdt] = useState('');
    const [diachi, setDiachi] = useState('');
    const [mota, setMota] = useState('');
    const [file, setFile] = useState(null);
    const [id, setId] = useState()
    const [progress, setProgress] = useState(null);
    const [data, setData] = useState()
    const [visible, setVisible] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState({
        hoten: '',
        sdt: '',
        diachi: '',
        mota: ''
    });
    const [colorInput, setColorInput] = useState({
        hoten: '',
        sdt: '',
        diachi: '',
        mota: ''
    });
    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };
    const handler = async (id) => {
        setVisible(true);
        const Newprofile = await getDoc(doc(db, "user", id))
        if (Newprofile.exists()) {
            setHoten(Newprofile.data().hoten)
            setEmail(Newprofile.data().email)
            setSdt(Newprofile.data().sdt)
            setDiachi(Newprofile.data().diachi)
            setMota(Newprofile.data().mota)
            setId(Newprofile.data().id)
        }
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
    const handleHoten = (event) => {
        setHoten(event.target.value)
        if (isEmpty(event.target.value.trim())) {
            setErrorMessage({ hoten: "Hãy nhập tên người dùng!" })
            setColorInput({ hoten: 'error' });
        } else {
            setErrorMessage({ hoten: "" });
            setColorInput({ hoten: 'default' });
        }
    }
    const handleDiachi = (event) => {
        setDiachi(event.target.value)
        if (isEmpty(event.target.value.trim())) {
            setErrorMessage({ diachi: "Hãy nhập địa chỉ của bạn!" })
            setColorInput({ diachi: 'error' });
        } else {
            setErrorMessage({ diachi: "" });
            setColorInput({ diachi: 'default' });
        }
    }
    const handleMota = (event) => {
        setMota(event.target.value)
        if (isEmpty(event.target.value.trim())) {
            setErrorMessage({ mota: "Hãy nhập thông tin liên quan đến bạn!" })
            setColorInput({ mota: 'error' });
        } else {
            setErrorMessage({ mota: "" });
            setColorInput({ mota: 'default' });
        }
    }
    const handleSdt = (event) => {
        setSdt(event.target.value)
        if (sdt.length <= 8) {
            setErrorMessage({ sdt: "Số điện thoại ít nhất 10 số!" })
            setColorInput({ sdt: 'error' });
        } else {
            setErrorMessage({ sdt: "" });
            setColorInput({ sdt: 'default' });
        }
    }
    const update = async (id) => {
        const user = doc(db,"user",id)
        const updateUser = {hoten:hoten,diachi:diachi,sdt:sdt,mota:mota,...data}
        updateDoc(user,updateUser)
        // console.log(user)
        alert("Cập nhật thành công")
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mr_content">
                    {profile.map((profile, i) => {
                        return (
                            <div className="content_left">
                                <div className="content_detail">
                                    <div className="img_detail">
                                        <div className="img">
                                            <Avatar
                                                size="xl"
                                                color="gradient"
                                                textColor="white"
                                                bordered
                                                src={profile.img}
                                            />
                                        </div>
                                    </div>
                                    <div className="detail">
                                        <h6 key={profile.id}>Xin chào,</h6>
                                        <strong>{profile.hoten}</strong>
                                        <br />
                                        <div className="detail_icon">
                                            <AiFillPhone color="blue" size={20} />
                                            <p>
                                                {profile.sdt}
                                            </p>
                                        </div>
                                        <div className="detail_icon">
                                            <IoMail color="blue" size={20} /><p>
                                                {profile.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="div-button">
                                        <button className="button-profile"
                                            onClick={(e) => handler(profile.id)}
                                        // onClick={(e) => clickModal(profile.id)}
                                        // onClick={() => setVisible(true)}
                                        >
                                            <BsFillPencilFill />
                                        </button>
                                    </div>
                                </div>
                                <hr />
                                <div className="detail_ct">
                                    <strong>Địa chỉ: {profile.diachi}</strong>
                                </div>
                                <div className="detail_ct">
                                    <strong>Thông tin khác: {profile.mota}</strong>
                                </div>
                                <Modal
                                    closeButton
                                    width="600px"
                                    aria-labelledby="modal-title"
                                    open={visible}
                                    onClose={closeHandler}
                                >
                                    <Modal.Header>
                                        <Text b size={18}>
                                            Cập nhật thông tin người dùng
                                        </Text>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Spacer y={1} />
                                        <Input clearable bordered labelPlaceholder="Email " type="email" required
                                            value={email}
                                        // onChange={(event) => { setMa(event.target.value); }}
                                        />
                                        <Spacer y={1} />
                                        <Input color={colorInput.hoten} clearable bordered labelPlaceholder="Họ và tên " type="text" required
                                            value={hoten}
                                            onChange={handleHoten}
                                        // onChange={(event) => { setMa(event.target.value); }}
                                        />
                                        <Text color="error"> {errorMessage.hoten} </Text>
                                        <Spacer y={1} />
                                        <Input clearable bordered labelPlaceholder="Số điện thoại" type="number" required
                                            value={sdt}
                                            onChange={handleSdt}
                                        // onChange={(event) => { setMa(event.target.value); }}
                                        />
                                        <Text color="error" > {errorMessage.sdt}</Text>
                                        <Spacer y={1} />
                                        <Input color={colorInput.diachi} clearable bordered labelPlaceholder="Địa chỉ" type="text" required
                                            value={diachi}
                                            onChange={handleDiachi}
                                        // onChange={(event) => { setMa(event.target.value); }}
                                        />
                                        <Text color="error" > {errorMessage.diachi}</Text>
                                        <Spacer y={1} />
                                        <Input color={colorInput.mota} clearable bordered labelPlaceholder="Mô tả" type="text" required
                                            value={mota}
                                            onChange={handleMota}
                                        // onChange={(event) => { setMa(event.target.value); }}
                                        />
                                        <Text color="error" > {errorMessage.mota}</Text>
                                        <Spacer y={1} />
                                        <label>Ảnh đại diện:</label>
                                        <Input type="file"
                                            onChange={(e) => setFile(e.target.files[0])}
                                        />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button auto flat color="error" onClick={closeHandler}>
                                            Đóng
                                        </Button>
                                        <Button auto
                                            onClick={(e) => update(profile.id)}
                                        // onClick={closeHandler}
                                        >
                                            Cập nhật
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>

    );
}
export default Profile;