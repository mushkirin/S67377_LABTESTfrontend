$(document).ready(function() {
    function getUrlParameter(name) {
       name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
       var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
       var results = regex.exec(location.search);
       return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
 
    var employeeNumber = getUrlParameter('id');
 
    $.ajax({
       url: 'https://kerbau.odaje.biz/getstaffbyid.php?id=' + employeeNumber,
       method: 'GET',
       dataType: 'json',
       success: function(data) {
          if (data.length > 1) {
             var employeeData = JSON.parse(data[1]);
             var htmlContent = '<h2>Employee Details</h2>' +
                               '<table class="table table-bordered">' +
                               '<tr><td><strong>Name:</strong></td><td>' + employeeData.firstName + ' ' + employeeData.lastName + '</td></tr>' +
                               '<tr><td><strong>Email:</strong></td><td>' + employeeData.email + '</td></tr>' +
                               '<tr><td><strong>Job Title:</strong></td><td>' + employeeData.jobTitle + '</td></tr>' +
                               '<tr><td><strong>Office Code:</strong></td><td>' + employeeData.officeCode + '</td></tr>' +
                               '<tr><td><strong>Extension:</strong></td><td>' + employeeData.extension + '</td></tr>' +
                               '<tr><td><strong>Reports To:</strong></td><td>' + (employeeData.reportsTo ? employeeData.reportsTo : 'N/A') + '</td></tr>' +
                               '</table>';
 
             $('#employeeDetails').html(htmlContent);
          } else {
             $('#employeeDetails').html('<p>No data found for employee number ' + employeeNumber + '</p>');
          }
       },
       error: function(xhr, status, error) {
          console.error('Error fetching data:', error);
          $('#employeeDetails').html('<p>Error fetching data. Please try again later.</p>');
       }
    });
 });
