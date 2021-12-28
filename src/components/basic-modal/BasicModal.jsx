import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { colorPalette } from '../../fixed-data/colorPalette';
import './BasicModal.css'

export function BasicModal({ open, onClose, title = '', description = '' }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: colorPalette.neutralWhite,
    border: colorPalette.darkerWhite,
    borderRadius: '6px',
    boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.4)',
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        {title && 
          <Typography id="modal-title" variant="h6" component="h2">
            {title}
          </Typography>
        }
        {description && 
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
        }
      </Box>
    </Modal>
  );
}