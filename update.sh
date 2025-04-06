#!/bin/bash

timestamp=$(date "+%Y -%m -%d %H:%M:%S")
logfile="update.log"

echo "[$timestamp] Запуск оновлення проекту із GitHub" >> §logfile

echo "[$timestamp] git pull:" >> $logfile
git pull origin main >> $logfile 2>&1

echo "[$timestamp] Перезапуск через PM2:" >> $logfile
pm2 restart shpory >> $logfile 2>&1

echo "[$timestamp] Готово!" >> $logfile
echo "" >> $logfile
