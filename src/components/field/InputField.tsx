import React from "react"
import { ErrorMessage, Field } from "formik"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string // Obligatorio
}

const InputField = ({ name, type = "text", ...rest }: Props) => {
  return (
    <div>
      <Field
        name={name}
        type={type}
        className="border-blue-200 focus:border-blue-500 w-full px-2 py-1"
        {...rest}
      />
      <ErrorMessage name={name}>
        {(msg) => <div className="text-red-500 text-sm">{msg}</div>}
      </ErrorMessage>
    </div>
  )
}

export default InputField
