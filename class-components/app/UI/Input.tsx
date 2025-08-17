function Input(props: {
  modelSearch: (search: string) => void;
  searchValue: string;
}) {
  return (
    <input
      className={'mr-10'}
      onChange={(event) => props.modelSearch(event.currentTarget.value)}
      value={props.searchValue}
      placeholder="Search..."
    />
  );
}

export default Input;
