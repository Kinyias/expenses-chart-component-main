const chart = document.getElementById('chart');
var heightChart =0;
//Get Current Day and render
const currentDay = (items) => {
  const today = new Date().getDay();
  const allDay = ['sun','mon','tue','wed','thu','fri','sat'];
  return allDay[today]===items.day;
}
//Generate Height Chart
const generateHeightChart = (amount) => {
  return ((amount/heightChart)*10);
}
//Generate Chart

function generateChart(items){
    return `  
     <div class="relative">
    <button>
      <div class="chart-box-expenses ${currentDay(items) ===true ? 'cyan' : ''}" style="height: ${generateHeightChart(items.amount)}rem" ></div>
      <div class="chart-box-text">${items.day}</div>
    </button>
    <p class="chart-box-amount">$${items.amount}</p>
    <button>
  </div>`
}
async function fetchChartData(){
    const chartFetch = await fetch('./js/data.json');
    const chartData = await chartFetch.json();
    heightChart = Math.max(...chartData.map(i => i.amount));
    chart.innerHTML = chartData.map(items => generateChart(items)).join('');
}
fetchChartData()
