import { LightningElement,api,wire} from 'lwc';
import resetpasswords from '@salesforce/apex/powerlookController.resetpasswords';

export default class Powerlookeditprofile extends LightningElement {

    @api user;
    @api Email;
    @api Contact;
    @api Password;
    @api Confirmpassword;
    @api errors;

    registervlue(event){
        if(event.currentTarget.dataset.key == "Email"){
            this.Email = event.target.value;
        }
        else if(event.currentTarget.dataset.key == "Contact"){
            this.Contact = event.target.value;
        }
        else if(event.currentTarget.dataset.key == "Password"){
            this.Password = event.target.value;
        }
        else if(event.currentTarget.dataset.key == "Confirm Password"){
            this.Confirmpassword = event.target.value;
        }
       
    }

    handleEdit(){

        if(this.Email == null || this.Contact == null || this.Password == null || this.Confirmpassword == null )
       {
        const evte = new ShowToastEvent({
            title: 'Alert',
            message: 'Please fill in all the details',
            variant: 'warning',
            mode: 'pester'
        });
        this.dispatchEvent(evte);
       }
       else{
        resetpasswords({
            Email:this.Email,
            Con:this.Contact,
            Password:this.Password,
            ConfirmPass : this.Confirmpassword

        })
        .then(result => {
           
            var msg =result;

            if(msg =='Changes has been saved . Please Login !'){
                const selectedEvent = new CustomEvent('resetpassword', {
                    detail : {
                      message : msg
                    }
                });
               this.dispatchEvent(selectedEvent);
            }
           else{
            const evte = new ShowToastEvent({
                title: 'Alert',
                message: msg,
                variant: 'warning',
                mode: 'pester'
            });
            this.dispatchEvent(evte);
             }
           
            
        })
        .catch(error => {
            this.errors = error;
            /*eslint-disable no-console */
         console.log('product cart error ===  '+this.errors);
         const evte = new ShowToastEvent({
            title: 'Alert',
            message: this.errors,
            variant: 'warning',
            mode: 'pester'
        });
        this.dispatchEvent(evte);
        });

       
        
    }
    }

    handleCancel(){
        const selectedEvent = new CustomEvent('canceledit', {
            detail : {
                
                cancel: true            }
        });
        //dispatching the custom event
        
        this.dispatchEvent(selectedEvent);
    }
}