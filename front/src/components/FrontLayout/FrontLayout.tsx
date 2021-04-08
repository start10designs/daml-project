import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import DamlLedger from "@daml/react";
import { useUserState } from "../../context/UserContext";
import { wsBaseUrl, httpBaseUrl, ledgerId } from "../../config";
import Profile from "../../pages/profile/Profile";
import Project from "../../pages/project/Project";
import EditProject from "../../pages/project/EditProject";
import Submission from "../../pages/submission/Submission";
import { PublicLedger, useWellKnownParties, WellKnownPartiesProvider } from "@daml/hub-react/lib";

const PublicProvider: React.FC = ({ children }) => {
    // This component fetches the public party ID and uses it to instantiate a PublicLedger context
    const { parties, loading } = useWellKnownParties();
  
    if (loading || !parties) {
      return <div>Loading...</div>
    }
  
    return (
      <PublicLedger
        ledgerId={ledgerId}
        publicParty={parties.publicParty}
      >
        { children }
      </PublicLedger>
    )
  }

  
const FrontLayout = (props: any) => {
    console.log('FrontLayout', props);
    const user = useUserState();
    if(!user.isAuthenticated){
        return null;
    } else {
        return (
        <DamlLedger party={user.party} token={user.token} httpBaseUrl={httpBaseUrl} wsBaseUrl={wsBaseUrl}>
            {/* <WellKnownPartiesProvider>
                <PublicProvider> */}
                    <Switch>
                        <Route path="/main/projects/:id/edit" component={EditProject} />
                        <Route path="/main/project" component={Project} />
                        <Route path="/main/profile" component={Profile} />
                        <Route path="/main/submission" component={Submission} />
                    </Switch>
               {/*  </PublicProvider>
            </WellKnownPartiesProvider> */}
        </DamlLedger>
        );
    }
}

export default withRouter(FrontLayout);
