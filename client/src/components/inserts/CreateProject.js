import React from 'react';
import {InsertFormDiv} from '../../styles/inserts'

export const CreateProject = props => {
    return (
        <InsertFormDiv>
            <div className="form-title"><h2>{props.title}</h2></div>
            <input type="text" className="title-input" onChange={props.changeTitleInput} placeholder="Título"/>
            <textarea className="briefing-textarea" onChange={props.changeTitleInput} placeholder="Briefing"></textarea>
            <input type="text" className="title-input" onChange={props.changeTitleInput} placeholder="Título"/>
            <input type="text" className="title-input" onChange={props.changeTitleInput} placeholder="Título"/>
            <input type="text" className="title-input" onChange={props.changeTitleInput} placeholder="Título"/>
            <input type="text" className="title-input" onChange={props.changeTitleInput} placeholder="Título"/>
        </InsertFormDiv>
    );
}