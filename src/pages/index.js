import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import Link from 'next/link';

export default function Home() {
  const [activity, setActivity] = useState('');
  const [tag, setTag] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [activities, setActivities] = useState([]);

  const handleSave = async () => {
    const newActivity = {
      activity,
      tag,
      amount,
      note,
      timestamp: format(new Date(), 'yyyy-MM-dd HH:mm'),
    };
    const response = await axios.post('/api/activity', newActivity);
    const newRes = ({...response.data,timestamp: format(response.data.timestamp, 'yyyy-MM-dd HH:mm')})
    setActivities([...activities, newRes]);
    setActivity('');
    setTag('');
    setAmount('');
    setNote('');
  };

  const getActivity = async () => {
   
    const response = await axios.get('/api/activity');
    const newRes = response.data.map(it=>({...it,timestamp: format(it.timestamp, 'yyyy-MM-dd HH:mm')}))
    setActivities(newRes);
    // setActivity('');
    // setTag('');
    // setAmount('');
    // setNote('');
  };
  // 
  useEffect(()=>{
    getActivity()
  })
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">บันทึกกิจกรรมของทารก</h1>
      <div className="mb-4">
        <label className="block mb-1">กิจกรรม:</label>
        <select className="border p-2 w-full text-black" value={activity} onChange={(e) => setActivity(e.target.value)}>
          <option value="">เลือกกิจกรรม</option>
          <option value="เปลี่ยนแพมเพิส">เปลี่ยนแพมเพิส</option>
          <option value="กินนม">กินนม</option>
          <option value="อื่นๆ">อื่นๆ</option>
        </select>
      </div>
      {activity === 'เปลี่ยนแพมเพิส' && (
        <div className="mb-4">
          <label className="block mb-1">แท็ก:</label>
          <select className="border p-2 w-full text-black" value={tag} onChange={(e) => setTag(e.target.value)}>
            <option value="">เลือกแท็ก</option>
            <option value="อึอ">อึอ</option>
            <option value="ฉี่">ฉี่</option>
          </select>
        </div>
      )}
      {activity === 'กินนม' && (
        <div className="mb-4">
          <label className="block mb-1">จำนวน (ออนซ์):</label>
          <input type="number" className="border p-2 w-full text-black" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <label className="block mb-1">ประเภทนม:</label>
          <select className="border p-2 w-full text-black" value={tag} onChange={(e) => setTag(e.target.value)}>
            <option value="">เลือกประเภทนม</option>
            <option value="นมแม่">นมแม่</option>
            <option value="นมชง">นมชง</option>
          </select>
        </div>
      )}
      <div className="mb-4">
        <label className="block mb-1">หมายเหตุ:</label>
        <input type="text" className="border p-2 w-full text-black" value={note} onChange={(e) => setNote(e.target.value)} />
      </div>
      <button className="bg-blue-500 text-white p-2 rounded" onClick={handleSave}>บันทึก</button>
      <h2 className="text-xl font-bold mt-4">กิจกรรมที่บันทึก</h2>
      <ul className="list-disc list-inside">
        {activities.map((act, index) => (
          <li key={index}>
            {act.timestamp} - {act.activity} {act.tag && `(${act.tag})`} {act.amount && `: ${act.amount} ออนซ์`} - {act.note}
          </li>
        ))}
      </ul>
      <Link href="/summary">
      <div className="bg-green-500 text-white p-2 rounded mt-4 block">ดูสรุป</div>
    </Link>
    </div>
  );
}
