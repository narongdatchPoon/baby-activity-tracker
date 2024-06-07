import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Summary() {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/activity');
      const activities = response.data;

      const feedingData = activities.filter(act => act.activity === 'กินนม');
      const diaperData = activities.filter(act => act.activity === 'เปลี่ยนแพมเพิส');

      const totalMilk = feedingData.reduce((acc, curr) => acc + (curr.amount || 0), 0);
      const peeCount = diaperData.filter(act => act.tag === 'ฉี่').length;
      const poopCount = diaperData.filter(act => act.tag === 'อึอ').length;

      setData({
        labels: ['นมที่กิน (ออนซ์)', 'ฉี่ (ครั้ง)', 'อึอ (ครั้ง)'],
        datasets: [
          {
            label: 'จำนวน',
            data: [totalMilk, peeCount, poopCount],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 205, 86, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          },
        ],
      });
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">สรุปกิจกรรม</h1>
      <div className="w-full h-64">
        <Bar data={data} />
      </div>
    </div>
  );
}
