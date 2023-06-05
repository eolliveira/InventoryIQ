import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

type StockButtonProps = {
  fontSize?: number;
  isDisabled?: boolean;
  onClickAdd?: Function;
  onClickEdit?: Function;
  onClickRemove?: Function;
  onClickDuplicate?: Function;
};

export default function StockButton({
  fontSize,
  isDisabled,
  onClickAdd,
  onClickEdit,
  onClickRemove,
  onClickDuplicate,
}: StockButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <Button
        id="customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        disabled={isDisabled}
        color="primary"
        size="small"
      >
        <Typography fontSize={fontSize ?? 13} textTransform={'none'}>
          Ações
        </Typography>
      </Button>
      <Menu
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'normal',
        }}
        id="customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {onClickAdd && (
          <MenuItem
            onClick={() => {
              onClickAdd();
              handleClose();
            }}
            sx={{ mb: 0.5 }}
            disableRipple
          >
            <AddIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
            <Typography textTransform={'none'} color={'primary'} fontSize={13}>
              Adicionar
            </Typography>
          </MenuItem>
        )}
        {onClickEdit && (
          <MenuItem
            onClick={() => {
              onClickEdit();
              handleClose();
            }}
            disableRipple
            sx={{ mb: 0.5 }}
          >
            <EditIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
            <Typography textTransform={'none'} color={'primary'} fontSize={13}>
              Editar
            </Typography>
          </MenuItem>
        )}
        {onClickDuplicate && (
          <MenuItem
            onClick={() => {
              onClickDuplicate();
              handleClose();
            }}
            disableRipple
            sx={{ mb: 0.5 }}
          >
            <FileCopyIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />

            <Typography textTransform={'none'} color={'primary'} fontSize={13}>
              Duplicar
            </Typography>
          </MenuItem>
        )}
        {onClickRemove && (
          <MenuItem
            onClick={() => {
              onClickRemove();
              handleClose();
            }}
            disableRipple
            sx={{ mb: 0.5 }}
          >
            <DeleteIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
            <Typography textTransform={'none'} color={'primary'} fontSize={13}>
              Excluir
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
