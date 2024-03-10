<h1>
Read me part 2. 
</h1>

<h2>
Github Repositories
</h2>

* [Front End](https://github.com/recnepspencer/DataTrackerFrontEnd)
* [OpenAI Service](https://github.com/recnepspencer/python-recipe-decoder)
* [Backend ](https://github.com/recnepspencer/DataTracker)

# Overview

I'm integrating AI tools into code. It seems like it will be be a very important skill in the near future -- whoever can most creatively use AI to make their work more efficient will take home the biggest piece of cake.

The data that I am analyzing will be provided by the user. There will be a few different sections where the analysis happens. First, in my python program, we connect to the pytesserect library where we convert a photo of a recipe into text. Then it sends that text to the OpenAI API which is formatted to get a JSON response. Then the recipe goes to the front end, where the user is given the option to send it to the back end. Then they can choose to eat different recipes and select the serving amounts, then the backend runs a sql query to return some information to the front end, which uses plotly.js to create a graph of what they've eaten so far. 

{Provide a link to your YouTube demonstration.  It should be a 4-5 minute demo of the data set, the questions and answers, the code running and a walkthrough of the code.}

[Software Demo Video](https://youtu.be/76rUrwiLI7k)

# Data Analysis Results

I was able to successfully display the user's data in a graph, which will be useful for helping them manage their personal nutrition. 

# Development Environment

<ul>
  <li>
  Vs Code
  </li>
  <li>
    Pytesserect
  </li>
  <li>
    OpenAI API
  </li>
  <li>
  Python
  </li>
  <li>
  Laravel
  </li>
  <li>
  Angular
  </li>

</ul>

# Useful Websites

{Make a list of websites that you found helpful in this project}
* [Web Site Name](http://url.link.goes.here)
* [Web Site Name](http://url.link.goes.here)

# Future Work

{Make a list of things that you need to fix, improve, and add in the future.}
* Make consumptions, recipes, and meals editable, and consumptions and ingredients deletable
* I need to make it so the page refreshes when the user makes certain requests
* I need to fix the time zone issue

<h3>||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||</h3>
<h1>Read Me part 1</h1>
# Overview

This project is a data tracker application designed to allow users to record and monitor various types of data. The ultimate goal is to incorporate AI for data analysis, making this tool not only useful for tracking but also for generating insights. The project serves as a practical application of data tracking principles with a focus on user interaction and efficient data management.

[Software Demo Video](https://youtu.be/8qh-cFlo5hw)

## Development Environment

The software was developed using Angular, a platform for building mobile and desktop web applications, and TypeScript, a strongly typed programming language that builds on JavaScript. The development process was supported by Angular CLI for project scaffolding and development tasks, and Visual Studio Code was used as the IDE.

**Tools & Technologies:**
- Angular CLI
- Visual Studio Code
- Git with GitHub for version control

**Programming Language and Libraries:**
- TypeScript
- Angular Router for managing navigation
- Bootstrap for styling and responsive design
- Tailwind CSS for utility-first CSS framework

## Useful Websites

- [Angular Documentation](https://angular.io/docs)
- [Responsive Header GitHub Repository](https://github.com/chrisira/angular17-responsive-header)
- [Stack Overflow](https://stackoverflow.com/)

## Future Work

- **Integrate AI for Data Analysis**: To provide actionable insights and trend analysis.
- **Improve User Interface**: Enhance the UI for a better user experience.
- **Customizable Dashboards**: Allow users to create personalized dashboards.

This README outlines the initial steps towards creating an advanced data tracking tool, with a focus on future enhancements and AI integration.

## Did You Know?

```text
                        __
                       / _)
        _.----._/ /
      /          /
  __/ (  |  (   |
/__.-'|_|--|__|

Why do programmers prefer dark mode?

- Because light attracts bugs!
```

# DataTracker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
