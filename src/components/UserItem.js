import React from 'react';
import Dropdown from './Dropdown';
import UserButton from './UserButton'
import ProfPic from './ProfPic';
import '../styles/useritem.css';
import { Container, Row, Col } from 'reactstrap';

function UserItem(props){
    return(
        <div >
            
             <div className="user">
             <ProfPic classType="avatar-user" avatar={props.avatar}/>
            <Container>
                <Row>
                <Col>
                    <h1 className="username-user">{props.username}</h1>
                </Col>
                <Col>
                    <UserButton className="user-dropdown" username={props.username} buttonFunctions={props.funcArr} buttonTitles={props.funcName}/>
                </Col>
                </Row>
            </Container>
            </div>
        </div>
    );
}

export default UserItem;