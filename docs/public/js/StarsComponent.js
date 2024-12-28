// StarsComponent.js

import React from 'react';
import ReactDOM from 'react-dom';

class StarsComponent extends React.Component {
    render() {
        return (
            <div>
                <h2>Les Stars</h2>
                <p>Voici la liste des stars...</p>
                {/* Ajoute ici la logique pour afficher les stars */}
            </div>
        );
    }
}

ReactDOM.render(<StarsComponent />, document.getElementById('root'));
