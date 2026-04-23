import React from 'react';

const WayPointsDescription = () => {
  return (
    <div className="flex flex-col">
      <div className="mb-4">Punts intermitjos de l&apos;etapa. </div>
      <div>Exemple:</div>
      <div>
        Alpens - <strong>Les Llosses</strong> - Ripoll → afegir{' '}
        <strong>Les Llosses</strong>.
      </div>
      <div>
        Olost - Sant Boi → <strong>No cal afegir res</strong>.
      </div>
    </div>
  );
};

export default WayPointsDescription;
