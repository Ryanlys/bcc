const request = require("request");
const accountSid = 'AC09503f0b240ab34fc31531bc862b0478';
const authToken = 'b7570ab2a161b307cbe49d3d526a4f35';
const client = require('twilio')(accountSid, authToken);

var interval = 5*1000;

setInterval(function()
{
	job();
}, interval);

function job()
{
	console.log("run job");
	arr = 
	[
		{link:"https://courses.students.ubc.ca/cs/courseschedule?tname=subj-section&course=150&section=001&campuscd=UBCO&dept=COSC&pname=subjarea", code: "150"},
		{link:"https://courses.students.ubc.ca/cs/courseschedule?tname=subj-section&course=499&section=001&campuscd=UBCO&dept=COSC&pname=subjarea", code: "499"},
		{link:"https://courses.students.ubc.ca/cs/courseschedule?tname=subj-section&course=315&section=101&campuscd=UBCO&dept=COSC&pname=subjarea",code:"315"},
		{link:"https://courses.students.ubc.ca/cs/courseschedule?tname=subj-section&course=445&section=101&campuscd=UBCO&dept=COSC&pname=subjarea",code: "445"},
		{link:"https://courses.students.ubc.ca/cs/courseschedule?tname=subj-section&course=311&section=101&campuscd=UBCO&dept=DATA&pname=subjarea", code: "311"}
	];
	

	arr.forEach(function(course)
	{
		request(course.link, function(error, response, body)
		{
			let regex = /this section is blocked from registration/;
			console.log(course.code+" "+regex.test(body));
			if (!regex.test(body))
			{
				client.messages
				  .create({
				     body: 'not blocked',
				     from: '+13343730436',
				     to: '+17806051692'
				   })
			}
		});
	});
	console.log();
};



