"use client"
import { useAreaStore, Area } from '@/store/areaStore';
import { useFormStore } from '@/store/formStore';
import { Box, Button, Stack, Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
import {
    SortableContext,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';
import AreaItem from './AreaItem';

const AreaList = () => {

    const router = useRouter()
    const { prevStep } = useFormStore();

    const { areas } = useAreaStore((state) => ({
        areas: state.areasForm
    }));

    const handleBack = () => {
        prevStep()
        router.refresh()
    }

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2
                }}
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
                    size='lg'
                    onClick={handleBack}
                    color='danger'
                    variant='solid'
                >
                    Back
                </Button>
            </Box>
            <Box>
                {areas && Array.isArray(areas) ? (
                    <Stack spacing={2}>
                        <SortableContext
                            items={areas.map((area) => area.name)}
                            strategy={verticalListSortingStrategy}
                        >
                            {areas.map((area, index) => (
                                <AreaItem key={index} area={area} />
                            ))}
                        </SortableContext>
                    </Stack>
                ) : (
                    <Typography
                        level="body-md"
                        textAlign="center"
                        mt={2}
                    >
                        No areas added yet
                    </Typography>
                )

                }
            </Box>
        </Box>
    );
};

export default AreaList;


