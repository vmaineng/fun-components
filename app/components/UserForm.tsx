"use client";

import { useState } from "react";

interface UserInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface TouchedFields {
  name?: boolean;
  email?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
}

export default function UserForm() {
  const [values, setValues] = useState<UserInputs>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [loading, setLoading] = useState<boolean>(false);

  const validate = (values: UserInputs): FormErrors => {
    const errors: FormErrors = {};
    if (values.name.length < 2)
      errors.name = "Name must be at least 2 characters";
    if (!values.email.includes("@")) errors.email = "Invalid email";
    if (values.password.length < 8)
      errors.password = "Password must be at least 8 characters";
    if (values.password !== values.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    return errors;
  };

  const onSubmit = async () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 1500));
    } catch (err) {
      throw new Error();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <input
          type="text"
          placeholder="name"
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          onBlur={() => {
            setTouched({ ...touched, name: true });
            setErrors(validate(values));
          }}
        />
        <input
          type="text"
          placeholder="email"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          onBlur={() => {
            setTouched({ ...touched, name: true });
            setErrors(validate(values));
          }}
        />
        <input
          type="text"
          placeholder="password"
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
          onBlur={() => {
            setTouched({ ...touched, name: true });
            setErrors(validate(values));
          }}
        />
        <input
          type="text"
          placeholder="confirmPassword"
          value={values.confirmPassword}
          onChange={(e) =>
            setValues({ ...values, confirmPassword: e.target.value })
          }
          onBlur={() => {
            setTouched({ ...touched, name: true });
            setErrors(validate(values));
          }}
        />
        {touched.name && errors.name && <p>{errors.name}</p>}
        {touched.email && errors.email && <p>{errors.email}</p>}
        {touched.password && errors.password && <p>{errors.password}</p>}
        {touched.confirmPassword && errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
