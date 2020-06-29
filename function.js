exports.handler = function(context, event, callback) {
	//let twiml = new Twilio.twiml.VoiceResponse();
	// twiml.say("Hello World");
    let memory = JSON.parse(event.Memory);
    let respObj = {};
    //get answer from Memory
    let q1 = memory.twilio.collected_data.which_virtual_data_program_is_right_for_you.answers.q1.answer.toLowerCase();
    let q2 = memory.twilio.collected_data.which_virtual_data_program_is_right_for_you.answers.q2.answer.toLowerCase();
    let q3 = memory.twilio.collected_data.which_virtual_data_program_is_right_for_you.answers.q3.answer.toLowerCase();
    let q4 = memory.twilio.collected_data.which_virtual_data_program_is_right_for_you.answers.q4.answer.toLowerCase();
    let q5 = memory.twilio.collected_data.which_virtual_data_program_is_right_for_you.answers.q5.answer.toLowerCase();
    const result = Object.entries(
        [q1, q2, q3].reduce((previous, current) => {
            if(previous[current] === undefined) previous[current]=1;
            else previous[current]++;
            return previous;
        }, {})).reduce((previous, current) => (current[1] >= previous[1] ? current : previous))[0];
    
    var msg = '';
    if(result == 'a'){
        msg = "🥁...looks like you should check out General Electric's program! 👇 https://www.insidesherpa.com/virtual-internships/ThbphD5N5WRsd9Mxo";
    }
    else if(result == 'b'){
        msg = "🥁...how about giving the Australian-founded Anz Company a try? become better acquainted with it at 👇 https://www.insidesherpa.com/virtual-internships/ZLJCsrpkHo9pZBJNY ";
    }
    else {
        msg = "🥁...welcome to the KPMG team! greet them here 👇 https://www.insidesherpa.com/virtual-internships/m7W4GMqeT3bh9Nb2c ";
    }
    respObj = {
        "actions":[
            {
                "say": msg
                
            },
            {
                "redirect": "task://goodbye"
            }]
        };
        callback(null, respObj);
};