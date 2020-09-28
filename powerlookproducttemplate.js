import { LightningElement,api } from 'lwc';

export default class Powerlookproducttemplate extends LightningElement {

    @api product;
    @api productselected;

    tileClick(evt){
        /*eslint-disable no-console */
        console.log('evt ===  is fired'+this.product);
            this.productselected=true;
            const event = new CustomEvent('productselected', {
                detail: this.product
            });
            // Fire the event from c-list
            this.dispatchEvent(event);
            
        }

}
