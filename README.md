# Ultimate Vue.js Developers Course

Source code for the [Ultimate Vue.js Developers Course](http://bit.ly/2mPK8ny).

## Project 2: Vue.js Cinema

### What's Here

This was my project branch when I was working through the Ultimate Vue.js Developers Course, but I went a different way with this one, vs the first project in the series. Firstly, I converted it to Typescript and Vue-Component with class based components, mostly to see if I could, and also to gain some experience in that type of development.

Second, rather then working along in lock-step just parroting the changes being made in the video instruction (and translating them to TypeScript), I would stop the video after Anthony explained what feature he was working on and how it should operate (it's specification, if you will), and then attempted to implement that feature on my own before waching his solution.

Obviously, this resulted in some differences from the canonical code.  There were some instances where I liked his solution better, and changed my code to adapt his solution (especially when his solution used features that I did not yet understand), but in other areas, especially in the area of the filters, I went a totally different way and liked my way better, in the case of filters building a set of modular composable filter classes.

I also ended up factoring a little more inline code out into independant components (for example in my solution, the showtimes are their own component), and because of the way my solution went together, completely skipped the 'event bus'.

There is also one (and maybe more) case(s) where I upgraded the version of various components in order to support Typescript, class-component style, and in one case, a vue-router feature that was not supported in the originally linked version (passing url parameters as params to a routed view, rather then using $route), so the dependancies are a little different.

Still, this is basically the same demo, and it does the same things.

#### Demo

See the original completed project here: [http://vuejs-cinema.vuejsdevelopers.com/](http://vuejs-cinema.vuejsdevelopers.com/)

#### Pre-installation

- Ensure [Node.js  >=5.10](https://nodejs.org/en/download/), [NPM](https://docs.npmjs.com) and [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) are installed on your system

#### Installation

1. Install this code on your local system
    
    1. Fork this repository (click 'Fork' button in top right corner)
    2. Clone the forked repository on your local file system
    
        ```
        cd /path/to/install/location
        
        git clone https://github.com/[your_username]/vuejs-cinema.git
        ```  
   
2. Change into directory

    ```
    cd vuejs-cinema
    ```
    
3. Install dependencies

    ```
    npm install
    ```

4. Create a `.env` file by copying the sample

    ```
    cp .env_sample .env
    ```
    
    Edit the .env file and replace any variables if needed
    
5. Start project

    ```
    npm run start
    ```

Your site will be available at *localhost:[PORT]* where `PORT` is whatever value is set in your `.env` file.

#### Lecture branches

Note that branches in the repo named `lecture/xxx` correspond to course lectures.

