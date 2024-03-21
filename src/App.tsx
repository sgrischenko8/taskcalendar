import './index.css';
import {
  Wrapper,
  Calendar,
  Day,
  Counter,
  TaskItem,
  HoliDay,
} from './App.styled';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Modal } from './components/Modal/Modal';
import { Form } from './components/Form/Form';
import { TaskCard } from './components/TaskCard/TaskCard';
import { Loader } from './components/Loader/Loader';
import { useGetHolidaysQuery } from './redux/holidaysSlice';
import { move, reorder, getListStyle } from './utils';

import { Task, Data, Holiday } from '../@types/custom';

const tasksFromBackend: Task[] = [
  {
    id: '1',
    title: 'Look for',
    color: ['green', 'blue'],
    date: '2024-03-18',
  },
  {
    id: '2',
    title: 'Check for',
    color: ['orange', 'violet'],
    date: '2024-03-18',
  },
  {
    id: '3',
    title: 'Prey for',
    color: ['yellow'],
    date: '2024-03-19',
  },
];

const App = () => {
  const { data: holidays, isLoading } = useGetHolidaysQuery([], undefined);

  const [dateString, setDateString] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filter, setFilter] = useState('');
  const [tasks, setTasks] = useState(tasksFromBackend);
  const [filteredTasks, setFilteredTasks] = useState(tasksFromBackend);

  useEffect(() => {
    const filtered = tasks.filter((el) =>
      el.title.toLowerCase().includes(filter.toLowerCase()),
    );
    setFilteredTasks(filtered);
  }, [tasks, filter]);

  function toggleModal() {
    setIsModalOpen((prev) => !prev);
  }

  // ------  calendar ----------

  const today = new Date();
  const monthNumber = today.getMonth() + 1;
  const year = today.getFullYear();

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const [monthYearDisplay, setMonthYearDisplay] = useState({
    month: monthNumber,
    year: year,
  });

  function changeMonth(payload: number) {
    if (monthYearDisplay.month === 1 && payload === -1) {
      setMonthYearDisplay({
        month: 12,
        year: monthYearDisplay.year - 1,
      });
      return;
    }
    if (monthYearDisplay.month === 12 && payload === 1) {
      setMonthYearDisplay({
        month: 1,
        year: monthYearDisplay.year + 1,
      });
      return;
    }
    setMonthYearDisplay({
      month: monthYearDisplay.month + payload,
      year: monthYearDisplay.year,
    });
  }

  function monthYearDisplayToRender() {
    const tempM = monthYearDisplay.month;
    const m = monthNames[tempM - 1];
    const y = monthYearDisplay.year;
    return `${m} ` + `${y}`;
  } // "March 2024"

  // function which return month days number
  function getDaySchema(month: number) {
    const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2 && monthYearDisplay.year % 4 === 0) {
      return 28;
    }

    const daysInThatMonth = daysInMonth[month - 1];
    return daysInThatMonth;
  }

  // ----------------function which create UI ---------------------
  function renderCalendar() {
    const days = [];

    const weekdayFirst = getFirstDay();

    let previousMonthDays = getPrevMonthDays();

    // fill daysArray with days of previous month
    const lastMonthDays = [];

    let counter = weekdayFirst;
    while (counter > 0) {
      counter -= 1;
      lastMonthDays.unshift(previousMonthDays);
      previousMonthDays -= 1;
    }
    days.push(lastMonthDays);

    // fill daysArray with days of current month
    const daysInThatMonth = getDaySchema(monthYearDisplay.month);
    const currentDays = [];

    counter = 0;

    while (counter < daysInThatMonth) {
      counter += 1;
      currentDays.push(counter);
    }
    days.push(currentDays);

    // finish daysArray with days of next month
    const nextMonthDays = [];

    counter = 0;
    const length = weekdayFirst + daysInThatMonth;
    while (counter <= 41 - length) {
      counter += 1;
      nextMonthDays.push(counter);
    }
    days.push(nextMonthDays);

    return days;
  }

  // function which return position of first day in array
  function getFirstDay() {
    return new Date(
      `${monthYearDisplay.year}-${monthYearDisplay.month}-1`,
    ).getDay();
  }

  // function which return previous month days number
  function getPrevMonthDays() {
    if (monthYearDisplay.month === 1) {
      return 31;
    }
    const tempM = monthYearDisplay.month;
    return getDaySchema(tempM - 1);
  }

  function clickHandler() {
    return;
  }

  function todayTasks(day: number, i: number) {
    return filteredTasks.filter((el) => el.date === getDateString(day, i));
  }

  function getDateString(day: number, i: number) {
    let year = monthYearDisplay.year;
    let month = monthYearDisplay.month;
    if (monthYearDisplay.month === 1 && i === 0) {
      year -= monthYearDisplay.year;
      month = 13;
    }
    if (monthYearDisplay.month === 12 && i === 2) {
      year += monthYearDisplay.year;
      month = 0;
    }
    month = month - 1 + i;
    return `${year}-${month < 10 ? '0' + month : month}-${day}`;
  }

  function addTask(day: number, i: number) {
    setDateString(getDateString(day, i));
    setIsModalOpen(true);
  }

  function createTask(data: Data | Task) {
    data.id = nanoid();
    data.date = dateString;

    tasksFromBackend.push(data as unknown as Task);
    setTasks(tasksFromBackend);
    return;
  }

  function getShortMonthName(index: number) {
    return monthNames[index].slice(0, 3) + ' ';
  }

  function getMonthIndex(payload: number) {
    let i = monthYearDisplay.month - 2 + payload;
    if (i < 0) {
      i = 11;
    }
    if (i > 11) {
      i = 0;
    }
    return i;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onDragEnd(result: any) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    let newItems: Task[] = [];
    if (source.droppableId === destination.droppableId) {
      newItems = reorder(tasks, source.index, destination.index);
    } else {
      newItems = move(tasks, source, destination);
    }
    setTasks(newItems);
  }

  function getHoliday(day: number, i: number) {
    if (holidays) {
      const date = getDateString(day, i);
      const holiday: Holiday | undefined = holidays.find(
        (el: Holiday) => el.date === date && el.global === true,
      );
      return holiday ? holiday?.name : '';
    }
    return '';
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {isLoading && <Loader />}
        <Wrapper>
          <Form filter={filter} setFilter={setFilter} />

          <div className="flex-container date">
            <button type="button" onClick={() => changeMonth(-1)}>
              <svg width="8px" height="8px">
                <use href="sprite.svg#chevron" />
              </svg>
            </button>
            <p className="month-year">{monthYearDisplayToRender()}</p>
            <button type="button" onClick={() => changeMonth(1)}>
              <svg width="8px" height="8px">
                <use href="sprite.svg#chevron" />
              </svg>
            </button>
          </div>
          <ul className="grid days">
            {weekdays.map((el) => (
              <li key={el}>{el}</li>
            ))}{' '}
          </ul>

          <Calendar className="grid" onClick={() => clickHandler()}>
            {renderCalendar().map((month, i) =>
              month.map((day) => (
                <li
                  key={day}
                  className={i === 1 ? 'cells currentMonth' : 'cells lastMonth'}
                >
                  <Droppable droppableId={getDateString(day, i)}>
                    {(provided, snapshot) => (
                      <Day
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
                        <p>
                          {day === 1 ||
                          day === getDaySchema(getMonthIndex(i) + 1)
                            ? getShortMonthName(getMonthIndex(i)) + day
                            : day}
                        </p>

                        {todayTasks(day, i).length > 0 && (
                          <>
                            <Counter> {todayTasks(day, i).length} card</Counter>
                            <ul>
                              {todayTasks(day, i).map((task, index) => (
                                <TaskItem key={task.id}>
                                  <TaskCard
                                    task={task}
                                    tasks={tasks}
                                    setTasks={setTasks}
                                    index={index}
                                  />
                                </TaskItem>
                              ))}
                            </ul>
                          </>
                        )}
                        {getHoliday(day, i).length > 0 && (
                          <HoliDay>{getHoliday(day, i)}</HoliDay>
                        )}
                        <button
                          type="button"
                          onClick={() => addTask(day, i)}
                          className="addBtn"
                        >
                          +
                        </button>
                        {provided.placeholder}
                      </Day>
                    )}
                  </Droppable>
                </li>
              )),
            )}
          </Calendar>

          {isModalOpen && (
            <Modal onClose={toggleModal} submitHandler={createTask}></Modal>
          )}
        </Wrapper>
      </DragDropContext>
    </>
  );
};

export default App;
