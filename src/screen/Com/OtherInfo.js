import React, { useState } from "react";
import { Form, } from "react-bootstrap";
import { Textarea, Spacer, Input, Text } from "@nextui-org/react";
import { isEmpty } from "validator"
function OtherInfo({ formData, setFormData }) {
    const [errorMessage, setErrorMessage] = useState({
        ngaysinh: '',
    });
    const [Message, setMessage] = useState({
        ngaysinh: '',
    });
    const [colorInput, setColorInput] = useState({
        ngaysinh: '',
    });
    // const handleNickname = (event) => {
    //     setFormData({ ...formData, nickname: event.target.value })
    //     if (isEmpty(event.target.value.trim())) {
    //         setErrorMessage({ nickname: "Hãy nhập họ tên của bạn vào đây!" })
    //         setColorInput({ nickname: 'error' });
    //     } else {
    //         setErrorMessage({ nickname: "" });
    //         setColorInput({ nickname: 'default' });
    //     }
    // }
    const handleNgaysinh = (event) => {
        setFormData({ ...formData, ngaysinh: event.target.value })
        if (formData.ngaysinh.length > 0) {
            const date = new Date();
            const birthdayCheck = new Date(formData.ngaysinh);
            var age_now = date.getFullYear() - birthdayCheck.getFullYear();
            var m = date.getMonth() - birthdayCheck.getMonth();
            if (m < 0 || (m === 0 && date.getDate() < birthdayCheck.getDate())) {
                age_now--;
            }
            if (age_now < 18) {
                setErrorMessage({ ngaysinh: 'Tuổi của bạn không hợp lệ bắt buộc phải trên 18 tuổi!' })
                setColorInput({ ngaysinh: 'border-red-300' })
            } else {
                setMessage({ ngaysinh: 'Tuổi của bạn hợp lệ' })
                setColorInput({ ngaysinh: '' })
            }

        } else {
            setErrorMessage({ ngaysinh: "" });
            setColorInput({ ngaysinh: 'default' });
        }
    }
    return (
        <Form>
            <Spacer y={2} />
            <div className="div_ngaysinh">
                <label>
                    Ngày sinh
                </label>
            </div>
            <Spacer y={0.5} />
            <div className="form_page_input">
                <Input color={colorInput.ngaysinh} rounded bordered required
                    onChange={handleNgaysinh} value={formData.ngaysinh}
                    type="date" css={{ w: "90%" }} />
            </div>
            <div className="error_mes">
                <Text color="error"> {errorMessage.ngaysinh} </Text>
            </div>
            <Spacer y={2} />
        </Form>
    );
}

export default OtherInfo;