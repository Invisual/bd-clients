import React, { Component } from 'react';
import { SideBarOption } from './SideBarOption'
import { get, last } from 'lodash'

export default class SideBar extends Component{
	constructor(props) {
		super(props)
		this.state = {
			reciever:""
		}		
	}
	handleSubmit = (e) => {
		e.preventDefault()
		const { reciever } = this.state
		const { onSendPrivateMessage } = this.props
		console.log(reciever);
		onSendPrivateMessage(reciever)
	}	
	render(){
		const { chats, activeChat, user, setActiveChat, logout} = this.props
		const { reciever } = this.state
		return (
			<div id="side-bar">
					<div className="heading">
						<div className="app-name">Our Cool Chat CHEV</div>
						<div className="menu">
							MENU
						</div>
					</div>
					<form onSubmit={this.handleSubmit} className="search">
						<i className="search-icon">SEARCH</i>
						<input 
						placeholder="Search" 
						type="text"
						value={reciever} 
						onChange={(e)=>{this.setState({reciever:e.target.value}) }}/>
						<div className="plus"></div>
					</form>
					<div 
						className="users" 
						ref='users' 
						onClick={(e)=>{ (e.target === this.refs.user) && setActiveChat(null) }}>
						
						{
						chats.map((chat)=>{
							if(chat.name){
								//const lastMessage = chat.messages[chat.messages.length - 1];
								/*const chatSidename = chat.users.find((name)=>{
									return name !== user.name
								}) || "Community"*/
								//const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : ''
								
								return(
								<SideBarOption
									key = { chat.id }
									name = { chat.name }
									lastMessage = { get(last(chat.messages), 'message', '') }
									active = {activeChat.id === chat.id }
									onClick = { () => { this.props.setActiveChat(chat) } }
								/>
							)
							}

							return null
						})	
						}
						
					</div>
					<div className="current-user">
						<span>{user.name}</span>
						<div onClick={()=>{logout()}} title="Logout" className="logout">
							EJECT
						</div>
					</div>
			</div>
		);
	
	}
}
