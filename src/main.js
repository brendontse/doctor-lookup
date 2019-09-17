import { DoctorLookup } from './doctor-lookup.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


$(document).ready(function() {
  $('#inputForm').submit(function(event) {
    event.preventDefault();
    let name = $('#inputName').val();
    let symptom = $('#inputSymptom').val();

    let doctorLookup = new DoctorLookup();
    let promise = doctorLookup.getDoctor(name, symptom);

    promise.then(function(response) {
      let body = JSON.parse(response);
      if (body.data.length === 0) {
        $('#errorOutput').text("No results found")
      }

      for (let i = 0; i <body.data.length; i++) {
        $('#nameOutput').append(`Name: ${body.data[i].profile.first_name} ${body.data[i].profile.last_name}`)
        $('#infoOutput').append(`Phone Number: ${body.data[i].practices[0].phones[0].number}
          <br>Address: ${body.data[i].practices[0].visit_address.street}
          <br>Accepting New Patients?: ${body.data[i].practices[0].accepts_new_patients}
          <br>About: ${body.data[i].profile.bio}`)
      }
    });
  });
});
