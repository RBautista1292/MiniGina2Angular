import { Component, Input } from '@angular/core';
import { get, getDatabase, ref } from 'firebase/database';
@Component({
selector: 'app-chart',
template: `
<div class="chart-container">
<ngx-charts-bar-vertical
[results]="chartData"
[xAxis]="true"
[yAxis]="true"
></ngx-charts-bar-vertical>
</div>
`,
styles: [
`
.chart-container {
width: 500px;
height: 300px;
margin-bottom: 20px;
}
.data-table {
width: 300px;
margin: 0 auto;
border-collapse: collapse;
}
.data-table th, .data-table td {
border: 1px solid black;
padding: 5px;
}
.button-container {
display: flex;
justify-content: center;
margin-top: 20px;
}
`
]
})
export class ChartComponent {
chartData: { name: string, value: number }[] = [];
 datospel: {[key: string]: number} = {};
 database = getDatabase();
 reservationsRef = ref(this.database, 'reservations');
 cantpeli: {[key: string]: number} = {};
constructor() {
  get(this.reservationsRef).then((snapshot) => {
    const registroCitas = snapshot.val();
    console.log(registroCitas);
  
    if (registroCitas) {
      for (const key in registroCitas) {
        if (registroCitas.hasOwnProperty(key)) {
          const cita = registroCitas[key];
          console.log(cita);
          var pelicula = registroCitas[key]['nombrePel'];
          if (this.cantpeli[pelicula]){
            this.cantpeli[pelicula] += 1;
          }
          else {
            this.cantpeli[pelicula]  = 1;
          }
        }
      }
      console.log(this.cantpeli);
    }
  });
  console.log(JSON.parse(JSON.stringify(this.cantpeli)));
  console.log(JSON.stringify(this.cantpeli, (key, value) => {
    return typeof value === 'string' ? `(${value})` : value;
  }));
  const labels:string[] = Object.keys(this.cantpeli);
  console.log(labels);

  const value:number[] = Object.values(this.cantpeli);
  console.log(value);
  this.chartData = labels.map((label) => {
  return { name: label, value: value.shift() } as
  { name: string, value: number };
  });
}
}
