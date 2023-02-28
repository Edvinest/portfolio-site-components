/* Similar fetching "program" to neofetch or pfetch

    Any of the props shown below can be null and the component still works.
    I don't know if the return() function is good enough or if it could be improved, but I'm satisfied with it. 
*/

interface FetchProps {
    picture?: string;
    user?: string;
    OS?: string;
    numberOfSoft?: number;
    numberOfGames?: number;
    hobbies?: string[];
    experience?: string[];
    description?: string;
    version?: string;
  }

export const Fetch = ({
    picture,
    user,
    OS,
    numberOfSoft,
    numberOfGames,
    hobbies,
    experience,
    description,
    version,
  }: FetchProps): JSX.Element => {

    return (
    <div className="fetch">
        <pre className="ascii-art">{picture}</pre>
        <section className="text-field">
            {user && <><b>User:</b> {user} <br /></>}
            {OS && <><b>OS:</b> {OS} <br /></>}
            {(numberOfSoft && numberOfGames) && (
                <>
                    <b>Programs:</b> Software ({numberOfSoft}) | Games ({numberOfGames})
                    <br />
                </>
            )}
            {hobbies && <><b>Hobbies</b>: {hobbies}<br /></>}
            {experience && <><b>Experience:</b> {experience} <br /></>}
            {description && <><b>Description:</b> {description} <br /></>}
            {version && <><b>Current version:</b> {version} <br /></>}
            <b>Current viewing mode:</b> <span className="viewmode"></span> <br />
        </section>
    </div>)
}