# Requirements
- git
- docker 18.09
- docker-compose 1.23
- node.js 10


### 1. Clone
```
$ git clone https://github.com/sittisak/tinyurl.git && cd tinyurl/dev
```

### 2. Install all dependencies
```
~tinyurl/dev$ ./install_dependencies
```

### 3. Run migrates
```
~tinyurl/dev$ ./migrates
```

### 4. Run server
```
~tinyurl/dev$ docker-compose up -d                             // run background 
~tinyurl/dev$ docker-compose up <back-end, web-console>        // run separate
```

### 5. Server
```
http://localhost:8101
```

### 6. Stop server
```
~tinyurl/dev$ docker-compose stop
```
