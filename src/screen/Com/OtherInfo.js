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
            <Spacer y={2} />
            <div className="form_page_input">
                <Input rounded bordered color={colorInput.nickname} css={{ w: "90%" }} labelPlaceholder="Nickname" type="text"
                    value={formData.nickname}
                    // onChange={(event) =>
                    //     setFormData({ ...formData, nicname: event.target.value })
                    // }
                    onChange={handleNickname}
                />
                <Text color="error">{errorMessage.nickname}</Text>
            </div>
            <Spacer y={2} />
            <div className="form_page_input">
                <Textarea rounded bordered css={{ w: "90%" }} labelPlaceholder="Mô tả" type="text"
                    value={formData.mota}
                    onChange={(event) =>
                        setFormData({ ...formData, mota: event.target.value })
                    }
                />
            </div>
            <Spacer y={2} />
        </Form>
    );
}

export default OtherInfo;