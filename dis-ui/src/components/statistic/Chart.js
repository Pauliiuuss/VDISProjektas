import React, { useState, useEffect } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import StatisticService from '../../services/statistic.service';
import 'chartjs-plugin-datalabels';

const Chart = () => {
  const [priorities, setPriorities] = useState([]);

  useEffect(() => {
    StatisticService.getAllKindergartenPriorities()
      .then((res) => setPriorities(res.data))
      .catch((err) => console.log(err));
  }, []);

  var allPrioritiesOne = priorities
    .filter((p) => p.kindergartenOne)
    .map((p) => p.kindergartenOne);
  var allPrioritiesTwo = priorities
    .filter((p) => p.kindergartenTwo)
    .map((p) => p.kindergartenTwo);
  var allPrioritiesThree = priorities
    .filter((p) => p.kindergartenThree)
    .map((p) => p.kindergartenThree);
  var allPrioritiesFour = priorities
    .filter((p) => p.kindergartenFour)
    .map((p) => p.kindergartenFour);
  var allPrioritiesFive = priorities
    .filter((p) => p.kindergartenFive)
    .map((p) => p.kindergartenFive);

  var allPriorities = allPrioritiesOne
    .concat(allPrioritiesTwo)
    .concat(allPrioritiesThree)
    .concat(allPrioritiesFour)
    .concat(allPrioritiesFive);

  var countedPriorities = {};
  allPriorities.forEach(function (i) {
    countedPriorities[i] = (countedPriorities[i] || 0) + 1;
  });

  var chartKindergartensLabels = Object.keys(countedPriorities);
  var chartPrioritiesCount = Object.values(countedPriorities);

  return (
    <div className="container mt-5">
      <h3 className="text-secondary text-center ">Darželių populiarumas</h3>
      <p className="text-secondary text-center ">(pagal prašymų skaičių)</p>
      <HorizontalBar
        data={{
          labels: chartKindergartensLabels,
          datasets: [
            {
              label: 'prašymai',
              backgroundColor: '#004c99',
              borderColor: '#004c99',
              borderWidth: 1,
              hoverBackgroundColor: '#0066CC',
              hoverBorderColor: '#004c99',
              data: chartPrioritiesCount,
            },
          ],
        }}
        options={{
          tooltips: {
            backgroundColor: '#606060',
          },
          plugins: {
            datalabels: {
              display: true,
              color: 'white',
            },
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
                ticks: {
                  beginAtZero: true,
                  stepSize: 1,
                },
              },
            ],
          },
        }}
      />
      <p
        className="text-secondary  col-6 text-right"
        style={{ fontSize: '10px', fontWeight: 'bold' }}
      >
        *atvaizduojami tik tie darželiai, kurie turi bent vieną pasirinkimą
      </p>
    </div>
  );
};
export default Chart;
