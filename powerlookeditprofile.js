import { LightningElement,api} from 'lwc';

export default class Powerlookeditprofile extends LightningElement {

    @api user;
    @api lastname;
    @api firstname;
    @api Email;
    @api Contact;
    @api errors;

   /* constructor(){
        super();
       this.firstname = this.user.Name;
        this.lastname = this.user.LastName__c;
        this.Email = this.user.Email_Id__c;
        this.Contact = this.user.Contact__c;
    }*/

    registervlue(event){
        try{
        
        if(event.currentTarget.dataset.key == "FirstName"){
            this.firstname = event.target.value;
            //alert(this.firstname);
        }
        else if(event.currentTarget.dataset.key == "LastName"){
            this.lastname = event.target.value;
        }
        else if(event.currentTarget.dataset.key == "Email"){
            this.Email = event.target.value;
        }
        else if(event.currentTarget.dataset.key == "Contact"){
            this.Contact = event.target.value;
        }
        }
        catch(error){
            this.errors = error;
            	/*eslint-disable no-console */
						 console.log('error ===  '+this.errors);

        }
    }
       
    

    handleEdit(){

        if(this.firstname == null){
            this.firstname = this.user.Name;
        }
        if(this.lastname == null){
            this.lastname = this.user.LastName__c;
        }
        if(this.Email == null){
            this.Email = this.user.Email_Id__c;
        }
        if(this.Contact == null){
            this.Contact = this.user.Contact__c;
        }
       // alert(this.firstname +' '+this.lastname + ' '+this.Email +' '+this.Contact);
        const selectedEvent = new CustomEvent('editprofile', {
            detail : {
                Name:this.firstname,
                Lastname:this.lastname,
                Email:this.Email,
                Contact: this.Contact
            }
        });
        //dispatching the custom event
        
        this.dispatchEvent(selectedEvent);

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