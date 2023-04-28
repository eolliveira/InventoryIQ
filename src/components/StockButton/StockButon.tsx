import React, { useState } from 'react';
import { theme } from '../../style/Theme';
import Button from '@material-ui/core/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Menu from '@mui/material/Menu';
import styled from 'styled-components';

type StockButtonProps = {
  onClickAdd?: Function;
  onClickEdit?: Function;
  onClickRemove?: Function;
  onClickDuplicate?: Function;
};

export default function StockButton({
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
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        style={{
          color: 'white',
          backgroundColor: `${theme.colors.secondary}`,
        }}
      >
        Ações
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
            disableRipple
          >
            <ContainerIcon>
              <AddIcon />
            </ContainerIcon>
            Adicionar
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
            <EditIcon sx={{ mr: 0.5 }} />
            Editar
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
            <FileCopyIcon sx={{ mr: 0.5 }} />
            Duplicar
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
            <DeleteIcon sx={{ mr: 0.5 }} />
            Excluir
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