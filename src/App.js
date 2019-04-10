import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import jsonData from './data.json'
import Select from 'react-select'
import { Container, Row, Col } from 'react-grid-system';

  
  class IFSC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: '',
      result:[],
      style :{
        display :'none',
      },
      message :'',
    };
    
      this.handleChange = this.handleChange.bind(this);
     var that = this;
    }
    handleChange(event) {
      this.setState({
        value: event.target.value,
        }
        );
    }
    onFormSubmit(e) {
      e.preventDefault();
      var that = this;
      if (this.state.value != '') {
        var ifsc = this.state.value;
        fetch('https://ifsc.razorpay.com/' + ifsc).then(function (response) {
          return response.json();
        }).then(function (result) {
          that.setState({result});
        });
    
        this.setState({
          style: {
            display: 'block',
             },
           message: '',
        })
        if(this.state.message=="Please fill IFSC code"){
          this.setState({
            message: ''
          })
        }  
      }
      if (this.state.value == ''){
        this.setState({
          message : "Please fill IFSC code",
          style: {
            display: 'none',
          },
        })
      }
    }    
    render() {
      var dsply = this.state.style;
      var bank_detail = this.state.result;
     
      return (
        <div> 
          <Row><Col md={4}></Col>
          <Col md={4}><h1> Search by IFSC Code</h1></Col>
          <Col md={4}></Col>
          </Row>
          <Row><Col md={4}></Col>
          <Col md={4}>
        <form >
          <label>
          <b> IFSC Code : </b> 
             <input type="text" value={this.state.value}  onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" onClick={this.onFormSubmit.bind(this)} />
       
        </form>
        </Col>
        <Col md={4}></Col>
          </Row>
        <br />
        <Row><Col md={4}></Col>
          <Col md={4}>{this.state.message}<br></br>
          <div className="BANK_DETAILS" style={dsply}>
           <b> Bank Name : </b> {bank_detail.BANK}<br></br>
           <b>Branch Name : </b> {bank_detail.BRANCH}<br></br>
           <b>Address : </b> {bank_detail.ADDRESS}<br></br>
           <b>IFSC Code : </b> {bank_detail.IFSC}<br></br>
           <b>City : </b> {bank_detail.CITY}<br></br>
           <b>State : </b>  {bank_detail.STATE}

          </div></Col>
          <Col md={4}></Col>
          </Row>
        
        <br />
        <Search_By_City />
        </div>


      );
    }
  }
  export default  IFSC;


  class Search_By_City extends React.Component {
    constructor(props){
      super(props);
      this.state ={
        value :'',
        bank_name :[],
        
      };
      this.handleChange = this.handleChange.bind(this);
     var that =this ;
    }
    handleChange(e){
      this.setState({value: e.target.value});
    }
    _onChange(value) {
      this.setState({
        value: value,
        bank_name :[],
      });
    }
    
    onFormSubmit(e){
      e.preventDefault();
     var bankname =[];
      var k=0;
      for(var i = 0; i < jsonData.length; i++) {
        var obj = jsonData[i];
    if(obj.CITY ===this.state.value.value){
      bankname[k] = obj;
      k++;
       }
    }
    this.setState({
      bank_name : bankname,
    })
    
    }

   render(){
    var Bank_name = this.state.bank_name;
    const options = [
      { value: 'SAHARANPUR, UP', label: 'SAHARANPUR, UP' },
      { value: 'ROORKEE', label: 'ROORKEE' },
      { value: 'DUMKA', label: 'DUMKA' },
      { value: 'MAHARAJGANJ', label: 'MAHARAJGANJ' },
      { value: 'DEHRADUN', label: 'DEHRADUN' },
      { value: 'JODHPUR', label: 'JODHPUR'},
      { value: 'AJMER', label: 'AJMER'}
    ]
  
   return(
     <div>
      <Row>
       <Col md={4}></Col>
        <Col md={4}>
        <h1> Search by City Name</h1>
        </Col>
      </Row>
      <Row>
         <Col md={3}></Col>
         <Col md={6}>
            <div>
            Note :<br>
            </br>
             This is just a Demo . There is just sample of Names of Banks in City
            </div>
          </Col>
         
         </Row>
         <br></br>
         <Row>
         <Col md={3}></Col>
         <Col md={4}>
          <div >
         <Select value={this.state.value} placeholder="Choose City" options={options} onChange={this._onChange.bind(this)}/></div></Col>
        <Col md={3}> <input type="submit" value="Submit" onClick={this.onFormSubmit.bind(this)} /></Col>
        </Row>
        <Row>
          <Col md={1}></Col>
          <Col md={10}>
        <div className="allBanks">
        {Bank_name.map((bank)=> {
          return(
            <div className="Bank_details">
              <b>Bank Name</b> :   {bank.BANK} <br></br>
              <b>Branch </b>:  {bank.BRANCH} <br></br>
              <b>IFSC Code </b>:  {bank.IFSC} <br></br>
              <b>State</b> :{bank.STATE}<br></br>
              <b>Address</b> : {bank.ADDRESS}<br></br>
            </div>
          )
        })}
        </div>
        </Col>
        <Col md={1}></Col>
        </Row>
     </div>

      );
   }
  }
  


