export default function Ring(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="580"
      height="580"
      viewBox="0 0 580 580"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="290" cy="290" r="289.5" stroke={props.color} />
    </svg>
  );
}
