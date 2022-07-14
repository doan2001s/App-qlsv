import React, { useState } from "react";
import { Form, } from "react-bootstrap";
import { Input, Spacer, Text } from "@nextui-org/react";
import { isEmpty } from "validator"
function PersonalInfo({ formData, setFormData, }) {
  const [errorMessage, setErrorMessage] = useState({
    hoten: "",
    sdt: "",
    diachi: "",
  });
  const [colorInput, setColorInput] = useState({
    hoten: "",
    sdt: "",
    diachi: "",
  });
  const handleHoten = (event) => {
    setFormData({ ...formData, hoten: event.target.value })
    if (isEmpty(event.target.value.trim())) {
      setErrorMessage({ hoten: "Hãy nhập họ tên của bạn vào đây!" })
      setColorInput({ hoten: 'error' });
    } else {
      setErrorMessage({ hoten: "" });
      setColorInput({ hoten: 'default' });
    }
  }
  const handleSdt = (event) => {
    setFormData({ ...formData, sdt: event.target.value })
  }
  const handleDiachi = (event) => {
    setFormData({ ...formData, diachi: event.target.value })
    if (isEmpty(formData.diachi.trim())) {
      setErrorMessage({ diachi: "Hãy nhập địa chỉ vào đây!" })
      setColorInput({ diachi: 'error' });
    }
    else {
      setErrorMessage({ diachi: "" });
      setColorInput({ diachi: 'default' });
    }
  }
  return (
    <Form>
      <Spacer y={1.5} />
      <div className="form_page_input">
        <Input rounded bordered color={colorInput.hoten} css={{ w: "90%" }} labelPlaceholder="Họ và tên" type="Text"
          value={formData.hoten}
          onChange={handleHoten}
        />
      </div>
      <div className="error_mes">
        <Text color="error"> {errorMessage.hoten} </Text>
      </div>
      <Spacer y={1.5} />
      <div className="form_page_input">
        <Input rounded bordered css={{ w: "90%" }} labelPlaceholder="Số điện thoại" type="number"
          value={formData.sdt}
          onChange={handleSdt}
        />
      </div>
      <Spacer y={1.5} />
      <div className="form_page_input">
        <Input rounded bordered color={colorInput.diachi} css={{ w: "90%" }} labelPlaceholder="Địa chỉ" type="text"
          value={formData.diachi}
          onChange={handleDiachi}
        />
      </div>
      <div className="error_mes">
        <Text color="error"> {errorMessage.diachi} </Text>
      </div>
      <Spacer y={1.5} />
    </Form>
  );
}

export default PersonalInfo;