import Chip from '@mui/material/Chip';
import { removeUnderline, toCamelCase } from '../../utils/StringConverter';

type AssetStatusStyleProps = {
  size?: 'small' | 'medium';
  status: string;
};

export default function AssetStatusStyle({
  status,
  size,
}: AssetStatusStyleProps) {
  const color =
    status === 'DISPONIVEL'
      ? '#00C853'
      : status === 'EM_USO'
      ? '#2196F3'
      : status === 'EM_REPARO'
      ? 'warning'
      : status === 'INATIVO'
      ? 'secondary'
      : status === 'DESCARTADO'
      ? '#D84315'
      : 'default';

  const bgColor =
    status === 'DISPONIVEL'
      ? '#00c85316'
      : status === 'EM_USO'
      ? '#2195f318'
      : status === 'EM_REPARO'
      ? 'warning'
      : status === 'INATIVO'
      ? 'secondary'
      : status === 'DESCARTADO'
      ? '#d8421516'
      : 'default';

  return (
    <Chip
      size={size}
      label={status && removeUnderline(toCamelCase(status))}
      sx={{ color: color ?? undefined, backgroundColor: bgColor ?? undefined }}
    />
  );
}
