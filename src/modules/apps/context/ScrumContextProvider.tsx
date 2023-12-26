'use client';
import React, { ReactNode, createContext, useContext } from 'react';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import type {
  BoardType,
  LabelType,
  MemberType,
} from '@crema/types/models/apps/ScrumbBoard';

export type ScrumContextType = {
  boardList: BoardType[];
  labelList: LabelType[];
  memberList: MemberType[];
};

export type ScrumActionContextType = {
  setData: (data: BoardType[]) => void;
};

const ContextState: ScrumContextType = {
  boardList: [],
  labelList: [],
  memberList: [],
};

const ScrumContext = createContext<ScrumContextType>(ContextState);
const ScrumActionsContext = createContext<ScrumActionContextType>({
  setData: (data: BoardType[]) => {},
});

export const useScrumContext = () => useContext(ScrumContext);

export const useScrumActionsContext = () => useContext(ScrumActionsContext);

type Props = {
  children: ReactNode;
};

export const ScrumContextProvider = ({ children }: Props) => {
  const [{ apiData: boardList }, { setData }] = useGetDataApi<BoardType[]>(
    '/scrumboard/detail',
    [],
  );

  const [{ apiData: labelList }] = useGetDataApi<LabelType[]>(
    '/scrumboard/labels',
    [],
  );
  const [{ apiData: memberList }] = useGetDataApi<MemberType[]>(
    '/scrumboard/memberList',
    [],
  );

  return (
    <ScrumContext.Provider
      value={{
        boardList,
        labelList,
        memberList,
      }}
    >
      <ScrumActionsContext.Provider
        value={{
          setData,
        }}
      >
        {children}
      </ScrumActionsContext.Provider>
    </ScrumContext.Provider>
  );
};
export default ScrumContextProvider;
