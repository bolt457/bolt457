import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './components/Dashboard';
import SearchBar from './components/SearchBar';
import InvestButton from './components/InvestButton';

function StarsComponent() {
    return (
        <div className="App">
            <SearchBar />
            <Dashboard />
            <InvestButton starId={1} />
        </div>
    );
}

ReactDOM.render(<StarsComponent />, document.getElementById('root'));
