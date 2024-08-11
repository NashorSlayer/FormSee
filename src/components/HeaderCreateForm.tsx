import { Typography } from '@mui/joy'
import Link from 'next/link'
import React from 'react'
import HorizontalStepper from './HorizontalStepper'
import { useFormStore } from '@/store/formStore'

const HeaderCreateForm = () => {

    const steps = ['Create Form', 'Add Areas', 'Preview']
    const { activeStep } = useFormStore(
        (state) => ({
            activeStep: state.form.activeStep
        }),
    );

    return (
        <div className='flex p-2 w-full items-center'>
            <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <Typography level='h1'> SeeFormApp</Typography>
            </Link>
            <div className='py-5 w-full'>
                <HorizontalStepper steps={steps} activeStep={activeStep} />
            </div>
        </div>
    )
}

export default HeaderCreateForm