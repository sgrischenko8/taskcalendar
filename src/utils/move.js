export const move = (tasks, droppableSource, droppableDestination) => {
  const oldDayTasks = [];
  const newDayTasks = [];

  const newTasks = tasks.filter((el) => {
    if (el.date === droppableSource.droppableId) {
      oldDayTasks.push(el);
      return false;
    }
    if (el.date === droppableDestination.droppableId) {
      newDayTasks.push(el);
      return false;
    }

    return true;
  });

  const removed = oldDayTasks[droppableSource.index];
  removed.date = droppableDestination.droppableId;

  oldDayTasks.splice(droppableSource.index, 1);
  newDayTasks.splice(droppableDestination.index, 0, removed);

  return [...newTasks, ...oldDayTasks, ...newDayTasks];
};
