"use client"
import { useAreaStore } from '@/store/areaStore';
import { useFormStore } from '@/store/formStore';
import { Box, Button, Typography } from '@mui/joy';
import { List, ListItem, ListItemText } from '@mui/material';
import { useRouter } from 'next/navigation';

const AreaList = () => {

    const router = useRouter()
    const { prevStep } = useFormStore();

    const { areasForm } = useAreaStore((state) => ({
        areasForm: state.areasForm
    }));

    const handleBack = () => {
        prevStep()
        router.refresh()
    }

    return (
        <Box>
            <Box
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
            >
                <Typography
                    id="decorated-list-demo"
                    level="body-lg"
                    textTransform="uppercase"
                    fontWeight="lg"
                    textAlign={'center'}
                    mb={1}
                >Areas List
                </Typography>
                <Button
                    onClick={handleBack}
                    color='danger'
                    variant='solid'
                >
                    Back
                </Button>
            </Box>
            <List>
                {areasForm.map((area, index) => (
                    <ListItem key={index} className="rounded-lg bg-gray-800 text-white my-2">
                        <ListItemText primary={area.name} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default AreaList;
