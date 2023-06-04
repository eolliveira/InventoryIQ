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
      ? 'success'
      : status === 'EM_USO'
      ? 'info'
      : status === 'EM_REPARO'
      ? 'warning'
      : status === 'INATIVO'
      ? 'secondary'
      : status === 'DESCARTADO'
      ? 'error'
      : 'default';

  return (
    <Chip
      size={size}
      label={status && removeUnderline(toCamelCase(status))}
      color={color ?? 'warning'}
    />
  );
}
