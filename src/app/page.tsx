// import LandingPage from '../modules/landing';

// const Page = () => {
//   return <LandingPage />;
// };

// export default Page;

import { redirect } from 'next/navigation';

const Page = () => {
  redirect('/dashboards/crm');
};

export default Page;