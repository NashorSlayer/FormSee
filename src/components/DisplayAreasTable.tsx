"use cliet"
import { useAreaStore } from '@/store/AreasStore'
import { Sheet, Table } from '@mui/joy'
import React from 'react'

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
                variant="soft"
                borderAxis="xBetween"
            >
                <thead>
                    <tr>
                        <th>Row</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(areas) && areas.map((area, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{area.name}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Sheet>
    )
}

export default DisplayAreasTable