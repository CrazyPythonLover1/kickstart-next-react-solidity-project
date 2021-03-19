import React, { Component } from 'react';
import { Button, Form, Input, Message} from 'semantic-ui-react'
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
    constructor(props) {
        super(props);

    }

    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }


    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true , errorMessage: ''})

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                });
            Router.pushRoute('/');
        } catch (err) {
            this.setState({errorMessage: err.message})
        }
        
        this.setState({ loading: false })
    };

    render() {
        return (
            <Layout>
                <h1> Create a new Campaign!</h1>


                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                    <label> Minimum Contribution </label>
                    <Input 
                        label='wei' 
                        placeholder='' 
                        labelPosition='right' 
                        value={this.state.minimumContribution}
                        onChange={event => this.setState({ minimumContribution: event.target.value })}
                    />
                    </Form.Field>

                    <Message error>
                        <Message.Header> OOps! </Message.Header>
                        <p> { this.state.errorMessage } </p>
                    </Message>

                    <Button loading={this.state.loading} type='submit' primary> Create! </Button>
                </Form>
            </Layout>
        );
    }
}


export default CampaignNew;