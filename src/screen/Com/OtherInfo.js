import React, { useState } from "react";
import { Form, } from "react-bootstrap";
import { Textarea, Spacer, Input, Text } from "@nextui-org/react";
import { isEmpty } from "validator"
function OtherInfo({ formData, setFormData, }) {
    const [errorMessage, setErrorMessage] = useState({
        nickname: '',
    });
    const [colorInput, setColorInput] = useState({
        nickname: '',
    });
    const handleNickname = (event) => {
        setFormData({ ...formData, nickname: event.target.value })
        if (isEmpty(event.target.value.trim())) {
            setErrorMessage({ nickname: "Hãy nhập họ tên của bạn vào đây!" })
            setColorInput({ nickname: 'error' });
        } else {
            setErrorMessage({ nickname: "" });
            setColorInput({ nickname: 'default' });
        }
    }
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Spacer y={1.5} />
                <Input rounded bordered color={colorInput.nickname} css={{ w: "100%" }} labelPlaceholder="Nickname" type="text"
                    value={formData.nickname}
                    // onChange={(event) =>
                    //     setFormData({ ...formData, nicname: event.target.value })
                    // }
                    onChange={handleNickname}
                />
                <Text color="error">{errorMessage.nickname}</Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Spacer y={1.5} />
                <Textarea rounded bordered css={{ w: "100%" }} labelPlaceholder="Mô tả" type="text"
                    value={formData.mota}
                    onChange={(event) =>
                        setFormData({ ...formData, mota: event.target.value })
                    }
                />
                {/* <Spacer y={1.5} />
                <label>Ảnh đại diện:</label>
                <Input type="file"
                    onChange={(event)
                        => setFormData({ ...formData, file: event.target.files[0]})
                    }
                /> */}
            </Form.Group>
        </Form>
    );
}

export default OtherInfo;