import React from 'react';
import ReactDOM from 'react-dom';
import AppThemeWrapper from 'src/components/core/AppThemeWrapper';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<AppThemeWrapper />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
