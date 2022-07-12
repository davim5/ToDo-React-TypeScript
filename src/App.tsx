import { Header } from './components/Header';
import { Summary } from './components/Summary';

import styles from './App.module.css';
import './global.css';

function App() {

  return (
    <div className="App">
      <Header />
      <div className={styles.wrapper}>
        <Summary />
      </div>
    </div>
  )
}

export default App
