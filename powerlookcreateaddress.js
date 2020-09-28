import { LightningElement ,api} from 'lwc';
import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';

export default class Powerlookcreateaddress extends LightningElement {
    
    @api user;
    @api postalcode;
    @api city;
    @api state;
    @api address;

    registervlue(event){
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

    handleaddaddress(){
      //  alert('add address  '+ this.address + ' '+this.city + ' '+this.state + ' '+this.postalcode);
        if(this.address != null && this.city != null && this.state != null && this.postalcode != null){
            const selectedEvent = new CustomEvent('addaddress', {
                detail : {
                    address:this.address,
                     city: this.city,
                    state: this.state,
                    postalcode:this.postalcode,
                    User:this.user.Id
                }
            });
            //dispatching the custom event
            
            this.dispatchEvent(selectedEvent);
        }
        else{
            const evt = new ShowToastEvent({
                title: 'Message',
                message: 'Please fill in all details ',
                variant: 'warning',
                mode: 'pester'
            });
            this.dispatchEvent(evt);
        }
    }

}