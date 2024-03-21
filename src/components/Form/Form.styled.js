import styled from 'styled-components';

export const FormBox = styled.form`
  margin-bottom: 20px;
  padding: 10px;
  position: relative;

  width: 100%;
  display: flex;

  @media screen and (min-width: 780px) {
    position: absolute;
    max-width: 33%;

    & > input {
      max-width: 100%;
    }
  }

  & > input {
    padding: 5px 10px 5px 40px;
    width: 100%;
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
