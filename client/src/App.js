import { Amplify, Auth } from 'aws-amplify';
import awsConfig from "./aws-config";
import { withAuthenticator } from '@aws-amplify/ui-react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import TextEditor from "./TextEditor";
import DocManage from "./DocManage";

Amplify.configure(awsConfig);

function App({ signOut, user }) {
    const history = useHistory();

    const handleLogout = async () => {
        await Auth.signOut();
        sessionStorage.clear();
        window.location.reload();
    };

    return (
        <Router>
            <div style={{ padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2>Real-time Document Collaboration</h2>
                <button onClick={handleLogout} style={{ padding: "8px 12px", cursor: "pointer" }}>
                    Logout
                </button>
            </div>
            <Switch>
                <Route path="/" exact>
                    <DocManage currentUser={user} />
                </Route>
                <Route path="/documents/:id">
                    <TextEditor />
                </Route>
            </Switch>
        </Router>
    );
}

export default withAuthenticator(App);

