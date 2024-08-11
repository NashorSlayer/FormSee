import { useAreaStore } from '@/store/areaStore';
import { BarChart } from '@mui/icons-material';
import { Box, Button } from '@mui/material';


const chartSetting = {
    xAxis: [
        {
            label: 'rainfall (mm)',
        },
    ],
    width: 500,
    height: 400,
};

const valueFormatter = (value: number | null) => `${value} year`;

const TimelineArea = () => {

    const { areas } = useAreaStore(
        (state) => ({
            areas: state.areasForm
        })
    );



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <BarChart

            />
        </Box>
    );
};

export default TimelineArea;
