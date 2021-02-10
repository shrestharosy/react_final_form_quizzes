import React, { FC } from "react";

import { Field } from "react-final-form";

interface IInputFieldProps {
  name: string;
  placeholder: string;
  className?: string;
}

const InputField: FC<IInputFieldProps> = ({ name, placeholder, className }) => {
  return (
    <>
      <Field name={name}>
        {({ input }) => (
          <>
            <div>
              <input
                {...input}
                type="text"
                placeholder={placeholder}
                className={className}
                onKeyPress={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
              />
            </div>
          </>
        )}
      </Field>
    </>
  );
};

export default InputField;
