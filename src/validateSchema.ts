import * as Yup from 'yup';

export const SignupSchemaLogin = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

export const CategorySchemaRegister = Yup.object().shape({
   name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
    description: Yup.string().required('Description is required').min(3, 'Description must be at least 3 characters'),
})
