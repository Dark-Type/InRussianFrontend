import { MoonIcon } from "../icons/MoonIcon";
import { SunIcon } from "../icons/SunIcon";

export const ThemeSwitcher = ({ theme, toggle }: { theme: string; toggle: () => void }) => {
  return (
    <label
      style={{
        position: 'relative',
        display: 'inline-block',
        width: 52,
        height: 28,
        cursor: 'pointer',
      }}
      aria-label="Переключить тему"
    >
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={toggle}
        style={{ opacity: 0, width: 0, height: 0 }}
      />
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'var(--color-border)',
          borderRadius: 28,
          transition: 'background-color 0.3s',
        }}
      />
      <span
        style={{
          position: 'absolute',
          top: 2,
          left: theme === 'dark' ? 26 : 2,
          width: 24,
          height: 24,
          backgroundColor: 'var(--color-primary)',
          borderRadius: '50%',
          transition: 'left 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          userSelect: 'none',
          boxShadow: '0 0 2px rgba(0,0,0,0.3)',
        }}
      >
        {theme === 'light' ? <MoonIcon width={16} height={16} color="white" /> : <SunIcon width={16} height={16} color="white" />}
      </span>
    </label>
  );
};