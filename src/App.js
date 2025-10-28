import './App.css';
import Header from './components/Header';
import AddContent from './components/AddContact';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';

function App() {

  const contacts = [
    {
      id: "1",
      name: "Dipesh",
      email: "malvia@gmail.com"
    },
    {
      id: "2",
      name: "Nikesh",
      email: "nicks@gmail.com"
    }
  ]

  return (
    <div className='ui container'> 
      <Header/>
      <AddContact/>
      <ContactList contacts={contacts}/>
      {/* <ContactCard/> */}
    </div>
  )
}

export default App;
