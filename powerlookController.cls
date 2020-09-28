public with sharing class powerlookController {
    

    @AuraEnabled(cacheable = true)
    public static List<powerlook_collection__mdt> getProductList(){
        List<powerlook_collection__mdt> listprdouct = [Select id,Label,image__c from powerlook_collection__mdt];
        return listprdouct;
    }

    @AuraEnabled(cacheable = true)
    public static List<powerlook_products__c> getShirtList( String Name){
        List<powerlook_products__c> listshirt = [Select id,name,Actual_Price__c,discounted_price__c,  Category__c, Description__c, discount__c, iamge3__c, image1__c, image2__c, image4__c, Product_Details__c, product_main_image__c, Sub_category__c from powerlook_products__c where Category__c=:Name LIMIT 5];
        return listshirt;
    }

    @AuraEnabled(cacheable = true)
    public static List<powerlook_products__c> getExploreList( String Name){
        List<powerlook_products__c> listshirt = [Select id,name,Actual_Price__c,discounted_price__c,  Category__c, Description__c, discount__c, iamge3__c, image1__c, image2__c, image4__c, Product_Details__c, product_main_image__c, Sub_category__c from powerlook_products__c where Category__c=:Name];
        return listshirt;
    }

    @AuraEnabled(cacheable = true)
    public static List<powerlook_products__c> getExploreListwithSubcat( String Category ,String SubCategory ){
        List<powerlook_products__c> listshirt = [Select id,name,Actual_Price__c,discounted_price__c,  Category__c, Description__c, discount__c, iamge3__c, image1__c, image2__c, image4__c, Product_Details__c, product_main_image__c, Sub_category__c from powerlook_products__c where Category__c=:Category and Sub_category__c =:SubCategory];
        return listshirt;
    }

    @AuraEnabled
    public static String  RegisterUser( String FirstName ,String LastName ,String UserEmail , String UserPassword , String Contact ){
        
        List<powerlook_user__c> CheckUser = [Select id,Name,LastName__c,Email_Id__c from powerlook_user__c where Email_Id__c =:UserEmail]; 
        if(CheckUser.size()>0){
            String result = 'An User Is Already Registered with this Email Id';
            return result;
        }
        else{
        try{
            powerlook_user__c UserEntry  = new powerlook_user__c();
            UserEntry.Name = FirstName;
            UserEntry.LastName__c = LastName;
            UserEntry.Contact__c = Contact;
            UserEntry.Email_Id__c = UserEmail;
            UserEntry.Password__c = UserPassword;
            insert UserEntry;
            String result = FirstName + ' ' +LastName + ' Succesffully Registered';
            return result;
        }
        catch(Exception e) {
            System.debug('An exception occurred: ' + e.getMessage());
            return 'An Exception Occured';
        }
    }
        
    }


    @AuraEnabled
    public static powerlook_user__c  LoginUser( String Username ,String Password ){
        
        powerlook_user__c CheckUser = [Select id,Name,LastName__c,Email_Id__c,Contact__c,Password__c from powerlook_user__c where Email_Id__c =:Username and Password__c =:Password]; 
        if(CheckUser != null){
           
            return CheckUser;
        }       
        return null;
    }
	
	@AuraEnabled(cacheable = true)
    public static  powerlook_order__c fetchOrderId( powerlook_user__c User){
       powerlook_order__c Order = [ select id,Confirm__c, User__c, deliver_to__c from powerlook_order__c where User__c=:User.Id and Confirm__c = false];
	   
	   return Order;
    }
    
	@AuraEnabled
    public static  powerlook_order__c inserorder( powerlook_user__c User){
        List<powerlook_order__c>  Orderlist = [ select id,Confirm__c, User__c, deliver_to__c from powerlook_order__c where User__c=:User.Id and Confirm__c = false];
       if(Orderlist.size()>0){
           return Orderlist[0];
       }
        powerlook_order__c Order = new powerlook_order__c();
		Order.User__c = User.Id;
		Order.Confirm__c = false;
		insert Order; 
	   
	   return Order;
    }

    @AuraEnabled
    public static  List<powerlook_order_products__c>  addOrderProduct( String Size, Integer Quantity , String Name , String Order){
        powerlook_order_products__c  Orderproduct = new powerlook_order_products__c ();
		Orderproduct.Quantity__c = Quantity;
        Orderproduct.Size__c = Size;
        Orderproduct.Product__c = Name;
        Orderproduct.OrderId__c   = Order;
        insert Orderproduct; 
        
        List<powerlook_order_products__c> listOrder = [select id,Quantity__c, Size__c, Product__r.product_main_image__c,Product__c,Product__R.Name,Product__R.discount__c, Product__R.Actual_Price__c, Product__r.Category__c, Product__r.discounted_price__c,  OrderId__c  from powerlook_order_products__c where OrderId__c =: Order];
	   
	   return listOrder;
    }


    @AuraEnabled(cacheable = true)
    public static  List<powerlook_order_products__c>  getOrderProduct(String OrderId){
       
        List<powerlook_order_products__c> listOrder = [select id,Quantity__c, Size__c, Product__r.product_main_image__c,Product__c,Product__R.Name,Product__R.discount__c, Product__R.Actual_Price__c, Product__r.Category__c, Product__r.discounted_price__c,  OrderId__c   from powerlook_order_products__c where OrderId__c =: OrderId];
	   
	   return listOrder;
    }

    
    @AuraEnabled
    public static  List<powerlook_order_products__c>  EditcartProduct(String prodId, String size , Integer quantity, String orderId){
       
        powerlook_order_products__c cartproduct = [select id,Quantity__c, Size__c, Product__r.product_main_image__c,Product__c,Product__R.Name,Product__R.discount__c, Product__R.Actual_Price__c, Product__r.Category__c, Product__r.discounted_price__c,  OrderId__c   from powerlook_order_products__c where Id =: prodId];
       cartproduct.Size__c = size;
       cartproduct.Quantity__c = quantity;
       update cartproduct;

       List<powerlook_order_products__c> updatedcart = [select id,Quantity__c, Size__c, Product__r.product_main_image__c,Product__c,Product__R.Name,Product__R.discount__c, Product__R.Actual_Price__c, Product__r.Category__c, Product__r.discounted_price__c,  OrderId__c   from powerlook_order_products__c where OrderId__c =: orderId];
	   return updatedcart;
    }

    
    @AuraEnabled
    public static  List<powerlook_order_products__c>  deletecartProduct(String prodId, String orderId){
       
        powerlook_order_products__c cartproduct = [select id,Quantity__c, Size__c, Product__r.product_main_image__c,Product__c,Product__R.Name,Product__R.discount__c, Product__R.Actual_Price__c, Product__r.Category__c, Product__r.discounted_price__c,  OrderId__c   from powerlook_order_products__c where Id =: prodId];
       
       delete cartproduct;

       List<powerlook_order_products__c> updatedcart = [select id,Quantity__c, Size__c, Product__r.product_main_image__c,Product__c,Product__R.Name,Product__R.discount__c, Product__R.Actual_Price__c, Product__r.Category__c, Product__r.discounted_price__c,  OrderId__c   from powerlook_order_products__c where OrderId__c =: orderId];
	   return updatedcart;
    }

    @AuraEnabled
    public static  List<powerlook_user_address__c >  addresslist(String UserId){
        
        List<powerlook_user_address__c > addlist = [select id,Postal_Code__c, Shipping_City__c, Shipping_State__c, Shipping_Street__c,User__c, User__r.Name  from powerlook_user_address__c where User__c =:UserId ];
        
        if(addlist.size()>0){
            return addlist;
        }
        else{
            return null;
        }

    }


    @AuraEnabled
    public static  List<powerlook_user_address__c >  addaddresslist(String UserId,String address,String city,String state,Integer postalcode){
        
       
        
        powerlook_user_address__c add = new powerlook_user_address__c();
        add.User__c = UserId;
        add.Shipping_City__c = city;
        add.Shipping_State__c = state;
        add.Shipping_Street__c = address;
        add.Postal_Code__c = postalcode;
        insert add;
        List<powerlook_user_address__c > addlist = [select id,Postal_Code__c, Shipping_City__c, Shipping_State__c, Shipping_Street__c,User__c, User__r.Name  from powerlook_user_address__c where User__c =:UserId ];
        return addlist;
    }


    
    @AuraEnabled
    public static  String   (String OrderId,String addId){
        
        powerlook_order__c order = [select id,Confirm__c, User__c, deliver_to__c from powerlook_order__c where Id=:OrderId];
       
        try{
        order.deliver_to__c = addId;
        order.Confirm__c = true;
        update order;

        PageReference pdf = Page.invoicecust;
        pdf.getParameters().put('id',order.Id);
        Attachment attach = new Attachment();
        Blob body;
            try {   	
                   body = pdf.getContent();
            
            } catch (VisualforceException e) {
                body = Blob.valueOf('Some Text');
            }
            
            attach.Body = body;
            attach.Name = 'Invoice';
            attach.IsPrivate = false;
            attach.ParentId = order.Id;
            attach.ContentType = 'application/pdf';
        
            insert attach;
       
        return 'Your Order is Confirmed';
        }
        catch(exception e){
            return 'Some Error Occured';
        }
    }


    @AuraEnabled
    public static  string  editprofile(String proId,String fname,String lname , String email , String contact){
        
        powerlook_user__c User = [Select id,Name,LastName__c,Email_Id__c,Contact__c,Password__c from powerlook_user__c where Id =:proId];
       
        try{
       User.Name = fname;
       User.LastName__c = lname;
       User.Email_Id__c = email;
       User.Contact__c = contact;
        update User;
       
        return 'Changes has been saved . Please Login !';
        }
        catch(exception e){
            return 'Some Error Occured';
        }
    }

    @AuraEnabled
    public static  string  resetpasswords(String Email,String Con,String Password , String ConfirmPass){
        
        powerlook_user__c User = [Select id,Name,LastName__c,Email_Id__c,Contact__c,Password__c from powerlook_user__c where Email_Id__c =:Email and Contact__c =:Con];
       
    try{

        if(User == null){
            return 'Please Enter Valid Email Id and Contact';
        }
        else{
      
       User.Password__c = Password;
        update User;
       
        return 'Changes has been saved . Please Login !';
        }
    }
        catch(exception e){
            return 'Some Error Occured';
        }
    }


    @AuraEnabled
    public static  String  editaddressdetail(String addId,String address,String city,String state,Integer postalcode){
        
       
        
        powerlook_user_address__c add = [select id,Postal_Code__c, Shipping_City__c, Shipping_State__c, Shipping_Street__c,User__c, User__r.Name  from powerlook_user_address__c where id =:addId ];
       try{
        add.Shipping_City__c = city;
        add.Shipping_State__c = state;
        add.Shipping_Street__c = address;
        add.Postal_Code__c = postalcode;
        update add;
        return 'Successfully edited address detail';
       }
       catch(exception e){
           return 'Something went wrong !!!';
       }
    }

    @AuraEnabled
    public static  String  deleteaddressdetail(String addId){
        
       
        
        powerlook_user_address__c add = [select id,Postal_Code__c, Shipping_City__c, Shipping_State__c, Shipping_Street__c,User__c, User__r.Name  from powerlook_user_address__c where id =:addId ];
       try{
        
        delete add;
        return 'Successfully deleted address detail';
       }
       catch(exception e){
           return 'Something went wrong !!!';
       }
    }
}
