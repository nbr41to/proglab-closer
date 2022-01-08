import { useRouter } from 'next/router';
import { useState, VFC } from 'react';
import { singOut } from 'src/firebase/auth';

const menuItems = [
  { label: 'MAP', href: '/' },
  { label: 'Admin', href: '/admin' },
  { label: 'Weekly', href: '/weekly' },
  { label: 'Slack', href: '/slack' },
  { label: 'MyPage', href: '/mypage' },
];

export const Menu: VFC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen)
    return (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <i className="bx bx-menu bx-md"></i>
      </div>
    );
  return (
    <div className="flex fixed top-0 right-0 z-50 flex-col bg-slate-50">
      <div
        className="flex gap-2 items-center p-4 hover:bg-amber-200 cursor-pointer"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <i className="bx bx-x bx-sm"></i>
        <span>閉じる</span>
      </div>
      <div
        className="flex gap-2 items-center p-4 hover:bg-amber-200 cursor-pointer"
        onClick={() => {
          router.push('/');
          setIsOpen(false);
        }}
      >
        <i className="bx bx-map-alt bx-sm"></i>
        <span>MAP</span>
      </div>
      <div
        className="flex gap-2 items-center p-4 hover:bg-amber-200 cursor-pointer"
        onClick={() => {
          router.push('/');
          setIsOpen(false);
        }}
      >
        <i className="bx bx-cog bx-sm"></i>
        <span>設定</span>
      </div>
      <div
        className="flex gap-2 items-center p-4 hover:bg-amber-200 cursor-pointer"
        onClick={() => {
          singOut();
          setIsOpen(false);
        }}
      >
        <i className="bx bx-log-out-circle bx-sm"></i>
        <span>ログアウト</span>
      </div>
      {/* 以下はここから削除予定 */}
      {menuItems.map((item) => (
        <div
          key={item.label + item.href}
          className="flex gap-2 items-center p-4 hover:bg-amber-200 cursor-pointer"
          onClick={() => {
            router.push(item.href);
            setIsOpen(false);
          }}
        >
          <i className="bx bx-expand-horizontal bx-sm"></i>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};
