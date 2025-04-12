"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./toDo.module.css";
import classNames from "classnames";
import Button from "../Buttons/Button Set 1/button";
import { FocusTrap } from "focus-trap-react";
import TrashIcon from "./SvgTrash";
import CheckmarkIcon from "./SvgCheckmark";
import { uniqueId } from "lodash";

type Task = {
  id: string;
  name: string;
  description: string;
  status: "complete" | "incomplete" | "onHold";
  lastUpdated: Date;
};

interface TaskProps {
  name: string;
  description: string;
  status: string;
  lastUpdated: Date;
  ref?: any;
  updateTask?: () => void;
  deleteTask?: () => void;
  completeTask?: () => void;
  moveTask?: () => void;
}

export function Task({
  name,
  description,
  status,
  lastUpdated,
  ref,
  updateTask,
  deleteTask,
  completeTask,
  moveTask,
}: TaskProps) {
  const [showFull, setShowFull] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showUpdateTask, setShowUpdateTask] = useState(false);

  function finishCompleting() {
    completeTask?.();
    deleteTask?.();
  }

  function finishDeleting() {
    deleteTask?.();
  }

  return (
    <div className={classNames(styles.task, styles[status])} ref={ref}>
      <button
        className={styles.name_wrapper}
        onClick={() => setShowFull(!showFull)}
      >
        <div className={styles.name}>{name}</div>
      </button>
      {showFull && (
        <div className={styles.task_full}>
          <div className={styles.task_controls}>
            <Button
              variant="tertiary"
              width="smallest"
              ariaLabel="Delete this task"
              onClick={() => setShowConfirmDelete(true)}
            >
              <TrashIcon className={styles.icon} />
            </Button>
            <Button
              variant="tertiary"
              width="smallest"
              ariaLabel="Mark as complete"
              onClick={finishCompleting}
            >
              <CheckmarkIcon className={styles.icon} />
            </Button>
          </div>
          <div className={styles.decription_wrapper}>
            <div className={styles.description}>{description}</div>
            <div className={styles.last_updated}>
              {lastUpdated.toDateString()}
            </div>
          </div>
        </div>
      )}

      {showConfirmDelete && (
        <FocusTrap>
          <div className={styles.modal}>
            <div className={styles.confirm_delete_wrapper}>
              <div className={styles.confirm_delete_message}>
                {`Delete `}
                <div className={styles.bold}>{`"${name}"`}</div>
                {`?`}
              </div>
              <div className={styles.confirm_delete_controls}>
                <Button
                  variant="tertiary"
                  width="default"
                  ariaLabel="Cancel deleting task"
                  onClick={() => setShowConfirmDelete(false)}
                >
                  {`Cancel`}
                </Button>
                <Button
                  variant="primary"
                  width="default"
                  ariaLabel="Confirm task deletion"
                  onClick={finishDeleting}
                  style={{ backgroundColor: "rgb(96, 96, 96)" }}
                >
                  {`Delete`}
                </Button>
              </div>
            </div>
          </div>
        </FocusTrap>
      )}
    </div>
  );
}

interface ToDoProps {
  user?: {};
  data?: {};
}

export default function ToDo({ user, data }: ToDoProps) {
  const [showForm, setShowForm] = useState(false);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const checkboxRefs = useRef<(HTMLInputElement | null)[]>([]);
  const lastCheckboxChecked = useRef(0);

  //New Task Form
  const inputRef = useRef<HTMLInputElement | null>(null);
  const initialFormData = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const initialErrors = {
    name: "",
    description: "",
  };
  const [formErrors, setFormErrors] = useState(initialErrors);
  //Handles form input changes
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  //Focuses the input when you open the form
  useEffect(() => {
    inputRef.current?.focus();
    return () => {};
  }, [showForm]);

  //Adds a new task if the form is valid
  function submitNewTask(e: React.FormEvent) {
    e.preventDefault();
    setFormErrors(initialErrors);
    let errors = initialErrors;
    let errorFound = false;
    if (formData.name.length < 1) {
      errors.name = "Give a name for your task";
      errorFound = true;
    } else if (formData.name.length > 128) {
      errors.name = "Task name is too long";
      errorFound = true;
    }
    if (formData.description.length > 1024) {
      errors.description = "Description is too long";
      errorFound = true;
    }
    if (errorFound) {
      setFormErrors(errors);
      return;
    }
    const task: Task = {
      id: uniqueId(`task-`),
      name: formData.name,
      description: formData.description,
      status: "incomplete",
      lastUpdated: new Date(),
    };
    setTasks((prev) => [task, ...prev.slice()]);
    closeNewTaskForm();
  }

  function openDeleteMenu() {
    //Does things to open the delete menu
    setShowDeleteMenu(true);
  }

  function closeDeleteMenu() {
    //Need something clear out selected items
    setShowDeleteMenu(false);
    setShowDeleteButton(false);
  }

  function handleCheckboxClick(e: React.MouseEvent, index: number) {
    checkboxRefs.current.some((checkbox) => {
      return checkbox?.checked === true;
    })
      ? setShowDeleteButton(true)
      : setShowDeleteButton(false);
    if (e.shiftKey && checkboxRefs.current[index]?.checked) {
      for (
        let i = Math.min(index, lastCheckboxChecked.current);
        i < Math.max(index, lastCheckboxChecked.current);
        i++
      ) {
        const checkbox = checkboxRefs.current[i];
        if (checkbox) {
          checkbox.checked = true;
        }
      }
    }
    if (checkboxRefs.current[index]?.checked) {
      lastCheckboxChecked.current = index;
    }
  }

  function deleteTasks() {
    const toBeDeleted = checkboxRefs.current
      .map((checkbox, index) => (checkbox?.checked === true ? index : -1))
      .filter((index) => index !== -1);
    const newTasks: Task[] = [];
    tasks.map((task, index) => {
      toBeDeleted[0] === index ? toBeDeleted.shift() : newTasks.push(task);
    });
    setTasks(newTasks);
    closeDeleteMenu();
  }

  function closeNewTaskForm() {
    setShowForm(false);
    setFormData(initialFormData);
    setFormErrors(initialErrors);
  }

  return (
    <div className={styles.to_do}>
      <div className={styles.controls}>
        <Button
          variant="primary"
          onClick={() => setShowForm(true)}
          style={{ backgroundColor: "rgb(96, 96, 96)" }}
        >{`Add New Task`}</Button>
        {tasks.length > 0 && (
          <div className={styles.delete_tasks_wrapper}>
            {showDeleteMenu ? (
              <div className={styles.buttons_wrapper}>
                {showDeleteButton && (
                  <Button
                    variant="secondary"
                    width="smallest"
                    ariaLabel="Delete tasks"
                    onClick={deleteTasks}
                    style={{
                      color: "rgb(96, 96, 96)",
                      borderColor: "rgb(96, 96, 96)",
                    }}
                  >
                    {`Delete`}
                  </Button>
                )}
                <Button
                  variant="tertiary"
                  ariaLabel="Cancel deleting tasks"
                  onClick={closeDeleteMenu}
                  width="smallest"
                >
                  {`Cancel`}
                </Button>
              </div>
            ) : (
              <div className={styles.buttons_wrapper}>
                <Button
                  variant="tertiary"
                  ariaLabel="Delete tasks"
                  onClick={openDeleteMenu}
                  width="smallest"
                >
                  <TrashIcon height={"100%"} className={styles.icon} />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      {tasks.length > 0 && (
        <ul className={styles.task_list}>
          {tasks.map((item, index) => {
            return (
              <li className={styles.task_wrapper} key={item.id}>
                {showDeleteMenu && (
                  <div className={styles.selection_wrapper}>
                    <input
                      type={"checkbox"}
                      ref={(el) => {
                        checkboxRefs.current[index] = el;
                      }}
                      onClick={(e) => handleCheckboxClick(e, index)}
                    />
                  </div>
                )}
                <Task
                  name={item.name}
                  description={item.description}
                  status={item.status}
                  lastUpdated={item.lastUpdated}
                  deleteTask={() =>
                    setTasks((prev) => [
                      ...prev.slice(0, index),
                      ...prev.slice(index + 1),
                    ])
                  }
                />
              </li>
            );
          })}
        </ul>
      )}
      {showForm && (
        <FocusTrap>
          <div className={styles.modal}>
            <div className={styles.new_task_wrapper}>
              <div className={styles.close_button_wrapper}>
                <button
                  aria-label={"Close menu"}
                  className={styles.close_task_form}
                  onClick={closeNewTaskForm}
                >
                  {`x`}
                </button>
              </div>
              <form className={styles.new_task_form} onSubmit={submitNewTask}>
                <div className={styles.input_container}>
                  <label htmlFor="name">{`Task Name`}</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    ref={inputRef}
                    aria-describedby="nameError"
                    maxLength={128}
                    className={styles.name_input}
                  />
                  {formErrors.name && (
                    <div
                      className={styles.error}
                      id="nameError"
                      aria-live="polite"
                    >
                      {formErrors.name}
                    </div>
                  )}
                </div>
                <div className={styles.input_container}>
                  <label htmlFor="description">{`Description`}</label>
                  <input
                    id="description"
                    name="description"
                    type="text"
                    value={formData.description}
                    onChange={handleChange}
                    aria-describedby="descriptionError"
                    maxLength={1024}
                    className={styles.description_input}
                  />
                  {formErrors.name && (
                    <div
                      className={styles.error}
                      id="descriptionError"
                      aria-live="polite"
                    >
                      {formErrors.description}
                    </div>
                  )}
                </div>
                <Button
                  variant={"primary"}
                  type={"submit"}
                  style={{ backgroundColor: "rgb(96, 96, 96)" }}
                >{`Add Task`}</Button>
              </form>
            </div>
          </div>
        </FocusTrap>
      )}
    </div>
  );
}
