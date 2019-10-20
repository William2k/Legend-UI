import { useState } from "react";

const useForm = <T>(initialValues: T, callback: () => void) => {
  const [values, setValues] = useState(initialValues);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    callback();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValue(event.target.name, event.target.value);
  };

  const setValue = (name: string, value: string) => {
    setValues(values => ({
      ...values,
      [name]: value
    }));
  };

  const resetValues = () => setValues(initialValues);

  return {
    handleChange,
    handleSubmit,
    values,
    setValue, 
    resetValues
  };
};

export default useForm;
