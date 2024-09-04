'use client'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react';
import {
    Button,
    Container,
    FormControl,
    FormLabel,
    Input
} from '@mui/joy'
import Link from 'next/link';
import Typography from '@mui/joy/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginData } from '@/types/authTypes';
import { useAppStore } from '@/store/appStore';
import ErrorAlertForm from '../common/ErrorAlertForm';
import { SnackBarDanger, SnackBarSuccess } from '../common/SnackBarOptions';
import { useRouter } from 'next/navigation';

const ShowLoginPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<loginData>();
    const { loading } = useAppStore((state) => ({
        loading: state.app.loading,
    }));
    const { setLoading } = useAppStore()

    const [open, setSnackBarOpen] = useState(false)
    const [snackDanger, setSnackDanger] = useState(false)

    const router = useRouter()

    const handleClose = () => {
        setSnackBarOpen(false)
        setSnackDanger(false)
    }


    const onSubmit: SubmitHandler<loginData> = async (data) => {
        setLoading(true)
        await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })
            .then((res) => (res?.status === 200 ? (setSnackBarOpen(true), router.push('/user/createForms')) : setSnackDanger(true)))
            .catch(() => setSnackDanger(true))
            .finally(() => setLoading(false))


    }
    return (
        <section className=" bg-gray-50 dark:bg-gray-900">
            <Container>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Link href="/" className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
                        <Typography level='h1'> SeeFormApp</Typography>
                    </Link>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <Typography level='h2'>
                                Iniciar sesión
                            </Typography>
                            <FormControl className="space-y-4 md:space-y-6">
                                <div>
                                    <FormLabel>Correo electrónico</FormLabel>
                                    <Input type="email"
                                        {...register("email", {
                                            required: "El email es requerido",
                                            validate: {
                                                email: (value) => {
                                                    return /^\S+@\S+$/i.test(value) || "El correo electrónico no es válido";
                                                }
                                            }
                                        })}
                                        placeholder='Ingrese su correo electrónico'
                                        variant='outlined'
                                        color='primary' />
                                    {errors.email && (
                                        <ErrorAlertForm message={errors.email.message} />
                                    )}
                                </div>
                            </FormControl>

                            <FormControl className="space-y-4 md:space-y-6">
                                <div>
                                    <FormLabel>Constraseña</FormLabel>
                                    <Input
                                        type="password"
                                        {...register("password", { required: "La contraseña es requerida" })}
                                        placeholder='Ingrese su contraseña'
                                        variant='outlined'
                                        color='primary'
                                    />
                                    {errors.password && (
                                        <ErrorAlertForm message={errors.password.message} />
                                    )}
                                </div>
                            </FormControl>
                            <div>
                                <Button
                                    loading={loading}
                                    onClick={handleSubmit(onSubmit)}>
                                    Ingresar
                                </Button>
                                <SnackBarSuccess
                                    message='Usuario registrado con éxito'
                                    snackBarOpen={open}
                                    handleClose={handleClose}
                                />
                                <SnackBarDanger
                                    message='Error, credenciales incorrectas'
                                    snackBarOpen={snackDanger}
                                    handleClose={handleClose}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>

    )
}

export default ShowLoginPage