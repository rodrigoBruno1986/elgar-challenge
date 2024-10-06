import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  username: Yup.string().required('El nombre de usuario es obligatorio'),
  password: Yup.string()
    .min(4, 'La contraseña debe tener al menos 4 caracteres')
    .required('La contraseña es obligatoria'),
  role: Yup.string()
    .oneOf(['admin', 'user'], 'El rol debe ser "admin" o "user"')
    .required('El rol es obligatorio'),
});
