import ReactDOM from 'react-dom';
import { usePortal } from '../../context/PortalContext';

const Portal = () => {
  const { isOpen, portalContent } = usePortal();

  if (!isOpen || !portalContent) return null;

  const modalRoot = document.getElementById('portal-root'); // Create a dedicated DOM element

  return ReactDOM.createPortal(portalContent, modalRoot!);
};

export default Portal;
