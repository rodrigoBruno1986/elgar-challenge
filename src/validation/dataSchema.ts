import * as Yup from 'yup';

const dataSchema = Yup.object().shape({
  title: Yup.string().required('El título es obligatorio'),
  body: Yup.string().required('El contenido es obligatorio'),
});

export default dataSchema;
