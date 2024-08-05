"use cliet"
import { Sheet, Table } from '@mui/joy'
import React from 'react'

interface props {
    optionsList: string[]
}


const DisplayAreasTable: React.FC<props> = ({ optionsList }) => {
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
                    {optionsList.map((area, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{area}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Sheet>
    )
}

export default DisplayAreasTable