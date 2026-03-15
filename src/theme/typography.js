const createTypography = () => ({
  fontFamily: ['Plus Jakarta Sans', 'sans-serif'].join(','),
  
  // ─── Monospace (for code blocks etc) ──────────────────────
  monoFontFamily: ['Spline Sans Mono', 'monospace'].join(','),

  h1: {
    fontWeight: 700,
    fontSize: '3rem',        // 48px
    lineHeight: 1.6,         // ↑ softer
    letterSpacing: '-0.5px', // slight tightening for large headings
  },
  h2: {
    fontWeight: 700,
    fontSize: '2.625rem',    // 42px
    lineHeight: 1.6,
    letterSpacing: '-0.4px',
  },
  h3: {
    fontWeight: 700,
    fontSize: '2rem',        // 32px
    lineHeight: 1.6,
    letterSpacing: '-0.3px',
  },
  h4: {
    fontWeight: 600,         // ↓ slightly softer than 700
    fontSize: '1.75rem',     // 28px
    lineHeight: 1.6,
    letterSpacing: '-0.2px',
  },
  h5: {
    fontWeight: 600,
    fontSize: '1.5rem',      // 24px
    lineHeight: 1.6,
    letterSpacing: '-0.1px',
  },
  h6: {
    fontWeight: 600,
    fontSize: '1.3125rem',   // 21px
    lineHeight: 1.55,
    letterSpacing: '0px',
  },
  subtitle1: {
    fontWeight: 400,
    fontSize: '1rem',        // 16px
    lineHeight: 1.65,        // ↑ more breathing room
    letterSpacing: '0.1px',
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: '0.875rem',    // 14px
    lineHeight: 1.65,
    letterSpacing: '0.1px',
  },
  body1: {
    fontWeight: 400,
    fontSize: '1rem',        // 16px
    lineHeight: 1.75,        // ↑ most readable for paragraphs
    letterSpacing: '0.15px',
  },
  body2: {
    fontWeight: 400,
    fontSize: '0.875rem',    // 14px
    lineHeight: 1.75,
    letterSpacing: '0.15px',
  },
  button: {
    fontWeight: 600,         // ↓ softer than 700
    fontSize: '0.875rem',    // 14px
    lineHeight: 1.4,         // ↑ slightly more space
    letterSpacing: '0.3px',
    textTransform: 'capitalize',
  },
  caption: {
    fontWeight: 400,
    fontSize: '0.75rem',     // 12px
    lineHeight: 1.5,         // ↑ easier to read small text
    letterSpacing: '0.2px',
  },
  overline: {
    fontWeight: 500,         // ↑ slightly bolder for labels
    fontSize: '0.75rem',     // 12px
    lineHeight: 1.5,
    letterSpacing: '0.8px',  // ↑ more spacing for uppercase readability
    textTransform: 'uppercase',
  },
});

export default createTypography;