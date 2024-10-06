import { useState } from 'react';
import { AnyObjectSchema } from 'yup';

interface ValidationErrors {
  [key: string]: string;
}

interface UseFormValidationReturn<T> {
  values: T;
  errors: ValidationErrors;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (
    callback: () => void
  ) => (event: React.FormEvent<HTMLFormElement>) => void;
}

function useFormValidation<T>(
  initialValues: T,
  schema: AnyObjectSchema
): UseFormValidationReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit =
    (callback: () => void) =>
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        await schema.validate(values, { abortEarly: false });
        setErrors({});
        callback();
      } catch (validationErrors: any) {
        const formattedErrors: ValidationErrors = {};
        validationErrors.inner.forEach((error: any) => {
          formattedErrors[error.path] = error.message;
        });
        setErrors(formattedErrors);
      }
    };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
}

export default useFormValidation;
