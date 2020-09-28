import { LightningElement,api } from 'lwc';

export default class Powerlookproducttemplate extends LightningElement {

    @api product;
    @api inputoutput;
    @api size;
    @api quantity;
   
    handleEdit(evt){
        this.inputoutput = true;           
    
    }

    selectionChangeHandler(event){

        /*eslint-disable no-console */
        console.log(event.target.value);
        this.size = event.target.value;
    }
        
    handleChange(event) {
          //  alert(event.target.value);
            this.quantity = event.target.value;
    }

    handleSave(){
        if(this.size != null && this.quantity!= null){
            const selectedEvent = new CustomEvent('editproductcart', {
                detail : {
                    Name:this.product.Id,
                     Size: this.size,
                    Quantity: this.quantity,
                    orderId : this.product.OrderId__c
                }
            });
            //dispatching the custom event
           // alert(selectedEvent.detail.Name);
            this.dispatchEvent(selectedEvent);
        }
        else{
          //  alert('Please select size and quantity');
            const evt = new ShowToastEvent({
                title: 'Message',
                message: 'Please select size and quantity ',
                variant: 'warning',
                mode: 'pester'
            });
            this.dispatchEvent(evt);
        }
    }

    handleCancel(evt){
        this.inputoutput = false;
    }


    handleRemove(){
        const selectedEvent = new CustomEvent('deleteproductcart', {
            detail : {
                Name:this.product.Id,               
                orderId : this.product.OrderId__c
            }
        });
        //dispatching the custom event
      //  alert(selectedEvent.detail.Name);
        this.dispatchEvent(selectedEvent);
    }

}
