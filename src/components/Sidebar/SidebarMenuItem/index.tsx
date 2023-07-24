import { MenuItem } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';

type SideBarMenuItem = {
  label: string;
  path: string;
  icon?: React.ReactNode;
};

export default function SideBarMenuItem({ label, path, icon }: SideBarMenuItem) {
  return (
    <MenuItem
      style={{
        margin: '5px 10px',
        borderRadius: 10,
      }}
      icon={icon}
      active={location.pathname.startsWith(path)}
      component={<NavLink to={path} />}
    >
      <span style={{ marginLeft: 15, fontSize: 13 }}>{label}</span>
    </MenuItem>
  );
}
