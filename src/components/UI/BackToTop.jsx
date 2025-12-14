import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaChevronUp } from 'react-icons/fa';


const Button = styled.button`
  position: fixed;
  right: 1rem;
  bottom: 1.25rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #004aad;   /* 🔵 CAMBIO IMPORTANTE */
  color: white;
  box-shadow: 0 6px 12px rgba(11,94,215,0.18);
  cursor: pointer;
  z-index: 999;
  
  &:focus { outline: 3px solid rgba(11,94,215,0.2); }
`;


export default function BackToTop() {
const [visible, setVisible] = useState(false);


useEffect(() => {
function onScroll() {
setVisible(window.scrollY > 300);
}
window.addEventListener('scroll', onScroll);
onScroll();
return () => window.removeEventListener('scroll', onScroll);
}, []);


function scrollToTop() {
window.scrollTo({ top: 0, behavior: 'smooth' });
}


if (!visible) return null;


return (
<Button onClick={scrollToTop} aria-label="Ir arriba">
<FaChevronUp aria-hidden="true" />
</Button>
);
}