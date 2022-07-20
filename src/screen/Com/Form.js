import React, { useState } from "react";
import SignUpInfo from "./SignUpInfo";
import PersonalInfo from "./PersonalInfo";
import OtherInfo from "./OtherInfo";
import { Button, Spacer } from '@nextui-org/react'
import { db } from '../firebase';
import { collection, addDoc, getDocs, where, query } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom'
import './style.css'
function Form() {
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        hoten: "",
        sdt: "",
        diachi: "",
        ngaysinh: "",
    });
    const [error, setErrorMsg] = useState(false)
    const [errorPassword, setErrorPasswordMSg] = useState(false)
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
                formData.sdt.length === 0 || formData.diachi.length === 0 ||
                formData.confirmPassword.length === 0 || formData.password.length === 0 || formData.ngaysinh.length === 0) {
                alert("Bạn cần phải nhập đủ dữ liệu", setErrorMsg(true))
            }
            if (formData.password.trim() !== formData.confirmPassword.trim()) {
                alert("Mật khẩu của bạn không khớp!", setErrorPasswordMSg(true))
            }
            if (formData.email && formData.hoten &&
                formData.sdt && formData.diachi &&
                formData.confirmPassword && formData.password && formData.ngaysinh ) {
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
                            hoten: formData.hoten, sdt: formData.sdt, diachi: formData.diachi, ngaysinh: formData.ngaysinh
                        })
                    if (add) {
                        alert("Đăng ký thành công");
                        navigate("/")
                    }
                }
                else {

                }
            }
        } else {
            setPage((currPage) => currPage + 1);
        }
    }
    return (
        <div className="Form_Page">
            <div className="">
                <div className="form_page_h2">
                    <h2 className="">{FormTitles[page]}</h2>
                </div>
                <div>{PageDisplay()}</div>
                {/* {error ? <p style={{ color: "red" }}>Bạn cần phải nhập đủ dữ liệu </p> : ""} */}
                <div className="form_buttonP">
                    <div>
                        <Button
                            disabled={page === 0}
                            onClick={() => {
                                setPage((currPage) => currPage - 1);
                            }}
                        >
                            Trước
                        </Button>
                    </div>
                    <Spacer y={1} />
                    <div>
                        <Button type="submit"
                            onClick={SignUp}
                        >
                            {page === FormTitles.length - 1 ? "Đăng ký" : "Sau"}
                        </Button>
                    </div>
                </div>
                <hr />
                <div className="form_page_p">
                    Bạn đã có tài khoản? <Link to="/">Đăng nhập</Link>
                </div>
            </div>
        </div>
    );
}

export default Form;