import React, { useState } from 'react';
import './Add.css'
import { FaUserGraduate, FaTachometerAlt, FaSignInAlt,  } from 'react-icons/fa'
import { ImProfile, ImTable } from 'react-icons/im'
import { Link } from 'react-router-dom';
import { Input, Spacer, Button, Grid } from "@nextui-org/react";
import { Form } from "react-bootstrap";
import { db} from './firebase';
import { collection, addDoc,getDocs, where,query } from 'firebase/firestore';
import "react-datepicker/dist/react-datepicker.css";

const Add = () => {

    const [masv, setMa] = useState('');
    const [ten, setTen] = useState('');
    const [email, setEmail] = useState('');
    const [trangthai, setTrangthai] = useState('');
    const [diachi, setDiachi] = useState('');
    const [khoa, setKhoa] = useState('');
    const [sdt, setSdt] = useState('');
    const [ngaysinh, setNgaysinh] = useState('');
    const [lop, setLop] = useState('');
    const sinhvienCollectionRel = collection(db, "sinhvien")
    const [error, setError] = useState(false); const [errorMa, setErrorMa] = useState(false);
    const [errorDiachi, setErrorDiachi] = useState(false); const [errortrangthai, setErrortrangthai] = useState(false);
    const [errorsdt, setErrorsdt] = useState(false); const [errorngaysinh, setErrorngaysinh] = useState(false);
    const [errorlop, setErrorlop] = useState(false);const [errorkhoa, setErrorkhoa] = useState(false);
    const createSinhvien = async (event) => {
        event.preventDefault();
        if (ten.length === 0) {
            setError(true)
        } if (masv.length === 0) {
            setErrorMa(true)
        } if (trangthai.length === 0) {
            setErrortrangthai(true)
        } if (diachi.length === 0) {
            setErrorDiachi(true)
        } if (khoa.length === 0) {
            setErrorkhoa(true)
        } if (sdt.length === 0) {
            setErrorsdt(true)
        } if (lop.length === 0) {
            setErrorlop(true)
        } if (ngaysinh.length === 0) {
            setErrorngaysinh(true)
        }
        if(masv && ten && trangthai && diachi && sdt && ngaysinh && khoa && lop && email){
            let check = 0;
            const test = query(collection(db,"sinhvien"),where("masv","==",masv))
            const resul =await getDocs(test)
            let checkresul;
            resul.forEach((doc)=>{
              console.log("doc",doc.data())
                if(doc.data().masv===masv){
                  check ++;
                }
            })
            if(check >=1){
              alert("Mã sinh viên đã tồn tại");
              checkresul = false;
            }
            else{
              checkresul = true
            }
            if(checkresul){
              const add= await addDoc(sinhvienCollectionRel, { masv: masv, tensv: ten, email: email, diachi: diachi, trangthai: trangthai, sdt: sdt, ngaysinh: ngaysinh, lop: lop, khoa: khoa })
              if(add){
                alert("Thêm sinh viên thành công")
              }
            }
            else{
              
            }
        }
        // await addDoc(sinhvienCollectionRel, { masv: ma, tensv: ten, email: email, diachi: diachi, trangthai: trangthai, sdt: sdt, ngaysinh: ngaysinh, lop: lop, khoa: khoa })
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
                        <li className='active'><div className='icon'><FaUserGraduate size={22} /></div><Link to="/sinhvien">Sinh viên</Link></li>
                        <li className='li'><div className='icon'><ImProfile size={22} /></div><Link to="/edit">Tiểu sử</Link></li>
                        <li className='li'><div className='icon'><ImTable size={22} /></div>Thời khóa biểu</li>
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
                                    <Link to="/sinhvien"><FaUserGraduate color='silver' /></Link>
                                </div>
                                <div className='right_1_text'> / Sinh viên </div>
                            </div>
                            <div className='top_ql_right_1'>
                                <h6 className='ql_h6'>Thêm sinh viên</h6>
                            </div>
                        </div>
                        <div className='right_2_icon'>
                            {/* <div className='icon_2'>
                                <Link to="/"><FaUserCircle color='silver' size={25} /></Link>
                            </div>
                            <div className='icon_2'>
                                <Link to="/"><IoNotificationsCircle color='silver' size={30} /></Link>
                            </div> */}
                        </div>
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
                    <Form onSubmit={createSinhvien}>
                        <Spacer y={2} />
                        <div className='form_container'>
                            <div className='div_input'>
                                <Input clearable bordered labelPlaceholder="Mã sinh viên" type="number"
                                
                                    onChange={(event) => { setMa(event.target.value); }} />
                                {errorMa ? <p style={{ color: "red" }}>Phải nhập mã sinh viên</p> : ""}

                                <Spacer y={2} />
                                <Input clearable bordered labelPlaceholder="Họ và tên" style={{ textTransform: 'capitalize' }}
                                    onChange={(event) => { setTen(event.target.value); }} />
                                {error ? <p style={{ color: "red" }}>Phải nhập họ tên sinh viên</p> : ""}
                                <Spacer y={2} />
                                <Input clearable bordered labelPlaceholder="Ngày sinh"
                                    onChange={(event) => { setNgaysinh(event.target.value); }} />
                                {errorngaysinh ? <p style={{ color: "red" }}>Phải nhập ngày sinh</p> : ""}
                            </div>
                            <div className='div_input'>
                                <Input clearable bordered labelPlaceholder="Email" type="email"
                                    onChange={(event) => { setEmail(event.target.value); }} />
                                <Spacer y={2} />
                                <Input clearable bordered labelPlaceholder="Số điện thoại"
                                    onChange={(event) => { setSdt(event.target.value); }} />
                                {errorsdt ? <p style={{ color: "red" }}>Phải nhập số điện thoại</p> : ""}
                                <Spacer y={2} />
                                <Input clearable bordered labelPlaceholder="Địa chỉ" style={{ textTransform: 'capitalize' }}
                                    onChange={(event) => { setDiachi(event.target.value); }} />
                                {errorDiachi ? <p style={{ color: "red" }}>Phải nhập địa chỉ</p> : ""}
                            </div>
                            <div className='div_input'>
                                <Input clearable bordered labelPlaceholder="Lớp" style={{ textTransform: 'uppercase' }}
                                    onChange={(event) => { setLop(event.target.value); }} />
                                {errorlop ? <p style={{ color: "red" }}>Phải nhập lớp </p> : ""}
                                <Spacer y={2} />
                                <Input clearable bordered labelPlaceholder="Khoa" style={{ textTransform: 'uppercase' }}
                                    onChange={(event) => { setKhoa(event.target.value); }} />
                                {errorkhoa ? <p style={{ color: "red" }}>Phải nhập khoa</p> : ""}
                                <Spacer y={2} />
                                <Input clearable bordered labelPlaceholder="Trạng thái" 
                                    onChange={(event) => { setTrangthai(event.target.value); }} />
                                {errortrangthai ? <p style={{ color: "red" }}>Phải nhập trạng thái</p> : ""}
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