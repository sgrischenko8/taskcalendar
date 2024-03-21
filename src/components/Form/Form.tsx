import { FormBox } from './Form.styled';

interface FormProps {
  filter: string;
  setFilter: (filter: string) => void;
}

export const Form = ({ filter, setFilter }: FormProps) => {
  function submitHandler(e: React.FormEvent) {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const input = target.query as HTMLInputElement;

    setFilter(input.value);
    target.reset();
  }

  return (
    <FormBox data-testid="form" onSubmit={submitHandler}>
      <input
        type="search"
        name="query"
        placeholder="search for task"
        title="search for task"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
        required
      />
      <svg width="20px" height="20px">
        <use href="sprite.svg#search" />
      </svg>
    </FormBox>
  );
};
