import React, { Component } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./protected.route";
// console.log('app')
import HomeMain from "./components/home";
import Login from "./components/login";
import Users from "./components/users";
import Saftey from "./components/saftey";
import About from "./components/about";
import Tours from "./components/tours";
import NewIncident from "./components/admin/incident/newIncident";
import SafteyHome from "./components/admin/incident";
import ViewIncident from "./components/admin/incident/viewIncident";
import RequestList from "./components/admin/requestList";
import AdminJobs from "./components/admin/myJobs";
import AdminHome from "./components/admin";
import Learning from "./components/admin/learning";
import MyJobs from "./components/myjobs";
import ViewHistory from "./components/viewhistory";
import Privacy from "./components/privacy";
import JobDetail from "./components/viewhistory/jobDetail";
import RequestFiles from "./components/admin/requestFiles";
import MyDrafts from "./components/admin/myDrafts";
import "./App.css";
import EditEngineeringRequestForm from "./components/admin/EditEngineeringRequestForm";
import EngineeringRequests from "./components/admin/EngineeringRequests";
import EngineeringRequest from "./components/admin/EngineeringRequest";

class App extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    // this simulates an async action, after which the component will render the content
    demoAsyncCall().then(() => this.setState({ loading: false }));
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      // if your component doesn't have to wait for async data, remove this block
      return null; // render null when app is not ready
    }

    return (
      <div className={"App"}>
        <Router>
          <Switch>
            <ProtectedRoute exact path="/" component={HomeMain} />
            <ProtectedRoute path="/safety" component={Saftey} />
            <ProtectedRoute path="/about" component={About} />
            <ProtectedRoute path="/tour" component={Tours} />
            <ProtectedRoute path="/myjobs" component={MyJobs} />
            <ProtectedRoute path="/myDrafts" component={MyDrafts} />
            <ProtectedRoute path="/admin/newincident" component={NewIncident} />
            <ProtectedRoute path="/engineering-requests" component={EngineeringRequests} />
            <ProtectedRoute path="/engineering-request/:id" component={EngineeringRequest} />
            <ProtectedRoute
              path="/admin/engineering-request-form"
              component={EditEngineeringRequestForm}
            />
            <ProtectedRoute
              path="/admin/viewIncident/:id"
              component={ViewIncident}
            />
            <ProtectedRoute path="/reqList" component={RequestList} />
            <ProtectedRoute path="/admin/adminJobs" component={AdminJobs} />
            <ProtectedRoute path="/admin/safety" component={SafteyHome} />
            <ProtectedRoute path="/admin/learning" component={Learning} />
            <ProtectedRoute path="/admin" component={AdminHome} />
            <ProtectedRoute path="/viewHistory" component={ViewHistory} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/jobDetail/:id" component={JobDetail} />
            <Route path="/crm_case_files/:id" component={RequestFiles} />
            <Route path="/login" component={Login} />
            <ProtectedRoute path="/userList" component={Users} />
            <Route path="*">No Match</Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

function demoAsyncCall() {
  return new Promise((resolve) => setTimeout(() => resolve(), 2500));
}

export default App;
