import { LogoutButton } from '@/features/logout';
import { useState, FC } from 'react';
import { SidebarItem, isNestedItem, sidebarData } from '../../model/sidebar-data';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '@/shared/assets/dark-logo.png';
import { scales } from 'chart.js';

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
                <div style={{position: "absolute", zIndex: 100, top: 60, left: 30, scale: 2}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="82" height="33" viewBox="0 0 82 33" fill="none">
                    <path d="M21.3335 19.4491H17.7618C16.242 19.4491 15.7016 18.847 15.7016 17.7201V14.8211C15.7016 13.6942 16.242 13.092 17.7618 13.092H21.3335C22.8534 13.092 23.3938 13.6942 23.3938 14.8211V17.7201C23.3938 18.847 22.8534 19.4491 21.3335 19.4491ZM16.9597 14.8727V17.6685C16.9597 18.0212 17.2046 18.2018 17.7534 18.2018H21.342C21.8908 18.2018 22.1357 18.0212 22.1357 17.6685V14.8727C22.1357 14.52 21.8908 14.3394 21.342 14.3394H17.7534C17.2046 14.3394 16.9597 14.52 16.9597 14.8727Z" fill="#2B2A29"/>
                    <path d="M25.7003 19.4491H24.4759V13.092H30.1079C31.6278 13.092 32.1681 13.6942 32.1681 14.8211V15.4491C32.1681 16.576 31.6278 17.1781 30.1079 17.1781H29.1622L32.3539 19.4491H30.1585L27.2032 17.1781H25.7003V19.4491ZM25.7003 14.3394V16.0598H30.1163C30.6652 16.0598 30.91 15.8792 30.91 15.5265V14.8727C30.91 14.52 30.6652 14.3394 30.1163 14.3394H25.7003Z" fill="#2B2A29"/>
                    <path d="M34.1931 19.4491H32.9687V15.2512C32.9687 13.8662 33.7624 13.092 35.3752 13.092H38.2545C39.8672 13.092 40.661 13.8662 40.661 15.2512V19.4491H39.4366V17.419H34.1931V19.4491ZM34.1931 15.2512V16.2577H39.4366V15.2512C39.4366 14.6404 39.1664 14.3394 38.246 14.3394H35.3836C34.4633 14.3394 34.1931 14.6404 34.1931 15.2512Z" fill="#2B2A29"/>
                    <path d="M49.4176 19.4491H43.7857C42.2658 19.4491 41.7254 18.847 41.7254 17.7201V14.8211C41.7254 13.6942 42.2658 13.092 43.7857 13.092H49.4007V14.3394H43.7772C43.2284 14.3394 42.9835 14.52 42.9835 14.8727V17.6685C42.9835 18.0212 43.2284 18.2018 43.7772 18.2018H49.4176V19.4491Z" fill="#2B2A29"/>
                    <path d="M55.9077 19.4491H52.3782C50.8583 19.4491 50.3179 18.847 50.3179 17.7201V13.092H51.576V17.6685C51.576 18.0212 51.8209 18.2018 52.3698 18.2018H55.9161C56.465 18.2018 56.7098 18.0212 56.7098 17.6685V13.092H57.9679V17.7201C57.9679 18.847 57.4275 19.4491 55.9077 19.4491Z" fill="#2B2A29"/>
                    <path d="M64.64 19.4491H59.0671V13.092H60.2915V18.2018H64.64V19.4491Z" fill="#2B2A29"/>
                    <path d="M70.8409 19.4491H67.3114C65.7915 19.4491 65.2511 18.847 65.2511 17.7201V13.092H66.5092V17.6685C66.5092 18.0212 66.7541 18.2018 67.3029 18.2018H70.8493C71.3981 18.2018 71.643 18.0212 71.643 17.6685V13.092H72.9011V17.7201C72.9011 18.847 72.3607 19.4491 70.8409 19.4491Z" fill="#2B2A29"/>
                    <path d="M79.3621 19.4491H73.9666V18.2018H79.3705C79.9194 18.2018 80.1642 18.0212 80.1642 17.6685V17.0147C80.1642 16.662 79.9194 16.4813 79.3705 16.4813H75.7735C74.5661 16.4813 73.9666 16.0254 73.9666 15.1136V14.3135C73.9666 13.4963 74.5661 13.092 75.7566 13.092H81.169V14.3394H75.7144C75.3429 14.3394 75.2331 14.4082 75.2331 14.5716V14.9501C75.2331 15.1566 75.3429 15.234 75.7228 15.234H79.3621C80.882 15.234 81.4224 15.8362 81.4224 16.9631V17.7201C81.4224 18.847 80.882 19.4491 79.3621 19.4491Z" fill="#2B2A29"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M30.8164 0.422363C41.4086 0.422363 50.735 3.27284 56.1642 7.59946C51.068 4.90168 43.6735 3.22194 35.4463 3.22194C20.0578 3.22194 7.58371 9.14347 7.58371 16.4563C7.58371 23.7691 20.0578 29.6907 35.4463 29.6907C43.5403 29.6907 50.8349 28.0448 55.9144 25.4319C50.4518 29.6567 41.242 32.4224 30.7998 32.4224C14.0123 32.4224 0.422363 25.2622 0.422363 16.4393C0.422363 7.61642 14.0289 0.456298 30.7998 0.456298L30.8164 0.422363Z" fill="#2B2A29"/>
                  </svg>
                </div>
                
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
                <div style={{width: '4px', background: '#F6F9FB', position: 'absolute', height: '36px', left: '-10px'}}></div>
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
