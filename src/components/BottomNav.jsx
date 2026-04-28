import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function BottomNav() {
  const { t } = useApp();

  const navItems = [
    { to: '/', icon: '🏠', label: 'navHome' },
    { to: '/story', icon: '📖', label: 'navStory' },
    { to: '/guide', icon: '📋', label: 'navGuide' },
    { to: '/ask', icon: '🤖', label: 'navAsk' },
    { to: '/timeline', icon: '📅', label: 'navTimeline' },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
          end={item.to === '/'}
        >
          <span className="bottom-nav-icon">{item.icon}</span>
          <span className="bottom-nav-label">{t(item.label)}</span>
        </NavLink>
      ))}
    </nav>
  );
}
