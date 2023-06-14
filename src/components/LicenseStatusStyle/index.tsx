import Chip from '@mui/material/Chip';
import { removeUnderline, toCamelCase } from '../../utils/StringConverter';

type LicenseStatusStyleProps = {
  size?: 'small' | 'medium';
  status: string;
  clickable?: boolean;
  handleClick?: () => void;
};

export default function LicenseStatusStyle({
  status,
  size,
  clickable,
  handleClick,
}: LicenseStatusStyleProps) {
  const color =
    status === 'ATIVA'
      ? '#00C853'
      : status === 'EM_USO'
      ? '#2196F3'
      : status === 'EXPIRADA'
      ? '#979797'
      : status === 'DESATIVADA'
      ? '#D84315'
      : 'default';

  const bgColor =
    status === 'ATIVA'
      ? '#00c85316'
      : status === 'EM_USO'
      ? '#2195f318'
      : status === 'EXPIRADA'
      ? '#9c9c9c2f'
      : status === 'DESATIVADA'
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
