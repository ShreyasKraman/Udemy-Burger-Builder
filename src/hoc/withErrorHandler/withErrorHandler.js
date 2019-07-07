import React, {Component} from 'react';

import Aux from '../Auxillary/Auxillary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            errors: null,
        }

        componentWillMount() {

            this.reqInterceptor = axios.interceptors.request.use(req => {
                                    this.setState({errors:null});
                                    return req;
                                  })

            this.resInterceptor = axios.interceptors.response.use(res => res,error => {
                                    this.setState({errors:error});
                                  });

        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorCloseHandler = () => {
            this.setState({errors: null});
        }

        render(){
            return (
                <Aux>
                    <Modal 
                        show = {this.state.errors}
                        clicked  = {this.errorCloseHandler}>
                        {this.state.errors ? this.state.errors.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    } 
};

export default withErrorHandler;