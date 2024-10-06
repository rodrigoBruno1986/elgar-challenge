import { useState } from 'react';
import { AnyObjectSchema, ValidationError } from 'yup';

const useFormValidation = (initialValues: any, schema: AnyObjectSchema) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = async (event: any) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });

    if (name === 'password') {
      try {
        await schema.validateAt(name, { ...values, [name]: value });
        setErrors((prevErrors: any) => ({ ...prevErrors, [name]: '' }));
      } catch (error: any) {
        if (error instanceof ValidationError) {
          setErrors((prevErrors: any) => ({
            ...prevErrors,
            [name]: error.message,
          }));
        }
      }
    }

    if (isSubmitting && name !== 'password') {
      try {
        await schema.validateAt(name, { ...values, [name]: value });
        setErrors((prevErrors: any) => ({ ...prevErrors, [name]: '' }));
      } catch (error: any) {
        if (error instanceof ValidationError) {
          setErrors((prevErrors: any) => ({
            ...prevErrors,
            [name]: error.message,
          }));
        }
      }
    }
  };

  const handleSubmit = (onSubmit: () => void) => async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await schema.validate(values, { abortEarly: false });
      setErrors({});
      onSubmit();
    } catch (validationErrors: any) {
      if (validationErrors instanceof ValidationError) {
        const formattedErrors: any = {};
        validationErrors.inner.forEach((error: ValidationError) => {
          if (error.path) {
            formattedErrors[error.path] = error.message;
          }
        });
        setErrors(formattedErrors);
      }
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useFormValidation;
