import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import avatar from '@/shared/assets/Avatar.png';

interface HeaderProps {
  currentUser: {
    username: string;
  };
}

export const Header: FC<HeaderProps> = ({ currentUser }) => {
  const { i18n } = useTranslation();

  const languageNames: { [key: string]: string } = {
    en: 'English',
    ru: 'Russian',
  };
  
  return (
    <header className="flex h-12 shrink-0 p-5 items-center justify-between bg-[#FFF]" style={{boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.1)"}}>
      <h2 style={{fontFamily: "VTB Group UI", fontWeight: 400, fontSize: "16px"}}>Оракулус платформа динамических данных</h2>
      <div className="flex gap-2">
        <p style={{opacity: 1, fontFamily: "VTB Group UI", fontSize: "16px", fontWeight: 400}}>
          {currentUser.username}
        </p>
        <img
          src={avatar}
          alt="avatar-user"
        />
        <p style={{opacity: 0.5, fontFamily: "VTB Group UI", fontSize: "16px", fontWeight: 400}}>
          Активный пользователь
        </p>
      </div>
      
      <button
        style={{color: "#0D69F2", fontFamily: "VTB Group UI", fontSize: "14px"}}
        onClick={() => {
          const nextLanguage = i18n.language === 'en' ? 'ru' : 'en';
          i18n.changeLanguage(nextLanguage);
        }}
      >
        {languageNames[i18n.language]}
      </button>
    </header>
  );
};
