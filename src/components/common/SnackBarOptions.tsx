'use client'
import { Snackbar } from '@mui/joy'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';

interface props {
    message: string
    snackBarOpen: boolean
    handleClose: () => void

}

export const SnackBarSuccess: React.FC<props> = ({ message, snackBarOpen, handleClose }) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={snackBarOpen}
            onClose={handleClose}
            color='success'
            variant='solid'
            startDecorator={<CheckCircleIcon />}
            autoHideDuration={4000}
            key={'top' + 'right'}
        >
            {message}
        </Snackbar>
    )
}

export const SnackBarDanger: React.FC<props> = ({ message, snackBarOpen, handleClose }) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={snackBarOpen}
            onClose={handleClose}
            color='danger'
            variant='solid'
            autoHideDuration={4000}
            startDecorator={<DangerousIcon />}
            key={'top' + 'right'}
        >
            {message}
        </Snackbar>
    )
}
