import styled from 'styled-components';

export const FormBox = styled.form`
  margin-bottom: 20px;
  padding: 10px;
  position: absolute;
  display: flex;

  & > input {
    padding: 5px 10px 5px 40px;
  }

  & > svg {
    position: absolute;
    top: 15px;
    left: 20px;
    fill: transparent;
    stroke: grey;
  }

  & button[type='submit'] {
    padding: 10px;
    width: auto;
    border-radius: 4px;
  }
`;
