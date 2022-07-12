import React, { useState } from "react";
import SignUpInfo from "./SignUpInfo";
import PersonalInfo from "./PersonalInfo";
import OtherInfo from "./OtherInfo";
import { Button } from '@nextui-org/react'
import { db } from '../firebase';
import { collection, addDoc, getDocs, where, query } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom'
// import './style.css'
function Form() {
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        hoten: "",
        sdt: "",
        diachi: "",
        mota: "",
        nickname: "",
        file:"",
    });
    const [error, setErrorMsg] = useState(false)
    const [errorPassword,setErrorPasswordMSg] = useState(false)
    const navigate = useNavigate()
    console.log(formData)
    const FormTitles = ["Đăng ký", "Thông tin người dùng", "Thông tin khác"];
    const PageDisplay = () => {
        if (page === 0) {
            return <SignUpInfo formData={formData} setFormData={setFormData} />;
        } else if (page === 1) {
            return <PersonalInfo formData={formData} setFormData={setFormData} />;
        } else {
            return <OtherInfo formData={formData} setFormData={setFormData} />;
        }
    };
    const userCollectionRel = collection(db, "user")
    const SignUp = async () => {
        if (page === FormTitles.length - 1) {
            if (formData.email.length === 0 || formData.hoten.length === 0 ||
                 formData.sdt.length === 0 || formData.diachi.length ===0 ||
                  formData.confirmPassword.length === 0 || formData.password.length === 0 ) {
                alert("Bạn cần phải nhập đủ dữ liệu",  setErrorMsg(true))
            }
            if(formData.password.trim() !== formData.confirmPassword.trim()){
                alert("Mật khẩu của bạn không khớp!",setErrorPasswordMSg(true))
            }
            else{
                 let check = 0;
            const test = query(collection(db, "user"), where("email", "==", formData.email))
            const resul = await getDocs(test)
            let checkresul;
            resul.forEach((doc) => {
                console.log("doc", doc.data())
                if (doc.data().email === formData.email) {
                    check++;
                }
            })
            if (check >= 1) {
                alert("Email đã tồn tại");
                checkresul = false;
            }
            else {
                checkresul = true
            }
            if (checkresul) {
                const add = await addDoc(userCollectionRel,
                    {
                        email: formData.email, password: formData.password, confirmPassword: formData.confirmPassword,
                        hoten: formData.hoten, sdt: formData.sdt, diachi: formData.diachi, mota: formData.mota, nickname: formData.nickname
                    })
                if (add) {
                    alert("Đăng ký thành công");
                    navigate("/")
                }
            }
            else {

            }
            }
            // let check = 0;
            // const test = query(collection(db, "user"), where("email", "==", formData.email))
            // const resul = await getDocs(test)
            // let checkresul;
            // resul.forEach((doc) => {
            //     console.log("doc", doc.data())
            //     if (doc.data().email === formData.email) {
            //         check++;
            //     }
            // })
            // if (check >= 1) {
            //     alert("Email đã tồn tại");
            //     checkresul = false;
            // }
            // else {
            //     checkresul = true
            // }
            // if (checkresul) {
            //     const add = await addDoc(userCollectionRel,
            //         {
            //             email: formData.email, password: formData.password, confirmPassword: formData.confirmPassword,
            //             hoten: formData.hoten, sdt: formData.sdt, diachi: formData.diachi, mota: formData.mota, nickname: formData.nickname
            //         })
            //     if (add) {
            //         alert("Đăng ký thành công");
            //         navigate("/")
            //     }
            // }
            // else {

            // }
        } else {
            setPage((currPage) => currPage + 1);
        }
    }
    return (
        <div className="FormPage">
            <div className="p-4 box">
                <h2 className="mb-3">{FormTitles[page]}</h2>
                <div>{PageDisplay()}</div>
                {/* {error ? <p style={{ color: "red" }}>Bạn cần phải nhập đủ dữ liệu </p> : ""} */}
                <div className="d-flex gap-5">
                    <Button
                        disabled={page === 0}
                        onClick={() => {
                            setPage((currPage) => currPage - 1);
                        }}
                    >
                        Trước
                    </Button>
                    <Button type="submit"
                        onClick={SignUp}
                    >
                        {page === FormTitles.length - 1 ? "Đăng ký" : "Sau"}
                    </Button>
                </div>
                <div className="p-4 box mt-3 text-center">
                    Bạn đã có tài khoản? <Link to="/">Đăng nhập</Link>
                </div>
            </div>
        </div>
    );
}

export default Form;