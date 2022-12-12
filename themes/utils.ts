export function applyTheme(theme: unknown) {
  const root = document.documentElement
  Object.keys(theme).forEach((cssVar) => {
    root.style.setProperty(cssVar, theme[cssVar])
  })
}

export function createTheme({
  primary,
  primaryLight,
  primaryDark,
  secondary,
  secondaryLight,
  secondaryDark,
  accent,
  accentLight,
  accentDark,
  success,
  successLight,
  successDark,
  error,
  errorLight,
  errorDark,
  info,
  infoLight,
  infoDark,
  warning,
  warningLight,
  warningDark
}) {
  return {
    '--theme-primary': primary,
    '--theme-primary-light': primaryLight,
    '--theme-primary-dark': primaryDark,
    '--theme-secondary': secondary,
    '--theme-secondary-light': secondaryLight,
    '--theme-secondary-dark': secondaryDark,
    '--theme-accent': accent,
    '--theme-accent-light': accentLight,
    '--theme-accent-dark': accentDark,
    '--theme-success': success,
    '--theme-success-light': successLight,
    '--theme-success-dark': successDark,
    '--theme-error': error,
    '--theme-error-light': errorLight,
    '--theme-error-dark': errorDark,
    '--theme-info': info,
    '--theme-info-light': infoLight,
    '--theme-info-dark': infoDark,
    '--theme-warning': warning,
    '--theme-warning-light': warningLight,
    '--theme-warning-dark': warningDark
  }
}
