import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../components/SideNav';
import SideWrapper from '../wrappers/SideWrapper';
import MainWrapper from '../wrappers/MainWrapper';

const AppLayout = () => {
  const [modalState, setModalState] = useState(false);

  const openModal = () => {
    setModalState((prev) => !prev);
  };

  return (
    <MainWrapper>
      <SideWrapper onClick={openModal} active={modalState}>
        <SideNav />
      </SideWrapper>
      <Outlet />
    </MainWrapper>
  );
};

export default AppLayout;
