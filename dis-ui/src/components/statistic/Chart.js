import React, { useState, useEffect } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import SpecService from '../../services/spec.service';
// import 'chartjs-plugin-sort';
import 'chartjs-plugin-datalabels';

const Chart = () => {
  const [kindergartens, setKindergartens] = useState([]);

  useEffect(() => {
    SpecService.getKindergartens()
      .then((res) => setKindergartens(res.data))
      .catch((err) => console.log(err));
  }, []);

  const allKindergartens = kindergartens
    .filter((k) => k.name)
    .map((k) => k.name);

  return (
    <div className="container mt-5">
      <HorizontalBar
        data={{
          labels: allKindergartens,
          datasets: [
            {
              label: 'Darželių populiarumas',
              backgroundColor: '#004c99',
              borderColor: '#004c99',
              borderWidth: 1,
              hoverBackgroundColor: '#0066CC',
              hoverBorderColor: '#004c99',
              data: [2, 9, 8, 1, 6, 5, 4, 7, 0, 12, 3],
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
            sort: {
              enable: true,
              sort: 'desc',
            },
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};
export default Chart;
