import React from 'react';
import AnimatedComponent from './AnimatedComponent';

const App = () => {
    return (
        <div>
            <AnimatedComponent>
                <h1>Ceci est une animation dynamique sur toutes les pages !</h1>
            </AnimatedComponent>
            {/* Autres composants ou routes ici */}
        </div>
    );
};

export default App;