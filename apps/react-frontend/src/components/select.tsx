import Form from "react-bootstrap/esm/Form";
import { FormSelectProps } from "react-bootstrap/esm/FormSelect";

export interface SelectOption {
  value: string,
  label: string
}
export interface SelectProps extends FormSelectProps {
  options: SelectOption[]
}
const Select = (props: SelectProps) => {
  return (
    <Form.Select
      {...props}
    >
      {props.options.map((option) => {
        return <option value={option.value}>{option.label}</option>
      })}
    </Form.Select>
  )
}

export default Select;