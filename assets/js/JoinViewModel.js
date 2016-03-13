var JoinViewModel = function () {
    var self = this;
	
	self.email = ko.observable();
	self.name = ko.observable();
	self.eventId = ko.observable();
	
	self.join = function(){
		$.ajax({
			url:'http://ponadprogram.azurewebsites.net/api/join',
			method: "POST",
			data: {email: self.email, name:self.name, eventId:2},
			statusCode: {
				404: function() {
					alertify.alert("Wydarzenie do którego chcesz dołączyć nie istnieje.");
				},
				403: function() {
					alertify.alert("Minął czas na dołączenie do wydarzenia.");
				},
				409: function() {
					alertify.alert("Ktoś już dołączył do tego wydarzenia korzystając z email: "+self.email);
				},	
				200: function() {
					alertify.alert("Zapisałeś się na wydarzenie. Na maila otrzymasz wkrótce potwierdzenie.");
				}					
			}
		});
	}
};