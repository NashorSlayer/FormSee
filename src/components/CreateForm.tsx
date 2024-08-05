"use client"
import { IFormData } from '@/types/types'
import { InfoOutlined } from '@mui/icons-material'
import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Textarea,
    Typography
} from '@mui/joy'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

function validateDate(date: Date) {

    const today = new Date()
    const inputDate = new Date(date)

    const yyyy = inputDate.getFullYear()
    const mm = String(inputDate.getMonth() + 1).padStart(2, '0')
    const dd = String(inputDate.getDate() + 1).padStart(2, '0')
    const inputFormated = new Date(`${yyyy}/${mm}/${dd}`)

    //console.log("🚀 ~ validateDate ~ inputFormated:", inputFormated)

    if (inputFormated < today) {
        return "Date must be greater than today"
    }
}


const CreateForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormData>()
    const [loading, setLoading] = useState(false)

    const onSubmit: SubmitHandler<IFormData> = async (data) => {
        const { title, description, date_start, date_end } = data
        setLoading(true)
        if (date_end < date_start) {
            errors.date_end = { type: "required", message: "Date End must be greater than Date Start" }
        }
        setLoading(false)
    }
    return (
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
                    {...register("date_start", {
                        required: "Date Start is required",
                        validate: validateDate,
                    })}
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
                    {...register("date_end", {
                        required: "Date End is required",
                        validate: validateDate
                    })}
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
                > Next</Button>
            </div>
        </div>

    )
}

export default CreateForm