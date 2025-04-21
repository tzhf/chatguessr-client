interface MenuItem {
  label: string
  labelClass?: string
  to?: string
  icon?: string
  target?: string
  onClick?: () => void
}
