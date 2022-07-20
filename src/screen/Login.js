import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Input, Text, Spacer } from "@nextui-org/react";
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
      setErrorMessage({ email: "" })
      setColorInput({ email: 'error' });
    } else if (!ergx.test(email) && email !== "") {
      setErrorMessage({ email: "Email của bạn phải có kiểu abcxyz98@gmail.com!" });
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
          // alert("Tài khoản mật khẩu chính xác");
          localStorage.setItem("email", email)
          checkresul = false;
          navigate(`/gridview`)
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
    <div className="body">
      <div className="FormPage">
        <div className="form_detail">
          <div className="form_h2">
            <h2 className="">Đăng nhập</h2>
          </div>
          <Form onSubmit={handleLogin}>
            <Spacer y={1} />
            <div className="form_input">
              <Input rounded bordered css={{ w: "90%" }} labelPlaceholder="Email" type="email" style={{ textTransform: 'lowercase' }}
                onChange={handleEmail}
              />
            </div>
            <div className="error_mes">
              <Text color="error"> {errorMessage.email}</Text>
            </div>
            <Spacer y={2} />
            <div className="form_input">
              <Input.Password rounded bordered css={{ w: "90%" }} labelPlaceholder="Mật khẩu" type="password"
                onChange={handlePassword}
              />
            </div>
            <Spacer y={1} />
            <div className="button_submit">
              <Button type="Submit">
                Đăng nhập
              </Button>
            </div>
          </Form>
        </div>
        <hr />
        <div className="form_text">
          Bạn chưa có tài khoản? <Link to="/form"> Đăng ký</Link>
        </div>
      </div>
    </div>
  );
};
export default Login;