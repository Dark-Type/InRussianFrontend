import React from 'react';
import { ProfilePopover } from './ProfilePopover';
import type { User } from '../../api';
import { DoorIcon } from '../icons/DoorIcon';
import { ThemeSwitcher } from './ThemeSwitcher';

interface CommonHeaderProps {
  user: User | null;
  logout: () => void;
  displayName: string;
  avatarUrl: string;
  profilePopoverOpen: boolean;
  setProfilePopoverOpen: (open: boolean) => void;
  onAvatarUpdate: () => void;
  theme: string;
  toggleTheme: () => void;
  panelName?: string;
}

export const CommonHeader: React.FC<CommonHeaderProps> = ({
  user,
  logout,
  displayName,
  avatarUrl,
  profilePopoverOpen,
  setProfilePopoverOpen,
  onAvatarUpdate,
  theme,
  toggleTheme,
  panelName,
}) => {
  return (
    <header
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 32px',
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-card)',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            background:
              user?.role === 'ADMIN' ? '#ff6b6b' :
              user?.role === 'EXPERT' ? '#4ecdc4' :
              user?.role === 'CONTENT_MODERATOR' ? '#ffa726' : '#45b7d1',
            borderRadius: '50%',
            marginRight: '14px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}
        />
        <h2 style={{ fontWeight: 700, fontSize: '1.6rem', margin: 0 }}>{panelName}</h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>
          {displayName}
        </span>
        <ProfilePopover
          onSave={onAvatarUpdate}
          avatarUrl={avatarUrl}
          open={profilePopoverOpen}
          setOpen={setProfilePopoverOpen}
        />
        <ThemeSwitcher theme={theme} toggle={toggleTheme} />
        <button
          onClick={logout}
          style={{
            padding: '6px 10px',
            background: 'none',
            border: '2px solid var(--color-text)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          title="Выйти"
          aria-label="Выйти из системы"
        >
          <DoorIcon />
        </button>
      </div>
    </header>
  );
};
