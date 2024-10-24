interface Author {
  nickname: string;
  profileUrl: string;
}

interface Post {
  id: number;
  content: string;
  author: Author;
  date: string;
  likes: number;
  comments: number;
}

// 목업 데이터
const mockPosts: Post[] = [
  {
    id: 1,
    content:
      '요즘 너무 바빠서 제 자신을 돌볼 시간이 없어요. 어떻게 균형을 잡을 수 있을까요? 요즘 너무 바빠서 제 자신을 돌볼 시간이 없어요. 어떻게 균형을 잡을 수 있을까요?요즘 너무 바빠서 제 자신을 돌볼 시간이 없어요. 어떻게 균형을 잡을 수 있을까요?요즘 너무 바빠서 제 자신을 돌볼 시간이 없어요. 어떻게 균형을 잡을 수 있을까요?요즘 너무 바빠서 제 자신을 돌볼 시간이 없어요. 어떻게 균형을 잡을 수 있을까요?요즘 너무 바빠서 제 자신을 돌볼 시간이 없어요. 어떻게 균형을 잡을 수 있을까요?요즘 너무 바빠서 제 자신을 돌볼 시간이 없어요. 어떻게 균형을 잡을 수 있을까요?요즘 너무 바빠서 제 자신을 돌볼 시간이 없어요. 어떻게 균형을 잡을 수 있을까요?',
    author: {
      nickname: 'user01',
      profileUrl:
        'https://images2.minutemediacdn.com/image/upload/c_crop,w_5692,h_3201,x_0,y_374/c_fill,w_1350,ar_16:9,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/mentalfloss/01gq0e0b6s2972198hmw.jpg',
    },
    date: '2024-10-23',
    likes: 15,
    comments: 3,
  },
  {
    id: 2,
    content: '인생에서 실패하는 것이 너무 두려워요. 어떻게 극복할 수 있을까요?',
    author: {
      nickname: 'user01',
      profileUrl:
        'https://images2.minutemediacdn.com/image/upload/c_crop,w_5692,h_3201,x_0,y_374/c_fill,w_1350,ar_16:9,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/mentalfloss/01gq0e0b6s2972198hmw.jpg',
    },
    date: '2024-10-22',
    likes: 32,
    comments: 10,
  },
  {
    id: 3,
    content: '관계에서 소통이 어려워요. 제가 무엇을 잘못하고 있는 걸까요?',
    author: {
      nickname: 'user01',
      profileUrl:
        'https://images2.minutemediacdn.com/image/upload/c_crop,w_5692,h_3201,x_0,y_374/c_fill,w_1350,ar_16:9,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/mentalfloss/01gq0e0b6s2972198hmw.jpg',
    },
    date: '2024-10-21',
    likes: 20,
    comments: 5,
  },
  {
    id: 4,
    content:
      '요즘 스트레스를 너무 많이 받고 있는데, 어떻게 하면 스트레스를 잘 관리할 수 있을까요?',
    author: {
      nickname: 'user01',
      profileUrl:
        'https://images2.minutemediacdn.com/image/upload/c_crop,w_5692,h_3201,x_0,y_374/c_fill,w_1350,ar_16:9,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/mentalfloss/01gq0e0b6s2972198hmw.jpg',
    },
    date: '2024-10-20',
    likes: 40,
    comments: 12,
  },
  {
    id: 5,
    content:
      '새로운 도전을 앞두고 있는데 두려움이 커요. 용기를 얻는 방법이 있을까요?',
    author: {
      nickname: 'user01',
      profileUrl:
        'https://images2.minutemediacdn.com/image/upload/c_crop,w_5692,h_3201,x_0,y_374/c_fill,w_1350,ar_16:9,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/mentalfloss/01gq0e0b6s2972198hmw.jpg',
    },
    date: '2024-10-19',
    likes: 25,
    comments: 8,
  },
];

export { mockPosts };
export type { Post };
