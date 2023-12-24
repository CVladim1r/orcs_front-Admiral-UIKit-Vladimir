import { LogoutButton } from '@/features/logout';
import { useState, FC } from 'react';
import { SidebarItem, isNestedItem, sidebarData } from '../../model/sidebar-data';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '@/shared/assets/dark-logo.png';

interface SidebarProps {}

export const Sidebar: FC<SidebarProps> = () => {
  const { t } = useTranslation();
  const [sidebarItems] = useState(sidebarData.items);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const mapItems = (items: SidebarItem[]) => {
    return items.map((item) => {
      const isNested = isNestedItem(item);
      const isActive = activeItem === item.title;

      return (
        <div key={item.title}>
          <li
            style={{
              backgroundColor: isActive ? '#f5f5f5' : '',
              color: '#2b313b',
              position: 'relative',
              borderBottom: 'none',
            }}
            className={``}
          >
            
            {isActive && (
              <div style={{ position: 'absolute', left: '0px', color: '#2375e1' }}>
                &#8226;
              </div>
            )}
            {!isActive && !isNested && (
              <div style={{ position: 'absolute', left: '0px', color: '#8a96a8' }}>
                &#8226;
              </div>
            )}
            {isNested ? (
              <details
                style={{
                  paddingTop: '68px',
                  marginTop: '55px',
                  color: '#2b313b',
                  fontFamily: 'VTB Group UI',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  lineHeight: '20px',
                }}
                open
              >
                <img
                  style={{
                    position: 'absolute',
                    top: '62px',
                    left: '18px',
                  }}
                  src={logo}
                  alt="Logo"
                />
                <summary>
                  {item.itemStart && <div>{item.itemStart}</div>}
                  <div>{t(item.title)}</div>
                </summary>
                <ul>{mapItems(item.children)}</ul>
              </details>
            ) : (
              <NavLink
                to={item.href}
                style={{
                  backgroundColor: isActive ? '#e8e9eb' : '',
                  borderRadius: 5,
                  paddingLeft: '45px',
                  color: '#2b313b',
                  fontFamily: 'VTB Group UI',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '20px',
                }}
                onClick={() => setActiveItem(item.title)}
              >
                {item.itemStart && <div>{item.itemStart}</div>}
                {t(item.title)}
                <div style={{width: '4px', background: '#e8e9eb', position: 'absolute', height: '40px', left: '-10px'}}></div>
              </NavLink>
            )}
          </li>
        </div>
      );
    });
  };

  return (
    <aside className="h-full flex flex-col">
      <ul className="menu w-64 box">{mapItems(sidebarItems)}</ul>
      <LogoutButton />
    </aside>
  );
};
