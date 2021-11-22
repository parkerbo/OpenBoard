import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TaskDetailProvider from './context/TaskDetailContext';
import './index.css';
import App from './App';
import configureStore from './store';
import Task from './components/ProjectPage/Task';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <TaskDetailProvider>
        <App />
        </TaskDetailProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
