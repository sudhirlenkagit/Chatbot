/**
 * Module dependencies.
 */

//Back-end system details.
var baseURL="https://sapdemo.kpit.com:446";
var userId=userId;
var password=password;

var express = require('express')
 /* , routes = require('./routes')*/
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var bodyParser = require('body-parser')
var http = require('http');
var request = require('ajax-request');


var externalip = require('external-ip');

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}




/*app.get('/', routes.index);*/
app.get('/users', user.list);


app.post('/Call', (req, res) => {
	
	
	console.log('receiving data ...');
    console.log('body is ',req.body);
    res.send(req.body);
	/*var actualstr1=res.req.body.nlp.source;
	var actualstr=actualstr1.toLowerCase();
	var FLAG=false;
	require("jsdom").env("", function(err, window) {
	    if (err) {
	        console.error(err);
	        return;
	    }
	    var $ = require("jquery")(window);

	     function getLocationFromIp() 	{
	        $.ajax({
	        	 url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873",

		            type: "GET",
		            
		        
		            username : userId,
		            dataType: "json",
		            password : password,
	            success: function(data) {
	            	var length=data.d.results.length;
	            	
	            	console.log(data);
	            		
	            	}
	        ,
            error: function() {
               console.log("error", arguments[2])
            }
        });
    }
    var ip = getLocationFromIp();
   // console.log(ip);
});
	*/
	
	
	
	
	

	/*require("jsdom").env("", function(err, window) {
	    if (err) {
	        console.error(err);
	        return;
	    }
	    var $ = require("jquery")(window);

	     function getLocationFromIp() 	{
	    	 function getJsonDataAsync(url) {
	    	        // returning the $.ajax object is what makes the next part work...
	    	        return $.ajax({
	    	        	  url: url,
	    	              type: "GET",
	    	       username : userId,
	    	   data: null,
	    	   dataType: "jsonp",
	    	  password : password,
	    	   timeout : 5000,        
	    	   crossDomain: true
	    	        
	    	        });
	    	    }
	    		var webServerRelativeUrl=baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV";
	    	    var requestURI1 = webServerRelativeUrl + "/C_Customer360_F2187"
	    	    var requestURI2 = webServerRelativeUrl + "/C_Customer360_F2187('17100001')?sap-client=100"
	    	             
	    	    var req1 = getJsonDataAsync(requestURI1);
	    	    var req2 = getJsonDataAsync(requestURI2);
	    	   
	    	    // now we can do the next line, because req1/2/3 are actually deferreds
	    	    // being returned from $.ajax
	    	    $.when(req1, req2).done(function(resp1, resp2) {
	    	     console.log(resp1);  console.log(resp2);
	    	    });
	    }
	    var ip = getLocationFromIp();

	});*/
	
 });

/////// For the Customer 360 Applications Intents.......///////

////Start of the Contracts intent /////

app.post('/Contracts360', (req, res) => {

	
	var actstr1=req.body.nlp.source;
	var actstr=actstr1.toLowerCase();
	require("jsdom").env("", function(err, window) {
	    if (err) {
	        console.error(err);
	        return;
	    }
	    var $ = require("jquery")(window);

	     function getLocationFromIp() 	{
	        $.ajax({
	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187",
	            type: "GET",
	            data: null,
	            dataType: "json",
	            username : userId,
	            password : password,
	            success: function(data) {
	            
	            	 var flag=false;
		            	var sname="";
		            	var sno="";
		            	for(var i=0;i<data.d.results.length;i++){
		            
		            		
		            		if(actstr.includes(data.d.results[i].CustomerName)>=0|| actstr.includes(data.d.results[i].Customer)>=0){  
		            			sname=data.d.results[i].CustomerName;
		            			sno=data.d.results[i].Customer;
		            			flag=true;
		            			break;  
		            			
		            		}
		            		
		            	}
		     
	            	require("jsdom").env("", function(err, window) {
	            	    if (err) {
	            	        console.error(err);
	            	        return;
	            	    }
	            	    var $ = require("jquery")(window);

	            	     function getLocationFromIp() 	{
	            	        $.ajax({
	            	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187('"+sno+"')/to_SalesContracts?sap-client=100&$skip=0&$top=10&$orderby=SalesContractDate%20desc,SalesContract%20desc&$select=SalesContract%2cPurchaseOrderByCustomer%2cSalesContractValidityStartDate%2cSalesContractValidityEndDate%2cSlsContrDueDateCriticality%2cOverallSDProcessStatus%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cTotalNetAmount%2cTransactionCurrency&$expand=to_OverallSDProcessStatus&$inlinecount=allpages",
	            	            type: "GET",
	            	            data: null,
	            	            dataType: "json",
	            	            username : userId,
	            	            password : password,
	            	            success: function(data) {
	            	            	 res.send({
		        			            	
        			            		 replies: [
        			            		    	{"type":"quickReplies","content":{"title":"There are total "+data.d.__count+" Contract of this customer"
        			            		    		}}
        			            		    		],
        			            		    conversation: {
        			            		      memory: { key: 'value' }
        			            		    }
        			            		  })
	            	                 
	            	            },
	            	            error: function() {
	            	               console.log("error", arguments[2])
	            	            }
	            	        });
	            	    }
	            	    var ip = getLocationFromIp();

	            	});
	             
	            },
	            error: function() {
	               console.log("error", arguments[2])
	            }
	        });
	    }
	    var ip = getLocationFromIp();

	});
	

	
 });

////End of the Contracts intent /////

////Start of the Customer information intent /////

app.post('/Customer360', (req, res) => {
	
	var actstr1=req.body.nlp.source;
	var actstr=actstr1.toLowerCase();
	
	require("jsdom").env("", function(err, window) {
	    if (err) {
	        console.error(err);
	        return;
	    }
	    var $ = require("jquery")(window);

	     function getLocationFromIp() 	{
	        $.ajax({
	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187",
	            type: "GET",
	            data: null,
	            dataType: "json",
	            username : userId,
	            password : password,
	            
	            success: function(data) {
	            
	            	 var flag=false;
		            	var sname="";
		            	var sno="";
		            	for(var i=0;i<data.d.results.length;i++){
		            
		            		
		            		if(actstr.includes(data.d.results[i].CustomerName)|| actstr.includes(data.d.results[i].Customer)){  
		            			sname=data.d.results[i].CustomerName;
		            			sno=data.d.results[i].Customer;
		            			flag=true;
		            			break;  
		            			
		            		}
		            		
		            	}
		            	
		           if(sno!=""){
		            
	            	require("jsdom").env("", function(err, window) {
	            	    if (err) {
	            	        console.error(err);
	            	        return;
	            	    }
	            	    var $ = require("jquery")(window);

	            	     function getLocationFromIp() 	{
	            	        $.ajax({
	            	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187('"+sno+"')?sap-client=100",
	            	            type: "GET",
	            	            data: null,
	            	            dataType: "json",
	            	            username : userId,
	            	            password : password,
	            	            success: function(data1) {
	            	            	 res.send({
		        		
        			            		 replies: [
        			            		    	{"type":"quickReplies","content":{"title":"There are some basic Information about this Customer\nCustomer Name:"+ data1.d.CustomerName+"\nContact Person:"+ data1.d.FullName+"\nEmail Address:"+ data1.d.EmailAddress+"\nPhone No:"+ data1.d.InternationalPhoneNumber+"\nWant to See Full Detail?",
        			            		    	"buttons":[
        			            		    		{ "value":"Yaa Show me Complete detail of customer "+sno,
        			            		    		"title":"Yes"
        			            		    		},
        			            		    		{ "value":"",
            			            		    		"title":"No"
            			            		    		}
        			            		    		
        			            		    	]
        			            		    		}}
        			            		    		],
        			            		    conversation: {
        			            		      memory: { key: 'value' }
        			            		    }
        			            		  })
	            	                
	            	                 
	            	            },
	            	            error: function() {
	            	               console.log("error", arguments[2])
	            	            }
	            	        });
	            	    }
	            	    var ip = getLocationFromIp();

	            	});
		           }
		           
  else{
		        	   
		        	   res.send({
	            		    replies: [{
	            		      type: 'text',
	            		      content: "Please provide the valid customer name or no."
	            		    }], 
	            		    conversation: {
	            		      memory: { key: 'value' }
	            		    }
	            		  })
		        	   
		        	   
		           }
	            },
	            error: function() {
	               console.log("error", arguments[2])
	            }
	        });
	    }
	    var ip = getLocationFromIp();

	});
	

	
	
 });

////End of the Customer information intent /////

/////Customer Info URL intent//////////////////

app.post('/URL360', (req, res) => {
	
	var actstr1=req.body.nlp.source;
	var actstr=actstr1.toLowerCase();
	var number="";
	if(res.req.body.nlp.entities.hasOwnProperty('numbers')){
		number=res.req.body.nlp.entities.hasOwnProperty('numbers');
	}
	else if(res.req.body.nlp.entities.hasOwnProperty('number')){
		number=res.req.body.nlp.entities.hasOwnProperty('number');
	}
	

		
	
	
	 res.send({
		 replies: [
		    	
		        {"type":"buttons","content":{"title":"                   click on this",
		    	"buttons":[
		    		{"value":baseURL+"/sap/bc/ui2/flp?sap-client=100&sap-language=EN#Customer-displaySalesOverview&//C_Customer360_F2187('"+number+"')",
		    		 "title":"Link",
		    		 "type":"web_url"
		    	    }
		    		     ]
		    	}}
		    	
		        ],
		
		    conversation: {
		      memory: { key: 'value' }
		    }
		  })
	
	
 });


/////Customer info URL intent END/////////////

////Start of the Customer Contacts intent /////

app.post('/Contacts360', (req, res) => {
	
	var actstr1=req.body.nlp.source;
	var actstr=actstr1.toLowerCase();
	require("jsdom").env("", function(err, window) {
	    if (err) {
	        console.error(err);
	        return;
	    }
	    var $ = require("jquery")(window);

	     function getLocationFromIp() 	{
	        $.ajax({
	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187",
	            type: "GET",
	            data: null,
	            dataType: "json",
	            username : userId,
	            password : password,
	            headers: {
	                'Access-Control-Allow-Origin': '*'
	              },
	            crossDomain: false,
	            success: function(data) {
	            var flag=false;
	            	var sname="";
	            	var sno="";
	            	for(var i=0;i<data.d.results.length;i++){
	            
	            		
	            		if(actstr.includes(data.d.results[i].CustomerName)|| actstr.includes(data.d.results[i].Customer)){  
	            			sname=data.d.results[i].CustomerName;
	            			sno=data.d.results[i].Customer;
	            			flag=true;
	            			break;  
	            			
	            		}
	            		
	            	}
	            
	            	if(sno!=""){
	            	
	            	require("jsdom").env("", function(err, window) {
	            	    if (err) {
	            	        console.error(err);
	            	        return;
	            	    }
	            	    var $ = require("jquery")(window);

	            	     function getLocationFromIp() 	{
	            	        $.ajax({
	            	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187('"+sno+"')/to_CustomerContact?sap-client=100&$skip=0&$top=12&$inlinecount=allpages",
	            	            type: "GET",
	            	            data: null,
	            	            dataType: "json",
	            	            username : userId,
	            	            password : password,
	            	            headers: {
	            	                'Access-Control-Allow-Origin': '*'
	            	              },
	            	            success: function(data2) {
	            	            	
	            	            	var count2=data2.d.__count;
	            	            	var name=[]; 
	            	            	for(var i=0;i<data2.d.__count;i++){ 
	            	            	name.push(data2.d.results[i].FullName); 
	            	            	}
	            	            	
	            	            	 res.send({
	            			        		
        			            		 replies: [
        			            		    	{"type":"quickReplies","content":{"title":"There are "+data2.d.results.length+" Contacts of this Customer are.\n",
        			            		    		"buttons":[
	        			            		    		{ "value":"Yes Show me Complete detail of customer "+name[0],
	        			            		    		"title":name[0]
	        			            		    		},
	        			            		    		{ "value":"Yes Show me Complete detail of customer "+name[1],
	            			            		    		"title":name[1]
	            			            		    		}
	        			            		    		
	        			            		    	]
        			            		    		
        			            		    		}}
        			            		    		],
        			            		    conversation: {
        			            		      memory: { key: 'value' }
        			            		    }
        			            		  })
	            	                
	            	                 
	            	            },
	            	            error: function() {
	            	               console.log("error", arguments[2])
	            	            }
	            	        });
	            	    }
	            	    var ip = getLocationFromIp();

	            	});
	            	
	            	}
	            
	            	else{
	            		
	            		 res.send({
	 			        		
		            		 replies: [
		            		    	{"type":"quickReplies","content":{"title":"Please provide the valid customer name or no.",
		            		    	
		            		    		}}
		            		    		],
		            		    conversation: {
		            		      memory: { key: 'value' }
		            		    }
		            		  })
	            		
	            		
	            	}
	            	
	            	
	            	
	             
	            },
	            error: function() {
	               console.log("error", arguments[2])
	            }
	        });
	    }
	    var ip = getLocationFromIp();

	});
	
	
 });

////End of the Customer Contacts intent /////

/////Start of the cutomer name intent////

app.post('/Cname360', (req, res) => {
	
	var actstr1=req.body.nlp.source;
	var actstr=actstr1.toLowerCase();
	
	            
	            	
	            	
	            	require("jsdom").env("", function(err, window) {
	            	    if (err) {
	            	        console.error(err);
	            	        return;
	            	    }
	            	    var $ = require("jquery")(window);

	            	     function getLocationFromIp() 	{
	            	        $.ajax({
	            	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187('17100001')/to_CustomerContact?sap-client=100&$skip=0&$top=12&$inlinecount=allpages",
	            	            type: "GET",
	            	            data: null,
	            	            dataType: "json",
	            	            username : userId,
	            	            password : password,
	            	            headers: {
	            	                'Access-Control-Allow-Origin': '*'
	            	              },
	            	            success: function(data2) {
	            	            	
	            	            	/*var count2=data2.d.__count;
	            	            	var name=[]; 
	            	            	for(var i=0;i<data2.d.__count;i++){ 
	            	            	name.push(data2.d.results[i].FullName); 
	            	            	}*/
	            	            	
	            	            	if(actstr.includes("james smith")){
	            	            	 res.send({
	            			        		
        			            		 replies: [
        			            		    	{"type":"quickReplies","content":{"title":"There are some basic detail of this Customer.\nFunction Name is: "+data2.d.results[1].ContactPersonFunctionName+"\nDepartment: "+data2.d.results[1].ContactPersonDepartmentName+"\nPhone No is: "+data2.d.results[1].InternationalPhoneNumber+"\nEmail Address: "+data2.d.results[1].EmailAddress+"\nBussiness Partner Person is: "+data2.d.results[1].BusinessPartnerPerson,
        			            		    		
        			            		    		
        			            		    		}}
        			            		    		],
        			            		    conversation: {
        			            		      memory: { key: 'value' }
        			            		    }
        			            		  })
	            	            	}
	            	                 
	            	            	else{
	            	            		
	           	            		 res.send({
	           	 			        		
	           		            		 replies: [
	           		            		    	{"type":"quickReplies","content":{"title":"There are some basic detail of this Customer.\nFunction Name is: "+data2.d.results[0].ContactPersonFunctionName+"\nDepartment: "+data2.d.results[1].ContactPersonDepartmentName+"\nPhone No is: "+data2.d.results[0].InternationalPhoneNumber+"\nEmail Address: "+data2.d.results[0].EmailAddress+"\nBussiness Partner Person is: "+data2.d.results[0].BusinessPartnerPerson
	           		            		    	
	           		            		    		}}
	           		            		    		],
	           		            		    conversation: {
	           		            		      memory: { key: 'value' }
	           		            		    }
	           		            		  })
	           	            		
	           	            		
	           	            	}
	            	            	
	            	            	
	            	            	
	            	            	
	            	            	
	            	            	
	            	            },
	            	            error: function() {
	            	               console.log("error", arguments[2])
	            	            }
	            	        });
	            	    }
	            	    var ip = getLocationFromIp();

	            	});
	            	
	            	
	            	
	            
	            	
	            	
	            	
	            	
	             
	           
	          
	
 });



////End of the Custoemr Name intent/////

////Start of the Customer Sales order intent /////

app.post('/SalesOrder360', (req, res) => {
	
	var actstr1=req.body.nlp.source;
	var actstr=actstr1.toLowerCase();
	require("jsdom").env("", function(err, window) {
	    if (err) {
	        console.error(err);
	        return;
	    }
	    var $ = require("jquery")(window);

	     function getLocationFromIp() 	{
	        $.ajax({
	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187",
	            type: "GET",
	            data: null,
	            dataType: "json",
	            username : userId,
	            password : password,
	            success: function(data) {
	            
	            	 var flag=false;
		            	var sname="";
		            	var sno="";
		            	for(var i=0;i<data.d.results.length;i++){
		            
		            		
		            		if(actstr.includes(data.d.results[i].CustomerName)|| actstr.includes(data.d.results[i].Customer)){  
		            			sname=data.d.results[i].CustomerName;
		            			sno=data.d.results[i].Customer;
		            			flag=true;
		            			break;  
		            			
		            		}
		            		
		            	}
		            	
		         if(sno!=""){
		            	
	            	
	            	require("jsdom").env("", function(err, window) {
	            	    if (err) {
	            	        console.error(err);
	            	        return;
	            	    }
	            	    var $ = require("jquery")(window);

	            	     function getLocationFromIp() 	{
	            	        $.ajax({
	            	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187('"+sno+"')/to_SalesOrders?sap-client=100&$skip=0&$top=10&$orderby=SalesOrderDate%20desc,SalesOrder%20desc&$select=SalesOrder%2cPurchaseOrderByCustomer%2cRequestedDeliveryDate%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cTotalNetAmount%2cTransactionCurrency%2cSalesOrderDate%2cSalesOrderType%2cto_SalesDocumentType%2fSalesDocumentType_Text%2cDeliveryBlockReason%2cHeaderBillingBlockReason&$expand=to_SalesDocumentType%2cto_OverallSDProcessStatus&$inlinecount=allpages",
	            	            type: "GET",
	            	            data: null,
	            	            dataType: "json",
	            	            username : userId,
	            	            password : password,
	            	            success: function(data2) {
	            	            	var count=data2.d.results.length;
	            	            	var comp=[];
	            	            	var inp=[];
	            	            	for(var i=0;i<count;i++){
	            	            		
	            	            		if(data2.d.results[i].to_OverallSDProcessStatus.OverallSDProcessStatus_Text==="Completed"){
	            	            			comp.push(data2.d.results[i].to_OverallSDProcessStatus.OverallSDProcessStatus_Text);
	            	            		}
	            	            		else{
	            	            			
	            	            			inp.push(data2.d.results[i].to_OverallSDProcessStatus.OverallSDProcessStatus_Text);
	            	            		}
	            	            	}
	            	            	
	            	            	
	            	            	if(actstr.includes("completed")){
	            	            		 res.send({
		            	            		    replies: [
		            	            		    	{"type":"quickReplies","content":{"title":"There are "+comp.length+" Completed Sales order for this Customer.",
		        			            		    	"buttons":[
		        			            		    	
		        			            		    		{"value":"show all in process sales order of "+sno,
		        			            		    		"title":"Inprocess SO"
		        			            		    		}
		        			            		    		
		        			            		    		
		        			            		    		
		        			            		    	]
		        			            		    		}}
		            	            		    	
		            	            		    	
		            	            		    ], 
		            	            		    conversation: {
		            	            		      memory: { key: 'value' }
		            	            		    }
		            	            		  })	
	            	            		
	            	            		
	            	            		
	            	            	}
	            	            	

	            	            	else if(actstr.includes("process")){
	            	            		 res.send({
		            	            		    replies: [
		            	            		    	{"type":"quickReplies","content":{"title":"There are "+inp.length+" in Process Sales order for this Customer.",
		        			            		    	"buttons":[
		        			            		    		{ "value":"show all completed sales order of "+sno,
		        			            		    		"title":"Completed SO"
		        			            		    		},
		        			            		    		
		            	            		    	]}}], 
		            	            		    conversation: {
		            	            		      memory: { key: 'value' }
		            	            		    }
		            	            		  })	
	            	            		
	            	            		
	            	            		
	            	            	}
	            	            	
	            	            	else{
	            	            	 res.send({
	            	            		    replies: [
	            	            		    	{"type":"quickReplies","content":{"title":"There are "+count+" Sales order for this Customer.\nWant to See",
	        			            		    	"buttons":[
	        			            		    		{ "value":"show all completed sales order of "+sno,
	        			            		    		"title":"Completed SO"
	        			            		    		},
	        			            		    		{"value":"show all in process sales order of "+sno,
	        			            		    		"title":"Inprocess SO"
	        			            		    		}
	        			            		    		
	        			            		    		
	        			            		    		
	        			            		    	]
	        			            		    		}}
	            	            		    ], 
	            	            		    conversation: {
	            	            		      memory: { key: 'value' }
	            	            		    }
	            	            		  })
	            	            	}
	            	                 
	            	            },
	            	            error: function() {
	            	               console.log("error", arguments[2])
	            	            }
	            	        });
	            	    }
	            	    var ip = getLocationFromIp();

	            	});
		         }
		         else{
		        	   
		        	   res.send({
	            		    replies: [{
	            		      type: 'text',
	            		      content: "Please provide the valid customer name or no."
	            		    }], 
	            		    conversation: {
	            		      memory: { key: 'value' }
	            		    }
	            		  })
		        	   
		        	   
		           }
	            },
	            error: function() {
	               console.log("error", arguments[2])
	            }
	        });
	    }
	    var ip = getLocationFromIp();

	});
	
 });

////End of the Customer Sales order intent /////

////Start of the Customer Attachment intent /////

app.post('/Attachment360', (req, res) => {
	
	actstr=req.body.nlp.source;
	require("jsdom").env("", function(err, window) {
	    if (err) {
	        console.error(err);
	        return;
	    }
	    var $ = require("jquery")(window);

	     function getLocationFromIp() 	{
	        $.ajax({
	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187",
	            type: "GET",
	            data: null,
	            dataType: "json",
	            username : userId,
	            password : password,
	            success: function(data) {
	            
	            	 var flag=false;
		            	var sname="";
		            	var sno="";
		            	for(var i=0;i<data.d.results.length;i++){
		            
		            		
		            		if(actstr.match(data.d.results[i].CustomerName)>=0===false|| actstr.match(data.d.results[i].Customer)>=0===false){  
		            			sname=data.d.results[i].CustomerName;
		            			sno=data.d.results[i].Customer;
		            			flag=true;
		            			break;  
		            			
		            		}
		            		
		            	}
		            	
		            /*	if(flag===false){
		            		
		            		 res.send({
	 			        		
			            		 replies: [
			            		    	{"type":"quickReplies","content":{"title":"This Customer is not present in database.\nplease try with another one",
			            		    	
			            		    		}}
			            		    		],
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
		            		
		            	}*/
	            	
	            	require("jsdom").env("", function(err, window) {
	            	    if (err) {
	            	        console.error(err);
	            	        return;
	            	    }
	            	    var $ = require("jquery")(window);

	            	     function getLocationFromIp() 	{
	            	        $.ajax({
	            	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187('"+sno+"')?sap-client=100",
	            	            type: "GET",
	            	            data: null,
	            	            dataType: "json",
	            	            username : userId,
	            	            password : password,
	            	            success: function(data) {
	            	            	price=data.d.Price;

	            	            	 res.send({
	            	            		    replies: [{
	            	            		      type: 'text',
	            	            		      content: price
	            	            		    }], 
	            	            		    conversation: {
	            	            		      memory: { key: 'value' }
	            	            		    }
	            	            		  })
	            	                
	            	                 
	            	            },
	            	            error: function() {
	            	               console.log("error", arguments[2])
	            	            }
	            	        });
	            	    }
	            	    var ip = getLocationFromIp();

	            	});
	             
	            },
	            error: function() {
	               console.log("error", arguments[2])
	            }
	        });
	    }
	    var ip = getLocationFromIp();

	});
	
 });

////End of the Customer Attchment intent /////

////Start of the Customer Fullfillment issues intent /////

app.post('/Issues360', (req, res) => {
	

	var actstr1=req.body.nlp.source;
	var actstr=actstr1.toLowerCase();
	require("jsdom").env("", function(err, window) {
	    if (err) {
	        console.error(err);
	        return;
	    }
	    var $ = require("jquery")(window);

	     function getLocationFromIp() 	{
	        $.ajax({
	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187",
	            type: "GET",
	            data: null,
	            dataType: "json",
	            username : userId,
	            password : password,
	            success: function(data) {
	            
	            	 var flag=false;
		            	var sname="";
		            	var sno="";
		            	for(var i=0;i<data.d.results.length;i++){
		            
		            		
		            		if(actstr.includes(data.d.results[i].CustomerName)|| actstr.includes(data.d.results[i].Customer)){  
		            			sname=data.d.results[i].CustomerName;
		            			sno=data.d.results[i].Customer;
		            			flag=true;
		            			break;  
		            			
		            		}
		            		
		            	}
		            	
		           if(sno!=""){
		            	
	            	
	            	require("jsdom").env("", function(err, window) {
	            	    if (err) {
	            	        console.error(err);
	            	        return;
	            	    }
	            	    var $ = require("jquery")(window);

	            	     function getLocationFromIp() 	{
	            	        $.ajax({
	            	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187('"+sno+"')/to_Issues?sap-client=100&$skip=0&$top=10&$orderby=DueDays%20asc,SalesOrder%20desc&$select=DueDays%2cDueDateCriticality%2cSalesOrder%2cIssueCategoryName%2cNmbrOfAllIssues%2cPurchaseOrderByCustomer%2cTotalNetAmount%2cTransactionCurrency%2cRequestedDeliveryDate&$inlinecount=allpages",
	            	            type: "GET",
	            	            data: null,
	            	            dataType: "json",
	            	            username : userId,
	            	            password : password,
	            	            success: function(data) {
	            	            	var count=data.d.results.length;
	            	            	var insup=[];
	            	            	var inorder=[];
	            	            	var indel=[];
	            	            	for(var i=0;i<count;i++){
	            	            		
	            	            		if(data.d.results[i].IssueCategoryName==="In Supply"){
	            	            			insup.push(data.d.results[i].IssueCategoryName);
	            	            		}
	            	            		else if(data.d.results[i].IssueCategoryName==="In Delivery"){
	            	            			indel.push(data.d.results[i].IssueCategoryName);
	            	            			
	            	            		}
	            	            		else{
	            	            			inorder.push(data.d.results[i].IssueCategoryName);
	            	            			
	            	            		}
	            	            	}
	            	            	
	            	            	
	            	            	if(actstr.includes("order")){
	            	            		 res.send({
		            	            		    replies: [{
		            	            		      type: 'text',
		            	            		      content: "There are total "+inorder.length+" in Order Fullfillment Issues."
		            	            		    }], 
		            	            		    conversation: {
		            	            		      memory: { key: 'value' }
		            	            		    }
		            	            		  })
	            	            		
	            	            	}
	            	            	
	            	            	else if(actstr.includes("delivery")){
	            	            		 res.send({
		            	            		    replies: [{
		            	            		      type: 'text',
		            	            		      content: "There are total "+indel.length+" in Delivery Fullfillment Issues."
		            	            		    }], 
		            	            		    conversation: {
		            	            		      memory: { key: 'value' }
		            	            		    }
		            	            		  })
	            	            		
	            	            	}
	            	            	else if(actstr.includes("supply")){
	            	            		 res.send({
		            	            		    replies: [{
		            	            		      type: 'text',
		            	            		      content: "There are total "+insup.length+" in Supply Fullfillment Issues."
		            	            		    }], 
		            	            		    conversation: {
		            	            		      memory: { key: 'value' }
		            	            		    }
		            	            		  })
	            	            		
	            	            	}
	            	            	
	            	            	else{
	            	            	
	            	            	 res.send({
	            	            		    replies: [{
	            	            		      type: 'text',
	            	            		      content: "There are total "+count+" Fullfillment Issues.\nIn Order: "+inorder.length+"\nIn Supply: "+insup.length+"\nIn Delivery: "+indel.length
	            	            		    }], 
	            	            		    conversation: {
	            	            		      memory: { key: 'value' }
	            	            		    }
	            	            		  })
	            	            	}
	            	                 
	            	            },
	            	            error: function() {
	            	               console.log("error", arguments[2])
	            	            }
	            	        });
	            	    }
	            	    var ip = getLocationFromIp();

	            	});
	            	
		           }
		           
		           else{
		        	   
		        	   res.send({
	            		    replies: [{
	            		      type: 'text',
	            		      content: "Please provide the valid customer name or no."
	            		    }], 
	            		    conversation: {
	            		      memory: { key: 'value' }
	            		    }
	            		  })
		        	   
		        	   
		           }
	             
	            },
	            error: function() {
	               console.log("error", arguments[2])
	            }
	        });
	    }
	    var ip = getLocationFromIp();

	});
	
 });

////End of the Customer Fulfillment issues intent /////

////Start of the Customer billing intent /////

app.post('/BillingDoc360', (req, res) => {
	
	var actstr1=req.body.nlp.source;
	var actstr=actstr1.toLowerCase();
	require("jsdom").env("", function(err, window) {
	    if (err) {
	        console.error(err);
	        return;
	    }
	    var $ = require("jquery")(window);

	     function getLocationFromIp() 	{
	        $.ajax({
	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187",
	            type: "GET",
	            data: null,
	            dataType: "json",
	            username : userId,
	            password : password,
	            success: function(data) {
	            	 var flag=false;
		            	var sname="";
		            	var sno="";
		            	for(var i=0;i<data.d.results.length;i++){
		            
		            		
		            		if(actstr.includes(data.d.results[i].CustomerName)|| actstr.includes(data.d.results[i].Customer)){  
		            			sname=data.d.results[i].CustomerName;
		            			sno=data.d.results[i].Customer;
		            			flag=true;
		            			break;  
		            			
		            		}
		            		
		            	}
		         	if(sno!=""){
		            		
	            	
	            	require("jsdom").env("", function(err, window) {
	            	    if (err) {
	            	        console.error(err);
	            	        return;
	            	    }
	            	    var $ = require("jquery")(window);

	            	     function getLocationFromIp() 	{
	            	        $.ajax({
	            	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187('"+sno+"')/to_Invoices?sap-client=100&$skip=0&$top=200&$orderby=BillingDocumentDate%20desc,BillingDocument%20desc&$select=BillingDocument%2cBillingDocumentType%2cto_BillingDocumentType%2fBillingDocumentType_Text%2cto_OverallBillingStatus%2fOverallBillingStatus_Text%2cBillingDocumentDate%2cTotalNetAmount%2cTransactionCurrency&$expand=to_BillingDocumentType%2cto_OverallBillingStatus&$inlinecount=allpages",
	            	            type: "GET",
	            	            data: null,
	            	            dataType: "json",
	            	            username : userId,
	            	            password : password,
	            	            success: function(data) {
	            	            	var count=data.d.results.length;
	            	            	var comp=[];
	            	            	var postd=[];
	            	            	
	            	            	for(var i=0;i<count;i++){
	            	            		
	            	            		if(data.d.results[i].to_OverallBillingStatus.OverallBillingStatus_Text==="Completed"){
	            	            			comp.push(data.d.results[i].to_OverallBillingStatus.OverallBillingStatus_Text);
	            	            		}
	            	            		
	            	            		else{
	            	            			postd.push(data.d.results[i].to_OverallBillingStatus.OverallBillingStatus_Text);
	            	            			
	            	            		}
	            	            	}
	            	            	if(actstr.includes("completed")){
	            	            		
	            	            		
	            	            		 res.send({
		            	            		    replies: [{
		            	            		      type: 'text',
		            	            		      content: "There are total "+comp.length+" Completed Billing Documents of this Customer."
		            	            		    }], 
		            	            		    conversation: {
		            	            		      memory: { key: 'value' }
		            	            		    }
		            	            		  })
	            	            	}
	            	            	
	            	            	else if(actstr.includes("posted")){
	            	            		 res.send({
		            	            		    replies: [{
		            	            		      type: 'text',
		            	            		      content: "There are total "+postd.length+" to be Posted Billing Documents of this Customer."
		            	            		    }], 
		            	            		    conversation: {
		            	            		      memory: { key: 'value' }
		            	            		    }
		            	            		  })
	            	            	
	            	            		
	            	            	}
	            	            	
	            	            	else{
	            	            	 res.send({
	            	            		    replies: [{
	            	            		      type: 'text',
	            	            		      content: "There are total "+count+" Billing Documents of this Customer.\nCompleted: "+comp.length+"\nTo Be Posted: "+postd.length
	            	            		    }], 
	            	            		    conversation: {
	            	            		      memory: { key: 'value' }
	            	            		    }
	            	            		  })
	            	                
	            	            	} 
	            	            },
	            	            error: function() {
	            	               console.log("error", arguments[2])
	            	            }
	            	        });
	            	    }
	            	    var ip = getLocationFromIp();

	            	});
		         	}
		         	
		         	  else{
			        	   
			        	   res.send({
		            		    replies: [{
		            		      type: 'text',
		            		      content: "Please provide the valid customer name or no."
		            		    }], 
		            		    conversation: {
		            		      memory: { key: 'value' }
		            		    }
		            		  })
			        	   
			        	   
			           }
	            },
	            error: function() {
	               console.log("error", arguments[2])
	            }
	        });
	    }
	    var ip = getLocationFromIp();

	});
	
 });

////End of the Customer Billing Document intent /////

////Start of the Customer Debit Memo intent /////

app.post('/DebitMemo360', (req, res) => {
	
	var actstr1=req.body.nlp.source;
	var actstr=actstr1.toLowerCase();
	require("jsdom").env("", function(err, window) {
	    if (err) {
	        console.error(err);
	        return;
	    }
	    var $ = require("jquery")(window);

	     function getLocationFromIp() 	{
	        $.ajax({
	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187",
	            type: "GET",
	            data: null,
	            dataType: "json",
	            username : userId,
	            password : password,
	            success: function(data) {
	            
	            	 var flag=false;
		            	var sname="";
		            	var sno="";
		            	for(var i=0;i<data.d.results.length;i++){
		            
		            		
		            		if(actstr.includes(data.d.results[i].CustomerName)|| actstr.includes(data.d.results[i].Customer)){  
		            			sname=data.d.results[i].CustomerName;
		            			sno=data.d.results[i].Customer;
		            			flag=true;
		            			break;  
		            			
		            		}
		            		
		            	}
		            	
		         if(sno!=""){
		            	
	            	
	            	require("jsdom").env("", function(err, window) {
	            	    if (err) {
	            	        console.error(err);
	            	        return;
	            	    }
	            	    var $ = require("jquery")(window);

	            	     function getLocationFromIp() 	{
	            	        $.ajax({
	            	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187('"+sno+"')/to_DebitMemoRequests?sap-client=100&$skip=0&$top=10&$orderby=DebitMemoRequestDate%20desc,DebitMemoRequest%20desc&$select=DebitMemoRequest%2cPurchaseOrderByCustomer%2cBillingDocumentDate%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cOverallOrdReltdBillgStatus%2cto_OverallOrdReltdBillgStatus%2fOverallOrdReltdBillgStatus_Text%2cTotalNetAmount%2cTransactionCurrency%2cDebitMemoRequestDate%2cHeaderBillingBlockReason&$expand=to_OverallOrdReltdBillgStatus%2cto_OverallSDProcessStatus&$inlinecount=allpages",
	            	            type: "GET",
	            	            data: null,
	            	            dataType: "json",
	            	            username : userId,
	            	            password : password,
	            	            success: function(data) {
	            	            	var count=data.d.results.length;
	            	            	var comp=[];
	            	            	var open=[];
	            	            	
	            	            	for(var i=0;i<count;i++){
	            	            		
	            	            		if(data.d.results[i].to_OverallSDProcessStatus.OverallSDProcessStatus_Text==="Completed"){
	            	            			comp.push(data.d.results[i].to_OverallSDProcessStatus.OverallSDProcessStatus_Text);
	            	            		}
	            	            		
	            	            		else{
	            	            			open.push(data.d.results[i].to_OverallSDProcessStatus.OverallSDProcessStatus_Text);
	            	            			
	            	            		}
	            	            	}
	            	            	
	            	            	if(actstr.includes("completed")){
	            	            	 res.send({
	            	            		    replies: [{
	            	            		      type: 'text',
	            	            		      content: "There are total "+comp.length+" Completed Debit memo request for this Customer."
	            	            		    }], 
	            	            		    conversation: {
	            	            		      memory: { key: 'value' }
	            	            		    }
	            	            		  })
	            	            	
	            	            	}
	            	            	
	            	            	else if(actstr.includes("completed")){
		            	            	 res.send({
		            	            		    replies: [{
		            	            		      type: 'text',
		            	            		      content: "There are total "+open.length+" Open Debit memo request for this Customer."
		            	            		    }], 
		            	            		    conversation: {
		            	            		      memory: { key: 'value' }
		            	            		    }
		            	            		  })
		            	            	
		            	            	}
	            	            	
	            	            	else{
	            	            	 res.send({
	            	            		    replies: [{
	            	            		      type: 'text',
	            	            		      content: "There are total "+count+" Debit memo request for this Customer.\nCompleted Request: "+comp.length+"\nOpen Request: "+open.length
	            	            		    }], 
	            	            		    conversation: {
	            	            		      memory: { key: 'value' }
	            	            		    }
	            	            		  })
	            	            	}
	            	                 
	            	            },
	            	            error: function() {
	            	               console.log("error", arguments[2])
	            	            }
	            	        });
	            	    }
	            	    var ip = getLocationFromIp();

	            	});
	             
		         }
		         
		         else{
		        	   
		        	   res.send({
	            		    replies: [{
	            		      type: 'text',
	            		      content: "Please provide the valid customer name or no."
	            		    }], 
	            		    conversation: {
	            		      memory: { key: 'value' }
	            		    }
	            		  })
		        	   
		        	   
		           }
	            	
	            },
	            error: function() {
	               console.log("error", arguments[2])
	            }
	        });
	    }
	    var ip = getLocationFromIp();

	});
	
 });

////End of the Customer Debit Memo intent /////

////Start of the Customer Credit Memo intent /////

app.post('/CreditMemo360', (req, res) => {
	var actstr1=req.body.nlp.source;
	var actstr=actstr1.toLowerCase();
	require("jsdom").env("", function(err, window) {
	    if (err) {
	        console.error(err);
	        return;
	    }
	    var $ = require("jquery")(window);

	     function getLocationFromIp() 	{
	        $.ajax({
	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187",
	            type: "GET",
	            data: null,
	            dataType: "json",
	            username : userId,
	            password : password,
	            success: function(data) {
	            
	            	 var flag=false;
		            	var sname="";
		            	var sno="";
		            	for(var i=0;i<data.d.results.length;i++){
		            
		            		
		            		if(actstr.includes(data.d.results[i].CustomerName)|| actstr.includes(data.d.results[i].Customer)){  
		            			sname=data.d.results[i].CustomerName;
		            			sno=data.d.results[i].Customer;
		            			flag=true;
		            			break;  
		            			
		            		}
		            		
		            	}
		          if(sno!=""){
		            	
	            	
	            	require("jsdom").env("", function(err, window) {
	            	    if (err) {
	            	        console.error(err);
	            	        return;
	            	    }
	            	    var $ = require("jquery")(window);

	            	     function getLocationFromIp() 	{
	            	        $.ajax({
	            	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187('"+sno+"')/to_CreditMemoRequests?sap-client=100&$skip=0&$top=10&$orderby=CreditMemoRequestDate%20desc,CreditMemoRequest%20desc&$select=CreditMemoRequest%2cPurchaseOrderByCustomer%2cBillingDocumentDate%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cOverallOrdReltdBillgStatus%2cto_OverallOrdReltdBillgStatus%2fOverallOrdReltdBillgStatus_Text%2cTotalNetAmount%2cTransactionCurrency%2cCreditMemoRequestDate%2cHeaderBillingBlockReason&$expand=to_OverallOrdReltdBillgStatus%2cto_OverallSDProcessStatus&$inlinecount=allpages",
	            	            type: "GET",
	            	            data: null,
	            	            dataType: "json",
	            	            username : userId,
	            	            password : password,
	            	            success: function(data) {
	            	            	var count=data.d.results.length;
	            	            	var comp=[];
	            	            	var open=[];
	            	            	
	            	            	for(var i=0;i<count;i++){
	            	            		
	            	            		if(data.d.results[i].to_OverallSDProcessStatus.OverallSDProcessStatus_Text==="Completed"){
	            	            			comp.push(data.d.results[i].to_OverallSDProcessStatus.OverallSDProcessStatus_Text);
	            	            		}
	            	            		
	            	            		else{
	            	            			open.push(data.d.results[i].to_OverallSDProcessStatus.OverallSDProcessStatus_Text);
	            	            			
	            	            		}
	            	            	}

	            	            	
	            	            	if(actstr.includes("completed")){
		            	            	 res.send({
		            	            		    replies: [{
		            	            		      type: 'text',
		            	            		      content: "There are total "+comp.length+" Completed Credit memo request for this Customer."
		            	            		    }], 
		            	            		    conversation: {
		            	            		      memory: { key: 'value' }
		            	            		    }
		            	            		  })
		            	            	
		            	            	}
	            	            	else if(actstr.includes("open")){
		            	            	 res.send({
		            	            		    replies: [{
		            	            		      type: 'text',
		            	            		      content: "There are total "+open.length+" Open Credit memo request for this Customer."
		            	            		    }], 
		            	            		    conversation: {
		            	            		      memory: { key: 'value' }
		            	            		    }
		            	            		  })
		            	            	
		            	            	}
	            	            	
	            	            	else{
	            	            	
	            	            	 res.send({
	            	            		    replies: [{
	            	            		      type: 'text',
	            	            		      content: "There are total "+count+ " Credit memo request for this Customer.\nCompleted Request: "+comp.length+"\nOpen Request: "+open.length
	            	            		    }], 
	            	            		    conversation: {
	            	            		      memory: { key: 'value' }
	            	            		    }
	            	            		  })
	            	                
	            	                 
	            	                
	            	            	}
	            	            },
	            	            error: function() {
	            	               console.log("error", arguments[2])
	            	            }
	            	        });
	            	    }
	            	    var ip = getLocationFromIp();

	            	});
		          }
		          
		          else{
		        	   
		        	   res.send({
	            		    replies: [{
	            		      type: 'text',
	            		      content: "Please provide the valid customer name or no."
	            		    }], 
	            		    conversation: {
	            		      memory: { key: 'value' }
	            		    }
	            		  })
		        	   
		        	   
		           }
	            },
	            error: function() {
	               console.log("error", arguments[2])
	            }
	        });
	    }
	    var ip = getLocationFromIp();

	});
	
	
 });

////End of the Customer Credit Memo intent /////

////Start of the Customer Return intent /////

app.post('/CustReturn360', (req, res) => {
	
	var actstr1=req.body.nlp.source;
	var actstr=actstr1.toLowerCase();
	require("jsdom").env("", function(err, window) {
	    if (err) {
	        console.error(err);
	        return;
	    }
	    var $ = require("jquery")(window);

	     function getLocationFromIp() 	{
	        $.ajax({
	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187",
	            type: "GET",
	            data: null,
	            dataType: "json",
	            username : userId,

	            password : password,
	            success: function(data) {
	            	 var flag=false;
		            	var sname="";
		            	var sno="";
		            	for(var i=0;i<data.d.results.length;i++){
		            
		            		
		            		if(actstr.includes(data.d.results[i].CustomerName)>=0|| actstr.includes(data.d.results[i].Customer)>=0){  
		            			sname=data.d.results[i].CustomerName;
		            			sno=data.d.results[i].Customer;
		            			flag=true;
		            			break;  
		            			
		            		}
		            		
		            	}
		            
	            	
	            	require("jsdom").env("", function(err, window) {
	            	    if (err) {
	            	        console.error(err);
	            	        return;
	            	    }
	            	    var $ = require("jquery")(window);

	            	     function getLocationFromIp() 	{
	            	        $.ajax({
	            	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187('"+sno+"')/to_Returns?sap-client=100&$skip=0&$top=10&$orderby=CustomerReturnDate%20desc,CustomerReturn%20desc&$select=CustomerReturn%2cCustomerReturnDate%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cRetsMgmtCompnProcgStatus%2cto_RetsMgmtCompnProcgStatus%2fRetsMgmtCompnProcgStatus_Text%2cRetsMgmtLogProcgStatus%2cto_RetsMgmtProcgStatus%2fRetsMgmtProcessingStatus_Text%2cTotalNetAmount%2cTransactionCurrency&$expand=to_RetsMgmtCompnProcgStatus%2cto_RetsMgmtProcgStatus%2cto_OverallSDProcessStatus&$inlinecount=allpages",
	            	            type: "GET",
	            	            data: null,
	            	            dataType: "json",
	            	            username : userId,

	            	            password : password,
	            	            success: function(data) {
	            	            	price=data.d.Price;

	            	            	 res.send({
	            	            		    replies: [{
	            	            		      type: 'text',
	            	            		      content: price
	            	            		    }], 
	            	            		    conversation: {
	            	            		      memory: { key: 'value' }
	            	            		    }
	            	            		  })
	            	                
	            	                 
	            	            },
	            	            error: function() {
	            	               console.log("error", arguments[2])
	            	            }
	            	        });
	            	    }
	            	    var ip = getLocationFromIp();

	            	});
	             
	            },
	            error: function() {
	               console.log("error", arguments[2])
	            }
	        });
	    }
	    var ip = getLocationFromIp();

	});
	
 });

////End of the Customer Return intent /////

////Start of the Customer Sales Areas intent /////

app.post('/SalesAreas360', (req, res) => {
	
	var actstr1=req.body.nlp.source;
	var actstr=actstr1.toLowerCase();
	require("jsdom").env("", function(err, window) {
	    if (err) {
	        console.error(err);
	        return;
	    }
	    var $ = require("jquery")(window);

	     function getLocationFromIp() 	{
	        $.ajax({
	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187",
	            type: "GET",
	            data: null,
	            dataType: "json",
	            username : userId,

	            password : password,
	            success: function(data) {
	            
	            	 var flag=false;
		            	var sname="";
		            	var sno="";
		            	for(var i=0;i<data.d.results.length;i++){
		            
		            		
		            		if(actstr.includes(data.d.results[i].CustomerName)|| actstr.includes(data.d.results[i].Customer)){  
		            			sname=data.d.results[i].CustomerName;
		            			sno=data.d.results[i].Customer;
		            			flag=true;
		            			break;  
		            			
		            		}
		            		
		            	}
		            	
		        if(sno!=""){
		            	
	            	
	            	require("jsdom").env("", function(err, window) {
	            	    if (err) {
	            	        console.error(err);
	            	        return;
	            	    }
	            	    var $ = require("jquery")(window);

	            	     function getLocationFromIp() 	{
	            	        $.ajax({
	            	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187('"+sno+"')/to_SalesArea?sap-client=100&$skip=0&$top=10&$select=SalesOrganization%2cto_SalesOrganization%2fSalesOrganization_Text%2cDistributionChannel%2cto_DistributionChannel%2fDistributionChannel_Text%2cDivision%2cto_Division%2fDivision_Text%2cCustomer&$expand=to_SalesOrganization%2cto_DistributionChannel%2cto_Division&$inlinecount=allpages",
	            	            type: "GET",
	            	            data: null,
	            	            dataType: "json",
	            	            username : userId,

	            	            password : password,
	            	            success: function(data) {
	            	            	var count=data.d.results.length;
	            	            	var dischannel=data.d.results["0"].to_DistributionChannel.DistributionChannel_Text;
	            	            	var salesorg=data.d.results["0"].to_SalesOrganization.SalesOrganization_Text;
	            	            	var pdv=data.d.results["0"].to_Division.Division_Text;
	            	            	var no=data.d.results["0"].DistributionChannel;
	            	            	res.send({
	            	            		    replies: [
	            	            		    	
	            	            		    	{"type":"quickReplies","content":{"title":"There is "+count+" sales areas of this Customer.\nSales Organization: "+salesorg+"\nDistribution Channel: "+dischannel+"("+no+")\nDivision: "+pdv+"\nWant to see more info??",
	        			            		    	"buttons":[
	        			            		    		{ "value":"Yaa Show me sales area data of customer "+sno,
	        			            		    		"title":"Yes"
	        			            		    		},
	        			            		    		{ "value":"",
	            			            		    		"title":"No"
	            			            		    		}
	        			            		    		
	        			            		    	]
	        			            		    		}}
	            	            		    ], 
	            	            		    conversation: {
	            	            		      memory: { key: 'value' }
	            	            		    }
	            	            		  })
	            	                
	            	                 
	            	            },
	            	            error: function() {
	            	               console.log("error", arguments[2])
	            	            }
	            	        });
	            	    }
	            	    var ip = getLocationFromIp();

	            	});
		        }
		        
		        else{
		        	   
		        	   res.send({
	            		    replies: [{
	            		      type: 'text',
	            		      content: "Please provide the valid customer name or no."
	            		    }], 
	            		    conversation: {
	            		      memory: { key: 'value' }
	            		    }
	            		  })
		        	   
		        	   
		           }
	            },
	            error: function() {
	               console.log("error", arguments[2])
	            }
	        });
	    }
	    var ip = getLocationFromIp();

	});
	
 });

////End of the Customer Sales Areas  intent /////

////Start of the Customer Quotation intent /////

app.post('/Quotation360', (req, res) => {
	

	var actstr1=req.body.nlp.source;
	var actstr=actstr1.toLowerCase();
	require("jsdom").env("", function(err, window) {
	    if (err) {
	        console.error(err);
	        return;
	    }
	    var $ = require("jquery")(window);

	     function getLocationFromIp() 	{
	        $.ajax({
	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187",
	            type: "GET",
	            data: null,
	            dataType: "json",
	            username : userId,

	            password : password,
	            success: function(data) {
	            
	            	 var flag=false;
		            	var sname="";
		            	var sno="";
		            	for(var i=0;i<data.d.results.length;i++){
		            
		            		
		            		if(actstr.includes(data.d.results[i].CustomerName)|| actstr.includes(data.d.results[i].Customer)){  
		            			sname=data.d.results[i].CustomerName;
		            			sno=data.d.results[i].Customer;
		            			flag=true;
		            			break;  
		            			
		            		}
		            		
		            	}
		           
		            	if(sno!=""){
		            	
	            	require("jsdom").env("", function(err, window) {
	            	    if (err) {
	            	        console.error(err);
	            	        return;
	            	    }
	            	    var $ = require("jquery")(window);

	            	     function getLocationFromIp() 	{
	            	        $.ajax({
	            	            url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187('"+sno+"')/to_SalesQuotations?sap-client=100&$skip=0&$top=10&$orderby=SalesQuotationDate%20desc,SalesQuotation%20desc&$select=SalesQuotation%2cPurchaseOrderByCustomer%2cBindingPeriodValidityStartDate%2cBindingPeriodValidityEndDate%2cSlsQtanDueDateCriticality%2cOverallSDProcessStatus%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cTotalNetAmount%2cTransactionCurrency%2cSalesQuotationDate&$expand=to_OverallSDProcessStatus&$inlinecount=allpages",
	            	            data: null,
	            	            dataType: "json",
	            	            username : userId,

	            	            password : password,
	            	            success: function(data) {
	            	            	var count=data.d.results.length;
	            	            	var name=[];
	            	            	for(var i=0;i<count;i++){
	            	            		
	            	            		name.push(data.d.results[i].SalesQuotation);
	            	            		
	            	            	}
	            	            	 res.send({
	            	            		    replies: [{
	            	            		      type: 'text',
	            	            		      content: "There are total "+count+" Quotation for this Customer.\nSales Quotation No: "+name
	            	            		    }], 
	            	            		    conversation: {
	            	            		      memory: { key: 'value' }
	            	            		    }
	            	            		  })
	            	                
	            	                 
	            	            },
	            	            error: function() {
	            	               console.log("error", arguments[2])
	            	            }
	            	        });
	            	    }
	            	    var ip = getLocationFromIp();

	            	});
		            	}
		            	  else{
				        	   
				        	   res.send({
			            		    replies: [{
			            		      type: 'text',
			            		      content: "Please provide the valid customer name or no."
			            		    }], 
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
				        	   
				        	   
				           }
	            },
	            error: function() {
	               console.log("error", arguments[2])
	            }
	        });
	    }
	    var ip = getLocationFromIp();

	});
	
 });

////End of the Customer Quotation intent /////
//////End of the Customer 360 Applications Intents.......///////

// /// for any Default Case triggered...


app.post('/default', (req, res) => {
	
	var actualstr1=res.req.body.nlp.source;
	var actualstr=actualstr1.toLowerCase();
	var FLAG=false;
	require("jsdom").env("", function(err, window) {
	    if (err) {
	        console.error(err);
	        return;
	    }
	    var $ = require("jquery")(window);

	     function getLocationFromIp() 	{
	        $.ajax({
	        	 url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873",

		            type: "GET",
		            data: null,
		            dataType: "json",
		            username : userId,
		            crossDomain: true,
		            password : password,
	            success: function(data) {
	            	var length=data.d.results.length;
	            	var SO=[];
	            	var STP=[];
	            	var CTR=[];
	            
	            	var STPNAME=[];
	            	
	            	
	            	for(var i=0;i<length;i++){
	            		
	            	SO.push(data.d.results[i].SalesOrder);
	            	STP.push(data.d.results[i].SoldToParty.toLowerCase());
	            	CTR.push(data.d.results[i].PurchaseOrderByCustomer.toLowerCase());
	            	
	            	STPNAME.push(data.d.results[i].OrganizationBPName1.toLowerCase());	
	            		
	            	}
	            	
	            		
		            	if(SO.indexOf(actualstr) >= 0 ){
		            		
		            		
		            		require("jsdom").env("", function(err, window) {
		        			    if (err) {
		        			        console.error(err);
		        			        return;
		        			    }
		        			    var $ = require("jquery")(window);

		        			     function getLocationFromIp() 	{
		        			        $.ajax({
		        			            url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873?sap-client=100&$skip=0&$top=25&$orderby=SalesOrderDate%20desc,SalesOrder%20desc&$filter=(substringof(%27"+actualstr+"%27,SalesOrder))&$select=SalesOrder%2cSoldToParty%2cto_SoldToParty%2fCustomerName%2cPurchaseOrderByCustomer%2cRequestedDeliveryDate%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cTotalNetAmount%2cTransactionCurrency%2cSalesOrderDate%2cDeliveryBlockReason%2cHeaderBillingBlockReason&$expand=to_SoldToParty%2cto_OverallSDProcessStatus&$inlinecount=allpages",
		        			            data: null,
		        			            dataType: "json",
		        			            username : userId,

		        			            password : password,
		        			            success: function(data1) {
		        			            	var count=data1;

		        			            	 res.send({
		        			            	
		        			            		 replies: [
		        			            		    	{"type":"quickReplies","content":{"title":"There are some basic information about this Sales order No.",
		        			            		    	"buttons":[
		        			            		    		{ "value":"Show Complete Details of sales order "+actualstr,
		        			            		    		"title":"Complete Details?"
		        			            		    		},
		        			            		    		{"value":"Show Overall State of sales order "+actualstr,
		        			            		    		"title":"Overall Status?"
		        			            		    		},
		        			            		    		
		        			            		    		
		        			            		    		
		        			            		    	]
		        			            		    		}}
		        			            		    		],
		        			            		    conversation: {
		        			            		      memory: { key: 'value' }
		        			            		    }
		        			            		  })
		        			            	
		        			            FLAG=true;		  
		        			                 
		        			            },
		        			            error: function() {
		        			               console.log("error", arguments[2])
		        			            }
		        			        });
		        			    }
		        			    var ip = getLocationFromIp();
		        			   // console.log(ip);
		        			});
		            		
		            	}
	            	
		            	if(STP.indexOf(actualstr) >= 0){
		            		
		            		/////FOR GETTING THE CUSTOMER information////////////////////////
		            	
		            require("jsdom").env("", function(err, window) {
		        			    if (err) {
		        			        console.error(err);
		        			        return;
		        			    }
		        			    var $ = require("jquery")(window);

		        			     function getLocationFromIp() 	{
		        			        $.ajax({
		        			        	url: baseURL+"/sap/opu/odata/sap/SD_F2187_CUST360_SRV/C_Customer360_F2187('"+actualstr+"')?sap-client=100",

		        				        type: "GET",
		        			            data: null,
		        			            dataType: "json",
		        			            username : userId,

		        			            password : password,
		        			            success: function(data1) {
		        			            	var Custname=data1.d.CustomerName;
		        			            	 res.send({
		        					        		
		        			            		 replies: [
		        			            		    	{"type":"quickReplies","content":{"title":"There are some basic Information about this Customer\nCustomer Name:"+ data1.d.CustomerName+"\nContact Person:"+ data1.d.FullName+"\nEmail Address:"+ data1.d.EmailAddress+"\nPhone No:"+ data1.d.InternationalPhoneNumber+"\nWant to See Full Detail?",
		        			            		    	"buttons":[
		        			            		    		{ "value":"Yaa Show me Complete detail of customer "+actualstr,
		        			            		    		"title":"Yes"
		        			            		    		},
		        			            		    		{ "value":"",
		            			            		    		"title":"No"
		            			            		    		}
		        			            		    		
		        			            		    	]
		        			            		    		}}
		        			            		    		],
		        			            		    conversation: {
		        			            		      memory: { key: 'value' }
		        			            		    }
		        			            		  })
		        			            	
		        			            	
		        			         	
		        			            		  
		        			            },
		        			            error: function() {
		        			               console.log("error", arguments[2])
		        			            }
		        			        });
		        			    }
		        			    var ip = getLocationFromIp();
		        			   // console.log(ip);
		        			});
		            		
		            	}
		          
	            	if(STPNAME.indexOf(actualstr) >= 0){
	            		
	            		

	        			            	 res.send({
	        			            	
	        			            		 replies: [
	        			            		    	{"type":"text",
	        			            		    	"content":"This a Sold To Party Name.\n To See the detail please provide the SOP No",
	        			            		    	}
	        			            		    	
	        			            		    		
	        			            		    		],
	        			            		    conversation: {
	        			            		      memory: { key: 'value' }
	        			            		    }
	        			            		  })
	        			                
	        			            		  FLAG=true;	   
	            		
	            	}
	            	
            	
		             if(CTR.indexOf(actualstr) >= 0 ){
		            	 
		            	
		            		require("jsdom").env("", function(err, window) {
		        			    if (err) {
		        			        console.error(err);
		        			        return;
		        			    }
		        			    var $ = require("jquery")(window);

		        			     function getLocationFromIp() 	{
		        			        $.ajax({
		        			        	 url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873?sap-client=100&$skip=0&$top=25&$orderby=SalesOrderDate%20desc,SalesOrder%20desc&$filter=substringof(%27"+actualstr+"%27,PurchaseOrderByCustomer)&$select=SalesOrder%2cSoldToParty%2cto_SoldToParty%2fCustomerName%2cPurchaseOrderByCustomer%2cRequestedDeliveryDate%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cTotalNetAmount%2cTransactionCurrency%2cSalesOrderDate%2cDeliveryBlockReason%2cHeaderBillingBlockReason&$expand=to_SoldToParty%2cto_OverallSDProcessStatus&$inlinecount=allpages",
		        				            type: "GET",
		        			            data: null,
		        			            dataType: "json",
		        			            username : userId,

		        			            password : password,
		        			            success: function(data1) {
		        			            	var count=data1;

		        			            	 res.send({
		        			            	
		        			            		 replies: [
		        			            		    	{"type":"quickReplies","content":{"title":"There are total "+data1.d.__count+" Sales Order is refrenced by this customer",
		        			            		    	"buttons":[
		        			            		    		{ "value":"Show All order of customer "+actualstr,
		        			            		    		"title":"Show All?"
		        			            		    		}
		        			            		    		
		        			            		    	]
		        			            		    		}}
		        			            		    		],
		        			            		    conversation: {
		        			            		      memory: { key: 'value' }
		        			            		    }
		        			            		  })
		        			            	
		        			            		  FLAG=true;	
		        			            },
		        			            error: function() {
		        			               console.log("error", arguments[2])
		        			            }
		        			        });
		        			    }
		        			    var ip = getLocationFromIp();
		        			   // console.log(ip);
		        			});
		            		
		            		
		            	}
		          
		             if((SO.indexOf(actualstr) >= 0)==false && (STP.indexOf(actualstr) >= 0)==false && (STPNAME.indexOf(actualstr) >= 0)==false && (CTR.indexOf(actualstr) >= 0)==false)
		             {
		            
		            	 res.send({
		         		    replies: [{
		         		      type: 'text',
		         		      content: 'Sorry did not understand.\nPlease provide a valid Customer.'
		         		    }], 
		         		    conversation: {
		         		      memory: { key: 'value' }
		         		    }
		         		  })
		            	
		                
		                	
		               }
	            	
	            },
	            error: function() {
	               console.log("error", arguments[2])
	            }
	        });
	    }
	    var ip = getLocationFromIp();
	
	});
	

 });




// //...........................


app.post('/customer', (req, res) => {
	
	
	// /for total sales order customer refrence by..
	
	
	var actualstr1=res.req.body.nlp.source;
	var actualstr=actualstr1.toLowerCase();
	
	var cust="customer";
	var cust1="17100001";
	var cust2="t-9";
	var cust3="xy";
	var cust4="ortest388";
	var cust5="fiori t1";
	var refcust="ref cust";
	var SO="sales order";
	var O="order";
	var fnvalue="";
	var avail="available";
	var Status=false;
	if(actualstr.includes(cust1)){
		
		fnvalue=cust1;
		 Status=true;
	}
	else if(actualstr.includes(cust2)){
	
		fnvalue=cust2;
		 Status=true;
	}
	
	else if(actualstr.includes(cust3)){
		
		fnvalue=cust3;
		 Status=true;
	}
	
	else if(actualstr.includes(cust4)){
		
		fnvalue=cust4;
		 Status=true;
	}
	else if(actualstr.includes(cust5)){
		
		fnvalue=cust5;
		 Status=true;
	}
	if(actualstr.includes(cust)){
		
 if(actualstr.includes(O)){
			
			var s=actualstr.split("customer ");
			
			
			require("jsdom").env("", function(err, window) {
			    if (err) {
			        console.error(err);
			        return;
			    }
			    var $ = require("jquery")(window);

			     function getLocationFromIp() 	{
			        $.ajax({
			            url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873?sap-client=100&$skip=0&$top=25&$orderby=SalesOrderDate%20desc,SalesOrder%20desc&$filter=substringof(%27"+s[1]+"%27,PurchaseOrderByCustomer)&$select=SalesOrder%2cSoldToParty%2cto_SoldToParty%2fCustomerName%2cPurchaseOrderByCustomer%2cRequestedDeliveryDate%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cTotalNetAmount%2cTransactionCurrency%2cSalesOrderDate%2cDeliveryBlockReason%2cHeaderBillingBlockReason&$expand=to_SoldToParty%2cto_OverallSDProcessStatus&$inlinecount=allpages",
			            type: "GET",
			            data: null,
			            dataType: "json",
			            username : userId,

			            password : password,
			            success: function(data) {
			            	var length=data.d.results.length;
			            	var SO=[];
			            	for(var i=0;i<length;i++){
			            		
			            		SO.push(data.d.results[i].SalesOrder);
			            		
			            	}
			            	
			            	
			            	
			            	 res.send({
			            		    replies: [{
			            		      type: 'text',
			            		      content:"Here is the Sales order No's \n"+SO
			            		    }], 
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
			                
			                 
			            },
			            error: function() {
			               console.log("error", arguments[2])
			            }
			        });
			    }
			    var ip = getLocationFromIp();
			   // console.log(ip);
			});

		}
		
		
		
 else if(Status===true || actualstr.includes(SO)){
	 
	 var s=actualstr.split("customer ");
			
			require("jsdom").env("", function(err, window) {
			    if (err) {
			        console.error(err);
			        return;
			    }
			    var $ = require("jquery")(window);

			     function getLocationFromIp() 	{
			        $.ajax({
			            url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873?sap-client=100&$skip=0&$top=25&$orderby=SalesOrderDate%20desc,SalesOrder%20desc&$filter=substringof(%27"+fnvalue+"%27,PurchaseOrderByCustomer)&$select=SalesOrder%2cSoldToParty%2cto_SoldToParty%2fCustomerName%2cPurchaseOrderByCustomer%2cRequestedDeliveryDate%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cTotalNetAmount%2cTransactionCurrency%2cSalesOrderDate%2cDeliveryBlockReason%2cHeaderBillingBlockReason&$expand=to_SoldToParty%2cto_OverallSDProcessStatus&$inlinecount=allpages",
			            type: "GET",
			            data: null,
			            dataType: "json",
			            username : userId,

			            password : password,
			            success: function(data) {

			            	 res.send({
			            		    replies: [
			            		    	{"type":"quickReplies","content":{"title":"There are total "+data.d.__count+" Sales Order is refrenced by this customer",
    			            		    	"buttons":[
    			            		    		{ "value":"Show All order of customer "+s[1],
    			            		    		"title":"Show All?"
    			            		    		}
    			            		    		
    			            		    	]
    			            		    		}}
			            		    	
			            		    	
			            		    	
			            		    	
			            		    	/*
										 * { type: 'text', content:"There are
										 * total "+data.d.__count+" Sales Order
										 * is present" }
										 */], 
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
			                
			                 
			            },
			            error: function() {
			               console.log("error", arguments[2])
			            }
			        });
			    }
			    var ip = getLocationFromIp();
			   // console.log(ip);
			});

		}
		
		
		
		
		
		
		
		else if(actualstr.includes(refcust) && res.req.body.nlp.entities.hasOwnProperty('numbers') || res.req.body.nlp.entities.hasOwnProperty('number') ){
			
			if(res.req.body.nlp.entities.hasOwnProperty('numbers')){
				var number=res.req.body.nlp.entities.numbers["0"].raw;	
			}
			else {
				
				var number=res.req.body.nlp.entities.number["0"].raw;
			}
			require("jsdom").env("", function(err, window) {
			    if (err) {
			        console.error(err);
			        return;
			    }
			    var $ = require("jquery")(window);

			     function getLocationFromIp() 	{
			        $.ajax({
			            url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873('"+number+"')",

			            type: "GET",
			            data: null,
			            dataType: "json",
			            username : userId,

			            password : password,
			            success: function(data) {

			            	 res.send({
			            		    replies: [{
			            		      type: 'text',
			            		      content: data.d.PurchaseOrderByCustomer+" is the reference Customer."
			            		    }], 
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
			                
			                 
			            },
			            error: function() {
			               console.log("error", arguments[2])
			            }
			        });
			    }
			    var ip = getLocationFromIp();
			   // console.log(ip);
			});

		}

		else{
			
			 res.send({
     		    replies: [{
     		      type: 'text',
     		      content: "Sure which customer information you want to see?? "
     		    }], 
     		    conversation: {
     		      memory: { key: 'value' }
     		    }
     		  })
         
		}
		
	}


});

app.post('/SO', (req, res) => {
	
	var actualstr1=res.req.body.nlp.source;
	var actualstr=actualstr1.toLowerCase();
	
	var SO="so";
	var SO1="sales order";
	var SG="sales group";
	var SAO="sales office";
	var SAT="status";
	var DET="detail";
	var rese ="sales org";
	var res1="dom sales";
	var CD="complete details";
	var OVRST="overall state";
	var open="open";
	var process="process";
	var completed="complete";
	var finished="finish";
	var unfinished="unfinish";
	var avail="available";
	
	
	if(actualstr.includes(SO)||actualstr.includes(SO1)){
		
		if(res.req.body.nlp.entities.hasOwnProperty('numbers')&& actualstr.includes(SG)==false && actualstr.includes(SAO)==false && actualstr.includes(SAT)==false && actualstr.includes(DET)==false && actualstr.includes(rese)==false && actualstr.includes(res1)==false && actualstr.includes(OVRST)==false){
			
			
			var number=res.req.body.nlp.entities.numbers["0"].raw;
			require("jsdom").env("", function(err, window) {
			    if (err) {
			        console.error(err);
			        return;
			    }
			    var $ = require("jquery")(window);

			     function getLocationFromIp() 	{
			        $.ajax({
			            url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873('"+number+"')",
			            data: null,
			            dataType: "json",
			            username : userId,

			            password : password,
			            success: function(data) {
			            	var count=data;

			            	 res.send({
			            		    replies: [{
			            		      type: 'text',
			            		      content: "There are some basic information about this SO is\n Sold to party :"+data.d.OrganizationBPName1+"\n Customer Reference :"+data.d.PurchaseOrderByCustomer+"\n Net Value :"+data.d.TotalNetAmount+" USD"
			            		    }], 
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
			                
			                 
			            },
			            error: function() {
			               console.log("error", arguments[2])
			            }
			        });
			    }
			    var ip = getLocationFromIp();
			   // console.log(ip);
			});
			
		}
		// / number with group...
		
		else if(res.req.body.nlp.entities.hasOwnProperty('number') && actualstr.includes(SG) ){
			
			var number=res.req.body.nlp.entities.number["0"].raw;
			require("jsdom").env("", function(err, window) {
			    if (err) {
			        console.error(err);
			        return;
			    }
			    var $ = require("jquery")(window);

			     function getLocationFromIp() 	{
			        $.ajax({
			            url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873?sap-client=100&$skip=0&$top=25&$orderby=SalesOrderDate%20desc,SalesOrder%20desc&$filter=(SalesGroup%20eq%20%27"+number+"%27)&$select=SalesOrder%2cSoldToParty%2cto_SoldToParty%2fCustomerName%2cPurchaseOrderByCustomer%2cRequestedDeliveryDate%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cTotalNetAmount%2cTransactionCurrency%2cSalesOrderDate%2cDeliveryBlockReason%2cHeaderBillingBlockReason&$expand=to_SoldToParty%2cto_OverallSDProcessStatus&$inlinecount=allpages",
			            data: null,
			            dataType: "json",
			            username : userId,

			            password : password,
			            success: function(data) {
			            	

			            	 res.send({
			            		    replies: [{
			            		      type: 'text',
			            		      content: "Total Sales order related to this Group is "+data.d.__count,
			            		    }], 
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
			                
			                 
			            },
			            error: function() {
			               console.log("error", arguments[2])
			            }
			        });
			    }
			    var ip = getLocationFromIp();
			   // console.log(ip);
			});
			
			
			
			
		}
		// / number with sales office...
		
		else if(res.req.body.nlp.entities.hasOwnProperty('number') && actualstr.includes(SAO)){
			
			var number=res.req.body.nlp.entities.number["0"].raw;
			require("jsdom").env("", function(err, window) {
			    if (err) {
			        console.error(err);
			        return;
			    }
			    var $ = require("jquery")(window);

			     function getLocationFromIp() 	{
			        $.ajax({
			            url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873?sap-client=100&$skip=0&$top=25&$orderby=SalesOrderDate%20desc,SalesOrder%20desc&$filter=(SalesOffice%20eq%20%27170%27%20or%20SalesOffice%20eq%20%27"+number+"%27)&$select=SalesOrder%2cSoldToParty%2cto_SoldToParty%2fCustomerName%2cPurchaseOrderByCustomer%2cRequestedDeliveryDate%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cTotalNetAmount%2cTransactionCurrency%2cSalesOrderDate%2cDeliveryBlockReason%2cHeaderBillingBlockReason&$expand=to_SoldToParty%2cto_OverallSDProcessStatus&$inlinecount=allpages",
			            data: null,
			            dataType: "json",
			            username : userId,

			            password : password,
			            success: function(data) {
			            	

			            	 res.send({
			            		    replies: [{
			            		      type: 'text',
			            		      content: "Total Sales order related to this is "+data.d.__count,
			            		    }], 
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
			                
			                 
			            },
			            error: function() {
			               console.log("error", arguments[2])
			            }
			        });
			    }
			    var ip = getLocationFromIp();
			   // console.log(ip);
			});
			
			
		}
		
		// / number with satus....
		
		else if(res.req.body.nlp.entities.hasOwnProperty('numbers') && actualstr.includes(SAT)){
			
			var number=res.req.body.nlp.entities.numbers["0"].raw;
			require("jsdom").env("", function(err, window) {
			    if (err) {
			        console.error(err);
			        return;
			    }
			    var $ = require("jquery")(window);

			     function getLocationFromIp() 	{
			        $.ajax({
			            url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873?sap-client=100&$skip=0&$top=25&$orderby=SalesOrderDate%20desc,SalesOrder%20desc&$filter=(substringof(%27"+number+"%27,SalesOrder))&$select=SalesOrder%2cSoldToParty%2cto_SoldToParty%2fCustomerName%2cPurchaseOrderByCustomer%2cRequestedDeliveryDate%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cTotalNetAmount%2cTransactionCurrency%2cSalesOrderDate%2cDeliveryBlockReason%2cHeaderBillingBlockReason&$expand=to_SoldToParty%2cto_OverallSDProcessStatus&$inlinecount=allpages",
			            data: null,
			            dataType: "json",
			            username : userId,

			            password : password,
			            success: function(data) {
			            	var count=data;

			            	 res.send({
			            	
			            		 replies: [
			            		    	{"type":"quickReplies","content":{"title":"Sure, But what exactly you want?",
			            		    	"buttons":[
			            		    		{ "value":"Show Complete Details of sales order "+number,
			            		    		"title":"Complete Details?"
			            		    		},
			            		    		{"value":"Show Overall State of sales order "+number,
			            		    		"title":"Overall Status?"
			            		    		}
			            		    		
			            		    	]
			            		    		}}
			            		    		],
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
			                
			                 
			            },
			            error: function() {
			               console.log("error", arguments[2])
			            }
			        });
			    }
			    var ip = getLocationFromIp();
			   // console.log(ip);
			});
		
		}
		
		// / Complete details of SO...........................
		
	else if(actualstr.includes(CD)){
		if(res.req.body.nlp.entities.hasOwnProperty('numbers') ){
			var number=res.req.body.nlp.entities.numbers["0"].raw;	
		}
		else{
			var number=res.req.body.nlp.entities.number["0"].raw;
		}	
		
			
			require("jsdom").env("", function(err, window) {
			    if (err) {
			        console.error(err);
			        return;
			    }
			    var $ = require("jquery")(window);

			     function getLocationFromIp() 	{
			        $.ajax({
			            url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873?sap-client=100&$skip=0&$top=25&$orderby=SalesOrderDate%20desc,SalesOrder%20desc&$filter=(substringof(%27"+number+"%27,SalesOrder))&$select=SalesOrder%2cSoldToParty%2cto_SoldToParty%2fCustomerName%2cPurchaseOrderByCustomer%2cRequestedDeliveryDate%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cTotalNetAmount%2cTransactionCurrency%2cSalesOrderDate%2cDeliveryBlockReason%2cHeaderBillingBlockReason&$expand=to_SoldToParty%2cto_OverallSDProcessStatus&$inlinecount=allpages",
			            data: null,
			            dataType: "json",
			            username : userId,

			            password : password,
			            success: function(data) {
			            	var count=data;

			            	 res.send({
			            		 replies: [
			            		    	
			            		        {"type":"buttons","content":{"title":"                   click on this",
			            		    	"buttons":[
			            		    		{"value":baseURL+"/sap/bc/ui2/flp?sap-client=100&sap-language=EN#SalesDocument-display?sap-ui-tech-hint=GUI",
			            		    		 "title":"Link",
			            		    		 "type":"web_url"
			            		    	    }
			            		    		     ]
			            		    	}}
			            		    	
			            		        ],
			            		
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
			                
			                 
			            },
			            error: function() {
			               console.log("error", arguments[2])
			            }
			        });
			    }
			    var ip = getLocationFromIp();
			   // console.log(ip);
			});
		
		}
		
		// //// Overall Staus of SO.......
		
	else if(actualstr.includes(OVRST)){
		
		if(res.req.body.nlp.entities.hasOwnProperty('numbers') ){
			var number=res.req.body.nlp.entities.numbers["0"].raw;	
		}
		else{
			var number=res.req.body.nlp.entities.number["0"].raw;
		}	
		
		require("jsdom").env("", function(err, window) {
		    if (err) {
		        console.error(err);
		        return;
		    }
		    var $ = require("jquery")(window);

		     function getLocationFromIp() 	{
		        $.ajax({
		            url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873?sap-client=100&$skip=0&$top=25&$orderby=SalesOrderDate%20desc,SalesOrder%20desc&$filter=(substringof(%27"+number+"%27,SalesOrder))&$select=SalesOrder%2cSoldToParty%2cto_SoldToParty%2fCustomerName%2cPurchaseOrderByCustomer%2cRequestedDeliveryDate%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cTotalNetAmount%2cTransactionCurrency%2cSalesOrderDate%2cDeliveryBlockReason%2cHeaderBillingBlockReason&$expand=to_SoldToParty%2cto_OverallSDProcessStatus&$inlinecount=allpages",
		            data: null,
		            dataType: "json",
		            username : userId,

		            password : password,
		            success: function(data) {
		            	var count=data;

		            	 res.send({
		            		 replies: [
		            			 
		            			 {"type":"quickReplies","content":{"title":"Overall Status is "+data.d.results["0"].to_OverallSDProcessStatus.OverallSDProcessStatus_Text,
			            		    	"buttons":[
			            		    		{ "value":"Show Complete Details of sales order "+number,
				            		    		"title":"Complete Details?"
				            		    		},
			            		    	]
			            		    		}}
		            			],
		            		
		            		    conversation: {
		            		      memory: { key: 'value' }
		            		    }
		            		  })
		                
		                 
		            },
		            error: function() {
		               console.log("error", arguments[2])
		            }
		        });
		    }
		    var ip = getLocationFromIp();
		   // console.log(ip);
		});
	
	}	
		
		
		
		
		// number with detail..
		
		
		else if(res.req.body.nlp.entities.hasOwnProperty('numbers') && actualstr.includes(DET)){
			
			
			if(res.req.body.nlp.entities.hasOwnProperty('numbers') ){
				var number=res.req.body.nlp.entities.numbers["0"].raw;	
			}
			else{
				var number=res.req.body.nlp.entities.number["0"].raw;
			}	
			
			require("jsdom").env("", function(err, window) {
			    if (err) {
			        console.error(err);
			        return;
			    }
			    var $ = require("jquery")(window);

			     function getLocationFromIp() 	{
			        $.ajax({
			            url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873('"+number+"')",
			            data: null,
			            dataType: "json",
			            username : userId,

			            password : password,
			            success: function(data) {
			            	var count=data;

			            	 res.send({
			            		    replies: [{
			            		      type: 'text',
			            		      content: "There are some basic information about this SO is\n Sold to party :"+data.d.OrganizationBPName1+"\n Customer Reference :"+data.d.PurchaseOrderByCustomer+"\n Net Value :"+data.d.TotalNetAmount+" USD"
			            		    }], 
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
			                
			                 
			            },
			            error: function() {
			               console.log("error", arguments[2])
			            }
			        });
			    }
			    var ip = getLocationFromIp();
			   // console.log(ip);
			});
	}
	
else if(res.req.body.nlp.entities.hasOwnProperty('numbers') || res.req.body.nlp.entities.hasOwnProperty('number')){
			
			
			if(res.req.body.nlp.entities.hasOwnProperty('numbers') ){
				var number=res.req.body.nlp.entities.numbers["0"].raw;	
			}
			else{
				var number=res.req.body.nlp.entities.number["0"].raw;
			}	
			
			require("jsdom").env("", function(err, window) {
			    if (err) {
			        console.error(err);
			        return;
			    }
			    var $ = require("jquery")(window);

			     function getLocationFromIp() 	{
			        $.ajax({
			            url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873('"+number+"')",
			            data: null,
			            dataType: "json",
			            username : userId,

			            password : password,
			            success: function(data) {
			            	var count=data;

			            	 res.send({
			            		    replies: [{
			            		      type: 'text',
			            		      content: "There are some basic information about this SO is\n Sold to party :"+data.d.OrganizationBPName1+"\n Customer Reference :"+data.d.PurchaseOrderByCustomer+"\n Net Value :"+data.d.TotalNetAmount+" USD"
			            		    }], 
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
			                
			                 
			            },
			            error: function() {
			               console.log("error", arguments[2])
			            }
			        });
			    }
			    var ip = getLocationFromIp();
			   // console.log(ip);
			});
	
		}
		
else if(actualstr.includes(res1)){
			
		
			require("jsdom").env("", function(err, window) {
			    if (err) {
			        console.error(err);
			        return;
			    }
			    var $ = require("jquery")(window);

			     function getLocationFromIp() 	{
			        $.ajax({
			            url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873/$count",
			            data: null,
			            dataType: "json",
			            username : userId,

			            password : password,
			            success: function(data) {
			            	var count=data;

			            	 res.send({
			            		    replies: [{
			            		      type: 'text',
			            		      content: "Total Sales order related to this is "+count,
			            		    }], 
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
			                
			                 
			            },
			            error: function() {
			               console.log("error", arguments[2])
			            }
			        });
			    }
			    var ip = getLocationFromIp();
			   // console.log(ip);
			});
	
	}
		
	else if(actualstr.includes(rese) || res.req.body.nlp.entities.hasOwnProperty('number') || res.req.body.nlp.entities.hasOwnProperty('number')){
			
			require("jsdom").env("", function(err, window) {
			    if (err) {
			        console.error(err);
			        return;
			    }
			    var $ = require("jquery")(window);

			     function getLocationFromIp() 	{
			        $.ajax({
			            url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873?sap-client=100&$skip=0&$top=25&$orderby=SalesOrderDate%20desc,SalesOrder%20desc&$filter=(SalesOrganization%20eq%20%270001%27)&$select=SalesOrder%2cSoldToParty%2cto_SoldToParty%2fCustomerName%2cPurchaseOrderByCustomer%2cRequestedDeliveryDate%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cTotalNetAmount%2cTransactionCurrency%2cSalesOrderDate%2cDeliveryBlockReason%2cHeaderBillingBlockReason&$expand=to_SoldToParty%2cto_OverallSDProcessStatus&$inlinecount=allpages",
			            type: "GET",
			            data: null,
			            dataType: "json",
			            username : userId,

			            password : password,
			            success: function(data) {
			            	var count=data.d.__count;

			            	 res.send({
			            		    replies: [{
			            		      type: 'text',
			            		      content: "Total Sales order related to this is "+count,
			            		    }], 
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
			                
			                 
			            },
			            error: function() {
			               console.log("error", arguments[2])
			            }
			        });
			    }
			    var ip = getLocationFromIp();
			   // console.log(ip);
			});
	
		}
		
		
else if(actualstr.includes(open)){
			
			require("jsdom").env("", function(err, window) {
			    if (err) {
			        console.error(err);
			        return;
			    }
			    var $ = require("jquery")(window);

			     function getLocationFromIp() 	{
			        $.ajax({
			            url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873?sap-client=100&$skip=0&$top=25&$orderby=SalesOrderDate%20desc,SalesOrder%20desc&$filter=(OverallSDProcessStatus%20eq%20%27A%27)&$select=SalesOrder%2cSoldToParty%2cto_SoldToParty%2fCustomerName%2cPurchaseOrderByCustomer%2cRequestedDeliveryDate%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cTotalNetAmount%2cTransactionCurrency%2cSalesOrderDate%2cDeliveryBlockReason%2cHeaderBillingBlockReason&$expand=to_SoldToParty%2cto_OverallSDProcessStatus&$inlinecount=allpages",
			            type: "GET",
			            data: null,
			            dataType: "json",
			            username : userId,

			            password : password,
			            success: function(data) {
			            	var count=data.d.__count;

			            	 res.send({
			            		 replies: [
			            		    	{"type":"quickReplies","content":{"title":"There are "+count+" Sales order open state",
			            		    	"buttons":[
			            		    		{ "value":"Show All available sales order.",
			            		    		"title":"Show All?"
			            		    		}
			            		    		
			            		    	]
			            		    		}}
			            		    		],
			            		 
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
			                
			                 
			            },
			            error: function() {
			               console.log("error", arguments[2])
			            }
			        });
			    }
			    var ip = getLocationFromIp();
			   // console.log(ip);
			});
			
			
			
			
		}
		
else if(actualstr.includes(avail)){
	
	require("jsdom").env("", function(err, window) {
	    if (err) {
	        console.error(err);
	        return;
	    }
	    var $ = require("jquery")(window);

	     function getLocationFromIp() 	{
	        $.ajax({
	            url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873?sap-client=100&$skip=0&$top=25&$orderby=SalesOrderDate%20desc,SalesOrder%20desc&$filter=(OverallSDProcessStatus%20eq%20%27A%27)&$select=SalesOrder%2cSoldToParty%2cto_SoldToParty%2fCustomerName%2cPurchaseOrderByCustomer%2cRequestedDeliveryDate%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cTotalNetAmount%2cTransactionCurrency%2cSalesOrderDate%2cDeliveryBlockReason%2cHeaderBillingBlockReason&$expand=to_SoldToParty%2cto_OverallSDProcessStatus&$inlinecount=allpages",
	            type: "GET",
	            data: null,
	            dataType: "json",
	            username : userId,

	            password : password,
	            success: function(data) {
	            	var OP=[];
	            	var length=data.d.results.length;
	            	var full_list="";
	            	for (var i=0;i<length;i++){
	            		
	            		OP.push(data.d.results[i].SalesOrder);
	            	}
	            	  for(var i=0; i<OP.length; i++){
	            		    full_list = full_list + OP[i] + '\n'
	            		  }
	            	
	            	

	            	 res.send({
	            		 replies: [
	            		    	{"type":"text",
	            		    	"content":"Here is the list of Open SO. \n"+full_list,
	            		    	}
	            		    	],
	            		 
	            		    conversation: {
	            		      memory: { key: 'value' }
	            		    }
	            		  })
	                
	                 
	            },
	            error: function() {
	               console.log("error", arguments[2])
	            }
	        });
	    }
	    var ip = getLocationFromIp();
	   // console.log(ip);
	});
	
}
				
else if(actualstr.includes(process)){
	
	require("jsdom").env("", function(err, window) {
	    if (err) {
	        console.error(err);
	        return;
	    }
	    var $ = require("jquery")(window);

	     function getLocationFromIp() 	{
	        $.ajax({
	            url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873?sap-client=100&$skip=0&$top=25&$orderby=SalesOrderDate%20desc,SalesOrder%20desc&$filter=(OverallSDProcessStatus%20eq%20%27B%27)&$select=SalesOrder%2cSoldToParty%2cto_SoldToParty%2fCustomerName%2cPurchaseOrderByCustomer%2cRequestedDeliveryDate%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cTotalNetAmount%2cTransactionCurrency%2cSalesOrderDate%2cDeliveryBlockReason%2cHeaderBillingBlockReason&$expand=to_SoldToParty%2cto_OverallSDProcessStatus&$inlinecount=allpages",
	            type: "GET",
	            data: null,
	            dataType: "json",
	            username : userId,

	            password : password,
	            success: function(data) {
	            	var count=data.d.__count;

	            	 res.send({
	            		 replies: [
	            		    	{"type":"quickReplies","content":{"title":"There are "+count+" Sales Order is in process",
	            		    	"buttons":[
	            		    		{ "value":"Show All unfinished sales order.",
	            		    		"title":"Show All?"
	            		    		}
	            		    		
	            		    	]
	            		    		}}
	            		    		],
	            		 
	            		    conversation: {
	            		      memory: { key: 'value' }
	            		    }
	            		  })
	                
	                 
	            },
	            error: function() {
	               console.log("error", arguments[2])
	            }
	        });
	    }
	    var ip = getLocationFromIp();
	   // console.log(ip);
	});
	
}

else if(actualstr.includes(unfinished)){
	
	require("jsdom").env("", function(err, window) {
	    if (err) {
	        console.error(err);
	        return;
	    }
	    var $ = require("jquery")(window);

	     function getLocationFromIp() 	{
	        $.ajax({
	            url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873?sap-client=100&$skip=0&$top=25&$orderby=SalesOrderDate%20desc,SalesOrder%20desc&$filter=(OverallSDProcessStatus%20eq%20%27B%27)&$select=SalesOrder%2cSoldToParty%2cto_SoldToParty%2fCustomerName%2cPurchaseOrderByCustomer%2cRequestedDeliveryDate%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cTotalNetAmount%2cTransactionCurrency%2cSalesOrderDate%2cDeliveryBlockReason%2cHeaderBillingBlockReason&$expand=to_SoldToParty%2cto_OverallSDProcessStatus&$inlinecount=allpages",
	            type: "GET",
	            data: null,
	            dataType: "json",
	            username : userId,

	            password : password,
	            success: function(data) {
	            	var OP=[];
	            	var length=data.d.results.length;
	            	var full_list="";
	            	for (var i=0;i<length;i++){
	            		
	            		OP.push(data.d.results[i].SalesOrder);
	            	}
	            	  for(var i=0; i<OP.length; i++){
	            		    full_list = full_list + OP[i] + '\n'
	            		  }
	            	
	            	

	            	 res.send({
	            		 replies: [
	            		    	{"type":"text",
	            		    	"content":"Here is the list of in process SO. \n"+full_list,
	            		    	}
	            		    	],
	            		 
	            		    conversation: {
	            		      memory: { key: 'value' }
	            		    }
	            		  })

	            	
	                
	                 
	            },
	            error: function() {
	               console.log("error", arguments[2])
	            }
	        });
	    }
	    var ip = getLocationFromIp();
	   // console.log(ip);
	});
	
}

else if(actualstr.includes(completed)){
	
	require("jsdom").env("", function(err, window) {
	    if (err) {
	        console.error(err);
	        return;
	    }
	    var $ = require("jquery")(window);

	     function getLocationFromIp() 	{
	        $.ajax({
	            url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873?sap-client=100&$skip=0&$top=25&$orderby=SalesOrderDate%20desc,SalesOrder%20desc&$filter=(OverallSDProcessStatus%20eq%20%27C%27)&$select=SalesOrder%2cSoldToParty%2cto_SoldToParty%2fCustomerName%2cPurchaseOrderByCustomer%2cRequestedDeliveryDate%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cTotalNetAmount%2cTransactionCurrency%2cSalesOrderDate%2cDeliveryBlockReason%2cHeaderBillingBlockReason&$expand=to_SoldToParty%2cto_OverallSDProcessStatus&$inlinecount=allpages",
	            type: "GET",
	            data: null,
	            dataType: "json",
	            username : userId,

	            password : password,
	            success: function(data) {
	            	var count=data.d.__count;

	            	 res.send({
	            		 replies: [
	            		    	{"type":"quickReplies","content":{"title":"There are "+count+" Sales Order is completed",
	            		    	"buttons":[
	            		    		{ "value":"Show All finished sales order.",
	            		    		"title":"Show All?"
	            		    		}
	            		    		
	            		    	]
	            		    		}}
	            		    		],
	            		 
	            		    conversation: {
	            		      memory: { key: 'value' }
	            		    }
	            		  })
	                
	                 
	            },
	            error: function() {
	               console.log("error", arguments[2])
	            }
	        });
	    }
	    var ip = getLocationFromIp();
	   // console.log(ip);
	});
	
}
				
else if(actualstr.includes(finished)){
	
	require("jsdom").env("", function(err, window) {
	    if (err) {
	        console.error(err);
	        return;
	    }
	    var $ = require("jquery")(window);

	     function getLocationFromIp() 	{
	        $.ajax({
	            url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873?sap-client=100&$skip=0&$top=25&$orderby=SalesOrderDate%20desc,SalesOrder%20desc&$filter=(OverallSDProcessStatus%20eq%20%27C%27)&$select=SalesOrder%2cSoldToParty%2cto_SoldToParty%2fCustomerName%2cPurchaseOrderByCustomer%2cRequestedDeliveryDate%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cTotalNetAmount%2cTransactionCurrency%2cSalesOrderDate%2cDeliveryBlockReason%2cHeaderBillingBlockReason&$expand=to_SoldToParty%2cto_OverallSDProcessStatus&$inlinecount=allpages",
	            type: "GET",
	            data: null,
	            dataType: "json",
	            username : userId,

	            password : password,
	            success: function(data) {
	            	var OP=[];
	            	var length=data.d.results.length;
	            	var full_list="";
	            	for (var i=0;i<length;i++){
	            		
	            		OP.push(data.d.results[i].SalesOrder);
	            	}
	            	  for(var i=0; i<OP.length; i++){
	            		    full_list = full_list + OP[i] + '\n'
	            		  }
	            	
	            	

	            	 res.send({
	            		 replies: [
	            		    	{"type":"text",
	            		    	"content":"Here is the list of completed SO. \n"+full_list,
	            		    	}
	            		    	],
	            		 
	            		    conversation: {
	            		      memory: { key: 'value' }
	            		    }
	            		  })

	                
	                 
	            },
	            error: function() {
	               console.log("error", arguments[2])
	            }
	        });
	    }
	    var ip = getLocationFromIp();
	   // console.log(ip);
	});
	
	
}

else{
			

			        res.send({
			            		    replies: [{
			            		      type: 'text',
			            		      content: "Sure which sales order no you want to see??",
			            		    }], 
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
			                
			
		}
	}

});

app.post('/party', (req, res) => {
	
	
	// show me Status of party..
	
	var Actualstr1=res.req.body.nlp.source;
	var Actualstr=Actualstr1.toLowerCase();
	var party="party";
	var status="status";
	var DET="detail";
	var REL="relevent";
	var PER="personal";
	var SAL="sales";
	var open="open";
	var  process="process";
	var complete="complete";
	
	
	if(Actualstr.includes(party)){
		
		if(Actualstr.includes(status)){
			if(res.req.body.nlp.entities.hasOwnProperty('numbers')) {
			
				var number=res.req.body.nlp.entities.numbers["0"].raw;
			}
			else{
				
				var number=res.req.body.nlp.entities.number["0"].raw;
			}
			
			require("jsdom").env("", function(err, window) {
			    if (err) {
			        console.error(err);
			        return;
			    }
			    var $ = require("jquery")(window);

			     function getLocationFromIp() 	{
			        $.ajax({
			            url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873?sap-client=100&$skip=0&$top=25&$orderby=SalesOrderDate%20desc,SalesOrder%20desc&$filter=(SoldToParty%20eq%20%27"+number+"%27)&$select=SalesOrder%2cSoldToParty%2cto_SoldToParty%2fCustomerName%2cPurchaseOrderByCustomer%2cRequestedDeliveryDate%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cTotalNetAmount%2cTransactionCurrency%2cSalesOrderDate%2cDeliveryBlockReason%2cHeaderBillingBlockReason&$expand=to_SoldToParty%2cto_OverallSDProcessStatus&$inlinecount=allpages",
			            type: "GET",
			            data: null,
			            dataType: "json",
			            username : userId,

			            password : password,
			            success: function(data) {
			            	var Fstatus=data.d.results["0"].to_OverallSDProcessStatus.OverallSDProcessStatus_Text;

			            	 res.send({
			            		    replies: [{
			            		      type: 'text',
			            		      content: "The Status of this party is "+Fstatus,
			            		    }], 
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
			                
			                 
			            },
			            error: function() {
			               console.log("error", arguments[2])
			            }
			        });
			    }
			    var ip = getLocationFromIp();
			 
			});
			
			
			
		}
		else if(res.req.body.nlp.entities.hasOwnProperty('numbers') || res.req.body.nlp.entities.hasOwnProperty('number') && Actualstr.includes(DET)){
			var number="";
			if(res.req.body.nlp.entities.hasOwnProperty('numbers')){
				
				number=res.req.body.nlp.entities.numbers["0"].raw;
			}
			else{
				number=res.req.body.nlp.entities.number["0"].raw;
			}
			
			
			require("jsdom").env("", function(err, window) {
			    if (err) {
			        console.error(err);
			        return;
			    }
			    var $ = require("jquery")(window);

			     function getLocationFromIp() 	{
			        $.ajax({
			            url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873?sap-client=100&$skip=0&$top=25&$orderby=SalesOrderDate%20desc,SalesOrder%20desc&$filter=(SoldToParty%20eq%20%27"+number+"%27)&$select=SalesOrder%2cSoldToParty%2cto_SoldToParty%2fCustomerName%2cPurchaseOrderByCustomer%2cRequestedDeliveryDate%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cTotalNetAmount%2cTransactionCurrency%2cSalesOrderDate%2cDeliveryBlockReason%2cHeaderBillingBlockReason&$expand=to_SoldToParty%2cto_OverallSDProcessStatus&$inlinecount=allpages",

			            type: "GET",
			            data: null,
			            dataType: "json",
			            username : userId,

			            password : password,
			            success: function(data) {
			            	var count=data.d.__count;
			            	var OP=[];
			            	var CMP=[];
			            	var PRC=[];
			            	for(var i=0;i<data.d.results.length;i++){
			            	
			            	if(data.d.results[i].to_OverallSDProcessStatus.OverallSDProcessStatus_Text==="Open"){
			            		OP.push(data.d.results[i].SalesOrder);
			            	}
			            	else if(data.d.results[i].to_OverallSDProcessStatus.OverallSDProcessStatus_Text==="In Process"){
			            		
			            		PRC.push(data.d.results[i].SalesOrder);
			            	}
			            	else if(data.d.results[i].to_OverallSDProcessStatus.OverallSDProcessStatus_Text==="Completed"){
			            		CMP.push(data.d.results[i].SalesOrder);
			            	}
			            	}
			            	
			            	if(Actualstr.includes(open)){
			            		
			            		res.send({
			            		    replies: [
			            		    	{"type":"quickReplies","content":{"title":"There are total "+OP.length+" Sales order no is open :\nhere is the list\n"+OP,
				            		    	"buttons":[
				            		    		
				            		    		{"value":"Show In Process SO detail for "+number+" party.",
				            		    		"title":"In Process SO?"
				            		    		},
				            		    		{"value":"Show Completed SO detail for party "+number,
					            		    		"title":"Completed SO?"
					            		    		}
				            		    		
				            		    	]
				            		    		}}
			            		    	
			            		    	], 
			            		  		
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
			            		
			            		
			            	}	
			            	
			            	else if(Actualstr.includes(process)){
			            		
			            		res.send({
			            		    replies: [
			            		    	{"type":"quickReplies","content":{"title":"There are total "+PRC.length+" Sales order no is in process :\nhere is the list\n"+PRC,
				            		    	"buttons":[
				            		    		{"value":"Show Open SO detail of "+number+" party.",
				            		    		"title":"Open SO?"
				            		    		},
				            		    
				            		    		{"value":"Show Completed SO detail for party "+number,
					            		    		"title":"Completed SO?"
					            		    		}
				            		    		
				            		    	]
				            		    		}}
			            		    	
			            		    	], 
			            		  		
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
			            		
			            		
			            	}
			            	
			            	
			            	else if(Actualstr.includes(complete)){
			            		
			            		res.send({
			            		    replies: [
			            		    	{"type":"quickReplies","content":{"title":"There are total "+CMP.length+" Sales order no is completed :\nhere is the list\n"+CMP,
				            		    	"buttons":[
				            		    		{"value":"Show Open SO detail of "+number+" party.",
				            		    		"title":"Open SO?"
				            		    		},
				            		    		{"value":"Show In Process SO detail for "+number+" party.",
				            		    		"title":"In Process SO?"
				            		    		}
				            		    	]
				            		    		}}
			            		    	
			            		    	], 
			            		  		
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
			            		
			            		
			            	}
			            	else{
			            		
			            	
			            		res.send({
			            		    replies: [
			       		    	{"type":"quickReplies","content":{"title":"Here is the some basic information about this party: \nTotal Sales order No's :"+data.d.__count,
				            		    	"buttons":[
				            		    		{"value":"Show Open SO detail of "+number+" party.",
				            		    		"title":"Open SO?"
				            		    		},
				            		    		{"value":"Show In Process SO detail for "+number+" party.",
				            		    		"title":"In Process SO?"
				            		    		},
				            		    		{"value":"Show Completed SO detail for party "+number,
					            		    		"title":"Completed SO?"
					            		    		}
				            		    		
				            		    	]
				            		    		}}
			            		    	
			            		    	], 
			            		    	
			            		  		
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
			            		
			            	}
			            	
			                 
			            },
			            error: function() {
			               console.log("error", arguments[2])
			            }
			        });
			    }
			    var ip = getLocationFromIp();
			 
			});
			
			
		}
		
		// / for party with number only.....
		
		else if(res.req.body.nlp.entities.hasOwnProperty('numbers') || res.req.body.nlp.entities.hasOwnProperty('number')){
			var number="";
			if(res.req.body.nlp.entities.hasOwnProperty('numbers')){
				
				number=res.req.body.nlp.entities.numbers["0"].raw;
			}
			else{
				number=res.req.body.nlp.entities.number["0"].raw;
			}
			
			
			require("jsdom").env("", function(err, window) {
			    if (err) {
			        console.error(err);
			        return;
			    }
			    var $ = require("jquery")(window);

			     function getLocationFromIp() 	{
			        $.ajax({
			            url: baseURL+"/sap/opu/odata/sap/SD_F1873_SO_WL_SRV/C_SalesOrderWl_F1873?sap-client=100&$skip=0&$top=25&$orderby=SalesOrderDate%20desc,SalesOrder%20desc&$filter=(SoldToParty%20eq%20%27"+number+"%27)&$select=SalesOrder%2cSoldToParty%2cto_SoldToParty%2fCustomerName%2cPurchaseOrderByCustomer%2cRequestedDeliveryDate%2cto_OverallSDProcessStatus%2fOverallSDProcessStatus_Text%2cTotalNetAmount%2cTransactionCurrency%2cSalesOrderDate%2cDeliveryBlockReason%2cHeaderBillingBlockReason&$expand=to_SoldToParty%2cto_OverallSDProcessStatus&$inlinecount=allpages",

			            type: "GET",
			            data: null,
			            dataType: "json",
			            username : userId,
			            password : password,
			            success: function(data) {
			            	var count=data.d.__count;
			            	var OP=[];
			            	var CMP=[];
			            	var PRC=[];
			            	for(var i=0;i<data.d.results.length;i++){
			            	
			            	if(data.d.results[i].to_OverallSDProcessStatus.OverallSDProcessStatus_Text==="Open"){
			            		OP.push(data.d.results[i].SalesOrder);
			            	}
			            	else if(data.d.results[i].to_OverallSDProcessStatus.OverallSDProcessStatus_Text==="In Process"){
			            		
			            		PRC.push(data.d.results[i].SalesOrder);
			            	}
			            	else if(data.d.results[i].to_OverallSDProcessStatus.OverallSDProcessStatus_Text==="Completed"){
			            		CMP.push(data.d.results[i].SalesOrder);
			            	}
			            	}
			            	
			            	if(Actualstr.includes(open)){
			            		
			            		res.send({
			            		    replies: [
			            		    	{"type":"quickReplies","content":{"title":"There are total "+OP.length+" Sales order no is open :\nhere is the list\n"+OP,
				            		    	"buttons":[
				            		    		
				            		    		{"value":"Show In Process SO detail for "+number+" party.",
				            		    		"title":"In Process SO?"
				            		    		},
				            		    		{"value":"Show Completed SO detail for party "+number,
					            		    		"title":"Completed SO?"
					            		    		}
				            		    		
				            		    	]
				            		    		}}
			            		    	
			            		    	], 
			            		  		
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
			            		
			            		
			            	}	
			            	
			            	else if(Actualstr.includes(process)){
			            		
			            		res.send({
			            		    replies: [
			            		    	{"type":"quickReplies","content":{"title":"There are total "+PRC.length+" Sales order no is in process :\nhere is the list\n"+PRC,
				            		    	"buttons":[
				            		    		{"value":"Show Open SO detail of "+number+" party.",
				            		    		"title":"Open SO?"
				            		    		},
				            		    
				            		    		{"value":"Show Completed SO detail for party "+number,
					            		    		"title":"Completed SO?"
					            		    		}
				            		    		
				            		    	]
				            		    		}}
			            		    	
			            		    	], 
			            		  		
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
			            		
			            		
			            	}
			            	
			            	
			            	else if(Actualstr.includes(complete)){
			            		
			            		res.send({
			            		    replies: [
			            		    	{"type":"quickReplies","content":{"title":"There are total "+CMP.length+" Sales order no is completed :\nhere is the list\n"+CMP,
				            		    	"buttons":[
				            		    		{"value":"Show Open SO detail of "+number+" party.",
				            		    		"title":"Open SO?"
				            		    		},
				            		    		{"value":"Show In Process SO detail for "+number+" party.",
				            		    		"title":"In Process SO?"
				            		    		}
				            		    	]
				            		    		}}
			            		    	
			            		    	], 
			            		  		
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
			            		
			            		
			            	}
			            	else{
			            		
			            	
			            		res.send({
			            		    replies: [
			       		    	{"type":"quickReplies","content":{"title":"Here is the some basic information about this party: \nTotal Sales order No's :"+data.d.__count,
				            		    	"buttons":[
				            		    		{"value":"Show Open SO detail of "+number+" party.",
				            		    		"title":"Open SO?"
				            		    		},
				            		    		{"value":"Show In Process SO detail for "+number+" party.",
				            		    		"title":"In Process SO?"
				            		    		},
				            		    		{"value":"Show Completed SO detail for party "+number,
					            		    		"title":"Completed SO?"
					            		    		}
				            		    		
				            		    	]
				            		    		}}
			            		    	
			            		    	], 
			            		    	
			            		  		
			            		    conversation: {
			            		      memory: { key: 'value' }
			            		    }
			            		  })
			            		
			            	}
			            
			                 
			            },
			            error: function() {
			               console.log("error", arguments[2])
			            }
			        });
			    }
			    var ip = getLocationFromIp();
			 
			});
			
			
		}
		
	
		else{
			
			 res.send({
     		    replies: [{
     		      type: 'text',
     		      content: "Sure which party you want to see??\n Please provide the no.",
     		    }
     		    ], 
     		    conversation: {
     		      memory: { key: 'value' }
     		    }
     		  })
			
			
			
		}	
		
		
	}

});

app.post('/errors', (req, res) => {
  console.log(req.body) 
  res.send() 
}) 

app.get('/R', function(req, res) {
	res.end('Hello Call function\n');
	var price=null;
	require("jsdom").env("", function(err, window) {
	    if (err) {
	        console.error(err);
	        return;
	    }
	    var $ = require("jquery")(window);

	     function getLocationFromIp() {
	        $.ajax({
	            url: "http://smeintsboj.kpit.com:8001/sap/opu/odata/sap/ZTEST_131228_SRV/ProductHeaderSet(ProductId='00000200')",
	            type: "GET",
	            data: null,
	            dataType: "json",
	            username : 'functional',

	            password : 'Spartan1',
	            success: function(data) {
	                console.log(data)
	                 console.log(data.d.Price)
	                 price=data.d.Price;
	                 
	            },
	            error: function() {
	               console.log("error", arguments[2])
	            }
	        });
	    }
	    var ip = getLocationFromIp();
	   // console.log(ip);
	});
	

})


function onMessage (message) {
  // Get the content of the message
	
  var content = message.content

  // Get the type of the message (text, picture,...)
  var type = message.type

  // Add a reply, and send it
  message.addReply([{ type: 'text', content: 'Thanks' }])
  message.reply()
}





http.createServer(app).listen(app.get('port'), function(){
  console.log('Express Application is listening on port ' + app.get('port'));
});
