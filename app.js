import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <div>
                <h1>Blog Application</h1>
                <Switch>
                    <Route path="/" exact component={PostList} />
                    <Route path="/create" render={() => <PostForm onPostSaved={() => {}} />} />
                    <Route path="/login" render={() => <LoginForm onLogin={() => setIsLoggedIn(true)} />} />
                    <Route path="/register" component={RegisterForm} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;


