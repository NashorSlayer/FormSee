import { InfoOutlined } from '@mui/icons-material'
import { FormControl, FormHelperText } from '@mui/joy'
import React from 'react'

interface props {
    message?: string
}

const ErrorAlertForm: React.FC<props> = ({ message }) => {
    return (
        <FormControl error>
            <FormHelperText>
                <InfoOutlined />
                {message}
            </FormHelperText>
        </FormControl>
    )
}

export default ErrorAlertForm