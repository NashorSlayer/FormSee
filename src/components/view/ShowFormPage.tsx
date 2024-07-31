"use client"
import { IFormData } from '@/types/types'
import Typography from '@mui/joy/Typography';
import { InfoOutlined } from '@mui/icons-material'
import { Button, Container, FormControl, FormHelperText, FormLabel, Input, Textarea } from '@mui/joy'
import Link from 'next/link'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'


function validateDate(date: string) {
    const dateNow = new Date()
    const dateInput = new Date(date)
    if (dateInput < dateNow) {
        return false
    }
    return true
}


const ShowFormPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<IFormData>()
    const [loading, setLoading] = useState(false)
    const onSubmit: SubmitHandler<IFormData> = async (data) => {
        setLoading(true)
        console.log("🚀 ~ constonSubmit:SubmitHandler<IFormData>= ~ data:", data)
        setLoading(false)
    }
    return (
        <section className=" bg-gray-50 dark:bg-gray-900">
            <Container >
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <Typography level='h1'> SeeFormApp</Typography>
                    </Link>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <Typography level='h2'> Create Form</Typography>
                            <FormControl
                                className="space-y-4 md:space-y-6">
                                <div>
                                    <FormLabel>Title</FormLabel>
                                    <Input
                                        {...register("title", { required: "Title is required" })}
                                        placeholder='Insert title'
                                        variant='outlined'
                                        color='primary' />
                                    {errors.title && (
                                        <FormControl error>
                                            <FormHelperText>
                                                <InfoOutlined />
                                                {errors.title.message}
                                            </FormHelperText>
                                        </FormControl>
                                    )}
                                </div>
                            </FormControl>
                            <FormControl>

                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    {...register("description", {
                                        required: "Description is required",
                                        validate: value => validateDate(value) ? "is correct" : "is not correct"
                                    })
                                    }
                                    placeholder='Insert Description'
                                    variant='outlined'
                                    color='primary' />
                                {errors.description && (
                                    <FormControl error>
                                        <FormHelperText>
                                            <InfoOutlined />
                                            {errors.description.message}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                            </FormControl>
                            <FormControl>
                                <FormLabel>Date start</FormLabel>
                                <Input
                                    {...register("date_start", { required: "date Start is required" })}
                                    type='date'
                                    variant='outlined'
                                    color='primary' />
                                {errors.date_start && (
                                    <FormControl error>
                                        <FormHelperText>
                                            <InfoOutlined />
                                            {errors.date_start.message}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                            </FormControl>
                            <FormControl>

                                <FormLabel>Date End</FormLabel>
                                <Input
                                    {...register("date_end", { required: "Date End is required" })}
                                    type='date'
                                    variant='outlined'
                                    color='primary' />
                                {errors.date_end && (
                                    <FormControl error>
                                        <FormHelperText>
                                            <InfoOutlined />
                                            {errors.date_end.message}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                            </FormControl>
                            <div className=''>
                                <Button
                                    loading={loading}
                                    onClick={handleSubmit(onSubmit)}
                                > Submit</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container >
        </section >
    )
}

export default ShowFormPage