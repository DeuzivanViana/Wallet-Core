type LayoutProps = {
  children?: React.ReactNode,
  className?: string
}

export const Layout = (props: LayoutProps) => {
  return <div className={props.className}>
    {props.children}
  </div>
}