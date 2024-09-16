"use client"
import { useAreaStore } from '@/store/areaStore';
import { useFormStore } from '@/store/formStore';
import { ITimesAreasResponse } from '@/types/time_areas.types';
import { Box, Button, FormLabel, Input, Typography } from '@mui/joy';
import { BarChart } from '@mui/x-charts/BarChart';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import ErrorAlertForm from './common/ErrorAlertForm';
import { useAppStore } from '@/store/appStore';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';



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
    width: 700,
    height: 600,
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
    const { title, description, range, type } = form;
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


    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {

        }
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

    const maxmonth = 12 * form?.range;

    return (
        <Box sx={{
            display: 'flex',
            gap: '10px',
            flexDirection: 'column',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                height: '10vh',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Box flexDirection='column'>
                    <Box>
                        <Typography level='h1'>{title}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Button
                        size='lg'
                        color='success'
                        variant='solid'
                        onClick={handleSubmit(generateRange)}
                    >Save</Button>
                </Box>
            </Box>
            <Box sx={{
                height: '69vh',
            }}>
                <Box sx={{
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'end',
                }}>
                    <Box sx={{ width: '20vh', }}>
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
                </Box>
                <Box >
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
                    <Box>
                    </Box>
                </Box>
            </Box>
        </Box >
    );
};

export default TimelineArea;

const timesDedicatedResponse = [

]