import React from 'react';
import PortfolioDetail from '../../../../../modules/extraPages/Portfolio/PortfolioDetail';
import { portfolioData } from '@crema/fakedb/extraPages';

const Page = () => {
  return <PortfolioDetail portfolioData={portfolioData} />;
};

export default Page;
