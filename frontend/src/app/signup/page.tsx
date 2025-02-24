import SignUpForm from './components/SignUpForm'
import styles from "./SignUp.module.css";

export default function SignUp() {
  
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1>Register new user</h1>
      </header>
      <SignUpForm />
    </section>
  )
}
