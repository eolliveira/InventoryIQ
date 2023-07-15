import Chip from '@mui/material/Chip';
import { removeUnderline, toCamelCase } from '../../utils/StringConverter';

type LicenseStatusStyleProps = {
  size?: 'small' | 'medium';
  status: string;
  clickable?: boolean;
  handleClick?: () => void;
};

export default function LicenseStatusStyle({ status, size, clickable, handleClick }: LicenseStatusStyleProps) {
  const color =
    status === 'ATIVA' ? '#00C853' : status === 'INATIVA' ? '#979797' : status === 'EXPIRADA' ? '#D84315' : 'default';

  const bgColor =
    status === 'ATIVA'
      ? '#00c85316'
      : status === 'INATIVA'
      ? '#9c9c9c2f'
      : status === 'EXPIRADA'
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
