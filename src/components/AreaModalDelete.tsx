"use client"
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import React, { useState } from 'react';
import { useAreaStore } from '@/store/areaStore';

interface props {
    DeleteAreaName: string;
}

const AreaModalDelete: React.FC<props> = ({ DeleteAreaName }) => {


    const { removeArea } = useAreaStore()
    const [open, toggleOpen] = useState(false)

    const handleDeleteArea = () => {
        removeArea({ name: DeleteAreaName })
        toggleOpen(false)
    }

    const handleOpenModal = (open: boolean) => {
        toggleOpen(open)
    }

    return (
        <React.Fragment>
            <Button
                variant='solid'
                color='danger'
                endDecorator={<DeleteForever />}
                onClick={() => handleOpenModal(true)}
            >
                Discard
            </Button>
            <Modal
                open={open}
                onClose={handleOpenModal}
            >
                <ModalDialog
                    variant='outlined'
                    role='alertdialog'
                >
                    <DialogTitle>
                        <WarningRoundedIcon />
                        Confirmation
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        Are you sure want to discard Area?
                    </DialogContent>
                    <DialogActions>
                        <Button variant='solid' color='danger' onClick={handleDeleteArea} >
                            Delete Area !
                        </Button>
                        <Button
                            variant='plain'
                            color='neutral'
                            onClick={(event) => handleOpenModal(false)}>
                            Cancel
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    )
}

export default AreaModalDelete