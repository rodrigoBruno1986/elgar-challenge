import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('El nombre de usuario es obligatorio'),
  password: Yup.string()
    .min(4, 'La contraseña debe tener al menos 4 caracteres')
    .required('La contraseña es obligatoria'),
});

export default loginSchema;
