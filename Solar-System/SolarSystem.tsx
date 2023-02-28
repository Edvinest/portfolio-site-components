import "./solarsystem.css"
import React, { useContext, useState } from "react";
import Draggable from "react-draggable"
import { DragDisabledContext } from "../Desktop"

//An unfinished component for now

export default function SolarSystem() {

  const nodeRef = React.useRef(null);
  const [scale, setScale] = useState(1);
  const [isDisabled, setIsDisabled] = useContext(DragDisabledContext);

  const handleZoomIn = () => {
    setScale(scale + 0.1)
  }

  const handleZoomOut = () => {
    console.log(scale);
      setScale(scale > 0.1 ? scale - 0.1 : 0);
  }

  const handleDrag = () => {
    setIsDisabled(!isDisabled);
  };

  return (
    <div className="solar-system" >
      <div className="planets" style={{transform: `scale(${scale})`}}>
      <Draggable disabled={!isDisabled} nodeRef={nodeRef}>
      <div className="sun" ref={nodeRef}>
        <div className="mercury" />
        <div className="venus" />
        <div className="earth" />
        <div className="mars" />
        <div className="jupiter" />
        <div className="saturn" />
        <div className="uranus" />
        <div className="neptune" />
        </div>
      </Draggable>
      </div>
      <div className="control-buttons">
      <button onClick={handleZoomIn}>+</button>
      <button onClick={handleZoomOut}>-</button>
      <button onClick={handleDrag}>drag</button>
      </div>
    </div >
  );
}
