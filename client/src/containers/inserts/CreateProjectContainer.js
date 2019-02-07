import React, {Component} from 'react';
import {CreateProject} from '../../components/inserts/CreateProject';

class CreateProjectContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            titleInput: '',
            briefingInput: '',
            deadlineInput: '',
            billingInput: '',
            clientInput: '',
            accountInput: ''
        }
    }

    changeTitleInput = (e) => {
        this.setState({ titleInput: e.target.value })
    }

    changeBriefingInput = (e) => {
        this.setState({ briefingInput: e.target.value })
    }

    changeDeadlineInput = (e) => {
        this.setState({ deadlineInput: e.target.value })
    }

    changeBillingInput = (e) => {
        this.setState({ billingInput: e.target.value })
    }

    changeClientInput = (e) => {
        this.setState({ clientInput: e.target.value })
    }

    changeAccountInput = (e) => {
        this.setState({ accountInput: e.target.value })
    }


    render(){
        return <CreateProject
                title={this.props.title}
                changeTitleInput={this.changeTitleInput}
                changeBriefingInput={this.changeBriefingInput}
                changeDeadlineInput={this.changeDeadlineInput}
                changeBillingInput={this.changeBillingInput}
                changeClientInput={this.changeClientInput}
                changeAccountInput={this.changeAccountInput}
                />;
    }
}

export default CreateProjectContainer;