import './App.css';
import Header from './components/Header';
import AddContent from './components/AddContact';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';

function App() {
  return (
    <div className='ui container'> 
      <Header/>
      <AddContact/>
      <ContactList/>
      {/* <ContactCard/> */}
    </div>
  )
}

export default App;
