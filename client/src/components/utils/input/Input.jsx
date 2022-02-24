import {Form} from "react-bootstrap";

const Input = ({type, placeholder, value, setValue}) => {
    return (
        <Form.Control
            onChange={(event) => setValue(event.target.value)}
            value={value}
            type={type}
            placeholder={placeholder}
        />
    );
};

export { Input };