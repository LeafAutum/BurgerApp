import React ,{ Component } from 'react';
import Aux from '../../hoc/auxilary';
import Model from '../../Components/UI/Model/Model';


const WithErrorHandler = (WrappedComponent, axios) =>{
    return class extends Component  {
      state = {
          error :null
      }

       componentDidMount (){
             this.reqIntercept =axios.interceptors.request.use(req => {
                this.setState({error :null});
                console.log(req)
                return req;
             });

             this.resIntercept = axios.interceptors.response.use(res => res, error => {
                this.setState({error :error});
                
               
             });
       }

       componentWillUnmount(){
            console.log("un mount");
            axios.interceptors.request.eject(this.reqIntercept);
            axios.interceptors.response.eject(this.resIntercept);
       }

       errorConfirmHandler =() => {
           this.setState({ error:null });
       }

        render () {
        return  (
            <Aux>   
                <Model show = {this.state.error} modelclosed={this.errorConfirmHandler}> 
                   {this.state.error  ? this.state.error.message : null}
                </Model>
                
                <WrappedComponent {... this.props}/>
            </Aux>
        )
        ;
    }
}
};

export default WithErrorHandler;