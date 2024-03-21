import { ColorMarkList } from './TaskCard.styled';
import { Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';
import { Task, Data } from '../../../@types/custom';
import { Modal } from '../Modal/Modal';

interface TaskCardProps {
  task: Task;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  index: number;
}

export const TaskCard = ({ task, tasks, setTasks, index }: TaskCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    setIsModalOpen((prev) => !prev);
  }

  function submitEdit(data: Data | Task) {
    const newTask = [...tasks];
    const i = newTask.findIndex((el) => el.id === data.id);

    newTask[i] = data as unknown as Task;

    setTasks(newTask);
    return;
  }

  const getItemStyle = (isDragging: boolean, draggableStyle: unknown) => ({
    background: isDragging ? 'lightgreen' : 'transparent',
    ...(draggableStyle as object),
  });

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <article
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={
              getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style,
              ) as object
            }
          >
            <ColorMarkList>
              {task.color.map((color, ind) => (
                <li
                  key={ind}
                  className="color"
                  style={{ background: color }}
                ></li>
              ))}
            </ColorMarkList>
            <h3> {task.title}</h3>

            <button
              type="button"
              onClick={() => toggleModal()}
              className="addBtn edit"
              title="edit task"
            >
              <svg width="12px" height="12px">
                <use href="sprite.svg#edit" />
              </svg>
            </button>
          </article>
        )}
      </Draggable>
      {isModalOpen && (
        <Modal
          onClose={toggleModal}
          submitHandler={submitEdit}
          task={task}
        ></Modal>
      )}
    </>
  );
};
