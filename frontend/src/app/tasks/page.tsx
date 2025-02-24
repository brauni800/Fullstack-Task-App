import TaskPaginationSizeSelect from "./components/TaskPaginationSizeSelect"
import TaskCompletedCheck from "./components/TaskCompletedCheck"
import TaskPrioritySelect from "./components/TaskPrioritySelect"
import LogoutButton from "@/components/LogoutButton"
import TaskList from "./components/TaskList"
import styles from "./Tasks.module.css"

export default function Tasks() {
  return (
    <div className={styles.container}>
      <header>
        <h1>My Tasks</h1>
      </header>
      <nav className={styles.filters}>
        <TaskCompletedCheck />
        <TaskPrioritySelect />
        <TaskPaginationSizeSelect />
      </nav>
      <TaskList />
      <footer>
        <LogoutButton />
      </footer>
    </div>
  );
}
