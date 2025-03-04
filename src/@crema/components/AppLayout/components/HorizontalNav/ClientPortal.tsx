import React, { ReactNode, useEffect, useRef, useState } from 'react';
// import { createPortal } from 'react-dom';
import * as ReactDOM from 'react-dom';
type ClientOnlyPortalProps = {
  children: ReactNode;
  selector: string;
};

const ClientOnlyPortal: React.FC<ClientOnlyPortalProps> = ({ children, selector }) => {
  const ref = useRef<Element>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector) as HTMLElement;
    setMounted(true);
  }, [selector]);

  return mounted ? ReactDOM.createPortal(children, ref.current!) : null;
};

export default ClientOnlyPortal;
