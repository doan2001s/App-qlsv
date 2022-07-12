import React, { useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import { Form,Button } from "react-bootstrap";
import { Input,Spacer} from "@nextui-org/react";
import { db } from "./firebase";
import { collection, addDoc,getDocs, where,query} from 'firebase/firestore';
import './Css/Auth.css';
const SignUp= () => {
  const [user,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [passwordConFirm,setPasswordConfirm] = useState("");
  const [error,setError] = useState(false) ; const [erroremail,setErroremail] = useState(false); const [errorPassword,setErrorPassword] = useState(false)
  const [errorPasswordCf,setErrorPasswordCf] = useState(false) 
  const navigate = useNavigate();
  
  const userCollectionRel = collection(db, "user")
  const createUser = async (event) =>{
    event.preventDefault();
    if(user.length === 0 ){
      console.log("user.length vs email.length")
      setError(true)
    }
    if(email.length ===0 ){
      console.log("user.length vs email.length")
      setErroremail(true)
    }
    if(password.length === 0 ){
      console.log("password.length === 0 ")
      setErrorPassword(true)
    }
    // if(passwordConFirm.length === 0 ){
    //   console.log("passwordConfirm.length")
    //   setError(true)
    // }
    if(password.trim() !== passwordConFirm.trim()){
      console.log("password.trim")
      setErrorPasswordCf(true)
    }
    if(user && email && password.trim()  === passwordConFirm.trim()){
    let check = 0;
    const test = query(collection(db,"user"),where("email","==",email))
    const resul =await getDocs(test)
    let checkresul;
    resul.forEach((doc)=>{
      console.log("doc",doc.data())
        if(doc.data().email===email){
          check ++;
        }
    })
    if(check >=1){
      alert("Email đã tồn tại");
      checkresul = false;
    }
    else{
      checkresul = true
    }
    if(checkresul){
      const add=await addDoc(userCollectionRel, {user:user,email:email,password:passwordConFirm})
      if(add){
        alert("Đăng ký thành công")
        navigate('/')
      }
    }
    else{
      
    }
      // const add=await addDoc(userCollectionRel, {user:user,email:email,password:passwordConFirm})
      // if(add){
      //   alert("Đăng ký thành công")
      //   navigate('/')
      // }
      // else{
      //   alert("Dang ky ko thanh cong")
      // }
    }
    // let check = 0;
    // const test = query(collection(db,"user"),where("email","==",email))
    // const resul =await getDocs(test)
    // let checkresul;
    // resul.forEach((doc)=>{
    //   console.log("doc",doc.data())
    //     if(doc.data().email===email){
    //       check ++;
    //     }
    // })
    // if(check >=1){
    //   alert("Email đã tồn tại");
    //   checkresul = false;
    // }
    // else{
    //   checkresul = true
    // }
    // if(checkresul){
      // const add=await addDoc(userCollectionRel, {user:user,email:email,password:passwordConFirm})
      // if(add){
      //   alert("Đăng ký thành công")
      //   navigate('/')
      // }
    // }

  }
  return (
    <>
    <div className="FormPage">
      <div className="p-4 box">
        <h2 className="mb-3">Đăng ký</h2>
        <Form  onSubmit={createUser}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Spacer y={2}/>
          <Input css={{ w: "100%" }} labelPlaceholder="Tên người dùng" 
            onChange={(event)=> setUsername(event.target.value)}
            />
            {error?<p style={{color:"red"}}>Bạn cần phải nhập tên </p>:""}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Spacer y={1.5}/>
          <Input css={{ w: "100%" }} labelPlaceholder="Email"   required type="email"  
            onChange={(event)=> setEmail(event.target.value)}
            />
            {erroremail?<p style={{color:"red"}}>Bạn cần phải nhập Email </p>:""}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Spacer y={1.5} />
          <Input.Password css={{ w: "100%" }} labelPlaceholder="Mật khẩu" status="Secondary" required initialValue="" type="password" 
              onChange={(event)=> setPassword(event.target.value)}
            />
            {errorPassword?<p style={{color:"red"}}>Mật khẩu không được để trống</p>:""}
            <Spacer y={1.5} />
            <Input.Password css={{ w: "100%" }} labelPlaceholder="Nhập lại mật khẩu" status="Secondary" required initialValue="" type="password" 
              onChange={(event)=> setPasswordConfirm(event.target.value)}
            />
                 {errorPasswordCf?<p style={{color:"red"}}>Mật khẩu không khớp </p>:""}
                 {/* {error?<p style={{color:"red"}}>Bạn không được để trống</p>:""} */}

          </Form.Group>
          <Spacer y={1.5} />
          <div className="d-grid gap-2">
            <Button type="submit">
              Đăng ký
            </Button>
          </div>
        </Form>
        <hr />
        <div>
        </div>
      </div>
      <div className="p-4 box mt-3 text-center">
        Bạn đã có tài khoản? <Link to="/">Đăng nhập</Link>
      </div>
      </div>
    </>
  );
};
export default SignUp;