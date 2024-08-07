"use cliet"
import { useAreaStore } from '@/store/AreasStore'
import { Box, Button, Sheet, Table } from '@mui/joy'
import React from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

const DisplayAreasTable: React.FC = () => {


    const { removeArea, editArea } = useAreaStore();

    const handleEditArea = (area: string) => {

    }


    const { areas } = useAreaStore((state) => ({
        areas: state.areasForm
    }))
    return (
        <Sheet sx={{ height: "200px", overflow: "auto" }}>
            <Table
                stickyHeader
                hoverRow
                stripe={"odd"}
                variant="outlined"
                borderAxis="xBetween"
            >
                <thead>
                    <tr>
                        <th>Row</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(areas) && areas.map((area, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{area.name}</td>
                            <td>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button
                                        size="sm"
                                        color="warning"
                                        variant="outlined"
                                    ><ModeEditIcon />
                                    </Button>
                                    <Button
                                        size="sm"
                                        color="danger"
                                        variant="outlined"
                                    ><DeleteIcon />
                                    </Button>
                                </Box>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Sheet>
    )
}

export default DisplayAreasTable