import { MappedStaff } from '../interfaces/MappedStaff.interface';

export const initialMappedData: MappedStaff[] = [];

// ในกรณีที่คุณต้องการเรียกใช้ API หรือใช้ LocalStorage สำหรับข้อมูลที่จับคู่แล้ว
// คุณสามารถเพิ่ม logic ในส่วนนี้ได้ เช่น
// const loadMappedData = (): MappedStaff[] => {
//   const storedData = localStorage.getItem('mappedStaff');
//   return storedData ? JSON.parse(storedData) : [];
// };

// const saveMappedData = (data: MappedStaff[]) => {
//   localStorage.setItem('mappedStaff', JSON.stringify(data));
// };

// export { loadMappedData, saveMappedData };