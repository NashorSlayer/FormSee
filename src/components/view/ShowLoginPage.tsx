'use client'
import React, { useState } from 'react'
import { Button, Container, FormControl, FormHelperText, FormLabel, Input } from '@mui/joy'
import Link from 'next/link';
import Typography from '@mui/joy/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InfoOutlined } from '@mui/icons-material';
import { loginData} from '@/types/authTypes';

const ShowLoginPage = () => {
    const { register, handleSubmit, formState:{errors} } = useForm<loginData>();
    const [loading, setLoading] = useState(false)   
    const onSubmit : SubmitHandler<loginData> = async (data) => {
        setLoading(true)
        console.log("🚀 ~ constonSubmit:SubmitHandler<loginData>= ~ data:", data)
        setLoading(false)
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
                                    {...register("email", { required: "El email es requerido",
                                     validate: { 
                                        email: (value) => {
                                            return /^\S+@\S+$/i.test(value) || "El correo electrónico no es válido";
                                        } 
                                    }
                                    })}
                                    placeholder='Ingrese su correo electrónico'
                                    variant='outlined' 
                                    color='primary'/>
                                {errors.email && (
                                    <FormControl error>
                                        <FormHelperText>
                                            <InfoOutlined />
                                            {errors.email.message}
                                        </FormHelperText>
                                    </FormControl>
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
                                    <FormControl error>
                                        <FormHelperText>
                                            <InfoOutlined />
                                            {errors.password.message}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                                </div>
                            </FormControl>
                            <div>
                                <Button
                                loading={loading}
                                onClick={handleSubmit(onSubmit)}>
                                    Ingresar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
       </section>
    )
}

export default ShowLoginPage