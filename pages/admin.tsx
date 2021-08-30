import { VFC, useEffect, useState } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { AuthenticateButton } from 'src/components/Admin/AuthenticateButton';
import { withAuthInfo } from 'src/recoil/authState';
import { useAuthCheck } from 'src/recoil/authState/hook';
import { User } from 'src/types';
import styled from 'styled-components';
import { getUnauthenticatedUser } from '../src/firebase/firestore/user';

type AdminPageProps = {
  className?: string;
};

const AdminPage: VFC<AdminPageProps> = ({ className }) => {
  useAuthCheck();
  const user = useRecoilValueLoadable(withAuthInfo);
  const [userList, setUserList] = useState<User[]>([]);
  useEffect(() => {
    getUnauthenticatedUser().then((res) => setUserList(res));
  }, []);
  if (user.state !== 'hasValue') return <div>Checking...</div>;
  if (user?.contents?.role === 'admin')
    return (
      <StyledAdminPage className={`${className}`}>
        <h2>Admin Page</h2>
        <p>認証待ちリスト</p>
        {userList.map((user) => (
          <AuthenticateButton key={user?.id} user={user} />
        ))}
      </StyledAdminPage>
    );
  return <div>You are not admin</div>;
};

const StyledAdminPage = styled.div``;

export default AdminPage;
