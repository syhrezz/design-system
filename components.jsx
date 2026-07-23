/**
 * NexaCRM Design System — React Components
 * 
 * Source: Extracted from D:\PromptEngineer\CRM prototype
 * Font: Plus Jakarta Sans (admin/director/supervisor) | Poppins (sales/manager)
 * Stack: React + Tailwind CSS (or plain CSS with CSS custom properties)
 * 
 * Usage: Copy individual components or import the whole file.
 * Each component maps 1:1 to patterns found in the prototype HTML.
 */

import React, { useState, useEffect, useRef } from 'react';

// ─────────────────────────────────────────────
// DESIGN TOKENS (use as JS constants or inject as CSS vars)
// ─────────────────────────────────────────────
export const tokens = {
  colors: {
    primary:       '#3B5BDB',
    primaryLight:  '#EEF2FF',
    primaryDark:   '#2F4AC7',
    accentDirector:'#6366F1',
    accentAdmin:   '#0F172A',
    success:       '#0E9F6E',
    warning:       '#E3A008',
    danger:        '#F05252',
    surface:       '#F8FAFC',
    surfaceDir:    '#F0F4FF',
    card:          '#FFFFFF',
    border:        '#E2E8F0',
    textPrimary:   '#0F172A',
    textSecondary: '#64748B',
    textMuted:     '#94A3B8',
    sidebarBg:     '#0F172A',
    sidebarBgDir:  '#0C0F1A',
  },
  radius: {
    xs: '6px', sm: '8px', md: '10px', lg: '12px',
    xl: '14px', '2xl': '16px', '3xl': '18px', '4xl': '20px', full: '999px',
  },
  shadows: {
    card:        '0 4px 6px rgba(0,0,0,0.02)',
    cardHover:   '0 12px 30px rgba(0,0,0,0.06)',
    btnPrimary:  '0 4px 14px rgba(99,102,241,0.3)',
    modal:       '0 20px 60px rgba(0,0,0,0.2)',
    sidebar:     '10px 0 30px rgba(0,0,0,0.1)',
  },
};

// ─────────────────────────────────────────────
// BASE CSS (inject into <style> or global CSS)
// ─────────────────────────────────────────────
export const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&family=Poppins:wght@300;400;500;600;700;800&display=swap');
  :root {
    --primary: #3B5BDB; --primary-light: #EEF2FF; --primary-dark: #2F4AC7;
    --accent-director: #6366F1; --accent-admin: #0F172A;
    --success: #0E9F6E; --warning: #E3A008; --danger: #F05252;
    --surface: #F8FAFC; --card: #FFFFFF; --border: #E2E8F0;
    --text-primary: #0F172A; --text-secondary: #64748B; --text-muted: #94A3B8;
    --sidebar-bg: #0F172A; --sidebar-text: #94A3B8;
    --font-primary: 'Plus Jakarta Sans', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: var(--font-primary); background: var(--surface); color: var(--text-primary); }
`;

// ─────────────────────────────────────────────
// BUTTON
// ─────────────────────────────────────────────
/**
 * Button variants: 'primary' | 'outline' | 'danger' | 'success' | 'ghost' | 'dark'
 * Sizes: 'md' (default) | 'sm' | 'xs'
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    fontFamily: 'inherit', fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none', textDecoration: 'none', opacity: disabled ? 0.5 : 1,
    transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
    borderRadius: size === 'xs' ? '7px' : size === 'sm' ? '8px' : '12px',
  };

  const sizes = {
    md: { padding: '10px 20px', fontSize: '14px' },
    sm: { padding: '6px 12px', fontSize: '12px' },
    xs: { padding: '4px 10px', fontSize: '11px', gap: '5px' },
  };

  const variants = {
    primary: { background: '#6366F1', color: '#fff', boxShadow: '0 4px 14px rgba(99,102,241,0.3)' },
    outline: { background: '#fff', color: '#0F172A', border: '1px solid #E2E8F0' },
    danger:  { background: '#F05252', color: '#fff', boxShadow: '0 4px 14px rgba(240,82,82,0.3)' },
    success: { background: '#0E9F6E', color: '#fff', boxShadow: '0 4px 14px rgba(14,159,110,0.25)' },
    ghost:   { background: 'transparent', color: '#64748B', border: 'none' },
    dark:    { background: '#0F172A', color: '#fff' },
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{ ...base, ...sizes[size], ...variants[variant] }}
      className={className}
      {...props}
    >
      {icon && icon}
      {children}
    </button>
  );
};

// ─────────────────────────────────────────────
// BADGE
// ─────────────────────────────────────────────
/**
 * variant: 'success'|'warning'|'danger'|'info'|'purple'|'amber'
 *          'hot'|'warm'|'cold'|'deal'|'lost'  (lead temperature)
 * dot: boolean — shows a colored dot before text
 */
export const Badge = ({ children, variant = 'info', dot = false, className = '' }) => {
  const variants = {
    success: { background: '#DEF7EC', color: '#03543F' },
    warning: { background: '#FEF3C7', color: '#92400E' },
    danger:  { background: '#FDE2E2', color: '#9B1C1C' },
    info:    { background: '#E1EFFE', color: '#1E429F' },
    purple:  { background: '#F5F3FF', color: '#5521B5' },
    amber:   { background: '#FEF3C7', color: '#92400E' },
    hot:     { background: '#fef2f2', color: '#dc2626' },
    warm:    { background: '#fff7ed', color: '#ea580c' },
    cold:    { background: '#f0f9ff', color: '#0284c7' },
    deal:    { background: '#f0fdf4', color: '#16a34a' },
    lost:    { background: '#f9fafb', color: '#6b7280' },
  };

  const style = {
    display: 'inline-flex', alignItems: 'center', gap: '5px',
    padding: '4px 10px', borderRadius: '999px',
    fontSize: '11px', fontWeight: 700,
    ...variants[variant],
  };

  return (
    <span style={style} className={className}>
      {dot && (
        <span style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: 'currentColor', display: 'inline-block',
        }} />
      )}
      {children}
    </span>
  );
};

// ─────────────────────────────────────────────
// CARD
// ─────────────────────────────────────────────
/**
 * variant: 'default' | 'sm' | 'dark' | 'glass'
 */
export const Card = ({ children, variant = 'default', style = {}, className = '', ...props }) => {
  const variants = {
    default: {
      background: '#fff', borderRadius: '20px', border: '1px solid #E2E8F0',
      padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
      transition: 'all 0.3s ease',
    },
    sm: {
      background: '#fff', borderRadius: '14px', border: '1px solid #E2E8F0',
      padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      transition: 'all 0.3s ease',
    },
    dark: {
      background: 'linear-gradient(135deg,#0F172A,#1E293B)', borderRadius: '20px',
      padding: '24px', border: 'none', color: '#fff',
    },
    glass: {
      background: 'rgba(255,255,255,0.8)', borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.3)', padding: '24px',
      backdropFilter: 'blur(12px)',
    },
  };

  return (
    <div style={{ ...variants[variant], ...style }} className={className} {...props}>
      {children}
    </div>
  );
};

// ─────────────────────────────────────────────
// INPUT
// ─────────────────────────────────────────────
export const Input = ({
  label, hint, error, icon, type = 'text',
  placeholder, value, onChange, disabled = false,
  className = '', ...props
}) => {
  const [focused, setFocused] = useState(false);

  const inputStyle = {
    width: '100%', padding: icon ? '10px 14px 10px 36px' : '10px 14px',
    borderRadius: '10px', fontSize: '13px', fontFamily: 'inherit',
    outline: 'none', color: '#0F172A', background: disabled ? '#F8FAFC' : '#fff',
    cursor: disabled ? 'not-allowed' : 'text',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    border: error
      ? '1px solid #F05252'
      : focused ? '1px solid #3B5BDB' : '1px solid #E2E8F0',
    boxShadow: error && focused
      ? '0 0 0 3px rgba(240,82,82,0.1)'
      : focused ? '0 0 0 3px rgba(59,91,219,0.1)' : 'none',
  };

  return (
    <div style={{ marginBottom: '16px' }} className={className}>
      {label && (
        <label style={{
          display: 'block', fontSize: '12px', fontWeight: 700,
          color: '#64748B', marginBottom: '6px',
          textTransform: 'uppercase', letterSpacing: '0.5px',
        }}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {icon && (
          <span style={{
            position: 'absolute', left: '10px', top: '50%',
            transform: 'translateY(-50%)', color: '#94A3B8',
            display: 'flex', alignItems: 'center',
          }}>
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          style={inputStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
      </div>
      {error && <div style={{ fontSize: '11px', color: '#F05252', marginTop: '4px', fontWeight: 600 }}>{error}</div>}
      {hint && !error && <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>{hint}</div>}
    </div>
  );
};

// ─────────────────────────────────────────────
// SELECT
// ─────────────────────────────────────────────
export const Select = ({ label, options = [], value, onChange, placeholder, hint, error, className = '', ...props }) => {
  const [focused, setFocused] = useState(false);

  const selectStyle = {
    width: '100%', padding: '10px 14px', borderRadius: '10px',
    fontSize: '13px', fontFamily: 'inherit', outline: 'none',
    color: '#0F172A', background: '#fff',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    border: error ? '1px solid #F05252' : focused ? '1px solid #3B5BDB' : '1px solid #E2E8F0',
    boxShadow: focused ? '0 0 0 3px rgba(59,91,219,0.1)' : 'none',
    cursor: 'pointer', appearance: 'none',
  };

  return (
    <div style={{ marginBottom: '16px' }} className={className}>
      {label && (
        <label style={{
          display: 'block', fontSize: '12px', fontWeight: 700,
          color: '#64748B', marginBottom: '6px',
          textTransform: 'uppercase', letterSpacing: '0.5px',
        }}>
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        style={selectStyle}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt, i) => (
          <option key={i} value={typeof opt === 'object' ? opt.value : opt}>
            {typeof opt === 'object' ? opt.label : opt}
          </option>
        ))}
      </select>
      {hint && <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>{hint}</div>}
      {error && <div style={{ fontSize: '11px', color: '#F05252', marginTop: '4px', fontWeight: 600 }}>{error}</div>}
    </div>
  );
};

// ─────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────
/**
 * Controlled modal. Pass `open` and `onClose`.
 * Footer accepts an array of Button components.
 */
export const Modal = ({ open, onClose, title, children, footer, maxWidth = '500px' }) => {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
        zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: '#fff', width: '100%', maxWidth,
        borderRadius: '16px', overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        animation: 'modalIn 0.3s ease',
      }}>
        <style>{`@keyframes modalIn{from{transform:scale(.95);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
        {/* Header */}
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid #E2E8F0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>{title}</div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#94A3B8', fontSize: '20px', lineHeight: 1,
              padding: '4px', borderRadius: '6px',
            }}
          >&#x2715;</button>
        </div>
        {/* Body */}
        <div style={{ padding: '24px' }}>{children}</div>
        {/* Footer */}
        {footer && (
          <div style={{
            padding: '16px 24px', borderTop: '1px solid #E2E8F0',
            display: 'flex', justifyContent: 'flex-end', gap: '12px',
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// TOAST SYSTEM
// ─────────────────────────────────────────────
/**
 * Usage:
 *   const { toasts, showToast } = useToasts();
 *   showToast('success', 'User Added', 'Budi Santoso has been added.');
 *   Render <ToastContainer toasts={toasts} onRemove={removeToast} /> at app root.
 */
export const useToasts = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (type, title, message) => {
    const id = Date.now().toString();
    setToasts(prev => {
      const next = prev.length >= 3 ? prev.slice(1) : prev;
      return [...next, { id, type, title, message }];
    });
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  return { toasts, showToast, removeToast };
};

export const ToastContainer = ({ toasts, onRemove }) => {
  const borderColors = {
    success: '#0E9F6E', error: '#F05252', warning: '#E3A008', info: '#3B5BDB',
  };
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };

  return (
    <div style={{
      position: 'fixed', bottom: '24px', right: '24px',
      zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '10px',
    }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          display: 'flex', alignItems: 'flex-start', gap: '12px',
          background: '#fff', border: '1px solid #E2E8F0',
          borderLeft: `4px solid ${borderColors[t.type] || '#3B5BDB'}`,
          borderRadius: '14px', padding: '14px 16px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          minWidth: '280px', maxWidth: '360px', position: 'relative',
          animation: 'fadeIn 0.3s ease',
        }}>
          <span style={{ fontSize: '18px', flexShrink: 0 }}>{icons[t.type]}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{t.title}</div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>{t.message}</div>
          </div>
          <button
            onClick={() => onRemove(t.id)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#94A3B8', fontSize: '16px', lineHeight: 1, padding: '2px',
              position: 'absolute', top: '10px', right: '10px',
            }}
          >&#x2715;</button>
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────
/**
 * change: { value: '+12%', direction: 'up' | 'down' | 'neutral' }
 * iconBg / iconColor: CSS color strings
 */
export const StatCard = ({ icon, value, label, change, iconBg = '#EEF2FF', iconColor = '#4F46E5' }) => (
  <div style={{
    background: '#fff', borderRadius: '14px', border: '1px solid #E2E8F0',
    padding: '20px', display: 'flex', alignItems: 'center', gap: '16px',
    transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default',
  }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = '0 10px 28px rgba(37,99,235,0.14)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    <div style={{
      width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
      background: iconBg, color: iconColor,
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
    }}>
      {icon}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1, color: '#0F172A' }}>
        {value}
      </div>
      <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px', fontWeight: 500 }}>{label}</div>
      {change && (
        <div style={{
          fontSize: '11px', fontWeight: 700, marginTop: '4px',
          color: change.direction === 'up' ? '#0E9F6E' : change.direction === 'down' ? '#F05252' : '#E3A008',
        }}>
          {change.value}
        </div>
      )}
    </div>
  </div>
);

// ─────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────
/**
 * variant: 'admin' | 'director' | 'supervisor' | 'sales'
 * items: [{ label, href, icon (JSX), badge, section }]
 * Each item with section: true renders a section divider above it.
 */
export const Sidebar = ({ variant = 'admin', logoText = 'NexaCRM', logoSub, items = [], activePage, onToggle }) => {
  const [collapsed, setCollapsed] = useState(() =>
    localStorage.getItem(`${variant}-sidebar-collapsed`) === 'true'
  );

  const bgColors = {
    admin: '#0F172A', director: '#0C0F1A', supervisor: '#0F172A', sales: '#1e3a8a',
  };
  const accentColors = {
    admin: '#3B5BDB', director: '#6366F1', supervisor: '#3B5BDB', sales: '#93c5fd',
  };
  const logoGradients = {
    admin:      'linear-gradient(135deg,#1E293B,#334155)',
    director:   'linear-gradient(135deg,#6366F1,#8B5CF6)',
    supervisor: 'linear-gradient(135deg,#0E9F6E,#3B5BDB)',
    sales:      'none',
  };

  const accent = accentColors[variant];
  const width = collapsed ? (variant === 'director' ? '80px' : '68px') : (variant === 'director' ? '280px' : '268px');

  const handleToggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem(`${variant}-sidebar-collapsed`, next);
    onToggle && onToggle(next);
  };

  return (
    <nav style={{
      position: 'fixed', left: 0, top: 0, height: '100vh', width,
      background: bgColors[variant], display: 'flex', flexDirection: 'column',
      zIndex: 1000, transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
      borderRight: '1px solid rgba(255,255,255,0.05)',
      boxShadow: '10px 0 30px rgba(0,0,0,0.1)',
    }}>
      {/* Logo */}
      <div style={{
        padding: '22px 20px', display: 'flex', alignItems: 'center', gap: '12px',
        borderBottom: '1px solid rgba(255,255,255,0.05)', minHeight: '68px', overflow: 'hidden',
      }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '11px', flexShrink: 0,
          background: logoGradients[variant], display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '17px', fontWeight: 800, color: '#fff',
          boxShadow: variant === 'director' ? '0 8px 16px rgba(99,102,241,0.3)' : '0 4px 12px rgba(0,0,0,0.2)',
        }}>
          {logoText[0]}
        </div>
        <div style={{
          opacity: collapsed ? 0 : 1,
          transform: collapsed ? 'translateX(-10px)' : 'translateX(0)',
          transition: 'opacity 0.2s, transform 0.2s',
          overflow: 'hidden', pointerEvents: collapsed ? 'none' : 'auto',
        }}>
          <div style={{ fontSize: '17px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', whiteSpace: 'nowrap' }}>
            {logoText}
          </div>
          {logoSub && (
            <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
              {logoSub}
            </div>
          )}
        </div>
      </div>

      {/* Nav Items */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 12px', scrollbarWidth: 'none' }}>
        {items.map((item, i) => {
          const isActive = activePage === item.href;
          return (
            <React.Fragment key={i}>
              {item.section && !collapsed && (
                <div style={{
                  fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px',
                  textTransform: 'uppercase', color: 'rgba(148,163,184,0.4)',
                  padding: '16px 8px 6px', whiteSpace: 'nowrap',
                }}>
                  {item.section}
                </div>
              )}
              <a
                href={item.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '10px 12px', borderRadius: '10px', cursor: 'pointer',
                  textDecoration: 'none', marginBottom: '2px', position: 'relative',
                  fontSize: '14px', fontWeight: 500,
                  color: isActive ? '#fff' : '#94A3B8',
                  background: isActive
                    ? (variant === 'director'
                        ? 'linear-gradient(135deg,rgba(99,102,241,0.25),rgba(139,92,246,0.15))'
                        : 'rgba(255,255,255,0.12)')
                    : 'transparent',
                  boxShadow: isActive && variant === 'director'
                    ? 'inset 0 0 0 1px rgba(99,102,241,0.4)'
                    : 'none',
                  transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                }}
              >
                {/* Active accent bar */}
                {isActive && (
                  <span style={{
                    position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                    width: '4px', height: '20px', background: accent,
                    borderRadius: '0 4px 4px 0',
                    boxShadow: `2px 0 8px ${accent}80`,
                  }} />
                )}
                {/* Icon */}
                <span style={{ width: '22px', height: '22px', flexShrink: 0, opacity: isActive ? 1 : 0.7 }}>
                  {item.icon}
                </span>
                {/* Label */}
                <span style={{
                  opacity: collapsed ? 0 : 1,
                  transform: collapsed ? 'translateX(-10px)' : 'translateX(0)',
                  transition: 'opacity 0.2s, transform 0.2s',
                  whiteSpace: 'nowrap', flex: 1,
                  pointerEvents: collapsed ? 'none' : 'auto',
                }}>
                  {item.label}
                </span>
                {/* Badge */}
                {item.badge && !collapsed && (
                  <span style={{
                    fontSize: '10px', fontWeight: 800, padding: '2px 8px',
                    borderRadius: '20px', background: accent, color: '#fff',
                    boxShadow: `0 2px 6px ${accent}66`,
                  }}>
                    {item.badge}
                  </span>
                )}
              </a>
            </React.Fragment>
          );
        })}
      </div>

      {/* Toggle Button */}
      <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <button
          onClick={handleToggle}
          style={{
            width: '100%', background: 'rgba(255,255,255,0.06)', border: 'none',
            color: '#94A3B8', cursor: 'pointer', padding: '8px', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start',
            gap: '8px', fontSize: '12px', fontFamily: 'inherit',
          }}
        >
          <svg style={{ width: '16px', height: '16px', transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </nav>
  );
};

// ─────────────────────────────────────────────
// TOPBAR
// ─────────────────────────────────────────────
export const Topbar = ({ sidebarWidth = '268px', userName, userRole, onToggle, onSearch }) => (
  <header style={{
    position: 'fixed', top: 0, left: sidebarWidth, right: 0,
    height: '56px', background: '#fff', borderBottom: '1px solid #E2E8F0',
    display: 'flex', alignItems: 'center', padding: '0 20px', gap: '12px',
    zIndex: 100, transition: 'left 0.35s cubic-bezier(0.4,0,0.2,1)',
  }}>
    <button
      onClick={onToggle}
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '8px', color: '#64748B' }}
    >
      <svg style={{ width: '18px', height: '18px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
    {/* Search */}
    <div style={{
      display: 'flex', alignItems: 'center', gap: '8px', flex: 1, maxWidth: '320px',
      background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '8px 12px',
    }}>
      <svg style={{ width: '15px', height: '15px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="#94A3B8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        id="global-search"
        placeholder="Search..."
        onKeyDown={(e) => e.key === 'Enter' && onSearch && onSearch(e.target.value)}
        style={{
          border: 'none', background: 'none', outline: 'none',
          fontSize: '13px', color: '#64748B', width: '100%', fontFamily: 'inherit',
        }}
      />
    </div>
    {/* Right side */}
    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
      {/* Bell */}
      <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '8px', color: '#64748B' }}>
        <svg style={{ width: '18px', height: '18px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span style={{
          position: 'absolute', top: '4px', right: '4px',
          width: '8px', height: '8px', background: '#F05252',
          borderRadius: '50%', border: '2px solid #fff',
        }} />
      </button>
      {/* User chip */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 10px',
        borderRadius: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0', cursor: 'pointer',
      }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%', background: '#1E293B',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '11px', fontWeight: 700, color: '#fff', flexShrink: 0,
        }}>
          {userName?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U'}
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>{userName}</div>
          <div style={{ fontSize: '10px', color: '#94A3B8' }}>{userRole}</div>
        </div>
        <svg style={{ width: '14px', height: '14px', color: '#94A3B8' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </header>
);

// ─────────────────────────────────────────────
// AVATAR
// ─────────────────────────────────────────────
const avatarBgs = ['#1E293B','#312E81','#065F46','#7C2D12','#1E40AF','#3B0764'];
export const Avatar = ({ name = '', size = 'md', bg, style: styleProp = {} }) => {
  const sizes = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64 };
  const fontSizes = { xs: 9, sm: 11, md: 14, lg: 16, xl: 20 };
  const px = sizes[size] || 40;
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const bgColor = bg || avatarBgs[name.charCodeAt(0) % avatarBgs.length];

  return (
    <div style={{
      width: px, height: px, borderRadius: '50%', background: bgColor,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: fontSizes[size], fontWeight: 700, color: '#fff', flexShrink: 0,
      ...styleProp,
    }}>
      {initials}
    </div>
  );
};

// ─────────────────────────────────────────────
// ALERT BANNER
// ─────────────────────────────────────────────
export const Alert = ({ type = 'info', children, action }) => {
  const styles = {
    warning: { background: 'linear-gradient(135deg,#FEF3C7,#FFFBEB)', border: '1px solid #FCD34D', color: '#92400E' },
    danger:  { background: '#FDE2E2', border: '1px solid #FCA5A5', color: '#9B1C1C' },
    info:    { background: '#E1EFFE', border: '1px solid #93C5FD', color: '#1E429F' },
    success: { background: '#DEF7EC', border: '1px solid #6EE7B7', color: '#03543F' },
  };
  const icons = { warning: '⚠️', danger: '🔴', info: 'ℹ️', success: '✅' };

  return (
    <div style={{
      borderRadius: '12px', padding: '14px 18px',
      display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px',
      ...styles[type],
    }}>
      <span style={{ fontSize: '18px', flexShrink: 0 }}>{icons[type]}</span>
      <div style={{ flex: 1, fontSize: '13px', fontWeight: 500, lineHeight: 1.5 }}>{children}</div>
      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
    </div>
  );
};

// ─────────────────────────────────────────────
// PROGRESS BAR
// ─────────────────────────────────────────────
export const ProgressBar = ({ label, value, max = 100, color = '#3B5BDB', height = 6 }) => {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const colorMap = { green: '#0E9F6E', yellow: '#E3A008', red: '#F05252', blue: '#3B5BDB', indigo: '#6366F1' };
  const fillColor = colorMap[color] || color;

  return (
    <div style={{ marginBottom: '12px' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
          <span style={{ fontWeight: 600, color: '#0F172A' }}>{label}</span>
          <span style={{ fontWeight: 700, color: fillColor }}>{pct}%</span>
        </div>
      )}
      <div style={{ height, background: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`, background: fillColor,
          borderRadius: '999px', transition: 'width 0.5s ease',
        }} />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// HERO KPI BANNER (Director only)
// ─────────────────────────────────────────────
export const HeroKPIBanner = ({ title, greeting, kpis = [] }) => (
  <div style={{
    background: 'linear-gradient(135deg,#0F172A 0%,#1E1B4B 40%,#312E81 70%,#4338CA 100%)',
    borderRadius: '18px', padding: '28px 32px', color: '#fff', marginBottom: '24px',
    position: 'relative', overflow: 'hidden',
    boxShadow: '0 12px 40px rgba(67,56,202,0.35)',
  }}>
    {/* Decorative circles */}
    <div style={{ position:'absolute',right:'-80px',top:'-80px',width:'320px',height:'320px',borderRadius:'50%',background:'rgba(255,255,255,0.04)' }}/>
    <div style={{ position:'absolute',left:'40%',bottom:'-100px',width:'260px',height:'260px',borderRadius:'50%',background:'rgba(99,102,241,0.12)' }}/>
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ fontSize: '13px', fontWeight: 700, opacity: 0.6, letterSpacing: '0.5px' }}>{title}</div>
      <div style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px', marginTop: '4px' }}>{greeting}</div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${kpis.length},1fr)`, gap: '20px', marginTop: '24px' }}>
        {kpis.map((kpi, i) => (
          <div key={i} style={{ borderRight: i < kpis.length - 1 ? '1px solid rgba(255,255,255,0.12)' : 'none', paddingRight: '20px' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-1px', lineHeight: 1 }}>{kpi.value}</div>
            <div style={{ fontSize: '11px', opacity: 0.65, fontWeight: 500, marginTop: '4px' }}>{kpi.label}</div>
            {kpi.change && (
              <div style={{
                fontSize: '11px', fontWeight: 700, marginTop: '6px',
                display: 'inline-flex', alignItems: 'center', gap: '3px',
                padding: '2px 8px', borderRadius: '20px',
                background: kpi.change.direction === 'up'   ? 'rgba(16,185,129,0.2)'
                           : kpi.change.direction === 'down' ? 'rgba(240,82,82,0.2)'
                           : 'rgba(245,158,11,0.2)',
                color:      kpi.change.direction === 'up'   ? '#6EE7B7'
                           : kpi.change.direction === 'down' ? '#FCA5A5'
                           : '#FCD34D',
              }}>
                {kpi.change.value}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// PAGE HEADER
// ─────────────────────────────────────────────
export const PageHeader = ({ title, subtitle, actions }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px', gap: '16px' }}>
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.8px', color: '#0F172A' }}>{title}</h1>
      {subtitle && <p style={{ fontSize: '14px', color: '#64748B', marginTop: '4px' }}>{subtitle}</p>}
    </div>
    {actions && <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>{actions}</div>}
  </div>
);

// ─────────────────────────────────────────────
// SECTION HEADER
// ─────────────────────────────────────────────
export const SectionHeader = ({ title, subtitle, action }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
    <div>
      <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.3px' }}>{title}</div>
      {subtitle && <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>{subtitle}</div>}
    </div>
    {action && action}
  </div>
);

// ─────────────────────────────────────────────
// EMPTY STATE
// ─────────────────────────────────────────────
export const EmptyState = ({ icon = '📭', title = 'No data found', description, action }) => (
  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
    <div style={{
      width: '64px', height: '64px', background: '#F1F5F9', borderRadius: '16px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '28px', margin: '0 auto 16px',
    }}>
      {icon}
    </div>
    <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>{title}</div>
    {description && (
      <div style={{ fontSize: '13px', color: '#64748B', maxWidth: '280px', margin: '0 auto 20px', lineHeight: 1.6 }}>
        {description}
      </div>
    )}
    {action && action}
  </div>
);

// ─────────────────────────────────────────────
// APP LAYOUT WRAPPER
// ─────────────────────────────────────────────
/**
 * Wraps the full app layout: sidebar + topbar + main content.
 * Handles sidebar collapse state and shifts topbar/main accordingly.
 *
 * Usage:
 *   <AppLayout sidebar={<Sidebar .../>} topbar={<Topbar .../>}>
 *     <PageHeader .../>
 *     <StatGrid>...</StatGrid>
 *   </AppLayout>
 */
export const AppLayout = ({ children, sidebar, topbar, sidebarWidth = '268px', sidebarCollapsedWidth = '68px' }) => {
  const [collapsed, setCollapsed] = useState(false);
  const mainLeft = collapsed ? sidebarCollapsedWidth : sidebarWidth;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar slot — pass collapsed state via context or props */}
      {sidebar}
      {/* Topbar */}
      <div style={{
        position: 'fixed', top: 0, left: mainLeft, right: 0, zIndex: 100,
        transition: 'left 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}>
        {topbar}
      </div>
      {/* Main */}
      <main style={{
        marginLeft: mainLeft, paddingTop: '56px', flex: 1, minWidth: 0,
        transition: 'margin-left 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '28px 32px' }}>
          {children}
        </div>
      </main>
    </div>
  );
};

// ─────────────────────────────────────────────
// STAT GRID WRAPPER
// ─────────────────────────────────────────────
export const StatGrid = ({ children, cols = 4 }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: '20px', marginBottom: '24px',
  }}>
    {children}
  </div>
);

// ─────────────────────────────────────────────
// DROPDOWN MENU
// ─────────────────────────────────────────────
export const DropdownMenu = ({ trigger, items = [] }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', right: 0,
          background: '#fff', border: '1px solid #E2E8F0', borderRadius: '14px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)', padding: '6px',
          minWidth: '180px', zIndex: 300,
        }}>
          {items.map((item, i) => {
            if (item.divider) return <div key={i} style={{ height: '1px', background: '#F1F5F9', margin: '4px 0' }} />;
            if (item.header) return (
              <div key={i} style={{ padding: '8px 12px 4px', fontSize: '10px', fontWeight: 700, color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase' }}>
                {item.header}
              </div>
            );
            return (
              <div key={i}
                onClick={() => { item.onClick && item.onClick(); setOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '9px 12px', borderRadius: '8px', cursor: 'pointer',
                  fontSize: '13px', fontWeight: 500,
                  color: item.danger ? '#F05252' : '#0F172A',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = item.danger ? '#FDE2E2' : '#F8FAFC'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {item.icon && <span style={{ flexShrink: 0 }}>{item.icon}</span>}
                {item.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// USAGE EXAMPLE
// ─────────────────────────────────────────────
/*
import {
  AppLayout, Sidebar, Topbar, PageHeader, StatGrid, StatCard,
  Card, SectionHeader, Button, Badge, Input, Select,
  Modal, useToasts, ToastContainer, Alert, Avatar,
  ProgressBar, HeroKPIBanner, EmptyState, DropdownMenu
} from './design-system/components';

// App entry:
function App() {
  const { toasts, showToast, removeToast } = useToasts();
  const [modalOpen, setModalOpen] = useState(false);

  const navItems = [
    { section: 'Main', label: 'Dashboard', href: '/dashboard', icon: <HomeIcon />, badge: null },
    { label: 'Users', href: '/users', icon: <UsersIcon /> },
    { section: 'Settings', label: 'Settings', href: '/settings', icon: <SettingsIcon /> },
  ];

  return (
    <AppLayout
      sidebar={<Sidebar variant="director" logoText="NexaCRM" logoSub="Director" items={navItems} activePage="/dashboard" />}
      topbar={<Topbar userName="Ahmad Hendra" userRole="Director" sidebarWidth="280px" />}
    >
      <HeroKPIBanner
        title="EXECUTIVE OVERVIEW"
        greeting="Good morning, Director"
        kpis={[
          { value: 'Rp 4.2M', label: 'Revenue', change: { value: '↑ 12.4%', direction: 'up' } },
          { value: '89%', label: 'Target', change: { value: '↑ 3.1%', direction: 'up' } },
        ]}
      />
      <StatGrid>
        <StatCard icon="👥" value="124" label="Total Users" iconBg="#EEF2FF" iconColor="#4F46E5"
          change={{ value: '↑ 12%', direction: 'up' }} />
        <StatCard icon="💰" value="Rp 4.2M" label="Revenue" iconBg="#F0FDF4" iconColor="#16A34A"
          change={{ value: '↑ 8.3%', direction: 'up' }} />
      </StatGrid>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </AppLayout>
  );
}
*/
