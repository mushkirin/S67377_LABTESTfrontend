$(document).ready(function() {
    function fetchStaffData() {
       $.ajax({
          url: 'https://kerbau.odaje.biz/getstaff.php',
          method: 'GET',
          dataType: 'json',
          success: function(data) {
             var panel = $('<div>').addClass('panel panel-default');
             var panelHeading = $('<div>').addClass('panel-heading').text('Employee Emails');
             var panelBody = $('<div>').addClass('panel-body');
             var listGroup = $('<ul>').addClass('list-group');

             data.forEach(function(employee) {
                var employeeData = JSON.parse(employee);
                var listItem = $('<li>').addClass('list-group-item');
                var emailLink = $('<a>')
                   .addClass('employee-email')
                   .text(employeeData.email)
                   .attr('href', 'secondpage.html?id=' + employeeData.employeeNumber); 

                listItem.append(emailLink);

                listGroup.append(listItem);
             });

             panelBody.append(listGroup);
             panel.append(panelHeading, panelBody);

             $('#employeeList').append(panel);
          },
          error: function(xhr, status, error) {
             console.error('Error fetching data:', error);
          }
       });
    }

    fetchStaffData();
});
