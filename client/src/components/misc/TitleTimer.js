import {Component} from 'react';
import moment from 'moment';
import 'moment-duration-format';

class TitleTimer extends Component{
constructor(props){
    super(props);
    this.state = {
        interval: ''
    }
}

showActiveHoursOnTitle = (latestHour) => {
    var x = new moment()
    var y = new moment(latestHour, 'H:mm:ss');
    var duration = moment.duration(x.diff(y)).format('*HH:mm:ss');
    document.title =`🕑 ${duration}`;
}

componentDidUpdate(prevProps){
    var interval
    
        if(this.props.loggedIn){
            if(prevProps.latestActiveHour !== this.props.latestActiveHour){
                if(this.props.latestActiveHour !== '' && this.props.latestActiveHour !== null){
                    interval = setInterval(() => this.showActiveHoursOnTitle(this.props.latestActiveHour), 1000)
                    this.setState({interval: interval})
                }
                if(this.props.latestActiveHour === null && this.props.latestActiveBudgetHour === null){
                    document.title = 'Invisual - Clients Data';
                    clearInterval(this.state.interval);
                }
            } else if (prevProps.latestActiveBudgetHour !== this.props.latestActiveBudgetHour){     
                if(this.props.latestActiveBudgetHour !== '' && this.props.latestActiveBudgetHour !== null){
                    interval = setInterval(() => this.showActiveHoursOnTitle(this.props.latestActiveBudgetHour), 1000)
                    this.setState({interval: interval})
                }
                if(this.props.latestActiveBudgetHour === null && this.props.latestActiveHour === null){
                    document.title = 'Invisual - Clients Data';
                    clearInterval(this.state.interval);
                }
            }
        }
        else{
            document.title = 'Invisual - Clients Data';
            clearInterval(this.state.interval);
        }
    
}


render(){
   return false;
}

}


export default TitleTimer