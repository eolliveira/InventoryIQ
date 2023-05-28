import Chip from '@mui/material/Chip';
import { stat } from 'fs/promises';
import { toCamelCase } from '../../utils/StringConverter';

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
      ? 'yellow'
      : status === 'EM_REPARO'
      ? 'warning'
      : status === 'INATIVO'
      ? 'gray'
      : status === 'DESCARTADO';

  return (
    <Chip
      size={size}
      label={status && toCamelCase(status)}
      color={color === 'success' ? color : undefined}
    />
  );
}
