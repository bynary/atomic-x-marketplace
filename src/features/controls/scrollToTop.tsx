import { useState, useEffect } from 'react'
import { Button } from '@mui/material';
import { ExpandLess } from '@mui/icons-material'

export default function ScrollToTopButton() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      });
    }, []);
    
    // This function will scroll the window to the top 
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // for smoothly scrolling
      });
    }
    return (
        <div>
            {showButton &&
            <Button onClick={scrollToTop} className="back-to-top">
                <ExpandLess />
            </Button>}
        </div>
    )
}