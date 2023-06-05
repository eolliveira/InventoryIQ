import Chip from '@mui/material/Chip';
import { removeUnderline, toCamelCase } from '../../utils/StringConverter';

type AssetStatusStyleProps = {
  size?: 'small' | 'medium';
  status: string;
  clickable?: boolean;
  handleClick?: () => void;
};

export default function AssetStatusStyle({
  status,
  size,
  clickable,
  handleClick,
}: AssetStatusStyleProps) {
  const color =
    status === 'DISPONIVEL'
      ? '#00C853'
      : status === 'EM_USO'
      ? '#2196F3'
      : status === 'EM_REPARO'
      ? '#ffc107'
      : status === 'INATIVO'
      ? '#979797'
      : status === 'DESCARTADO'
      ? '#D84315'
      : 'default';

  const bgColor =
    status === 'DISPONIVEL'
      ? '#00c85316'
      : status === 'EM_USO'
      ? '#2195f318'
      : status === 'EM_REPARO'
      ? '#ffc1071a'
      : status === 'INATIVO'
      ? '#9c9c9c2f'
      : status === 'DESCARTADO'
      ? '#d8421516'
      : 'default';

  return (
    <Chip
      clickable={clickable}
      onClick={handleClick}
      size={size}
      label={status && removeUnderline(toCamelCase(status))}
      sx={{
        color: color ?? undefined,
        backgroundColor: bgColor ?? undefined,
        '&:hover': {
          backgroundColor: bgColor,
        },
      }}
    />
  );
}
