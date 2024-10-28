from datetime import datetime
import pytz

def convert_to_seoul_time(dt):
    """
    주어진 datetime을 서울 시간대로 변환
    """
    if dt.tzinfo is None:
        dt = pytz.UTC.localize(dt)
    seoul_tz = pytz.timezone('Asia/Seoul')
    return dt.astimezone(seoul_tz)

def format_datetime(dt):
    """
    datetime을 한국 형식으로 포맷팅
    """
    seoul_time = convert_to_seoul_time(dt)
    return seoul_time.strftime('%Y-%m-%d %H:%M:%S')