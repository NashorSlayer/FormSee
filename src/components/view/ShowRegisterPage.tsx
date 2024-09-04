'use client'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { Button, Container, FormControl, FormLabel, Input, Snackbar } from '@mui/joy'
import Link from 'next/link';
import Typography from '@mui/joy/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registerData } from '@/types/authTypes';
import ErrorAlertForm from '../common/ErrorAlertForm';
import { RegisterApi } from '@/app/api/auth/route';
import { useAppStore } from '@/store/appStore';
import { useState } from 'react';
import { SnackBarDanger, SnackBarSuccess } from '../common/SnackBarOptions';

const ShowRegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<registerData>();
    const { loading } = useAppStore((state) => ({
        loading: state.app.loading,
    }));
    const { setLoading } = useAppStore()

    const [open, setSnackBarOpen] = useState(false)
    const [snackDanger, setSnackDanger] = useState(false)

    const handleClose = () => {
        setSnackBarOpen(false)
        setSnackDanger(false)
    }

    const onSubmit: SubmitHandler<registerData> = async (data) => {
        setLoading(true)
        await RegisterApi(data)
            .then(() => setSnackBarOpen(true))
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
                                Registro
                            </Typography>
                            <FormControl className="space-y-4 md:space-y-6">
                                <div>
                                    <FormLabel>Nombre de usuario</FormLabel>
                                    <Input
                                        type="text"
                                        {...register("username", { required: "El nombre de usuario es requerido" })}
                                        placeholder='Ingrese su nombre de usuario'
                                        variant='outlined'
                                        color='primary' />
                                    {errors.username && (
                                        <ErrorAlertForm message={errors.username.message} />
                                    )}

                                </div>
                            </FormControl>
                            <FormControl className="space-y-4 md:space-y-6">
                                <div>
                                    <FormLabel>Correo electrónico</FormLabel>
                                    <Input
                                        type="email"
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
                            <div>
                                <FormLabel>Contraseña</FormLabel>
                                <Input
                                    type="password"
                                    {...register("password", { required: "La contraseña es requerida" })}
                                    placeholder='Ingrese su contraseña'
                                    variant='outlined'
                                    color='primary' />
                                {errors.password && (
                                    <ErrorAlertForm message={errors.password.message} />
                                )}
                            </div>
                            <FormControl>
                                <div>
                                    <FormLabel>Confirme su contraseña</FormLabel>
                                    <Input
                                        type="password"
                                        {...register("passwordConfirm", { required: "La confirmación de contraseña es requerida" })}
                                        placeholder='Confirme su contraseña'
                                        variant='outlined'
                                        color='primary' />
                                    {errors.passwordConfirm && (
                                        <ErrorAlertForm message={errors.passwordConfirm.message} />
                                    )}
                                </div>
                            </FormControl>
                            <div>
                                <Button
                                    loading={loading}
                                    onClick={handleSubmit(onSubmit)}>
                                    Registrarse
                                </Button>
                                <SnackBarSuccess
                                    message='Usuario registrado con éxito'
                                    snackBarOpen={open}
                                    handleClose={handleClose}
                                />
                                <SnackBarDanger
                                    message='Error, usuario ya registrado'
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

export default ShowRegisterPage