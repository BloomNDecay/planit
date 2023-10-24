// Display the current date with the day of the week
const currentDayEl = $('#currentDay');
currentDayEl.text(dayjs().format('dddd, MMMM D, YYYY'));

const container = $('.container-lg');

// Generate blocks dynamically for each hour between 9AM and 5PM
for(let i = 9; i <= 17; i++) {
    const row = $('<div>').attr('id', `hour-${i}`).addClass('row time-block');

    const hourEl = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text((i <= 12 ? i : i-12) + (i < 12 ? 'AM' : 'PM'));
    const textAreaEl = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', 3);

    const savedEvent = localStorage.getItem(i.toString());
    if(savedEvent) {
        textAreaEl.val(savedEvent);
    }

    const buttonEl = $('<button>').addClass('btn saveBtn col-2 col-md-1').html('<i class="fas fa-save" aria-hidden="true"></i>');

    row.append(hourEl, textAreaEl, buttonEl);
    container.append(row);
}

// Add events to local storage
container.on('click', '.saveBtn', function() {
    const hour = $(this).parent().attr('id').split('-')[1];
    const text = $(this).siblings('textarea').val();
    localStorage.setItem(hour, text);
});

// Adjust color coding for past, present, and future time blocks
const timeBlocks = $('.time-block');
timeBlocks.each(function() {
    const blockHour = parseInt($(this).attr('id').split('-')[1]);
    const currentHour = dayjs().hour();

    if (blockHour < currentHour) {
        $(this).addClass('past').removeClass('present future');
    } else if (blockHour === currentHour) {
        $(this).addClass('present').removeClass('past future');
    } else {
        $(this).addClass('future').removeClass('past present');
    }
});
