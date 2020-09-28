import { LightningElement,api,wire } from 'lwc';
import banner1 from  '@salesforce/resourceUrl/powerlookbanner1';
import banner2 from  '@salesforce/resourceUrl/powerlookbanner2';
import getProductList from '@salesforce/apex/powerlookController.getProductList';
import getShirtList from '@salesforce/apex/powerlookController.getShirtList';
import getTShirtList from '@salesforce/apex/powerlookController.getShirtList';
import getTracksuitList from '@salesforce/apex/powerlookController.getShirtList';
import getExploreList from '@salesforce/apex/powerlookController.getExploreList';
import getExploreListwithSubcat from '@salesforce/apex/powerlookController.getExploreListwithSubcat';
import RegisterUser from '@salesforce/apex/powerlookController.RegisterUser';
import LoginUser from '@salesforce/apex/powerlookController.LoginUser';
import inserorder from '@salesforce/apex/powerlookController.inserorder';
import fetchOrderId from '@salesforce/apex/powerlookController.fetchOrderId';
import addOrderProduct from '@salesforce/apex/powerlookController.addOrderProduct';
import getOrderProduct from '@salesforce/apex/powerlookController.getOrderProduct';
import EditcartProduct from '@salesforce/apex/powerlookController.EditcartProduct';
import deletecartProduct from '@salesforce/apex/powerlookController.deletecartProduct';
import addresslist from '@salesforce/apex/powerlookController.addresslist';
import addaddresslist from '@salesforce/apex/powerlookController.addaddresslist';
import attachaddress from '@salesforce/apex/powerlookController.attachaddress';
import editprofile from '@salesforce/apex/powerlookController.editprofile';






import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';

export default class Powerlookmain extends LightningElement {
    powerlookbanner1 = banner1;
    powerlookbanner2 = banner2;
    
    @api productlist; //in explore section
    @api shirtlist; //best shirt
	@api tshirtlist; //best tshirt
	@api jacketlist; //best jacket
	@api tracksuitlist; //best tracksuit
    @api errors;

	@api MainPage;
    @api ShowProduct;
    @api ProductListPage;
    @api loginPage;
    @api SignUp ;
    @api cartPage;
    @api selectaddress;
    @api newaddress;
    @api addresslist;
    @api editprofile;
    @api resetpassword;
    
    @api ExploreProductSelection;
    @api allproductlist;
	
    @api Productdeatil;

    @api islogin = false;
    @api Username;
    @api Password;

    @api powerlookuser;
	@api orderid;
	@api cartproduct;
    
    @api Firstname;
    @api LastName;
    @api UserEmail;
    @api Contact;
    @api UserPassword;
    
    constructor(){
        super();
        this.MainPage = true;
        
       
    }


    handleForgotPassword(){
        this.resetpassword = true;
		this.editprofile = false;
        this.selectaddress = false;
        this.ProductListPage =false;
        this.ShowProduct = false;
        this.MainPage = false;
        this.loginPage = false;
        this.SignUp = false;
        this.cartPage = false;
         this.newaddress = false;
        
    }
    registervlue(event){
        if(event.currentTarget.dataset.key == "FirstName"){
            this.Firstname = event.target.value;
        }
        else if(event.currentTarget.dataset.key == "LastName"){
            this.LastName = event.target.value;
        }
        else if(event.currentTarget.dataset.key == "Email"){
            this.UserEmail = event.target.value;
        }
        else if(event.currentTarget.dataset.key == "Contact"){
            this.Contact = event.target.value;
        }
        else if(event.currentTarget.dataset.key == "Password"){
            this.UserPassword = event.target.value;
        }
    }

    registervluelogin(event){
        if(event.currentTarget.dataset.key == "Username"){
            this.Username = event.target.value;
        }
        else if(event.currentTarget.dataset.key == "Password"){
            this.Password = event.target.value;
        }
    }

    showmainpage(){
      //  alert('Main PAge');
        this.resetpassword = false;
		this.editprofile = false;
        this.selectaddress = false;
        this.ProductListPage =false;
        this.ShowProduct = false;
        this.MainPage = true;
        this.loginPage = false;
        this.SignUp = false;
        this.cartPage = false;
         this.newaddress = false;
    }


    @wire(getTracksuitList,{Name :'Track-Suits'}) 
    wiredTrackSuit({ error, data }) {
        if (data) {
            this.tracksuitlist = data;
            /*eslint-disable no-console */
            console.log('Tshirts=='+this.tracksuitlist);
            
        } else if (error) {

            this.errors = error;
            /*eslint-disable no-console */
            console.log('errors === '+this.errors);
           
        };
    }
    @wire(getTShirtList,{Name :'T-Shirts'}) 
    wiredTShirt({ error, data }) {
        if (data) {
            this.tshirtlist = data;
            /*eslint-disable no-console */
            console.log('Tshirts=='+this.tshirtlist);
            
        } else if (error) {

            this.errors = error;
            /*eslint-disable no-console */
            console.log('errors === '+this.errors);
           
        };
    }

    @wire(getShirtList,{Name :'Shirts'}) 
    wiredShirt({ error, data }) {
        if (data) {
            this.shirtlist = data;
            /*eslint-disable no-console */
            console.log('shirts >>>'+this.shirtlist);
            
        } else if (error) {

            this.errors = error;
            /*eslint-disable no-console */
            console.log('errors === '+this.errors);
           
        };
    }
    
    @wire(getProductList) 
    wiredProduct({ error, data }) {
        if (data) {
            this.productlist = data;
            /*eslint-disable no-console */
            console.log('productlist == '+this.productlist);
            
        } else if (error) {

            this.errors = error;
            /*eslint-disable no-console */
            console.log('errors === '+this.errors);
           
        };
    }

    UserInfo(event){
        var choose = event.currentTarget.dataset.key;  
        if(choose == 'Logout'){
                       
            eval("$A.get('e.force:refreshView').fire()");
        }
        else if(choose = 'Edit Profile'){
            this.editprofile = true;
            this.selectaddress = false;
        this.ProductListPage =false;
        this.ShowProduct = false;
        this.MainPage = false;
        this.loginPage = false;
        this.SignUp = false;
        this.cartPage = false;
         this.newaddress = false;
		 this.resetpassword = false;
        }
    }

    ChooseClothing(event){
        var choose = event.currentTarget.dataset.key;        
        // alert(choose);
          /*eslint-disable no-console */
          console.log(choose);
         if(choose.includes(":")){
            var n = choose.indexOf(":");
            var category = choose.substr(0,n);
          //  alert(category);
            var subcat = choose.substr(n+1,choose.length - 1);
         //   alert(subcat);
            getExploreListwithSubcat({Category : category, SubCategory:subcat})
            .then(result => {
                this.allproductlist = result;
                this.ProductListPage =true;
                this.resetpassword = false;
				this.editprofile = false;
				this.selectaddress = false;
				this.ShowProduct = false;
				this.MainPage = false;
				this.loginPage = false;
				this.SignUp = false;
				this.cartPage = false;
				 this.newaddress = false;
				this.SignUp = false;
                /*eslint-disable no-console */
             console.log('allproductlist ===  '+this.allproductlist);
            })
            .catch(error => {
                this.errors = error;
                 /*eslint-disable no-console */
             console.log('errors ===  '+this.errors);
            }); 

         }
         else{
            getExploreList({Name : choose})
        .then(result => {
            this.allproductlist = result;
            this.ProductListPage =true;
                this.resetpassword = false;
				this.editprofile = false;
				this.selectaddress = false;
				this.ShowProduct = false;
				this.MainPage = false;
				this.loginPage = false;
				this.SignUp = false;
				this.cartPage = false;
				 this.newaddress = false;
				this.SignUp = false;
        this.SignUp = false;
            /*eslint-disable no-console */
         console.log('allproductlist ===  '+this.allproductlist);
        })
        .catch(error => {
            this.errors = error;
        }); 
         }
         
    }

    handleexploringproduct(evt){
        this.ExploreProductSelection = evt.detail;
        getExploreList({Name : this.ExploreProductSelection})
        .then(result => {
            this.allproductlist = result;
            this.ProductListPage =true;
                this.resetpassword = false;
				this.editprofile = false;
				this.selectaddress = false;
				this.ShowProduct = false;
				this.MainPage = false;
				this.loginPage = false;
				this.SignUp = false;
				this.cartPage = false;
				 this.newaddress = false;
				this.SignUp = false;
            /*eslint-disable no-console */
         console.log('allproductlist ===  '+this.allproductlist);
        })
        .catch(error => {
            this.errors = error;
        });
    }

    showParticularProduct(evt){
         /*eslint-disable no-console */
         console.log('evt ===  '+evt);
        this.Productdeatil = evt.detail;
        this.ProductListPage =false;
                this.resetpassword = false;
				this.editprofile = false;
				this.selectaddress = false;
				this.ShowProduct = true;
				this.MainPage = false;
				this.loginPage = false;
				this.SignUp = false;
				this.cartPage = false;
				 this.newaddress = false;
				this.SignUp = false;
        
    }
    handlewishlisht(evt){
       // alert(this.islogin);
        
           // alert(this.orderid); 
    
        
        if(this.islogin == false){
           this.ProductListPage =false;
                this.resetpassword = false;
				this.editprofile = false;
				this.selectaddress = false;
				this.ShowProduct = false;
				this.MainPage = false;
				this.loginPage = true;
				this.SignUp = false;
				this.cartPage = false;
				 this.newaddress = false;
				this.SignUp = false;
            
            const evt = new ShowToastEvent({
                title: 'Message',
                message: 'Please Login First In Order to Add Product in Your cart ',
                variant: 'warning',
                mode: 'pester'
            });
            this.dispatchEvent(evt);
            
        }
        else if(this.islogin == true && this.powerlookuser != null && this.orderid == null ){
			//alert('insert order');
			inserorder({User : this.powerlookuser})
						.then(result => {
							this.orderid = result;
							
							/*eslint-disable no-console */
                         console.log('orderid ===  '+this.orderid);
                         
                         const evt = new ShowToastEvent({
                            title: 'Success',
                            message: 'Your Order Id is created please add items to your bag ',
                            variant: 'success',
                            mode: 'pester'
                        });
                        this.dispatchEvent(evt);
						})
						.catch(error => {
							this.errors = error.body.message;
						});
            
        }
		
		else if(this.islogin == true && this.powerlookuser != null && this.orderid != null){
			var Name = evt.detail.Name;
			var Size = evt.detail.Size;
            var Quantity = evt.detail.Quantity;
          //(Name+' ' +Size+ ' ' +Quantity+' '+this.orderid.Id);
			addOrderProduct({Name: Name,
							Size:Size,
                            Quantity:Quantity,
                            Order:this.orderid.Id})
						.then(result => {
                           
                            this.cartproduct =result;
                             /*eslint-disable no-console */
						 console.log('product cart add ===  '+this.cartproduct);
							const evte = new ShowToastEvent({
                                title: 'Success',
                                message: 'Product added to your cart ',
                                variant: 'Success',
                                mode: 'pester'
                            });
                            this.dispatchEvent(evte);
							
						})
						.catch(error => {
                            this.errors = error;
                            /*eslint-disable no-console */
						 console.log('product cart error ===  '+this.errors);
						});
			
		
		}
       
       
    }

    handleSig(){
      //  alert('Register');
        this.ProductListPage =false;
                this.resetpassword = false;
				this.editprofile = false;
				this.selectaddress = false;
				this.ShowProduct = false;
				this.MainPage = false;
				this.loginPage = false;
				this.SignUp = false;
				this.cartPage = false;
				 this.newaddress = false;
				this.SignUp = true;
    }

    handleCancel(){
        this.ProductListPage =false;
                this.resetpassword = false;
				this.editprofile = false;
				this.selectaddress = false;
				this.ShowProduct = false;
				this.MainPage = true;
				this.loginPage = false;
				this.SignUp = false;
				this.cartPage = false;
				 this.newaddress = false;
				this.SignUp = false;
    }

    handlelogin(){
      //  alert('Loggin');
        if(this.Username == null || this.Username == '' || this.Password == null || this.Password == '' ){
            const evt = new ShowToastEvent({
                title: 'Missing Details',
                message: 'Please fill in all details ',
                variant: 'Warning',
                mode: 'pester'
            });
            this.dispatchEvent(evt);
        }
        else{
           
            LoginUser({Username : this.Username,                
                Password : this.Password
                })
            .then(result => {
                this.powerlookuser = result;
                this.ProductListPage =false;
                this.resetpassword = false;
				this.editprofile = false;
				this.selectaddress = false;
				this.ShowProduct = false;
				this.MainPage = true;
				this.loginPage = false;
				this.SignUp = false;
				this.cartPage = false;
				 this.newaddress = false;
				this.SignUp = false;
                this.islogin = true;
                
                const evt = new ShowToastEvent({
                    title: 'Message',
                    message: 'User Successfully logged in',
                    variant: 'success',
                    mode: 'pester'
                });
                this.dispatchEvent(evt);
				if(this.powerlookuser != null){
						//alert(this.powerlookuser.Name);
					
						fetchOrderId({User : this.powerlookuser})
						.then(result => {
							this.orderid = result;
							
							/*eslint-disable no-console */
						 console.log('orderid ===  '+this.orderid.User__c);
						})
						.catch(error => {
                            this.errors = error.body.message;
                            /*eslint-disable no-console */
						 console.log('orderid error ===  '+this.errors);
						});
					
					
					}
            
            })
            .catch(error => {
                this.errors = error.body.message;
                /*eslint-disable no-console */
            console.log('this.errors ===  '+this.errors);
                const evt = new ShowToastEvent({
                    title: 'Alert',
                    message: this.errors,
                    variant: 'warning',
                    mode: 'pester'
                });
                this.dispatchEvent(evt);
            });
                    
					
					
			
        }
    }
    handleRegisterUser(){
       /* alert(this.Firstname);
        alert(this.LastName);
        alert(this.Contact);
        alert(this.UserEmail);
        alert(this.UserPassword);*/

        if(this.Firstname == null || this.Firstname == '' || this.LastName == null || this.LastName == '' ||
        this.UserEmail == null || this.UserEmail == '' || this.Contact == null || this.Contact == '' || 
        this.UserPassword == null || this.UserPassword == ''){
            const evt = new ShowToastEvent({
                title: 'Missing Details',
                message: 'Please fill in all details ',
                variant: 'Warning',
                mode: 'pester'
            });
            this.dispatchEvent(evt);
        }
        else{
            RegisterUser({FirstName : this.Firstname,
                            LastName : this.LastName,
                            Contact : this.Contact,
                            UserEmail : this.UserEmail,
                            UserPassword : this.UserPassword
                            })
            .then(result => {
                var report = result;
                this.ProductListPage =false;
                this.resetpassword = false;
				this.editprofile = false;
				this.selectaddress = false;
				this.ShowProduct = false;
				this.MainPage = true;
				this.loginPage = false;
				this.SignUp = false;
				this.cartPage = false;
				 this.newaddress = false;
				this.SignUp = false;
                 const evt = new ShowToastEvent({
                    title: 'Message',
                    message: report,
                    variant: 'success',
                    mode: 'pester'
                });
                this.dispatchEvent(evt);

               
            })
            .catch(error => {
                this.errors = error;
                  /*eslint-disable no-console */
        console.log('this.errors ===  '+this.errors);
                const evt = new ShowToastEvent({
                    title: 'Alert',
                    message: this.errors,
                    variant: 'warning',
                    mode: 'pester'
                });
                this.dispatchEvent(evt);
            });
        }
        
    }


    handleCart(){
       
        if(this.islogin == false){
            this.ProductListPage =false;
                this.resetpassword = false;
				this.editprofile = false;
				this.selectaddress = false;
				this.ShowProduct = false;
				this.MainPage = false;
				this.loginPage = true;
				this.SignUp = false;
				this.cartPage = false;
				 this.newaddress = false;
				this.SignUp = false;
        }
        else{
            
            if(this.orderid == null){
                fetchOrderId({User : this.powerlookuser})
						.then(result => {
							this.orderid = result;
							
							/*eslint-disable no-console */
						 console.log('orderid ===  '+this.orderid.User__c);
						})
						.catch(error => {
                            this.errors = error.body.message;
                            /*eslint-disable no-console */
                         console.log('orderid error ===  '+this.errors);
                         const evte = new ShowToastEvent({
                            title: 'Message',
                            message: 'Your Cart is Empty!!!!',
                            variant: 'success',
                            mode: 'pester'
                        });
                        this.dispatchEvent(evte);
                        });
            }

            else{
                
            if(this.cartproduct == null || this.cartproduct == ''){
            getOrderProduct({
                OrderId:this.orderid.Id})
            .then(result => {
               
                this.cartproduct =result;
                /*eslint-disable no-console */
             console.log('product cart is empty ===  '+this.cartproduct);
               if(this.cartproduct != null && this.cartproduct != ''){

                console.log('product cart  is null');
                this.ProductListPage =false;
                this.resetpassword = false;
				this.editprofile = false;
				this.selectaddress = false;
				this.ShowProduct = false;
				this.MainPage = false;
				this.loginPage = false;
				this.SignUp = false;
				this.cartPage = true;
				 this.newaddress = false;
				this.SignUp = false;
               }
               else{
                const evte = new ShowToastEvent({
                    title: 'Alert',
                    message: 'Your Cart is Empty !!!!',
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
            });
            }

             /*eslint-disable no-console */
			 else{
             console.log('product cart page diplay');
            this.ProductListPage =false;
                this.resetpassword = false;
				this.editprofile = false;
				this.selectaddress = false;
				this.ShowProduct = false;
				this.MainPage = false;
				this.loginPage = false;
				this.SignUp = false;
				this.cartPage = true;
				 this.newaddress = false;
				this.SignUp = false;
			 }
        }
        }
    }

    handleeditcartproduct(evt){
        var prodId = evt.detail.Name;
        var size = evt.detail.Size;
        var quantity = evt.detail.Quantity;

        EditcartProduct({
            prodId :prodId,
            size:size,
            quantity:quantity,
            orderId : evt.detail.orderId})
        .then(result => {
           
            this.cartproduct =result;
            /*eslint-disable no-console */
         console.log('product cart edit ===  '+this.cartproduct);
           
        this.ProductListPage =false;
                this.resetpassword = false;
				this.editprofile = false;
				this.selectaddress = false;
				this.ShowProduct = false;
				this.MainPage = true;
				this.loginPage = false;
				this.SignUp = false;
				this.cartPage = false;
				 this.newaddress = false;
				this.SignUp = false;
            
        })
        .catch(error => {
            this.errors = error;
            /*eslint-disable no-console */
         console.log('product cart error ===  '+this.errors);
        });
    }

    handleremovecart(evt){

        deletecartProduct({
            prodId :evt.detail.Name,
            orderId : evt.detail.orderId})
        .then(result => {
           
            this.cartproduct =result;
            /*eslint-disable no-console */
         console.log('product cart delete ===  '+this.cartproduct);
           
         this.ProductListPage =false;
                this.resetpassword = false;
				this.editprofile = false;
				this.selectaddress = false;
				this.ShowProduct = false;
				this.MainPage = true;
				this.loginPage = false;
				this.SignUp = false;
				this.cartPage = false;
				 this.newaddress = false;
				this.SignUp = false;
            
        })
        .catch(error => {
            this.errors = error;
            /*eslint-disable no-console */
         console.log('product cart error ===  '+this.errors);
        });
    }




    handleConfirmOrder(){
        

        addresslist({
            UserId:this.powerlookuser.Id})
        .then(result => {
           
            this.addresslist =result;
            /*eslint-disable no-console */
         console.log('addresslist cart  ===  '+this.addresslist);
           
         this.ProductListPage =false;
                this.resetpassword = false;
				this.editprofile = false;
				this.selectaddress = true;
				this.ShowProduct = false;
				this.MainPage = false;
				this.loginPage = false;
				this.SignUp = false;
				this.cartPage = false;
				 this.newaddress = false;
				this.SignUp = false;

        if(this.addresslist == null){
            const evte = new ShowToastEvent({
                title: 'Alert',
                message: 'Please fill in details as no Address records Fetch',
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
        });
    }



    handleaddaddress(evt){
        
        addaddresslist({
            UserId:evt.detail.User,
            address:evt.detail.address,
            city:evt.detail.city,
            state:evt.detail.state,
            postalcode:evt.detail.postalcode})
        .then(result => {
           
            this.addresslist =result;
            /*eslint-disable no-console */
         console.log('addresslist cart  ===  '+this.addresslist);
           
         this.ProductListPage =false;
                this.resetpassword = false;
				this.editprofile = false;
				this.selectaddress = false;
				this.ShowProduct = false;
				this.MainPage = false;
				this.loginPage = false;
				this.SignUp = false;
				this.cartPage = true;
				 this.newaddress = false;
				this.SignUp = false;
         
            
        })
        .catch(error => {
            this.errors = error;
            /*eslint-disable no-console */
         console.log('product cart error ===  '+this.errors);
        });
    }

    handleaddaddressnew(){
        this.ProductListPage =false;
                this.resetpassword = false;
				this.editprofile = false;
				this.selectaddress = false;
				this.ShowProduct = false;
				this.MainPage = false;
				this.loginPage = false;
				this.SignUp = false;
				this.cartPage = false;
				 this.newaddress = true;
				this.SignUp = false;
    }

    attachaddtoorder(evt){
        //alert('add id  '+evt.detail.Id);

        attachaddress({
            OrderId:this.orderid.Id,
            addId:evt.detail.Id})
        .then(result => {
           
            var msg =result;
            /*eslint-disable no-console */
       /* console.log('addresslist cart  ===  '+this.addresslist);
           
        this.ProductListPage =false;
                this.resetpassword = false;
				this.editprofile = false;
				this.selectaddress = false;
				this.ShowProduct = false;
				this.MainPage = true;
				this.loginPage = false;
				this.SignUp = false;
				this.cartPage = false;
				 this.newaddress = false;
				this.SignUp = false;
         this.orderid = null;*/

         const evte = new ShowToastEvent({
            title: 'Confirm',
            message: msg,
            variant: 'success',
            mode: 'pester'
        });
        this.dispatchEvent(evte);
        eval("$A.get('e.force:refreshView').fire()");
        })
        .catch(error => {
            this.errors = error;
            /*eslint-disable no-console */
         console.log('product cart error ===  '+this.errors);
        });

    }

    handlecanceledit(evt){
        this.ProductListPage =false;
                this.resetpassword = false;
				this.editprofile = false;
				this.selectaddress = false;
				this.ShowProduct = false;
				this.MainPage = true;
				this.loginPage = false;
				this.SignUp = false;
				this.cartPage = false;
				 this.newaddress = false;
				this.SignUp = false;
    }

    handleeditprofile(evt){
       // alert(evt.detail.Name);
        editprofile({
            proId : this.powerlookuser.Id,
            fname : evt.detail.Name,
            lname : evt.detail.Lastname,
            contact : evt.detail.Contact,
            email : evt.detail.Email

        })
        .then(result => {
           
            var msg =result;
            /*eslint-disable no-console */
        eval("$A.get('e.force:refreshView').fire()");
         const evte = new ShowToastEvent({
            title: 'Login',
            message: msg,
            variant: 'success',
            mode: 'pester'
        });
        this.dispatchEvent(evte);
            
        })
        .catch(error => {
            this.errors = error;
            /*eslint-disable no-console */
         console.log('product cart error ===  '+this.errors);
        });
    }

    handleresetpassword(evt){
        eval("$A.get('e.force:refreshView').fire()");
        const evte = new ShowToastEvent({
           title: 'Login',
           message: evt.detail.message,
           variant: 'success',
           mode: 'pester'
       });
       this.dispatchEvent(evte);
    }


    addressedit(evt){
        this.resetpassword = false;
        this.editprofile = false;
        this.selectaddress = false;
        this.ShowProduct = false;
        this.MainPage = false;
        this.loginPage = false;
        this.SignUp = false;
        this.cartPage = true;
         this.newaddress = false;
        this.SignUp = false;
    }
}