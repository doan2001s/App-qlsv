import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Input, Spacer, Text } from "@nextui-org/react";
import { isEmpty } from "validator"
import isEmail from 'validator/es/lib/isEmail';
function SignUpInfo({ formData, setFormData }) {
    const [errorMessage, setErrorMessage] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [colorInput, setColorInput] = useState({
        studentId: 'default',
        password: 'default',
        confirmPassword: 'default',
    });
    // const handlSignup = ()=>{
    //     if(error.email)
    // }
    const handleEmail = (event) => {
        setFormData({ ...formData, email: event.target.value })
        if (isEmpty(formData.email.trim())) {
            setErrorMessage({ email: "Hãy nhập email vào đây!" })
            setColorInput({ email: 'error' });
        } else {
            if (isEmail(formData.email.trim())) {
                setErrorMessage({ email: "" });
                setColorInput({ email: 'default' });
            } else {
                setErrorMessage({ email: "Email của bạn không hợp lệ!" });
                setColorInput({ email: 'error' });
            }

        }
    }
    const handleConfirmPassword = (event) => {
        setFormData({ ...formData, confirmPassword: event.target.value })
        if (isEmpty(formData.confirmPassword.trim())) {
            formData.confirmPassword(event.target.value.trim());
            setErrorMessage({ confirmPassword: "Hãy nhập xác nhận mật khẩu" })
            setColorInput({ confirmPassword: 'error' });
        }
        else {
            if (formData.password.trim() === event.target.value.trim()) {
                setErrorMessage({ password: "" });
                setColorInput({ password: 'default' });
            } else {

                setErrorMessage({ confirmPassword: "Mật khẩu xác nhận của bạn không khớp với mật khẩu bạn nhập ở mục trên!" })
                setColorInput({ confirmPassword: 'error' });
            }
        }
    }
    const handlePassword = (event) => {
        setFormData({ ...formData, password: event.target.value })
        if (isEmpty(formData.password.trim())) {
            setErrorMessage({ password: "Hãy nhập mật khẩu vào đây!" })
            setColorInput({ password: 'error' });
        }
        else {
            setErrorMessage({ password: "" });
            setColorInput({ password: 'default' });
        }
    }
    return (
        <Form>
            <Spacer y={1.5} />
            <div className="form_page_input">
                <Input rounded bordered color={colorInput.email} css={{ w: "90%" }} labelPlaceholder="Email" required type="email"
                    value={formData.email}
                    onChange={handleEmail}
                />
            </div>
            <div className="error_mes">
                <Text color="error"> {errorMessage.email}</Text>
            </div>
            <Spacer y={1.5} />
            <div className="form_page_input">
                <Input.Password css={{ w: "90%" }} rounded bordered labelPlaceholder="Mật khẩu" status="Secondary" required initialValue="" type="password"
                    value={formData.password}
                    onChange={handlePassword}
                />
            </div>
            <div className="error_mes">
                <Text color="error"> {errorMessage.password} </Text>
            </div>
            <Spacer y={1.5} />
            <div className="form_page_input">
                <Input.Password css={{ w: "90%" }} rounded bordered labelPlaceholder="Nhập lại mật khẩu" status="Secondary" required initialValue="" type="password"
                    value={formData.confirmPassword}
                    onChange={handleConfirmPassword}
                />
            </div>
            <div className="error_mes">
                <Text color="error"> {errorMessage.confirmPassword}</Text>
            </div>
            <Spacer y={1.5} />
        </Form>
    );
}

export default SignUpInfo;