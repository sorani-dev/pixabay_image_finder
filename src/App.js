import { MuiThemeProvider } from 'material-ui/styles';
import './App.css';
import NavBar from './components/navbar/NavBar';
import Search from './components/search/Search';

function App() {
  return (
    <MuiThemeProvider>
      <NavBar />
      <Search />
    </MuiThemeProvider>
  );
}

export default App;
