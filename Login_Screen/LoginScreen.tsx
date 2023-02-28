import { animated, useSpring, useTransition } from "react-spring"
import { useState, useEffect } from "react"
import "../Login_Screen/loginscreen.css"
/*
  What should happen:
  User clicks button, login screen fades
  Loading screen appears
  When loading ends it fades
  Desktop appears

  Login screen doesn't fade (yet, but maybe it will stay as is)

  PROPS:
  avatar - string - used to find photo to use as avatar photo for the user
  username - string - used to define the current user of the "Operating System"

  FUNCTIONS:
  fade - basic function to smoothly fade in the whole login screen,
         if the visitor has been on the site the login screen doesn't
         appear until the "system" is shut down or the browser cache is
         deleted
  fadeAndResize - makes the login panel fade in and grow smoothly, giving a nice effect

  I'm not quite satisfied with the solution presented in the return() function, but I don't know how to do it better (for now) 
  */

export default function LoginScreen({avatar, username} : { avatar: string, username: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(localStorage.getItem("isMounted") === "false" ? false : true)
  const [display, setDisplay] = useState<string>("inherit")

  const LoginPanel = animated.div;
  const LoadingScreen = animated.div;

  const fade = useSpring({
    opacity: isMounted ? 1 : 0,
    onRest: () => {
      if (!isMounted) {
        setDisplay("none")
      }
    }
  })

  const fadeAndResize = useSpring({from: { opacity: 0.1, scale: 0.1}, to: {opacity: 1, scale: 1}})

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate an API call
    setTimeout(() => {
      setIsMounted(false);
    }, 2500); //2000
  };

  useEffect(() => {
    if (!isMounted) {
      setDisplay("none");
    }
    localStorage.setItem("isMounted", isMounted.toString());
  }, [isMounted]);


  return (
    <>
      <animated.div style={{ ...fade, display }} className="login-screen">
        {isLoading ? (
          <LoadingScreen className="loading-screen">
            <div className="loading-ring">
              <div className="loading-text">Loading</div>
            </div>
          </LoadingScreen>
        ) :
          <LoginPanel style={fadeAndResize} className="login-panel">
            <img src={avatar} className="avatar"/>
            <span>{username}</span>
            <button onClick={handleLogin}>Login</button>
            </LoginPanel>
        }
      </animated.div >

    </>
  );
}