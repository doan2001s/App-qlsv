import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Input, Text } from "@nextui-org/react";
import { collection, getDocs, where, query } from 'firebase/firestore';
import "./Css/Auth.css";
import { db } from "./firebase";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",

  });
  const [colorInput, setColorInput] = useState({
    studentId: 'default',
    password: 'default',

  });
  const handleEmail = (e) => {
    setEmail(e.target.value.trim())
    const ergx = /[a-zA-Z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
    if (ergx.test(email)) {
      setErrorMessage({ email: "Email hop le" })
      setColorInput({ email: 'error' });
    } else if (!ergx.test(email) && email !== "") {
      setErrorMessage({ email: "Email của bạn phải có kiểu doan@gmail.com!" });
      setColorInput({ email: 'error' });
    }
  }
  const handlePassword = (e) => {
    setPassword(e.target.value.trim())
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) {
      alert("Bạn cần nhập đủ thông tin", setError(true))
    }
    else {
      if (email && password) {
        let check = 0;
        let checkPassword = 0;
        const test = query(collection(db, "user"), where("email", "==", email), where("password", "==", password))
        const resul = await getDocs(test)
        let checkresul;
        resul.forEach((doc) => {
          console.log("doc", doc.data())
          if (doc.data().email === email) {
            check++;
          }
          if (doc.data().password === password) {
            checkPassword++;
          }
        })
        if (checkPassword >= 1 && check >= 1) {
          alert("Tài khoản mật khẩu chính xác");
          localStorage.setItem("email", email)
          checkresul = false;
          navigate(`/sinhvien`)
        }
        else {
          checkresul = true;
          alert("Tài khoản mật khẩu không chính xác");
        }
        if (checkresul) {
        }
        else {

        }
      }
    }

  }

  return (
    <div className="h-full pl-15">
      <div className="FormPage">
        <div className="p-4 box">
          <h2 className="mb-3">Đăng nhập</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Input css={{ w: "100%" }} Placeholder="Email" type="email"
                // onChange={(e) => setEmail(e.target.value)}
                onChange={handleEmail}
              />
              <Text color="error"> {errorMessage.email}</Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Input.Password css={{ w: "100%" }} Placeholder="Mật khẩu" type="password"
                // onChange={(e) => setPassword(e.target.value)}
                onChange={handlePassword}
              />
              {/* {error?<p style={{color:"red"}}>Bạn cần phải nhập mật khẩu</p>:""} */}
            </Form.Group>
            <div className="d-grid gap-2">
              <Button type="Submit">
                Đăng nhập
              </Button>
            </div>
          </Form>
          <hr />
          <div>
            {/* <GoogleButton
            className="g-btn"
            type="dark"
            onClick={SignInGoogle}
          /> */}
          </div>
        </div>
        <div className="p-4 box mt-3 text-center">
          Bạn chưa có tài khoản? <Link to="/form">Đăng ký</Link>
        </div>
      </div>
    </div>
  );
};
export default Login;