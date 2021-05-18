import react, { Component } from "react";
import Button from '../../../Components/UI/Button/Button';
import Classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';
import { element } from "prop-types";


class ContactData extends Component{
      state ={
          orderForm : {
          name: {
                 elementType:'input',
                 elementConfig:{
                     type:'text',
                     placeholder:'your name'
                 },
                 value : '',
                 validation:{
                     required:true
                 },
                 valid:false,
                 touched:false
             },
          email:{
            elementType:'input',
            elementConfig:{
                type:'email',
                placeholder:'email'
            },
            value : '',
            validation:{
                required:true
            },
            valid:false,
            touched:false
          },
          street:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'street'
            },
            value : '',
            validation:{
                required:true
            },
            valid:false,
            touched:false
          },
          postalcode:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'postal code'
            },
            value : '',
            validation:{
                required:true,
                minLength:5,
                maxLength:5
            },
            valid:false,
            touched:false
          },
          country:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'country'
            },
            value : '',
            validation:{
                required:true
            },
            valid:false,
            touched:false
          },
          deliverymethod:{
            elementType:'select',
            elementConfig:{
                options : [
                    {value : 'fastest', displayValue : 'Fastest'},
                    {value : 'cheapest', displayValue : 'Cheapest'}
                ]
            },
            value : 'cheapest',
            validation:{
                required:false
            },
            valid:true
          }
      
            
          },
          loading:false,
          formIsvalid :false
      }

      orderHandler=(event) => {
         event.preventDefault();
         this.setState({loading:true});
         const formData ={};
         for (let formIdentifier in this.state.orderForm){
             formData[formIdentifier] =this.state.orderForm[formIdentifier].value;
         }
         const order ={
         ingredients : this.props.ingredients,
         price : this.props.totalprice,
         orderdata:formData
     }
     
     axios.post('/orders.json',order).then(
         response =>{
         this.setState({loading:false});
         this.props.history.push('/');
         console.log(response);
        }) .catch(
             error => {
             this.setState({loading:false});
             console.log(error)}
             );
             console.log("propsss",this.props.ingredients,this.props.totalprice);
      }
  
      inputChangeHandler = (event,inputIdentifier) =>{
         const updatedorderForm ={
              ...this.state.orderForm
          }
          const updatedFormElement ={
              ...updatedorderForm[inputIdentifier]
          };
          updatedFormElement.value = event.target.value;
          updatedFormElement.valid = this.checkValidity(updatedFormElement.value ,updatedFormElement.validation);
          updatedFormElement.touched = true;
          updatedorderForm[inputIdentifier]=updatedFormElement;
        

          
          let formIsvalid =true;
          for (let element in updatedorderForm){
             
              formIsvalid = updatedorderForm[element].valid && formIsvalid;
          }
          
          
        
          this.setState({orderForm: updatedorderForm,formIsvalid:formIsvalid });
         
      }


      checkValidity(value,rules){
          let isValid = true;
          if(!rules.required){
              return true;
          }
          if(rules.required){
              isValid = value.trim() !== '' && isValid  ;
          }

          if(rules.minLength){
              isValid= value.length >= rules.minLength  && isValid;
          }

          if(rules.minLength){
            isValid= value.length <= rules.minLength  && isValid ;
        }
          return isValid;
      }

      render(){
          let formElements =[];
          for (let key in this.state.orderForm){
              formElements.push(
                  {
                      id:key,
                      config:this.state.orderForm[key]
                  }
              )
          };

          
          let form = <form onSubmit={this.orderHandler}>
        
           {
               formElements.map(element => (
                    <Input   key ={element.id}
                    elementConfig={element.config.elementConfig} changed={(event) => this.inputChangeHandler(event,element.id)}
                    elementType ={element.config.elementType} touch={element.config.touched}
                    invalid={!element.config.valid} value ={element.config.value}/>
               ))
           }   
          {/* <Input  inputtype='input' type='text' name='name' placeholder='enter your name'/>
          <Input  inputtype='input' type='email' name='email' placeholder='enter your email'/>
          <Input  inputtype='input' type='street' name='street' placeholder='enter your street'/>
          <Input  inputtype='input' type='postalcode' name='postalcode' placeholder='enter your postalcode'/> */}
          <Button btnType='Success' clicked={this.orderHandler} disabled ={!this.state.formIsvalid}> ORDER </Button>
           </form>;
          if(this.state.loading){
            form = <Spinner/>
          }
          return(
              <div className={Classes.ContactData}>
                  <h4>Enter your contact name</h4>
                     {form}
              </div>
          )
      }
};



export default ContactData;
