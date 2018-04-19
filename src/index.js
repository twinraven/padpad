import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app/App';
import injectGlobalStyles from 'styles/injectGlobalStyles';
import registerServiceWorker from 'registerServiceWorker';

injectGlobalStyles();

// TODO: Make this work?
// window.addEventListener('hashchange', event => console.log('event'), false);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
