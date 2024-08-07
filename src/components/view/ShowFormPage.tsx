"use client"
import Typography from '@mui/joy/Typography';
import Link from 'next/link'
import React from 'react'
import HorizontalStepper from '../HorizontalStepper';
import { Container } from '@mui/joy';
import CreateForm from '../CreateForm';
import AddAreasToForm from '../AddAreasToForm';
import PreviewAreas from '../PreviewAreas';
import { useFormStore } from '@/store/formStore';


const steps = ['Create Form', 'Add Areas', 'Preview']
const areasList = [
    'Area 1',
    'Area 2',
    'Area 3',
    'Area 4',
    'Area 5',
    'Area 6',
    'Area 7',
    'Area 8',
    'Area 9',
    'Area 10'
]

const ShowFormPage = () => {

    const { activeStep } = useFormStore(
        (state) => ({
            activeStep: state.form.activeStep
        }),
    );

    return (
        <section className=" bg-gray-50 dark:bg-gray-900">
            <Container >
                <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className='flex w-full items-center'>
                        <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <Typography level='h1'> SeeFormApp</Typography>
                        </Link>
                        <div className='py-5 w-full'>
                            <HorizontalStepper
                                steps={steps}
                                activeStep={activeStep}
                            />
                        </div>
                    </div>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div>
                            {activeStep === 1 && <CreateForm />}
                            {activeStep === 2 && <AddAreasToForm />}
                        </div>
                        {activeStep === 3 && <PreviewAreas optionsList={areasList} />}
                    </div>
                </div>
            </Container >
        </section >
    )
}

export default ShowFormPage