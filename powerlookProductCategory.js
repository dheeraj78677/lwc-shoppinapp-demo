import { LightningElement ,api} from 'lwc';

export default class PowerlookProductCategory extends LightningElement {

    @api product;
    @api msg;

    tileClick(event){
          //  alert(event.currentTarget.dataset.key);
            const eventone = new CustomEvent('productselected', {
                detail: event.currentTarget.dataset.key
            });
            // Fire the event from c-list
            this.dispatchEvent(eventone);
    }
}