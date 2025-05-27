#!/bin/bash

# Redis 백그라운드 실행
redis-server --port 6379 &

# Redis 시작 대기
sleep 3

# FastAPI 실행
python main.py