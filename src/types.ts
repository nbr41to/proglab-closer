export type User = {
  id: string;
  name: string;
  role: 'master' | 'closer';
};

export type MemberInfo = {
  name: string;
  content: {
    chat: string[];
    report: string[];
    next: string[];
  };
};

export type ContentType = 'chat' | 'report' | 'next';
export type Content = {
  text: string;
  name: string;
  colorNum: number;
};

export type Room = {
  id: string;
  title: string;
  date: string;
  member: string[];
  content: {
    chat: Content[];
    report: Content[];
    next: Content[];
  };
};
