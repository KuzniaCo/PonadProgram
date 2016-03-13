var NewsletterViewModel = function () {
    var self = this;
	
	self.email = ko.observable();
	
	self.join = function(){
		$.ajax({
			url:'http://ponadprogram.azurewebsites.net/api/newsletter',
			method: "POST",
			data: {email: self.email},
			statusCode: {
				409: function() {
					
					alertify.alert("Mamy już ten adres w bazie");
				},
				200: function() {
					alertify.alert("Zapisałeś się do newslettera. Na maila otrzymasz wkrótce potwierdzenie.");
				}					
			}
		});
	}
}