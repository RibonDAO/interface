import { useState } from "react";

export function useForm(callback: any, initialState = {}) {
  const [values, setValues] = useState(initialState);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await callback();
  }

  const clear = () => {
    setValues(initialState);
  };

  return [onChange, onSubmit, values, clear];
}
