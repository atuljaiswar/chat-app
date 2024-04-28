import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';

interface PortalContextProps {
  isOpen: boolean;
  openPortal: (content: any) => void;
  closePortal: () => void;
  portalContent: any;
  setPortalContent: (content: any) => void;
}

const PortalContext = createContext<PortalContextProps | undefined>(undefined);

export const PortalProvider = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [portalContent, setPortalContent] = useState(null);
  const [modalRoot, setModalRoot] = useState(null);
  const rootElem = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // if (!rootElem.current) {
    const div = document.createElement('div');
    div.id = 'portal-root';
    rootElem.current = div;
    document.body.appendChild(div);
    // }

    return () => {
      if (rootElem.current) {
        document.body.removeChild(rootElem.current);
      }
    };
  }, []);

  const openPortal = (content: any) => {
    console.log('openPortal');
    setIsOpen(true);
    setPortalContent(content);
  };

  const closePortal = () => {
    setIsOpen(false);
    setPortalContent(null);
  };

  const contextValue = {
    isOpen,
    openPortal,
    closePortal,
    portalContent,
    setPortalContent,
  };

  return (
    <PortalContext.Provider value={contextValue}>
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};
