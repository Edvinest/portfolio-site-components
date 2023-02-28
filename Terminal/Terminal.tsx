import "./terminal.css"
import { Fetch } from "./Additional_Commands/Fetch"
import { useState, useEffect, useRef } from "react";

export default function Terminal(props: any) {

  /* 
  PROPS:
  used to give every "Additional Command" their required values

  FUNCTIONS:
  commands - used to define every available command
  handleCommand - if the user enters a valid command the related component gets rendered
                  they're also kept inside the terminal until the user closes it

  I am satisfied with the return() function
  */
  const [outputHistory, setOutputHistory] = useState<React.ReactNode[]>([]);
  const [inputValue, setInputValue] = useState('');


  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    outputRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [outputHistory]);

  const commands: { [key: string]: () => React.ReactNode } = {
    help: () => {
      return (
        <div className="text-field">
          <div>Available commands:</div>
          <div>- help</div>
          <div>- fetch</div>
        </div>
      );
    },
    fetch: () => {
      return <Fetch
        picture={props.picture}
        user={props.user}
        OS={props.OS}
        numberOfSoft={props.numberOfSoft}
        numberOfGames={props.numberOfGames}
        hobbies={props.hobbies}
        experience={props.experience}
        description={props.description}
        version={props.version}
      />;
    }
  };

  const handleCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();
    let output = null;

    if (cmd === 'help') {
      output = commands['help']();
    } else if (cmd in commands) {
      output = commands[cmd]();
    } else {
      output = <div>{`Command not found: ${command}`}</div>;
    }

    setOutputHistory([...outputHistory, output]);
  };

  return (
    <div className="terminal">
      {/* render the output history */}
      {outputHistory.map((item, index) => (
        <div key={index} ref={outputRef}>{item}</div>
      ))}

      {/* render the input prompt */}
      <div className="input-container">
        <div>{props.prompt || '$'}</div>
        <input type="text" value={inputValue} placeholder='Type "help" to get started!' onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleCommand(inputValue);
            setInputValue('');
          }
        }} />
      </div>
    </div>
  );
}