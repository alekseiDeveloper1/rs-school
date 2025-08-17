function Button(props: { acceptFilter: () => void }) {
  return <button onClick={props.acceptFilter}>Search</button>;
}

export default Button;
