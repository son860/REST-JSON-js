$(function(){

   var $orders = $('#orders');
   var $name = $('#name');
   var $drink = $('#drink');

   var orderTemplate = "" +
   "<li>" +
   "<p><strong>Name:</strong> {{name}} </p>" +
   "<p><strong>Drink:</strong> {{drink}} </p>" +
   "<button data-id='{{id}}' class='remove'>x</button>" +
   "</li>";

   function addOrder(order){
   	   $orders.append(Mustache.render(orderTemplate, order));
   }

   //ACESSA E EXIBE AS INFORMAÇÕES
   $.ajax({
	   	type: 'GET',
	   	url: './api/orders/orders.json',
	   	success: function(orders){
	   	  	 $.each(orders, function(i, order){
	   	  	 	$orders.append('<li>name:' + order.name + ' , drink: ' + order.drink + '</li>');
	   	  	 	addOrder(order);
	   	  	 });
	   	  },

	   	  error: function(){
	   	  	alert("Erro na bagaça!");
	   	  }
	   });

       //ADICIONA AS INFORMAÇÕES
       $('#add-order').on('click', function(){
           
           var order = {
           	   name: $name.val(),
           	   drink: $drink.val(),
           };

           $.ajax({
               type: 'POST',
               url: './api/orders/orders.json',
               data: order,
               success: function(newOrder){
                   addOrder(newOrder);

               error: function(){
               	  alert('Erro de gravar mensagem na bagaça');
               }
           });
       });


       //REMOVE INFORMAÇÕES
       $orders.delegate('.remove', 'click', function(){

       	   var $li = $(this).closest('li');
       	   
           $.ajax({
	            type: 'DELETE',
	            url: './api/orders/orders.json' + $(this).attr('data-id'),
	            success: function(){
	            	$(self)
                    $li.fadeOut(300, function(){
                    	$(this).remove();
                    });
	            }
           });
       });
   });