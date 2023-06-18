import { Component } from '@angular/core';
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
constructor() {
this.generateRandomData();
}
generateRandomData() {
const labels = ['Coca Cola', 'Pepsi', 'Cerveza', 'Mota', 'S3X'];
this.chartData = labels.map((label) => {
return { name: label, value: Math.floor(Math.random() * 100) + 1 } as
{ name: string, value: number };
});
}
reloadPage() {
window.location.reload();
}
}
