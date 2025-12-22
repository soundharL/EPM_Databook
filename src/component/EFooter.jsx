import React from 'react';
import './css/EFooter.css';

const EFooter = () => {
  return (
    <footer className="efooter sticky">
  <p>
    Evatec AG – Maintainer: Evatec{' '}
    <a href="mailto:Evatec@evatecnet.com">
      Evatec@evatecnet.com
    </a>
  </p>
  <p>
    release-0.23.1 – commit <span className="commit">7959219</span>
  </p>
  <p>
    Developed with <span className="heart">❤️</span> by Evatec and{' '}
    <a href="#">Deployed Team</a> (evatecnet.com)
  </p>
</footer>

  );
};

export default EFooter;
