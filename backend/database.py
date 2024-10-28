from sqlalchemy import create_engine, event
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import pytz

SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"

engine = create_engine(
  SQLALCHEMY_DATABASE_URL
)

@event.listens_for(engine, 'connect')
def set_sqlite_timezone(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA timezone = '+09:00'")
    cursor.close()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_seoul_datetime():
    return datetime.now(pytz.timezone('Asia/Seoul'))

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()