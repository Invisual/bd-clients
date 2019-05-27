import {Component} from 'react';
import moment from 'moment';
import 'moment-duration-format';

class TitleTimer extends Component{
constructor(props){
    super(props);
    this.state = {
        latestActiveHour: ''
    }
}

showActiveHoursOnTitle = () => {
    var x = new moment();
    var y = new moment(this.state.latestActiveHour, 'H:mm:ss');
    var duration = moment.duration(x.diff(y)).format('*HH:mm:ss');
    document.title =`🕑 ${duration}`;
}

componentDidUpdate(prevProps){
    if(prevProps.latestActiveHour !== this.props.latestActiveHour){     
        this.setState({latestActiveHour: this.props.latestActiveHour}, () => {
            if(this.state.latestActiveHour !== '' && this.state.latestActiveHour !== null){
                this.interval = setInterval(() => this.showActiveHoursOnTitle(), 1000);
            }
            if(this.state.latestActiveHour === null){
                document.title = 'INVISUAL - TAREFAS';
                clearInterval(this.interval);
            }
        })
        
    } else if (prevProps.latestActiveBudgetHour !== this.props.latestActiveBudgetHour){     
        this.setState({latestActiveHour: this.props.latestActiveBudgetHour}, () => {
            if(this.state.latestActiveHour !== '' && this.state.latestActiveHour !== null){
                this.interval = setInterval(() => this.showActiveHoursOnTitle(), 1000);
            }
            if(this.state.latestActiveHour === null){
                document.title = 'INVISUAL - TAREFAS';
                clearInterval(this.interval);
            }
        })
        
    }
}

render(){
   return false;
}

}


export default TitleTimer