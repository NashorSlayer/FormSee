"use client"
import { useAreaStore } from '@/store/areaStore';
import { useFormStore } from '@/store/formStore';
import { ITimesAreasResponse } from '@/types/time_areas.types';
import { Height } from '@mui/icons-material';
import { Box, Button, FormLabel, Input } from '@mui/joy';
import { BarChart } from '@mui/x-charts/BarChart';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import ErrorAlertForm from './common/ErrorAlertForm';
import { useAppStore } from '@/store/appStore';


const chartSetting = {
    xAxis: [
        {
            label: 'years',
        },
    ],
    colorMap: {
        type: 'ordinal',
        colors: ['purple', 'yellow']
    },
    width: 400,
    height: 700,
};

const valueFormatter = (value: number | null) => `${value} year`;

const TimelineArea = () => {

    const { loading } = useAppStore((state) => ({
        loading: state.app.loading
    }))
    const { setLoading } = useAppStore()
    const { areas } = useAreaStore(
        (state) => ({
            areas: state.areasForm
        })
    );
    const { form } = useFormStore();
    const { range, type } = form;
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ITimesAreasResponse>()
    const [graduatedNumber, setGraduatedNumber] = useState<number | null>(null)

    const handleChangeInputGraduatedNumber = (event: ChangeEvent<HTMLInputElement>) => {
        setGraduatedNumber(Number(event.target.value))
        console.log('graduatedNumber', graduatedNumber)
    }

    const validateGraduatedNumber = (value: number) => {
        if (type === 'day') {
            if (value > 31) {
                return 'The number of days must be less than 31'
            }
        } else if (type === 'month') {
            if (value > 12) {
                return 'The number of months must be less than 12'
            }
        } else if (type === 'year') {
            if (value < 1000) {
                return 'The number of years must be greater than 1000'
            }
        }
    }


    const [rangeArray, setRangeArray] = useState<string[]>([])
    const generateRange = () => {
        if (graduatedNumber) {
            for (let i = 0; i < range; i++) {
                const year = i + graduatedNumber
                rangeArray.push(year.toString())
            }
        }
        console.log("🚀 ~ generateRange ~ rangeArray:", rangeArray)
    }



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                height: '5vh',
                justifyContent: 'space-between',
            }}>
                <Box flexDirection={'column'}>
                    <FormLabel>Graduated number</FormLabel>
                    <Input
                        {...register('graduatedNumber',
                            {
                                required: 'Graduated number is required',
                                value: graduatedNumber!,
                                validate: validateGraduatedNumber
                            })}
                        placeholder={`enter your ${type} of graduated`}
                        onChange={(e) => handleChangeInputGraduatedNumber(e)}
                        type='number'
                    />
                    {errors.graduatedNumber && (
                        <ErrorAlertForm message={errors.graduatedNumber.message} />
                    )}
                </Box>
                <Button
                    size='lg'
                    color='success'
                    variant='solid'
                    onClick={handleSubmit(generateRange)}
                >Save</Button>
            </Box>
            <Box sx={{
                height: '70vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <BarChart
                    dataset={timesDedicatedResponse}
                    borderRadius={50}
                    layout='horizontal'
                    loading={loading}
                    yAxis={[{
                        scaleType: 'band',
                        dataKey: 'name',
                        colorMap: {
                            type: 'piecewise',
                            thresholds: [0],
                            colors: ['skyblue']
                        },
                    }]}
                    series={[{
                        dataKey: 'value_exp',
                        label: 'Experience',
                        color: 'skyblue',
                        valueFormatter,
                    }]}
                    grid={{ vertical: true }}
                    {...chartSetting}
                />
            </Box>
        </Box >
    );
};

export default TimelineArea;

const timesDedicatedResponse = [
    {
        "name": "Ciberseguridad",
        "value_exp": 1.5
    },
    {
        "name": "Desarrollo de Software",
        "value_exp": 0
    },
    {
        "name": "IA",
        "value_exp": 3
    }
]