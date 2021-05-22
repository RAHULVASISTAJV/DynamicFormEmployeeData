import Viewdata from './Viewdata'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Form from './pages/Form';

function App() {
  
  return (
   <Router>
     <Switch>
       <Route exact path="/" component={Form} />
       <Route exact path="/view" component={Viewdata} />
     </Switch>
   </Router>
  );
}

export default App;