import styled from 'styled-components';

export const Wrapper = styled.section`
  padding: 20px;
  position: relative;
  border-radius: 12px;
  background-color: #fff;
  overflow: hidden;

  .flex-container {
    padding: 0 8px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 48px;
    background-color: rgba(60, 100, 100, 0.1);
  }

  .flex-container > p {
    min-width: 160px;
    font-weight: 500;
    text-align: center;
  }

  button {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  .date {
    & svg {
      width: 12px;
      height: 12px;
      transform: rotate(90deg);
    }
    & button:last-child > svg {
      transform: rotate(-90deg);
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: auto 1fr;
    grid-gap: 4px;
    background-color: rgba(60, 100, 100, 0.1);
  }

  .days {
    justify-items: center;
    background-color: rgba(60, 100, 100, 0.1);

    & > li {
      padding: 4px 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
    }
  }

  .currentMonth {
    font-weight: 500;
    background-color: rgba(80, 90, 110, 0.2);
  }

  .lastMonth {
    color: grey;
    background-color: rgba(120, 130, 120, 0.2);
  }

  .addBtn {
    position: absolute;
    top: 4px;
    right: 4px;
    border: 0.5px solid grey;
    opacity: 0;
    color: green;
    font-size: 1.25rem;
    background: white;
  }
  .addBtn:hover {
    opacity: 0.5;
  }
  .edit {
    top: 30%;
    width: 20px;
    height: 20px;

    & > svg {
      fill: grey;
    }
  }
`;

export const Calendar = styled.ul`
  & > p:first-of-type {
    grid-column: 1;
  }

  & > li > div > ul {
    display: flex;
    flex-direction: column;
    grid-column: 1 / span 2;
    grid-gap: 4px;
  }
`;

export const Day = styled.div`
  position: relative;
  padding: 4px;
  display: grid;
  grid-template-columns: fit-content(100%);
  grid-template-rows: auto 1fr;
  grid-gap: 4px;
  align-items: baseline;
  min-height: 100px;
  height: 100%;
  font-size: 0.8rem;
`;

export const Counter = styled.p`
  grid-column: 2;
  font-size: 0.7rem;
  color: grey;
`;

export const HoliDay = styled.p`
  margin-top: auto;
  margin-left: auto;
  align-self: end;
  grid-column: 1 / span 2;
`;

export const TaskItem = styled.li`
  position: relative;
  padding: 6px 4px;
  border-radius: 2px;
  background-color: white;

  & h3 {
    font-weight: 400;
  }
`;
