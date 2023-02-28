import Draggable from "react-draggable";
import { isMobile } from "react-device-detect"
import React, { useState, createContext } from "react";

/*TODO: OOP rewrite + cleaner code
  
  PROPS:
  icons - icons to be displayed on the desktop
  initialOpenWindows - used to run "programs" when the page loads (became unused)

  FUNCTIONS:
  openWindows - it can have two types of initial values: 
                an object that is a given "program" 
                or 
                null, if the dev doesn´t want anything to be opened on load
  DesktopIcon - used to declutter the Desktop function
  DesktopAppWindow - used for the "program" window, it is draggable on everything besides phones and tablets
*/

export default function Desktop({ icons, initialOpenWindows }: any) {

  const [openWindows, setOpenWindows]: any[] = useState(initialOpenWindows && initialOpenWindows.length > 0 ? initialOpenWindows.map((id: number) => {
    const icon = icons.find((icon: any) => icon.id === id);
    return { id, window: icon.window };
  }) : []);

  const handleIconClick = (id: number) => {

    if (openWindows.find((window: any) => window.id === id)) {
      return;
    }

    const icon = icons.find((icon: any) => icon.id === id);
    setOpenWindows([...openWindows, { id, window: icon.window }]);
  };

  const handleCloseClick = (id: number) => {
    setOpenWindows(openWindows.filter((window: any) => window.id !== id));
  };

  return (
    <div className="desktop">
      <ul className="desktop-icon-wrapper">
        {icons.map((icon: any) => (
          <li key={icon.id}>
            <DesktopIcon
              label={icon.label}
              icon={icon.icon}
              onClick={() => handleIconClick(icon.id)}
            />
          </li>
        ))}
      </ul>
      {openWindows.map((window: any) => (
        <DesktopAppWindow key={window.id} onCloseClick={() =>
          handleCloseClick(window.id)}>
          {window.window}
        </DesktopAppWindow>
      ))}
    </div>
  );
};

function DesktopIcon({ icon, label, onClick }: any) {

  return (
    <div
      className="desktop-icon"
      onClick={onClick}
    >
      <img src={icon} alt={label} />
      <span>{label}</span>
    </div>
  );
}

export const DragDisabledContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([false, () => { }]);

function DesktopAppWindow({ children, onCloseClick }: any) {
  const nodeRef = React.useRef(null);
  const [disabled, setIsDisabled] = useState<boolean>(false)

  return (
    <DragDisabledContext.Provider value={[disabled, setIsDisabled]}>
      <Draggable nodeRef={nodeRef}
        bounds="main"
        disabled={isMobile || disabled}
      >
        <div
          ref={nodeRef}
          className='desktop-app'
          data-open='true'
        >
          <div className="window-handle">
          <button
            className="close-button"
            onClick={onCloseClick}
            onTouchEnd={onCloseClick}
          >
            <span>Placeholder</span>
          </button>
          </div>
          {children}
        </div>
      </Draggable>
    </DragDisabledContext.Provider>
  );
}
