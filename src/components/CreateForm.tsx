"use client"
import { useAppStore } from '@/store/appStore'
import { useFormStore } from '@/store/formStore'
import { IFormData } from '@/types/types'
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    ToggleButtonGroup,
    Typography
} from '@mui/joy'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import ErrorAlertForm from './common/ErrorAlertForm'

function validateDate(date: Date) {
    console.log("🚀 ~ validateDate ~ date:", date)

    const today = new Date()
    const inputDate = new Date(date)

    const yyyy = inputDate.getFullYear()
    const mm = String(inputDate.getMonth() + 1).padStart(2, '0')
    const dd = String(inputDate.getDate() + 1).padStart(2, '0')
    const inputFormated = new Date(`${yyyy}/${mm}/${dd}`)

    console.log("🚀 ~ validateDate ~ inputFormated:", inputFormated)

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

    const router = useRouter()
    const { loading } = useAppStore((state) => ({
        loading: state.app.loading
    }))
    const { setLoading } = useAppStore()
    const { form, } = useFormStore(
        (state) => ({
            form: state.form,
            title: state.form.title,
            description: state.form.description,
            date_start: state.form.date_start,
            date_end: state.form.date_end,
            type: state.form.type,
            range: state.form.range
        })
    )
    const { title, description, date_start, date_end, type, range } = form
    const { nextStep, setForm, setTypes } = useFormStore();

    const onSubmit: SubmitHandler<IFormData> = async (data) => {
        setLoading(true)
        const { title, description, date_start, date_end, range } = data
        if (date_end < date_start) {
            errors.date_end = { type: "required", message: "Date End must be greater than Date Start" }
        }
        setForm({ ...form, title, description, date_start, date_end, type, range })
        nextStep()
        router.refresh()
        setLoading(false)
    }


    const handleClickToggleButtonGroup = (value: string | null) => {
        if (value) setTypes(value)
    }
    return (
        <Box sx={{
            padding: {
                xs: '1.5rem', // p-6
                sm: '2rem',   // sm:p-8
            },
            '& > *:not(style) + *': {
                marginTop: {
                    xs: '1rem',  // space-y-4
                    md: '1.5rem', // md:space-y-6
                },
            }
        }} >
            <Typography level='h2'> Create Form</Typography>
            <FormControl
                className="space-y-4 md:space-y-6">
                <div>
                    <FormLabel>Title</FormLabel>
                    <Input
                        {...register("title", {
                            required: "Title is required",
                            value: title
                        })}
                        placeholder='Insert title'
                        variant='outlined'
                        color='primary' />
                    {errors.title && (
                        <ErrorAlertForm message={errors.title.message} />
                    )}
                </div>
            </FormControl>
            <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                    {...register("description", {
                        required: "Description is required",
                        value: description
                    })
                    }
                    placeholder='Insert Description'
                    variant='outlined'
                    color='primary' />
                {errors.description && (
                    <ErrorAlertForm message={errors.description.message} />
                )}
            </FormControl>
            <FormControl>
                <FormLabel>Date start</FormLabel>
                <Input
                    {...register("date_start", {
                        required: "Date Start is required",
                        validate: validateDate,
                        value: date_start
                    })}
                    type='date'
                    variant='outlined'
                    color='primary' />
                {errors.date_start && (
                    <ErrorAlertForm message={errors.date_start.message} />

                )}
            </FormControl>
            <FormControl>

                <FormLabel>Date End</FormLabel>
                <Input
                    {...register("date_end", {
                        required: "Date End is required",
                        validate: validateDate,
                        value: date_end
                    })}
                    type='date'
                    variant='outlined'
                    color='primary' />
                {errors.date_end && (
                    <ErrorAlertForm message={errors.date_end.message} />

                )}
            </FormControl>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem"
            }}>
                <FormControl>
                    <FormLabel>Range of interes</FormLabel>
                    <Input
                        {...register("range", {
                            required: "Range is required",
                            value: range,
                            validate: (value) => {
                                if (value <= 0) {
                                    return "Range must be greater than 0"
                                }
                            }
                        })
                        }
                        placeholder='First X years/months/days'
                        variant='outlined'
                        color='primary'
                        type='number'
                    />
                    {errors.range && (
                        <ErrorAlertForm message={errors.range.message} />

                    )}
                </FormControl>
                <FormControl>
                    <FormLabel>Type</FormLabel>
                    <Box>
                        <ToggleButtonGroup
                            color='primary'
                            size='sm'
                            value={type}
                            onChange={(e, value) => handleClickToggleButtonGroup(value)}
                        >
                            <Button
                                value='day'
                            >
                                Day
                            </Button>
                            <Button
                                value='month'
                            >
                                Month
                            </Button>
                            <Button
                                value='year'
                            >
                                Year
                            </Button>
                        </ToggleButtonGroup>
                    </Box>
                    {errors.type && (
                        <ErrorAlertForm message={errors.type.message} />

                    )}
                </FormControl>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    loading={loading}
                    color="primary"
                    onClick={handleSubmit(onSubmit)}
                >Next</Button>
            </Box>
        </Box >


    )
}

export default CreateForm