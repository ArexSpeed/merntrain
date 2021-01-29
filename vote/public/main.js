const form = document.getElementById('vote-form')

form.addEventListener('submit', (e) => {
  const choice = document.querySelector('input[name=os]:checked').value
  const data = {os: choice};

  fetch('http://localhost:5000/poll',{
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));

  e.preventDefault()
})

//Connect to votes from db
fetch('http://localhost:5000/poll')
  .then(res => res.json())
  .then(data => {
    console.log(data);
    let votes = data.votes;
    let totalVotes = votes.length
    //Count vote points - acc/current value
    voteCounts = votes.reduce((acc, vote) => (
      (acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc),
      {}
  );

let dataPoints = [
  {label: 'Windows', y: voteCounts.Windows},
  {label: 'MacOS', y: voteCounts.MacOS},
  {label: 'Linux', y: voteCounts.Linux},
  {label: 'Other', y: voteCounts.Other},
]

const chartContainer = document.querySelector('#chartContainer')

//from canvas js doc
if(chartContainer){
  const chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    theme: 'theme1',
    title: {
      text: `Total Votes : ${totalVotes}`
    },
    data: [
      {
        type: 'column',
        dataPoints: dataPoints
      }
    ]
  });
  chart.render();

  // Enable pusher logging - don't include this in production
  Pusher.logToConsole = true;

  var pusher = new Pusher('2155ad4346ba1aed215f', {
    cluster: 'eu'
  });

  var channel = pusher.subscribe('os-poll');
  channel.bind('os-vote', function(data) {
    dataPoints.forEach((point)=>{
        if(point.label==data.os)
        {
             point.y+=data.points;
             totalVotes+=data.points;
             event = new CustomEvent('votesAdded',{detail:{totalVotes:totalVotes}});
             // Dispatch the event.
             document.dispatchEvent(event);
        }
    });
    chart.render()
  });

}

})