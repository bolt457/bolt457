import React from 'react';

function InvestButton({ starId }) {
    const handleInvest = () => {
        alert(`Investir dans la star ID: ${starId}`);
    };

    return (
        <button onClick={handleInvest}>Investir</button>
    );
}

export default InvestButton;
