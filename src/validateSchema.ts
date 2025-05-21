import * as Yup from 'yup';

export const SignupSchemaLogin = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

export const CategorySchemaRegister = Yup.object().shape({
    name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
    description: Yup.string().required('Description is required').min(3, 'Description must be at least 3 characters'),
})


export const validationSchemaFormBlog = Yup.object({
    title: Yup.string().required("El título es obligatorio"),
    description: Yup.string().required("La descripción es obligatoria"),
    content: Yup.string().required("El contenido es obligatorio"),
    slug: Yup.string().required("El slug es obligatorio"),
    category: Yup.string().required("La categoría es obligatoria"),
    image: Yup.string().required("La imagen es obligatoria"),
    tags: Yup.string().required("Los tags son obligatorios"),
    readingTime: Yup.number()
        .required("El tiempo de lectura es obligatorio")
        .min(1, "El tiempo de lectura debe ser al menos 1 minuto")
});

export const validationSchemaContact = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    content: Yup.string().required('Content is required'),
})
