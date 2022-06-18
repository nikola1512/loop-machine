import {ReactNode} from 'react';

const Pads = ({children}: {children: ReactNode}) => {
  return (
    <div className="c-pads">
      {children}
    </div>
  );
};

export default Pads;
