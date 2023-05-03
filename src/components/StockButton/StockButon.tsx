import React, { useState } from 'react';
import { theme } from '../../style/Theme';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';

import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Menu from '@mui/material/Menu';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

type StockButtonProps = {
  onClickAdd?: Function;
  onClickEdit?: Function;
  onClickRemove?: Function;
  onClickDuplicate?: Function;
  isDisabled?: boolean
};

export default function StockButton({
  onClickAdd,
  onClickEdit,
  onClickRemove,
  onClickDuplicate,
  isDisabled
}: StockButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        disabled={isDisabled}
        style={{
          color: 'white',
          backgroundColor: `${theme.colors.secondary}`,
        }}
      >
        <Text>Ações</Text>
      </Button>
      <CustomMenu
        id="demo-customized-menu"
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
             <AddIcon fontSize='small'  sx={{ mr: 0.5 }} />
            <TextItem>Adicionar</TextItem>
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
            <EditIcon fontSize='small'  sx={{ mr: 0.5 }} />
            <TextItem>Editar</TextItem>
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
            <FileCopyIcon  fontSize='small' sx={{ mr: 0.5 }} />
            
            <TextItem>Duplicar</TextItem>
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
            <DeleteIcon fontSize='small' sx={{ mr: 0.5 }} />
             <TextItem>Excluir</TextItem>
             
          </MenuItem>
        )}
      </CustomMenu>
    </div>
  );
}

const ContainerIcon = styled.span`
  margin-right: 0.5px;
`;

const CustomMenu = styled(Menu)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: normal;
`;

const Text = styled.p`
  color: 'white';
  background-color: ${theme.colors.secondary};
  text-transform: none;
  margin: 0;
`;

const TextItem = styled.p`
  color: 'red';
  /* background-color: ${theme.colors.secondary}; */
  text-transform: none;
  font-size: 13px;
  margin: 0;
`;

