FROM python:3.6-buster
ENV PYTHONUNBUFFERED 1

RUN mkdir /code
WORKDIR /code

COPY requirements.txt ./
RUN pip install -r requirements.txt
ADD . /code/

CMD ["./main.py"]`