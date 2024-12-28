import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './styles.css'; // Assurez-vous d'ajouter le CSS pour les animations

const AnimatedComponent = ({ children }) => {
    const [inProp, setInProp] = useState(true);

    return (
        <div>
            <button onClick={() => setInProp(!inProp)}>Toggle Animation</button>
            <CSSTransition in={inProp} timeout={300} classNames="fade" unmountOnExit>
                <div className="fade">{children}</div>
            </CSSTransition>
        </div>
    );
};

export default AnimatedComponent;