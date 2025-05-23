function initializeCountdown(elementId, endDate) {
    const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24;
  
    const countDown = new Date(endDate).getTime();
    
    const interval = setInterval(function() {
        const now = new Date().getTime(),
              distance = countDown - now;
  
        const daysElement = document.querySelector(`#${elementId} .days`);
        const hoursElement = document.querySelector(`#${elementId} .hours`);
        const minutesElement = document.querySelector(`#${elementId} .minutes`);
        const secondsElement = document.querySelector(`#${elementId} .seconds`);
  
        if (daysElement && hoursElement && minutesElement && secondsElement) {
          daysElement.innerText = Math.floor(distance / day);
          hoursElement.innerText = Math.floor((distance % day) / hour);
          minutesElement.innerText = Math.floor((distance % hour) / minute);
          secondsElement.innerText = Math.floor((distance % minute) / second);
        }
  
        //do something later when date is reached
        if (distance < 0) {
            const countdownElement = document.querySelector(`#${elementId}`);
            if (countdownElement) {
                countdownElement.style.display = "none";
            }
            clearInterval(interval);
        }
    }, 1000);
  }
  
  // Initialize countdowns
  initializeCountdown('countdown1', '2027-12-30');
  initializeCountdown('countdown2', '2027-12-30');
  initializeCountdown('countdown3', '2027-12-30');
  initializeCountdown('countdown4', '2027-12-30');
  initializeCountdown('countdown5', '2027-12-30');
  initializeCountdown('countdown6', '2027-12-30');