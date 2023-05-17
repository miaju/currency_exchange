import './App.scss';
import Converter from './components/Converter';
import Intro from './components/Intro';

function App() {
  return (
    <div className="App">
      <Intro/>
      <Converter/>
    </div>
  );
}

export default App;
