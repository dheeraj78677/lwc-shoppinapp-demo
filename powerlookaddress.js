import { LightningElement,api } from 'lwc';
import editaddressdetail from '@salesforce/apex/powerlookController.editaddressdetail';
import deleteaddressdetail from '@salesforce/apex/powerlookController.deleteaddressdetail';

import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';


export default class Powerlookaddress extends LightningElement {

    @api addlist;
    @api editpage;
    @api address;
    @api city;
    @api state;
    @api postalcode;
    @api errors;


    registervlue(event){
        try{
        
        if(event.currentTarget.dataset.key == "address"){
            this.address = event.target.value;
        }
        else if(event.currentTarget.dataset.key == "city"){
            this.city = event.target.value;
        }
        else if(event.currentTarget.dataset.key == "state"){
            this.state = event.target.value;
        }
        else if(event.currentTarget.dataset.key == "postalcode"){
            this.postalcode = event.target.value;
        }
        }
        catch(error){
            this.errors = error;
            	/*eslint-disable no-console */
						 console.log('error ===  '+this.errors);

        }
    }

    handlselect(){
        const selectedEvent = new CustomEvent('attachaddresstoorder', {
            detail : {
               Id:this.addlist.Id
            }
        });
        //dispatching the custom event
      
        this.dispatchEvent(selectedEvent);
    }

    handleEdit(){
        this.editpage = true;
    }

    handleRemove(){
        deleteaddressdetail({
            addId : this.addlist.Id,
          })
        .then(result => {
           
            var msg = result;
            /*eslint-disable no-console */
         
            const evte = new ShowToastEvent({
                title: 'Alert',
                message: msg,
                variant: 'success',
                mode: 'pester'
            });
            this.dispatchEvent(evte);

            const selectedEvent = new CustomEvent('deladdressdet', {
                detail : {
                   message:msg
                }
            });
            //dispatching the custom event
          
            this.dispatchEvent(selectedEvent);
           
            
        })
        .catch(error => {
            this.errors = error;
            /*eslint-disable no-console */
         console.log('product cart error ===  '+this.errors);
        });
    }

    handleCancel(){
        this.editpage = false;
    }

    handleSave(){
        if(this.address == null){
            this.address = this.addlist.Shipping_Street__c;
        }
        if(this.city == null){
            this.city = this.addlist.Shipping_City__c;
        }
        if(this.state == null){
            this.state = this.addlist.Shipping_State__c;
        }
        if(this.postalcode == null){
            this.postalcode = this.addlist.Postal_Code__c;
        }

        editaddressdetail({
            addId : this.addlist.Id,
            address : this.address,
            city:this.city,
           state: this.state,
           postalcode: this.postalcode})
        .then(result => {
           
            var msg = result;
            /*eslint-disable no-console */
         
            const evte = new ShowToastEvent({
                title: 'Alert',
                message: msg,
                variant: 'success',
                mode: 'pester'
            });
            this.dispatchEvent(evte);

            const selectedEvent = new CustomEvent('editaddressdet', {
                detail : {
                   message:msg
                }
            });
            //dispatching the custom event
          
            this.dispatchEvent(selectedEvent);
           
            
        })
        .catch(error => {
            this.errors = error;
            /*eslint-disable no-console */
         console.log('product cart error ===  '+this.errors);
        });

    }

}