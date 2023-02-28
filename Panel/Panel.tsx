import Clock from "../Panel/Clock";
import {AppLauncher} from "../Panel/AppLauncher";
import "../Panel/panel.css"

/* 
  Sort of basic Panel components

  PROPS:
  used to determine what kind of additional components are needed

  FUNCTIONS:
  PanelItem is used to declutter the Panel component
*/
export default function Panel({ items, hasClock, hasAppLauncher, hasShutdownButton, appLauncherIcon,appLauncherItem}: any) {
  return (
    <nav className="navbar-wrapper">
      <ul className="panel">
        {hasAppLauncher ? <AppLauncher icon={appLauncherIcon} menu={appLauncherItem} shutdown={hasShutdownButton}/> : null}
        {items.map((item: any) => (
          <PanelItem key={item.id} className={item.className} profile={item.profile} icon={item.icon} />
        ))}
        {hasClock ? <Clock /> : null}
      </ul>
    </nav>
  );
}

function PanelItem({ id, className, profile, icon }: any) {
  return (
    <li key={id} className={`panel-item ${className}`}>
      <a
        href={`${profile}`}
        target="_blank"
      >
        <img src={icon} />
      </a>
    </li>
  );
}