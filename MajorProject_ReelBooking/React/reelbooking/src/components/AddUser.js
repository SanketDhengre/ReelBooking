import React from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';

class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            userId: 0,
            Name: '',
            Email: '',
            Phone: '',
            Password: '',
        };

        this.state = props.user.userId ? props.user : this.initialState;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onFormSubmit(this.state);
        this.setState(this.initialState);
    }

    render() {
        const { Name, Email, Phone, Password } = this.state;
        const { formTitle = 'Add User', submitButtonText = 'Save' } = this.props;

        return (
            <div>
                <h2>{formTitle}</h2>
                <Row>
                    <Col sm={7}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId='Name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='Name'
                                    value={Name}
                                    onChange={this.handleChange}
                                    placeholder='Full Name'
                                />
                            </Form.Group>
                            <Form.Group controlId='Email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='Email'
                                    value={Email}
                                    onChange={this.handleChange}
                                    placeholder='Email'
                                />
                            </Form.Group>
                            <Form.Group controlId='Phone'>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type='tel'
                                    name='Phone'
                                    value={Phone}
                                    onChange={this.handleChange}
                                    placeholder='Phone'
                                />
                            </Form.Group>
                            <Form.Group controlId='Password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    name='Password'
                                    value={Password}
                                    onChange={this.handleChange}
                                    placeholder='Password'
                                />
                            </Form.Group>
                            <Button variant='success' type='submit'>{submitButtonText}</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AddUser;
