import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthContext } from './Contexts/AuthContextProvider'
import { NavBar, Home, Signup, Login, Protected, UnAuthor, NotFound} from './Components'

const App = () => {
  const { email, token } = useContext(AuthContext)

  return (
    <>
    <NavBar email={email} />
    
    <Switch>
      <Route exact path='/' token={token} component={Home} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/login' component={Login} />
      {/* <Protected exact path="/" token={token} component={} /> */}
      <Route exact path="/unauth" component={UnAuthor} />
      <Route path="*" component={NotFound} />
    </Switch>
    </>
  );
}

export default App