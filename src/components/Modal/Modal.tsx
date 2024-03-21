import { useEffect, useState } from 'react';
import { Backdrop, ModalBox } from './Modal.styled';
import { Data, Task, ColorsString } from '../../../@types/custom';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root') as Element;

type FormEl = { name: string; value: string };

interface ModalProps {
  task?: Task;
  submitHandler: (form: Data) => void;
  onClose: () => void;
}

export const Modal = ({ task, submitHandler, onClose }: ModalProps) => {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === 'Escape') {
        onClose();
      }
    }

    document.body.style.overflowY = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflowY = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target?.className.includes('overlay')) {
      onClose();
    }
  };

  const colors = ['Select ...', 'orange', 'green', 'yellow', 'blue', 'violet'];
  const [mark, setMark] = useState(['transparent']);
  const [title, setTitle] = useState(task ? task.title : '');

  function onChangeHandler(
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
  ) {
    const target = e.target as HTMLSelectElement;

    const newArray = [...mark];
    if (index === mark.length - 1) {
      newArray.pop();
      newArray.push(target.value, 'transparent');
    }
    newArray[index] = target.value;
    setMark(newArray);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    const colorsArray: string[] = [];
    const form: Data | Task = {};

    const arrayFromForm = Array.from(target) as unknown as FormEl[];
    arrayFromForm.map((el) => {
      if (el?.name === 'title') {
        form['title'] = el.value;
      } else if (el?.value) {
        colorsArray.push(el.value);
      }
    });
    form.color = colorsArray as ColorsString[];

    if (task) {
      task.color = colorsArray as unknown as ColorsString[];
      task.title = form.title as string;
    }
    const data = task ? task : form;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    submitHandler(data as any);
    onClose();
  }

  return createPortal(
    <Backdrop className="overlay" onMouseDown={handleBackdropClick}>
      <ModalBox>
        <button type="button" onClick={() => onClose()}>
          x
        </button>
        <form onSubmit={onSubmit} id="editForm">
          {mark.map((el, index) => (
            <label key={el + index}>
              Color mark:
              <select
                name={`color${index}`}
                style={{ background: mark[index] }}
                onChange={(e) => onChangeHandler(e, index)}
                value={mark[index]}
                required={mark.length === 1 || el !== 'transparent'}
              >
                {colors.map((color) => (
                  <option
                    key={color}
                    value={color === 'Select ...' ? '' : color}
                    style={{ background: color }}
                    disabled={color === mark[index]}
                  >
                    {color}
                  </option>
                ))}
              </select>
            </label>
          ))}

          <label>
            Title:
            <textarea
              name="title"
              rows={8}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <button type="submit" onClick={() => false}>
            Ok
          </button>
        </form>
      </ModalBox>
    </Backdrop>,
    modalRoot,
  );
};
