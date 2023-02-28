import React from "react";

/* 
  PROPS:
  menu - expects an object with elements defined in MenuItem
  icon - icon for the Application Launcher
  shutdown? - the developer can choose if they want a shutdown button, or not

  STATES:
  showMenu - when the user clicks the icon the dropdown menu/Application Launcher is rendered
  showSubmenu - if a MenuItem has a submenu part, the submenu becomes visible when the user
                hovers over the related MenuItem
  
  FUNCTIONS:
  Most of them are mouse related
  handleShutdown - changes the value of a cached variable and creates a new div component to emulate a shut down system
  renderMenuItem - contains the base dropdown with all the base items, when hovered the submenu becomes visible
                   with all the related submenu items
  render - when the icon is clicked the dropdown is rendered, if a shutdown button is needed it also gets added to the dropdown
*/

interface Props {
  menu: MenuItem[];
  icon: string;
  shutdown?: boolean;
}

interface State {
  showMenu: boolean;
  showSubMenu: number | null;
}

interface MenuItem {
  id: number;
  label: React.ReactNode;
  submenu?: MenuItem[];
  url?: string;
}

export class AppLauncher extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showMenu: false,
      showSubMenu: null
    };
  }

  toggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  }

  handleMouseEnter = (item: MenuItem) => {
    this.setState({ showSubMenu: item.id});
  }

  handleMouseLeave = (item: MenuItem) => {
    this.setState({ showSubMenu: null});
  }

  handleShutdown = () => {
    localStorage.setItem("isMounted", "true")

    const newDiv = document.createElement('div');
    newDiv.style.position = 'fixed';
    newDiv.style.top = '0';
    newDiv.style.left = '0';
    newDiv.style.width = '100vw';
    newDiv.style.height = '100vh';
    newDiv.style.backgroundColor = 'rgba(0,0,0,0)';
    newDiv.style.zIndex = '1000000';
    newDiv.style.transition = 'background-color 1s';

  document.body.appendChild(newDiv);

  // Trigger the transition by setting the background color to black after a short delay
  setTimeout(() => {
    newDiv.style.backgroundColor = 'rgba(0,0,0,1)';
  }, 10);
  }

  renderMenuItem = (item: MenuItem) => {
    return (
      <li key={item.id} className="menu-item" onMouseEnter={() => this.handleMouseEnter(item)} onMouseLeave={() => this.handleMouseLeave(item)}>
        {item.label}
        {item.submenu && this.state.showSubMenu === item.id && (
          <ul className="submenu">
             {item.submenu.map((subitem)=> (
              <a href={subitem.url} key={subitem.id} target="_blank" className="menu-item"> {subitem.label} </a>
            ))}
          </ul>
        )}
      </li>
    );
  }

  render() {
    return (
      <>
        <li className="app-launcher panel-item">
          <img src={this.props.icon} onClick={this.toggleMenu} />
        </li>
        {
          this.state.showMenu
            ? (
              <ul className="dropdown" data-open="true">
                {this.props.menu.map(this.renderMenuItem)}
                { this.props.shutdown ? <li className="menu-item shutdown-button" onClick={this.handleShutdown}>Shutdown</li> : null}
              </ul>
            )
            : null
        }
      </>
    );
  }
}