import React from 'react';
import Dropdown from './Dropdown';
import ProfPic from './ProfPic';
import '../styles/useritem.css';
import { Container, Row, Col } from 'reactstrap';

function UserItem(props){
    return(
        <div classType="useritem">
            <Container>
                <Row>
                <Col>
                    <ProfPic classType="avatar" avatar={props.avatar}/>
                </Col>
                <Col>
                    <h1 className="username">{props.username}</h1>
                </Col>
                <Col>
                    <Dropdown className="dropdown" buttonFunctions={props.funcArr} buttonTitles={props.funcName}/>
                </Col>
                </Row>
            </Container>
            <hr/>
        </div>
    );
}

export default UserItem;