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
      <Form.Group className="mb-3">
        <Spacer y={1.5} />
        <Input rounded bordered color={colorInput.hoten} css={{ w: "100%" }} labelPlaceholder="Họ và tên" type="Text"
          value={formData.hoten}
          // onChange={(event) =>
          //   setFormData({ ...formData, hoten: event.target.value })
          // }
          onChange={handleHoten}
        />
        <Text color="error"> {errorMessage.hoten} </Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Spacer y={1.5} />
        <Input rounded bordered css={{ w: "100%" }} labelPlaceholder="Số điện thoại" type="number"
          value={formData.sdt}
          onChange={handleSdt}
        // onChange={(event) =>
        //   setFormData({ ...formData, sdt: event.target.value })
        // }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Spacer y={1.5} />
        <Input rounded bordered color={colorInput.diachi} css={{ w: "100%" }} labelPlaceholder="Địa chỉ" type="text"
          value={formData.diachi}
          onChange={handleDiachi}
        // onChange={(event) =>
        //   setFormData({ ...formData, diachi: event.target.value })
        // } 
        />
        <Text color="error"> {errorMessage.diachi} </Text>
      </Form.Group>
      <Spacer y={1.5} />
    </Form>
    // <div className="personal-info-container">
    //   <input
    //     type="text"
    //     placeholder="Họ và tên"
    //     value={formData.firstName}
    //     onChange={(e) => {
    //       setFormData({ ...formData, firstName: e.target.value });
    //     }}
    //   />
    //   <input
    //     type="text"
    //     placeholder="Số đi"
    //     value={formData.lastName}
    //     onChange={(e) => {
    //       setFormData({ ...formData, lastName: e.target.value });
    //     }}
    //   />
    //   <input
    //     type="text"
    //     placeholder="Username..."
    //     value={formData.username}
    //     onChange={(e) => {
    //       setFormData({ ...formData, username: e.target.value });
    //     }}
    //   />
    // </div>
  );
}

export default PersonalInfo;