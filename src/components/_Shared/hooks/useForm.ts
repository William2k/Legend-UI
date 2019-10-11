import { useState } from "react";

const useForm = <T>(initialValues: T, callback: () => void) => {
  const [values, setValues] = useState(initialValues);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    callback();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values
  };
};

export default useForm;
