import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f0ec50;
  z-index: 0;
  overflow: hidden;
`;

export const ModalBox = styled.div`
  position: fixed;
  padding: 4%;
  width: 40%;
  min-height: 40%;
  background-color: #fff;
  z-index: 95;

  & > button {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }

  & > form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    & > button:last-child {
      margin-left: auto;
      padding: 4px;
      width: 25%;
    }
  }

  & label {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
  }
  & label:last-child {
    display: block;
  }

  & select {
    padding: 4px;
    width: 50%;
    font-size: 18px;

    & option {
      font-size: 18px;
    }

    & option[value='Select ...'] {
      display: none;
    }
    & option[value=''] {
      display: none;
    }
  }

  & textarea {
    margin-top: 10px;
    padding: 8px;
    width: 100%;
    font-size: 18px;
    resize: none;
  }
`;
