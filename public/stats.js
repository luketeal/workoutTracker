// var Chart = require('chart.js');

function calculateTotalWeight(data) {
  let totals = [];

  data.forEach((workout) => {
    let workoutTotal = workout.exercises.reduce((total, { type, weight }) => {
      if (type === 'resistance') {
        return total + weight;
      }
      return total;
    }, 0);

    totals.push(workoutTotal);
  });
  console.log(totals)
  return totals;
}

function calculateTotalDuration(data) {
  let totals = [];

  data.forEach((workout) => {
    let workoutTotal = workout.exercises.reduce((acc, { duration }) => {
        console.log(duration)
        acc = (acc|| 0) + duration;
        console.log(acc)
      return acc;
    }, 0);

    totals.push(workoutTotal);
  });
  console.log(totals)
  return totals;
}

function populateChart(data) {
  console.log(data)
  const durations = calculateTotalDuration(data);
  const pounds = calculateTotalWeight(data);

  const line = document.querySelector('#canvas').getContext('2d');
  const bar = document.querySelector('#canvas2').getContext('2d');

  const labels = data.map(({ day }) => {
    const date = new Date(day);

    // Use JavaScript's `Intl` object to help format dates
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  });

  let lineChart = new Chart(line, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Workout Duration In Minutes',
          backgroundColor: 'red',
          borderColor: 'red',
          data: durations,
          fill: false,
        },
      ],
    },
    options: {
      plugins: {
        responsive: true,
        title: {
          display: true,
          text: 'Time Spent Working Out (Last 7 days)',
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }
    },
  });

  let barChart = new Chart(bar, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Pounds',
          data: pounds,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        title: {
        display: true,
        text: 'Pounds Lifted (Last 7 days)',
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      }
    },
  });
}

// get all workout data from back-end
API.getWorkoutsInRange().then(populateChart);
