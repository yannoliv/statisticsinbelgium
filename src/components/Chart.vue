<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
  data: { type: Array, required: true },
})

const chartCanvas = ref(null);


function calculateExperienceFromMonthsToYears(experience) {
  return Math.floor(experience / 12);
};


function calculateAverageSalaryPerYear(salaryObjects, key) {
  const salaryPerYear = {};

  salaryObjects.forEach((item) => {
    const experienceInYears = calculateExperienceFromMonthsToYears(item.experience);
    const salary = item[key];

    if (salaryPerYear[experienceInYears]) {
      salaryPerYear[experienceInYears].push(salary);
    } else {
      salaryPerYear[experienceInYears] = [salary];
    }
  });

  const averageSalaryPerYear = {};

  for (const [year, salaries] of Object.entries(salaryPerYear)) {
    const average = salaries.reduce((acc, curr) => acc + curr, 0) / salaries.length;
    averageSalaryPerYear[year] = average;
  }

  return averageSalaryPerYear;
}

const salariesBruto = calculateAverageSalaryPerYear(props.data, 'salary_bruto');
const salariesNetto = calculateAverageSalaryPerYear(props.data, 'salary_netto');



onMounted(() => {
  const ctx = chartCanvas.value.getContext('2d');
  var chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Bruto',
          data: salariesBruto,
        },
        {
          label: 'Netto',
          data: salariesNetto,
        },
      ],
    },
  });
  console.log(chart)
});
</script>
