interface Author {
  nickname: string;
  profileUrl: string;
}

interface Post {
  id: number;
  content: string;
  author: Author;
  date: string;
  comment: string;
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
    comment:
      '졸리면 잠을 자는게 사실 제일 최고인 것 같은데 너무 바쁘면,, 쪽잠이라도 자거나 영양제로 버텨보기,,아무튼 그렇기,, 글자수 테스트 중인데 몇글자지,,',
    date: '2024-10-23',
    likes: 15,
    comments: 3,
  },
];

export { mockPosts };
export type { Post };
