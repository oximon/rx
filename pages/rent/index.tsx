import dynamic from 'next/dynamic';
import { GetServerSideProps, NextPage } from 'next';

const MainContent = dynamic(
  () => import('../../client/components/main/content')
);

const Rent: NextPage = () => {
  return <MainContent />;
};

export default Rent;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {},
  };
};
