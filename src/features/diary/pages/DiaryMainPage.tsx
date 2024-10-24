// interface DiaryMainPageProps {

import { DiaryEmoji, DiaryFilter, DiaryMonth } from '../components';

// }

function DiaryMainPage() {
  return (
    <div>
      <DiaryFilter />
      <DiaryMonth />
      <DiaryEmoji />
    </div>
  );
}

export default DiaryMainPage;
