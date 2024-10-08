"use cliet"
import { useAreaStore } from '@/store/areaStore'
import { useAppStore } from '@/store/appStore'
import { Box, Button, Sheet, Table } from '@mui/joy'
import React from 'react'
import AreaModalDelete from './AreaModalDelete'

const DisplayAreasTable: React.FC = () => {

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
                        <tr
                            key={index}
                        >
                            <td>{index + 1}</td>
                            <td>{area.name}</td>
                            <td>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <AreaModalDelete DeleteAreaName={area.name} />
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