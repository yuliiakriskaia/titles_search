# Searcher

## Prerequisites:
* `python2.7` is required.
* `Docker` and `docker-compose` are needed for running the app with web UI. Here are the instructions:

https://docs.docker.com/engine/installation/#platform-support-matrix
https://docs.docker.com/engine/installation/linux/linux-postinstall/
https://docs.docker.com/compose/install/


## Usage
To run searcher backend do the following:
```
cd titles_search/
python main.py
```
To run search with web UI make the next steps:
```
cd titles_search/
docker-compose up
```
Go to `localhost:3000`.

## Testing
To run tests make the next steps:
```
cd titles_search/book/
python tests.py
```

